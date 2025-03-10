/**
 * Helper function to log all test IDs in the DOM
 * Useful for debugging when tests fail due to missing selectors
 */
export function logAllTestIds() {
  cy.document().then((doc) => {
    const elementsWithTestId = Array.from(
      doc.querySelectorAll("[data-testid]")
    );
    cy.log(`Found ${elementsWithTestId.length} elements with data-testid`);

    const testIds = elementsWithTestId.map((el) => ({
      testId: el.getAttribute("data-testid"),
      tagName: el.tagName,
      classes: el.getAttribute("class") || "",
    }));

    // Log the first 20 test IDs
    testIds.slice(0, 20).forEach((item) => {
      cy.log(`${item.tagName} - ${item.testId}`);
    });

    if (testIds.length > 20) {
      cy.log(`...and ${testIds.length - 20} more`);
    }

    // Save all test IDs to a file for reference (in CI)
    cy.task("writeFile", {
      path: "cypress/results/test-ids.json",
      content: JSON.stringify(testIds, null, 2),
    }).then((result) => {
      if (result) {
        cy.log("Saved test IDs to cypress/results/test-ids.json");
      } else {
        cy.log("Could not save test IDs to file");
      }
    });
  });
}

/**
 * Helper to check if a test ID exists in the DOM
 */
export function testIdExists(testId: string): Cypress.Chainable<boolean> {
  return cy.document().then((doc) => {
    const element = doc.querySelector(`[data-testid="${testId}"]`);
    return Boolean(element);
  });
}

// Add type definitions for Cypress commands
declare global {
  namespace Cypress {
    interface Chainable {
      /**
       * Log all test IDs in the DOM
       */
      logAllTestIds(): void;

      /**
       * Check if a test ID exists in the DOM
       */
      testIdExists(testId: string): Chainable<boolean>;
    }
  }
}

/**
 * Register these as Cypress commands
 */
Cypress.Commands.add("logAllTestIds", logAllTestIds);
Cypress.Commands.add("testIdExists", testIdExists);
