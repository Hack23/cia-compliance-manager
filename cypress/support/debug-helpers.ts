/**
 * Debug helpers for Cypress tests
 * These utilities help diagnose and fix test failures
 */

// Properly define interface for window with debug properties
interface WindowWithDebug extends Omit<Cypress.AUTWindow, "Infinity" | "NaN"> {
  consoleErrors?: string[];
  __REACT_APP_STATE__?: unknown;
  // Don't include number index signatures that conflict with Window
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
        `Widget ${testId} content: ${content}${
          content.length >= 200 ? "..." : ""
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
/**
 * Analyzes available widgets on the page for debugging test failures
 */
export function analyzeWidgets(): void {
  cy.document().then((doc) => {
    const widgetElements = doc.querySelectorAll(
      '[data-testid*="widget"], [class*="widget"]'
    );
    cy.log(`Found ${widgetElements.length} potential widget elements`);

    // Log details about each widget
    Array.from(widgetElements)
      .slice(0, 10)
      .forEach((el, i) => {
        const testId = el.getAttribute("data-testid") || "no-test-id";
        const className = el.className;
        const visible = el.getBoundingClientRect().height > 0;
        const textLength = el.textContent?.length || 0;

        cy.log(
          `Widget ${
            i + 1
          }: testId="${testId}", visible=${visible}, textLength=${textLength}, class="${className}"`
        );
      });

    // Capture screenshot of page state
    cy.screenshot("widget-analysis-debug");
  });
}

// Register commands once
function registerDebugCommands(): void {
  // Register commands with proper typing
  Cypress.Commands.add("debugFailure", (testName: string) => {
    debugFailure(testName);
    return cy.wrap(null);
  });

  Cypress.Commands.add("logVisibleElements", () => {
    logVisibleElements();
    return cy.wrap(null);
  });

  Cypress.Commands.add("logAllTestIds", () => {
    logAllTestIds();
    return cy.wrap(null);
  });

  Cypress.Commands.add("highlight", { prevSubject: true }, ($el) => {
    // Add a highlight style to the element
    if ($el && $el.length) {
      // TypeScript knows the type here due to prevSubject: true
      $el.css({
        border: "3px solid red",
        "background-color": "yellow",
        opacity: "0.8",
      });

      // Remove the highlight after a moment
      setTimeout(() => {
        $el.css({
          border: "",
          "background-color": "",
          opacity: "",
        });
      }, 2000);
    }

    return $el;
  });

  Cypress.Commands.add("analyzeWidgetsOnPage", () => {
    cy.log("Analyzing widgets on page...");

    // Common widget test IDs from the DOM analysis
    const widgetIds = [
      "widget-security-level-selection",
      // ...existing code...
    ];

    // Check for each widget
    widgetIds.forEach((widgetId) => {
      cy.get(`[data-testid="${widgetId}"]`).then(($widget) => {
        // ...existing code...
      });
    });

    return cy.wrap(null);
  });

  // Fix: Register debugFailedTest command properly
  Cypress.Commands.add("debugFailedTest", (testName: string) => {
    debugFailedTest(testName);
    return cy.wrap(null);
  });

  Cypress.Commands.add("analyzeWidgets", () => {
    analyzeWidgets();
    return cy.wrap(null);
  });
}

// Initialize commands
registerDebugCommands();

/**
 * Debug a failed test with enhanced logging and screenshots
 * This should be used in a test context, not directly in afterEach
 */
Cypress.Commands.add("debugFailedTest", (testName: string) => {
  cy.log(`Debugging failed test: ${testName}`);

  // Take a screenshot of the current state
  cy.screenshot(`debug-${testName.replace(/\s+/g, "-")}`);

  // Log DOM structure
  cy.document().then((doc) => {
    cy.log(`Page title: ${doc.title}`);

    // Log testids
    const testIdElements = doc.querySelectorAll("[data-testid]");
    cy.log(`Found ${testIdElements.length} elements with data-testid`);

    Array.from(testIdElements)
      .slice(0, 10)
      .forEach((el) => {
        cy.log(`Element with data-testid="${el.getAttribute("data-testid")}"`);
      });

    // Check for error messages
    const errorElements = doc.querySelectorAll('.error, [role="alert"]');
    if (errorElements.length > 0) {
      cy.log(`Found ${errorElements.length} error elements`);
      Array.from(errorElements).forEach((el) => {
        cy.log(`Error element content: ${el.textContent}`);
      });
    }
  });
});

// Add more debug helpers as needed

// Make sure to declare the types
declare global {
  namespace Cypress {
    interface Chainable<Subject = any> {
      debugFailedTest(testName: string): Chainable<null>;
      analyzeWidgets(): Chainable<null>;
      logVisibleElements(): Chainable<null>;
      logAllTestIds(): Chainable<null>;
      highlight(): Chainable<JQuery<HTMLElement>>;
      analyzeWidgetsOnPage(): Chainable<null>;
    }
  }
}

// Export helpers object
export default {
  debugFailedTest,
  logAllTestIds,
  logVisibleElements,
  analyzeWidgets,
};
