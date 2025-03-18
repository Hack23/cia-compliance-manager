import React from 'react';
import { SecurityLevel } from '../../types/cia';

interface SecurityLevelSummaryItemProps {
  label: string;
  value: SecurityLevel;
  icon: string;
  color: string;
  borderColor?: string;
  testId?: string;
  compact?: boolean;
}

/**
 * Displays a summary item for a security level component
 * 
 * @param props Component props
 * @returns React Element
 */
export function SecurityLevelSummaryItem({
  label,
  value,
  icon,
  color,
  borderColor,
  testId,
  compact = false,
}: SecurityLevelSummaryItemProps): React.ReactElement {
  const baseClassNames = "p-3 rounded-md border";
  const colorClassNames = {
    blue: "bg-blue-50 dark:bg-blue-900 dark:bg-opacity-10 border-blue-100 dark:border-blue-800",
    green: "bg-green-50 dark:bg-green-900 dark:bg-opacity-10 border-green-100 dark:border-green-800",
    purple: "bg-purple-50 dark:bg-purple-900 dark:bg-opacity-10 border-purple-100 dark:border-purple-800",
    red: "bg-red-50 dark:bg-red-900 dark:bg-opacity-10 border-red-100 dark:border-red-800",
    yellow: "bg-yellow-50 dark:bg-yellow-900 dark:bg-opacity-10 border-yellow-100 dark:border-yellow-800",
    gray: "bg-gray-50 dark:bg-gray-800 border-gray-200 dark:border-gray-700",
  };
  
  const selectedColor = colorClassNames[color as keyof typeof colorClassNames] || colorClassNames.gray;
  
  const borderStyle = borderColor ? { borderLeftColor: borderColor } : {};
  
  return (
    <div
      className={`${baseClassNames} ${selectedColor} ${compact ? '' : 'border-l-4'}`}
      style={compact ? {} : borderStyle}
      data-testid={`security-summary-container-${testId}`}
    >
      <div className="flex items-center justify-between">
        <h4 className="font-medium text-sm flex items-center">
          <span className="mr-1">{icon}</span>
          {label}
        </h4>
        <span className="font-semibold">
          {value}
        </span>
      </div>
    </div>
  );
}

export default SecurityLevelSummaryItem;
