import React, { ReactNode } from 'react';

interface WidgetSectionProps {
  /** Section title */
  title: string;
  /** Section content */
  children: ReactNode;
  /** Optional subtitle */
  subtitle?: string;
  /** Optional icon */
  icon?: ReactNode;
  /** Optional CSS class */
  className?: string;
  /** Test ID */
  testId?: string;
  /** Optional aria-labelledby for accessibility */
  ariaLabelledBy?: string;
  /** Section background color variant */
  variant?: 'default' | 'primary' | 'success' | 'info' | 'warning' | 'error';
}

/**
 * Reusable section component for consistent widget layout
 *
 * ## Business Perspective
 *
 * This component provides a consistent section layout across all widgets,
 * improving readability and user experience when viewing security assessments.
 * Standardized sections help users quickly locate relevant information. 📦
 *
 * **DESIGN SYSTEM**: Uses Tailwind classes only - no inline styles.
 * All spacing via design tokens (p-xs=4px, p-sm=6px, rounded-md=12px)
 *
 * @example
 * ```tsx
 * <WidgetSection
 *   title="Business Impact"
 *   subtitle="Financial and operational impact analysis"
 *   icon="💼"
 *   testId="business-impact-section"
 * >
 *   <p>Section content here</p>
 * </WidgetSection>
 * ```
 */
export const WidgetSection: React.FC<WidgetSectionProps> = ({
  title,
  children,
  subtitle,
  icon,
  className = '',
  testId = 'widget-section',
  ariaLabelledBy,
  variant = 'default',
}) => {
  // Variant color classes for borders and backgrounds - Tailwind only
  const variantClasses = {
    default: 'border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800',
    primary: 'border-primary-light dark:border-primary-dark bg-primary-light/10 dark:bg-primary-dark/20',
    success: 'border-green-200 dark:border-green-800 bg-green-50 dark:bg-green-900/20',
    info: 'border-blue-200 dark:border-blue-800 bg-blue-50 dark:bg-blue-900/20',
    warning: 'border-yellow-200 dark:border-yellow-800 bg-yellow-50 dark:bg-yellow-900/20',
    error: 'border-red-200 dark:border-red-800 bg-red-50 dark:bg-red-900/20',
  };

  // Generate unique heading ID to avoid circular reference
  const headingId = ariaLabelledBy || `${testId}-heading`;

  return (
    <section
      className={`p-xs border rounded-md shadow-sm ${variantClasses[variant]} ${className}`}
      data-testid={testId}
      aria-labelledby={headingId}
    >
      <div className="flex items-center gap-xs mb-xs">
        {icon && <span className="text-body" aria-hidden="true">{icon}</span>}
        <h3
          className="text-body-lg font-semibold text-gray-800 dark:text-gray-200"
          id={headingId}
        >
          {title}
        </h3>
      </div>
      {subtitle && (
        <p className="text-caption text-gray-600 dark:text-gray-400 mb-xs">{subtitle}</p>
      )}
      <div>{children}</div>
    </section>
  );
};

export default WidgetSection;
