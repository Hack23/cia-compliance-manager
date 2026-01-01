/**
 * Cypress Test Selectors
 * 
 * Centralized selector utilities for E2E tests that use test IDs from src/constants/testIds.ts
 * This ensures consistency between component test IDs and E2E test selectors.
 */

// Import test ID constants from the source
import {
  CIA_TEST_IDS,
  COST_TEST_IDS,
  SECURITY_SUMMARY_TEST_IDS,
  VALUE_CREATION_TEST_IDS,
  COMPLIANCE_TEST_IDS,
  BUSINESS_IMPACT_TEST_IDS,
  TECHNICAL_DETAILS_TEST_IDS,
  SECURITY_RESOURCES_TEST_IDS,
  AVAILABILITY_IMPACT_TEST_IDS,
  INTEGRITY_IMPACT_TEST_IDS,
  CONFIDENTIALITY_IMPACT_TEST_IDS,
  CHART_TEST_IDS,
} from '../../src/constants/testIds';

/**
 * Get element by test ID
 */
export function getByTestId(testId: string): string {
  return `[data-testid="${testId}"]`;
}

/**
 * Get widget container by widget name
 * 
 * @deprecated This helper is deprecated for widgets using WidgetContainer.
 * WidgetContainer prefixes test IDs with 'widget-container-', so this function
 * will not work correctly for most widgets.
 * 
 * Instead, use the specific widget selector objects (e.g., costEstimationWidget.root,
 * securityLevelWidget.root) which account for the WidgetContainer prefix pattern.
 */
export function widgetSelector(widgetName: string): string {
  return getByTestId(`widget-${widgetName}`);
}

/**
 * Common widget state selectors
 * 
 * Note: These helpers work for non-WidgetContainer components.
 * For widgets using WidgetContainer, state test IDs follow different patterns:
 *   - loading: `widget-container-loading-container-${testId}`
 *   - error: `widget-container-error-${testId}`
 * 
 * Consider using widget-specific selectors or checking the actual DOM structure.
 */
export const widgetState = {
  loading: (widgetName: string) => getByTestId(`${widgetName}-loading`),
  error: (widgetName: string) => getByTestId(`${widgetName}-error`),
  content: (widgetName: string) => getByTestId(`${widgetName}-content`),
  empty: (widgetName: string) => getByTestId(`${widgetName}-empty`),
};

/**
 * Security Level Widget Selectors
 * Widget uses WidgetContainer with testId="widget-security-level"
 * Widget file: SecurityLevelWidget.tsx
 */
export const securityLevelWidget = {
  // WidgetContainer creates: widget-container-widget-security-level
  root: getByTestId('widget-container-widget-security-level'),
  availabilitySelect: getByTestId(CIA_TEST_IDS.AVAILABILITY_SELECT),
  integritySelect: getByTestId(CIA_TEST_IDS.INTEGRITY_SELECT),
  confidentialitySelect: getByTestId(CIA_TEST_IDS.CONFIDENTIALITY_SELECT),
  availabilityLabel: getByTestId(CIA_TEST_IDS.AVAILABILITY_LABEL),
  integrityLabel: getByTestId(CIA_TEST_IDS.INTEGRITY_LABEL),
  confidentialityLabel: getByTestId(CIA_TEST_IDS.CONFIDENTIALITY_LABEL),
  currentAvailability: getByTestId(CIA_TEST_IDS.CURRENT_AVAILABILITY),
  currentIntegrity: getByTestId(CIA_TEST_IDS.CURRENT_INTEGRITY),
  currentConfidentiality: getByTestId(CIA_TEST_IDS.CURRENT_CONFIDENTIALITY),
};

/**
 * Cost Estimation Widget Selectors
 * Widget uses WidgetContainer with testId="widget-cost-estimation"
 * Widget file: CostEstimationWidget.tsx
 * Note: Component uses COST_ESTIMATION_WIDGET_IDS.label() for MetricCards
 */
export const costEstimationWidget = {
  // WidgetContainer creates: widget-container-widget-cost-estimation
  root: getByTestId('widget-container-widget-cost-estimation'),
  // MetricCard test IDs use label() function: widget-cost-estimation-label-{name}
  capex: getByTestId('widget-cost-estimation-label-capex'),
  opex: getByTestId('widget-cost-estimation-label-opex'),
  total: getByTestId('widget-cost-estimation-label-total'),
  roi: getByTestId(COST_TEST_IDS.ROI_ESTIMATE),
  implementationTime: getByTestId(COST_TEST_IDS.IMPLEMENTATION_TIME),
  // Section test IDs - these may not exist in current implementation
  capexSection: getByTestId('widget-cost-estimation-section-capex'),
  opexSection: getByTestId('widget-cost-estimation-section-opex'),
  threeYearTotal: getByTestId(COST_TEST_IDS.THREE_YEAR_TOTAL),
};

/**
 * Security Summary Widget Selectors
 * Widget uses WidgetContainer with testId="widget-security-summary"
 * Widget file: SecuritySummaryWidget.tsx
 */
export const securitySummaryWidget = {
  // WidgetContainer creates: widget-container-widget-security-summary
  root: getByTestId('widget-container-widget-security-summary'),
  overallRating: getByTestId(SECURITY_SUMMARY_TEST_IDS.OVERALL_LEVEL),
  levelBadge: getByTestId(SECURITY_SUMMARY_TEST_IDS.SECURITY_LEVEL_BADGE),
  description: getByTestId(SECURITY_SUMMARY_TEST_IDS.SUMMARY_DESCRIPTION),
  availabilityCard: getByTestId(SECURITY_SUMMARY_TEST_IDS.AVAILABILITY_CARD),
  integrityCard: getByTestId(SECURITY_SUMMARY_TEST_IDS.INTEGRITY_CARD),
  confidentialityCard: getByTestId(SECURITY_SUMMARY_TEST_IDS.CONFIDENTIALITY_CARD),
  availabilityLevel: getByTestId(SECURITY_SUMMARY_TEST_IDS.AVAILABILITY_LEVEL),
  integrityLevel: getByTestId(SECURITY_SUMMARY_TEST_IDS.INTEGRITY_LEVEL),
  confidentialityLevel: getByTestId(SECURITY_SUMMARY_TEST_IDS.CONFIDENTIALITY_LEVEL),
};

/**
 * Value Creation Widget Selectors
 * Widget uses WidgetContainer with testId="widget-value-creation"
 * Widget file: ValueCreationWidget.tsx
 */
export const valueCreationWidget = {
  // WidgetContainer creates: widget-container-widget-value-creation
  root: getByTestId('widget-container-widget-value-creation'),
  roiValue: getByTestId(VALUE_CREATION_TEST_IDS.ROI_VALUE),
  riskReduction: getByTestId(VALUE_CREATION_TEST_IDS.RISK_REDUCTION),
  valuePointsList: getByTestId(VALUE_CREATION_TEST_IDS.VALUE_POINTS_LIST),
  roiSection: getByTestId(VALUE_CREATION_TEST_IDS.ROI_SECTION),
  totalCost: getByTestId(VALUE_CREATION_TEST_IDS.TOTAL_COST),
  roiDescription: getByTestId(VALUE_CREATION_TEST_IDS.ROI_DESCRIPTION),
};

/**
 * Compliance Status Widget Selectors
 * Widget uses WidgetContainer with testId="widget-compliance-status"
 * Widget file: ComplianceStatusWidget.tsx
 */
export const complianceStatusWidget = {
  // WidgetContainer creates: widget-container-widget-compliance-status
  root: getByTestId('widget-container-widget-compliance-status'),
  statusBadge: getByTestId(COMPLIANCE_TEST_IDS.COMPLIANCE_STATUS_BADGE),
  frameworksContainer: getByTestId(COMPLIANCE_TEST_IDS.COMPLIANCE_FRAMEWORKS_CONTAINER),
  compliantFrameworks: getByTestId(COMPLIANCE_TEST_IDS.COMPLIANT_FRAMEWORKS_LIST),
  requirementsList: getByTestId(COMPLIANCE_TEST_IDS.COMPLIANCE_REQUIREMENTS_LIST),
  complianceScore: getByTestId(COMPLIANCE_TEST_IDS.COMPLIANCE_SCORE),
  gapAnalysis: getByTestId(COMPLIANCE_TEST_IDS.FRAMEWORK_GAP_ANALYSIS),
};

/**
 * Business Impact Widget Selectors
 * Widget uses WidgetContainer with testId="widget-business-impact"
 * Widget file: BusinessImpactAnalysisWidget.tsx
 */
export const businessImpactWidget = {
  // WidgetContainer creates: widget-container-widget-business-impact
  root: getByTestId('widget-container-widget-business-impact'),
  financialSection: getByTestId(BUSINESS_IMPACT_TEST_IDS.FINANCIAL_IMPACT_SECTION),
  operationalSection: getByTestId(BUSINESS_IMPACT_TEST_IDS.OPERATIONAL_IMPACT_SECTION),
  reputationalSection: getByTestId(BUSINESS_IMPACT_TEST_IDS.REPUTATIONAL_IMPACT_SECTION),
  regulatorySection: getByTestId(BUSINESS_IMPACT_TEST_IDS.REGULATORY_IMPACT_SECTION),
  impactHeatmap: getByTestId(BUSINESS_IMPACT_TEST_IDS.IMPACT_HEATMAP),
  executiveSummary: getByTestId(BUSINESS_IMPACT_TEST_IDS.EXECUTIVE_SUMMARY),
};

/**
 * Technical Details Widget Selectors
 * Widget uses WidgetContainer with testId="widget-technical-details" (TECHNICAL_DETAILS_WIDGET_IDS.root)
 * Widget file: TechnicalDetailsWidget.tsx
 */
export const technicalDetailsWidget = {
  // WidgetContainer creates: widget-container-widget-technical-details
  root: getByTestId('widget-container-widget-technical-details'),
  availabilityTab: getByTestId(TECHNICAL_DETAILS_TEST_IDS.AVAILABILITY_TAB),
  integrityTab: getByTestId(TECHNICAL_DETAILS_TEST_IDS.INTEGRITY_TAB),
  confidentialityTab: getByTestId(TECHNICAL_DETAILS_TEST_IDS.CONFIDENTIALITY_TAB),
  availabilityButton: getByTestId(TECHNICAL_DETAILS_TEST_IDS.AVAILABILITY_BUTTON),
  integrityButton: getByTestId(TECHNICAL_DETAILS_TEST_IDS.INTEGRITY_BUTTON),
  confidentialityButton: getByTestId(TECHNICAL_DETAILS_TEST_IDS.CONFIDENTIALITY_BUTTON),
  implementationSteps: getByTestId(TECHNICAL_DETAILS_TEST_IDS.IMPLEMENTATION_STEPS),
  developmentEffort: getByTestId(TECHNICAL_DETAILS_TEST_IDS.DEVELOPMENT_EFFORT),
  maintenanceLevel: getByTestId(TECHNICAL_DETAILS_TEST_IDS.MAINTENANCE_LEVEL),
  requiredExpertise: getByTestId(TECHNICAL_DETAILS_TEST_IDS.REQUIRED_EXPERTISE),
  guidelinesTab: getByTestId(TECHNICAL_DETAILS_TEST_IDS.GUIDELINES_TAB),
  codeTab: getByTestId(TECHNICAL_DETAILS_TEST_IDS.CODE_TAB),
  configurationsTab: getByTestId(TECHNICAL_DETAILS_TEST_IDS.CONFIGURATIONS_TAB),
};

/**
 * Security Resources Widget Selectors
 * Widget uses WidgetContainer with testId="widget-security-resources"
 * Widget file: SecurityResourcesWidget.tsx
 */
export const securityResourcesWidget = {
  // WidgetContainer creates: widget-container-widget-security-resources
  root: getByTestId('widget-container-widget-security-resources'),
  description: getByTestId(SECURITY_RESOURCES_TEST_IDS.DESCRIPTION),
  resourceGroup: getByTestId(SECURITY_RESOURCES_TEST_IDS.RESOURCE_GROUP),
  resourceItem: getByTestId(SECURITY_RESOURCES_TEST_IDS.RESOURCE_ITEM),
  noResources: getByTestId(SECURITY_RESOURCES_TEST_IDS.NO_RESOURCES),
  viewAllButton: getByTestId(SECURITY_RESOURCES_TEST_IDS.VIEW_ALL_BUTTON),
  resourceSearch: getByTestId(SECURITY_RESOURCES_TEST_IDS.RESOURCE_SEARCH),
  resourceCategoryFilter: getByTestId(SECURITY_RESOURCES_TEST_IDS.RESOURCE_CATEGORY_FILTER),
};

/**
 * Availability Impact Widget Selectors
 * Widget uses WidgetContainer with testId="widget-availability-impact"
 * Widget file: AvailabilityImpactWidget.tsx (extends ImpactWidget)
 */
export const availabilityImpactWidget = {
  // WidgetContainer creates: widget-container-widget-availability-impact
  root: getByTestId('widget-container-widget-availability-impact'),
  title: getByTestId(AVAILABILITY_IMPACT_TEST_IDS.AVAILABILITY_IMPACT_TITLE),
  description: getByTestId(AVAILABILITY_IMPACT_TEST_IDS.AVAILABILITY_IMPACT_DESCRIPTION),
  businessImpact: getByTestId(AVAILABILITY_IMPACT_TEST_IDS.AVAILABILITY_IMPACT_BUSINESS_IMPACT),
  uptime: getByTestId(AVAILABILITY_IMPACT_TEST_IDS.AVAILABILITY_IMPACT_UPTIME),
  mttr: getByTestId(AVAILABILITY_IMPACT_TEST_IDS.AVAILABILITY_IMPACT_MTTR),
  rto: getByTestId(AVAILABILITY_IMPACT_TEST_IDS.AVAILABILITY_IMPACT_RTO),
  rpo: getByTestId(AVAILABILITY_IMPACT_TEST_IDS.AVAILABILITY_IMPACT_RPO),
};

/**
 * Integrity Impact Widget Selectors
 * Note: WidgetContainer prefixes testId with 'widget-container-'
 * Widget constructs testId as: "widget-" + INTEGRITY_IMPACT_PREFIX
 * Where INTEGRITY_IMPACT_PREFIX = "integrity-impact"
 * Result: testId = "widget-integrity-impact"
 * After WidgetContainer: "widget-container-widget-integrity-impact"
 */
export const integrityImpactWidget = {
  root: getByTestId('widget-container-widget-integrity-impact'),
  description: getByTestId(INTEGRITY_IMPACT_TEST_IDS.INTEGRITY_IMPACT_DESCRIPTION),
  value: getByTestId(INTEGRITY_IMPACT_TEST_IDS.INTEGRITY_IMPACT_VALUE),
};

/**
 * Confidentiality Impact Widget Selectors
 * Note: WidgetContainer prefixes testId with 'widget-container-'
 * Widget constructs testId as: "widget-" + CONFIDENTIALITY_IMPACT_PREFIX
 * Where CONFIDENTIALITY_IMPACT_PREFIX = "confidentiality-impact"
 * Result: testId = "widget-confidentiality-impact"
 * After WidgetContainer: "widget-container-widget-confidentiality-impact"
 */
export const confidentialityImpactWidget = {
  root: getByTestId('widget-container-widget-confidentiality-impact'),
  description: getByTestId(CONFIDENTIALITY_IMPACT_TEST_IDS.CONFIDENTIALITY_IMPACT_DESCRIPTION),
  value: getByTestId(CONFIDENTIALITY_IMPACT_TEST_IDS.CONFIDENTIALITY_IMPACT_VALUE),
};

/**
 * Security Visualization Widget Selectors (Radar Chart)
 * Widget uses WidgetContainer with testId="widget-security-visualization"
 * Widget file: SecurityVisualizationWidget.tsx
 */
export const securityVisualizationWidget = {
  // WidgetContainer creates: widget-container-widget-security-visualization
  root: getByTestId('widget-container-widget-security-visualization'),
  radarChart: getByTestId(CHART_TEST_IDS.RADAR_CHART),
  radarChartContainer: getByTestId(CHART_TEST_IDS.RADAR_CHART_CONTAINER),
  availabilityValue: getByTestId(CHART_TEST_IDS.RADAR_AVAILABILITY_VALUE),
  integrityValue: getByTestId(CHART_TEST_IDS.RADAR_INTEGRITY_VALUE),
  confidentialityValue: getByTestId(CHART_TEST_IDS.RADAR_CONFIDENTIALITY_VALUE),
  securityScore: getByTestId(CHART_TEST_IDS.SECURITY_SCORE_OVERLAY),
};

/**
 * Common app-level selectors
 */
export const app = {
  container: '[data-testid="app-container"]',
  dashboardGrid: '[data-testid="dashboard-grid"]',
  themeToggle: '[data-testid="theme-toggle"]',
  loadingIndicator: '[data-testid="loading-indicator"]',
  errorBoundary: '[data-testid="error-boundary"]',
};

/**
 * All widget selectors in one place for iteration
 */
export const allWidgets = {
  'security-level': securityLevelWidget,
  'security-summary': securitySummaryWidget,
  'cost-estimation': costEstimationWidget,
  'value-creation': valueCreationWidget,
  'compliance-status': complianceStatusWidget,
  'business-impact': businessImpactWidget,
  'availability-impact': availabilityImpactWidget,
  'integrity-impact': integrityImpactWidget,
  'confidentiality-impact': confidentialityImpactWidget,
  'technical-details': technicalDetailsWidget,
  'security-resources': securityResourcesWidget,
  'security-visualization': securityVisualizationWidget,
};

/**
 * Widget list for testing all widgets
 */
export const widgetNames = [
  'security-level',
  'security-summary',
  'cost-estimation',
  'value-creation',
  'compliance-status',
  'business-impact',
  'availability-impact',
  'integrity-impact',
  'confidentiality-impact',
  'technical-details',
  'security-resources',
  'security-visualization',
] as const;

export type WidgetName = typeof widgetNames[number];
