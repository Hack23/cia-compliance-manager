import React, { ReactNode } from "react";
import { getSecurityLevelColorPair } from "../constants/colorConstants";
import { WIDGET_ICONS, WIDGET_TITLES } from "../constants/coreConstants";
import { SecurityLevel } from "../types/cia";
import {
  getSecurityLevelClass,
  getSecurityLevelValue,
  normalizeSecurityLevel,
} from "./securityLevelUtils";

// Define WidgetConfig and WidgetType for local use since they're not exported from types/widgets
export interface WidgetConfig {
  type: string;
  title?: string;
  description?: string;
  icon?: string;
  priority?: number;
  visible?: boolean;
  size?: string;
  minSecurityLevel?: number | string;
  maxSecurityLevel?: number | string;
}

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

// Define WidgetSizePreset enum - re-added
export enum WidgetSizePreset {
  DEFAULT = "medium",
  SMALL = "small",
  MEDIUM = "medium",
  LARGE = "large",
  FULL = "full",
}

/**
 * Types of security level severities for UI formatting
 */
export type SecuritySeverity =
  | "none"
  | "low"
  | "moderate"
  | "high"
  | "very-high";

/**
 * Maps a security level string to a standardized severity type for UI consistency
 * @param level The security level string
 * @returns A standardized severity type for UI formatting
 */
export function mapSecurityLevelToSeverity(level: string): SecuritySeverity {
  const normalizedLevel = level.toLowerCase();

  if (normalizedLevel.includes("very") && normalizedLevel.includes("high")) {
    return "very-high";
  } else if (normalizedLevel.includes("high")) {
    return "high";
  } else if (
    normalizedLevel.includes("moderate") ||
    normalizedLevel.includes("medium")
  ) {
    return "moderate";
  } else if (normalizedLevel.includes("low")) {
    return "low";
  }

  return "none";
}

/**
 * Gets color hex values for a security level directly from constants
 * @param level The security level string
 * @returns Object with background and text colors
 */
export function getSecurityLevelColors(level: SecurityLevel): {
  bg: string;
  text: string;
} {
  const normalizedLevel = normalizeSecurityLevel(level) as SecurityLevel;

  // Use the centralized color function instead of reimplementing the logic
  return getSecurityLevelColorPair(normalizedLevel);
}

/**
 * Gets the appropriate badge class for a security risk level
 * @param risk The risk level string
 * @returns CSS class string for the risk badge
 */
export function getRiskBadgeClass(risk: string): string {
  const normalizedRisk = risk.toLowerCase();

  if (normalizedRisk.includes("critical")) {
    return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300";
  } else if (normalizedRisk.includes("high")) {
    return "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300";
  } else if (
    normalizedRisk.includes("medium") ||
    normalizedRisk.includes("moderate")
  ) {
    return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300";
  } else if (normalizedRisk.includes("low")) {
    return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300";
  } else if (normalizedRisk.includes("minimal")) {
    return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300";
  }

  return "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300";
}

/**
 * Convert any string to a valid SecurityLevel
 * @param level String to convert to SecurityLevel
 * @returns Valid SecurityLevel value
 */
export function asSecurityLevel(level?: string): SecurityLevel {
  // Delegate to the implementation in securityLevelUtils
  return normalizeSecurityLevel(level);
}

/**
 * Creates formatted JSX for displaying a security level with appropriate styling
 * @param level The security level to display
 * @param withLabel Whether to include a label with the value
 * @returns JSX element with appropriate styling
 */
export function formatSecurityLevel(
  level: string,
  withLabel = false
): ReactNode {
  const normalizedLevel = normalizeSecurityLevel(level);
  const levelClass = getSecurityLevelClass(normalizedLevel);

  return React.createElement(
    "span",
    {
      className: `font-medium ${levelClass}`,
      "aria-label": `Security level: ${normalizedLevel}`,
    },
    `${normalizedLevel}${withLabel ? " Security" : ""}`
  );
}

/**
 * Error handler for widget rendering that returns appropriate UI for error states
 * @param error The error object
 * @param testIdOrWidgetId Optional test ID for the error element or widget ID that failed
 * @returns JSX element for displaying the error
 */
export function handleWidgetError(
  error: Error | null,
  testIdOrWidgetId?: string
): ReactNode {
  if (!error) return null;

  // Log the error if a widget ID was provided
  if (testIdOrWidgetId && !testIdOrWidgetId.startsWith("test-")) {
    console.error(`Widget ${testIdOrWidgetId} error:`, error);
  }

  return (
    <div
      className="widget-error p-4 bg-red-50 text-red-700 rounded-lg"
      data-testid={
        testIdOrWidgetId?.startsWith("test-")
          ? testIdOrWidgetId
          : "widget-error"
      }
      role="alert"
    >
      <h3 className="font-medium">Widget Error</h3>
      <p className="text-sm">{error.message}</p>
    </div>
  );
}

/**
 * Creates an empty state indicator for widgets with no data
 * @param message Custom message for the empty state
 * @param testId Optional test ID for the empty state element
 * @returns JSX element for displaying an empty state
 */
export function widgetEmptyState(message?: string, testId?: string): ReactNode {
  return (
    <div
      className="widget-empty-state p-4 text-center text-gray-500"
      data-testid={testId || "widget-empty-state"}
    >
      <p>{message || "No data available"}</p>
    </div>
  );
}

/**
 * Creates a loading indicator for widgets in loading state
 * @param messageOrTestId Optional message or test ID
 * @param testId Optional test ID (used when first param is a message)
 * @returns JSX element for displaying a loading state
 */
export function widgetLoadingIndicator(
  messageOrTestId?: string,
  testId?: string
): ReactNode {
  // If two params are provided, first is message, second is testId
  // If only one param is provided, check if it looks like a testId
  let message = "Loading...";
  let actualTestId = "widget-loading";

  if (testId) {
    // If testId is provided, messageOrTestId is the message
    message = messageOrTestId || "Loading...";
    actualTestId = testId;
  } else if (messageOrTestId) {
    // If only messageOrTestId is provided, check if it looks like a testId
    if (messageOrTestId.includes("-")) {
      actualTestId = messageOrTestId;
    } else {
      message = messageOrTestId;
    }
  }

  return (
    <div
      className="widget-loading p-4 text-center text-gray-500"
      data-testid={actualTestId}
      role="status"
      aria-label="Loading widget content"
    >
      <p>{message}</p>
    </div>
  );
}

/**
 * Get the title for a widget type
 * @param type The widget type
 * @returns The title or a default value
 */
export const getWidgetTitle = (type: WidgetType | string): string =>
  WIDGET_TITLES[type as keyof typeof WIDGET_TITLES] || "Unknown Widget";

/**
 * Get the icon for a widget type
 * @param type The widget type
 * @returns The icon or a default value
 */
export const getWidgetIcon = (type: WidgetType | string): string =>
  WIDGET_ICONS[type as keyof typeof WIDGET_ICONS] || "help_outline";

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
  config: Partial<WidgetConfig> & { type: WidgetType | string }
): WidgetConfig => ({
  type: config.type,
  title: config.title || getWidgetTitle(config.type),
  description: config.description || getWidgetDescription(config.type),
  icon: config.icon || getWidgetIcon(config.type),
  priority: config.priority || 0,
  visible: config.visible !== undefined ? config.visible : true,
  size: config.size || WidgetSizePreset.DEFAULT,
});

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
 * Get the size for a widget
 * @param widget Widget configuration
 * @returns Widget size or default size
 */
export const getWidgetSize = (widget: WidgetConfig): string =>
  widget.size || WidgetSizePreset.DEFAULT;
