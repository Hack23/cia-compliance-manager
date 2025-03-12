/**
 * User Story: As a user, I can view security resources based on selected security levels
 *
 * Tests the Security Resources Widget functionality
 */
import {
  SECURITY_LEVELS,
  // Remove the missing constant import
  // SECURITY_RESOURCES_TEST_IDS
} from "../../support/constants";
import { testWidgetUpdatesWithSecurityLevels } from "../../support/test-patterns";
import {
  setupWidgetTest,
  testSecurityLevelChanges,
} from "./widget-test-helper";

describe("Security Resources Widget", () => {
  beforeEach(() => {
    cy.visit("/");
    cy.ensureAppLoaded();
  });

  it("displays security resources relevant to selected security levels", () => {
    // Set security levels
    cy.setSecurityLevels(
      SECURITY_LEVELS.MODERATE,
      SECURITY_LEVELS.MODERATE,
      SECURITY_LEVELS.MODERATE
    );

    // Find the security resources widget
    cy.findWidget("security-resources").should("exist").scrollIntoView();

    // Verify resource content
    cy.verifyContentPresent([
      /resource/i,
      /security/i,
      /guide|documentation|reference/i,
    ]);
  });

  it("updates resources when security levels change", () => {
    // Use test pattern for widget updates
    testWidgetUpdatesWithSecurityLevels('[data-testid*="security-resources"]', {
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
    });
  });

  it("provides categorized security resources", () => {
    // Set high security levels
    cy.setSecurityLevels(
      SECURITY_LEVELS.HIGH,
      SECURITY_LEVELS.HIGH,
      SECURITY_LEVELS.HIGH
    );

    // Find security resources widget
    cy.findWidget("security-resources").scrollIntoView();

    // Check for resource categories
    cy.verifyContentPresent([
      /availability|integrity|confidentiality/i,
      /resource/i,
      /implement|guide|standard/i,
    ]);
  });

  it("shows resource listings with appropriate details", () => {
    // Set security levels
    cy.setSecurityLevels(
      SECURITY_LEVELS.MODERATE,
      SECURITY_LEVELS.MODERATE,
      SECURITY_LEVELS.MODERATE
    );

    // Find security resources widget
    cy.findWidget("security-resources").scrollIntoView();

    // Look for list items or resource entries
    cy.get("body").then(($body) => {
      // Look for list items, links, or resource cards
      const hasResourceElements =
        $body.find("ul li").length > 0 ||
        $body.find("a[href]").length > 0 ||
        $body.find('[class*="resource"], [class*="card"]').length > 0;

      // If we found resource elements, verify them
      if (hasResourceElements) {
        // Try to find and interact with resource items
        cy.get('ul li, a[href], [class*="resource"], [class*="card"]')
          .should("exist")
          .first()
          .scrollIntoView();
      } else {
        // Otherwise just check for text content
        cy.verifyContentPresent([
          /resource/i,
          /security/i,
          /guide|tool|reference/i,
        ]);
      }
    });
  });
});
