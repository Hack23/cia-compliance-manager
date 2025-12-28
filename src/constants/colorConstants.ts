/**
 * Color constants for security levels and CIA components
 * 
 * This module provides a centralized color system for representing security
 * levels and CIA triad components. Colors are carefully chosen to provide
 * intuitive visual feedback and ensure consistency across the application.
 * 
 * @module colorConstants
 * 
 * @example
 * ```typescript
 * import { SECURITY_LEVEL_COLORS, CIA_COMPONENT_COLORS, getSecurityLevelColorPair } from './colorConstants';
 * 
 * // Get colors for a security level
 * const colors = getSecurityLevelColorPair('High');
 * console.log(colors.bg);   // "#27ae60" (green)
 * console.log(colors.text); // "#00e676" (light green)
 * 
 * // Get CIA component colors
 * const integrityColors = CIA_COMPONENT_COLORS.INTEGRITY;
 * console.log(integrityColors.PRIMARY); // "#27ae60" (green)
 * ```
 */

import { SecurityLevel } from "../types/cia";

/**
 * Interface for security level color pair
 * 
 * @property bg - Background color in hexadecimal format
 * @property text - Text/foreground color in hexadecimal format
 */
export interface SecurityLevelColorPair {
  bg: string;
  text: string;
}

/**
 * Color mapping for security levels with background and text colors.
 * 
 * Colors are designed to provide intuitive visual feedback:
 * - **None** (Red): Critical security gaps, immediate attention required
 * - **Low** (Orange/Yellow): Basic security, needs improvement
 * - **Moderate** (Yellow/Blue): Standard security, acceptable for most use cases
 * - **High** (Green): Strong security, suitable for sensitive data
 * - **Very High** (Blue/Purple): Maximum security, suitable for critical systems
 * 
 * Each level includes both background and text colors to support various
 * display contexts (badges, cards, buttons, etc.).
 * 
 * @example
 * ```typescript
 * // Apply colors to a badge component
 * const level = 'High';
 * const colors = SECURITY_LEVEL_COLORS[level];
 * 
 * <Badge 
 *   style={{
 *     backgroundColor: colors.bg,
 *     color: colors.text
 *   }}
 * >
 *   {level}
 * </Badge>
 * ```
 * 
 * @example
 * ```typescript
 * // Use in dynamic styling
 * const getLevelStyles = (level: SecurityLevel) => ({
 *   borderColor: SECURITY_LEVEL_COLORS[level].bg,
 *   color: SECURITY_LEVEL_COLORS[level].text
 * });
 * ```
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
 * Color schemes for CIA triad components with enhanced distinctiveness.
 * 
 * Each CIA component has a unique color palette to aid visual recognition:
 * - **Confidentiality** (Purple): Represents data privacy and access control
 * - **Integrity** (Green): Represents data accuracy and validation
 * - **Availability** (Blue): Represents uptime and system accessibility
 * 
 * Each palette includes PRIMARY, SECONDARY (light), and DARK variants
 * to support different design contexts and dark mode compatibility.
 * 
 * @example
 * ```typescript
 * // Use confidentiality colors in a component
 * const colors = CIA_COMPONENT_COLORS.CONFIDENTIALITY;
 * 
 * <Card 
 *   style={{
 *     borderLeft: `4px solid ${colors.PRIMARY}`,
 *     backgroundColor: colors.SECONDARY
 *   }}
 * >
 *   <Icon color={colors.DARK} />
 *   Confidentiality Settings
 * </Card>
 * ```
 * 
 * @example
 * ```typescript
 * // Create a gradient effect
 * const gradient = `linear-gradient(135deg, 
 *   ${CIA_COMPONENT_COLORS.INTEGRITY.SECONDARY}, 
 *   ${CIA_COMPONENT_COLORS.INTEGRITY.PRIMARY})`;
 * ```
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
 * Get security level color pair by level name.
 * 
 * Retrieves the background and text colors for a given security level.
 * Returns "None" colors as fallback for invalid or undefined levels.
 * 
 * @param level - Security level to get colors for
 * @returns Color pair object with background and text colors
 * 
 * @example
 * ```typescript
 * // Basic usage
 * const colors = getSecurityLevelColorPair('High');
 * console.log(colors.bg);   // "#27ae60"
 * console.log(colors.text); // "#00e676"
 * 
 * // With dynamic level
 * const UserBadge = ({ level }: { level: SecurityLevel }) => {
 *   const colors = getSecurityLevelColorPair(level);
 *   return (
 *     <span style={{ backgroundColor: colors.bg, color: colors.text }}>
 *       {level}
 *     </span>
 *   );
 * };
 * ```
 * 
 * @example
 * ```typescript
 * // Fallback behavior for invalid level
 * const colors = getSecurityLevelColorPair('InvalidLevel' as SecurityLevel);
 * // Returns SECURITY_LEVEL_COLORS['None'] (red colors)
 * ```
 */
export function getSecurityLevelColorPair(
  level: SecurityLevel
): SecurityLevelColorPair {
  return SECURITY_LEVEL_COLORS[level] || SECURITY_LEVEL_COLORS["None"];
}

/**
 * Get CIA component color scheme with dark mode support.
 * 
 * Returns the appropriate color scheme for a CIA component based on the
 * current theme (light or dark mode). Automatically detects dark mode from
 * the document's class list and returns suitable colors.
 * 
 * **Dark Mode Detection:** Checks for 'dark' class on document root element.
 * 
 * @param component - CIA component identifier (CONFIDENTIALITY, INTEGRITY, or AVAILABILITY)
 * @returns Object with primary and secondary colors adjusted for current theme
 * 
 * @example
 * ```typescript
 * // Get colors that adapt to light/dark mode
 * const colors = getCIAComponentColors('INTEGRITY');
 * 
 * // Light mode result:
 * // { primary: "#27ae60", secondary: "#d4efdf" }
 * 
 * // Dark mode result (automatically):
 * // { primary: "#00e676", secondary: "#00e67680" (with transparency) }
 * ```
 * 
 * @example
 * ```typescript
 * // Use in a component that respects theme
 * const IntegrityCard = () => {
 *   const colors = getCIAComponentColors('INTEGRITY');
 *   
 *   return (
 *     <div style={{
 *       backgroundColor: colors.secondary,
 *       borderColor: colors.primary
 *     }}>
 *       Integrity Analysis
 *     </div>
 *   );
 * };
 * ```
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
