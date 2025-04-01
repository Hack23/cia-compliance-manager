import React, { useMemo } from "react";
import { WIDGET_ICONS, WIDGET_TITLES } from "../../../constants/appConstants";
import { SECURITY_SUMMARY_TEST_IDS } from "../../../constants/testIds";
import { SecurityLevel } from "../../../types/cia";
import {
  calculateOverallSecurityLevel,
  getRiskLevelFromSecurityLevel,
  getSecurityLevelDescription,
  getStatusVariant,
} from "../../../utils/securityLevelUtils";
import SecurityLevelIndicator from "../../common/SecurityLevelIndicator";
import StatusBadge from "../../common/StatusBadge";
import WidgetContainer from "../../common/WidgetContainer";

/**
 * SecuritySummaryWidget props
 */
export interface SecuritySummaryWidgetProps {
  /**
   * Selected availability level
   */
  availabilityLevel: SecurityLevel;

  /**
   * Selected integrity level
   */
  integrityLevel: SecurityLevel;

  /**
   * Selected confidentiality level
   */
  confidentialityLevel: SecurityLevel;

  /**
   * Optional overall security level
   */
  securityLevel?: SecurityLevel;

  /**
   * Optional CSS class name
   */
  className?: string;

  /**
   * Optional test ID
   */
  testId?: string;
}

/**
 * Displays a summary of all security levels and overall security posture
 *
 * ## Business Perspective
 *
 * This widget provides an at-a-glance view of the organization's security posture
 * across the CIA triad, helping security officers and executives quickly understand
 * their current security stance and identify areas that need attention. 📊
 *
 * The calculated compliance and risk metrics help align technical security controls
 * with business and regulatory requirements. 💼
 */
const SecuritySummaryWidget: React.FC<SecuritySummaryWidgetProps> = ({
  availabilityLevel,
  integrityLevel,
  confidentialityLevel,
  className = "",
  testId = SECURITY_SUMMARY_TEST_IDS.WIDGET,
}) => {
  // Calculate overall security level
  const overallSecurityLevel = useMemo(
    () =>
      calculateOverallSecurityLevel(
        availabilityLevel,
        integrityLevel,
        confidentialityLevel
      ),
    [availabilityLevel, integrityLevel, confidentialityLevel]
  );

  // Get security level description for overall level
  const securityLevelDescription = useMemo(
    () => getSecurityLevelDescription(overallSecurityLevel),
    [overallSecurityLevel]
  );

  // Get quick security classification based on overall level
  const securityClassification = useMemo(() => {
    switch (overallSecurityLevel) {
      case "None":
        return "Minimal Security";
      case "Low":
        return "Basic Security";
      case "Moderate":
        return "Standard Security";
      case "High":
        return "Enhanced Security";
      case "Very High":
        return "Maximum Security";
      default:
        return "Standard Security";
    }
  }, [overallSecurityLevel]);

  // Estimated ROI based on security level
  const estimatedROI = useMemo(() => {
    switch (overallSecurityLevel) {
      case "None":
        return "0-1x";
      case "Low":
        return "1-2x";
      case "Moderate":
        return "2-3x";
      case "High":
        return "3-4x";
      case "Very High":
        return "4-5x";
      default:
        return "Unknown";
    }
  }, [overallSecurityLevel]);

  // Quick security recommendation
  const securityRecommendation = useMemo(() => {
    if (availabilityLevel === "None") {
      return "Critical: Implement basic availability controls for business continuity";
    }
    if (integrityLevel === "None") {
      return "Critical: Implement basic integrity controls for data reliability";
    }
    if (confidentialityLevel === "None") {
      return "Critical: Implement basic confidentiality controls for data protection";
    }

    // If no critical issues, provide general recommendation based on overall level
    if (overallSecurityLevel === "None" || overallSecurityLevel === "Low") {
      return "Enhance security controls across all components for basic protection";
    }
    return "Maintain current security posture with regular reassessments";
  }, [
    availabilityLevel,
    integrityLevel,
    confidentialityLevel,
    overallSecurityLevel,
  ]);

  // Key metrics for quick reference
  const availabilityMetrics = useMemo(() => {
    switch (availabilityLevel) {
      case "None":
        return { uptime: "<90%", rto: "N/A", rpo: "N/A", mttr: "N/A" };
      case "Low":
        return {
          uptime: "90-95%",
          rto: "<24 hours",
          rpo: "<24 hours",
          mttr: "<12 hours",
        };
      case "Moderate":
        return {
          uptime: "95-99%",
          rto: "<8 hours",
          rpo: "<4 hours",
          mttr: "<4 hours",
        };
      case "High":
        return {
          uptime: "99-99.9%",
          rto: "<4 hours",
          rpo: "<1 hour",
          mttr: "<1 hour",
        };
      case "Very High":
        return {
          uptime: "99.9-99.999%",
          rto: "<15 min",
          rpo: "<1 min",
          mttr: "<30 min",
        };
      default:
        return {
          uptime: "Unknown",
          rto: "Unknown",
          rpo: "Unknown",
          mttr: "Unknown",
        };
    }
  }, [availabilityLevel]);

  // Data protection classification based on confidentiality level
  const dataProtectionClass = useMemo(() => {
    switch (confidentialityLevel) {
      case "None":
        return "Public Information";
      case "Low":
        return "Internal Use";
      case "Moderate":
        return "Sensitive Data";
      case "High":
        return "Confidential Data";
      case "Very High":
        return "Restricted Data";
      default:
        return "Unclassified";
    }
  }, [confidentialityLevel]);

  // Business impact summary
  const businessImpactSummary = useMemo(() => {
    if (overallSecurityLevel === "None") {
      return "Critical business risk with minimal protection against threats";
    }
    if (overallSecurityLevel === "Low") {
      return "High business risk with basic protection against common threats";
    }
    if (overallSecurityLevel === "Moderate") {
      return "Moderate business risk with standard protection for most threats";
    }
    if (overallSecurityLevel === "High") {
      return "Low business risk with comprehensive protection against most threats";
    }
    return "Minimal business risk with advanced protection against sophisticated threats";
  }, [overallSecurityLevel]);

  return (
    <WidgetContainer
      title={WIDGET_TITLES.SECURITY_SUMMARY}
      icon={WIDGET_ICONS.SECURITY_SUMMARY}
      className={className}
      testId={testId}
    >
      <div className="p-4">
        {/* Security Classification Banner */}
        <div className="mb-4 p-3 bg-blue-50 dark:bg-blue-900 dark:bg-opacity-20 rounded-lg">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-lg font-medium">
                📊 {securityClassification}
              </h2>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {securityLevelDescription}
              </p>
            </div>
            <div className="text-right">
              <div className="text-xs text-gray-500 dark:text-gray-400">
                Estimated ROI
              </div>
              <div className="font-bold text-green-600 dark:text-green-400">
                {estimatedROI}
              </div>
            </div>
          </div>
        </div>

        {/* Overall Security Level */}
        <div className="mb-4">
          <h3 className="text-lg font-medium mb-2">Overall Security Level</h3>
          <div
            className="p-3 bg-gray-50 dark:bg-gray-800 rounded-lg"
            data-testid={SECURITY_SUMMARY_TEST_IDS.OVERALL_LEVEL}
          >
            <div className="flex items-center justify-between">
              <span className="text-gray-600 dark:text-gray-400">
                Overall Security:
              </span>
              <SecurityLevelIndicator level={overallSecurityLevel} size="lg" />
            </div>
            <p
              className="mt-2 text-sm text-gray-600 dark:text-gray-400"
              data-testid={SECURITY_SUMMARY_TEST_IDS.SUMMARY_DESCRIPTION}
            >
              {`This security profile provides ${overallSecurityLevel.toLowerCase()} level protection based on your selected components.`}
            </p>
          </div>
        </div>

        {/* Business Impact Summary */}
        <div className="mb-4 p-3 bg-indigo-50 dark:bg-indigo-900 dark:bg-opacity-20 rounded-lg">
          <h3 className="text-md font-medium mb-1">Business Impact</h3>
          <p className="text-sm">{businessImpactSummary}</p>
          <div className="mt-2 grid grid-cols-3 gap-2">
            <div className="text-center p-2 bg-white dark:bg-gray-800 rounded">
              <div className="text-xs text-gray-500 dark:text-gray-400">
                Confidentiality Impact
              </div>
              <div
                className={`text-sm font-medium ${
                  confidentialityLevel === "None" ||
                  confidentialityLevel === "Low"
                    ? "text-red-600"
                    : "text-green-600"
                }`}
              >
                {confidentialityLevel === "None"
                  ? "Critical"
                  : confidentialityLevel === "Low"
                  ? "High"
                  : confidentialityLevel === "Moderate"
                  ? "Medium"
                  : "Low"}
              </div>
            </div>
            <div className="text-center p-2 bg-white dark:bg-gray-800 rounded">
              <div className="text-xs text-gray-500 dark:text-gray-400">
                Integrity Impact
              </div>
              <div
                className={`text-sm font-medium ${
                  integrityLevel === "None" || integrityLevel === "Low"
                    ? "text-red-600"
                    : "text-green-600"
                }`}
              >
                {integrityLevel === "None"
                  ? "Critical"
                  : integrityLevel === "Low"
                  ? "High"
                  : integrityLevel === "Moderate"
                  ? "Medium"
                  : "Low"}
              </div>
            </div>
            <div className="text-center p-2 bg-white dark:bg-gray-800 rounded">
              <div className="text-xs text-gray-500 dark:text-gray-400">
                Availability Impact
              </div>
              <div
                className={`text-sm font-medium ${
                  availabilityLevel === "None" || availabilityLevel === "Low"
                    ? "text-red-600"
                    : "text-green-600"
                }`}
              >
                {availabilityLevel === "None"
                  ? "Critical"
                  : availabilityLevel === "Low"
                  ? "High"
                  : availabilityLevel === "Moderate"
                  ? "Medium"
                  : "Low"}
              </div>
            </div>
          </div>
        </div>

        {/* Key Metrics Dashboard */}
        <div className="mb-4">
          <h3 className="text-lg font-medium mb-2">Key Security Metrics</h3>
          <div className="grid grid-cols-1 gap-4">
            {/* Availability Metrics */}
            <div className="p-3 bg-blue-50 dark:bg-blue-900 dark:bg-opacity-20 rounded-lg">
              <h4 className="text-md font-medium flex items-center mb-2">
                <span className="mr-2">⏱️</span>Availability Metrics
              </h4>
              <div className="grid grid-cols-4 gap-2">
                <div className="p-2 bg-white dark:bg-gray-800 rounded text-center">
                  <div className="text-xs text-gray-500 dark:text-gray-400">
                    Uptime
                  </div>
                  <div className="text-sm font-semibold">
                    {availabilityMetrics.uptime}
                  </div>
                </div>
                <div className="p-2 bg-white dark:bg-gray-800 rounded text-center">
                  <div className="text-xs text-gray-500 dark:text-gray-400">
                    RTO
                  </div>
                  <div className="text-sm font-semibold">
                    {availabilityMetrics.rto}
                  </div>
                </div>
                <div className="p-2 bg-white dark:bg-gray-800 rounded text-center">
                  <div className="text-xs text-gray-500 dark:text-gray-400">
                    RPO
                  </div>
                  <div className="text-sm font-semibold">
                    {availabilityMetrics.rpo}
                  </div>
                </div>
                <div className="p-2 bg-white dark:bg-gray-800 rounded text-center">
                  <div className="text-xs text-gray-500 dark:text-gray-400">
                    MTTR
                  </div>
                  <div className="text-sm font-semibold">
                    {availabilityMetrics.mttr}
                  </div>
                </div>
              </div>
            </div>

            {/* Data Protection Classification */}
            <div className="p-3 bg-purple-50 dark:bg-purple-900 dark:bg-opacity-20 rounded-lg">
              <h4 className="text-md font-medium flex items-center mb-2">
                <span className="mr-2">🔒</span>Data Protection Classification
              </h4>
              <div className="flex items-center justify-between">
                <span className="text-sm">Classification Level:</span>
                <span
                  className={`text-sm font-medium ${
                    confidentialityLevel === "High" ||
                    confidentialityLevel === "Very High"
                      ? "text-purple-600 dark:text-purple-400"
                      : "text-gray-600 dark:text-gray-400"
                  }`}
                >
                  {dataProtectionClass}
                </span>
              </div>
              <div className="mt-2 text-xs text-gray-600 dark:text-gray-400">
                {confidentialityLevel === "None"
                  ? "No data protection requirements"
                  : `This classification requires ${confidentialityLevel.toLowerCase()} level confidentiality controls`}
              </div>
            </div>
          </div>
        </div>

        {/* Security Recommendation */}
        <div className="mb-4 p-3 bg-yellow-50 dark:bg-yellow-900 dark:bg-opacity-20 rounded-lg">
          <h3 className="text-md font-medium flex items-center">
            <span className="mr-2">💡</span>Security Recommendation
          </h3>
          <p className="text-sm mt-1">{securityRecommendation}</p>

          {/* Visual security status indicators */}
          <div className="mt-3 flex items-center space-x-2">
            <span className="text-xs text-gray-500">Security Status:</span>
            <span
              className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${
                overallSecurityLevel === "None" ||
                overallSecurityLevel === "Low"
                  ? "bg-red-100 text-red-800 dark:bg-red-900 dark:bg-opacity-20 dark:text-red-300"
                  : overallSecurityLevel === "Moderate"
                  ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:bg-opacity-20 dark:text-yellow-300"
                  : "bg-green-100 text-green-800 dark:bg-green-900 dark:bg-opacity-20 dark:text-green-300"
              }`}
            >
              {overallSecurityLevel === "None" || overallSecurityLevel === "Low"
                ? "At Risk"
                : overallSecurityLevel === "Moderate"
                ? "Adequate"
                : "Protected"}
            </span>
          </div>
        </div>

        <h3 className="text-lg font-medium mb-2">Component Security Levels</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Confidentiality Card */}
          <div
            className="p-3 bg-purple-50 dark:bg-purple-900 dark:bg-opacity-20 rounded-lg"
            data-testid={SECURITY_SUMMARY_TEST_IDS.CONFIDENTIALITY_CARD}
          >
            <div className="flex items-center mb-2">
              <span className="text-xl mr-2">🔒</span>
              <h4 className="font-medium">Confidentiality</h4>
            </div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-gray-600 dark:text-gray-400">
                Level:
              </span>
              <span
                className="font-medium"
                data-testid={SECURITY_SUMMARY_TEST_IDS.CONFIDENTIALITY_LEVEL}
              >
                <SecurityLevelIndicator level={confidentialityLevel} />
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600 dark:text-gray-400">
                Risk:
              </span>
              <span
                data-testid={SECURITY_SUMMARY_TEST_IDS.CONFIDENTIALITY_RISK}
              >
                <StatusBadge
                  status={getStatusVariant(
                    getRiskLevelFromSecurityLevel(confidentialityLevel)
                  )}
                  size="sm"
                >
                  {getRiskLevelFromSecurityLevel(confidentialityLevel)}
                </StatusBadge>
              </span>
            </div>
          </div>

          {/* Integrity Card */}
          <div
            className="p-3 bg-green-50 dark:bg-green-900 dark:bg-opacity-20 rounded-lg"
            data-testid={SECURITY_SUMMARY_TEST_IDS.INTEGRITY_CARD}
          >
            <div className="flex items-center mb-2">
              <span className="text-xl mr-2">✓</span>
              <h4 className="font-medium">Integrity</h4>
            </div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-gray-600 dark:text-gray-400">
                Level:
              </span>
              <span
                className="font-medium"
                data-testid={SECURITY_SUMMARY_TEST_IDS.INTEGRITY_LEVEL}
              >
                <SecurityLevelIndicator level={integrityLevel} />
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600 dark:text-gray-400">
                Risk:
              </span>
              <span data-testid={SECURITY_SUMMARY_TEST_IDS.INTEGRITY_RISK}>
                <StatusBadge
                  status={getStatusVariant(
                    getRiskLevelFromSecurityLevel(integrityLevel)
                  )}
                  size="sm"
                >
                  {getRiskLevelFromSecurityLevel(integrityLevel)}
                </StatusBadge>
              </span>
            </div>
          </div>

          {/* Availability Card */}
          <div
            className="p-3 bg-blue-50 dark:bg-blue-900 dark:bg-opacity-20 rounded-lg"
            data-testid={SECURITY_SUMMARY_TEST_IDS.AVAILABILITY_CARD}
          >
            <div className="flex items-center mb-2">
              <span className="text-xl mr-2">⏱️</span>
              <h4 className="font-medium">Availability</h4>
            </div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-gray-600 dark:text-gray-400">
                Level:
              </span>
              <span
                className="font-medium"
                data-testid={SECURITY_SUMMARY_TEST_IDS.AVAILABILITY_LEVEL}
              >
                <SecurityLevelIndicator level={availabilityLevel} />
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600 dark:text-gray-400">
                Risk:
              </span>
              <span data-testid={SECURITY_SUMMARY_TEST_IDS.AVAILABILITY_RISK}>
                <StatusBadge
                  status={getStatusVariant(
                    getRiskLevelFromSecurityLevel(availabilityLevel)
                  )}
                  size="sm"
                >
                  {getRiskLevelFromSecurityLevel(availabilityLevel)}
                </StatusBadge>
              </span>
            </div>
          </div>
        </div>
      </div>
    </WidgetContainer>
  );
};

export default SecuritySummaryWidget;
