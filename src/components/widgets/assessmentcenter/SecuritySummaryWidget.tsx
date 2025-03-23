import React, { useMemo } from "react";
import { WIDGET_ICONS, WIDGET_TITLES } from "../../../constants/appConstants";
import { useCIAContentService } from "../../../hooks/useCIAContentService";
import { SecurityLevel } from "../../../types/cia";
import {
  calculateOverallSecurityLevel,
  getSecurityLevelValue,
} from "../../../utils/securityLevelUtils";
import SecurityLevelBadge from "../../common/SecurityLevelBadge";
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
  securityLevel,
  className = "",
  testId = "security-summary-widget",
}) => {
  // Use the content service for CIA security details
  const { ciaContentService } = useCIAContentService();

  // Calculate overall security level
  const overallSecurityLevel = useMemo(() => {
    return calculateOverallSecurityLevel(
      availabilityLevel,
      integrityLevel,
      confidentialityLevel
    );
  }, [availabilityLevel, integrityLevel, confidentialityLevel]);

  // Calculate a normalized security score (0-100)
  const securityScore = useMemo(() => {
    const availabilityValue = getSecurityLevelValue(availabilityLevel);
    const integrityValue = getSecurityLevelValue(integrityLevel);
    const confidentialityValue = getSecurityLevelValue(confidentialityLevel);

    const totalValue =
      availabilityValue + integrityValue + confidentialityValue;
    const maxPossibleValue = 12; // 3 components × max value of 4
    return Math.round((totalValue / maxPossibleValue) * 100);
  }, [availabilityLevel, integrityLevel, confidentialityLevel]);

  // Get compliance status based on security levels
  const complianceStatus = useMemo(() => {
    try {
      // Get compliance status from the service if available
      const service = ciaContentService?.getComplianceStatus?.(
        availabilityLevel,
        integrityLevel,
        confidentialityLevel
      );

      if (service) {
        return service;
      }

      // Fallback logic if service isn't available
      if (securityScore >= 75) {
        return "Compliant with major frameworks";
      } else if (securityScore >= 50) {
        return "Partially compliant";
      } else {
        return "Non-compliant with most frameworks";
      }
    } catch (error) {
      console.error("Error determining compliance status:", error);
      return "Compliance status unavailable";
    }
  }, [
    ciaContentService,
    availabilityLevel,
    integrityLevel,
    confidentialityLevel,
    securityScore,
  ]);

  // Determine risk status based on security score
  const riskStatus = useMemo(() => {
    if (securityScore >= 80) return "Low Risk";
    if (securityScore >= 60) return "Moderate Risk";
    if (securityScore >= 40) return "Elevated Risk";
    if (securityScore >= 20) return "High Risk";
    return "Critical Risk";
  }, [securityScore]);

  // Determine compliance badge status
  const complianceBadgeStatus = useMemo(() => {
    if (securityScore >= 75) return "success";
    if (securityScore >= 50) return "warning";
    return "error";
  }, [securityScore]);

  // Determine risk badge status
  const riskBadgeStatus = useMemo(() => {
    if (securityScore >= 80) return "success";
    if (securityScore >= 60) return "info";
    if (securityScore >= 40) return "warning";
    return "error";
  }, [securityScore]);

  return (
    <WidgetContainer
      title={WIDGET_TITLES.SECURITY_SUMMARY}
      icon={WIDGET_ICONS.SECURITY_SUMMARY}
      className={className}
      testId={testId}
    >
      <div className="p-4 space-y-6">
        {/* Overall security level display */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
          <div>
            <h3
              className="text-lg font-medium"
              data-testid="security-summary-title"
            >
              Overall Security Level
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Based on CIA triad components
            </p>
          </div>
          <div className="mt-2 md:mt-0">
            <div
              className={`text-2xl font-bold ${getSecurityLevelColorClass(
                overallSecurityLevel
              )}`}
              data-testid="security-summary-overall-level"
            >
              {overallSecurityLevel}
            </div>
          </div>
        </div>

        {/* CIA triad components summary */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Availability */}
          <div
            className="p-3 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700"
            data-testid="security-summary-availability"
          >
            <div className="flex justify-between items-center mb-2">
              <div className="text-sm font-medium flex items-center">
                <span className="text-blue-500 dark:text-blue-400 mr-2">
                  ⏱️
                </span>
                Availability
              </div>
              <SecurityLevelBadge
                category=""
                level={availabilityLevel}
                colorClass="bg-blue-100 dark:bg-blue-900 dark:bg-opacity-20"
                textClass="text-blue-800 dark:text-blue-300"
                testId="security-summary-availability-badge"
              />
            </div>
            <p className="text-xs text-gray-600 dark:text-gray-400">
              {getLevelDescription("availability", availabilityLevel)}
            </p>
          </div>

          {/* Integrity */}
          <div
            className="p-3 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700"
            data-testid="security-summary-integrity"
          >
            <div className="flex justify-between items-center mb-2">
              <div className="text-sm font-medium flex items-center">
                <span className="text-green-500 dark:text-green-400 mr-2">
                  ✓
                </span>
                Integrity
              </div>
              <SecurityLevelBadge
                category=""
                level={integrityLevel}
                colorClass="bg-green-100 dark:bg-green-900 dark:bg-opacity-20"
                textClass="text-green-800 dark:text-green-300"
                testId="security-summary-integrity-badge"
              />
            </div>
            <p className="text-xs text-gray-600 dark:text-gray-400">
              {getLevelDescription("integrity", integrityLevel)}
            </p>
          </div>

          {/* Confidentiality */}
          <div
            className="p-3 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700"
            data-testid="security-summary-confidentiality"
          >
            <div className="flex justify-between items-center mb-2">
              <div className="text-sm font-medium flex items-center">
                <span className="text-purple-500 dark:text-purple-400 mr-2">
                  🔒
                </span>
                Confidentiality
              </div>
              <SecurityLevelBadge
                category=""
                level={confidentialityLevel}
                colorClass="bg-purple-100 dark:bg-purple-900 dark:bg-opacity-20"
                textClass="text-purple-800 dark:text-purple-300"
                testId="security-summary-confidentiality-badge"
              />
            </div>
            <p className="text-xs text-gray-600 dark:text-gray-400">
              {getLevelDescription("confidentiality", confidentialityLevel)}
            </p>
          </div>
        </div>

        {/* Security score and compliance status */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Security Score */}
          <div className="p-3 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
            <div className="text-sm font-medium mb-1 flex items-center">
              <span className="text-blue-500 dark:text-blue-400 mr-2">📊</span>
              Security Score
            </div>
            <div className="flex items-center">
              <div
                className="text-2xl font-bold"
                data-testid="security-summary-score"
              >
                {securityScore}%
              </div>
            </div>
          </div>

          {/* Compliance Status */}
          <div className="p-3 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
            <div className="text-sm font-medium mb-1 flex items-center">
              <span className="text-green-500 dark:text-green-400 mr-2">
                📋
              </span>
              Compliance Status
            </div>
            <div className="flex items-center">
              <StatusBadge
                status={complianceBadgeStatus}
                testId="security-summary-compliance-status"
              >
                {typeof complianceStatus === "string"
                  ? complianceStatus
                  : "Compliance status available"}
              </StatusBadge>
            </div>
          </div>

          {/* Risk Level */}
          <div className="p-3 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
            <div className="text-sm font-medium mb-1 flex items-center">
              <span className="text-red-500 dark:text-red-400 mr-2">⚠️</span>
              Risk Level
            </div>
            <div className="flex items-center">
              <StatusBadge
                status={riskBadgeStatus}
                testId="security-summary-risk-level"
              >
                {riskStatus}
              </StatusBadge>
            </div>
          </div>
        </div>

        {/* Recommendations */}
        <div className="p-3 bg-blue-50 dark:bg-blue-900 dark:bg-opacity-20 rounded-lg border border-blue-200 dark:border-blue-800">
          <div className="flex items-center mb-2">
            <span className="text-blue-500 dark:text-blue-400 mr-2">💡</span>
            <h3 className="font-medium">Recommendations</h3>
          </div>
          <ul className="text-sm space-y-1 list-disc list-inside text-gray-600 dark:text-gray-300">
            {getRecommendations(
              availabilityLevel,
              integrityLevel,
              confidentialityLevel
            ).map((recommendation, index) => (
              <li
                key={index}
                data-testid={`security-summary-recommendation-${index}`}
              >
                {recommendation}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </WidgetContainer>
  );
};

// Helper function to get security level color classes
function getSecurityLevelColorClass(level: SecurityLevel): string {
  switch (level) {
    case "Very High":
      return "text-purple-600 dark:text-purple-400";
    case "High":
      return "text-green-600 dark:text-green-400";
    case "Moderate":
      return "text-blue-600 dark:text-blue-400";
    case "Low":
      return "text-yellow-600 dark:text-yellow-400";
    case "None":
    default:
      return "text-red-600 dark:text-red-400";
  }
}

// Helper function to get level descriptions
function getLevelDescription(component: string, level: SecurityLevel): string {
  const availabilityDescriptions: Record<SecurityLevel, string> = {
    None: "No uptime guarantees or recovery procedures",
    Low: "Basic uptime (95%) with manual recovery processes",
    Moderate: "Standard uptime (99%) with documented recovery",
    High: "Enhanced uptime (99.9%) with rapid recovery capabilities",
    "Very High": "Maximum uptime (99.99%) with near-instantaneous recovery",
  };

  const integrityDescriptions: Record<SecurityLevel, string> = {
    None: "No data validation or protection against unauthorized changes",
    Low: "Basic data validation with limited audit trails",
    Moderate: "Automated integrity checks with comprehensive auditing",
    High: "Cryptographic verification with secure hash validation",
    "Very High": "Advanced integrity protection with blockchain validation",
  };

  const confidentialityDescriptions: Record<SecurityLevel, string> = {
    None: "No access controls or data protection measures",
    Low: "Basic access control with minimal encryption",
    Moderate: "Role-based access control with standard encryption",
    High: "Multi-factor authentication with advanced encryption",
    "Very High": "Zero-trust architecture with military-grade protection",
  };

  if (component === "availability")
    return availabilityDescriptions[level] || "Description not available";
  if (component === "integrity")
    return integrityDescriptions[level] || "Description not available";
  if (component === "confidentiality")
    return confidentialityDescriptions[level] || "Description not available";
  return "Description not available";
}

// Helper function to generate recommendations based on security levels
function getRecommendations(
  availabilityLevel: SecurityLevel,
  integrityLevel: SecurityLevel,
  confidentialityLevel: SecurityLevel
): string[] {
  const recommendations: string[] = [];

  // Add recommendations based on availability level
  if (getSecurityLevelValue(availabilityLevel) < 2) {
    recommendations.push(
      "Improve availability controls by implementing robust backup and recovery procedures"
    );
  }

  // Add recommendations based on integrity level
  if (getSecurityLevelValue(integrityLevel) < 2) {
    recommendations.push(
      "Enhance data integrity through automated validation and cryptographic verification"
    );
  }

  // Add recommendations based on confidentiality level
  if (getSecurityLevelValue(confidentialityLevel) < 2) {
    recommendations.push(
      "Strengthen confidentiality by implementing role-based access controls and encryption"
    );
  }

  // Add balanced approach recommendation if levels are very uneven
  const levels = [
    getSecurityLevelValue(availabilityLevel),
    getSecurityLevelValue(integrityLevel),
    getSecurityLevelValue(confidentialityLevel),
  ];

  const maxLevel = Math.max(...levels);
  const minLevel = Math.min(...levels);

  if (maxLevel - minLevel >= 2) {
    recommendations.push(
      "Consider a more balanced security approach across all CIA triad components"
    );
  }

  // If no specific recommendations, add general one
  if (recommendations.length === 0) {
    recommendations.push(
      "Continue maintaining your current security posture with regular reviews"
    );
  }

  return recommendations;
}

// Export the component directly without HOC
export default SecuritySummaryWidget;
