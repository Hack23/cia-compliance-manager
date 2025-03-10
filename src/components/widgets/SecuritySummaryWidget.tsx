import React, { useState, useMemo } from "react";
import { SecurityLevel } from "../../types/cia";
import { SUMMARY_TEST_IDS } from "../../constants/testIds";
import {
  UI_ICONS,
  SECURITY_RECOMMENDATIONS,
} from "../../constants/appConstants";
import ciaContentService, {
  getSecurityLevelDescription,
  getTechnicalDescription,
  getBusinessImpactDescription,
  getSecurityIcon,
  getROIEstimate,
} from "../../services/ciaContentService";
import StatusBadge from "../common/StatusBadge";
import WidgetContainer from "../common/WidgetContainer";
import KeyValuePair from "../common/KeyValuePair";
import { WIDGET_TITLES, WIDGET_ICONS } from "../../constants/coreConstants";

/**
 * Props for SecuritySummaryWidget
 *
 * @interface SecuritySummaryWidgetProps
 * @property {SecurityLevel} securityLevel - Overall security level
 * @property {SecurityLevel} availabilityLevel - Availability level selection
 * @property {SecurityLevel} integrityLevel - Integrity level selection
 * @property {SecurityLevel} confidentialityLevel - Confidentiality level selection
 * @property {string} [className] - Optional CSS class name
 * @property {string} [testId] - Optional test ID for testing
 */
export interface SecuritySummaryWidgetProps {
  securityLevel: SecurityLevel;
  availabilityLevel: SecurityLevel;
  integrityLevel: SecurityLevel;
  confidentialityLevel: SecurityLevel;
  className?: string;
  testId?: string;
}

/**
 * SecuritySummaryWidget displays a comprehensive summary of the current security profile
 * including CIA levels, technical details, business impacts, and recommendations.
 * It uses ciaContentService to fetch all needed information.
 *
 * @component
 * @example
 * ```tsx
 * <SecuritySummaryWidget
 *   securityLevel="High"
 *   availabilityLevel="High"
 *   integrityLevel="Moderate"
 *   confidentialityLevel="High"
 * />
 * ```
 */
const SecuritySummaryWidget: React.FC<SecuritySummaryWidgetProps> = ({
  securityLevel,
  availabilityLevel,
  integrityLevel,
  confidentialityLevel,
  className = "",
  testId = SUMMARY_TEST_IDS.SECURITY_SUMMARY_CONTAINER,
}) => {
  // Component state for toggleable sections
  const [showTechnicalDetails, setShowTechnicalDetails] = useState(false);
  const [showBusinessImpact, setShowBusinessImpact] = useState(false);
  const [showMetrics, setShowMetrics] = useState(false);

  // Get detailed description from service
  const securityDescription = useMemo(
    () =>
      getSecurityLevelDescription(securityLevel) ||
      "Security level not specified",
    [securityLevel]
  );

  // Get ROI metrics from service
  const roiData = useMemo(() => getROIEstimate(securityLevel), [securityLevel]);

  // Fix the property access to match the return type from getROIEstimate
  const roiValue = roiData.value; // instead of roiData.returnRate
  const breakEvenPeriod = roiData.description.includes("break-even")
    ? "12-24 months"
    : "6-18 months"; // default value since breakEvenPeriod doesn't exist

  // Get technical implementation details from service
  const availabilityTechDescription = useMemo(
    () => getTechnicalDescription("availability", availabilityLevel),
    [availabilityLevel]
  );

  const integrityTechDescription = useMemo(
    () => getTechnicalDescription("integrity", integrityLevel),
    [integrityLevel]
  );

  const confidentialityTechDescription = useMemo(
    () => getTechnicalDescription("confidentiality", confidentialityLevel),
    [confidentialityLevel]
  );

  // Get business impact details from service
  const availabilityBusinessImpact = useMemo(
    () => getBusinessImpactDescription("availability", availabilityLevel),
    [availabilityLevel]
  );

  const integrityBusinessImpact = useMemo(
    () => getBusinessImpactDescription("integrity", integrityLevel),
    [integrityLevel]
  );

  const confidentialityBusinessImpact = useMemo(
    () => getBusinessImpactDescription("confidentiality", confidentialityLevel),
    [confidentialityLevel]
  );

  // Get recommendations from service
  const recommendations = useMemo(
    () => ciaContentService.getRecommendations("availability", securityLevel),
    [securityLevel]
  );

  // Get security icon based on security level
  const securityIcon = getSecurityIcon(securityLevel);

  // Get status badge variant based on security level
  const getStatusBadgeVariant = (
    level: string
  ): "info" | "success" | "warning" | "error" | "neutral" => {
    switch (level) {
      case "None":
        return "error";
      case "Low":
        return "warning";
      case "Moderate":
        return "info";
      case "High":
      case "Very High":
        return "success";
      default:
        return "neutral";
    }
  };

  return (
    <WidgetContainer
      title={WIDGET_TITLES.SECURITY_SUMMARY}
      icon={WIDGET_ICONS.SECURITY_SUMMARY}
      className={className}
      testId={testId}
    >
      <div className="space-y-6">
        {/* Security Level Header */}
        <div className="flex items-center space-x-4">
          <div className="flex-shrink-0">
            <span
              className="text-3xl"
              data-testid={SUMMARY_TEST_IDS.SECURITY_ICON}
              role="img"
              aria-label={`Security level: ${securityLevel}`}
            >
              {securityIcon}
            </span>
          </div>
          <div>
            <h3 className="text-xl font-bold">{securityLevel} Security</h3>
            <p
              className="text-sm text-gray-600 dark:text-gray-400 mt-1"
              data-testid={SUMMARY_TEST_IDS.SECURITY_SUMMARY_DESCRIPTION}
            >
              {securityDescription}
            </p>
          </div>
        </div>

        {/* CIA Level Pills */}
        <div className="flex flex-wrap gap-2">
          <StatusBadge
            status="info"
            testId={SUMMARY_TEST_IDS.AVAILABILITY_LEVEL_PILL}
          >
            Availability: {availabilityLevel}
          </StatusBadge>
          <StatusBadge
            status="success"
            testId={SUMMARY_TEST_IDS.INTEGRITY_LEVEL_PILL}
          >
            Integrity: {integrityLevel}
          </StatusBadge>
          <StatusBadge
            status="purple"
            testId={SUMMARY_TEST_IDS.CONFIDENTIALITY_LEVEL_PILL}
          >
            Confidentiality: {confidentialityLevel}
          </StatusBadge>
        </div>

        {/* ROI Estimate Summary */}
        <div
          className="bg-green-50 dark:bg-green-900 dark:bg-opacity-20 p-3 rounded-lg"
          data-testid={SUMMARY_TEST_IDS.ROI_ESTIMATE_SUMMARY}
        >
          <KeyValuePair
            label="Estimated ROI"
            value={roiValue}
            testId={SUMMARY_TEST_IDS.ROI_ESTIMATE_PAIR}
            valueClassName="text-green-600 dark:text-green-400 text-lg"
          />
          <p className="text-sm text-green-700 dark:text-green-400 mt-1">
            {roiData.description}
          </p>
        </div>

        {/* Toggleable Technical Details Section */}
        <div>
          <button
            onClick={() => setShowTechnicalDetails(!showTechnicalDetails)}
            className="flex items-center justify-between w-full text-left font-medium text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400"
            data-testid={SUMMARY_TEST_IDS.TECHNICAL_SECTION_TOGGLE}
            aria-expanded={showTechnicalDetails}
          >
            <span>Technical Implementation</span>
            <span>{showTechnicalDetails ? "▼" : "▶"}</span>
          </button>

          {showTechnicalDetails && (
            <div
              className="mt-3 space-y-4 pl-3 border-l-2 border-gray-200 dark:border-gray-700"
              data-testid={SUMMARY_TEST_IDS.TECHNICAL_DETAILS_SECTION}
            >
              <div>
                <h4
                  className="text-sm font-medium text-blue-600 dark:text-blue-400 mb-1"
                  data-testid={SUMMARY_TEST_IDS.AVAILABILITY_TECH_HEADING}
                >
                  Availability Implementation
                </h4>
                <p
                  className="text-sm text-gray-600 dark:text-gray-400"
                  data-testid={SUMMARY_TEST_IDS.AVAILABILITY_TECH_DETAILS}
                >
                  {availabilityTechDescription}
                </p>
              </div>

              <div>
                <h4
                  className="text-sm font-medium text-green-600 dark:text-green-400 mb-1"
                  data-testid={SUMMARY_TEST_IDS.INTEGRITY_TECH_HEADING}
                >
                  Integrity Implementation
                </h4>
                <p
                  className="text-sm text-gray-600 dark:text-gray-400"
                  data-testid={SUMMARY_TEST_IDS.INTEGRITY_TECH_DETAILS}
                >
                  {integrityTechDescription}
                </p>
              </div>

              <div>
                <h4
                  className="text-sm font-medium text-purple-600 dark:text-purple-400 mb-1"
                  data-testid={SUMMARY_TEST_IDS.CONFIDENTIALITY_TECH_HEADING}
                >
                  Confidentiality Implementation
                </h4>
                <p
                  className="text-sm text-gray-600 dark:text-gray-400"
                  data-testid={SUMMARY_TEST_IDS.CONFIDENTIALITY_TECH_DETAILS}
                >
                  {confidentialityTechDescription}
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Toggleable Business Impact Section */}
        <div>
          <button
            onClick={() => setShowBusinessImpact(!showBusinessImpact)}
            className="flex items-center justify-between w-full text-left font-medium text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400"
            data-testid={SUMMARY_TEST_IDS.BUSINESS_IMPACT_TOGGLE}
            aria-expanded={showBusinessImpact}
          >
            <span>Business Impact</span>
            <span>{showBusinessImpact ? "▼" : "▶"}</span>
          </button>

          {showBusinessImpact && (
            <div
              className="mt-3 space-y-4 pl-3 border-l-2 border-gray-200 dark:border-gray-700"
              data-testid={SUMMARY_TEST_IDS.BUSINESS_IMPACT_SECTION}
            >
              <div>
                <h4
                  className="text-sm font-medium text-blue-600 dark:text-blue-400 mb-1"
                  data-testid={SUMMARY_TEST_IDS.AVAILABILITY_IMPACT_HEADING}
                >
                  Availability Impact
                </h4>
                <p
                  className="text-sm text-gray-600 dark:text-gray-400"
                  data-testid={SUMMARY_TEST_IDS.AVAILABILITY_IMPACT_DETAILS}
                >
                  {availabilityBusinessImpact}
                </p>
              </div>

              <div>
                <h4
                  className="text-sm font-medium text-green-600 dark:text-green-400 mb-1"
                  data-testid={SUMMARY_TEST_IDS.INTEGRITY_IMPACT_HEADING}
                >
                  Integrity Impact
                </h4>
                <p
                  className="text-sm text-gray-600 dark:text-gray-400"
                  data-testid={SUMMARY_TEST_IDS.INTEGRITY_IMPACT_DETAILS}
                >
                  {integrityBusinessImpact}
                </p>
              </div>

              <div>
                <h4
                  className="text-sm font-medium text-purple-600 dark:text-purple-400 mb-1"
                  data-testid={SUMMARY_TEST_IDS.CONFIDENTIALITY_IMPACT_HEADING}
                >
                  Confidentiality Impact
                </h4>
                <p
                  className="text-sm text-gray-600 dark:text-gray-400"
                  data-testid={SUMMARY_TEST_IDS.CONFIDENTIALITY_IMPACT_DETAILS}
                >
                  {confidentialityBusinessImpact}
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Key Recommendations */}
        <div>
          <h4
            className="font-medium mb-2"
            data-testid={SUMMARY_TEST_IDS.RECOMMENDATION_HEADING}
          >
            Security Recommendation
          </h4>
          <StatusBadge
            status={getStatusBadgeVariant(securityLevel)}
            testId={SUMMARY_TEST_IDS.SECURITY_RECOMMENDATION}
          >
            {SECURITY_RECOMMENDATIONS[
              securityLevel
                .toUpperCase()
                .replace(" ", "_") as keyof typeof SECURITY_RECOMMENDATIONS
            ] || SECURITY_RECOMMENDATIONS.BASIC}
          </StatusBadge>

          {recommendations.length > 0 && (
            <ul className="mt-3 space-y-1 list-disc list-inside text-sm text-gray-600 dark:text-gray-400">
              {recommendations.slice(0, 3).map((rec, index) => (
                <li key={index}>{rec}</li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </WidgetContainer>
  );
};

export default SecuritySummaryWidget;
