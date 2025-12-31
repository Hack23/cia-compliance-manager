import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import LoadingSkeleton from './LoadingSkeleton';

describe('LoadingSkeleton', () => {
  describe('Default Variant', () => {
    it('should render with default number of lines', () => {
      render(<LoadingSkeleton />);
      
      expect(screen.getByTestId('loading-skeleton')).toBeInTheDocument();
      expect(screen.getByTestId('loading-skeleton-line-0')).toBeInTheDocument();
      expect(screen.getByTestId('loading-skeleton-line-1')).toBeInTheDocument();
      expect(screen.getByTestId('loading-skeleton-line-2')).toBeInTheDocument();
    });

    it('should render with custom number of lines', () => {
      render(<LoadingSkeleton lines={5} />);
      
      // Verify all 5 lines exist (0-4)
      for (let i = 0; i < 5; i++) {
        expect(screen.getByTestId(`loading-skeleton-line-${i}`)).toBeInTheDocument();
      }
      
      // Verify line 5 does not exist
      expect(screen.queryByTestId('loading-skeleton-line-5')).not.toBeInTheDocument();
    });

    it('should render with custom testId', () => {
      render(<LoadingSkeleton testId="custom-skeleton" />);
      
      expect(screen.getByTestId('custom-skeleton')).toBeInTheDocument();
      expect(screen.getByTestId('custom-skeleton-line-0')).toBeInTheDocument();
    });

    it('should apply custom className', () => {
      render(<LoadingSkeleton className="custom-class" />);
      
      const skeleton = screen.getByTestId('loading-skeleton');
      expect(skeleton).toHaveClass('custom-class');
    });
  });

  describe('Summary Variant', () => {
    it('should render summary skeleton with correct structure', () => {
      render(<LoadingSkeleton variant="summary" testId="summary-skeleton" />);
      
      const skeleton = screen.getByTestId('summary-skeleton');
      expect(skeleton).toBeInTheDocument();
      expect(screen.getByLabelText('Loading summary')).toBeInTheDocument();
    });

    it('should have summary-specific styling', () => {
      render(<LoadingSkeleton variant="summary" />);
      
      const skeleton = screen.getByTestId('loading-skeleton');
      expect(skeleton).toHaveClass('animate-pulse');
    });
  });

  describe('Chart Variant', () => {
    it('should render chart skeleton with correct structure', () => {
      render(<LoadingSkeleton variant="chart" testId="chart-skeleton" />);
      
      const skeleton = screen.getByTestId('chart-skeleton');
      expect(skeleton).toBeInTheDocument();
      expect(screen.getByLabelText('Loading chart')).toBeInTheDocument();
    });
  });

  describe('List Variant', () => {
    it('should render list skeleton with correct structure', () => {
      render(<LoadingSkeleton variant="list" testId="list-skeleton" />);
      
      const skeleton = screen.getByTestId('list-skeleton');
      expect(skeleton).toBeInTheDocument();
      expect(screen.getByLabelText('Loading list')).toBeInTheDocument();
    });
  });

  describe('Metrics Variant', () => {
    it('should render metrics skeleton with correct structure', () => {
      render(<LoadingSkeleton variant="metrics" testId="metrics-skeleton" />);
      
      const skeleton = screen.getByTestId('metrics-skeleton');
      expect(skeleton).toBeInTheDocument();
      expect(screen.getByLabelText('Loading metrics')).toBeInTheDocument();
    });
  });

  describe('Tabs Variant', () => {
    it('should render tabs skeleton with correct structure', () => {
      render(<LoadingSkeleton variant="tabs" testId="tabs-skeleton" />);
      
      const skeleton = screen.getByTestId('tabs-skeleton');
      expect(skeleton).toBeInTheDocument();
      expect(screen.getByLabelText('Loading tabs')).toBeInTheDocument();
    });
  });

  describe('Accessibility', () => {
    it('should have role="status"', () => {
      render(<LoadingSkeleton />);
      
      const skeleton = screen.getByRole('status');
      expect(skeleton).toBeInTheDocument();
    });

    it('should have aria-label', () => {
      render(<LoadingSkeleton />);
      
      expect(screen.getByLabelText('Loading content')).toBeInTheDocument();
    });

    it('should have screen reader text', () => {
      render(<LoadingSkeleton />);
      
      expect(screen.getByText('Loading...')).toBeInTheDocument();
    });

    it('should mark decorative elements as aria-hidden', () => {
      const { container } = render(<LoadingSkeleton lines={2} />);
      
      const hiddenElements = container.querySelectorAll('[aria-hidden="true"]');
      expect(hiddenElements.length).toBeGreaterThan(0);
    });

    it('should have appropriate aria-label for each variant', () => {
      const { rerender } = render(<LoadingSkeleton variant="summary" />);
      expect(screen.getByLabelText('Loading summary')).toBeInTheDocument();

      rerender(<LoadingSkeleton variant="chart" />);
      expect(screen.getByLabelText('Loading chart')).toBeInTheDocument();

      rerender(<LoadingSkeleton variant="list" />);
      expect(screen.getByLabelText('Loading list')).toBeInTheDocument();

      rerender(<LoadingSkeleton variant="metrics" />);
      expect(screen.getByLabelText('Loading metrics')).toBeInTheDocument();

      rerender(<LoadingSkeleton variant="tabs" />);
      expect(screen.getByLabelText('Loading tabs')).toBeInTheDocument();
    });
  });

  describe('Animation', () => {
    it('should have pulse animation class', () => {
      render(<LoadingSkeleton />);
      
      const skeleton = screen.getByTestId('loading-skeleton');
      expect(skeleton).toHaveClass('animate-pulse');
    });
  });

  describe('Edge Cases', () => {
    it('should handle zero lines gracefully', () => {
      render(<LoadingSkeleton lines={0} />);
      
      expect(screen.getByTestId('loading-skeleton')).toBeInTheDocument();
      expect(screen.queryByTestId('loading-skeleton-line-0')).not.toBeInTheDocument();
    });

    it('should handle large number of lines', () => {
      render(<LoadingSkeleton lines={10} />);
      
      expect(screen.getByTestId('loading-skeleton-line-9')).toBeInTheDocument();
    });

    it('should handle variant with custom className', () => {
      render(<LoadingSkeleton variant="summary" className="my-custom-class" />);
      
      const skeleton = screen.getByTestId('loading-skeleton');
      expect(skeleton).toHaveClass('my-custom-class');
      expect(skeleton).toHaveClass('animate-pulse');
    });
  });
});
