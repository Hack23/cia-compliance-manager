import { SECURITY_LEVELS } from "../../support/constants";
import testPatterns from "../../support/test-patterns";

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

describe("Security Summary Widget Tests", () => {
  beforeEach(() => {
    cy.visit("/");
    cy.ensureAppLoaded();
  });

  it("displays security summary information", () => {
    cy.findWidget("security-summary").should("exist").and("be.visible");
  });

  it("updates content when security levels change", () => {
    // Use the test pattern for verifying widget updates
    testPatterns.testWidgetUpdatesWithSecurityLevels(
      '[data-testid="widget-security-summary"]',
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

  it("shows recommendation based on security levels", () => {
    // Set low security
    cy.setSecurityLevels(
      SECURITY_LEVELS.LOW,
      SECURITY_LEVELS.LOW,
      SECURITY_LEVELS.LOW
    );

    // Verify recommendation is shown
    cy.findWidget("security-summary")
      .find("[data-testid='security-recommendation']")
      .should("exist")
      .and("be.visible");

    // Set high security
    cy.setSecurityLevels(
      SECURITY_LEVELS.HIGH,
      SECURITY_LEVELS.HIGH,
      SECURITY_LEVELS.HIGH
    );

    // Verify recommendation changes
    cy.findWidget("security-summary")
      .find("[data-testid='security-recommendation']")
      .should("exist")
      .invoke("text")
      .should("not.be.empty");
  });

  it("displays proper security icon based on levels", () => {
    cy.setSecurityLevels(
      SECURITY_LEVELS.MODERATE,
      SECURITY_LEVELS.MODERATE,
      SECURITY_LEVELS.MODERATE
    );

    // Verify security icon exists
    cy.findWidget("security-summary")
      .find("[data-testid='security-icon']")
      .should("exist");
  });
});
