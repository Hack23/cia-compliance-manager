import { SECURITY_LEVELS } from "../../support/constants";

/**
 * Standard setup for all widget tests
 * This helps avoid issues with before all hooks
 * @param widgetName Name of the widget to test
 */
export function setupWidgetTest(widgetName: string) {
  beforeEach(() => {
    cy.visit("/");
    cy.ensureAppLoaded();

    // Add style to make all widgets visible
    cy.document().then((doc) => {
      const style = doc.createElement("style");
      style.innerHTML = `
        * {
          overflow: visible !important;
          visibility: visible !important;
          opacity: 1 !important;
        }
      `;
      doc.head.appendChild(style);
    });
  });
}

/**
 * Standard verification for widget existence and visibility
 * @param widgetName Name of the widget to find
 */
export function verifyWidgetExists(widgetName: string) {
  it(`should display the ${widgetName} widget`, () => {
    cy.findWidget(widgetName)
      .should("exist")
      .scrollIntoView()
      .should("be.visible");
  });
}

/**
 * Standard test for widget updating with security level changes
 * @param widgetName Name of the widget to test
 * @param contentPatterns Array of patterns to verify in the widget content
 */
export function verifyWidgetUpdatesWithSecurityLevels(
  widgetName: string,
  contentPatterns: RegExp[]
) {
  it(`updates ${widgetName} content when security levels change`, () => {
    // Find widget
    cy.findWidget(widgetName).scrollIntoView();

    // Set initial security levels
    cy.setSecurityLevels(
      SECURITY_LEVELS.LOW,
      SECURITY_LEVELS.LOW,
      SECURITY_LEVELS.LOW
    );

    // Store initial content
    cy.findWidget(widgetName).invoke("text").as("lowLevelContent");

    // Set high security levels
    cy.setSecurityLevels(
      SECURITY_LEVELS.HIGH,
      SECURITY_LEVELS.HIGH,
      SECURITY_LEVELS.HIGH
    );

    // Wait for updates
    cy.wait(500);

    // Verify content changed
    cy.get("@lowLevelContent").then((lowLevelContent) => {
      cy.findWidget(widgetName)
        .invoke("text")
        .should("not.eq", lowLevelContent);

      // Verify content patterns
      cy.findWidget(widgetName).within(() => {
        contentPatterns.forEach((pattern) => {
          cy.contains(pattern).should("exist");
        });
      });
    });
  });
}

/**
 * Export standard testing patterns for widgets
 */
export const standardWidgetTests = {
  setupWidgetTest,
  verifyWidgetExists,
  verifyWidgetUpdatesWithSecurityLevels,
};
