import React from "react";
import {
  FRAMEWORK_TEST_IDS,
  createDynamicTestId,
} from "../../constants/testIds";
import {
  COMPLIANCE_FRAMEWORKS,
  UI_ICONS,
  COMPLIANCE_STATUS,
} from "../../constants/appConstants";

interface ComplianceStatusWidgetProps {
  availabilityLevel?: string;
  integrityLevel?: string;
  confidentialityLevel?: string;
  // Add backward compatibility props
  availability?: string;
  integrity?: string;
  confidentiality?: string;
  testId?: string;
}

const ComplianceStatusWidget: React.FC<ComplianceStatusWidgetProps> = ({
  availabilityLevel = "None",
  integrityLevel = "None",
  confidentialityLevel = "None",
  // Use backward compatibility props if primary props aren't provided
  availability,
  integrity,
  confidentiality,
  testId = FRAMEWORK_TEST_IDS.COMPLIANCE_STATUS_WIDGET,
}) => {
  // Use provided values or fall back to backward compatibility props
  const actualAvailability = availability || availabilityLevel;
  const actualIntegrity = integrity || integrityLevel;
  const actualConfidentiality = confidentiality || confidentialityLevel;

  // Generate compliance recommendations based on CIA levels
  const complianceStatus = generateComplianceStatus(
    actualAvailability,
    actualIntegrity,
    actualConfidentiality
  );

  // Determine overall compliance status based on the levels
  const overallStatus = getOverallComplianceStatus(
    actualAvailability,
    actualIntegrity,
    actualConfidentiality
  );

  // Get color class for the compliance status badge
  const getStatusColorClass = (status: string): string => {
    switch (status) {
      case COMPLIANCE_STATUS.FULL_COMPLIANCE:
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200";
      case COMPLIANCE_STATUS.STANDARD_COMPLIANCE:
        return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200";
      case COMPLIANCE_STATUS.BASIC_COMPLIANCE:
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200";
      default:
        return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200";
    }
  };

  // Get icon for the compliance status
  const getStatusIcon = (status: string): string => {
    switch (status) {
      case COMPLIANCE_STATUS.FULL_COMPLIANCE:
        return UI_ICONS.FULL_COMPLIANCE;
      case COMPLIANCE_STATUS.STANDARD_COMPLIANCE:
        return UI_ICONS.STANDARD_COMPLIANCE;
      case COMPLIANCE_STATUS.BASIC_COMPLIANCE:
        return UI_ICONS.BASIC_COMPLIANCE;
      default:
        return UI_ICONS.NON_COMPLIANT;
    }
  };

  return (
    <div data-testid={testId} className="compliance-status-widget">
      <div className="mb-4">
        <h3 className="text-lg font-medium mb-2">Compliance Recommendations</h3>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          Based on your security requirements, the following compliance
          standards may be relevant:
        </p>
      </div>

      {/* Add the compliance-status-badge element that tests are looking for */}
      <div
        className={`inline-block px-3 py-1 rounded-full text-sm mb-4 ${getStatusColorClass(
          overallStatus
        )}`}
        data-testid={FRAMEWORK_TEST_IDS.COMPLIANCE_STATUS_BADGE}
      >
        <span className="mr-1">{getStatusIcon(overallStatus)}</span>
        {overallStatus}
      </div>

      {/* Add the compliance-requirements-list element that tests are looking for */}
      <div
        className="mb-4"
        data-testid={FRAMEWORK_TEST_IDS.COMPLIANCE_REQUIREMENTS_LIST}
      >
        <h4 className="text-sm font-semibold mb-2">Requirements</h4>
        <ul className="list-disc list-inside text-sm">
          {getRequirements(
            actualAvailability,
            actualIntegrity,
            actualConfidentiality
          ).map((req, index) => (
            <li key={index}>{req}</li>
          ))}
        </ul>
      </div>

      {/* Display compliant frameworks */}
      <div
        className="mb-4"
        data-testid={FRAMEWORK_TEST_IDS.COMPLIANT_FRAMEWORKS_LIST}
      >
        <h4 className="text-sm font-semibold mb-2">Compliant Frameworks</h4>
        <ul className="list-disc list-inside text-sm">
          {getCompliantFrameworks(
            actualAvailability,
            actualIntegrity,
            actualConfidentiality
          ).map((framework, index) => (
            <li key={index}>{framework}</li>
          ))}
        </ul>
      </div>

      <div className="space-y-3">
        {complianceStatus.map((item, index) => (
          <div
            key={index}
            // Use the framework-specific test ID that tests are looking for
            data-testid={createDynamicTestId.framework(index)}
            className="p-3 border rounded-lg bg-white dark:bg-gray-800 shadow-sm"
          >
            <div className="flex items-center">
              <div
                className={`h-3 w-3 rounded-full ${getRelevanceColor(
                  item.relevance
                )} mr-2`}
              />
              <h4 className="font-medium">{item.name}</h4>
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
    default:
      return "bg-blue-500";
  }
}

interface ComplianceItem {
  name: string;
  description: string;
  relevance: string;
}

function generateComplianceStatus(
  availabilityLevel: string,
  integrityLevel: string,
  confidentialityLevel: string
): ComplianceItem[] {
  // Calculate average security level (0-4)
  const levels = ["None", "Low", "Moderate", "High", "Very High"];
  const availabilityIdx = Math.max(0, levels.indexOf(availabilityLevel));
  const integrityIdx = Math.max(0, levels.indexOf(integrityLevel));
  const confidentialityIdx = Math.max(0, levels.indexOf(confidentialityLevel));
  const avgLevel = (availabilityIdx + integrityIdx + confidentialityIdx) / 3;

  // Generate framework recommendations based on average level
  const frameworks: ComplianceItem[] = [];

  // Always add ISO 27001
  frameworks.push({
    name: "ISO 27001",
    description:
      "Information security management standard - recommended for all organizations.",
    relevance: avgLevel >= 2.5 ? "Moderate" : "Low",
  });

  // Add NIST for levels > 0
  if (avgLevel > 0) {
    frameworks.push({
      name: "NIST Cybersecurity Framework",
      description:
        "National Institute of Standards and Technology framework for improving critical infrastructure cybersecurity.",
      relevance: avgLevel >= 2.5 ? "Moderate" : "Low",
    });
  }

  // Add more frameworks for moderate level
  if (avgLevel >= 1.5) {
    frameworks.push({
      name: "HIPAA",
      description:
        "Health Insurance Portability and Accountability Act - required for handling protected health information.",
      relevance: avgLevel >= 2.5 ? "High" : "Moderate",
    });

    frameworks.push({
      name: "GDPR",
      description:
        "General Data Protection Regulation - required for handling EU citizens' personal data.",
      relevance: avgLevel >= 2.5 ? "High" : "Moderate",
    });

    frameworks.push({
      name: "SOC 2",
      description:
        "Service Organization Control 2 - focuses on security, availability, processing integrity, confidentiality, and privacy.",
      relevance: avgLevel >= 2.5 ? "High" : "Moderate",
    });
  }

  // Add PCI DSS for high levels
  if (avgLevel >= 2.5) {
    frameworks.push({
      name: "PCI DSS",
      description:
        "Payment Card Industry Data Security Standard - required for handling payment card data.",
      relevance: "High",
    });
  }

  return frameworks;
}

// Helper function to determine the overall compliance status based on security levels
function getOverallComplianceStatus(
  availabilityLevel: string,
  integrityLevel: string,
  confidentialityLevel: string
): string {
  // Calculate average security level (0-4)
  const levels = ["None", "Low", "Moderate", "High", "Very High"];
  const availabilityIdx = Math.max(0, levels.indexOf(availabilityLevel));
  const integrityIdx = Math.max(0, levels.indexOf(integrityLevel));
  const confidentialityIdx = Math.max(0, levels.indexOf(confidentialityLevel));
  const avgLevel = (availabilityIdx + integrityIdx + confidentialityIdx) / 3;

  if (avgLevel >= 3) {
    return COMPLIANCE_STATUS.FULL_COMPLIANCE;
  } else if (avgLevel >= 2) {
    return COMPLIANCE_STATUS.STANDARD_COMPLIANCE;
  } else if (avgLevel >= 1) {
    return COMPLIANCE_STATUS.BASIC_COMPLIANCE;
  } else {
    return COMPLIANCE_STATUS.NON_COMPLIANT;
  }
}

// Helper function to get requirements based on security levels
function getRequirements(
  availabilityLevel: string,
  integrityLevel: string,
  confidentialityLevel: string
): string[] {
  // Calculate average security level (0-4)
  const levels = ["None", "Low", "Moderate", "High", "Very High"];
  const availabilityIdx = Math.max(0, levels.indexOf(availabilityLevel));
  const integrityIdx = Math.max(0, levels.indexOf(integrityLevel));
  const confidentialityIdx = Math.max(0, levels.indexOf(confidentialityLevel));
  const avgLevel = (availabilityIdx + integrityIdx + confidentialityIdx) / 3;

  const requirements: string[] = [];

  // Add requirements based on the average security level
  if (avgLevel < 1) {
    requirements.push("Implement basic security controls");
    requirements.push("Establish minimum security policy");
  } else if (avgLevel < 2) {
    requirements.push("Implement access controls");
    requirements.push("Establish security policies and procedures");
    requirements.push("Conduct basic security awareness training");
  } else if (avgLevel < 3) {
    requirements.push("Implement comprehensive access controls");
    requirements.push("Establish detailed security policies");
    requirements.push("Conduct regular security awareness training");
    requirements.push("Perform periodic security assessments");
  } else {
    requirements.push("Implement advanced security controls");
    requirements.push("Establish comprehensive security governance");
    requirements.push("Conduct advanced security training");
    requirements.push(
      "Perform regular security assessments and penetration testing"
    );
    requirements.push("Implement continuous monitoring");
  }

  return requirements;
}

// Helper function to get compliant frameworks based on security levels
function getCompliantFrameworks(
  availabilityLevel: string,
  integrityLevel: string,
  confidentialityLevel: string
): string[] {
  // Calculate average security level (0-4)
  const levels = ["None", "Low", "Moderate", "High", "Very High"];
  const availabilityIdx = Math.max(0, levels.indexOf(availabilityLevel));
  const integrityIdx = Math.max(0, levels.indexOf(integrityLevel));
  const confidentialityIdx = Math.max(0, levels.indexOf(confidentialityLevel));
  const avgLevel = (availabilityIdx + integrityIdx + confidentialityIdx) / 3;

  const frameworks: string[] = [];

  if (avgLevel >= 1) {
    frameworks.push("ISO 27001 (Basic Controls)");
  }

  // Make SOC2 appear at Moderate level (avgLevel >= 2) instead of requiring avgLevel >= 3
  if (avgLevel >= 2) {
    frameworks.push("SOC 2 Type 1");
    frameworks.push("NIST CSF (Tier 1-2)");
  }

  if (avgLevel >= 3) {
    frameworks.push("SOC 2 Type 2");
    frameworks.push("ISO 27001 (Comprehensive)");
    frameworks.push("NIST CSF (Tier 3-4)");
    frameworks.push("PCI DSS");
  }

  return frameworks;
}

export default ComplianceStatusWidget;
