import React, { useMemo, useState } from "react";
import {
  CIA_COMPONENT_ICONS,
  CIA_LABELS,
  SECURITY_RECOMMENDATIONS,
} from "../../constants/appConstants";
import { CIA_COMPONENT_COLORS } from "../../constants/colorConstants";
import { WIDGET_ICONS, WIDGET_TITLES } from "../../constants/coreConstants";
import { SUMMARY_TEST_IDS } from "../../constants/testIds";
import ciaContentService, {
  getBusinessImpactDescription,
  getROIEstimate,
  getSecurityIcon,
  getSecurityLevelDescription,
  getTechnicalDescription,
} from "../../services/ciaContentService";
import { SecurityLevel } from "../../types/cia";
import { getSecurityLevelBadgeVariant } from "../../utils/securityLevelUtils";
import KeyValuePair from "../common/KeyValuePair";
import SecurityLevelSummaryItem from "../common/SecurityLevelSummaryItem";
import StatusBadge from "../common/StatusBadge";
import WidgetContainer from "../common/WidgetContainer";

/**
 * Props for SecuritySummaryWidget
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
 * Security Summary Widget that displays current security posture based on CIA levels
 *
 * @category Widgets
 * @param props - Component properties
 * @returns Rendered component
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

  return (
    <WidgetContainer
      title={WIDGET_TITLES.SECURITY_SUMMARY}
      icon={WIDGET_ICONS.SECURITY_SUMMARY}
      className={className}
      testId={testId}
    >
      <div className="space-y-6" role="region" aria-label="Security Summary">
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

        {/* CIA Level Summary Items */}
        <div
          className="flex flex-wrap gap-2"
          data-testid={SUMMARY_TEST_IDS.SUMMARY_CONTAINER}
        >
          <SecurityLevelSummaryItem
            label={CIA_LABELS.CONFIDENTIALITY}
            value={confidentialityLevel}
            icon={CIA_COMPONENT_ICONS.CONFIDENTIALITY}
            testId={`${testId}-confidentiality-summary`}
            color="purple"
            borderColor={CIA_COMPONENT_COLORS.CONFIDENTIALITY.PRIMARY}
            compact={true}
          />
          <SecurityLevelSummaryItem
            label={CIA_LABELS.INTEGRITY}
            value={integrityLevel}
            icon={CIA_COMPONENT_ICONS.INTEGRITY}
            testId={`${testId}-integrity-summary`}
            color="green"
            borderColor={CIA_COMPONENT_COLORS.INTEGRITY.PRIMARY}
            compact={true}
          />
          <SecurityLevelSummaryItem
            label={CIA_LABELS.AVAILABILITY}
            value={availabilityLevel}
            icon={CIA_COMPONENT_ICONS.AVAILABILITY}
            testId={`${testId}-availability-summary`}
            color="blue"
            borderColor={CIA_COMPONENT_COLORS.AVAILABILITY.PRIMARY}
            compact={true}
          />
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
            className="flex items-center justify-between w-full text-left font-medium text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
            data-testid={SUMMARY_TEST_IDS.TECHNICAL_SECTION_TOGGLE}
            aria-expanded={showTechnicalDetails}
          >
            <span>Technical Implementation</span>
            <span
              className="transition-transform duration-200"
              style={{
                transform: showTechnicalDetails ? "rotate(180deg)" : "none",
              }}
            >
              {showTechnicalDetails ? "▲" : "▼"}
            </span>
          </button>

          {showTechnicalDetails && (
            <div
              className="mt-3 space-y-4 pl-3 border-l-2 border-gray-200 dark:border-gray-700"
              data-testid={SUMMARY_TEST_IDS.TECHNICAL_DETAILS_SECTION}
            >
              <div>
                <h4
                  className="text-sm font-medium mb-1"
                  style={{ color: CIA_COMPONENT_COLORS.AVAILABILITY.PRIMARY }}
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
                  className="text-sm font-medium mb-1"
                  style={{ color: CIA_COMPONENT_COLORS.INTEGRITY.PRIMARY }}
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
                  className="text-sm font-medium mb-1"
                  style={{
                    color: CIA_COMPONENT_COLORS.CONFIDENTIALITY.PRIMARY,
                  }}
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
            className="flex items-center justify-between w-full text-left font-medium text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
            data-testid={SUMMARY_TEST_IDS.BUSINESS_IMPACT_TOGGLE}
            aria-expanded={showBusinessImpact}
          >
            <span>Business Impact</span>
            <span
              className="transition-transform duration-200"
              style={{
                transform: showBusinessImpact ? "rotate(180deg)" : "none",
              }}
            >
              {showBusinessImpact ? "▲" : "▼"}
            </span>
          </button>

          {showBusinessImpact && (
            <div
              className="mt-3 space-y-4 pl-3 border-l-2 border-gray-200 dark:border-gray-700"
              data-testid={SUMMARY_TEST_IDS.BUSINESS_IMPACT_SECTION}
            >
              <div>
                <h4
                  className="text-sm font-medium mb-1"
                  style={{ color: CIA_COMPONENT_COLORS.AVAILABILITY.PRIMARY }}
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
                  className="text-sm font-medium mb-1"
                  style={{ color: CIA_COMPONENT_COLORS.INTEGRITY.PRIMARY }}
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
                  className="text-sm font-medium mb-1"
                  style={{
                    color: CIA_COMPONENT_COLORS.CONFIDENTIALITY.PRIMARY,
                  }}
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
            status={getSecurityLevelBadgeVariant(securityLevel)}
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

        {/* Data Classifications */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div
            className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg border-l-4"
            style={{
              borderLeftColor: CIA_COMPONENT_COLORS.CONFIDENTIALITY.PRIMARY,
            }}
          >
            <h4 className="text-md font-medium mb-2">
              Data Protection Classification
            </h4>
            <div className="grid grid-cols-1 gap-2">
              <KeyValuePair
                label="Classification Level"
                value={confidentialityLevel}
                testId={`${testId}-classification-level`}
              />
              <KeyValuePair
                label="Information Sensitivity"
                value={ciaContentService.getInformationSensitivity(
                  confidentialityLevel
                )}
                testId={`${testId}-information-sensitivity`}
              />
            </div>
          </div>

          <div
            className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg border-l-4"
            style={{ borderLeftColor: CIA_COMPONENT_COLORS.INTEGRITY.PRIMARY }}
          >
            <h4 className="text-md font-medium mb-2">
              Data Integrity Classification
            </h4>
            <div className="grid grid-cols-1 gap-2">
              <KeyValuePair
                label="Protection Level"
                value={integrityLevel}
                testId={`${testId}-protection-level`}
              />
              {(() => {
                const details = ciaContentService.getTechnicalImplementation(
                  "integrity",
                  integrityLevel
                );
                return details &&
                  "validationMethod" in details &&
                  details.validationMethod ? (
                  <KeyValuePair
                    label="Validation Technique"
                    value={details.validationMethod as string}
                    testId={`${testId}-validation-technique`}
                  />
                ) : null;
              })()}
            </div>
          </div>
        </div>

        {/* Availability Metrics */}
        <button
          onClick={() => setShowMetrics(!showMetrics)}
          className="flex items-center justify-between w-full text-left font-medium text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors mb-2"
          data-testid={SUMMARY_TEST_IDS.METRICS_TOGGLE}
          aria-expanded={showMetrics}
        >
          <span>Availability Metrics</span>
          <span
            className="transition-transform duration-200"
            style={{ transform: showMetrics ? "rotate(180deg)" : "none" }}
          >
            {showMetrics ? "▲" : "▼"}
          </span>
        </button>

        {showMetrics && (
          <div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4"
            data-testid={SUMMARY_TEST_IDS.METRICS_SECTION}
          >
            {(() => {
              const details = ciaContentService.getComponentDetails(
                "availability",
                availabilityLevel
              );
              return (
                <>
                  <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg text-center">
                    <h5 className="text-sm font-medium mb-2">Uptime</h5>
                    <p className="text-lg font-bold">
                      {details?.uptime || "N/A"}
                    </p>
                  </div>
                  <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg text-center">
                    <h5 className="text-sm font-medium mb-2">
                      Mean Time To Recovery (MTTR)
                    </h5>
                    <p className="text-lg font-bold">
                      {details?.mttr || "N/A"}
                    </p>
                  </div>
                  <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg text-center">
                    <h5 className="flex items-center justify-center text-sm font-medium mb-2">
                      <span className="mr-1">⏱️</span>Recovery Time Objective
                      (RTO)
                    </h5>
                    <p className="text-lg font-bold">{details?.rto || "N/A"}</p>
                  </div>
                  <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg text-center">
                    <h5 className="flex items-center justify-center text-sm font-medium mb-2">
                      <span className="mr-1">💾</span>Recovery Point Objective
                      (RPO)
                    </h5>
                    <p className="text-lg font-bold">{details?.rpo || "N/A"}</p>
                  </div>
                </>
              );
            })()}
          </div>
        )}
      </div>
    </WidgetContainer>
  );
};

export default SecuritySummaryWidget;
