import React from 'react';

type StatusType = 'success' | 'warning' | 'error' | 'info' | 'neutral' | 'purple';
type SizeType = 'sm' | 'md' | 'lg';

interface StatusBadgeProps {
  status: StatusType;
  size?: SizeType;
  children: React.ReactNode;
  testId?: string;
  className?: string; // Add className prop
}

/**
 * Status badge component for displaying status indicators
 * 
 * ## Business Perspective
 * 
 * This component provides visual indicators for statuses, helping
 * users quickly identify compliance states, risk levels, and security
 * postures across the application. 🔒
 */
export const StatusBadge: React.FC<StatusBadgeProps> = ({
  status,
  size = 'md',
  children,
  testId = 'badge',
  className = ''
}) => {
  // Define status-specific styles
  const statusStyles = {
    success: 'bg-green-100 text-green-800 border-green-300 dark:bg-green-900 dark:bg-opacity-30 dark:text-green-300 dark:border-green-800',
    warning: 'bg-yellow-100 text-yellow-800 border-yellow-300 dark:bg-yellow-900 dark:bg-opacity-30 dark:text-yellow-300 dark:border-yellow-800',
    error: 'bg-red-100 text-red-800 border-red-300 dark:bg-red-900 dark:bg-opacity-30 dark:text-red-300 dark:border-red-800',
    info: 'bg-blue-100 text-blue-800 border-blue-300 dark:bg-blue-900 dark:bg-opacity-30 dark:text-blue-300 dark:border-blue-800',
    neutral: 'bg-gray-100 text-gray-800 border-gray-300 dark:bg-gray-800 dark:bg-opacity-30 dark:text-gray-300 dark:border-gray-700',
    purple: 'bg-purple-100 text-purple-800 border-purple-300 dark:bg-purple-900 dark:bg-opacity-30 dark:text-purple-300 dark:border-purple-800'
  };

  // Define size-specific styles
  const sizeStyles = {
    sm: 'text-xs',
    md: 'text-sm',
    lg: 'text-base'
  };

  // Combine classes with status and size-specific classes explicitly included
  const classes = `px-2 py-1 font-medium rounded border ${sizeStyles[size]} ${statusStyles[status]} ${status} ${size} ${className}`;

  return (
    <span className={classes} data-testid={testId}>
      {children}
    </span>
  );
};

// Export the StatusType for use in other components
export type { StatusType as StatusBadgeVariant };

export default StatusBadge;
