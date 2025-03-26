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
  None: { bg: "#e74c3c", text: "#ff3b3b" }, // Red
  Low: { bg: "#e67e22", text: "#ff9500" }, // Orange/Yellow
  Moderate: { bg: "#f1c40f", text: "#ffcc00" }, // Yellow/Blue
  High: { bg: "#27ae60", text: "#00e676" }, // Green
  "Very High": { bg: "#3498db", text: "#00ccff" }, // Blue/Purple
};

/**
 * Colors specific to CIA components - with enhanced distinctiveness
 */
export const CIA_COMPONENT_COLORS = {
  CONFIDENTIALITY: {
    PRIMARY: "#8e44ad", // Purple
    SECONDARY: "#e1bee7", // Light purple
    DARK: "#a742ff", // Dark purple
  },
  INTEGRITY: {
    PRIMARY: "#27ae60", // Green
    SECONDARY: "#d4efdf", // Light green
    DARK: "#00e676", // Vibrant green
  },
  AVAILABILITY: {
    PRIMARY: "#2980b9", // Blue
    SECONDARY: "#bbdefb", // Light blue
    DARK: "#00ccff", // Dark blue
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
