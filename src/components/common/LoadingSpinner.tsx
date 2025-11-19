import React from 'react';

/**
 * Props for LoadingSpinner component
 */
export interface LoadingSpinnerProps {
  /**
   * Size of the spinner
   * @default 'md'
   */
  size?: 'sm' | 'md' | 'lg';
  
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
 * Loading spinner component for indicating loading states
 * 
 * ## Business Perspective
 * 
 * Provides consistent visual feedback during data loading operations,
 * improving user experience by clearly indicating that the application
 * is working on their request. 🔄
 * 
 * ## Technical Perspective
 * 
 * Reusable loading indicator component that maintains visual consistency
 * across all widgets and screens. Uses Tailwind CSS for styling with
 * support for different sizes.
 * 
 * @example
 * ```tsx
 * // Small spinner
 * <LoadingSpinner size="sm" />
 * 
 * // Default medium spinner
 * <LoadingSpinner />
 * 
 * // Large spinner with custom test ID
 * <LoadingSpinner size="lg" testId="widget-loader" />
 * ```
 */
export const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ 
  size = 'md',
  testId = 'loading-spinner',
  className = ''
}) => {
  const sizeClasses: Record<'sm' | 'md' | 'lg', string> = {
    sm: 'w-4 h-4 border-2',
    md: 'w-8 h-8 border-4',
    lg: 'w-12 h-12 border-4',
  };

  return (
    <div 
      className={`flex justify-center items-center p-4 ${className}`}
      data-testid={`${testId}-container`}
      role="status"
      aria-label="Loading"
    >
      <div 
        className={`${sizeClasses[size]} border-blue-200 dark:border-blue-800 border-t-blue-600 dark:border-t-blue-400 rounded-full animate-spin`}
        data-testid={testId}
        aria-hidden="true"
      />
      <span className="sr-only">Loading...</span>
    </div>
  );
};

export default LoadingSpinner;
