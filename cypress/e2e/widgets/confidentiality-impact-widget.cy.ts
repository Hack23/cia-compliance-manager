/**
 * User Story: As a user, I can view confidentiality impact analysis
 *
 * Tests the Confidentiality Impact Widget functionality
 */
import {
  SECURITY_LEVELS,
  CONFIDENTIALITY_IMPACT_TEST_IDS,
} from "../../support/constants";
import { testWidgetUpdatesWithSecurityLevels } from "../../support/test-patterns";
import {
  setupWidgetTest,
  testSecurityLevelChanges,
} from "./widget-test-helper";

describe("Confidentiality Impact Widget", () => {
  beforeEach(() => {
    cy.visit("/");
    cy.ensureAppLoaded();
  });

  it("displays confidentiality impact analysis", () => {
    // Set security levels
    cy.setSecurityLevels(
      SECURITY_LEVELS.MODERATE,
      SECURITY_LEVELS.MODERATE,
      SECURITY_LEVELS.MODERATE
    );

    // Find the confidentiality impact widget using correct test ID from DOM
    cy.get('[data-testid="confidentiality-impact"]')
      .should("exist")
      .scrollIntoView();

    // Also try with the findWidget helper for resilience
    cy.findWidget("confidentiality-impact").should("exist");

    // Verify confidentiality content
    cy.verifyContentPresent([
      /confidentiality/i,
      /data/i,
      /protect/i,
      /privacy/i,
    ]);
  });

  it("shows confidentiality-specific metrics", () => {
    // Set high confidentiality
    cy.setSecurityLevels(
      SECURITY_LEVELS.MODERATE,
      SECURITY_LEVELS.MODERATE,
      SECURITY_LEVELS.HIGH
    );

    // Find confidentiality widget using DOM-verified test ID
    cy.get('[data-testid="confidentiality-impact"]').scrollIntoView();

    // Check for specific confidentiality metrics
    cy.verifyContentPresent([/protection/i, /privacy/i, /sensitive/i]);
  });

  it("updates content when confidentiality security level changes", () => {
    // Use test pattern for widget updates with correct DOM test ID
    testWidgetUpdatesWithSecurityLevels(
      '[data-testid="confidentiality-impact"]',
      {
        initialLevels: [
          SECURITY_LEVELS.MODERATE,
          SECURITY_LEVELS.MODERATE,
          SECURITY_LEVELS.LOW,
        ],
        newLevels: [
          SECURITY_LEVELS.MODERATE,
          SECURITY_LEVELS.MODERATE,
          SECURITY_LEVELS.HIGH,
        ],
        expectTextChange: true,
      }
    );
  });

  it("provides business impact analysis for confidentiality breaches", () => {
    // Set high confidentiality
    cy.setSecurityLevels(
      SECURITY_LEVELS.MODERATE,
      SECURITY_LEVELS.MODERATE,
      SECURITY_LEVELS.HIGH
    );

    // Find confidentiality widget with findWidget helper
    cy.findWidget("confidentiality-impact").scrollIntoView();

    // Check for business impact content
    cy.verifyContentPresent([
      /business/i,
      /impact/i,
      /breach/i,
      /regulation/i,
      /compliance/i,
    ]);
  });
});
