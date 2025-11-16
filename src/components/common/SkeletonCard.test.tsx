import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import { SkeletonCard } from './SkeletonCard';

describe('SkeletonCard', () => {
  it('renders with default props', () => {
    render(<SkeletonCard />);
    
    expect(screen.getByTestId('skeleton-card')).toBeInTheDocument();
    expect(screen.getByTestId('skeleton-card-header')).toBeInTheDocument();
    expect(screen.getByTestId('skeleton-card-line-0')).toBeInTheDocument();
    expect(screen.getByTestId('skeleton-card-line-1')).toBeInTheDocument();
    expect(screen.getByTestId('skeleton-card-line-2')).toBeInTheDocument();
  });

  it('renders correct number of lines', () => {
    render(<SkeletonCard lines={5} />);
    
    expect(screen.getByTestId('skeleton-card-line-0')).toBeInTheDocument();
    expect(screen.getByTestId('skeleton-card-line-4')).toBeInTheDocument();
    expect(screen.queryByTestId('skeleton-card-line-5')).not.toBeInTheDocument();
  });

  it('hides header when showHeader is false', () => {
    render(<SkeletonCard showHeader={false} />);
    
    expect(screen.queryByTestId('skeleton-card-header')).not.toBeInTheDocument();
  });

  it('shows footer when showFooter is true', () => {
    render(<SkeletonCard showFooter={true} />);
    
    expect(screen.getByTestId('skeleton-card-footer')).toBeInTheDocument();
  });

  it('hides footer when showFooter is false', () => {
    render(<SkeletonCard showFooter={false} />);
    
    expect(screen.queryByTestId('skeleton-card-footer')).not.toBeInTheDocument();
  });

  it('applies custom className', () => {
    render(<SkeletonCard className="custom-skeleton" />);
    
    const skeleton = screen.getByTestId('skeleton-card');
    expect(skeleton).toHaveClass('custom-skeleton');
  });

  it('has animate-pulse class', () => {
    render(<SkeletonCard />);
    
    const skeleton = screen.getByTestId('skeleton-card');
    expect(skeleton).toHaveClass('animate-pulse');
  });

  it('has proper ARIA attributes for accessibility', () => {
    render(<SkeletonCard />);
    
    const skeleton = screen.getByTestId('skeleton-card');
    expect(skeleton).toHaveAttribute('role', 'status');
    expect(skeleton).toHaveAttribute('aria-label', 'Loading content');
    expect(skeleton).toHaveAttribute('aria-live', 'polite');
  });

  it('has screen reader text', () => {
    render(<SkeletonCard />);
    
    expect(screen.getByText('Loading content, please wait...')).toBeInTheDocument();
  });

  it('last line is shorter than others', () => {
    render(<SkeletonCard lines={3} />);
    
    const line0 = screen.getByTestId('skeleton-card-line-0');
    const line2 = screen.getByTestId('skeleton-card-line-2');
    
    expect(line0).toHaveClass('w-full');
    expect(line2).toHaveClass('w-3/4');
  });

  it('uses custom test ID', () => {
    render(<SkeletonCard testId="custom-skeleton" />);
    
    expect(screen.getByTestId('custom-skeleton')).toBeInTheDocument();
    expect(screen.getByTestId('custom-skeleton-header')).toBeInTheDocument();
  });
});
