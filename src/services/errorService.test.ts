/**
 * Tests for ErrorService
 */

import { describe, it, expect, vi, beforeEach } from 'vitest';
import {
  ErrorService,
  errorService,
  ErrorSeverity,
} from './errorService';
import {
  ServiceError,
  ServiceErrorCode,
  createValidationServiceError,
  createNetworkServiceError,
  createRetryableServiceError,
} from './errors';
import logger from '../utils/logger';

// Mock logger
vi.mock('../utils/logger', () => ({
  default: {
    error: vi.fn(),
    warn: vi.fn(),
    info: vi.fn(),
    debug: vi.fn(),
    log: vi.fn(),
  },
}));

describe('ErrorService', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('getInstance', () => {
    it('should return singleton instance', () => {
      const instance1 = ErrorService.getInstance();
      const instance2 = ErrorService.getInstance();
      expect(instance1).toBe(instance2);
    });

    it('should return same instance as exported errorService', () => {
      const instance = ErrorService.getInstance();
      expect(instance).toBe(errorService);
    });
  });

  describe('logError', () => {
    it('should log error with correct severity', () => {
      const error = new Error('Test error');
      const context = { service: 'TestService', method: 'testMethod' };
      
      errorService.logError(error, context, ErrorSeverity.HIGH);
      
      expect(logger.error).toHaveBeenCalledWith(
        '[CIA Compliance Manager Error]',
        expect.objectContaining({
          message: 'Test error',
          severity: ErrorSeverity.HIGH,
          context,
        })
      );
    });

    it('should log warning for medium severity', () => {
      const error = new Error('Test warning');
      
      errorService.logError(error, undefined, ErrorSeverity.MEDIUM);
      
      expect(logger.warn).toHaveBeenCalled();
    });

    it('should log info for low severity', () => {
      const error = new Error('Test info');
      
      errorService.logError(error, undefined, ErrorSeverity.LOW);
      
      expect(logger.info).toHaveBeenCalled();
    });

    it('should default to medium severity', () => {
      const error = new Error('Test error');
      
      errorService.logError(error);
      
      expect(logger.warn).toHaveBeenCalled();
    });
  });

  describe('getUserFriendlyMessage', () => {
    it('should return user-friendly message for ValidationError', () => {
      const error = createValidationServiceError('Invalid email', 'email');
      const message = errorService.getUserFriendlyMessage(error);
      
      expect(message).toBe('Please check the email field and try again.');
    });

    it('should return generic validation message for ValidationError without field', () => {
      const error = createValidationServiceError('Invalid input');
      const message = errorService.getUserFriendlyMessage(error);
      
      expect(message).toBe('Please check your input and try again.');
    });

    it('should return user-friendly message for NetworkError 404', () => {
      const error = createNetworkServiceError('Not found', 404);
      const message = errorService.getUserFriendlyMessage(error);
      
      expect(message).toBe('The requested resource was not found.');
    });

    it('should return user-friendly message for NetworkError 401', () => {
      const error = createNetworkServiceError('Unauthorized', 401);
      const message = errorService.getUserFriendlyMessage(error);
      
      expect(message).toBe('You do not have permission to access this resource.');
    });

    it('should return user-friendly message for NetworkError 500', () => {
      const error = createNetworkServiceError('Server error', 500);
      const message = errorService.getUserFriendlyMessage(error);
      
      expect(message).toBe('Server error. Please try again later.');
    });

    it('should return user-friendly message for NetworkError without status', () => {
      const error = createNetworkServiceError('Connection failed');
      const message = errorService.getUserFriendlyMessage(error);
      
      expect(message).toBe('Network connection issue. Please check your connection and try again.');
    });

    it('should return user-friendly message for RetryableError with retry time', () => {
      const error = createRetryableServiceError('Rate limited', 60);
      const message = errorService.getUserFriendlyMessage(error);
      
      expect(message).toBe('Operation failed. Please try again in 60 seconds.');
    });

    it('should return user-friendly message for RetryableError without retry time', () => {
      const error = createRetryableServiceError('Temporary failure');
      const message = errorService.getUserFriendlyMessage(error);
      
      expect(message).toBe('Operation failed. Please try again.');
    });

    it('should return user-friendly message for ServiceError validation codes', () => {
      const error = new ServiceError(
        'Invalid level',
        ServiceErrorCode.INVALID_SECURITY_LEVEL
      );
      const message = errorService.getUserFriendlyMessage(error);
      
      expect(message).toBe('Invalid input provided. Please check your data and try again.');
    });

    it('should return user-friendly message for ServiceError data not found', () => {
      const error = new ServiceError(
        'Data missing',
        ServiceErrorCode.DATA_NOT_FOUND
      );
      const message = errorService.getUserFriendlyMessage(error);
      
      expect(message).toBe('The requested data could not be found.');
    });

    it('should return user-friendly message for ServiceError configuration error', () => {
      const error = new ServiceError(
        'Config issue',
        ServiceErrorCode.CONFIGURATION_ERROR
      );
      const message = errorService.getUserFriendlyMessage(error);
      
      expect(message).toBe('System configuration error. Please contact support.');
    });

    it('should return user-friendly message for ServiceError calculation error', () => {
      const error = new ServiceError(
        'Math failed',
        ServiceErrorCode.CALCULATION_ERROR
      );
      const message = errorService.getUserFriendlyMessage(error);
      
      expect(message).toBe('Error processing your request. Please try again.');
    });

    it('should return user-friendly message for standard Error with network keyword', () => {
      const error = new Error('Network connection timeout');
      const message = errorService.getUserFriendlyMessage(error);
      
      expect(message).toBe('Network connection issue. Please check your connection and try again.');
    });

    it('should return user-friendly message for standard Error with timeout keyword', () => {
      const error = new Error('Operation timeout exceeded');
      const message = errorService.getUserFriendlyMessage(error);
      
      expect(message).toBe('Operation timed out. Please try again.');
    });

    it('should return default message for unknown error', () => {
      const error = new Error('Unknown error type');
      const message = errorService.getUserFriendlyMessage(error);
      
      expect(message).toBe('An unexpected error occurred. Please try again.');
    });
  });

  describe('canRecover', () => {
    it('should return true for RetryableError', () => {
      const error = createRetryableServiceError('Temporary failure');
      expect(errorService.canRecover(error)).toBe(true);
    });

    it('should return true for NetworkError with server error', () => {
      const error = createNetworkServiceError('Server error', 500);
      expect(errorService.canRecover(error)).toBe(true);
    });

    it('should return true for NetworkError without status', () => {
      const error = createNetworkServiceError('Connection failed');
      expect(errorService.canRecover(error)).toBe(true);
    });

    it('should return true for ValidationError', () => {
      const error = createValidationServiceError('Invalid input');
      expect(errorService.canRecover(error)).toBe(true);
    });

    it('should return true for ServiceError validation codes', () => {
      const error = new ServiceError(
        'Invalid input',
        ServiceErrorCode.VALIDATION_ERROR
      );
      expect(errorService.canRecover(error)).toBe(true);
    });

    it('should return true for ServiceError data not found', () => {
      const error = new ServiceError(
        'Data missing',
        ServiceErrorCode.DATA_NOT_FOUND
      );
      expect(errorService.canRecover(error)).toBe(true);
    });

    it('should return false for ServiceError internal error', () => {
      const error = new ServiceError(
        'Internal failure',
        ServiceErrorCode.INTERNAL_ERROR
      );
      expect(errorService.canRecover(error)).toBe(false);
    });

    it('should return true for standard Error with network keyword', () => {
      const error = new Error('Network connection failed');
      expect(errorService.canRecover(error)).toBe(true);
    });

    it('should return false for unknown error types', () => {
      const error = new Error('Critical system failure');
      expect(errorService.canRecover(error)).toBe(false);
    });
  });

  describe('getErrorSeverity', () => {
    it('should return LOW for ValidationError', () => {
      const error = createValidationServiceError('Invalid input');
      expect(errorService.getErrorSeverity(error)).toBe(ErrorSeverity.LOW);
    });

    it('should return HIGH for NetworkError with server error', () => {
      const error = createNetworkServiceError('Server error', 500);
      expect(errorService.getErrorSeverity(error)).toBe(ErrorSeverity.HIGH);
    });

    it('should return MEDIUM for NetworkError without server error', () => {
      const error = createNetworkServiceError('Connection failed', 404);
      expect(errorService.getErrorSeverity(error)).toBe(ErrorSeverity.MEDIUM);
    });

    it('should return MEDIUM for RetryableError', () => {
      const error = createRetryableServiceError('Temporary failure');
      expect(errorService.getErrorSeverity(error)).toBe(ErrorSeverity.MEDIUM);
    });

    it('should return LOW for ServiceError validation codes', () => {
      const error = new ServiceError(
        'Invalid input',
        ServiceErrorCode.VALIDATION_ERROR
      );
      expect(errorService.getErrorSeverity(error)).toBe(ErrorSeverity.LOW);
    });

    it('should return MEDIUM for ServiceError data not found', () => {
      const error = new ServiceError(
        'Data missing',
        ServiceErrorCode.DATA_NOT_FOUND
      );
      expect(errorService.getErrorSeverity(error)).toBe(ErrorSeverity.MEDIUM);
    });

    it('should return HIGH for ServiceError calculation error', () => {
      const error = new ServiceError(
        'Math failed',
        ServiceErrorCode.CALCULATION_ERROR
      );
      expect(errorService.getErrorSeverity(error)).toBe(ErrorSeverity.HIGH);
    });

    it('should return CRITICAL for ServiceError internal error', () => {
      const error = new ServiceError(
        'Internal failure',
        ServiceErrorCode.INTERNAL_ERROR
      );
      expect(errorService.getErrorSeverity(error)).toBe(ErrorSeverity.CRITICAL);
    });

    it('should return HIGH for unknown error types', () => {
      const error = new Error('Unknown error');
      expect(errorService.getErrorSeverity(error)).toBe(ErrorSeverity.HIGH);
    });
  });

  describe('formatErrorForDisplay', () => {
    it('should return user-friendly message without details', () => {
      const error = createValidationServiceError('Invalid email', 'email');
      const formatted = errorService.formatErrorForDisplay(error, false);
      
      expect(formatted).toBe('Please check the email field and try again.');
    });

    it('should return user-friendly message with technical details when includeDetails is true', () => {
      const error = new Error('Technical error message');
      const formatted = errorService.formatErrorForDisplay(error, true);
      
      expect(formatted).toContain('An unexpected error occurred. Please try again.');
      expect(formatted).toContain('Technical details: Technical error message');
    });

    it('should return user-friendly message only when error is not Error instance', () => {
      const error = 'String error';
      const formatted = errorService.formatErrorForDisplay(error, true);
      
      expect(formatted).toBe('An unexpected error occurred. Please try again.');
    });
  });
});
