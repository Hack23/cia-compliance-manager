import React from "react";
import { SECURITY_RESOURCES_TEST_IDS } from "../../constants/testIds";
import { WIDGET_ICONS } from "../../constants/coreConstants";
import { SecurityResourcesWidgetProps } from "../../types/widgets";
import { SECURITY_LEVELS } from "../../constants/appConstants";

// Define ResourceItem interface that was missing
interface ResourceItem {
  title: string;
  description?: string;
  type: string;
  url?: string;
}

const SecurityResourcesWidget: React.FC<SecurityResourcesWidgetProps> = ({
  securityLevel = SECURITY_LEVELS.NONE, // Default value to ensure it's always defined
  testId = "widget-security-resources",
}) => {
  // Returns resources appropriate for the current security level
  const getResources = (): Record<string, ResourceItem[]> => {
    // Base resources available at all levels
    const baseResources: Record<string, ResourceItem[]> = {
      documentation: [
        {
          title: "Security Implementation Guide",
          description: "Step-by-step guide for implementing security controls",
          type: "documentation",
        },
        {
          title: "Compliance Reporting Templates",
          description:
            "Templates for documenting compliance with security requirements",
          type: "documentation",
        },
      ],
      training: [
        {
          title: "Security Awareness Training",
          description:
            "Basic training for all employees on security best practices",
          type: "training",
        },
      ],
      external: [
        {
          title: "Industry Security Standards",
          description: "Links to relevant industry security standards",
          type: "external",
        },
      ],
    };

    // Add more advanced resources for higher security levels
    if (["Moderate", "High", "Very High"].includes(securityLevel)) {
      // Use null/undefined checks
      if (baseResources.documentation) {
        baseResources.documentation.push({
          title: "Risk Assessment Framework",
          description: "Framework for assessing security risks",
          type: "documentation",
        });
      }

      if (baseResources.training) {
        baseResources.training.push({
          title: "Incident Response Procedures",
          description: "Training on how to respond to security incidents",
          type: "training",
        });
      }

      if (baseResources.external) {
        baseResources.external.push({
          title: "Regulatory Compliance Guides",
          description: "Guides for complying with relevant regulations",
          type: "external",
        });
      }
    }

    // Add most comprehensive resources for high security levels
    if (["High", "Very High"].includes(securityLevel)) {
      if (baseResources.documentation) {
        baseResources.documentation.push({
          title: "Advanced Security Architecture",
          description:
            "Detailed architectural guidance for high-security environments",
          type: "documentation",
        });
      }

      if (baseResources.training) {
        baseResources.training.push({
          title: "Security Certification Courses",
          description:
            "Professional certification courses for security specialists",
          type: "training",
        });
      }

      if (baseResources.external) {
        baseResources.external.push({
          title: "Security Vendor Evaluations",
          description: "Independent evaluations of security technology vendors",
          type: "external",
        });
      }
    }

    return baseResources;
  };

  const resources = getResources();

  return (
    <div
      className="p-4 space-y-4"
      data-testid={testId || "widget-security-resources"}
      aria-labelledby="security-resources-title"
    >
      <div className="flex items-center mb-4">
        <span className="text-xl mr-2" aria-hidden="true">
          {WIDGET_ICONS.SECURITY_RESOURCES}
        </span>
        <h3 id="security-resources-title" className="text-md font-medium">
          Security Resources
        </h3>
      </div>

      <p className="text-sm text-gray-600 dark:text-gray-300">
        Access security implementation guides, training materials, and best
        practices tailored to your{" "}
        <span className="font-medium">{securityLevel}</span> security level.
      </p>

      <div className="bg-gray-50 dark:bg-gray-700 p-3 rounded-md mb-3">
        <h4 className="text-sm font-medium mb-2">Documentation</h4>
        <ul className="list-disc pl-5 space-y-1">
          {resources.documentation &&
            resources.documentation.map((item, index) => (
              <li key={index} className="text-sm">
                <div className="font-medium">{item.title}</div>
                {item.description && (
                  <div className="text-xs text-gray-500 dark:text-gray-400">
                    {item.description}
                  </div>
                )}
              </li>
            ))}
        </ul>
      </div>

      <div className="bg-gray-50 dark:bg-gray-700 p-3 rounded-md mb-3">
        <h4 className="text-sm font-medium mb-2">Security Training</h4>
        <ul className="list-disc pl-5 space-y-1">
          {resources.training &&
            resources.training.map((item, index) => (
              <li key={index} className="text-sm">
                <div className="font-medium">{item.title}</div>
                {item.description && (
                  <div className="text-xs text-gray-500 dark:text-gray-400">
                    {item.description}
                  </div>
                )}
              </li>
            ))}
        </ul>
      </div>

      <div className="bg-gray-50 dark:bg-gray-700 p-3 rounded-md">
        <h4 className="text-sm font-medium mb-2">External Resources</h4>
        <ul className="list-disc pl-5 space-y-1">
          {resources.external &&
            resources.external.map((item, index) => (
              <li key={index} className="text-sm">
                <div className="font-medium">{item.title}</div>
                {item.description && (
                  <div className="text-xs text-gray-500 dark:text-gray-400">
                    {item.description}
                  </div>
                )}
              </li>
            ))}
        </ul>
      </div>

      <div className="bg-blue-50 dark:bg-blue-900 p-3 rounded-md border border-blue-100 dark:border-blue-800">
        <h4 className="text-sm font-medium mb-2 flex items-center">
          <span aria-hidden="true" className="mr-2">
            💼
          </span>
          Business Value
        </h4>
        <p className="text-sm">{getBusinessValue(securityLevel)}</p>
      </div>
    </div>
  );
};

// Helper function to provide business value context
function getBusinessValue(level: string): string {
  switch (level) {
    case "Very High":
      return "These enterprise-grade security resources support your maximum security implementation, helping protect your most critical business assets and maintain compliance with stringent regulatory requirements.";
    case "High":
      return "These comprehensive security resources help you implement robust protection for sensitive business information and operations, balancing strong security with operational efficiency.";
    case "Moderate":
      return "These standard security resources provide practical guidance for implementing balanced security controls that protect important business assets while managing implementation costs effectively.";
    case "Low":
      return "These basic security resources help you establish essential protection for your business operations, providing a foundation for future security enhancements.";
    default:
      return "These fundamental resources will help you establish initial security measures for your business assets and operations.";
  }
}

export default SecurityResourcesWidget;
