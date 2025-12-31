import { renderHook, act } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { useWidgetError } from './useWidgetError';
import logger from '../utils/logger';

// Mock the logger
vi.mock('../utils/logger', () => ({
  default: {
    error: vi.fn(),
    warn: vi.fn(),
    info: vi.fn(),
    debug: vi.fn(),
  },
}));

describe('useWidgetError', () => {
  const widgetName = 'TestWidget';

  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('Initial State', () => {
    it('should initialize with no error', () => {
      const { result } = renderHook(() => useWidgetError(widgetName));

      expect(result.current.error).toBeNull();
      expect(result.current.hasError).toBe(false);
    });

    it('should provide all required methods', () => {
      const { result } = renderHook(() => useWidgetError(widgetName));

      expect(typeof result.current.clearError).toBe('function');
      expect(typeof result.current.setError).toBe('function');
      expect(typeof result.current.handleError).toBe('function');
    });
  });

  describe('setError', () => {
    it('should set an error and log it', () => {
      const { result } = renderHook(() => useWidgetError(widgetName));
      const testError = new Error('Test error message');

      act(() => {
        result.current.setError(testError);
      });

      expect(result.current.error).toBe(testError);
      expect(result.current.hasError).toBe(true);
      expect(logger.error).toHaveBeenCalledWith(
        `${widgetName}: Test error message`,
        testError
      );
    });

    it('should update error when called multiple times', () => {
      const { result } = renderHook(() => useWidgetError(widgetName));
      const error1 = new Error('First error');
      const error2 = new Error('Second error');

      act(() => {
        result.current.setError(error1);
      });

      expect(result.current.error).toBe(error1);

      act(() => {
        result.current.setError(error2);
      });

      expect(result.current.error).toBe(error2);
      expect(logger.error).toHaveBeenCalledTimes(2);
    });
  });

  describe('handleError', () => {
    it('should handle Error instances', () => {
      const { result } = renderHook(() => useWidgetError(widgetName));
      const testError = new Error('Test error');

      act(() => {
        result.current.handleError(testError);
      });

      expect(result.current.error).toBe(testError);
      expect(result.current.hasError).toBe(true);
      expect(logger.error).toHaveBeenCalledWith(
        `${widgetName}: Test error`,
        testError
      );
    });

    it('should convert string errors to Error objects', () => {
      const { result } = renderHook(() => useWidgetError(widgetName));
      const errorMessage = 'String error message';

      act(() => {
        result.current.handleError(errorMessage);
      });

      expect(result.current.error).toBeInstanceOf(Error);
      expect(result.current.error?.message).toBe(errorMessage);
      expect(result.current.hasError).toBe(true);
    });

    it('should handle unknown error types with generic message', () => {
      const { result } = renderHook(() => useWidgetError(widgetName));
      const unknownError = { code: 500, status: 'failed' };

      act(() => {
        result.current.handleError(unknownError);
      });

      expect(result.current.error).toBeInstanceOf(Error);
      expect(result.current.error?.message).toBe(`${widgetName}: Unknown error occurred`);
      expect(result.current.hasError).toBe(true);
    });

    it('should handle null and undefined errors', () => {
      const { result } = renderHook(() => useWidgetError(widgetName));

      act(() => {
        result.current.handleError(null);
      });

      expect(result.current.error).toBeInstanceOf(Error);
      expect(result.current.hasError).toBe(true);

      act(() => {
        result.current.clearError();
      });

      act(() => {
        result.current.handleError(undefined);
      });

      expect(result.current.error).toBeInstanceOf(Error);
      expect(result.current.hasError).toBe(true);
    });
  });

  describe('clearError', () => {
    it('should clear the error state', () => {
      const { result } = renderHook(() => useWidgetError(widgetName));
      const testError = new Error('Test error');

      act(() => {
        result.current.setError(testError);
      });

      expect(result.current.hasError).toBe(true);

      act(() => {
        result.current.clearError();
      });

      expect(result.current.error).toBeNull();
      expect(result.current.hasError).toBe(false);
    });

    it('should be safe to call multiple times', () => {
      const { result } = renderHook(() => useWidgetError(widgetName));

      act(() => {
        result.current.clearError();
        result.current.clearError();
        result.current.clearError();
      });

      expect(result.current.error).toBeNull();
      expect(result.current.hasError).toBe(false);
    });

    it('should be safe to call when no error exists', () => {
      const { result } = renderHook(() => useWidgetError(widgetName));

      act(() => {
        result.current.clearError();
      });

      expect(result.current.error).toBeNull();
      expect(result.current.hasError).toBe(false);
    });
  });

  describe('Widget Name Context', () => {
    it('should include widget name in error logs', () => {
      const customWidgetName = 'SecurityMetricsWidget';
      const { result } = renderHook(() => useWidgetError(customWidgetName));
      const testError = new Error('Service unavailable');

      act(() => {
        result.current.setError(testError);
      });

      expect(logger.error).toHaveBeenCalledWith(
        `${customWidgetName}: Service unavailable`,
        testError
      );
    });

    it('should include widget name in unknown error messages', () => {
      const customWidgetName = 'ComplianceWidget';
      const { result } = renderHook(() => useWidgetError(customWidgetName));

      act(() => {
        result.current.handleError(123);
      });

      expect(result.current.error?.message).toContain(customWidgetName);
    });
  });

  describe('Integration Scenarios', () => {
    it('should support error recovery workflow', () => {
      const { result } = renderHook(() => useWidgetError(widgetName));
      const error1 = new Error('Network error');
      const error2 = new Error('Retry failed');

      // First attempt fails
      act(() => {
        result.current.handleError(error1);
      });
      expect(result.current.hasError).toBe(true);

      // Clear error for retry
      act(() => {
        result.current.clearError();
      });
      expect(result.current.hasError).toBe(false);

      // Second attempt fails
      act(() => {
        result.current.handleError(error2);
      });
      expect(result.current.hasError).toBe(true);
      expect(result.current.error).toBe(error2);
    });

    it('should maintain stable function references', () => {
      const { result, rerender } = renderHook(() => useWidgetError(widgetName));
      
      const initialClearError = result.current.clearError;
      const initialSetError = result.current.setError;
      const initialHandleError = result.current.handleError;

      rerender();

      expect(result.current.clearError).toBe(initialClearError);
      expect(result.current.setError).toBe(initialSetError);
      expect(result.current.handleError).toBe(initialHandleError);
    });
  });
});
