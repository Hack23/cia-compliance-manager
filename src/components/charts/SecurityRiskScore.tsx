import React, { useMemo } from "react";

interface SecurityRiskScoreProps {
  /**
   * The security score to display (0-100)
   */
  score: number;

  /**
   * Maximum possible score (defaults to 100)
   */
  maxScore?: number;

  /**
   * Label to display under the score
   */
  label: string;

  /**
   * Optional CSS class name
   */
  className?: string;

  /**
   * Optional test ID for automated testing
   */
  testId?: string;
}

/**
 * Displays a circular gauge chart showing a security risk score
 *
 * ## Business Perspective
 *
 * This component provides a quantitative measure of security posture in an
 * easy-to-understand format. The numerical score and color-coding help
 * business stakeholders quickly gauge security maturity. 📈
 */
export function SecurityRiskScore({
  score,
  maxScore = 100,
  label,
  className = "",
  testId,
}: SecurityRiskScoreProps): React.ReactElement {
  // Normalize score as a percentage
  const normalizedScore = useMemo(() => {
    if (score <= 0) return 0;
    if (score >= maxScore) return 100;
    return (score / maxScore) * 100;
  }, [score, maxScore]);

  // Determine color based on score range
  const scoreColor = useMemo(() => {
    if (normalizedScore >= 75) return "text-green-500 dark:text-green-400";
    if (normalizedScore >= 50) return "text-yellow-500 dark:text-yellow-400";
    return "text-red-500 dark:text-red-400";
  }, [normalizedScore]);

  // Calculate the stroke dash offset for the circular progress
  const circumference = 2 * Math.PI * 28; // 2πr where r=28
  const strokeDashArray = `${circumference}`;
  const strokeDashOffset = ((100 - normalizedScore) / 100) * circumference;

  return (
    <div
      className={`flex flex-col items-center ${className}`}
      data-testid={testId}
    >
      <div className="relative">
        <svg width="64" height="64" viewBox="0 0 64 64">
          {/* Background circle */}
          <circle
            cx="32"
            cy="32"
            r="28"
            fill="none"
            stroke="#e5e7eb"
            strokeWidth="8"
            className="dark:stroke-gray-700"
          />
          {/* Score indicator */}
          <circle
            cx="32"
            cy="32"
            r="28"
            fill="none"
            strokeLinecap="round"
            stroke="currentColor"
            strokeWidth="8"
            strokeDasharray={strokeDashArray}
            strokeDashoffset={strokeDashOffset}
            transform="rotate(-90 32 32)"
            className={scoreColor}
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span
            className={`text-lg font-bold ${scoreColor}`}
            data-testid={`${testId}-value`}
          >
            {Math.round(normalizedScore)}
          </span>
        </div>
      </div>
      <span
        className="text-xs text-gray-600 dark:text-gray-400 mt-1"
        data-testid={`${testId}-label`}
      >
        {label}
      </span>
    </div>
  );
}

export default SecurityRiskScore;
