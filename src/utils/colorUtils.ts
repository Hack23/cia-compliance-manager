import { getSecurityLevelColorPair } from "../constants/colorConstants";
import { SecurityLevel } from "../types/cia";

/**
 * Utility functions for handling color-related operations based on security levels.
 * 
 * ## Technical Implementation
 * This module provides functions to get CSS classes and hex color values for different security levels.
 * 
 * ## Future-Proofing
 * The functions are designed to be easily extendable for additional security levels or color schemes.
 * 
 * ## Performance
 * The functions use simple switch statements and lookups, ensuring minimal performance overhead.
 * 
 * ## Maintainability
 * The code is structured to allow easy updates to color mappings and security level handling.
 * 
 * ## Integration
 * These functions are used across the application to ensure consistent color representation for security levels.
 */

/**
 * Get the appropriate CSS color class for a security level
 * @param level The security level to get the color class for
 * @returns CSS class string for the given security level
 */
export function getSecurityLevelColorClass(
  level: SecurityLevel | string
): string {
  // Normalize the level to handle case differences and variations
  const normalizedLevel = level.toString().toLowerCase();

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
 * Get the background color class for a security level
 * @param level The security level
 * @returns CSS class for the background color
 */
export function getSecurityLevelBackgroundClass(
  level: SecurityLevel | string
): string {
  const normalizedLevel = level.toString().toLowerCase();

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
 * Gets hex color values for a security level based on current theme
 * @param level The security level
 * @returns Hex color code for the given security level
 */
export function getSecurityLevelHexColor(
  level: SecurityLevel | string
): string {
  // Use the existing color system
  const colorPair = getSecurityLevelColorPair(level as SecurityLevel);
  return colorPair.bg;
}
