import { SECURITY_LEVELS, SUMMARY_TEST_IDS } from "../../support/constants";
import {
  setupWidgetTest,
  testSecurityLevelChanges,
} from "./widget-test-helper";

describe("Security Summary Widget", () => {
  beforeEach(() => {
    cy.visit("/");
    cy.ensureAppLoaded();
  });

  it("displays current security posture summary", () => {
    // Find security summary widget using DOM-verified test ID
    cy.get('[data-testid="security-summary-container"]')
      .should("exist")
      .scrollIntoView();

    // Verify security-related content is present
    cy.verifyContentPresent([/security/i, /level/i, /rating|summary/i]);
  });

  it("updates security summary when security levels change", () => {
    // Set initial security levels
    cy.setSecurityLevels(
      SECURITY_LEVELS.LOW,
      SECURITY_LEVELS.LOW,
      SECURITY_LEVELS.LOW
    );

    // Get initial content
    cy.get('[data-testid="security-summary-container"]')
      .invoke("text")
      .then((initialText) => {
        // Change security levels
        cy.setSecurityLevels(
          SECURITY_LEVELS.HIGH,
          SECURITY_LEVELS.HIGH,
          SECURITY_LEVELS.HIGH
        );

        // Verify content changed
        cy.get('[data-testid="security-summary-container"]')
          .invoke("text")
          .should("not.eq", initialText);
      });
  });

  it("shows security recommendations based on current levels", () => {
    // Set moderate security levels
    cy.setSecurityLevels(
      SECURITY_LEVELS.MODERATE,
      SECURITY_LEVELS.MODERATE,
      SECURITY_LEVELS.MODERATE
    );

    // Find security summary widget using DOM-verified test ID
    cy.get('[data-testid="security-summary-container"]')
      .should("exist")
      .scrollIntoView();

    // Check for recommendations section
    cy.verifyContentPresent([/recommend|suggest|action|best practice/i]);
  });

  it("displays CIA component security levels", () => {
    // Set different security levels for each component
    cy.setSecurityLevels(
      SECURITY_LEVELS.HIGH,
      SECURITY_LEVELS.MODERATE,
      SECURITY_LEVELS.LOW
    );

    // Verify each level appears in the summary
    cy.get('[data-testid="security-summary-container"]').scrollIntoView();

    cy.verifyContentPresent([
      SECURITY_LEVELS.HIGH,
      SECURITY_LEVELS.MODERATE,
      SECURITY_LEVELS.LOW,
      /availability|integrity|confidentiality/i,
    ]);
  });
});
