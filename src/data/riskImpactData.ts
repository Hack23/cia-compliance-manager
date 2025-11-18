import { SecurityLevel, CIAComponent } from "../types/cia";
import {
  BusinessImpactDetail,
  BusinessImpactDetails,
} from "../types/cia-services";

/**
 * Risk impact levels
 */
export type RiskImpactLevel =
  | "Minimal"
  | "Low"
  | "Medium"
  | "High"
  | "Critical";

/**
 * Risk impact structure with comprehensive business impact details
 */
export interface RiskImpact {
  /** Human-readable description of the risk impact */
  description: string;
  /** Overall business impact summary */
  impact: string;
  /** Impact level classification */
  level: RiskImpactLevel;
  /** Annual financial loss estimate (optional) */
  annualLoss?: string;
  /** Time required to recover from incident (optional) */
  recoveryTime?: string;
  /** Compliance frameworks affected (optional) */
  frameworks?: string[];
  /** Competitive business impact (optional) */
  competitiveImpact?: string;
  /** Financial impact details (legacy, optional) */
  financialImpact?: string;
  /** Operational impact details (legacy, optional) */
  operationalImpact?: string;
  /** Reputational impact details (optional) */
  reputationalImpact?: string;
  /** Regulatory compliance impact (optional) */
  regulatoryImpact?: string;
}

/**
 * Type guard to check if a value is a valid RiskImpactLevel
 * 
 * @param value - Value to check
 * @returns True if the value is a valid RiskImpactLevel
 */
export function isRiskImpactLevel(value: unknown): value is RiskImpactLevel {
  return (
    typeof value === "string" &&
    ["Minimal", "Low", "Medium", "High", "Critical"].includes(value)
  );
}

/**
 * Type guard to check if a value is a valid RiskImpact object
 * 
 * @param value - Value to check
 * @returns True if the value has the required RiskImpact properties
 */
export function isRiskImpact(value: unknown): value is RiskImpact {
  if (typeof value !== "object" || value === null) {
    return false;
  }

  const obj = value as Record<string, unknown>;
  
  return (
    typeof obj.level === "string" &&
    typeof obj.description === "string" &&
    typeof obj.impact === "string"
  );
}

/**
 * Type guard to check if a value is a valid CIA component for risk impact
 * 
 * @param value - Value to check
 * @returns True if the value is a valid CIA component
 */
export function isValidCIAComponent(
  value: unknown
): value is CIAComponent {
  return (
    typeof value === "string" &&
    ["availability", "integrity", "confidentiality"].includes(value)
  );
}

/**
 * Maps security levels to risk levels
 */
const securityToRiskMap: Record<SecurityLevel, string> = {
  None: "Critical",
  Low: "High",
  Moderate: "Medium",
  High: "Low",
  "Very High": "Minimal",
};

/**
 * Get risk level from security level
 * 
 * @param level - Security level to convert
 * @returns Risk level string corresponding to the security level
 * 
 * @example
 * ```typescript
 * getRiskLevelFromSecurityLevel("None") // Returns "Critical"
 * getRiskLevelFromSecurityLevel("Very High") // Returns "Minimal"
 * ```
 */
export function getRiskLevelFromSecurityLevel(level: SecurityLevel): string {
  return securityToRiskMap[level] ?? "Unknown";
}

/**
 * Financial impact data by security level
 */
export const financialImpactByLevel: Record<
  SecurityLevel,
  BusinessImpactDetail
> = {
  None: {
    description: "Extreme financial impact with potential for business failure",
    riskLevel: "Critical",
    annualRevenueLoss: "15% or more of annual revenue",
  },
  Low: {
    description:
      "Significant financial impact requiring major budget adjustments",
    riskLevel: "High",
    annualRevenueLoss: "5-15% of annual revenue",
  },
  Moderate: {
    description: "Moderate financial impact affecting department budgets",
    riskLevel: "Medium",
    annualRevenueLoss: "1-5% of annual revenue",
  },
  High: {
    description: "Limited financial impact within planned security budget",
    riskLevel: "Low",
    annualRevenueLoss: "Less than 1% of annual revenue",
  },
  "Very High": {
    description: "Minimal financial impact with negligible business disruption",
    riskLevel: "Minimal",
    annualRevenueLoss: "Negligible",
  },
};

/**
 * Operational impact data by security level
 */
export const operationalImpactByLevel: Record<
  SecurityLevel,
  BusinessImpactDetail
> = {
  None: {
    description: "Complete operational shutdown for extended periods",
    riskLevel: "Critical",
    meanTimeToRecover: "Weeks or longer",
  },
  Low: {
    description: "Major operational disruption affecting multiple departments",
    riskLevel: "High",
    meanTimeToRecover: "Days",
  },
  Moderate: {
    description: "Significant operational disruption with limited duration",
    riskLevel: "Medium",
    meanTimeToRecover: "Hours",
  },
  High: {
    description: "Minor operational disruption with quick recovery",
    riskLevel: "Low",
    meanTimeToRecover: "Minutes to hours",
  },
  "Very High": {
    description: "Minimal operational impact with immediate failover",
    riskLevel: "Minimal",
    meanTimeToRecover: "<5 minutes",
  },
};

/**
 * Reputational impact data by security level
 */
export const reputationalImpactByLevel: Record<
  SecurityLevel,
  BusinessImpactDetail
> = {
  None: {
    description: "Severe brand damage with long-term customer trust erosion",
    riskLevel: "Critical",
  },
  Low: {
    description: "Significant negative press and public relations challenges",
    riskLevel: "High",
  },
  Moderate: {
    description: "Moderate reputation damage requiring active management",
    riskLevel: "Medium",
  },
  High: {
    description: "Limited reputational impact with minimal public awareness",
    riskLevel: "Low",
  },
  "Very High": {
    description:
      "Negligible reputational impact with potential positive perception",
    riskLevel: "Minimal",
  },
};

/**
 * Risk impact data by security level for availability
 */
export const AVAILABILITY_RISK_IMPACTS: Record<SecurityLevel, RiskImpact> = {
  None: {
    level: "Critical",
    description: "No availability controls lead to critical business impacts.",
    impact: "Critical business impact with extended downtime",
    financialImpact: "Potential revenue loss of >10% annually due to downtime",
    operationalImpact: "Frequent, extended disruptions to operations",
    reputationalImpact: "Severe reputation damage due to unreliable services",
    regulatoryImpact: "Non-compliance with most availability requirements",
  },
  Low: {
    level: "High",
    description: "Limited availability controls result in high business risk.",
    impact: "High business impact with significant downtime risks",
    financialImpact: "Potential revenue loss of 5-10% annually",
    operationalImpact: "Regular disruptions to normal operations",
    reputationalImpact: "Significant customer dissatisfaction from outages",
    regulatoryImpact: "Limited compliance with availability requirements",
  },
  Moderate: {
    level: "Medium",
    description:
      "Standard availability controls provide reasonable protection.",
    impact: "Moderate business impact with occasional service disruptions",
    financialImpact: "Potential revenue loss of 2-5% annually",
    operationalImpact: "Occasional disruptions with moderate recovery times",
    reputationalImpact: "Some negative perception due to occasional outages",
    regulatoryImpact: "Meets basic regulatory requirements for availability",
  },
  High: {
    level: "Low",
    description: "Advanced availability controls minimize business risk.",
    impact: "Low business impact with minimal service disruptions",
    financialImpact: "Potential revenue loss <2% annually",
    operationalImpact: "Rare disruptions with rapid recovery",
    reputationalImpact: "Positive reputation for reliable services",
    regulatoryImpact: "Meets most regulatory requirements for availability",
  },
  "Very High": {
    level: "Minimal",
    description: "Maximum availability controls ensure business continuity.",
    impact: "Minimal business impact with virtually no downtime",
    financialImpact: "Negligible revenue loss from availability issues",
    operationalImpact: "Near-continuous operations with minimal disruption",
    reputationalImpact: "Strong reputation for exceptional service reliability",
    regulatoryImpact: "Exceeds all regulatory requirements for availability",
  },
};

/**
 * Risk impact data by security level for integrity
 */
export const INTEGRITY_RISK_IMPACTS: Record<SecurityLevel, RiskImpact> = {
  None: {
    level: "Critical",
    description:
      "No integrity controls expose business to critical data risks.",
    impact: "Critical business impact with unreliable data",
    financialImpact: "Potential losses of >15% annually from fraud/errors",
    operationalImpact: "Critical decisions based on corrupted/unreliable data",
    reputationalImpact: "Severe damage from data integrity failures",
    regulatoryImpact: "Non-compliance with most integrity requirements",
  },
  Low: {
    level: "High",
    description: "Basic integrity controls leave substantial business risk.",
    impact: "High business impact with significant data accuracy issues",
    financialImpact: "Potential losses of 8-15% annually from data issues",
    operationalImpact: "Frequent data errors affecting operations",
    reputationalImpact: "Significant reputation impact from data issues",
    regulatoryImpact: "Limited compliance with integrity requirements",
  },
  Moderate: {
    level: "Medium",
    description: "Standard integrity controls reduce business risk.",
    impact: "Moderate business impact with occasional data issues",
    financialImpact: "Potential losses of 3-8% annually from data issues",
    operationalImpact: "Occasional data integrity issues with moderate impact",
    reputationalImpact: "Some negative perception from data accuracy issues",
    regulatoryImpact: "Meets basic regulatory requirements for data integrity",
  },
  High: {
    level: "Low",
    description: "Advanced integrity controls minimize business risk.",
    impact: "Low business impact with minimal data accuracy concerns",
    financialImpact: "Potential losses <3% annually from data issues",
    operationalImpact: "Rare data integrity issues with minimal impact",
    reputationalImpact: "Positive reputation for data accuracy",
    regulatoryImpact: "Meets most regulatory requirements for data integrity",
  },
  "Very High": {
    level: "Minimal",
    description: "Maximum integrity controls ensure data correctness.",
    impact: "Minimal business impact with virtually perfect data integrity",
    financialImpact: "Negligible losses from data integrity issues",
    operationalImpact: "Highly reliable data for operations and decisions",
    reputationalImpact: "Strong reputation for data accuracy and reliability",
    regulatoryImpact: "Exceeds all regulatory requirements for data integrity",
  },
};

/**
 * Risk impact data by security level for confidentiality
 */
export const CONFIDENTIALITY_RISK_IMPACTS: Record<SecurityLevel, RiskImpact> = {
  None: {
    level: "Critical",
    description:
      "No confidentiality controls expose business to critical risks.",
    impact: "Critical business impact with completely exposed data",
    financialImpact: "Potential losses >20% from breaches and IP theft",
    operationalImpact: "Operational secrets and processes completely exposed",
    reputationalImpact: "Potentially catastrophic reputation damage",
    regulatoryImpact: "Non-compliance with most privacy regulations",
  },
  Low: {
    level: "High",
    description: "Basic confidentiality controls leave substantial risk.",
    impact: "High business impact with significant data exposure risks",
    financialImpact: "Potential losses of 10-20% from data breaches",
    operationalImpact: "Sensitive operational data vulnerable to exposure",
    reputationalImpact: "Significant reputation impact from data leaks",
    regulatoryImpact: "Limited compliance with privacy regulations",
  },
  Moderate: {
    level: "Medium",
    description: "Standard confidentiality controls reduce business risk.",
    impact: "Moderate business impact with data exposure concerns",
    financialImpact: "Potential losses of 5-10% from data breaches",
    operationalImpact: "Some sensitive data may be vulnerable",
    reputationalImpact: "Moderate reputation impact from data exposures",
    regulatoryImpact: "Meets basic regulatory requirements for privacy",
  },
  High: {
    level: "Low",
    description: "Advanced confidentiality controls minimize business risk.",
    impact: "Low business impact with minimal data exposure concerns",
    financialImpact: "Potential losses <5% from data breaches",
    operationalImpact: "Most sensitive data well-protected from exposure",
    reputationalImpact: "Positive reputation for data protection",
    regulatoryImpact: "Meets most regulatory requirements for privacy",
  },
  "Very High": {
    level: "Minimal",
    description: "Maximum confidentiality controls ensure data privacy.",
    impact: "Minimal business impact with virtually no data exposure risks",
    financialImpact: "Minimal financial exposure from confidentiality issues",
    operationalImpact: "Sensitive data highly secured from unauthorized access",
    reputationalImpact: "Strong reputation for data protection excellence",
    regulatoryImpact: "Exceeds all regulatory requirements for privacy",
  },
};

/**
 * Get business impact details for a specific component and security level
 * 
 * This function retrieves comprehensive business impact information based on
 * the CIA component (availability, integrity, or confidentiality) and the
 * selected security level.
 *
 * @param component - CIA component to get impact for
 * @param level - Security level for the component
 * @returns Business impact details including risk level, revenue loss, and recovery time
 * @throws {Error} If component or level is invalid
 * 
 * @example
 * ```typescript
 * const impact = getBusinessImpact("availability", "High");
 * console.log(impact.riskLevel); // "Low"
 * console.log(impact.annualRevenueLoss); // "Potential revenue loss <2% annually"
 * ```
 */
export function getBusinessImpact(
  component: CIAComponent,
  level: SecurityLevel
): BusinessImpactDetail {
  // Validate inputs
  if (!isValidCIAComponent(component)) {
    throw new Error(`Invalid CIA component: ${component}`);
  }

  let impactData: RiskImpact;

  // Get the right impact map for the component
  switch (component) {
    case "availability":
      impactData = AVAILABILITY_RISK_IMPACTS[level];
      break;
    case "integrity":
      impactData = INTEGRITY_RISK_IMPACTS[level];
      break;
    case "confidentiality":
      impactData = CONFIDENTIALITY_RISK_IMPACTS[level];
      break;
    default:
      impactData = AVAILABILITY_RISK_IMPACTS[level];
  }

  // Convert RiskImpact to BusinessImpactDetail
  return {
    description: impactData.description,
    riskLevel: impactData.level,
    annualRevenueLoss: impactData.annualLoss ?? impactData.financialImpact,
    meanTimeToRecover: impactData.recoveryTime ?? impactData.operationalImpact,
    complianceViolations: impactData.frameworks
      ? (impactData.frameworks.filter(Boolean) as string[])
      : impactData.regulatoryImpact
      ? [impactData.regulatoryImpact]
      : [],
    complianceImpact: impactData.competitiveImpact,
  };
}

/**
 * Calculate the overall business impact level based on security levels
 * 
 * Uses a weighted algorithm that gives higher priority to confidentiality
 * when determining the overall business impact across all CIA components.
 *
 * @param availabilityLevel - Availability security level
 * @param integrityLevel - Integrity security level
 * @param confidentialityLevel - Confidentiality security level
 * @returns Overall business impact level (Minimal to Critical)
 * 
 * @example
 * ```typescript
 * // All Very High security = minimal impact
 * calculateBusinessImpactLevel("Very High", "Very High", "Very High") // Returns "Minimal"
 * 
 * // All High security = Low impact
 * calculateBusinessImpactLevel("High", "High", "High") // Returns "Low"
 * 
 * // Mixed levels with confidentiality weighted higher
 * // Formula: (1 [High] + 2 [Moderate] + 4 [None] * 1.5) / 3.5 = (1 + 2 + 6) / 3.5 = 9 / 3.5 = 2.57 → rounds to 3 ("High")
 * calculateBusinessImpactLevel("High", "Moderate", "None") // Returns "High"
 * ```
 */
export function calculateBusinessImpactLevel(
  availabilityLevel: SecurityLevel,
  integrityLevel: SecurityLevel,
  confidentialityLevel: SecurityLevel
): RiskImpactLevel {
  const impactMap: Record<SecurityLevel, number> = {
    None: 4, // Critical impact
    Low: 3, // High impact
    Moderate: 2, // Medium impact
    High: 1, // Low impact
    "Very High": 0, // Minimal impact
  };

  const availabilityImpact = impactMap[availabilityLevel] ?? 4;
  const integrityImpact = impactMap[integrityLevel] ?? 4;
  const confidentialityImpact = impactMap[confidentialityLevel] ?? 4;

  // Calculate weighted average, with higher weight on confidentiality
  const weightedAverage =
    (availabilityImpact + integrityImpact + confidentialityImpact * 1.5) / 3.5;
  const roundedImpact = Math.round(weightedAverage);

  const impactLevels: RiskImpactLevel[] = [
    "Minimal",
    "Low",
    "Medium",
    "High",
    "Critical",
  ];

  // Ensure the index is within bounds
  const clampedIndex = Math.max(0, Math.min(4, roundedImpact));
  return impactLevels[clampedIndex] ?? "Critical";
}

/**
 * Get risk impact level label
 * 
 * Converts a risk level into a human-readable description of the business
 * impact and required response.
 * 
 * @param level - Risk level to get label for
 * @returns Human-readable description of the risk impact level
 * 
 * @example
 * ```typescript
 * getRiskImpactLabel("Critical") // Returns "Severe business impact requiring immediate action"
 * getRiskImpactLabel("Low") // Returns "Minor business impact to be addressed in normal operations"
 * getRiskImpactLabel("Unknown") // Returns "Impact level not defined"
 * ```
 */
export function getRiskImpactLabel(level: string): string {
  const levelMap: Record<string, string> = {
    Critical: "Severe business impact requiring immediate action",
    High: "Major business impact requiring prioritized remediation",
    Medium: "Moderate business impact warranting planned action",
    Low: "Minor business impact to be addressed in normal operations",
    Minimal: "Negligible business impact requiring routine monitoring",
  };

  return levelMap[level] ?? "Impact level not defined";
}

/**
 * Create a default business impact object with minimum required fields
 * 
 * Generates a basic business impact assessment structure for a given
 * CIA component and security level, suitable for initial assessments
 * or as a fallback when detailed data is unavailable.
 *
 * @param component - CIA component type (availability, integrity, confidentiality, or custom)
 * @param level - Security level for the component
 * @returns Business impact details with financial, operational, and reputational aspects
 * 
 * @example
 * ```typescript
 * const impact = createDefaultBusinessImpact("availability", "Moderate");
 * console.log(impact.summary); // "availability impact analysis for Moderate level"
 * console.log(impact.financial?.riskLevel); // "Medium"
 * ```
 */
export function createDefaultBusinessImpact(
  component: string,
  level: SecurityLevel
): BusinessImpactDetails {
  const riskLevel = getRiskLevelFromSecurityLevel(level);

  return {
    summary: `${component} impact analysis for ${level} level`,
    financial: {
      description: `Financial impact for ${level} ${component} security level`,
      riskLevel,
    },
    operational: {
      description: `Operational impact for ${level} ${component} security level`,
      riskLevel,
    },
    reputational: {
      description: `Reputational impact for ${level} ${component} security level`,
      riskLevel,
    },
  };
}
