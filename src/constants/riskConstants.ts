import { SecurityLevel } from "../types/cia";
import { getRiskLevelFromSecurityLevel as getUtilsRiskLevel } from "../utils";

/**
 * Constants for risk levels used throughout the application
 */
export const RISK_LEVELS = {
  CRITICAL: "Critical Risk",
  HIGH: "High Risk",
  MEDIUM: "Medium Risk",
  LOW: "Low Risk",
  MINIMAL: "Minimal Risk",
  UNKNOWN: "Unknown Risk",
} as const;

export type RiskLevel = (typeof RISK_LEVELS)[keyof typeof RISK_LEVELS];

/**
 * Business impact categories for risk assessments
 */
export const BUSINESS_IMPACT_CATEGORIES = {
  FINANCIAL: "financial",
  OPERATIONAL: "operational",
  REPUTATIONAL: "reputational",
  STRATEGIC: "strategic",
  REGULATORY: "regulatory",
} as const;

export type BusinessImpactCategory = (typeof BUSINESS_IMPACT_CATEGORIES)[keyof typeof BUSINESS_IMPACT_CATEGORIES];

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
