/**
 * User Story: As a user, I can view a radar chart visualization of CIA security levels
 *
 * Tests the Radar Chart Widget functionality
 */
import {
  SECURITY_LEVELS,
  CHART_TEST_IDS
} from "../../support/constants";
import { testWidgetUpdatesWithSecurityLevels } from "../../support/test-patterns";
import { setupWidgetTest, testSecurityLevelChanges } from "./widget-test-helper";

describe("Radar Chart Widget", () => {
  beforeEach(() => {
    cy.visit("/");
    cy.ensureAppLoaded();
  });

  it("displays radar chart visualization", () => {
    // Set security levels
    cy.setSecurityLevels(
      SECURITY_LEVELS.MODERATE,
      SECURITY_LEVELS.MODERATE,
      SECURITY_LEVELS.MODERATE
    );
    
    // Find radar chart widget
    cy.findWidget('radar-chart')
      .should('exist')
      .scrollIntoView();
      
    // Verify chart elements
    cy.get('[data-testid*="radar"]').should('exist');
    cy.verifyContentPresent([
      /availability|integrity|confidentiality/i,
      SECURITY_LEVELS.MODERATE
    ]);
  });

  it("updates visualization when security levels change", () => {
    // Use test pattern for widget updates
    testWidgetUpdatesWithSecurityLevels(
      '[data-testid*="radar"]', 
      {
        initialLevels: [SECURITY_LEVELS.LOW, SECURITY_LEVELS.LOW, SECURITY_LEVELS.LOW],
        newLevels: [SECURITY_LEVELS.HIGH, SECURITY_LEVELS.HIGH, SECURITY_LEVELS.HIGH],
        expectTextChange: true
      }
    );
  });

  it("displays different security levels accurately", () => {
    // Set mixed security levels
    cy.setSecurityLevels(
      SECURITY_LEVELS.HIGH,
      SECURITY_LEVELS.MODERATE,
      SECURITY_LEVELS.LOW
    );
    
    // Find radar chart widget
    cy.findWidget('radar-chart')
      .scrollIntoView();
      
    // Verify that all three levels appear in the chart
    cy.verifyContentPresent([
      SECURITY_LEVELS.HIGH,
      SECURITY_LEVELS.MODERATE,
      SECURITY_LEVELS.LOW
    ]);
  });

  it("handles canvas rendering properly", () => {
    // Set security levels
    cy.setSecurityLevels(
      SECURITY_LEVELS.MODERATE,
      SECURITY_LEVELS.MODERATE,
      SECURITY_LEVELS.MODERATE
    );
    
    // Find radar chart widget
    cy.findWidget('radar-chart')
      .scrollIntoView();
      
    // Check if canvas element exists
    cy.get('canvas').should('exist');
    
    // Verify security levels are displayed textually even if canvas fails
    cy.verifyContentPresent([
      /availability/i,
      /integrity/i, 
      /confidentiality/i
    ]);
  });
});
