import React, { ReactNode } from "react";

export interface WidgetContainerProps {
  /**
   * Widget title displayed in the header
   */
  title: string;
  
  /**
   * Optional icon to display next to the title
   */
  icon?: string | ReactNode;
  
  /**
   * Widget content
   */
  children: ReactNode;
  
  /**
   * Additional CSS classes
   */
  className?: string;
  
  /**
   * Test ID for testing
   */
  testId?: string;
  
  /**
   * Optional error state
   */
  error?: Error;
  
  /**
   * Whether to use compact layout
   */
  compact?: boolean;
  
  /**
   * Actions to render in the widget header
   */
  actions?: ReactNode;

  /**
   * Whether the widget is in loading state
   */
  loading?: boolean;
}

/**
 * Container component for all widgets with consistent styling
 * 
 * ## Business Perspective
 * 
 * This component provides a consistent visual framework for all widgets,
 * enhancing user experience and ensuring that security information is
 * presented in a clear, recognizable format across the application. 🎨
 */
const WidgetContainer: React.FC<WidgetContainerProps> = ({
  title,
  icon,
  children,
  className = "",
  testId = "widget-container",
  error,
  compact = false,
  actions,
  loading = false
}) => {
  // If loading, show loading indicator
  if (loading) {
    return (
      <div
        className={`widget-container border border-gray-200 dark:border-gray-700 rounded-lg shadow-sm ${className}`}
        data-testid={`${testId}-loading`}
      >
        <div className="widget-header bg-gray-50 dark:bg-gray-800 px-4 py-3 border-b border-gray-200 dark:border-gray-700 rounded-t-lg">
          <h3 className="text-lg font-medium text-gray-800 dark:text-gray-200">
            {icon && <span className="mr-2">{icon}</span>}
            {title}
          </h3>
        </div>
        <div className="widget-body p-4 bg-white dark:bg-gray-900 rounded-b-lg flex items-center justify-center min-h-[100px]">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500" data-testid="widget-container-loading"/>
        </div>
      </div>
    );
  }
  
  // If there's an error, show error state
  if (error) {
    return (
      <div
        className={`widget-container widget-error border border-red-300 rounded-lg shadow-sm ${className}`}
        data-testid={`${testId}-error`}
      >
        <div className="widget-header bg-red-50 dark:bg-red-900 dark:bg-opacity-20 px-4 py-3 border-b border-red-200 dark:border-red-800 rounded-t-lg">
          <h3 className="text-lg font-medium text-red-800 dark:text-red-300 flex items-center">
            <span className="mr-2">⚠️</span>
            {title}
          </h3>
        </div>
        <div className="widget-body p-4 bg-white dark:bg-gray-900">
          <div className="text-red-600 dark:text-red-400">{error.message}</div>
          {children}
        </div>
      </div>
    );
  }

  return (
    <div
      className={`widget-container border border-gray-200 dark:border-gray-700 rounded-lg shadow-sm ${className}`}
      data-testid={testId}
    >
      <div className={`widget-header bg-gray-50 dark:bg-gray-800 px-4 ${compact ? 'py-2' : 'py-3'} border-b border-gray-200 dark:border-gray-700 rounded-t-lg flex justify-between items-center`}>
        <h3 className={`${compact ? 'text-base' : 'text-lg'} font-medium text-gray-800 dark:text-gray-200 flex items-center`}>
          {icon && <span className="mr-2">{icon}</span>}
          {title}
        </h3>
        {actions && (
          <div className="widget-actions ml-auto">
            {actions}
          </div>
        )}
      </div>
      <div className="widget-body p-4 bg-white dark:bg-gray-900 rounded-b-lg">
        {children}
      </div>
    </div>
  );
};

export default WidgetContainer;
