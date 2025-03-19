import React from "react";
import { getRiskBadgeVariant } from "../../utils";
import StatusBadge from "./StatusBadge";

interface RiskLevelBadgeProps {
  riskLevel: string;
  testId?: string;
  className?: string;
  showIcon?: boolean;
}

/**
 * A specialized badge component for displaying risk levels with consistent styling
 * 
 * ## Business Perspective
 * 
 * This component standardizes risk level visualization across the application,
 * ensuring consistent communication of risk to stakeholders. The visual consistency
 * improves risk perception and decision-making. 📊
 */
const RiskLevelBadge: React.FC<RiskLevelBadgeProps> = ({
  riskLevel,
  testId,
  className = "",
  showIcon = false
}) => {
  // Get appropriate badge variant for risk level
  const badgeVariant = getRiskBadgeVariant(riskLevel);

  // Risk level icons
  const getRiskIcon = () => {
    const normalizedLevel = riskLevel?.toLowerCase() || "";
    if (normalizedLevel.includes("critical")) return "⚠️";
    if (normalizedLevel.includes("high")) return "⚠️";
    if (normalizedLevel.includes("medium") || normalizedLevel.includes("moderate")) return "⚠";
    if (normalizedLevel.includes("low")) return "ℹ️";
    if (normalizedLevel.includes("minimal")) return "✓";
    return "";
  };

  return (
    <StatusBadge 
      status={badgeVariant} 
      testId={testId || `risk-level-${riskLevel?.toLowerCase().replace(/\s+/g, '-')}`}
      className={className}
    >
      {showIcon && <span className="mr-1">{getRiskIcon()}</span>}
      {riskLevel || "Unknown"}
    </StatusBadge>
  );
};

export default RiskLevelBadge;
