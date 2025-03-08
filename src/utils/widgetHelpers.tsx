import React, { ReactNode } from "react";
import { SECURITY_LEVELS } from "../constants/appConstants";

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
 * Gets the appropriate CSS class for a given security level
 * @param level The security level string
 * @returns CSS class string for the security level
 */
export function getSecurityLevelClass(level: string): string {
  const severity = mapSecurityLevelToSeverity(level);

  switch (severity) {
    case "very-high":
      return "text-purple-600 dark:text-purple-400 font-bold";
    case "high":
      return "text-green-600 dark:text-green-400 font-bold";
    case "moderate":
      return "text-blue-600 dark:text-blue-400";
    case "low":
      return "text-yellow-600 dark:text-yellow-400";
    case "none":
    default:
      return "text-gray-700 dark:text-gray-400";
  }
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
  }

  return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300";
}

/**
 * Safely normalizes a security level string to a standard format
 * @param level The security level string to normalize
 * @returns A normalized security level string
 */
export function normalizeSecurityLevel(level?: string): string {
  if (!level) return SECURITY_LEVELS.NONE;

  // Handle case variations
  const normalized = level.trim();

  // Check against valid security levels
  const validLevels = Object.values(SECURITY_LEVELS);
  if (validLevels.includes(normalized as any)) {
    return normalized;
  }

  // Try to match regardless of case
  for (const validLevel of validLevels) {
    if (normalized.toLowerCase() === validLevel.toLowerCase()) {
      return validLevel;
    }
  }

  return SECURITY_LEVELS.NONE;
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
 * @param testId Optional test ID for the error element
 * @returns JSX element for displaying the error
 */
export function handleWidgetError(
  error: Error | null,
  testId?: string
): ReactNode {
  if (!error) return null;

  return React.createElement(
    "div",
    {
      className: "text-red-500 p-4 border border-red-200 rounded-md",
      "data-testid": testId || "widget-error",
      role: "alert",
    },
    [
      React.createElement(
        "div",
        { className: "font-bold mb-1", key: "title" },
        "Error"
      ),
      React.createElement(
        "div",
        { className: "text-sm", key: "message" },
        error.message
      ),
    ]
  );
}

/**
 * Creates a loading indicator for widgets in loading state
 * @param testId Optional test ID for the loading element
 * @returns JSX element for displaying a loading state
 */
export function widgetLoadingIndicator(testId?: string): ReactNode {
  return React.createElement(
    "div",
    {
      className: "flex items-center justify-center h-32",
      "data-testid": testId || "widget-loading",
      role: "status",
      "aria-label": "Loading widget content",
    },
    [
      React.createElement("div", {
        className:
          "animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500",
        key: "spinner",
      }),
      React.createElement(
        "span",
        { className: "sr-only", key: "text" },
        "Loading..."
      ),
    ]
  );
}

/**
 * Creates an empty state indicator for widgets with no data
 * @param message Custom message for the empty state
 * @param testId Optional test ID for the empty state element
 * @returns JSX element for displaying an empty state
 */
export function widgetEmptyState(message?: string, testId?: string): ReactNode {
  return React.createElement(
    "div",
    {
      className: "flex flex-col items-center justify-center h-32 text-gray-500",
      "data-testid": testId || "widget-empty-state",
    },
    [
      React.createElement(
        "svg",
        {
          className: "w-12 h-12 mb-2 opacity-50",
          fill: "none",
          stroke: "currentColor",
          viewBox: "0 0 24 24",
          xmlns: "http://www.w3.org/2000/svg",
          key: "icon",
        },
        [
          React.createElement("path", {
            strokeLinecap: "round",
            strokeLinejoin: "round",
            strokeWidth: 2,
            d: "M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z",
            key: "path",
          }),
        ]
      ),
      React.createElement(
        "p",
        { className: "text-center text-sm", key: "message" },
        message || "No data available"
      ),
    ]
  );
}
