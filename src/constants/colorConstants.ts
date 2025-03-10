import { SecurityLevel } from "../types/cia";

/**
 * Color constants for security levels following
 * WCAG 2.1 AA standards (contrast ratio ≥ 4.5:1)
 */
export const SECURITY_LEVEL_COLORS = {
  // Primary colors for badges, buttons, etc.
  BACKGROUND: {
    NONE: "#dc3545", // Darker red for better contrast with white
    LOW: "#fd7e14", // Darker orange for better contrast
    MODERATE: "#ffc107", // Yellow
    HIGH: "#28a745", // Green
    VERY_HIGH: "#0d6efd", // Blue
  },

  // Text colors that meet contrast requirements with white backgrounds
  TEXT: {
    NONE: "#7d1a1a", // Dark red
    LOW: "#925205", // Dark orange
    MODERATE: "#856404", // Dark yellow
    HIGH: "#155724", // Dark green
    VERY_HIGH: "#0a3577", // Dark blue
  },

  // Colors for use with dark backgrounds
  DARK_MODE: {
    NONE: "#ff8080", // Lighter red for dark backgrounds
    LOW: "#ffb74d", // Lighter orange
    MODERATE: "#ffeb3b", // Brighter yellow
    HIGH: "#4caf50", // Lighter green
    VERY_HIGH: "#63a4ff", // Lighter blue
  },

  // For borders and accents
  BORDER: {
    NONE: "#f5c2c7", // Light red border
    LOW: "#ffe5d0", // Light orange border
    MODERATE: "#fff3cd", // Light yellow border
    HIGH: "#c3e6cb", // Light green border
    VERY_HIGH: "#b8daff", // Light blue border
  },
};

/**
 * Colors specific to CIA components
 */
export const CIA_COMPONENT_COLORS = {
  CONFIDENTIALITY: {
    PRIMARY: "#6f42c1", // Purple
    SECONDARY: "#d3c4e3", // Light purple
    DARK: "#4e2a89", // Dark purple
  },
  INTEGRITY: {
    PRIMARY: "#28a745", // Green
    SECONDARY: "#c3e6cb", // Light green
    DARK: "#155724", // Dark green
  },
  AVAILABILITY: {
    PRIMARY: "#0d6efd", // Blue
    SECONDARY: "#b8daff", // Light blue
    DARK: "#0a3577", // Dark blue
  },
};

/**
 * Get background and text colors for a specific security level
 */
export const getSecurityLevelColorPair = (
  level: SecurityLevel
): { bg: string; text: string } => {
  const normalizedLevel = level
    .replace(/\s+/g, "_")
    .toUpperCase() as keyof typeof SECURITY_LEVEL_COLORS.BACKGROUND;

  return {
    bg:
      SECURITY_LEVEL_COLORS.BACKGROUND[normalizedLevel] ||
      SECURITY_LEVEL_COLORS.BACKGROUND.NONE,
    text:
      normalizedLevel === "NONE" || normalizedLevel === "LOW"
        ? "#ffffff"
        : "#000000",
  };
};
