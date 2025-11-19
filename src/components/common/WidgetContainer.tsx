import React from 'react';

export interface WidgetContainerProps {
  title: string;
  children: React.ReactNode;
  isLoading?: boolean;
  loading?: boolean; // For backward compatibility
  error?: string | null | Error; // Accept Error objects too
  className?: string;
  testId?: string;
  errorContent?: React.ReactNode;
  icon?: string | React.ReactNode;
  actions?: React.ReactNode;
}

/**
 * Container component for dashboard widgets
 * 
 * ## Business Perspective
 * 
 * This component provides a consistent presentation for all security dashboard
 * widgets, with standardized loading, error states, and styling. Consistency
 * in presentation helps users navigate security information more effectively. 🎨
 */
const WidgetContainer: React.FC<WidgetContainerProps> = ({
  title,
  children,
  isLoading = false,
  loading = false, // Accept loading prop for backward compatibility
  error = null,
  className = '',
  testId,
  errorContent,
  icon,
  actions
}) => {
  // For backward compatibility - support older code using "loading" prop
  const isLoadingState = isLoading || loading;
  
  // Create unique test IDs for different widget states
  const containerTestId = error 
    ? `widget-container-error${testId ? `-${testId}` : ''}` 
    : isLoadingState 
      ? `widget-container-loading-container${testId ? `-${testId}` : ''}` 
      : `widget-container${testId ? `-${testId}` : ''}`;
  
  const spinnerTestId = `widget-spinner${testId ? `-${testId}` : ''}`;
  const errorTestId = `test-widget-error${testId ? `-${testId}` : ''}`;

  // Convert Error objects to strings
  let errorMessage: string | null = null;
  if (error !== null) {
    errorMessage = error instanceof Error ? error.message : String(error);
  }

  // Handle error state
  if (errorMessage) {
    return (
      <div className={`widget-container widget-error border border-red-300 rounded-lg shadow-sm ${className}`} data-testid={containerTestId}>
        <div className="widget-header bg-red-50 dark:bg-red-900 dark:bg-opacity-20 px-4 py-3 border-b border-red-200 dark:border-red-800 rounded-t-lg">
          <h3 className="text-lg font-medium text-red-800 dark:text-red-300 flex items-center">
            <span className="mr-2">⚠️</span>
            {title}
          </h3>
        </div>
        <div className="widget-body p-4 bg-white dark:bg-gray-900">
          <div className="text-red-600 dark:text-red-400" data-testid={errorTestId}>
            {errorMessage}
          </div>
          {errorContent && <div>{errorContent}</div>}
        </div>
      </div>
    );
  }

  // Handle loading or normal state
  return (
    <div className={`widget-container border border-gray-200 dark:border-gray-700 rounded-lg shadow-sm ${className}`} data-testid={containerTestId}>
      <div className="widget-header bg-gray-50 dark:bg-gray-800 px-3 py-2 sm:px-4 sm:py-3 border-b border-gray-200 dark:border-gray-700 rounded-t-lg flex justify-between items-center">
        <h3 className="text-base sm:text-lg font-medium text-gray-800 dark:text-gray-200 flex items-center">
          {icon && <span className="mr-2">{icon}</span>}
          {title}
        </h3>
        {actions && <div className="widget-actions">{actions}</div>}
      </div>
      <div className={`widget-body p-3 sm:p-4 bg-white dark:bg-gray-900 rounded-b-lg ${isLoadingState ? 'flex items-center justify-center min-h-[100px]' : ''}`}>
        {isLoadingState ? (
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500" data-testid={spinnerTestId} />
        ) : (
          children
        )}
      </div>
    </div>
  );
};

export default WidgetContainer;
