import React from 'react';
import { WIDGET_DESIGN } from '../../constants/designTokens';

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
      <div className={`widget-container widget-error border border-error rounded-md shadow-md ${className}`} data-testid={containerTestId}>
        <div className="widget-header bg-error-light/10 dark:bg-error-dark/20 px-md py-sm sm:px-lg sm:py-md border-b border-error-light dark:border-error-dark rounded-t-md">
          <h3 className="text-body-lg sm:text-heading font-semibold text-error-dark dark:text-error-light flex items-center">
            <span className="mr-sm">⚠️</span>
            {title}
          </h3>
        </div>
        <div className="widget-body p-md sm:p-lg bg-white dark:bg-gray-900 rounded-b-md">
          <div className="text-error dark:text-error-light" data-testid={errorTestId}>
            {errorMessage}
          </div>
          {errorContent && <div className="mt-md">{errorContent}</div>}
        </div>
      </div>
    );
  }

  // Handle loading or normal state
  return (
    <div className={`widget-container border border-neutral-light dark:border-neutral-dark rounded-md shadow-md ${className}`} data-testid={containerTestId}>
      <div className="widget-header bg-neutral-light/10 dark:bg-neutral-dark/20 px-md py-sm sm:px-lg sm:py-md border-b border-neutral-light dark:border-neutral-dark rounded-t-md flex justify-between items-center">
        <h3 className="text-body-lg sm:text-heading font-semibold text-gray-800 dark:text-gray-200 flex items-center">
          {icon && <span className="mr-sm">{icon}</span>}
          {title}
        </h3>
        {actions && <div className="widget-actions">{actions}</div>}
      </div>
      <div className={`widget-body p-md sm:p-lg bg-white dark:bg-gray-900 rounded-b-md ${isLoadingState ? 'flex items-center justify-center min-h-[100px]' : ''}`}>
        {isLoadingState ? (
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" data-testid={spinnerTestId} />
        ) : (
          children
        )}
      </div>
    </div>
  );
};

export default WidgetContainer;
