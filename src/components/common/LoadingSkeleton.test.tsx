import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import LoadingSkeleton from './LoadingSkeleton';

describe('LoadingSkeleton', () => {
  it('renders with default 3 lines', () => {
    render(<LoadingSkeleton />);
    
    const skeleton = screen.getByTestId('loading-skeleton');
    expect(skeleton).toBeInTheDocument();
    
    // Check for 3 skeleton lines (default)
    expect(screen.getByTestId('loading-skeleton-line-0')).toBeInTheDocument();
    expect(screen.getByTestId('loading-skeleton-line-1')).toBeInTheDocument();
    expect(screen.getByTestId('loading-skeleton-line-2')).toBeInTheDocument();
  });

  it('renders with custom number of lines', () => {
    render(<LoadingSkeleton lines={5} />);
    
    // Check for 5 skeleton lines
    expect(screen.getByTestId('loading-skeleton-line-0')).toBeInTheDocument();
    expect(screen.getByTestId('loading-skeleton-line-1')).toBeInTheDocument();
    expect(screen.getByTestId('loading-skeleton-line-2')).toBeInTheDocument();
    expect(screen.getByTestId('loading-skeleton-line-3')).toBeInTheDocument();
    expect(screen.getByTestId('loading-skeleton-line-4')).toBeInTheDocument();
  });

  it('renders with single line', () => {
    render(<LoadingSkeleton lines={1} />);
    
    const line = screen.getByTestId('loading-skeleton-line-0');
    expect(line).toBeInTheDocument();
    
    // Should not have a second line
    expect(screen.queryByTestId('loading-skeleton-line-1')).not.toBeInTheDocument();
  });

  it('renders with custom test ID', () => {
    render(<LoadingSkeleton testId="custom-skeleton" />);
    
    const skeleton = screen.getByTestId('custom-skeleton');
    expect(skeleton).toBeInTheDocument();
    
    // Lines should also use custom test ID
    expect(screen.getByTestId('custom-skeleton-line-0')).toBeInTheDocument();
  });

  it('has proper accessibility attributes', () => {
    render(<LoadingSkeleton />);
    
    const container = screen.getByRole('status');
    expect(container).toHaveAttribute('aria-label', 'Loading content');
    
    const loadingText = screen.getByText('Loading...');
    expect(loadingText).toHaveClass('sr-only');
  });

  it('applies custom className', () => {
    render(<LoadingSkeleton className="custom-class" />);
    
    const skeleton = screen.getByTestId('loading-skeleton');
    expect(skeleton).toHaveClass('custom-class');
  });

  it('has animation classes', () => {
    render(<LoadingSkeleton />);
    
    const skeleton = screen.getByTestId('loading-skeleton');
    expect(skeleton).toHaveClass('animate-pulse', 'space-y-4');
  });

  it('skeleton lines have proper styling', () => {
    render(<LoadingSkeleton />);
    
    const line = screen.getByTestId('loading-skeleton-line-0');
    expect(line).toHaveClass('h-4', 'bg-gray-200', 'rounded');
  });
});
