import { getSecurityLevelColorPair as getColorPairFromConstants } from "../constants/colorConstants";
import { SecurityLevel } from "../types/cia";

/**
 * Utility functions for handling color-related operations based on security levels.
 *
 * ## Business Perspective
 *
 * These utility functions provide consistent color representations across the application,
 * ensuring that security levels are visually communicated in a consistent manner to users.
 * This visual consistency is crucial for quick risk assessment and decision making. 🎨
 */

/**
 * Color representation interface
 */
interface ColorPair {
  bg: string;
  text: string;
}

/**
 * Get background and text colors for a security level
 *
 * @param level - Security level
 * @returns Object with bg (background) and text colors
 */
export function getSecurityLevelColorPair(level: SecurityLevel): ColorPair {
  return getColorPairFromConstants(level);
}

/**
 * Get the CSS class for a security level (Tailwind)
 *
 * @param level - Security level
 * @returns CSS class name for the security level
 */
export function getSecurityLevelColorClass(
  level: SecurityLevel | string
): string {
  // Normalize the level to handle case differences and variations
  const normalizedLevel =
    typeof level === "string" ? level.toString().toLowerCase() : "none";

  // Map levels to Tailwind CSS classes
  switch (normalizedLevel) {
    case "none":
      return "text-red-600 dark:text-red-400";
    case "low":
      return "text-yellow-600 dark:text-yellow-400";
    case "moderate":
      return "text-blue-600 dark:text-blue-400";
    case "high":
      return "text-green-600 dark:text-green-400";
    case "very high":
      return "text-purple-600 dark:text-purple-400";
    default:
      return "text-gray-600 dark:text-gray-400";
  }
}

/**
 * Get the traditional CSS class name for a security level
 *
 * @param level - Security level
 * @returns Traditional CSS class name for the security level
 */
export function getSecurityLevelClassName(
  level: SecurityLevel | string
): string {
  // Normalize the level to handle case differences and variations
  const normalizedLevel =
    typeof level === "string" ? level.toString().toLowerCase() : "none";

  // Map levels to traditional CSS classes
  switch (normalizedLevel) {
    case "none":
      return "security-level-none";
    case "low":
      return "security-level-low";
    case "moderate":
      return "security-level-moderate";
    case "high":
      return "security-level-high";
    case "very high":
      return "security-level-very-high";
    default:
      return "security-level-default";
  }
}

/**
 * Get the background color class for a security level
 *
 * @param level - The security level
 * @returns CSS class for the background color
 */
export function getSecurityLevelBackgroundClass(
  level: SecurityLevel | string
): string {
  const normalizedLevel =
    typeof level === "string" ? level.toString().toLowerCase() : "none";

  switch (normalizedLevel) {
    case "none":
      return "bg-red-100 dark:bg-red-900 dark:bg-opacity-20";
    case "low":
      return "bg-yellow-100 dark:bg-yellow-900 dark:bg-opacity-20";
    case "moderate":
      return "bg-blue-100 dark:bg-blue-900 dark:bg-opacity-20";
    case "high":
      return "bg-green-100 dark:bg-green-900 dark:bg-opacity-20";
    case "very high":
      return "bg-purple-100 dark:bg-purple-900 dark:bg-opacity-20";
    default:
      return "bg-gray-100 dark:bg-gray-800";
  }
}

/**
 * Get the CSS variables for a security level
 *
 * @param level - Security level
 * @returns Object with CSS variable values
 */
export function getSecurityLevelColorVars(
  level: SecurityLevel
): Record<string, string> {
  const colors = getSecurityLevelColorPair(level);
  return {
    "--security-bg-color": colors.bg,
    "--security-text-color": colors.text,
  };
}

/**
 * Gets hex color values for a security level based on current theme
 *
 * @param level - Security level
 * @returns Hex color code for the given security level
 */
export function getSecurityLevelHexColor(
  level: SecurityLevel | string
): string {
  // Use the existing color system
  const colorPair = getSecurityLevelColorPair(level as SecurityLevel);
  return colorPair.bg;
}
