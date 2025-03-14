/**
 * Helper functions for widget testing
 */
import { FLEXIBLE_TEST_IDS } from "../constants";

/**
 * Finds all widget test IDs from the constants definition
 * @returns Array of widget test IDs
 */
export function getDefinedWidgetTestIds(): string[] {
  try {
    // Build a collection of known widget IDs
    const knownIds: string[] = [];

    // Extract IDs from FLEXIBLE_TEST_IDS when available
    if (FLEXIBLE_TEST_IDS) {
      Object.values(FLEXIBLE_TEST_IDS).forEach((ids) => {
        if (Array.isArray(ids)) {
          knownIds.push(...ids.filter((id) => typeof id === "string"));
        }
      });
    }

    // Filter to only include widget IDs and remove duplicates
    return [
      ...new Set(
        knownIds.filter(
          (id) =>
            typeof id === "string" &&
            (id.includes("widget") ||
              id.includes("impact") ||
              id.includes("chart"))
        )
      ),
    ];
  } catch (e) {
    cy.log(`Error getting defined widget test IDs: ${e}`);
    return [];
  }
}

/**
 * Generate common test patterns for testing widgets
 * @param widgetName Name of the widget to test
 */
export function generateWidgetTests(widgetName: string): void {
  cy.log(`Generating tests for ${widgetName}`);

  // Test 1: Widget exists and is visible
  it(`${widgetName} widget should exist and be visible`, () => {
    cy.findWidget(widgetName).should("exist").and("be.visible");
  });

  // Test 2: Widget updates with security level changes
  it(`${widgetName} widget responds to security level changes`, () => {
    cy.findWidget(widgetName).then(($widget) => {
      // Store initial content
      const initialContent = $widget.text();

      // Change security levels
      cy.setSecurityLevels("High", "High", "High");

      // Verify content changed
      cy.findWidget(widgetName).invoke("text").should("not.eq", initialContent);
    });
  });
}
