import React, { useEffect, useState } from "react";
import { COMMON_COMPONENT_TEST_IDS } from "../../constants/testIds";

export interface MetricsCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon?: string;
  className?: string;
  testId?: string;
  accentColor?: string;
  // Add properties needed by test files
  trend?: {
    value: string;
    direction: "up" | "down" | "neutral";
  };
  variant?: "primary" | "success" | "warning" | "danger" | "info" | "purple";
}

/**
 * MetricsCard displays a metric with title, value, and optional trend indicator
 *
 * @category UI Components
 * @param props - Component properties
 * @returns Rendered component
 */
const MetricsCard: React.FC<MetricsCardProps> = ({
  title,
  value,
  subtitle,
  icon,
  className = "",
  testId = COMMON_COMPONENT_TEST_IDS.METRICS_CARD,
  accentColor,
  trend,
  variant = "primary",
}) => {
  const [displayValue, setDisplayValue] = useState("0");
  // Convert value to string for processing
  const valueString = String(value);
  const numericValue = parseInt(valueString.replace(/\D/g, "")) || 0;

  useEffect(() => {
    // Animate numeric values
    if (numericValue > 0) {
      const duration = 1500; // 1.5 seconds
      const steps = 20;
      const stepTime = duration / steps;
      const increment = numericValue / steps;

      let current = 0;
      const timer = setInterval(() => {
        current += increment;
        if (current >= numericValue) {
          setDisplayValue(String(value));
          clearInterval(timer);
        } else {
          // Format like original but with current value
          let formattedValue;
          if (valueString.includes("$")) {
            formattedValue = `$${Math.round(current).toLocaleString()}`;
            // Preserve suffix like "/year" if present
            if (valueString.includes("/")) {
              formattedValue += "/" + valueString.split("/")[1];
            }
          } else {
            formattedValue = Math.round(current).toString();
            // Add % if the original value has it
            if (valueString.includes("%")) {
              formattedValue += "%";
            }
          }
          setDisplayValue(formattedValue);
        }
      }, stepTime);

      return () => clearInterval(timer);
    } else {
      setDisplayValue(String(value));
    }
  }, [value, numericValue, valueString]);

  const getVariantClasses = () => {
    switch (variant) {
      case "success":
        return "bg-green-100 dark:bg-green-900 dark:bg-opacity-20 border-green-200 dark:border-green-800";
      case "warning":
        return "bg-yellow-100 dark:bg-yellow-900 dark:bg-opacity-20 border-yellow-200 dark:border-yellow-800";
      case "danger":
        return "bg-red-100 dark:bg-red-900 dark:bg-opacity-20 border-red-200 dark:border-red-800";
      case "info":
        return "bg-blue-100 dark:bg-blue-900 dark:bg-opacity-20 border-blue-200 dark:border-blue-800";
      case "purple":
        return "bg-purple-100 dark:bg-purple-900 dark:bg-opacity-20 border-purple-200 dark:border-purple-800";
      default:
        return "bg-blue-50 dark:bg-blue-900 dark:bg-opacity-10 border-blue-100 dark:border-blue-800";
    }
  };

  const getValueColor = () => {
    switch (variant) {
      case "success":
        return "text-green-700 dark:text-green-400";
      case "warning":
        return "text-yellow-700 dark:text-yellow-400";
      case "danger":
        return "text-red-700 dark:text-red-400";
      case "info":
        return "text-blue-700 dark:text-blue-400";
      case "purple":
        return "text-purple-700 dark:text-purple-400";
      default:
        return "text-blue-700 dark:text-blue-400";
    }
  };

  return (
    <div
      className={`p-4 rounded-lg border ${getVariantClasses()} ${className}`}
      data-testid={testId}
    >
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center">
          {icon && <span className="mr-2 text-xl">{icon}</span>}
          <h3
            className="text-sm font-medium text-gray-600 dark:text-gray-300"
            data-testid={COMMON_COMPONENT_TEST_IDS.METRICS_CARD_TITLE}
          >
            {title}
          </h3>
        </div>
        {trend && (
          <div
            className={`text-xs px-1.5 py-0.5 rounded ${
              trend.direction === "up"
                ? "bg-green-100 text-green-700 dark:bg-green-900 dark:bg-opacity-30 dark:text-green-400"
                : trend.direction === "down"
                ? "bg-red-100 text-red-700 dark:bg-red-900 dark:bg-opacity-30 dark:text-red-400"
                : "bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-400"
            }`}
            data-testid={COMMON_COMPONENT_TEST_IDS.METRICS_CARD_TREND}
          >
            {trend.value}
          </div>
        )}
      </div>
      <div className="flex items-end justify-between">
        <span
          className={`text-2xl font-bold ${getValueColor()}`}
          data-testid={COMMON_COMPONENT_TEST_IDS.METRICS_CARD_VALUE}
          style={accentColor ? { color: accentColor } : undefined}
        >
          {displayValue}
        </span>
        {subtitle && (
          <span className="text-xs text-gray-500 dark:text-gray-400">
            {subtitle}
          </span>
        )}
      </div>
    </div>
  );
};

export default MetricsCard;
