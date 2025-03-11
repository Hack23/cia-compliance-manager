import React, { useState, useMemo } from "react";
import { SecurityLevel } from "../../types/cia";
import { INTEGRITY_IMPACT_TEST_IDS } from "../../constants/testIds";
import ciaContentService from "../../services/ciaContentService";
import KeyValuePair from "../common/KeyValuePair";
import WidgetContainer from "../common/WidgetContainer";
import { CIA_COMPONENT_COLORS } from "../../constants/colorConstants";
import { normalizeSecurityLevel } from "../../utils/securityLevelUtils";
import CIAImpactCard from "../common/CIAImpactCard";
import StatusBadge from "../common/StatusBadge";

/**
 * Props for IntegrityImpactWidget component
 */
export interface IntegrityImpactWidgetProps {
  integrityLevel: SecurityLevel;
  availabilityLevel?: SecurityLevel;
  confidentialityLevel?: SecurityLevel;
  className?: string;
  testId?: string;
  options?: Record<string, any>; // Added the missing options property
}

/**
 * IntegrityImpactWidget displays impacts and recommendations related to data integrity
 * based on the selected security level. Uses common components for consistent UI/UX.
 */
const IntegrityImpactWidget: React.FC<IntegrityImpactWidgetProps> = ({
  integrityLevel,
  availabilityLevel,
  confidentialityLevel,
  className = "",
  testId = INTEGRITY_IMPACT_TEST_IDS.INTEGRITY_IMPACT_PREFIX,
  options = {}, // Add default value for options
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
      ciaContentService.getTechnicalImplementation("integrity", integrityLevel),
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
        title="Integrity Impact"
        icon="✓"
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
      title="Integrity Impact"
      icon="✓"
      className={className}
      testId={testId}
    >
      <div className="space-y-6">
        <CIAImpactCard
          title="Integrity Profile"
          level={integrityLevel}
          description={
            integrityDetails.description || "No description available"
          }
          icon="✓"
          badgeVariant="success"
          cardClass="integrity-card"
          testId={`${testId}-impact-card`}
        >
          {technicalDetails.validationMethod && (
            <div className="flex items-center mt-2 text-sm text-green-600 dark:text-green-400">
              <span className="mr-2">✓</span>
              <span className="font-medium">Validation Method: </span>
              <span className="ml-1">{technicalDetails.validationMethod}</span>
            </div>
          )}
        </CIAImpactCard>

        {/* Business Impact Section with enhanced styling */}
        <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg border shadow-sm security-card">
          <h4 className="text-md font-medium mb-3 flex items-center">
            <span className="mr-2">💼</span>
            Business Impact
          </h4>

          <p
            className="text-gray-600 dark:text-gray-300 mb-4"
            data-testid={`${testId}-business-impact`}
          >
            {businessImpact.summary ||
              integrityDetails.businessImpact ||
              "No business impact data available"}
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {businessImpact.operational && (
              <div className="p-3 rounded-md bg-opacity-10 bg-green-100 dark:bg-green-900 dark:bg-opacity-20 border border-green-200 dark:border-green-800">
                <div className="flex items-center mb-2">
                  <span className="mr-2">⚙️</span>
                  <span className="font-medium text-green-700 dark:text-green-300">
                    Operational Impact
                  </span>
                </div>
                <p className="text-sm text-gray-700 dark:text-gray-300">
                  {businessImpact.operational.description ||
                    "No operational impact information available"}
                </p>
              </div>
            )}

            {businessImpact.financial && (
              <div className="p-3 rounded-md bg-opacity-10 bg-green-100 dark:bg-green-900 dark:bg-opacity-20 border border-green-200 dark:border-green-800">
                <div className="flex items-center mb-2">
                  <span className="mr-2">💰</span>
                  <span className="font-medium text-green-700 dark:text-green-300">
                    Financial Impact
                  </span>
                </div>
                <p className="text-sm text-gray-700 dark:text-gray-300">
                  {businessImpact.financial.description ||
                    "No financial impact information available"}
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Technical Implementation with enhanced styling */}
        {technicalDetails && technicalDetails.description && (
          <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg border-l-4 integrity-card security-card">
            <h4 className="text-md font-medium mb-2 flex items-center">
              <span className="mr-2">⚙️</span>
              Technical Implementation
            </h4>

            <p className="text-gray-600 dark:text-gray-300 mb-3">
              {technicalDetails.description}
            </p>

            {technicalDetails.implementationSteps &&
              technicalDetails.implementationSteps.length > 0 && (
                <div className="mt-3">
                  <h5 className="text-sm font-medium mb-2 text-green-700 dark:text-green-300">
                    Implementation Steps
                  </h5>
                  <ul className="list-disc list-inside space-y-1 text-sm text-gray-600 dark:text-gray-300">
                    {technicalDetails.implementationSteps
                      .slice(0, 3)
                      .map((step, idx) => (
                        <li key={idx}>{step}</li>
                      ))}
                  </ul>
                </div>
              )}
          </div>
        )}

        {/* Recommendations with enhanced styling */}
        {recommendations && recommendations.length > 0 && (
          <div className="bg-green-50 dark:bg-gray-800 p-4 rounded-lg border border-green-200 dark:border-green-900 shadow-sm security-card">
            <div className="flex items-center justify-between mb-3">
              <h4 className="text-md font-medium flex items-center">
                <span className="mr-2">💡</span>
                Recommendations
              </h4>
              {recommendations.length > 3 && (
                <button
                  className="text-sm px-3 py-1 rounded-full bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300 hover:bg-green-200 dark:hover:bg-green-800 transition-colors"
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
                  className="text-sm"
                >
                  {recommendation}
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Integrity Implementation Details */}
        <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg border-l-4 integrity-card security-card">
          <h4 className="text-md font-medium mb-3 flex items-center">
            <span className="mr-2">🏷️</span>
            Data Integrity Classification
          </h4>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-3 rounded-md bg-opacity-10 bg-green-100 dark:bg-green-900 dark:bg-opacity-20">
              <KeyValuePair
                label="Protection Level"
                value={integrityLevel}
                testId={`${testId}-protection-level`}
                valueClassName="text-green-700 dark:text-green-300 font-medium"
              />
            </div>

            {technicalDetails && technicalDetails.validationMethod && (
              <div className="p-3 rounded-md bg-opacity-10 bg-green-100 dark:bg-green-900 dark:bg-opacity-20">
                <KeyValuePair
                  label="Validation Technique"
                  value={technicalDetails.validationMethod}
                  testId={`${testId}-validation-technique`}
                  valueClassName="text-green-700 dark:text-green-300 font-medium"
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </WidgetContainer>
  );
};

export default IntegrityImpactWidget;
