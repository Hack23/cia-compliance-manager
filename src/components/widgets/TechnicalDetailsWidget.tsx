import React, { useState } from "react";
import {
  TECHNICAL_DETAILS_TEST_IDS,
  WIDGET_TEST_IDS,
} from "../../constants/testIds";
import { CIADetails } from "../../types/cia";
import { IMPLEMENTATION_COSTS } from "../../constants/appConstants";

interface TechnicalDetailsWidgetProps {
  availabilityLevel: string;
  integrityLevel: string;
  confidentialityLevel: string;
  availabilityOptions: Record<string, CIADetails>;
  integrityOptions: Record<string, CIADetails>;
  confidentialityOptions: Record<string, CIADetails>;
  testId?: string;
}

// Enhanced interface for type safety
interface EnhancedCIADetails extends CIADetails {
  technical?: string;
  implementationSteps?: string[];
}

type ActiveTab = "availability" | "integrity" | "confidentiality";

const TechnicalDetailsWidget: React.FC<TechnicalDetailsWidgetProps> = ({
  availabilityLevel = "None",
  integrityLevel = "None",
  confidentialityLevel = "None",
  availabilityOptions = {},
  integrityOptions = {},
  confidentialityOptions = {},
  testId = TECHNICAL_DETAILS_TEST_IDS.TECHNICAL_DETAILS_PREFIX,
}) => {
  // Add state for active tab
  const [activeTab, setActiveTab] = useState<ActiveTab>("availability");

  // Cast options to EnhancedCIADetails for better type safety
  const availabilityDetails = (availabilityOptions[availabilityLevel] ||
    {}) as EnhancedCIADetails;
  const integrityDetails = (integrityOptions[integrityLevel] ||
    {}) as EnhancedCIADetails;
  const confidentialityDetails = (confidentialityOptions[
    confidentialityLevel
  ] || {}) as EnhancedCIADetails;

  // Get the active details based on selected tab
  const getActiveDetails = (): {
    details: EnhancedCIADetails;
    level: string;
  } => {
    switch (activeTab) {
      case "integrity":
        return { details: integrityDetails, level: integrityLevel };
      case "confidentiality":
        return { details: confidentialityDetails, level: confidentialityLevel };
      case "availability":
      default:
        return { details: availabilityDetails, level: availabilityLevel };
    }
  };

  const { details, level } = getActiveDetails();

  // Get current options based on active tab
  const currentOptions = (): Record<string, CIADetails> => {
    switch (activeTab) {
      case "integrity":
        return integrityOptions;
      case "confidentiality":
        return confidentialityOptions;
      case "availability":
      default:
        return availabilityOptions;
    }
  };

  // Get technical description with empty options check
  const technicalDescription =
    details.technical ||
    getDefaultTechnicalDescription(activeTab, level, currentOptions());

  // Get implementation steps for the current active tab and security level
  const implementationSteps =
    details.implementationSteps ||
    getDefaultImplementationSteps(activeTab, level);

  // Get recommended technologies
  const technologies = getRecommendedTechnologies(activeTab, level);

  // Get implementation costs with type safety
  const implementationCosts = IMPLEMENTATION_COSTS[
    level as keyof typeof IMPLEMENTATION_COSTS
  ] || {
    developmentEffort: "Unknown",
    maintenance: "Unknown",
    expertise: "Unknown",
  };

  return (
    <div data-testid={testId} className="technical-details-widget">
      {/* Add the widget test ID for the old tests */}
      <div
        data-testid={WIDGET_TEST_IDS.TECHNICAL_DETAILS_WIDGET}
        style={{ display: "none" }}
      ></div>

      <div className="mb-4">
        <h3 className="text-lg font-medium mb-1">
          Technical Implementation Guide
        </h3>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          This guide provides technical recommendations based on your CIA
          security requirements.
        </p>
      </div>

      {/* Tab navigation */}
      <div className="flex border-b mb-4">
        <button
          className={`px-4 py-2 ${
            activeTab === "availability" ? "border-b-2 border-blue-500" : ""
          }`}
          onClick={() => setActiveTab("availability")}
          data-testid="availability-tab"
        >
          Availability
        </button>
        <button
          className={`px-4 py-2 ${
            activeTab === "integrity" ? "border-b-2 border-blue-500" : ""
          }`}
          onClick={() => setActiveTab("integrity")}
          data-testid="integrity-tab"
        >
          Integrity
        </button>
        <button
          className={`px-4 py-2 ${
            activeTab === "confidentiality" ? "border-b-2 border-blue-500" : ""
          }`}
          onClick={() => setActiveTab("confidentiality")}
          data-testid="confidentiality-tab"
        >
          Confidentiality
        </button>
      </div>

      <div className="mb-4">
        <h4 className="text-md font-medium mb-2 flex items-center">
          <span data-testid="availability-level-indicator">{level}</span> Level
          Implementation
        </h4>
        <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-md">
          <div data-testid="technical-description">{technicalDescription}</div>
        </div>
      </div>

      {/* Implementation Steps */}
      <div className="mb-4">
        <h4 className="text-md font-medium mb-2">Implementation Steps</h4>
        <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-md">
          <ol className="list-decimal pl-5 space-y-2">
            {implementationSteps.map((step: string, index: number) => (
              <li key={index} data-testid={`implementation-step-${index}`}>
                {step}
              </li>
            ))}
          </ol>
        </div>
      </div>

      {/* Resource Requirements */}
      <div className="mb-4">
        <h4 className="text-md font-medium mb-2">Resource Requirements</h4>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-gray-50 dark:bg-gray-700 p-3 rounded-md">
            <h5 className="text-sm font-medium mb-1">Development Effort</h5>
            <p className="text-sm" data-testid="development-effort">
              {implementationCosts.developmentEffort}
            </p>
          </div>
          <div className="bg-gray-50 dark:bg-gray-700 p-3 rounded-md">
            <h5 className="text-sm font-medium mb-1">Maintenance Level</h5>
            <p className="text-sm" data-testid="maintenance-level">
              {implementationCosts.maintenance}
            </p>
          </div>
          <div className="bg-gray-50 dark:bg-gray-700 p-3 rounded-md">
            <h5 className="text-sm font-medium mb-1">Required Expertise</h5>
            <p className="text-sm" data-testid="required-expertise">
              {implementationCosts.expertise}
            </p>
          </div>
        </div>
      </div>

      {/* Recommended Technologies */}
      <div className="mb-4">
        <h4 className="text-md font-medium mb-2">Recommended Technologies</h4>
        <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-md">
          <ul className="list-disc pl-5 space-y-1">
            {technologies.map((tech: string, index: number) => (
              <li key={index} data-testid={`tech-stack-${index}`}>
                {tech}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4">
        <div
          className="p-4 border rounded-lg"
          data-testid={`${testId}-availability`}
        >
          <h4 className="font-medium mb-2 flex items-center">
            Availability Implementation
            <span
              className={`ml-2 text-sm px-2 py-1 rounded ${getSecurityLevelColor(
                availabilityLevel
              )}`}
            >
              {availabilityLevel}
            </span>
          </h4>
          <div
            className="text-sm"
            data-testid={`${testId}-availability-description`}
          >
            {availabilityDetails.technical ||
              getTechnicalAvailability(availabilityLevel)}
          </div>
        </div>

        <div
          className="p-4 border rounded-lg"
          data-testid={`${testId}-integrity`}
        >
          <h4 className="font-medium mb-2 flex items-center">
            Integrity Implementation
            <span
              className={`ml-2 text-sm px-2 py-1 rounded ${getSecurityLevelColor(
                integrityLevel
              )}`}
            >
              {integrityLevel}
            </span>
          </h4>
          <div
            className="text-sm"
            data-testid={`${testId}-integrity-description`}
          >
            {integrityDetails.technical ||
              getTechnicalIntegrity(integrityLevel)}
          </div>
        </div>

        <div
          className="p-4 border rounded-lg"
          data-testid={`${testId}-confidentiality`}
        >
          <h4 className="font-medium mb-2 flex items-center">
            Confidentiality Implementation
            <span
              className={`ml-2 text-sm px-2 py-1 rounded ${getSecurityLevelColor(
                confidentialityLevel
              )}`}
            >
              {confidentialityLevel}
            </span>
          </h4>
          <div
            className="text-sm"
            data-testid={`${testId}-confidentiality-description`}
          >
            {confidentialityDetails.technical ||
              getTechnicalConfidentiality(confidentialityLevel)}
          </div>
        </div>
      </div>

      <div className="mt-4 p-4 border rounded-lg bg-gray-50 dark:bg-gray-800">
        <h4 className="font-medium mb-2">Implementation Considerations</h4>
        <ul className="list-disc pl-5 space-y-1 text-sm">
          <li>
            Consider using a defense-in-depth approach across all security
            domains.
          </li>
          <li>Implement monitoring and alerting for security events.</li>
          <li>
            Regularly test security controls through vulnerability assessments
            and penetration testing.
          </li>
          <li>Document your security architecture and keep it updated.</li>
          <li>
            Ensure all team members understand security requirements and
            procedures.
          </li>
        </ul>
      </div>
    </div>
  );
};

// Helper functions
function getSecurityLevelColor(level: string): string {
  switch (level) {
    case "None":
      return "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300";
    case "Low":
      return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300";
    case "Moderate":
      return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300";
    case "High":
      return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300";
    case "Very High":
      return "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300";
    default:
      return "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300";
  }
}

function getDefaultTechnicalDescription(
  component: ActiveTab,
  level: string,
  options: Record<string, CIADetails>
): string {
  // If options are empty, return "No technical details available."
  if (Object.keys(options).length === 0) {
    return "No technical details available.";
  }

  switch (component) {
    case "integrity":
      return getTechnicalIntegrity(level);
    case "confidentiality":
      return getTechnicalConfidentiality(level);
    case "availability":
    default:
      return getTechnicalAvailability(level);
  }
}

function getTechnicalAvailability(level: string): string {
  switch (level) {
    case "Very High":
      return "Implement N+2 redundancy for all critical components. Deploy multi-region active-active architecture with automated failover. Use load balancers with health checks and auto-scaling. Implement comprehensive monitoring with automated remediation. RPO < 1 minute, RTO < 5 minutes.";
    case "High":
      return "Implement N+1 redundancy for critical components. Deploy multi-region standby architecture with automated failover. Use load balancers with health checks. Implement comprehensive monitoring with alerts. RPO < 15 minutes, RTO < 1 hour.";
    case "Moderate":
      return "Implement redundancy for important components. Deploy backup systems with semi-automated recovery. Use basic load balancing. Implement standard monitoring with alerts. RPO < 4 hours, RTO < 8 hours.";
    case "Low":
      return "Implement basic backup systems with manual recovery procedures. Use minimal monitoring for critical services. RPO < 24 hours, RTO < 48 hours.";
    default:
      return "No redundancy or monitoring in place.";
  }
}

function getTechnicalIntegrity(level: string): string {
  switch (level) {
    case "Very High":
      return "Implement comprehensive input validation, output encoding, and parameterized queries. Use digital signatures for all data. Deploy tamper-evident logging with blockchain or similar technology. Implement segregation of duties and multi-party authorization for critical operations. Conduct regular integrity verification of all data stores and code.";
    case "High":
      return "Implement thorough input validation and output encoding. Use checksums or hashing for important data. Deploy secure logging with tamper protection. Implement role-based access controls with least privilege. Conduct regular integrity checks for important systems.";
    case "Moderate":
      return "Implement basic input validation. Use version control for code and configuration. Deploy audit logging for important events. Implement standard access controls. Conduct periodic integrity checks for critical systems.";
    case "Low":
      return "Implement minimal input validation. Use basic access controls. Maintain simple logs of major changes. Conduct occasional integrity checks on critical data.";
    default:
      return "No specific data integrity controls. Data may be modified without detection or tracking.";
  }
}

function getTechnicalConfidentiality(level: string): string {
  switch (level) {
    case "Very High":
      return "Implement end-to-end encryption with strong algorithms (AES-256) and robust key management. Use multi-factor authentication for all access. Deploy data loss prevention systems. Implement comprehensive access controls with just-in-time privileged access. Conduct regular security assessments and penetration testing.";
    case "High":
      return "Implement encryption for sensitive data in transit and at rest. Use multi-factor authentication for privileged access. Implement role-based access control with least privilege. Conduct periodic security assessments and vulnerability scanning.";
    case "Moderate":
      return "Implement TLS for data in transit. Use basic encryption for sensitive data at rest. Implement standard authentication and authorization controls. Use basic auditing for access to sensitive data.";
    case "Low":
      return "Implement basic access controls. Use TLS for external connections. Apply simple authorization rules. Maintain basic access logs.";
    default:
      return "No specific confidentiality controls. Data may be accessed without proper authorization or tracking.";
  }
}

function getDefaultImplementationSteps(
  component: ActiveTab,
  level: string
): string[] {
  switch (component) {
    case "integrity":
      return getIntegrityImplementationSteps(level);
    case "confidentiality":
      return getConfidentialityImplementationSteps(level);
    case "availability":
    default:
      return getAvailabilityImplementationSteps(level);
  }
}

function getAvailabilityImplementationSteps(level: string): string[] {
  switch (level) {
    case "Very High":
      return [
        "Implement multi-region active-active architecture",
        "Configure automated failover and recovery",
        "Set up comprehensive monitoring with automated remediation",
        "Implement N+2 redundancy for all critical components",
        "Conduct regular disaster recovery exercises",
      ];
    case "High":
      return [
        "Implement high availability infrastructure",
        "Configure comprehensive monitoring",
        "Establish automated recovery",
      ];
    case "Moderate":
      return [
        "Configure automated monitoring",
        "Set up scheduled backups",
        "Create recovery runbooks",
      ];
    case "Low":
      return [
        "Set up basic monitoring",
        "Document manual recovery procedures",
        "Implement backup system",
      ];
    default:
      return [
        "No implementation required",
        "No monitoring in place",
        "No recovery procedures",
      ];
  }
}

function getIntegrityImplementationSteps(level: string): string[] {
  switch (level) {
    case "Very High":
      return [
        "Implement comprehensive input validation",
        "Deploy digital signatures for all data",
        "Set up tamper-evident logging",
        "Configure multi-party authorization for critical operations",
        "Schedule regular integrity verification",
      ];
    case "High":
      return [
        "Implement thorough input validation",
        "Use checksums for important data",
        "Deploy secure logging with tamper protection",
        "Configure role-based access controls",
      ];
    case "Moderate":
      return [
        "Set up basic input validation",
        "Implement version control",
        "Configure audit logging for important events",
      ];
    case "Low":
      return [
        "Implement minimal input validation",
        "Set up basic access controls",
        "Configure simple change logs",
      ];
    default:
      return [
        "No specific integrity controls",
        "No validation implemented",
        "No audit logging in place",
      ];
  }
}

function getConfidentialityImplementationSteps(level: string): string[] {
  switch (level) {
    case "Very High":
      return [
        "Implement end-to-end encryption (AES-256)",
        "Configure multi-factor authentication for all access",
        "Deploy data loss prevention system",
        "Set up just-in-time privileged access",
        "Schedule regular security assessments",
      ];
    case "High":
      return [
        "Implement encryption for sensitive data",
        "Configure multi-factor authentication for privileged access",
        "Set up role-based access control",
        "Schedule periodic security assessments",
      ];
    case "Moderate":
      return [
        "Implement TLS for data in transit",
        "Use basic encryption for sensitive data at rest",
        "Configure standard authentication controls",
      ];
    case "Low":
      return [
        "Set up basic access controls",
        "Implement TLS for external connections",
        "Configure simple authorization rules",
      ];
    default:
      return [
        "No specific confidentiality controls",
        "No encryption implemented",
        "No access control in place",
      ];
  }
}

function getRecommendedTechnologies(
  component: ActiveTab,
  level: string
): string[] {
  switch (component) {
    case "integrity":
      return getIntegrityTechnologies(level);
    case "confidentiality":
      return getConfidentialityTechnologies(level);
    case "availability":
    default:
      return getAvailabilityTechnologies(level);
  }
}

function getAvailabilityTechnologies(level: string): string[] {
  switch (level) {
    case "Very High":
      return [
        "Multi-region active-active deployments",
        "Global load balancers",
        "Auto-scaling systems",
        "Advanced monitoring (Datadog, New Relic)",
        "Chaos engineering tools",
      ];
    case "High":
      return [
        "Multi-region deployment",
        "Load balancers with health checks",
        "Automated failover systems",
        "Comprehensive monitoring",
      ];
    case "Moderate":
      return [
        "Redundant servers",
        "Basic load balancing",
        "Scheduled backups",
        "Standard monitoring tools",
      ];
    case "Low":
      return [
        "Basic backup systems",
        "Simple monitoring tools",
        "Manual recovery procedures",
      ];
    default:
      return ["No technologies"];
  }
}

function getIntegrityTechnologies(level: string): string[] {
  switch (level) {
    case "Very High":
      return [
        "Code signing systems",
        "Blockchain for tamper-evident logs",
        "Advanced SIEM solutions",
        "Integrity verification tools",
        "Multi-party authorization systems",
      ];
    case "High":
      return [
        "Secure SDLC tools",
        "Hashing and checksum systems",
        "Tamper-evident logging",
        "RBAC systems",
      ];
    case "Moderate":
      return [
        "Code scanning tools",
        "Version control systems",
        "Basic audit logging",
        "Access control systems",
      ];
    case "Low":
      return [
        "Basic validation libraries",
        "Simple access control",
        "Change logging systems",
      ];
    default:
      return ["No technologies"];
  }
}

function getConfidentialityTechnologies(level: string): string[] {
  switch (level) {
    case "Very High":
      return [
        "Enterprise key management systems",
        "Advanced encryption solutions (AES-256)",
        "Multi-factor authentication systems",
        "Data loss prevention tools",
        "Privileged access management",
      ];
    case "High":
      return [
        "Encryption frameworks",
        "Authentication providers",
        "Role-based access control systems",
        "Security assessment tools",
      ];
    case "Moderate":
      return [
        "TLS certificates",
        "Basic encryption libraries",
        "Standard authentication systems",
        "Audit logging tools",
      ];
    case "Low":
      return [
        "Basic access control systems",
        "TLS for external connections",
        "Simple authorization frameworks",
      ];
    default:
      return ["No technologies"];
  }
}

export default TechnicalDetailsWidget;
