// Import original constants from source files
import {
  CIA_LABELS,
  COMPLIANCE_FRAMEWORKS,
  COMPLIANCE_STATUS,
  SECURITY_LEVELS,
  UI_TEXT,
  WIDGET_TITLES,
} from "../../src/constants/coreConstants";
import {
  BUSINESS_IMPACT_CATEGORIES,
  RISK_LEVELS,
} from "../../src/constants/riskConstants";
import {
  AVAILABILITY_IMPACT_TEST_IDS,
  BUSINESS_IMPACT_TEST_IDS,
  CHART_TEST_IDS,
  CONFIDENTIALITY_IMPACT_TEST_IDS,
  COST_TEST_IDS,
  FRAMEWORK_TEST_IDS,
  CIA_TEST_IDS as IMPORTED_CIA_TEST_IDS,
  INTEGRITY_IMPACT_TEST_IDS,
  TEST_IDS as SOURCE_TEST_IDS,
  WIDGET_TEST_IDS as SOURCE_WIDGET_TEST_IDS,
  SUMMARY_TEST_IDS,
  TECHNICAL_DETAILS_TEST_IDS,
  VALUE_CREATION_TEST_IDS,
} from "../../src/constants/testIds";

// Re-export imported constants without modification
export {
  AVAILABILITY_IMPACT_TEST_IDS,
  BUSINESS_IMPACT_CATEGORIES,
  BUSINESS_IMPACT_TEST_IDS,
  CHART_TEST_IDS,
  CIA_LABELS,
  COMPLIANCE_FRAMEWORKS,
  COMPLIANCE_STATUS,
  CONFIDENTIALITY_IMPACT_TEST_IDS,
  COST_TEST_IDS,
  FRAMEWORK_TEST_IDS,
  INTEGRITY_IMPACT_TEST_IDS,
  RISK_LEVELS,
  SECURITY_LEVELS,
  SUMMARY_TEST_IDS,
  TECHNICAL_DETAILS_TEST_IDS,
  UI_TEXT,
  VALUE_CREATION_TEST_IDS,
  WIDGET_TITLES,
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
  APP_ROOT: "app-root", // App root element
  APP_CONTAINER: "app-container", // Container for the application
  CIA_CLASSIFICATION_APP: "cia-classification-app", // Main application component
  THEME_TOGGLE: "theme-toggle", // Theme toggle button
  APP_TITLE: "app-title", // Application title
  DASHBOARD_GRID: "dashboard-grid", // Main dashboard grid
};

// Accurate widget test IDs based on DOM analysis
export const WIDGET_TEST_IDS = {
  ...SOURCE_WIDGET_TEST_IDS,
  // Main widget containers - corrected to match actual DOM IDs
  SECURITY_LEVEL_WIDGET: "widget-security-level-selection",
  SECURITY_LEVEL_CONTROLS: "security-level-selector",
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
  CIA_IMPACT_SUMMARY_WIDGET: "cia-impact-summary-widget", // For CIA impact summary widget
};

// Enhanced CIA test IDs with more comprehensive coverage
export const CIA_TEST_IDS = {
  ...IMPORTED_CIA_TEST_IDS,
  // Security level selectors - validated from DOM
  AVAILABILITY_SELECT: "availability-select",
  INTEGRITY_SELECT: "integrity-select",
  CONFIDENTIALITY_SELECT: "confidentiality-select",

  // Security level sections - validated from DOM
  AVAILABILITY_SECTION: "availability-section",
  INTEGRITY_SECTION: "integrity-section",
  CONFIDENTIALITY_SECTION: "confidentiality-section",

  // Color indicators for security levels
  AVAILABILITY_COLOR_INDICATOR: "availability-color-indicator",
  INTEGRITY_COLOR_INDICATOR: "integrity-color-indicator",
  CONFIDENTIALITY_COLOR_INDICATOR: "confidentiality-color-indicator",

  // Description elements
  AVAILABILITY_DESCRIPTION: "availability-description",
  INTEGRITY_DESCRIPTION: "integrity-description",
  CONFIDENTIALITY_DESCRIPTION: "confidentiality-description",

  // Description text elements
  AVAILABILITY_DESCRIPTION_TEXT: "availability-description-text",
  INTEGRITY_DESCRIPTION_TEXT: "integrity-description-text",
  CONFIDENTIALITY_DESCRIPTION_TEXT: "confidentiality-description-text",

  // Current security level indicators
  CURRENT_AVAILABILITY: "current-availability",
  CURRENT_INTEGRITY: "current-integrity",
  CURRENT_CONFIDENTIALITY: "current-confidentiality",

  // Key-value pairs
  AVAILABILITY_KV: "availability-kv",
  INTEGRITY_KV: "integrity-kv",
  CONFIDENTIALITY_KV: "confidentiality-kv",

  // Info buttons
  AVAILABILITY_TECHNICAL_INFO_BUTTON: "availability-technical-info-button",
  INTEGRITY_TECHNICAL_INFO_BUTTON: "integrity-technical-info-button",
  CONFIDENTIALITY_TECHNICAL_INFO_BUTTON:
    "confidentiality-technical-info-button",
};

// Security level widget test IDs
export const SECURITY_LEVEL_TEST_IDS = {
  SECURITY_LEVEL_PREFIX: "security-level",
  SECURITY_LEVEL_SELECTOR: "security-level-selector", // Primary selector
  SECURITY_LEVEL_CONTROLS: "security-level-controls", // Alternative selector
  SECURITY_LEVEL_WIDGET: "widget-security-level-selection", // Widget container
  AVAILABILITY_SECTION: "availability-section",
  INTEGRITY_SECTION: "integrity-section",
  CONFIDENTIALITY_SECTION: "confidentiality-section",
  SECURITY_LEVEL_SUMMARY: "security-level-summary", // Summary area
  SECURITY_LEVEL_HEADER: "security-level-header", // Header area
  SECURITY_PROFILE_CURRENT: "security-profile-current", // Current profile display
  SECURITY_LEVEL_LEGEND: "security-level-legend", // Legend for security levels
};

// Security summary widget test IDs
export const SECURITY_SUMMARY_TEST_IDS = {
  SECURITY_SUMMARY_CONTAINER: "security-summary-container", // Container ID
  SECURITY_ICON: "security-icon", // Security icon element
  SECURITY_SUMMARY_DESCRIPTION: "security-summary-description", // Description text
  CONFIDENTIALITY_SUMMARY: "security-summary-container-confidentiality-summary", // Confidentiality section
  INTEGRITY_SUMMARY: "security-summary-container-integrity-summary", // Integrity section
  AVAILABILITY_SUMMARY: "security-summary-container-availability-summary", // Availability section
  ROI_ESTIMATE_SUMMARY: "roi-estimate-summary", // ROI summary
  ROI_ESTIMATE_PAIR: "roi-estimate-pair", // ROI key-value pair
  TECHNICAL_SECTION_TOGGLE: "technical-section-toggle", // Technical section toggle
  TECHNICAL_DETAILS_SECTION: "technical-details-section", // Technical details section
  AVAILABILITY_TECH_DETAILS: "availability-tech-details", // Availability tech details
  INTEGRITY_TECH_DETAILS: "integrity-tech-details", // Integrity tech details
  CONFIDENTIALITY_TECH_DETAILS: "confidentiality-tech-details", // Confidentiality tech details
  BUSINESS_IMPACT_TOGGLE: "business-impact-toggle", // Business impact toggle
  BUSINESS_IMPACT_SECTION: "business-impact-section", // Business impact section
  RECOMMENDATION_HEADING: "recommendation-heading", // Recommendation heading
  SECURITY_RECOMMENDATION: "security-recommendation", // Security recommendation
  CLASSIFICATION_LEVEL: "security-summary-container-classification-level", // Classification level
  INFORMATION_SENSITIVITY: "security-summary-container-information-sensitivity", // Information sensitivity
  PROTECTION_LEVEL: "security-summary-container-protection-level", // Protection level
  METRICS_TOGGLE: "metrics-toggle", // Metrics toggle
  METRICS_SECTION: "metrics-section", // Metrics section
};

// Business impact widget test IDs
export const BUSINESS_IMPACT_WIDGET_TEST_IDS = {
  BUSINESS_IMPACT_WIDGET: "business-impact-widget", // Main widget ID
  AVAILABILITY_TAB: "business-impact-widget-availability-tab", // Availability tab
  INTEGRITY_TAB: "business-impact-widget-integrity-tab", // Integrity tab
  CONFIDENTIALITY_TAB: "business-impact-widget-confidentiality-tab", // Confidentiality tab
  SUMMARY: "business-impact-widget-summary", // Summary section
  AVAILABILITY_TAB_BUTTON: "business-impact-availability-tab", // Availability tab button
  INTEGRITY_TAB_BUTTON: "business-impact-integrity-tab", // Integrity tab button
  CONFIDENTIALITY_TAB_BUTTON: "business-impact-confidentiality-tab", // Confidentiality tab button
  FINANCIAL_IMPACT_CARD: "financial-impact-card", // Financial impact card
  OPERATIONAL_IMPACT_CARD: "operational-impact-card", // Operational impact card
  REPUTATIONAL_IMPACT_CARD: "reputational-impact-card", // Reputational impact card
  REGULATORY_IMPACT_CARD: "regulatory-impact-card", // Regulatory impact card
  STRATEGIC_IMPACT_CARD: "strategic-impact-card", // Strategic impact card
  IMPACT_CARD: "business-impact-impact-card", // Generic impact card
  RISK_LEVEL: "business-impact-risk-level", // Risk level indicator
};

// Security resources test IDs
export const SECURITY_RESOURCES_TEST_IDS = {
  SECURITY_RESOURCES_PREFIX: "security-resources", // Prefix for resources test IDs
  RESOURCE_ITEM: "security-resource-item", // Individual resource item
  RESOURCE_LIST: "security-resources-list", // Resource list container
  SECURITY_RESOURCES_WIDGET: "security-resources-widget", // Widget ID
  SECURITY_RESOURCES_CONTAINER: "widget-security-resources-container", // Container ID
  CATEGORY_SELECT: "security-resources-widget-category-select", // Category select dropdown
  SEARCH_INPUT: "security-resources-widget-search-input", // Search input
  RESOURCE_PREFIX: "security-resources-widget-resource", // Prefix for numbered resources
  RESOURCE_DETAIL: "resource-detail", // Resource detail section
  RESOURCE_LINK: "resource-link", // Resource link element
  FILTER_CONTROLS: "filter-controls", // Filter controls section
};

// Enhanced widget prefixes for better testing
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

// Common aliases for test IDs that might have changed
export const FLEXIBLE_TEST_IDS: Record<string, string[]> = {
  BUSINESS_IMPACT: [
    BUSINESS_IMPACT_TEST_IDS.BUSINESS_IMPACT_WIDGET,
    BUSINESS_IMPACT_TEST_IDS.COMBINED_BUSINESS_IMPACT_WIDGET,
    BUSINESS_IMPACT_TEST_IDS.BUSINESS_IMPACT_SUMMARY,
    "business-impact-widget",
    "impact-analysis-widget",
    "business-impact",
    "business-impact-analysis",
    "widget-business-impact-container",
  ],
  COMPLIANCE_STATUS: [
    FRAMEWORK_TEST_IDS.COMPLIANCE_STATUS_WIDGET,
    FRAMEWORK_TEST_IDS.COMPLIANCE_FRAMEWORKS_CONTAINER,
    "compliance-widget",
    "framework-compliance-widget",
    "compliance-status",
    "widget-compliance-status",
  ],
  COST_ESTIMATION: [
    COST_TEST_IDS.COST_ESTIMATION_WIDGET,
    COST_TEST_IDS.COST_CONTAINER,
    COST_TEST_IDS.COST_ESTIMATION_CONTENT,
    "cost-widget",
    "cost-estimation-widget",
    "cost-estimation",
    "widget-cost-estimation",
  ],
  SECURITY_SUMMARY: [
    SUMMARY_TEST_IDS.SECURITY_SUMMARY_CONTAINER,
    "security-summary-widget",
    "security-summary",
    "widget-security-summary",
    "security-summary-container",
  ],
  TECHNICAL_DETAILS: [
    TECHNICAL_DETAILS_TEST_IDS.TECHNICAL_DETAILS_WIDGET,
    "technical-details-widget",
    "technical-details",
    "technical-implementation",
    "widget-technical-details-container",
  ],
  VALUE_CREATION: [
    VALUE_CREATION_TEST_IDS.VALUE_CREATION_WIDGET,
    "value-creation-widget",
    "value-creation",
    "widget-value-creation",
  ],
  SECURITY_LEVEL: [
    "widget-security-level-selection",
    "security-level-selector",
    "widget-security-level",
    "security-level-controls",
  ],
  AVAILABILITY_IMPACT: [
    "widget-availability-impact-container",
    "widget-availability-impact",
    "availability-impact",
  ],
  INTEGRITY_IMPACT: ["widget-integrity-impact-container", "integrity-impact"],
  CONFIDENTIALITY_IMPACT: [
    "widget-confidentiality-impact-container",
    "confidentiality-impact",
  ],
  RADAR_CHART: ["widget-radar-chart", "radar-chart"],
};

// Generate selector functions for common test ID patterns
export const SELECTORS = {
  WIDGETS: {
    PREFIX: "widget-",
    SECURITY_LEVEL: getTestSelector(
      SECURITY_LEVEL_TEST_IDS.SECURITY_LEVEL_CONTROLS
    ),
    COST_ESTIMATION: getTestSelector(WIDGET_TEST_IDS.COST_ESTIMATION_WIDGET),
    VALUE_CREATION: getTestSelector(WIDGET_TEST_IDS.VALUE_CREATION_WIDGET),
    SECURITY_SUMMARY: getTestSelector(WIDGET_TEST_IDS.SECURITY_SUMMARY_WIDGET),
    BUSINESS_IMPACT: getTestSelector(WIDGET_TEST_IDS.BUSINESS_IMPACT_WIDGET),
    RADAR_CHART: getTestSelector(WIDGET_TEST_IDS.RADAR_CHART_WIDGET),
    COMPLIANCE_STATUS: getTestSelector(
      WIDGET_TEST_IDS.COMPLIANCE_STATUS_WIDGET
    ),
    TECHNICAL_DETAILS: getTestSelector(
      WIDGET_TEST_IDS.TECHNICAL_DETAILS_WIDGET
    ),
    AVAILABILITY_IMPACT: getTestSelector(
      WIDGET_TEST_IDS.AVAILABILITY_IMPACT_WIDGET
    ),
    INTEGRITY_IMPACT: getTestSelector(WIDGET_TEST_IDS.INTEGRITY_IMPACT_WIDGET),
    CONFIDENTIALITY_IMPACT: getTestSelector(
      WIDGET_TEST_IDS.CONFIDENTIALITY_IMPACT_WIDGET
    ),
    SECURITY_RESOURCES: getTestSelector(
      WIDGET_TEST_IDS.SECURITY_RESOURCES_WIDGET
    ),
    CIA_IMPACT_SUMMARY: getTestSelector(
      WIDGET_TEST_IDS.CIA_IMPACT_SUMMARY_WIDGET
    ),
  },
  CONTROLS: {
    THEME_TOGGLE: getTestSelector(TEST_IDS.THEME_TOGGLE),
    APP_CONTAINER: getTestSelector(TEST_IDS.APP_CONTAINER),
    APP_TITLE: getTestSelector(TEST_IDS.APP_TITLE),
    APP_ROOT: getTestSelector(TEST_IDS.APP_ROOT),
    DASHBOARD_GRID: getTestSelector(TEST_IDS.DASHBOARD_GRID),
  },
  FORM: {
    AVAILABILITY_SELECT: getTestSelector(CIA_TEST_IDS.AVAILABILITY_SELECT),
    INTEGRITY_SELECT: getTestSelector(CIA_TEST_IDS.INTEGRITY_SELECT),
    CONFIDENTIALITY_SELECT: getTestSelector(
      CIA_TEST_IDS.CONFIDENTIALITY_SELECT
    ),
  },
  TAB_NAVIGATION: {
    BUSINESS_IMPACT_AVAILABILITY_TAB: getTestSelector(
      BUSINESS_IMPACT_WIDGET_TEST_IDS.AVAILABILITY_TAB
    ),
    BUSINESS_IMPACT_INTEGRITY_TAB: getTestSelector(
      BUSINESS_IMPACT_WIDGET_TEST_IDS.INTEGRITY_TAB
    ),
    BUSINESS_IMPACT_CONFIDENTIALITY_TAB: getTestSelector(
      BUSINESS_IMPACT_WIDGET_TEST_IDS.CONFIDENTIALITY_TAB
    ),
  },
};

// Command functions for test actions
export const TEST_COMMANDS = {
  setSecurityLevel: (category: string, level: string) => {
    const testIdMap: Record<string, string> = {
      availability: CIA_TEST_IDS.AVAILABILITY_SELECT,
      integrity: CIA_TEST_IDS.INTEGRITY_SELECT,
      confidentiality: CIA_TEST_IDS.CONFIDENTIALITY_SELECT,
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
      availability: CIA_TEST_IDS.AVAILABILITY_SELECT,
      integrity: CIA_TEST_IDS.INTEGRITY_SELECT,
      confidentiality: CIA_TEST_IDS.CONFIDENTIALITY_SELECT,
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

// Text patterns for content verification
export const TEXT_PATTERNS = {
  AVAILABILITY: [
    /availability/i,
    /uptime/i,
    /downtime/i,
    /recovery/i,
    /rto/i,
    /rpo/i,
    /mttr/i,
    /continuity/i,
    /disaster recovery/i,
    /failover/i,
    /redundancy/i,
  ],
  INTEGRITY: [
    /integrity/i,
    /accuracy/i,
    /valid/i,
    /corrupt/i,
    /tamper/i,
    /checksum/i,
    /validation/i,
    /hash/i,
    /signature/i,
    /modification/i,
    /alteration/i,
  ],
  CONFIDENTIALITY: [
    /confidential/i,
    /sensitive/i,
    /privacy/i,
    /protect/i,
    /encryption/i,
    /access control/i,
    /authorization/i,
    /permission/i,
    /disclosure/i,
    /leak/i,
    /privilege/i,
  ],
  COST: [
    /cost/i,
    /budget/i,
    /capex/i,
    /opex/i,
    /estimate/i,
    /%/,
    /\$/,
    /expenditure/i,
    /investment/i,
    /expense/i,
    /financial/i,
  ],
  COMPLIANCE: [
    /compliance/i,
    /status/i,
    /requirement/i,
    /standard/i,
    /regulation/i,
    /framework/i,
    /gdpr/i,
    /hipaa/i,
    /pci/i,
    /iso/i,
    /nist/i,
    /sox/i,
  ],
  SECURITY: [
    /security/i,
    /protection/i,
    /safeguard/i,
    /control/i,
    /measure/i,
    /defense/i,
    /mitigation/i,
    /shield/i,
    /cyber/i,
  ],
  VALUE: [
    /value/i,
    /roi/i,
    /return/i,
    /benefit/i,
    /saving/i,
    /revenue/i,
    /profit/i,
    /advantage/i,
    /outcome/i,
  ],
  BUSINESS: [
    /business/i,
    /impact/i,
    /effect/i,
    /operation/i,
    /process/i,
    /organization/i,
    /strategic/i,
    /tactical/i,
    /financial/i,
    /reputational/i,
    /stakeholder/i,
  ],
  RISK: [
    /risk/i,
    /threat/i,
    /vulnerability/i,
    /likelihood/i,
    /impact/i,
    /severity/i,
    /assessment/i,
    /analysis/i,
    /score/i,
    /level/i,
  ],
  IMPLEMENTATION: [
    /implementation/i,
    /deploy/i,
    /install/i,
    /configure/i,
    /setup/i,
    /technical/i,
    /architecture/i,
    /infrastructure/i,
    /system/i,
    /step/i,
    /procedure/i,
  ],
  RESOURCES: [
    /resource/i,
    /document/i,
    /guide/i,
    /reference/i,
    /standard/i,
    /best practice/i,
    /template/i,
    /library/i,
    /tool/i,
    /utility/i,
  ],
};

// Sample data for testing with different security levels
export const TEST_SECURITY_PROFILES = {
  LOW_SECURITY: {
    availability: SECURITY_LEVELS.LOW,
    integrity: SECURITY_LEVELS.LOW,
    confidentiality: SECURITY_LEVELS.LOW,
  },
  MODERATE_SECURITY: {
    availability: SECURITY_LEVELS.MODERATE,
    integrity: SECURITY_LEVELS.MODERATE,
    confidentiality: SECURITY_LEVELS.MODERATE,
  },
  HIGH_SECURITY: {
    availability: SECURITY_LEVELS.HIGH,
    integrity: SECURITY_LEVELS.HIGH,
    confidentiality: SECURITY_LEVELS.HIGH,
  },
  MIXED_SECURITY: {
    availability: SECURITY_LEVELS.HIGH,
    integrity: SECURITY_LEVELS.MODERATE,
    confidentiality: SECURITY_LEVELS.LOW,
  },
  NULL_SECURITY: {
    availability: SECURITY_LEVELS.NONE,
    integrity: SECURITY_LEVELS.NONE,
    confidentiality: SECURITY_LEVELS.NONE,
  },
  AVAILABILITY_FOCUSED: {
    availability: SECURITY_LEVELS.HIGH,
    integrity: SECURITY_LEVELS.LOW,
    confidentiality: SECURITY_LEVELS.LOW,
  },
  INTEGRITY_FOCUSED: {
    availability: SECURITY_LEVELS.LOW,
    integrity: SECURITY_LEVELS.HIGH,
    confidentiality: SECURITY_LEVELS.LOW,
  },
  CONFIDENTIALITY_FOCUSED: {
    availability: SECURITY_LEVELS.LOW,
    integrity: SECURITY_LEVELS.LOW,
    confidentiality: SECURITY_LEVELS.HIGH,
  },
  MAXIMUM_SECURITY: {
    availability: SECURITY_LEVELS.VERY_HIGH,
    integrity: SECURITY_LEVELS.VERY_HIGH,
    confidentiality: SECURITY_LEVELS.VERY_HIGH,
  },
};

// Expected cost ranges for different security levels
export const EXPECTED_COST_RANGES = {
  [SECURITY_LEVELS.NONE]: {
    capexMin: 0,
    capexMax: 1000,
    opexMin: 0,
    opexMax: 1000,
  },
  [SECURITY_LEVELS.LOW]: {
    capexMin: 1000,
    capexMax: 10000,
    opexMin: 1000,
    opexMax: 5000,
  },
  [SECURITY_LEVELS.MODERATE]: {
    capexMin: 10000,
    capexMax: 50000,
    opexMin: 5000,
    opexMax: 20000,
  },
  [SECURITY_LEVELS.HIGH]: {
    capexMin: 50000,
    capexMax: 200000,
    opexMin: 20000,
    opexMax: 100000,
  },
  [SECURITY_LEVELS.VERY_HIGH]: {
    capexMin: 200000,
    capexMax: 1000000,
    opexMin: 100000,
    opexMax: 500000,
  },
};

// Expected ROI percentages for different security levels
export const EXPECTED_ROI_RANGES = {
  [SECURITY_LEVELS.NONE]: {
    min: 0,
    max: 0,
  },
  [SECURITY_LEVELS.LOW]: {
    min: 100,
    max: 150,
  },
  [SECURITY_LEVELS.MODERATE]: {
    min: 150,
    max: 250,
  },
  [SECURITY_LEVELS.HIGH]: {
    min: 250,
    max: 400,
  },
  [SECURITY_LEVELS.VERY_HIGH]: {
    min: 400,
    max: 600,
  },
};

// Widget visibility expectations - which widgets should be visible at which security levels
export const WIDGET_VISIBILITY = {
  [SECURITY_LEVELS.NONE]: [
    WIDGET_TEST_IDS.SECURITY_LEVEL_WIDGET,
    WIDGET_TEST_IDS.SECURITY_SUMMARY_WIDGET,
    WIDGET_TEST_IDS.COST_ESTIMATION_WIDGET,
  ],
  [SECURITY_LEVELS.LOW]: [
    WIDGET_TEST_IDS.SECURITY_LEVEL_WIDGET,
    WIDGET_TEST_IDS.SECURITY_SUMMARY_WIDGET,
    WIDGET_TEST_IDS.COST_ESTIMATION_WIDGET,
    WIDGET_TEST_IDS.VALUE_CREATION_WIDGET,
    WIDGET_TEST_IDS.BUSINESS_IMPACT_WIDGET,
    WIDGET_TEST_IDS.COMPLIANCE_STATUS_WIDGET,
  ],
  ALWAYS_VISIBLE: [
    WIDGET_TEST_IDS.SECURITY_LEVEL_WIDGET,
    WIDGET_TEST_IDS.SECURITY_SUMMARY_WIDGET,
  ],
};

// Framework compliance expectations by security level
export const COMPLIANCE_EXPECTATIONS = {
  [SECURITY_LEVELS.LOW]: {
    compliant: ["Basic"],
    partiallyCompliant: ["PCI DSS", "HIPAA"],
    nonCompliant: ["ISO 27001", "NIST 800-53", "SOC 2"],
  },
  [SECURITY_LEVELS.MODERATE]: {
    compliant: ["Basic", "PCI DSS"],
    partiallyCompliant: ["HIPAA", "ISO 27001"],
    nonCompliant: ["NIST 800-53", "SOC 2"],
  },
  [SECURITY_LEVELS.HIGH]: {
    compliant: ["Basic", "PCI DSS", "HIPAA", "ISO 27001"],
    partiallyCompliant: ["NIST 800-53"],
    nonCompliant: ["SOC 2"],
  },
  [SECURITY_LEVELS.VERY_HIGH]: {
    compliant: [
      "Basic",
      "PCI DSS",
      "HIPAA",
      "ISO 27001",
      "NIST 800-53",
      "SOC 2",
    ],
    partiallyCompliant: [],
    nonCompliant: [],
  },
};
