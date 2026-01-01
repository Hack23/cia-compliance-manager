import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import ErrorMessage from './ErrorMessage';
import { ERROR_MESSAGE_TEST_IDS } from '../../constants/testIds';

describe('ErrorMessage', () => {
  it('renders with required message prop', () => {
    render(<ErrorMessage message="Test error message" />);
    
    const message = screen.getByTestId(ERROR_MESSAGE_TEST_IDS.ERROR_MESSAGE_TEXT);
    expect(message).toBeInTheDocument();
    expect(message).toHaveTextContent('Test error message');
  });

  it('renders with default title', () => {
    render(<ErrorMessage message="Test error" />);
    
    const title = screen.getByTestId(ERROR_MESSAGE_TEST_IDS.ERROR_MESSAGE_TITLE);
    expect(title).toHaveTextContent('Error');
  });

  it('renders with custom title', () => {
    render(<ErrorMessage title="Custom Error" message="Test error" />);
    
    const title = screen.getByTestId(ERROR_MESSAGE_TEST_IDS.ERROR_MESSAGE_TITLE);
    expect(title).toHaveTextContent('Custom Error');
  });

  it('renders retry button when retry function is provided', () => {
    const retryFn = vi.fn();
    render(<ErrorMessage message="Test error" retry={retryFn} />);
    
    const retryButton = screen.getByTestId(ERROR_MESSAGE_TEST_IDS.ERROR_MESSAGE_RETRY_BUTTON);
    expect(retryButton).toBeInTheDocument();
    expect(retryButton).toHaveTextContent('Try Again');
  });

  it('does not render retry button when retry function is not provided', () => {
    render(<ErrorMessage message="Test error" />);
    
    const retryButton = screen.queryByTestId(ERROR_MESSAGE_TEST_IDS.ERROR_MESSAGE_RETRY_BUTTON);
    expect(retryButton).not.toBeInTheDocument();
  });

  it('calls retry function when retry button is clicked', () => {
    const retryFn = vi.fn();
    render(<ErrorMessage message="Test error" retry={retryFn} />);
    
    const retryButton = screen.getByTestId(ERROR_MESSAGE_TEST_IDS.ERROR_MESSAGE_RETRY_BUTTON);
    fireEvent.click(retryButton);
    
    expect(retryFn).toHaveBeenCalledTimes(1);
  });

  it('renders with custom test ID', () => {
    render(<ErrorMessage message="Test error" testId="custom-error" />);
    
    const errorContainer = screen.getByTestId('custom-error');
    expect(errorContainer).toBeInTheDocument();
  });

  it('has proper accessibility attributes', () => {
    render(<ErrorMessage message="Test error" />);
    
    const container = screen.getByRole('alert');
    expect(container).toHaveAttribute('aria-live', 'polite');
  });

  it('applies custom className', () => {
    render(<ErrorMessage message="Test error" className="custom-class" />);
    
    const container = screen.getByTestId('error-message');
    expect(container).toHaveClass('custom-class');
  });

  it('has proper error styling classes', () => {
    render(<ErrorMessage message="Test error" />);
    
    const container = screen.getByTestId('error-message');
    expect(container).toHaveClass('border-red-300', 'bg-red-50', 'rounded-lg');
  });

  it('retry button has proper accessibility label', () => {
    const retryFn = vi.fn();
    render(<ErrorMessage message="Test error" retry={retryFn} />);
    
    const retryButton = screen.getByTestId(ERROR_MESSAGE_TEST_IDS.ERROR_MESSAGE_RETRY_BUTTON);
    expect(retryButton).toHaveAttribute('aria-label', 'Try again');
  });
});
