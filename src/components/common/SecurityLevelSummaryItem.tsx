import React from "react";
import { SecurityLevel } from "../../types/cia";
import { getSecurityLevelValue } from "../../utils/levelValuesUtils";

/**
 * Props for the SecurityLevelSummaryItem component
 */
interface SecurityLevelSummaryItemProps {
  /**
   * The label to display for this security level item
   */
  label: string;
  
  /**
   * The security level value to display
   */
  value: SecurityLevel;
  
  /**
   * Optional icon to display
   */
  icon?: string;
  
  /**
   * Optional test ID for testing
   */
  testId?: string;
  
  /**
   * Optional color to use for styling
   */
  color?: string;
  
  /**
   * Optional border color
   */
  borderColor?: string;
  
  /**
   * Whether to display in compact mode
   */
  compact?: boolean;
}

/**
 * Displays a summary item for a security level with standardized styling
 * 
 * ## Business Perspective
 * 
 * This component ensures consistent display of security levels across the application,
 * providing stakeholders with a uniform visual language for understanding security controls. 🔒
 */
export const SecurityLevelSummaryItem: React.FC<SecurityLevelSummaryItemProps> = ({
  label,
  value,
  icon,
  testId,
  color = "blue",
  borderColor,
  compact = false,
}) => {
  // Calculate security strength as a percentage based on level
  const securityStrength = getSecurityLevelValue(value) * 25;
  
  // Get border style based on props or color
  const borderStyle = borderColor 
    ? { borderColor: borderColor }
    : {};
    
  if (compact) {
    return (
      <div
        className={`px-3 py-2 bg-${color}-50 dark:bg-${color}-900 dark:bg-opacity-20 rounded border border-${color}-100 dark:border-${color}-800 flex items-center justify-between`}
        style={borderStyle}
        data-testid={testId}
      >
        <div className="flex items-center">
          {icon && <span className="mr-2">{icon}</span>}
          <span className={`text-${color}-700 dark:text-${color}-300 font-medium`}>
            {label}
          </span>
        </div>
        <span className={`text-${color}-800 dark:text-${color}-200 font-bold`}>
          {value}
        </span>
      </div>
    );
  }
  
  return (
    <div 
      className={`p-3 bg-${color}-50 dark:bg-${color}-900 dark:bg-opacity-20 rounded border-l-4`}
      style={{ borderLeftColor: borderColor || `var(--${color}-500)` }}
      data-testid={testId}
    >
      <div className="flex justify-between items-center mb-1">
        <div className="flex items-center">
          {icon && <span className="mr-2">{icon}</span>}
          <span className={`text-${color}-700 dark:text-${color}-300 font-medium`}>
            {label}
          </span>
        </div>
        <span className={`text-${color}-800 dark:text-${color}-200 font-bold`}>
          {value}
        </span>
      </div>
      
      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-1.5">
        <div
          className={`h-1.5 rounded-full bg-${color}-500 dark:bg-${color}-400`}
          style={{ width: `${securityStrength}%` }}
          aria-label={`Security level: ${value} (${securityStrength}%)`}
        ></div>
      </div>
    </div>
  );
};

export default SecurityLevelSummaryItem;
