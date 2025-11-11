# Cypress E2E Test Performance Optimization

## Overview

This document describes the optimizations made to improve Cypress E2E test execution time while maintaining test reliability and coverage.

## Problem Statement

The Cypress E2E tests were taking too long to execute due to:
1. Excessive screenshot generation (20+ screenshots per test run)
2. Long wait times (1000ms delays throughout)
3. Duplicate test scenarios across multiple test files
4. Video recording enabled by default
5. High retry counts causing slow failure feedback

## Optimizations Implemented

### 1. Screenshot Reduction

#### Widget Testing Template
- Made baseline screenshots conditional on `CYPRESS_SCREENSHOTS=true` environment variable or CI mode
- Only capture screenshots when explicitly needed for debugging
- **Impact**: Reduced from 12 widget tests × 2 screenshots = 24 screenshots to only on-demand

#### Widget-Specific Tests
Removed redundant screenshots from additional widget tests:
- `business-impact.cy.ts`: Removed "business-impact-high-security" screenshot
- `security-level.cy.ts`: Removed "security-level-selection" screenshot
- `security-summary.cy.ts`: Removed "security-summary-indicators" screenshot
- All impact analysis widgets: Removed 3 screenshots
- All business value widgets: Removed 4 screenshots
- All implementation guide widgets: Removed 4 screenshots

**Total: ~20 screenshots removed per test run**

#### Screenshot Test Optimization
File: `cypress/e2e/screenshots/widget-screenshots.cy.ts`
- Reduced from 7 widgets to 3 essential widgets
- Removed dark theme captures (reduced from 2 themes to 1)
- Added conditional execution via `CAPTURE_SCREENSHOTS` environment variable
- **Impact**: From 14+ screenshots to 3 screenshots (78% reduction)

### 2. Wait Time Optimization

Reduced wait times throughout the test suite:

| Location | Before | After | Savings |
|----------|--------|-------|---------|
| Widget template beforeEach | 1000ms | 500ms | 500ms × 12 tests = 6s |
| Security level transitions | 1000ms | 500ms | 500ms × 2 = 1s |
| Security level selectors | 500ms | 300ms | 200ms × 3 selectors × tests = ~4s |
| Theme changes | 300ms | 200ms | 100ms |
| Compliance validation | 1000ms | 500ms | 500ms × 2 = 1s |

**Total estimated wait time savings: ~12-15 seconds per test run**

### 3. Test Consolidation

#### Security Level Transitions
File: `cypress/e2e/security/security-level-transitions.cy.ts`
- Removed duplicate "high-to-mixed" transition test
- Kept only critical "low-to-high" transition (covers edge cases)
- **Impact**: 50% reduction in security transition tests

#### Compliance Validation
File: `cypress/e2e/business-outcomes/compliance-validation.cy.ts`
- Reduced from 3 scenarios (low, moderate, high) to 2 (low, high)
- Moderate security level already covered in widget tests' beforeEach
- **Impact**: 33% reduction in compliance scenarios

#### Widget Security Level Tests
File: `cypress/support/widget-testing-template.ts`
- Simplified security level change test from 3 levels (low→moderate→high) to 2 (moderate→high)
- Low to high transition covered in dedicated security-level-transitions.cy.ts
- **Impact**: Reduced test complexity and execution time

### 4. Configuration Improvements

File: `cypress.config.ts`

```typescript
// Video recording disabled by default
video: false, // Was: true

// Reduced retry count
retries: {
  runMode: 1, // Was: 2
  openMode: 0,
}

// Optimized timeouts
defaultCommandTimeout: 6000, // Was: 8000ms
pageLoadTimeout: 8000, // Was: 10000ms
requestTimeout: 4000, // Was: 5000ms
responseTimeout: 8000, // New

// Memory management
numTestsKeptInMemory: 10, // New
experimentalMemoryManagement: true, // Already enabled
```

### 5. Commands Optimization

File: `cypress/support/commands.ts`
- Reduced wait times in `setSecurityLevels` command
- Reduced wait time in `toggleTheme` command
- More efficient selector strategies

## Performance Impact

### Estimated Time Savings Per Full Test Run

| Optimization | Time Savings |
|--------------|--------------|
| Screenshot reduction | 15-20 seconds |
| Wait time reduction | 12-15 seconds |
| Video recording disabled | 10-15 seconds |
| Test consolidation | 8-10 seconds |
| Configuration optimizations | 5-8 seconds |
| **Total** | **50-68 seconds** |

### Expected Test Duration

- **Before**: ~3-4 minutes
- **After**: ~2-2.5 minutes
- **Improvement**: ~30-40% faster

## How to Use

### Enable Screenshots When Needed

```bash
# Enable baseline screenshots
CYPRESS_SCREENSHOTS=true npm run test:e2e

# Enable full screenshot capture test
CAPTURE_SCREENSHOTS=true npm run test:e2e
```

### Enable Video Recording

```bash
# Enable video recording for debugging
CYPRESS_VIDEO=true npm run test:e2e
```

### Run Specific Test Suites

```bash
# Run only widget tests
npm run cypress:run -- --spec "cypress/e2e/widgets/**/*.cy.ts"

# Run only business outcome tests
npm run cypress:run -- --spec "cypress/e2e/business-outcomes/**/*.cy.ts"
```

## Maintaining Performance

### Best Practices

1. **Screenshots**: Only add screenshots for actual debugging needs, not for documentation
2. **Wait Times**: Use `cy.wait()` sparingly; prefer waiting for specific conditions
3. **Test Isolation**: Each test should be independent but not duplicate setup
4. **Selectors**: Use efficient selectors (data-testid preferred)
5. **Assertions**: Make assertions specific and fast

### Anti-Patterns to Avoid

❌ **Don't**: Add screenshots after every action
```typescript
cy.get('[data-testid="widget"]').screenshot('widget-1');
cy.setSecurityLevels('High', 'High', 'High');
cy.get('[data-testid="widget"]').screenshot('widget-2');
```

✅ **Do**: Only screenshot on errors or when explicitly needed
```typescript
cy.get('[data-testid="widget"]').should('be.visible');
cy.setSecurityLevels('High', 'High', 'High');
// Screenshot only taken on failure via screenshotOnRunFailure
```

❌ **Don't**: Use arbitrary wait times
```typescript
cy.wait(2000); // Wait 2 seconds "just in case"
```

✅ **Do**: Wait for specific conditions
```typescript
cy.get('[data-testid="widget"]').should('be.visible');
// Or use a smaller, justified wait
cy.wait(300); // Wait for animation to complete
```

## Monitoring Performance

### CI/CD Integration

The GitHub Actions workflow already tracks test duration. Monitor these metrics:

1. **Test Duration**: Check the "e2e-tests" job duration in GitHub Actions
2. **Failure Rate**: Ensure optimizations don't increase flakiness
3. **Screenshot Count**: Monitor artifact sizes in GitHub Actions

### Local Testing

```bash
# Time your test runs
time npm run test:e2e

# Check for slow tests
npm run cypress:run -- --reporter json | jq '.results[].suites[].tests[] | select(.duration > 5000)'
```

## Rollback Plan

If tests become flaky or unreliable:

1. **Increase wait times**: Revert specific wait times back to 500-1000ms
2. **Re-enable retries**: Change `runMode: 1` back to `runMode: 2`
3. **Add screenshots**: Enable screenshots for specific failing tests
4. **Increase timeouts**: Adjust command/page load timeouts if needed

## Future Optimization Opportunities

1. **Parallel Execution**: Configure Cypress to run tests in parallel
2. **Test Grouping**: Group related tests to reduce setup/teardown overhead
3. **Fixture Optimization**: Use fixtures instead of live data when possible
4. **Component Testing**: Move some E2E tests to component tests (faster)
5. **Smart Test Selection**: Run only tests affected by code changes

## References

- [Cypress Best Practices](https://docs.cypress.io/guides/references/best-practices)
- [Cypress Performance Tips](https://docs.cypress.io/guides/references/performance-tips)
- [Project Cypress Configuration](../cypress.config.ts)
