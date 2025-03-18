import React, { useMemo, useState } from "react";
import { WIDGET_ICONS, WIDGET_TITLES } from "../../constants";
import { INTEGRITY_IMPACT_TEST_IDS } from "../../constants/testIds";
import ciaContentService from "../../services/ciaContentService";
import { SecurityLevel } from "../../types/cia";
import CIAImpactCard from "../common/CIAImpactCard";
import KeyValuePair from "../common/KeyValuePair";
import SecurityLevelBadge from "../common/SecurityLevelBadge";
import WidgetActions, { WidgetActionButton } from "../common/WidgetActions";
import WidgetContainer from "../common/WidgetContainer";

/**
 * Props for IntegrityImpactWidget component
 */
export interface IntegrityImpactWidgetProps {
  integrityLevel: SecurityLevel;
  availabilityLevel?: SecurityLevel;
  confidentialityLevel?: SecurityLevel;
  className?: string;
  testId?: string;
}

/**
 * Widget that displays integrity impact details
 *
 * ## Business Perspective
 *
 * This widget helps stakeholders understand the impact of integrity controls
 * on data trustworthiness and organizational operations. It supports decision-making
 * about data validation requirements and illustrates the business value of
 * preventing unauthorized modifications to information assets. 🔒
 */
const IntegrityImpactWidget: React.FC<IntegrityImpactWidgetProps> = ({
  integrityLevel,
  availabilityLevel: _availabilityLevel, // Add underscore to mark as intentionally unused
  confidentialityLevel: _confidentialityLevel, // Add underscore to mark as intentionally unused
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
      ciaContentService.getTechnicalImplementation("integrity", integrityLevel),
    [integrityLevel]
  );

  // Get recommendations from service
  const recommendations = useMemo(
    () => ciaContentService.getRecommendations("integrity", integrityLevel),
    [integrityLevel]
  );

  // Handle technical details properties safely
  const getValidationMethod = () => {
    if (!technicalDetails) return "Not specified";
    if (typeof technicalDetails !== 'object') return "Not specified";
    
    // Use optional chaining and access using bracket notation for property that may not exist
    return (technicalDetails as any)?.validationMethod || 
           integrityDetails?.validationMethod || 
           "Not specified";
  };

  // Create action buttons for widget header
  const actionsElement = (
    <WidgetActions>
      <WidgetActionButton
        onClick={() => console.log("Info clicked")}
        icon={<span>ℹ️</span>}
        ariaLabel="More information"
        testId="info-button"
      />
    </WidgetActions>
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
      title={WIDGET_TITLES.INTEGRITY_IMPACT}
      icon={WIDGET_ICONS.INTEGRITY_IMPACT}
      className={`${className} overflow-visible`}
      testId={testId || "widget-integrity-impact"}
      actions={actionsElement}
    >
      <div className="max-h-[550px] overflow-y-auto pr-1">
        <div
          className="p-4"
          role="region"
          aria-labelledby="integrity-impact-heading"
        >
          {/* Use SecurityLevelBadge for consistent display */}
          <div className="mb-4">
            <SecurityLevelBadge
              category="Integrity"
              level={integrityLevel}
              colorClass="bg-green-100 dark:bg-green-900 dark:bg-opacity-20"
              textClass="text-green-800 dark:text-green-300"
              testId={`${testId}-integrity-badge`}
            />
          </div>

          <div className="space-y-6">
            {/* Impact Description */}
            <div>
              <p className="text-sm text-gray-700 dark:text-gray-300">
                {integrityDetails?.description ||
                  "No impact description available."}
              </p>
            </div>

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
              {technicalDetails && getValidationMethod() && (
                <div className="flex items-center mt-2 text-sm text-green-600 dark:text-green-400">
                  <span className="mr-2">✓</span>
                  <span className="font-medium">Validation Method: </span>
                  <span className="ml-1">
                    {getValidationMethod()}
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
                {businessImpact.summary ||
                  integrityDetails?.businessImpact ||
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

            {/* Technical Details */}
            {technicalDetails && technicalDetails.description && (
              <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg border-l-4 integrity-card security-card">
                <h4 className="text-md font-medium mb-2 flex items-center">
                  <span className="mr-2">⚙️</span>
                  Technical Implementation
                </h4>

                <p className="text-gray-600 dark:text-gray-300 mb-3">
                  {technicalDetails.description}
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-3">
                  <div className="p-3 rounded-md bg-opacity-10 bg-green-100 dark:bg-green-900 dark:bg-opacity-20">
                    <KeyValuePair
                      label="Validation Technique"
                      value={
                        getValidationMethod()
                      }
                      testId={`${testId}-validation-technique`}
                      valueClassName="text-green-700 dark:text-green-300 font-medium"
                    />
                  </div>

                  <div className="p-3 rounded-md bg-opacity-10 bg-green-100 dark:bg-green-900 dark:bg-opacity-20">
                    <KeyValuePair
                      label="Protection Level"
                      value={integrityLevel}
                      testId={`${testId}-protection-level`}
                      valueClassName="text-green-700 dark:text-green-300 font-medium"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Recommendations */}
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
          </div>
        </div>
      </div>
    </WidgetContainer>
  );
};

export default IntegrityImpactWidget;
