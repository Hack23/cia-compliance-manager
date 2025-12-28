import { isError } from "./typeGuards";

/**
 * Error handling utilities for consistent error processing
 * 
 * Provides utilities for converting various error types to Error objects,
 * formatting error messages, and handling errors consistently across the
 * application. Essential for robust error handling and user feedback.
 * 
 * @example
 * ```typescript
 * import { toErrorObject, formatError, formatErrorMessage } from './errorUtils';
 * 
 * // Convert unknown error to Error object
 * const error = toErrorObject('Something failed');
 * 
 * // Format error with prefix
 * const message = formatError(error, 'API Call');
 * // 'API Call: Something failed'
 * 
 * // Format error message from various types
 * const msg = formatErrorMessage({ message: 'Network error' });
 * // 'Network error'
 * ```
 */

/**
 * Converts any error value to an Error object
 * 
 * Handles various error types including Error objects, objects with message
 * properties, strings, and other primitives. Essential for consistent error
 * handling across the application.
 *
 * @param err - The error value to convert (can be any type)
 * @returns An Error object with appropriate message
 * 
 * @example
 * ```typescript
 * // Convert Error object (passthrough)
 * toErrorObject(new Error('Failed'))  // Error: Failed
 * 
 * // Convert string
 * toErrorObject('Network timeout')    // Error: Network timeout
 * 
 * // Convert object with message
 * toErrorObject({ message: 'Invalid data' })  // Error: Invalid data
 * 
 * // Convert number
 * toErrorObject(404)                  // Error: 404
 * 
 * // Usage in catch blocks
 * try {
 *   await riskyOperation();
 * } catch (err) {
 *   const error = toErrorObject(err);
 *   logger.error(error.message);
 * }
 * ```
 */
export function toErrorObject(err: unknown): Error {
  if (isError(err)) {
    return err;
  }

  if (err instanceof Object) {
    // If the error is an object with a message property, use that
    if ("message" in err && typeof err.message === "string") {
      return new Error(err.message);
    }
  }

  // For strings, numbers, etc.
  return new Error(String(err));
}

/**
 * Formats an error for consistent logging with optional prefix
 * 
 * Converts errors to formatted strings suitable for logging, with optional
 * contextual prefix for better error traceability. Handles unknown error types
 * safely.
 *
 * @param err - The error to format (can be any type)
 * @param prefix - Optional prefix for context (e.g., 'API', 'Database', 'Widget')
 * @returns A formatted error message string
 * 
 * @example
 * ```typescript
 * // Without prefix
 * formatError(new Error('Connection failed'))
 * // 'Connection failed'
 * 
 * // With prefix for context
 * formatError(new Error('Timeout'), 'API Call')
 * // 'API Call: Timeout'
 * 
 * formatError('Invalid input', 'Validation')
 * // 'Validation: Invalid input'
 * 
 * // Usage in service methods
 * try {
 *   await fetchData();
 * } catch (err) {
 *   const message = formatError(err, 'DataService');
 *   console.error(message);  // 'DataService: Network error'
 * }
 * ```
 */
export function formatError(err: unknown, prefix?: string): string {
  const error = toErrorObject(err);
  return prefix ? `${prefix}: ${error.message}` : error.message;
}

/**
 * Type guard to check if an error has a message property
 */
export const isErrorWithMessage = (
  error: unknown
): error is { message: string } => {
  return (
    typeof error === "object" &&
    error !== null &&
    "message" in error &&
    typeof (error as Record<string, unknown>).message === "string"
  );
};

/**
 * Format an error message from various error types
 * 
 * Extracts error messages from various error formats including Error objects,
 * objects with message properties, and primitives. Provides fallback message
 * for null/undefined or unrecognized error formats.
 * 
 * @param error - Error value of unknown type
 * @returns Formatted error message string
 * 
 * @example
 * ```typescript
 * // Error object
 * formatErrorMessage(new Error('Failed'))  // 'Failed'
 * 
 * // Object with message
 * formatErrorMessage({ message: 'Invalid' })  // 'Invalid'
 * 
 * // String
 * formatErrorMessage('Something wrong')  // 'Something wrong'
 * 
 * // Null/undefined
 * formatErrorMessage(null)  // 'An unknown error occurred'
 * formatErrorMessage(undefined)  // 'An unknown error occurred'
 * 
 * // Object without message
 * formatErrorMessage({ code: 500 })  // 'An unknown error occurred'
 * 
 * // Usage in error display
 * const handleError = (err: unknown) => {
 *   const message = formatErrorMessage(err);
 *   showNotification(message);
 * };
 * ```
 */
export const formatErrorMessage = (error: unknown): string => {
  if (isErrorWithMessage(error)) {
    return error.message;
  }

  if (error === null || error === undefined) {
    return "An unknown error occurred";
  }

  if (typeof error === "object" && !("message" in error)) {
    return "An unknown error occurred";
  }

  return String(error);
};

/**
 * Display an error message in the console
 */
export const displayErrorMessage = (error: unknown): void => {
  const message = formatErrorMessage(error);
  console.error("Error:", message);
};

/**
 * Handle an API error with operation context
 */
export const handleApiError = (error: unknown, operation: string): string => {
  const message = formatErrorMessage(error);
  console.error(`API Error (${operation}):`, message);
  return message;
};
