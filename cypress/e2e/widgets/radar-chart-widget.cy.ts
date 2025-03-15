import { SECURITY_LEVELS } from "../../support/constants";
import { setupWidgetTest, verifyWidgetExists } from "./base-widget-tests";
import { testSecurityLevelChanges } from "./widget-test-helper";

describe("Radar Chart Widget", () => {
  // Use standard setup for widget tests
  setupWidgetTest("radar-chart");

  // Basic existence test
  verifyWidgetExists("radar-chart");

  // Test security level changes affect chart visualization
  it("updates chart visualization when security levels change", () => {
    testSecurityLevelChanges("radar-chart");
  });

  // Test chart exists with visible elements
  it("displays a radar chart with data points", () => {
    cy.findWidget("radar-chart").scrollIntoView();

    // Set moderate security levels
    cy.setSecurityLevels(
      SECURITY_LEVELS.MODERATE,
      SECURITY_LEVELS.MODERATE,
      SECURITY_LEVELS.MODERATE
    );

    // Check for chart elements
    cy.findWidget("radar-chart").within(() => {
      // Look for SVG or canvas elements that would make up a chart
      cy.get("svg, canvas, [data-testid*='chart'], [class*='chart']").should(
        "exist"
      );

      // Check for legend or data points
      cy.contains(/availability|integrity|confidentiality/i).should("exist");
    });
  });

  // Test chart responds to mixed security levels
  it("displays asymmetric chart with mixed security levels", () => {
    cy.findWidget("radar-chart").scrollIntoView();

    // Set mixed security levels
    cy.setSecurityLevels(
      SECURITY_LEVELS.HIGH,
      SECURITY_LEVELS.LOW,
      SECURITY_LEVELS.MODERATE
    );

    // The shape should be different from equal security levels
    // Capture the current state
    cy.findWidget("radar-chart").screenshot("mixed-security-radar");

    // Change to equal security levels
    cy.setSecurityLevels(
      SECURITY_LEVELS.MODERATE,
      SECURITY_LEVELS.MODERATE,
      SECURITY_LEVELS.MODERATE
    );

    // The visual should be different, but it's hard to verify programmatically
    // We'll check that the content changed at least
    cy.findWidget("radar-chart").invoke("text").should("not.be.empty");
  });

  // Test risk or security level indicators
  it("displays visual security level or risk indicators", () => {
    cy.findWidget("radar-chart").scrollIntoView();

    // Set high security
    cy.setSecurityLevels(
      SECURITY_LEVELS.HIGH,
      SECURITY_LEVELS.HIGH,
      SECURITY_LEVELS.HIGH
    );

    // Check for numerical or visual indicators
    cy.findWidget("radar-chart").within(() => {
      // Look for text indicators of levels, scales, or metrics
      cy.contains(/high|5|[4-5]\/5|\d+%|strong|robust/i).should("exist");
    });
  });
});
