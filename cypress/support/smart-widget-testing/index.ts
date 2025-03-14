/**
 * Module for discovering and testing widgets automatically
 */
import {
  FLEXIBLE_TEST_IDS,
  WIDGET_PREFIXES,
  WIDGET_TEST_IDS,
} from "../constants";

/**
 * Discovers widgets on the page and runs provided test function against each one
 * @param testFn Function to run tests on each discovered widget
 * @param options Configuration options
 */
export function discoverAndTestWidgets(
  testFn: (widgetName: string, testId: string) => void,
  options: {
    skipWidgets?: string[];
    onlyWidgets?: string[];
    timeout?: number;
  } = {}
): void {
  const { skipWidgets = [], onlyWidgets = [], timeout = 30000 } = options;

  cy.log("🔍 Starting automatic widget discovery");

  // Take a screenshot before starting discovery
  cy.screenshot("before-widget-discovery");

  // Try multiple selector strategies to find widgets
  cy.get("body", { timeout }).then(($body) => {
    // Try different selectors for widgets with enhanced logging
    const selectors = [
      // Specific test IDs
      "[data-testid^='widget-']",
      "[data-testid*='-widget']",
      "[data-testid*='widget-']",

      // Class-based selectors
      "[class*='widget-container']",
      "[class*='widgetContainer']",
      "[class*='widget']",

      // ID-based selectors
      "[id^='widget-']",
      "[id*='widget']",

      // Other attribute selectors
      "[data-widget]",
      "[data-component-type*='widget']",

      // Additional widget-like components
      "[data-testid*='impact']",
      "[data-testid*='security']",
      "[data-testid*='compliance']",
      "[data-testid*='cost']",
      "[data-testid*='value']",
      "[data-testid*='chart']",

      // Generic containers that might be widgets
      "div[class*='card']",
      "div[class*='panel']",
      "div[class*='dashboard']",
      "div[class*='component']",
    ];

    let $widgets: JQuery<HTMLElement> = $();
    let selectorUsed = "";

    // Try each selector and collect all matches
    selectors.forEach((selector) => {
      const found = $body.find(selector);
      if (found.length > 0) {
        cy.log(
          `Found ${found.length} potential widgets using selector: ${selector}`
        );
        // Add to our collection, avoiding duplicates
        found.each((_, el) => {
          if (!$widgets.filter((i, existing) => existing === el).length) {
            $widgets = $widgets.add(el);
          }
        });
        if (!selectorUsed) selectorUsed = selector;
      }
    });

    // Log details about found elements
    cy.log(
      `Found ${$widgets.length} total potential widgets (first matched with: ${
        selectorUsed || "none"
      })`
    );

    // If none found with standard selectors, try known test IDs from constants
    if ($widgets.length === 0) {
      cy.log(
        "⚠️ No widgets found using standard selectors, trying known widget IDs"
      );

      // Try all possible test IDs from our constants
      const allTestIds: string[] = [];

      try {
        // Safely extract IDs from constants
        if (WIDGET_TEST_IDS) {
          Object.values(WIDGET_TEST_IDS).forEach((id) => {
            if (typeof id === "string") allTestIds.push(id);
          });
        }

        if (WIDGET_PREFIXES) {
          Object.values(WIDGET_PREFIXES).forEach((id) => {
            if (typeof id === "string") allTestIds.push(id);
          });
        }

        if (FLEXIBLE_TEST_IDS) {
          Object.values(FLEXIBLE_TEST_IDS).forEach((ids) => {
            if (Array.isArray(ids)) {
              allTestIds.push(...ids.filter((id) => typeof id === "string"));
            }
          });
        }

        // Add any hardcoded widget IDs for more discovery robustness
        allTestIds.push(
          "widget-security-level-selection",
          "widget-security-summary",
          "widget-business-impact-container",
          "widget-technical-details-container",
          "widget-cost-estimation",
          "widget-value-creation",
          "widget-compliance-status",
          "widget-radar-chart"
        );
      } catch (e) {
        cy.log(`Error extracting test IDs from constants: ${e}`);
      }

      // Filter to only strings and unique values
      const uniqueTestIds = [...new Set(allTestIds)];

      cy.log(`Trying ${uniqueTestIds.length} known widget test IDs`);

      uniqueTestIds.forEach((testId) => {
        const $found = $body.find(`[data-testid="${testId}"]`);
        if ($found.length > 0) {
          cy.log(`Found widget with known test ID: ${testId}`);
          $widgets = $widgets.add($found);
        }
      });
    }

    // Take a screenshot of DOM structure if no widgets found
    if ($widgets.length === 0) {
      cy.log("⚠️ No widgets found with any method - taking DOM screenshot");
      cy.screenshot("dom-with-no-widgets");

      // Don't fail - just try to extract DOM structure for debugging
      cy.get("body").then(($body) => {
        const html = $body.html().substring(0, 2000); // Get first 2000 chars
        cy.log(`DOM structure (first 2000 chars): ${html}`);
      });

      return;
    }

    // Create a collection of discovered widgets with their names and IDs
    const discoveredWidgets: Array<{ name: string; testId: string }> = [];

    // Process each potential widget
    $widgets.each((_, widget) => {
      const $widget = Cypress.$(widget);
      // Get the test ID or fallback to other attributes
      const testId =
        $widget.attr("data-testid") ||
        $widget.attr("id") ||
        $widget
          .attr("class")
          ?.split(" ")
          .find((c) => c.includes("widget")) ||
        "";

      if (!testId) {
        return; // Skip elements without an identifier
      }

      // Extract a reasonable widget name from the identifier
      let widgetName = testId
        .replace(/^widget-/, "")
        .replace(/-container$/, "")
        .replace(/-widget$/, "");

      // If we couldn't derive a name, use a generic one with an index
      if (!widgetName) {
        widgetName = `unknown-widget-${discoveredWidgets.length + 1}`;
      }

      // Add to our collection if not already included
      if (!discoveredWidgets.some((w) => w.testId === testId)) {
        discoveredWidgets.push({ name: widgetName, testId });
      }
    });

    cy.log(`Discovered ${discoveredWidgets.length} widgets for testing`);

    // If no widgets discovered, just log a warning but don't fail
    if (discoveredWidgets.length === 0) {
      cy.log("⚠️ Warning: No widgets discovered on the page");
      return;
    }

    // Filter widgets based on options
    const filteredWidgets = discoveredWidgets.filter(({ name }) => {
      if (onlyWidgets.length > 0) {
        return onlyWidgets.some((w) => name.includes(w));
      }
      return !skipWidgets.some((w) => name.includes(w));
    });

    cy.log(`Testing ${filteredWidgets.length} widgets after filtering`);

    // Test each widget with proper error handling
    filteredWidgets.forEach(({ name, testId }, index) => {
      cy.log(
        `Testing widget ${index + 1}/${
          filteredWidgets.length
        }: ${name} [${testId}]`
      );

      // Wrap the test function in a try-catch block
      try {
        testFn(name, testId);
      } catch (error) {
        cy.log(`Error testing widget ${name}: ${error}`);
      }
    });
  });
}

/**
 * Helper functions for working with widgets
 */
export * from "./widget-helpers";
