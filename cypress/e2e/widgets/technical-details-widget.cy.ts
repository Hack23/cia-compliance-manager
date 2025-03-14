import { SECURITY_LEVELS } from "../../support/constants";
import testPatterns from "../../support/test-patterns";

describe("Technical Details Widget", () => {
  beforeEach(() => {
    cy.visit("/");
    cy.ensureAppLoaded();
  });

  it("displays technical implementation details", () => {
    cy.findWidget("technical")
      .should("exist")
      .and("be.visible")
      .scrollIntoView();

    // Verify it contains technical content
    cy.verifyWidgetContent("technical", [
      /technical|implementation|configuration|setup/i,
      /guide|detail|specification/i,
    ]);
  });

  it("updates technical details when security levels change", () => {
    // Use reusable test pattern
    testPatterns.testTechnicalDetailsWithSecurityLevels();
  });

  it("has tabs for different CIA components", () => {
    cy.findWidget("technical").scrollIntoView();

    // Test tab navigation
    testPatterns.testTabNavigation('[data-testid="technical-details-widget"]');
  });

  it("shows implementation steps for selected security level", () => {
    // Set moderate security levels
    cy.setSecurityLevels(
      SECURITY_LEVELS.MODERATE,
      SECURITY_LEVELS.MODERATE,
      SECURITY_LEVELS.MODERATE
    );

    cy.findWidget("technical").scrollIntoView();

    // Look for implementation steps content
    cy.verifyContentPresent([/step|instruction|procedure|implement/i]);
  });
});
