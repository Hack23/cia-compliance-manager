import React, { useState } from "react";
import {
  CIA_LABELS,
  CIA_COMPONENT_ICONS,
  IMPLEMENTATION_COSTS,
} from "../../constants/appConstants";
import { WIDGET_TEST_IDS } from "../../constants/testIds";
import { CIADetails } from "../../types/cia";

interface TechnicalDetailsWidgetProps {
  availabilityLevel?: string;
  integrityLevel?: string;
  confidentialityLevel?: string;
  availability?: string; // For backward compatibility
  integrity?: string; // For backward compatibility
  confidentiality?: string; // For backward compatibility
  availabilityOptions?: Record<string, CIADetails>;
  integrityOptions?: Record<string, CIADetails>;
  confidentialityOptions?: Record<string, CIADetails>;
  testId?: string;
}

const TechnicalDetailsWidget: React.FC<TechnicalDetailsWidgetProps> = ({
  availabilityLevel,
  integrityLevel,
  confidentialityLevel,
  availability,
  integrity,
  confidentiality,
  availabilityOptions,
  integrityOptions,
  confidentialityOptions,
  testId = WIDGET_TEST_IDS.TECHNICAL_DETAILS_WIDGET,
}) => {
  // Use provided level or fallback to backward compatibility props
  const currentAvailability = availabilityLevel || availability || "None";
  const currentIntegrity = integrityLevel || integrity || "None";
  const currentConfidentiality =
    confidentialityLevel || confidentiality || "None";

  // Track active tab
  const [activeComponent, setActiveComponent] = useState<
    "availability" | "integrity" | "confidentiality"
  >("availability");

  // Get the current options based on active tab
  const getCurrentOptions = () => {
    switch (activeComponent) {
      case "availability":
        return availabilityOptions?.[currentAvailability] || {};
      case "integrity":
        return integrityOptions?.[currentIntegrity] || {};
      case "confidentiality":
        return confidentialityOptions?.[currentConfidentiality] || {};
      default:
        return {};
    }
  };

  // Get the current level
  const getCurrentLevel = () => {
    switch (activeComponent) {
      case "availability":
        return currentAvailability;
      case "integrity":
        return currentIntegrity;
      case "confidentiality":
        return currentConfidentiality;
      default:
        return "None";
    }
  };

  const currentOptions = getCurrentOptions();
  const currentLevel = getCurrentLevel();
  // Provide a default value for implementation costs if undefined
  const defaultCosts = {
    developmentEffort: "Unknown",
    maintenance: "Unknown",
    expertise: "Unknown",
  };
  const implementationCosts =
    IMPLEMENTATION_COSTS[currentLevel] ||
    IMPLEMENTATION_COSTS.None ||
    defaultCosts;

  // Generate implementation steps based on security level
  const getImplementationSteps = (): string[] => {
    // Cast currentOptions to CIADetails to access its properties safely
    const optionsAsCIA = currentOptions as CIADetails;

    // Use provided implementation steps if available
    if (
      optionsAsCIA?.implementationSteps &&
      optionsAsCIA.implementationSteps.length > 0
    ) {
      return optionsAsCIA.implementationSteps;
    }

    // Otherwise generate generic steps based on level
    const genericSteps: Record<string, string[]> = {
      None: [
        "No implementation required",
        "No security measures in place",
        "No monitoring or controls",
      ],
      Low: [
        "Implement basic security controls",
        "Set up minimal monitoring",
        "Document manual processes",
      ],
      Moderate: [
        "Deploy standard security measures",
        "Implement automated monitoring",
        "Configure regular backup processes",
      ],
      High: [
        "Implement advanced security architecture",
        "Set up comprehensive monitoring",
        "Deploy automated recovery systems",
      ],
      "Very High": [
        "Design and implement military-grade security",
        "Set up 24/7 monitoring with alerting",
        "Deploy multiple redundancy systems",
        "Implement cryptographic verification",
      ],
    };

    // Ensure we always return a string array
    return genericSteps[currentLevel] || genericSteps.None || [];
  };

  // Get appropriate technologies based on component and level
  const getTechnologies = () => {
    const techs: Record<string, Record<string, string[]>> = {
      availability: {
        None: ["No technologies"],
        Low: ["Single server setup", "Scheduled backups", "Basic monitoring"],
        Moderate: ["Redundant servers", "Load balancer", "Automated backups"],
        High: ["Multi-region deployment", "Auto-scaling", "Failover clusters"],
        "Very High": [
          "Global server distribution",
          "DDoS protection",
          "Real-time replication",
        ],
      },
      integrity: {
        None: ["No technologies"],
        Low: ["Basic data validation", "File checksums", "Manual audits"],
        Moderate: ["Digital signatures", "Audit logs", "Intrusion detection"],
        High: ["Secure coding practices", "Hash verification", "Code signing"],
        "Very High": [
          "Blockchain verification",
          "Zero-knowledge proofs",
          "Cryptographic validation",
        ],
      },
      confidentiality: {
        None: ["No technologies"],
        Low: [
          "Basic access control",
          "Password policies",
          "Data classification",
        ],
        Moderate: [
          "Encryption at rest",
          "Role-based access",
          "VPN connections",
        ],
        High: ["End-to-end encryption", "Multi-factor auth", "DLP systems"],
        "Very High": [
          "Quantum-resistant encryption",
          "Secure enclaves",
          "Tokenization",
        ],
      },
    };

    return techs[activeComponent]?.[currentLevel] || ["Not specified"];
  };

  return (
    <div data-testid={testId} className="p-4">
      {/* Tab navigation */}
      <div className="flex border-b border-gray-200 dark:border-gray-700 mb-4">
        <button
          className={`py-2 px-4 font-medium ${
            activeComponent === "confidentiality"
              ? "border-b-2 border-blue-500 text-blue-600 dark:text-blue-400"
              : "text-gray-500"
          }`}
          onClick={() => setActiveComponent("confidentiality")}
          data-testid="confidentiality-tab"
        >
          {CIA_COMPONENT_ICONS.CONFIDENTIALITY} {CIA_LABELS.CONFIDENTIALITY}
        </button>
        <button
          className={`py-2 px-4 font-medium ${
            activeComponent === "integrity"
              ? "border-b-2 border-blue-500 text-blue-600 dark:text-blue-400"
              : "text-gray-500"
          }`}
          onClick={() => setActiveComponent("integrity")}
          data-testid="integrity-tab"
        >
          {CIA_COMPONENT_ICONS.INTEGRITY} {CIA_LABELS.INTEGRITY}
        </button>
        <button
          className={`py-2 px-4 font-medium ${
            activeComponent === "availability"
              ? "border-b-2 border-blue-500 text-blue-600 dark:text-blue-400"
              : "text-gray-500"
          }`}
          onClick={() => setActiveComponent("availability")}
          data-testid="availability-tab"
        >
          {CIA_COMPONENT_ICONS.AVAILABILITY} {CIA_LABELS.AVAILABILITY}
        </button>
      </div>

      {/* Level indicator */}
      <div className="mb-4 flex items-center">
        <span className="text-sm text-gray-500 dark:text-gray-400 mr-2">
          Current level:
        </span>
        <span
          className="font-medium text-blue-600 dark:text-blue-400"
          data-testid="availability-level-indicator"
        >
          {currentLevel}
        </span>
      </div>

      {/* Technical description */}
      <div className="mb-4 bg-gray-50 dark:bg-gray-700 p-4 rounded-md">
        <h3 className="text-sm font-medium mb-2" data-testid="technical-header">
          Technical Description - {currentLevel}
        </h3>
        <p
          className="text-sm text-gray-600 dark:text-gray-300"
          data-testid="technical-description"
        >
          {(currentOptions as CIADetails)?.technical ||
            "No technical details available."}
        </p>
      </div>

      {/* Implementation steps */}
      <div className="mb-4 bg-gray-50 dark:bg-gray-700 p-4 rounded-md">
        <h3
          className="text-sm font-medium mb-2"
          data-testid="implementation-header"
        >
          Implementation Steps
        </h3>
        <ol className="list-decimal pl-5 space-y-2">
          {getImplementationSteps().map((step: string, index: number) => (
            <li
              key={index}
              className="text-sm text-gray-600 dark:text-gray-300"
              data-testid={`implementation-step-${index}`}
            >
              {step}
            </li>
          ))}
        </ol>
      </div>

      {/* Technologies */}
      <div className="mb-4 bg-gray-50 dark:bg-gray-700 p-4 rounded-md">
        <h3 className="text-sm font-medium mb-2">Recommended Technologies</h3>
        <div className="flex flex-wrap gap-2">
          {getTechnologies().map((tech: string, index: number) => (
            <span
              key={index}
              className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300 text-xs font-medium px-2.5 py-0.5 rounded"
              data-testid={`tech-stack-${index}`}
            >
              {tech}
            </span>
          ))}
        </div>
      </div>

      {/* Resource requirements */}
      <div className="mb-4 bg-gray-50 dark:bg-gray-700 p-4 rounded-md">
        <h3 className="text-sm font-medium mb-2" data-testid="resources-header">
          Resource Requirements
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mt-3">
          <div>
            <span className="text-xs text-gray-500 dark:text-gray-400">
              Development Effort
            </span>
            <p className="text-sm font-medium" data-testid="development-effort">
              {implementationCosts.developmentEffort}
            </p>
          </div>
          <div>
            <span className="text-xs text-gray-500 dark:text-gray-400">
              Maintenance
            </span>
            <p className="text-sm font-medium" data-testid="maintenance-level">
              {implementationCosts.maintenance}
            </p>
          </div>
          <div>
            <span className="text-xs text-gray-500 dark:text-gray-400">
              Required Expertise
            </span>
            <p className="text-sm font-medium" data-testid="required-expertise">
              {implementationCosts.expertise}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TechnicalDetailsWidget;
