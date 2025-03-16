import { SecurityLevel } from "../types/cia";
import { SECURITY_LEVELS } from "../constants/appConstants";

/**
 * Utility functions for handling security levels.
 * 
 * ## Business Impact
 * These functions play a crucial role in determining and normalizing security levels, which directly impacts the application's ability to manage and enforce security policies. 💼
 * 
 * ## Compliance
 * By providing consistent and accurate security level calculations, these functions help ensure that the application meets various compliance requirements and standards. 📜
 * 
 * ## Risk Management
 * The functions in this module contribute to risk management by providing a structured way to represent and analyze security levels, helping to identify and mitigate potential risks. ⚠️
 * 
 * ## Value Creation
 * The use of well-defined utility functions enhances the application's reliability and maintainability, leading to cost savings and efficiency improvements. 💡
 * 
 * ## Stakeholder Benefits
 * Clear and consistent utility functions benefit all stakeholders, including developers, security analysts, and business users, by providing a common understanding of key security concepts. 🤝
 */

/**
 * Normalizes a security level string to ensure it's a valid SecurityLevel value
 * @param level The input security level string
 * @returns A valid SecurityLevel
 */
export function normalizeSecurityLevel(level?: string): SecurityLevel {
  if (!level) return SECURITY_LEVELS.NONE as SecurityLevel;

  // Check direct match first
  if (Object.values(SECURITY_LEVELS).includes(level as any)) {
    return level as SecurityLevel;
  }

  // Try case-insensitive match
  const normalizedLevel = level.toLowerCase();
  for (const validLevel of Object.values(SECURITY_LEVELS)) {
    if (normalizedLevel === validLevel.toLowerCase()) {
      return validLevel as SecurityLevel;
    }
  }

  // Default fallback
  return SECURITY_LEVELS.NONE as SecurityLevel;
}

/**
 * Gets a numerical value for a security level for calculations
 * @param level The security level string
 * @returns A number from 0 (None) to 4 (Very High)
 */
export function getSecurityLevelValue(level: SecurityLevel | string): number {
  const normalizedLevel = normalizeSecurityLevel(level as SecurityLevel);

  switch (normalizedLevel) {
    case "Very High":
      return 4;
    case "High":
      return 3;
    case "Moderate":
      return 2;
    case "Low":
      return 1;
    case "None":
    default:
      return 0;
  }
}

/**
 * Provides a numerical representation of security levels for UI presentation
 * @param level The security level string
 * @returns A string representation formatted as a percentage
 */
export function getSecurityLevelPercentage(level: string): string {
  const value = getSecurityLevelValue(level);
  const percentage = value * 25; // 0, 25, 50, 75, 100
  return `${percentage}%`;
}

/**
 * Determines the appropriate CSS classes for displaying a security level
 * @param level The security level string
 * @returns CSS class string for styling the security level
 */
export function getSecurityLevelClass(level: string): string {
  const normalizedLevel = normalizeSecurityLevel(level);

  switch (normalizedLevel) {
    case SECURITY_LEVELS.VERY_HIGH:
      return "text-purple-600 dark:text-purple-400 font-bold";
    case SECURITY_LEVELS.HIGH:
      return "text-green-600 dark:text-green-400 font-bold";
    case SECURITY_LEVELS.MODERATE:
      return "text-blue-600 dark:text-blue-400";
    case SECURITY_LEVELS.LOW:
      return "text-yellow-600 dark:text-yellow-400";
    case SECURITY_LEVELS.NONE:
    default:
      return "text-gray-600 dark:text-gray-400";
  }
}

/**
 * Map a security level to a status badge variant
 * @param level The security level string
 * @returns A status badge variant
 */
export function getSecurityLevelBadgeVariant(
  level: string
): "info" | "success" | "warning" | "error" | "neutral" | "purple" {
  const normalizedLevel = normalizeSecurityLevel(level);

  switch (normalizedLevel) {
    case SECURITY_LEVELS.VERY_HIGH:
      return "purple";
    case SECURITY_LEVELS.HIGH:
      return "success";
    case SECURITY_LEVELS.MODERATE:
      return "info";
    case SECURITY_LEVELS.LOW:
      return "warning";
    case SECURITY_LEVELS.NONE:
      return "error";
    default:
      return "neutral";
  }
}
