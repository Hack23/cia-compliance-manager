import React, { useMemo, useState } from "react";
import { CONFIDENTIALITY_IMPACT_TEST_IDS } from "../../constants/testIds";
import ciaContentService, {
  getInformationSensitivity,
  getProtectionLevel,
} from "../../services/ciaContentService";
import { SecurityLevel } from "../../types/cia";
import { normalizeSecurityLevel } from "../../utils/securityLevelUtils";
import CIAImpactCard from "../common/CIAImpactCard";
import KeyValuePair from "../common/KeyValuePair";
import WidgetContainer from "../common/WidgetContainer";

/**
 * Props for ConfidentialityImpactWidget component
 */
export interface ConfidentialityImpactWidgetProps {
  confidentialityLevel: SecurityLevel;
  availabilityLevel?: SecurityLevel;
  integrityLevel?: SecurityLevel;
  className?: string;
  testId?: string;
}

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

  // Get information sensitivity using service function
  const sensitivity = getInformationSensitivity(
    normalizeSecurityLevel(confidentialityLevel) as SecurityLevel
  );

  // Get protection level using service function
  const protectionLevel = getProtectionLevel(
    normalizeSecurityLevel(confidentialityLevel) as SecurityLevel
  );

  // Handle cases where data might not be available
  if (!confidentialityDetails) {
    return (
      <WidgetContainer
        title="Confidentiality Impact"
        icon="🔒"
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
      title="Confidentiality Impact"
      icon="🔒"
      className={className}
      testId={testId}
    >
      <div className="space-y-6">
        <CIAImpactCard
          title="Confidentiality Profile"
          level={confidentialityLevel}
          description={
            confidentialityDetails.description || "No description available"
          }
          icon="🔒"
          badgeVariant="purple"
          cardClass="confidentiality-card"
          testId={`${testId}-impact-card`}
        >
          {confidentialityDetails.protectionMethod && (
            <div className="flex items-center mt-2 text-sm text-purple-600 dark:text-purple-400">
              <span className="mr-2">🛡️</span>
              <span className="font-medium">Protection Method: </span>
              <span className="ml-1">
                {confidentialityDetails.protectionMethod}
              </span>
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
              confidentialityDetails.businessImpact ||
              "No business impact data available"}
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {businessImpact.reputational && (
              <div className="p-3 rounded-md bg-opacity-10 bg-purple-100 dark:bg-purple-900 dark:bg-opacity-20 border border-purple-200 dark:border-purple-800">
                <div className="flex items-center mb-2">
                  <span className="mr-2">🏆</span>
                  <span className="font-medium text-purple-700 dark:text-purple-300">
                    Reputational Impact
                  </span>
                </div>
                <p className="text-sm text-gray-700 dark:text-gray-300">
                  {businessImpact.reputational.description ||
                    "No reputational impact information available"}
                </p>
              </div>
            )}

            {businessImpact.regulatory && (
              <div className="p-3 rounded-md bg-opacity-10 bg-purple-100 dark:bg-purple-900 dark:bg-opacity-20 border border-purple-200 dark:border-purple-800">
                <div className="flex items-center mb-2">
                  <span className="mr-2">📜</span>
                  <span className="font-medium text-purple-700 dark:text-purple-300">
                    Regulatory Impact
                  </span>
                </div>
                <p className="text-sm text-gray-700 dark:text-gray-300">
                  {businessImpact.regulatory.description ||
                    "No regulatory impact information available"}
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Technical Details with enhanced styling */}
        {technicalDetails && technicalDetails.description && (
          <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg border-l-4 confidentiality-card security-card">
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
                  <h5 className="text-sm font-medium mb-2 text-purple-700 dark:text-purple-300">
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
          <div className="bg-purple-50 dark:bg-gray-800 p-4 rounded-lg border border-purple-200 dark:border-purple-900 shadow-sm security-card">
            <div className="flex items-center justify-between mb-3">
              <h4 className="text-md font-medium flex items-center">
                <span className="mr-2">💡</span>
                Recommendations
              </h4>
              {recommendations.length > 3 && (
                <button
                  className="text-sm px-3 py-1 rounded-full bg-purple-100 dark:bg-purple-900 text-purple-700 dark:text-purple-300 hover:bg-purple-200 dark:hover:bg-purple-800 transition-colors"
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

        {/* Data Classification with enhanced styling */}
        <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg border-l-4 confidentiality-card security-card">
          <h4 className="text-md font-medium mb-3 flex items-center">
            <span className="mr-2">🏷️</span>
            Data Protection Classification
          </h4>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-3 rounded-md bg-opacity-10 bg-purple-100 dark:bg-purple-900 dark:bg-opacity-20">
              <KeyValuePair
                label="Classification Level"
                value={confidentialityLevel}
                testId={`${testId}-classification-level`}
                valueClassName="text-purple-700 dark:text-purple-300 font-medium"
              />
            </div>

            <div className="p-3 rounded-md bg-opacity-10 bg-purple-100 dark:bg-purple-900 dark:bg-opacity-20">
              <KeyValuePair
                label="Information Sensitivity"
                value={sensitivity}
                testId={`${testId}-information-sensitivity`}
                valueClassName="text-purple-700 dark:text-purple-300 font-medium"
              />
            </div>
          </div>
        </div>
      </div>
    </WidgetContainer>
  );
};

export default ConfidentialityImpactWidget;
