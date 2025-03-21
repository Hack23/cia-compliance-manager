import React, { ReactNode } from "react";
import { SECURITY_LEVELS } from "../constants/appConstants";
import { WIDGET_ICONS, WIDGET_TITLES } from "../constants/coreConstants";
import { SecurityLevel } from "../types/cia";
// Import using different names to avoid conflicts
import { WidgetSizeString } from "../types/widget";
import { getSecurityLevelValue } from "./securityLevelUtils";
import { isSecurityLevel } from "./typeGuards";

// Interface for local use
interface WidgetDimension {
  width: number;
  height: number;
}

// Define widget config interface for local use
interface WidgetConfig {
  id: string;
  type: string;
  title: string;
  description?: string;
  icon?: string;
  priority?: number;
  visible?: boolean;
  size?: string;
  width?: number;
  height?: number;
  order?: number;
  requiredSecurityLevels?: string[];
  minSecurityLevel?: string | number;
  maxSecurityLevel?: string | number;
}

// Define a temporary Widget interface for local use
interface Widget {
  id: string;
  type: string;
  title: string;
  size?: WidgetSizeString;
  initialProps?: Record<string, unknown>;
}

// Define widget size presets
enum WidgetSizePreset {
  SMALL = "small",
  MEDIUM = "medium",
  LARGE = "large",
  EXTRA_LARGE = "extraLarge",
  FULL_WIDTH = "fullWidth",
}

// Define WidgetType for local use since it's not exported from types/widgets
export enum WidgetType {
  SECURITY_LEVEL = "SECURITY_LEVEL",
  SECURITY_SUMMARY = "SECURITY_SUMMARY",
  SECURITY_VISUALIZATION = "SECURITY_VISUALIZATION",
  COMPLIANCE_STATUS = "COMPLIANCE_STATUS",
  VALUE_CREATION = "VALUE_CREATION",
  COST_ESTIMATION = "COST_ESTIMATION",
  BUSINESS_IMPACT = "BUSINESS_IMPACT",
  TECHNICAL_DETAILS = "TECHNICAL_DETAILS",
  SECURITY_RESOURCES = "SECURITY_RESOURCES",
  AVAILABILITY_IMPACT = "AVAILABILITY_IMPACT",
  INTEGRITY_IMPACT = "INTEGRITY_IMPACT",
  CONFIDENTIALITY_IMPACT = "CONFIDENTIALITY_IMPACT",
}

// Define constants locally since they're not exported from coreConstants
export const WIDGET_DESCRIPTIONS: Record<string, string> = {
  [WidgetType.SECURITY_LEVEL]: "Security level selection",
  [WidgetType.SECURITY_SUMMARY]: "Security level summary",
  [WidgetType.COMPLIANCE_STATUS]: "Compliance status information",
  [WidgetType.VALUE_CREATION]: "Value creation metrics",
  [WidgetType.COST_ESTIMATION]: "Cost estimation details",
  [WidgetType.BUSINESS_IMPACT]: "Business impact analysis",
  [WidgetType.TECHNICAL_DETAILS]: "Technical implementation details",
  [WidgetType.SECURITY_RESOURCES]: "Security resources and references",
  [WidgetType.AVAILABILITY_IMPACT]: "Availability impact analysis",
  [WidgetType.INTEGRITY_IMPACT]: "Integrity impact analysis",
  [WidgetType.CONFIDENTIALITY_IMPACT]: "Confidentiality impact analysis",
  [WidgetType.SECURITY_VISUALIZATION]: "Security visualization",
};

export const WIDGET_CONTENT: Record<string, string> = {
  [WidgetType.SECURITY_LEVEL]: "Configure security levels",
  [WidgetType.SECURITY_SUMMARY]: "Security level summary information",
  [WidgetType.COMPLIANCE_STATUS]: "Compliance status details",
  [WidgetType.VALUE_CREATION]: "Value creation metrics and analysis",
  [WidgetType.COST_ESTIMATION]: "Cost estimation details and ROI",
  [WidgetType.BUSINESS_IMPACT]: "Business impact analysis details",
  [WidgetType.TECHNICAL_DETAILS]: "Technical implementation details",
  [WidgetType.SECURITY_RESOURCES]: "Security resources and references",
};

/**
 * Widget Helpers
 *
 * ## Technical Implementation
 * This module provides utility functions for managing and rendering widgets in the application. It includes functions for creating widget configurations, filtering and sorting widgets, and determining widget visibility based on security levels.
 *
 * ## Future-Proofing
 * The functions in this module are designed to be flexible and extensible, allowing for easy addition of new widget types and configurations. The use of enums and constants ensures that the code remains maintainable and easy to update.
 *
 * ## Performance
 * The functions are optimized for performance, with efficient filtering and sorting algorithms. The use of memoization and caching techniques can be considered for further performance improvements.
 *
 * ## Maintainability
 * The code is structured in a modular and reusable manner, with clear separation of concerns. Each function is well-documented and follows consistent naming conventions, making it easy to understand and maintain.
 *
 * ## Integration
 * This module integrates with other components in the application by providing a consistent API for managing widgets. It ensures that widgets are displayed correctly based on the current security levels and other configuration settings.
 */

/**
 * Get the icon for a widget type
 * @param type The widget type
 * @returns The icon or a default value
 */
export const getWidgetIcon = (type: WidgetType | string): string =>
  WIDGET_ICONS[type as keyof typeof WIDGET_ICONS] || "help_outline";

/**
 * Get the title for a widget type
 * @param type The widget type
 * @returns The title or a default value
 */
export const getWidgetTitle = (type: WidgetType | string): string =>
  WIDGET_TITLES[type as keyof typeof WIDGET_TITLES] || type;

/**
 * Get the description for a widget type
 * @param type The widget type
 * @returns The description or a default value
 */
export const getWidgetDescription = (type: WidgetType | string): string =>
  WIDGET_DESCRIPTIONS[type as string] || "No description available";

/**
 * Get the content for a widget type
 * @param type The widget type
 * @returns The content or an empty string
 */
export const getWidgetContent = (type: WidgetType | string): string =>
  WIDGET_CONTENT[type as string] || "";

/**
 * Create a widget configuration object
 * @param config Widget configuration options
 * @returns Complete widget configuration
 */
export const createWidgetConfig = (
  config: Partial<WidgetConfig> & { type: string }
): WidgetConfig => {
  // Use MEDIUM instead of DEFAULT
  const size = config.size || WidgetSizePreset.MEDIUM;
  // Generate a unique ID if not provided
  const id =
    config.id || `${config.type}-${Math.random().toString(36).substring(2, 9)}`;

  // Get dimensions for the widget
  const dimensions = getWidgetSize({ ...config, size });

  return {
    id,
    type: config.type,
    title: config.title || getWidgetTitle(config.type),
    description: config.description || getWidgetDescription(config.type),
    icon: config.icon || getWidgetIcon(config.type),
    priority: config.priority || 0,
    visible: config.visible !== undefined ? config.visible : true,
    size,
    width: dimensions.width,
    height: dimensions.height,
    order: config.order || 999,
    requiredSecurityLevels: config.requiredSecurityLevels,
    minSecurityLevel: config.minSecurityLevel,
    maxSecurityLevel: config.maxSecurityLevel,
  };
};

/**
 * Filter widgets based on visibility
 * @param widgets Array of widget configurations
 * @returns Filtered array of visible widgets
 */
export const filterWidgets = (widgets: WidgetConfig[]): WidgetConfig[] =>
  widgets.filter((w) => w.visible);

/**
 * Sort widgets by priority
 * @param widgets Array of widget configurations
 * @returns Sorted array of widgets
 */
export const sortWidgetsByPriority = (
  widgets: WidgetConfig[]
): WidgetConfig[] =>
  [...widgets].sort((a, b) => (a.priority || 0) - (b.priority || 0));

/**
 * Check if a widget should be visible based on security level
 * @param widget Widget configuration
 * @param securityLevel Current security level
 * @returns True if the widget should be visible
 */
export const evaluateWidgetVisibility = (
  widget: WidgetConfig,
  securityLevel: SecurityLevel
): boolean => {
  if (
    widget.minSecurityLevel === undefined &&
    widget.maxSecurityLevel === undefined
  )
    return true;

  // Convert security level to number using the utility function
  const level = getSecurityLevelValue(securityLevel);

  const min =
    typeof widget.minSecurityLevel === "string"
      ? parseInt(widget.minSecurityLevel, 10) || 0
      : (widget.minSecurityLevel as number) || 0;

  const max =
    typeof widget.maxSecurityLevel === "string"
      ? parseInt(widget.maxSecurityLevel, 10) || Infinity
      : (widget.maxSecurityLevel as number) || Infinity;

  return level >= min && level <= max;
};

/**
 * Format security level string for display
 * @param level Security level string that might be in any case format
 * @returns Properly formatted security level
 */
export function formatSecurityLevelString(level?: string): string {
  if (!level) return "None";

  // Check if the level matches any valid security level (case insensitive)
  const normalizedLevel = level.toLowerCase();
  for (const validLevel of Object.values(SECURITY_LEVELS)) {
    if (normalizedLevel === validLevel.toLowerCase()) {
      // Return with proper case formatting
      return validLevel;
    }
  }

  // Return the original value if no match found
  return level;
}

/**
 * Get CSS classes for a security level
 * @param level Security level
 * @returns Object with bg and text class names
 */
export function getSecurityLevelColors(level: SecurityLevel) {
  // Convert level to lowercase for case-insensitive matching
  const normalizedLevel = level.toLowerCase();

  // Default styles
  let bg = "bg-gray-100 dark:bg-gray-700";
  let text = "text-gray-800 dark:text-gray-200";

  // Map levels to CSS classes
  switch (normalizedLevel) {
    case "none":
      bg = "bg-red-50 dark:bg-red-900 dark:bg-opacity-20";
      text = "text-red-800 dark:text-red-300";
      break;
    case "low":
      bg = "bg-amber-50 dark:bg-amber-900 dark:bg-opacity-20";
      text = "text-amber-800 dark:text-amber-300";
      break;
    case "moderate":
      bg = "bg-blue-50 dark:bg-blue-900 dark:bg-opacity-20";
      text = "text-blue-800 dark:text-blue-300";
      break;
    case "high":
      bg = "bg-green-50 dark:bg-green-900 dark:bg-opacity-20";
      text = "text-green-800 dark:text-green-300";
      break;
    case "very high":
      bg = "bg-purple-50 dark:bg-purple-900 dark:bg-opacity-20";
      text = "text-purple-800 dark:text-purple-300";
      break;
  }

  return { bg, text };
}

/**
 * Convert string to SecurityLevel type
 * @param level String to convert to SecurityLevel
 * @returns Valid SecurityLevel value
 */
export function asSecurityLevel(level?: string): SecurityLevel {
  // Normalize the level first
  const formattedLevel = formatSecurityLevel(level);

  // Cast to SecurityLevel
  return formattedLevel as SecurityLevel;
}

/**
 * Get widget dimensions based on size preset
 * @param widget Widget configuration
 * @returns Width and height values for the widget
 */
export function getWidgetSize(widget: Partial<WidgetConfig>): WidgetDimension {
  // Use explicit width and height if provided
  if (widget.width !== undefined && widget.height !== undefined) {
    return { width: widget.width, height: widget.height };
  }

  // Get dimensions based on size preset
  const size = widget.size?.toLowerCase();

  switch (size) {
    case "small":
      return { width: 1, height: 1 };
    case "large":
      return { width: 2, height: 2 };
    case "extralarge":
    case "extra-large":
      return { width: 4, height: 2 };
    case "fullwidth":
    case "full-width":
      return { width: 4, height: 1 };
    case "medium":
    default:
      return { width: 2, height: 1 };
  }
}

/**
 * Check if all required security levels are present in the given security levels object
 * @param securityLevels Object containing security levels
 * @param requiredLevels Array of required security level keys
 * @returns True if all required levels are present, false otherwise
 */
export function checkRequiredSecurityLevels(
  securityLevels: Record<string, unknown>,
  requiredLevels?: string[]
): boolean {
  if (!requiredLevels || requiredLevels.length === 0) {
    return true;
  }

  return requiredLevels.every((level) => level in securityLevels);
}

/**
 * Determine if a widget should be shown based on configuration and security levels
 * @param widgetConfig Widget configuration
 * @param securityLevels Current security levels
 * @returns True if widget should be visible, false otherwise
 */
export function shouldShowWidget(
  widgetConfig: WidgetConfig,
  securityLevels: Record<string, unknown>
): boolean {
  // Early return if widget is explicitly hidden
  if (widgetConfig.visible === false) {
    return false;
  }

  // Check required security levels
  if (widgetConfig.requiredSecurityLevels) {
    return checkRequiredSecurityLevels(
      securityLevels,
      widgetConfig.requiredSecurityLevels
    );
  }

  return true;
}

/**
 * Render a loading indicator for widgets
 * @param testId Test ID for the loading indicator
 * @returns Loading indicator JSX element
 */
export function widgetLoadingIndicator(testId: string) {
  return (
    <div
      data-testid={testId}
      className="flex items-center justify-center p-4 h-full w-full"
    >
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-500"></div>
    </div>
  );
}

/**
 * Render empty state message or children if not empty
 * @param isEmpty Whether the widget is empty
 * @param testId Test ID for the empty state
 * @param children Children to render if not empty
 * @returns Empty state or children
 */
export function widgetEmptyState(
  isEmpty: boolean,
  testId: string,
  children?: ReactNode
) {
  if (isEmpty) {
    return (
      <div
        data-testid={testId}
        className="flex items-center justify-center p-4 h-full w-full text-gray-500 dark:text-gray-400 text-center"
      >
        <div>
          <svg
            className="h-12 w-12 mx-auto mb-3 opacity-50"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={1.5}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <p>No data available</p>
        </div>
      </div>
    );
  }

  return children || null; // Return children if provided, otherwise return null
}

/**
 * Get the test ID for a widget element
 * @param widgetId The widget ID
 * @param elementId The element ID
 * @returns The test ID string
 */
export function getTestId(widgetId: string, elementId: string): string {
  return `${widgetId}-${elementId}`;
}

/**
 * Helper utilities for widget components
 *
 * ## Business Perspective
 *
 * These utilities ensure consistent widget behavior across the dashboard,
 * supporting a unified user experience and reliable security information
 * presentation. The helper functions improve widget maintainability and
 * reduce duplication of business logic. 📊
 *
 * Consistent widget handling improves the overall quality of the security
 * assessment dashboard and makes it more intuitive for users.
 */

/**
 * Get widget grid column span based on widget size
 *
 * @param size - Widget size (small, medium, large, full)
 * @returns CSS grid column span class
 */
export function getWidgetColumnSpan(size: WidgetSizeString): string {
  switch (size) {
    case "small":
      return "col-span-1";
    case "medium":
      return "col-span-2";
    case "large":
      return "col-span-3";
    case "full":
      return "col-span-4";
    default:
      return "col-span-2"; // Default to medium
  }
}

/**
 * Get widget grid row span based on widget height
 *
 * @param height - Widget height (small, medium, large, auto)
 * @returns CSS grid row span class
 */
export function getWidgetRowSpan(
  height: "small" | "medium" | "large" | "auto" = "auto"
): string {
  switch (height) {
    case "small":
      return "row-span-1";
    case "medium":
      return "row-span-2";
    case "large":
      return "row-span-3";
    case "auto":
    default:
      return ""; // No specific row span
  }
}

/**
 * Create a widget configuration
 *
 * @param id - Widget ID
 * @param type - Widget type
 * @param title - Widget title
 * @param size - Widget size
 * @param initialProps - Initial widget props
 * @returns Widget configuration object
 */
export function createWidget(
  id: string,
  type: string,
  title: string,
  size: WidgetSizeString = "medium",
  initialProps: Record<string, unknown> = {}
): Widget {
  return {
    id,
    type,
    title,
    size,
    initialProps,
  };
}

/**
 * Get widget error display component
 *
 * @param message - Error message to display
 * @returns Error component for widget
 */
export function WidgetError({
  message = "An error occurred in this widget",
}: {
  message?: string;
}): React.ReactElement {
  return (
    <div className="p-4 bg-red-50 border border-red-200 rounded-md">
      <h3 className="text-red-800 font-medium mb-2">Widget Error</h3>
      <p className="text-red-600">{message}</p>
    </div>
  );
}

/**
 * Get widget loading display component
 *
 * @returns Loading component for widget
 */
export function WidgetLoading(): React.ReactElement {
  return (
    <div className="flex justify-center items-center h-full min-h-32 p-4">
      <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primary"></div>
    </div>
  );
}

/**
 * Get widget empty state display component
 *
 * @param message - Message to display in empty state
 * @returns Empty state component for widget
 */
export function WidgetEmptyState({
  message = "No data available",
}: {
  message?: string;
}): React.ReactElement {
  return (
    <div className="flex flex-col items-center justify-center h-full min-h-32 p-4 text-gray-500">
      <svg
        className="w-8 h-8 mb-2"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
      <p className="text-center">{message}</p>
    </div>
  );
}

/**
 * Get security level badge component
 *
 * @param level - Security level to display
 * @returns Security level badge component
 */
export function SecurityLevelBadge({
  level,
}: {
  level: SecurityLevel;
}): React.ReactElement {
  // Get color class based on security level
  const getColorClass = (level: SecurityLevel): string => {
    switch (level) {
      case "None":
        return "bg-red-100 text-red-800";
      case "Low":
        return "bg-yellow-100 text-yellow-800";
      case "Moderate":
        return "bg-blue-100 text-blue-800";
      case "High":
        return "bg-green-100 text-green-800";
      case "Very High":
        return "bg-purple-100 text-purple-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const colorClass = getColorClass(level);

  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${colorClass}`}
    >
      {level}
    </span>
  );
}

/**
 * Format security level from any input
 *
 * @param level - Input level that may need normalization
 * @returns Normalized SecurityLevel or default
 */
export function formatSecurityLevel(level: unknown): SecurityLevel {
  if (isSecurityLevel(level)) {
    return level;
  }

  if (typeof level === "string") {
    const normalizedLevel = level.trim();

    if (/^none$/i.test(normalizedLevel)) return "None";
    if (/^low$/i.test(normalizedLevel)) return "Low";
    if (/^(moderate|medium)$/i.test(normalizedLevel)) return "Moderate";
    if (/^high$/i.test(normalizedLevel)) return "High";
    if (/^very\s*high$/i.test(normalizedLevel)) return "Very High";
  }

  return "None";
}

/**
 * Get risk level color class
 *
 * @param riskLevel - Risk level string
 * @returns CSS color class for the risk level
 */
export function getRiskLevelColorClass(riskLevel: string): string {
  if (riskLevel.includes("Critical")) {
    return "text-red-600";
  } else if (riskLevel.includes("High")) {
    return "text-orange-600";
  } else if (riskLevel.includes("Medium")) {
    return "text-yellow-600";
  } else if (riskLevel.includes("Low")) {
    return "text-green-600";
  } else if (riskLevel.includes("Minimal")) {
    return "text-blue-600";
  } else {
    return "text-gray-600";
  }
}

/**
 * Parse and sanitize widget ID
 *
 * @param id - Raw widget ID
 * @returns Sanitized widget ID
 */
export function sanitizeWidgetId(id: string): string {
  return id.toLowerCase().replace(/[^a-z0-9-]/g, "-");
}

/**
 * Creates a consistent key-value display component
 *
 * @param label - Label text
 * @param value - Value to display
 * @param testId - Optional test ID
 * @returns Key-value component
 */
export function KeyValuePair({
  label,
  value,
  testId,
}: {
  label: string;
  value: React.ReactNode;
  testId?: string;
}): React.ReactElement {
  return (
    <div className="flex flex-col mb-2" data-testid={testId}>
      <span className="text-sm text-gray-500">{label}</span>
      <span className="font-medium">{value}</span>
    </div>
  );
}

/**
 * Create a key-value pair with risk level styling
 *
 * @param label - Label text
 * @param value - Risk level value
 * @param testId - Optional test ID
 * @returns Styled risk level component
 */
export function RiskLevelKeyValue({
  label,
  value,
  testId,
}: {
  label: string;
  value: string;
  testId?: string;
}): React.ReactElement {
  const colorClass = getRiskLevelColorClass(value);

  return (
    <div className="flex flex-col mb-2" data-testid={testId}>
      <span className="text-sm text-gray-500">{label}</span>
      <span className={`font-medium ${colorClass}`}>{value}</span>
    </div>
  );
}

/**
 * Handle widget errors and display error message
 *
 * @param error - Error to display
 * @param testId - Test ID for error component
 * @returns Error component or null if no error
 */
export function handleWidgetError(
  error: Error | null | undefined,
  testId: string
): React.ReactNode {
  if (!error) return null;

  return (
    <div
      data-testid={testId}
      className="p-4 bg-red-50 border border-red-200 rounded-md text-red-800"
    >
      <div className="flex items-start">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5 text-red-600 mr-2 mt-0.5"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
            clipRule="evenodd"
          />
        </svg>
        <div>
          <h3 className="text-sm font-medium mb-1">Widget Error</h3>
          <p className="text-sm">{error.message}</p>
        </div>
      </div>
    </div>
  );
}

/**
 * Widget Helper Utilities
 *
 * This module provides essential helper functions for widget components in the CIA Compliance Manager.
 * These utilities provide consistent formatting, validation, and data transformation for security widgets.
 *
 * ## Business Perspective
 *
 * These utilities ensure consistent treatment of security levels and business metrics
 * across all widgets, maintaining integrity of security data representation. 🔒
 *
 * @packageDocumentation
 */

import { getSecurityLevelColorClass } from "./colorUtils";

/**
 * Format security level string for display
 *
 * @param level Security level string that might be in any case format
 * @returns Properly formatted security level
 */
export function formatSecurityLevel(level?: string): string {
  if (!level) return "None";

  // Handle special case for "Very High"
  if (level.toLowerCase() === "very high") return "Very High";

  // First letter uppercase, rest lowercase
  return level.charAt(0).toUpperCase() + level.slice(1).toLowerCase();
}

/**
 * Creates a styled security level component with proper color-coding
 *
 * @param level Security level to display
 * @returns Styled React element with proper security level color
 */
export function SecurityLevelDisplay({
  level,
}: {
  level: SecurityLevel;
}): JSX.Element {
  const colorClass = getSecurityLevelColorClass(level);

  return (
    <span
      className={`font-medium ${colorClass}`}
      data-testid={`security-level-${level.toLowerCase().replace(" ", "-")}`}
    >
      {level}
    </span>
  );
}

/**
 * Convert string to SecurityLevel type
 *
 * @param level String to convert to SecurityLevel
 * @returns Valid SecurityLevel value
 */
export function asSecurityLevel(level?: string): SecurityLevel {
  if (!level) return "None";

  // Normalize the input
  const normalizedLevel = level.trim().toLowerCase();

  // Map to proper SecurityLevel values
  if (normalizedLevel === "none") return "None";
  if (normalizedLevel === "low") return "Low";
  if (normalizedLevel === "moderate" || normalizedLevel === "medium")
    return "Moderate";
  if (normalizedLevel === "high") return "High";
  if (normalizedLevel === "very high") return "Very High";

  // Default fallback
  return "Moderate";
}

/**
 * Get recommended next security level based on current level
 *
 * @param currentLevel Current security level
 * @returns Recommended next level or undefined if already at maximum
 */
export function getRecommendedNextLevel(
  currentLevel: SecurityLevel
): SecurityLevel | undefined {
  const levels: SecurityLevel[] = [
    "None",
    "Low",
    "Moderate",
    "High",
    "Very High",
  ];
  const currentIndex = levels.indexOf(currentLevel);

  if (currentIndex < levels.length - 1) {
    return levels[currentIndex + 1];
  }

  return undefined; // Already at maximum level
}

/**
 * Format numeric values with proper formatting for security metrics
 *
 * @param value Numeric value to format
 * @param prefix Optional prefix to add (e.g., '$')
 * @param suffix Optional suffix to add (e.g., '%')
 * @returns Formatted string
 */
export function formatSecurityMetric(
  value: number,
  prefix = "",
  suffix = ""
): string {
  // Format the number with commas for thousands
  const formattedValue = new Intl.NumberFormat().format(value);
  return `${prefix}${formattedValue}${suffix}`;
}

/**
 * Calculate widget risk level from security levels
 *
 * ## Business Perspective
 *
 * This calculation translates security levels to risk categories
 * which helps organizations understand potential business impacts. 💼
 *
 * @param availabilityLevel Availability security level
 * @param integrityLevel Integrity security level
 * @param confidentialityLevel Confidentiality security level
 * @returns Risk level string
 */
export function calculateWidgetRiskLevel(
  availabilityLevel: SecurityLevel,
  integrityLevel: SecurityLevel,
  confidentialityLevel: SecurityLevel
): string {
  // Convert security levels to numeric values
  const levels = {
    None: 0,
    Low: 1,
    Moderate: 2,
    High: 3,
    "Very High": 4,
  };

  // Calculate average security level
  const avgLevel =
    (levels[availabilityLevel] +
      levels[integrityLevel] +
      levels[confidentialityLevel]) /
    3;

  // Map to risk level
  if (avgLevel < 1) return "Critical";
  if (avgLevel < 2) return "High";
  if (avgLevel < 3) return "Medium";
  if (avgLevel < 4) return "Low";
  return "Minimal";
}
