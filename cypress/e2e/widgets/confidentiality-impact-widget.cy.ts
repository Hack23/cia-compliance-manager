/**
 * User Story: As a user, I can view confidentiality impact analysis
 *
 * Tests the Confidentiality Impact Widget functionality
 */
import { SECURITY_LEVELS } from "../../support/constants";
import { setupWidgetTest, verifyWidgetExists } from "./base-widget-tests";
import { testSecurityLevelChanges } from "./widget-test-helper";

describe("Confidentiality Impact Widget", () => {
  // Use standard setup for widget tests
  setupWidgetTest("confidentiality-impact");

  // Basic existence test
  verifyWidgetExists("confidentiality-impact");

  // Test security level changes affect widget content
  it("updates content when security levels change", () => {
    testSecurityLevelChanges("confidentiality-impact");
  });

  // Test specific confidentiality impacts with high security
  it("displays detailed confidentiality impacts with high security", () => {
    cy.findWidget("confidentiality-impact").scrollIntoView();

    // Set high confidentiality level
    cy.setSecurityLevels(
      SECURITY_LEVELS.MODERATE,
      SECURITY_LEVELS.MODERATE,
      SECURITY_LEVELS.HIGH // High confidentiality
    );

    cy.wait(1000); // Wait for UI updates

    // Verify high confidentiality content
    cy.findWidget("confidentiality-impact").within(() => {
      // Look for confidentiality-specific terms
      cy.contains(
        /privacy|data protection|sensitive|confidential|encrypt/i
      ).should("exist");
    });
  });

  // Test confidentiality recommendations
  it("provides appropriate confidentiality recommendations", () => {
    cy.findWidget("confidentiality-impact").scrollIntoView();

    // Set all security levels high
    cy.setSecurityLevels(
      SECURITY_LEVELS.HIGH,
      SECURITY_LEVELS.HIGH,
      SECURITY_LEVELS.HIGH
    );

    cy.wait(1000); // Wait for UI updates

    // Verify recommendations content
    cy.findWidget("confidentiality-impact").within(() => {
      // Look for recommendation-type content
      cy.contains(/recommend|suggest|practice|implement/i).should("exist");
    });
  });
});
