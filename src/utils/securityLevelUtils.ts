import { SecurityLevel } from "../types/cia";
import { SECURITY_LEVELS } from "../constants/appConstants";

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
 * Gets a numerical representation of a security level for calculations
 * @param level The security level string
 * @returns A number from 0-4 representing the security level
 */
export function getSecurityLevelValue(level: string): number {
  const levels = [
    SECURITY_LEVELS.NONE,
    SECURITY_LEVELS.LOW,
    SECURITY_LEVELS.MODERATE,
    SECURITY_LEVELS.HIGH,
    SECURITY_LEVELS.VERY_HIGH,
  ];

  return Math.max(0, levels.indexOf(level as SecurityLevel));
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
