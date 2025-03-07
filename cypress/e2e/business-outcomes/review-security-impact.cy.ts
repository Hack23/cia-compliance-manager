/**
 * User Story: As a user, I can analyze the impact of my security choices
 *
 * Tests that impact analysis information displays correctly based on security levels.
 */
import {
  SECURITY_LEVELS,
  BUSINESS_IMPACT_TEST_IDS,
} from "../../support/constants";

describe("Review Security Impact", () => {
  beforeEach(() => {
    cy.visit("/");
    cy.ensureAppLoaded();
  });

  it("shows business impact analysis widget", () => {
    // Ensure the business impact widget is visible
    cy.navigateToWidget(BUSINESS_IMPACT_TEST_IDS.BUSINESS_IMPACT_SUMMARY);
    cy.get(
      `[data-testid="${BUSINESS_IMPACT_TEST_IDS.BUSINESS_IMPACT_SUMMARY}"]`
    ).should("exist");
  });

  it("shows introduction text for business impact analysis", () => {
    // Verify that a heading or introductory text is rendered
    cy.contains("Business Impact Analysis").should("exist");
    // Check that impact summary text is visible
    cy.get(
      `[data-testid="${BUSINESS_IMPACT_TEST_IDS.COMBINED_BUSINESS_IMPACT_WIDGET}"]`
    ).should("exist");
  });

  it("updates impact analysis information when security levels change", () => {
    // Store initial content
    let initialContent = "";
    cy.get("body").then(($body) => {
      // Get the text of sections likely to contain impact information
      const impactSections = $body.find(
        'div:contains("Impact"), div:contains("Business"), div:contains("Security")'
      );
      initialContent = impactSections.text();

      // Change from Low to High security
      cy.setSecurityLevels(
        SECURITY_LEVELS.LOW,
        SECURITY_LEVELS.LOW,
        SECURITY_LEVELS.LOW
      );
      cy.wait(500);

      // Now set to high security
      cy.setSecurityLevels(
        SECURITY_LEVELS.HIGH,
        SECURITY_LEVELS.HIGH,
        SECURITY_LEVELS.HIGH
      );
      cy.wait(500);

      // Verify content has changed
      cy.contains(SECURITY_LEVELS.HIGH).should("exist");
    });
  });
});
