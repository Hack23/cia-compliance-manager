import React, { useMemo } from "react";
import { SecurityLevel } from "../../types/cia";

interface RiskAssessmentProps {
  securityLevel: SecurityLevel;
  className?: string;
  testId?: string;
}

/**
 * Displays a visual risk assessment based on the security level
 * 
 * ## Business Perspective
 * 
 * This component translates technical security levels into business risk indicators,
 * making it easy for executives to quickly understand their risk exposure without
 * needing to interpret technical security metrics. The color-coding reinforces
 * awareness of critical security gaps that require investment. 🔒
 * 
 * @param props Component props
 * @returns React Element
 */
function RiskAssessment({
  securityLevel,
  className = "",
  testId,
}: RiskAssessmentProps): React.ReactElement {
  // Calculate risk level based on security level
  const riskLevel = useMemo(() => {
    switch (securityLevel) {
      case "None":
        return "Critical";
      case "Low":
        return "High";
      case "Moderate":
        return "Medium";
      case "High":
        return "Low";
      case "Very High":
        return "Minimal";
      default:
        return "Unknown";
    }
  }, [securityLevel]);

  // Determine colors and styles based on risk level
  const { backgroundColor, textColor, progressValue, label } = useMemo(() => {
    switch (riskLevel) {
      case "Critical":
        return {
          backgroundColor: "bg-red-500",
          textColor: "text-red-600 dark:text-red-400",
          progressValue: 10,
          label: "Critical Risk",
        };
      case "High":
        return {
          backgroundColor: "bg-orange-500",
          textColor: "text-orange-600 dark:text-orange-400",
          progressValue: 30,
          label: "High Risk",
        };
      case "Medium":
        return {
          backgroundColor: "bg-yellow-400",
          textColor: "text-yellow-600 dark:text-yellow-400",
          progressValue: 50,
          label: "Medium Risk",
        };
      case "Low":
        return {
          backgroundColor: "bg-green-500",
          textColor: "text-green-600 dark:text-green-400",
          progressValue: 75,
          label: "Low Risk",
        };
      case "Minimal":
        return {
          backgroundColor: "bg-blue-500",
          textColor: "text-blue-600 dark:text-blue-400",
          progressValue: 95,
          label: "Minimal Risk",
        };
      default:
        return {
          backgroundColor: "bg-gray-500",
          textColor: "text-gray-600 dark:text-gray-400",
          progressValue: 0,
          label: "Unknown Risk",
        };
    }
  }, [riskLevel]);

  return (
    <div className={`mt-4 ${className}`} data-testid={testId}>
      <div className="flex justify-between mb-1">
        <span className="text-xs font-medium">Risk Assessment</span>
        <span className={`text-xs font-medium ${textColor}`}>{label}</span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
        <div
          className={`h-2.5 rounded-full ${backgroundColor}`}
          style={{ width: `${progressValue}%` }}
        ></div>
      </div>
      <div className="flex justify-between mt-1 text-xs text-gray-500 dark:text-gray-400">
        <span>Higher Risk</span>
        <span>Lower Risk</span>
      </div>
    </div>
  );
}

export { RiskAssessment };
export default RiskAssessment;
