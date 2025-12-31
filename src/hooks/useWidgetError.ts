import { useState, useCallback } from 'react';
import logger from '../utils/logger';

/**
 * State interface for widget error management
 */
export interface WidgetErrorState {
  /**
   * The current error, if any
   */
  error: Error | null;
  
  /**
   * Whether an error is currently present
   */
  hasError: boolean;
  
  /**
   * Clear the current error state
   */
  clearError: () => void;
  
  /**
   * Set a specific error
   */
  setError: (error: Error) => void;
  
  /**
   * Handle an unknown error (automatically converts to Error type)
   */
  handleError: (error: unknown) => void;
}

/**
 * Custom hook for consistent widget error handling
 * 
 * ## Business Perspective
 * 
 * Provides standardized error management across all widgets, ensuring
 * consistent user experience and reliable error reporting for operational
 * monitoring and debugging. 🛡️
 * 
 * ## Technical Perspective
 * 
 * Encapsulates error state management with automatic logging and type-safe
 * error handling. Provides a consistent API for setting, clearing, and
 * handling errors across all widget components.
 * 
 * @param widgetName - Name of the widget for logging and error context
 * @returns Error state management interface
 * 
 * @example
 * ```tsx
 * const MyWidget: React.FC<Props> = ({ data }) => {
 *   const { error, hasError, handleError, clearError } = useWidgetError('MyWidget');
 *   const [isLoading, setIsLoading] = useState(false);
 * 
 *   const loadData = async () => {
 *     setIsLoading(true);
 *     clearError();
 *     
 *     try {
 *       const result = await fetchData();
 *       // Process result...
 *     } catch (err) {
 *       handleError(err);
 *     } finally {
 *       setIsLoading(false);
 *     }
 *   };
 * 
 *   if (hasError) {
 *     return <ErrorMessage message={error?.message} onRetry={loadData} />;
 *   }
 * 
 *   return <div>Widget content</div>;
 * };
 * ```
 */
export function useWidgetError(widgetName: string): WidgetErrorState {
  const [error, setErrorState] = useState<Error | null>(null);

  /**
   * Clear the current error state
   */
  const clearError = useCallback(() => {
    setErrorState(null);
  }, []);

  /**
   * Set a specific error and log it
   */
  const setError = useCallback((err: Error) => {
    logger.error(`${widgetName}: ${err.message}`, err);
    setErrorState(err);
  }, [widgetName]);

  /**
   * Handle an unknown error by converting it to Error type
   */
  const handleError = useCallback((err: unknown) => {
    if (err instanceof Error) {
      setError(err);
    } else if (typeof err === 'string') {
      setError(new Error(err));
    } else {
      setError(new Error(`${widgetName}: Unknown error occurred`));
    }
  }, [widgetName, setError]);

  return {
    error,
    hasError: error !== null,
    clearError,
    setError,
    handleError,
  };
}

export default useWidgetError;
