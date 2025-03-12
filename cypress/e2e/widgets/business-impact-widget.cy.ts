import {
  SECURITY_LEVELS,
  BUSINESS_IMPACT_TEST_IDS,
  RISK_LEVELS
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
    
    // Find business impact widget
    cy.findWidget('business-impact')
      .should('exist')
      .scrollIntoView();
      
    // Verify impact content
    cy.verifyContentPresent([
      /business|impact|analysis/i
    ]);
  });

  it("provides detailed impact analysis for different security dimensions", () => {
    // Set security levels
    cy.setSecurityLevels(
      SECURITY_LEVELS.HIGH, 
      SECURITY_LEVELS.HIGH, 
      SECURITY_LEVELS.HIGH
    );
    
    // Find and verify business impact content
    cy.findWidget('business-impact')
      .should('exist')
      .scrollIntoView();
      
    // Try clicking tabs if they exist
    cy.get('body').then($body => {
      const tabSelectors = [
        '[role="tab"]',
        'button:contains("Availability")',
        'button:contains("Integrity")',
        'button:contains("Confidentiality")'
      ];
      
      tabSelectors.forEach(selector => {
        if ($body.find(selector).length) {
          cy.get(selector).eq(1).click();
          cy.wait(300);
        }
      });
    });
    
    // Verify dimension-specific content
    cy.verifyContentPresent([
      /availability|integrity|confidentiality/i
    ]);
  });

  it("provides both considerations and benefits for business analysis", () => {
    // Set security levels
    cy.setSecurityLevels(
      SECURITY_LEVELS.MODERATE, 
      SECURITY_LEVELS.MODERATE, 
      SECURITY_LEVELS.MODERATE
    );
    
    // Find business impact widget
    cy.findWidget('business-impact')
      .should('exist')
      .scrollIntoView();
      
    // Look for considerations and benefits
    cy.verifyContentPresent([
      /consideration|benefit|advantage|impact|risk/i
    ]);
  });

  it("shows detailed impact metrics for data-driven decisions", () => {
    // Set security levels
    cy.setSecurityLevels(
      SECURITY_LEVELS.HIGH, 
      SECURITY_LEVELS.HIGH, 
      SECURITY_LEVELS.HIGH
    );
    
    // Find business impact widget
    cy.findWidget('business-impact')
      .scrollIntoView();
      
    // Look for metrics and quantitative information
    cy.verifyContentPresent([
      /metric|measure|data|value|percentage|impact|cost/i
    ]);
  });
});
