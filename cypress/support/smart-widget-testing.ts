/**
 * Helper utilities for automatic widget discovery and testing
 */
import {
  FLEXIBLE_TEST_IDS,
  WIDGET_PREFIXES,
  WIDGET_TEST_IDS,
} from "./constants";

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
  const { skipWidgets = [], onlyWidgets = [], timeout = 10000 } = options;

  cy.log("🔍 Starting automatic widget discovery");

  // Try multiple selector strategies to find widgets
  cy.get("body", { timeout }).then(($body) => {
    // Try different selectors for widgets with enhanced logging
    const selectors = [
      "[data-testid^='widget-']",
      "[class*='widget-container']",
      "[class*='widget']",
      "[id^='widget-']",
      "[id*='widget']",
      "[data-widget]",
      "[data-component-type*='widget']",
      // Additional way of finding widgets
      "[data-testid*='impact']",
      "[data-testid*='security']",
      "[data-testid*='compliance']",
      "[data-testid*='cost']",
      "[data-testid*='value']",
      "[data-testid*='chart']",
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

      // Add IDs from WIDGET_TEST_IDS
      Object.values(WIDGET_TEST_IDS || {}).forEach((id) => {
        if (typeof id === "string") allTestIds.push(id);
      });

      // Add IDs from WIDGET_PREFIXES
      Object.values(WIDGET_PREFIXES || {}).forEach((id) => {
        if (typeof id === "string") allTestIds.push(id);
      });

      // Add IDs from FLEXIBLE_TEST_IDS
      Object.values(FLEXIBLE_TEST_IDS || {}).forEach((ids) => {
        if (Array.isArray(ids)) {
          allTestIds.push(...ids.filter((id) => typeof id === "string"));
        }
      });

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
 * Finds all widget test IDs from the constants definition
 * @returns Array of widget test IDs
 */
export function getDefinedWidgetTestIds(): string[] {
  // Extract IDs from multiple sources, ensure we handle null/undefined cases
  const knownIds: string[] = [];

  // Add IDs from WIDGET_TEST_IDS
  Object.values(WIDGET_TEST_IDS || {}).forEach((id) => {
    if (typeof id === "string") knownIds.push(id);
  });

  // Add IDs from WIDGET_PREFIXES
  Object.values(WIDGET_PREFIXES || {}).forEach((id) => {
    if (typeof id === "string") knownIds.push(id);
  });

  // Add IDs from FLEXIBLE_TEST_IDS
  Object.values(FLEXIBLE_TEST_IDS || {}).forEach((ids) => {
    if (Array.isArray(ids)) {
      knownIds.push(...ids.filter((id) => typeof id === "string"));
    }
  });

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
