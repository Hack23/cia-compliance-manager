import React, { useState, useMemo } from "react";
import { SecurityLevel } from "../../types/cia";
import { CONFIDENTIALITY_IMPACT_TEST_IDS } from "../../constants/testIds";
import ciaContentService, {
  getInformationSensitivity,
  getProtectionLevel,
} from "../../services/ciaContentService";
import StatusBadge from "../common/StatusBadge";
import KeyValuePair from "../common/KeyValuePair";
import WidgetContainer from "../common/WidgetContainer";
import { CIA_COMPONENT_COLORS } from "../../constants/colorConstants";
import { normalizeSecurityLevel } from "../../utils/widgetHelpers";

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
        <div className="mb-4">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-lg font-medium mr-2">
              {confidentialityLevel} Confidentiality
            </h3>
            <StatusBadge
              status="purple"
              testId={`${testId}-level-badge`}
              className="bg-purple-600 text-white"
            >
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
          <div
            className="mb-4 bg-gray-50 dark:bg-gray-800 p-4 rounded-lg border-l-4"
            style={{
              borderLeftColor: CIA_COMPONENT_COLORS.CONFIDENTIALITY.PRIMARY,
            }}
          >
            <h4 className="text-md font-medium mb-2">
              Technical Implementation
            </h4>
            <p className="text-gray-600 dark:text-gray-300">
              {technicalDetails.description}
            </p>
            {(() => {
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
            <div
              className="mt-2 p-3 rounded-md"
              style={{
                backgroundColor: `${CIA_COMPONENT_COLORS.CONFIDENTIALITY.SECONDARY}25`,
              }}
            >
              <div className="flex items-center mb-1">
                <span className="mr-1">🏆</span>
                <span className="font-medium">Reputational Impact</span>
              </div>
              <p
                className="text-sm"
                style={{ color: CIA_COMPONENT_COLORS.CONFIDENTIALITY.DARK }}
              >
                {businessImpact.reputational.description ||
                  "No reputational impact information available"}
              </p>
            </div>
          )}

          {businessImpact.regulatory && (
            <div
              className="mt-2 p-3 rounded-md"
              style={{
                backgroundColor: `${CIA_COMPONENT_COLORS.CONFIDENTIALITY.SECONDARY}25`,
              }}
            >
              <div className="flex items-center mb-1">
                <span className="mr-1">📜</span>
                <span className="font-medium">Regulatory Impact</span>
              </div>
              <p
                className="text-sm"
                style={{ color: CIA_COMPONENT_COLORS.CONFIDENTIALITY.DARK }}
              >
                {businessImpact.regulatory.description ||
                  "No regulatory impact information available"}
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
                  className="text-sm hover:underline focus:outline-none"
                  style={{
                    color: CIA_COMPONENT_COLORS.CONFIDENTIALITY.PRIMARY,
                  }}
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

        <div
          className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg border-l-4"
          style={{
            borderLeftColor: CIA_COMPONENT_COLORS.CONFIDENTIALITY.PRIMARY,
          }}
        >
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
              value={sensitivity}
              testId={`${testId}-information-sensitivity`}
            />
          </div>
        </div>
      </div>
    </WidgetContainer>
  );
};

export default ConfidentialityImpactWidget;
