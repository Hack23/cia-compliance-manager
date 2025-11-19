import React from 'react';

/**
 * Props for LoadingSkeleton component
 */
export interface LoadingSkeletonProps {
  /**
   * Number of skeleton lines to display
   * @default 3
   */
  lines?: number;
  
  /**
   * Optional test ID for automated testing
   */
  testId?: string;
  
  /**
   * Optional CSS class name
   */
  className?: string;
}

/**
 * Loading skeleton component for better perceived performance
 * 
 * ## Business Perspective
 * 
 * Improves perceived performance by showing content placeholders while
 * data loads, making the application feel more responsive and reducing
 * user anxiety during loading operations. 📊
 * 
 * ## Technical Perspective
 * 
 * Provides animated placeholder content that mimics the structure of
 * the actual content being loaded. Uses CSS animations for smooth
 * skeleton shimmer effect.
 * 
 * @example
 * ```tsx
 * // Default 3-line skeleton
 * <LoadingSkeleton />
 * 
 * // Custom number of lines
 * <LoadingSkeleton lines={5} />
 * 
 * // With custom test ID
 * <LoadingSkeleton lines={4} testId="metrics-skeleton" />
 * ```
 */
export const LoadingSkeleton: React.FC<LoadingSkeletonProps> = ({ 
  lines = 3,
  testId = 'loading-skeleton',
  className = ''
}) => {
  return (
    <div 
      className={`animate-pulse space-y-4 ${className}`}
      data-testid={testId}
      role="status"
      aria-label="Loading content"
    >
      {Array.from({ length: lines }).map((_, i) => (
        <div 
          key={`skeleton-line-${i}`}
          className="h-4 bg-gray-200 dark:bg-gray-700 rounded"
          data-testid={`${testId}-line-${i}`}
          aria-hidden="true"
        />
      ))}
      <span className="sr-only">Loading...</span>
    </div>
  );
};

export default LoadingSkeleton;
