/**
 * # Utility Functions
 *
 * This module provides utility functions used throughout the application.
 *
 * ## Business Perspective
 * Utilities support business logic implementation by providing reusable
 * calculations for security metrics and compliance assessments.
 *
 * ## Architecture Perspective
 * These functions follow functional programming principles to maximize
 * code reuse and testability.
 *
 * ## Security Perspective
 * Utility functions implement security calculations like risk scoring
 * and security level assessments essential for compliance evaluation.
 *
 * @module utils
 */

// Core utilities
export * from "./colorUtils";

// Format utility exports
export {
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
  toTitleCase
} from "./formatUtils";

// Level value utilities
export {
  calculateOverallSecurityLevel as calculateOverallSecurityLevelFromValues,
  compareSecurityLevels,
  getNormalizedSecurityValue, getSecurityLevelValue as getNumericSecurityLevelValue, getSecurityLevelFromValue, SECURITY_LEVEL_VALUES
} from "./levelValuesUtils";

// Risk utilities
export * from "./riskUtils";

// Security level utilities with renamed exports to avoid conflicts
export {
  calculateOverallSecurityLevel, asSecurityLevel as convertToSecurityLevel, formatSecurityLevel as formatSecurityLevelString,
  getRecommendedSecurityLevel,
  getSecurityIcon,
  getSecurityLevelBadgeVariant,
  getSecurityLevelClass,
  getSecurityLevelDescription,
  getSecurityLevelPercentage,
  getSecurityLevelValue,
  isSecurityLevel as isValidSecurityLevel,
  meetsComplianceRequirements,
  normalizeSecurityLevel
} from "./securityLevelUtils";

// Widget helpers
export {
  formatSecurityLevel as formatSecurityLevelFromUnknown,
  getRiskLevelColorClass,
  getWidgetColumnSpan,
  getWidgetRowSpan,
  handleWidgetError,
  KeyValuePair,
  RiskLevelKeyValue,
  sanitizeWidgetId,
  SecurityLevelBadge,
  WidgetEmptyState,
  WidgetError,
  WidgetLoading
} from "./widgetHelpers";

// Limited type guards to avoid conflicts
export {
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
  safeNumberConversion
} from "./typeGuards";

// Export calculateRiskLevel from cia.utility
export { calculateRiskLevel } from "../types/cia.utility";

// Re-export constants for convenience
export { BUSINESS_IMPACT_CATEGORIES, RISK_LEVELS } from '../constants/riskConstants';

