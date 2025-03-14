/**
 * User Story: As a user, I can view a radar chart visualization of CIA security levels
 *
 * Tests the Radar Chart Widget functionality
 */
import { SECURITY_LEVELS } from "../../support/constants";
import testPatterns from "../../support/test-patterns"; // Add this import

describe("Radar Chart Widget", () => {
  beforeEach(() => {
    cy.visit("/");
    cy.ensureAppLoaded();
  });

  it("displays security profile visualization", () => {
    cy.findWidget("radar-chart")
      .should("exist")
      .and("be.visible")
      .scrollIntoView();

    // Verify it contains visualization-related content
    cy.verifyWidgetContent("radar-chart", [
      /profile|visualization|chart/i,
      /security|level/i,
    ]);
  });

  it("updates chart when security levels change", () => {
    testPatterns.testWidgetUpdatesWithSecurityLevels(
      '[data-testid="radar-chart"]',
      {
        initialLevels: [
          SECURITY_LEVELS.LOW,
          SECURITY_LEVELS.LOW,
          SECURITY_LEVELS.LOW,
        ],
        newLevels: [
          SECURITY_LEVELS.HIGH,
          SECURITY_LEVELS.HIGH,
          SECURITY_LEVELS.HIGH,
        ],
        expectTextChange: true,
        // Visual change might be harder to detect in text-based content
        expectVisualChange: false,
      }
    );
  });

  it("shows chart with CIA components", () => {
    cy.findWidget("radar-chart").scrollIntoView();

    // Verify CIA components are shown in the chart
    cy.verifyContentPresent([
      /confidentiality|integrity|availability/i,
      /radar|chart|visualization/i,
    ]);
  });

  it("displays risk assessment information", () => {
    // Set moderate security levels
    cy.setSecurityLevels(
      SECURITY_LEVELS.MODERATE,
      SECURITY_LEVELS.MODERATE,
      SECURITY_LEVELS.MODERATE
    );

    cy.findWidget("radar-chart").scrollIntoView();

    // Look for risk-related content
    cy.verifyContentPresent([/risk|assessment|score/i]);
  });
});
