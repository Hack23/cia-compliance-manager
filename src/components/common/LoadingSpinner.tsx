import React from 'react';

/**
 * Props for LoadingSpinner component
 */
export interface LoadingSpinnerProps {
  /**
   * Size of the spinner
   * @default 'medium'
   */
  size?: 'small' | 'medium' | 'large';
  
  /**
   * Accessible label for the spinner
   * @default 'Loading...'
   */
  label?: string;
  
  /**
   * Optional CSS class name
   */
  className?: string;
  
  /**
   * Optional test ID
   */
  testId?: string;
}

/**
 * Loading spinner component with accessibility support
 * 
 * ## Business Perspective
 * 
 * Provides immediate visual feedback during data loading operations,
 * improving perceived performance and user confidence. Includes ARIA
 * live region announcements for screen reader users. 🔄
 */
export const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
  size = 'medium',
  label = 'Loading...',
  className = '',
  testId = 'loading-spinner'
}) => {
  const sizeClasses = {
    small: 'h-4 w-4 border-2',
    medium: 'h-8 w-8 border-2',
    large: 'h-12 w-12 border-3'
  };

  return (
    <div
      role="status"
      className={`flex items-center justify-center ${className}`}
      aria-live="polite"
      aria-busy="true"
      data-testid={testId}
    >
      <div
        className={`animate-spin rounded-full border-blue-500 border-t-transparent ${sizeClasses[size]}`}
        data-testid={`${testId}-circle`}
      />
      <span className="sr-only">{label}</span>
    </div>
  );
};

export default LoadingSpinner;
