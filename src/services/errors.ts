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
 */
export enum ServiceErrorCode {
  // Validation errors (1000-1999)
  VALIDATION_ERROR = 'VALIDATION_ERROR',
  INVALID_SECURITY_LEVEL = 'INVALID_SECURITY_LEVEL',
  INVALID_COMPONENT_TYPE = 'INVALID_COMPONENT_TYPE',
  INVALID_INPUT = 'INVALID_INPUT',
  MISSING_REQUIRED_FIELD = 'MISSING_REQUIRED_FIELD',

  // Data access errors (2000-2999)
  DATA_NOT_FOUND = 'DATA_NOT_FOUND',
  DATA_PROVIDER_ERROR = 'DATA_PROVIDER_ERROR',
  CONFIGURATION_ERROR = 'CONFIGURATION_ERROR',

  // Business logic errors (3000-3999)
  CALCULATION_ERROR = 'CALCULATION_ERROR',
  COMPLIANCE_CHECK_ERROR = 'COMPLIANCE_CHECK_ERROR',
  ROI_CALCULATION_ERROR = 'ROI_CALCULATION_ERROR',

  // System errors (4000-4999)
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
 * Validation error for input validation failures
 */
export class ValidationError extends Error {
  public readonly field?: string;
  
  constructor(message: string, field?: string) {
    super(message);
    this.name = 'ValidationError';
    this.field = field;
    
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, ValidationError);
    }
  }
}

/**
 * Network error for connectivity issues
 */
export class NetworkError extends Error {
  public readonly statusCode?: number;
  
  constructor(message: string, statusCode?: number) {
    super(message);
    this.name = 'NetworkError';
    this.statusCode = statusCode;
    
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, NetworkError);
    }
  }
}

/**
 * Retryable error for operations that can be retried
 */
export class RetryableError extends Error {
  public readonly retryAfter?: number;
  public readonly retryCount?: number;
  
  constructor(message: string, retryAfter?: number, retryCount?: number) {
    super(message);
    this.name = 'RetryableError';
    this.retryAfter = retryAfter;
    this.retryCount = retryCount;
    
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, RetryableError);
    }
  }
}

/**
 * Type guard to check if an error is a ValidationError
 */
export function isValidationError(error: unknown): error is ValidationError {
  return error instanceof ValidationError;
}

/**
 * Type guard to check if an error is a NetworkError
 */
export function isNetworkError(error: unknown): error is NetworkError {
  return error instanceof NetworkError;
}

/**
 * Type guard to check if an error is a RetryableError
 */
export function isRetryableError(error: unknown): error is RetryableError {
  return error instanceof RetryableError;
}
