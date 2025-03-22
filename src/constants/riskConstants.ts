import { SecurityLevel } from "../types/cia";
import { RiskLevelLiteral } from "../types/risk";
import { getRiskLevelFromSecurityLevel as getUtilsRiskLevel } from "../utils";

/**
 * Risk levels used throughout the application
 * 
 * ## Business Perspective
 * 
 * These levels provide a standardized way to communicate risk severity
 * across the organization, helping business stakeholders understand
 * security implications in business terms. ⚠️
 */
export const RISK_LEVELS = {
  CRITICAL: "Critical Risk",
  HIGH: "High Risk",
  MEDIUM: "Medium Risk",
  LOW: "Low Risk",
  MINIMAL: "Minimal Risk",
  NONE: "No Risk",
  UNKNOWN: "Unknown Risk" // Add missing UNKNOWN risk level
};

export type RiskLevel = (typeof RISK_LEVELS)[keyof typeof RISK_LEVELS];

// Export the risk level literal type for reuse
export type { RiskLevelLiteral };

/**
 * Business impact categories for security assessment
 * 
 * ## Business Perspective
 * 
 * These categories organize security impacts by business domain,
 * helping to translate technical security concepts into business
 * outcomes that executives and stakeholders can understand. 💼
 */
export const BUSINESS_IMPACT_CATEGORIES = {
  OPERATIONAL: "Operational",
  FINANCIAL: "Financial",
  REPUTATIONAL: "Reputational",
  REGULATORY: "Regulatory",
  STRATEGIC: "Strategic"
};

export type BusinessImpactCategory = (typeof BUSINESS_IMPACT_CATEGORIES)[keyof typeof BUSINESS_IMPACT_CATEGORIES];

/**
 * Constants for security assessment dimensions
 */
export const ASSESSMENT_DIMENSIONS = {
  CONFIDENTIALITY: "CONFIDENTIALITY",
  INTEGRITY: "INTEGRITY",
  AVAILABILITY: "AVAILABILITY"
};

/**
 * Gets risk level based on security level
 * @param securityLevel - The security level
 * @returns The corresponding risk level
 */
export function getRiskLevelFromSecurityLevel(
  securityLevel: string
): RiskLevel {
  // Import from riskUtils instead of duplicating logic
  const riskLevel = getUtilsRiskLevel(securityLevel as SecurityLevel);

  // Map the basic risk level to the formatted risk level with "Risk" suffix
  switch (riskLevel) {
    case "Critical": return RISK_LEVELS.CRITICAL;
    case "High": return RISK_LEVELS.HIGH;
    case "Medium": return RISK_LEVELS.MEDIUM;
    case "Low": return RISK_LEVELS.LOW;
    case "Minimal": return RISK_LEVELS.MINIMAL;
    default: return RISK_LEVELS.UNKNOWN;
  }
}
