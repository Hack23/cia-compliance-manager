// Import original constants from source files
import {
  TEST_IDS as SOURCE_TEST_IDS,
  CIA_TEST_IDS as IMPORTED_CIA_TEST_IDS,
  WIDGET_TEST_IDS as SOURCE_WIDGET_TEST_IDS,
  BUSINESS_IMPACT_TEST_IDS,
  CHART_TEST_IDS,
  COST_TEST_IDS,
  FRAMEWORK_TEST_IDS,
  SUMMARY_TEST_IDS,
  VALUE_CREATION_TEST_IDS,
  TECHNICAL_DETAILS_TEST_IDS,
  CONFIDENTIALITY_IMPACT_TEST_IDS,
  INTEGRITY_IMPACT_TEST_IDS,
  AVAILABILITY_IMPACT_TEST_IDS,
  // Remove these conflicting imports
  // SECURITY_LEVEL_TEST_IDS,
  // SECURITY_RESOURCES_TEST_IDS
} from "../../src/constants/testIds";
import {
  SECURITY_LEVELS,
  CIA_LABELS,
  WIDGET_TITLES,
  UI_TEXT,
} from "../../src/constants/coreConstants";
import {
  BUSINESS_IMPACT_CATEGORIES,
  RISK_LEVELS,
} from "../../src/constants/riskConstants";
import {
  COMPLIANCE_STATUS,
  COMPLIANCE_FRAMEWORKS,
} from "../../src/constants/coreConstants";

// Re-export imported constants without modification
export {
  BUSINESS_IMPACT_TEST_IDS,
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
  UI_TEXT,
  VALUE_CREATION_TEST_IDS,
  TECHNICAL_DETAILS_TEST_IDS,
  CONFIDENTIALITY_IMPACT_TEST_IDS,
  INTEGRITY_IMPACT_TEST_IDS,
  AVAILABILITY_IMPACT_TEST_IDS,
};

// Export renamed source constants to avoid conflicts
export const SOURCE_IDS = {
  TEST_IDS: SOURCE_TEST_IDS,
  CIA_TEST_IDS: IMPORTED_CIA_TEST_IDS,
  WIDGET_TEST_IDS: SOURCE_WIDGET_TEST_IDS,
};

// Enhanced test IDs for Cypress tests with additional properties
export const TEST_IDS = {
  ...SOURCE_TEST_IDS,
  APP_CONTAINER: "app-container",
  THEME_TOGGLE: "theme-toggle",
  APP_TITLE: "app-title",
};

// Replace the existing WIDGET_TEST_IDS with accurate IDs from the DOM analysis
export const WIDGET_TEST_IDS = {
  ...SOURCE_WIDGET_TEST_IDS,
  SECURITY_LEVEL_WIDGET: "widget-security-level-selection", // Updated to match DOM
  SECURITY_LEVEL_CONTROLS: "security-level-selector", // Updated to match DOM
  SECURITY_SUMMARY_WIDGET: "widget-security-summary",
  BUSINESS_IMPACT_WIDGET: "widget-business-impact-container",
  TECHNICAL_DETAILS_WIDGET: "widget-technical-details-container",
  COST_ESTIMATION_WIDGET: "widget-cost-estimation",
  VALUE_CREATION_WIDGET: "widget-value-creation",
  COMPLIANCE_STATUS_WIDGET: "widget-compliance-status",
  RADAR_CHART_WIDGET: "widget-radar-chart",
  AVAILABILITY_IMPACT_WIDGET: "widget-availability-impact-container",
  INTEGRITY_IMPACT_WIDGET: "widget-integrity-impact-container",
  CONFIDENTIALITY_IMPACT_WIDGET: "widget-confidentiality-impact-container",
  SECURITY_RESOURCES_WIDGET: "widget-security-resources-container",
  CIA_IMPACT_SUMMARY_WIDGET: "widget-cia-impact-summary",
};

// Export CIA_TEST_IDS with enhanced properties
export const CIA_TEST_IDS = {
  ...IMPORTED_CIA_TEST_IDS, // Use the imported CIA_TEST_IDS
  AVAILABILITY_SELECT: "availability-select",
  INTEGRITY_SELECT: "integrity-select",
  CONFIDENTIALITY_SELECT: "confidentiality-select",
  AVAILABILITY_SECTION: "availability-section",
  INTEGRITY_SECTION: "integrity-section",
  CONFIDENTIALITY_SECTION: "confidentiality-section",
  // Add the missing description text properties
  AVAILABILITY_DESCRIPTION_TEXT: "availability-description-text",
  INTEGRITY_DESCRIPTION_TEXT: "integrity-description-text",
  CONFIDENTIALITY_DESCRIPTION_TEXT: "confidentiality-description-text",
};

// Replace any require statements with ES module imports
import { TEST_IDS as sourceTestIds } from "../../src/constants/testIds";

// Now define the extended constants referring to the source
export const SECURITY_LEVEL_TEST_IDS = {
  SECURITY_LEVEL_PREFIX: "security-level",
  SECURITY_LEVEL_SELECTOR: "security-level-selector",
  SECURITY_LEVEL_CONTROLS: "security-level-controls",
  SECURITY_LEVEL_WIDGET: "widget-security-level-selection", // Updated from DOM
  AVAILABILITY_SECTION: "availability-section",
  INTEGRITY_SECTION: "integrity-section",
  CONFIDENTIALITY_SECTION: "confidentiality-section",
};

export const SECURITY_RESOURCES_TEST_IDS = {
  // Define these properties directly instead of trying to access them from sourceTestIds
  SECURITY_RESOURCES_PREFIX: "security-resources",
  RESOURCE_ITEM: "security-resource-item",
  RESOURCE_LIST: "security-resources-list",
  SECURITY_RESOURCES_WIDGET: "security-resources-widget",
  SECURITY_RESOURCES_CONTAINER: "widget-security-resources-container",
  CATEGORY_SELECT: "security-resources-widget-category-select",
  SEARCH_INPUT: "security-resources-widget-search-input",
  RESOURCE_PREFIX: "security-resources-widget-resource",
};

// Enhanced widget prefixes with better structure and consistency
export const WIDGET_PREFIXES = {
  PREFIX_BASE: "widget-",
  SECURITY_PROFILE: "widget-security-level",
  COST_ESTIMATION: "widget-cost-estimation",
  BUSINESS_IMPACT: "widget-business-impact",
  COMPLIANCE_STATUS: "widget-compliance-status",
  RADAR_CHART: "widget-radar-chart",
  VALUE_CREATION: "widget-value-creation",
  SECURITY_SUMMARY: "widget-security-summary",
  TECHNICAL_DETAILS: "widget-technical-details",
  AVAILABILITY_IMPACT: "widget-availability-impact",
  INTEGRITY_IMPACT: "widget-integrity-impact",
  CONFIDENTIALITY_IMPACT: "widget-confidentiality-impact",
  SECURITY_RESOURCES: "widget-security-resources",
  SECURITY_VISUALIZATION: "widget-security-visualization",
  CIA_IMPACT_SUMMARY: "widget-cia-impact-summary",
};

// Helper functions for working with test IDs
export const getTestSelector = (testId: string): string =>
  `[data-testid="${testId}"]`;

// Add a new helper for flexible test ID matching
export function getFlexibleTestSelector(testIds: string[]): string {
  return testIds.map((id) => `[data-testid="${id}"]`).join(", ");
}

// Add common aliases for test IDs that might have changed
export const FLEXIBLE_TEST_IDS: Record<string, string[]> = {
  BUSINESS_IMPACT: [
    BUSINESS_IMPACT_TEST_IDS.BUSINESS_IMPACT_WIDGET,
    BUSINESS_IMPACT_TEST_IDS.COMBINED_BUSINESS_IMPACT_WIDGET,
    BUSINESS_IMPACT_TEST_IDS.BUSINESS_IMPACT_SUMMARY,
    "business-impact-widget",
    "impact-analysis-widget",
    "business-impact",
    "business-impact-analysis",
  ],
  COMPLIANCE_STATUS: [
    FRAMEWORK_TEST_IDS.COMPLIANCE_STATUS_WIDGET,
    FRAMEWORK_TEST_IDS.COMPLIANCE_FRAMEWORKS_CONTAINER,
    "compliance-widget",
    "framework-compliance-widget",
    "compliance-status",
  ],
  COST_ESTIMATION: [
    COST_TEST_IDS.COST_ESTIMATION_WIDGET,
    COST_TEST_IDS.COST_CONTAINER,
    COST_TEST_IDS.COST_ESTIMATION_CONTENT,
    "cost-widget",
    "cost-estimation-widget",
    "cost-estimation",
  ],
  SECURITY_SUMMARY: [
    SUMMARY_TEST_IDS.SECURITY_SUMMARY_CONTAINER,
    "security-summary-widget",
    "security-summary",
  ],
  TECHNICAL_DETAILS: [
    TECHNICAL_DETAILS_TEST_IDS.TECHNICAL_DETAILS_WIDGET,
    "technical-details-widget",
    "technical-details",
    "technical-implementation",
  ],
  VALUE_CREATION: [
    VALUE_CREATION_TEST_IDS.VALUE_CREATION_WIDGET,
    "value-creation-widget",
    "value-creation",
  ],
  SECURITY_LEVEL: [
    "widget-security-level-selection", // Updated from DOM
    "security-level-selector", // Updated from DOM
    "widget-security-level",
    "security-level-controls",
  ],
  AVAILABILITY_IMPACT: [
    "widget-availability-impact-container", // From DOM
    "widget-availability-impact", // From DOM
    "availability-impact",
  ],
  INTEGRITY_IMPACT: [
    "widget-integrity-impact-container", // From DOM
    "integrity-impact", // From DOM
  ],
  CONFIDENTIALITY_IMPACT: [
    "widget-confidentiality-impact-container", // From DOM
    "confidentiality-impact", // From DOM
  ],
  RADAR_CHART: [
    "widget-radar-chart", // From DOM
    "radar-chart", // From DOM
  ],
};

// Generate selector functions for common test ID patterns
export const SELECTORS = {
  WIDGETS: {
    // Use a record for better type safety and autocompletion
    PREFIX: "widget-",
    SECURITY_LEVEL: getTestSelector(TEST_IDS.SECURITY_LEVEL_CONTROLS),
    COST_ESTIMATION: getTestSelector(COST_TEST_IDS.COST_CONTAINER),
    VALUE_CREATION: getTestSelector(
      VALUE_CREATION_TEST_IDS.VALUE_CREATION_WIDGET
    ),
    SECURITY_SUMMARY: getTestSelector(
      SUMMARY_TEST_IDS.SECURITY_SUMMARY_CONTAINER
    ),
    BUSINESS_IMPACT: getTestSelector(
      BUSINESS_IMPACT_TEST_IDS.BUSINESS_IMPACT_WIDGET
    ),
    RADAR_CHART: getTestSelector(CHART_TEST_IDS.RADAR_CHART),
    COMPLIANCE_STATUS: getTestSelector(
      FRAMEWORK_TEST_IDS.COMPLIANCE_STATUS_WIDGET
    ),
    TECHNICAL_DETAILS: getTestSelector(
      TECHNICAL_DETAILS_TEST_IDS.TECHNICAL_DETAILS_WIDGET
    ),
    AVAILABILITY_IMPACT: getTestSelector(
      AVAILABILITY_IMPACT_TEST_IDS.AVAILABILITY_IMPACT_PREFIX
    ),
    INTEGRITY_IMPACT: getTestSelector(
      INTEGRITY_IMPACT_TEST_IDS.INTEGRITY_IMPACT_PREFIX
    ),
    CONFIDENTIALITY_IMPACT: getTestSelector(
      CONFIDENTIALITY_IMPACT_TEST_IDS.CONFIDENTIALITY_IMPACT_PREFIX
    ),
    SECURITY_RESOURCES: getTestSelector(
      SECURITY_RESOURCES_TEST_IDS.SECURITY_RESOURCES_WIDGET
    ),
    CIA_IMPACT_SUMMARY: getTestSelector(WIDGET_TEST_IDS.CIA_IMPACT_SUMMARY),
  },
  CONTROLS: {
    THEME_TOGGLE: getTestSelector(TEST_IDS.THEME_TOGGLE),
    APP_CONTAINER: getTestSelector(TEST_IDS.APP_CONTAINER),
    APP_TITLE: getTestSelector(TEST_IDS.APP_TITLE),
  },
  FORM: {
    AVAILABILITY_SELECT: getTestSelector(CIA_TEST_IDS.AVAILABILITY_SELECT),
    INTEGRITY_SELECT: getTestSelector(CIA_TEST_IDS.INTEGRITY_SELECT),
    CONFIDENTIALITY_SELECT: getTestSelector(
      CIA_TEST_IDS.CONFIDENTIALITY_SELECT
    ),
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
