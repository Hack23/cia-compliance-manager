/**
 * User Story: As a user, I can view a summary of CIA impacts across all dimensions
 *
 * Tests the CIA Impact Summary Widget functionality
 */
import { SECURITY_LEVELS } from "../../support/constants";
import { setupWidgetTest, verifyWidgetExists } from "./base-widget-tests";
import { testSecurityLevelChanges } from "./widget-test-helper";

describe("CIA Impact Summary Widget", () => {
  // Standard setup
  setupWidgetTest("cia-impact-summary");

  // Basic existence test
  verifyWidgetExists("cia-impact-summary");

  // Test standard security level changes
  it("updates content when security levels change", () => {
    testSecurityLevelChanges("cia-impact-summary");
  });

  // Test combined CIA impact with high security
  it("shows comprehensive CIA impact summary at high security levels", () => {
    cy.findWidget("cia-impact-summary").scrollIntoView();

    // Set high security levels
    cy.setSecurityLevels(
      SECURITY_LEVELS.HIGH,
      SECURITY_LEVELS.HIGH,
      SECURITY_LEVELS.HIGH
    );

    // Verify contains details for all CIA components
    cy.findWidget("cia-impact-summary").within(() => {
      cy.contains(/availability|uptime|recovery/i).should("exist");
      cy.contains(/integrity|accuracy|valid/i).should("exist");
      cy.contains(/confidential|privacy|sensitive/i).should("exist");

      // Verify status indicators
      cy.get(
        '[data-testid*="status"], [class*="status"], [data-testid*="indicator"], [class*="indicator"]'
      ).should("have.length.at.least", 2);
    });
  });

  // Test asymmetric security levels
  it("properly displays mixed security levels", () => {
    cy.findWidget("cia-impact-summary").scrollIntoView();

    // Set mixed security levels
    cy.setSecurityLevels(
      SECURITY_LEVELS.HIGH,
      SECURITY_LEVELS.LOW,
      SECURITY_LEVELS.MODERATE
    );

    cy.wait(300);

    // Verify that each component shows the correct level
    cy.findWidget("cia-impact-summary").within(() => {
      // Check availability section shows high
      cy.contains(/availability/i)
        .parent()
        .contains(SECURITY_LEVELS.HIGH)
        .should("exist");

      // Check integrity section shows low
      cy.contains(/integrity/i)
        .parent()
        .contains(SECURITY_LEVELS.LOW)
        .should("exist");

      // Check confidentiality section shows moderate
      cy.contains(/confidentiality/i)
        .parent()
        .contains(SECURITY_LEVELS.MODERATE)
        .should("exist");
    });
  });

  // Test section visibility
  it("displays all required CIA sections", () => {
    cy.findWidget("cia-impact-summary").scrollIntoView();

    cy.setSecurityLevels(
      SECURITY_LEVELS.MODERATE,
      SECURITY_LEVELS.MODERATE,
      SECURITY_LEVELS.MODERATE
    );

    // Verify all three CIA sections exist - fail fast if any missing
    cy.findWidget("cia-impact-summary").within(() => {
      ["availability", "integrity", "confidentiality"].forEach((component) => {
        cy.get(`[data-testid*="${component}"], [class*="${component}"]`)
          .should("exist")
          .should("be.visible");
      });
    });
  });
});
