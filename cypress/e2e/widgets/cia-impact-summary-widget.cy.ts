/**
 * User Story: As a user, I can view a summary of CIA impacts across all dimensions
 *
 * Tests the CIA Impact Summary Widget functionality
 */
import {
  SECURITY_LEVELS,
  WIDGET_TEST_IDS
} from "../../support/constants";
import { testWidgetUpdatesWithSecurityLevels } from "../../support/test-patterns";

describe("CIA Impact Summary Widget", () => {
  beforeEach(() => {
    cy.visit("/");
    cy.ensureAppLoaded();
  });

  it("displays impacts for all three CIA dimensions", () => {
    // Set security levels
    cy.setSecurityLevels(
      SECURITY_LEVELS.MODERATE,
      SECURITY_LEVELS.MODERATE,
      SECURITY_LEVELS.MODERATE
    );
    
    // Find impact summary widget
    cy.findWidget('cia-impact-summary')
      .should('exist')
      .scrollIntoView();
      
    // Verify all three dimensions
    cy.verifyContentPresent([
      /availability/i,
      /integrity/i,
      /confidentiality/i
    ]);
  });

  it("shows different impact levels", () => {
    // Set mixed security levels
    cy.setSecurityLevels(
      SECURITY_LEVELS.HIGH,
      SECURITY_LEVELS.MODERATE,
      SECURITY_LEVELS.LOW
    );
    
    // Find impact summary widget
    cy.findWidget('cia-impact-summary')
      .scrollIntoView();
      
    // Verify different impact levels
    cy.verifyContentPresent([
      SECURITY_LEVELS.HIGH,
      SECURITY_LEVELS.MODERATE,
      SECURITY_LEVELS.LOW
    ]);
  });

  it("updates when security levels change", () => {
    // Use test pattern for widget updates
    testWidgetUpdatesWithSecurityLevels(
      '[data-testid*="cia-impact"]', 
      {
        initialLevels: [SECURITY_LEVELS.LOW, SECURITY_LEVELS.LOW, SECURITY_LEVELS.LOW],
        newLevels: [SECURITY_LEVELS.HIGH, SECURITY_LEVELS.HIGH, SECURITY_LEVELS.HIGH],
        expectTextChange: true
      }
    );
  });

  it("provides business context for each CIA component", () => {
    // Set security levels
    cy.setSecurityLevels(
      SECURITY_LEVELS.MODERATE,
      SECURITY_LEVELS.MODERATE,
      SECURITY_LEVELS.MODERATE
    );
    
    // Find impact summary widget
    cy.findWidget('cia-impact-summary')
      .scrollIntoView();
      
    // Look for business context content
    cy.verifyContentPresent([
      /impact/i,
      /business/i,
      /value|risk|consideration/i
    ]);
  });
});
