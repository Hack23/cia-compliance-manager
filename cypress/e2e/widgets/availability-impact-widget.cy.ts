/**
 * User Story: As a user, I can view availability impact analysis
 *
 * Tests the Availability Impact Widget functionality
 */
import { SECURITY_LEVELS, WIDGET_TEST_IDS } from "../../support/constants";
import { testWidgetUpdatesWithSecurityLevels } from "../../support/test-patterns";
import {
  setupWidgetTest,
  testSecurityLevelChanges,
} from "./widget-test-helper";

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

    // Try different valid test IDs for this widget based on DOM analysis
    cy.get("body").then(($body) => {
      let selector = "";
      ["widget-availability-impact", "availability-impact"].forEach((id) => {
        if ($body.find(`[data-testid="${id}"]`).length) {
          selector = `[data-testid="${id}"]`;
        }
      });

      if (selector) {
        cy.get(selector).should("exist").scrollIntoView();
      } else {
        // Fallback to findWidget
        cy.findWidget("availability-impact").should("exist").scrollIntoView();
      }
    });

    // Verify availability content
    cy.verifyContentPresent([/availability/i, /impact/i, /uptime/i]);
  });

  it("shows availability metrics including uptime, RTO, RPO", () => {
    // Set high availability
    cy.setSecurityLevels(
      SECURITY_LEVELS.HIGH,
      SECURITY_LEVELS.MODERATE,
      SECURITY_LEVELS.MODERATE
    );

    // Find availability widget
    cy.findWidget("availability-impact").scrollIntoView();

    // Check for specific availability metrics
    cy.verifyContentPresent([
      /uptime/i,
      /rto|recovery time/i,
      /rpo|recovery point/i,
      /availability/i,
    ]);
  });

  it("updates content when availability security level changes", () => {
    // Use findWidget for more resilient testing
    cy.findWidget("availability-impact").then(($widget) => {
      const testId = $widget.attr("data-testid");

      // Use test pattern for widget updates with found test ID
      testWidgetUpdatesWithSecurityLevels(`[data-testid="${testId}"]`, {
        initialLevels: [
          SECURITY_LEVELS.LOW,
          SECURITY_LEVELS.MODERATE,
          SECURITY_LEVELS.MODERATE,
        ],
        newLevels: [
          SECURITY_LEVELS.HIGH,
          SECURITY_LEVELS.MODERATE,
          SECURITY_LEVELS.MODERATE,
        ],
        expectTextChange: true,
      });
    });
  });

  it("provides business impact analysis for availability incidents", () => {
    // Set high availability
    cy.setSecurityLevels(
      SECURITY_LEVELS.HIGH,
      SECURITY_LEVELS.MODERATE,
      SECURITY_LEVELS.MODERATE
    );

    // Find availability widget
    cy.findWidget("availability-impact").scrollIntoView();

    // Check for business impact content
    cy.verifyContentPresent([
      /business/i,
      /impact/i,
      /financial/i,
      /operational/i,
    ]);
  });
});
