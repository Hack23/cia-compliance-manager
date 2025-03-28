import React, { useMemo } from "react";

interface SecurityRiskScoreProps {
  score: number;
  maxScore?: number;
  label: string;
  className?: string;
  testId?: string;
}

/**
 * Displays a visual security score indicator
 *
 * ## Business Perspective
 *
 * This component provides a quantitative measure of security posture in an
 * easy-to-understand format. The numerical score and color-coding help
 * business stakeholders quickly gauge security maturity and track improvements
 * over time, supporting data-driven security investment decisions. 📈
 *
 * @param props Component props
 * @returns React Element
 */
const SecurityRiskScore: React.FC<SecurityRiskScoreProps> = ({
  score,
  maxScore = 100,
  label,
  className = "",
  testId,
}) => {
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
            data-testid={testId ? `${testId}-value` : undefined}
          >
            {Math.round(normalizedScore)}
          </span>
        </div>
      </div>
      <span
        className="text-xs text-gray-600 dark:text-gray-400 mt-1"
        data-testid={testId ? `${testId}-label` : undefined}
      >
        {label}
      </span>
    </div>
  );
};

export default SecurityRiskScore;
