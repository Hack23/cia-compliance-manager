import React from "react";
import { WIDGET_TEST_IDS } from "../../constants/testIds";
import {
  ConfidentialityImpactWidgetProps,
  ConfidentialityDetail,
} from "../../types/widgets";

const ConfidentialityImpactWidget: React.FC<
  ConfidentialityImpactWidgetProps
> = ({
  level = "Moderate",
  options,
  testId = WIDGET_TEST_IDS.CONFIDENTIALITY_IMPACT_WIDGET,
}) => {
  // Default options with improved business context
  const defaultOptions: Record<string, ConfidentialityDetail> = {
    None: {
      impact: "No data protection, high risk of unauthorized access",
      businessImpact:
        "Critical vulnerability to data breaches and confidentiality violations that could lead to reputation damage, customer loss, and legal liability",
      recommendations: [
        "Implement basic access controls and authentication",
        "Create data classification policy and handling procedures",
        "Conduct basic security awareness training for employees",
      ],
    },
    Low: {
      impact: "Basic access controls, protection against casual snooping only",
      businessImpact:
        "Significant vulnerability to targeted attacks, suitable for public data only. Limited protection for business information.",
      recommendations: [
        "Implement proper authentication with password policies",
        "Add basic encryption for sensitive data in transit",
        "Deploy access logging for security monitoring",
      ],
    },
    Moderate: {
      impact: "Standard protection mechanisms for sensitive data",
      businessImpact:
        "Reasonable protection for business data, providing adequate safeguards for most regulatory compliance needs with moderate risk acceptance",
      recommendations: [
        "Deploy data loss prevention tools to prevent unauthorized sharing",
        "Implement role-based access controls with regular review",
        "Enable encryption for sensitive data at rest and in transit",
      ],
    },
    High: {
      impact: "Strong protection for sensitive information",
      businessImpact:
        "Robust protection for confidential business information meeting most regulatory requirements and reducing data breach risk significantly",
      recommendations: [
        "Implement comprehensive data encryption for all sensitive information",
        "Deploy multi-factor authentication for all system access",
        "Establish advanced access controls with just-in-time provisioning",
      ],
    },
    "Very High": {
      impact: "Maximum protection mechanisms for highly sensitive data",
      businessImpact:
        "Enterprise-grade protection for critical business secrets with comprehensive safeguards exceeding regulatory requirements and minimizing breach risk",
      recommendations: [
        "Implement end-to-end encryption with strong key management",
        "Deploy zero-trust security model with continuous validation",
        "Establish comprehensive data protection governance and controls",
      ],
    },
  };

  // Use options provided or default, with null/undefined safety
  const finalOptions = options || defaultOptions;

  // Safe access to level data with fallback
  // Add adapter logic to handle both types (CIADetails and ConfidentialityDetail)
  const levelData = finalOptions[level] || finalOptions["Moderate"] || {};

  // Extract the important fields, handling both types of data
  const impact =
    levelData && "impact" in levelData
      ? levelData.impact
      : (levelData && levelData.description) || "";

  const businessImpact = (levelData && levelData.businessImpact) || "";
  const recommendations = (levelData && levelData.recommendations) || [];

  return (
    // ... existing component jsx with improved accessibility ...
    <div
      data-testid={testId}
      className="confidentiality-impact-widget p-4 border rounded-lg bg-white dark:bg-gray-800"
      aria-labelledby="confidentiality-impact-title"
    >
      <div className="mb-4">
        <h3 id="confidentiality-impact-title" className="text-lg font-semibold">
          Confidentiality Impact: {level}
        </h3>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          Analysis of confidentiality protection impact
        </p>
      </div>

      <div className="mb-4">
        <h4 className="font-medium text-sm mb-1">Security Impact</h4>
        <p
          className="text-sm p-2 bg-gray-50 dark:bg-gray-700 rounded"
          data-testid="confidentiality-impact"
        >
          {impact}
        </p>
      </div>

      <div className="mb-4">
        <h4 className="font-medium text-sm mb-1">Business Impact</h4>
        <p
          className="text-sm p-2 bg-gray-50 dark:bg-gray-700 rounded"
          data-testid="business-impact"
        >
          {businessImpact}
        </p>
      </div>

      <div className="mb-2">
        <h4 className="font-medium text-sm mb-1">Recommendations</h4>
        <ul
          className="list-disc list-inside text-sm"
          aria-label="Security recommendations"
        >
          {(recommendations || []).map((rec, index) => (
            <li
              key={index}
              className="p-1 bg-gray-50 dark:bg-gray-700 rounded mb-1"
              data-testid={`recommendation-${index}`}
            >
              {rec}
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-4 text-xs text-gray-500">
        <p data-testid="protection-level-text">
          <strong>Protection Level:</strong> {getProtectionLevel(level)}
        </p>
      </div>
    </div>
  );
};

// Helper function to determine protection level
function getProtectionLevel(level: string): string {
  switch (level) {
    case "None":
      return "No protection";
    case "Low":
      return "Basic protection";
    case "Moderate":
      return "Standard protection";
    case "High":
      return "Strong protection";
    case "Very High":
      return "Maximum protection";
    default:
      return "Unknown protection level";
  }
}

export default ConfidentialityImpactWidget;
