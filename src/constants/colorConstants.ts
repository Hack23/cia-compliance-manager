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

/**
 * Color constants for the CIA Compliance Manager application
 * Centralizes all color values for consistent theming
 */

// CIA Component-specific colors
export const CIA_COLORS = {
  availability: {
    primary: "#3b82f6", // blue-500
    light: "#dbeafe", // blue-100
    lighter: "rgba(59, 130, 246, 0.1)",
    dark: "#2563eb", // blue-600
    darker: "#1d4ed8", // blue-700
    darkMode: {
      primary: "#60a5fa", // blue-400
      light: "rgba(59, 130, 246, 0.2)",
      lighter: "rgba(59, 130, 246, 0.1)",
      dark: "#3b82f6", // blue-500
      background: "rgba(59, 130, 246, 0.1)",
    },
  },
  integrity: {
    primary: "#10b981", // green-500
    light: "#d1fae5", // green-100
    lighter: "rgba(16, 185, 129, 0.1)",
    dark: "#059669", // green-600
    darker: "#047857", // green-700
    darkMode: {
      primary: "#34d399", // green-400
      light: "rgba(16, 185, 129, 0.2)",
      lighter: "rgba(16, 185, 129, 0.1)",
      dark: "#10b981", // green-500
      background: "rgba(16, 185, 129, 0.1)",
    },
  },
  confidentiality: {
    primary: "#8b5cf6", // purple-500
    light: "#ede9fe", // purple-100
    lighter: "rgba(139, 92, 246, 0.1)",
    dark: "#7c3aed", // purple-600
    darker: "#6d28d9", // purple-700
    darkMode: {
      primary: "#a78bfa", // purple-400
      light: "rgba(139, 92, 246, 0.2)",
      lighter: "rgba(139, 92, 246, 0.1)",
      dark: "#8b5cf6", // purple-500
      background: "rgba(139, 92, 246, 0.1)",
    },
  },
};

// Color aliases for components (maps CIA attributes to their colors)
export const COMPONENT_COLORS = {
  availability: "blue",
  integrity: "green",
  confidentiality: "purple",
};

// System color tokens for generic UI elements
export const UI_COLORS = {
  primary: {
    light: "#3b82f6", // blue-500
    dark: "#60a5fa", // blue-400
  },
  success: {
    light: "#10b981", // green-500
    dark: "#34d399", // green-400
  },
  warning: {
    light: "#f59e0b", // amber-500
    dark: "#fbbf24", // amber-400
  },
  danger: {
    light: "#ef4444", // red-500
    dark: "#f87171", // red-400
  },
  neutral: {
    light: "#6b7280", // gray-500
    dark: "#9ca3af", // gray-400
  },
};
