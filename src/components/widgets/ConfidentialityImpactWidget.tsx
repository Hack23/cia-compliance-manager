import React, { useMemo, useState } from "react";
import { SecurityLevel } from "../../types/cia";
import { CONFIDENTIALITY_IMPACT_TEST_IDS } from "../../constants/testIds";
import ciaContentService from "../../services/ciaContentService";
import WidgetContainer from "../common/WidgetContainer";
import StatusBadge from "../common/StatusBadge";
import KeyValuePair from "../common/KeyValuePair";
import { WIDGET_TITLES, WIDGET_ICONS } from "../../constants/coreConstants";

/**
 * Props for ConfidentialityImpactWidget component
 *
 * @interface ConfidentialityImpactWidgetProps
 * @property {SecurityLevel} confidentialityLevel - The selected confidentiality security level
 * @property {SecurityLevel} [availabilityLevel] - Optional availability security level for context
 * @property {SecurityLevel} [integrityLevel] - Optional integrity security level for context
 * @property {string} [className] - Optional CSS class name
 * @property {string} [testId] - Optional test ID for testing purposes
 */
export interface ConfidentialityImpactWidgetProps {
  confidentialityLevel: SecurityLevel;
  availabilityLevel?: SecurityLevel;
  integrityLevel?: SecurityLevel;
  className?: string;
  testId?: string;
}

/**
 * ConfidentialityImpactWidget displays impacts and recommendations related to data confidentiality
 * based on the selected security level. It uses ciaContentService to fetch all relevant data.
 *
 * @component
 * @example
 * ```tsx
 * <ConfidentialityImpactWidget
 *   confidentialityLevel="High"
 *   availabilityLevel="Moderate"
 *   integrityLevel="High"
 * />
 * ```
 */
const ConfidentialityImpactWidget: React.FC<
  ConfidentialityImpactWidgetProps
> = ({
  confidentialityLevel,
  availabilityLevel,
  integrityLevel,
  className = "",
  testId = CONFIDENTIALITY_IMPACT_TEST_IDS.CONFIDENTIALITY_IMPACT_PREFIX,
}) => {
  const [showAllRecommendations, setShowAllRecommendations] = useState(false);

  // Fetch component details from ciaContentService
  const confidentialityDetails = useMemo(
    () =>
      ciaContentService.getComponentDetails(
        "confidentiality",
        confidentialityLevel
      ),
    [confidentialityLevel]
  );

  // Fetch business impact from ciaContentService
  const businessImpact = useMemo(
    () =>
      ciaContentService.getBusinessImpact(
        "confidentiality",
        confidentialityLevel
      ),
    [confidentialityLevel]
  );

  // Get technical implementation details
  const technicalDetails = useMemo(
    () =>
      ciaContentService.getTechnicalImplementation(
        "confidentiality",
        confidentialityLevel
      ),
    [confidentialityLevel]
  );

  // Get recommendations from service
  const recommendations = useMemo(
    () =>
      ciaContentService.getRecommendations(
        "confidentiality",
        confidentialityLevel
      ),
    [confidentialityLevel]
  );

  // Handle cases where data might not be available
  if (!confidentialityDetails) {
    return (
      <WidgetContainer
        title={WIDGET_TITLES.CONFIDENTIALITY_IMPACT}
        icon={WIDGET_ICONS.CONFIDENTIALITY_IMPACT}
        className={className}
        testId={testId}
        error={new Error("Confidentiality details not available")}
      >
        <div>Confidentiality details not available</div>
      </WidgetContainer>
    );
  }

  return (
    <WidgetContainer
      title={WIDGET_TITLES.CONFIDENTIALITY_IMPACT}
      icon={WIDGET_ICONS.CONFIDENTIALITY_IMPACT}
      className={className}
      testId={testId}
    >
      <div className="space-y-6">
        <div className="mb-4">
          <div className="flex items-center mb-2">
            <h3 className="text-lg font-medium mr-2">
              {confidentialityLevel} Confidentiality
            </h3>
            <StatusBadge status="purple" testId={`${testId}-level-badge`}>
              {confidentialityLevel}
            </StatusBadge>
          </div>
          <p
            className="text-gray-600 dark:text-gray-300"
            data-testid={
              CONFIDENTIALITY_IMPACT_TEST_IDS.CONFIDENTIALITY_IMPACT_DESCRIPTION
            }
          >
            {confidentialityDetails.description || "No description available"}
          </p>
        </div>

        {technicalDetails && technicalDetails.description && (
          <div className="mb-4 bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
            <h4 className="text-md font-medium mb-2">
              Technical Implementation
            </h4>
            <p className="text-gray-600 dark:text-gray-300">
              {technicalDetails.description}
            </p>
            {(() => {
              // Use an IIFE to avoid TypeScript ReactNode issues
              if (
                technicalDetails &&
                typeof technicalDetails === "object" &&
                "protectionMethod" in technicalDetails &&
                technicalDetails.protectionMethod
              ) {
                return (
                  <div className="mt-2">
                    <KeyValuePair
                      label="Protection Method"
                      value={technicalDetails.protectionMethod as string}
                      valueClassName="text-purple-600 dark:text-purple-400"
                      testId={`${testId}-protection-method`}
                    />
                  </div>
                );
              }
              return null;
            })()}
          </div>
        )}

        <div className="mb-4">
          <h4 className="text-md font-medium mb-2">Business Impact</h4>
          <p
            className="text-gray-600 dark:text-gray-300"
            data-testid={`${testId}-business-impact`}
          >
            {businessImpact.summary ||
              confidentialityDetails.businessImpact ||
              "No business impact data available"}
          </p>

          {businessImpact.reputational && (
            <div className="mt-2 p-3 bg-purple-50 dark:bg-purple-900 dark:bg-opacity-20 rounded-md">
              <div className="flex items-center mb-1">
                <span className="mr-1">🏆</span>
                <span className="font-medium">Reputational Impact</span>
                <StatusBadge
                  status={
                    businessImpact.reputational.riskLevel?.includes("High")
                      ? "warning"
                      : "info"
                  }
                  size="xs"
                  className="ml-2"
                >
                  {businessImpact.reputational.riskLevel || "Unknown Risk"}
                </StatusBadge>
              </div>
              <p className="text-sm text-purple-800 dark:text-purple-300">
                {businessImpact.reputational.description}
              </p>
            </div>
          )}

          {businessImpact.regulatory && (
            <div className="mt-2 p-3 bg-indigo-50 dark:bg-indigo-900 dark:bg-opacity-20 rounded-md">
              <div className="flex items-center mb-1">
                <span className="mr-1">⚖️</span>
                <span className="font-medium">Regulatory Impact</span>
                <StatusBadge
                  status={
                    businessImpact.regulatory.riskLevel?.includes("High")
                      ? "warning"
                      : "info"
                  }
                  size="xs"
                  className="ml-2"
                >
                  {businessImpact.regulatory.riskLevel || "Unknown Risk"}
                </StatusBadge>
              </div>
              <p className="text-sm text-indigo-800 dark:text-indigo-300">
                {businessImpact.regulatory.description}
              </p>
            </div>
          )}
        </div>

        {recommendations && recommendations.length > 0 && (
          <div className="mb-4">
            <div className="flex items-center justify-between mb-2">
              <h4 className="text-md font-medium">Recommendations</h4>
              {recommendations.length > 3 && (
                <button
                  className="text-sm text-blue-600 dark:text-blue-400 hover:underline focus:outline-none"
                  onClick={() =>
                    setShowAllRecommendations(!showAllRecommendations)
                  }
                >
                  {showAllRecommendations ? "Show Less" : "Show All"}
                </button>
              )}
            </div>
            <ul className="list-disc pl-5 space-y-2 text-gray-600 dark:text-gray-300">
              {(showAllRecommendations
                ? recommendations
                : recommendations.slice(0, 3)
              ).map((recommendation, index) => (
                <li
                  key={index}
                  data-testid={`${testId}-recommendation-${index}`}
                >
                  {recommendation}
                </li>
              ))}
            </ul>
          </div>
        )}

        <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
          <h4 className="text-md font-medium mb-2">
            Data Protection Classification
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            <KeyValuePair
              label="Classification Level"
              value={confidentialityLevel}
              testId={`${testId}-classification-level`}
            />
            <KeyValuePair
              label="Information Sensitivity"
              value={getInformationSensitivity(confidentialityLevel)}
              testId={`${testId}-information-sensitivity`}
            />
          </div>
        </div>
      </div>
    </WidgetContainer>
  );
};

/**
 * Helper function to map confidentiality level to information sensitivity
 * @param level - SecurityLevel to map
 * @returns Information sensitivity description
 */
function getInformationSensitivity(level: SecurityLevel): string {
  switch (level) {
    case "None":
      return "Public Data";
    case "Low":
      return "Internal Data";
    case "Moderate":
      return "Sensitive Data";
    case "High":
      return "Confidential Data";
    case "Very High":
      return "Restricted Data";
    default:
      return "Unknown";
  }
}

export default ConfidentialityImpactWidget;
