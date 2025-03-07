// Direct exports from source constants
import {
  TEST_IDS,
  CIA_TEST_IDS,
  WIDGET_TEST_IDS,
  BUSINESS_IMPACT_TEST_IDS,
  CHART_TEST_IDS,
  COST_TEST_IDS,
  FRAMEWORK_TEST_IDS,
  SUMMARY_TEST_IDS,
} from "../../src/constants/testIds";
import {
  SECURITY_LEVELS,
  CIA_LABELS,
  WIDGET_TITLES,
  UI_TEXT, // Add UI_TEXT import
} from "../../src/constants/coreConstants";
import {
  BUSINESS_IMPACT_CATEGORIES,
  RISK_LEVELS,
} from "../../src/constants/riskConstants";
import {
  COMPLIANCE_STATUS,
  COMPLIANCE_FRAMEWORKS,
} from "../../src/constants/coreConstants";

// Re-export imported constants
export {
  TEST_IDS,
  CIA_TEST_IDS,
  WIDGET_TEST_IDS,
  BUSINESS_IMPACT_TEST_IDS, // Export these specific test ID objects
  CHART_TEST_IDS,
  COST_TEST_IDS,
  FRAMEWORK_TEST_IDS,
  SUMMARY_TEST_IDS,
  SECURITY_LEVELS,
  CIA_LABELS,
  WIDGET_TITLES,
  BUSINESS_IMPACT_CATEGORIES,
  RISK_LEVELS,
  COMPLIANCE_STATUS,
  COMPLIANCE_FRAMEWORKS,
  UI_TEXT, // Add UI_TEXT export
};

// Helper functions for working with test IDs
export const getTestSelector = (testId: string): string =>
  `[data-testid="${testId}"]`;

// Add a new helper for flexible test ID matching
export function getFlexibleTestSelector(testIds: string[]): string {
  return testIds.map((id) => `[data-testid="${id}"]`).join(", ");
}

// Add common aliases for test IDs that might have changed
export const FLEXIBLE_TEST_IDS = {
  BUSINESS_IMPACT: [
    BUSINESS_IMPACT_TEST_IDS.BUSINESS_IMPACT_SUMMARY,
    BUSINESS_IMPACT_TEST_IDS.COMBINED_BUSINESS_IMPACT_WIDGET,
    "business-impact-widget",
    "impact-analysis-widget",
  ],
  COMPLIANCE_STATUS: [
    FRAMEWORK_TEST_IDS.COMPLIANCE_STATUS_WIDGET,
    FRAMEWORK_TEST_IDS.COMPLIANCE_FRAMEWORKS_CONTAINER,
    "compliance-widget",
    "framework-compliance-widget",
  ],
  COST_ESTIMATION: [
    COST_TEST_IDS.COST_CONTAINER,
    COST_TEST_IDS.COST_ESTIMATION_CONTENT,
    "cost-widget",
    "cost-estimation-widget",
  ],
  // ... add more as needed
};

// Generate selector functions for common test ID patterns
export const SELECTORS = {
  WIDGETS: {
    SECURITY_LEVEL: getTestSelector(TEST_IDS.SECURITY_LEVEL_CONTROLS),
    COST_ESTIMATION: getTestSelector(COST_TEST_IDS.COST_CONTAINER),
    VALUE_CREATION: getTestSelector(WIDGET_TEST_IDS.VALUE_CREATION_CONTENT),
    SECURITY_SUMMARY: getTestSelector(
      SUMMARY_TEST_IDS.SECURITY_SUMMARY_CONTAINER
    ),
    BUSINESS_IMPACT: getTestSelector(
      BUSINESS_IMPACT_TEST_IDS.BUSINESS_IMPACT_SUMMARY
    ),
    RADAR_CHART: getTestSelector(CHART_TEST_IDS.RADAR_CHART),
    COMPLIANCE_STATUS: getTestSelector(
      FRAMEWORK_TEST_IDS.COMPLIANCE_STATUS_WIDGET
    ),
  },
  CONTROLS: {
    THEME_TOGGLE: getTestSelector(TEST_IDS.THEME_TOGGLE),
    APP_CONTAINER: getTestSelector(TEST_IDS.APP_CONTAINER),
    APP_TITLE: getTestSelector(TEST_IDS.APP_TITLE),
  },
  FORM: {
    AVAILABILITY_SELECT: getTestSelector(TEST_IDS.AVAILABILITY_SELECT),
    INTEGRITY_SELECT: getTestSelector(TEST_IDS.INTEGRITY_SELECT),
    CONFIDENTIALITY_SELECT: getTestSelector(TEST_IDS.CONFIDENTIALITY_SELECT),
  },
};

// Command functions for test actions
export const TEST_COMMANDS = {
  setSecurityLevel: (category: string, level: string) => {
    const testIdMap: Record<string, string> = {
      availability: TEST_IDS.AVAILABILITY_SELECT,
      integrity: TEST_IDS.INTEGRITY_SELECT,
      confidentiality: TEST_IDS.CONFIDENTIALITY_SELECT,
    };

    const testId = testIdMap[category.toLowerCase()];
    if (testId) {
      return cy.get(getTestSelector(testId)).select(level);
    }

    cy.log(`No selector found for ${category}`);
    return cy;
  },

  verifyText: (selector: string, expectedText: string) => {
    return cy.get(selector).should("contain.text", expectedText);
  },

  verifySecurityLevel: (category: string, expectedLevel: string) => {
    const testIdMap: Record<string, string> = {
      availability: TEST_IDS.AVAILABILITY_SELECT,
      integrity: TEST_IDS.INTEGRITY_SELECT,
      confidentiality: TEST_IDS.CONFIDENTIALITY_SELECT,
    };

    const testId = testIdMap[category.toLowerCase()];
    if (testId) {
      return cy
        .get(getTestSelector(testId))
        .should("have.value", expectedLevel);
    }

    cy.log(`No selector found for ${category}`);
    return cy;
  },
};

export const TEST_PATTERNS = {
  AVAILABILITY: [/availability/i, /uptime/i, /downtime/i, /recovery/i],
  INTEGRITY: [/integrity/i, /accuracy/i, /valid/i, /corrupt/i, /tamper/i],
  CONFIDENTIALITY: [/confidential/i, /sensitive/i, /privacy/i, /protect/i],
  COST: [/cost/i, /budget/i, /capex/i, /opex/i, /estimate/i, /%/, /\$/],
  COMPLIANCE: [
    /compliance/i,
    /status/i,
    /requirement/i,
    /standard/i,
    /regulation/i,
  ],
};
