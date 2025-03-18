import React from "react";
import { CIA_COMPONENT_COLORS } from "../../constants/colorConstants";
import { SecurityLevel } from "../../types/cia";
import { toTitleCase } from "../../utils/formatUtils";
import SecurityLevelBadge from "../common/SecurityLevelBadge";
import WidgetContainer from "../common/WidgetContainer";

interface CIAImpactSummaryWidgetProps {
  availabilityLevel: SecurityLevel;
  integrityLevel: SecurityLevel;
  confidentialityLevel: SecurityLevel;
  className?: string;
  testId?: string;
}

/**
 * Displays a summary of the CIA components' impact based on security levels
 *
 * ## Business Perspective
 *
 * This widget provides a concise overview of the organization's security posture
 * across the CIA triad, enabling quick assessment of alignment and potential
 * imbalances in the security strategy. The compact visuals help executives and
 * security officers identify focus areas at a glance. 💼
 *
 * @param props - Component properties
 * @returns The rendered component
 */
const CIAImpactSummaryWidget: React.FC<CIAImpactSummaryWidgetProps> = ({
  availabilityLevel,
  integrityLevel,
  confidentialityLevel,
  className = "",
  testId = "cia-impact-summary",
}) => {
  return (
    <WidgetContainer
      title="CIA Impact Summary"
      icon="🔍"
      className={className}
      testId={testId}
    >
      <div className="space-y-4">
        <div className="grid grid-cols-3 gap-3 text-center">
          {/* Use SecurityLevelBadge components for consistent display */}
          <SecurityLevelBadge
            category="Availability"
            level={availabilityLevel}
            colorClass="bg-blue-50 dark:bg-blue-900 dark:bg-opacity-20"
            textClass="text-blue-600 dark:text-blue-400"
            testId={`${testId}-availability`}
          />

          <SecurityLevelBadge
            category="Integrity"
            level={integrityLevel}
            colorClass="bg-green-50 dark:bg-green-900 dark:bg-opacity-20"
            textClass="text-green-600 dark:text-green-400"
            testId={`${testId}-integrity`}
          />

          <SecurityLevelBadge
            category="Confidentiality"
            level={confidentialityLevel}
            colorClass="bg-purple-50 dark:bg-purple-900 dark:bg-opacity-20"
            textClass="text-purple-600 dark:text-purple-400"
            testId={`${testId}-confidentiality`}
          />
        </div>

        <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-3">
          {/* Availability Impact */}
          <div
            className="p-3 rounded-lg bg-gray-50 dark:bg-gray-800 border-l-4"
            style={{
              borderLeftColor: CIA_COMPONENT_COLORS.AVAILABILITY.PRIMARY,
            }}
          >
            <h4
              className="font-medium text-sm mb-1"
              style={{ color: CIA_COMPONENT_COLORS.AVAILABILITY.PRIMARY }}
            >
              Availability Impact
            </h4>
            <p className="text-xs text-gray-600 dark:text-gray-300">
              {getImpactSummary("availability", availabilityLevel)}
            </p>
          </div>

          {/* Integrity Impact */}
          <div
            className="p-3 rounded-lg bg-gray-50 dark:bg-gray-800 border-l-4"
            style={{ borderLeftColor: CIA_COMPONENT_COLORS.INTEGRITY.PRIMARY }}
          >
            <h4
              className="font-medium text-sm mb-1"
              style={{ color: CIA_COMPONENT_COLORS.INTEGRITY.PRIMARY }}
            >
              Integrity Impact
            </h4>
            <p className="text-xs text-gray-600 dark:text-gray-300">
              {getImpactSummary("integrity", integrityLevel)}
            </p>
          </div>

          {/* Confidentiality Impact */}
          <div
            className="p-3 rounded-lg bg-gray-50 dark:bg-gray-800 border-l-4"
            style={{
              borderLeftColor: CIA_COMPONENT_COLORS.CONFIDENTIALITY.PRIMARY,
            }}
          >
            <h4
              className="font-medium text-sm mb-1"
              style={{ color: CIA_COMPONENT_COLORS.CONFIDENTIALITY.PRIMARY }}
            >
              Confidentiality Impact
            </h4>
            <p className="text-xs text-gray-600 dark:text-gray-300">
              {getImpactSummary("confidentiality", confidentialityLevel)}
            </p>
          </div>
        </div>
      </div>
    </WidgetContainer>
  );
};

// Helper function to generate impact summary based on component and level
function getImpactSummary(component: string, level: SecurityLevel): string {
  const componentName = toTitleCase(component);

  switch (level) {
    case "None":
      return `No ${componentName.toLowerCase()} controls. High business risk with significant potential for disruption, data corruption, or unauthorized access.`;
    case "Low":
      return `Basic ${componentName.toLowerCase()} controls. Moderate business risk with potential for service disruptions, data integrity issues, or information leakage.`;
    case "Moderate":
      return `Standard ${componentName.toLowerCase()} controls. Reduced business risk with reasonable protection against most common threats.`;
    case "High":
      return `Advanced ${componentName.toLowerCase()} controls. Low business risk with strong protection against most threats.`;
    case "Very High":
      return `Comprehensive ${componentName.toLowerCase()} controls. Minimal business risk with robust protection against sophisticated threats.`;
    default:
      return `${componentName} impact not determined.`;
  }
}

export default CIAImpactSummaryWidget;
