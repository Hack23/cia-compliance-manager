import React, { useMemo, useState } from "react";
import {
  CIA_COMPONENT_ICONS,
  CIA_LABELS,
  IMPLEMENTATION_COSTS, // Import the implementation costs mapping
} from "../../constants/appConstants";
import { CIA_COMPONENT_COLORS } from "../../constants/colorConstants"; // Import from the correct file
import { TECHNICAL_DETAILS_TEST_IDS } from "../../constants/testIds";
import ciaContentService from "../../services/ciaContentService";
import { SecurityLevel } from "../../types/cia";
import StatusBadge from "../common/StatusBadge"; // Import StatusBadge component
import WidgetContainer from "../common/WidgetContainer";

/**
 * Props for TechnicalDetailsWidget component
 */
export interface TechnicalDetailsWidgetProps {
  availabilityLevel?: string;
  integrityLevel?: string;
  confidentialityLevel?: string;
  className?: string;
  testId?: string;
}

/**
 * TechnicalDetailsWidget displays technical implementation details for the selected security levels
 *
 * ## Business Perspective
 *
 * This widget provides IT teams and technical stakeholders with specific
 * implementation details required to meet the selected security levels.
 * It translates high-level security decisions into actionable technical
 * requirements, creating clear documentation for implementation teams. 🔧
 *
 * The technical specifications provided by this widget help organizations
 * align their technical architecture with their security requirements,
 * ensuring that appropriate controls are implemented across each component
 * of the CIA security triad.
 */
const TechnicalDetailsWidget: React.FC<TechnicalDetailsWidgetProps> = ({
  availabilityLevel = "None",
  integrityLevel = "None",
  confidentialityLevel = "None",
  className = "",
  testId = TECHNICAL_DETAILS_TEST_IDS.TECHNICAL_DETAILS_WIDGET,
}) => {
  // Add state for active tab: "confidentiality", "integrity", or "availability"
  const [activeTab, setActiveTab] = useState<
    "confidentiality" | "integrity" | "availability"
  >("confidentiality");

  // Helper functions for getting default effort values based on security level
  const getDefaultDevelopmentEffort = (level: SecurityLevel): string => {
    switch (level) {
      case "None":
        return "None";
      case "Low":
        return "Days (1-5)";
      case "Moderate":
        return "Weeks (2-4)";
      case "High":
        return "Months (1-3)";
      case "Very High":
        return "Months (3+)";
      default:
        return "Not specified";
    }
  };

  const getDefaultMaintenanceEffort = (level: SecurityLevel): string => {
    switch (level) {
      case "None":
        return "None";
      case "Low":
        return "Minimal (quarterly review)";
      case "Moderate":
        return "Regular (monthly review)";
      case "High":
        return "Significant (biweekly monitoring)";
      case "Very High":
        return "Extensive (continuous monitoring)";
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

  // Get technical details for each CIA component
  const availabilityDetails = useMemo(
    () =>
      ciaContentService.getComponentDetails(
        "availability",
        availabilityLevel as SecurityLevel
      ),
    [availabilityLevel]
  );

  const integrityDetails = useMemo(
    () =>
      ciaContentService.getComponentDetails(
        "integrity",
        integrityLevel as SecurityLevel
      ),
    [integrityLevel]
  );

  const confidentialityDetails = useMemo(
    () =>
      ciaContentService.getComponentDetails(
        "confidentiality",
        confidentialityLevel as SecurityLevel
      ),
    [confidentialityLevel]
  );

  // Get recommendations for each CIA component
  const availabilityRecommendations = useMemo(
    () =>
      ciaContentService.getRecommendations(
        "availability",
        availabilityLevel as SecurityLevel
      ) || [],
    [availabilityLevel]
  );

  const integrityRecommendations = useMemo(
    () =>
      ciaContentService.getRecommendations(
        "integrity",
        integrityLevel as SecurityLevel
      ) || [],
    [integrityLevel]
  );

  const confidentialityRecommendations = useMemo(
    () =>
      ciaContentService.getRecommendations(
        "confidentiality",
        confidentialityLevel as SecurityLevel
      ) || [],
    [confidentialityLevel]
  );

  // Get the details for the active tab
  const activeDetails = useMemo(() => {
    switch (activeTab) {
      case "availability":
        return {
          details: availabilityDetails,
          level: availabilityLevel,
          color: CIA_COMPONENT_COLORS.AVAILABILITY,
          recommendations: availabilityRecommendations,
          icon: CIA_COMPONENT_ICONS.AVAILABILITY,
          protectionMethod: availabilityDetails?.uptime || "Not specified",
          validationKey: "uptime",
        };
      case "integrity":
        return {
          details: integrityDetails,
          level: integrityLevel,
          color: CIA_COMPONENT_COLORS.INTEGRITY,
          recommendations: integrityRecommendations,
          icon: CIA_COMPONENT_ICONS.INTEGRITY,
          protectionMethod:
            integrityDetails?.validationMethod || "Not specified",
          validationKey: "validationMethod",
        };
      case "confidentiality":
        return {
          details: confidentialityDetails,
          level: confidentialityLevel,
          color: CIA_COMPONENT_COLORS.CONFIDENTIALITY,
          recommendations: confidentialityRecommendations,
          icon: CIA_COMPONENT_ICONS.CONFIDENTIALITY,
          protectionMethod:
            confidentialityDetails?.protectionMethod || "Not specified",
          validationKey: "protectionMethod",
        };
    }
  }, [
    activeTab,
    availabilityDetails,
    integrityDetails,
    confidentialityDetails,
    availabilityLevel,
    integrityLevel,
    confidentialityLevel,
    availabilityRecommendations,
    integrityRecommendations,
    confidentialityRecommendations,
  ]);

  // Get implementation details from the service
  const implementationDetails = useMemo(() => {
    if (!activeDetails?.details) return null;

    const level = activeDetails.level as SecurityLevel;

    // Get default values based on the selected security level
    const defaultEffort = {
      development: getDefaultDevelopmentEffort(level),
      maintenance: getDefaultMaintenanceEffort(level),
      expertise: getDefaultExpertiseLevel(level),
    };

    return {
      implementationSteps: activeDetails.details.implementationSteps || [],
      effort: {
        development:
          activeDetails.details.effort?.development ||
          defaultEffort.development,
        maintenance:
          activeDetails.details.effort?.maintenance ||
          defaultEffort.maintenance,
        expertise:
          activeDetails.details.effort?.expertise || defaultEffort.expertise,
      },
      codeExamples: activeDetails.details.codeExamples || [],
      technicalImplementation: activeDetails.details.technicalImplementation,
    };
  }, [activeDetails]);

  // Get implementation costs for the selected component and level
  const implementationCosts = useMemo(() => {
    let level: SecurityLevel;

    if (activeTab === "availability") {
      level = availabilityLevel as SecurityLevel;
    } else if (activeTab === "integrity") {
      level = integrityLevel as SecurityLevel;
    } else {
      level = confidentialityLevel as SecurityLevel;
    }

    // Get implementation costs for the selected level
    return (
      IMPLEMENTATION_COSTS[level] || {
        developmentEffort: getDefaultDevelopmentEffort(level),
        maintenance: getDefaultMaintenanceEffort(level),
        expertise: getDefaultExpertiseLevel(level),
      }
    );
  }, [activeTab, availabilityLevel, integrityLevel, confidentialityLevel]);

  // Create sample implementation code based on selected levels
  const sampleImplementationCode = useMemo(() => {
    return `$ security-level --availability ${availabilityLevel} --integrity ${integrityLevel} --confidentiality ${confidentialityLevel}
Analyzing security requirements...
Generating implementation plan...
Security level set: ${availabilityLevel}/${integrityLevel}/${confidentialityLevel}
Active component: ${activeTab}`;
  }, [availabilityLevel, integrityLevel, confidentialityLevel, activeTab]);

  return (
    <WidgetContainer
      title="Technical Implementation Details"
      icon="⚙️"
      className={className}
      testId={testId}
    >
      <div className="space-y-4">
        {/* Tab Navigation */}
        <div className="flex space-x-1 border-b">
          <button
            onClick={() => setActiveTab("confidentiality")}
            className={`px-4 py-2 text-sm font-medium rounded-t-lg focus:outline-none ${
              activeTab === "confidentiality"
                ? `bg-${CIA_COMPONENT_COLORS.CONFIDENTIALITY.PRIMARY} bg-opacity-10 border-b-2`
                : "hover:bg-gray-100 dark:hover:bg-gray-800"
            }`}
            style={{
              borderBottomColor:
                activeTab === "confidentiality"
                  ? CIA_COMPONENT_COLORS.CONFIDENTIALITY.PRIMARY
                  : "transparent",
            }}
            data-testid={TECHNICAL_DETAILS_TEST_IDS.CONFIDENTIALITY_SECTION}
          >
            <span className="mr-1">{CIA_COMPONENT_ICONS.CONFIDENTIALITY}</span>
            {CIA_LABELS.CONFIDENTIALITY}
          </button>
          <button
            onClick={() => setActiveTab("integrity")}
            className={`px-4 py-2 text-sm font-medium rounded-t-lg focus:outline-none ${
              activeTab === "integrity"
                ? `bg-${CIA_COMPONENT_COLORS.INTEGRITY.PRIMARY} bg-opacity-10 border-b-2`
                : "hover:bg-gray-100 dark:hover:bg-gray-800"
            }`}
            style={{
              borderBottomColor:
                activeTab === "integrity"
                  ? CIA_COMPONENT_COLORS.INTEGRITY.PRIMARY
                  : "transparent",
            }}
            data-testid={TECHNICAL_DETAILS_TEST_IDS.INTEGRITY_SECTION}
          >
            <span className="mr-1">{CIA_COMPONENT_ICONS.INTEGRITY}</span>
            {CIA_LABELS.INTEGRITY}
          </button>
          <button
            onClick={() => setActiveTab("availability")}
            className={`px-4 py-2 text-sm font-medium rounded-t-lg focus:outline-none ${
              activeTab === "availability"
                ? `bg-${CIA_COMPONENT_COLORS.AVAILABILITY.PRIMARY} bg-opacity-10 border-b-2`
                : "hover:bg-gray-100 dark:hover:bg-gray-800"
            }`}
            style={{
              borderBottomColor:
                activeTab === "availability"
                  ? CIA_COMPONENT_COLORS.AVAILABILITY.PRIMARY
                  : "transparent",
            }}
            data-testid={TECHNICAL_DETAILS_TEST_IDS.AVAILABILITY_SECTION}
          >
            <span className="mr-1">{CIA_COMPONENT_ICONS.AVAILABILITY}</span>
            {CIA_LABELS.AVAILABILITY}
          </button>
        </div>

        {/* Technical Details Header */}
        <div className="flex items-start justify-between">
          <div>
            <h3
              className="flex items-center text-lg font-medium"
              style={{ color: activeDetails?.color.PRIMARY }}
              data-testid={TECHNICAL_DETAILS_TEST_IDS.TECHNICAL_HEADER}
            >
              <span className="mr-2">{activeDetails?.icon}</span>
              {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)} Technical
              Implementation
            </h3>
            <div className="mt-1 flex items-center">
              <StatusBadge
                status={
                  activeTab === "confidentiality"
                    ? "purple"
                    : activeTab === "integrity"
                    ? "success"
                    : "info"
                }
              >
                {activeDetails?.level}
              </StatusBadge>
              <span className="mx-2">•</span>
              <span className="text-sm font-medium">
                {activeDetails?.validationKey === "uptime"
                  ? "Uptime:"
                  : activeDetails?.validationKey === "validationMethod"
                  ? "Validation Method:"
                  : "Protection Method:"}
              </span>
              <span className="ml-1 text-sm">
                {activeDetails?.protectionMethod}
              </span>
            </div>
          </div>
        </div>

        {/* Technical Description */}
        <div
          className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700 shadow-sm"
          data-testid={TECHNICAL_DETAILS_TEST_IDS.TECHNICAL_DETAILS_SECTION}
        >
          <p
            className="text-gray-700 dark:text-gray-300"
            data-testid={TECHNICAL_DETAILS_TEST_IDS.TECHNICAL_DESCRIPTION}
          >
            {activeDetails?.details?.technical ||
              "No technical details available for this security level."}
          </p>
        </div>

        {/* Recommendations Section */}
        <div className="mt-4">
          <h4 className="text-md font-medium mb-2">
            Implementation Recommendations
          </h4>
          {activeDetails?.recommendations &&
          activeDetails.recommendations.length > 0 ? (
            <ul className="space-y-2 pl-5 list-disc marker:text-blue-500 dark:marker:text-blue-400">
              {activeDetails.recommendations.map((rec, index) => (
                <li key={index} className="text-gray-700 dark:text-gray-300">
                  {rec}
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-500 dark:text-gray-400">
              No recommendations available for this security level.
            </p>
          )}
        </div>

        {/* Implementation Requirements */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
          <div className="p-3 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
            <h5 className="text-sm font-medium mb-2 flex items-center">
              <span className="mr-2">💻</span>
              Development Effort
            </h5>
            <p
              className="text-gray-700 dark:text-gray-300 text-sm"
              data-testid={TECHNICAL_DETAILS_TEST_IDS.DEVELOPMENT_EFFORT}
            >
              {implementationDetails?.effort?.development ||
                getDefaultDevelopmentEffort(
                  activeDetails?.level as SecurityLevel
                )}
            </p>
          </div>
          <div className="p-3 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
            <h5 className="text-sm font-medium mb-2 flex items-center">
              <span className="mr-2">🔧</span>
              Maintenance
            </h5>
            <p className="text-gray-700 dark:text-gray-300 text-sm">
              {implementationDetails?.effort?.maintenance ||
                getDefaultMaintenanceEffort(
                  activeDetails?.level as SecurityLevel
                )}
            </p>
          </div>
          <div className="p-3 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
            <h5 className="text-sm font-medium mb-2 flex items-center">
              <span className="mr-2">👨‍💻</span>
              Required Expertise
            </h5>
            <p className="text-gray-700 dark:text-gray-300 text-sm">
              {implementationDetails?.effort?.expertise ||
                getDefaultExpertiseLevel(activeDetails?.level as SecurityLevel)}
            </p>
          </div>
        </div>

        {/* Terminal Implementation Display */}
        <div className="mt-6">
          <h4 className="text-md font-medium mb-2">Implementation Reference</h4>
          <div className="technical-terminal shadow-md">
            <div className="terminal-header">
              <div className="flex space-x-2">
                <div className="terminal-dot red"></div>
                <div className="terminal-dot yellow"></div>
                <div className="terminal-dot green"></div>
              </div>
              <div className="terminal-title">Terminal</div>
            </div>
            <div className="terminal-content">
              <pre className="text-xs overflow-x-auto p-2">
                <span className="terminal-prompt">$</span>{" "}
                <span className="terminal-command">
                  security-level --availability {availabilityLevel} --integrity{" "}
                  {integrityLevel} --confidentiality {confidentialityLevel}
                </span>
                <br />
                <span className="terminal-output">
                  Analyzing security requirements...
                </span>
                <br />
                <span className="terminal-output">
                  Generating implementation plan...
                </span>
                <br />
                <span className="terminal-output">
                  Security level set: {availabilityLevel}/{integrityLevel}/
                  {confidentialityLevel}
                </span>
                <br />
                <span className="terminal-output">
                  Active component: {activeTab}
                </span>
                <br />
                <span className="terminal-output">---</span>
                <br />
                <span className="terminal-output">
                  {activeDetails?.icon}{" "}
                  {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}{" "}
                  Level: {activeDetails?.level}
                </span>
                <br />
                <span className="terminal-output">
                  Protection Method: {activeDetails?.protectionMethod}
                </span>
              </pre>
            </div>
          </div>
        </div>

        {/* Code Examples Section */}
        {implementationDetails?.codeExamples &&
          implementationDetails.codeExamples.length > 0 && (
            <div className="mt-6">
              <h4 className="text-md font-medium mb-2">Code Examples</h4>
              <div className="space-y-4">
                {implementationDetails.codeExamples.map((example, index) => (
                  <div key={index} className="code-block">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-medium">
                        {example.title}
                      </span>
                      <span className="text-xs text-gray-500">
                        {example.language}
                      </span>
                    </div>
                    <pre className="overflow-x-auto">
                      <code>{example.code}</code>
                    </pre>
                  </div>
                ))}
              </div>
            </div>
          )}

        {/* Implementation Steps */}
        {implementationDetails?.implementationSteps &&
          implementationDetails.implementationSteps.length > 0 && (
            <div className="mt-6">
              <h4 className="text-md font-medium mb-2">Implementation Steps</h4>
              <div className="space-y-2">
                {implementationDetails.implementationSteps.map(
                  (step, index) => (
                    <div key={index} className="flex items-start">
                      <div className="flex-shrink-0 h-6 w-6 flex items-center justify-center rounded-full bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 mr-3">
                        {index + 1}
                      </div>
                      <p className="text-gray-700 dark:text-gray-300">{step}</p>
                    </div>
                  )
                )}
              </div>
            </div>
          )}
      </div>
    </WidgetContainer>
  );
};

export default TechnicalDetailsWidget;
