/**
 * Debug helpers for Cypress tests
 * These utilities help diagnose and fix test failures
 */

// Simplified interface for window with debug properties
interface WindowWithDebug extends Window {
  [key: string]: any; // Allow dynamic property access
  consoleErrors?: string[];
  __REACT_APP_STATE__?: any;
}

/**
 * Takes a screenshot with current test info and logs DOM state
 */
function debugFailure(testName: string): void {
  cy.screenshot(`debug-${testName.replace(/\s+/g, "-")}`, {
    capture: "viewport",
  });
  cy.document().then((doc) => {
    console.log(
      `HTML at failure point for ${testName}:`,
      doc.body.outerHTML.substring(0, 1000) + "..."
    );
  });
}

/**
 * Logs info about currently visible elements
 */
function logVisibleElements(): void {
  cy.log("**Visible Elements on Page**");

  cy.document().then((doc) => {
    const allElements = Array.from(doc.querySelectorAll("*"));
    const visibleElements = allElements.filter((el) => {
      const style = window.getComputedStyle(el);
      return (
        style.display !== "none" &&
        style.visibility !== "hidden" &&
        style.opacity !== "0" &&
        el.getBoundingClientRect().height > 0
      );
    });

    const testIdElements = visibleElements.filter((el) =>
      el.hasAttribute("data-testid")
    );

    const testIds = testIdElements.map(
      (el) => `"${el.getAttribute("data-testid")}"`
    );

    cy.log(`Total elements: ${allElements.length}`);
    cy.log(`Visible elements: ${visibleElements.length}`);
    cy.log(`Elements with data-testid: ${testIdElements.length}`);
    cy.log(`TestIDs: ${testIds.join(", ")}`);
  });
}

/**
 * Logs all test IDs present in the DOM for debugging
 */
function logAllTestIds() {
  cy.document().then((doc) => {
    const elements = doc.querySelectorAll("[data-testid]");
    cy.log(`Found ${elements.length} elements with data-testid`);

    const testIds = Array.from(elements).map((el) =>
      el.getAttribute("data-testid")
    );
    cy.log("Available test IDs:");
    testIds.forEach((id, index) => {
      if (index < 20) {
        // Limit logging to first 20
        cy.log(`- ${id}`);
      }
    });

    if (testIds.length > 20) {
      cy.log(`...and ${testIds.length - 20} more`);
    }
  });
}

/**
 * Shows a visual highlight around elements matching a selector
 */
function addHighlightCommand() {
  Cypress.Commands.add("highlight", { prevSubject: ["element"] }, (subject) => {
    cy.wrap(subject).then(($el) => {
      $el.css({
        border: "3px solid red",
        "background-color": "yellow",
        opacity: "0.8",
      });

      // Restore after 2 seconds
      setTimeout(() => {
        $el.css({
          border: "",
          "background-color": "",
          opacity: "",
        });
      }, 2000);

      return $el;
    });
  });
}

/**
 * Dumps state information about the app from the window object
 */
function addDumpAppStateCommand() {
  Cypress.Commands.add("dumpAppState", () => {
    cy.window().then((win) => {
      // Only log if state is available
      if (win.store && win.store.getState) {
        console.log("App State:", win.store.getState());
      } else {
        console.log("App window object:", win);
      }
    });
  });
}

/**
 * Log widget structure to help with debugging widget-related tests
 */
function addLogWidgetStructureCommand() {
  Cypress.Commands.add("logWidgetStructure", () => {
    cy.get('[data-testid*="widget"]').then(($widgets) => {
      cy.log(`Found ${$widgets.length} widgets on the page`);

      $widgets.each((index, widget) => {
        const $widget = Cypress.$(widget);
        const testId = $widget.attr("data-testid");
        const title = $widget.find("h2,h3,h4").first().text().trim();
        const visible = $widget.is(":visible");

        cy.log(`Widget ${index + 1}: ${testId || "No test ID"}`);
        cy.log(`- Title: ${title || "No title"}`);
        cy.log(`- Visible: ${visible ? "Yes" : "No"}`);
        cy.log(`- Children: ${$widget.children().length}`);
      });
    });

    return cy.wrap(null);
  });
}

/**
 * Log diagnostic information about security level controls
 */
function addDebugSecurityControlsCommand() {
  Cypress.Commands.add("debugSecurityControls", () => {
    const selectors = [
      '[data-testid="security-level-controls"]',
      '[data-testid*="security-level"]',
      'select[name*="security"]',
      "select",
    ];

    selectors.forEach((selector) => {
      cy.get("body").then(($body) => {
        const found = $body.find(selector).length;
        cy.log(`Selector "${selector}": found ${found} elements`);

        if (found > 0) {
          cy.get(selector).then(($els) => {
            cy.log(`First match details:`);
            cy.log(
              `- HTML: ${$els.eq(0).prop("outerHTML").substring(0, 100)}...`
            );
          });
        }
      });
    });

    return cy.wrap(null);
  });
}

/**
 * Log information about application state
 */
function addLogAppStateCommand() {
  Cypress.Commands.add("logAppState", () => {
    cy.window().then((win) => {
      // Log React app state if available
      if (win.__REACT_APP_STATE__) {
        cy.log("React App State:");
        console.log("React App State:", win.__REACT_APP_STATE__);
      } else {
        cy.log("React app state not exposed to window");
      }

      // Log errors
      if (win.consoleErrors && win.consoleErrors.length) {
        cy.log(`Console Errors (${win.consoleErrors.length}):`);
        win.consoleErrors.forEach((err, i) => {
          cy.log(`${i + 1}: ${String(err).substring(0, 100)}...`);
        });
      }
    });

    return cy.wrap(null);
  });
}

/**
 * Logs detailed analysis of widget structure on the page
 * Enhanced with DOM test ID analysis
 */
function addAnalyzeWidgetsOnPageCommand() {
  Cypress.Commands.add("analyzeWidgetsOnPage", () => {
    cy.log("Analyzing widgets on page...");

    // Common widget test IDs from the DOM analysis
    const widgetIds = [
      "widget-security-level-selection",
      "widget-security-summary",
      "widget-business-impact-container",
      "widget-technical-details-container",
      "widget-cost-estimation",
      "widget-value-creation",
      "widget-compliance-status",
      "widget-radar-chart",
      "widget-availability-impact-container",
      "widget-integrity-impact-container",
      "widget-confidentiality-impact-container",
      "widget-security-resources-container",
      "widget-cia-impact-summary",
    ];

    // Check for each widget
    widgetIds.forEach((widgetId) => {
      cy.get(`[data-testid="${widgetId}"]`).then(($widget) => {
        if ($widget.length) {
          cy.log(`✅ Found widget: ${widgetId}`);
          // Log additional details about the widget
          cy.log(`  - Visible: ${$widget.is(":visible")}`);
          cy.log(`  - Children: ${$widget.children().length}`);
          cy.log(`  - Text: ${$widget.text().substring(0, 50)}...`);
        } else {
          cy.log(`❌ Widget not found: ${widgetId}`);
        }
      });
    });

    return cy.wrap(null);
  });
}

// Register all commands once
function registerCommands() {
  // Register debug helpers with proper options
  Cypress.Commands.add(
    "debugFailure",
    { prevSubject: false },
    (testName: string) => {
      debugFailure(testName);
    }
  );

  Cypress.Commands.add("logVisibleElements", { prevSubject: false }, () => {
    logVisibleElements();
  });

  Cypress.Commands.add("logAllTestIds", { prevSubject: false }, () => {
    logAllTestIds();
  });

  // Register the debug commands
  addHighlightCommand();
  addDumpAppStateCommand();
  addLogWidgetStructureCommand();
  addDebugSecurityControlsCommand();
  addLogAppStateCommand();
  addAnalyzeWidgetsOnPageCommand();
}

// Initialize all commands
registerCommands();

// Export the functions for direct use in tests
export { debugFailure, logAllTestIds, logVisibleElements };
