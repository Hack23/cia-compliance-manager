/**
 * User Story: As a user, I can view visualization of my security posture
 *
 * Tests the Security Visualization Widget functionality
 */
import { SECURITY_LEVELS } from "../../support/constants";
import { setupWidgetTest, verifyWidgetExists } from "./base-widget-tests";
import { testSecurityLevelChanges } from "./widget-test-helper";

describe("Security Visualization Widget", () => {
  // Use standard setup for widget tests
  setupWidgetTest("security-visualization");

  // Basic existence test
  verifyWidgetExists("security-visualization");

  // Test security level changes affect visualization
  it("updates visualization when security levels change", () => {
    testSecurityLevelChanges("security-visualization");
  });

  // Test chart/visualization elements appear
  it("displays visual security representation", () => {
    cy.findWidget("security-visualization").scrollIntoView();

    // Set balanced security levels
    cy.setSecurityLevels(
      SECURITY_LEVELS.MODERATE,
      SECURITY_LEVELS.MODERATE,
      SECURITY_LEVELS.MODERATE
    );

    cy.wait(1000); // Wait for UI updates

    // Look for visualization elements
    cy.findWidget("security-visualization").within(() => {
      // Look for chart elements or visualization components
      cy.get("svg, canvas, [data-testid*='chart'], [class*='chart']").should(
        "exist"
      );
    });
  });

  // Test asymmetric security level visualization
  it("visualizes different security levels appropriately", () => {
    cy.findWidget("security-visualization").scrollIntoView();

    // Set mixed security levels
    cy.setSecurityLevels(
      SECURITY_LEVELS.HIGH,
      SECURITY_LEVELS.LOW,
      SECURITY_LEVELS.MODERATE
    );

    cy.wait(1000); // Wait for UI updates

    // Verify the visualization exists after mixed security setting
    cy.findWidget("security-visualization").within(() => {
      cy.get("svg, canvas, [data-testid*='chart'], [class*='chart']").should(
        "exist"
      );
    });
  });
});
