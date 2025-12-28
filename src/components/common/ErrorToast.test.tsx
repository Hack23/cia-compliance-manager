/**
 * Tests for ErrorToast component
 */

import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ErrorToast } from './ErrorToast';

describe('ErrorToast', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('should render toast when isVisible is true', () => {
    render(
      <ErrorToast
        message="Test error message"
        isVisible={true}
        onDismiss={vi.fn()}
      />
    );

    expect(screen.getByTestId('error-toast')).toBeInTheDocument();
    expect(screen.getByText('Test error message')).toBeInTheDocument();
  });

  it('should not render toast when isVisible is false', () => {
    render(
      <ErrorToast
        message="Test error message"
        isVisible={false}
        onDismiss={vi.fn()}
      />
    );

    expect(screen.queryByTestId('error-toast')).not.toBeInTheDocument();
  });

  it('should render custom title when provided', () => {
    render(
      <ErrorToast
        title="Custom Error"
        message="Test error message"
        isVisible={true}
        onDismiss={vi.fn()}
      />
    );

    expect(screen.getByTestId('error-toast-title')).toHaveTextContent('Custom Error');
  });

  it('should render default title when not provided', () => {
    render(
      <ErrorToast
        message="Test error message"
        isVisible={true}
        onDismiss={vi.fn()}
      />
    );

    expect(screen.getByTestId('error-toast-title')).toHaveTextContent('Error');
  });

  it('should call onDismiss when close button is clicked', async () => {
    vi.useRealTimers(); // Use real timers for userEvent
    const user = userEvent.setup();
    const onDismiss = vi.fn();

    render(
      <ErrorToast
        message="Test error message"
        isVisible={true}
        onDismiss={onDismiss}
        autoHideDuration={0} // Disable auto-dismiss
      />
    );

    const closeButton = screen.getByTestId('error-toast-close-button');
    await user.click(closeButton);

    // Wait for animation
    await new Promise(resolve => setTimeout(resolve, 350));

    expect(onDismiss).toHaveBeenCalledTimes(1);
    vi.useFakeTimers(); // Restore fake timers
  });

  it('should auto-dismiss after autoHideDuration', async () => {
    const onDismiss = vi.fn();

    render(
      <ErrorToast
        message="Test error message"
        isVisible={true}
        onDismiss={onDismiss}
        autoHideDuration={5000}
      />
    );

    // Fast-forward time by autoHideDuration
    vi.advanceTimersByTime(5000);

    // Wait for animation to complete
    await vi.runOnlyPendingTimersAsync();

    expect(onDismiss).toHaveBeenCalledTimes(1);
  });

  it('should not auto-dismiss when autoHideDuration is 0', async () => {
    const onDismiss = vi.fn();

    render(
      <ErrorToast
        message="Test error message"
        isVisible={true}
        onDismiss={onDismiss}
        autoHideDuration={0}
      />
    );

    // Fast-forward time
    vi.advanceTimersByTime(10000);

    expect(onDismiss).not.toHaveBeenCalled();
  });

  it('should render retry button when retry is provided', () => {
    const retry = vi.fn();

    render(
      <ErrorToast
        message="Test error message"
        isVisible={true}
        onDismiss={vi.fn()}
        retry={retry}
      />
    );

    expect(screen.getByTestId('error-toast-retry-button')).toBeInTheDocument();
  });

  it('should call retry and onDismiss when retry button is clicked', async () => {
    vi.useRealTimers(); // Use real timers for userEvent
    const user = userEvent.setup();
    const retry = vi.fn();
    const onDismiss = vi.fn();

    render(
      <ErrorToast
        message="Test error message"
        isVisible={true}
        onDismiss={onDismiss}
        retry={retry}
        autoHideDuration={0} // Disable auto-dismiss
      />
    );

    const retryButton = screen.getByTestId('error-toast-retry-button');
    await user.click(retryButton);

    expect(retry).toHaveBeenCalledTimes(1);
    
    // Wait for animation
    await new Promise(resolve => setTimeout(resolve, 350));
    
    expect(onDismiss).toHaveBeenCalledTimes(1);
    vi.useFakeTimers(); // Restore fake timers
  });

  it('should not render retry button when retry is not provided', () => {
    render(
      <ErrorToast
        message="Test error message"
        isVisible={true}
        onDismiss={vi.fn()}
      />
    );

    expect(screen.queryByTestId('error-toast-retry-button')).not.toBeInTheDocument();
  });

  it('should apply correct position classes for top-left', () => {
    render(
      <ErrorToast
        message="Test error message"
        isVisible={true}
        onDismiss={vi.fn()}
        position="top-left"
        testId="error-toast"
      />
    );

    const toast = screen.getByTestId('error-toast');
    expect(toast.className).toContain('top-4');
    expect(toast.className).toContain('left-4');
  });

  it('should apply correct position classes for top-center', () => {
    render(
      <ErrorToast
        message="Test error message"
        isVisible={true}
        onDismiss={vi.fn()}
        position="top-center"
        testId="error-toast"
      />
    );

    const toast = screen.getByTestId('error-toast');
    expect(toast.className).toContain('top-4');
    expect(toast.className).toContain('left-1/2');
    expect(toast.className).toContain('-translate-x-1/2');
  });

  it('should apply correct position classes for bottom-right', () => {
    render(
      <ErrorToast
        message="Test error message"
        isVisible={true}
        onDismiss={vi.fn()}
        position="bottom-right"
        testId="error-toast"
      />
    );

    const toast = screen.getByTestId('error-toast');
    expect(toast.className).toContain('bottom-4');
    expect(toast.className).toContain('right-4');
  });

  it('should use custom testId when provided', () => {
    render(
      <ErrorToast
        message="Test error message"
        isVisible={true}
        onDismiss={vi.fn()}
        testId="custom-test-id"
      />
    );

    expect(screen.getByTestId('custom-test-id')).toBeInTheDocument();
  });

  it('should have proper ARIA attributes', () => {
    render(
      <ErrorToast
        message="Test error message"
        isVisible={true}
        onDismiss={vi.fn()}
        testId="error-toast"
      />
    );

    const toast = screen.getByTestId('error-toast');
    expect(toast).toHaveAttribute('role', 'alert');
    expect(toast).toHaveAttribute('aria-live', 'assertive');
    expect(toast).toHaveAttribute('aria-atomic', 'true');
  });

  it('should clear timeout when component unmounts', () => {
    const onDismiss = vi.fn();
    const { unmount } = render(
      <ErrorToast
        message="Test error message"
        isVisible={true}
        onDismiss={onDismiss}
        autoHideDuration={5000}
      />
    );

    unmount();

    // Fast-forward time
    vi.advanceTimersByTime(5000);

    // onDismiss should not be called after unmount
    expect(onDismiss).not.toHaveBeenCalled();
  });
});
