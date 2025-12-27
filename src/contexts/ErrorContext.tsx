/**
 * # Error Context
 *
 * React Context for centralized error state management across the application.
 * Provides error tracking, toast notifications, and error recovery actions.
 *
 * ## Business Perspective
 * Centralizes error handling state management, enabling consistent error tracking
 * and user notifications across the entire application. Critical for operational
 * excellence and user experience. 🛡️
 *
 * ## Technical Perspective
 * React Context that manages error state, toast notifications, and provides
 * actions for error handling. Integrates with centralized error service for
 * logging and user-friendly message generation.
 *
 * @packageDocumentation
 */

import React, { createContext, useContext, useState, useCallback, ReactNode } from 'react';
import { errorService } from '../services/errorService';
import ErrorToast, { ToastPosition } from '../components/common/ErrorToast';

/**
 * Error entry for tracking errors
 */
export interface ErrorEntry {
  /** Unique error ID */
  id: string;
  /** Error object */
  error: Error;
  /** User-friendly error message */
  message: string;
  /** Error timestamp */
  timestamp: Date;
  /** Whether the error is recoverable */
  recoverable: boolean;
  /** Error context */
  context?: Record<string, unknown>;
}

/**
 * Toast notification configuration
 */
export interface ToastConfig {
  /** Toast message */
  message: string;
  /** Toast title (optional) */
  title?: string;
  /** Auto-hide duration in milliseconds */
  autoHideDuration?: number;
  /** Toast position */
  position?: ToastPosition;
  /** Retry callback (optional) */
  onRetry?: () => void;
}

/**
 * Error context value
 */
export interface ErrorContextValue {
  /** List of tracked errors */
  errors: ErrorEntry[];
  
  /** Add an error to tracking */
  addError: (error: Error, context?: Record<string, unknown>) => void;
  
  /** Clear a specific error */
  clearError: (id: string) => void;
  
  /** Clear all errors */
  clearAllErrors: () => void;
  
  /** Show a toast notification */
  showToast: (config: ToastConfig) => void;
  
  /** Hide the current toast */
  hideToast: () => void;
  
  /** Get the most recent error */
  getLatestError: () => ErrorEntry | undefined;
}

/**
 * Error context
 */
const ErrorContext = createContext<ErrorContextValue | undefined>(undefined);

/**
 * Props for ErrorProvider
 */
export interface ErrorProviderProps {
  /** Child components */
  children: ReactNode;
  
  /** Maximum number of errors to track */
  maxErrors?: number;
  
  /** Default toast position */
  defaultToastPosition?: ToastPosition;
  
  /** Default toast auto-hide duration */
  defaultAutoHideDuration?: number;
}

/**
 * Error Provider Component
 *
 * Provides error context to child components, managing error state and
 * toast notifications.
 *
 * @example
 * ```tsx
 * // Wrap application with ErrorProvider
 * <ErrorProvider>
 *   <App />
 * </ErrorProvider>
 *
 * // Use in components
 * const { addError, showToast } = useError();
 *
 * try {
 *   await fetchData();
 * } catch (error) {
 *   addError(error, { component: 'DataFetcher' });
 *   showToast({
 *     message: 'Failed to load data',
 *     onRetry: () => fetchData()
 *   });
 * }
 * ```
 */
export const ErrorProvider: React.FC<ErrorProviderProps> = ({
  children,
  maxErrors = 10,
  defaultToastPosition = 'top-right',
  defaultAutoHideDuration = 5000,
}) => {
  const [errors, setErrors] = useState<ErrorEntry[]>([]);
  const [toastConfig, setToastConfig] = useState<ToastConfig | null>(null);
  const [isToastVisible, setIsToastVisible] = useState(false);

  /**
   * Generate unique error ID
   */
  const generateErrorId = (): string => {
    return `error-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
  };

  /**
   * Add an error to tracking
   */
  const addError = useCallback((error: Error, context?: Record<string, unknown>) => {
    // Log error using error service
    errorService.logError(error, context);

    // Create error entry
    const errorEntry: ErrorEntry = {
      id: generateErrorId(),
      error,
      message: errorService.getUserFriendlyMessage(error),
      timestamp: new Date(),
      recoverable: errorService.canRecover(error),
      context,
    };

    // Add to tracked errors (limit to maxErrors)
    setErrors(prevErrors => {
      const newErrors = [errorEntry, ...prevErrors];
      return newErrors.slice(0, maxErrors);
    });
  }, [maxErrors]);

  /**
   * Clear a specific error
   */
  const clearError = useCallback((id: string) => {
    setErrors(prevErrors => prevErrors.filter(err => err.id !== id));
  }, []);

  /**
   * Clear all errors
   */
  const clearAllErrors = useCallback(() => {
    setErrors([]);
  }, []);

  /**
   * Show a toast notification
   */
  const showToast = useCallback((config: ToastConfig) => {
    setToastConfig(config);
    setIsToastVisible(true);
  }, []);

  /**
   * Hide the current toast
   */
  const hideToast = useCallback(() => {
    setIsToastVisible(false);
    // Clear config after animation completes
    setTimeout(() => {
      setToastConfig(null);
    }, 300);
  }, []);

  /**
   * Get the most recent error
   */
  const getLatestError = useCallback((): ErrorEntry | undefined => {
    return errors[0];
  }, [errors]);

  const contextValue: ErrorContextValue = {
    errors,
    addError,
    clearError,
    clearAllErrors,
    showToast,
    hideToast,
    getLatestError,
  };

  return (
    <ErrorContext.Provider value={contextValue}>
      {children}
      
      {/* Toast notification */}
      {toastConfig && (
        <ErrorToast
          message={toastConfig.message}
          title={toastConfig.title}
          isVisible={isToastVisible}
          onDismiss={hideToast}
          autoHideDuration={toastConfig.autoHideDuration ?? defaultAutoHideDuration}
          position={toastConfig.position ?? defaultToastPosition}
          onRetry={toastConfig.onRetry}
        />
      )}
    </ErrorContext.Provider>
  );
};

/**
 * Custom hook to use error context
 *
 * @throws Error if used outside ErrorProvider
 * @returns Error context value
 *
 * @example
 * ```tsx
 * const { addError, showToast, clearError } = useError();
 *
 * // Track and display error
 * try {
 *   await saveData();
 * } catch (error) {
 *   addError(error, { operation: 'save' });
 *   showToast({
 *     message: 'Failed to save data',
 *     onRetry: () => saveData()
 *   });
 * }
 * ```
 */
export const useError = (): ErrorContextValue => {
  const context = useContext(ErrorContext);
  
  if (context === undefined) {
    throw new Error('useError must be used within an ErrorProvider');
  }
  
  return context;
};

export default ErrorProvider;
