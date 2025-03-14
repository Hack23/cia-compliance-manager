import {
  COMPLIANCE_EXPECTATIONS,
  SECURITY_LEVELS,
} from "../../support/constants";
import { setupWidgetTest, verifyWidgetExists } from "./base-widget-tests";
import { testSecurityLevelChanges } from "./widget-test-helper";

describe("Compliance Status Widget", () => {
  // Use standard setup for widget tests
  setupWidgetTest("compliance-status");

  // Basic existence test
  verifyWidgetExists("compliance-status");

  // Test standard security level changes
  it("updates compliance content with security level changes", () => {
    testSecurityLevelChanges("compliance-status");
  });

  // Test specific compliance expectations for different security levels
  it("shows correct compliance status for LOW security", () => {
    cy.findWidget("compliance-status").scrollIntoView();

    // Set LOW security levels
    cy.setSecurityLevels(
      SECURITY_LEVELS.LOW,
      SECURITY_LEVELS.LOW,
      SECURITY_LEVELS.LOW
    );

    // Verify expected compliant frameworks
    COMPLIANCE_EXPECTATIONS[SECURITY_LEVELS.LOW].compliant.forEach(
      (framework) => {
        cy.findWidget("compliance-status").contains(framework).should("exist");
      }
    );

    // Verify at least some non-compliant frameworks
    COMPLIANCE_EXPECTATIONS[SECURITY_LEVELS.LOW].nonCompliant
      .slice(0, 2)
      .forEach((framework) => {
        cy.findWidget("compliance-status").contains(framework).should("exist");
      });
  });

  // Test high security level compliance
  it("shows increased compliance for HIGH security", () => {
    cy.findWidget("compliance-status").scrollIntoView();

    // Set HIGH security levels
    cy.setSecurityLevels(
      SECURITY_LEVELS.HIGH,
      SECURITY_LEVELS.HIGH,
      SECURITY_LEVELS.HIGH
    );

    // Verify expected compliant frameworks for HIGH
    COMPLIANCE_EXPECTATIONS[SECURITY_LEVELS.HIGH].compliant.forEach(
      (framework) => {
        cy.findWidget("compliance-status")
          .contains(framework)
          .should("exist")
          .parent()
          .contains(/compliant|satisfied|met/i)
          .should("exist");
      }
    );
  });

  // Test mixed security levels to ensure proper display
  it("handles mixed security levels appropriately", () => {
    cy.findWidget("compliance-status").scrollIntoView();

    // Set mixed security levels
    cy.setSecurityLevels(
      SECURITY_LEVELS.HIGH,
      SECURITY_LEVELS.MODERATE,
      SECURITY_LEVELS.LOW
    );

    // Verify some compliance status is visible
    cy.findWidget("compliance-status").within(() => {
      cy.contains(/compliance|status|framework/i).should("exist");
      cy.contains(/partial|mixed|some/i).should("exist");
    });
  });
});
