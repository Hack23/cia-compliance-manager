import React, { ReactNode } from "react";
import { COMMON_COMPONENT_TEST_IDS } from "../../constants/testIds";

export type StatusBadgeProps = {
  status: "info" | "success" | "warning" | "error" | "neutral" | "purple";
  children: ReactNode;
  size?: "xs" | "sm" | "md" | "lg";
  className?: string;
  testId?: string;
  style?: React.CSSProperties;
};

const StatusBadge: React.FC<StatusBadgeProps> = ({
  status,
  children,
  size = "md",
  className = "",
  testId = COMMON_COMPONENT_TEST_IDS.STATUS_BADGE,
  style,
}) => {
  const getStatusColors = () => {
    switch (status) {
      case "info":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300";
      case "success":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300";
      case "warning":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300";
      case "error":
        return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300";
      case "purple":
        return "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300";
      case "neutral":
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300";
    }
  };

  const getSizeClasses = () => {
    switch (size) {
      case "xs":
        return "text-xs py-0.5 px-1.5";
      case "sm":
        return "text-xs py-1 px-2";
      case "lg":
        return "text-lg py-1.5 px-3";
      case "md":
      default:
        return "text-xs py-1 px-2.5";
    }
  };

  return (
    <span
      className={`inline-flex items-center font-medium rounded-full ${getStatusColors()} ${getSizeClasses()} ${className}`}
      data-testid={testId}
      style={style}
    >
      {children}
    </span>
  );
};

export default StatusBadge;
