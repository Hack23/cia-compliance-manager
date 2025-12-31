import React from 'react';
import type { LoadingSkeletonProps, SkeletonVariant } from '../../types/componentPropExports';

/**
 * Configuration for skeleton variants
 */
interface SkeletonVariantConfig {
  ariaLabel: string;
  srText: string;
  render: (skeletonClasses: string) => React.ReactNode;
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

  // Configuration map for each variant
  const variantConfigs: Record<SkeletonVariant, SkeletonVariantConfig> = {
    default: {
      ariaLabel: 'Loading content',
      srText: 'Loading...',
      render: (classes) => (
        <>
          {Array.from({ length: lines }).map((_, i) => (
            <div 
              key={`skeleton-line-${i}`}
              className={`h-4 ${classes}`}
              data-testid={`${testId}-line-${i}`}
              aria-hidden="true"
            />
          ))}
        </>
      )
    },
    summary: {
      ariaLabel: 'Loading summary',
      srText: 'Loading summary...',
      render: (classes) => (
        <>
          <div className={`h-8 ${classes} w-3/4`} aria-hidden="true" />
          <div className={`h-24 ${classes}`} aria-hidden="true" />
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {['summary-metric-1', 'summary-metric-2', 'summary-metric-3'].map((key) => (
              <div key={key} className={`h-20 ${classes}`} aria-hidden="true" />
            ))}
          </div>
        </>
      )
    },
    chart: {
      ariaLabel: 'Loading chart',
      srText: 'Loading chart...',
      render: (classes) => (
        <>
          <div className={`h-6 ${classes} w-1/2`} aria-hidden="true" />
          <div className={`h-64 ${classes}`} aria-hidden="true" />
          <div className="flex justify-between gap-4">
            {['legend-1', 'legend-2', 'legend-3', 'legend-4'].map((key) => (
              <div key={key} className={`h-4 w-16 ${classes}`} aria-hidden="true" />
            ))}
          </div>
        </>
      )
    },
    list: {
      ariaLabel: 'Loading list',
      srText: 'Loading list...',
      render: (classes) => (
        <>
          {['list-item-1', 'list-item-2', 'list-item-3', 'list-item-4', 'list-item-5'].map((key) => (
            <div key={key} className="flex items-center space-x-4">
              <div className={`h-10 w-10 ${classes} rounded-full`} aria-hidden="true" />
              <div className="flex-1 space-y-2">
                <div className={`h-4 ${classes} w-3/4`} aria-hidden="true" />
                <div className={`h-3 ${classes} w-1/2`} aria-hidden="true" />
              </div>
            </div>
          ))}
        </>
      )
    },
    metrics: {
      ariaLabel: 'Loading metrics',
      srText: 'Loading metrics...',
      render: (classes) => (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {['metric-1', 'metric-2', 'metric-3', 'metric-4'].map((key) => (
            <div key={key} className="space-y-3">
              <div className={`h-4 ${classes} w-2/3`} aria-hidden="true" />
              <div className={`h-8 ${classes}`} aria-hidden="true" />
              <div className={`h-3 ${classes} w-1/2`} aria-hidden="true" />
            </div>
          ))}
        </div>
      )
    },
    tabs: {
      ariaLabel: 'Loading tabs',
      srText: 'Loading tabs...',
      render: (classes) => (
        <>
          <div className="flex space-x-2 border-b border-gray-200 dark:border-gray-700">
            {['tab-1', 'tab-2', 'tab-3', 'tab-4'].map((key) => (
              <div key={key} className={`h-10 w-24 ${classes} mb-[-1px]`} aria-hidden="true" />
            ))}
          </div>
          <div className="space-y-3">
            <div className={`h-6 ${classes} w-3/4`} aria-hidden="true" />
            <div className={`h-32 ${classes}`} aria-hidden="true" />
            <div className={`h-4 ${classes} w-5/6`} aria-hidden="true" />
            <div className={`h-4 ${classes} w-4/6`} aria-hidden="true" />
          </div>
        </>
      )
    }
  };

  // Get the configuration for the current variant, fallback to default
  const config = variantConfigs[variant] || variantConfigs.default;
  const spaceClass = variant === 'list' ? 'space-y-3' : variant === 'metrics' ? '' : 'space-y-4';

  return (
    <div 
      className={`${baseClasses} ${spaceClass} ${className}`}
      data-testid={testId}
      role="status"
      aria-label={config.ariaLabel}
    >
      {config.render(skeletonClasses)}
      <span className="sr-only">{config.srText}</span>
    </div>
  );
};

export default LoadingSkeleton;
