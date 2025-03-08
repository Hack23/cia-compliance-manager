/**
 * Centralized Test ID constants for component selection in tests
 */

import { VALUE_CREATION_POINTS } from "./appConstants";

// Add this function near the top of the file to make it easier to create compound testIds
export const createCompoundTestId = (prefix: string, suffix: string): string =>
  `${prefix}-${suffix}`;

// Add these mappings to help make testIds more unique and consistent
export const WIDGET_PREFIXES = {
  SECURITY_PROFILE: "widget-security-level",
  COST_ESTIMATION: "widget-cost-estimation",
  BUSINESS_IMPACT: "widget-business-impact",
  COMPLIANCE_STATUS: "widget-compliance-status",
  RADAR_CHART: "widget-radar-chart",
  VALUE_CREATION: "widget-value-creation",
  SECURITY_SUMMARY: "widget-security-summary",
  TECHNICAL_DETAILS: "widget-technical-details",
};

// CIA Component TestIDs - KEEP ORIGINAL VALUES FOR BACKWARD COMPATIBILITY
export const CIA_TEST_IDS = {
  // Select dropdown elements
  AVAILABILITY_SELECT: "availability-select",
  INTEGRITY_SELECT: "integrity-select",
  CONFIDENTIALITY_SELECT: "confidentiality-select",

  // Labels and descriptions
  AVAILABILITY_LABEL: "availability-label",
  INTEGRITY_LABEL: "integrity-label",
  CONFIDENTIALITY_LABEL: "confidentiality-label",
  AVAILABILITY_DESCRIPTION: "availability-description",
  INTEGRITY_DESCRIPTION: "integrity-description",
  CONFIDENTIALITY_DESCRIPTION: "confidentiality-description",

  // Description text elements
  AVAILABILITY_DESCRIPTION_TEXT: "availability-description-text",
  INTEGRITY_DESCRIPTION_TEXT: "integrity-description-text",
  CONFIDENTIALITY_DESCRIPTION_TEXT: "confidentiality-description-text",

  // Sections and indicators
  AVAILABILITY_SECTION: "availability-section",
  INTEGRITY_SECTION: "integrity-section",
  CONFIDENTIALITY_SECTION: "confidentiality-section",
  AVAILABILITY_LEVEL_INDICATOR: "availability-level-indicator",
  INTEGRITY_LEVEL_INDICATOR: "integrity-level-indicator",
  CONFIDENTIALITY_LEVEL_INDICATOR: "confidentiality-level-indicator",

  // Selected level indicators
  AVAILABILITY_SELECTED_LEVEL: "availability-selected-level",
  INTEGRITY_SELECTED_LEVEL: "integrity-selected-level",
  CONFIDENTIALITY_SELECTED_LEVEL: "confidentiality-selected-level",

  // Color indicators
  AVAILABILITY_COLOR_INDICATOR: "availability-color-indicator",
  INTEGRITY_COLOR_INDICATOR: "integrity-color-indicator",
  CONFIDENTIALITY_COLOR_INDICATOR: "confidentiality-color-indicator",

  // Technical info buttons and popovers
  AVAILABILITY_TECHNICAL_INFO: "availability-technical-info",
  INTEGRITY_TECHNICAL_INFO: "integrity-technical-info",
  CONFIDENTIALITY_TECHNICAL_INFO: "confidentiality-technical-info",
  AVAILABILITY_TECHNICAL_INFO_BUTTON: "availability-technical-info-button",
  INTEGRITY_TECHNICAL_INFO_BUTTON: "integrity-technical-info-button",
  CONFIDENTIALITY_TECHNICAL_INFO_BUTTON:
    "confidentiality-technical-info-button",
  AVAILABILITY_TECHNICAL_POPOVER: "availability-technical-popover",
  INTEGRITY_TECHNICAL_POPOVER: "integrity-technical-popover",
  CONFIDENTIALITY_TECHNICAL_POPOVER: "confidentiality-technical-popover",

  // Badges
  AVAILABILITY_UPTIME_BADGE: "availability-uptime-badge",
  INTEGRITY_VALIDATION_BADGE: "integrity-validation-badge",
  CONFIDENTIALITY_PROTECTION_BADGE: "confidentiality-protection-badge",

  // Technical details and business impact
  AVAILABILITY_TECHNICAL_DETAILS: "availability-technical-details",
  INTEGRITY_TECHNICAL_DETAILS: "integrity-technical-details",
  CONFIDENTIALITY_TECHNICAL_DETAILS: "confidentiality-technical-details",
  AVAILABILITY_BUSINESS_IMPACT: "availability-business-impact",
  INTEGRITY_BUSINESS_IMPACT: "integrity-business-impact",
  CONFIDENTIALITY_BUSINESS_IMPACT: "confidentiality-business-impact",

  // New constants
  AVAILABILITY_KV: "availability-kv",
  INTEGRITY_KV: "integrity-kv",
  CONFIDENTIALITY_KV: "confidentiality-kv",
  CURRENT_AVAILABILITY: "current-availability",
  CURRENT_INTEGRITY: "current-integrity",
  CURRENT_CONFIDENTIALITY: "current-confidentiality",

  // Added missing properties
  SECURITY_LEVEL_SELECTOR: "security-level-selector",
  SECURITY_LEVEL_CONTROLS: "security-level-controls",

  // Additional backward compatibility for any potential direct references
  AVAILABILITY: "availability",
  INTEGRITY: "integrity",
  CONFIDENTIALITY: "confidentiality",
};

// Common widget test IDs - KEEP ORIGINAL VALUES FOR BACKWARD COMPATIBILITY
export const WIDGET_TEST_IDS = {
  // Keep existing IDs for backward compatibility
  SECURITY_LEVEL_CONTROLS: "security-level-controls",
  VALUE_CREATION_TITLE: "value-creation-title",
  ROI_VALUE: "roi-value",
  SECURITY_SUMMARY_TITLE: "security-summary-title",
  LOADING_INDICATOR: "loading-indicator",
  DATA_CONTAINER: "data-container",
  CONTENT_TITLE: "content-title",

  // Value Creation Widget
  VALUE_CREATION_CONTENT: "value-creation-content",
  VALUE_CREATION_SUBTITLE: "value-creation-subtitle",
  VALUE_POINTS_LIST: "value-points-list",
  ROI_SECTION: "roi-section",

  // Technical Details Widget
  TECHNICAL_DETAILS_WIDGET: "technical-details-widget",
  AVAILABILITY_TAB: "availability-tab",
  INTEGRITY_TAB: "integrity-tab",
  CONFIDENTIALITY_TAB: "confidentiality-tab",
  TECHNICAL_HEADER: "technical-header",
  TECHNICAL_DESCRIPTION: "technical-description",
  IMPLEMENTATION_HEADER: "implementation-header",
  RESOURCES_HEADER: "resources-header",
  DEVELOPMENT_EFFORT: "development-effort",
  MAINTENANCE_LEVEL: "maintenance-level",
  REQUIRED_EXPERTISE: "required-expertise",

  // CIA Impact Summary Widget
  CIA_IMPACT_SUMMARY: "cia-impact-summary",
  CIA_IMPACT_AVAILABILITY_ROW: "cia-impact-availability-row",
  CIA_IMPACT_INTEGRITY_ROW: "cia-impact-integrity-row",
  CIA_IMPACT_CONFIDENTIALITY_ROW: "cia-impact-confidentiality-row",
  CIA_IMPACT_AVAILABILITY_LEVEL: "cia-impact-availability-level",
  CIA_IMPACT_INTEGRITY_LEVEL: "cia-impact-integrity-level",
  CIA_IMPACT_CONFIDENTIALITY_LEVEL: "cia-impact-confidentiality-level",

  // Add more specific and standardized widget container IDs
  SECURITY_LEVEL_WIDGET: "widget-security-level",
  SECURITY_LEVEL_SELECTION: "widget-security-level-selection",
  COST_ESTIMATION_WIDGET: "widget-cost-estimation",
  BUSINESS_IMPACT_WIDGET: "widget-business-impact",
  COMPLIANCE_STATUS_WIDGET: "widget-compliance-status",
  RADAR_CHART_WIDGET: "widget-radar-chart",
  VALUE_CREATION_WIDGET: "widget-value-creation",

  // Add these new widget test IDs
  INTEGRITY_IMPACT_WIDGET: "widget-integrity-impact",
  CONFIDENTIALITY_IMPACT_WIDGET: "widget-confidentiality-impact",
  AVAILABILITY_IMPACT_WIDGET: "widget-availability-impact",
  SECURITY_RESOURCES_WIDGET: "widget-security-resources",
};

// BusinessImpactAnalysisWidget IDs - KEEP ORIGINAL VALUES FOR BACKWARD COMPATIBILITY
export const BUSINESS_IMPACT_TEST_IDS = {
  FINANCIAL_IMPACT_SECTION: "financial-impact-section",
  OPERATIONAL_IMPACT_SECTION: "operational-impact-section",
  REPUTATIONAL_IMPACT_SECTION: "reputational-impact-section",
  REGULATORY_IMPACT_SECTION: "regulatory-impact-section",
  STRATEGIC_IMPACT_SECTION: "strategic-impact-section",
  FINANCIAL_RISK_BADGE: "financial-risk-badge",

  // Business Impact Analysis Widget
  BUSINESS_IMPACT_ANALYSIS_PREFIX: "business-impact-analysis",
  CATEGORY_ICON_PREFIX: "category-icon",
  IMPACT_ANALYSIS_PREFIX: "impact-analysis",
  IMPACT_LEVEL_INDICATOR_PREFIX: "impact-level-indicator",
  IMPACT_LEVEL_TEXT_PREFIX: "impact-level-text",
  IMPACT_DESCRIPTION_PREFIX: "impact-description",
  BUSINESS_IMPACT_PREFIX: "business-impact",

  // Tabs and sections
  TAB_CONSIDERATIONS: "tab-considerations",
  TAB_BENEFITS: "tab-benefits",
  BUSINESS_IMPACT_SUMMARY: "business-impact-summary",
  BUSINESS_CONSIDERATIONS: "business-considerations",
  BUSINESS_BENEFITS: "business-benefits",
  NO_CONSIDERATIONS_MESSAGE: "no-considerations-message",
  NO_BENEFITS_MESSAGE: "no-benefits-message",

  // Impact metrics
  IMPACT_METRICS_SECTION: "impact-metrics-section",
  FINANCIAL_IMPACT_CARD: "financial-impact-card",
  FINANCIAL_IMPACT_METRICS: "financial-impact-metrics",
  ANNUAL_REVENUE_LOSS: "annual-revenue-loss",
  REVENUE_LOSS_KV: "revenue-loss-kv",
  OPERATIONAL_IMPACT_CARD: "operational-impact-card",
  OPERATIONAL_IMPACT_METRICS: "operational-impact-metrics",
  MEAN_RECOVERY_TIME: "mean-recovery-time",
  RECOVERY_TIME_KV: "recovery-time-kv",

  // Combined Impact Widget
  COMBINED_BUSINESS_IMPACT_WIDGET: "combined-business-impact-widget",
};

// ComplianceStatusWidget IDs - KEEP ORIGINAL VALUES FOR BACKWARD COMPATIBILITY
export const FRAMEWORK_TEST_IDS = {
  COMPLIANCE_FRAMEWORKS_CONTAINER: "compliance-frameworks-container",
  FRAMEWORK_ITEM_PREFIX: "framework-item",
  COMPLIANCE_STATUS_WIDGET: "compliance-status-widget",
  COMPLIANCE_STATUS_BADGE: "compliance-status-badge",
  COMPLIANT_FRAMEWORKS_LIST: "compliant-frameworks-list",
  COMPLIANCE_REQUIREMENTS_LIST: "compliance-requirements-list",
};

// RadarChart test IDs - KEEP ORIGINAL VALUES FOR BACKWARD COMPATIBILITY
export const CHART_TEST_IDS = {
  RADAR_CHART: "radar-chart",
  RADAR_CHART_CONTAINER: "radar-chart-container",
  RADAR_CHART_CANVAS: "radar-chart-canvas",
  RADAR_CHART_ERROR: "radar-chart-error",
  RADAR_AVAILABILITY_VALUE: "radar-availability-value",
  RADAR_INTEGRITY_VALUE: "radar-integrity-value",
  RADAR_CONFIDENTIALITY_VALUE: "radar-confidentiality-value",
};

// CostEstimationWidget test IDs - KEEP ORIGINAL VALUES FOR BACKWARD COMPATIBILITY
export const COST_TEST_IDS = {
  // Keep existing IDs for backward compatibility
  COST_CONTAINER: "cost-container",
  CAPEX_VALUE: "capex-value",
  OPEX_VALUE: "opex-value",
  TOTAL_COST: "total-cost",
  ROI_ESTIMATE: "roi-estimate",

  // Cost Estimation Widget
  COST_ESTIMATION_CONTENT: "cost-estimation-content",
  ESTIMATED_COST_HEADING: "estimated-cost-heading",
  IMPLEMENTATION_TIME: "implementation-time",
  CAPEX_SEVERITY_ICON: "capex-severity-icon",
  CAPEX_ESTIMATE_VALUE: "capex-estimate-value",
  CAPEX_SECTION: "capex-section",
  CAPEX_PROGRESS_BAR: "capex-progress-bar",
  CAPEX_PERCENTAGE: "capex-percentage",
  OPEX_SEVERITY_ICON: "opex-severity-icon",
  OPEX_ESTIMATE_VALUE: "opex-estimate-value",
  MONTHLY_OPEX: "monthly-opex",
  OPEX_SECTION: "opex-section",
  OPEX_PROGRESS_BAR: "opex-progress-bar",
  OPEX_PERCENTAGE: "opex-percentage",
  TOTAL_COST_SUMMARY: "total-cost-summary",
  THREE_YEAR_TOTAL: "three-year-total",
  COST_ANALYSIS_SECTION: "cost-analysis-section",
  COST_ANALYSIS_HEADING: "cost-analysis-heading",
  COST_ANALYSIS_TEXT: "cost-analysis-text",
  ROI_SECTION: "roi-section",

  // Add more specific IDs
  COST_ESTIMATION_WIDGET: "widget-cost-estimation",
  COST_ESTIMATION_ROOT: "widget-cost-estimation-root",
};

// SecuritySummaryWidget test IDs - KEEP ORIGINAL VALUES FOR BACKWARD COMPATIBILITY
export const SUMMARY_TEST_IDS = {
  SUMMARY_CONTAINER: "security-summary-container",
  OVERALL_RATING: "overall-rating",
  SECURITY_LEVEL_DESCRIPTION: "security-level-description",
  SECURITY_RECOMMENDATIONS: "security-recommendations",
  CIA_RATINGS: "cia-ratings",

  // Security Summary Widget
  SECURITY_SUMMARY_CONTAINER: "security-summary-container",
  SECURITY_LEVEL_INDICATOR: "security-level-indicator",
  SECURITY_ICON: "security-icon",
  SECURITY_LEVEL_PROGRESS_BAR: "security-level-progress-bar",
  SECURITY_SUMMARY_DESCRIPTION: "security-summary-description",
  ROI_ESTIMATE_SUMMARY: "roi-estimate-summary",
  ROI_ESTIMATE_PAIR: "roi-estimate-pair",

  // Toggle sections
  TECHNICAL_SECTION_TOGGLE: "technical-section-toggle",
  TECHNICAL_DETAILS_SECTION: "technical-details-section",
  BUSINESS_IMPACT_TOGGLE: "business-impact-toggle",
  BUSINESS_IMPACT_SECTION: "business-impact-section",
  METRICS_TOGGLE: "metrics-toggle",
  METRICS_SECTION: "metrics-section",

  // CIA levels in summary
  AVAILABILITY_LEVEL_PILL: "availability-level-pill",
  INTEGRITY_LEVEL_PILL: "integrity-level-pill",
  CONFIDENTIALITY_LEVEL_PILL: "confidentiality-level-pill",

  // Technical heading/details
  AVAILABILITY_TECH_HEADING: "availability-tech-heading",
  INTEGRITY_TECH_HEADING: "integrity-tech-heading",
  CONFIDENTIALITY_TECH_HEADING: "confidentiality-tech-heading",
  AVAILABILITY_TECH_DETAILS: "availability-tech-details",
  INTEGRITY_TECH_DETAILS: "integrity-tech-details",
  CONFIDENTIALITY_TECH_DETAILS: "confidentiality-tech-details",

  // Impact headings/details
  AVAILABILITY_IMPACT_HEADING: "availability-impact-heading",
  INTEGRITY_IMPACT_HEADING: "integrity-impact-heading",
  CONFIDENTIALITY_IMPACT_HEADING: "confidentiality-impact-heading",
  AVAILABILITY_IMPACT_DETAILS: "availability-impact-details",
  INTEGRITY_IMPACT_DETAILS: "integrity-impact-details",
  CONFIDENTIALITY_IMPACT_DETAILS: "confidentiality-impact-details",

  // Benefits and recommendations
  KEY_BENEFITS_HEADING: "key-benefits-heading",
  KEY_BENEFITS_LIST: "key-benefits-list",
  RECOMMENDATION_HEADING: "recommendation-heading",
  SECURITY_RECOMMENDATION: "security-recommendation",

  // Status badges - ORIGINAL NAMES WITHOUT PREFIX
  BADGE_HIGH_RISK: "badge-high-risk",
  BADGE_NOT_RECOMMENDED: "badge-not-recommended",
  BADGE_LIMITED_PROTECTION: "badge-limited-protection",
  BADGE_PUBLIC_DATA_ONLY: "badge-public-data-only",
  BADGE_COMPLIANCE_READY: "badge-compliance-ready",
  BADGE_GOOD_BALANCE: "badge-good-balance",
  BADGE_STRONG_PROTECTION: "badge-strong-protection",
  BADGE_SENSITIVE_DATA_READY: "badge-sensitive-data-ready",
  BADGE_MAXIMUM_SECURITY: "badge-maximum-security",
  BADGE_MISSION_CRITICAL: "badge-mission-critical",
};

// App-level test IDs - KEEP ORIGINAL VALUES FOR BACKWARD COMPATIBILITY
export const APP_TEST_IDS = {
  APP_CONTAINER: "app-container",
  THEME_TOGGLE: "theme-toggle",
  APP_TITLE: "app-title",
  DASHBOARD_CONTAINER: "dashboard-container",
  APP_ROOT: "app-root",
  CIA_CLASSIFICATION_APP: "cia-classification-app",
  DASHBOARD_GRID: "dashboard-grid",
};

// Common component test IDs - KEEP ORIGINAL VALUES FOR BACKWARD COMPATIBILITY
export const COMMON_COMPONENT_TEST_IDS = {
  // MetricsCard
  METRICS_CARD: "metrics-card",
  METRICS_CARD_TITLE: "metrics-card-title",
  METRICS_CARD_TREND: "metrics-card-trend",
  METRICS_CARD_VALUE: "metrics-card-value",

  // KeyValuePair
  KEY_VALUE_PAIR: "key-value-pair",
  KV_LABEL: "kv-label",
  KV_VALUE: "kv-value",

  // StatusBadge
  STATUS_BADGE: "status-badge",

  // ValueDisplay
  VALUE_DISPLAY: "value-display",
  DISPLAYED_VALUE: "displayed-value",

  // SecurityLevelSelector
  CURRENT_AVAILABILITY: "current-availability",
  AVAILABILITY_KV: "availability-kv",
  CURRENT_INTEGRITY: "current-integrity",
  INTEGRITY_KV: "integrity-kv",
  CURRENT_CONFIDENTIALITY: "current-confidentiality",
  CONFIDENTIALITY_KV: "confidentiality-kv",

  // Selection
  CONTEXT_INFO: "context-info",
};

// Widget registry test IDs
export const WIDGET_REGISTRY_TEST_IDS = {
  WIDGET_PREFIX: "widget-",
};

// Add these missing constants to the file with other test IDs

export const AVAILABILITY_IMPACT_TEST_IDS = {
  AVAILABILITY_IMPACT_PREFIX: "availability-impact",
  AVAILABILITY_IMPACT_DESCRIPTION: "availability-impact-description",
  AVAILABILITY_IMPACT_VALUE: "availability-impact-value",
};

export const CONFIDENTIALITY_IMPACT_TEST_IDS = {
  CONFIDENTIALITY_IMPACT_PREFIX: "confidentiality-impact",
  CONFIDENTIALITY_IMPACT_DESCRIPTION: "confidentiality-impact-description",
  CONFIDENTIALITY_IMPACT_VALUE: "confidentiality-impact-value",
};

export const INTEGRITY_IMPACT_TEST_IDS = {
  INTEGRITY_IMPACT_PREFIX: "integrity-impact",
  INTEGRITY_IMPACT_DESCRIPTION: "integrity-impact-description",
  INTEGRITY_IMPACT_VALUE: "integrity-impact-value",
};

export const SECURITY_SUMMARY_TEST_IDS = {
  SECURITY_SUMMARY_PREFIX: "security-summary",
  SECURITY_ICON: "security-icon",
  OVERALL_LEVEL: "overall-level",
  AVAILABILITY_LEVEL: "availability-level",
  INTEGRITY_LEVEL: "integrity-level",
  CONFIDENTIALITY_LEVEL: "confidentiality-level",
  IMPLICATIONS: "implications",
  TECHNICAL_SECTION_TOGGLE: "technical-section-toggle",
  TECHNICAL_DETAILS_SECTION: "technical-details-section",
  BUSINESS_IMPACT_TOGGLE: "business-impact-toggle",
  BUSINESS_IMPACT_SECTION: "business-impact-section",
  METRICS_TOGGLE: "metrics-toggle",
  METRICS_SECTION: "metrics-section",
  TECHNICAL_IMPLEMENTATION_DETAILS: "technical-implementation-details",
  AVAILABILITY_TECH_HEADING: "availability-tech-heading",
  INTEGRITY_TECH_HEADING: "integrity-tech-heading",
  CONFIDENTIALITY_TECH_HEADING: "confidentiality-tech-heading",
  SECURITY_RECOMMENDATION: "security-recommendation",
};

export const TECHNICAL_DETAILS_TEST_IDS = {
  TECHNICAL_DETAILS_PREFIX: "technical-details",
  TECHNICAL_DETAILS_WIDGET: "technical-details-widget", // Add this line
  AVAILABILITY_SECTION: "technical-details-availability",
  INTEGRITY_SECTION: "technical-details-integrity",
  CONFIDENTIALITY_SECTION: "technical-details-confidentiality",
};

export const COMPLIANCE_STATUS_TEST_IDS = {
  COMPLIANCE_STATUS_PREFIX: "compliance-status",
  COMPLIANCE_STATUS_BADGE: "compliance-status-badge",
  COMPLIANCE_FRAMEWORK_ITEM: "compliance-framework-item",
  COMPLIANCE_REQUIREMENTS_LIST: "compliance-requirements-list",
};

export const SECURITY_RESOURCES_TEST_IDS = {
  SECURITY_RESOURCES_PREFIX: "security-resources",
  RESOURCE_ITEM: "security-resource-item",
  RESOURCE_LIST: "security-resources-list",
};

export const SECURITY_LEVEL_TEST_IDS = {
  SECURITY_LEVEL_PREFIX: "security-level",
  SECURITY_LEVEL_SELECTOR: "security-level-selector",
};

export const VALUE_CREATION_TEST_IDS = {
  VALUE_CREATION_PREFIX: "value-creation",
  VALUE_POINT: "value-point",
  VALUE_POINTS_LIST: "value-points-list",
};

/**
 * Helper functions for dynamic test ID generation - KEEP ORIGINAL FUNCTIONS
 */
export const createDynamicTestId = {
  valuePoint: (index: number): string => `value-point-${index}`,
  implementationStep: (index: number): string => `implementation-step-${index}`,
  techStack: (index: number): string => `tech-stack-${index}`,
  considerationItem: (index: number): string => `consideration-item-${index}`,
  considerationDescription: (index: number): string =>
    `consideration-description-${index}`,
  impactType: (index: number): string => `impact-type-${index}`,
  impactTypeKv: (index: number): string => `impact-type-kv-${index}`,
  riskBadge: (index: number): string => `risk-badge-${index}`,
  benefitItem: (index: number): string => `benefit-item-${index}`,
  keyBenefit: (index: number): string => `key-benefit-${index}`,
  framework: (index: number): string => `framework-${index}`,
  frameworkStatus: (framework: string): string =>
    `framework-status-${framework.toLowerCase()}`,
  categorySpecific: (prefix: string, category: string): string =>
    `${prefix}-${category.toLowerCase()}`,
  option: (level: string): string => `option-${level}`,
  widgetId: (id: string): string => `widget-${id}`,
};

/**
 * Helper to generate dynamic test IDs with consistent patterns
 */
export const getTestId = (prefix: string, id: string): string => {
  return `${prefix}-${id}`;
};

/**
 * Test helpers for working with security levels and related data
 */
export const TEST_HELPERS = {
  /**
   * Type-safe way to get value points for a security level
   */
  getValuePointsForLevel: (level: string): string[] | undefined => {
    return VALUE_CREATION_POINTS[level as keyof typeof VALUE_CREATION_POINTS];
  },
};

// Export all test IDs in a single object for convenience
export const TEST_IDS = {
  ...CIA_TEST_IDS,
  ...WIDGET_TEST_IDS,
  ...BUSINESS_IMPACT_TEST_IDS,
  ...FRAMEWORK_TEST_IDS,
  ...CHART_TEST_IDS,
  ...COST_TEST_IDS,
  ...SUMMARY_TEST_IDS,
  ...APP_TEST_IDS,
  ...COMMON_COMPONENT_TEST_IDS,
  ...WIDGET_REGISTRY_TEST_IDS,
  ...AVAILABILITY_IMPACT_TEST_IDS,
  ...CONFIDENTIALITY_IMPACT_TEST_IDS,
  ...INTEGRITY_IMPACT_TEST_IDS,
  ...SECURITY_SUMMARY_TEST_IDS,
  ...TECHNICAL_DETAILS_TEST_IDS,
  ...COMPLIANCE_STATUS_TEST_IDS,
  ...SECURITY_RESOURCES_TEST_IDS,
  ...SECURITY_LEVEL_TEST_IDS,
  ...VALUE_CREATION_TEST_IDS,
  createDynamicTestId,
  getTestId,
  TEST_HELPERS,
};
