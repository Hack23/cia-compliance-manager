import React, { ReactNode } from 'react';
import { SPACING, TYPOGRAPHY, BORDER_RADIUS, SHADOWS } from '../../constants/designTokens';

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
  // Variant color classes for borders and backgrounds
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
      className={`border ${variantClasses[variant]} ${className}`}
      style={{
        padding: SPACING.md,
        borderRadius: BORDER_RADIUS.md,
        boxShadow: SHADOWS.sm,
      }}
      data-testid={testId}
      aria-labelledby={headingId}
    >
      <div className="flex items-center gap-2 mb-4">
        {icon && <span aria-hidden="true">{icon}</span>}
        <h3
          style={{ fontSize: TYPOGRAPHY.subheading }}
          className="font-semibold text-gray-800 dark:text-gray-200"
          id={headingId}
        >
          {title}
        </h3>
      </div>
      {subtitle && (
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">{subtitle}</p>
      )}
      <div>{children}</div>
    </section>
  );
};

export default WidgetSection;
