#!/bin/bash
# Script to create 5 GitHub issues for v0.9 release
# Usage: GITHUB_TOKEN=your_token ./create-issues.sh
# Or: gh auth login && ./create-issues.sh

set -e

REPO="Hack23/cia-compliance-manager"

echo "Creating 5 GitHub issues for v0.9 release in $REPO..."
echo ""

# Check if gh is authenticated
if ! gh auth status > /dev/null 2>&1; then
    echo "Error: GitHub CLI is not authenticated."
    echo "Please run 'gh auth login' or set GITHUB_TOKEN environment variable."
    exit 1
fi

# Issue 1: Test Coverage
echo "Creating Issue 1: Test Coverage..."
ISSUE1_URL=$(gh issue create \
    --repo "$REPO" \
    --title "✅ Increase test coverage from 75% to 80%+ for v0.9 release" \
    --label "type:test,priority:high,size:medium" \
    --body "## 🎯 Objective

Increase overall test coverage from 75.06% to 80%+ by adding tests for critical business logic and low-coverage components to ensure code quality and stability for the v0.9 release.

## 📋 Background

Current test coverage analysis shows:
- **Overall coverage:** 75.06% (lines), 64.9% (branches), 80% (functions), 75.78% (statements)
- **97 test files** currently exist
- **Low coverage areas identified:**
  - \`src/application/CIAClassificationApp.tsx\`: 61.36%
  - \`src/utils/levelValuesUtils.ts\`: 41.02%
  - \`src/utils/securityLevelUtils.ts\`: 59.22%
  - \`src/utils/riskUtils.ts\`: 51.07%
  - \`src/services/technicalImplementationService.ts\`: 51.42%
  - \`src/data/businessImpactData.ts\`: 34.48%

The ISMS Implementation Guide and SECURITY.md both specify 80%+ test coverage as a security requirement.

## ✅ Acceptance Criteria

- [ ] Overall test coverage reaches ≥80% for lines, branches, and statements
- [ ] All business-critical utilities have ≥80% coverage
- [ ] All service classes have ≥80% coverage  
- [ ] Test coverage report shows no critical gaps in security-related functions
- [ ] All new tests pass in CI/CD pipeline
- [ ] Coverage reports generated and committed to docs/coverage/

## 🛠️ Implementation Guidance

### Files to Modify/Create

**Priority 1 - Critical Business Logic:**
- \`src/utils/levelValuesUtils.ts\` (41% → 80%+)
  - Add tests for \`getLevelValues()\` function
  - Test edge cases for level validation
  - Test error handling for invalid inputs
  
- \`src/utils/securityLevelUtils.ts\` (59% → 80%+)
  - Add tests for security level calculations
  - Test boundary conditions
  - Test all security level mappings

- \`src/utils/riskUtils.ts\` (51% → 80%+)
  - Add tests for risk calculation formulas
  - Test risk aggregation logic
  - Test risk scoring edge cases

**Priority 2 - Services:**
- \`src/services/technicalImplementationService.ts\` (51% → 80%+)
  - Add tests for all public methods
  - Mock dependencies properly
  - Test error scenarios

- \`src/data/businessImpactData.ts\` (35% → 80%+)
  - Test data validation
  - Test data transformation functions
  - Test constants and mappings

**Priority 3 - Components:**
- \`src/application/CIAClassificationApp.tsx\` (61% → 80%+)
  - Add integration tests for main app flow
  - Test state management
  - Test user interaction scenarios

### Approach

1. Run coverage report to identify specific uncovered lines
2. For each low-coverage file, add test file if missing
3. Focus on untested code paths shown in coverage report
4. Use existing test patterns from high-coverage files
5. Run tests incrementally

## 🔗 Related Resources

- [Vitest Documentation](https://vitest.dev/)
- [Testing Library React](https://testing-library.com/docs/react-testing-library/intro/)
- Current coverage report: \`docs/coverage/lcov-report/index.html\`
- Test plan: \`docs/UnitTestPlan.md\`
- SECURITY.md specifies 80%+ coverage requirement

## 📊 Metadata

**Priority:** High (required for v0.9 release)  
**Effort:** Medium (4-6 hours)")

echo "✓ Created: $ISSUE1_URL"
echo ""

# Issue 2: Security Headers
echo "Creating Issue 2: Security Headers..."
ISSUE2_URL=$(gh issue create \
    --repo "$REPO" \
    --title "🔒 Address 10 security findings from ZAP Full Scan Report" \
    --label "type:security,priority:critical,size:medium" \
    --body "## 🎯 Objective

Address critical and high-priority security findings from the ZAP (OWASP ZAP) Full Scan Report documented in issue #120 to improve the security posture before the v0.9 release.

## 📋 Background

ZAP Full Scan identified multiple security issues on the deployed application at https://hack23.github.io/cia-compliance-manager/:

**High-Priority Findings:**
1. **CORS Misconfiguration** [40040] - 2 instances
2. **Content Security Policy (CSP) Header Not Set** [10038] - 1 instance  
3. **Cross-Domain Misconfiguration** [10098] - 1 instance
4. **Missing Anti-clickjacking Header** [10020] - 1 instance
5. **Strict-Transport-Security Header Not Set** [10035] - 4 instances
6. **X-Content-Type-Options Header Missing** [10021] - 1 instance

**Medium-Priority Findings:**
7. **CSP: Failure to Define Directive with No Fallback** [10055] - 6 instances
8. **CSP: style-src unsafe-inline** [10055] - 3 instances
9. **Insufficient Site Isolation Against Spectre Vulnerability** [90004] - 2 instances
10. **Relative Path Confusion** [10051] - 2 instances

These findings indicate missing security headers and CSP misconfigurations that could expose the application to various attacks.

## ✅ Acceptance Criteria

- [ ] All high-priority security headers implemented
- [ ] Content Security Policy (CSP) configured properly
- [ ] CORS policy reviewed and restricted appropriately
- [ ] Anti-clickjacking headers (X-Frame-Options or CSP frame-ancestors) added
- [ ] HSTS (Strict-Transport-Security) header configured
- [ ] X-Content-Type-Options: nosniff header added
- [ ] ZAP scan passes with no high-priority findings
- [ ] Security headers verified in production deployment
- [ ] Documentation updated with security header configuration

## 🛠️ Implementation Guidance

### Files to Modify

Since this is a static GitHub Pages deployment, security headers need to be configured via meta tags:

**Option 1: Meta Tags (Immediate):**
- \`index.html\` - Add security-related meta tags

**Option 2: Vite Configuration:**
- \`vite.config.ts\` - Update for production headers

### Approach

1. **Add CSP Meta Tag to index.html**
2. **Add Security Headers Meta Tags**
3. **Configure CORS (if API calls are made)**
4. **Update Vite Configuration for Production**
5. **Test Security Headers**
6. **Re-run ZAP Scan**

## 🔗 Related Resources

- [Original ZAP Scan Report - Issue #120](https://github.com/Hack23/cia-compliance-manager/issues/120)
- [OWASP ZAP Documentation](https://www.zaproxy.org/docs/)
- [Content Security Policy (CSP) Guide](https://developer.mozilla.org/en-US/docs/Web/HTTP/CSP)
- [Security Headers Best Practices](https://owasp.org/www-project-secure-headers/)
- SECURITY.md and ISMS_IMPLEMENTATION_GUIDE.md

## 📊 Metadata

**Priority:** Critical (security issue)  
**Effort:** Medium (4-6 hours)  
**Related:** #120")

echo "✓ Created: $ISSUE2_URL"
echo ""

# Issue 3: Bundle Optimization
echo "Creating Issue 3: Bundle Optimization..."
ISSUE3_URL=$(gh issue create \
    --repo "$REPO" \
    --title "⚡ Optimize bundle size from 4.0MB to <500KB total budget" \
    --label "type:performance,priority:high,size:medium" \
    --body "## 🎯 Objective

Reduce total bundle size from 4.0MB to under 500KB (as specified in budget.json) by optimizing assets, code splitting, and implementing lazy loading strategies.

## 📋 Background

Current build analysis shows:
- **Total build size:** 4.0MB (budget: 500KB)
- **Main JavaScript bundles:**
  - \`index-CQ_HMnRj.js\`: 264KB (budget: 180KB for scripts)
  - \`vendor-BRU2jZet.js\`: 206KB
  - \`react-DpI18Uv0.js\`: 185KB
- **CSS:** \`index-gduEf1gb.css\`: 69.80KB (budget: 50KB for stylesheets)
- **Total JS:** ~659KB (exceeds 180KB budget by 3.6x)

**Budget Targets (from budget.json):**
- Script: 180KB
- Stylesheet: 50KB
- Image: 200KB
- Total: 500KB

## ✅ Acceptance Criteria

- [ ] Total bundle size ≤ 500KB (measured with gzip)
- [ ] Main script bundle ≤ 180KB
- [ ] CSS bundle ≤ 50KB
- [ ] Lazy loading implemented for non-critical components
- [ ] Code splitting configured for route-based chunks
- [ ] Bundle analysis report generated and documented
- [ ] Lighthouse performance score ≥ 90
- [ ] All core functionality preserved
- [ ] Build passes with no budget violations

## 🛠️ Implementation Guidance

### Files to Modify

**Priority 1 - Code Splitting:**
- \`vite.config.ts\` - Configure manual chunks
- \`src/App.tsx\` - Implement React.lazy() for routes
- \`src/components/widgets/*/\` - Lazy load widget components

**Priority 2 - CSS Optimization:**
- \`tailwind.config.js\` - Enable PurgeCSS and content optimization
- \`src/index.css\` - Remove unused styles
- \`src/App.css\` - Minimize global styles

**Priority 3 - Dependency Optimization:**
- \`package.json\` - Review and potentially replace heavy dependencies
- Consider chart.js alternatives (Chart.js is 242KB)

### Approach

1. Analyze Current Bundle
2. Implement Code Splitting
3. Lazy Load Widget Components
4. Optimize Tailwind CSS
5. Consider Chart.js Alternatives
6. Optimize Images
7. Enable Compression
8. Verify Bundle Size

## 🔗 Related Resources

- [Vite Code Splitting](https://vitejs.dev/guide/build.html#chunking-strategy)
- [React Code Splitting](https://react.dev/reference/react/lazy)
- [Web.dev Bundle Size Optimization](https://web.dev/reduce-javascript-payloads-with-code-splitting/)
- budget.json configuration

## 📊 Metadata

**Priority:** High (performance critical)  
**Effort:** Medium (6-8 hours)")

echo "✓ Created: $ISSUE3_URL"
echo ""

# Issue 4: TypeScript any Usage
echo "Creating Issue 4: TypeScript any Usage..."
ISSUE4_URL=$(gh issue create \
    --repo "$REPO" \
    --title "🔧 Reduce TypeScript any usage from 251 occurrences to <50" \
    --label "type:refactor,priority:medium,size:medium" \
    --body "## 🎯 Objective

Improve type safety by reducing TypeScript \`any\` usage from 251 occurrences to fewer than 50, replacing with proper types, generics, or \`unknown\` where appropriate.

## 📋 Background

Current codebase analysis shows:
- **251 occurrences of \`any\` type** across the codebase
- TypeScript strict mode is enabled (\`tsconfig.json\`)
- Repository guidelines mandate strict typing and avoiding \`any\`

**Why This Matters:**
- \`any\` bypasses type checking, defeating TypeScript's purpose
- Increases risk of runtime errors
- Reduces code maintainability and IDE support
- Makes refactoring more dangerous
- Violates repository coding guidelines

## ✅ Acceptance Criteria

- [ ] Reduce \`any\` occurrences to <50 (80% reduction)
- [ ] All service methods have explicit return types
- [ ] All function parameters have explicit types
- [ ] Use \`unknown\` for genuinely unknown types
- [ ] Create proper type definitions for complex objects
- [ ] No new \`any\` types introduced
- [ ] All tests still pass
- [ ] TypeScript strict mode remains enabled
- [ ] Documentation updated with new type definitions

## 🛠️ Implementation Guidance

### Strategy

**Phase 1: Audit and Categorize (1 hour)**
Find all \`any\` usage and categorize by type

**Phase 2: Replace by Category (4-5 hours)**

### Files to Modify (Priority Order)

**High Priority - Services (expect 80+ occurrences):**
- \`src/services/*.ts\` - Service method parameters and returns
- \`src/hooks/*.ts\` - Hook types

**Medium Priority - Utils (expect 60+ occurrences):**
- \`src/utils/*.ts\` - Utility function types
- \`src/types/*.ts\` - Type definitions

**Low Priority - Components (expect 50+ occurrences):**
- \`src/components/**/*.tsx\` - Component props and state

### Approach

1. Start with Type Definitions
2. Use Utility Types
3. Enable Incremental Validation
4. Fix in Order of Impact
5. Verify No Regressions

## 🔗 Related Resources

- [TypeScript Handbook - Everyday Types](https://www.typescriptlang.org/docs/handbook/2/everyday-types.html)
- [TypeScript Utility Types](https://www.typescriptlang.org/docs/handbook/utility-types.html)
- [When to use unknown vs any](https://www.typescriptlang.org/docs/handbook/release-notes/typescript-3-0.html#new-unknown-top-type)
- Repository: \`.github/copilot-instructions.md\` - TypeScript guidelines

## 📊 Metadata

**Priority:** Medium (code quality)  
**Effort:** Medium (5-7 hours)")

echo "✓ Created: $ISSUE4_URL"
echo ""

# Issue 5: E2E Test Coverage
echo "Creating Issue 5: E2E Test Coverage..."
ISSUE5_URL=$(gh issue create \
    --repo "$REPO" \
    --title "🧪 Complete E2E test coverage for all 25 widget components" \
    --label "type:test,priority:medium,size:medium" \
    --body "## 🎯 Objective

Achieve complete end-to-end test coverage for all 25 widget components to ensure UI functionality, user interactions, and integration work correctly in real browser environments.

## 📋 Background

Current E2E testing status:
- **15 Cypress E2E test specs** exist
- **25 widget components** in the codebase
- **Widget categories:**
  - Assessment Center: 3 widgets
  - Business Value: 3 widgets
  - Impact Analysis: 3 widgets
  - Implementation Guide: 3 widgets
  - Additional: ~13 widgets

**Gap Analysis:**
- Potentially 10+ widgets without E2E coverage
- Need to verify all widget user interactions
- Need to test widget data display accuracy
- Need to test widget integration with CIA classification system

## ✅ Acceptance Criteria

- [ ] All 25 widget components have at least 1 E2E test
- [ ] Each widget E2E test covers:
  - [ ] Component renders without errors
  - [ ] Data displays correctly
  - [ ] User interactions work (clicks, hovers, inputs)
  - [ ] Navigation/routing (if applicable)
  - [ ] Accessibility (keyboard navigation, ARIA)
- [ ] All E2E tests pass in CI/CD
- [ ] Test coverage report shows ≥80% E2E coverage
- [ ] Flaky tests identified and fixed
- [ ] E2E test documentation updated

## 🛠️ Implementation Guidance

### Files to Create/Modify

**New E2E Test Files to Create (approximately 10):**

Assessment Center, Business Value, Impact Analysis, and Implementation Guide widget tests.

### Approach

**Step 1: Audit Widget Coverage (1 hour)**
**Step 2: Create E2E Test Template**
**Step 3: Add data-testid Attributes (if missing)**
**Step 4: Run Tests Incrementally**
**Step 5: Handle Flaky Tests**
**Step 6: Organize Tests**

## 🔗 Related Resources

- [Cypress Documentation](https://docs.cypress.io/)
- [Cypress Best Practices](https://docs.cypress.io/guides/references/best-practices)
- Existing E2E tests: \`cypress/e2e/\`
- E2E Test Plan: \`docs/E2ETestPlan.md\`
- Widget Testing Recipe: \`docs/widget-testing-recipe.md\`

## 📊 Metadata

**Priority:** Medium (quality assurance)  
**Effort:** Medium (6-8 hours)")

echo "✓ Created: $ISSUE5_URL"
echo ""

echo "================================================"
echo "✓ Successfully created 5 GitHub issues!"
echo "================================================"
echo ""
echo "Issue URLs:"
echo "1. $ISSUE1_URL"
echo "2. $ISSUE2_URL"
echo "3. $ISSUE3_URL"
echo "4. $ISSUE4_URL"
echo "5. $ISSUE5_URL"
echo ""
echo "Total Estimated Effort: 24-32 hours"
echo ""
