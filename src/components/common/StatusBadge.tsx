import React from "react";

// Define the allowed badge variants explicitly
export type StatusBadgeVariant = "error" | "warning" | "info" | "success" | "neutral" | "purple";

// Define the allowed sizes
export type StatusBadgeSize = "xs" | "sm" | "md" | "lg";

interface StatusBadgeProps {
  status: StatusBadgeVariant;
  children: React.ReactNode;
  testId?: string;
  className?: string;
  size?: StatusBadgeSize; // Add size prop
}

/**
 * Status badge component for displaying various status indicators
 * 
 * ## Business Perspective
 * 
 * This component provides visual risk indicators that help business stakeholders
 * quickly identify and prioritize security issues based on their severity. 🎯
 * 
 * @param props Component props
 * @returns React component
 */
const StatusBadge: React.FC<StatusBadgeProps> = ({
  status,
  children,
  testId,
  className = "",
  size = "sm", // Default to "sm"
}) => {
  // Map size to text size classes
  const getSizeClasses = (): string => {
    switch (size) {
      case "xs": return "text-xs";
      case "sm": return "text-sm";
      case "md": return "text-md";
      case "lg": return "text-base";
      default: return "text-sm";
    }
  };
  
  // Map status to appropriate color classes
  const getStatusClasses = (): string => {
    switch (status) {
      case "error":
        return "bg-red-100 text-red-800 border-red-300 dark:bg-red-900 dark:bg-opacity-30 dark:text-red-300 dark:border-red-800";
      case "warning":
        return "bg-yellow-100 text-yellow-800 border-yellow-300 dark:bg-yellow-900 dark:bg-opacity-30 dark:text-yellow-300 dark:border-yellow-800";
      case "info":
        return "bg-blue-100 text-blue-800 border-blue-300 dark:bg-blue-900 dark:bg-opacity-30 dark:text-blue-300 dark:border-blue-800";
      case "success":
        return "bg-green-100 text-green-800 border-green-300 dark:bg-green-900 dark:bg-opacity-30 dark:text-green-300 dark:border-green-800";
      case "purple":
        return "bg-purple-100 text-purple-800 border-purple-300 dark:bg-purple-900 dark:bg-opacity-30 dark:text-purple-300 dark:border-purple-800";
      case "neutral":
      default:
        return "bg-gray-100 text-gray-800 border-gray-300 dark:bg-gray-800 dark:bg-opacity-50 dark:text-gray-300 dark:border-gray-700";
    }
  };

  const baseClasses = "px-2 py-1 font-medium rounded border";

  return (
    <span
      className={`${baseClasses} ${getSizeClasses()} ${getStatusClasses()} ${className}`}
      data-testid={testId}
    >
      {children}
    </span>
  );
};

export default StatusBadge;
