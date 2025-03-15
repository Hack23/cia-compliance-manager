# Cypress Test Troubleshooting Guide

## Common Issues and Solutions

### "require is not defined" Error

#### Symptoms
- Tests fail with error: `ReferenceError: require is not defined`
- Uncaught errors are detected outside of tests
- JUnit reports show tests failing before they start

#### Root Cause
This error occurs when Node.js's `require()` function is being used in a browser environment. The Cypress test runner executes test code in a browser context where `require()` is not available.

#### Solution
1. **Replace `require()` with ES module imports**:

   ```typescript
   // WRONG - Will cause "require is not defined" error
   const myModule = require('./my-module');

   // CORRECT - Use ES module imports instead
   import myModule from './my-module';
   ```

2. **Check for `require()` in these common places**:
   - `cypress/support/constants.ts`
   - `cypress/support/e2e.ts`
   - Any custom utilities imported by tests
   - Test files themselves

3. **Run diagnostic test**:
   ```
   npx cypress run --spec cypress/e2e/setup/diagnose-require-issue.cy.ts
   ```

4. **Handling dynamic imports**: If you need dynamic imports, use the browser's dynamic import:
   ```typescript
   // WRONG
   const module = require(`./modules/${moduleName}`);

   // CORRECT
   import(`./modules/${moduleName}`).then(module => {
     // use module here
   });
   ```

### Other Common Cypress Issues

#### Network Request Failures
- Check for CORS issues
- Ensure the server is running before tests start
- Add retries for flaky endpoints

#### Element Not Found Errors
- Increase timeouts for slow-loading components
- Use more reliable selectors (data-testid is recommended)
- Check if elements are inside shadow DOM

#### Test Reliability Tips
- Avoid depending on previous test state
- Clean up after tests with `afterEach` hooks
- Add logging to diagnose failures

## Running Diagnostic Tests

We've created special diagnostic tests to help troubleshoot issues:

```bash
# Check for require() usage issues
npx cypress run --spec cypress/e2e/setup/diagnose-require-issue.cy.ts

# Verify environment setup
npx cypress run --spec cypress/e2e/setup/e2e-setup.cy.ts

# Analyze test failures
npx cypress run --spec cypress/e2e/setup/junit-report-analysis.cy.ts
```

## Getting Additional Help

If you're still experiencing issues, please:

1. Run the diagnostic tests mentioned above
2. Check the Cypress documentation: https://docs.cypress.io/
3. Look for similar issues in the GitHub issues
4. Reach out to the maintainers with the diagnostic test results
