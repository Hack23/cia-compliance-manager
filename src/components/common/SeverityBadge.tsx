import React from "react";

/**
 * Severity level type for impact assessment
 */
export type SeverityLevel = "Low" | "Moderate" | "High" | "Critical";

/**
 * Props for the SeverityBadge component
 */
export interface SeverityBadgeProps {
  /**
   * The severity level to display
   */
  severity: SeverityLevel;

  /**
   * Test ID for automated testing
   */
  testId?: string;

  /**
   * Additional CSS classes
   */
  className?: string;
}

/**
 * Badge component for displaying severity levels with consistent styling
 *
 * ## Business Perspective
 *
 * Provides visual indicators for impact severity across different business
 * dimensions (financial, operational, reputational, regulatory), enabling
 * quick assessment of risk levels and prioritization of security controls. 🎯
 *
 * ## Technical Implementation
 *
 * Uses TailwindCSS for theme-aware styling with dark mode support.
 * Color scheme follows standard severity conventions:
 * - Critical: Red (high urgency)
 * - High: Orange (significant concern)
 * - Moderate: Yellow (attention needed)
 * - Low: Green (minimal risk)
 *
 * @example
 * ```tsx
 * <SeverityBadge severity="High" testId="financial-severity" />
 * <SeverityBadge severity="Critical" testId="operational-severity" />
 * ```
 */
const SeverityBadge: React.FC<SeverityBadgeProps> = ({
  severity,
  testId,
  className = "",
}) => {
  /**
   * Get color classes based on severity level
   * Follows standard color conventions with dark mode support
   */
  const getColorClasses = (): string => {
    switch (severity) {
      case "Critical":
        return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200";
      case "High":
        return "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200";
      case "Moderate":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200";
      case "Low":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200";
    }
  };

  return (
    <span
      className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium ${getColorClasses()} ${className}`}
      data-testid={testId}
      role="status"
      aria-label={`Severity: ${severity}`}
    >
      {severity}
    </span>
  );
};

export default SeverityBadge;
