import React from "react";
import { COMMON_COMPONENT_TEST_IDS } from "../../constants/testIds";

export interface ValueDisplayProps {
  value: string | number;
  variant?: "primary" | "success" | "warning" | "danger" | "info";
  size?: "sm" | "md" | "lg";
  label?: string;
  testId?: string;
}

/**
 * ValueDisplay shows a value with optional prefix and suffix
 *
 * @category UI Components
 * @param props - Component properties
 * @returns Rendered component
 */
const ValueDisplay: React.FC<ValueDisplayProps> = ({
  value,
  variant = "primary",
  size = "md",
  label,
  testId = COMMON_COMPONENT_TEST_IDS.VALUE_DISPLAY,
}) => {
  const getVariantClass = () => {
    switch (variant) {
      case "success":
        return "text-green-600 dark:text-green-400";
      case "warning":
        return "text-yellow-600 dark:text-yellow-400";
      case "danger":
        return "text-red-600 dark:text-red-400";
      case "info":
        return "text-blue-600 dark:text-blue-400";
      case "primary":
      default:
        return "text-blue-600 dark:text-blue-400";
    }
  };

  const getSizeClass = () => {
    switch (size) {
      case "sm":
        return "text-sm";
      case "lg":
        return "text-lg";
      case "md":
      default:
        return "text-base";
    }
  };

  return (
    <div data-testid={testId} className="flex items-center">
      <span className={`font-medium ${getVariantClass()} ${getSizeClass()}`}>
        {value}
      </span>
      {label && (
        <span className="text-xs text-gray-500 dark:text-gray-400 ml-1">
          {label}
        </span>
      )}
    </div>
  );
};

export default ValueDisplay;
