import React from 'react';

/**
 * Props for ErrorMessage component
 */
export interface ErrorMessageProps {
  /**
   * Error title
   * @default 'Error'
   */
  title?: string;
  
  /**
   * Error message to display
   */
  message: string;
  
  /**
   * Optional retry callback function
   */
  retry?: () => void;
  
  /**
   * Optional test ID for automated testing
   */
  testId?: string;
  
  /**
   * Optional CSS class name
   */
  className?: string;
}

/**
 * Error message component for displaying errors to users
 * 
 * ## Business Perspective
 * 
 * Provides clear, actionable error messages to users when operations fail,
 * maintaining trust and helping users understand what went wrong and how
 * to proceed. Critical for operational excellence. ⚠️
 * 
 * ## Technical Perspective
 * 
 * Reusable error display component with consistent styling and optional
 * retry functionality. Ensures errors are displayed in a user-friendly
 * manner across all widgets.
 * 
 * @example
 * ```tsx
 * // Simple error message
 * <ErrorMessage message="Failed to load data" />
 * 
 * // Error with custom title
 * <ErrorMessage 
 *   title="Connection Error" 
 *   message="Unable to reach the server"
 * />
 * 
 * // Error with retry button
 * <ErrorMessage 
 *   message="Failed to load metrics"
 *   retry={() => refetchData()}
 * />
 * ```
 */
export const ErrorMessage: React.FC<ErrorMessageProps> = ({ 
  title = 'Error',
  message,
  retry,
  testId = 'error-message',
  className = ''
}) => {
  return (
    <div 
      className={`p-4 border border-red-300 dark:border-red-700 bg-red-50 dark:bg-red-900 dark:bg-opacity-20 rounded-lg ${className}`}
      data-testid={testId}
      role="alert"
      aria-live="polite"
    >
      <h3 
        className="text-red-800 dark:text-red-300 font-semibold text-lg mb-2 flex items-center"
        data-testid={`${testId}-title`}
      >
        <span className="mr-2" aria-hidden="true">⚠️</span>
        {title}
      </h3>
      <p 
        className="text-red-600 dark:text-red-400 mb-4"
        data-testid={`${testId}-text`}
      >
        {message}
      </p>
      {retry && (
        <button
          onClick={retry}
          className="px-4 py-2 bg-red-600 dark:bg-red-700 text-white rounded hover:bg-red-700 dark:hover:bg-red-600 transition-colors focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
          data-testid={`${testId}-retry-button`}
          aria-label="Try again"
        >
          Try Again
        </button>
      )}
    </div>
  );
};

export default ErrorMessage;
