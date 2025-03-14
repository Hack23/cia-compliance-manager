import { SECURITY_LEVELS } from "../../support/constants";
import {
  setupWidgetTest,
  verifyWidgetExists,
  verifyWidgetUpdatesWithSecurityLevels,
} from "./base-widget-tests";

/**
 * Standard test suite for Security Summary widget
 * Tests widget existence, content updates, security level changes
 */
describe("Security Summary Widget", () => {
  // Use standard setup for widget tests
  setupWidgetTest("security-summary");

  // Basic existence test
  verifyWidgetExists("security-summary");

  // Test security level changes affect widget content with specific patterns
  verifyWidgetUpdatesWithSecurityLevels("security-summary", [
    /security/i,
    /classification|protection|sensitivity|level/i,
  ]);

  // Test specific sections within the widget
  it("displays CIA classification details", () => {
    cy.findWidget("security-summary").scrollIntoView();

    // Set moderate security levels to test comprehensive display
    cy.setSecurityLevels(
      SECURITY_LEVELS.MODERATE,
      SECURITY_LEVELS.MODERATE,
      SECURITY_LEVELS.MODERATE
    );

    // Verify classification sections
    cy.findWidget("security-summary").within(() => {
      // Verify CIA sections exist (fail fast if any missing)
      cy.get(`[data-testid*="confidentiality"]`).should("exist");
      cy.get(`[data-testid*="integrity"]`).should("exist");
      cy.get(`[data-testid*="availability"]`).should("exist");
    });
  });

  // Test recommendations section appears in high security mode
  it("shows security recommendations for high security levels", () => {
    cy.findWidget("security-summary").scrollIntoView();

    // Set high security levels
    cy.setSecurityLevels(
      SECURITY_LEVELS.HIGH,
      SECURITY_LEVELS.HIGH,
      SECURITY_LEVELS.HIGH
    );

    // Verify recommendations section
    cy.findWidget("security-summary").within(() => {
      cy.contains(/recommendation|suggested|advised/i).should("exist");
    });
  });

  // Test technical details toggle if present
  it("toggles technical details section if available", () => {
    cy.findWidget("security-summary").scrollIntoView();

    // Try to find and use the toggle if it exists
    cy.findWidget("security-summary").then(($widget) => {
      const hasToggle =
        $widget.find('[data-testid*="toggle"]').length > 0 ||
        $widget.find('button:contains("Technical")').length > 0;

      if (hasToggle) {
        // Find and click the toggle
        cy.contains(/technical|details|more/i).click();

        // Verify expanded content
        cy.wait(300); // Wait for animation
        cy.contains(/implementation|specification|requirement/i).should(
          "be.visible"
        );
      } else {
        cy.log("No technical details toggle found - test skipped");
      }
    });
  });
});
