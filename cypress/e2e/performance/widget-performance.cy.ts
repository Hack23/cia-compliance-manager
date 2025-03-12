/**
 * Widget Performance Benchmark Tests
 *
 * These tests measure the performance of various widgets in the application
 * under different security level configurations.
 */
import { SECURITY_LEVELS } from "../../support/constants";

// Define simplified performance test functions
function measureSecurityLevelChangePerformance() {
  cy.startMeasurement("security-level-change");
  cy.setSecurityLevels(
    SECURITY_LEVELS.HIGH,
    SECURITY_LEVELS.HIGH,
    SECURITY_LEVELS.HIGH
  );
  cy.endMeasurement("security-level-change", "security-level-change");
}

function measureInteractionPerformance(
  selector: string,
  action: "click" | "select" | "type",
  options?: any
) {
  cy.startMeasurement(`interaction-${action}-${selector}`);

  if (action === "click") {
    cy.get(selector).click({ force: true });
  } else if (action === "select") {
    cy.get(selector).select(options.value, { force: true });
  } else if (action === "type") {
    cy.get(selector).type(options.text, { force: true });
  }

  cy.endMeasurement(`interaction-${action}-${selector}`, "user-interaction");
}

function benchmarkContentLoadTime(pattern: RegExp | string) {
  const patternString = pattern.toString();
  cy.startMeasurement(`content-load-${patternString}`);

  if (typeof pattern === "string") {
    cy.contains(pattern).should("exist");
  } else {
    cy.contains(pattern).should("exist");
  }

  cy.endMeasurement(`content-load-${patternString}`, "content-loading");
}

describe("Widget Performance Benchmarks", () => {
  beforeEach(() => {
    cy.visit("/");
    cy.viewport(1920, 1080); // Use a standard desktop viewport
    cy.ensureAppLoaded();

    // Initialize performance monitoring
    cy.initPerformanceMonitoring();
    cy.wait(500); // Wait for initial animations to complete
  });

  afterEach(() => {
    // Generate performance report after each test
    cy.generatePerformanceReport();
    // Use our simplified versions that won't error
    cy.createVisualPerformanceReport();
    cy.flushPerformanceMetrics();
  });

  it("measures widget render performance across security levels", () => {
    // Define widgets to test
    const widgetsToTest = [
      "security-summary",
      "business-impact",
      "compliance",
      "cost",
      "value-creation",
      "technical",
      "radar-chart",
    ];

    // Start with a baseline security level
    cy.setSecurityLevels(
      SECURITY_LEVELS.MODERATE,
      SECURITY_LEVELS.MODERATE,
      SECURITY_LEVELS.MODERATE
    );
    cy.wait(500);

    // Measure each widget's rendering performance
    widgetsToTest.forEach((widget) => {
      cy.startMeasurement(`render-${widget}`);

      cy.findWidget(widget).should("exist").scrollIntoView();

      cy.endMeasurement(`render-${widget}`, "widget-rendering");
    });

    // Now change security levels and measure again
    cy.setSecurityLevels(
      SECURITY_LEVELS.HIGH,
      SECURITY_LEVELS.HIGH,
      SECURITY_LEVELS.HIGH
    );
    cy.wait(500);

    // Measure after security level change
    widgetsToTest.forEach((widget) => {
      cy.startMeasurement(`render-high-${widget}`);

      cy.findWidget(widget).should("exist").scrollIntoView();

      cy.endMeasurement(`render-high-${widget}`, "widget-rendering");
    });
  });

  it("measures security level change performance", () => {
    // Use our simplified function
    measureSecurityLevelChangePerformance();
  });

  it("benchmarks widget interaction performance", () => {
    // Set security levels
    cy.setSecurityLevels(
      SECURITY_LEVELS.MODERATE,
      SECURITY_LEVELS.MODERATE,
      SECURITY_LEVELS.MODERATE
    );

    // Test tab navigation in widgets with tabs
    cy.findWidget("technical").then(($el) => {
      if ($el.find('[role="tab"]').length > 0) {
        // Measure tab switching performance
        measureInteractionPerformance('[role="tab"]:eq(1)', "click");
      }
    });

    // Test dropdown interaction performance
    cy.findWidget("security-level").then(($el) => {
      if ($el.find("select").length > 0) {
        // Measure select dropdown performance
        measureInteractionPerformance("select:first", "select", {
          value: SECURITY_LEVELS.HIGH,
        });
      }
    });

    // Test button click performance
    cy.findWidget("security-summary").then(($el) => {
      if ($el.find("button").length > 0) {
        // Measure button click performance
        measureInteractionPerformance("button:first", "click");
      }
    });
  });

  it("measures content load time for key components", () => {
    // Set high security levels to test maximum content complexity
    cy.setSecurityLevels(
      SECURITY_LEVELS.HIGH,
      SECURITY_LEVELS.HIGH,
      SECURITY_LEVELS.HIGH
    );

    // Benchmark content loading for specific patterns
    benchmarkContentLoadTime(/compliance/i);
    benchmarkContentLoadTime(/business impact/i);
    benchmarkContentLoadTime(/security recommendation/i);

    // Test overall metrics population performance
    cy.startMeasurement("metrics-population");
    cy.get('[data-testid*="metrics"], [class*="metrics"]').should("exist");
    cy.endMeasurement("metrics-population", "content-loading");
  });

  it("compares performance between low and high security configuraitons", () => {
    // First set low security and measure baseline performance
    cy.setSecurityLevels(
      SECURITY_LEVELS.LOW,
      SECURITY_LEVELS.LOW,
      SECURITY_LEVELS.LOW
    );
    cy.wait(300);

    // Capture overall page metrics with low security
    cy.startMeasurement("page-metrics-low");
    cy.get("body").then(($body) => {
      const elementCount = $body.find("*").length;

      cy.log(`Element count with LOW security: ${elementCount}`);
    });
    cy.endMeasurement("page-metrics-low", "page-metrics");

    // Now set high security and measure again
    cy.setSecurityLevels(
      SECURITY_LEVELS.HIGH,
      SECURITY_LEVELS.HIGH,
      SECURITY_LEVELS.HIGH
    );
    cy.wait(300);

    // Capture overall page metrics with high security
    cy.startMeasurement("page-metrics-high");
    cy.get("body").then(($body) => {
      const elementCount = $body.find("*").length;

      cy.log(`Element count with HIGH security: ${elementCount}`);
    });
    cy.endMeasurement("page-metrics-high", "page-metrics");
  });
});
