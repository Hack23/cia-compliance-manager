import React, { useMemo, useState } from "react";
import { WIDGET_ICONS, WIDGET_TITLES } from "../../constants";
import { AVAILABILITY_IMPACT_TEST_IDS } from "../../constants/testIds";
import ciaContentService from "../../services/ciaContentService";
import { SecurityLevel } from "../../types/cia";
import CIAImpactCard from "../common/CIAImpactCard";
import KeyValuePair from "../common/KeyValuePair";
import WidgetContainer from "../common/WidgetContainer";

/**
 * Props for AvailabilityImpactWidget component
 */
export interface AvailabilityImpactWidgetProps {
  availabilityLevel: SecurityLevel;
  integrityLevel?: SecurityLevel;
  confidentialityLevel?: SecurityLevel;
  className?: string;
  testId?: string;
  options?: Record<string, any>; // Added the missing options property
}

const AvailabilityImpactWidget: React.FC<AvailabilityImpactWidgetProps> = ({
  availabilityLevel,
  integrityLevel: _integrityLevel, // Add underscore to mark as intentionally unused
  confidentialityLevel: _confidentialityLevel, // Add underscore to mark as intentionally unused
  className = "",
  testId = AVAILABILITY_IMPACT_TEST_IDS.AVAILABILITY_IMPACT_PREFIX,
  options: _options = {}, // Add underscore to mark as intentionally unused
}) => {
  const [showAllRecommendations, setShowAllRecommendations] = useState(false);

  // Fetch component details from ciaContentService
  const availabilityDetails = useMemo(
    () =>
      ciaContentService.getComponentDetails("availability", availabilityLevel),
    [availabilityLevel]
  );

  // Fetch business impact from ciaContentService
  const businessImpact = useMemo(
    () =>
      ciaContentService.getBusinessImpact("availability", availabilityLevel),
    [availabilityLevel]
  );

  // Get technical implementation details
  const technicalDetails = useMemo(
    () =>
      ciaContentService.getTechnicalImplementation(
        "availability",
        availabilityLevel
      ),
    [availabilityLevel]
  );

  // Get recommendations from service
  const recommendations = useMemo(
    () =>
      ciaContentService.getRecommendations("availability", availabilityLevel),
    [availabilityLevel]
  );

  // Create the impact description from available information
  const impactDescription = useMemo(() => {
    return (
      availabilityDetails?.description ||
      businessImpact?.summary ||
      `Impact of ${availabilityLevel} availability on system operations and business continuity.`
    );
  }, [availabilityDetails, businessImpact, availabilityLevel]);

  // Handle cases where data might not be available
  if (!availabilityDetails) {
    return (
      <WidgetContainer
        title="Availability Impact"
        icon="⏱️"
        className={className}
        testId={testId}
        error={new Error("Availability details not available")}
      >
        <div>Availability details not available</div>
      </WidgetContainer>
    );
  }

  return (
    <WidgetContainer
      title={WIDGET_TITLES.AVAILABILITY_IMPACT}
      icon={WIDGET_ICONS.AVAILABILITY_IMPACT}
      className={`${className} overflow-visible`}
      testId={testId || "widget-availability-impact"}
    >
      <div className="max-h-[550px] overflow-y-auto pr-1">
        {/* Component content with consistent styling */}
        <div
          className="p-4"
          role="region"
          aria-labelledby="availability-impact-heading"
        >
          <h3
            id="availability-impact-heading"
            className="text-lg font-medium mb-4 text-blue-600 dark:text-blue-400"
          >
            {availabilityLevel} Availability Impact
          </h3>

          {/* Impact Description */}
          <div className="mb-6">
            <p className="text-sm text-gray-700 dark:text-gray-300">
              {impactDescription || "No impact description available."}
            </p>
          </div>

          <div className="space-y-6">
            <CIAImpactCard
              title="Availability Profile"
              level={availabilityLevel}
              description={
                availabilityDetails.description || "No description available"
              }
              icon="⏱️"
              badgeVariant="info"
              cardClass="availability-card"
              testId={`${testId}-impact-card`}
            >
              {availabilityDetails.uptime && (
                <div className="flex items-center mt-2 text-sm text-blue-600 dark:text-blue-400">
                  <span className="mr-2">⏱️</span>
                  <span className="font-medium">Uptime Target: </span>
                  <span className="ml-1">{availabilityDetails.uptime}</span>
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
                  availabilityDetails.businessImpact ||
                  "No business impact data available"}
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {businessImpact.operational && (
                  <div className="p-3 rounded-md bg-opacity-10 bg-blue-100 dark:bg-blue-900 dark:bg-opacity-20 border border-blue-200 dark:border-blue-800">
                    <div className="flex items-center mb-2">
                      <span className="mr-2">⚙️</span>
                      <span className="font-medium text-blue-700 dark:text-blue-300">
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
                  <div className="p-3 rounded-md bg-opacity-10 bg-blue-100 dark:bg-blue-900 dark:bg-opacity-20 border border-blue-200 dark:border-blue-800">
                    <div className="flex items-center mb-2">
                      <span className="mr-2">💰</span>
                      <span className="font-medium text-blue-700 dark:text-blue-300">
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

            {/* Technical Details with enhanced styling */}
            {technicalDetails && technicalDetails.description && (
              <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg border-l-4 availability-card security-card">
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
                      <h5 className="text-sm font-medium mb-2 text-blue-700 dark:text-blue-300">
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
              <div className="bg-blue-50 dark:bg-gray-800 p-4 rounded-lg border border-blue-200 dark:border-blue-900 shadow-sm security-card">
                <div className="flex items-center justify-between mb-3">
                  <h4 className="text-md font-medium flex items-center">
                    <span className="mr-2">💡</span>
                    Recommendations
                  </h4>
                  {recommendations.length > 3 && (
                    <button
                      className="text-sm px-3 py-1 rounded-full bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 hover:bg-blue-200 dark:hover:bg-blue-800 transition-colors"
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

            {/* Availability Metrics with enhanced styling */}
            <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg border-l-4 availability-card security-card">
              <h4 className="text-md font-medium mb-3 flex items-center">
                <span className="mr-2">📊</span>
                Availability Metrics
              </h4>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-3 rounded-md bg-opacity-10 bg-blue-100 dark:bg-blue-900 dark:bg-opacity-20">
                  <KeyValuePair
                    label="Uptime Target"
                    value={availabilityDetails.uptime || "N/A"}
                    testId={`${testId}-uptime-target`}
                    valueClassName="text-blue-700 dark:text-blue-300 font-medium"
                  />
                </div>

                <div className="p-3 rounded-md bg-opacity-10 bg-blue-100 dark:bg-blue-900 dark:bg-opacity-20">
                  <KeyValuePair
                    label="Recovery Time Objective"
                    value={availabilityDetails.rto || "N/A"}
                    testId={`${testId}-rto-value`}
                    valueClassName="text-blue-700 dark:text-blue-300 font-medium"
                  />
                </div>

                {availabilityDetails.rpo && (
                  <div className="p-3 rounded-md bg-opacity-10 bg-blue-100 dark:bg-blue-900 dark:bg-opacity-20">
                    <KeyValuePair
                      label="Recovery Point Objective"
                      value={availabilityDetails.rpo}
                      testId={`${testId}-rpo-value`}
                      valueClassName="text-blue-700 dark:text-blue-300 font-medium"
                    />
                  </div>
                )}

                {availabilityDetails.mttr && (
                  <div className="p-3 rounded-md bg-opacity-10 bg-blue-100 dark:bg-blue-900 dark:bg-opacity-20">
                    <KeyValuePair
                      label="Mean Time To Recovery"
                      value={availabilityDetails.mttr}
                      testId={`${testId}-mttr-value`}
                      valueClassName="text-blue-700 dark:text-blue-300 font-medium"
                    />
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </WidgetContainer>
  );
};

export default AvailabilityImpactWidget;
