import React from "react";
import { COMMON_COMPONENT_TEST_IDS } from "../../constants/testIds";

interface KeyValuePairProps {
  /**
   * Label or key text
   */
  label: string;
  
  /**
   * Value text
   */
  value: React.ReactNode;
  
  /**
   * Additional CSS classes
   */
  className?: string;
  
  /**
   * Test ID for automated testing
   */
  testId?: string;
  
  keyClassName?: string;
  valueClassName?: string;
  labelClassName?: string; // Add this missing property
  iconPrefix?: React.ReactNode;
}

/**
 * Displays a label-value pair for metrics and properties
 * 
 * ## Business Perspective
 * 
 * Standardizes the presentation of key metrics and properties across
 * the application, making technical information more digestible for
 * business stakeholders and decision-makers. 📊
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
      className={`p-3 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 ${className}`}
      data-testid={testId || COMMON_COMPONENT_TEST_IDS.KEY_VALUE_PAIR}
    >
      <div className={`text-xs font-medium mb-2 text-gray-600 dark:text-gray-400 ${keyClassName} ${labelClassName}`} data-testid={COMMON_COMPONENT_TEST_IDS.KEY_VALUE_KEY}>
        {iconPrefix && <span className="mr-1">{iconPrefix}</span>}
        {label}
      </div>
      <div className={`text-sm font-medium ${valueClassName}`} data-testid={COMMON_COMPONENT_TEST_IDS.KEY_VALUE_VALUE}>
        {value || "N/A"}
      </div>
    </div>
  );
}

export { KeyValuePair };
export default KeyValuePair;
