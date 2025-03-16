/**
 * User Story: As a user, I can view technical implementation details
 *
 * Tests that technical guidance changes with security levels
 */
import { SECURITY_LEVELS } from "../../support/constants";
import { testWidgetUpdatesWithSecurityLevels } from "../../support/test-patterns";

describe("Technical Implementation Widget Tests", () => {
  beforeEach(() => {
    cy.visit("/");
    cy.ensureAppLoaded();

    // Add styles to ensure test elements are visible and clickable
    cy.document().then((doc) => {
      const style = doc.createElement("style");
      style.textContent = `
        /* Force all tab buttons to be visible and clickable */
        [data-testid="technical-details-widget"] button[role="tab"] {
          z-index: 9999 !important;
          position: relative !important;
          opacity: 1 !important;
          pointer-events: all !important;
        }
        /* Ensure header doesn't cover buttons */
        .widget-header {
          z-index: 1 !important;
        }
      `;
      doc.head.appendChild(style);
    });
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

    // Find the technical details widget and ensure it's visible
    cy.get('[data-testid="technical-details-widget"]')
      .should("exist")
      .scrollIntoView({ offset: { top: -100, left: 0 } });

    // Use a more resilient approach with { force: true } to click the tab buttons
    cy.get('[data-testid="technical-details-widget"]').within(() => {
      // Click availability tab with force true and add explicit waiting
      cy.get('[data-testid="availability-tab-button"]')
        .should("exist")
        .click({ force: true })
        .wait(500);

      // Verify availability content is shown
      cy.contains(/availability|uptime|recovery/i).should("be.visible");

      // Click integrity tab with force true
      cy.get('[data-testid="integrity-tab-button"]')
        .should("exist")
        .click({ force: true })
        .wait(500);

      // Verify integrity content is shown
      cy.contains(/integrity|consistency|accuracy/i).should("be.visible");

      // Click confidentiality tab with force true
      cy.get('[data-testid="confidentiality-tab-button"]')
        .should("exist")
        .click({ force: true })
        .wait(500);

      // Verify confidentiality content is shown
      cy.contains(/confidentiality|protection|sensitive/i).should("be.visible");
    });
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
