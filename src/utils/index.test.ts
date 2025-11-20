/**
 * Tests for central utility export functions
 */
import { describe, it, expect } from 'vitest';
import {
  // Color utilities
  getSecurityLevelColorClass,
  getColorForRiskLevel,
  getComplianceStatusColor,
  getProgressColor,
  getSeverityColor,
  // Cost calculation utilities
  calculateImplementationCost,
  calculateTotalSecurityCost,
  calculateSecurityROI,
  getRecommendedBudgetAllocation,
  // Formatting utilities
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
  // Level value utilities
  calculateOverallSecurityLevelFromValues,
  compareSecurityLevels,
  getNormalizedSecurityValue,
  getNumericSecurityLevelValue,
  getSecurityLevelFromValue,
  SECURITY_LEVEL_VALUES,
  // Risk utilities
  calculateCombinedRiskLevel,
  calculateRiskScore,
  getFormattedRiskLevel,
  getRiskBadgeVariant,
  getRiskLevelFromSecurityLevel,
  getRiskScoreFromSecurityLevel,
  getRiskSeverityDescription,
  getStatusBadgeForRiskLevel,
  parseRiskLevel,
  // Security level utilities
  calculateOverallSecurityLevel,
  asSecurityLevel,
  formatSecurityLevelString,
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
  // Widget utilities
  formatSecurityLevelFromWidget,
  getWidgetColumnSpan,
  getWidgetRowSpan,
  handleWidgetError,
  sanitizeWidgetId,
  calculateWidgetRiskLevel,
  formatSecurityMetric,
  // Type guards
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
  // Error utilities
  toErrorObject,
  formatError,
  // Other exports
  BUSINESS_IMPACT_CATEGORIES,
  calculateRiskLevel,
  RISK_LEVELS,
} from './index';
import { SecurityLevel } from '../types/cia';

describe('Utils Index - Color Utilities', () => {
  describe('getProgressColor', () => {
    it('returns green for high progress', () => {
      expect(getProgressColor(80)).toBe('text-green-500');
    });

    it('returns blue for moderate progress', () => {
      expect(getProgressColor(60)).toBe('text-blue-500');
    });

    it('returns yellow for low progress', () => {
      expect(getProgressColor(40)).toBe('text-yellow-500');
    });

    it('returns red for very low progress', () => {
      expect(getProgressColor(10)).toBe('text-red-500');
    });

    it('handles edge cases correctly', () => {
      expect(getProgressColor(76)).toBe('text-green-500');
      expect(getProgressColor(75)).toBe('text-blue-500');
      expect(getProgressColor(51)).toBe('text-blue-500');
      expect(getProgressColor(50)).toBe('text-yellow-500');
      expect(getProgressColor(26)).toBe('text-yellow-500');
      expect(getProgressColor(25)).toBe('text-red-500');
    });
  });

  describe('getSeverityColor', () => {
    it('returns red for high severity', () => {
      expect(getSeverityColor('high')).toBe('text-red-500');
    });

    it('returns yellow for medium severity', () => {
      expect(getSeverityColor('medium')).toBe('text-yellow-500');
    });

    it('returns green for low severity', () => {
      expect(getSeverityColor('low')).toBe('text-green-500');
    });

    it('handles other values with default color', () => {
      expect(getSeverityColor('unknown')).toBe('text-green-500');
      expect(getSeverityColor('')).toBe('text-green-500');
    });
  });

  describe('getColorForRiskLevel', () => {
    it('returns a color class string', () => {
      const result = getColorForRiskLevel('High');
      expect(typeof result).toBe('string');
      expect(result).toContain('text-');
    });
  });

  describe('getComplianceStatusColor', () => {
    it('returns a color class string', () => {
      const result = getComplianceStatusColor('Compliant');
      expect(typeof result).toBe('string');
      expect(result).toContain('text-');
    });
  });
});

describe('Utils Index - Widget Utilities', () => {
  describe('calculateWidgetRiskLevel', () => {
    it('returns Critical for all None levels', () => {
      const result = calculateWidgetRiskLevel('None', 'None', 'None');
      expect(result).toBe('Critical');
    });

    it('returns High for all Low levels', () => {
      const result = calculateWidgetRiskLevel('Low', 'Low', 'Low');
      expect(result).toBe('High');
    });

    it('returns Medium for all Moderate levels', () => {
      const result = calculateWidgetRiskLevel('Moderate', 'Moderate', 'Moderate');
      expect(result).toBe('Medium');
    });

    it('returns Low for all High levels', () => {
      const result = calculateWidgetRiskLevel('High', 'High', 'High');
      expect(result).toBe('Low');
    });

    it('returns Minimal for all Very High levels', () => {
      const result = calculateWidgetRiskLevel('Very High', 'Very High', 'Very High');
      expect(result).toBe('Minimal');
    });

    it('handles mixed security levels', () => {
      const result = calculateWidgetRiskLevel('Low', 'Moderate', 'High');
      expect(result).toMatch(/^(Critical|High|Medium|Low|Minimal)$/);
    });
  });

  describe('formatSecurityMetric', () => {
    it('formats a number with default options', () => {
      const result = formatSecurityMetric(1000);
      expect(result).toContain('1');
    });

    it('formats a number with prefix', () => {
      const result = formatSecurityMetric(1000, '$');
      expect(result).toContain('$');
    });

    it('formats a number with suffix', () => {
      const result = formatSecurityMetric(1000, '', '%');
      expect(result).toContain('%');
    });

    it('formats a number with both prefix and suffix', () => {
      const result = formatSecurityMetric(1000, '$', ' USD');
      expect(result).toContain('$');
      expect(result).toContain('USD');
    });

    it('formats zero correctly', () => {
      const result = formatSecurityMetric(0);
      expect(result).toBe('0');
    });

    it('formats negative numbers', () => {
      const result = formatSecurityMetric(-1000, '$');
      expect(result).toContain('$');
      expect(result).toContain('-');
    });
  });
});

describe('Utils Index - Exported Constants', () => {
  it('exports BUSINESS_IMPACT_CATEGORIES', () => {
    expect(BUSINESS_IMPACT_CATEGORIES).toBeDefined();
    expect(typeof BUSINESS_IMPACT_CATEGORIES).toBe('object');
  });

  it('exports RISK_LEVELS', () => {
    expect(RISK_LEVELS).toBeDefined();
    expect(typeof RISK_LEVELS).toBe('object');
  });

  it('exports SECURITY_LEVEL_VALUES', () => {
    expect(SECURITY_LEVEL_VALUES).toBeDefined();
    expect(typeof SECURITY_LEVEL_VALUES).toBe('object');
  });
});

describe('Utils Index - Function Exports', () => {
  it('exports all color utility functions', () => {
    expect(getSecurityLevelColorClass).toBeDefined();
    expect(getColorForRiskLevel).toBeDefined();
    expect(getComplianceStatusColor).toBeDefined();
    expect(getProgressColor).toBeDefined();
    expect(getSeverityColor).toBeDefined();
  });

  it('exports all cost calculation functions', () => {
    expect(calculateImplementationCost).toBeDefined();
    expect(calculateTotalSecurityCost).toBeDefined();
    expect(calculateSecurityROI).toBeDefined();
    expect(getRecommendedBudgetAllocation).toBeDefined();
  });

  it('exports all formatting functions', () => {
    expect(formatBudgetPercentage).toBeDefined();
    expect(formatCurrency).toBeDefined();
    expect(formatCurrencyWithOptions).toBeDefined();
    expect(formatDate).toBeDefined();
    expect(formatLargeNumber).toBeDefined();
    expect(formatNumber).toBeDefined();
    expect(formatNumberWithDecimals).toBeDefined();
    expect(formatPercentage).toBeDefined();
    expect(formatRiskLevel).toBeDefined();
    expect(formatTimeframe).toBeDefined();
    expect(formatUptime).toBeDefined();
    expect(toTitleCase).toBeDefined();
  });

  it('exports all level value functions', () => {
    expect(calculateOverallSecurityLevelFromValues).toBeDefined();
    expect(compareSecurityLevels).toBeDefined();
    expect(getNormalizedSecurityValue).toBeDefined();
    expect(getNumericSecurityLevelValue).toBeDefined();
    expect(getSecurityLevelFromValue).toBeDefined();
  });

  it('exports all risk utility functions', () => {
    expect(calculateCombinedRiskLevel).toBeDefined();
    expect(calculateRiskScore).toBeDefined();
    expect(getFormattedRiskLevel).toBeDefined();
    expect(getRiskBadgeVariant).toBeDefined();
    expect(getRiskLevelFromSecurityLevel).toBeDefined();
    expect(getRiskScoreFromSecurityLevel).toBeDefined();
    expect(getRiskSeverityDescription).toBeDefined();
    expect(getStatusBadgeForRiskLevel).toBeDefined();
    expect(parseRiskLevel).toBeDefined();
  });

  it('exports all security level functions', () => {
    expect(calculateOverallSecurityLevel).toBeDefined();
    expect(asSecurityLevel).toBeDefined();
    expect(formatSecurityLevelString).toBeDefined();
    expect(getRecommendedSecurityLevel).toBeDefined();
    expect(getSecurityIcon).toBeDefined();
    expect(getSecurityLevelBadgeVariant).toBeDefined();
    expect(getSecurityLevelClass).toBeDefined();
    expect(getSecurityLevelDescription).toBeDefined();
    expect(getSecurityLevelPercentage).toBeDefined();
    expect(getSecurityLevelValue).toBeDefined();
    expect(isSecurityLevel).toBeDefined();
    expect(meetsComplianceRequirements).toBeDefined();
    expect(normalizeSecurityLevel).toBeDefined();
  });

  it('exports all widget utility functions', () => {
    expect(formatSecurityLevelFromWidget).toBeDefined();
    expect(getWidgetColumnSpan).toBeDefined();
    expect(getWidgetRowSpan).toBeDefined();
    expect(handleWidgetError).toBeDefined();
    expect(sanitizeWidgetId).toBeDefined();
    expect(calculateWidgetRiskLevel).toBeDefined();
    expect(formatSecurityMetric).toBeDefined();
  });

  it('exports all type guard functions', () => {
    expect(ensureArray).toBeDefined();
    expect(extractSecurityLevels).toBeDefined();
    expect(hasProperty).toBeDefined();
    expect(hasTagValue).toBeDefined();
    expect(isBusinessImpactCategory).toBeDefined();
    expect(isBusinessImpactDetails).toBeDefined();
    expect(isComplianceFramework).toBeDefined();
    expect(isComplianceFrameworkName).toBeDefined();
    expect(isComplianceFrameworkObject).toBeDefined();
    expect(isComplianceStatus).toBeDefined();
    expect(isNumber).toBeDefined();
    expect(isObject).toBeDefined();
    expect(isRiskLevel).toBeDefined();
    expect(isROIEstimate).toBeDefined();
    expect(isROIMetricDetails).toBeDefined();
    expect(isROIMetrics).toBeDefined();
    expect(isSecurityProfile).toBeDefined();
    expect(isSecurityResource).toBeDefined();
    expect(isString).toBeDefined();
    expect(isWidget).toBeDefined();
    expect(isWidgetConfig).toBeDefined();
    expect(isWidgetProps).toBeDefined();
    expect(isWidgetType).toBeDefined();
    expect(safeAccess).toBeDefined();
    expect(safeNumberConversion).toBeDefined();
    expect(hasWidgetProps).toBeDefined();
  });

  it('exports all error utility functions', () => {
    expect(toErrorObject).toBeDefined();
    expect(formatError).toBeDefined();
  });

  it('exports calculateRiskLevel function', () => {
    expect(calculateRiskLevel).toBeDefined();
    expect(typeof calculateRiskLevel).toBe('function');
  });
});
