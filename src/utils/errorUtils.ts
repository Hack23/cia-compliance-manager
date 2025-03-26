import { isError } from "./typeGuards";

/**
 * Converts any error value to an Error object
 *
 * @param err - The error value to convert
 * @returns An Error object
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
 * Formats an error for consistent logging
 *
 * @param err - The error to format
 * @param prefix - Optional prefix for the error message
 * @returns A formatted error message
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
