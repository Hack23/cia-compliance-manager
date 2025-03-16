import { ReactNode } from "react";
import { SECURITY_LEVELS } from "../../../constants/appConstants";
import { WIDGET_ICONS, WIDGET_TITLES } from "../../../constants/coreConstants";
import { SecurityLevel } from "../../../types/cia";
import {
  WidgetConfig,
  WidgetSize,
  WidgetSizePreset,
} from "../../../types/widget";
import { getSecurityLevelValue } from "../../../utils/securityLevelUtils";

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
  const size = config.size || WidgetSizePreset.MEDIUM; // Use MEDIUM instead of DEFAULT
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
 * Render an error message for widgets
 * @param error Error object
 * @param testId Test ID for the error message
 * @returns Error message JSX element or null if no error
 */
export function handleWidgetError(error: Error | null, testId: string) {
  if (!error) return null;

  return (
    <div
      data-testid={testId}
      className="bg-red-50 dark:bg-red-900 dark:bg-opacity-20 border-l-4 border-red-500 p-4"
    >
      <div className="flex items-center">
        <div className="flex-shrink-0">
          <svg
            className="h-5 w-5 text-red-500"
            viewBox="0 0 20 20"
            fill="currentColor"
            aria-hidden="true"
          >
            <path
              fillRule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.28 7.22a.75.75 0 00-1.06 1.06L8.94 10l-1.72 1.72a.75.75 0 101.06 1.06L10 11.06l1.72 1.72a.75.75 0 101.06-1.06L11.06 10l1.72-1.72a.75.75 0 00-1.06-1.06L10 8.94 8.28 7.22z"
              clipRule="evenodd"
            />
          </svg>
        </div>
        <div className="ml-3">
          <h3
            className="text-sm font-medium text-red-800 dark:text-red-200"
            role="alert"
          >
            Widget Error
          </h3>
          <div className="mt-2 text-sm text-red-700 dark:text-red-300">
            <p>{error.message}</p>
          </div>
        </div>
      </div>
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
 * Normalize security level string to SecurityLevel type
 * @param level Security level string
 * @returns Normalized SecurityLevel value
 */
export function normalizeSecurityLevel(level: string): SecurityLevel {
  // Convert the provided level to the normalized form
  const normalizedLevel = level.toLowerCase();
  const validLevels: SecurityLevel[] = [
    "None",
    "Low",
    "Moderate",
    "High",
    "Very High",
  ];

  for (const validLevel of validLevels) {
    if (normalizedLevel === validLevel.toLowerCase()) {
      return validLevel;
    }
  }

  return "None";
}

// Helper function to calculate overall security level
import { calculateOverallSecurityLevel } from "../../../types/cia";

/**
 * Helper to determine widget size class based on size prop
 */
export const getWidgetSizeClass = (size?: string): string => {
  switch (size) {
    case "small":
      return "widget-col-4";
    case "medium":
      return "widget-col-6";
    case "large":
      return "widget-col-8";
    case "full":
      return "widget-col-12";
    default:
      return "widget-col-4";
  }
};

/**
 * Helper to create dynamic test IDs for widgets
 */
export const createWidgetTestId = (baseId: string, suffix?: string): string => {
  return suffix ? `${baseId}-${suffix}` : baseId;
};

/**
 * Interface for widget props
 */
export interface WidgetProps {
  title: string;
  icon?: keyof typeof WIDGET_ICONS | string;
  className?: string;
  size?: "small" | "medium" | "large" | "full";
  children?: ReactNode;
  testId?: string;
  withBorder?: boolean;
  withShadow?: boolean;
  withPadding?: boolean;
  headerContent?: ReactNode;
}

/**
 * Helper to prepare security level props for widgets
 */
export const prepareSecurityLevelProps = (
  availabilityLevel?: string,
  integrityLevel?: string,
  confidentialityLevel?: string
) => {
  const safeAvailability = availabilityLevel || "None";
  const safeIntegrity = integrityLevel || "None";
  const safeConfidentiality = confidentialityLevel || "None";

  const securityLevel = calculateOverallSecurityLevel(
    safeAvailability as SecurityLevel,
    safeIntegrity as SecurityLevel,
    safeConfidentiality as SecurityLevel
  );

  return {
    securityLevel,
    availabilityLevel: safeAvailability,
    integrityLevel: safeIntegrity,
    confidentialityLevel: safeConfidentiality,
  };
};

/**
 * Helper to resolve widget icon
 *
 * @param icon - Icon key or emoji string
 * @returns The resolved icon
 */
export const resolveWidgetIcon = (
  icon?: keyof typeof WIDGET_ICONS | string
): string => {
  if (!icon) return "📊"; // Default icon

  // If it's a key in WIDGET_ICONS, return the corresponding emoji
  if (typeof icon === "string" && icon in WIDGET_ICONS) {
    return WIDGET_ICONS[icon as keyof typeof WIDGET_ICONS];
  }

  // If it's already an emoji or another string, return it directly
  return icon;
};
