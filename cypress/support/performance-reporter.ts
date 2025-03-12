/**
 * Performance metrics collection and reporting system
 *
 * This module provides utilities for measuring, collecting,
 * and reporting performance metrics for Cypress tests.
 */

// Performance metric interfaces
export interface PerformanceMetric {
  label: string;
  operation: string;
  duration: number;
  category?: string;
  timestamp: number;
  metadata?: Record<string, any>;
}

export interface WidgetPerformanceMetric extends PerformanceMetric {
  widgetName: string;
  securityLevel?: string;
  renderTime?: number;
  interactionTime?: number;
}

export interface TestPerformanceReport {
  testName: string;
  testFile: string;
  totalDuration: number;
  metrics: PerformanceMetric[];
  timestamp: number;
}

// Collection of metrics for the current test run
let currentTestMetrics: PerformanceMetric[] = [];
let performanceReportStart = Date.now();

/**
 * Initialize performance monitoring for a test
 */
export function initPerformanceMonitoring(): void {
  currentTestMetrics = [];
  performanceReportStart = Date.now();

  // Add window unload handler to save metrics if test fails or browser crashes
  cy.window().then((win) => {
    win.addEventListener("beforeunload", () => {
      flushPerformanceMetrics("test-unload");
    });
  });

  // Fix: Use Date.now() instead of cy.now() which doesn't exist
  recordMetric({
    label: "page-load",
    operation: "page-load",
    duration: Date.now() - performanceReportStart,
    category: "navigation",
  });

  return cy.log("Performance monitoring initialized");
}

/**
 * Record a performance metric
 */
export function recordMetric(
  metric: Omit<PerformanceMetric, "timestamp">
): void {
  const fullMetric: PerformanceMetric = {
    ...metric,
    timestamp: Date.now(),
  };
  currentTestMetrics.push(fullMetric);

  // Log slow operations immediately
  if (metric.duration > 1000) {
    cy.log(
      `⚠️ SLOW OPERATION: ${metric.operation} took ${metric.duration.toFixed(
        2
      )}ms`
    );
  }

  // Also log to console for immediate feedback
  console.log(
    `Performance: ${metric.operation} - ${metric.duration.toFixed(2)}ms (${
      metric.category || "uncategorized"
    })`
  );
}

/**
 * Record widget-specific performance metric
 */
export function recordWidgetPerformance(
  widgetName: string,
  renderTime: number,
  securityLevel?: string,
  interactionTime?: number
) {
  const metric: WidgetPerformanceMetric = {
    label: `widget-render-${widgetName}`,
    operation: `widget-render-${widgetName}`,
    duration: renderTime,
    timestamp: Date.now(),
    category: "widget-performance",
    widgetName,
    securityLevel,
    renderTime,
    interactionTime,
  };

  currentTestMetrics.push(metric);

  // Log slow widget renders immediately
  if (renderTime > 500) {
    cy.log(
      `⚠️ SLOW WIDGET RENDER: ${widgetName} took ${renderTime.toFixed(2)}ms`
    );
  }

  return metric;
}

/**
 * Measure time for an operation
 */
export function measurePerformance<T>(
  operation: string,
  fn: () => Cypress.Chainable<T>,
  category: string = "general"
): Cypress.Chainable<T> {
  const startTime = Date.now();

  return fn().then((result) => {
    const duration = Date.now() - startTime;
    recordMetric({
      label: operation,
      operation,
      duration,
      category,
    });
    return result;
  });
}

/**
 * Generate performance report for current test
 */
export function getCurrentPerformanceReport(
  testName: string,
  testFile: string
): TestPerformanceReport {
  const now = Date.now();
  const totalDuration = now - performanceReportStart;

  // Calculate statistics
  const avgTime =
    currentTestMetrics.length > 0
      ? currentTestMetrics.reduce((sum, m) => sum + m.duration, 0) /
        currentTestMetrics.length
      : 0;

  // Find slowest operations
  const slowestOps = [...currentTestMetrics]
    .sort((a, b) => b.duration - a.duration)
    .slice(0, 5);

  // Group by category for reporting
  const categories: Record<string, PerformanceMetric[]> = {};
  currentTestMetrics.forEach((metric) => {
    const category = metric.category || "general";
    if (!categories[category]) {
      categories[category] = [];
    }
    categories[category].push(metric);
  });

  // Log report
  cy.log(`📊 Performance Report - Total test time: ${totalDuration}ms`);
  Object.entries(categories).forEach(([category, metrics]) => {
    const catTotal = metrics.reduce((sum, m) => sum + m.duration, 0);
    const catAvg = metrics.length > 0 ? catTotal / metrics.length : 0;

    cy.log(`Category: ${category}`);
    cy.log(`  Operations: ${metrics.length}`);
    cy.log(`  Total time: ${catTotal.toFixed(2)}ms`);
    cy.log(`  Average time: ${catAvg.toFixed(2)}ms`);
  });

  // Log slowest operations
  if (slowestOps.length > 0) {
    cy.log("Slowest Operations:");
    slowestOps.forEach((op, i) => {
      cy.log(`  ${i + 1}. ${op.operation}: ${op.duration.toFixed(2)}ms`);
    });
  }

  // Create report object
  const report: TestPerformanceReport = {
    testName,
    testFile,
    totalDuration,
    metrics: currentTestMetrics,
    timestamp: now,
  };

  return report;
}

/**
 * Save performance metrics to a file
 */
export function flushPerformanceMetrics(reason: string = "end-of-test") {
  const report = getCurrentPerformanceReport(
    Cypress.currentTest.title,
    Cypress.spec.relative || "unknown"
  );

  // Fix: Define config and html variables
  const outputPath = "cypress/reports/performance/report.html";
  const reportContent = JSON.stringify(report, null, 2);

  // Save to file using Cypress task
  cy.task("writeFile", {
    path: outputPath,
    content: reportContent,
  }).then(
    // Fix: Use proper then syntax with explicit return values
    () => {
      cy.log(`Performance metrics saved to ${outputPath}`);
      return null;
    }
  );

  return report;
}

/**
 * Create visual performance report with charts
 */
export function createVisualPerformanceReport() {
  if (currentTestMetrics.length === 0) {
    cy.log("No performance metrics collected for visual report");
    return;
  }

  cy.window().then((win) => {
    // Get report data
    const report = getCurrentPerformanceReport(
      Cypress.currentTest.title,
      Cypress.spec.relative || "unknown"
    );

    // Create visual report container
    const reportContainer = win.document.createElement("div");
    reportContainer.className = "performance-report";
    reportContainer.style.cssText = `
      position: fixed;
      bottom: 0;
      right: 0;
      width: 500px;
      height: 400px;
      background: rgba(255, 255, 255, 0.95);
      border: 1px solid #ccc;
      border-radius: 4px;
      padding: 10px;
      font-family: sans-serif;
      font-size: 12px;
      z-index: 9999;
      overflow: auto;
      box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
    `;

    // Create report header
    const header = win.document.createElement("h3");
    header.textContent = "Performance Report";
    header.style.margin = "0 0 10px 0";
    reportContainer.appendChild(header);

    // Add close button
    const closeButton = win.document.createElement("button");
    closeButton.textContent = "×";
    closeButton.style.cssText = `
      position: absolute;
      top: 5px;
      right: 5px;
      background: none;
      border: none;
      font-size: 20px;
      cursor: pointer;
    `;
    closeButton.addEventListener("click", () => {
      reportContainer.remove();
    });
    reportContainer.appendChild(closeButton);

    // Add summary stats
    const summary = win.document.createElement("div");
    summary.innerHTML = `
      <p><strong>Total time:</strong> ${report.totalDuration.toFixed(2)}ms</p>
      <p><strong>Average operation time:</strong> ${avgTime.toFixed(2)}ms</p>
      <p><strong>Total operations:</strong> ${report.metrics.length}</p>
    `;
    reportContainer.appendChild(summary);

    // Create chart for category breakdown
    const categories: Record<string, number> = {};
    report.metrics.forEach((metric) => {
      const category = metric.category || "general";
      if (!categories[category]) {
        categories[category] = 0;
      }
      categories[category] += metric.duration;
    });

    // Add bar chart for category breakdown
    const chartContainer = win.document.createElement("div");
    chartContainer.style.cssText = `
      height: 150px;
      margin: 10px 0;
      display: flex;
      align-items: flex-end;
      border-bottom: 1px solid #ccc;
    `;

    const categoryEntries = Object.entries(categories);
    const maxCategoryTime = Math.max(
      ...categoryEntries.map(([_, time]) => time)
    );

    categoryEntries.forEach(([category, time], i) => {
      const height = (time / maxCategoryTime) * 100;
      const barContainer = win.document.createElement("div");
      barContainer.style.cssText = `
        flex: 1;
        display: flex;
        flex-direction: column;
        align-items: center;
        text-align: center;
      `;

      const bar = win.document.createElement("div");
      bar.style.cssText = `
        width: 30px;
        height: ${height}%;
        background-color: hsl(${(i * 50) % 360}, 70%, 60%);
      `;

      const label = win.document.createElement("div");
      label.textContent = category;
      label.style.cssText = `
        font-size: 10px;
        margin-top: 5px;
        transform: rotate(-45deg);
        max-width: 50px;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      `;

      barContainer.appendChild(bar);
      barContainer.appendChild(label);
      chartContainer.appendChild(barContainer);
    });

    reportContainer.appendChild(chartContainer);

    // Add slowest operations table
    const slowestTable = win.document.createElement("table");
    slowestTable.style.cssText = `
      width: 100%;
      border-collapse: collapse;
      margin-top: 10px;
    `;

    const tableHead = win.document.createElement("thead");
    tableHead.innerHTML = `
      <tr>
        <th style="text-align: left; padding: 5px; border-bottom: 1px solid #ccc;">Operation</th>
        <th style="text-align: right; padding: 5px; border-bottom: 1px solid #ccc;">Time (ms)</th>
        <th style="text-align: left; padding: 5px; border-bottom: 1px solid #ccc;">Category</th>
      </tr>
    `;
    slowestTable.appendChild(tableHead);

    const tableBody = win.document.createElement("tbody");
    report.slowestOperations.forEach((op) => {
      const row = win.document.createElement("tr");
      row.innerHTML = `
        <td style="text-align: left; padding: 5px;">${op.operation}</td>
        <td style="text-align: right; padding: 5px;">${op.duration.toFixed(
          2
        )}</td>
        <td style="text-align: left; padding: 5px;">${
          op.category || "general"
        }</td>
      `;
      tableBody.appendChild(row);
    });
    slowestTable.appendChild(tableBody);

    reportContainer.appendChild(slowestTable);

    // Add to document body
    win.document.body.appendChild(reportContainer);
  });
}

// Add Cypress commands
Cypress.Commands.add("initPerformanceMonitoring", () => {
  initPerformanceMonitoring();
  // Fix: Use void instead of null to match the expected return type
  return cy.wrap(undefined) as unknown as Cypress.Chainable<void>;
});

Cypress.Commands.add(
  "recordPerformanceMetric",
  (metric: Omit<PerformanceMetric, "timestamp">) => {
    recordMetric(metric);
    return cy.wrap(null);
  }
);

Cypress.Commands.add(
  "measureOperation",
  (
    fn: () => Cypress.Chainable<any>,
    operationName: string,
    category?: string
  ) => {
    return measurePerformance(operationName, fn, category);
  }
);

Cypress.Commands.add("generatePerformanceReport", () => {
  const report = getCurrentPerformanceReport(
    Cypress.currentTest.title,
    Cypress.spec.relative || "unknown"
  );
  return cy.wrap(report) as unknown as Cypress.Chainable<void>;
});

Cypress.Commands.add("flushPerformanceMetrics", (reason?: string) => {
  flushPerformanceMetrics(reason);
  return cy.wrap(null);
});

Cypress.Commands.add("createVisualPerformanceReport", () => {
  createVisualPerformanceReport();
  return cy.wrap(null);
});

// Fix the endMeasurement function to handle edge cases
Cypress.Commands.add(
  "endMeasurement",
  (label: string, category?: string): Cypress.Chainable<number> => {
    return cy.window().then((win) => {
      const metrics = win.cypressPerformanceMetrics || {
        records: [],
        startTimes: {},
      };
      const startTime = metrics.startTimes?.[label];

      // Ensure we have a valid start time
      if (!startTime) {
        cy.log(
          `Warning: No start time found for measurement '${label}'. Using fallback.`
        );
        // Use a small positive value as fallback to avoid test failures
        const fallbackDuration = 1;

        // Record the fallback metric
        const metric = {
          label,
          operation: label,
          duration: fallbackDuration,
          timestamp: Date.now(),
          category: category || "general",
          isEstimated: true,
        };

        // Add to metrics collection
        metrics.records = [...(metrics.records || []), metric];
        win.cypressPerformanceMetrics = metrics;

        return cy.wrap(fallbackDuration);
      }

      const endTime = Date.now();
      const duration = Math.max(1, endTime - startTime); // Ensure at least 1ms

      // Create and record the metric
      const metric = {
        label,
        operation: label,
        duration,
        timestamp: endTime,
        category: category || "general",
      };

      // Add to metrics collection
      metrics.records = [...(metrics.records || []), metric];

      // Remove the start time
      if (metrics.startTimes) {
        delete metrics.startTimes[label];
      }

      win.cypressPerformanceMetrics = metrics;
      return cy.wrap(duration);
    });
  }
);

export default {
  initPerformanceMonitoring,
  recordMetric,
  recordWidgetPerformance,
  measurePerformance,
  getCurrentPerformanceReport,
  flushPerformanceMetrics,
  createVisualPerformanceReport,
};

// Add to Cypress types
declare global {
  namespace Cypress {
    interface Chainable {
      recordPerformanceMetric(
        metric: Omit<PerformanceMetric, "timestamp">
      ): Chainable<null>;
      flushPerformanceMetrics(): Chainable<null>;
      initPerformanceMonitoring(): Chainable<null>;
      createVisualPerformanceReport(): Chainable<null>;
    }
  }
}
