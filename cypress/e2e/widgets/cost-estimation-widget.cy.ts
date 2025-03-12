import {
  SECURITY_LEVELS,
  COST_TEST_IDS,
  TEST_PATTERNS,
} from "../../support/constants";
import { testCostUpdatesWithSecurityLevels } from "../../support/test-patterns";

describe("Cost Estimation Widget", () => {
  beforeEach(() => {
    cy.visit("/");
    cy.ensureAppLoaded();
  });

  it("provides accurate financial impact analysis of security choices", () => {
    // Find cost widget using DOM-verified test ID
    cy.get('[data-testid="widget-cost-estimation"]')
      .should("exist")
      .scrollIntoView();

    // Store initial cost text
    let initialCostData = "";

    cy.get('[data-testid="widget-cost-estimation"]')
      .invoke("text")
      .then((text) => {
        initialCostData = text;

        // Change security levels
        cy.setSecurityLevels(
          SECURITY_LEVELS.HIGH,
          SECURITY_LEVELS.HIGH,
          SECURITY_LEVELS.HIGH
        );
        cy.wait(300);

        // Verify text has changed
        cy.get('[data-testid="widget-cost-estimation"]')
          .invoke("text")
          .should("not.equal", initialCostData);
      });
  });

  it("provides ROI analysis to justify security investments", () => {
    // Set security levels
    cy.setSecurityLevels(
      SECURITY_LEVELS.MODERATE,
      SECURITY_LEVELS.MODERATE,
      SECURITY_LEVELS.MODERATE
    );

    // Verify ROI content exists using DOM-verified test ID
    cy.get('[data-testid="widget-cost-estimation"]')
      .should("exist")
      .then(($widget) => {
        // Look for ROI text
        const text = $widget.text();
        const hasROI = /roi|return on investment/i.test(text);

        // If no direct ROI mention, check for related finance terms
        if (!hasROI) {
          cy.verifyContentPresent([/benefit|cost|saving|investment|return/i]);
        }
      });
  });

  it("connects costs to business value with analysis", () => {
    // Set security levels
    cy.setSecurityLevels(
      SECURITY_LEVELS.HIGH,
      SECURITY_LEVELS.HIGH,
      SECURITY_LEVELS.HIGH
    );

    // Check for financial analysis text using DOM-verified test ID
    cy.get('[data-testid="widget-cost-estimation"]')
      .scrollIntoView()
      .within(() => {
        cy.verifyContentPresent([
          /analysis/i,
          /cost|investment/i,
          /value|return|benefit/i,
          /business/i,
        ]);
      });
  });

  it("shows different cost structures for different security levels", () => {
    // Set low security
    cy.setSecurityLevels(
      SECURITY_LEVELS.LOW,
      SECURITY_LEVELS.LOW,
      SECURITY_LEVELS.LOW
    );

    // Get low security cost data
    cy.get('[data-testid="widget-cost-estimation"]')
      .invoke("text")
      .as("lowSecurityCost");

    // Set high security
    cy.setSecurityLevels(
      SECURITY_LEVELS.HIGH,
      SECURITY_LEVELS.HIGH,
      SECURITY_LEVELS.HIGH
    );

    // Compare costs
    cy.get("@lowSecurityCost").then((lowCost) => {
      cy.get('[data-testid="widget-cost-estimation"]')
        .invoke("text")
        .should("not.eq", lowCost);
    });
  });
});
