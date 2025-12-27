/**
 * # Error Fallback Component
 *
 * User-friendly error display component with recovery options and technical
 * details. Used as the default fallback UI for error boundaries.
 *
 * ## Business Perspective
 * Provides clear, actionable error messages to users when components fail,
 * maintaining trust and helping users understand what went wrong and how
 * to proceed. Critical for operational excellence. ⚠️
 *
 * ## Technical Perspective
 * Reusable error display component with consistent styling, collapsible
 * technical details, and optional retry functionality. Ensures errors are
 * displayed in a user-friendly manner across all error boundaries.
 *
 * @packageDocumentation
 */

import React, { useState } from 'react';

/**
 * Props for ErrorFallback component
 */
export interface ErrorFallbackProps {
  /**
   * Error title
   */
  title: string;
  
  /**
   * User-friendly error message
   */
  message: string;
  
  /**
   * Original error object (optional)
   */
  error?: Error;
  
  /**
   * React error info (optional)
   */
  errorInfo?: React.ErrorInfo;
  
  /**
   * Optional reset/retry callback function
   */
  onReset?: () => void;
  
  /**
   * Whether to show technical details
   * @default false
   */
  showTechnicalDetails?: boolean;
  
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
 * Error Fallback Component
 *
 * Displays user-friendly error information with optional technical details
 * and recovery actions. Used as the default fallback UI for error boundaries.
 *
 * @example
 * ```tsx
 * // Simple error fallback
 * <ErrorFallback
 *   title="Widget Error"
 *   message="Failed to load widget data"
 * />
 *
 * // Error with reset button
 * <ErrorFallback
 *   title="Security Metrics Error"
 *   message="Unable to calculate security metrics"
 *   onReset={() => refetchData()}
 * />
 *
 * // Error with technical details
 * <ErrorFallback
 *   title="Component Error"
 *   message="An unexpected error occurred"
 *   error={error}
 *   errorInfo={errorInfo}
 *   showTechnicalDetails={true}
 *   onReset={() => reset()}
 * />
 * ```
 */
export const ErrorFallback: React.FC<ErrorFallbackProps> = ({
  title,
  message,
  error,
  errorInfo,
  onReset,
  showTechnicalDetails = false,
  testId = 'error-fallback',
  className = '',
}) => {
  const [detailsExpanded, setDetailsExpanded] = useState(false);

  const hasTechnicalDetails = showTechnicalDetails && (error || errorInfo);

  return (
    <div
      className={`p-6 border-2 border-red-300 dark:border-red-700 bg-red-50 dark:bg-red-900 dark:bg-opacity-20 rounded-lg ${className}`}
      data-testid={testId}
      role="alert"
      aria-live="assertive"
    >
      {/* Error Header */}
      <div className="flex items-start mb-4">
        <div className="flex-shrink-0">
          <svg
            className="h-8 w-8 text-red-600 dark:text-red-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
            />
          </svg>
        </div>
        <div className="ml-4 flex-1">
          <h3
            className="text-red-900 dark:text-red-200 font-semibold text-xl mb-2"
            data-testid={`${testId}-title`}
          >
            {title}
          </h3>
          <p
            className="text-red-700 dark:text-red-300 text-base leading-relaxed"
            data-testid={`${testId}-message`}
          >
            {message}
          </p>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex items-center gap-3 mt-6">
        {onReset && (
          <button
            onClick={onReset}
            className="inline-flex items-center px-4 py-2 bg-red-600 dark:bg-red-700 text-white font-medium rounded-lg hover:bg-red-700 dark:hover:bg-red-600 transition-colors focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800"
            data-testid={`${testId}-reset-button`}
            aria-label="Try again"
          >
            <svg
              className="w-5 h-5 mr-2"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
              />
            </svg>
            Try Again
          </button>
        )}

        {hasTechnicalDetails && (
          <button
            onClick={() => setDetailsExpanded(!detailsExpanded)}
            className="inline-flex items-center px-4 py-2 bg-red-100 dark:bg-red-900 dark:bg-opacity-40 text-red-800 dark:text-red-200 font-medium rounded-lg hover:bg-red-200 dark:hover:bg-red-900 dark:hover:bg-opacity-60 transition-colors focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800"
            data-testid={`${testId}-details-toggle`}
            aria-expanded={detailsExpanded}
            aria-controls={`${testId}-details-content`}
          >
            <svg
              className={`w-5 h-5 mr-2 transition-transform ${detailsExpanded ? 'rotate-180' : ''}`}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 9l-7 7-7-7"
              />
            </svg>
            {detailsExpanded ? 'Hide' : 'Show'} Technical Details
          </button>
        )}
      </div>

      {/* Technical Details (Collapsible) */}
      {hasTechnicalDetails && detailsExpanded && (
        <div
          id={`${testId}-details-content`}
          className="mt-6 p-4 bg-red-100 dark:bg-red-900 dark:bg-opacity-30 rounded-lg border border-red-200 dark:border-red-800"
          data-testid={`${testId}-details`}
        >
          <h4 className="text-red-900 dark:text-red-200 font-semibold text-sm uppercase tracking-wide mb-3">
            Technical Details
          </h4>
          
          {error && (
            <div className="mb-4">
              <p className="text-red-800 dark:text-red-300 font-mono text-sm mb-1">
                <strong>Error:</strong> {error.name}
              </p>
              <p className="text-red-700 dark:text-red-400 font-mono text-sm">
                {error.message}
              </p>
            </div>
          )}
          
          {error?.stack && (
            <details className="mb-4">
              <summary className="text-red-800 dark:text-red-300 font-medium text-sm cursor-pointer hover:text-red-900 dark:hover:text-red-200">
                Stack Trace
              </summary>
              <pre className="mt-2 p-3 bg-red-50 dark:bg-red-950 dark:bg-opacity-50 rounded text-red-700 dark:text-red-400 text-xs overflow-x-auto">
                <code>{error.stack}</code>
              </pre>
            </details>
          )}
          
          {errorInfo?.componentStack && (
            <details>
              <summary className="text-red-800 dark:text-red-300 font-medium text-sm cursor-pointer hover:text-red-900 dark:hover:text-red-200">
                Component Stack
              </summary>
              <pre className="mt-2 p-3 bg-red-50 dark:bg-red-950 dark:bg-opacity-50 rounded text-red-700 dark:text-red-400 text-xs overflow-x-auto">
                <code>{errorInfo.componentStack}</code>
              </pre>
            </details>
          )}
        </div>
      )}

      {/* Help Text */}
      {!onReset && (
        <div className="mt-6 p-4 bg-red-100 dark:bg-red-900 dark:bg-opacity-30 rounded-lg border border-red-200 dark:border-red-800">
          <p className="text-red-800 dark:text-red-300 text-sm">
            <strong>Need help?</strong> If this error persists, please refresh the page or contact support.
          </p>
        </div>
      )}
    </div>
  );
};

export default ErrorFallback;
