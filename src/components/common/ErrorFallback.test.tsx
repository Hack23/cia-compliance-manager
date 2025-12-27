/**
 * Tests for ErrorFallback component
 */

import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ErrorFallback } from './ErrorFallback';

describe('ErrorFallback', () => {
  it('should render title and message', () => {
    render(
      <ErrorFallback
        title="Test Error"
        message="This is a test error message"
      />
    );

    expect(screen.getByTestId('error-fallback-title')).toHaveTextContent('Test Error');
    expect(screen.getByTestId('error-fallback-message')).toHaveTextContent('This is a test error message');
  });

  it('should render reset button when onReset is provided', () => {
    const onReset = vi.fn();

    render(
      <ErrorFallback
        title="Test Error"
        message="Test message"
        onReset={onReset}
      />
    );

    expect(screen.getByTestId('error-fallback-reset-button')).toBeInTheDocument();
  });

  it('should call onReset when reset button is clicked', async () => {
    const user = userEvent.setup();
    const onReset = vi.fn();

    render(
      <ErrorFallback
        title="Test Error"
        message="Test message"
        onReset={onReset}
      />
    );

    const resetButton = screen.getByTestId('error-fallback-reset-button');
    await user.click(resetButton);

    expect(onReset).toHaveBeenCalledTimes(1);
  });

  it('should not render reset button when onReset is not provided', () => {
    render(
      <ErrorFallback
        title="Test Error"
        message="Test message"
      />
    );

    expect(screen.queryByTestId('error-fallback-reset-button')).not.toBeInTheDocument();
  });

  it('should show help text when no reset button is provided', () => {
    render(
      <ErrorFallback
        title="Test Error"
        message="Test message"
      />
    );

    expect(screen.getByText(/Need help?/)).toBeInTheDocument();
  });

  it('should not show technical details toggle when showTechnicalDetails is false', () => {
    render(
      <ErrorFallback
        title="Test Error"
        message="Test message"
        showTechnicalDetails={false}
      />
    );

    expect(screen.queryByTestId('error-fallback-details-toggle')).not.toBeInTheDocument();
  });

  it('should show technical details toggle when showTechnicalDetails is true and error is provided', () => {
    const error = new Error('Test error');

    render(
      <ErrorFallback
        title="Test Error"
        message="Test message"
        error={error}
        showTechnicalDetails={true}
      />
    );

    expect(screen.getByTestId('error-fallback-details-toggle')).toBeInTheDocument();
  });

  it('should toggle technical details when toggle button is clicked', async () => {
    const user = userEvent.setup();
    const error = new Error('Test error');

    render(
      <ErrorFallback
        title="Test Error"
        message="Test message"
        error={error}
        showTechnicalDetails={true}
      />
    );

    const toggleButton = screen.getByTestId('error-fallback-details-toggle');

    // Initially collapsed
    expect(screen.queryByTestId('error-fallback-details')).not.toBeInTheDocument();
    expect(toggleButton).toHaveTextContent('Show Technical Details');

    // Click to expand
    await user.click(toggleButton);
    expect(screen.getByTestId('error-fallback-details')).toBeInTheDocument();
    expect(toggleButton).toHaveTextContent('Hide Technical Details');

    // Click to collapse
    await user.click(toggleButton);
    expect(screen.queryByTestId('error-fallback-details')).not.toBeInTheDocument();
  });

  it('should display error name and message in technical details', async () => {
    const user = userEvent.setup();
    const error = new Error('Test error message');
    error.name = 'TestError';

    render(
      <ErrorFallback
        title="Test Error"
        message="Test message"
        error={error}
        showTechnicalDetails={true}
      />
    );

    const toggleButton = screen.getByTestId('error-fallback-details-toggle');
    await user.click(toggleButton);

    const detailsSection = screen.getByTestId('error-fallback-details');
    expect(detailsSection).toHaveTextContent('TestError');
    expect(detailsSection).toHaveTextContent('Test error message');
  });

  it('should display error stack in technical details when available', async () => {
    const user = userEvent.setup();
    const error = new Error('Test error');
    error.stack = 'Error: Test error\n    at Object.<anonymous> (test.js:1:1)';

    render(
      <ErrorFallback
        title="Test Error"
        message="Test message"
        error={error}
        showTechnicalDetails={true}
      />
    );

    const toggleButton = screen.getByTestId('error-fallback-details-toggle');
    await user.click(toggleButton);

    const detailsSection = screen.getByTestId('error-fallback-details');
    expect(detailsSection).toHaveTextContent('Stack Trace');
    // Check for key parts of the stack trace
    expect(detailsSection.textContent).toContain('at Object.<anonymous>');
    expect(detailsSection.textContent).toContain('test.js:1:1');
  });

  it('should display component stack in technical details when available', async () => {
    const user = userEvent.setup();
    const error = new Error('Test error');
    const errorInfo = {
      componentStack: '\n    in TestComponent (created by App)\n    in App',
    };

    render(
      <ErrorFallback
        title="Test Error"
        message="Test message"
        error={error}
        errorInfo={errorInfo}
        showTechnicalDetails={true}
      />
    );

    const toggleButton = screen.getByTestId('error-fallback-details-toggle');
    await user.click(toggleButton);

    const detailsSection = screen.getByTestId('error-fallback-details');
    expect(detailsSection).toHaveTextContent('Component Stack');
    // Check for key parts of the component stack
    expect(detailsSection.textContent).toContain('in TestComponent');
    expect(detailsSection.textContent).toContain('in App');
  });

  it('should use custom testId when provided', () => {
    render(
      <ErrorFallback
        title="Test Error"
        message="Test message"
        testId="custom-test-id"
      />
    );

    expect(screen.getByTestId('custom-test-id')).toBeInTheDocument();
  });

  it('should apply custom className when provided', () => {
    render(
      <ErrorFallback
        title="Test Error"
        message="Test message"
        className="custom-class"
        testId="error-fallback"
      />
    );

    const element = screen.getByTestId('error-fallback');
    expect(element).toHaveClass('custom-class');
  });

  it('should have proper ARIA attributes', () => {
    render(
      <ErrorFallback
        title="Test Error"
        message="Test message"
        testId="error-fallback"
      />
    );

    const element = screen.getByTestId('error-fallback');
    expect(element).toHaveAttribute('role', 'alert');
    expect(element).toHaveAttribute('aria-live', 'assertive');
  });
});
