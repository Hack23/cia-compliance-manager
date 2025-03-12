import { SECURITY_LEVELS } from "../../support/constants";
import {
  setupWidgetTest,
  testSecurityLevelChanges,
} from "./widget-test-helper";

describe("Security Profile Widget", () => {
  beforeEach(() => {
    cy.visit("/");
    cy.ensureAppLoaded();
  });

  it("allows selecting security levels for all CIA components", () => {
    // Find security level widget
    cy.findWidget("security-level").should("exist").scrollIntoView();

    // Set different levels for each component
    cy.selectSecurityLevelEnhanced("availability", SECURITY_LEVELS.HIGH);
    cy.selectSecurityLevelEnhanced("integrity", SECURITY_LEVELS.MODERATE);
    cy.selectSecurityLevelEnhanced("confidentiality", SECURITY_LEVELS.LOW);

    // Verify content reflects the selections
    cy.verifyContentPresent([
      SECURITY_LEVELS.HIGH,
      SECURITY_LEVELS.MODERATE,
      SECURITY_LEVELS.LOW,
    ]);
  });

  it("displays appropriate descriptions for each security level", () => {
    // Set security levels
    cy.setSecurityLevels(
      SECURITY_LEVELS.MODERATE,
      SECURITY_LEVELS.MODERATE,
      SECURITY_LEVELS.MODERATE
    );

    // Verify descriptions appear
    cy.findWidget("security-level").within(() => {
      cy.get('[data-testid*="description"], [class*="description"]')
        .should("exist")
        .and("be.visible");

      // Check for text indicating description content
      cy.verifyContentPresent([
        /security/i,
        /level/i,
        /protection/i,
        /control/i,
      ]);
    });
  });

  it("reflects changes between different security levels", () => {
    // Use our helper function for testing security level changes
    testSecurityLevelChanges("security-level");
  });
});
