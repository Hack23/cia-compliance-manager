/**
 * User Story: As a user, I can view integrity impact analysis
 *
 * Tests the Integrity Impact Widget functionality
 */
import {
  SECURITY_LEVELS,
  INTEGRITY_IMPACT_TEST_IDS,
} from "../../support/constants";
import { testWidgetUpdatesWithSecurityLevels } from "../../support/test-patterns";
import {
  setupWidgetTest,
  testSecurityLevelChanges,
} from "./widget-test-helper";

describe("Integrity Impact Widget", () => {
  beforeEach(() => {
    cy.visit("/");
    cy.ensureAppLoaded();
  });

  it("displays integrity impact analysis", () => {
    // Set security levels
    cy.setSecurityLevels(
      SECURITY_LEVELS.MODERATE,
      SECURITY_LEVELS.MODERATE,
      SECURITY_LEVELS.MODERATE
    );

    // Find the integrity impact widget using DOM-verified test ID
    cy.get('[data-testid="integrity-impact"]').should("exist").scrollIntoView();

    // Verify integrity content
    cy.verifyContentPresent([
      /integrity/i,
      /impact/i,
      /data/i,
      /accurate|accuracy/i,
    ]);
  });

  it("shows integrity-specific metrics", () => {
    // Set high integrity
    cy.setSecurityLevels(
      SECURITY_LEVELS.MODERATE,
      SECURITY_LEVELS.HIGH,
      SECURITY_LEVELS.MODERATE
    );

    // Find integrity widget using DOM-verified test ID
    cy.get('[data-testid="integrity-impact"]').scrollIntoView();

    // Check for specific integrity metrics
    cy.verifyContentPresent([
      /validation/i,
      /accuracy/i,
      /integrity/i,
      /verification/i,
    ]);
  });

  it("updates content when integrity security level changes", () => {
    // Use test pattern for widget updates with correct DOM test ID
    testWidgetUpdatesWithSecurityLevels('[data-testid="integrity-impact"]', {
      initialLevels: [
        SECURITY_LEVELS.MODERATE,
        SECURITY_LEVELS.LOW,
        SECURITY_LEVELS.MODERATE,
      ],
      newLevels: [
        SECURITY_LEVELS.MODERATE,
        SECURITY_LEVELS.HIGH,
        SECURITY_LEVELS.MODERATE,
      ],
      expectTextChange: true,
    });
  });

  it("provides business impact analysis for integrity violations", () => {
    // Set high integrity
    cy.setSecurityLevels(
      SECURITY_LEVELS.MODERATE,
      SECURITY_LEVELS.HIGH,
      SECURITY_LEVELS.MODERATE
    );

    // Find integrity widget using DOM-verified test ID
    cy.get('[data-testid="integrity-impact"]').scrollIntoView();

    // Check for business impact content
    cy.verifyContentPresent([
      /business/i,
      /impact/i,
      /financial/i,
      /operational/i,
      /regulatory/i,
    ]);
  });
});
