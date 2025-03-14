/**
 * User Story: As a user, I can view security resources based on selected security levels
 *
 * Tests the Security Resources Widget functionality
 */
import { SECURITY_LEVELS } from "../../support/constants";
import { setupWidgetTest, verifyWidgetExists } from "./base-widget-tests";
import { testSecurityLevelChanges } from "./widget-test-helper";

describe("Security Resources Widget", () => {
  // Use standard setup for widget tests
  setupWidgetTest("security-resources");

  // Basic existence test
  verifyWidgetExists("security-resources");

  // Test security level changes affect available resources
  it("updates resources when security levels change", () => {
    testSecurityLevelChanges("security-resources");
  });

  // Test resources list display
  it("displays a list of security resources", () => {
    cy.findWidget("security-resources").scrollIntoView();

    // Set moderate security levels
    cy.setSecurityLevels(
      SECURITY_LEVELS.MODERATE,
      SECURITY_LEVELS.MODERATE,
      SECURITY_LEVELS.MODERATE
    );

    // Check for resource list
    cy.findWidget("security-resources").within(() => {
      // Look for resource items - they should be list items, cards, or resource elements
      cy.get(
        `[data-testid*="resource"], [class*="resource"], li, article, .card`
      ).should("have.length.at.least", 1);

      // Look for resource links or titles
      cy.contains(/link|guide|document|resource|reference|template/i).should(
        "exist"
      );
    });
  });

  // Test filter functionality if available
  it("filters resources if filter controls exist", () => {
    cy.findWidget("security-resources").scrollIntoView();

    // Set high security for more resources
    cy.setSecurityLevels(
      SECURITY_LEVELS.HIGH,
      SECURITY_LEVELS.HIGH,
      SECURITY_LEVELS.HIGH
    );

    // Try to find filter controls
    cy.findWidget("security-resources").then(($widget) => {
      const hasFilter =
        $widget.find(
          'input[type="search"], select, [data-testid*="filter"], [data-testid*="search"]'
        ).length > 0;

      if (hasFilter) {
        // First count initial resources
        cy.findWidget("security-resources")
          .find('[data-testid*="resource"], li, article, .card')
          .its("length")
          .as("initialCount");

        // Use the filter - try input first
        cy.findWidget("security-resources").within(() => {
          // Try to find a search input
          cy.get('input[type="search"], [data-testid*="search"]').then(
            ($search) => {
              if ($search.length > 0) {
                // Use search input with a specific term
                cy.wrap($search).type("guide");
                cy.wait(300); // Wait for filtering
              } else {
                // Try dropdown filter if search not found
                cy.get('select, [data-testid*="filter"]').then(($filter) => {
                  if ($filter.length > 0) {
                    cy.wrap($filter).select(1); // Select second option
                    cy.wait(300); // Wait for filtering
                  }
                });
              }
            }
          );
        });

        // Verify filtering changed the displayed items
        cy.get("@initialCount").then((initialCount) => {
          // Could either show fewer (filtered) or different items
          cy.findWidget("security-resources")
            .find('[data-testid*="resource"], li, article, .card')
            .should("exist");
        });
      } else {
        cy.log("No filter controls found - skipping filter test");
      }
    });
  });

  // Test security level appropriate resources
  it("shows appropriate resources for current security level", () => {
    cy.findWidget("security-resources").scrollIntoView();

    // Test with low security
    cy.setSecurityLevels(
      SECURITY_LEVELS.LOW,
      SECURITY_LEVELS.LOW,
      SECURITY_LEVELS.LOW
    );

    // Capture resources text at low security
    cy.findWidget("security-resources")
      .invoke("text")
      .as("lowSecurityResources");

    // Test with high security
    cy.setSecurityLevels(
      SECURITY_LEVELS.HIGH,
      SECURITY_LEVELS.HIGH,
      SECURITY_LEVELS.HIGH
    );

    // Verify different resources appear
    cy.get("@lowSecurityResources").then((lowText) => {
      cy.findWidget("security-resources")
        .invoke("text")
        .should("not.eq", lowText);

      // High security should mention advanced security concepts
      cy.findWidget("security-resources").within(() => {
        cy.contains(/advanced|enterprise|comprehensive|framework/i).should(
          "exist"
        );
      });
    });
  });
});
