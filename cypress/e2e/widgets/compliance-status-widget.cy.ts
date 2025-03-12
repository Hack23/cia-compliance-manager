import {
  SECURITY_LEVELS,
  FRAMEWORK_TEST_IDS,
  COMPLIANCE_STATUS,
} from "../../support/constants";
import { testWidgetUpdatesWithSecurityLevels } from "../../support/test-patterns";

describe("Compliance Status Widget", () => {
  beforeEach(() => {
    cy.visit("/");
    cy.ensureAppLoaded();
  });

  it("shows compliance status for regulatory requirements", () => {
    // Set high security
    cy.setSecurityLevels(
      SECURITY_LEVELS.HIGH,
      SECURITY_LEVELS.HIGH,
      SECURITY_LEVELS.HIGH
    );

    // Find compliance widget using DOM-verified test ID
    cy.get('[data-testid="compliance-status-widget"]')
      .should("exist")
      .scrollIntoView();

    // Verify compliance content
    cy.verifyContentPresent([/compliance|framework|regulation|requirement/i]);
  });

  it("indicates which specific frameworks are compliant", () => {
    // Set security levels
    cy.setSecurityLevels(
      SECURITY_LEVELS.HIGH,
      SECURITY_LEVELS.HIGH,
      SECURITY_LEVELS.HIGH
    );

    // Find compliance widget using DOM-verified test ID
    cy.get('[data-testid="compliance-status-widget"]')
      .should("exist")
      .scrollIntoView();

    // Look for specific frameworks or generic framework indicators
    cy.verifyContentPresent([/gdpr|hipaa|pci|iso|nist|complian/i]);
  });

  it("provides business context for compliance requirements", () => {
    // Set security levels
    cy.setSecurityLevels(
      SECURITY_LEVELS.MODERATE,
      SECURITY_LEVELS.MODERATE,
      SECURITY_LEVELS.MODERATE
    );

    // Find compliance widget using DOM-verified test ID
    cy.get('[data-testid="compliance-status-widget"]')
      .should("exist")
      .scrollIntoView();

    // Check for business context content
    cy.verifyContentPresent([/business|context|impact|requirement/i]);
  });

  it("updates compliance status when security levels change", () => {
    // Use test pattern for widget updates with DOM-verified test ID
    testWidgetUpdatesWithSecurityLevels(
      '[data-testid="compliance-status-widget"]',
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
});
