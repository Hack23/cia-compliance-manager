import { SecurityLevel } from "../types/cia";

/**
 * Interface for security level color pair
 */
export interface SecurityLevelColorPair {
  bg: string;
  text: string;
}

/**
 * Color mapping for security levels
 */
export const SECURITY_LEVEL_COLORS: Record<
  SecurityLevel,
  SecurityLevelColorPair
> = {
  None: { bg: "#f5f5f5", text: "#a0a0a0" },
  Low: { bg: "#e3f2fd", text: "#1976d2" },
  Moderate: { bg: "#e8f5e9", text: "#2e7d32" },
  High: { bg: "#fff8e1", text: "#ff8f00" },
  "Very High": { bg: "#fbe9e7", text: "#d84315" },
};

/**
 * Colors specific to CIA components - with enhanced distinctiveness
 */
export const CIA_COMPONENT_COLORS = {
  CONFIDENTIALITY: {
    PRIMARY: "#9c27b0", // Purple
    SECONDARY: "#e1bee7", // Light purple
    DARK: "#7b1fa2", // Dark purple
  },
  INTEGRITY: {
    PRIMARY: "#27ae60", // Green
    SECONDARY: "#d4efdf", // Light green
    DARK: "#2ecc71", // Vibrant green
  },
  AVAILABILITY: {
    PRIMARY: "#2196f3", // Blue
    SECONDARY: "#bbdefb", // Light blue
    DARK: "#1976d2", // Dark blue
  },
};

/**
 * Get security level color pair
 *
 * @param level Security level
 * @returns Color pair object with background and text colors
 */
export function getSecurityLevelColorPair(
  level: SecurityLevel
): SecurityLevelColorPair {
  return SECURITY_LEVEL_COLORS[level] || SECURITY_LEVEL_COLORS["None"];
}

/**
 * Get component color scheme respecting dark mode
 */
export const getCIAComponentColors = (
  component: "CONFIDENTIALITY" | "INTEGRITY" | "AVAILABILITY"
): { primary: string; secondary: string } => {
  const isDarkMode = document.documentElement.classList.contains("dark");

  // Return appropriate colors based on dark mode
  return {
    primary: isDarkMode
      ? CIA_COMPONENT_COLORS[component].DARK
      : CIA_COMPONENT_COLORS[component].PRIMARY,
    secondary: isDarkMode
      ? `${CIA_COMPONENT_COLORS[component].DARK}80` // Add transparency
      : CIA_COMPONENT_COLORS[component].SECONDARY,
  };
};
