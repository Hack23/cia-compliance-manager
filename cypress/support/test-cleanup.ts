/**
 * Test Cleanup Utilities for Cypress Tests
 *
 * These utilities help maintain a clean test environment by removing
 * deprecated or unused test files.
 */

/**
 * List of files that have been replaced by template-based tests
 * and should be deleted
 */
export const deprecatedTestFiles = [
  "all-widgets-security-test.cy.ts",
  "availability-impact-widget.cy.ts",
  "business-impact-widget.cy.ts",
  "cia-impact-widgets.cy.ts",
  "confidentiality-impact-widget.cy.ts",
  "integrity-impact-widget.cy.ts",
  "radar-chart-widget.cy.ts",
  "cia-impact-summary-widget.cy.ts",
  "security-summary-widget.cy.ts",
  "value-creation-widget.cy.ts",
  "compliance-status-widget.cy.ts",
  "cost-estimation-widget.cy.ts",
  "base-widget-tests.ts",
  "advanced-widget-tests.ts",
];

// Note: checkForDeprecatedTests and findUnconvertedWidgetTests commands
// are registered in command-registry.ts — do not re-register here

/**
 * Define types for the custom commands
 */
declare global {
  namespace Cypress {
    interface Chainable {
      /**
       * Check for deprecated test files that should be removed
       */
      checkForDeprecatedTests(): Chainable<void>;

      /**
       * Find widget tests that haven't been converted to use the template
       */
      findUnconvertedWidgetTests(): Chainable<void>;
    }
  }
}
