/**
 * User Story: As a user, I can view availability impact analysis
 *
 * Tests the Availability Impact Widget functionality
 */
import { SECURITY_LEVELS } from "../../support/constants";
import testPatterns from "../../support/test-patterns";

describe("Availability Impact Widget", () => {
  beforeEach(() => {
    cy.visit("/");
    cy.ensureAppLoaded();
  });

  it("displays availability impact analysis", () => {
    cy.findWidget("availability-impact")
      .should("exist")
      .scrollIntoView()
      .should("be.visible");

    // Verify it contains availability-related content
    cy.verifyContentPresent([
      /availability|uptime|recovery/i,
      /impact|effect|consequence/i,
    ]);
  });

  it("updates content when security levels change", () => {
    testPatterns.testWidgetUpdatesWithSecurityLevels(
      '[data-testid*="availability-impact"]',
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
      }
    );
  });

  it("shows technical metrics and recommendations", () => {
    // Set moderate security level
    cy.setSecurityLevels(
      SECURITY_LEVELS.MODERATE,
      SECURITY_LEVELS.MODERATE,
      SECURITY_LEVELS.MODERATE
    );

    // Check for availability metrics
    cy.findWidget("availability-impact")
      .scrollIntoView()
      .should("contain", /rto|rpo|mttr|uptime/i);

    // Look for recommendation content
    cy.verifyContentPresent([/recommend|suggest/i]);
  });

  it("displays business impact information", () => {
    // Set security levels
    cy.setSecurityLevels(
      SECURITY_LEVELS.HIGH,
      SECURITY_LEVELS.MODERATE,
      SECURITY_LEVELS.LOW
    );

    // Check for business impact content
    cy.findWidget("availability-impact").scrollIntoView();

    // Look for business impact content
    cy.verifyContentPresent([
      /business impact|effect on business|operational impact/i,
    ]);
  });
});
