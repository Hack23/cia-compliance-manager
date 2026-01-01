import { SecurityLevel } from "../types/cia";

// ---------------------------------------------------------------
// SECTION 1: TEST ID NAMING CONVENTION
// ---------------------------------------------------------------

/**
 * ## Test ID Naming Convention
 *
 * All test IDs in this codebase follow a consistent hierarchical pattern:
 * **Pattern**: `{scope}-{element}-{modifier}`
 *
 * ### Examples:
 * - Widget containers: `widget-cost-estimation`
 * - Buttons: `cost-estimation-button-submit`
 * - Sections: `security-summary-section-overview`
 * - Labels: `availability-label-current-level`
 * - Values: `cost-estimation-value-total`
 *
 * ### Rules:
 * 1. **Use kebab-case** (lowercase with hyphens)
 * 2. **Start with widget/component name** for scoping
 * 3. **Follow hierarchical structure** (parent → child → specific)
 * 4. **Use semantic descriptors** (describe purpose, not appearance)
 * 5. **Avoid generic names** like "button-1" or "div-2"
 *
 * ### Widget-Scoped Pattern:
 * - Root: `widget-{name}` (e.g., `widget-cost-estimation`)
 * - Section: `widget-{name}-section-{section-name}`
 * - Button: `widget-{name}-button-{action}`
 * - Value: `widget-{name}-value-{data-type}`
 * - Label: `widget-{name}-label-{field}`
 */

// ---------------------------------------------------------------
// SECTION 2: HELPER FUNCTIONS AND UTILITIES
// ---------------------------------------------------------------

/**
 * Generate hierarchical test ID from parts
 *
 * @param parts - Array of ID parts to combine
 * @returns Formatted test ID in kebab-case
 *
 * @example
 * createTestId('cost', 'estimation', 'button', 'submit')
 * // Returns: 'cost-estimation-button-submit'
 *
 * @example
 * createTestId('widget', 'Security Level')
 * // Returns: 'widget-security-level'
 */
export function createTestId(...parts: string[]): string {
  return parts
    .filter(Boolean)
    .map(part => part.toLowerCase().replace(/\s+/g, '-'))
    .join('-');
}

/**
 * Type definition for widget test ID generators
 */
export interface WidgetTestIds {
  root: string;
  section: (name: string) => string;
  button: (name: string) => string;
  value: (name: string) => string;
  label: (name: string) => string;
  icon: (name: string) => string;
  input: (name: string) => string;
  list: (name: string) => string;
  item: (name: string) => string;
  card: (name: string) => string;
  header: (name?: string) => string;
  content: (name?: string) => string;
  footer: (name?: string) => string;
}

/**
 * Widget-scoped test ID generator factory
 * Creates a factory object with methods to generate consistent test IDs
 * for all elements within a widget.
 *
 * @param widgetName - Name of the widget (will be normalized to kebab-case)
 * @returns Object with methods to generate scoped test IDs
 *
 * @example
 * const COST_IDS = createWidgetTestId('cost-estimation');
 * COST_IDS.root              // 'widget-cost-estimation'
 * COST_IDS.section('capex')  // 'widget-cost-estimation-section-capex'
 * COST_IDS.button('submit')  // 'widget-cost-estimation-button-submit'
 * COST_IDS.value('total')    // 'widget-cost-estimation-value-total'
 * COST_IDS.label('amount')   // 'widget-cost-estimation-label-amount'
 * COST_IDS.header()          // 'widget-cost-estimation-header'
 * COST_IDS.header('main')    // 'widget-cost-estimation-header-main'
 */
export function createWidgetTestId(widgetName: string): WidgetTestIds {
  const normalizedName = widgetName.toLowerCase().replace(/\s+/g, '-');
  return {
    root: createTestId('widget', normalizedName),
    section: (name: string) => createTestId('widget', normalizedName, 'section', name),
    button: (name: string) => createTestId('widget', normalizedName, 'button', name),
    value: (name: string) => createTestId('widget', normalizedName, 'value', name),
    label: (name: string) => createTestId('widget', normalizedName, 'label', name),
    icon: (name: string) => createTestId('widget', normalizedName, 'icon', name),
    input: (name: string) => createTestId('widget', normalizedName, 'input', name),
    list: (name: string) => createTestId('widget', normalizedName, 'list', name),
    item: (name: string) => createTestId('widget', normalizedName, 'item', name),
    card: (name: string) => createTestId('widget', normalizedName, 'card', name),
    header: (name?: string) =>
      name
        ? createTestId('widget', normalizedName, 'header', name)
        : createTestId('widget', normalizedName, 'header'),
    content: (name?: string) =>
      name
        ? createTestId('widget', normalizedName, 'content', name)
        : createTestId('widget', normalizedName, 'content'),
    footer: (name?: string) =>
      name
        ? createTestId('widget', normalizedName, 'footer', name)
        : createTestId('widget', normalizedName, 'footer'),
  };
}

/**
 * Create a context-specific test ID by combining a component prefix with an element ID
 * @deprecated Use createTestId() or createWidgetTestId() instead for consistency
 */
export const createContextualTestId = (
  componentPrefix: string,
  elementId: string
): string => {
  return `${componentPrefix}-${elementId}`;
};

/**
 * Helper to create a test ID with a prefix
 * @deprecated Use createTestId() instead for consistency
 */
export const getTestId = (prefix: string, id: string): string => {
  return `${prefix}-${id}`;
};

/**
 * Dynamic test ID creation functions for various component types
 */
export const createDynamicTestId = {
  /**
   * Create test ID for a menu item
   */
  menuItem: (index: number): string => `menu-item-${index}`,

  /**
   * Create test ID for a security level
   */
  securityLevel: (level: string): string => `security-level-${level}`,

  /**
   * Create test ID for a compliance control
   */
  complianceControl: (id: string): string => `compliance-control-${id}`,

  /**
   * Create test ID for an impact item
   */
  impactItem: (index: number): string => `impact-item-${index}`,

  /**
   * Create test ID for a consideration item
   */
  considerationItem: (index: number): string => `consideration-item-${index}`,

  /**
   * Create test ID for a consideration description
   */
  considerationDescription: (index: number): string =>
    `consideration-description-${index}`,

  /**
   * Create test ID for an impact type
   */
  impactType: (index: number): string => `impact-type-${index}`,

  /**
   * Create test ID for an impact type key-value pair
   */
  impactTypeKv: (index: number): string => `impact-type-kv-${index}`,

  /**
   * Create test ID for a risk badge
   */
  riskBadge: (index: number): string => `risk-badge-${index}`,

  /**
   * Create test ID for a benefit item
   */
  benefitItem: (index: number): string => `benefit-item-${index}`,

  /**
   * Create test ID for a key benefit
   */
  keyBenefit: (index: number): string => `key-benefit-${index}`,

  /**
   * Create test ID for a framework
   */
  framework: (index: number): string => `framework-${index}`,

  /**
   * Create test ID for a compliance framework
   */
  complianceFramework: (name: string): string =>
    `compliance-framework-${name.toLowerCase().replace(/\s+/g, "-")}`,

  /**
   * Create test ID for a security resource
   */
  securityResource: (index: number): string => `security-resource-${index}`,

  /**
   * Create test ID for a framework status
   */
  frameworkStatus: (framework: string): string =>
    `framework-status-${framework}`,

  /**
   * Create test ID for a category-specific item
   *
   * @param prefix - Category prefix
   * @param category - Category name
   * @returns Category-specific test ID
   */
  categorySpecific: (prefix: string, category: string): string => {
    // Ensure category has first letter capitalized, then convert to lowercase
    const formattedCategory =
      category.charAt(0).toUpperCase() + category.slice(1).toLowerCase();
    return `${prefix}-${formattedCategory.toLowerCase()}`;
  },

  /**
   * Create test ID for an option
   */
  option: (level: string): string => `option-${level}`,

  /**
   * Create test ID for a widget
   */
  widgetId: (id: string): string => `widget-${id}`,

  /**
   * Create test ID for a value point
   */
  valuePoint: (index: number): string => `value-point-${index}`,

  /**
   * Create test ID for an implementation step
   */
  implementationStep: (index: number): string => `implementation-step-${index}`,

  /**
   * Create test ID for a tech stack
   */
  techStack: (index: number): string => `tech-stack-${index}`,
};

/**
 * Creates a category-specific test ID
 *
 * @param category - The category name
 * @param id - The ID value
 * @returns The formatted test ID
 */
export function categorySpecific(category: string, id: string): string {
  return `${category}-${id}`;
}

/**
 * Test helpers for finding and matching elements
 */
export const TEST_HELPERS = {
  /**
   * Match an element by text and class
   */
  matchTextAndClass: (text: string, className: string) => {
    return (content: string, element: Element) => {
      return element.className.includes(className) && content.includes(text);
    };
  },

  /**
   * Find an element by text
   */
  findByText: (text: string) => {
    return document.evaluate(
      `//*[contains(text(), '${text}')]`,
      document,
      null,
      XPathResult.FIRST_ORDERED_NODE_TYPE,
      null
    ).singleNodeValue;
  },

  /**
   * Convert string to SecurityLevel type safely
   */
  toSecurityLevel: (level: string): SecurityLevel => {
    return level as SecurityLevel;
  },

  /**
   * Get value points for a security level
   */
  getValuePointsForLevel: (_level: SecurityLevel): string[] => {
    // Default implementation returns empty array
    // This is just for type checking in tests
    return [];
  },
};

// ---------------------------------------------------------------
// SECTION 2: WIDGET REGISTRY TEST IDs
// ---------------------------------------------------------------

export const WIDGET_REGISTRY_TEST_IDS = {
  WIDGET_PREFIX: "widget-",
};

// ---------------------------------------------------------------
// SECTION 3: WIDGET-SCOPED TEST ID GENERATORS
// ---------------------------------------------------------------

/**
 * Widget-scoped test ID generators using the createWidgetTestId helper.
 * These provide consistent, hierarchical test IDs for each widget.
 * 
 * Usage:
 * ```tsx
 * import { SECURITY_LEVEL_WIDGET_IDS } from '../constants/testIds';
 * 
 * <div data-testid={SECURITY_LEVEL_WIDGET_IDS.root}>
 *   <section data-testid={SECURITY_LEVEL_WIDGET_IDS.section('confidentiality')}>
 *     <button data-testid={SECURITY_LEVEL_WIDGET_IDS.button('view-details')}>
 *   </section>
 * </div>
 * ```
 */

export const SECURITY_LEVEL_WIDGET_IDS = createWidgetTestId('security-level');
export const VALUE_CREATION_WIDGET_IDS = createWidgetTestId('value-creation');
export const COST_ESTIMATION_WIDGET_IDS = createWidgetTestId('cost-estimation');
export const BUSINESS_IMPACT_WIDGET_IDS = createWidgetTestId('business-impact');
export const COMPLIANCE_STATUS_WIDGET_IDS = createWidgetTestId('compliance-status');
export const SECURITY_SUMMARY_WIDGET_IDS = createWidgetTestId('security-summary');
export const AVAILABILITY_IMPACT_WIDGET_IDS = createWidgetTestId('availability-impact');
export const INTEGRITY_IMPACT_WIDGET_IDS = createWidgetTestId('integrity-impact');
export const CONFIDENTIALITY_IMPACT_WIDGET_IDS = createWidgetTestId('confidentiality-impact');
export const TECHNICAL_DETAILS_WIDGET_IDS = createWidgetTestId('technical-details');
export const SECURITY_RESOURCES_WIDGET_IDS = createWidgetTestId('security-resources');
export const SECURITY_VISUALIZATION_WIDGET_IDS = createWidgetTestId('security-visualization');

// ---------------------------------------------------------------
// SECTION 4: CIA COMPONENT TEST IDs
// ---------------------------------------------------------------

export const CIA_TEST_IDS = {
  // Select dropdown elements
  AVAILABILITY_SELECT: "availability-selector",
  INTEGRITY_SELECT: "integrity-selector",
  CONFIDENTIALITY_SELECT: "confidentiality-selector",

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
  AVAILABILITY_COLOR_INDICATOR: "availability-color-indicator",
  INTEGRITY_COLOR_INDICATOR: "integrity-color-indicator",
  CONFIDENTIALITY_COLOR_INDICATOR: "confidentiality-color-indicator",

  // Details sections
  AVAILABILITY_DETAILS_SECTION: "availability-details-section",
  INTEGRITY_DETAILS_SECTION: "integrity-details-section",
  CONFIDENTIALITY_DETAILS_SECTION: "confidentiality-details-section",

  // Tab-specific elements
  TAB_AVAILABILITY: "tab-availability",
  TAB_INTEGRITY: "tab-integrity",
  TAB_CONFIDENTIALITY: "tab-confidentiality",

  // Icons and symbols
  SECURITY_ICON: "security-icon",
  SECURITY_LEVEL_ICON: "security-level-icon",
  CONFIDENTIALITY_ICON: "confidentiality-icon",
  INTEGRITY_ICON: "integrity-icon",
  AVAILABILITY_ICON: "availability-icon",

  // Key-value pairs
  SECURITY_LEVEL_KV: "security-level-kv",
  AVAILABILITY_KV: "availability-kv",
  INTEGRITY_KV: "integrity-kv",
  CONFIDENTIALITY_KV: "confidentiality-kv",

  // Shared state display
  SECURITY_LEVEL_DISPLAY: "security-level-display",
  DISPLAYED_VALUE: "displayed-value",

  // SecurityLevelSelector
  CURRENT_AVAILABILITY: "current-availability",
  CURRENT_INTEGRITY: "current-integrity",
  CURRENT_CONFIDENTIALITY: "current-confidentiality",

  // Selection
  CONTEXT_INFO: "context-info",

  // Security level controls
  SECURITY_LEVEL_SELECTOR: "security-level-selector",
  SECURITY_LEVEL_CONTROLS: "security-level-controls",

  // Additional backward compatibility for any potential direct references
  AVAILABILITY: "availability",
  INTEGRITY: "integrity",
  CONFIDENTIALITY: "confidentiality",
};

// ---------------------------------------------------------------
// SECTION 4: COMMON WIDGET TEST IDs
// ---------------------------------------------------------------

export const WIDGET_TEST_IDS = {
  // Common widget elements
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
  BENEFITS_SECTION: "benefits-section",

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

  // Widget container IDs
  SECURITY_LEVEL_WIDGET: "widget-security-level",
  SECURITY_LEVEL_SELECTION: "widget-security-level-selection",
  COST_ESTIMATION_WIDGET: "widget-cost-estimation",
  BUSINESS_IMPACT_WIDGET: "widget-business-impact",
  COMPLIANCE_STATUS_WIDGET: "widget-compliance-status",
  RADAR_CHART_WIDGET: "widget-radar-chart",
  VALUE_CREATION_WIDGET: "widget-value-creation",

  // Impact widgets
  INTEGRITY_IMPACT_WIDGET: "widget-integrity-impact",
  CONFIDENTIALITY_IMPACT_WIDGET: "widget-confidentiality-impact",
  AVAILABILITY_IMPACT_WIDGET: "widget-availability-impact",
  SECURITY_RESOURCES_WIDGET: "widget-security-resources",
  SECURITY_SUMMARY_WIDGET: "security-summary-widget",
  SECURITY_VISUALIZATION_WIDGET: "security-visualization-widget",
  SECURITY_SUMMARY: "security-summary-widget",
  AVAILABILITY_IMPACT: "availability-impact-widget",
  INTEGRITY_IMPACT: "integrity-impact-widget",
  CONFIDENTIALITY_IMPACT: "confidentiality-impact-widget",
  SECURITY_RESOURCES: "security-resources-widget",
  CIA_IMPACT_SUMMARY_WIDGET: "cia-impact-summary-widget",

  // Widget type enum constant
  COST_ESTIMATION: "cost-estimation-widget",
  SECURITY_LEVEL: "security-level-widget",
  BUSINESS_IMPACT_ANALYSIS: "business-impact-analysis-widget",
  COMPLIANCE_STATUS: "compliance-status-widget",
  SECURITY_VISUALIZATION: "security-visualization-widget",
  TECHNICAL_DETAILS: "technical-details-widget",
  VALUE_CREATION: "value-creation-widget",
  BUSINESS_IMPACT: "business-impact-widget",
};

// ---------------------------------------------------------------
// SECTION 5: BUSINESS IMPACT ANALYSIS WIDGET TEST IDs
// ---------------------------------------------------------------

export const BUSINESS_IMPACT_TEST_IDS = {
  // Impact sections
  FINANCIAL_IMPACT_SECTION: "financial-impact-section",
  OPERATIONAL_IMPACT_SECTION: "operational-impact-section",
  REPUTATIONAL_IMPACT_SECTION: "reputational-impact-section",
  REGULATORY_IMPACT_SECTION: "regulatory-impact-section",
  STRATEGIC_IMPACT_SECTION: "strategic-impact-section",
  BUSINESS_IMPACT_WIDGET: "business-impact-widget",

  // Add the missing constants
  IMPACT_HEATMAP: "business-impact-heatmap",
  EXECUTIVE_SUMMARY: "business-impact-executive-summary",

  // Prefixes for dynamic IDs
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
  // Add missing constants
  REPUTATIONAL_IMPACT_CARD: "reputational-impact-card",
  REGULATORY_IMPACT_CARD: "regulatory-impact-card",

  // Analysis widget specific IDs
  BUSINESS_IMPACT_ANALYSIS_WIDGET: "business-impact-analysis-widget",
  IMPACT_SUMMARY: "impact-summary",
  IMPACT_CATEGORY: "impact-category",
  IMPACT_DESCRIPTION: "impact-description",
  RISK_LEVEL: "risk-level",

  // Combined Impact Widget
  COMBINED_BUSINESS_IMPACT_WIDGET: "combined-business-impact-widget",
};

// ---------------------------------------------------------------
// SECTION 6: COMPLIANCE FRAMEWORK TEST IDs
// ---------------------------------------------------------------

export const FRAMEWORK_TEST_IDS = {
  COMPLIANCE_FRAMEWORKS_CONTAINER: "compliance-frameworks-container",
  FRAMEWORK_ITEM_PREFIX: "framework-item",
  COMPLIANCE_STATUS_WIDGET: "compliance-status-widget",
  COMPLIANCE_STATUS_BADGE: "compliance-status-badge",
  COMPLIANT_FRAMEWORKS_LIST: "compliant-frameworks-list",
  COMPLIANCE_REQUIREMENTS_LIST: "compliance-requirements-list",
};

// ---------------------------------------------------------------
// SECTION 7: RADAR CHART TEST IDs
// ---------------------------------------------------------------

export const CHART_TEST_IDS = {
  RADAR_CHART: "radar-chart",
  RADAR_AVAILABILITY_VALUE: "radar-availability-value",
  RADAR_INTEGRITY_VALUE: "radar-integrity-value",
  RADAR_CONFIDENTIALITY_VALUE: "radar-confidentiality-value",
  SECURITY_SCORE_OVERLAY: "security-score-overlay",
  SECURITY_SCORE_SUMMARY: "security-score-summary",

  // Chart components
  CHART_CONTAINER: "chart-container",
  CHART_LEGEND: "chart-legend",
  CHART_TOOLTIP: "chart-tooltip",

  // Chart annotations
  CHART_ANNOTATION: "chart-annotation",
  CHART_THRESHOLD_LINE: "chart-threshold-line",

  // Chart controls
  CHART_ZOOM_CONTROL: "chart-zoom-control",
  CHART_RESET_BUTTON: "chart-reset-button",
  CHART_DOWNLOAD_BUTTON: "chart-download-button",

  // Chart labels
  CHART_AXIS_LABEL: "chart-axis-label",
  CHART_TITLE: "chart-title",
  CHART_SUBTITLE: "chart-subtitle",
  RADAR_CHART_CONTAINER: "radar-chart-container",
};

// ---------------------------------------------------------------
// SECTION 8: COST ESTIMATION WIDGET TEST IDs
// ---------------------------------------------------------------

export const COST_TEST_IDS = {
  // Core cost container elements
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

  // Widget identifiers
  COST_ESTIMATION_WIDGET: "widget-cost-estimation",
  COST_ESTIMATION_ROOT: "widget-cost-estimation-root",
};

/**
 * Test IDs for cost estimation widget
 */
export const COST_ESTIMATION_TEST_IDS = {
  IMPLEMENTATION_COST: "implementation-cost",
  OPERATIONAL_COST: "operational-cost",
  PERSONNEL_COST: "personnel-cost",
  AVAILABILITY_COST: "availability-cost",
  INTEGRITY_COST: "integrity-cost",
  CONFIDENTIALITY_COST: "confidentiality-cost",
  IMPLEMENTATION_TIMELINE: "implementation-timeline",
  ROI_ESTIMATE: "roi-estimate",
  TOTAL_COST: "total-cost",
  THREE_YEAR_TOTAL: "three-year-total",
  WIDGET: "widget-cost-estimation",
};

// ---------------------------------------------------------------
// SECTION 9: SECURITY SUMMARY WIDGET TEST IDs
// ---------------------------------------------------------------

export const SUMMARY_TEST_IDS = {
  SUMMARY_CONTAINER: "security-summary-container",
  OVERALL_RATING: "security-summary-overall-rating",
  SECURITY_LEVEL_DESCRIPTION: "security-summary-level-description",
  SECURITY_RECOMMENDATIONS: "security-summary-recommendations",
  CIA_RATINGS: "security-summary-cia-ratings",
  SECURITY_SUMMARY_CONTAINER: "security-summary-container",
  SECURITY_LEVEL_INDICATOR: "security-summary-level-indicator",
  SECURITY_SUMMARY_DESCRIPTION: "security-summary-description",
  SECURITY_ICON: "security-summary-icon",
  SECURITY_RECOMMENDATION: "security-recommendation",
  // Added missing test IDs
  RECOMMENDATION_HEADING: "security-summary-recommendation-heading",
  TECHNICAL_SECTION_TOGGLE: "security-summary-technical-toggle",
  TECHNICAL_DETAILS_SECTION: "security-summary-technical-details",
  AVAILABILITY_TECH_HEADING: "security-summary-availability-tech-heading",
  INTEGRITY_TECH_HEADING: "security-summary-integrity-tech-heading",
  CONFIDENTIALITY_TECH_HEADING: "security-summary-confidentiality-tech-heading",
  AVAILABILITY_TECH_DETAILS: "security-summary-availability-tech-details",
  INTEGRITY_TECH_DETAILS: "security-summary-integrity-tech-details",
  CONFIDENTIALITY_TECH_DETAILS: "security-summary-confidentiality-tech-details",
  BUSINESS_IMPACT_TOGGLE: "security-summary-business-toggle",
  BUSINESS_IMPACT_SECTION: "security-summary-business-impact",
  AVAILABILITY_IMPACT_HEADING: "security-summary-availability-impact-heading",
  INTEGRITY_IMPACT_HEADING: "security-summary-integrity-impact-heading",
  CONFIDENTIALITY_IMPACT_HEADING:
    "security-summary-confidentiality-impact-heading",
  AVAILABILITY_IMPACT_DETAILS: "security-summary-availability-impact-details",
  INTEGRITY_IMPACT_DETAILS: "security-summary-integrity-impact-details",
  CONFIDENTIALITY_IMPACT_DETAILS:
    "security-summary-confidentiality-impact-details",
  METRICS_TOGGLE: "security-summary-metrics-toggle",
  METRICS_SECTION: "security-summary-metrics-section",
  ROI_ESTIMATE_SUMMARY: "security-summary-roi-estimate-summary",
  ROI_ESTIMATE_PAIR: "security-summary-roi-estimate-pair",
};

// ---------------------------------------------------------------
// SECTION 10: APP-LEVEL TEST IDs
// ---------------------------------------------------------------

export const APP_TEST_IDS = {
  APP_CONTAINER: "app-container",
  APP_TITLE: "app-title",
  APP_ROOT: "app-root",
  APP_LOGO: "app-logo",
  APP_VERSION: "app-version",
  APP_INDICATOR: "app-indicator",
  DASHBOARD_GRID: "dashboard-grid",
  THEME_TOGGLE: "theme-toggle",
  LIGHT_MODE_BUTTON: "light-mode-button",
  DARK_MODE_BUTTON: "dark-mode-button",
  SYSTEM_MODE_BUTTON: "system-mode-button",
  CIA_CLASSIFICATION_APP: "cia-classification-app",
  KEYBOARD_SHORTCUTS_BUTTON: "keyboard-shortcuts-button",
  SOURCE_LINK: "source-link",
  DOCS_LINK: "docs-link",
  AUTHOR_LINK: "author-link",

  // Additional app-level constants
  ERROR_BOUNDARY: "error-boundary",
  ERROR_MESSAGE: "error-message",
  ERROR_DETAILS: "error-details",
  ERROR_STACK: "error-stack",
  ERROR_RESET: "error-reset",
};

// ---------------------------------------------------------------
// SECTION 11: COMMON COMPONENT TEST IDs
// ---------------------------------------------------------------

export const COMMON_COMPONENT_TEST_IDS = {
  STATUS_BADGE: "status-badge",
  METRICS_CARD: "metrics-card",
  METRICS_CARD_TITLE: "metrics-card-title",
  METRICS_CARD_VALUE: "metrics-card-value",
  METRICS_CARD_LABEL: "metrics-card-label",
  METRICS_CARD_ICON: "metrics-card-icon",
  KEY_VALUE_PAIR: "key-value-pair",
  KEY_VALUE_KEY: "key-value-key",
  KEY_VALUE_VALUE: "key-value-value",
  KEY_VALUE_GROUP: "key-value-group",
  WIDGET_CONTAINER: "widget-container",
  WIDGET_HEADER: "widget-header",
  WIDGET_TITLE: "widget-title",
  WIDGET_CONTENT: "widget-content",
  LOADING: "loading-indicator",
  ERROR: "error-message",
  SUCCESS: "success-message",
  WARNING: "warning-message",
  INFO: "info-message",
  EMPTY_STATE: "empty-state",
  VALUE_DISPLAY: "value-display",
  CONTEXT_INFO: "context-info",
  // Additional common component test IDs
  METRIC_CARD: "metric-card",
  RISK_LEVEL_BADGE: "risk-level-badge",
  WIDGET_SECTION: "widget-section",
  WIDGET_ERROR_BOUNDARY: "widget-error-boundary",
  WIDGET_ERROR_BOUNDARY_MESSAGE: "widget-error-boundary-message",
  TAB_CONTAINER: "tab-container",
};

// Error Toast Test IDs
export const ERROR_TOAST_TEST_IDS = {
  ERROR_TOAST: "error-toast",
  ERROR_TOAST_TITLE: "error-toast-title",
  ERROR_TOAST_MESSAGE: "error-toast-message",
  ERROR_TOAST_CLOSE_BUTTON: "error-toast-close-button",
  ERROR_TOAST_RETRY_BUTTON: "error-toast-retry-button",
  ERROR_TOAST_ICON: "error-toast-icon",
  ERROR_TOAST_CONTAINER: "error-toast-container",
  ERROR_TOAST_DISMISS_TIMER: "error-toast-dismiss-timer",
  ERROR_TOAST_AUTO_DISMISS: "error-toast-auto-dismiss",
  ERROR_TOAST_SEVERITY: "error-toast-severity",
};

// Error Message Test IDs
export const ERROR_MESSAGE_TEST_IDS = {
  ERROR_MESSAGE: "error-message",
  ERROR_MESSAGE_TEXT: "error-message-text",
  ERROR_MESSAGE_TITLE: "error-message-title",
  ERROR_MESSAGE_RETRY_BUTTON: "error-message-retry-button",
  ERROR_MESSAGE_ICON: "error-message-icon",
  ERROR_MESSAGE_CONTAINER: "error-message-container",
  ERROR_MESSAGE_DESCRIPTION: "error-message-description",
};

// Widget Container Test IDs
export const WIDGET_CONTAINER_TEST_IDS = {
  WIDGET_CONTAINER: "widget-container",
  WIDGET_SPINNER: "widget-spinner",
  WIDGET_LOADER: "widget-loader",
  WIDGET_ERROR: "widget-error",
  WIDGET_ERROR_RETRY_BUTTON: "widget-error-retry-button",
  WIDGET_CONTENT: "widget-content",
  WIDGET_CONTAINER_LOADING_CONTAINER: "widget-container-loading-container",
  WIDGET_CONTAINER_ERROR: "widget-container-error",
  WIDGET_CONTAINER_CONTENT: "widget-container-content",
};

// ---------------------------------------------------------------
// SECTION 12: SECURITY LEVEL WIDGET TEST IDs
// ---------------------------------------------------------------

export const SECURITY_LEVEL_TEST_IDS = {
  SECURITY_LEVEL_WIDGET: "security-level-widget",
  SECURITY_LEVEL_SELECTOR: "security-level-selector",
  SECURITY_LEVEL_SELECTOR_ITEM: "security-level-selector-item",
  SECURITY_LEVEL_BADGE: "security-level-badge",
  SECURITY_LEVEL_LABEL: "security-level-label",
  SECURITY_LEVEL_ICON: "security-level-icon",
  SECURITY_LEVEL_VALUE: "security-level-value",
  SECURITY_LEVEL_DESCRIPTION: "security-level-description",
  // Add missing test IDs
  AVAILABILITY_SELECTOR: "availability-selector",
  INTEGRITY_SELECTOR: "integrity-selector",
  CONFIDENTIALITY_SELECTOR: "confidentiality-selector",
  CALCULATED_LEVEL: "calculated-level",
  MANUAL_LEVEL_SELECTOR: "manual-level-selector",
  AUTO_CALCULATE_BUTTON: "auto-calculate-button",
};

// ---------------------------------------------------------------
// SECTION 13: SECURITY SUMMARY WIDGET TEST IDs
// ---------------------------------------------------------------

export const SECURITY_SUMMARY_TEST_IDS = {
  SECURITY_SUMMARY_WIDGET: "security-summary-widget",
  SECURITY_LEVEL_HEADING: "security-level-heading",
  SECURITY_LEVEL_BADGE: "security-level-badge",
  RISK_LEVEL: "risk-level",
  AVAILABILITY_IMPACT: "availability-impact",
  INTEGRITY_IMPACT: "integrity-impact",
  CONFIDENTIALITY_IMPACT: "confidentiality-impact",
  // Add missing test IDs
  WIDGET: "security-summary-widget",
  OVERALL_LEVEL: "overall-security-level",
  SUMMARY_DESCRIPTION: "summary-description",
  AVAILABILITY_CARD: "availability-card",
  AVAILABILITY_LEVEL: "availability-level",
  AVAILABILITY_RISK: "availability-risk",
  INTEGRITY_CARD: "integrity-card",
  INTEGRITY_LEVEL: "integrity-level",
  INTEGRITY_RISK: "integrity-risk",
  CONFIDENTIALITY_CARD: "confidentiality-card",
  CONFIDENTIALITY_LEVEL: "confidentiality-level",
  CONFIDENTIALITY_RISK: "confidentiality-risk",
};

// ---------------------------------------------------------------
// SECTION 14: VALUE CREATION WIDGET TEST IDs
// ---------------------------------------------------------------

export const VALUE_CREATION_TEST_IDS = {
  VALUE_CREATION_WIDGET: "value-creation-widget",
  ROI_VALUE: "roi-value",
  RISK_REDUCTION: "risk-reduction",
  SECURITY_LEVEL: "security-level",
  AVAILABILITY_IMPACT: "availability-impact",
  INTEGRITY_IMPACT: "integrity-impact",
  CONFIDENTIALITY_IMPACT: "confidentiality-impact",
  VALUE_POINTS: "value-points",
  VALUE_POINT: "value-point",
  VALUE_CREATION_PREFIX: "value-creation",
  VALUE_POINTS_LIST: "value-points-list",
  ROI_TITLE: "roi-title",
  TOTAL_COST: "total-cost",
  ROI_DESCRIPTION: "roi-description",
  VALUE_TITLE: "value-title",
  // Add missing test ID
  ROI_SECTION: "roi-section",
  VALUE_BENEFITS: "value-benefits",
  VALUE_METRIC: "value-metric",
  SECURITY_SCORE: "security-score",
  IMPACT_SUMMARY: "impact-summary",
  ROI_PERCENTAGE: "roi-percentage",
  POTENTIAL_SAVINGS: "potential-savings",
  BREAKEVEN_PERIOD: "breakeven-period",
  VALUE_SCORE: "value-score",
  ROI_ESTIMATE: "roi-estimate",
  COST_SAVINGS: "cost-savings",
  PRODUCTIVITY: "productivity",
  AVAILABILITY_VALUE: "availability-value",
  INTEGRITY_VALUE: "integrity-value",
  CONFIDENTIALITY_VALUE: "confidentiality-value",
  STRATEGIC_VALUE: "strategic-value",
};

// ---------------------------------------------------------------
// SECTION 15: AVAILABILITY IMPACT WIDGET TEST IDs
// ---------------------------------------------------------------

export const AVAILABILITY_IMPACT_TEST_IDS = {
  AVAILABILITY_IMPACT_PREFIX: "widget-availability-impact",
  AVAILABILITY_IMPACT_TITLE: "availability-impact-title",
  AVAILABILITY_IMPACT_DESCRIPTION: "availability-impact-description",
  AVAILABILITY_IMPACT_BUSINESS_IMPACT: "availability-impact-business-impact",
  AVAILABILITY_IMPACT_VALUE: "availability-impact-value",
  AVAILABILITY_IMPACT_UPTIME: "availability-impact-uptime",
  AVAILABILITY_IMPACT_MTTR: "availability-impact-mttr",
  AVAILABILITY_IMPACT_RTO: "availability-impact-rto",
  AVAILABILITY_IMPACT_RPO: "availability-impact-rpo",
  AVAILABILITY_IMPACT_RECOMMENDATIONS: "availability-impact-recommendations",
  AVAILABILITY_IMPACT_BUSINESS_PERSPECTIVE:
    "availability-impact-business-perspective",
};

// ---------------------------------------------------------------
// SECTION 16: CONFIDENTIALITY & INTEGRITY IMPACT TEST IDs
// ---------------------------------------------------------------

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

// ---------------------------------------------------------------
// SECTION 17: TECHNICAL DETAILS WIDGET TEST IDs
// ---------------------------------------------------------------

export const TECHNICAL_DETAILS_TEST_IDS = {
  TECHNICAL_DETAILS_PREFIX: "technical-details",
  TECHNICAL_DETAILS_WIDGET: "technical-details-widget",
  IMPLEMENTATION_STEPS: "implementation-steps",
  IMPLEMENTATION_EFFORT: "implementation-effort",
  DEVELOPMENT_EFFORT: "development-effort",
  MAINTENANCE_EFFORT: "maintenance-effort",
  EXPERTISE_LEVEL: "expertise-level",
  IMPLEMENTATION_TIME: "implementation-time",
  IMPLEMENTATION_COMPLEXITY: "implementation-complexity",
  REQUIRED_EXPERTISE: "required-expertise",

  // Add missing test IDs
  COMPONENT_SELECTOR: "technical-details-component-selector",
  COMPONENT_DESCRIPTION: "technical-details-component-description",
  IMPLEMENTATION_TABS: "technical-details-implementation-tabs",
  GUIDELINES_CONTENT: "technical-details-guidelines-content",
  GUIDELINES_TAB: "technical-details-guidelines-tab",
  CODE_TAB: "technical-details-code-tab",
  CODE_CONTENT: "technical-details-code-content",
  CONFIGURATIONS_TAB: "technical-details-configurations-tab",
  CONFIGURATIONS_CONTENT: "technical-details-configurations-content",
  CODE_BLOCK_PREFIX: "technical-details-code-block",
  CONFIDENTIALITY_BUTTON: "technical-details-confidentiality-button",
  INTEGRITY_BUTTON: "technical-details-integrity-button",
  AVAILABILITY_BUTTON: "technical-details-availability-button",

  // Keep existing IDs
  AVAILABILITY_SECTION: "technical-details-availability",
  INTEGRITY_SECTION: "technical-details-integrity",
  CONFIDENTIALITY_SECTION: "technical-details-confidentiality",
  TECHNICAL_HEADER: "technical-header",
  TECHNICAL_DETAILS_SECTION: "technical-details-section",
  TECHNICAL_DESCRIPTION: "technical-description",
  MAINTENANCE_LEVEL: "maintenance-level",
  RECOVERY_METRICS: "recovery-metrics",
  AVAILABILITY_TAB: "availability-tab",
  INTEGRITY_TAB: "integrity-tab",
  CONFIDENTIALITY_TAB: "confidentiality-tab",
  IMPLEMENTATION_HEADER: "implementation-header",
};

// ---------------------------------------------------------------
// SECTION 18: SECURITY RESOURCES WIDGET TEST IDs
// ---------------------------------------------------------------

export const RESOURCE_TEST_IDS = {
  SECURITY_RESOURCES_WIDGET: "security-resources-widget",
  RESOURCE_LIST: "resource-list",
  RESOURCE_ITEM: "resource-item",
  RESOURCE_TITLE: "resource-title",
  RESOURCE_DESCRIPTION: "resource-description",
  RESOURCE_LINK: "resource-link",
  RESOURCE_TYPE: "resource-type",
  RESOURCE_CATEGORY: "resource-category",
  RESOURCE_TAGS: "resource-tags",
  SECURITY_RESOURCES_PREFIX: "security-resources",
  RESOURCE_SEARCH: "resource-search",
  RESOURCE_CATEGORY_FILTER: "resource-category-filter",
  RESOURCE_ITEM_PREFIX: "resource-item",
  RESOURCE_LINK_PREFIX: "resource-link",
  RESOURCE_TAG_PREFIX: "resource-tag",
  CATEGORY_FILTER_PREFIX: "category-filter",
  RESOURCES_CONTAINER: "resources-container",
  NO_RESOURCES_MESSAGE: "no-resources-message",
};

/**
 * Test IDs for the Security Resources Widget
 */
export const SECURITY_RESOURCES_TEST_IDS = {
  WIDGET: "security-resources-widget",
  DESCRIPTION: "security-resources-description",
  LOADING: "security-resources-loading",
  ERROR: "security-resources-error",
  OVERVIEW: "security-resources-overview",
  SECURITY_LEVEL: "security-resources-level",
  VALUE_POINT: "security-resources-value-point",
  NO_RESOURCES: "security-resources-no-resources",
  RESOURCE_GROUP: "security-resources-group",
  RESOURCE_ITEM: "security-resources-item",
  RESOURCE_COUNT: "security-resources-count",
  RESOURCE_TITLE: "security-resources-title",
  RESOURCE_DESCRIPTION: "security-resources-description",
  VIEW_ALL_BUTTON: "security-resources-view-all",
  // Add missing properties
  SECURITY_RESOURCES_WIDGET: "security-resources-widget",
  RESOURCE_CATEGORY_FILTER: "resource-category-filter",
  RESOURCE_SEARCH: "resource-search",
};

// ---------------------------------------------------------------
// SECTION 19: COMMON TEST IDs
// ---------------------------------------------------------------

export const COMMON_TEST_IDS = {
  BUTTON: "button",
  CHECKBOX: "checkbox",
  RADIO: "radio",
  SELECT: "select",
  INPUT: "input",
  LABEL: "label",
  FORM: "form",
  SUBMIT: "submit",
  CANCEL: "cancel",
  TOGGLE: "toggle",
  TOOLTIP: "tooltip",
  POPOVER: "popover",
  DROPDOWN: "dropdown",
  MENU: "menu",
  MENU_ITEM: "menu-item",
  LIST: "list",
  LIST_ITEM: "list-item",
  TABLE: "table",
  TABLE_ROW: "table-row",
  TABLE_CELL: "table-cell",
  MODAL: "modal",
  MODAL_TITLE: "modal-title",
  MODAL_CONTENT: "modal-content",
  MODAL_FOOTER: "modal-footer",
  SIDEBAR: "sidebar",
  HEADER: "header",
  FOOTER: "footer",
  MAIN: "main",
  NAV: "nav",
};

// ---------------------------------------------------------------
// SECTION 20: COMPLIANCE TEST IDs
// ---------------------------------------------------------------

export const COMPLIANCE_TEST_IDS = {
  COMPLIANCE_STATUS_WIDGET: "compliance-status-widget",
  COMPLIANCE_STATUS_BADGE: "compliance-status-badge",
  COMPLIANCE_FRAMEWORK_ITEM: "compliance-framework-item",
  COMPLIANCE_REQUIREMENTS_LIST: "compliance-requirements-list",
  COMPLIANCE_FRAMEWORKS_CONTAINER: "compliance-frameworks-container",
  COMPLIANT_FRAMEWORKS_LIST: "compliant-frameworks-list",
  // Add missing test IDs
  WIDGET: "compliance-status-widget", // Alias for backward compatibility
  COMPLIANCE_ERROR: "compliance-error",
  COMPLIANCE_LOADING: "compliance-loading",
  COMPLIANCE_STATUS_SUMMARY: "compliance-status-summary",
  COMPLIANCE_SCORE: "compliance-score",
  COMPLIANCE_SCORE_BAR: "compliance-score-bar",
  FRAMEWORK_ITEM_PREFIX: "framework-item",
  FRAMEWORK_STATUS: "framework-status",
  PARTIALLY_COMPLIANT_FRAMEWORKS_LIST: "partially-compliant-frameworks-list",
  NON_COMPLIANT_FRAMEWORKS_LIST: "non-compliant-frameworks-list",
  FRAMEWORK_GAP_ANALYSIS: "framework-gap-analysis",
  SELECTED_FRAMEWORK_STATUS: "selected-framework-status",
  AVAILABILITY_REQUIREMENT: "availability-requirement",
  AVAILABILITY_REQUIRED_LEVEL: "availability-required-level",
  INTEGRITY_REQUIREMENT: "integrity-requirement",
  INTEGRITY_REQUIRED_LEVEL: "integrity-required-level",
  CONFIDENTIALITY_REQUIREMENT: "confidentiality-requirement",
  CONFIDENTIALITY_REQUIRED_LEVEL: "confidentiality-required-level",
  COMPLIANCE_GAPS_LIST: "compliance-gaps-list",
  COMPLIANCE_GAP_ITEM: "compliance-gap-item",
  COMPLIANCE_RECOMMENDATIONS_LIST: "compliance-recommendations-list",
  COMPLIANCE_RECOMMENDATION_ITEM: "compliance-recommendation-item",
  NO_GAP_ANALYSIS: "no-gap-analysis",
  COMPLIANCE_TIPS_LIST: "compliance-tips-list",
};

// ---------------------------------------------------------------
// SECTION 21: EXPORT ALL TEST IDs
// ---------------------------------------------------------------

/**
 * Consolidated export of all test IDs for easier imports
 */
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
  ...RESOURCE_TEST_IDS,
  ...SECURITY_LEVEL_TEST_IDS,
  ...VALUE_CREATION_TEST_IDS,
  ...COMPLIANCE_TEST_IDS,
  createDynamicTestId,
  getTestId,
  TEST_HELPERS,
  costEstimation: {
    container: "cost-estimation-container",
    title: "cost-estimation-title",
    summary: "cost-estimation-summary",
    details: "cost-estimation-details",
    chart: "cost-estimation-chart",
    // Adding the missing test IDs
    implementationCost: "implementation-cost",
    operationalCost: "operational-cost",
    personnelCost: "personnel-cost",
    availabilityCost: "availability-cost",
    integrityCost: "integrity-cost",
    confidentialityCost: "confidentiality-cost",
    implementationTimeline: "implementation-timeline",
  },
};

/**
 * Create a compound test ID by combining a prefix and a suffix
 */
export const createCompoundTestId = (prefix: string, suffix: string): string =>
  `${prefix}-${suffix}`;

/**
 * Helper for type-safe SecurityLevel conversion
 * Use this to convert strings to SecurityLevel type when needed
 */
export function asSecurityLevel(level: string): SecurityLevel {
  return level as SecurityLevel;
}

// ---------------------------------------------------------------
// SECTION 22: ACCESSIBILITY TEST IDs
// ---------------------------------------------------------------

/**
 * Test IDs for accessibility features and WCAG compliance
 */
export const ACCESSIBILITY_TEST_IDS = {
  // Skip links
  SKIP_TO_MAIN: 'skip-to-main-content',
  SKIP_TO_NAVIGATION: 'skip-to-navigation',
  SKIP_TO_FOOTER: 'skip-to-footer',

  // Landmarks
  MAIN_CONTENT: 'main-content',
  PRIMARY_NAVIGATION: 'primary-navigation',
  CONTENT_REGION: 'content-region',

  // ARIA live regions
  ANNOUNCEMENT_REGION: 'announcement-region',
  STATUS_MESSAGE: 'status-message',
  ALERT_MESSAGE: 'alert-message',

  // Focus management
  FOCUS_TRAP_CONTAINER: 'focus-trap-container',
  FIRST_FOCUSABLE: 'first-focusable-element',
  LAST_FOCUSABLE: 'last-focusable-element',

  // Screen reader only text
  SR_ONLY_TEXT: 'sr-only-text',
  VISUALLY_HIDDEN: 'visually-hidden',

  // Keyboard navigation indicators
  KEYBOARD_FOCUS_INDICATOR: 'keyboard-focus-indicator',
  ACTIVE_ELEMENT: 'active-element',

  // Accessible descriptions
  ACCESSIBLE_DESCRIPTION: 'accessible-description',
  ACCESSIBLE_LABEL: 'accessible-label',
  ACCESSIBLE_NAME: 'accessible-name',

  // Chart accessibility
  CHART_DATA_TABLE: 'chart-data-table',
  CHART_ACCESSIBLE_DESCRIPTION: 'chart-accessible-description',
  CHART_SUMMARY: 'chart-summary',

  // Form accessibility
  FORM_ERROR_SUMMARY: 'form-error-summary',
  FORM_SUCCESS_MESSAGE: 'form-success-message',
  REQUIRED_FIELD_INDICATOR: 'required-field-indicator',
  FIELD_ERROR_MESSAGE: 'field-error-message',
  FIELD_HELP_TEXT: 'field-help-text',

  // Widget accessibility
  WIDGET_ACCESSIBLE_DESCRIPTION: 'widget-accessible-description',
  WIDGET_KEYBOARD_INSTRUCTIONS: 'widget-keyboard-instructions',
};
