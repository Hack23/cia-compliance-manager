import React, { ReactNode } from "react";
import { COMMON_COMPONENT_TEST_IDS } from "../../constants/testIds";

export interface KeyValuePairProps {
  label: string;
  value: ReactNode;
  valueClassName?: string;
  labelClassName?: string;
  className?: string;
  testId?: string;
}

/**
 * KeyValuePair displays a label and value pair with consistent styling
 * Used across multiple widgets for displaying metadata and metrics
 *
 * @component
 */
const KeyValuePair: React.FC<KeyValuePairProps> = ({
  label,
  value,
  valueClassName = "",
  labelClassName = "",
  className = "",
  testId = COMMON_COMPONENT_TEST_IDS.KEY_VALUE_PAIR,
}) => {
  return (
    <div className={`flex flex-col ${className}`} data-testid={testId}>
      <span
        className={`text-xs text-gray-500 dark:text-gray-400 mb-0.5 ${labelClassName}`}
      >
        {label}
      </span>
      <span
        className={`font-medium text-sm text-gray-800 dark:text-gray-200 ${valueClassName}`}
      >
        {value}
      </span>
    </div>
  );
};

export default KeyValuePair;
