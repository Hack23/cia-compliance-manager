import { SecurityLevelColorPair } from "../constants/colorConstants";
import { SecurityLevel } from "../types/cia";

/**
 * Utility functions for color management in security visualization
 *
 * ## Business Perspective
 *
 * These color utilities ensure consistent visual representation of security levels
 * across the application, helping users quickly recognize security states through
 * color psychology (red for critical issues, green for safe states, etc.). 🎨
 *
 * Consistent color representation is essential for risk communication and
 * establishing intuitive security level recognition patterns for users.
 */

/**
 * Get color pair (background and text) for a specific security level
 * 
 * Returns coordinated background and text colors optimized for readability
 * and visual hierarchy in security level displays. Colors follow consistent
 * semantic meaning across the application.
 *
 * @param level - Security level to get color for
 * @returns Object with background and text color hex codes
 * 
 * @example
 * ```typescript
 * const colors = getSecurityLevelColorPair('High');
 * console.log(colors.bg);   // "#fff8e1" (light amber background)
 * console.log(colors.text); // "#ff8f00" (amber text)
 * 
 * // Usage in component
 * <div style={{ 
 *   backgroundColor: colors.bg,
 *   color: colors.text 
 * }}>
 *   High Security Level
 * </div>
 * ```
 */
export function getSecurityLevelColorPair(
  level: SecurityLevel
): SecurityLevelColorPair {
  const colorMap: Record<SecurityLevel, SecurityLevelColorPair> = {
    None: { bg: "#f5f5f5", text: "#a0a0a0" },
    Low: { bg: "#e3f2fd", text: "#1976d2" },
    Moderate: { bg: "#e8f5e9", text: "#2e7d32" },
    High: { bg: "#fff8e1", text: "#ff8f00" },
    "Very High": { bg: "#fbe9e7", text: "#d84315" },
  };

  return colorMap[level] || colorMap["None"];
}

/**
 * Get CSS color class for security level
 * @param level - Security level
 * @returns CSS class string
 */
export function getSecurityLevelColorClass(
  level: SecurityLevel | string
): string {
  // Normalize the level to handle case variations
  const normalizedLevel =
    typeof level === "string"
      ? level.toLowerCase().trim()
      : String(level).toLowerCase().trim();

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
 * Get CSS background color class for security level
 * @param level - Security level
 * @returns CSS background class string
 */
export function getSecurityLevelBackgroundClass(
  level: SecurityLevel | string
): string {
  // Normalize the level to handle case variations
  const normalizedLevel =
    typeof level === "string"
      ? level.toLowerCase().trim()
      : String(level).toLowerCase().trim();

  switch (normalizedLevel) {
    case "none":
      return "bg-red-100 dark:bg-red-900/20";
    case "low":
      return "bg-yellow-100 dark:bg-yellow-900/20";
    case "moderate":
      return "bg-blue-100 dark:bg-blue-900/20";
    case "high":
      return "bg-green-100 dark:bg-green-900/20";
    case "very high":
      return "bg-purple-100 dark:bg-purple-900/20";
    default:
      return "bg-gray-100 dark:bg-gray-800/20";
  }
}

/**
 * Get security level background color
 *
 * @param level - Security level
 * @returns Background color for the security level
 */
export function getSecurityLevelBackground(level: SecurityLevel): string {
  return getSecurityLevelColorPair(level).bg;
}

/**
 * Get security level text color
 *
 * @param level - Security level
 * @returns Text color for the security level
 */
export function getSecurityLevelTextColor(level: SecurityLevel): string {
  return getSecurityLevelColorPair(level).text;
}

/**
 * Get color for risk level
 *
 * @param riskLevel - Risk level string
 * @returns Color corresponding to the risk level
 */
export function getRiskLevelColor(riskLevel: string): string {
  const riskColorMap: Record<string, string> = {
    Critical: "#d32f2f", // Dark red
    High: "#f57c00", // Orange
    Medium: "#fbc02d", // Amber
    Low: "#4caf50", // Green
    Minimal: "#2196f3", // Blue
    Unknown: "#9e9e9e", // Gray
  };

  return riskColorMap[riskLevel] || riskColorMap["Unknown"];
}

/**
 * Get hex color for a security level based on current theme
 *
 * @param level - The security level
 * @returns Hex color code for the given security level
 */
export function getSecurityLevelHexColor(level: string): string {
  const normalizedLevel = level.toLowerCase();
  const isDarkMode = document.documentElement.classList.contains("dark");

  if (normalizedLevel === "none") return isDarkMode ? "#ef5350" : "#f44336";
  if (normalizedLevel === "low") return isDarkMode ? "#ffb74d" : "#ff9800";
  if (normalizedLevel === "moderate") return isDarkMode ? "#4fc3f7" : "#2196f3";
  if (normalizedLevel === "high") return isDarkMode ? "#66bb6a" : "#4caf50";
  if (normalizedLevel === "very high")
    return isDarkMode ? "#ab47bc" : "#9c27b0";

  return isDarkMode ? "#9e9e9e" : "#757575"; // Default gray for unknown levels
}

/**
 * Get CSS class for a security level
 *
 * @param level - Security level
 * @returns CSS class name for styling
 */
export function getSecurityLevelClass(level: SecurityLevel): string {
  return `security-level-${level.toLowerCase().replace(/\s+/g, "-")}`;
}

/**
 * Calculate contrast color (black or white) based on background
 *
 * @param backgroundColor - Hex color code
 * @returns Black or white based on contrast
 */
export function getContrastColor(backgroundColor: string): string {
  // Convert hex to RGB
  const hex = backgroundColor.replace("#", "");
  const r = parseInt(hex.substring(0, 2), 16);
  const g = parseInt(hex.substring(2, 4), 16);
  const b = parseInt(hex.substring(4, 6), 16);

  // Calculate luminance
  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;

  // Return black for light backgrounds, white for dark
  return luminance > 0.5 ? "#000000" : "#ffffff";
}

/**
 * Convert hex color to RGB values
 *
 * @param hex - Hex color string (e.g., #RRGGBB)
 * @returns RGB color object
 */
export function hexToRgb(hex: string): { r: number; g: number; b: number } {
  // Ensure hex is properly formatted with leading #
  const cleanHex = hex.charAt(0) === "#" ? hex.substring(1) : hex;

  // Use substring instead of deprecated substr
  const r = parseInt(cleanHex.substring(0, 2), 16);
  const g = parseInt(cleanHex.substring(2, 4), 16);
  const b = parseInt(cleanHex.substring(4, 6), 16);

  return { r, g, b };
}

/**
 * Get background color class for security score (0-100)
 * Preserve the exact behavior from main branch
 *
 * @param score - Security score (0-100)
 * @returns CSS class for the security score background color
 */
export function getSecurityScoreColorClass(score: number): string {
  if (score <= 30) return "bg-red-600"; // Critical
  if (score <= 50) return "bg-yellow-400"; // Medium
  if (score <= 60) return "bg-orange-500"; // High
  if (score <= 80) return "bg-green-500"; // Low
  return "bg-blue-500"; // Minimal
}

