import React from "react";
import SeverityBadge, { SeverityLevel } from "./SeverityBadge";
import ImpactBar from "./ImpactBar";

/**
 * Impact category configuration
 */
export interface ImpactCategory {
  /**
   * Unique identifier for the category
   */
  id: string;

  /**
   * Display label for the category
   */
  label: string;

  /**
   * Icon emoji for the category
   */
  icon: string;

  /**
   * Color theme for the category
   */
  color: string;
}

/**
 * Props for the ImpactCategoryCard component
 */
export interface ImpactCategoryCardProps {
  /**
   * Impact category configuration
   */
  category: ImpactCategory;

  /**
   * Severity level of the impact
   */
  severity: SeverityLevel;

  /**
   * Detailed description of the impact
   */
  details: string;

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
 * Compact card component for displaying impact category information
 *
 * ## Business Perspective
 *
 * Provides a standardized, compact display of business impact assessments
 * across different categories (Financial, Operational, Reputational, Regulatory).
 * Enables quick scanning and comparison of impacts across categories. 💼
 *
 * ## Technical Implementation
 *
 * Combines multiple sub-components:
 * - Category icon and label
 * - SeverityBadge for severity indication
 * - ImpactBar for visual severity representation
 * - Detailed description text
 *
 * Uses compact spacing (space-y-2) to minimize vertical footprint while
 * maintaining readability and visual hierarchy.
 *
 * @example
 * ```tsx
 * <ImpactCategoryCard
 *   category={{
 *     id: "financial",
 *     label: "Financial",
 *     icon: "💰",
 *     color: "cyan"
 *   }}
 *   severity="High"
 *   details="Significant revenue impact of $100K-$500K annually"
 *   testId="financial-impact-card"
 * />
 * ```
 */
const ImpactCategoryCard: React.FC<ImpactCategoryCardProps> = ({
  category,
  severity,
  details,
  testId,
  className = "",
}) => {
  return (
    <div
      className={`space-y-2 rounded-lg border border-gray-200 bg-white p-3 shadow-sm dark:border-gray-700 dark:bg-gray-800 ${className}`}
      data-testid={testId}
      role="article"
      aria-label={`${category.label} impact: ${severity} severity`}
    >
      {/* Category Header with Icon and Label */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <span
            className="text-lg"
            role="img"
            aria-label={`${category.label} icon`}
          >
            {category.icon}
          </span>
          <h4 className="text-sm font-semibold text-gray-900 dark:text-gray-100">
            {category.label}
          </h4>
        </div>
        <SeverityBadge
          severity={severity}
          testId={testId ? `${testId}-severity-badge` : undefined}
        />
      </div>

      {/* Visual Severity Bar */}
      <ImpactBar
        severity={severity}
        testId={testId ? `${testId}-impact-bar` : undefined}
      />

      {/* Impact Details */}
      <p
        className="text-xs text-gray-600 dark:text-gray-400"
        data-testid={testId ? `${testId}-details` : undefined}
      >
        {details}
      </p>
    </div>
  );
};

export default ImpactCategoryCard;
