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
 * Displays a security level badge with consistent styling
 * 
 * ## Business Perspective
 * 
 * This component visualizes security levels for various CIA components with 
 * consistent styling, helping stakeholders quickly understand the security 
 * posture across different dimensions. 🔒
 */
const SecurityLevelBadge: React.FC<SecurityLevelBadgeProps> = ({
  category,
  level,
  colorClass = "bg-blue-50 dark:bg-blue-900 dark:bg-opacity-20",
  textClass = "text-blue-600 dark:text-blue-400",
  testId,
}) => {
  return (
    <div 
      className={`py-2 px-3 rounded-md ${colorClass}`}
      data-testid={testId || `${category.toLowerCase()}-level-badge`}
    >
      <div className="flex flex-col">
        <div className="text-xs uppercase tracking-wide text-gray-500 dark:text-gray-400">
          {category}
        </div>
        <div className={`text-sm font-bold ${textClass}`}>
          {level}
        </div>
      </div>
    </div>
  );
};

export default SecurityLevelBadge;
