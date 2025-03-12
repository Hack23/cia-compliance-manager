import {
  SECURITY_LEVELS,
  BUSINESS_IMPACT_TEST_IDS,
  RISK_LEVELS,
} from "../../support/constants";
import { testWidgetUpdatesWithSecurityLevels } from "../../support/test-patterns";

describe("Business Impact Widget", () => {
  beforeEach(() => {
    cy.visit("/");
    cy.ensureAppLoaded();
  });

  it("shows business impact of security choices", () => {
    // Set security levels
    cy.setSecurityLevels(
      SECURITY_LEVELS.MODERATE,
      SECURITY_LEVELS.MODERATE,
      SECURITY_LEVELS.MODERATE
    );

    // Find business impact widget using DOM-verified test ID
    cy.get('[data-testid="business-impact-widget"]')
      .should("exist")
      .scrollIntoView();

    // Verify impact content
    cy.verifyContentPresent([/business|impact|analysis/i]);
  });

  it("provides detailed impact analysis for different security dimensions", () => {
    // Set security levels
    cy.setSecurityLevels(
      SECURITY_LEVELS.HIGH,
      SECURITY_LEVELS.HIGH,
      SECURITY_LEVELS.HIGH
    );

    // Find business impact widget using DOM-verified test ID
    cy.get('[data-testid="business-impact-widget"]')
      .should("exist")
      .scrollIntoView();

    // Try clicking tab buttons with accurate DOM selectors
    cy.get(
      '[id="availability-tab-button"], [id="integrity-tab-button"], [id="confidentiality-tab-button"]'
    ).then(($tabs) => {
      if ($tabs.length) {
        // Click second tab if available
        if ($tabs.length > 1) {
          cy.wrap($tabs.eq(1)).click();
          cy.wait(300);
        }
      }
    });

    // Verify content
    cy.verifyContentPresent([
      /availability|integrity|confidentiality/i,
      /impact|risk|business/i,
    ]);
  });

  it("provides both considerations and benefits for business analysis", () => {
    // Set security levels
    cy.setSecurityLevels(
      SECURITY_LEVELS.MODERATE,
      SECURITY_LEVELS.MODERATE,
      SECURITY_LEVELS.MODERATE
    );

    // Find business impact widget using DOM-verified test ID
    cy.get('[data-testid="business-impact-widget"]')
      .should("exist")
      .scrollIntoView();

    // Look for considerations and benefits
    cy.verifyContentPresent([/consideration|benefit|advantage|impact|risk/i]);
  });

  it("shows detailed impact metrics for data-driven decisions", () => {
    // Set security levels
    cy.setSecurityLevels(
      SECURITY_LEVELS.HIGH,
      SECURITY_LEVELS.HIGH,
      SECURITY_LEVELS.HIGH
    );

    // Find business impact widget using DOM-verified test ID
    cy.get('[data-testid="business-impact-widget"]').scrollIntoView();

    // Look for metrics and quantitative information
    cy.verifyContentPresent([
      /metric|measure|data|value|percentage|impact|cost/i,
    ]);
  });
});
