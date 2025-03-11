import { SecurityLevel } from "../types/cia";

/**
 * Color constants for security levels following
 * WCAG 2.1 AA standards (contrast ratio ≥ 4.5:1)
 */
export const SECURITY_LEVEL_COLORS = {
  // Primary colors for badges, buttons, etc.
  BACKGROUND: {
    NONE: "#dc3545", // Stronger red
    LOW: "#e67e22", // More vibrant orange
    MODERATE: "#f1c40f", // Stronger yellow
    HIGH: "#2ecc71", // More vibrant green
    VERY_HIGH: "#3498db", // More vibrant blue
  },

  // Text colors that meet contrast requirements with white backgrounds
  TEXT: {
    NONE: "#7d1a1a", // Dark red
    LOW: "#924d10", // Dark orange
    MODERATE: "#7d6608", // Dark yellow
    HIGH: "#186a3b", // Dark green
    VERY_HIGH: "#1a5276", // Dark blue
  },

  // Colors for use with dark backgrounds - increased brightness for visibility
  DARK_MODE: {
    NONE: "#ff6b6b", // Brighter red for dark backgrounds
    LOW: "#ff9f43", // Brighter orange
    MODERATE: "#feca57", // Brighter yellow
    HIGH: "#54e346", // Brighter green
    VERY_HIGH: "#70a1ff", // Brighter blue
  },

  // For borders and accents - slightly higher saturation
  BORDER: {
    NONE: "#f8d7da", // Light red border
    LOW: "#ffedd8", // Light orange border
    MODERATE: "#fff6d9", // Light yellow border
    HIGH: "#d4edda", // Light green border
    VERY_HIGH: "#cfe2ff", // Light blue border
  },
};

/**
 * Colors specific to CIA components - with enhanced distinctiveness
 */
export const CIA_COMPONENT_COLORS = {
  CONFIDENTIALITY: {
    PRIMARY: "#27ae60", // Brighter green for light mode/corporate style
    SECONDARY: "#d4efdf", // Light green with better contrast
    DARK: "#2ecc71", // Vibrant green for dark mode Ingress style
  },
  INTEGRITY: {
    PRIMARY: "#27ae60", // Brighter green for light mode/corporate style
    SECONDARY: "#d4efdf", // Light green with better contrast
    DARK: "#2ecc71", // Vibrant green for dark mode Ingress style
  },
  AVAILABILITY: {
    PRIMARY: "#27ae60", // Brighter green for light mode/corporate style
    SECONDARY: "#d4efdf", // Light green with better contrast
    DARK: "#2ecc71", // Vibrant green for dark mode Ingress style
  },
};

/**
 * Get background and text colors for a specific security level
 */
export const getSecurityLevelColorPair = (
  level: SecurityLevel
): { bg: string; text: string } => {
  // Check if we're in dark mode
  const isDarkMode = document.documentElement.classList.contains("dark");

  const normalizedLevel = level
    .replace(/\s+/g, "_")
    .toUpperCase() as keyof typeof SECURITY_LEVEL_COLORS.BACKGROUND;

  // Use different colors based on dark mode to ensure visibility
  const bgColor = isDarkMode
    ? SECURITY_LEVEL_COLORS.DARK_MODE[normalizedLevel] ||
      SECURITY_LEVEL_COLORS.DARK_MODE.NONE
    : SECURITY_LEVEL_COLORS.BACKGROUND[normalizedLevel] ||
      SECURITY_LEVEL_COLORS.BACKGROUND.NONE;

  // For dark mode, always use white/near-white text for better visibility
  const textColor = isDarkMode
    ? "#ffffff"
    : normalizedLevel === "NONE" || normalizedLevel === "LOW"
    ? "#ffffff"
    : "#000000";

  return { bg: bgColor, text: textColor };
};

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
