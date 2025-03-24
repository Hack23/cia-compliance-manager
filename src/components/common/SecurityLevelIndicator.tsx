import React from "react";
import { SecurityLevel } from "../../types/cia";

interface SecurityLevelIndicatorProps {
  /**
   * The security level to display
   */
  level: SecurityLevel;

  /**
   * Size variant
   */
  size?: "sm" | "md" | "lg";

  /**
   * Optional CSS class name
   */
  className?: string;

  /**
   * Optional test ID for testing
   */
  testId?: string;
}

/**
 * A simple indicator that displays a security level with appropriate color
 *
 * ## UX Perspective
 *
 * Provides consistent visual indicators of security levels using
 * color psychology to communicate the level of security provided. 🎨
 */
const SecurityLevelIndicator: React.FC<SecurityLevelIndicatorProps> = ({
  level,
  size = "md",
  className = "",
  testId,
}) => {
  // Determine color based on level
  const getColor = (): string => {
    switch (level) {
      case "None":
        return "bg-red-100 text-red-800 dark:bg-red-900 dark:bg-opacity-20 dark:text-red-300";
      case "Low":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:bg-opacity-20 dark:text-yellow-300";
      case "Moderate":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:bg-opacity-20 dark:text-blue-300";
      case "High":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:bg-opacity-20 dark:text-green-300";
      case "Very High":
        return "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:bg-opacity-20 dark:text-purple-300";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300";
    }
  };

  // Determine size classes
  const getSizeClasses = (): string => {
    switch (size) {
      case "sm":
        return "px-1.5 py-0.5 text-xs";
      case "lg":
        return "px-3 py-1.5 text-sm";
      default: // md
        return "px-2 py-1 text-xs";
    }
  };

  return (
    <span
      className={`font-medium rounded-md ${getColor()} ${getSizeClasses()} ${className}`}
      data-testid={testId}
    >
      {level}
    </span>
  );
};

export default SecurityLevelIndicator;
