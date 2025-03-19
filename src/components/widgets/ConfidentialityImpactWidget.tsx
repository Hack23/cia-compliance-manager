import React, { useMemo, useState } from "react";
import { CONFIDENTIALITY_IMPACT_TEST_IDS } from "../../constants/testIds";
import ciaContentService from "../../services/ciaContentService";
import { SecurityLevel } from "../../types/cia";
import CIAImpactCard from "../common/CIAImpactCard";
import { KeyValuePair } from "../common/KeyValuePair";
import SecurityLevelBadge from "../common/SecurityLevelBadge";
import WidgetActions, { WidgetActionButton } from "../common/WidgetActions";
import WidgetContainer from "../common/WidgetContainer";

// Add missing test IDs
export const WIDGET_TEST_IDS = {
  CONFIDENTIALITY_IMPACT_WIDGET: "confidentiality-impact-widget",
  RECOMMENDATION: "recommendation"
};

/**
 * Props for the ConfidentialityImpactWidget
 */
export interface ConfidentialityImpactWidgetProps {
  /**
   * The selected confidentiality level
   */
  confidentialityLevel: SecurityLevel;

  /**
   * The selected availability level
   * (for combined impact analysis)
   */
  availabilityLevel: SecurityLevel;

  /**
   * The selected integrity level
   * (for combined impact analysis)
   */
  integrityLevel: SecurityLevel;

  /**
   * Optional CSS class name
   */
  className?: string;

  /**
   * Optional test ID for testing
   */
  testId?: string;
}

/**
 * Widget that displays confidentiality impact analysis
 *
 * ## Business Perspective
 * 
 * This widget shows how the selected confidentiality level
 * impacts business operations, data protection, and compliance.
 * It provides security officers and executives with insights on 
 * data confidentiality controls and their business implications. 🔒
 */
const ConfidentialityImpactWidget: React.FC<
  ConfidentialityImpactWidgetProps
> = ({
  confidentialityLevel,
  availabilityLevel,
  integrityLevel,
  className = "",
  testId = CONFIDENTIALITY_IMPACT_TEST_IDS.CONFIDENTIALITY_IMPACT_PREFIX || "confidentiality-impact-widget",
}) => {
  // State for showing all recommendations
  const [showAllRecommendations, setShowAllRecommendations] = useState(false);

  // Get confidentiality details from the service
  const confidentialityDetails = useMemo(() => 
    ciaContentService.getComponentDetails(
      "confidentiality",
      confidentialityLevel
    ),
    [confidentialityLevel]
  );

  // Get recommendations for this confidentiality level
  const recommendations = useMemo(() => 
    ciaContentService.getRecommendations(
      "confidentiality",
      confidentialityLevel
    ),
    [confidentialityLevel]
  );

  // Get overall security impact using all three dimensions
  const overallImpact = useMemo(() => 
    ciaContentService.calculateBusinessImpactLevel(
      availabilityLevel, 
      integrityLevel,
      confidentialityLevel
    ),
    [availabilityLevel, integrityLevel, confidentialityLevel]
  );

  // Actions for the widget
  const actionsElement = (
    <WidgetActions>
      <WidgetActionButton
        onClick={() => setShowAllRecommendations(!showAllRecommendations)}
        icon={<span>{showAllRecommendations ? "−" : "+"}</span>}
        ariaLabel={showAllRecommendations ? "Show fewer recommendations" : "Show all recommendations"}
        testId={`${testId}-toggle-recommendations-button`}
      />
    </WidgetActions>
  );

  // If no details, show placeholder
  if (!confidentialityDetails) {
    return (
      <WidgetContainer
        title="Confidentiality Impact"
        icon="🔒"
        className={`confidentiality-impact-widget ${className}`}
        testId={testId}
      >
        <p>No details available for the selected confidentiality level.</p>
      </WidgetContainer>
    );
  }

  // Get business impact details
  const businessImpact = useMemo(() => 
    ciaContentService.getBusinessImpact(
      "confidentiality",
      confidentialityLevel
    ),
    [confidentialityLevel]
  );

  // Get implementation details
  const technicalDetails = useMemo(() => 
    ciaContentService.getTechnicalImplementation(
      "confidentiality",
      confidentialityLevel
    ),
    [confidentialityLevel]
  );

  // Handle technical details properties safely
  const getProtectionMethod = () => {
    if (!technicalDetails) return "Not specified";
    if (typeof technicalDetails !== 'object') return "Not specified";
    
    // Use optional chaining and access using bracket notation for property that may not exist
    return (technicalDetails as any)?.protectionMethod || 
           confidentialityDetails?.protectionMethod || 
           "Not specified";
  };

  return (
    <WidgetContainer
      title="Confidentiality Impact"
      icon="🔒"
      className={`confidentiality-impact-widget ${className}`}
      testId={testId}
    >
      <div className="max-h-[550px] overflow-y-auto pr-1">
        <div
          className="p-4"
          role="region"
          aria-labelledby="confidentiality-impact-heading"
        >
          <div className="mb-4">
            <SecurityLevelBadge
              category="Confidentiality"
              level={confidentialityLevel}
              colorClass="bg-purple-100 dark:bg-purple-900 dark:bg-opacity-20"
              textClass="text-purple-800 dark:text-purple-300"
              testId={`${testId}-confidentiality-badge`}
            />
            
            {/* Add overall impact indicator when all levels are available */}
            {availabilityLevel && integrityLevel && (
              <div className="mt-2 text-sm">
                <span className="font-medium">Overall Security Impact: </span>
                <span className={`${getImpactColor(overallImpact)} font-medium`}>
                  {overallImpact}
                </span>
              </div>
            )}
          </div>

          <div className="space-y-6">
            {/* Impact Description */}
            <div>
              <p className="text-sm text-gray-700 dark:text-gray-300">
                {confidentialityDetails?.description ||
                  "No impact description available."}
              </p>
            </div>

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
              {technicalDetails && getProtectionMethod() && (
                <div className="flex items-center mt-2 text-sm text-purple-600 dark:text-purple-400">
                  <span className="mr-2">🔒</span>
                  <span className="font-medium">Protection Method: </span>
                  <span className="ml-1">
                    {getProtectionMethod()}
                  </span>
                </div>
              )}
            </CIAImpactCard>

            {/* Business Impact Section */}
            <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg border shadow-sm security-card">
              <h4 className="text-md font-medium mb-3 flex items-center">
                <span className="mr-2">💼</span>
                Business Impact
              </h4>

              <p
                className="text-gray-600 dark:text-gray-300 mb-4"
                data-testid={`${testId}-business-impact`}
              >
                {businessImpact?.summary ||
                  confidentialityDetails?.businessImpact ||
                  "No business impact data available"}
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {businessImpact?.regulatory && (
                  <div className="p-3 rounded-md bg-opacity-10 bg-purple-100 dark:bg-purple-900 dark:bg-opacity-20 border border-purple-200 dark:border-purple-800">
                    <KeyValuePair
                      label="Regulatory Impact"
                      value={businessImpact.regulatory?.description || 'Not specified'}
                      testId={`${testId}-regulatory-impact`}
                      valueClassName="text-purple-700 dark:text-purple-300"
                    />
                  </div>
                )}

                {businessImpact?.financial && (
                  <div className="p-3 rounded-md bg-opacity-10 bg-purple-100 dark:bg-purple-900 dark:bg-opacity-20 border border-purple-200 dark:border-purple-800">
                    <KeyValuePair
                      label="Financial Impact"
                      value={businessImpact.financial?.description || 'Not specified'}
                      testId={`${testId}-financial-impact`}
                      valueClassName="text-purple-700 dark:text-purple-300"
                    />
                  </div>
                )}
              </div>
            </div>

            {/* Technical Details */}
            {technicalDetails && technicalDetails.description && (
              <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg border-l-4 confidentiality-card security-card">
                <h4 className="text-md font-medium mb-2 flex items-center">
                  <span className="mr-2">⚙️</span>
                  Technical Implementation
                </h4>

                <p className="text-gray-600 dark:text-gray-300 mb-3">
                  {technicalDetails.description}
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-3">
                  <div className="p-3 rounded-md bg-opacity-10 bg-purple-100 dark:bg-purple-900 dark:bg-opacity-20">
                    <KeyValuePair
                      label="Protection Method"
                      value={getProtectionMethod()} // Removed incorrect type assertion
                      testId={`${testId}-protection-method`}
                      valueClassName="text-purple-700 dark:text-purple-300 font-medium"
                    />
                  </div>

                  <div className="p-3 rounded-md bg-opacity-10 bg-purple-100 dark:bg-purple-900 dark:bg-opacity-20">
                    <KeyValuePair
                      label="Protection Level"
                      value={confidentialityLevel}
                      testId={`${testId}-protection-level`}
                      valueClassName="text-purple-700 dark:text-purple-300 font-medium"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Recommendations */}
            {recommendations && recommendations.length > 0 && (
              <div className="bg-purple-50 dark:bg-gray-800 p-4 rounded-lg border border-purple-200 dark:border-purple-900 shadow-sm security-card">
                <div className="flex items-center justify-between mb-3">
                  <h4 className="text-md font-medium flex items-center">
                    <span className="mr-2">💡</span>
                    Recommendations
                  </h4>
                  {recommendations.length > 3 && (
                    <button
                      onClick={() =>
                        setShowAllRecommendations(!showAllRecommendations)
                      }
                      className="text-sm text-purple-600 dark:text-purple-400 hover:underline"
                      aria-expanded={showAllRecommendations}
                      data-testid={`${testId}-toggle-recommendations`}
                    >
                      {showAllRecommendations ? "Show Less" : "Show All"}
                    </button>
                  )}
                </div>

                <ul className="list-disc pl-5 space-y-2 text-gray-600 dark:text-gray-300">
                  {(showAllRecommendations
                    ? recommendations
                    : recommendations.slice(0, 3)
                  ).map((recommendation: string, index: number) => (
                    <li
                      key={`recommendation-${index}`}
                      className="mb-2"
                      data-testid={`recommendation-${index}`}
                    >
                      {recommendation}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
    </WidgetContainer>
  );
};

// Helper function to determine text color based on impact level
function getImpactColor(impact: SecurityLevel | string): string {
  switch (impact) {
    case "None":
      return "text-red-600 dark:text-red-400";
    case "Low":
      return "text-orange-600 dark:text-orange-400";
    case "Moderate":
      return "text-yellow-600 dark:text-yellow-400";
    case "High":
      return "text-green-600 dark:text-green-400";
    case "Very High":
      return "text-blue-600 dark:text-blue-400";
    default:
      return "text-gray-600 dark:text-gray-400";
  }
}

export default ConfidentialityImpactWidget;
