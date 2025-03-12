/**
 * User Story: As a user, I can view visualization of my security posture
 *
 * Tests the Security Visualization Widget functionality
 */
import {
  SECURITY_LEVELS,
  CHART_TEST_IDS
} from "../../support/constants";
import { testWidgetUpdatesWithSecurityLevels } from "../../support/test-patterns";

describe("Security Visualization Widget", () => {
  beforeEach(() => {
    cy.visit("/");
    cy.ensureAppLoaded();
  });

  it("displays security visualization", () => {
    // Set security levels
    cy.setSecurityLevels(
      SECURITY_LEVELS.MODERATE,
      SECURITY_LEVELS.MODERATE,
      SECURITY_LEVELS.MODERATE
    );
    
    // Find visualization widget
    cy.findWidget('visualization')
      .should('exist')
      .scrollIntoView();
      
    // Verify visualization elements
    cy.verifyContentPresent([
      /availability/i,
      /integrity/i,
      /confidentiality/i
    ]);
  });

  it("updates visualization when security levels change", () => {
    // Use test pattern for widget updates
    testWidgetUpdatesWithSecurityLevels(
      '[data-testid*="visualization"]', 
      {
        initialLevels: [SECURITY_LEVELS.LOW, SECURITY_LEVELS.LOW, SECURITY_LEVELS.LOW],
        newLevels: [SECURITY_LEVELS.HIGH, SECURITY_LEVELS.HIGH, SECURITY_LEVELS.HIGH],
        expectTextChange: true
      }
    );
  });

  it("displays mixed security level visualization", () => {
    // Set mixed security levels
    cy.setSecurityLevels(
      SECURITY_LEVELS.HIGH,
      SECURITY_LEVELS.MODERATE,
      SECURITY_LEVELS.LOW
    );
    
    // Find visualization widget
    cy.findWidget('visualization')
      .scrollIntoView();
      
    // Verify that all three levels appear in the visualization
    cy.verifyContentPresent([
      SECURITY_LEVELS.HIGH,
      SECURITY_LEVELS.MODERATE,
      SECURITY_LEVELS.LOW,
      /visualization|chart|graphic|diagram/i
    ]);
  });

  it("renders visual elements properly", () => {
    // Set moderate security levels
    cy.setSecurityLevels(
      SECURITY_LEVELS.MODERATE,
      SECURITY_LEVELS.MODERATE,
      SECURITY_LEVELS.MODERATE
    );
    
    // Find visualization widget
    cy.findWidget('visualization')
      .scrollIntoView();
      
    // Check for visual elements
    cy.get('svg, canvas, [class*="chart"], [class*="graph"]')
      .should('exist');
  });
});
