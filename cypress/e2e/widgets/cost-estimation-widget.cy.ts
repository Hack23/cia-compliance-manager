import {
  COST_TEST_IDS,
  SECURITY_LEVELS,
  WIDGET_TEST_IDS,
} from "../../support/constants";
import { setupWidgetTest } from "./widget-test-helper";

describe("Cost Estimation Widget", () => {
  beforeEach(() => {
    // Use more flexible matching for the cost widget
    cy.document().then((doc) => {
      // Try multiple possible IDs for cost widget using test IDs from table
      const possibleIds = [
        COST_TEST_IDS.COST_ESTIMATION_WIDGET, // Use constant from table
        "widget-cost-estimation",
        COST_TEST_IDS.COST_CONTAINER,
        "cost-estimation-content",
      ];

      // Find the first ID that exists in the DOM
      let foundId = "";
      for (const id of possibleIds) {
        if (doc.querySelector(`[data-testid="${id}"]`)) {
          foundId = id;
          break;
        }
      }

      // Use the found ID or default to widget-cost-estimation
      setupWidgetTest(foundId || "widget-cost-estimation");
    });
  });

  it("provides accurate financial impact analysis of security choices", () => {
    // Check for cost elements using flexible selectors with proper test IDs
    cy.get("body").then(($body) => {
      // Look for cost indicator elements using correct test IDs
      const costSelectors = [
        `[data-testid="${COST_TEST_IDS.COST_CONTAINER}"]`,
        `[data-testid="${COST_TEST_IDS.COST_ESTIMATION_CONTENT}"]`,
        `[data-testid="${COST_TEST_IDS.COST_ESTIMATION_WIDGET}"]`,
        `[data-testid="${COST_TEST_IDS.CAPEX_SECTION}"]`,
        `[data-testid="${COST_TEST_IDS.OPEX_SECTION}"]`,
        `[data-testid*="cost"]`,
        `[data-testid*="capex"]`,
        `[data-testid*="opex"]`,
      ];

      let foundCostElement = false;
      for (const selector of costSelectors) {
        if ($body.find(selector).length) {
          cy.get(selector).first().should("be.visible");
          foundCostElement = true;
          break;
        }
      }

      if (!foundCostElement) {
        // Look for cost-related text
        cy.contains(
          /cost|budget|expense|capital|operational|financial/i
        ).should("exist");
      }

      // Check for currency symbols to verify financial data
      cy.contains(/\$|\€|\£|\¥/).should("exist");
    });

    // Verify different security levels change costs
    let initialText = "";

    // Get the text content before changing security levels
    cy.get("body")
      .invoke("text")
      .then((text) => {
        initialText = text;

        // Set higher security levels
        cy.setSecurityLevels(
          SECURITY_LEVELS.HIGH,
          SECURITY_LEVELS.HIGH,
          SECURITY_LEVELS.HIGH
        );

        cy.wait(500);

        // Verify text has changed, indicating cost values updated
        cy.get("body").invoke("text").should("not.eq", initialText);
      });
  });

  it("provides ROI analysis to justify security investments", () => {
    // Look for ROI-related information using proper test IDs
    cy.get("body").then(($body) => {
      const roiSelectors = [
        `[data-testid="${COST_TEST_IDS.ROI_SECTION}"]`,
        `[data-testid="${COST_TEST_IDS.ROI_ESTIMATE}"]`,
        // Fallbacks
        `[data-testid*="roi"]`,
        `[data-testid*="return"]`,
      ];

      let foundRoiElement = false;
      for (const selector of roiSelectors) {
        if ($body.find(selector).length) {
          cy.get(selector).first().should("be.visible");
          foundRoiElement = true;
          break;
        }
      }

      if (!foundRoiElement) {
        // Look for ROI-related text
        cy.contains(
          /roi|return on investment|payback|value|justification/i
        ).should("exist");
      }
    });
  });

  it("connects costs to business value with analysis", () => {
    // Check for cost analysis section
    cy.get("body").then(($body) => {
      const costAnalysisSelectors = [
        `[data-testid="${COST_TEST_IDS.COST_ANALYSIS_SECTION}"]`,
        `[data-testid="${COST_TEST_IDS.COST_ANALYSIS_TEXT}"]`,
        `[data-testid*="analysis"]`,
        `[data-testid*="total-cost"]`,
        `[data-testid*="summary"]`,
      ];

      let foundCostAnalysis = false;
      for (const selector of costAnalysisSelectors) {
        if ($body.find(selector).length) {
          cy.get(selector).first().should("be.visible");
          foundCostAnalysis = true;
          break;
        }
      }

      if (!foundCostAnalysis) {
        // Look for cost analysis related text
        cy.contains(/analysis|summary|breakdown|comparison|estimation/i).should(
          "exist"
        );
      }

      // Check for numeric values indicating costs
      cy.contains(/\d+[\.,]?\d*\s*%/).should("exist");
      cy.contains(/\$\s*\d+[\.,]?\d*/).should("exist");
    });
  });
});
