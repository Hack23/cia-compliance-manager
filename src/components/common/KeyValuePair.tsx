import React from "react";
import { COMMON_COMPONENT_TEST_IDS } from "../../constants/testIds";

interface KeyValuePairProps {
  label: string;
  value: React.ReactNode;
  className?: string;
  keyClassName?: string;
  valueClassName?: string;
  labelClassName?: string; // Add this missing property
  testId?: string;
  iconPrefix?: React.ReactNode;
}

/**
 * Displays a key-value pair with configurable styling
 * 
 * ## Business Perspective
 * 
 * This component provides a consistent format for displaying labeled information
 * throughout the application, improving readability and making it easier for
 * business stakeholders to quickly find and interpret security metrics. 📊
 * 
 * @param props Component props
 * @returns React Element
 */
function KeyValuePair({
  label,
  value,
  className = "",
  keyClassName = "",
  valueClassName = "",
  labelClassName = "", // Initialize with empty string
  testId,
  iconPrefix,
}: KeyValuePairProps): React.ReactElement {
  return (
    <div
      className={`flex flex-col sm:flex-row sm:justify-between sm:items-center ${className}`}
      data-testid={testId || COMMON_COMPONENT_TEST_IDS.KEY_VALUE_PAIR}
    >
      <div className={`flex items-center text-sm text-gray-500 dark:text-gray-400 font-medium ${keyClassName} ${labelClassName}`} data-testid={COMMON_COMPONENT_TEST_IDS.KEY_VALUE_KEY}>
        {iconPrefix && <span className="mr-1">{iconPrefix}</span>}
        {label}
      </div>
      <div className={`font-medium ${valueClassName}`} data-testid={COMMON_COMPONENT_TEST_IDS.KEY_VALUE_VALUE}>
        {value || "N/A"}
      </div>
    </div>
  );
}

export { KeyValuePair };
export default KeyValuePair;
