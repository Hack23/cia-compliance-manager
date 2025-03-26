import { SecurityLevel } from "../types/cia";
import { RiskLevelLiteral } from "../types/risk";

/**
 * Risk levels with consistent naming
 */
export const RISK_LEVELS = {
  MINIMAL: "Minimal",
  LOW: "Low",
  MEDIUM: "Medium",
  HIGH: "High",
  CRITICAL: "Critical",
  UNKNOWN: "Unknown", // Add missing UNKNOWN risk level
};

export type RiskLevel = (typeof RISK_LEVELS)[keyof typeof RISK_LEVELS];

// Export the risk level literal type for reuse
export type { RiskLevelLiteral };

/**
 * Categories for business impact analysis
 */
// Change from array to object with properties
export const BUSINESS_IMPACT_CATEGORIES = {
  FINANCIAL: "Financial",
  OPERATIONAL: "Operational",
  REGULATORY: "Regulatory",
  REPUTATIONAL: "Reputational",
  STRATEGIC: "Strategic",
};

// Keep track of categories array for iterating
export const BUSINESS_IMPACT_CATEGORY_LIST = [
  "financial",
  "operational",
  "reputational",
  "regulatory",
  "strategic",
];

/**
 * Mapping between security levels and associated risk levels
 * Higher security = lower risk
 */
export const SECURITY_TO_RISK_MAP: Record<SecurityLevel, string> = {
  None: RISK_LEVELS.CRITICAL,
  Low: RISK_LEVELS.HIGH,
  Moderate: RISK_LEVELS.MEDIUM,
  High: RISK_LEVELS.LOW,
  "Very High": RISK_LEVELS.MINIMAL,
};

/**
 * Risk level descriptions
 */
export const RISK_LEVEL_DESCRIPTIONS: Record<string, string> = {
  [RISK_LEVELS.MINIMAL]: "Minimal risk with negligible business impact",
  [RISK_LEVELS.LOW]: "Low risk with minor business impact",
  [RISK_LEVELS.MEDIUM]: "Medium risk with moderate business impact",
  [RISK_LEVELS.HIGH]: "High risk with significant business impact",
  [RISK_LEVELS.CRITICAL]: "Critical risk with severe business impact",
};

/**
 * Financial impact descriptions by risk level
 */
export const FINANCIAL_IMPACT: Record<string, string> = {
  [RISK_LEVELS.MINIMAL]:
    "Negligible financial impact (<0.1% of annual revenue)",
  [RISK_LEVELS.LOW]: "Minor financial impact (0.1-1% of annual revenue)",
  [RISK_LEVELS.MEDIUM]: "Moderate financial impact (1-5% of annual revenue)",
  [RISK_LEVELS.HIGH]: "Significant financial impact (5-10% of annual revenue)",
  [RISK_LEVELS.CRITICAL]: "Severe financial impact (>10% of annual revenue)",
};

/**
 * Operational impact descriptions by risk level
 */
export const OPERATIONAL_IMPACT: Record<string, string> = {
  [RISK_LEVELS.MINIMAL]: "Negligible operational impact (no disruption)",
  [RISK_LEVELS.LOW]: "Minor operational impact (brief disruption)",
  [RISK_LEVELS.MEDIUM]: "Moderate operational impact (partial disruption)",
  [RISK_LEVELS.HIGH]: "Significant operational impact (major disruption)",
  [RISK_LEVELS.CRITICAL]: "Severe operational impact (complete disruption)",
};

/**
 * Reputational impact descriptions by risk level
 */
export const REPUTATIONAL_IMPACT: Record<string, string> = {
  [RISK_LEVELS.MINIMAL]:
    "Negligible reputational impact (internal awareness only)",
  [RISK_LEVELS.LOW]: "Minor reputational impact (limited external awareness)",
  [RISK_LEVELS.MEDIUM]: "Moderate reputational impact (public awareness)",
  [RISK_LEVELS.HIGH]:
    "Significant reputational impact (negative media coverage)",
  [RISK_LEVELS.CRITICAL]:
    "Severe reputational impact (persistent negative coverage)",
};

/**
 * Regulatory impact descriptions by risk level
 */
export const REGULATORY_IMPACT: Record<string, string> = {
  [RISK_LEVELS.MINIMAL]: "Negligible regulatory impact (fully compliant)",
  [RISK_LEVELS.LOW]: "Minor regulatory impact (minor non-compliance)",
  [RISK_LEVELS.MEDIUM]:
    "Moderate regulatory impact (reportable non-compliance)",
  [RISK_LEVELS.HIGH]: "Significant regulatory impact (penalties likely)",
  [RISK_LEVELS.CRITICAL]:
    "Severe regulatory impact (severe penalties/sanctions)",
};

/**
 * Risk assessment matrix (likelihood x impact)
 */
export const RISK_MATRIX = {
  likelihood: ["Rare", "Unlikely", "Possible", "Likely", "Almost Certain"],
  impact: ["Insignificant", "Minor", "Moderate", "Major", "Catastrophic"],
  scores: [
    [1, 2, 3, 4, 5], // Rare
    [2, 4, 6, 8, 10], // Unlikely
    [3, 6, 9, 12, 15], // Possible
    [4, 8, 12, 16, 20], // Likely
    [5, 10, 15, 20, 25], // Almost Certain
  ],
};

/**
 * Maps risk scores to risk levels
 */
export const RISK_SCORE_TO_LEVEL: Record<number, string> = {
  1: RISK_LEVELS.MINIMAL,
  2: RISK_LEVELS.MINIMAL,
  3: RISK_LEVELS.LOW,
  4: RISK_LEVELS.LOW,
  5: RISK_LEVELS.LOW,
  6: RISK_LEVELS.MEDIUM,
  8: RISK_LEVELS.MEDIUM,
  9: RISK_LEVELS.MEDIUM,
  10: RISK_LEVELS.HIGH,
  12: RISK_LEVELS.HIGH,
  15: RISK_LEVELS.HIGH,
  16: RISK_LEVELS.CRITICAL,
  20: RISK_LEVELS.CRITICAL,
  25: RISK_LEVELS.CRITICAL,
};

/**
 * Color coding for risk levels
 */
export const RISK_LEVEL_COLORS: Record<string, string> = {
  [RISK_LEVELS.MINIMAL]: "#4caf50", // Green
  [RISK_LEVELS.LOW]: "#8bc34a", // Light Green
  [RISK_LEVELS.MEDIUM]: "#ffeb3b", // Yellow
  [RISK_LEVELS.HIGH]: "#ff9800", // Orange
  [RISK_LEVELS.CRITICAL]: "#f44336", // Red
};

/**
 * TailwindCSS classes for risk levels
 */
export const RISK_LEVEL_CSS_CLASSES: Record<
  string,
  { bg: string; text: string }
> = {
  [RISK_LEVELS.MINIMAL]: {
    bg: "bg-green-100 dark:bg-green-900 dark:bg-opacity-20",
    text: "text-green-800 dark:text-green-300",
  },
  [RISK_LEVELS.LOW]: {
    bg: "bg-lime-100 dark:bg-lime-900 dark:bg-opacity-20",
    text: "text-lime-800 dark:text-lime-300",
  },
  [RISK_LEVELS.MEDIUM]: {
    bg: "bg-yellow-100 dark:bg-yellow-900 dark:bg-opacity-20",
    text: "text-yellow-800 dark:text-yellow-300",
  },
  [RISK_LEVELS.HIGH]: {
    bg: "bg-orange-100 dark:bg-orange-900 dark:bg-opacity-20",
    text: "text-orange-800 dark:text-orange-300",
  },
  [RISK_LEVELS.CRITICAL]: {
    bg: "bg-red-100 dark:bg-red-900 dark:bg-opacity-20",
    text: "text-red-800 dark:text-red-300",
  },
};

/**
 * Get color for risk level
 *
 * @param riskLevel - Risk level string
 * @returns Hex color for the risk level
 */
export function getRiskLevelColor(riskLevel: string): string {
  return RISK_LEVEL_COLORS[riskLevel] || RISK_LEVEL_COLORS[RISK_LEVELS.MEDIUM];
}

/**
 * Get risk level from security level
 *
 * @param securityLevel - Security level
 * @returns Corresponding risk level
 */
export function getRiskLevelFromSecurityLevel(
  securityLevel: SecurityLevel
): string {
  return SECURITY_TO_RISK_MAP[securityLevel] || RISK_LEVELS.MEDIUM;
}
