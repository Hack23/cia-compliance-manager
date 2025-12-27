/**
 * # Error Toast Component
 *
 * Toast notification component for displaying transient error messages
 * that auto-dismiss after a timeout.
 *
 * ## Business Perspective
 * Provides non-intrusive error notifications for transient errors that don't
 * require immediate user action. Maintains workflow continuity while keeping
 * users informed of issues. Critical for user experience. 📢
 *
 * ## Technical Perspective
 * Lightweight toast notification component with auto-dismiss, manual dismiss,
 * and accessibility features. Designed for transient errors that shouldn't
 * block the entire UI.
 *
 * @packageDocumentation
 */

import React, { useEffect, useState } from 'react';

/**
 * Toast notification position
 */
export type ToastPosition =
  | 'top-left'
  | 'top-center'
  | 'top-right'
  | 'bottom-left'
  | 'bottom-center'
  | 'bottom-right';

/**
 * Props for ErrorToast component
 */
export interface ErrorToastProps {
  /**
   * Error message to display
   */
  message: string;
  
  /**
   * Error title (optional)
   */
  title?: string;
  
  /**
   * Whether the toast is visible
   */
  isVisible: boolean;
  
  /**
   * Callback when toast is dismissed
   */
  onDismiss: () => void;
  
  /**
   * Auto-dismiss timeout in milliseconds
   * @default 5000
   */
  autoHideDuration?: number;
  
  /**
   * Toast position
   * @default 'top-right'
   */
  position?: ToastPosition;
  
  /**
   * Optional retry callback function
   */
  onRetry?: () => void;
  
  /**
   * Optional test ID for automated testing
   */
  testId?: string;
}

/**
 * Get position classes for toast placement
 */
const getPositionClasses = (position: ToastPosition): string => {
  switch (position) {
    case 'top-left':
      return 'top-4 left-4';
    case 'top-center':
      return 'top-4 left-1/2 -translate-x-1/2';
    case 'top-right':
      return 'top-4 right-4';
    case 'bottom-left':
      return 'bottom-4 left-4';
    case 'bottom-center':
      return 'bottom-4 left-1/2 -translate-x-1/2';
    case 'bottom-right':
      return 'bottom-4 right-4';
    default:
      return 'top-4 right-4';
  }
};

/**
 * Error Toast Component
 *
 * Displays transient error notifications with auto-dismiss and optional retry.
 * Designed for errors that don't require blocking the entire UI.
 *
 * @example
 * ```tsx
 * // Basic error toast
 * <ErrorToast
 *   message="Failed to save changes"
 *   isVisible={showToast}
 *   onDismiss={() => setShowToast(false)}
 * />
 *
 * // Error toast with title and retry
 * <ErrorToast
 *   title="Network Error"
 *   message="Unable to connect to server"
 *   isVisible={showToast}
 *   onDismiss={() => setShowToast(false)}
 *   onRetry={() => retryOperation()}
 * />
 *
 * // Custom position and timeout
 * <ErrorToast
 *   message="Operation failed"
 *   isVisible={showToast}
 *   onDismiss={() => setShowToast(false)}
 *   position="bottom-center"
 *   autoHideDuration={10000}
 * />
 * ```
 */
export const ErrorToast: React.FC<ErrorToastProps> = ({
  message,
  title = 'Error',
  isVisible,
  onDismiss,
  autoHideDuration = 5000,
  position = 'top-right',
  onRetry,
  testId = 'error-toast',
}) => {
  const [isAnimatingOut, setIsAnimatingOut] = useState(false);

  useEffect(() => {
    if (isVisible && autoHideDuration > 0) {
      const timer = setTimeout(() => {
        handleDismiss();
      }, autoHideDuration);

      return () => clearTimeout(timer);
    }
    return undefined;
  }, [isVisible, autoHideDuration]);

  const handleDismiss = (): void => {
    setIsAnimatingOut(true);
    setTimeout(() => {
      setIsAnimatingOut(false);
      onDismiss();
    }, 300); // Match animation duration
  };

  if (!isVisible && !isAnimatingOut) {
    return null;
  }

  const positionClasses = getPositionClasses(position);

  return (
    <div
      className={`fixed ${positionClasses} z-50 transform transition-all duration-300 ${
        isAnimatingOut ? 'opacity-0 scale-95' : 'opacity-100 scale-100'
      }`}
      data-testid={testId}
      role="alert"
      aria-live="assertive"
      aria-atomic="true"
    >
      <div className="max-w-md w-full bg-white dark:bg-gray-800 rounded-lg shadow-lg border-l-4 border-red-500 dark:border-red-600 overflow-hidden">
        <div className="p-4">
          {/* Header */}
          <div className="flex items-start">
            <div className="flex-shrink-0">
              <svg
                className="h-6 w-6 text-red-500 dark:text-red-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <div className="ml-3 flex-1">
              <h3
                className="text-sm font-semibold text-gray-900 dark:text-gray-100"
                data-testid={`${testId}-title`}
              >
                {title}
              </h3>
              <p
                className="mt-1 text-sm text-gray-700 dark:text-gray-300"
                data-testid={`${testId}-message`}
              >
                {message}
              </p>
            </div>
            <div className="ml-4 flex-shrink-0">
              <button
                onClick={handleDismiss}
                className="inline-flex text-gray-400 hover:text-gray-500 dark:text-gray-500 dark:hover:text-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500 rounded"
                data-testid={`${testId}-close-button`}
                aria-label="Close notification"
              >
                <svg
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
          </div>

          {/* Action Button */}
          {onRetry && (
            <div className="mt-3">
              <button
                onClick={() => {
                  onRetry();
                  handleDismiss();
                }}
                className="inline-flex items-center px-3 py-1.5 text-sm font-medium text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300 focus:outline-none focus:ring-2 focus:ring-red-500 rounded"
                data-testid={`${testId}-retry-button`}
                aria-label="Retry operation"
              >
                <svg
                  className="w-4 h-4 mr-1.5"
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
                Retry
              </button>
            </div>
          )}
        </div>

        {/* Progress bar (for auto-dismiss) */}
        {autoHideDuration > 0 && isVisible && !isAnimatingOut && (
          <div className="h-1 bg-gray-200 dark:bg-gray-700 overflow-hidden">
            <div
              className="h-full bg-red-500 dark:bg-red-600 animate-progress"
              style={{
                animation: `progress ${autoHideDuration}ms linear`,
              }}
            />
          </div>
        )}
      </div>

      <style>{`
        @keyframes progress {
          from {
            width: 100%;
          }
          to {
            width: 0%;
          }
        }
        .animate-progress {
          animation: progress linear;
        }
      `}</style>
    </div>
  );
};

export default ErrorToast;
