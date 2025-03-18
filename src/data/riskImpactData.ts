import { riskLevelMappings } from "../constants/securityLevels";
import { SecurityLevel } from "../types/cia";

/**
 * Risk impact data for different security levels
 *
 * ## Business Perspective
 *
 * This data helps organizations understand how different security levels
 * affect business risk in terms of financial, operational, and reputational
 * dimensions. ⚠️
 */

/**
 * Financial impact estimations by security level
 */
export const financialImpactByLevel: Record<
  SecurityLevel,
  {
    description: string;
    riskLevel: string;
    annualRevenueLoss: string;
  }
> = {
  None: {
    description:
      "Critical financial vulnerability with maximum exposure to losses",
    riskLevel: riskLevelMappings.None,
    annualRevenueLoss: ">20% of annual revenue",
  },
  Low: {
    description: "High financial risk with significant potential for losses",
    riskLevel: riskLevelMappings.Low,
    annualRevenueLoss: "5-15% of annual revenue",
  },
  Moderate: {
    description: "Moderate financial risk with reasonable loss potential",
    riskLevel: riskLevelMappings.Moderate,
    annualRevenueLoss: "2-5% of annual revenue",
  },
  High: {
    description: "Low financial risk with minimal potential for losses",
    riskLevel: riskLevelMappings.High,
    annualRevenueLoss: "0.5-2% of annual revenue",
  },
  "Very High": {
    description: "Minimal financial risk with negligible potential for losses",
    riskLevel: riskLevelMappings["Very High"],
    annualRevenueLoss: "<0.5% of annual revenue",
  },
};

/**
 * Operational impact estimations by security level
 */
export const operationalImpactByLevel: Record<
  SecurityLevel,
  {
    description: string;
    riskLevel: string;
    meanTimeToRecover: string;
  }
> = {
  None: {
    description:
      "Critical operational disruption with extended recovery periods",
    riskLevel: riskLevelMappings.None,
    meanTimeToRecover: "Unpredictable (days to weeks)",
  },
  Low: {
    description: "Significant operational disruption with lengthy recovery",
    riskLevel: riskLevelMappings.Low,
    meanTimeToRecover: "24-48 hours",
  },
  Moderate: {
    description:
      "Moderate operational disruption with reasonable recovery time",
    riskLevel: riskLevelMappings.Moderate,
    meanTimeToRecover: "4-8 hours",
  },
  High: {
    description: "Minor operational disruption with quick recovery",
    riskLevel: riskLevelMappings.High,
    meanTimeToRecover: "15-60 minutes",
  },
  "Very High": {
    description: "Minimal operational disruption with near-immediate recovery",
    riskLevel: riskLevelMappings["Very High"],
    meanTimeToRecover: "<5 minutes",
  },
};

/**
 * Reputational impact estimations by security level
 */
export const reputationalImpactByLevel: Record<
  SecurityLevel,
  {
    description: string;
    riskLevel: string;
  }
> = {
  None: {
    description: "Catastrophic damage to reputation and customer trust",
    riskLevel: riskLevelMappings.None,
  },
  Low: {
    description:
      "Significant damage to reputation requiring extensive remediation",
    riskLevel: riskLevelMappings.Low,
  },
  Moderate: {
    description: "Moderate damage to reputation requiring targeted response",
    riskLevel: riskLevelMappings.Moderate,
  },
  High: {
    description:
      "Limited damage to reputation with straightforward remediation",
    riskLevel: riskLevelMappings.High,
  },
  "Very High": {
    description: "Minimal or no impact to reputation with robust controls",
    riskLevel: riskLevelMappings["Very High"],
  },
};

/**
 * Get risk level based on security level
 */
export function getRiskLevelFromSecurityLevel(level: SecurityLevel): string {
  return riskLevelMappings[level] || "Unknown";
}

/**
 * Get impact level label for security level
 */
export function getImpactLevelLabel(level: SecurityLevel): string {
  return getRiskLevelFromSecurityLevel(level);
}
