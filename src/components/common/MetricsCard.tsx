import React from "react";

export type MetricsCardVariant =
  | "default"
  | "success"
  | "warning"
  | "error"
  | "info"
  | "purple";

interface MetricsCardProps {
  title: string;
  value: string | number;
  icon?: string;
  variant?: MetricsCardVariant;
  accentColor?: string;
  className?: string;
  testId?: string;
  compact?: boolean;
}

/**
 * Consistent metrics card component for displaying key metrics and values
 *
 * @param props Component properties
 * @returns Rendered component
 */
const MetricsCard: React.FC<MetricsCardProps> = ({
  title,
  value,
  icon,
  variant = "default",
  accentColor,
  className = "",
  testId,
  compact = false,
}) => {
  // Color variants
  const variants = {
    default: {
      bg: "bg-gray-50 dark:bg-gray-800",
      text: "text-gray-800 dark:text-gray-200",
      border: "border-gray-200 dark:border-gray-700",
    },
    success: {
      bg: "bg-green-50 dark:bg-green-900 dark:bg-opacity-20",
      text: "text-green-700 dark:text-green-300",
      border: "border-green-200 dark:border-green-800",
    },
    warning: {
      bg: "bg-yellow-50 dark:bg-yellow-900 dark:bg-opacity-20",
      text: "text-yellow-700 dark:text-yellow-300",
      border: "border-yellow-200 dark:border-yellow-800",
    },
    error: {
      bg: "bg-red-50 dark:bg-red-900 dark:bg-opacity-20",
      text: "text-red-700 dark:text-red-300",
      border: "border-red-200 dark:border-red-800",
    },
    info: {
      bg: "bg-blue-50 dark:bg-blue-900 dark:bg-opacity-20",
      text: "text-blue-700 dark:text-blue-300",
      border: "border-blue-200 dark:border-blue-800",
    },
    purple: {
      bg: "bg-purple-50 dark:bg-purple-900 dark:bg-opacity-20",
      text: "text-purple-700 dark:text-purple-300",
      border: "border-purple-200 dark:border-purple-800",
    },
  };

  const { bg, text, border } = variants[variant];
  const padding = compact ? "p-3" : "p-4";

  return (
    <div
      className={`${bg} rounded-lg border ${border} ${padding} shadow-sm ${className}`}
      data-testid={testId}
      style={
        accentColor
          ? { borderLeftColor: accentColor, borderLeftWidth: "4px" }
          : undefined
      }
    >
      <div className="flex items-center justify-between">
        <div className="text-sm font-medium text-gray-500 dark:text-gray-400">
          {title}
        </div>
        {icon && <div className="text-xl">{icon}</div>}
      </div>
      <div className={`text-xl font-bold mt-2 ${text}`}>{value}</div>
    </div>
  );
};

export default MetricsCard;
