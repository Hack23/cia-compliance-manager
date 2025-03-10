import React, { useMemo, useState } from "react";
import { SecurityLevel } from "../../types/cia";
import { INTEGRITY_IMPACT_TEST_IDS } from "../../constants/testIds";
import ciaContentService from "../../services/ciaContentService";
import WidgetContainer from "../common/WidgetContainer";
import StatusBadge from "../common/StatusBadge";
import KeyValuePair from "../common/KeyValuePair";
import { WIDGET_TITLES, WIDGET_ICONS } from "../../constants/coreConstants";
import { CIA_COMPONENT_COLORS } from "../../constants/colorConstants";

/**
 * Add type for validation method that might not exist in TechnicalImplementationDetails
 */
interface ExtendedTechnicalDetails {
  description: string;
  implementationSteps: string[];
  effort: {
    development: string;
    maintenance: string;
    expertise: string;
  };
  validationMethod?: string;
}

/**
 * Props for IntegrityImpactWidget component
 *
 * @interface IntegrityImpactWidgetProps
 * @property {SecurityLevel} integrityLevel - The selected integrity security level
 * @property {SecurityLevel} [availabilityLevel] - Optional availability security level for context
 * @property {SecurityLevel} [confidentialityLevel] - Optional confidentiality security level for context
 * @property {string} [className] - Optional CSS class name
 * @property {string} [testId] - Optional test ID for testing purposes
 */
export interface IntegrityImpactWidgetProps {
  integrityLevel: SecurityLevel;
  availabilityLevel?: SecurityLevel;
  confidentialityLevel?: SecurityLevel;
  className?: string;
  testId?: string;
}

/**
 * IntegrityImpactWidget displays impacts and recommendations related to data integrity
 * based on the selected security level. It uses ciaContentService to fetch all relevant data.
 *
 * @component
 * @example
 * ```tsx
 * <IntegrityImpactWidget
 *   integrityLevel="High"
 *   availabilityLevel="Moderate"
 *   confidentialityLevel="High"
 * />
 * ```
 */
const IntegrityImpactWidget: React.FC<IntegrityImpactWidgetProps> = ({
  integrityLevel,
  availabilityLevel,
  confidentialityLevel,
  className = "",
  testId = INTEGRITY_IMPACT_TEST_IDS.INTEGRITY_IMPACT_PREFIX,
}) => {
  const [showAllRecommendations, setShowAllRecommendations] = useState(false);

  // Fetch component details from ciaContentService
  const integrityDetails = useMemo(
    () => ciaContentService.getComponentDetails("integrity", integrityLevel),
    [integrityLevel]
  );

  // Fetch business impact from ciaContentService
  const businessImpact = useMemo(
    () => ciaContentService.getBusinessImpact("integrity", integrityLevel),
    [integrityLevel]
  );

  // Get technical implementation details
  const technicalDetails = useMemo(
    () =>
      ciaContentService.getTechnicalImplementation(
        "integrity",
        integrityLevel
      ) as ExtendedTechnicalDetails,
    [integrityLevel]
  );

  // Get recommendations from service
  const recommendations = useMemo(
    () => ciaContentService.getRecommendations("integrity", integrityLevel),
    [integrityLevel]
  );

  // Handle cases where data might not be available
  if (!integrityDetails) {
    return (
      <WidgetContainer
        title={WIDGET_TITLES.INTEGRITY_IMPACT}
        icon={WIDGET_ICONS.INTEGRITY_IMPACT}
        className={className}
        testId={testId}
        error={new Error("Integrity details not available")}
      >
        <div>Integrity details not available</div>
      </WidgetContainer>
    );
  }

  return (
    <WidgetContainer
      title={WIDGET_TITLES.INTEGRITY_IMPACT}
      icon={WIDGET_ICONS.INTEGRITY_IMPACT}
      className={className}
      testId={testId}
    >
      <div className="space-y-6">
        {/* Integrity Level and Description */}
        <div className="mb-4">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-lg font-medium mr-2">
              {integrityLevel} Integrity
            </h3>
            <StatusBadge
              status="success"
              testId={`${testId}-level-badge`}
              className="bg-green-500 text-white"
            >
              {integrityLevel}
            </StatusBadge>
          </div>
          <p
            className="text-gray-600 dark:text-gray-300"
            data-testid={INTEGRITY_IMPACT_TEST_IDS.INTEGRITY_IMPACT_DESCRIPTION}
          >
            {integrityDetails.description || "No description available"}
          </p>
        </div>

        {/* Technical Implementation */}
        {technicalDetails && technicalDetails.description && (
          <div
            className="mb-4 bg-gray-50 dark:bg-gray-800 p-4 rounded-lg border-l-4"
            style={{ borderLeftColor: CIA_COMPONENT_COLORS.INTEGRITY.PRIMARY }}
          >
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
                "validationMethod" in technicalDetails &&
                technicalDetails.validationMethod
              ) {
                return (
                  <div className="mt-2">
                    <KeyValuePair
                      label="Validation Method"
                      value={technicalDetails.validationMethod as string}
                      valueClassName="text-green-600 dark:text-green-400"
                      testId={`${testId}-validation-method`}
                    />
                  </div>
                );
              }
              return null;
            })()}
          </div>
        )}

        {/* Business Impact */}
        <div className="mb-4">
          <h4 className="text-md font-medium mb-2">Business Impact</h4>
          <p
            className="text-gray-600 dark:text-gray-300"
            data-testid={`${testId}-business-impact`}
          >
            {businessImpact.summary ||
              integrityDetails.businessImpact ||
              "No business impact data available"}
          </p>

          {businessImpact.operational && (
            <div
              className="mt-2 p-3 rounded-md"
              style={{
                backgroundColor: `${CIA_COMPONENT_COLORS.INTEGRITY.SECONDARY}25`,
              }}
            >
              <div className="flex items-center mb-1">
                <span className="mr-1">⚙️</span>
                <span className="font-medium">Operational Impact</span>
              </div>
              <p
                className="text-sm"
                style={{ color: CIA_COMPONENT_COLORS.INTEGRITY.DARK }}
              >
                {businessImpact.operational.description}
              </p>
            </div>
          )}

          {businessImpact.financial && (
            <div
              className="mt-2 p-3 rounded-md"
              style={{
                backgroundColor: `${CIA_COMPONENT_COLORS.INTEGRITY.SECONDARY}25`,
              }}
            >
              <div className="flex items-center mb-1">
                <span className="mr-1">💰</span>
                <span className="font-medium">Financial Impact</span>
              </div>
              <p
                className="text-sm"
                style={{ color: CIA_COMPONENT_COLORS.INTEGRITY.DARK }}
              >
                {businessImpact.financial.description}
              </p>
            </div>
          )}
        </div>

        {/* Recommendations */}
        {recommendations && recommendations.length > 0 && (
          <div className="mb-4">
            <div className="flex items-center justify-between mb-2">
              <h4 className="text-md font-medium">Recommendations</h4>
              {recommendations.length > 3 && (
                <button
                  className="text-sm hover:underline focus:outline-none"
                  style={{ color: CIA_COMPONENT_COLORS.INTEGRITY.PRIMARY }}
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

        {/* Integrity Implementation Details */}
        <div
          className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg border-l-4"
          style={{ borderLeftColor: CIA_COMPONENT_COLORS.INTEGRITY.PRIMARY }}
        >
          <h4 className="text-md font-medium mb-2">
            Data Integrity Classification
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            <KeyValuePair
              label="Protection Level"
              value={integrityLevel}
              testId={`${testId}-protection-level`}
            />
            {technicalDetails && technicalDetails.validationMethod && (
              <KeyValuePair
                label="Validation Technique"
                value={technicalDetails.validationMethod as string}
                testId={`${testId}-validation-technique`}
              />
            )}
          </div>
        </div>
      </div>
    </WidgetContainer>
  );
};

export default IntegrityImpactWidget;
