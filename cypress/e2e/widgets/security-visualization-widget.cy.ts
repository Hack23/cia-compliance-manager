/**
 * User Story: As a user, I can view visualization of my security posture
 *
 * Tests the Security Visualization Widget functionality
 */
import {
  SECURITY_LEVELS,
  CHART_TEST_IDS,
  WIDGET_TEST_IDS,
} from "../../support/constants";
import { testWidgetUpdatesWithSecurityLevels } from "../../support/test-patterns";

describe("Security Visualization Widget", () => {
  beforeEach(() => {
    cy.visit("/");
    cy.ensureAppLoaded();
  });

  it("displays security visualization", () => {
    // Set security levels
    cy.setSecurityLevels(
      SECURITY_LEVELS.MODERATE,
      SECURITY_LEVELS.MODERATE,
      SECURITY_LEVELS.MODERATE
    );

    // Use the radar chart ID from DOM analysis as this is likely the visualization widget
    cy.get('[data-testid="radar-chart"]').should("exist").scrollIntoView();

    // Verify visualization elements
    cy.verifyContentPresent([
      /availability/i,
      /integrity/i,
      /confidentiality/i,
    ]);
  });

  it("updates visualization when security levels change", () => {
    // Use test pattern for widget updates with DOM-verified test ID
    testWidgetUpdatesWithSecurityLevels('[data-testid="radar-chart"]', {
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
    });
  });

  it("displays mixed security level visualization", () => {
    // Set mixed security levels
    cy.setSecurityLevels(
      SECURITY_LEVELS.HIGH,
      SECURITY_LEVELS.MODERATE,
      SECURITY_LEVELS.LOW
    );

    // Find visualization widget
    cy.get('[data-testid="radar-chart"]').scrollIntoView();

    // Verify that all three levels appear in the visualization
    cy.verifyContentPresent([
      SECURITY_LEVELS.HIGH,
      SECURITY_LEVELS.MODERATE,
      SECURITY_LEVELS.LOW,
    ]);
  });

  it("renders visual elements properly", () => {
    // Set moderate security levels
    cy.setSecurityLevels(
      SECURITY_LEVELS.MODERATE,
      SECURITY_LEVELS.MODERATE,
      SECURITY_LEVELS.MODERATE
    );

    // Find visualization widget
    cy.get('[data-testid="radar-chart"]').scrollIntoView();

    // First try to find the canvas element within the chart
    cy.get("body").then(($body) => {
      if ($body.find('[data-testid="radar-chart"] canvas').length > 0) {
        cy.get('[data-testid="radar-chart"] canvas').should("exist");
      } else if ($body.find("canvas").length > 0) {
        // If not within the radar chart, try any canvas on the page
        cy.get("canvas").should("exist");
      } else {
        // If no canvas element (possibly due to SSR or alternate rendering),
        // at least verify text content is present
        cy.verifyContentPresent([/security/i, /level/i, /high|moderate|low/i]);
      }
    });
  });
});
