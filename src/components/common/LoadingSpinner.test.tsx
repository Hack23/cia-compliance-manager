import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import { LoadingSpinner } from './LoadingSpinner';

describe('LoadingSpinner', () => {
  it('renders with default props', () => {
    render(<LoadingSpinner />);
    
    expect(screen.getByRole('status')).toBeInTheDocument();
    expect(screen.getByText('Loading...')).toBeInTheDocument();
    expect(screen.getByTestId('loading-spinner')).toBeInTheDocument();
  });

  it('renders with custom label', () => {
    render(<LoadingSpinner label="Calculating security metrics..." />);
    
    expect(screen.getByText('Calculating security metrics...')).toBeInTheDocument();
  });

  it('renders with small size', () => {
    render(<LoadingSpinner size="small" testId="small-spinner" />);
    
    const spinner = screen.getByTestId('small-spinner-circle');
    expect(spinner).toHaveClass('h-4', 'w-4');
  });

  it('renders with medium size', () => {
    render(<LoadingSpinner size="medium" testId="medium-spinner" />);
    
    const spinner = screen.getByTestId('medium-spinner-circle');
    expect(spinner).toHaveClass('h-8', 'w-8');
  });

  it('renders with large size', () => {
    render(<LoadingSpinner size="large" testId="large-spinner" />);
    
    const spinner = screen.getByTestId('large-spinner-circle');
    expect(spinner).toHaveClass('h-12', 'w-12');
  });

  it('applies custom className', () => {
    render(<LoadingSpinner className="custom-class" />);
    
    const container = screen.getByRole('status');
    expect(container).toHaveClass('custom-class');
  });

  it('has proper ARIA attributes for accessibility', () => {
    render(<LoadingSpinner />);
    
    const status = screen.getByRole('status');
    expect(status).toHaveAttribute('aria-live', 'polite');
    expect(status).toHaveAttribute('aria-busy', 'true');
  });

  it('has sr-only class for screen reader text', () => {
    render(<LoadingSpinner />);
    
    const srText = screen.getByText('Loading...');
    expect(srText).toHaveClass('sr-only');
  });

  it('uses custom test ID', () => {
    render(<LoadingSpinner testId="custom-spinner" />);
    
    expect(screen.getByTestId('custom-spinner')).toBeInTheDocument();
    expect(screen.getByTestId('custom-spinner-circle')).toBeInTheDocument();
  });
});
