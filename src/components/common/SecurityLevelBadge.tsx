import React from 'react';
import { SecurityLevel } from '../../types/cia';

interface SecurityLevelBadgeProps {
  category: string;
  level: SecurityLevel;
  colorClass?: string;
  textClass?: string;
  testId?: string;
}

/**
 * Displays a security level badge for a specific category
 * 
 * @param props Component props
 * @returns React Element
 */
export function SecurityLevelBadge({
  category,
  level,
  colorClass = "bg-gray-100",
  textClass = "text-gray-800",
  testId,
}: SecurityLevelBadgeProps): React.ReactElement {
  return (
    <div 
      className={`p-2 rounded-md flex flex-col items-center justify-center text-center ${colorClass}`}
      data-testid={testId}
    >
      <span className="text-xs uppercase font-medium text-gray-600 dark:text-gray-400">
        {category}
      </span>
      <span className={`font-bold ${textClass}`}>
        {level}
      </span>
    </div>
  );
}

export default SecurityLevelBadge;
