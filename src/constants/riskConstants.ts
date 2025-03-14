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
 * Gets risk level based on security level
 * @param securityLevel - The security level
 * @returns The corresponding risk level
 */
export function getRiskLevelFromSecurityLevel(
  securityLevel: string
): RiskLevel {
  switch (securityLevel) {
    case "None":
      return RISK_LEVELS.CRITICAL;
    case "Low":
      return RISK_LEVELS.HIGH;
    case "Moderate":
      return RISK_LEVELS.MEDIUM;
    case "High":
      return RISK_LEVELS.LOW;
    case "Very High":
      return RISK_LEVELS.MINIMAL;
    default:
      return RISK_LEVELS.UNKNOWN;
  }
}

// Business impact categories
export const BUSINESS_IMPACT_CATEGORIES = {
  FINANCIAL: "financial",
  OPERATIONAL: "operational",
  REPUTATIONAL: "reputational",
  REGULATORY: "regulatory",
  STRATEGIC: "strategic",
};
