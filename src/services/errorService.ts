/**
 * # Centralized Error Service
 *
 * Provides centralized error handling, logging, and user-friendly message generation
 * across the entire application. This service standardizes error handling patterns
 * and provides consistent error reporting.
 *
 * ## Business Perspective
 * Ensures consistent error handling and reporting across the application, improving
 * user experience by providing clear, actionable error messages and enabling better
 * debugging through centralized logging. Critical for operational excellence. 🛡️
 *
 * ## Technical Perspective
 * Implements centralized error logging, user-friendly message generation, and
 * error recovery detection. Integrates with existing logger and error types.
 *
 * @packageDocumentation
 */

import logger from '../utils/logger';
import {
  isServiceError,
  isValidationError,
  isNetworkError,
  isRetryableError,
  ErrorContext,
  ServiceErrorCode,
} from './errors';

/**
 * Error severity levels for categorization
 */
export enum ErrorSeverity {
  /** Low severity - informational errors */
  LOW = 'low',
  /** Medium severity - user action may be needed */
  MEDIUM = 'medium',
  /** High severity - significant functionality impacted */
  HIGH = 'high',
  /** Critical severity - application-wide impact */
  CRITICAL = 'critical',
}

/**
 * Error log entry structure
 */
export interface ErrorLogEntry {
  /** Error message */
  message: string;
  /** Error severity */
  severity: ErrorSeverity;
  /** Error context */
  context?: ErrorContext;
  /** Error stack trace */
  stack?: string;
  /** Timestamp */
  timestamp: string;
  /** User-friendly message */
  userMessage: string;
  /** Whether the error is recoverable */
  recoverable: boolean;
}

/**
 * Centralized Error Service
 *
 * Provides consistent error handling, logging, and user-friendly message generation
 * across the entire application.
 *
 * @example
 * ```typescript
 * // Log an error with context
 * errorService.logError(
 *   new Error('Data fetch failed'),
 *   { service: 'ComplianceService', method: 'fetchData' }
 * );
 *
 * // Get user-friendly message
 * const message = errorService.getUserFriendlyMessage(error);
 *
 * // Check if error is recoverable
 * const canRetry = errorService.canRecover(error);
 * ```
 */
export class ErrorService {
  private static instance: ErrorService;

  /**
   * Get the singleton instance
   */
  public static getInstance(): ErrorService {
    if (!ErrorService.instance) {
      ErrorService.instance = new ErrorService();
    }
    return ErrorService.instance;
  }

  /**
   * Private constructor for singleton pattern
   */
  private constructor() {
    // Private constructor for singleton
  }

  /**
   * Log an error with context
   *
   * @param error - Error to log
   * @param context - Optional error context
   * @param severity - Error severity level
   */
  public logError(
    error: Error,
    context?: ErrorContext,
    severity: ErrorSeverity = ErrorSeverity.MEDIUM
  ): void {
    const logEntry: ErrorLogEntry = {
      message: error.message,
      severity,
      context,
      stack: error.stack,
      timestamp: new Date().toISOString(),
      userMessage: this.getUserFriendlyMessage(error),
      recoverable: this.canRecover(error),
    };

    // Log based on severity
    switch (severity) {
      case ErrorSeverity.CRITICAL:
      case ErrorSeverity.HIGH:
        logger.error('[CIA Compliance Manager Error]', {
          ...logEntry,
          error,
        });
        break;
      case ErrorSeverity.MEDIUM:
        logger.warn('[CIA Compliance Manager Warning]', {
          ...logEntry,
          error,
        });
        break;
      case ErrorSeverity.LOW:
        logger.info('[CIA Compliance Manager Info]', {
          ...logEntry,
          error,
        });
        break;
      default:
        logger.error('[CIA Compliance Manager Error]', {
          ...logEntry,
          error,
        });
    }

    // TODO: Integrate with external monitoring service (e.g., Sentry, LogRocket)
    // See docs/ERROR_HANDLING.md for future enhancement plan
    // this.sendToMonitoring(logEntry);
  }

  /**
   * Get a user-friendly error message
   *
   * @param error - Error to convert to user-friendly message
   * @returns User-friendly error message
   */
  public getUserFriendlyMessage(error: unknown): string {
    // Handle ServiceError with specific codes
    if (isServiceError(error)) {
      // Check for validation errors
      if (error.code === ServiceErrorCode.VALIDATION_ERROR) {
        const field = error.context.field as string | undefined;
        return field
          ? `Please check the ${field} field and try again.`
          : 'Please check your input and try again.';
      }
      
      // Check for network errors
      if (isNetworkError(error)) {
        const statusCode = error.context.statusCode as number | undefined;
        if (statusCode === 404) {
          return 'The requested resource was not found.';
        }
        if (statusCode === 401 || statusCode === 403) {
          return 'You do not have permission to access this resource.';
        }
        if (statusCode && statusCode >= 500) {
          return 'Server error. Please try again later.';
        }
        return 'Network connection issue. Please check your connection and try again.';
      }
      
      // Check for retryable errors
      if (isRetryableError(error)) {
        const retryAfter = error.context.retryAfter as number | undefined;
        return retryAfter
          ? `Operation failed. Please try again in ${retryAfter} seconds.`
          : 'Operation failed. Please try again.';
      }
      
      // Handle other service error codes
      switch (error.code) {
        case ServiceErrorCode.INVALID_SECURITY_LEVEL:
        case ServiceErrorCode.INVALID_COMPONENT_TYPE:
        case ServiceErrorCode.INVALID_INPUT:
        case ServiceErrorCode.MISSING_REQUIRED_FIELD:
          return 'Invalid input provided. Please check your data and try again.';
        
        case ServiceErrorCode.DATA_NOT_FOUND:
          return 'The requested data could not be found.';
        
        case ServiceErrorCode.DATA_PROVIDER_ERROR:
        case ServiceErrorCode.CONFIGURATION_ERROR:
          return 'System configuration error. Please contact support.';
        
        case ServiceErrorCode.CALCULATION_ERROR:
        case ServiceErrorCode.COMPLIANCE_CHECK_ERROR:
        case ServiceErrorCode.ROI_CALCULATION_ERROR:
          return 'Error processing your request. Please try again.';
        
        case ServiceErrorCode.TIMEOUT_ERROR:
          return 'Operation timed out. Please try again.';
        
        case ServiceErrorCode.CONNECTION_ERROR:
          return 'Connection error. Please check your network.';
        
        case ServiceErrorCode.RATE_LIMIT_ERROR:
          return 'Too many requests. Please wait a moment and try again.';
        
        case ServiceErrorCode.INTERNAL_ERROR:
        case ServiceErrorCode.UNEXPECTED_ERROR:
        default:
          return 'An unexpected error occurred. Please try again.';
      }
    }

    // Handle standard Error
    if (error instanceof Error) {
      // Check for known error patterns in the message
      const msg = error.message.toLowerCase();
      if (msg.includes('network') || msg.includes('fetch')) {
        return 'Network connection issue. Please check your connection and try again.';
      }
      if (msg.includes('timeout')) {
        return 'Operation timed out. Please try again.';
      }
      if (msg.includes('permission') || msg.includes('unauthorized')) {
        return 'You do not have permission to perform this action.';
      }
    }

    // Default fallback message
    return 'An unexpected error occurred. Please try again.';
  }

  /**
   * Check if an error can be recovered from
   *
   * @param error - Error to check
   * @returns True if the error is recoverable
   */
  public canRecover(error: unknown): boolean {
    // Retryable ServiceErrors are explicitly marked as recoverable
    if (isRetryableError(error)) {
      return true;
    }

    // Network ServiceErrors are generally recoverable
    if (isNetworkError(error)) {
      return true;
    }

    // Validation ServiceErrors are recoverable through user correction
    if (isValidationError(error)) {
      return true;
    }

    // Other ServiceErrors - check code
    if (isServiceError(error)) {
      switch (error.code) {
        case ServiceErrorCode.INVALID_SECURITY_LEVEL:
        case ServiceErrorCode.INVALID_COMPONENT_TYPE:
        case ServiceErrorCode.INVALID_INPUT:
        case ServiceErrorCode.MISSING_REQUIRED_FIELD:
        case ServiceErrorCode.DATA_NOT_FOUND:
        case ServiceErrorCode.TIMEOUT_ERROR:
        case ServiceErrorCode.CONNECTION_ERROR:
        case ServiceErrorCode.RATE_LIMIT_ERROR:
          return true;
        default:
          return false;
      }
    }

    // Standard errors - check message for known recoverable patterns
    if (error instanceof Error) {
      const msg = error.message.toLowerCase();
      if (msg.includes('network') || msg.includes('timeout') || msg.includes('fetch')) {
        return true;
      }
    }

    // By default, assume errors are not recoverable
    return false;
  }

  /**
   * Get error severity based on error type
   *
   * @param error - Error to analyze
   * @returns Error severity level
   */
  public getErrorSeverity(error: unknown): ErrorSeverity {
    // Handle ServiceErrors
    if (isServiceError(error)) {
      // Validation errors are usually low severity
      if (error.code === ServiceErrorCode.VALIDATION_ERROR) {
        return ErrorSeverity.LOW;
      }
      
      // Network errors severity depends on status code
      if (isNetworkError(error)) {
        const statusCode = error.context.statusCode as number | undefined;
        if (statusCode && statusCode >= 500) {
          return ErrorSeverity.HIGH;
        }
        return ErrorSeverity.MEDIUM;
      }
      
      // Retryable errors are medium severity
      if (isRetryableError(error)) {
        return ErrorSeverity.MEDIUM;
      }
      
      // Other error codes
      switch (error.code) {
        case ServiceErrorCode.INVALID_INPUT:
        case ServiceErrorCode.MISSING_REQUIRED_FIELD:
          return ErrorSeverity.LOW;
        
        case ServiceErrorCode.DATA_NOT_FOUND:
        case ServiceErrorCode.INVALID_SECURITY_LEVEL:
        case ServiceErrorCode.INVALID_COMPONENT_TYPE:
        case ServiceErrorCode.TIMEOUT_ERROR:
        case ServiceErrorCode.CONNECTION_ERROR:
          return ErrorSeverity.MEDIUM;
        
        case ServiceErrorCode.DATA_PROVIDER_ERROR:
        case ServiceErrorCode.CONFIGURATION_ERROR:
        case ServiceErrorCode.CALCULATION_ERROR:
        case ServiceErrorCode.COMPLIANCE_CHECK_ERROR:
        case ServiceErrorCode.ROI_CALCULATION_ERROR:
          return ErrorSeverity.HIGH;
        
        case ServiceErrorCode.INTERNAL_ERROR:
        case ServiceErrorCode.UNEXPECTED_ERROR:
        case ServiceErrorCode.RATE_LIMIT_ERROR:
          return ErrorSeverity.CRITICAL;
        
        default:
          return ErrorSeverity.HIGH;
      }
    }

    // Default to HIGH for unknown error types
    return ErrorSeverity.HIGH;
  }

  /**
   * Create a formatted error message for display
   *
   * @param error - Error to format
   * @param includeDetails - Whether to include technical details
   * @returns Formatted error message
   */
  public formatErrorForDisplay(error: unknown, includeDetails: boolean = false): string {
    const userMessage = this.getUserFriendlyMessage(error);
    
    if (!includeDetails) {
      return userMessage;
    }

    if (error instanceof Error) {
      return `${userMessage}\n\nTechnical details: ${error.message}`;
    }

    return userMessage;
  }
}

/**
 * Export singleton instance for convenient access
 */
export const errorService = ErrorService.getInstance();

/**
 * Export default instance
 */
export default errorService;
