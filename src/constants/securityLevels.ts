import { SecurityLevel } from "../types/cia";

/**
 * Mapping from security levels to risk levels
 * 
 * ## Business Perspective
 * 
 * This mapping ensures consistent translation between security levels and
 * risk terminology used in business impact analysis and reporting. Having
 * a centralized mapping helps maintain consistency across the application. 🔒
 */
export const riskLevelMappings: Record<SecurityLevel, string> = {
  "None": "Critical",
  "Low": "High",
  "Moderate": "Medium",
  "High": "Low",
  "Very High": "Minimal"
};

/**
 * Gets a risk level string for a security level
 * 
 * @param level - Security level
 * @returns Risk level string
 */
export function getRiskLevelForSecurity(level: SecurityLevel): string {
  return riskLevelMappings[level] || "Unknown";
}
