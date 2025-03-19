import { StatusBadgeVariant } from "../components/common/StatusBadge";
import { SecurityLevel } from "../types/cia";
import { RiskLevelLiteral } from "../types/risk";

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
 * Maps security level to corresponding risk level
 */
const SECURITY_TO_RISK: Record<SecurityLevel, RiskLevelLiteral> = {
  "None": "Critical",
  "Low": "High",
  "Moderate": "Medium",
  "High": "Low",
  "Very High": "Minimal"
};

/**
 * Convert security level to risk level
 * 
 * ## Business Perspective
 * 
 * This function maps security levels to their inverse risk levels,
 * supporting consistent risk communication. Higher security levels
 * correspond to lower risk levels, which helps stakeholders understand
 * how security investments reduce risk exposure. 🔒
 * 
 * @see getRiskScoreFromSecurityLevel - For numeric representation
 * @see parseRiskLevel - For converting risk levels to numeric values
 * 
 * @param securityLevel - Security level
 * @returns Risk level as a string
 */
export function getRiskLevelFromSecurityLevel(securityLevel: SecurityLevel): RiskLevelLiteral {
  return SECURITY_TO_RISK[securityLevel] || "Unknown";
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
  if (levelLower.includes("medium") || levelLower.includes("moderate")) return 2;
  if (levelLower.includes("low")) return 1;
  if (levelLower.includes("minimal")) return 0;
  
  return 0;
}