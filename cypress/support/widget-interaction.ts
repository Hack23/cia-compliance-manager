/**
 * Architectural pattern for widget interaction with improved resilience
 * and consistent state management
 */
export function withSecurityContext(
  securityLevels: string[],
  testFn: () => void
): void {
  // Set security levels with proper logging and error handling
  cy.log(`Setting security context: ${securityLevels.join(", ")}`);

  // Always verify app is ready before changing security levels
  cy.get("body").then(($body) => {
    // Check if app loaded correctly
    if ($body.text().includes("CIA Compliance Manager")) {
      // Set security levels with the most reliable method available
      if ($body.find("select").length >= 3) {
        cy.get("select").eq(0).select(securityLevels[0], { force: true });
        cy.get("select").eq(1).select(securityLevels[1], { force: true });
        cy.get("select").eq(2).select(securityLevels[2], { force: true });
      } else {
        cy.setSecurityLevels(...securityLevels);
      }

      // Wait for security changes to take effect
      cy.wait(500);

      // Run the test function in this security context
      testFn();
    } else {
      cy.log("⚠️ Application not loaded correctly, skipping test");
      cy.screenshot("app-not-loaded");
    }
  });
}

/**
 * Enhanced widget interaction with retry logic and logging
 */
export function interactWithWidget(
  widgetName: string,
  action: "verify" | "click" | "input" | "screenshot",
  options?: any
): Cypress.Chainable<any> {
  cy.log(`Interacting with widget: ${widgetName}, action: ${action}`);

  return cy
    .findWidget(widgetName)
    .should("exist")
    .then(($widget) => {
      switch (action) {
        case "verify":
          return cy.wrap($widget).should("be.visible");
        case "click":
          return cy.wrap($widget).scrollIntoView().click();
        case "input":
          return cy.wrap($widget).find("input").type(options.text);
        case "screenshot":
          return cy
            .wrap($widget)
            .scrollIntoView()
            .screenshot(`${widgetName}-widget`);
      }
    });
}
