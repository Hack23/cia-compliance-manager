/**
 * User Story: As a user, I can view availability impact analysis
 *
 * Tests the Availability Impact Widget functionality
 */
import {
  SECURITY_LEVELS,
  AVAILABILITY_IMPACT_TEST_IDS
} from "../../support/constants";
import { testWidgetUpdatesWithSecurityLevels } from "../../support/test-patterns";
import { setupWidgetTest, testSecurityLevelChanges } from "./widget-test-helper";

describe("Availability Impact Widget", () => {
  beforeEach(() => {
    cy.visit("/");
    cy.ensureAppLoaded();
  });

  it("displays availability impact analysis", () => {
    // Set security levels
    cy.setSecurityLevels(
      SECURITY_LEVELS.MODERATE,
      SECURITY_LEVELS.MODERATE,
      SECURITY_LEVELS.MODERATE
    );
    
    // Find the availability impact widget
    cy.findWidget('availability-impact')
      .should('exist')
      .scrollIntoView();
      
    // Verify availability content
    cy.verifyContentPresent([
      /availability/i,
      /impact/i,
      /uptime/i
    ]);
  });

  it("shows availability metrics including uptime, RTO, RPO", () => {
    // Set high availability
    cy.setSecurityLevels(
      SECURITY_LEVELS.HIGH,
      SECURITY_LEVELS.MODERATE,
      SECURITY_LEVELS.MODERATE
    );
    
    // Find availability widget
    cy.findWidget('availability-impact')
      .scrollIntoView();
      
    // Check for specific availability metrics
    cy.verifyContentPresent([
      /uptime/i,
      /rto/i,
      /rpo/i,
      /recovery/i,
      /availability/i
    ]);
  });

  it("updates content when availability security level changes", () => {
    // Use test pattern for widget updates
    testWidgetUpdatesWithSecurityLevels(
      '[data-testid*="availability-impact"]', 
      {
        initialLevels: [SECURITY_LEVELS.LOW, SECURITY_LEVELS.MODERATE, SECURITY_LEVELS.MODERATE],
        newLevels: [SECURITY_LEVELS.HIGH, SECURITY_LEVELS.MODERATE, SECURITY_LEVELS.MODERATE],
        expectTextChange: true
      }
    );
  });

  it("provides business impact analysis for availability incidents", () => {
    // Set high availability
    cy.setSecurityLevels(
      SECURITY_LEVELS.HIGH,
      SECURITY_LEVELS.MODERATE,
      SECURITY_LEVELS.MODERATE
    );
    
    // Find availability widget
    cy.findWidget('availability-impact')
      .scrollIntoView();
      
    // Check for business impact content
    cy.verifyContentPresent([
      /business/i,
      /impact/i,
      /financial/i,
      /operational/i
    ]);
  });
});
