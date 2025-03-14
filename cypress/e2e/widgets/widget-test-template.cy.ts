import { SECURITY_LEVELS } from "../../support/constants";
import { setupWidgetTest, verifyWidgetExists } from "./base-widget-tests";
import { testWidgetTabSwitching } from "./widget-test-helper";

/**
 * Standard test suite for {WIDGET_NAME} widget
 * Tests widget existence, content updates, security level changes
 */
describe("{WIDGET_NAME} Widget", () => {
  // Use standard setup for widget tests
  setupWidgetTest("{WIDGET_ID}");

  // Basic existence test
  verifyWidgetExists("{WIDGET_ID}");

  // Test security level changes affect widget content
  it("updates content when security levels change", () => {
    // Test with different security level configurations
    cy.findWidget("{WIDGET_ID}").should("exist").scrollIntoView();

    // First test with low security level
    cy.setSecurityLevels(
      SECURITY_LEVELS.LOW,
      SECURITY_LEVELS.LOW,
      SECURITY_LEVELS.LOW
    );
    cy.wait(300); // Ensure UI updates

    // Store initial content
    cy.findWidget("{WIDGET_ID}").invoke("text").as("lowLevelContent");

    // Now test with high security level
    cy.setSecurityLevels(
      SECURITY_LEVELS.HIGH,
      SECURITY_LEVELS.HIGH,
      SECURITY_LEVELS.HIGH
    );
    cy.wait(300); // Ensure UI updates

    // Verify content changed - fail fast if no change
    cy.get("@lowLevelContent").then((lowLevelContent) => {
      cy.findWidget("{WIDGET_ID}")
        .invoke("text")
        .should("not.eq", lowLevelContent);
    });
  });

  // Test mixed security levels (fail-fast approach)
  it("responds properly to mixed security levels", () => {
    cy.findWidget("{WIDGET_ID}").scrollIntoView();

    // Set mixed security levels
    cy.setSecurityLevels(
      SECURITY_LEVELS.HIGH,
      SECURITY_LEVELS.MODERATE,
      SECURITY_LEVELS.LOW
    );

    // Verify widget contains expected content patterns for this configuration
    cy.findWidget("{WIDGET_ID}").within(() => {
      // Verify widget-specific content patterns
      // These will vary by widget
      cy.verifyContentPresent([
        // Add widget-specific patterns here
      ]);
    });
  });

  // If widget has tabs, test tab navigation
  it("has functional tab navigation if applicable", () => {
    cy.findWidget("{WIDGET_ID}").scrollIntoView();

    // Try to find and test tabs if they exist
    cy.findWidget("{WIDGET_ID}").then(($widget) => {
      const hasTabs =
        $widget.find('[role="tab"]').length > 0 ||
        $widget.find(
          'button:contains("Availability"), button:contains("Integrity"), button:contains("Confidentiality")'
        ).length > 0;

      if (hasTabs) {
        testWidgetTabSwitching("{WIDGET_ID}", []);
      } else {
        cy.log("No tabs found in this widget - test skipped");
      }
    });
  });
});
