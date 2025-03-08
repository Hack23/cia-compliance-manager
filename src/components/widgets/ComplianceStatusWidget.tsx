import React from "react";
import { COMPLIANCE_STATUS_TEST_IDS } from "../../constants/testIds";

interface ComplianceStatusWidgetProps {
  availabilityLevel: string;
  integrityLevel: string;
  confidentialityLevel: string;
  testId?: string;
}

const ComplianceStatusWidget: React.FC<ComplianceStatusWidgetProps> = ({
  availabilityLevel = "None",
  integrityLevel = "None",
  confidentialityLevel = "None",
  testId = COMPLIANCE_STATUS_TEST_IDS.COMPLIANCE_STATUS_PREFIX,
}) => {
  // Generate compliance recommendations based on CIA levels
  const complianceStatus = generateComplianceStatus(
    availabilityLevel,
    integrityLevel,
    confidentialityLevel
  );

  return (
    <div data-testid={testId} className="compliance-status-widget">
      <div className="mb-4">
        <h3 className="text-lg font-medium mb-2">Compliance Recommendations</h3>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          Based on your security requirements, the following compliance
          standards may be relevant:
        </p>
      </div>

      <div className="space-y-3">
        {complianceStatus.map((item, index) => (
          <div
            key={index}
            className="p-3 border rounded-lg bg-white dark:bg-gray-800 shadow-sm"
            data-testid={`${testId}-item-${index}`}
          >
            <div className="flex items-center">
              <div
                className={`h-3 w-3 rounded-full ${getRelevanceColor(
                  item.relevance
                )} mr-2`}
              ></div>
              <h4 className="font-medium">{item.standard}</h4>
            </div>
            <div className="ml-5">
              <p className="text-sm mt-1">{item.description}</p>
              <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                Relevance: {item.relevance}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

function getRelevanceColor(relevance: string): string {
  switch (relevance) {
    case "High":
      return "bg-red-500";
    case "Moderate":
      return "bg-yellow-500";
    case "Low":
      return "bg-blue-500";
    default:
      return "bg-gray-400";
  }
}

interface ComplianceItem {
  standard: string;
  description: string;
  relevance: string;
}

function generateComplianceStatus(
  availability: string,
  integrity: string,
  confidentiality: string
): ComplianceItem[] {
  const complianceItems: ComplianceItem[] = [];

  // Add PCI DSS if confidentiality is high
  if (["High", "Very High"].includes(confidentiality)) {
    complianceItems.push({
      standard: "PCI DSS",
      description:
        "Payment Card Industry Data Security Standard - required for handling payment card data.",
      relevance: "High",
    });
  }

  // Add HIPAA if confidentiality and integrity are moderate or higher
  if (
    ["Moderate", "High", "Very High"].includes(confidentiality) &&
    ["Moderate", "High", "Very High"].includes(integrity)
  ) {
    complianceItems.push({
      standard: "HIPAA",
      description:
        "Health Insurance Portability and Accountability Act - required for handling protected health information.",
      relevance: ["High", "Very High"].includes(confidentiality)
        ? "High"
        : "Moderate",
    });
  }

  // Add GDPR if confidentiality is at least moderate
  if (["Moderate", "High", "Very High"].includes(confidentiality)) {
    complianceItems.push({
      standard: "GDPR",
      description:
        "General Data Protection Regulation - required for handling EU citizens' personal data.",
      relevance: ["High", "Very High"].includes(confidentiality)
        ? "High"
        : "Moderate",
    });
  }

  // Add ISO 27001 for all configurations, but with different relevance
  complianceItems.push({
    standard: "ISO 27001",
    description:
      "Information security management standard - recommended for all organizations.",
    relevance:
      getHighestLevel(availability, integrity, confidentiality) === "Very High"
        ? "High"
        : getHighestLevel(availability, integrity, confidentiality) === "High"
        ? "Moderate"
        : "Low",
  });

  // Add SOC 2 if availability and integrity are at least moderate
  if (
    ["Moderate", "High", "Very High"].includes(availability) &&
    ["Moderate", "High", "Very High"].includes(integrity)
  ) {
    complianceItems.push({
      standard: "SOC 2",
      description:
        "Service Organization Control 2 - focuses on security, availability, processing integrity, confidentiality, and privacy.",
      relevance: ["High", "Very High"].includes(integrity)
        ? "High"
        : "Moderate",
    });
  }

  // Add NIST for significant security requirements
  if (getHighestLevel(availability, integrity, confidentiality) !== "None") {
    complianceItems.push({
      standard: "NIST Cybersecurity Framework",
      description:
        "National Institute of Standards and Technology framework for improving critical infrastructure cybersecurity.",
      relevance:
        getHighestLevel(availability, integrity, confidentiality) ===
        "Very High"
          ? "High"
          : getHighestLevel(availability, integrity, confidentiality) === "High"
          ? "Moderate"
          : "Low",
    });
  }

  return complianceItems;
}

function getHighestLevel(
  availability: string,
  integrity: string,
  confidentiality: string
): string {
  const levels = ["None", "Low", "Moderate", "High", "Very High"];
  const maxA = levels.indexOf(availability);
  const maxI = levels.indexOf(integrity);
  const maxC = levels.indexOf(confidentiality);
  const maxIndex = Math.max(maxA, maxI, maxC);
  return levels[maxIndex] || "None"; // Add fallback to avoid undefined
}

export default ComplianceStatusWidget;
