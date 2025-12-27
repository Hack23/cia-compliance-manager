import { describe, it, expect } from 'vitest';
import {
  ServiceError,
  ServiceErrorCode,
  createValidationError,
  createDataNotFoundError,
  createCalculationError,
  isServiceError,
  getErrorMessage,
  type ErrorContext,
} from './errors';

describe('ServiceError', () => {
  describe('constructor', () => {
    it('should create a ServiceError with message and code', () => {
      const error = new ServiceError(
        'Test error',
        ServiceErrorCode.VALIDATION_ERROR
      );

      expect(error).toBeInstanceOf(Error);
      expect(error).toBeInstanceOf(ServiceError);
      expect(error.message).toBe('Test error');
      expect(error.code).toBe(ServiceErrorCode.VALIDATION_ERROR);
      expect(error.name).toBe('ServiceError');
      expect(error.timestamp).toBeInstanceOf(Date);
    });

    it('should create a ServiceError with context', () => {
      const context: ErrorContext = {
        service: 'TestService',
        method: 'testMethod',
        component: 'Confidentiality',
      };

      const error = new ServiceError(
        'Test error',
        ServiceErrorCode.VALIDATION_ERROR,
        context
      );

      expect(error.context).toEqual(context);
      expect(error.context.service).toBe('TestService');
      expect(error.context.method).toBe('testMethod');
      expect(error.context.component).toBe('Confidentiality');
    });

    it('should create a ServiceError with cause', () => {
      const cause = new Error('Original error');
      const error = new ServiceError(
        'Test error',
        ServiceErrorCode.CALCULATION_ERROR,
        {},
        cause
      );

      expect(error.cause).toBe(cause);
      expect(error.cause?.message).toBe('Original error');
    });

    it('should use INTERNAL_ERROR as default code', () => {
      const error = new ServiceError('Test error');

      expect(error.code).toBe(ServiceErrorCode.INTERNAL_ERROR);
    });

    it('should use empty context by default', () => {
      const error = new ServiceError('Test error');

      expect(error.context).toEqual({});
    });

    it('should capture stack trace', () => {
      const error = new ServiceError('Test error');

      expect(error.stack).toBeDefined();
      expect(error.stack).toContain('ServiceError');
    });
  });

  describe('getFormattedMessage', () => {
    it('should format message with code', () => {
      const error = new ServiceError(
        'Test error',
        ServiceErrorCode.VALIDATION_ERROR
      );

      const formatted = error.getFormattedMessage();
      expect(formatted).toBe('[VALIDATION_ERROR] Test error');
    });

    it('should include service in formatted message', () => {
      const error = new ServiceError(
        'Test error',
        ServiceErrorCode.VALIDATION_ERROR,
        { service: 'TestService' }
      );

      const formatted = error.getFormattedMessage();
      expect(formatted).toContain('Service: TestService');
    });

    it('should include method in formatted message', () => {
      const error = new ServiceError(
        'Test error',
        ServiceErrorCode.VALIDATION_ERROR,
        { method: 'testMethod' }
      );

      const formatted = error.getFormattedMessage();
      expect(formatted).toContain('Method: testMethod');
    });

    it('should include cause in formatted message', () => {
      const cause = new Error('Original error');
      const error = new ServiceError(
        'Test error',
        ServiceErrorCode.CALCULATION_ERROR,
        {},
        cause
      );

      const formatted = error.getFormattedMessage();
      expect(formatted).toContain('Cause: Original error');
    });

    it('should format message with all context', () => {
      const cause = new Error('Original error');
      const error = new ServiceError(
        'Test error',
        ServiceErrorCode.VALIDATION_ERROR,
        { service: 'TestService', method: 'testMethod' },
        cause
      );

      const formatted = error.getFormattedMessage();
      expect(formatted).toContain('[VALIDATION_ERROR] Test error');
      expect(formatted).toContain('Service: TestService');
      expect(formatted).toContain('Method: testMethod');
      expect(formatted).toContain('Cause: Original error');
    });
  });

  describe('toJSON', () => {
    it('should serialize error to JSON', () => {
      const error = new ServiceError(
        'Test error',
        ServiceErrorCode.VALIDATION_ERROR,
        { service: 'TestService' }
      );

      const json = error.toJSON();

      expect(json.name).toBe('ServiceError');
      expect(json.message).toBe('Test error');
      expect(json.code).toBe(ServiceErrorCode.VALIDATION_ERROR);
      expect(json.context).toEqual({ service: 'TestService' });
      expect(json.timestamp).toBeDefined();
      expect(json.stack).toBeDefined();
    });

    it('should include cause in JSON if present', () => {
      const cause = new Error('Original error');
      const error = new ServiceError(
        'Test error',
        ServiceErrorCode.CALCULATION_ERROR,
        {},
        cause
      );

      const json = error.toJSON();

      expect(json.cause).toBeDefined();
      expect((json.cause as { message: string }).message).toBe('Original error');
    });

    it('should not include cause in JSON if not present', () => {
      const error = new ServiceError('Test error');

      const json = error.toJSON();

      expect(json.cause).toBeUndefined();
    });

    it('should format timestamp as ISO string', () => {
      const error = new ServiceError('Test error');

      const json = error.toJSON();

      expect(typeof json.timestamp).toBe('string');
      expect(json.timestamp).toMatch(/^\d{4}-\d{2}-\d{2}T/);
    });
  });
});

describe('ServiceErrorCode', () => {
  it('should have validation error codes', () => {
    expect(ServiceErrorCode.VALIDATION_ERROR).toBe('VALIDATION_ERROR');
    expect(ServiceErrorCode.INVALID_SECURITY_LEVEL).toBe('INVALID_SECURITY_LEVEL');
    expect(ServiceErrorCode.INVALID_COMPONENT_TYPE).toBe('INVALID_COMPONENT_TYPE');
    expect(ServiceErrorCode.INVALID_INPUT).toBe('INVALID_INPUT');
    expect(ServiceErrorCode.MISSING_REQUIRED_FIELD).toBe('MISSING_REQUIRED_FIELD');
  });

  it('should have data access error codes', () => {
    expect(ServiceErrorCode.DATA_NOT_FOUND).toBe('DATA_NOT_FOUND');
    expect(ServiceErrorCode.DATA_PROVIDER_ERROR).toBe('DATA_PROVIDER_ERROR');
    expect(ServiceErrorCode.CONFIGURATION_ERROR).toBe('CONFIGURATION_ERROR');
  });

  it('should have business logic error codes', () => {
    expect(ServiceErrorCode.CALCULATION_ERROR).toBe('CALCULATION_ERROR');
    expect(ServiceErrorCode.COMPLIANCE_CHECK_ERROR).toBe('COMPLIANCE_CHECK_ERROR');
    expect(ServiceErrorCode.ROI_CALCULATION_ERROR).toBe('ROI_CALCULATION_ERROR');
  });

  it('should have system error codes', () => {
    expect(ServiceErrorCode.INTERNAL_ERROR).toBe('INTERNAL_ERROR');
    expect(ServiceErrorCode.UNEXPECTED_ERROR).toBe('UNEXPECTED_ERROR');
  });
});

describe('createValidationError', () => {
  it('should create a validation error', () => {
    const error = createValidationError('Invalid input');

    expect(error).toBeInstanceOf(ServiceError);
    expect(error.message).toBe('Invalid input');
    expect(error.code).toBe(ServiceErrorCode.VALIDATION_ERROR);
  });

  it('should create a validation error with context', () => {
    const context: ErrorContext = {
      service: 'TestService',
      field: 'securityLevel',
    };

    const error = createValidationError('Invalid security level', context);

    expect(error.context).toEqual(context);
    expect(error.context.service).toBe('TestService');
    expect(error.context.field).toBe('securityLevel');
  });

  it('should create a validation error with empty context by default', () => {
    const error = createValidationError('Invalid input');

    expect(error.context).toEqual({});
  });
});

describe('createDataNotFoundError', () => {
  it('should create a data not found error', () => {
    const error = createDataNotFoundError('Data not found');

    expect(error).toBeInstanceOf(ServiceError);
    expect(error.message).toBe('Data not found');
    expect(error.code).toBe(ServiceErrorCode.DATA_NOT_FOUND);
  });

  it('should create a data not found error with context', () => {
    const context: ErrorContext = {
      service: 'CIAContentService',
      component: 'Confidentiality',
      level: 'High',
    };

    const error = createDataNotFoundError('Component data not found', context);

    expect(error.context).toEqual(context);
    expect(error.context.service).toBe('CIAContentService');
    expect(error.context.component).toBe('Confidentiality');
  });

  it('should create a data not found error with empty context by default', () => {
    const error = createDataNotFoundError('Data not found');

    expect(error.context).toEqual({});
  });
});

describe('createCalculationError', () => {
  it('should create a calculation error', () => {
    const error = createCalculationError('Calculation failed');

    expect(error).toBeInstanceOf(ServiceError);
    expect(error.message).toBe('Calculation failed');
    expect(error.code).toBe(ServiceErrorCode.CALCULATION_ERROR);
  });

  it('should create a calculation error with context', () => {
    const context: ErrorContext = {
      service: 'BusinessImpactService',
      method: 'calculateROI',
    };

    const error = createCalculationError('ROI calculation failed', context);

    expect(error.context).toEqual(context);
    expect(error.context.service).toBe('BusinessImpactService');
  });

  it('should create a calculation error with cause', () => {
    const cause = new Error('Division by zero');
    const error = createCalculationError('Calculation failed', {}, cause);

    expect(error.cause).toBe(cause);
    expect(error.cause?.message).toBe('Division by zero');
  });

  it('should create a calculation error with empty context by default', () => {
    const error = createCalculationError('Calculation failed');

    expect(error.context).toEqual({});
  });

  it('should create a calculation error without cause by default', () => {
    const error = createCalculationError('Calculation failed');

    expect(error.cause).toBeUndefined();
  });
});

describe('isServiceError', () => {
  it('should return true for ServiceError instances', () => {
    const error = new ServiceError('Test error');

    expect(isServiceError(error)).toBe(true);
  });

  it('should return false for regular Error instances', () => {
    const error = new Error('Test error');

    expect(isServiceError(error)).toBe(false);
  });

  it('should return false for non-error values', () => {
    expect(isServiceError('error')).toBe(false);
    expect(isServiceError(null)).toBe(false);
    expect(isServiceError(undefined)).toBe(false);
    expect(isServiceError(123)).toBe(false);
    expect(isServiceError({})).toBe(false);
  });

  it('should work with validation error', () => {
    const error = createValidationError('Invalid input');

    expect(isServiceError(error)).toBe(true);
  });

  it('should work with data not found error', () => {
    const error = createDataNotFoundError('Data not found');

    expect(isServiceError(error)).toBe(true);
  });

  it('should work with calculation error', () => {
    const error = createCalculationError('Calculation failed');

    expect(isServiceError(error)).toBe(true);
  });
});

describe('getErrorMessage', () => {
  it('should get formatted message from ServiceError', () => {
    const error = new ServiceError(
      'Test error',
      ServiceErrorCode.VALIDATION_ERROR,
      { service: 'TestService' }
    );

    const message = getErrorMessage(error);

    expect(message).toContain('[VALIDATION_ERROR] Test error');
    expect(message).toContain('Service: TestService');
  });

  it('should get message from regular Error', () => {
    const error = new Error('Test error');

    const message = getErrorMessage(error);

    expect(message).toBe('Test error');
  });

  it('should return string as-is', () => {
    const message = getErrorMessage('Error string');

    expect(message).toBe('Error string');
  });

  it('should return default message for unknown error types', () => {
    expect(getErrorMessage(null)).toBe('An unknown error occurred');
    expect(getErrorMessage(undefined)).toBe('An unknown error occurred');
    expect(getErrorMessage(123)).toBe('An unknown error occurred');
    expect(getErrorMessage({})).toBe('An unknown error occurred');
  });

  it('should handle validation errors', () => {
    const error = createValidationError('Invalid input', { service: 'TestService' });

    const message = getErrorMessage(error);

    expect(message).toContain('VALIDATION_ERROR');
    expect(message).toContain('Invalid input');
  });

  it('should handle data not found errors', () => {
    const error = createDataNotFoundError('Data not found', { service: 'TestService' });

    const message = getErrorMessage(error);

    expect(message).toContain('DATA_NOT_FOUND');
    expect(message).toContain('Data not found');
  });

  it('should handle calculation errors with cause', () => {
    const cause = new Error('Original error');
    const error = createCalculationError('Calculation failed', {}, cause);

    const message = getErrorMessage(error);

    expect(message).toContain('CALCULATION_ERROR');
    expect(message).toContain('Calculation failed');
    expect(message).toContain('Cause: Original error');
  });
});

describe('ErrorContext', () => {
  it('should support service property', () => {
    const context: ErrorContext = { service: 'TestService' };
    expect(context.service).toBe('TestService');
  });

  it('should support method property', () => {
    const context: ErrorContext = { method: 'testMethod' };
    expect(context.method).toBe('testMethod');
  });

  it('should support component property', () => {
    const context: ErrorContext = { component: 'Confidentiality' };
    expect(context.component).toBe('Confidentiality');
  });

  it('should support level property', () => {
    const context: ErrorContext = { level: 'High' };
    expect(context.level).toBe('High');
  });

  it('should support custom properties', () => {
    const context: ErrorContext = {
      service: 'TestService',
      customField: 'custom value',
      numericField: 42,
    };

    expect(context.service).toBe('TestService');
    expect(context.customField).toBe('custom value');
    expect(context.numericField).toBe(42);
  });
});
