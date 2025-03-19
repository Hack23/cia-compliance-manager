import { SecurityLevel } from "../types/cia";
import { BusinessImpactDetail } from "../types/cia-services";

/**
 * Maps security levels to risk levels
 */
const securityToRiskMap: Record<SecurityLevel, string> = {
  "None": "Critical",
  "Low": "High",
  "Moderate": "Medium",
  "High": "Low",
  "Very High": "Minimal"
};

/**
 * Get risk level from security level
 */
export function getRiskLevelFromSecurityLevel(level: SecurityLevel): string {
  return securityToRiskMap[level] || "Unknown";
}

/**
 * Financial impact data by security level
 */
export const financialImpactByLevel: Record<SecurityLevel, BusinessImpactDetail> = {
  "None": {
    description: "Extreme financial impact with potential for business failure",
    riskLevel: "Critical",
    annualRevenueLoss: "15% or more of annual revenue",
  },
  "Low": {
    description: "Significant financial impact requiring major budget adjustments",
    riskLevel: "High",
    annualRevenueLoss: "5-15% of annual revenue",
  },
  "Moderate": {
    description: "Moderate financial impact affecting department budgets",
    riskLevel: "Medium",
    annualRevenueLoss: "1-5% of annual revenue",
  },
  "High": {
    description: "Limited financial impact within planned security budget",
    riskLevel: "Low",
    annualRevenueLoss: "Less than 1% of annual revenue",
  },
  "Very High": {
    description: "Minimal financial impact with negligible business disruption",
    riskLevel: "Minimal",
    annualRevenueLoss: "Negligible",
  }
};

/**
 * Operational impact data by security level
 */
export const operationalImpactByLevel: Record<SecurityLevel, BusinessImpactDetail> = {
  "None": {
    description: "Complete operational shutdown for extended periods",
    riskLevel: "Critical",
    meanTimeToRecover: "Weeks or longer",
  },
  "Low": {
    description: "Major operational disruption affecting multiple departments",
    riskLevel: "High",
    meanTimeToRecover: "Days",
  },
  "Moderate": {
    description: "Significant operational disruption with limited duration",
    riskLevel: "Medium",
    meanTimeToRecover: "Hours",
  },
  "High": {
    description: "Minor operational disruption with quick recovery",
    riskLevel: "Low",
    meanTimeToRecover: "Minutes to hours",
  },
  "Very High": {
    description: "Minimal operational impact with immediate failover",
    riskLevel: "Minimal",
    meanTimeToRecover: "<5 minutes",
  }
};

/**
 * Reputational impact data by security level
 */
export const reputationalImpactByLevel: Record<SecurityLevel, BusinessImpactDetail> = {
  "None": {
    description: "Severe brand damage with long-term customer trust erosion",
    riskLevel: "Critical",
  },
  "Low": {
    description: "Significant negative press and public relations challenges",
    riskLevel: "High",
  },
  "Moderate": {
    description: "Moderate reputation damage requiring active management",
    riskLevel: "Medium",
  },
  "High": {
    description: "Limited reputational impact with minimal public awareness",
    riskLevel: "Low",
  },
  "Very High": {
    description: "Negligible reputational impact with potential positive perception",
    riskLevel: "Minimal",
  }
};

/**
 * Get risk impact level label
 */
export function getRiskImpactLabel(level: string): string {
  const levelMap: Record<string, string> = {
    "Critical": "Severe business impact requiring immediate action",
    "High": "Major business impact requiring prioritized remediation",
    "Medium": "Moderate business impact warranting planned action",
    "Low": "Minor business impact to be addressed in normal operations",
    "Minimal": "Negligible business impact requiring routine monitoring",
  };
  
  return levelMap[level] || "Impact level not defined";
}
