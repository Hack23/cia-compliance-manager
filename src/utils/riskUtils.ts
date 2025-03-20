import { StatusBadgeVariant } from "../components/common/StatusBadge";
import { SecurityLevel } from "../types/cia";

// Define RiskLevel type if it's missing from risk.ts
type RiskLevel = string;

/**
 * Define risk level constants for consistent usage
 *
 * ## Business Perspective
 *
 * These constants ensure consistent risk classification across the application,
 * supporting standardized risk communication and reporting. 📊
 */
export const RISK_LEVELS = {
  CRITICAL: "Critical Risk",
  HIGH: "High Risk",
  MEDIUM: "Medium Risk",
  LOW: "Low Risk",
  MINIMAL: "Minimal Risk",
  UNKNOWN: "Unknown Risk",
};

/**
 * Utility functions for risk assessment and calculations
 *
 * ## Business Perspective
 *
 * These utilities translate security levels into business risk terminology,
 * supporting consistent risk communication and assessment across different
 * security contexts. ⚠️
 *
 * Risk calculations help organizations understand the business implications
 * of their security posture and prioritize remediation efforts.
 */

/**
 * Get badge variant based on risk level
 *
 * ## Business Perspective
 *
 * This utility helps visualize risk levels consistently across the application,
 * enabling users to quickly identify the severity of risks through color-coded
 * badges. The visual consistency reinforces risk communication standards. 📊
 *
 * @param riskLevel - String representing the risk level
 * @returns Badge variant name for styling
 */
export function getRiskBadgeVariant(
  riskLevel: string | undefined
): StatusBadgeVariant {
  if (!riskLevel) return "neutral";

  const normalized = riskLevel.toLowerCase();

  if (normalized.includes("critical")) {
    return "error";
  } else if (normalized.includes("high")) {
    return "warning";
  } else if (normalized.includes("medium") || normalized.includes("moderate")) {
    return "info";
  } else if (normalized.includes("low") || normalized.includes("minimal")) {
    return "success";
  } else {
    return "neutral";
  }
}

/**
 * Determines the risk level based on a security level
 *
 * @param securityLevel - The security level to evaluate
 * @returns The corresponding risk level
 */
export function getRiskLevelFromSecurityLevel(
  securityLevel: SecurityLevel
): string {
  const riskLevels: Record<SecurityLevel, string> = {
    None: "Critical Risk",
    Low: "High Risk",
    Moderate: "Medium Risk",
    High: "Low Risk",
    "Very High": "Minimal Risk",
  };

  return riskLevels[securityLevel] || "Unknown Risk";
}

/**
 * Determines the status badge variant for a risk level
 *
 * @param riskLevel - The risk level to evaluate
 * @returns The appropriate status badge variant
 */
export function getStatusBadgeForRiskLevel(
  riskLevel: string
): StatusBadgeVariant {
  if (riskLevel.includes("Critical")) return "error";
  if (riskLevel.includes("High")) return "warning";
  if (riskLevel.includes("Medium")) return "info";
  if (riskLevel.includes("Low")) return "success";
  if (riskLevel.includes("Minimal")) return "success";
  return "neutral";
}

/**
 * Determines the proper color class for a security level
 *
 * @param level - The security level to evaluate
 * @returns The appropriate CSS color class
 */
export function getSecurityLevelColorClass(level: SecurityLevel): string {
  const colorClasses: Record<SecurityLevel, string> = {
    None: "text-red-600 dark:text-red-400",
    Low: "text-orange-600 dark:text-orange-400",
    Moderate: "text-blue-600 dark:text-blue-400",
    High: "text-green-600 dark:text-green-400",
    "Very High": "text-purple-600 dark:text-purple-400",
  };

  return colorClasses[level] || "text-gray-600 dark:text-gray-400";
}

/**
 * Calculate the risk score from security levels
 *
 * @param availabilityLevel - The availability security level
 * @param integrityLevel - The integrity security level
 * @param confidentialityLevel - The confidentiality security level
 * @returns A risk score from 0-100
 */
export function calculateRiskScore(
  availabilityLevel: SecurityLevel,
  integrityLevel: SecurityLevel,
  confidentialityLevel: SecurityLevel
): number {
  // Convert security levels to numeric values (0-4)
  const securityLevelValues: Record<SecurityLevel, number> = {
    None: 0,
    Low: 1,
    Moderate: 2,
    High: 3,
    "Very High": 4,
  };

  const availValue = securityLevelValues[availabilityLevel] || 0;
  const integValue = securityLevelValues[integrityLevel] || 0;
  const confidValue = securityLevelValues[confidentialityLevel] || 0;

  // Calculate average security value
  const avgSecurityValue = (availValue + integValue + confidValue) / 3;

  // Convert to a 0-100 scale
  return Math.round((avgSecurityValue / 4) * 100);
}

/**
 * Get formatted risk level with "Risk" suffix from security level
 *
 * @param securityLevel - Security level
 * @returns Risk level constant
 */
export function getFormattedRiskLevel(securityLevel: SecurityLevel): RiskLevel {
  const basicRiskLevel = getRiskLevelFromSecurityLevel(securityLevel);

  switch (basicRiskLevel) {
    case "Critical Risk":
      return RISK_LEVELS.CRITICAL;
    case "High Risk":
      return RISK_LEVELS.HIGH;
    case "Medium Risk":
      return RISK_LEVELS.MEDIUM;
    case "Low Risk":
      return RISK_LEVELS.LOW;
    case "Minimal Risk":
      return RISK_LEVELS.MINIMAL;
    default:
      return RISK_LEVELS.UNKNOWN;
  }
}

/**
 * Get risk severity description
 *
 * @param riskLevel - Risk level
 * @returns Description of risk severity
 */
export function getRiskSeverityDescription(riskLevel: string): string {
  const descriptions: Record<string, string> = {
    Critical: "Immediate action required. Severe business impact likely.",
    High: "Urgent remediation needed. Significant business impact possible.",
    Medium:
      "Planned remediation recommended. Moderate business impact possible.",
    Low: "Address during normal operations. Limited business impact.",
    Minimal: "Acceptable risk level. Negligible business impact.",
    Unknown: "Unable to determine risk level. Further assessment needed.",
  };

  return descriptions[riskLevel] || descriptions["Unknown"];
}

/**
 * Calculate combined risk level from multiple security levels
 *
 * @param securityLevels - Array of security levels
 * @returns Combined risk level
 */
export function calculateCombinedRiskLevel(
  securityLevels: SecurityLevel[]
): string {
  if (securityLevels.length === 0) return "Unknown";

  // Convert security levels to risk levels
  const riskLevels = securityLevels.map(getRiskLevelFromSecurityLevel);

  // Risk hierarchy (in order of severity)
  const riskHierarchy = ["Critical", "High", "Medium", "Low", "Minimal"];

  // Find the highest risk (lowest index in the hierarchy)
  let highestRiskIndex = riskHierarchy.length;

  for (const risk of riskLevels) {
    const index = riskHierarchy.indexOf(risk);
    if (index !== -1 && index < highestRiskIndex) {
      highestRiskIndex = index;
    }
  }

  // Return the highest risk level found
  return highestRiskIndex < riskHierarchy.length
    ? riskHierarchy[highestRiskIndex]
    : "Unknown";
}

/**
 * Convert security level to a risk score
 *
 * ## Business Perspective
 *
 * This utility provides a numeric representation of risk based on security level,
 * which is useful for risk assessment visualizations and calculations. Higher
 * numbers represent higher risk, allowing business stakeholders to quantify
 * the potential impact of different security postures. 📊
 *
 * @see getRiskLevelFromSecurityLevel - For string representation
 *
 * @param level - Security level to convert
 * @returns Risk score (0-100, with higher values indicating higher risk)
 */
export function getRiskScoreFromSecurityLevel(level: SecurityLevel): number {
  switch (level) {
    case "None":
      return 100; // Highest risk
    case "Low":
      return 75;
    case "Moderate":
      return 50;
    case "High":
      return 25;
    case "Very High":
      return 0; // Lowest risk
    default:
      return 100; // Default to highest risk for unknown levels
  }
}

/**
 * Parses risk level string to numeric value for calculations
 *
 * ## Business Perspective
 *
 * This function standardizes risk levels into quantifiable values that
 * can be used for risk calculations, comparison, and aggregation in
 * business impact analysis and reporting. ⚠️
 *
 * @param level - Risk level as string
 * @returns Risk level as number (0-4, where 4 is highest risk)
 */
export function parseRiskLevel(level: string | null | undefined): number {
  if (!level) return 0;

  const numValue = parseInt(level, 10);
  if (!isNaN(numValue)) return numValue;

  // Map common risk level strings to numbers
  const levelLower = level.toLowerCase();
  if (levelLower.includes("critical")) return 4;
  if (levelLower.includes("high")) return 3;
  if (levelLower.includes("medium") || levelLower.includes("moderate"))
    return 2;
  if (levelLower.includes("low")) return 1;
  if (levelLower.includes("minimal")) return 0;

  return 0;
}
