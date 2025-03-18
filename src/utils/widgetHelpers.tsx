import { ReactNode } from "react";
import { SECURITY_LEVELS } from "../constants/appConstants";
import { WIDGET_ICONS, WIDGET_TITLES } from "../constants/coreConstants";
import { SecurityLevel } from "../types/cia";
import { WidgetConfig, WidgetSize, WidgetSizePreset } from "../types/widget";
import { getSecurityLevelValue } from "./securityLevelUtils";

/**
 * Widget error handling utility
 * Creates an error display component
 */
export function handleWidgetError(
  error: Error | null | undefined,
  testId?: string
): React.ReactElement | null {
  // Return null when error is null or undefined
  if (!error) {
    return null;
  }

  return (
    <div
      className="w-full h-full flex flex-col items-center justify-center p-4 text-center"
      data-testid={testId}
    >
      <div className="text-red-500 dark:text-red-400 text-xl mb-2">
        {/* Replace ExclamationTriangleIcon with simple SVG or emoji */}
        <span role="img" aria-label="Warning" className="inline h-5 w-5 mr-2">⚠️</span>
        <span>Error</span>
      </div>
      <p className="text-gray-700 dark:text-gray-300">{error.message}</p>
      <p className="text-gray-500 dark:text-gray-400 text-sm mt-2">
        Please try refreshing the page or contact support if the problem persists.
      </p>
    </div>
  );
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
export function formatSecurityLevel(level?: string): string {
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
export function getWidgetSize(widget: Partial<WidgetConfig>): WidgetSize {
  // Use explicit width and height if provided
  if (widget.width !== undefined && widget.height !== undefined) {
    return { width: widget.width, height: widget.height };
  }

  // Get dimensions based on size preset
  switch (widget.size) {
    case WidgetSizePreset.SMALL:
      return { width: 1, height: 1 };
    case WidgetSizePreset.LARGE:
      return { width: 2, height: 2 };
    case "extraLarge":
    case WidgetSizePreset.EXTRA_LARGE:
      return { width: 4, height: 2 };
    case "fullWidth":
    case WidgetSizePreset.FULL_WIDTH:
      return { width: 4, height: 1 };
    case WidgetSizePreset.MEDIUM:
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
