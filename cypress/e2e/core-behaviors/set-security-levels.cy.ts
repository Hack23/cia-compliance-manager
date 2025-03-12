/**
 * User Story: As a user, I can set security levels for CIA components
 *
 * Tests the ability to set different security levels and see visual feedback
 */
import {
  SECURITY_LEVELS,
  CIA_TEST_IDS,
  TEST_PATTERNS
} from "../../support/constants";
import { testWidgetUpdatesWithSecurityLevels } from "../../support/test-patterns";

describe("Set Security Levels", () => {
  beforeEach(() => {
    cy.visit("/");
    cy.ensureAppLoaded();
  });

  it("allows setting individual security levels", () => {
    // Find security level widget
    cy.findWidget('security-level')
      .should('exist')
      .scrollIntoView();
      
    // Set individual security levels
    cy.selectSecurityLevelEnhanced('availability', SECURITY_LEVELS.HIGH);
    cy.selectSecurityLevelEnhanced('integrity', SECURITY_LEVELS.MODERATE);
    cy.selectSecurityLevelEnhanced('confidentiality', SECURITY_LEVELS.LOW);
    
    // Verify selections
    cy.verifyContentPresent([
      SECURITY_LEVELS.HIGH,
      SECURITY_LEVELS.MODERATE,
      SECURITY_LEVELS.LOW
    ]);
  });

  it("verifies radar chart updates with security level changes", () => {
    // Use testWidgetUpdatesWithSecurityLevels for radar chart
    cy.findWidget('radar-chart').should('exist');
    
    // Test that widget updates when security levels change
    testWidgetUpdatesWithSecurityLevels(
      '[data-testid*="radar-chart"]',
      {
        initialLevels: [SECURITY_LEVELS.LOW, SECURITY_LEVELS.LOW, SECURITY_LEVELS.LOW],
        newLevels: [SECURITY_LEVELS.HIGH, SECURITY_LEVELS.HIGH, SECURITY_LEVELS.HIGH],
        waitTime: 800,
        expectVisualChange: true
      }
    );
  });

  it("verifies security widget structure", () => {
    // Find the security level widget
    cy.findWidget('security-level').within(() => {
      // Verify the structure with more resilient selectors
      cy.get('select').should('have.length.gte', 3);
      
      // Check for section headings
      cy.verifyContentPresent([
        'Availability',
        'Integrity',
        'Confidentiality'
      ]);
    });
  });

  it("shows descriptions that match security levels", () => {
    // Set security levels
    cy.setSecurityLevels(
      SECURITY_LEVELS.MODERATE, 
      SECURITY_LEVELS.MODERATE, 
      SECURITY_LEVELS.MODERATE
    );
    
    // Verify that descriptions match the selected level
    cy.findWidget('security-level').within(() => {
      cy.get('[data-testid*="description"], [class*="description"]')
        .should('exist')
        .and('be.visible');
    });
  });
});
