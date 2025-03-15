import React, { ReactNode } from "react";
import { COMMON_COMPONENT_TEST_IDS } from "../../constants/testIds";

export type StatusBadgeVariant =
  | "neutral"
  | "success"
  | "warning"
  | "error"
  | "info"
  | "purple";

export type StatusBadgeSize = "xs" | "sm" | "md" | "lg";

interface StatusBadgeProps {
  status: StatusBadgeVariant;
  children: ReactNode;
  className?: string;
  size?: StatusBadgeSize;
  testId?: string;
}

/**
 * StatusBadge displays statuses and labels with consistent styling
 * Enhanced with Ingress-style visual effects in dark mode
 */
const StatusBadge: React.FC<StatusBadgeProps> = ({
  status = "neutral",
  children,
  className = "",
  size = "md",
  testId = COMMON_COMPONENT_TEST_IDS.STATUS_BADGE,
}) => {
  // Get base classes for the badge
  const getBaseClasses = () => {
    const baseClasses = [
      "inline-flex",
      "items-center",
      "justify-center",
      "rounded-full",
      "font-medium",
      "status-badge",
    ];

    // Add size-specific classes
    switch (size) {
      case "xs":
        baseClasses.push("text-xs", "py-0.5", "px-2");
        break;
      case "sm":
        baseClasses.push("text-xs", "py-1", "px-2");
        break;
      case "lg":
        baseClasses.push("text-sm", "py-2", "px-4", "font-bold");
        break;
      case "md":
      default:
        baseClasses.push("text-sm", "py-1", "px-3");
    }

    return baseClasses.join(" ");
  };

  // Get variant-specific styling
  const getVariantClasses = () => {
    // Define the classes for each variant
    const variantMap: Record<StatusBadgeVariant, string> = {
      success:
        "bg-green-100 text-green-800 dark:bg-green-900 dark:bg-opacity-20 dark:text-green-300 success",
      warning:
        "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:bg-opacity-20 dark:text-yellow-300 warning",
      error:
        "bg-red-100 text-red-800 dark:bg-red-900 dark:bg-opacity-20 dark:text-red-300 error",
      info: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:bg-opacity-20 dark:text-blue-300 info",
      purple:
        "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:bg-opacity-20 dark:text-purple-300 purple",
      neutral:
        "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:bg-opacity-50 dark:text-gray-300 neutral",
    };

    return variantMap[status] || variantMap.neutral;
  };

  return (
    <span
      data-testid={testId}
      data-status={status}
      className={`${getBaseClasses()} ${getVariantClasses()} ${className}`}
    >
      {children}
    </span>
  );
};

export default StatusBadge;
