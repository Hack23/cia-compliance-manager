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
