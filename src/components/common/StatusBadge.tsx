import React, { ReactNode } from "react";

export type StatusBadgeVariant =
  | "success"
  | "warning"
  | "error"
  | "info"
  | "purple"
  | "neutral";

interface StatusBadgeProps {
  status: StatusBadgeVariant;
  children: ReactNode;
  className?: string;
  testId?: string;
  size?: "xs" | "sm" | "md" | "lg";
}

/**
 * Consistent status badge component for displaying status indicators
 *
 * Used for showing security levels, compliance status, risk levels, etc.
 */
const StatusBadge: React.FC<StatusBadgeProps> = ({
  status,
  children,
  className = "",
  testId,
  size = "md",
}) => {
  // Status variant styling
  const variants = {
    success:
      "bg-green-100 text-green-800 border-green-300 dark:bg-green-900 dark:bg-opacity-40 dark:text-green-300 dark:border-green-700",
    warning:
      "bg-yellow-100 text-yellow-800 border-yellow-300 dark:bg-yellow-900 dark:bg-opacity-40 dark:text-yellow-300 dark:border-yellow-700",
    error:
      "bg-red-100 text-red-800 border-red-300 dark:bg-red-900 dark:bg-opacity-40 dark:text-red-300 dark:border-red-700",
    info: "bg-blue-100 text-blue-800 border-blue-300 dark:bg-blue-900 dark:bg-opacity-40 dark:text-blue-300 dark:border-blue-700",
    purple:
      "bg-purple-100 text-purple-800 border-purple-300 dark:bg-purple-900 dark:bg-opacity-40 dark:text-purple-300 dark:border-purple-700",
    neutral:
      "bg-gray-100 text-gray-800 border-gray-300 dark:bg-gray-700 dark:text-gray-200 dark:border-gray-600",
  };

  // Size classes
  const sizeClasses = {
    xs: "text-xs px-1.5 py-0.5 rounded",
    sm: "text-xs px-2 py-1 rounded-md",
    md: "text-sm px-2.5 py-1 rounded-md",
    lg: "text-sm px-3 py-1.5 rounded-md",
  };

  return (
    <span
      className={`inline-flex items-center font-medium border ${variants[status]} ${sizeClasses[size]} ${className}`}
      data-testid={testId}
    >
      {children}
    </span>
  );
};

export default StatusBadge;
