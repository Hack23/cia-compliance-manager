import React, { ReactNode } from 'react';

interface WidgetHeaderProps {
  /**
   * The title text to display
   */
  title: string;
  
  /**
   * Optional icon to display next to the title
   */
  icon?: ReactNode;
  
  /**
   * Optional actions to display in the header
   */
  actions?: ReactNode;
  
  /**
   * Optional CSS classes to add
   */
  className?: string;
  
  /**
   * Optional test ID for automated testing
   */
  testId?: string;
}

/**
 * Header component for widget containers
 * 
 * ## UX Perspective
 * 
 * Provides a consistent header style for all widgets, with
 * support for icons and action buttons. The consistent design
 * helps users navigate the dashboard more efficiently. 🎨
 */
const WidgetHeader: React.FC<WidgetHeaderProps> = ({
  title,
  icon,
  actions,
  className = '',
  testId = 'widget-header'
}) => {
  return (
    <div 
      className={`widget-header bg-gray-50 dark:bg-gray-800 px-4 py-3 border-b border-gray-200 dark:border-gray-700 rounded-t-lg flex justify-between items-center ${className}`}
      data-testid={testId}
    >
      <h3 className="text-lg font-medium text-gray-800 dark:text-gray-200 flex items-center">
        {icon && <span className="mr-2">{icon}</span>}
        {title}
      </h3>
      {actions && <div className="widget-actions">{actions}</div>}
    </div>
  );
};

export default WidgetHeader;
