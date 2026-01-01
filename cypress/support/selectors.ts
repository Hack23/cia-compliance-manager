/**
 * Cypress Test Selectors
 * 
 * Centralized selector utilities for E2E tests that use test IDs from src/constants/testIds.ts
 * This ensures consistency between component test IDs and E2E test selectors.
 */

// Import test ID constants from the source
import {
  WIDGET_TEST_IDS,
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
 */
export function widgetSelector(widgetName: string): string {
  return getByTestId(`widget-${widgetName}`);
}

/**
 * Common widget state selectors
 */
export const widgetState = {
  loading: (widgetName: string) => getByTestId(`${widgetName}-loading`),
  error: (widgetName: string) => getByTestId(`${widgetName}-error`),
  content: (widgetName: string) => getByTestId(`${widgetName}-content`),
  empty: (widgetName: string) => getByTestId(`${widgetName}-empty`),
};

/**
 * Security Level Widget Selectors
 */
export const securityLevelWidget = {
  root: getByTestId(WIDGET_TEST_IDS.SECURITY_LEVEL_WIDGET),
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
 */
export const costEstimationWidget = {
  root: getByTestId(COST_TEST_IDS.COST_ESTIMATION_WIDGET),
  capex: getByTestId(COST_TEST_IDS.CAPEX_VALUE),
  opex: getByTestId(COST_TEST_IDS.OPEX_VALUE),
  total: getByTestId(COST_TEST_IDS.TOTAL_COST),
  roi: getByTestId(COST_TEST_IDS.ROI_ESTIMATE),
  implementationTime: getByTestId(COST_TEST_IDS.IMPLEMENTATION_TIME),
  capexSection: getByTestId(COST_TEST_IDS.CAPEX_SECTION),
  opexSection: getByTestId(COST_TEST_IDS.OPEX_SECTION),
  threeYearTotal: getByTestId(COST_TEST_IDS.THREE_YEAR_TOTAL),
};

/**
 * Security Summary Widget Selectors
 */
export const securitySummaryWidget = {
  root: getByTestId(SECURITY_SUMMARY_TEST_IDS.SECURITY_SUMMARY_WIDGET),
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
 */
export const valueCreationWidget = {
  root: getByTestId(VALUE_CREATION_TEST_IDS.VALUE_CREATION_WIDGET),
  roiValue: getByTestId(VALUE_CREATION_TEST_IDS.ROI_VALUE),
  riskReduction: getByTestId(VALUE_CREATION_TEST_IDS.RISK_REDUCTION),
  valuePointsList: getByTestId(VALUE_CREATION_TEST_IDS.VALUE_POINTS_LIST),
  roiSection: getByTestId(VALUE_CREATION_TEST_IDS.ROI_SECTION),
  totalCost: getByTestId(VALUE_CREATION_TEST_IDS.TOTAL_COST),
  roiDescription: getByTestId(VALUE_CREATION_TEST_IDS.ROI_DESCRIPTION),
};

/**
 * Compliance Status Widget Selectors
 */
export const complianceStatusWidget = {
  root: getByTestId(COMPLIANCE_TEST_IDS.COMPLIANCE_STATUS_WIDGET),
  statusBadge: getByTestId(COMPLIANCE_TEST_IDS.COMPLIANCE_STATUS_BADGE),
  frameworksContainer: getByTestId(COMPLIANCE_TEST_IDS.COMPLIANCE_FRAMEWORKS_CONTAINER),
  compliantFrameworks: getByTestId(COMPLIANCE_TEST_IDS.COMPLIANT_FRAMEWORKS_LIST),
  requirementsList: getByTestId(COMPLIANCE_TEST_IDS.COMPLIANCE_REQUIREMENTS_LIST),
  complianceScore: getByTestId(COMPLIANCE_TEST_IDS.COMPLIANCE_SCORE),
  gapAnalysis: getByTestId(COMPLIANCE_TEST_IDS.FRAMEWORK_GAP_ANALYSIS),
};

/**
 * Business Impact Widget Selectors
 */
export const businessImpactWidget = {
  root: getByTestId(BUSINESS_IMPACT_TEST_IDS.BUSINESS_IMPACT_WIDGET),
  financialSection: getByTestId(BUSINESS_IMPACT_TEST_IDS.FINANCIAL_IMPACT_SECTION),
  operationalSection: getByTestId(BUSINESS_IMPACT_TEST_IDS.OPERATIONAL_IMPACT_SECTION),
  reputationalSection: getByTestId(BUSINESS_IMPACT_TEST_IDS.REPUTATIONAL_IMPACT_SECTION),
  regulatorySection: getByTestId(BUSINESS_IMPACT_TEST_IDS.REGULATORY_IMPACT_SECTION),
  impactHeatmap: getByTestId(BUSINESS_IMPACT_TEST_IDS.IMPACT_HEATMAP),
  executiveSummary: getByTestId(BUSINESS_IMPACT_TEST_IDS.EXECUTIVE_SUMMARY),
};

/**
 * Technical Details Widget Selectors
 */
export const technicalDetailsWidget = {
  root: getByTestId(TECHNICAL_DETAILS_TEST_IDS.TECHNICAL_DETAILS_WIDGET),
  availabilityTab: getByTestId(TECHNICAL_DETAILS_TEST_IDS.AVAILABILITY_TAB),
  integrityTab: getByTestId(TECHNICAL_DETAILS_TEST_IDS.INTEGRITY_TAB),
  confidentialityTab: getByTestId(TECHNICAL_DETAILS_TEST_IDS.CONFIDENTIALITY_TAB),
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
 */
export const securityResourcesWidget = {
  root: getByTestId(SECURITY_RESOURCES_TEST_IDS.WIDGET),
  description: getByTestId(SECURITY_RESOURCES_TEST_IDS.DESCRIPTION),
  resourceGroup: getByTestId(SECURITY_RESOURCES_TEST_IDS.RESOURCE_GROUP),
  resourceItem: getByTestId(SECURITY_RESOURCES_TEST_IDS.RESOURCE_ITEM),
  noResources: getByTestId(SECURITY_RESOURCES_TEST_IDS.NO_RESOURCES),
  viewAllButton: getByTestId(SECURITY_RESOURCES_TEST_IDS.VIEW_ALL_BUTTON),
};

/**
 * Availability Impact Widget Selectors
 */
export const availabilityImpactWidget = {
  root: widgetSelector('availability-impact'),
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
 */
export const integrityImpactWidget = {
  root: widgetSelector('integrity-impact'),
  description: getByTestId(INTEGRITY_IMPACT_TEST_IDS.INTEGRITY_IMPACT_DESCRIPTION),
  value: getByTestId(INTEGRITY_IMPACT_TEST_IDS.INTEGRITY_IMPACT_VALUE),
};

/**
 * Confidentiality Impact Widget Selectors
 */
export const confidentialityImpactWidget = {
  root: widgetSelector('confidentiality-impact'),
  description: getByTestId(CONFIDENTIALITY_IMPACT_TEST_IDS.CONFIDENTIALITY_IMPACT_DESCRIPTION),
  value: getByTestId(CONFIDENTIALITY_IMPACT_TEST_IDS.CONFIDENTIALITY_IMPACT_VALUE),
};

/**
 * Security Visualization Widget Selectors (Radar Chart)
 */
export const securityVisualizationWidget = {
  root: widgetSelector('security-visualization'),
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
