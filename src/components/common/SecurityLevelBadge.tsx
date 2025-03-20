import React from 'react';
import { SecurityLevel } from '../../types/cia';
import { getSecurityLevelBadgeVariant } from '../../utils/securityLevelUtils';

/**
 * Props for the SecurityLevelBadge component
 */
interface SecurityLevelBadgeProps {
  /**
   * The category label for the badge (e.g., "Availability", "Integrity", "Confidentiality")
   */
  category: string;
  
  /**
   * The security level to display
   */
  level: SecurityLevel;
  
  /**
   * Optional CSS class for the badge background
   */
  colorClass?: string;
  
  /**
   * Optional CSS class for the badge text
   */
  textClass?: string;
  
  /**
   * Optional CSS class for the badge container
   */
  className?: string;
  
  /**
   * Optional test ID for automated testing
   */
  testId?: string;
}

/**
 * A standardized badge for displaying security levels
 * 
 * This component provides a consistent visual representation of security levels
 * across all widgets and components in the application.
 */
const SecurityLevelBadge: React.FC<SecurityLevelBadgeProps> = ({
  category,
  level,
  colorClass,
  textClass,
  className = '',
  testId,
}) => {
  // Determine color classes based on level or use provided classes
  const getDefaultColorClass = () => {
    const variant = getSecurityLevelBadgeVariant(level);
    
    switch (variant) {
      case 'success':
        return 'bg-green-100 dark:bg-green-900 dark:bg-opacity-20';
      case 'warning':
        return 'bg-yellow-100 dark:bg-yellow-900 dark:bg-opacity-20';
      case 'error':
        return 'bg-red-100 dark:bg-red-900 dark:bg-opacity-20';
      case 'info':
        return 'bg-blue-100 dark:bg-blue-900 dark:bg-opacity-20';
      case 'purple':
        return 'bg-purple-100 dark:bg-purple-900 dark:bg-opacity-20';
      default:
        return 'bg-gray-100 dark:bg-gray-800';
    }
  };
  
  const getDefaultTextClass = () => {
    const variant = getSecurityLevelBadgeVariant(level);
    
    switch (variant) {
      case 'success':
        return 'text-green-800 dark:text-green-300';
      case 'warning':
        return 'text-yellow-800 dark:text-yellow-300';
      case 'error':
        return 'text-red-800 dark:text-red-300';
      case 'info':
        return 'text-blue-800 dark:text-blue-300';
      case 'purple':
        return 'text-purple-800 dark:text-purple-300';
      default:
        return 'text-gray-800 dark:text-gray-300';
    }
  };
  
  return (
    <div 
      className={`inline-flex items-center ${className}`}
      data-testid={testId}
    >
      <div className={`px-2.5 py-1 rounded-md flex items-center ${colorClass || getDefaultColorClass()}`}>
        <span className={`text-sm font-medium ${textClass || getDefaultTextClass()}`}>
          {category}: {level}
        </span>
      </div>
    </div>
  );
};

export default SecurityLevelBadge;
