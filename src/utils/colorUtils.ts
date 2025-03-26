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
 * @param level - Security level to get color for
 * @returns Object with background and text color
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
 * Get the appropriate CSS color class for a security level
 * 
 * @param level - The security level to get the color class for
 * @returns CSS class string for the given security level
 */
export function getSecurityLevelColorClass(level: string): string {
  const normalizedLevel = level.toLowerCase();

  if (normalizedLevel === "none") return "text-red-600 dark:text-red-400";
  if (normalizedLevel === "low") return "text-yellow-600 dark:text-yellow-400";
  if (normalizedLevel === "moderate") return "text-blue-600 dark:text-blue-400";
  if (normalizedLevel === "high") return "text-green-600 dark:text-green-400";
  if (normalizedLevel === "very high") return "text-purple-600 dark:text-purple-400";

  return "text-gray-600 dark:text-gray-400"; // Default for unknown levels
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
 * Get the background color class for a security level
 * 
 * @param level - The security level
 * @returns CSS class for the background color
 */
export function getSecurityLevelBackgroundClass(level: string): string {
  const normalizedLevel = level.toLowerCase();

  if (normalizedLevel === "none") return "bg-red-100 dark:bg-red-900 dark:bg-opacity-20";
  if (normalizedLevel === "low") return "bg-yellow-100 dark:bg-yellow-900 dark:bg-opacity-20";
  if (normalizedLevel === "moderate") return "bg-blue-100 dark:bg-blue-900 dark:bg-opacity-20";
  if (normalizedLevel === "high") return "bg-green-100 dark:bg-green-900 dark:bg-opacity-20";
  if (normalizedLevel === "very high") return "bg-purple-100 dark:bg-purple-900 dark:bg-opacity-20";

  return "bg-gray-100 dark:bg-gray-800 dark:bg-opacity-20"; // Default for unknown levels
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
    "Critical": "#d32f2f", // Dark red
    "High": "#f57c00",     // Orange
    "Medium": "#fbc02d",   // Amber
    "Low": "#4caf50",      // Green
    "Minimal": "#2196f3",  // Blue
    "Unknown": "#9e9e9e",  // Gray
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
  if (normalizedLevel === "very high") return isDarkMode ? "#ab47bc" : "#9c27b0";

  return isDarkMode ? "#9e9e9e" : "#757575"; // Default gray for unknown levels
}

/**
 * Get CSS class for a security level
 * 
 * @param level - Security level 
 * @returns CSS class name for styling
 */
export function getSecurityLevelClass(level: SecurityLevel): string {
  return `security-level-${level.toLowerCase().replace(/\s+/g, '-')}`;
}

/**
 * Calculate contrast color (black or white) based on background
 * 
 * @param backgroundColor - Hex color code
 * @returns Black or white based on contrast
 */
export function getContrastColor(backgroundColor: string): string {
  // Convert hex to RGB
  const hex = backgroundColor.replace('#', '');
  const r = parseInt(hex.substr(0, 2), 16);
  const g = parseInt(hex.substr(2, 2), 16);
  const b = parseInt(hex.substr(4, 2), 16);

  // Calculate luminance
  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;

  // Return black for light backgrounds, white for dark
  return luminance > 0.5 ? '#000000' : '#ffffff';
}
