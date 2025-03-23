import React from "react";

/**
 * Props for ProgressBar component
 */
interface ProgressBarProps {
  /**
   * Percentage value (0-100)
   */
  percentage: number;

  /**
   * Optional background color class
   */
  bgColorClass?: string;

  /**
   * Optional height class
   */
  heightClass?: string;

  /**
   * Optional test ID for testing
   */
  testId?: string;
}

/**
 * ProgressBar component displays a horizontal progress bar
 *
 * ## Business Perspective
 *
 * Visual representation of metrics and progress allows executives and managers
 * to quickly assess status of security controls and implementation progress.
 * This promotes data-driven decision making and provides clear visual feedback. 📊
 */
const ProgressBar: React.FC<ProgressBarProps> = ({
  percentage,
  bgColorClass = "bg-blue-500",
  heightClass = "h-2",
  testId,
}) => {
  // Ensure percentage is between 0 and 100
  const normalizedPercentage = Math.max(0, Math.min(100, percentage));

  return (
    <div
      className="w-full bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden"
      data-testid={testId}
    >
      <div
        className={`${bgColorClass} ${heightClass} rounded-full`}
        style={{ width: `${normalizedPercentage}%` }}
        data-testid={testId ? `${testId}-fill` : undefined}
      />
    </div>
  );
};

export default ProgressBar;
