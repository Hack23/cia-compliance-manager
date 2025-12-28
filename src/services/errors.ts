/**
 * # Service Error Types
 *
 * Standardized error handling for service layer with error codes and context.
 *
 * ## Business Perspective
 * Provides consistent error reporting across all services, enabling better
 * debugging, logging, and user-facing error messages. 🔒
 *
 * @packageDocumentation
 */

/**
 * Error codes for service operations
 * 
 * Note: The numeric ranges in comments (e.g., 1000-1999) are organizational
 * categories for documentation purposes. The actual enum values are strings.
 */
export enum ServiceErrorCode {
  // Validation errors
  VALIDATION_ERROR = 'VALIDATION_ERROR',
  INVALID_SECURITY_LEVEL = 'INVALID_SECURITY_LEVEL',
  INVALID_COMPONENT_TYPE = 'INVALID_COMPONENT_TYPE',
  INVALID_INPUT = 'INVALID_INPUT',
  MISSING_REQUIRED_FIELD = 'MISSING_REQUIRED_FIELD',

  // Data access errors
  DATA_NOT_FOUND = 'DATA_NOT_FOUND',
  DATA_PROVIDER_ERROR = 'DATA_PROVIDER_ERROR',
  CONFIGURATION_ERROR = 'CONFIGURATION_ERROR',

  // Business logic errors
  CALCULATION_ERROR = 'CALCULATION_ERROR',
  COMPLIANCE_CHECK_ERROR = 'COMPLIANCE_CHECK_ERROR',
  ROI_CALCULATION_ERROR = 'ROI_CALCULATION_ERROR',

  // Network errors
  NETWORK_ERROR = 'NETWORK_ERROR',
  CONNECTION_ERROR = 'CONNECTION_ERROR',
  TIMEOUT_ERROR = 'TIMEOUT_ERROR',
  
  // Retryable errors
  RETRYABLE_ERROR = 'RETRYABLE_ERROR',
  RATE_LIMIT_ERROR = 'RATE_LIMIT_ERROR',
  
  // System errors
  INTERNAL_ERROR = 'INTERNAL_ERROR',
  UNEXPECTED_ERROR = 'UNEXPECTED_ERROR',
}

/**
 * Context information for errors
 */
export interface ErrorContext {
  /** Service that generated the error */
  service?: string;
  /** Method that generated the error */
  method?: string;
  /** Component being processed */
  component?: string;
  /** Security level being processed */
  level?: string;
  /** Additional context information */
  [key: string]: unknown;
}

/**
 * Custom error class for service operations
 *
 * Provides structured error information with error codes and context
 * for better debugging and error handling.
 */
export class ServiceError extends Error {
  /**
   * Error code for categorization
   */
  public readonly code: ServiceErrorCode;

  /**
   * Context information about the error
   */
  public readonly context: ErrorContext;

  /**
   * Original error that caused this error (if any)
   */
  public readonly cause?: Error;

  /**
   * Timestamp when the error occurred
   */
  public readonly timestamp: Date;

  /**
   * Create a new ServiceError
   *
   * @param message - Human-readable error message
   * @param code - Error code for categorization
   * @param context - Additional context information
   * @param cause - Original error that caused this error
   */
  constructor(
    message: string,
    code: ServiceErrorCode = ServiceErrorCode.INTERNAL_ERROR,
    context: ErrorContext = {},
    cause?: Error
  ) {
    super(message);
    this.name = 'ServiceError';
    this.code = code;
    this.context = context;
    this.cause = cause;
    this.timestamp = new Date();

    // Maintain proper stack trace for where our error was thrown
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, ServiceError);
    }
  }

  /**
   * Get a formatted error message with context
   *
   * @returns Formatted error message
   */
  public getFormattedMessage(): string {
    const parts: string[] = [
      `[${this.code}] ${this.message}`,
    ];

    if (this.context.service) {
      parts.push(`Service: ${this.context.service}`);
    }

    if (this.context.method) {
      parts.push(`Method: ${this.context.method}`);
    }

    if (this.cause) {
      parts.push(`Cause: ${this.cause.message}`);
    }

    return parts.join(' | ');
  }

  /**
   * Serialize error cause for JSON output
   *
   * @returns Serialized cause or undefined
   */
  private serializeCause(): { message: string; stack?: string } | undefined {
    if (!this.cause) {
      return undefined;
    }
    return {
      message: this.cause.message,
      stack: this.cause.stack,
    };
  }

  /**
   * Convert error to JSON for logging
   *
   * @returns JSON representation of the error
   */
  public toJSON(): Record<string, unknown> {
    return {
      name: this.name,
      message: this.message,
      code: this.code,
      context: this.context,
      timestamp: this.timestamp.toISOString(),
      stack: this.stack,
      cause: this.serializeCause(),
    };
  }
}

/**
 * Create a validation error
 *
 * @param message - Error message
 * @param context - Error context
 * @returns ServiceError instance
 */
export function createValidationError(
  message: string,
  context: ErrorContext = {}
): ServiceError {
  return new ServiceError(
    message,
    ServiceErrorCode.VALIDATION_ERROR,
    context
  );
}

/**
 * Create a data not found error
 *
 * @param message - Error message
 * @param context - Error context
 * @returns ServiceError instance
 */
export function createDataNotFoundError(
  message: string,
  context: ErrorContext = {}
): ServiceError {
  return new ServiceError(
    message,
    ServiceErrorCode.DATA_NOT_FOUND,
    context
  );
}

/**
 * Create a calculation error
 *
 * @param message - Error message
 * @param context - Error context
 * @param cause - Original error
 * @returns ServiceError instance
 */
export function createCalculationError(
  message: string,
  context: ErrorContext = {},
  cause?: Error
): ServiceError {
  return new ServiceError(
    message,
    ServiceErrorCode.CALCULATION_ERROR,
    context,
    cause
  );
}

/**
 * Type guard to check if an error is a ServiceError
 *
 * @param error - Error to check
 * @returns True if error is a ServiceError
 */
export function isServiceError(error: unknown): error is ServiceError {
  return error instanceof ServiceError;
}

/**
 * Extract error message from unknown error type
 *
 * @param error - Error to extract message from
 * @returns Error message string
 */
export function getErrorMessage(error: unknown): string {
  if (isServiceError(error)) {
    return error.getFormattedMessage();
  }

  if (error instanceof Error) {
    return error.message;
  }

  if (typeof error === 'string') {
    return error;
  }

  return 'An unknown error occurred';
}

/**
 * Create a validation error using ServiceError
 * 
 * @param message - Error message
 * @param field - Optional field name that failed validation
 * @param context - Additional error context
 * @returns ServiceError instance
 */
export function createValidationServiceError(
  message: string,
  field?: string,
  context: ErrorContext = {}
): ServiceError {
  return new ServiceError(
    message,
    ServiceErrorCode.VALIDATION_ERROR,
    { ...context, field }
  );
}

/**
 * Create a network error using ServiceError
 * 
 * @param message - Error message
 * @param statusCode - Optional HTTP status code
 * @param context - Additional error context
 * @returns ServiceError instance
 */
export function createNetworkServiceError(
  message: string,
  statusCode?: number,
  context: ErrorContext = {}
): ServiceError {
  return new ServiceError(
    message,
    ServiceErrorCode.NETWORK_ERROR,
    { ...context, statusCode }
  );
}

/**
 * Create a retryable error using ServiceError
 * 
 * @param message - Error message
 * @param retryAfter - Optional retry delay in seconds
 * @param context - Additional error context
 * @returns ServiceError instance
 */
export function createRetryableServiceError(
  message: string,
  retryAfter?: number,
  context: ErrorContext = {}
): ServiceError {
  return new ServiceError(
    message,
    ServiceErrorCode.RETRYABLE_ERROR,
    { ...context, retryAfter }
  );
}

/**
 * Check if error is validation related
 */
export function isValidationError(error: unknown): boolean {
  return isServiceError(error) && error.code === ServiceErrorCode.VALIDATION_ERROR;
}

/**
 * Check if error is network related
 */
export function isNetworkError(error: unknown): boolean {
  return isServiceError(error) && (
    error.code === ServiceErrorCode.NETWORK_ERROR ||
    error.code === ServiceErrorCode.CONNECTION_ERROR ||
    error.code === ServiceErrorCode.TIMEOUT_ERROR
  );
}

/**
 * Check if error is retryable
 */
export function isRetryableError(error: unknown): boolean {
  return isServiceError(error) && (
    error.code === ServiceErrorCode.RETRYABLE_ERROR ||
    error.code === ServiceErrorCode.RATE_LIMIT_ERROR
  );
}
