import * as React from "react";
import { StatusType } from "../../types/common/StatusTypes";

// Single, unified interface definition to fix the "merged declaration" error
export interface StatusBadgeProps {
  /**
   * The status type (determines color)
   */
  status: StatusType;

  /**
   * The content to display inside the badge
   */
  children: React.ReactNode;

  /**
   * Additional CSS classes
   */
  className?: string;

  /**
   * Test ID for automated testing
   */
  testId?: string;

  /**
   * Optional size variant
   */
  size?: "sm" | "md" | "lg";

  /**
   * Badge variant/color scheme
   */
  variant?: "error" | "warning" | "info" | "success" | "neutral" | string;
}

/**
 * Displays a status badge with appropriate colors
 *
 * ## UX Perspective
 *
 * Provides consistent visual indicators of status throughout the
 * application, using color psychology to communicate severity and
 * importance at a glance. 🎨
 */
const StatusBadge: React.FC<StatusBadgeProps> = ({
  status,
  children,
  className = "",
  testId,
  size = "md", // Default to medium size
  variant = "neutral",
}) => {
  // Determine color classes based on status
  const getStatusClasses = () => {
    switch (status) {
      case "success":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:bg-opacity-30 dark:text-green-300";
      case "info":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:bg-opacity-30 dark:text-blue-300";
      case "warning":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:bg-opacity-30 dark:text-yellow-300";
      case "error":
        return "bg-red-100 text-red-800 dark:bg-red-900 dark:bg-opacity-30 dark:text-red-300";
      case "neutral":
        return "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300";
      case "purple":
        return "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:bg-opacity-30 dark:text-purple-300";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300";
    }
  };

  // Determine size classes
  const getSizeClasses = () => {
    switch (size) {
      case "sm":
        return "px-1.5 py-0.5 text-xs";
      case "lg":
        return "px-3 py-1.5 text-sm";
      default: // md
        return "px-2 py-1 text-xs";
    }
  };

  // Get appropriate color class based on status
  const colorClass = getColorClass(status);

  return (
    <span
      className={`font-medium rounded-md ${getStatusClasses()} ${getSizeClasses()} ${colorClass} ${className}`}
      data-testid={testId}
    >
      {children}
    </span>
  );
};

/**
 * Get color class based on status type
 */
function getColorClass(status: StatusType): string {
  switch (status) {
    case "error":
      return "bg-red-100 text-red-800 dark:bg-red-900 dark:bg-opacity-20 dark:text-red-300";
    case "warning":
      return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:bg-opacity-20 dark:text-yellow-300";
    case "info":
      return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:bg-opacity-20 dark:text-blue-300";
    case "success":
      return "bg-green-100 text-green-800 dark:bg-green-900 dark:bg-opacity-20 dark:text-green-300";
    case "neutral":
    default:
      return "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300";
  }
}

export default StatusBadge;
// Use imported types rather than redefining them
export type { StatusType };
