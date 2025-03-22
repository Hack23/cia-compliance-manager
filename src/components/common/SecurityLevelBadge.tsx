import React from 'react';
import { SecurityLevel } from '../../types/cia';

interface SecurityLevelBadgeProps {
  /**
   * The category of the security level (e.g., "Availability")
   */
  category: string;
  
  /**
   * The security level to display
   */
  level: SecurityLevel;
  
  /**
   * Custom color class for the badge background
   */
  colorClass?: string;
  
  /**
   * Custom color class for the badge text
   */
  textClass?: string;
  
  /**
   * Additional CSS classes
   */
  className?: string;
  
  /**
   * Test ID for automated testing
   */
  testId?: string;
}

/**
 * Displays a security level in a badge format
 * 
 * ## Business Perspective
 * 
 * Provides consistent visual indicators of security levels throughout
 * the application, enabling users to quickly identify the security
 * stance for different components of the CIA triad. 🔒
 */
const SecurityLevelBadge: React.FC<SecurityLevelBadgeProps> = ({
  category,
  level,
  colorClass,
  textClass,
  className = '',
  testId
}) => {
  // Default color classes based on security level if not provided
  const defaultColorClass = () => {
    switch (level) {
      case 'None':
        return 'bg-red-100 dark:bg-red-900 dark:bg-opacity-20';
      case 'Low':
        return 'bg-yellow-100 dark:bg-yellow-900 dark:bg-opacity-20';
      case 'Moderate':
        return 'bg-blue-100 dark:bg-blue-900 dark:bg-opacity-20';
      case 'High':
        return 'bg-green-100 dark:bg-green-900 dark:bg-opacity-20';
      case 'Very High':
        return 'bg-purple-100 dark:bg-purple-900 dark:bg-opacity-20';
      default:
        return 'bg-gray-100 dark:bg-gray-800';
    }
  };

  // Default text classes based on security level if not provided
  const defaultTextClass = () => {
    switch (level) {
      case 'None':
        return 'text-red-800 dark:text-red-300';
      case 'Low':
        return 'text-yellow-800 dark:text-yellow-300';
      case 'Moderate':
        return 'text-blue-800 dark:text-blue-300';
      case 'High':
        return 'text-green-800 dark:text-green-300';
      case 'Very High':
        return 'text-purple-800 dark:text-purple-300';
      default:
        return 'text-gray-800 dark:text-gray-300';
    }
  };

  const badgeColorClass = colorClass || defaultColorClass();
  const badgeTextClass = textClass || defaultTextClass();

  return (
    <span
      className={`px-2 py-1 rounded-md text-xs font-medium ${badgeColorClass} ${badgeTextClass} ${className}`}
      data-testid={testId}
    >
      {category && `${category}: `}{level}
    </span>
  );
};

export default SecurityLevelBadge;
