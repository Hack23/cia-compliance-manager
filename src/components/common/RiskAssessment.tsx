import React from "react";
import { SecurityLevel } from "../../types/cia";
import { getRiskLevelFromSecurityLevel } from "../../utils/riskUtils";
import RiskLevelBadge from "./RiskLevelBadge";

interface RiskAssessmentProps {
  /**
   * Security level to assess risk for
   */
  securityLevel: SecurityLevel;

  /**
   * Risk score (0-100)
   */
  riskScore?: number;

  /**
   * Test ID for testing
   */
  testId?: string;

  /**
   * Whether to show in compact mode
   */
  compact?: boolean;

  /**
   * Risk description
   */
  riskDescription?: string;

  /**
   * Custom risk level
   */
  customRiskLevel?: string;
}

/**
 * Calculate risk score from security level
 */
function calculateRiskScoreFromLevel(level: SecurityLevel): number {
  switch (level) {
    case "None":
      return 100;
    case "Low":
      return 75;
    case "Moderate":
      return 50;
    case "High":
      return 25;
    case "Very High":
      return 0;
    default:
      return 50;
  }
}

/**
 * Get risk icon based on risk level
 */
function getRiskIcon(riskLevel: string): string {
  const lowercaseRisk = riskLevel.toLowerCase();

  if (lowercaseRisk.includes("critical")) {
    return "⚠️";
  } else if (lowercaseRisk.includes("high")) {
    return "⚠️";
  } else if (
    lowercaseRisk.includes("medium") ||
    lowercaseRisk.includes("moderate")
  ) {
    return "⚠";
  } else if (lowercaseRisk.includes("low")) {
    return "ℹ️";
  } else if (lowercaseRisk.includes("minimal")) {
    return "✓";
  }

  return "❓";
}

/**
 * Get risk bar color based on risk level
 */
function getRiskBarColor(riskLevel: string): string {
  const lowercaseRisk = riskLevel.toLowerCase();

  if (lowercaseRisk.includes("critical")) {
    return "bg-red-500";
  } else if (lowercaseRisk.includes("high")) {
    return "bg-red-500";
  } else if (
    lowercaseRisk.includes("medium") ||
    lowercaseRisk.includes("moderate")
  ) {
    return "bg-yellow-500";
  } else if (lowercaseRisk.includes("low")) {
    return "bg-green-500";
  } else if (lowercaseRisk.includes("minimal")) {
    return "bg-green-500";
  }

  return "bg-gray-500";
}

/**
 * Risk assessment component showing risk level and score
 */
const RiskAssessment: React.FC<RiskAssessmentProps> = ({
  securityLevel,
  riskScore,
  testId = "risk-assessment",
  compact = false,
  riskDescription,
  customRiskLevel,
}) => {
  const riskLevel =
    customRiskLevel || getRiskLevelFromSecurityLevel(securityLevel);

  // Calculate risk score if not provided
  const score =
    riskScore !== undefined
      ? riskScore
      : calculateRiskScoreFromLevel(securityLevel);

  // Get risk description if not provided
  const description = riskDescription || getRiskDescription(riskLevel);

  if (compact) {
    return (
      <div className="flex items-center space-x-2" data-testid={testId}>
        <span className="text-sm text-gray-600 dark:text-gray-400">Risk:</span>
        <RiskLevelBadge risk={riskLevel} testId={`${testId}-level`} />
      </div>
    );
  }

  return (
    <div className="mt-4" data-testid={testId}>
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center">
          <span className="mr-2">{getRiskIcon(riskLevel)}</span>
          <h4 className="text-md font-medium">Risk Assessment</h4>
        </div>
        <RiskLevelBadge risk={riskLevel} testId={`${testId}-level`} />
      </div>
      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5 mb-2">
        <div
          className={`h-2.5 rounded-full ${getRiskBarColor(riskLevel)}`}
          style={{ width: `${score}%` }}
          data-testid={`${testId}-score`}
        ></div>
      </div>
      <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
        {description}
      </p>
    </div>
  );
};

/**
 * Helper function to get risk description based on risk level
 */
function getRiskDescription(riskLevel: string): string {
  const normalized = riskLevel.toLowerCase();

  if (normalized.includes("critical")) {
    return "Critical risk requires immediate action to prevent significant harm.";
  } else if (normalized.includes("high")) {
    return "High risk should be addressed with priority to reduce potential impact.";
  } else if (normalized.includes("medium") || normalized.includes("moderate")) {
    return "Moderate risk that should be managed with appropriate controls.";
  } else if (normalized.includes("low")) {
    return "Low risk with limited potential for harm. Standard controls are adequate.";
  } else if (normalized.includes("minimal")) {
    return "Minimal risk with negligible potential for harm. Baseline controls are sufficient.";
  }

  return "Risk level assessment helps prioritize security investments.";
}

export default RiskAssessment;
