import React, { useState } from "react";
import { SECURITY_LEVELS } from "../../constants/appConstants";
import { useCIAOptions } from "../../hooks/useCIAOptions";
import { SECURITY_SUMMARY_TEST_IDS } from "../../constants/testIds";

interface SecuritySummaryWidgetProps {
  availabilityLevel: string;
  integrityLevel: string;
  confidentialityLevel: string;
  securityLevel: string;
  testId?: string;
}

const SecuritySummaryWidget: React.FC<SecuritySummaryWidgetProps> = ({
  availabilityLevel = "None",
  integrityLevel = "None",
  confidentialityLevel = "None",
  securityLevel = "None",
  testId = SECURITY_SUMMARY_TEST_IDS.SECURITY_SUMMARY_PREFIX,
}) => {
  // State for expandable sections
  const [expandedSections, setExpandedSections] = useState<{
    technical: boolean;
    business: boolean;
    metrics: boolean;
  }>({
    technical: false,
    business: false,
    metrics: false,
  });

  const toggleSection = (section: "technical" | "business" | "metrics") => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  // Use the hook to get the ROI_ESTIMATES
  const { ROI_ESTIMATES } = useCIAOptions();

  return (
    <div data-testid={testId} className="security-summary">
      <div className="mb-4 text-center">
        <h3
          className="text-xl font-semibold"
          data-testid={`${testId}-overall-level`}
        >
          Overall Security Level:
          <span className={`ml-2 ${getSecurityLevelColor(securityLevel)}`}>
            {securityLevel}
          </span>
        </h3>
        <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
          {getSecurityLevelDescription(securityLevel)}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="p-3 border rounded-lg bg-blue-50 dark:bg-blue-900 dark:border-blue-800">
          <h4 className="font-medium">Availability</h4>
          <div
            className={`text-lg ${getSecurityLevelColor(availabilityLevel)}`}
            data-testid={`${testId}-availability-level`}
          >
            {availabilityLevel}
          </div>
        </div>

        <div className="p-3 border rounded-lg bg-green-50 dark:bg-green-900 dark:border-green-800">
          <h4 className="font-medium">Integrity</h4>
          <div
            className={`text-lg ${getSecurityLevelColor(integrityLevel)}`}
            data-testid={`${testId}-integrity-level`}
          >
            {integrityLevel}
          </div>
        </div>

        <div className="p-3 border rounded-lg bg-purple-50 dark:bg-purple-900 dark:border-purple-800">
          <h4 className="font-medium">Confidentiality</h4>
          <div
            className={`text-lg ${getSecurityLevelColor(confidentialityLevel)}`}
            data-testid={`${testId}-confidentiality-level`}
          >
            {confidentialityLevel}
          </div>
        </div>
      </div>

      <div className="mt-4 p-3 border rounded-lg bg-gray-50 dark:bg-gray-800">
        <h4 className="font-medium mb-1">Security Implications</h4>
        <p className="text-sm" data-testid={`${testId}-implications`}>
          {getSecurityImplications(
            availabilityLevel,
            integrityLevel,
            confidentialityLevel
          )}
        </p>
      </div>

      {/* Technical Implementation Section */}
      <div className="mt-4">
        <button
          className="flex justify-between items-center w-full p-3 border rounded-lg bg-gray-50 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
          onClick={() => toggleSection("technical")}
          data-testid="technical-section-toggle"
          aria-expanded={expandedSections.technical}
        >
          <h4 className="font-medium">Technical Implementation</h4>
          <span>{expandedSections.technical ? "▲" : "▼"}</span>
        </button>
        {expandedSections.technical && (
          <div className="p-3 border-b border-l border-r rounded-b-lg bg-white dark:bg-gray-800">
            <div
              className="text-sm"
              data-testid="technical-implementation-details"
            >
              {getTechnicalImplementation(securityLevel)}
            </div>
          </div>
        )}
      </div>

      {/* Business Impact Section */}
      <div className="mt-2">
        <button
          className="flex justify-between items-center w-full p-3 border rounded-lg bg-gray-50 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
          onClick={() => toggleSection("business")}
          data-testid="business-impact-toggle"
          aria-expanded={expandedSections.business}
        >
          <h4 className="font-medium">Business Impact</h4>
          <span>{expandedSections.business ? "▲" : "▼"}</span>
        </button>
        {expandedSections.business && (
          <div className="p-3 border-b border-l border-r rounded-b-lg bg-white dark:bg-gray-800">
            <div className="text-sm" data-testid="business-impact-details">
              {getBusinessImpact(securityLevel)}
            </div>
            <div className="mt-2 flex justify-between text-sm">
              <div>
                <span className="font-medium">ROI Estimate: </span>
                <span data-testid="roi-estimate-summary-value">
                  {getRoiEstimate(securityLevel)}
                </span>
              </div>
              <div>
                <span className="font-medium">Implementation Time: </span>
                <span>{getImplementationTime(securityLevel)}</span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Metrics Section */}
      <div className="mt-2">
        <button
          className="flex justify-between items-center w-full p-3 border rounded-lg bg-gray-50 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
          onClick={() => toggleSection("metrics")}
          data-testid="metrics-toggle"
          aria-expanded={expandedSections.metrics}
        >
          <h4 className="font-medium">Security Metrics</h4>
          <span>{expandedSections.metrics ? "▲" : "▼"}</span>
        </button>
        {expandedSections.metrics && (
          <div className="p-3 border-b border-l border-r rounded-b-lg bg-white dark:bg-gray-800">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h5 className="font-medium text-sm mb-1">
                  Key Performance Indicators
                </h5>
                <ul className="list-disc list-inside text-sm">
                  <li>
                    Security incidents: {getIncidentsMetric(securityLevel)}
                  </li>
                  <li>
                    Compliance score: {getComplianceScore(securityLevel)}%
                  </li>
                </ul>
              </div>
              <div>
                <h5 className="font-medium text-sm mb-1">Risk Assessment</h5>
                <ul className="list-disc list-inside text-sm">
                  <li>Risk level: {getRiskLevel(securityLevel)}</li>
                  <li>
                    Vulnerability score: {getVulnerabilityScore(securityLevel)}
                  </li>
                </ul>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Recommendations Section */}
      <div className="mt-4 p-3 border rounded-lg bg-gray-50 dark:bg-gray-700">
        <h4 className="font-medium mb-2" data-testid="recommendation-heading">
          Recommendations
        </h4>
        <ul className="list-disc list-inside space-y-1">
          {getRecommendations(securityLevel).map((rec, index) => (
            <li
              key={index}
              className="text-sm"
              data-testid={
                index === 0
                  ? "security-recommendation"
                  : `security-recommendation-${index}`
              }
            >
              {rec}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );

  function getRoiEstimate(level: string): string {
    switch (level) {
      case "Very High":
        return ROI_ESTIMATES.VERY_HIGH.returnRate || "450%";
      case "High":
        return ROI_ESTIMATES.HIGH.returnRate || "350%";
      case "Moderate":
        return ROI_ESTIMATES.MODERATE.returnRate || "200%";
      case "Low":
        return ROI_ESTIMATES.LOW.returnRate || "120%";
      default:
        return ROI_ESTIMATES.NONE.returnRate || "0%";
    }
  }
};

function getSecurityLevelColor(level: string): string {
  switch (level) {
    case "None":
      return "text-gray-500 dark:text-gray-400";
    case "Low":
      return "text-yellow-500 dark:text-yellow-400";
    case "Moderate":
      return "text-blue-500 dark:text-blue-400";
    case "High":
      return "text-green-600 dark:text-green-400";
    case "Very High":
      return "text-purple-600 dark:text-purple-400";
    default:
      return "text-gray-500 dark:text-gray-400";
  }
}

function getSecurityLevelDescription(level: string): string {
  switch (level) {
    case "None":
      return "Minimal or no security controls";
    case "Low":
      return "Basic security measures for non-critical systems";
    case "Moderate":
      return "Standard security controls for normal business functions";
    case "High":
      return "Strong protection for sensitive information and critical systems";
    case "Very High":
      return "Maximum security for highly sensitive systems and data";
    default:
      return "Security level not specified";
  }
}

function getSecurityImplications(
  availability: string,
  integrity: string,
  confidentiality: string
): string {
  // Generate a meaningful summary based on the combination of security levels
  const levels = [availability, integrity, confidentiality];
  const highestLevel =
    ["Very High", "High", "Moderate", "Low", "None"].find((level) =>
      levels.includes(level)
    ) || "None";

  const lowestLevel =
    ["None", "Low", "Moderate", "High", "Very High"].find((level) =>
      levels.includes(level)
    ) || "None";

  if (highestLevel === "Very High") {
    return "Your system requires enterprise-grade security controls across multiple dimensions. Implement comprehensive protection measures and consider consulting security specialists.";
  } else if (highestLevel === "High") {
    return "Your system needs robust security controls. Prioritize protection in your highest-rated areas while ensuring adequate coverage of all security aspects.";
  } else if (highestLevel === "Moderate") {
    return "Your system requires standard security measures with attention to balanced protection across availability, integrity, and confidentiality.";
  } else if (lowestLevel === "None" && highestLevel !== "None") {
    return "Your security posture has significant gaps. Consider upgrading the unprotected dimensions to ensure comprehensive security.";
  } else {
    return "Your current security posture is minimal. Consider increasing protection in all dimensions based on your risk tolerance and business requirements.";
  }
}

function getTechnicalImplementation(level: string): string {
  switch (level) {
    case "Very High":
      return "Implement enterprise-grade security architecture with defense in depth. Deploy advanced monitoring, automated incident response, and recovery systems. Enforce least privilege access controls and comprehensive encryption.";
    case "High":
      return "Implement robust security controls including strong authentication, encryption for sensitive data, and comprehensive monitoring. Establish incident response and disaster recovery procedures.";
    case "Moderate":
      return "Deploy standard security controls including basic authentication, access controls, and monitoring. Implement regular backup procedures and basic incident response plans.";
    case "Low":
      return "Implement basic security measures such as simple authentication, minimal access controls, and basic backup procedures.";
    default:
      return "No specific technical security measures implemented.";
  }
}

function getBusinessImpact(level: string): string {
  switch (level) {
    case "Very High":
      return "Provides maximum protection for critical business assets. Significantly reduces risk of breaches, data loss, and operational disruptions. Supports compliance with stringent regulatory requirements.";
    case "High":
      return "Offers strong protection for important business assets. Reduces risk of security incidents and supports regulatory compliance needs for sensitive data.";
    case "Moderate":
      return "Provides standard protection for business operations. Balances security costs with risk reduction for typical business applications.";
    case "Low":
      return "Offers minimal protection. May be acceptable for non-critical business functions with low sensitivity requirements.";
    default:
      return "Provides minimal or no business protection. Substantial risk of breaches, data loss, and operational disruptions.";
  }
}

function getImplementationTime(level: string): string {
  switch (level) {
    case "Very High":
      return "6-12 months";
    case "High":
      return "3-6 months";
    case "Moderate":
      return "1-3 months";
    case "Low":
      return "1-4 weeks";
    default:
      return "Minimal";
  }
}

function getIncidentsMetric(level: string): string {
  switch (level) {
    case "Very High":
      return "Reduced by 95%";
    case "High":
      return "Reduced by 80%";
    case "Moderate":
      return "Reduced by 60%";
    case "Low":
      return "Reduced by 30%";
    default:
      return "No reduction";
  }
}

function getComplianceScore(level: string): number {
  switch (level) {
    case "Very High":
      return 98;
    case "High":
      return 85;
    case "Moderate":
      return 70;
    case "Low":
      return 45;
    default:
      return 10;
  }
}

function getRiskLevel(level: string): string {
  switch (level) {
    case "Very High":
      return "Minimal";
    case "High":
      return "Low";
    case "Moderate":
      return "Medium";
    case "Low":
      return "High";
    default:
      return "Critical";
  }
}

function getVulnerabilityScore(level: string): string {
  switch (level) {
    case "Very High":
      return "0.1-1.0";
    case "High":
      return "1.1-3.0";
    case "Moderate":
      return "3.1-6.0";
    case "Low":
      return "6.1-8.0";
    default:
      return "8.1-10.0";
  }
}

function getRecommendations(level: string): string[] {
  switch (level) {
    case "Very High":
      return [
        "Maintain security controls with regular assessments and updates",
        "Perform penetration testing at least quarterly",
        "Conduct comprehensive security awareness training",
        "Implement advanced threat detection and prevention",
      ];
    case "High":
      return [
        "Enhance authentication with multi-factor mechanisms",
        "Implement robust access controls and review them regularly",
        "Deploy comprehensive monitoring and alerting",
        "Establish detailed incident response procedures",
      ];
    case "Moderate":
      return [
        "Implement standard authentication and access controls",
        "Deploy basic monitoring and alerting",
        "Establish regular backup procedures",
        "Create basic incident response plans",
      ];
    case "Low":
      return [
        "Implement basic authentication mechanisms",
        "Establish minimal access controls",
        "Set up basic backup procedures",
        "Document simple incident handling steps",
      ];
    default:
      return [
        "Implement basic security controls",
        "Create a security baseline assessment",
        "Identify critical assets and security requirements",
        "Develop a security improvement roadmap",
      ];
  }
}

export default SecuritySummaryWidget;
