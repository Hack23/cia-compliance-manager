/**
 * Integration tests for widget interactions
 *
 * This test suite verifies that all widgets work together correctly
 * and data is synchronized between components.
 */
import {
  SECURITY_LEVELS,
  FRAMEWORK_TEST_IDS,
  BUSINESS_IMPACT_TEST_IDS,
  COST_TEST_IDS
} from "../support/constants";
import { setupWidgetTest } from "./widgets/widget-test-helper";

describe("Widget Integration Tests", () => {
  beforeEach(() => {
    cy.visit("/");
    cy.ensureAppLoaded();
  });

  it("updates all widgets when security levels change", () => {
    // Set high security levels
    cy.setSecurityLevels(
      SECURITY_LEVELS.HIGH, 
      SECURITY_LEVELS.HIGH, 
      SECURITY_LEVELS.HIGH
    );
    
    // Verify compliance status updated
    cy.findWidget('compliance').scrollIntoView();
    cy.verifyContentPresent([
      /compliant|100%|full/i
    ]);
    
    // Verify business impact widgets updated
    cy.findWidget('business-impact').scrollIntoView();
    cy.verifyContentPresent([
      SECURITY_LEVELS.HIGH
    ]);
    
    // Verify cost estimation updated
    cy.findWidget('cost').scrollIntoView();
    cy.verifyContentPresent([
      /cost|estimate|capex|opex/i
    ]);
  });

  it("displays consistent metrics across related widgets", () => {
    // Set security levels
    cy.setSecurityLevels(
      SECURITY_LEVELS.MODERATE, 
      SECURITY_LEVELS.MODERATE, 
      SECURITY_LEVELS.MODERATE
    );
    
    // Check security level consistency across widgets
    cy.verifyContentPresent([
      SECURITY_LEVELS.MODERATE
    ]);
  });

  it("shows detailed business impact metrics when available", () => {
    // Set high security
    cy.setSecurityLevels(
      SECURITY_LEVELS.HIGH, 
      SECURITY_LEVELS.HIGH, 
      SECURITY_LEVELS.HIGH
    );
    
    // Find business impact widget
    cy.findWidget('business-impact')
      .scrollIntoView()
      .should('be.visible');
      
    // Check for metrics
    cy.verifyContentPresent([
      /impact|metric|financial|operational/i
    ]);
  });

  it("provides a complete business decision-making flow", () => {
    // Set security levels
    cy.setSecurityLevels(
      SECURITY_LEVELS.MODERATE, 
      SECURITY_LEVELS.MODERATE, 
      SECURITY_LEVELS.MODERATE
    );
    
    // Find and interact with business impact
    cy.findWidget('business-impact').scrollIntoView();
    
    // Try to click tabs if they exist
    cy.tryClickButton(/integrity|confidentiality/i);
    
    // Check cost widget
    cy.findWidget('cost').scrollIntoView();
    
    // Check value widget
    cy.findWidget('value').scrollIntoView();
  });
});
