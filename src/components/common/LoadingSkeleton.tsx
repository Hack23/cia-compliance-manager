import React from 'react';

/**
 * Skeleton variant types for different widget layouts
 */
export type SkeletonVariant = 'summary' | 'chart' | 'list' | 'metrics' | 'tabs' | 'default';

/**
 * Props for LoadingSkeleton component
 */
export interface LoadingSkeletonProps {
  /**
   * Number of skeleton lines to display (used for 'default' variant)
   * @default 3
   */
  lines?: number;
  
  /**
   * Skeleton variant for different widget types
   * @default 'default'
   */
  variant?: SkeletonVariant;
  
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
 * skeleton shimmer effect. Supports multiple variants for different
 * widget layouts.
 * 
 * @example
 * ```tsx
 * // Default 3-line skeleton
 * <LoadingSkeleton />
 * 
 * // Custom number of lines
 * <LoadingSkeleton lines={5} />
 * 
 * // Summary widget skeleton
 * <LoadingSkeleton variant="summary" />
 * 
 * // Chart widget skeleton
 * <LoadingSkeleton variant="chart" />
 * 
 * // Metrics widget skeleton
 * <LoadingSkeleton variant="metrics" />
 * ```
 */
export const LoadingSkeleton: React.FC<LoadingSkeletonProps> = ({ 
  lines = 3,
  variant = 'default',
  testId = 'loading-skeleton',
  className = ''
}) => {
  const baseClasses = 'animate-pulse';
  const skeletonClasses = 'bg-gray-200 dark:bg-gray-700 rounded';

  // Default variant - simple lines
  if (variant === 'default') {
    return (
      <div 
        className={`${baseClasses} space-y-4 ${className}`}
        data-testid={testId}
        role="status"
        aria-label="Loading content"
      >
        {Array.from({ length: lines }).map((_, i) => (
          <div 
            key={`skeleton-line-${i}`}
            className={`h-4 ${skeletonClasses}`}
            data-testid={`${testId}-line-${i}`}
            aria-hidden="true"
          />
        ))}
        <span className="sr-only">Loading...</span>
      </div>
    );
  }

  // Summary variant - header + content + metrics grid
  if (variant === 'summary') {
    return (
      <div 
        className={`${baseClasses} space-y-4 ${className}`}
        data-testid={testId}
        role="status"
        aria-label="Loading summary"
      >
        <div className={`h-8 ${skeletonClasses} w-3/4`} aria-hidden="true" />
        <div className={`h-24 ${skeletonClasses}`} aria-hidden="true" />
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {[1, 2, 3].map(i => (
            <div key={i} className={`h-20 ${skeletonClasses}`} aria-hidden="true" />
          ))}
        </div>
        <span className="sr-only">Loading summary...</span>
      </div>
    );
  }

  // Chart variant - title + large chart area + legend
  if (variant === 'chart') {
    return (
      <div 
        className={`${baseClasses} space-y-4 ${className}`}
        data-testid={testId}
        role="status"
        aria-label="Loading chart"
      >
        <div className={`h-6 ${skeletonClasses} w-1/2`} aria-hidden="true" />
        <div className={`h-64 ${skeletonClasses}`} aria-hidden="true" />
        <div className="flex justify-between gap-4">
          {[1, 2, 3, 4].map(i => (
            <div key={i} className={`h-4 w-16 ${skeletonClasses}`} aria-hidden="true" />
          ))}
        </div>
        <span className="sr-only">Loading chart...</span>
      </div>
    );
  }

  // List variant - multiple list items
  if (variant === 'list') {
    return (
      <div 
        className={`${baseClasses} space-y-3 ${className}`}
        data-testid={testId}
        role="status"
        aria-label="Loading list"
      >
        {[1, 2, 3, 4, 5].map(i => (
          <div key={i} className="flex items-center space-x-4">
            <div className={`h-10 w-10 ${skeletonClasses} rounded-full`} aria-hidden="true" />
            <div className="flex-1 space-y-2">
              <div className={`h-4 ${skeletonClasses} w-3/4`} aria-hidden="true" />
              <div className={`h-3 ${skeletonClasses} w-1/2`} aria-hidden="true" />
            </div>
          </div>
        ))}
        <span className="sr-only">Loading list...</span>
      </div>
    );
  }

  // Metrics variant - grid of metric cards
  if (variant === 'metrics') {
    return (
      <div 
        className={`${baseClasses} ${className}`}
        data-testid={testId}
        role="status"
        aria-label="Loading metrics"
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[1, 2, 3, 4].map(i => (
            <div key={i} className="space-y-3">
              <div className={`h-4 ${skeletonClasses} w-2/3`} aria-hidden="true" />
              <div className={`h-8 ${skeletonClasses}`} aria-hidden="true" />
              <div className={`h-3 ${skeletonClasses} w-1/2`} aria-hidden="true" />
            </div>
          ))}
        </div>
        <span className="sr-only">Loading metrics...</span>
      </div>
    );
  }

  // Tabs variant - tab buttons + content area
  if (variant === 'tabs') {
    return (
      <div 
        className={`${baseClasses} space-y-4 ${className}`}
        data-testid={testId}
        role="status"
        aria-label="Loading tabs"
      >
        <div className="flex space-x-2 border-b border-gray-200 dark:border-gray-700">
          {[1, 2, 3, 4].map(i => (
            <div key={i} className={`h-10 w-24 ${skeletonClasses} mb-[-1px]`} aria-hidden="true" />
          ))}
        </div>
        <div className="space-y-3">
          <div className={`h-6 ${skeletonClasses} w-3/4`} aria-hidden="true" />
          <div className={`h-32 ${skeletonClasses}`} aria-hidden="true" />
          <div className={`h-4 ${skeletonClasses} w-5/6`} aria-hidden="true" />
          <div className={`h-4 ${skeletonClasses} w-4/6`} aria-hidden="true" />
        </div>
        <span className="sr-only">Loading tabs...</span>
      </div>
    );
  }

  // Fallback to default variant for any unknown variant
  // This ensures backward compatibility and prevents errors
  return (
    <div 
      className={`${baseClasses} space-y-4 ${className}`}
      data-testid={testId}
      role="status"
      aria-label="Loading content"
    >
      {Array.from({ length: lines }).map((_, i) => (
        <div 
          key={`skeleton-line-${i}`}
          className={`h-4 ${skeletonClasses}`}
          data-testid={`${testId}-line-${i}`}
          aria-hidden="true"
        />
      ))}
      <span className="sr-only">Loading...</span>
    </div>
  );
};

export default LoadingSkeleton;
