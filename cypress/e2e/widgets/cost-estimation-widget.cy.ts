import {
  SECURITY_LEVELS,
  COST_TEST_IDS,
  TEST_PATTERNS
} from "../../support/constants";
import { testCostUpdatesWithSecurityLevels } from "../../support/test-patterns";

describe("Cost Estimation Widget", () => {
  beforeEach(() => {
    cy.visit("/");
    cy.ensureAppLoaded();
  });

  it("provides accurate financial impact analysis of security choices", () => {
    // Use reusable test pattern
    testCostUpdatesWithSecurityLevels();
  });

  it("provides ROI analysis to justify security investments", () => {
    // Set security levels
    cy.setSecurityLevels(
      SECURITY_LEVELS.MODERATE, 
      SECURITY_LEVELS.MODERATE, 
      SECURITY_LEVELS.MODERATE
    );
    
    // Verify ROI content exists
    cy.findWidget('cost-estimation')
      .should('exist')
      .and('contain', 'ROI');
  });

  it("connects costs to business value with analysis", () => {
    // Set security levels
    cy.setSecurityLevels(
      SECURITY_LEVELS.HIGH, 
      SECURITY_LEVELS.HIGH, 
      SECURITY_LEVELS.HIGH
    );
    
    // Check for financial analysis text
    cy.findWidget('cost-estimation').within(() => {
      cy.verifyContentPresent([
        /analysis/i,
        /cost/i,
        /value/i,
        /business/i
      ]);
    });
  });
});
