import React, { ReactNode } from 'react';

interface MetricCardProps {
  /** Metric label */
  label: string;
  /** Metric value */
  value: string | number;
  /** Optional unit (e.g., '%', '$') */
  unit?: string;
  /** Optional icon */
  icon?: ReactNode;
  /** Optional description/subtitle */
  description?: string;
  /** Optional color variant */
  variant?: 'default' | 'primary' | 'success' | 'warning' | 'error' | 'info';
  /** Test ID */
  testId?: string;
  /** Optional CSS class */
  className?: string;
  /** Optional aria-label for accessibility */
  ariaLabel?: string;
}

/**
 * Reusable card component for displaying key metrics
 *
 * ## Business Perspective
 *
 * This component presents key security metrics in a consistent,
 * easy-to-scan format. Standardized metric cards help stakeholders
 * quickly understand critical security indicators. 📊
 *
 * **DESIGN SYSTEM**: Uses Tailwind classes only - no inline styles.
 * Follows 8px grid system (p-sm=8px minimum) for consistent spacing.
 *
 * @example
 * ```tsx
 * <MetricCard
 *   label="Uptime Target"
 *   value="99.9"
 *   unit="%"
 *   icon="⏱️"
 *   description="Expected system availability"
 *   variant="success"
 *   testId="uptime-metric"
 * />
 * ```
 */
export const MetricCard: React.FC<MetricCardProps> = ({
  label,
  value,
  unit,
  icon,
  description,
  variant = 'default',
  testId = 'metric-card',
  className = '',
  ariaLabel,
}) => {
  // Variant color classes for borders and backgrounds - Tailwind only
  const variantClasses = {
    default: {
      container: 'border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800',
      value: 'text-gray-800 dark:text-gray-200',
      label: 'text-gray-700 dark:text-gray-300',
      description: 'text-gray-600 dark:text-gray-400',
    },
    primary: {
      container: 'border-primary-light dark:border-primary-dark bg-primary-light/10 dark:bg-primary-dark/20',
      value: 'text-primary-dark dark:text-primary-light',
      label: 'text-primary-dark dark:text-primary-light',
      description: 'text-primary-dark/70 dark:text-primary-light/70',
    },
    success: {
      container: 'border-green-300 dark:border-green-700 bg-green-50 dark:bg-green-900/20',
      value: 'text-green-700 dark:text-green-300',
      label: 'text-green-700 dark:text-green-300',
      description: 'text-green-600 dark:text-green-400',
    },
    warning: {
      container: 'border-yellow-300 dark:border-yellow-700 bg-yellow-50 dark:bg-yellow-900/20',
      value: 'text-yellow-700 dark:text-yellow-300',
      label: 'text-yellow-700 dark:text-yellow-300',
      description: 'text-yellow-600 dark:text-yellow-400',
    },
    error: {
      container: 'border-red-300 dark:border-red-700 bg-red-50 dark:bg-red-900/20',
      value: 'text-red-700 dark:text-red-300',
      label: 'text-red-700 dark:text-red-300',
      description: 'text-red-600 dark:text-red-400',
    },
    info: {
      container: 'border-blue-300 dark:border-blue-700 bg-blue-50 dark:bg-blue-900/20',
      value: 'text-blue-700 dark:text-blue-300',
      label: 'text-blue-700 dark:text-blue-300',
      description: 'text-blue-600 dark:text-blue-400',
    },
  };

  const colors = variantClasses[variant];

  return (
    <div
      className={`p-sm border rounded-md shadow-sm ${colors.container} ${className}`}
      data-testid={testId}
      aria-label={ariaLabel || `${label}: ${value}${unit || ''}`}
    >
      <div className={`flex items-center ${icon ? 'justify-between' : 'justify-end'} mb-sm`}>
        {icon && (
          <span className="text-body" aria-hidden="true">
            {icon}
          </span>
        )}
        <span
          className={`text-heading font-bold leading-none ${colors.value}`}
          data-testid={`${testId}-value`}
        >
          {value}
          {unit && <span className={unit.startsWith(' ') ? '' : 'ml-1'}>{unit}</span>}
        </span>
      </div>
      <p
        className={`text-caption font-medium ${colors.label}`}
        data-testid={`${testId}-label`}
      >
        {label}
      </p>
      {description && (
        <p
          className={`text-xs mt-sm ${colors.description}`}
          data-testid={`${testId}-description`}
        >
          {description}
        </p>
      )}
    </div>
  );
};

export default MetricCard;
