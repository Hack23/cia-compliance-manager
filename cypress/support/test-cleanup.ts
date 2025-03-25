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

/**
 * Command to check for deprecated test files
 *
 * This will log which deprecated files still exist in the test directory
 */
Cypress.Commands.add("checkForDeprecatedTests", () => {
  cy.task("checkFilesExist", {
    basePath: "/workspaces/cia-compliance-manager/cypress/e2e/widgets",
    fileList: deprecatedTestFiles,
    // Fix typing issue with then() by using `as any`
  }).then((existingFiles: any) => {
    // Type assertion to help TypeScript
    const files = existingFiles as string[];
    if (files.length === 0) {
      cy.log("✅ All deprecated test files have been removed");
    } else {
      cy.log(
        `⚠️ Found ${files.length} deprecated test files that should be removed:`
      );
      files.forEach((file) => {
        cy.log(`- ${file}`);
      });
    }
  });
});

/**
 * Command to identify tests that haven't been converted to use the widget template
 */
Cypress.Commands.add("findUnconvertedWidgetTests", () => {
  cy.task("findUnconvertedTests", {
    testDir: "/workspaces/cia-compliance-manager/cypress/e2e/widgets",
    templatePattern: "createWidgetTests",
    // Fix typing issue with then() by using `as any`
  }).then((unconvertedFiles: any) => {
    // Type assertion to help TypeScript
    const files = unconvertedFiles as string[];
    if (files.length === 0) {
      cy.log("✅ All widget tests are using the standardized template");
    } else {
      cy.log(`⚠️ Found ${files.length} widget tests not using the template:`);
      files.forEach((file) => {
        cy.log(`- ${file}`);
      });
    }
  });
});

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
