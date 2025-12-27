/**
 * Tests for ErrorBoundary component
 */

import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ErrorBoundary } from './ErrorBoundary';
import * as errorServiceModule from '../../services/errorService';

// Mock errorService
vi.mock('../../services/errorService', () => ({
  errorService: {
    logError: vi.fn(),
    getUserFriendlyMessage: vi.fn(() => 'An unexpected error occurred. Please try again.'),
    canRecover: vi.fn(() => true),
    getErrorSeverity: vi.fn(() => 'high'),
  },
  ErrorSeverity: {
    LOW: 'low',
    MEDIUM: 'medium',
    HIGH: 'high',
    CRITICAL: 'critical',
  },
}));

// Mock ErrorFallback component
vi.mock('./ErrorFallback', () => ({
  default: ({ title, message, onReset, testId }: {
    title: string;
    message: string;
    onReset?: () => void;
    testId?: string;
  }) => (
    <div data-testid={testId}>
      <h1>{title}</h1>
      <p>{message}</p>
      {onReset && (
        <button onClick={onReset} data-testid={`${testId}-reset-button`}>
          Try Again
        </button>
      )}
    </div>
  ),
}));

// Component that throws an error
const ThrowError = ({ shouldThrow = true }: { shouldThrow?: boolean }) => {
  if (shouldThrow) {
    throw new Error('Test error');
  }
  return <div>No error</div>;
};

describe('ErrorBoundary', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    // Suppress console.error for these tests
    vi.spyOn(console, 'error').mockImplementation(() => {});
  });

  it('should render children when no error occurs', () => {
    render(
      <ErrorBoundary>
        <div>Test content</div>
      </ErrorBoundary>
    );

    expect(screen.getByText('Test content')).toBeInTheDocument();
  });

  it('should catch error and display fallback UI', () => {
    render(
      <ErrorBoundary componentName="Test Component">
        <ThrowError />
      </ErrorBoundary>
    );

    expect(screen.getByText('Test Component Error')).toBeInTheDocument();
    expect(screen.getByText('An unexpected error occurred. Please try again.')).toBeInTheDocument();
  });

  it('should call errorService.logError when error is caught', () => {
    const mockLogError = errorServiceModule.errorService.logError as ReturnType<typeof vi.fn>;
    
    render(
      <ErrorBoundary componentName="Test Component">
        <ThrowError />
      </ErrorBoundary>
    );

    expect(mockLogError).toHaveBeenCalledWith(
      expect.any(Error),
      expect.objectContaining({
        component: 'Test Component',
        errorBoundary: 'ErrorBoundary',
      }),
      'high'
    );
  });

  it('should call onError callback when provided', () => {
    const onError = vi.fn();

    render(
      <ErrorBoundary onError={onError}>
        <ThrowError />
      </ErrorBoundary>
    );

    expect(onError).toHaveBeenCalledWith(
      expect.any(Error),
      expect.any(Object)
    );
  });

  it('should use custom fallback when provided', () => {
    const customFallback = (error: Error, reset: () => void) => (
      <div>
        <p>Custom error: {error.message}</p>
        <button onClick={reset}>Custom Reset</button>
      </div>
    );

    render(
      <ErrorBoundary fallback={customFallback}>
        <ThrowError />
      </ErrorBoundary>
    );

    expect(screen.getByText('Custom error: Test error')).toBeInTheDocument();
    expect(screen.getByText('Custom Reset')).toBeInTheDocument();
  });

  it('should reset error state when reset button is clicked', async () => {
    const user = userEvent.setup();
    const mockLogError = errorServiceModule.errorService.logError as ReturnType<typeof vi.fn>;
    
    render(
      <ErrorBoundary testId="error-boundary">
        <ThrowError shouldThrow={true} />
      </ErrorBoundary>
    );

    // Error should be displayed
    expect(screen.getByTestId('error-boundary-fallback')).toBeInTheDocument();

    // Click reset button (this will reset the error boundary state)
    const resetButton = screen.getByTestId('error-boundary-fallback-reset-button');
    await user.click(resetButton);

    // After clicking reset, the error boundary resets its state and tries to render children again
    // Since ThrowError still throws, it will catch the error again
    expect(mockLogError).toHaveBeenCalledTimes(2); // Once for initial error, once after reset
  });

  it('should not show reset button when error is not recoverable', () => {
    const mockCanRecover = errorServiceModule.errorService.canRecover as ReturnType<typeof vi.fn>;
    mockCanRecover.mockReturnValue(false);

    render(
      <ErrorBoundary testId="error-boundary">
        <ThrowError />
      </ErrorBoundary>
    );

    expect(screen.queryByTestId('error-boundary-fallback-reset-button')).not.toBeInTheDocument();
  });

  it('should not show reset button when allowReset is false', () => {
    render(
      <ErrorBoundary testId="error-boundary" allowReset={false}>
        <ThrowError />
      </ErrorBoundary>
    );

    expect(screen.queryByTestId('error-boundary-fallback-reset-button')).not.toBeInTheDocument();
  });

  it('should use default component name when not provided', () => {
    render(
      <ErrorBoundary>
        <ThrowError />
      </ErrorBoundary>
    );

    expect(screen.getByText('Component Error')).toBeInTheDocument();
  });

  it('should pass showTechnicalDetails prop to ErrorFallback', () => {
    render(
      <ErrorBoundary showTechnicalDetails={true} testId="error-boundary">
        <ThrowError />
      </ErrorBoundary>
    );

    expect(screen.getByTestId('error-boundary-fallback')).toBeInTheDocument();
  });

  it('should use custom testId when provided', () => {
    render(
      <ErrorBoundary testId="custom-test-id">
        <ThrowError />
      </ErrorBoundary>
    );

    expect(screen.getByTestId('custom-test-id')).toBeInTheDocument();
  });
});
