# Performance Testing Framework

This document outlines the performance testing framework for the CIA Compliance Manager application, providing guidelines on how to write, run, and analyze performance tests.

## Overview

The performance testing framework helps ensure that the application meets performance requirements by:

1. **Measuring performance metrics** for key operations
2. **Establishing baselines** for acceptable performance
3. **Alerting on regressions** when performance degrades
4. **Providing visual reports** for performance analysis

## Key Components

The framework consists of:

- **Performance Metrics Collection**: Records timing information for operations
- **Performance Assertions**: Validates metrics against established thresholds
- **Performance Dashboard**: Visualizes performance data
- **CI Integration**: Automates performance testing in CI/CD pipelines

## Getting Started

### Running Performance Tests

```bash
# Run all performance tests
npm run cypress:run -- --spec "cypress/e2e/performance/**/*"

# Run specific performance test
npm run cypress:run -- --spec "cypress/e2e/performance/widget-performance.cy.ts"

# Run with performance dashboard
npm run cypress:run:perf
```

### Writing Performance Tests

#### Measuring Operation Performance

```typescript
// Start a performance measurement
cy.startMeasurement("my-operation");

// Perform the operation to measure
cy.get(".some-element").click();

// End measurement and record result
cy.endMeasurement("my-operation", "user-interaction");
```

#### Using Test Patterns

```typescript
import {
  measureWidgetRenderPerformance,
  measureInteractionPerformance,
} from "../../support/test-patterns";

// Measure widget rendering performance
measureWidgetRenderPerformance('[data-testid="my-widget"]');

// Measure user interaction performance
measureInteractionPerformance(".button", "click");
```

#### Asserting Performance Requirements

```typescript
it("meets performance requirements", () => {
  cy.startMeasurement("my-operation");

  // Operation to test
  cy.setSecurityLevels("High", "High", "High");

  cy.endMeasurement("my-operation", "security-level-change").then(
    (duration) => {
      // Assert against requirements
      cy.assertPerformance("my-operation", duration, {
        warning: 300, // Warning threshold in ms
        error: 600, // Error threshold in ms
      });
    }
  );
});
```

## Performance Baseline Configuration

Performance thresholds are defined in `cypress/config/performance-baseline.ts`. There are three predefined baseline configurations:

1. **DEV_BASELINE**: More lenient thresholds for development environments
2. **PROD_BASELINE**: Stricter thresholds for production environments
3. **CI_BASELINE**: Adjusted thresholds for CI environments

```typescript
// Example of modifying baseline for a specific operation
DEV_BASELINE.operations["my-custom-operation"] = {
  warning: 300,
  error: 800,
};
```

## Analyzing Performance Reports

Performance reports are generated in two formats:

1. **JSON Report**: Raw data at `cypress/reports/performance/performance-report.json`
2. **HTML Dashboard**: Visual report at `cypress/reports/performance/performance-dashboard.html`

### Dashboard Features

- Overview of test execution statistics
- Performance by category
- Slowest operations
- Widget-specific performance metrics
- Performance trends (if historical data available)

### Performance Categories

Operations are grouped into the following categories:

- **navigation**: Page loading and navigation operations
- **widget-rendering**: Widget rendering and re-rendering
- **security-level-change**: Operations related to changing security levels
- **user-interaction**: User interactions like clicks, input, etc.
- **business-calculation**: Business logic calculations
- **content-loading**: Content loading and population operations

## CI/CD Integration

Performance tests are integrated with CI/CD pipelines to catch performance regressions:

```yaml
# Excerpt from CI configuration
stages:
  - test
  - performance

performance-tests:
  stage: performance
  script:
    - npm run cypress:run:perf
  artifacts:
    paths:
      - cypress/reports/performance/
```

## Best Practices

1. **Focus on key operations**: Measure the most critical user-facing operations
2. **Establish baseline first**: Run tests to establish baseline before enforcing thresholds
3. **Group related metrics**: Use categories to organize related performance metrics
4. **Automate for key flows**: Focus automation on the most important user flows
5. **Visual validation**: Always look at visual reports to understand performance patterns

## Troubleshooting

### Common Issues

1. **Inconsistent metrics**: Run tests multiple times to get stable averages
2. **CI performance variations**: CI environments may have variable performance; adjust thresholds accordingly
3. **Resource contention**: Close other applications when running performance tests locally

### Performance Improvement Tips

If widgets or operations fail to meet performance requirements:

1. **Check for unnecessary re-renders**: Use React DevTools to identify components that re-render too frequently

   - Look for missing dependency arrays in hooks
   - Add proper memoization with useMemo and useCallback

2. **Optimize expensive calculations**:

   - Move expensive operations outside of render functions
   - Cache results of complex calculations
   - Consider web workers for CPU-intensive operations

3. **Improve DOM efficiency**:

   - Minimize DOM manipulations
   - Use virtualization for large lists (react-window)
   - Verify efficient DOM access patterns in Cypress tests

4. **Reduce bundle size**:

   - Check bundle analysis reports
   - Implement code splitting for large components
   - Lazy load non-critical widgets

5. **Use profiling tools**:
   - Run Chrome Performance profiler to identify bottlenecks
   - Use Cypress performance monitoring with detailed timing breakdowns
   - Generate flamegraphs to visualize call stacks and identify optimization opportunities

## Integration with CI/CD Pipeline

Performance tests are integrated into the CI/CD workflow as described in our [CI/CD Workflows](https://github.com/Hack23/cia-compliance-manager/blob/main/docs/architecture/WORKFLOWS.md) documentation. This ensures consistent monitoring of performance metrics throughout the development process.

For information about automated performance reporting, see the [HTML Dashboard](#analyzing-performance-reports) section above.
