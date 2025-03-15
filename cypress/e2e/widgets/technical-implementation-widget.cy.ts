/**
 * User Story: As a user, I can view technical implementation details
 *
 * Tests that technical guidance changes with security levels
 */
import {
  SECURITY_LEVELS,
  TECHNICAL_DETAILS_TEST_IDS,
} from "../../support/constants";
import { setupWidgetTest } from "./widget-test-helper";
import { testWidgetUpdatesWithSecurityLevels } from "../../support/test-patterns";

describe("Technical Implementation Widget Tests", () => {
  beforeEach(() => {
    cy.visit("/");
    cy.ensureAppLoaded();
  });

  it("shows technical implementation details for security levels", () => {
    // Set security levels
    cy.setSecurityLevels(
      SECURITY_LEVELS.MODERATE,
      SECURITY_LEVELS.MODERATE,
      SECURITY_LEVELS.MODERATE
    );

    // Find the technical details widget using DOM-verified test ID
    cy.get('[data-testid="technical-details-widget"]')
      .should("exist")
      .scrollIntoView();

    // Verify content
    cy.verifyContentPresent([/technical|implementation|detail/i]);
  });

  it("updates implementation details when security levels change", () => {
    // Use the test pattern for widget updates with DOM-verified test ID
    testWidgetUpdatesWithSecurityLevels(
      '[data-testid="technical-details-widget"]',
      {
        initialLevels: [
          SECURITY_LEVELS.LOW,
          SECURITY_LEVELS.LOW,
          SECURITY_LEVELS.LOW,
        ],
        newLevels: [
          SECURITY_LEVELS.HIGH,
          SECURITY_LEVELS.HIGH,
          SECURITY_LEVELS.HIGH,
        ],
        expectTextChange: true,
      }
    );
  });

  it("allows switching between confidentiality, integrity, and availability sections", () => {
    // Set security levels
    cy.setSecurityLevels(
      SECURITY_LEVELS.MODERATE,
      SECURITY_LEVELS.MODERATE,
      SECURITY_LEVELS.MODERATE
    );

    // Find the technical details widget using DOM-verified test ID
    cy.get('[data-testid="technical-details-widget"]')
      .scrollIntoView()
      .within(() => {
        // Look for and click tab buttons using DOM-verified test IDs
        cy.get('[data-testid="availability-tab-button"]').click();
        cy.wait(300);

        cy.get('[data-testid="integrity-tab-button"]').click();
        cy.wait(300);

        cy.get('[data-testid="confidentiality-tab-button"]').click();
        cy.wait(300);
      });

    // Verify content changes
    cy.verifyContentPresent([
      /confidentiality/i,
      /protection|security|sensitive/i,
    ]);
  });

  it("shows implementation requirements for different security levels", () => {
    // Set high security levels
    cy.setSecurityLevels(
      SECURITY_LEVELS.HIGH,
      SECURITY_LEVELS.HIGH,
      SECURITY_LEVELS.HIGH
    );

    // Find the technical details widget
    cy.get('[data-testid="technical-details-widget"]').scrollIntoView();

    // Check for detailed implementation requirements
    cy.verifyContentPresent([
      /requirement|implement|solution|approach/i,
      /high|advanced|enhanced/i,
    ]);
  });
});
