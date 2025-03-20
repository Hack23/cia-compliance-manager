import { SECURITY_LEVELS } from "../constants/appConstants";
import { SecurityLevel } from "../types/cia";

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
 * Default security level used throughout the application
 */
export const DEFAULT_SECURITY_LEVEL: SecurityLevel = "Moderate";

/**
 * Maps security levels to numeric values
 * 
 * @param level - Security level
 * @returns Numeric value from 0 (None) to 4 (Very High)
 */
export function getSecurityLevelValue(level: SecurityLevel | string): number {
  // Handle both SecurityLevel type and string type
  const securityLevel = typeof level === 'string' ? level as SecurityLevel : level;

  switch (securityLevel) {
    case 'None':
      return 0;
    case 'Low':
      return 1;
    case 'Moderate':
      return 2;
    case 'High':
      return 3;
    case 'Very High':
      return 4;
    default:
      console.warn(`Invalid security level: ${level}, defaulting to Moderate (2)`);
      return 2; // Default to Moderate if invalid
  }
}

/**
 * Maps numeric values to security levels
 * 
 * @param value - Numeric value (0-4)
 * @returns The corresponding security level
 */
export function getSecurityLevelFromValue(value: number): SecurityLevel {
  const levels: SecurityLevel[] = ["None", "Low", "Moderate", "High", "Very High"];
  return levels[value] || "None";
}

/**
 * Converts a security level to a risk level
 * 
 * @param level - Security level
 * @returns Risk level string
 */
export function getRiskLevelFromSecurityLevel(level: SecurityLevel): string {
  const mapping: Record<SecurityLevel, string> = {
    "None": "Critical",
    "Low": "High",
    "Moderate": "Medium",
    "High": "Low",
    "Very High": "Minimal"
  };
  return mapping[level] || "Unknown";
}

/**
 * Calculates the overall security level based on individual CIA components
 * 
 * @param availabilityLevel - Availability level
 * @param integrityLevel - Integrity level
 * @param confidentialityLevel - Confidentiality level 
 * @returns The overall security level
 */
export function calculateOverallSecurityLevel(
  availabilityLevel: SecurityLevel,
  integrityLevel: SecurityLevel,
  confidentialityLevel: SecurityLevel
): SecurityLevel {
  const aValue = getSecurityLevelValue(availabilityLevel);
  const iValue = getSecurityLevelValue(integrityLevel);
  const cValue = getSecurityLevelValue(confidentialityLevel);

  const avgValue = Math.round((aValue + iValue + cValue) / 3);

  return getSecurityLevelFromValue(avgValue);
}

/**
 * Normalize a string value to a valid SecurityLevel
 * 
 * @param level - A string that might be a security level
 * @returns A valid SecurityLevel
 */
export function normalizeSecurityLevel(level?: string): SecurityLevel {
  if (!level) return DEFAULT_SECURITY_LEVEL;

  const validLevels: SecurityLevel[] = ["None", "Low", "Moderate", "High", "Very High"];

  // Try direct match
  if (validLevels.includes(level as SecurityLevel)) {
    return level as SecurityLevel;
  }

  // Try case-insensitive match
  const normalized = level.charAt(0).toUpperCase() + level.slice(1).toLowerCase();
  if (validLevels.includes(normalized as SecurityLevel)) {
    return normalized as SecurityLevel;
  }

  // Default to moderate if no match
  return DEFAULT_SECURITY_LEVEL;
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

/**
 * Check if a string is a valid security level
 * 
 * @param value - Value to check
 * @returns Type guard for SecurityLevel
 */
export function isSecurityLevel(value: unknown): value is SecurityLevel {
  if (typeof value !== "string") return false;

  return ["None", "Low", "Moderate", "High", "Very High"].includes(value as string);
}

/**
 * Convert string to security level, with fallback
 * 
 * @param value - Value to convert
 * @param fallback - Fallback level if invalid
 * @returns Valid security level
 */
export function asSecurityLevel(value: string, fallback: SecurityLevel = "None"): SecurityLevel {
  return isSecurityLevel(value) ? value : fallback;
}

/**
 * Get security level description
 * 
 * @param level - Security level
 * @returns Description of the security level
 */
export function getSecurityLevelDescription(level: SecurityLevel): string {
  const descriptions: Record<SecurityLevel, string> = {
    "None": "No security controls implemented",
    "Low": "Basic security controls with minimal protection",
    "Moderate": "Standard security controls with adequate protection",
    "High": "Advanced security controls with strong protection",
    "Very High": "Maximum security controls with comprehensive protection"
  };

  return descriptions[level] || "Unknown security level";
}

/**
 * Determine if a security level meets compliance requirements
 * 
 * @param level - Security level to check
 * @param framework - Compliance framework to check against
 * @returns Whether the level meets requirements
 */
export function meetsComplianceRequirements(
  level: SecurityLevel,
  framework: string
): boolean {
  const minLevelsByFramework: Record<string, SecurityLevel> = {
    "SOC2": "Moderate",
    "ISO27001": "Moderate",
    "PCI-DSS": "High",
    "HIPAA": "High",
    "NIST": "High",
    "GDPR": "Moderate",
    "CCPA": "Moderate"
  };

  const requiredLevel = minLevelsByFramework[framework] || "Low";

  // Compare security level values
  return getSecurityLevelValue(level) >= getSecurityLevelValue(requiredLevel);
}

/**
 * Get security icon for a security level
 * 
 * @param level - Security level
 * @returns Icon representing the security level
 */
export function getSecurityIcon(level: SecurityLevel): string {
  const icons: Record<SecurityLevel, string> = {
    "None": "⚠️",
    "Low": "🔑",
    "Moderate": "🔒",
    "High": "🛡️",
    "Very High": "🔐"
  };

  return icons[level] || "❓";
}

/**
 * Get recommended security level based on data sensitivity
 * 
 * @param dataSensitivity - Data sensitivity level (1-5)
 * @returns Recommended security level
 */
export function getRecommendedSecurityLevel(dataSensitivity: number): SecurityLevel {
  if (dataSensitivity <= 1) return "None";
  if (dataSensitivity === 2) return "Low";
  if (dataSensitivity === 3) return "Moderate";
  if (dataSensitivity === 4) return "High";
  return "Very High";
}

/**
 * Format a security level string consistently
 * 
 * @param level - Level string to format
 * @returns Formatted security level or original string
 */
export function formatSecurityLevel(level?: string): SecurityLevel | string {
  if (!level) return "Not Specified";

  // Check for case-insensitive variations and normalize
  const normalizedLevel = level.trim();

  // Check for common value variations
  if (/^none$/i.test(normalizedLevel)) return "None";
  if (/^low$/i.test(normalizedLevel)) return "Low";
  if (/^(moderate|medium)$/i.test(normalizedLevel)) return "Moderate";
  if (/^high$/i.test(normalizedLevel)) return "High";
  if (/^(very.?high|maximum)$/i.test(normalizedLevel)) return "Very High";

  // If no match found, return original
  return level;
}
