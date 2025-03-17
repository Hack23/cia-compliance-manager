import React from "react";

interface SecurityRiskScoreProps {
  score: number;
  label: string;
  testId?: string;
}

/**
 * Displays a security risk score with visual indicators
 */
const SecurityRiskScore: React.FC<SecurityRiskScoreProps> = ({
  score,
  label,
  testId,
}) => {
  // Determine color and class based on risk score
  const getScoreColor = () => {
    if (score >= 80) return { color: "#ff5252", className: "critical-risk" };
    if (score >= 60) return { color: "#ff9800", className: "high-risk" };
    if (score >= 40) return { color: "#ffeb3b", className: "medium-risk" };
    if (score >= 20) return { color: "#00e676", className: "low-risk" };
    return { color: "#00e676", className: "low-risk" };
  };

  const { color, className } = getScoreColor();

  // Calculate gauge position (0-100%)
  const gaugePosition = `${score}%`;

  return (
    <div
      className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg border shadow-sm"
      data-testid={testId}
    >
      <h4 className="text-sm font-medium mb-2">Risk Assessment Score</h4>

      {/* Risk Score Display */}
      <div className="flex justify-center mb-3">
        <div className={`text-2xl font-bold ${className} risk-score-value`}>
          {score}/100
        </div>
      </div>

      {/* Risk Label */}
      <div className="text-center mb-3">
        <span
          className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${className}`}
        >
          {label} Risk
        </span>
      </div>

      {/* Risk Gauge */}
      <div className="mt-2">
        <div className="security-gauge">
          <div
            className="security-gauge-indicator"
            style={{ left: gaugePosition }}
          ></div>
        </div>
        <div className="flex justify-between text-xs mt-1 text-gray-500 dark:text-gray-400">
          <span>Low</span>
          <span>Medium</span>
          <span>High</span>
          <span>Critical</span>
        </div>
      </div>
    </div>
  );
};

export default SecurityRiskScore;
