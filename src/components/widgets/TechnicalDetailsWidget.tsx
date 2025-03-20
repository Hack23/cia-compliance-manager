import React, { useMemo, useState } from "react";
import withSecurityLevelState from '../../hoc/withSecurityLevelState';
import { useCIAContentService } from "../../hooks/useCIAContentService";
import { SecurityLevel } from "../../types/cia";
import { TechnicalImplementationDetails } from "../../types/cia-services";
import { CodeBlock } from "../common/CodeBlock";
import { KeyValuePair } from "../common/KeyValuePair";
import { Tab } from "../common/Tab";
import WidgetContainer from "../common/WidgetContainer"; // Changed to default import

// Define props interface for the component
interface TechnicalDetailsWidgetProps {
  availabilityLevel: SecurityLevel;
  integrityLevel: SecurityLevel;
  confidentialityLevel: SecurityLevel;
  className?: string;
  testId?: string;
}

// Define interface for requirement items
interface RequirementItem {
  description: string;
  importance: string;
  category?: string;
  [key: string]: any; // Allow other properties
}

/**
 * Displays technical implementation details for security levels
 * 
 * ## Business Perspective
 * 
 * This widget bridges the gap between security policy and technical implementation,
 * helping IT teams understand how to implement the selected security controls.
 * Clear implementation details reduce implementation time and costs while ensuring
 * proper security standards are followed. 🔒
 */
const TechnicalDetailsWidget: React.FC<TechnicalDetailsWidgetProps> = ({
  className = "",
  testId = "technical-details-widget",
  availabilityLevel = "Moderate",
  integrityLevel = "Moderate",
  confidentialityLevel = "Moderate",
}: TechnicalDetailsWidgetProps): React.ReactElement => {
  const [activeTab, setActiveTab] = useState<"availability" | "integrity" | "confidentiality">("availability");
  const { ciaContentService } = useCIAContentService();
  
  // Memoize active details to prevent unnecessary re-renders
  const activeDetails = useMemo(() => {
    const getDetailsForComponent = () => {
      switch (activeTab) {
        case "availability":
          return ciaContentService.getComponentDetails("availability", availabilityLevel);
        case "integrity":
          return ciaContentService.getComponentDetails("integrity", integrityLevel);
        case "confidentiality":
          return ciaContentService.getComponentDetails("confidentiality", confidentialityLevel);
        default:
          return ciaContentService.getComponentDetails("availability", availabilityLevel);
      }
    };
    
    return getDetailsForComponent();
  }, [activeTab, availabilityLevel, integrityLevel, confidentialityLevel, ciaContentService]);

  // Get implementation details with null safety
  const implementationDetails = useMemo(() => 
    activeDetails?.technicalImplementation || null
  , [activeDetails]);
  
  // Helper functions to get default values when data is missing
  const getDefaultDevelopmentEffort = (level: SecurityLevel): string => {
    switch (level) {
      case "None":
        return "Minimal";
      case "Low":
        return "Low (hours)";
      case "Moderate":
        return "Medium (days)";
      case "High":
        return "High (weeks)";
      case "Very High":
        return "Very High (months)";
      default:
        return "Not specified";
    }
  };

  const getDefaultMaintenanceEffort = (level: SecurityLevel): string => {
    switch (level) {
      case "None":
        return "None";
      case "Low":
        return "Minimal";
      case "Moderate":
        return "Regular";
      case "High":
        return "Substantial";
      case "Very High":
        return "Continuous";
      default:
        return "Not specified";
    }
  };

  const getDefaultExpertiseLevel = (level: SecurityLevel): string => {
    switch (level) {
      case "None":
        return "None";
      case "Low":
        return "Basic security knowledge";
      case "Moderate":
        return "Security professional";
      case "High":
        return "Security specialist";
      case "Very High":
        return "Security expert team";
      default:
        return "Not specified";
    }
  };

  // Get technical details for each CIA component with proper null safety
  const availabilityDetails = useMemo(
    () => ciaContentService.getComponentDetails("availability", availabilityLevel),
    [availabilityLevel, ciaContentService]
  );

  const integrityDetails = useMemo(
    () => ciaContentService.getComponentDetails("integrity", integrityLevel),
    [integrityLevel, ciaContentService]
  );

  const confidentialityDetails = useMemo(
    () => ciaContentService.getComponentDetails("confidentiality", confidentialityLevel),
    [confidentialityLevel, ciaContentService]
  );

  // Get the level from the active details with null safety
  const activeLevel = useMemo(() => {
    switch (activeTab) {
      case "availability":
        return availabilityLevel;
      case "integrity":
        return integrityLevel;
      case "confidentiality":
        return confidentialityLevel;
      default:
        return "Moderate" as SecurityLevel;
    }
  }, [activeTab, availabilityLevel, integrityLevel, confidentialityLevel]);

  // Get code examples with null safety and better default handling
  const codeExamples = useMemo(() => {
    const examples = activeDetails?.codeExamples || [];
    // Provide default example if none exist but should based on level
    if (examples.length === 0 && activeLevel !== "None") {
      return [{
        title: `Example ${activeTab.charAt(0).toUpperCase() + activeTab.slice(1)} Implementation`,
        language: "typescript",
        code: `// Sample code would be shown here for ${activeTab} at ${activeLevel} level`
      }];
    }
    return examples;
  }, [activeDetails, activeTab, activeLevel]);

  // Implementation steps with better defaults
  const implementationSteps = useMemo(() => {
    const steps = implementationDetails?.implementationSteps || [];
    if (steps.length === 0 && activeLevel !== "None") {
      const defaultSteps = {
        "availability": [
          `Configure system for ${activeLevel} availability`,
          "Implement monitoring and alerting",
          "Create disaster recovery plan"
        ],
        "integrity": [
          `Implement ${activeLevel} data validation controls`,
          "Configure checksum verification",
          "Set up data integrity monitoring"
        ],
        "confidentiality": [
          `Apply ${activeLevel} encryption to sensitive data`,
          "Implement access control mechanisms",
          "Configure data loss prevention"
        ]
      };
      return defaultSteps[activeTab] || [];
    }
    return steps;
  }, [implementationDetails, activeTab, activeLevel]);

  // Function to get technical description with null safety
  const getTechnicalDescription = (component: "availability" | "integrity" | "confidentiality", level: SecurityLevel): string => {
    const details = ciaContentService.getComponentDetails(component, level);
    return details?.technical || `No technical description available for ${level} ${component}`;
  };

  // Fix the typed parameters
  const renderRequirements = (requirements: RequirementItem[], title: string) => {
    return (
      <div className="mb-4">
        <h4 className="text-md font-medium mb-2">{title}</h4>
        <div className="space-y-2">
          {requirements.map((req: RequirementItem, index: number) => (
            <div
              key={`req-${index}`}
              className="p-2 bg-gray-50 dark:bg-gray-800 rounded border border-gray-200 dark:border-gray-700"
            >
              <div className="flex justify-between">
                <div className="text-sm">{req.description}</div>
                <div className="text-xs font-medium px-2 py-1 bg-blue-100 text-blue-800 dark:bg-blue-900 dark:bg-opacity-30 dark:text-blue-300 rounded">
                  {req.importance}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  // Fix the typed parameters
  const renderTechnologies = (technologies: TechnicalImplementationDetails[], title: string) => {
    return (
      <div className="mb-4">
        <h4 className="text-md font-medium mb-2">{title}</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          {technologies.map((tech: TechnicalImplementationDetails, index: number) => (
            <div
              key={`tech-${index}`}
              className="p-3 bg-gray-50 dark:bg-gray-800 rounded border border-gray-200 dark:border-gray-700"
            >
              <div className="font-medium mb-1">{tech.description}</div>
              <div className="text-xs text-gray-600 dark:text-gray-400">
                {tech.effort?.expertise}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <WidgetContainer
      title="Technical Implementation Details"
      icon="🛠️"
      className={className}
      testId={testId}
    >
      <div className="p-4">
        {/* Tab navigation */}
        <div className="border-b mb-4">
          <nav className="flex space-x-4" aria-label="Security Components">
            <Tab
              active={activeTab === "availability"}
              onClick={() => setActiveTab("availability")}
              testId="availability-tab"
              icon="⏱️"
              label="Availability"
            />
            <Tab
              active={activeTab === "integrity"}
              onClick={() => setActiveTab("integrity")}
              testId="integrity-tab"
              icon="✅"
              label="Integrity"
            />
            <Tab
              active={activeTab === "confidentiality"}
              onClick={() => setActiveTab("confidentiality")}
              testId="confidentiality-tab"
              icon="🔒"
              label="Confidentiality"
            />
          </nav>
        </div>

        {/* Component details */}
        <div className="mb-6">
          <h3 className="text-lg font-medium mb-2">
            {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)} Implementation: {activeLevel}
          </h3>
          <p className="mb-4 text-gray-700 dark:text-gray-300">
            {getTechnicalDescription(activeTab, activeLevel)}
          </p>
        </div>

        {/* Implementation details */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="p-3 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
            <h5 className="text-sm font-medium mb-2 flex items-center">
              <span className="mr-2">⏱️</span>
              Development Effort
            </h5>
            <p className="text-gray-700 dark:text-gray-300 text-sm">
              {implementationDetails?.effort?.development || 
                getDefaultDevelopmentEffort(activeLevel)}
            </p>
          </div>
          <div className="p-3 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
            <h5 className="text-sm font-medium mb-2 flex items-center">
              <span className="mr-2">🔧</span>
              Maintenance
            </h5>
            <p className="text-gray-700 dark:text-gray-300 text-sm">
              {implementationDetails?.effort?.maintenance || 
                getDefaultMaintenanceEffort(activeLevel)}
            </p>
          </div>
          <div className="p-3 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
            <h5 className="text-sm font-medium mb-2 flex items-center">
              <span className="mr-2">👨‍💻</span>
              Required Expertise
            </h5>
            <p className="text-gray-700 dark:text-gray-300 text-sm">
              {implementationDetails?.effort?.expertise || 
                getDefaultExpertiseLevel(activeLevel)}
            </p>
          </div>
        </div>

        {/* Terminal Implementation Display */}
        <div className="mt-6">
          <h4 className="text-md font-medium mb-3 flex items-center">
            <span className="mr-2">📋</span>
            Implementation Steps
          </h4>
          <div className="bg-gray-900 text-white p-4 rounded-md mb-4">
            <ol className="list-decimal list-inside space-y-2">
              {implementationSteps.length > 0 ? (
                implementationSteps.map((step, index) => (
                  <li key={`step-${index}`} data-testid={`implementation-step-${index}`}>
                    {step}
                  </li>
                ))
              ) : (
                <li>No specific implementation steps provided for this security level.</li>
              )}
            </ol>
          </div>
        </div>

        {/* Code examples section */}
        {codeExamples.length > 0 && (
          <div className="mt-6">
            <h4 className="text-md font-medium mb-3">Code Examples</h4>
            <div className="space-y-4">
              {codeExamples.map((example, index) => (
                <div key={`code-example-${index}`} className="border border-gray-200 dark:border-gray-700 rounded-md">
                  <div className="bg-gray-50 dark:bg-gray-800 p-2 border-b border-gray-200 dark:border-gray-700">
                    <h5 className="font-medium">{example.title}</h5>
                    <div className="text-xs text-gray-500 dark:text-gray-400">{example.language}</div>
                  </div>
                  <CodeBlock 
                    code={example.code}
                    language={example.language}
                    testId={`code-example-${index}`}
                  />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Component specific metrics */}
        {activeTab === "availability" && (
          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <KeyValuePair
              label="Uptime"
              value={availabilityDetails?.uptime || "Not specified"}
              testId={`${testId}-uptime`}
            />
            <KeyValuePair
              label="Recovery Time Objective (RTO)"
              value={availabilityDetails?.rto || "Not specified"}
              testId={`${testId}-rto`}
            />
            <KeyValuePair
              label="Recovery Point Objective (RPO)"
              value={availabilityDetails?.rpo || "Not specified"}
              testId={`${testId}-rpo`}
            />
            <KeyValuePair
              label="Mean Time To Recover (MTTR)"
              value={availabilityDetails?.mttr || "Not specified"}
              testId={`${testId}-mttr`}
            />
          </div>
        )}

        {activeTab === "integrity" && (
          <div className="mt-6">
            <KeyValuePair
              label="Validation Method"
              value={integrityDetails?.validationMethod || "Not specified"}
              testId={`${testId}-validation-method`}
            />
          </div>
        )}

        {activeTab === "confidentiality" && (
          <div className="mt-6">
            <KeyValuePair
              label="Protection Method"
              value={confidentialityDetails?.protectionMethod || "Not specified"}
              testId={`${testId}-protection-method`}
            />
          </div>
        )}

        {/* Requirements section */}
        {implementationDetails?.requirements && implementationDetails.requirements.length > 0 && (
          <div className="mt-6">
            <h4 className="text-md font-medium mb-3">Requirements</h4>
            <ul className="list-disc list-inside space-y-1 pl-4">
              {implementationDetails.requirements.map((req: string, index: number) => (
                <li key={`requirement-${index}`} data-testid={`requirement-${index}`}>
                  {req}
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Technologies section */}
        {implementationDetails?.technologies && implementationDetails.technologies.length > 0 && (
          <div className="mt-6">
            <h4 className="text-md font-medium mb-3">Technologies</h4>
            <div className="flex flex-wrap gap-2">
              {implementationDetails.technologies.map((tech: string, index: number) => (
                <span 
                  key={`tech-${index}`} 
                  className="px-2 py-1 bg-blue-100 text-blue-800 dark:bg-blue-900 dark:bg-opacity-30 dark:text-blue-300 rounded-md"
                  data-testid={`technology-${index}`}
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </WidgetContainer>
  );
};

// Export the component with security level state management
export default withSecurityLevelState(TechnicalDetailsWidget);
