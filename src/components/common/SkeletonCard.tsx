import React from 'react';
import type { SkeletonCardProps } from '../../types/componentPropExports';
import { COMMON_COMPONENT_TEST_IDS } from '../../constants/testIds';

/**
 * Skeleton card component for loading states
 * 
 * ## Business Perspective
 * 
 * Skeleton screens improve perceived performance by showing the structure
 * of content before it loads, reducing user anxiety and providing a smooth
 * loading experience. This is particularly important for business dashboards
 * where users need confidence that the system is working. 📊
 */
export const SkeletonCard: React.FC<SkeletonCardProps> = ({
  lines = 3,
  showHeader = true,
  showFooter = false,
  className = '',
  testId = COMMON_COMPONENT_TEST_IDS.SKELETON_CARD
}) => {
  return (
    <div
      className={`animate-pulse ${className}`}
      data-testid={testId}
      role="status"
      aria-label="Loading content"
      aria-live="polite"
    >
      {showHeader && (
        <div
          className="skeleton-header h-6 bg-gray-200 dark:bg-gray-700 rounded mb-4"
          data-testid={`${testId}-header`}
        />
      )}
      <div className="skeleton-body space-y-3">
        {Array.from({ length: lines }).map((_, index) => (
          <div
            key={index}
            className={`skeleton-line h-4 bg-gray-200 dark:bg-gray-700 rounded ${
              index === lines - 1 ? 'w-3/4' : 'w-full'
            }`}
            data-testid={`${testId}-line-${index}`}
          />
        ))}
      </div>
      {showFooter && (
        <div
          className="skeleton-footer h-8 bg-gray-200 dark:bg-gray-700 rounded mt-4"
          data-testid={`${testId}-footer`}
        />
      )}
      <span className="sr-only">Loading content, please wait...</span>
    </div>
  );
};

export default SkeletonCard;
