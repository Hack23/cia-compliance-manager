import { SECURITY_LEVELS } from "../../support/constants";
import { setupWidgetTest, verifyWidgetExists } from "./base-widget-tests";
import { testSecurityLevelChanges } from "./widget-test-helper";

describe("Integrity Impact Widget", () => {
  // Use standard setup for widget tests
  setupWidgetTest("integrity-impact");

  // Basic existence test
  verifyWidgetExists("integrity-impact");

  // Test security level changes affect widget content
  it("updates content when security levels change", () => {
    testSecurityLevelChanges("integrity-impact");
  });

  // Test specific integrity impacts with high security
  it("displays detailed integrity impacts with high security", () => {
    cy.findWidget("integrity-impact").scrollIntoView();

    // Set high integrity level
    cy.setSecurityLevels(
      SECURITY_LEVELS.MODERATE,
      SECURITY_LEVELS.HIGH, // High integrity
      SECURITY_LEVELS.MODERATE
    );

    cy.wait(1000); // Wait for UI updates

    // Verify high integrity content
    cy.findWidget("integrity-impact").within(() => {
      // Look for integrity-specific terms
      cy.contains(/accuracy|validation|authenticity|correct|trusted/i).should(
        "exist"
      );
    });
  });

  // Test integrity recommendations
  it("provides appropriate integrity recommendations", () => {
    cy.findWidget("integrity-impact").scrollIntoView();

    // Set all security levels high
    cy.setSecurityLevels(
      SECURITY_LEVELS.HIGH,
      SECURITY_LEVELS.HIGH,
      SECURITY_LEVELS.HIGH
    );

    cy.wait(1000); // Wait for UI updates

    // Verify recommendations content
    cy.findWidget("integrity-impact").within(() => {
      // Look for recommendation-type content
      cy.contains(/recommend|suggest|practice|implement/i).should("exist");
    });
  });
});
