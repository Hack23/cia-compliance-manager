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

    // Verify widget title is present
    cy.get('[data-testid="technical-details-widget"]')
      .find(".widget-header")
      .should("contain", "Technical Implementation Details");
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

    // Use a more resilient approach to find and click the tab buttons
    cy.get('[data-testid="technical-details-widget"]').within(() => {
      // First try the actual test IDs from the component
      // Try with technical-details-* test IDs from the constants file
      cy.get("button")
        .contains(/availability/i)
        .should("exist")
        .click({ force: true })
        .wait(500);

      // Verify availability content is shown
      cy.contains(/availability|uptime|recovery/i).should("be.visible");

      // Verify technical implementation section exists
      cy.get('[data-testid*="technical-description"]').should("exist");

      // Verify implementation requirements section exists
      cy.get("h3, h4")
        .contains(/Implementation Requirements/i)
        .should("exist");

      // Click integrity tab with force true
      cy.get("button")
        .contains(/integrity/i)
        .should("exist")
        .click({ force: true })
        .wait(500);

      // Verify integrity content is shown
      cy.contains(/integrity|consistency|accuracy/i).should("be.visible");

      // Verify validation method is shown for integrity
      cy.contains(/validation|verification|consistency/i).should("be.visible");

      // Click confidentiality tab with force true
      cy.get("button")
        .contains(/confidentiality/i)
        .should("exist")
        .click({ force: true })
        .wait(500);

      // Verify confidentiality content is shown
      cy.contains(/confidentiality|protection|sensitive/i).should("be.visible");

      // Verify encryption or protection method is shown for confidentiality
      cy.contains(/encryption|access control|authentication/i).should(
        "be.visible"
      );
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

    // Verify implementation details components
    cy.get('[data-testid="technical-details-widget"]').within(() => {
      // Check for development effort indicator
      cy.contains(/development effort|implementation effort/i).should("exist");

      // Check for maintenance level indicator
      cy.contains(/maintenance|ongoing support/i).should("exist");

      // Check for expertise level indicator
      cy.contains(/expertise|skill level|required knowledge/i).should("exist");

      // Check for implementation steps or code examples
      cy.get("ol, ul").should("exist");
    });
  });

  it("displays different technical requirements based on security level", () => {
    // Set low security level first
    cy.setSecurityLevels(
      SECURITY_LEVELS.LOW,
      SECURITY_LEVELS.LOW,
      SECURITY_LEVELS.LOW
    );

    // Find and check the technical details widget
    cy.get('[data-testid="technical-details-widget"]')
      .should("exist")
      .scrollIntoView();

    // Verify low-security content
    cy.get('[data-testid="technical-details-widget"]').within(() => {
      // Should show basic implementation details
      cy.contains(/basic|minimal|simple/i).should("exist");
    });

    // Change to high security level
    cy.setSecurityLevels(
      SECURITY_LEVELS.HIGH,
      SECURITY_LEVELS.HIGH,
      SECURITY_LEVELS.HIGH
    );

    // Verify high-security content is different
    cy.get('[data-testid="technical-details-widget"]').within(() => {
      // Should show advanced implementation details
      cy.contains(/advanced|comprehensive|robust/i).should("exist");

      // Should have more rigorous requirements
      cy.contains(/high availability|redundancy|fault.tolerance/i).should(
        "exist"
      );
    });
  });
});
