/**
 * Tests for ErrorContext
 */

import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import { renderHook, act } from '@testing-library/react';
import { useEffect } from 'react';
import { ErrorProvider, useError } from './ErrorContext';
import * as errorServiceModule from '../services/errorService';

// Mock errorService
vi.mock('../services/errorService', () => ({
  errorService: {
    logError: vi.fn(),
    getUserFriendlyMessage: vi.fn(() => 'An unexpected error occurred. Please try again.'),
    canRecover: vi.fn(() => true),
  },
  ErrorSeverity: {
    LOW: 'low',
    MEDIUM: 'medium',
    HIGH: 'high',
    CRITICAL: 'critical',
  },
}));

// Mock ErrorToast component
vi.mock('../components/common/ErrorToast', () => ({
  default: ({ message, title, isVisible, onDismiss, onRetry }: {
    message: string;
    title?: string;
    isVisible: boolean;
    onDismiss: () => void;
    onRetry?: () => void;
  }) => (
    isVisible ? (
      <div data-testid="error-toast">
        <div data-testid="error-toast-title">{title || 'Error'}</div>
        <div data-testid="error-toast-message">{message}</div>
        <button onClick={onDismiss} data-testid="error-toast-close">Close</button>
        {onRetry && (
          <button onClick={onRetry} data-testid="error-toast-retry">Retry</button>
        )}
      </div>
    ) : null
  ),
}));

describe('ErrorContext', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('ErrorProvider', () => {
    it('should render children', () => {
      render(
        <ErrorProvider>
          <div>Test content</div>
        </ErrorProvider>
      );

      expect(screen.getByText('Test content')).toBeInTheDocument();
    });

    it('should provide error context to children', () => {
      const TestComponent = () => {
        const { errors } = useError();
        return <div>Errors: {errors.length}</div>;
      };

      render(
        <ErrorProvider>
          <TestComponent />
        </ErrorProvider>
      );

      expect(screen.getByText('Errors: 0')).toBeInTheDocument();
    });
  });

  describe('useError hook', () => {
    it('should throw error when used outside ErrorProvider', () => {
      // Suppress console.error for this test
      const consoleError = vi.spyOn(console, 'error').mockImplementation(() => {});

      expect(() => {
        renderHook(() => useError());
      }).toThrow('useError must be used within an ErrorProvider');

      consoleError.mockRestore();
    });

    it('should return context value when used inside ErrorProvider', () => {
      const { result } = renderHook(() => useError(), {
        wrapper: ErrorProvider,
      });

      expect(result.current).toHaveProperty('errors');
      expect(result.current).toHaveProperty('addError');
      expect(result.current).toHaveProperty('clearError');
      expect(result.current).toHaveProperty('clearAllErrors');
      expect(result.current).toHaveProperty('showToast');
      expect(result.current).toHaveProperty('hideToast');
      expect(result.current).toHaveProperty('getLatestError');
    });
  });

  describe('addError', () => {
    it('should add error to errors list', () => {
      const { result } = renderHook(() => useError(), {
        wrapper: ErrorProvider,
      });

      expect(result.current.errors).toHaveLength(0);

      act(() => {
        result.current.addError(new Error('Test error'));
      });

      expect(result.current.errors).toHaveLength(1);
      expect(result.current.errors[0].error.message).toBe('Test error');
    });

    it('should log error using error service', () => {
      const mockLogError = errorServiceModule.errorService.logError as ReturnType<typeof vi.fn>;
      
      const { result } = renderHook(() => useError(), {
        wrapper: ErrorProvider,
      });

      const error = new Error('Test error');
      const context = { component: 'TestComponent' };

      act(() => {
        result.current.addError(error, context);
      });

      expect(mockLogError).toHaveBeenCalledWith(error, context);
    });

    it('should generate user-friendly message for error', () => {
      const mockGetUserFriendlyMessage = errorServiceModule.errorService.getUserFriendlyMessage as ReturnType<typeof vi.fn>;
      mockGetUserFriendlyMessage.mockReturnValue('User-friendly message');

      const { result } = renderHook(() => useError(), {
        wrapper: ErrorProvider,
      });

      act(() => {
        result.current.addError(new Error('Test error'));
      });

      expect(result.current.errors[0].message).toBe('User-friendly message');
    });

    it('should check if error is recoverable', () => {
      const mockCanRecover = errorServiceModule.errorService.canRecover as ReturnType<typeof vi.fn>;
      mockCanRecover.mockReturnValue(false);

      const { result } = renderHook(() => useError(), {
        wrapper: ErrorProvider,
      });

      act(() => {
        result.current.addError(new Error('Test error'));
      });

      expect(result.current.errors[0].recoverable).toBe(false);
    });

    it('should limit errors to maxErrors', () => {
      const { result } = renderHook(() => useError(), {
        wrapper: ({ children }) => (
          <ErrorProvider maxErrors={3}>{children}</ErrorProvider>
        ),
      });

      act(() => {
        result.current.addError(new Error('Error 1'));
        result.current.addError(new Error('Error 2'));
        result.current.addError(new Error('Error 3'));
        result.current.addError(new Error('Error 4'));
      });

      expect(result.current.errors).toHaveLength(3);
      expect(result.current.errors[0].error.message).toBe('Error 4');
    });

    it('should include context in error entry', () => {
      const { result } = renderHook(() => useError(), {
        wrapper: ErrorProvider,
      });

      const context = { component: 'TestComponent', action: 'save' };

      act(() => {
        result.current.addError(new Error('Test error'), context);
      });

      expect(result.current.errors[0].context).toEqual(context);
    });
  });

  describe('clearError', () => {
    it('should remove specific error from list', () => {
      const { result } = renderHook(() => useError(), {
        wrapper: ErrorProvider,
      });

      act(() => {
        result.current.addError(new Error('Error 1'));
        result.current.addError(new Error('Error 2'));
      });

      expect(result.current.errors).toHaveLength(2);

      const errorId = result.current.errors[0].id;

      act(() => {
        result.current.clearError(errorId);
      });

      expect(result.current.errors).toHaveLength(1);
      expect(result.current.errors[0].error.message).toBe('Error 1');
    });

    it('should not affect other errors when clearing specific error', () => {
      const { result } = renderHook(() => useError(), {
        wrapper: ErrorProvider,
      });

      act(() => {
        result.current.addError(new Error('Error 1'));
        result.current.addError(new Error('Error 2'));
        result.current.addError(new Error('Error 3'));
      });

      const middleErrorId = result.current.errors[1].id;

      act(() => {
        result.current.clearError(middleErrorId);
      });

      expect(result.current.errors).toHaveLength(2);
      expect(result.current.errors.map(e => e.error.message)).toEqual(['Error 3', 'Error 1']);
    });
  });

  describe('clearAllErrors', () => {
    it('should remove all errors from list', () => {
      const { result } = renderHook(() => useError(), {
        wrapper: ErrorProvider,
      });

      act(() => {
        result.current.addError(new Error('Error 1'));
        result.current.addError(new Error('Error 2'));
        result.current.addError(new Error('Error 3'));
      });

      expect(result.current.errors).toHaveLength(3);

      act(() => {
        result.current.clearAllErrors();
      });

      expect(result.current.errors).toHaveLength(0);
    });
  });

  describe('showToast', () => {
    it('should display toast with message', async () => {
      const { result } = renderHook(() => useError(), {
        wrapper: ErrorProvider,
      });

      render(<ErrorProvider><div /></ErrorProvider>);

      act(() => {
        result.current.showToast({
          message: 'Test toast message',
        });
      });

      await waitFor(() => {
        expect(screen.getByTestId('error-toast-message')).toHaveTextContent('Test toast message');
      });
    });

    it('should display toast with custom title', async () => {
      const { result } = renderHook(() => useError(), {
        wrapper: ErrorProvider,
      });

      render(<ErrorProvider><div /></ErrorProvider>);

      act(() => {
        result.current.showToast({
          title: 'Custom Title',
          message: 'Test message',
        });
      });

      await waitFor(() => {
        expect(screen.getByTestId('error-toast-title')).toHaveTextContent('Custom Title');
      });
    });

    it('should display toast with retry button when retry provided', async () => {
      let retryFn: (() => void) | undefined;
      
      function TestComponent() {
        const { showToast } = useError();
        retryFn = vi.fn();
        
        useEffect(() => {
          showToast({
            message: 'Test message',
            retry: retryFn,
          });
        }, [showToast]);
        
        return <div />;
      }

      render(
        <ErrorProvider>
          <TestComponent />
        </ErrorProvider>
      );

      await waitFor(() => {
        expect(screen.getByTestId('error-toast-retry-button')).toBeInTheDocument();
      });
    });
  });

  describe('hideToast', () => {
    it('should hide the toast', async () => {
      const { result } = renderHook(() => useError(), {
        wrapper: ErrorProvider,
      });

      render(<ErrorProvider><div /></ErrorProvider>);

      act(() => {
        result.current.showToast({
          message: 'Test message',
        });
      });

      await waitFor(() => {
        expect(screen.getByTestId('error-toast')).toBeInTheDocument();
      });

      act(() => {
        result.current.hideToast();
      });

      await waitFor(() => {
        expect(screen.queryByTestId('error-toast')).not.toBeInTheDocument();
      });
    });
  });

  describe('getLatestError', () => {
    it('should return undefined when no errors', () => {
      const { result } = renderHook(() => useError(), {
        wrapper: ErrorProvider,
      });

      expect(result.current.getLatestError()).toBeUndefined();
    });

    it('should return most recent error', () => {
      const { result } = renderHook(() => useError(), {
        wrapper: ErrorProvider,
      });

      act(() => {
        result.current.addError(new Error('Error 1'));
        result.current.addError(new Error('Error 2'));
        result.current.addError(new Error('Error 3'));
      });

      const latest = result.current.getLatestError();
      expect(latest?.error.message).toBe('Error 3');
    });
  });
});
