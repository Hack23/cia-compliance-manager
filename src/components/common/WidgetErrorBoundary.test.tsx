import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi, beforeAll, afterAll } from 'vitest';
import WidgetErrorBoundary from './WidgetErrorBoundary';

// Component that throws an error
const ThrowError: React.FC<{ shouldThrow?: boolean }> = ({ shouldThrow = true }) => {
  if (shouldThrow) {
    throw new Error('Test error');
  }
  return <div>No error</div>;
};

// Suppress console.error for these tests since we're testing error scenarios
const originalError = console.error;
beforeAll(() => {
  console.error = vi.fn();
});

afterAll(() => {
  console.error = originalError;
});

describe('WidgetErrorBoundary', () => {
  it('renders children when there is no error', () => {
    render(
      <WidgetErrorBoundary>
        <div data-testid="child-component">Child content</div>
      </WidgetErrorBoundary>
    );

    expect(screen.getByTestId('child-component')).toBeInTheDocument();
    expect(screen.getByText('Child content')).toBeInTheDocument();
  });

  it('catches errors and displays error message', () => {
    render(
      <WidgetErrorBoundary>
        <ThrowError />
      </WidgetErrorBoundary>
    );

    expect(screen.getByTestId('widget-error-boundary')).toBeInTheDocument();
    expect(screen.getByTestId('widget-error-boundary-message')).toBeInTheDocument();
    expect(screen.getByText(/test error/i)).toBeInTheDocument();
  });

  it('displays widget name in error message', () => {
    render(
      <WidgetErrorBoundary widgetName="Security Metrics">
        <ThrowError />
      </WidgetErrorBoundary>
    );

    expect(screen.getByText('Security Metrics Error')).toBeInTheDocument();
  });

  it('displays default error title when no widget name provided', () => {
    render(
      <WidgetErrorBoundary>
        <ThrowError />
      </WidgetErrorBoundary>
    );

    expect(screen.getByText('Widget Error')).toBeInTheDocument();
  });

  it('renders custom fallback when provided', () => {
    const CustomFallback = () => <div data-testid="custom-fallback">Custom error UI</div>;

    render(
      <WidgetErrorBoundary fallback={<CustomFallback />}>
        <ThrowError />
      </WidgetErrorBoundary>
    );

    expect(screen.getByTestId('custom-fallback')).toBeInTheDocument();
    expect(screen.getByText('Custom error UI')).toBeInTheDocument();
  });

  it('calls onError callback when error is caught', () => {
    const onErrorMock = vi.fn();

    render(
      <WidgetErrorBoundary onError={onErrorMock}>
        <ThrowError />
      </WidgetErrorBoundary>
    );

    expect(onErrorMock).toHaveBeenCalledTimes(1);
    expect(onErrorMock).toHaveBeenCalledWith(
      expect.any(Error),
      expect.objectContaining({
        componentStack: expect.any(String),
      })
    );
  });

  it('uses custom test ID', () => {
    render(
      <WidgetErrorBoundary testId="custom-boundary">
        <ThrowError />
      </WidgetErrorBoundary>
    );

    expect(screen.getByTestId('custom-boundary')).toBeInTheDocument();
  });

  it('displays retry button', () => {
    render(
      <WidgetErrorBoundary>
        <ThrowError />
      </WidgetErrorBoundary>
    );

    const retryButton = screen.getByRole('button', { name: /try again/i });
    expect(retryButton).toBeInTheDocument();
  });

  it('logs error to console', () => {
    const consoleErrorSpy = vi.spyOn(console, 'error');

    render(
      <WidgetErrorBoundary widgetName="Test Widget">
        <ThrowError />
      </WidgetErrorBoundary>
    );

    // Verify that console.error was called when error occurred
    expect(consoleErrorSpy).toHaveBeenCalled();
  });
});
