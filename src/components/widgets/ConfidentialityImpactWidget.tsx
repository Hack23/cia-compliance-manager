import React from "react";
import { ConfidentialityImpactWidgetProps } from "../../types/widgets";
import { WIDGET_TEST_IDS } from "../../constants/testIds";

const ConfidentialityImpactWidget: React.FC<
  ConfidentialityImpactWidgetProps
> = ({
  level = "Moderate",
  options,
  testId = WIDGET_TEST_IDS.CONFIDENTIALITY_IMPACT_WIDGET,
}) => {
  // Default options if none provided - ensure these are type-safe
  const defaultOptions: Record<
    string,
    {
      impact: string;
      businessImpact: string;
      recommendations: string[];
    }
  > = {
    None: {
      impact: "No data protection, high risk of unauthorized access",
      businessImpact:
        "Critical vulnerability to data breaches and confidentiality violations",
      recommendations: [
        "Implement basic access controls",
        "Create data classification policy",
      ],
    },
    Low: {
      impact: "Basic access controls, protection against casual snooping only",
      businessImpact:
        "Significant vulnerability to targeted attacks, suitable for public data only",
      recommendations: [
        "Implement proper authentication",
        "Add basic encryption for sensitive data",
      ],
    },
    Moderate: {
      impact: "Standard protection mechanisms for sensitive data",
      businessImpact:
        "Reasonable protection for business data, some vulnerability to sophisticated attacks",
      recommendations: [
        "Deploy data loss prevention tools",
        "Implement strong access controls",
      ],
    },
    High: {
      impact: "Strong protection for sensitive information",
      businessImpact: "Robust protection for confidential business information",
      recommendations: [
        "Implement comprehensive data encryption",
        "Deploy advanced access controls",
      ],
    },
    "Very High": {
      impact: "Maximum protection mechanisms for highly sensitive data",
      businessImpact:
        "Enterprise-grade protection for critical business secrets",
      recommendations: [
        "Implement military-grade encryption",
        "Deploy zero-trust security model",
      ],
    },
  };

  // Use type assertion to ensure finalOptions is properly typed
  const finalOptions = (options || defaultOptions) as typeof defaultOptions;

  // Fix: Ensure we have a valid level key or fall back to Moderate
  const normalizedLevel = (level || "Moderate") as keyof typeof finalOptions;

  // Fix: Always get a valid data object with a guaranteed fallback to Moderate
  const levelData = finalOptions[normalizedLevel] ||
    finalOptions["Moderate"] || {
      impact: "Standard protection mechanisms for sensitive data",
      businessImpact: "Reasonable protection for business data",
      recommendations: ["Implement security controls"],
    };

  return (
    <div
      data-testid={testId}
      className="confidentiality-impact-widget p-4 border rounded-lg bg-white dark:bg-gray-800"
    >
      <div className="mb-4">
        <h3 className="text-lg font-semibold">
          Confidentiality Impact:{" "}
          <span className="text-purple-600">{level}</span>
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
          {levelData.impact}
        </p>
      </div>

      <div className="mb-4">
        <h4 className="font-medium text-sm mb-1">Business Impact</h4>
        <p
          className="text-sm p-2 bg-gray-50 dark:bg-gray-700 rounded"
          data-testid="business-impact"
        >
          {levelData.businessImpact}
        </p>
      </div>

      <div className="mb-2">
        <h4 className="font-medium text-sm mb-1">Recommendations</h4>
        <ul className="list-disc list-inside text-sm">
          {(levelData.recommendations || []).map((rec, index) => (
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
        <p>
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
