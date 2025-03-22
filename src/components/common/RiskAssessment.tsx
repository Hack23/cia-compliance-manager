import React, { useMemo } from "react";
import { SecurityLevel } from "../../types/cia";
import { getRiskLevelFromSecurityLevel, getRiskScoreFromSecurityLevel } from "../../utils";
import RiskLevelBadge from "./RiskLevelBadge";

interface RiskAssessmentProps {
  securityLevel: SecurityLevel;
  testId?: string;
  compact?: boolean;
}

/**
 * Displays a risk assessment based on security level
 * 
 * ## Business Perspective
 * 
 * This component provides a visual representation of risk levels derived from
 * security levels, helping business stakeholders understand the relationship
 * between security investments and risk reduction. ⚠️
 */
const RiskAssessment: React.FC<RiskAssessmentProps> = ({
  securityLevel,
  testId = "risk-assessment",
  compact = false
}) => {
  // Calculate risk level from security level
  const riskLevel = useMemo(() => 
    getRiskLevelFromSecurityLevel(securityLevel), 
    [securityLevel]
  );
  
  // Calculate risk score from security level
  const riskScore = useMemo(() => 
    getRiskScoreFromSecurityLevel(securityLevel), 
    [securityLevel]
  );

  if (compact) {
    return (
      <div className="flex items-center space-x-2" data-testid={testId}>
        <span className="text-sm text-gray-600 dark:text-gray-400">Risk:</span>
        <RiskLevelBadge riskLevel={riskLevel} testId={`${testId}-level`} />
      </div>
    );
  }

  return (
    <div className="mt-4" data-testid={testId}>
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center">
          <span className="mr-2">⚠️</span>
          <h4 className="text-md font-medium">Risk Assessment</h4>
        </div>
        <RiskLevelBadge
          riskLevel={riskLevel}
          testId={`${testId}-level`}
        />
      </div>
      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5 mb-2">
        <div
          className={`h-2.5 rounded-full ${
            riskScore > 70 ? "bg-red-500" : 
            riskScore > 40 ? "bg-yellow-500" : 
            "bg-green-500"
          }`}
          style={{ width: `${riskScore}%` }}
          data-testid={`${testId}-score`}
        ></div>
      </div>
      <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
        {getRiskDescription(riskLevel)}
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
