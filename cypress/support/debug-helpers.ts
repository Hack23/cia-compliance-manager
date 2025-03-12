/**
 * Debug helpers for Cypress tests
 * These utilities help diagnose and fix test failures
 */

// Add custom window type extension for store property
declare global {
  interface Window {
    store?: {
      getState(): unknown;
    };
    // Add performance recorder to window
    cypressPerformanceMetrics?: {
      records: PerformanceRecord[];
      startTime: number;
    };
  }
}

// First, add type definitions
declare global {
  namespace Cypress {
    interface Chainable<Subject> {
      /**
       * Takes a screenshot and logs DOM state at failure point
       * @param testName Name of the test that failed
       */
      debugFailure(testName: string): void;

      /**
       * Logs information about currently visible elements
       */
      logVisibleElements(): void;

      /**
       * Logs all test IDs present in the DOM for debugging
       */
      logAllTestIds(): void;

      /**
       * Visually highlights an element temporarily
       */
      highlight(): Chainable<Element>;

      /**
       * Measures the execution time of a Cypress chain
       */
      measureTime<T>(
        fn: () => Cypress.Chainable<T>,
        label?: string
      ): Cypress.Chainable<T>;

      /**
       * Logs the current application state
       */
      dumpAppState(): Chainable<void>;

      /**
       * Collects performance metrics for operations
       * @param operationName Name of the operation being measured
       * @param category Category of the operation (e.g., 'dom', 'network', 'rendering')
       */
      collectPerformanceMetrics(
        operationName: string,
        category?: string
      ): Chainable<Subject>;

      /**
       * Starts a performance measurement
       * @param label Name of the operation to measure
       */
      startMeasurement(label: string): Chainable<void>;

      /**
       * Ends a performance measurement and records the result
       * @param label Name of the operation that was measured
       * @param category Optional category for filtering metrics
       */
      endMeasurement(label: string, category?: string): Chainable<number>;

      /**
       * Generates a performance report for the current test
       */
      generatePerformanceReport(): Chainable<void>;
    }
  }
}

// Define performance record interface
interface PerformanceRecord {
  operation: string;
  duration: number;
  timestamp: number;
  category?: string;
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
export function logAllTestIds() {
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
 * Initialize performance metrics collection
 */
export function initPerformanceCollection() {
  cy.window().then((win) => {
    win.cypressPerformanceMetrics = {
      records: [],
      startTime: performance.now(),
    };
  });
}

/**
 * Helper to record a performance metric
 */
export function recordPerformanceMetric(
  operationName: string,
  duration: number,
  category = "general"
) {
  cy.window().then((win) => {
    if (!win.cypressPerformanceMetrics) {
      win.cypressPerformanceMetrics = {
        records: [],
        startTime: performance.now(),
      };
    }

    win.cypressPerformanceMetrics.records.push({
      operation: operationName,
      duration,
      timestamp: performance.now(),
      category,
    });

    // Log to console if it's unusually slow (over 1000ms)
    if (duration > 1000) {
      cy.log(
        `⚠️ SLOW OPERATION: "${operationName}" took ${duration.toFixed(2)}ms`
      );
    }
  });
}

/**
 * Generate a performance report for current test
 */
export function generatePerformanceReport() {
  cy.window().then((win) => {
    if (
      !win.cypressPerformanceMetrics ||
      win.cypressPerformanceMetrics.records.length === 0
    ) {
      cy.log("No performance metrics collected for this test");
      return;
    }

    const { records, startTime } = win.cypressPerformanceMetrics;
    const totalTestTime = performance.now() - startTime;

    // Group by category
    const categorizedMetrics: Record<string, PerformanceRecord[]> = {};
    records.forEach((record) => {
      const category = record.category || "general";
      if (!categorizedMetrics[category]) {
        categorizedMetrics[category] = [];
      }
      categorizedMetrics[category].push(record);
    });

    // Output report
    cy.log(
      `📊 Performance Report - Total test time: ${totalTestTime.toFixed(2)}ms`
    );

    Object.entries(categorizedMetrics).forEach(([category, metrics]) => {
      const totalCategoryTime = metrics.reduce(
        (sum, record) => sum + record.duration,
        0
      );
      const avgTime = totalCategoryTime / metrics.length;

      cy.log(`Category: ${category}`);
      cy.log(`  Operations: ${metrics.length}`);
      cy.log(`  Total time: ${totalCategoryTime.toFixed(2)}ms`);
      cy.log(`  Average time: ${avgTime.toFixed(2)}ms`);

      // Find slowest operations
      const slowestOps = [...metrics]
        .sort((a, b) => b.duration - a.duration)
        .slice(0, 3);

      if (slowestOps.length > 0) {
        cy.log("  Slowest operations:");
        slowestOps.forEach((op) => {
          cy.log(`    - ${op.operation}: ${op.duration.toFixed(2)}ms`);
        });
      }
    });

    // Save metrics to Cypress artifacts if running in CI
    if (Cypress.env("CI")) {
      cy.task("writePerformanceMetrics", {
        testName: Cypress.currentTest.title,
        metrics: records,
        totalTime: totalTestTime,
      });
    }
  });
}

/**
 * Add these debug helpers to Cypress commands
 */
Cypress.Commands.add("debugFailure", debugFailure);
Cypress.Commands.add("logVisibleElements", logVisibleElements);
Cypress.Commands.add("logAllTestIds", logAllTestIds);

/**
 * Shows a visual highlight around elements matching a selector
 * Useful for debugging what elements are being found
 */
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

/**
 * Prints timing information for performance debugging
 */
Cypress.Commands.add("measureTime", (fn, label = "Operation") => {
  const start = performance.now();

  return fn().then((result) => {
    const end = performance.now();
    const duration = end - start;
    cy.log(`${label} took ${duration.toFixed(2)}ms`);
    return result;
  });
});

/**
 * Dumps state information about the app from the window object
 */
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

// Add commands for performance metrics
Cypress.Commands.add(
  "collectPerformanceMetrics",
  { prevSubject: true },
  (subject, operationName, category) => {
    const startTime = performance.now();

    // Return the subject with a .then() that measures the time after the chain completes
    return cy.wrap(subject).then((result) => {
      const duration = performance.now() - startTime;
      recordPerformanceMetric(operationName, duration, category);
      return result;
    });
  }
);

interface WindowWithMeasurements extends Window {
  [key: string]: any; // Allow dynamic property access
}

/**
 * Start measuring time for an operation
 */
Cypress.Commands.add("startMeasurement", (label: string): void => {
  // Store start time in Cypress.env
  Cypress.env(`perf_start_${label}`, performance.now());
  cy.log(`Starting measurement: ${label}`);
});

Cypress.Commands.add("endMeasurement", (label: string, category?: string) => {
  return cy.window().then((win: WindowWithMeasurements) => {
    const measureKey = `__cypress_measure_${label}`;
    const endTime = performance.now();

    if (typeof win[measureKey] !== "number") {
      cy.log(`⚠️ No measurement started for "${label}"`);
      return cy.wrap(0);
    }

    const duration = endTime - win[measureKey];
    recordPerformanceMetric(label, duration, category);

    // Clean up
    delete win[measureKey];

    return cy.wrap(duration);
  });
});

Cypress.Commands.add("generatePerformanceReport", generatePerformanceReport);

export default {
  debugFailure,
  logVisibleElements,
  logAllTestIds,
  initPerformanceCollection,
  recordPerformanceMetric,
  generatePerformanceReport,
};

/**
 * Debug helper functions for Cypress tests
 */

/**
 * Log all visible elements with test IDs on the page
 */
Cypress.Commands.add("logVisibleElements", () => {
  cy.get("[data-testid]").then(($elements) => {
    cy.log(`Found ${$elements.length} elements with data-testid attributes`);

    // Log first 10 elements
    const maxElementsToLog = 10;
    const elementsToLog = Math.min($elements.length, maxElementsToLog);

    for (let i = 0; i < elementsToLog; i++) {
      const $el = $elements.eq(i);
      const testId = $el.attr("data-testid");
      const visible = $el.is(":visible");
      const text = $el.text().trim().substring(0, 30);

      cy.log(
        `${i + 1}. [${testId}] ${visible ? "✅" : "❌"} "${text}${
          text.length > 30 ? "..." : ""
        }"`
      );
    }

    if ($elements.length > maxElementsToLog) {
      cy.log(`...and ${$elements.length - maxElementsToLog} more elements`);
    }
  });

  return cy.wrap(null);
});

/**
 * Log all test IDs available on the page
 */
Cypress.Commands.add("logAllTestIds", () => {
  cy.get("[data-testid]").then(($elements) => {
    const testIds = Array.from($elements).map((el) =>
      el.getAttribute("data-testid")
    );

    cy.log(`All test IDs (${testIds.length}):`);
    for (let i = 0; i < Math.min(testIds.length, 20); i++) {
      cy.log(`- ${testIds[i]}`);
    }
    if (testIds.length > 20) {
      cy.log(`...and ${testIds.length - 20} more`);
    }
  });

  return cy.wrap(null);
});

/**
 * Log widget structure to help with debugging widget-related tests
 */
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

/**
 * Log diagnostic information about security level controls
 */
Cypress.Commands.add("debugSecurityControls", () => {
  // Try to find security controls with different selectors
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

/**
 * Log information about application state
 */
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

// Add to Cypress types
declare global {
  namespace Cypress {
    interface Chainable {
      logVisibleElements(): Chainable<null>;
      logAllTestIds(): Chainable<null>;
      logWidgetStructure(): Chainable<null>;
      debugSecurityControls(): Chainable<null>;
      logAppState(): Chainable<null>;
    }
  }
}
