import { SecurityLevel } from "../types/cia";

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
): "error" | "warning" | "info" | "success" | "neutral" {
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
 * Maps security level to corresponding risk level
 */
const SECURITY_TO_RISK: Record<SecurityLevel, string> = {
  "None": "Critical",
  "Low": "High",
  "Moderate": "Medium",
  "High": "Low",
  "Very High": "Minimal"
};

/**
 * Convert security level to risk level
 * 
 * @param securityLevel - Security level
 * @returns Risk level as a string
 */
export function getRiskLevelFromSecurityLevel(securityLevel: SecurityLevel): string {
  return SECURITY_TO_RISK[securityLevel] || "Unknown";
}

/**
 * Get risk score from security level
 * 
 * @param securityLevel - Security level
 * @returns Risk score (0-100)
 */
export function getRiskScoreFromSecurityLevel(securityLevel: SecurityLevel): number {
  const securityValues = {
    "None": 0,
    "Low": 1,
    "Moderate": 2,
    "High": 3,
    "Very High": 4
  };
  
  // Convert security level to value (0-4)
  const value = securityValues[securityLevel] || 0;
  
  // Calculate risk score (0-100, higher means higher risk)
  return 100 - (value * 25);
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
  if (levelLower.includes("medium") || levelLower.includes("moderate")) return 2;
  if (levelLower.includes("low")) return 1;
  if (levelLower.includes("minimal")) return 0;
  return 0;
}
