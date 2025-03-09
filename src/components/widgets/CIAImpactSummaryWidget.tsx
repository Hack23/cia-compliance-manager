import React from "react";
import { WIDGET_TEST_IDS } from "../../constants/testIds";
import ValueDisplay from "../common/ValueDisplay";
import {
  normalizeSecurityLevel,
  getSecurityLevelClass,
  formatSecurityLevel,
} from "../../utils/widgetHelpers";

interface CIAImpactSummaryWidgetProps {
  availabilityLevel: string;
  integrityLevel: string;
  confidentialityLevel: string;
  testId?: string; // Add testId prop
  className?: string; // Add className prop
}

/**
 * Widget to display the CIA impact levels in a compact summary format
 * with improved accessibility and type safety
 */
const CIAImpactSummaryWidget: React.FC<CIAImpactSummaryWidgetProps> = ({
  availabilityLevel,
  integrityLevel,
  confidentialityLevel,
  testId = WIDGET_TEST_IDS.CIA_IMPACT_SUMMARY,
  className = "",
}) => {
  // Normalize all security levels to ensure consistent display
  const normalizedAvailability = normalizeSecurityLevel(availabilityLevel);
  const normalizedIntegrity = normalizeSecurityLevel(integrityLevel);
  const normalizedConfidentiality =
    normalizeSecurityLevel(confidentialityLevel);

  // Helper function to determine color variant based on security level
  const getVariant = (
    level: string
  ): "default" | "warning" | "info" | "primary" | "success" => {
    switch (level) {
      case "None":
        return "default";
      case "Low":
        return "warning";
      case "Moderate":
        return "info";
      case "High":
        return "primary";
      case "Very High":
        return "success";
      default:
        return "default";
    }
  };

  return (
    <div
      className={`cia-impact-summary p-4 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 shadow-sm ${className}`}
      data-testid={testId}
      aria-labelledby={`${testId}-title`}
    >
      <h3
        id={`${testId}-title`}
        className="text-lg font-medium mb-4 flex items-center text-gray-800 dark:text-white"
      >
        <span className="mr-2" aria-hidden="true">
          🛡️
        </span>
        CIA Security Profile
      </h3>

      <div className="space-y-4" role="list" aria-label="Security levels">
        {/* Availability Section */}
        <div
          className="flex justify-between items-center p-2 bg-gray-50 dark:bg-gray-700 rounded"
          data-testid={`${testId}-availability-row`}
          role="listitem"
        >
          <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
            Availability:
          </span>
          <span
            data-testid={`${testId}-availability-level`}
            className={`text-sm ${getSecurityLevelClass(
              normalizedAvailability
            )} font-semibold`}
            aria-label={`Availability level: ${normalizedAvailability}`}
          >
            <ValueDisplay
              value={`${normalizedAvailability} Availability`}
              variant={getVariant(normalizedAvailability)}
              testId={`${testId}-availability-level-value`}
            />
          </span>
        </div>

        {/* Integrity Section */}
        <div
          className="flex justify-between items-center p-2 bg-gray-50 dark:bg-gray-700 rounded"
          data-testid={`${testId}-integrity-row`}
          role="listitem"
        >
          <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
            Integrity:
          </span>
          <span
            data-testid={`${testId}-integrity-level`}
            className={`text-sm ${getSecurityLevelClass(
              normalizedIntegrity
            )} font-semibold`}
            aria-label={`Integrity level: ${normalizedIntegrity}`}
          >
            <ValueDisplay
              value={`${normalizedIntegrity} Integrity`}
              variant={getVariant(normalizedIntegrity)}
              testId={`${testId}-integrity-level-value`}
            />
          </span>
        </div>

        {/* Confidentiality Section */}
        <div
          className="flex justify-between items-center p-2 bg-gray-50 dark:bg-gray-700 rounded"
          data-testid={`${testId}-confidentiality-row`}
          role="listitem"
        >
          <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
            Confidentiality:
          </span>
          <span
            data-testid={`${testId}-confidentiality-level`}
            className={`text-sm ${getSecurityLevelClass(
              normalizedConfidentiality
            )} font-semibold`}
            aria-label={`Confidentiality level: ${normalizedConfidentiality}`}
          >
            <ValueDisplay
              value={`${normalizedConfidentiality} Confidentiality`}
              variant={getVariant(normalizedConfidentiality)}
              testId={`${testId}-confidentiality-level-value`}
            />
          </span>
        </div>
      </div>

      {/* Business Impact Summary - add valuable business context */}
      <div className="mt-4 pt-3 border-t border-gray-200 dark:border-gray-700">
        <h4 className="text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
          Business Impact Summary
        </h4>
        <p className="text-xs text-gray-600 dark:text-gray-400">
          {getBusinessImpactSummary(
            normalizedAvailability,
            normalizedIntegrity,
            normalizedConfidentiality
          )}
        </p>
      </div>
    </div>
  );
};

/**
 * Generates a concise business impact summary based on current CIA levels
 */
function getBusinessImpactSummary(
  availability: string,
  integrity: string,
  confidentiality: string
): string {
  // Convert levels to numerical values for calculation
  const levels = ["None", "Low", "Moderate", "High", "Very High"];
  const availScore = Math.max(0, levels.indexOf(availability));
  const integScore = Math.max(0, levels.indexOf(integrity));
  const confidScore = Math.max(0, levels.indexOf(confidentiality));

  const totalScore = availScore + integScore + confidScore;

  if (totalScore === 0) {
    return "Current security profile provides minimal protection for business assets. Consider increasing security levels to mitigate business risks.";
  } else if (totalScore <= 3) {
    return "Basic security profile with limited business risk mitigation. Consider strengthening at least one CIA dimension to protect key business functions.";
  } else if (totalScore <= 6) {
    return "Moderate security profile providing reasonable protection for standard business operations. For enhanced business continuity, consider further strengthening.";
  } else if (totalScore <= 9) {
    return "Strong security profile that supports reliable business operations and protects critical business information assets from most common threats.";
  } else {
    return "Comprehensive security profile providing robust protection for essential business processes and information assets, supporting business continuity under most circumstances.";
  }
}

export default CIAImpactSummaryWidget;
