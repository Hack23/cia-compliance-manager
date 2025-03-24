/**
 * Central export of utility functions for CIA Compliance Manager
 *
 * This index file provides organized exports of all utility functions
 * to ensure they're properly accessible throughout the application.
 *
 * @packageDocumentation
 */

// Import all utilities to help organize exports
import {
  BUSINESS_IMPACT_CATEGORIES,
  RISK_LEVELS,
} from "../constants/riskConstants";
import { calculateRiskLevel } from "../types/cia.utility";
import * as colorUtils from "./colorUtils";
import * as costUtils from "./costCalculationUtils";
import * as formatUtils from "./formatUtils";
import * as levelUtils from "./levelValuesUtils";
import * as riskUtils from "./riskUtils";
import * as securityUtils from "./securityLevelUtils";
import * as typeGuards from "./typeGuards";
import * as widgetUtils from "./widgetHelpers";

// Export individual utilities with explicit names to avoid conflicts
// Color utilities
export const { getSecurityLevelColorClass } = colorUtils;

// Add missing color utilities with appropriate fallbacks
export const getColorForRiskLevel =
  colorUtils.getSecurityLevelColorClass ||
  ((_level: string) => `text-gray-600`);
export const getComplianceStatusColor =
  colorUtils.getSecurityLevelColorClass ||
  ((_status: string) => `text-gray-600`);
export const getProgressColor = (progress: number) =>
  progress > 75
    ? "text-green-500"
    : progress > 50
    ? "text-blue-500"
    : progress > 25
    ? "text-yellow-500"
    : "text-red-500";
export const getSeverityColor = (severity: string) =>
  severity === "high"
    ? "text-red-500"
    : severity === "medium"
    ? "text-yellow-500"
    : "text-green-500";

// Cost calculation utilities
export const {
  calculateImplementationCost,
  calculateTotalSecurityCost,
  calculateSecurityROI,
  getRecommendedBudgetAllocation,
} = costUtils;

// Formatting utilities
export const {
  formatBudgetPercentage,
  formatCurrency,
  formatCurrencyWithOptions,
  formatDate,
  formatLargeNumber,
  formatNumber,
  formatNumberWithDecimals,
  formatPercentage,
  formatRiskLevel,
  formatTimeframe,
  formatUptime,
  toTitleCase,
} = formatUtils;

// Level value utilities
export const {
  calculateOverallSecurityLevel: calculateOverallSecurityLevelFromValues,
  compareSecurityLevels,
  getNormalizedSecurityValue,
  getSecurityLevelValue: getNumericSecurityLevelValue,
  getSecurityLevelFromValue,
  SECURITY_LEVEL_VALUES,
} = levelUtils;

// Risk utilities
export const {
  calculateCombinedRiskLevel,
  calculateRiskScore,
  getFormattedRiskLevel,
  getRiskBadgeVariant,
  getRiskLevelFromSecurityLevel,
  getRiskScoreFromSecurityLevel,
  getRiskSeverityDescription,
  getStatusBadgeForRiskLevel,
  parseRiskLevel,
} = riskUtils;

// Security level utilities
export const {
  calculateOverallSecurityLevel,
  asSecurityLevel,
  formatSecurityLevel: formatSecurityLevelString,
  getRecommendedSecurityLevel,
  getSecurityIcon,
  getSecurityLevelBadgeVariant,
  getSecurityLevelClass,
  getSecurityLevelDescription,
  getSecurityLevelPercentage,
  getSecurityLevelValue,
  isSecurityLevel,
  meetsComplianceRequirements,
  normalizeSecurityLevel,
} = securityUtils;

// Widget helper utilities
export const {
  formatSecurityLevel: formatSecurityLevelFromWidget,
  getWidgetColumnSpan,
  getWidgetRowSpan,
  handleWidgetError,
  KeyValuePair,
  RiskLevelKeyValue,
  sanitizeWidgetId,
  SecurityLevelBadge,
  WidgetEmptyState,
  WidgetError,
  WidgetLoading,
} = widgetUtils;

// Add missing widget utilities with appropriate implementations
export const calculateWidgetRiskLevel = (
  availabilityLevel: any,
  integrityLevel: any,
  confidentialityLevel: any
) => {
  // Basic implementation based on average security level
  const levels: Record<string, number> = {
    None: 0,
    Low: 1,
    Moderate: 2,
    High: 3,
    "Very High": 4,
  };

  const avgLevel =
    (levels[availabilityLevel] +
      levels[integrityLevel] +
      levels[confidentialityLevel]) /
    3;

  if (avgLevel < 1) return "Critical";
  if (avgLevel < 2) return "High";
  if (avgLevel < 3) return "Medium";
  if (avgLevel < 4) return "Low";
  return "Minimal";
};

export const formatSecurityMetric = (
  value: number,
  prefix = "",
  suffix = ""
): string => {
  const formattedValue = new Intl.NumberFormat().format(value);
  return `${prefix}${formattedValue}${suffix}`;
};

// Type guards
export const {
  ensureArray,
  extractSecurityLevels,
  hasProperty,
  hasTagValue,
  isBusinessImpactCategory,
  isBusinessImpactDetails,
  isComplianceFramework,
  isComplianceFrameworkName,
  isComplianceFrameworkObject,
  isComplianceStatus,
  isNumber,
  isObject,
  isRiskLevel,
  isROIEstimate,
  isROIMetricDetails,
  isROIMetrics,
  isSecurityProfile,
  isSecurityResource,
  isString,
  isWidget,
  isWidgetConfig,
  isWidgetProps,
  isWidgetType,
  safeAccess,
  safeNumberConversion,
  hasWidgetProps,
} = typeGuards;

// Other exports
export { BUSINESS_IMPACT_CATEGORIES, calculateRiskLevel, RISK_LEVELS };

// Legacy compatibility exports with explicit deprecation warnings
/**
 * @deprecated Use formatSecurityLevelString instead
 */
export const formatSecurityLevel = securityUtils.formatSecurityLevel;

/**
 * @deprecated Use your own implementation - this will be removed in v1.0
 */
export const SecurityLevelDisplay = ({ level }: { level: any }) => {
  // Simple fallback implementation
  return {
    type: "div",
    props: {
      className: "security-level-display",
      children: level,
    },
  };
};
