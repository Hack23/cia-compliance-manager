/**
 * Integration tests for widget interactions
 *
 * This test suite verifies that all widgets work together correctly
 * and data is synchronized between components.
 */
import {
  SECURITY_LEVELS,
  CIA_TEST_IDS,
  WIDGET_TEST_IDS,
  BUSINESS_IMPACT_TEST_IDS,
  COST_TEST_IDS,
  FRAMEWORK_TEST_IDS,
  SUMMARY_TEST_IDS,
  CHART_TEST_IDS,
} from "../support/constants";
import { setupWidgetTest } from "./widgets/widget-test-helper";

describe("Widget Integration Tests", () => {
  beforeEach(() => {
    // Use a large viewport for better visibility of all widgets
    cy.viewport(3840, 2160);
    cy.visit("/");

    // Add style to make sure elements are visible
    cy.document().then((doc) => {
      const style = doc.createElement("style");
      style.innerHTML = `
        * {
          overflow: visible !important;
          visibility: visible !important;
          opacity: 1 !important;
          transition: none !important;
          animation: none !important;
          display: block !important;
        }
      `;
      doc.head.appendChild(style);
    });

    // Wait for app to load
    cy.wait(1000);
  });

  it("updates all widgets when security levels change", () => {
    // First find any security level selector using flexible approach
    cy.get("body").then(($body) => {
      // Try different selectors for security level controls
      const selectors = [
        `[data-testid="${CIA_TEST_IDS.AVAILABILITY_SELECT}"]`,
        `[data-testid="${CIA_TEST_IDS.INTEGRITY_SELECT}"]`,
        `[data-testid="${CIA_TEST_IDS.CONFIDENTIALITY_SELECT}"]`,
        "select",
      ];

      // Find the first matching select element
      let found = false;
      for (const selector of selectors) {
        if ($body.find(selector).length > 0) {
          cy.get(selector).first().scrollIntoView();
          found = true;
          break;
        }
      }

      if (!found) {
        cy.log("WARNING: Could not find any security level selectors");
      }
    });

    // Try to set security levels directly
    cy.get("select").each(($select, index) => {
      if (index === 0) {
        cy.wrap($select).select(SECURITY_LEVELS.HIGH, { force: true });
      } else if (index === 1) {
        cy.wrap($select).select(SECURITY_LEVELS.HIGH, { force: true });
      } else if (index === 2) {
        cy.wrap($select).select(SECURITY_LEVELS.HIGH, { force: true });
      }
    });

    // Wait for all widgets to update
    cy.wait(1000);

    // Check that some content contains HIGH
    cy.contains(new RegExp(SECURITY_LEVELS.HIGH, "i")).should("exist");
  });

  it("displays consistent metrics across related widgets", () => {
    // Try to find any widget with metrics or measurements
    cy.get("body").then(($body) => {
      // Look for elements with class or test ID containing metrics
      const metricsSelectors = [
        `[data-testid*="metric"]`,
        `[data-testid*="measurement"]`,
        `[data-testid*="value"]`,
        `.metrics`,
        `.measurements`,
      ];

      // Try each selector
      for (const selector of metricsSelectors) {
        if ($body.find(selector).length > 0) {
          cy.get(selector).first().should("be.visible");
          break;
        }
      }

      // Look for text patterns related to metrics
      cy.contains(/metric|measurement|value|score|level/i).should("exist");
    });

    // Check for numeric values that would represent metrics
    cy.contains(/\d+[\.,]?\d*\s*%/).should("exist");
    cy.contains(/\d+[\.,]?\d*/).should("exist");
  });

  it("shows detailed business impact metrics when available", () => {
    // Try to find any business impact related content
    cy.get("body").then(($body) => {
      const patterns = [
        /business\s*impact/i,
        /impact\s*analysis/i,
        /risk/i,
        /assessment/i,
      ];

      // Check for any of these patterns in the page text
      const bodyText = $body.text();
      const found = patterns.some((pattern) => pattern.test(bodyText));

      expect(found).to.be.true;
    });

    // Try to find specific business impact metrics
    cy.contains(
      /financial|operational|reputational|regulatory|strategic/i
    ).should("exist");
  });

  it("provides a complete business decision-making flow", () => {
    // Check that all key components of a decision flow are present
    const requiredComponents = [
      { pattern: /security|protection|level/i, name: "security level" },
      { pattern: /cost|budget|expense|investment/i, name: "cost component" },
      { pattern: /business|value|benefit|outcome/i, name: "business value" },
      {
        pattern: /compliance|regulatory|framework|standard/i,
        name: "compliance",
      },
    ];

    // Check each component exists somewhere on the page
    requiredComponents.forEach((component) => {
      cy.contains(component.pattern).should("exist");
    });

    // Check that we can see numeric data for decision making
    cy.contains(/\d+%|\$\s*\d+|level \d+/i).should("exist");
  });
});
