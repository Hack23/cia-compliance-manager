import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi, beforeAll, afterAll } from 'vitest';
import { mockWidgetProps } from '../../../utils/testUtils';
import WidgetErrorBoundary from '../../common/WidgetErrorBoundary';

/**
 * Test component that throws an error when shouldThrow is true
 */
const ThrowError: React.FC<{ shouldThrow?: boolean; message?: string }> = ({ 
  shouldThrow = true, 
  message = 'Test error' 
}) => {
  if (shouldThrow) {
    throw new Error(message);
  }
  return <div data-testid="no-error">No error occurred</div>;
};

/**
 * Mock widget component that simulates a real widget
 */
const MockWidget: React.FC<{ shouldFail?: boolean }> = ({ shouldFail = false }) => {
  if (shouldFail) {
    // Simulate a runtime error in the widget
    throw new Error('Widget failed to render');
  }

  return (
    <div data-testid="mock-widget">
      <h2>Mock Widget</h2>
      <p>This is a mock widget component</p>
    </div>
  );
};

// Suppress console.error for these tests since we're intentionally testing error scenarios
const originalError = console.error;
beforeAll(() => {
  console.error = vi.fn();
});

afterAll(() => {
  console.error = originalError;
});

describe('Widget Error Boundaries', () => {
  describe('Basic Error Catching', () => {
    it('catches errors in widget components', () => {
      render(
        <WidgetErrorBoundary widgetName="Test Widget">
          <ThrowError />
        </WidgetErrorBoundary>
      );

      // Error boundary should catch the error and display error message
      expect(screen.getByTestId('widget-error-boundary')).toBeInTheDocument();
      expect(screen.getByText(/Test Widget Error/i)).toBeInTheDocument();
      expect(screen.getByText(/Test error/i)).toBeInTheDocument();
    });

    it('renders widget normally when no error occurs', () => {
      render(
        <WidgetErrorBoundary widgetName="Test Widget">
          <ThrowError shouldThrow={false} />
        </WidgetErrorBoundary>
      );

      // Widget should render normally
      expect(screen.getByTestId('no-error')).toBeInTheDocument();
      expect(screen.getByText('No error occurred')).toBeInTheDocument();
      
      // Error boundary elements should not be present
      expect(screen.queryByTestId('widget-error-boundary')).not.toBeInTheDocument();
    });

    it('displays custom widget name in error message', () => {
      render(
        <WidgetErrorBoundary widgetName="Security Summary">
          <ThrowError message="Failed to load data" />
        </WidgetErrorBoundary>
      );

      expect(screen.getByText('Security Summary Error')).toBeInTheDocument();
      expect(screen.getByText(/Failed to load data/i)).toBeInTheDocument();
    });
  });

  describe('Error Recovery', () => {
    it('displays retry button when error occurs', () => {
      render(
        <WidgetErrorBoundary widgetName="Test Widget">
          <ThrowError />
        </WidgetErrorBoundary>
      );

      const retryButton = screen.getByRole('button', { name: /try again/i });
      expect(retryButton).toBeInTheDocument();
    });

    it('allows retry after error', () => {
      // Create a component that can toggle error state
      const ToggleErrorComponent = () => {
        const [shouldError, setShouldError] = React.useState(true);

        return (
          <div>
            <button 
              onClick={() => setShouldError(!shouldError)} 
              data-testid="toggle-error"
            >
              Toggle Error
            </button>
            <WidgetErrorBoundary widgetName="Toggle Widget">
              <MockWidget shouldFail={shouldError} />
            </WidgetErrorBoundary>
          </div>
        );
      };

      render(<ToggleErrorComponent />);

      // Initially, error should be displayed
      expect(screen.getByTestId('widget-error-boundary')).toBeInTheDocument();

      // Click retry button (which resets error state)
      const retryButton = screen.getByRole('button', { name: /try again/i });
      fireEvent.click(retryButton);

      // After retry, the error should still be shown because the underlying error condition hasn't changed
      // The retry button should still be present for another attempt
      expect(screen.getByTestId('widget-error-boundary')).toBeInTheDocument();
    });
  });

  describe('Error Logging', () => {
    it('calls onError callback when error occurs', () => {
      const onErrorMock = vi.fn();

      render(
        <WidgetErrorBoundary widgetName="Test Widget" onError={onErrorMock}>
          <ThrowError message="Callback test error" />
        </WidgetErrorBoundary>
      );

      // onError callback should have been called
      expect(onErrorMock).toHaveBeenCalledTimes(1);
      expect(onErrorMock).toHaveBeenCalledWith(
        expect.any(Error),
        expect.objectContaining({
          componentStack: expect.any(String),
        })
      );

      // Verify error message was passed correctly
      const [error] = onErrorMock.mock.calls[0];
      expect(error.message).toBe('Callback test error');
    });

    it('logs errors to console', () => {
      const consoleErrorSpy = vi.spyOn(console, 'error');

      render(
        <WidgetErrorBoundary widgetName="Console Test Widget">
          <ThrowError message="Console test error" />
        </WidgetErrorBoundary>
      );

      // Console.error should have been called for logging
      expect(consoleErrorSpy).toHaveBeenCalled();
    });
  });

  describe('Custom Fallback UI', () => {
    it('renders custom fallback when provided', () => {
      const CustomFallback = () => (
        <div data-testid="custom-fallback">
          <h3>Custom Error UI</h3>
          <p>Something went wrong with this component</p>
        </div>
      );

      render(
        <WidgetErrorBoundary 
          widgetName="Test Widget"
          fallback={<CustomFallback />}
        >
          <ThrowError />
        </WidgetErrorBoundary>
      );

      // Custom fallback should be rendered
      expect(screen.getByTestId('custom-fallback')).toBeInTheDocument();
      expect(screen.getByText('Custom Error UI')).toBeInTheDocument();
      
      // Default error message should not be present
      expect(screen.queryByText(/Test Widget Error/i)).not.toBeInTheDocument();
    });
  });

  describe('Multiple Widgets', () => {
    it('isolates errors to individual widgets', () => {
      render(
        <div>
          <WidgetErrorBoundary widgetName="Widget 1">
            <ThrowError message="Widget 1 error" />
          </WidgetErrorBoundary>
          <WidgetErrorBoundary widgetName="Widget 2">
            <MockWidget shouldFail={false} />
          </WidgetErrorBoundary>
        </div>
      );

      // Widget 1 should show error
      expect(screen.getByText('Widget 1 Error')).toBeInTheDocument();
      
      // Widget 2 should render normally
      expect(screen.getByTestId('mock-widget')).toBeInTheDocument();
      expect(screen.getByText('Mock Widget')).toBeInTheDocument();
    });

    it('prevents error propagation to parent components', () => {
      const ParentComponent = () => (
        <div data-testid="parent-component">
          <h1>Parent Component</h1>
          <WidgetErrorBoundary widgetName="Child Widget">
            <ThrowError message="Child error" />
          </WidgetErrorBoundary>
          <p>Parent still renders</p>
        </div>
      );

      render(<ParentComponent />);

      // Parent component should still render
      expect(screen.getByTestId('parent-component')).toBeInTheDocument();
      expect(screen.getByText('Parent Component')).toBeInTheDocument();
      expect(screen.getByText('Parent still renders')).toBeInTheDocument();

      // Child widget error should be caught
      expect(screen.getByText('Child Widget Error')).toBeInTheDocument();
    });
  });

  describe('Accessibility', () => {
    it('error fallback has proper ARIA attributes', () => {
      render(
        <WidgetErrorBoundary widgetName="Test Widget">
          <ThrowError />
        </WidgetErrorBoundary>
      );

      const errorElement = screen.getByRole('alert');
      expect(errorElement).toBeInTheDocument();
      expect(errorElement).toHaveAttribute('aria-live', 'polite');
    });

    it('retry button has proper accessibility label', () => {
      render(
        <WidgetErrorBoundary widgetName="Test Widget">
          <ThrowError />
        </WidgetErrorBoundary>
      );

      const retryButton = screen.getByRole('button', { name: /try again/i });
      expect(retryButton).toHaveAttribute('aria-label', 'Try again');
    });
  });

  describe('Widget-Specific Error Messages', () => {
    it('displays appropriate error messages for different widget types', () => {
      const widgetTypes = [
        'Security Summary',
        'Security Level',
        'Compliance Status',
        'Cost Estimation',
        'Business Impact Analysis'
      ];

      widgetTypes.forEach((widgetName) => {
        const { unmount } = render(
          <WidgetErrorBoundary widgetName={widgetName}>
            <ThrowError message={`${widgetName} failed`} />
          </WidgetErrorBoundary>
        );

        expect(screen.getByText(`${widgetName} Error`)).toBeInTheDocument();
        expect(screen.getByText(new RegExp(`${widgetName} failed`, 'i'))).toBeInTheDocument();

        unmount();
      });
    });
  });
});
