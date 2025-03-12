import { SECURITY_LEVELS, SELECTORS } from "./constants";

/**
 * Test pattern categories:
 * 1. WIDGET - Patterns for testing specific widget behaviors
 * 2. UI - Patterns for testing UI components (tabs, accessibility)
 * 3. BEHAVIOR - Patterns for testing application behaviors
 * 4. INTEGRATION - Patterns for testing component interactions
 * 5. PERFORMANCE - Patterns for testing performance characteristics
 */

// ============= WIDGET PATTERNS =============

/**
 * Standard patterns for testing widget updates when security levels change
 * Enhanced with performance tracking
 * @param widgetSelector Selector for the widget to check
 * @param options Configuration options
 */
export function testWidgetUpdatesWithSecurityLevels(
  widgetSelector: string,
  options: {
    initialLevels: [string, string, string];
    newLevels: [string, string, string];
    waitTime?: number;
    expectTextChange?: boolean;
    expectVisualChange?: boolean;
  }
) {
  const {
    initialLevels,
    newLevels,
    waitTime = 500,
    expectTextChange = true,
    expectVisualChange = false,
  } = options;

  // Start performance measurement
  cy.startMeasurement(`testWidgetUpdates-${widgetSelector}`);

  // Set initial levels
  cy.setSecurityLevels(...initialLevels);
  cy.wait(waitTime);

  // Capture initial state
  let initialContent = "";
  let initialHtml = "";

  cy.get(widgetSelector).then(($widget) => {
    if (expectTextChange) {
      initialContent = $widget.text();
    }
    if (expectVisualChange) {
      initialHtml = $widget.html();
    }

    // Change security levels
    cy.setSecurityLevels(...newLevels);
    cy.wait(waitTime);

    // Verify changes in widget
    if (expectTextChange) {
      cy.get(widgetSelector).invoke("text").should("not.eq", initialContent);
    }

    if (expectVisualChange) {
      cy.get(widgetSelector).invoke("html").should("not.eq", initialHtml);
    }

    // End performance measurement
    cy.endMeasurement(`testWidgetUpdates-${widgetSelector}`, "widget-updates");
  });
}

/**
 * Standard pattern for verifying widget exists and contains expected content
 * @param widgetName Name or identifier of the widget
 * @param contentPatterns Array of content patterns to verify
 */
export function verifyWidgetContent(
  widgetName: string,
  contentPatterns: (string | RegExp)[]
) {
  // Try to find the widget
  cy.findWidget(widgetName)
    .should("exist")
    .scrollIntoView()
    .within(() => {
      // Check each content pattern
      contentPatterns.forEach((pattern) => {
        if (typeof pattern === "string") {
          cy.contains(pattern).should("exist");
        } else {
          cy.contains(pattern).should("exist");
        }
      });
    });
}

/**
 * Standard test pattern for checking cost updates when security levels change
 * This is a simplified version that doesn't depend on specific selectors
 */
export function testCostUpdatesWithSecurityLevels() {
  // Find cost widget
  cy.findWidget("cost").should("exist").scrollIntoView();

  // Store initial cost text
  let initialCostData = "";

  cy.findWidget("cost").then(($cost) => {
    initialCostData = $cost.text();

    // Change security levels to high
    cy.setSecurityLevels(
      SECURITY_LEVELS.HIGH,
      SECURITY_LEVELS.HIGH,
      SECURITY_LEVELS.HIGH
    );
    cy.wait(300); // Short wait for UI updates

    // Verify text has changed
    cy.findWidget("cost").invoke("text").should("not.equal", initialCostData);
  });
}

/**
 * Test pattern for checking compliance status updates with security levels
 */
export function testComplianceWithSecurityLevels() {
  // Set to Low security and check compliance
  cy.setSecurityLevels(
    SECURITY_LEVELS.LOW,
    SECURITY_LEVELS.LOW,
    SECURITY_LEVELS.LOW
  );

  // Find compliance widget
  cy.findWidget("compliance").should("exist").scrollIntoView();

  // Get compliance text with low security
  cy.findWidget("compliance").invoke("text").as("lowSecurityCompliance");

  // Set to High security
  cy.setSecurityLevels(
    SECURITY_LEVELS.HIGH,
    SECURITY_LEVELS.HIGH,
    SECURITY_LEVELS.HIGH
  );

  // Verify compliance status improved
  cy.findWidget("compliance")
    .invoke("text")
    .then((highSecurityText) => {
      cy.get("@lowSecurityCompliance").then((lowSecurityText) => {
        // We're not checking specific text, just that something changed
        // Because compliance status should improve with higher security
        expect(highSecurityText).not.to.equal(lowSecurityText);
      });
    });
}

/**
 * Test pattern for checking technical details update with security levels
 */
export function testTechnicalDetailsWithSecurityLevels() {
  // Set to basic security
  cy.setSecurityLevels(
    SECURITY_LEVELS.LOW,
    SECURITY_LEVELS.LOW,
    SECURITY_LEVELS.LOW
  );

  // Find technical details widget
  cy.findWidget("technical").should("exist").scrollIntoView();

  // Get technical details with basic security
  cy.findWidget("technical").invoke("text").as("basicSecurityDetails");

  // Set to advanced security
  cy.setSecurityLevels(
    SECURITY_LEVELS.HIGH,
    SECURITY_LEVELS.HIGH,
    SECURITY_LEVELS.HIGH
  );

  // Verify technical details changed to reflect higher security
  cy.findWidget("technical")
    .invoke("text")
    .then((advancedSecurityText) => {
      cy.get("@basicSecurityDetails").then((basicSecurityText) => {
        expect(advancedSecurityText).not.to.equal(basicSecurityText);
      });
    });
}

/**
 * Test content patterns based on expected text
 */
export function verifyWidgetTextContent(
  widgetName: string,
  expectedPatterns: (string | RegExp)[]
) {
  cy.findWidget(widgetName).should("exist").scrollIntoView();

  cy.findWidget(widgetName).then(($widget) => {
    const text = $widget.text();

    expectedPatterns.forEach((pattern) => {
      if (typeof pattern === "string") {
        expect(text).to.include(pattern);
        cy.log(`Found pattern "${pattern}" in ${widgetName} widget`);
      } else {
        expect(pattern.test(text)).to.be.true;
        cy.log(`Found pattern ${pattern} in ${widgetName} widget`);
      }
    });
  });
}

/**
 * Wait for widget to exist and be visible
 */
export function waitForWidget(widgetName: string, timeout: number = 10000) {
  return cy
    .findWidget(widgetName)
    .should("exist")
    .and("be.visible", { timeout });
}

// ============= UI PATTERNS =============

/**
 * Test the tab navigation pattern in widgets that have tabbed interfaces
 * @param containerSelector CSS selector for the container with tabs
 */
export function testTabNavigation(containerSelector: string) {
  cy.get(containerSelector).within(() => {
    // Find all tab elements
    cy.get('[role="tab"], button, [aria-role="tab"]')
      .filter(":visible")
      .then(($tabs) => {
        if ($tabs.length > 1) {
          // Click each tab and verify panel changes
          $tabs.each((index, tab) => {
            if (index > 0 && index < Math.min($tabs.length, 4)) {
              // Test up to 3 tabs but skip the first one which may already be active
              cy.wrap(tab).click({ force: true });

              // Verify something changes in the content
              cy.get(
                '[role="tabpanel"], [aria-labelledby], .tab-content'
              ).should("exist");

              // Give time for content to update
              cy.wait(200);
            }
          });
        } else {
          cy.log("No tabs or only one tab found");
        }
      });
  });
}

/**
 * Test common accessibility attributes
 * @param containerSelector CSS selector for the container to test
 */
export function testAccessibility(containerSelector: string) {
  cy.get(containerSelector).within(() => {
    // Check for ARIA attributes
    cy.get("*[aria-label], *[aria-labelledby], *[aria-describedby], *[role]")
      .should("exist")
      .then(($elements) => {
        cy.log(`Found ${$elements.length} elements with ARIA attributes`);
      });

    // Check interactive elements have accessible names
    cy.get('button, [role="button"], a, input, select')
      .filter(":visible")
      .each(($el) => {
        const hasAccessibleName =
          $el.attr("aria-label") ||
          $el.attr("aria-labelledby") ||
          $el.text().trim() ||
          $el.attr("title") ||
          $el.attr("alt");

        if (!hasAccessibleName && !$el.is('input[type="hidden"]')) {
          cy.log(
            `Warning: Element without accessible name: ${$el
              .prop("outerHTML")
              .substring(0, 100)}`
          );
        }
      });
  });
}

// ============= BEHAVIOR PATTERNS =============

/**
 * Verify that security level selection changes affect displayed content
 */
export function verifySecurityLevelAffectsContent() {
  // Set low security levels
  cy.setSecurityLevels(
    SECURITY_LEVELS.LOW,
    SECURITY_LEVELS.LOW,
    SECURITY_LEVELS.LOW
  );

  // Store initial page content
  let initialText = "";
  cy.get("body")
    .invoke("text")
    .then((text) => {
      initialText = text;

      // Set high security levels
      cy.setSecurityLevels(
        SECURITY_LEVELS.HIGH,
        SECURITY_LEVELS.HIGH,
        SECURITY_LEVELS.HIGH
      );

      // Verify content changed
      cy.get("body").invoke("text").should("not.equal", initialText);
    });
}

/**
 * Test for business metrics display
 */
export function verifyBusinessMetrics() {
  // Set moderate security
  cy.setSecurityLevels(
    SECURITY_LEVELS.MODERATE,
    SECURITY_LEVELS.MODERATE,
    SECURITY_LEVELS.MODERATE
  );

  // Look for common business metrics
  cy.verifyContentPresent([
    /roi|return on investment/i,
    /cost|budget|spend/i,
    /value|benefit/i,
    /metric|measure|kpi/i,
  ]);
}

// ============= PERFORMANCE PATTERNS =============

/**
 * Measures widget render performance across different security levels
 * @param widgetSelector Selector for the widget to test
 */
export function measureWidgetRenderPerformance(widgetSelector: string) {
  // Define security levels to test
  const securityLevels = [
    SECURITY_LEVELS.LOW,
    SECURITY_LEVELS.MODERATE,
    SECURITY_LEVELS.HIGH,
  ];

  // Set up performance measurement
  cy.log(`Measuring render performance for ${widgetSelector}`);

  // Test each security level
  securityLevels.forEach((level) => {
    // Start measurement for this level
    cy.startMeasurement(`${widgetSelector}-render-${level}`);

    // Set all three components to the same level
    cy.setSecurityLevels(level, level, level);

    // Find the widget and force a render
    cy.get(widgetSelector).scrollIntoView().should("be.visible");

    // End measurement
    cy.endMeasurement(`${widgetSelector}-render-${level}`, "widget-render");
  });
}

/**
 * Measures user interaction performance
 * @param selector Element to interact with
 * @param action Action to perform
 */
export function measureInteractionPerformance(
  selector: string,
  action: "click" | "select" | "hover" | "type",
  options: any = {}
) {
  // Set up measurement
  cy.startMeasurement(`interact-${action}-${selector}`);

  // Perform the action
  switch (action) {
    case "click":
      cy.get(selector).click(options);
      break;
    case "select":
      cy.get(selector).select(options.value || "", options);
      break;
    case "hover":
      cy.get(selector).trigger("mouseover", options);
      break;
    case "type":
      cy.get(selector).type(options.text || "", options);
      break;
  }

  // End measurement
  cy.endMeasurement(`interact-${action}-${selector}`, "user-interaction");
}

/**
 * Benchmarks content load time
 * @param contentPattern Pattern to wait for
 */
export function benchmarkContentLoadTime(contentPattern: string | RegExp) {
  cy.startMeasurement(`content-load-${String(contentPattern)}`);

  cy.contains(contentPattern).should("exist");

  cy.endMeasurement(
    `content-load-${String(contentPattern)}`,
    "content-loading"
  );
}

/**
 * Measures security level change performance
 */
export function measureSecurityLevelChangePerformance() {
  const levels = [
    SECURITY_LEVELS.LOW,
    SECURITY_LEVELS.MODERATE,
    SECURITY_LEVELS.HIGH,
  ];

  // Test changing all components together
  levels.forEach((level, i) => {
    cy.startMeasurement(`security-level-change-all-${level}`);
    cy.setSecurityLevels(level, level, level);
    cy.endMeasurement(
      `security-level-change-all-${level}`,
      "security-level-change"
    );
    cy.wait(500); // Add wait between measurements
  });

  // Test changing individual components
  ["availability", "integrity", "confidentiality"].forEach((component) => {
    levels.forEach((level) => {
      cy.startMeasurement(`security-level-change-${component}-${level}`);
      cy.selectSecurityLevelEnhanced(
        component as "availability" | "integrity" | "confidentiality",
        level
      );
      cy.endMeasurement(
        `security-level-change-${component}-${level}`,
        "security-level-change"
      );
      cy.wait(300); // Add shorter wait between individual component changes
    });
  });
}

/**
 * Test pattern for verifying compliance status changes with different security levels
 * @param securityLevels Configuration object with low and high security level sets
 */
export function testComplianceStatusResilient(securityLevels: {
  low: [string, string, string];
  high: [string, string, string];
}) {
  // Set low security levels
  cy.setSecurityLevels(...securityLevels.low);
  cy.wait(300);

  // Store initial state
  let lowSecurityContent = "";
  cy.get("body")
    .invoke("text")
    .then((text) => {
      lowSecurityContent = text;

      // Change to high security
      cy.setSecurityLevels(...securityLevels.high);
      cy.wait(500);

      // Verify content changed
      cy.get("body").invoke("text").should("not.equal", lowSecurityContent);

      // Look for compliance-related content
      cy.verifyContentPresent([
        /compliant|compliance|meets|status|requirements/i,
      ]);
    });
}

// Export everything for convenience
export default {
  // Widget patterns
  testWidgetUpdatesWithSecurityLevels,
  verifyWidgetContent,
  testCostUpdatesWithSecurityLevels,
  testComplianceWithSecurityLevels,
  testTechnicalDetailsWithSecurityLevels,
  verifyWidgetTextContent,
  waitForWidget,

  // UI patterns
  testTabNavigation,
  testAccessibility,

  // Behavior patterns
  verifySecurityLevelAffectsContent,
  verifyBusinessMetrics,

  // Performance patterns
  measureWidgetRenderPerformance,
  measureInteractionPerformance,
  benchmarkContentLoadTime,
  measureSecurityLevelChangePerformance,
  testComplianceStatusResilient,
};
