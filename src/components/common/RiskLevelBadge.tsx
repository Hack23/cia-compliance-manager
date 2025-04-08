import React from "react";
import { StatusType } from "../../types/common/StatusTypes"; // Add this import
import { getStatusBadgeForRiskLevel } from "../../utils/riskUtils";
import StatusBadge from "./StatusBadge";

interface RiskLevelBadgeProps {
  /**
   * Risk level to display
   */
  risk: string;

  /**
   * Additional class names
   */
  className?: string;

  /**
   * Test ID for testing
   */
  testId?: string;

  /**
   * Show icon along with risk level
   */
  showIcon?: boolean;
}

/**
 * Badge for displaying risk levels with appropriate styling
 */
const RiskLevelBadge: React.FC<RiskLevelBadgeProps> = ({
  risk,
  className = "",
  testId = "risk-level-badge",
  showIcon = false,
}) => {
  // Handle undefined risk level
  if (!risk) {
    return (
      <StatusBadge status="neutral" className={className} testId={testId}>
        Unknown
      </StatusBadge>
    );
  }

  // Normalize the risk level text
  const formattedRisk = risk.includes("Risk") ? risk : `${risk} Risk`;

  // Get the appropriate badge status based on risk level
  // Use type assertion to ensure it's recognized as a valid StatusType
  const status = getStatusBadgeForRiskLevel(risk) as StatusType;

  return (
    <StatusBadge status={status} className={className} testId={testId}>
      {showIcon && getRiskIcon(risk)} {formattedRisk}
    </StatusBadge>
  );
};

/**
 * Get appropriate icon for risk level
 */
function getRiskIcon(risk: string): string {
  const lowercaseRisk = risk.toLowerCase();

  if (lowercaseRisk.includes("critical") || lowercaseRisk.includes("high")) {
    return "⚠️";
  } else if (
    lowercaseRisk.includes("medium") ||
    lowercaseRisk.includes("moderate")
  ) {
    return "⚠";
  } else if (lowercaseRisk.includes("low")) {
    return "ℹ️";
  } else if (
    lowercaseRisk.includes("minimal") ||
    lowercaseRisk.includes("none")
  ) {
    return "✓";
  }

  return "❓";
}

export default RiskLevelBadge;
