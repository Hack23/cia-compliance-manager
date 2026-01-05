import React from "react";
import { SeverityLevel } from "./SeverityBadge";

/**
 * Props for the ImpactBar component
 */
export interface ImpactBarProps {
  /**
   * The severity level to visualize
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
 * Horizontal bar component for visual representation of severity levels
 *
 * ## Business Perspective
 *
 * Provides an intuitive visual indicator of impact severity through a
 * progress-bar style display. Helps users quickly assess and compare
 * severity levels across different business impact categories. 📊
 *
 * ## Technical Implementation
 *
 * Maps severity levels to percentage fills:
 * - Low: 25% fill
 * - Moderate: 50% fill
 * - High: 75% fill
 * - Critical: 100% fill
 *
 * Uses theme-aware colors matching the SeverityBadge component.
 *
 * @example
 * ```tsx
 * <ImpactBar severity="High" testId="financial-impact-bar" />
 * <ImpactBar severity="Critical" testId="operational-impact-bar" />
 * ```
 */
const ImpactBar: React.FC<ImpactBarProps> = ({
  severity,
  testId,
  className = "",
}) => {
  /**
   * Get fill percentage based on severity level
   */
  const getFillPercentage = (): number => {
    switch (severity) {
      case "Low":
        return 25;
      case "Moderate":
        return 50;
      case "High":
        return 75;
      case "Critical":
        return 100;
      default:
        return 0;
    }
  };

  /**
   * Get fill color classes based on severity level
   * Matches SeverityBadge color scheme
   */
  const getFillColorClass = (): string => {
    switch (severity) {
      case "Critical":
        return "bg-red-500 dark:bg-red-600";
      case "High":
        return "bg-orange-500 dark:bg-orange-600";
      case "Moderate":
        return "bg-yellow-500 dark:bg-yellow-600";
      case "Low":
        return "bg-green-500 dark:bg-green-600";
      default:
        return "bg-gray-500 dark:bg-gray-600";
    }
  };

  const fillPercentage = getFillPercentage();
  const fillColorClass = getFillColorClass();

  return (
    <div
      className={`relative h-2 w-full overflow-hidden rounded-full bg-gray-200 dark:bg-gray-700 ${className}`}
      data-testid={testId}
      role="progressbar"
      aria-valuenow={fillPercentage}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-label={`${severity} severity: ${fillPercentage}%`}
    >
      <div
        className={`h-full rounded-full transition-all duration-300 ${fillColorClass}`}
        style={{ width: `${fillPercentage}%` }}
        data-testid={testId ? `${testId}-fill` : undefined}
      />
    </div>
  );
};

export default ImpactBar;
