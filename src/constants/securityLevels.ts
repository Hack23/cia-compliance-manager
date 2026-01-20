import { SecurityLevel } from "../types/cia";
import { SecurityLevelColorPair } from "./colorConstants";

/**
 * Maps human-readable security level values to consistent keys
 */
export const SECURITY_LEVELS = {
  NONE: "None" as SecurityLevel,
  LOW: "Low" as SecurityLevel,
  MODERATE: "Moderate" as SecurityLevel,
  HIGH: "High" as SecurityLevel,
  VERY_HIGH: "Very High" as SecurityLevel,
};

/**
 * Maps security levels to integers for calculations
 * Higher number = higher security
 */
export const SECURITY_LEVEL_VALUES: Record<SecurityLevel, number> = {
  None: 0,
  Low: 1,
  Moderate: 2,
  High: 3,
  "Very High": 4,
};

/**
 * Maps integer values back to security levels
 */
export const SECURITY_LEVEL_FROM_VALUE: SecurityLevel[] = [
  "None",
  "Low",
  "Moderate",
  "High",
  "Very High",
];

/**
 * Descriptions for each security level
 */
export const SECURITY_LEVEL_DESCRIPTIONS: Record<SecurityLevel, string> = {
  None: "No security controls implemented. Not recommended for production systems.",
  Low: "Basic security controls with minimal protection. Suitable for non-sensitive data.",
  Moderate:
    "Standard security controls providing reasonable protection for business data.",
  High: "Advanced security controls with robust protection for sensitive data.",
  "Very High":
    "Maximum security controls with comprehensive protection for critical systems.",
};

/**
 * Color coding for security levels
 */
export const SECURITY_LEVEL_COLOR_MAP: Record<
  SecurityLevel,
  SecurityLevelColorPair
> = {
  None: { bg: "#f8d7da", text: "#721c24" }, // Red
  Low: { bg: "#fff3cd", text: "#856404" }, // Yellow
  Moderate: { bg: "#d1ecf1", text: "#0c5460" }, // Blue
  High: { bg: "#d4edda", text: "#155724" }, // Green
  "Very High": { bg: "#cce5ff", text: "#004085" }, // Dark Blue
};

/**
 * CSS classes for security levels in Tailwind
 */
export const SECURITY_LEVEL_CSS_CLASSES: Record<
  SecurityLevel,
  { bg: string; text: string }
> = {
  None: {
    bg: "bg-red-100 dark:bg-red-900/20",
    text: "text-red-800 dark:text-red-300",
  },
  Low: {
    bg: "bg-yellow-100 dark:bg-yellow-900/20",
    text: "text-yellow-800 dark:text-yellow-300",
  },
  Moderate: {
    bg: "bg-blue-100 dark:bg-blue-900/20",
    text: "text-blue-800 dark:text-blue-300",
  },
  High: {
    bg: "bg-green-100 dark:bg-green-900/20",
    text: "text-green-800 dark:text-green-300",
  },
  "Very High": {
    bg: "bg-purple-100 dark:bg-purple-900/20",
    text: "text-purple-800 dark:text-purple-300",
  },
};

/**
 * All security levels as array for mapping
 */
export const ALL_SECURITY_LEVELS: SecurityLevel[] = [
  SECURITY_LEVELS.NONE,
  SECURITY_LEVELS.LOW,
  SECURITY_LEVELS.MODERATE,
  SECURITY_LEVELS.HIGH,
  SECURITY_LEVELS.VERY_HIGH,
];

/**
 * Get a security level by its number value
 *
 * @param value - Numerical value of security level (0-4)
 * @returns Security level or None if invalid
 */
export function getSecurityLevelByValue(value: number): SecurityLevel {
  return SECURITY_LEVEL_FROM_VALUE[value] || SECURITY_LEVELS.NONE;
}

/**
 * Get security level value as number
 *
 * @param level - Security level
 * @returns Numerical value (0-4)
 */
export function getSecurityLevelValue(level: SecurityLevel): number {
  return SECURITY_LEVEL_VALUES[level] || 0;
}

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
  None: "Critical",
  Low: "High",
  Moderate: "Medium",
  High: "Low",
  "Very High": "Minimal",
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
