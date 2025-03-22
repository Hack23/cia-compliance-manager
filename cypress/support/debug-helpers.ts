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
export function debugFailure(testName: string): void {
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
 * Debug test failures with comprehensive info including widget content
 */
export function debugFailedTest(testName: string): void {
  cy.screenshot(`failed-test-${testName.replace(/\s+/g, "-")}`, {
    capture: "viewport",
  });

  // Log widget content to help debug what's visible
  cy.log("Logging content of widgets for debugging");
  cy.get('[data-testid*="widget"], [class*="widget"]').each(
    ($widget, index) => {
      const testId = $widget.attr("data-testid") || `unknown-widget-${index}`;
      const content = $widget.text().substring(0, 200); // Limit to first 200 chars
      cy.log(
        `Widget ${testId} content: ${content}${content.length >= 200 ? "..." : ""
        }`
      );
    }
  );

  // Log security levels if possible
  cy.get("select").then(($selects) => {
    if ($selects.length >= 3) {
      const levels = [
        $selects.eq(0).val(),
        $selects.eq(1).val(),
        $selects.eq(2).val(),
      ];
      cy.log(`Current security levels: ${levels.join(", ")}`);
    }
  });

  // Check for error messages in the console or DOM
  cy.window().then((win) => {
    if (win.consoleErrors && win.consoleErrors.length > 0) {
      cy.log("Console errors found:");
      win.consoleErrors.forEach((err: string, i: number) => {
        cy.log(`${i + 1}. ${err.substring(0, 300)}`);
      });
    }
  });
}

/**
 * Logs info about currently visible elements
 */
export function logVisibleElements(): void {
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
export function logAllTestIds(): void {
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

    // Also log any elements with 'widget' in class or id
    const widgetElements = doc.querySelectorAll(
      "[class*='widget'], [id*='widget']"
    );
    cy.log(
      `Found ${widgetElements.length} elements with widget in class or id`
    );

    if (widgetElements.length > 0 && widgetElements.length <= 10) {
      Array.from(widgetElements).forEach((el, i) => {
        cy.log(
          `Widget element ${i + 1}: class="${el.className}", id="${el.id}"`
        );
      });
    }
  });
}

/**
 * Logs the current DOM structure for debugging
 */
export function logDomStructure(selector = "body > *"): void {
  cy.get(selector).then(($elements) => {
    cy.log(`DOM Structure for "${selector}" (${$elements.length} elements):`);

    $elements.each((i, el) => {
      if (i < 10) {
        // Limit to first 10 elements
        const $el = Cypress.$(el);
        cy.log(
          `${i + 1}: ${el.tagName.toLowerCase()}${el.id ? "#" + el.id : ""
          } - classes: ${el.className}`
        );
      }
    });

    if ($elements.length > 10) {
      cy.log(`...and ${$elements.length - 10} more elements`);
    }
  });
}

/**
 * Takes screenshots of all widgets for debugging
 */
export function screenshotAllWidgets(): void {
  cy.get('[data-testid*="widget"], [class*="widget"]').each(($widget, i) => {
    const testId = $widget.attr("data-testid") || `widget-${i}`;
    cy.wrap($widget)
      .scrollIntoView()
      .screenshot(`widget-${testId}`, { capture: "viewport" });
  });
}

// Register commands once
function registerDebugCommands(): void {
  // Register debug helpers with proper options
  Cypress.Commands.add(
    "debugFailure",
    { prevSubject: true }, // Fix: Use boolean value
    (testName: string) => {
      debugFailure(testName);
      return cy.wrap(null);
    }
  );

  Cypress.Commands.add("logVisibleElements", { prevSubject: "optional" }, () => {
    logVisibleElements();
    return cy.wrap(null);
  });

  Cypress.Commands.add("logAllTestIds", { prevSubject: "optional" }, () => {
    logAllTestIds();
    return cy.wrap(null);
  });

  Cypress.Commands.add("highlight", { prevSubject: "element" }, (subject) => {
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

  Cypress.Commands.add("analyzeWidgetsOnPage", { prevSubject: "optional" }, () => {
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

  // Fix: Register debugFailedTest command properly with correct typing
  Cypress.Commands.add(
    "debugFailedTest",
    { prevSubject: true }, // Fix: Use boolean value
    (testName: string) => {
      debugFailedTest(testName);
      return cy.wrap(null);
    }
  );
}

// Initialize commands
registerDebugCommands();

// Export helpers object
export default {
  debugFailure,
  debugFailedTest,
  logAllTestIds,
  logVisibleElements,
  logDomStructure,
  screenshotAllWidgets,
};
