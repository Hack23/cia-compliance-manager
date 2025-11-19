import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import LoadingSpinner from './LoadingSpinner';

describe('LoadingSpinner', () => {
  it('renders with default medium size', () => {
    render(<LoadingSpinner />);
    
    const spinner = screen.getByTestId('loading-spinner');
    expect(spinner).toBeInTheDocument();
    expect(spinner).toHaveClass('w-8', 'h-8', 'border-4');
  });

  it('renders with small size', () => {
    render(<LoadingSpinner size="sm" />);
    
    const spinner = screen.getByTestId('loading-spinner');
    expect(spinner).toBeInTheDocument();
    expect(spinner).toHaveClass('w-4', 'h-4', 'border-2');
  });

  it('renders with large size', () => {
    render(<LoadingSpinner size="lg" />);
    
    const spinner = screen.getByTestId('loading-spinner');
    expect(spinner).toBeInTheDocument();
    expect(spinner).toHaveClass('w-12', 'h-12', 'border-4');
  });

  it('renders with custom test ID', () => {
    render(<LoadingSpinner testId="custom-spinner" />);
    
    const spinner = screen.getByTestId('custom-spinner');
    expect(spinner).toBeInTheDocument();
  });

  it('has proper accessibility attributes', () => {
    render(<LoadingSpinner />);
    
    const container = screen.getByRole('status');
    expect(container).toHaveAttribute('aria-label', 'Loading');
    
    const loadingText = screen.getByText('Loading...');
    expect(loadingText).toHaveClass('sr-only');
  });

  it('applies custom className', () => {
    render(<LoadingSpinner className="custom-class" />);
    
    const container = screen.getByTestId('loading-spinner-container');
    expect(container).toHaveClass('custom-class');
  });

  it('has spinner animation classes', () => {
    render(<LoadingSpinner />);
    
    const spinner = screen.getByTestId('loading-spinner');
    expect(spinner).toHaveClass('animate-spin', 'rounded-full');
  });
});
