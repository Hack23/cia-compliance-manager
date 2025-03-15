import React, { useState, useMemo } from "react";
import { SecurityLevel } from "../../types/cia";
import { TECHNICAL_DETAILS_TEST_IDS } from "../../constants/testIds";
import ciaContentService from "../../services/ciaContentService";
import WidgetContainer from "../common/WidgetContainer";
import KeyValuePair from "../common/KeyValuePair";
import StatusBadge from "../common/StatusBadge";
import { CIA_COMPONENT_COLORS } from "../../constants/colorConstants";

// Define interface for the widget props
export interface TechnicalDetailsWidgetProps {
  availabilityLevel?: SecurityLevel | string;
  integrityLevel?: SecurityLevel | string;
  confidentialityLevel?: SecurityLevel | string;
  availabilityOptions?: Record<string, any>;
  integrityOptions?: Record<string, any>;
  confidentialityOptions?: Record<string, any>;
  className?: string;
  testId?: string;
}

/**
 * TechnicalDetailsWidget displays detailed technical implementation information
 * for each of the CIA components based on selected security levels
 */
const TechnicalDetailsWidget: React.FC<TechnicalDetailsWidgetProps> = ({
  availabilityLevel = "Moderate",
  integrityLevel = "Moderate",
  confidentialityLevel = "Moderate",
  availabilityOptions = {},
  integrityOptions = {},
  confidentialityOptions = {},
  testId = TECHNICAL_DETAILS_TEST_IDS.TECHNICAL_DETAILS_WIDGET,
}) => {
  // Use provided values or fall back to default values
  const actualAvailabilityLevel = availabilityLevel || "Moderate";
  const actualIntegrityLevel = integrityLevel || "Moderate";
  const actualConfidentialityLevel = confidentialityLevel || "Moderate"; // Fixed: was using 'confidentiality'

  const [activeTab, setActiveTab] = useState<
    "availability" | "integrity" | "confidentiality"
  >("availability");

  // Function to handle tab changes
  const handleTabChange = (
    tab: "availability" | "integrity" | "confidentiality"
  ): void => {
    setActiveTab(tab);
  };

  // Get availability implementation details from service
  const availabilityDetails = useMemo(
    () =>
      ciaContentService.getTechnicalImplementation(
        "availability",
        actualAvailabilityLevel as SecurityLevel // Cast to SecurityLevel
      ),
    [actualAvailabilityLevel]
  );

  // Get integrity implementation details from service
  const integrityDetails = useMemo(
    () =>
      ciaContentService.getTechnicalImplementation(
        "integrity",
        actualIntegrityLevel as SecurityLevel // Cast to SecurityLevel
      ),
    [actualIntegrityLevel]
  );

  // Get confidentiality implementation details from service
  const confidentialityDetails = useMemo(
    () =>
      ciaContentService.getTechnicalImplementation(
        "confidentiality",
        actualConfidentialityLevel as SecurityLevel // Cast to SecurityLevel
      ),
    [actualConfidentialityLevel]
  );

  // Get active details based on selected tab
  const getActiveDetails = () => {
    switch (activeTab) {
      case "availability":
        return {
          details: availabilityDetails,
          level: actualAvailabilityLevel,
          color: CIA_COMPONENT_COLORS.AVAILABILITY.PRIMARY,
          badgeColor: "info",
        };
      case "integrity":
        return {
          details: integrityDetails,
          level: actualIntegrityLevel,
          color: CIA_COMPONENT_COLORS.INTEGRITY.PRIMARY,
          badgeColor: "success",
        };
      case "confidentiality":
        return {
          details: confidentialityDetails,
          level: actualConfidentialityLevel,
          color: CIA_COMPONENT_COLORS.CONFIDENTIALITY.PRIMARY,
          badgeColor: "purple",
        };
      default:
        return {
          details: availabilityDetails,
          level: actualAvailabilityLevel,
          color: CIA_COMPONENT_COLORS.AVAILABILITY.PRIMARY,
          badgeColor: "info",
        };
    }
  };

  const { details, level, color, badgeColor } = getActiveDetails();

  return (
    <WidgetContainer
      title="Technical Implementation Guide"
      icon="⚙️"
      testId={testId}
    >
      {/* Tabs for switching between CIA components */}
      <div className="flex border-b mb-4" role="tablist">
        <button
          className={`px-4 py-2 focus:outline-none ${
            activeTab === "availability"
              ? "border-b-2 text-blue-600 dark:text-blue-400"
              : "text-gray-600 dark:text-gray-400"
          }`}
          onClick={() => handleTabChange("availability")}
          data-testid="availability-tab-button"
          role="tab"
          aria-selected={activeTab === "availability"}
          aria-controls="availability-tab-panel"
          id="availability-tab-button"
          style={
            activeTab === "availability"
              ? { borderColor: CIA_COMPONENT_COLORS.AVAILABILITY.PRIMARY }
              : undefined
          }
        >
          <span className="mr-1">⏱️</span>
          Availability
        </button>
        <button
          className={`px-4 py-2 focus:outline-none ${
            activeTab === "integrity"
              ? "border-b-2 text-green-600 dark:text-green-400"
              : "text-gray-600 dark:text-gray-400"
          }`}
          onClick={() => handleTabChange("integrity")}
          data-testid="integrity-tab-button"
          role="tab"
          aria-selected={activeTab === "integrity"}
          aria-controls="integrity-tab-panel"
          id="integrity-tab-button"
          style={
            activeTab === "integrity"
              ? { borderColor: CIA_COMPONENT_COLORS.INTEGRITY.PRIMARY }
              : undefined
          }
        >
          <span className="mr-1">✓</span>
          Integrity
        </button>
        <button
          className={`px-4 py-2 focus:outline-none ${
            activeTab === "confidentiality"
              ? "border-b-2 text-purple-600 dark:text-purple-400"
              : "text-gray-600 dark:text-gray-400"
          }`}
          onClick={() => handleTabChange("confidentiality")}
          data-testid="confidentiality-tab-button"
          role="tab"
          aria-selected={activeTab === "confidentiality"}
          aria-controls="confidentiality-tab-panel"
          id="confidentiality-tab-button"
          style={
            activeTab === "confidentiality"
              ? { borderColor: CIA_COMPONENT_COLORS.CONFIDENTIALITY.PRIMARY }
              : undefined
          }
        >
          <span className="mr-1">🔒</span>
          Confidentiality
        </button>
      </div>

      {/* Technical details content area */}
      <div className="p-4 border rounded-lg bg-gray-50 dark:bg-gray-700">
        <div
          role="tabpanel"
          id={`${activeTab}-tab-panel`}
          aria-labelledby={`${activeTab}-tab-button`}
          data-testid="technical-details"
        >
          {/* Level indicator and description */}
          <div className="flex items-center mb-4 justify-between">
            <h3 className="text-lg font-medium" style={{ color }}>
              {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}{" "}
              Implementation
            </h3>
            <StatusBadge status={badgeColor as any} size="md">
              {level}
            </StatusBadge>
          </div>

          {/* Technical description */}
          <p
            className="text-gray-600 dark:text-gray-300 mb-6"
            data-testid="technical-description"
          >
            {details.description || "No description available."}
          </p>

          {/* Technologies Used Section */}
          {details.technologies && details.technologies.length > 0 && (
            <div className="mt-4">
              <h4
                className="text-sm font-medium mb-2 flex items-center terminal-text"
                style={{ color }}
              >
                <span className="mr-1">💻</span>
                Technologies
              </h4>
              <div className="flex flex-wrap gap-1.5 mb-3">
                {details.technologies.map((tech: string, idx: number) => (
                  <span
                    key={idx}
                    className="inline-flex items-center px-2 py-0.5 rounded-md text-xs font-medium dark:bg-opacity-20"
                    style={{
                      backgroundColor: `${color}15`,
                      borderLeft: `2px solid ${color}`,
                      color: color,
                    }}
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Implementation Steps Section */}
          <h4
            className="text-sm font-medium mt-4 mb-2 flex items-center"
            data-testid="implementation-header"
            style={{ color }}
          >
            <span className="mr-1">📋</span>
            Implementation Steps
          </h4>

          <ul className="list-disc list-inside text-xs ml-2 space-y-2">
            {details.implementationSteps &&
              details.implementationSteps.map((step: string, index: number) => (
                <li
                  key={`${activeTab}-step-${index}`}
                  data-testid={`implementation-step-${index}`}
                  className="text-gray-600 dark:text-gray-300"
                >
                  {step}
                </li>
              ))}
          </ul>

          {/* Requirements Section */}
          {details.requirements && details.requirements.length > 0 && (
            <div
              className="mt-4 p-2 rounded-md bg-gray-50 dark:bg-black dark:bg-opacity-30 border-l-2"
              style={{ borderLeftColor: color }}
            >
              <h4
                className="text-sm font-medium mb-2 flex items-center terminal-text"
                style={{ color }}
              >
                <span className="mr-1">📝</span>
                Requirements
              </h4>
              <ul className="list-disc list-inside space-y-1 text-xs text-gray-600 dark:text-gray-300">
                {details.requirements.map((req: string, idx: number) => (
                  <li key={idx}>{req}</li>
                ))}
              </ul>
            </div>
          )}

          {/* Resources Required Section */}
          <h4
            className="text-sm font-medium mt-4 mb-2 flex items-center"
            data-testid="resources-header"
            style={{ color }}
          >
            <span className="mr-1">🔧</span>
            Resources Required
          </h4>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
            {details.effort && (
              <>
                <KeyValuePair
                  label="Development Effort"
                  value={details.effort.development}
                  testId="development-effort"
                  valueClassName={`font-medium terminal-text`}
                  className={`text-${color}`}
                />
                <KeyValuePair
                  label="Maintenance"
                  value={details.effort.maintenance}
                  testId="maintenance-level"
                  valueClassName={`font-medium terminal-text`}
                  className={`text-${color}`}
                />
                <KeyValuePair
                  label="Required Expertise"
                  value={details.effort.expertise}
                  testId="required-expertise"
                  valueClassName={`font-medium terminal-text`}
                  className={`text-${color}`}
                />
              </>
            )}
          </div>

          {/* Enhanced Implementation Metrics */}
          <div className="mt-6 bg-gray-50 dark:bg-gray-800 p-4 rounded-lg border-l-4 border-gray-300 dark:border-gray-600 security-card">
            <h3 className="text-lg font-medium mb-3 flex items-center">
              <span className="mr-2">⚙️</span>
              Implementation Metrics
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Development Effort */}
              <div className="p-3 bg-gray-100 dark:bg-gray-750 rounded-lg shadow-sm security-card">
                <h4 className="text-sm font-medium mb-2 flex items-center terminal-text">
                  <span className="mr-2">🔨</span>
                  Development Effort
                </h4>
                <div
                  className="text-gray-700 dark:text-gray-300 font-medium"
                  data-testid="development-effort"
                >
                  {details.effort?.development || "Not specified"}
                </div>
                <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                  Estimated time to implement and deploy
                </p>
              </div>

              {/* Maintenance Requirements */}
              <div className="p-3 bg-gray-100 dark:bg-gray-750 rounded-lg shadow-sm security-card">
                <h4 className="text-sm font-medium mb-2 flex items-center terminal-text">
                  <span className="mr-2">🔄</span>
                  Maintenance
                </h4>
                <div
                  className="text-gray-700 dark:text-gray-300 font-medium"
                  data-testid="maintenance-level"
                >
                  {details.effort?.maintenance || "Not specified"}
                </div>
                <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                  Ongoing maintenance requirements
                </p>
              </div>

              {/* Required Expertise */}
              <div className="p-3 bg-gray-100 dark:bg-gray-750 rounded-lg shadow-sm security-card">
                <h4 className="text-sm font-medium mb-2 flex items-center terminal-text">
                  <span className="mr-2">👤</span>
                  Required Expertise
                </h4>
                <div
                  className="text-gray-700 dark:text-gray-300 font-medium"
                  data-testid="required-expertise"
                >
                  {details.effort?.expertise || "Not specified"}
                </div>
                <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                  Team skills needed for implementation
                </p>
              </div>
            </div>
          </div>

          {/* Component-specific metrics */}
          {activeTab === "availability" && (
            <div className="mt-4 bg-blue-50 dark:bg-blue-900 dark:bg-opacity-20 p-3 rounded-lg border border-blue-200 dark:border-blue-800">
              <h5 className="text-xs font-medium mb-2 text-blue-700 dark:text-blue-300 flex items-center">
                <span className="mr-1.5">⏱️</span>
                Availability Metrics
              </h5>
              <div className="grid grid-cols-2 gap-2 text-xs">
                <KeyValuePair
                  label="RTO (Recovery Time Objective)"
                  value={details.rto || "N/A"}
                  valueClassName="text-blue-700 dark:text-blue-300 font-mono"
                />
                <KeyValuePair
                  label="RPO (Recovery Point Objective)"
                  value={details.rpo || "N/A"}
                  valueClassName="text-blue-700 dark:text-blue-300 font-mono"
                />
                {details.mttr && (
                  <KeyValuePair
                    label="MTTR (Mean Time To Recovery)"
                    value={details.mttr}
                    valueClassName="text-blue-700 dark:text-blue-300 font-mono"
                  />
                )}
                {/* Check and use an uptime property from a different source if needed */}
                {/* The availabilityDetails.uptime doesn't exist on TechnicalImplementationDetails */}
              </div>
            </div>
          )}

          {/* Integrity-specific section */}
          {activeTab === "integrity" && details.validationMethod && (
            <div className="mt-4 bg-green-50 dark:bg-green-900 dark:bg-opacity-20 p-3 rounded-lg border border-green-200 dark:border-green-800">
              <h5 className="text-xs font-medium mb-2 text-green-700 dark:text-green-300 flex items-center">
                <span className="mr-1.5">✓</span>
                Integrity Validation
              </h5>
              <div className="grid grid-cols-1 gap-2 text-xs">
                <KeyValuePair
                  label="Validation Method"
                  value={details.validationMethod}
                  valueClassName="text-green-700 dark:text-green-300 font-mono"
                />
              </div>
            </div>
          )}

          {/* Confidentiality-specific section */}
          {activeTab === "confidentiality" && (
            <div className="mt-4 bg-purple-50 dark:bg-purple-900 dark:bg-opacity-20 p-3 rounded-lg border border-purple-200 dark:border-purple-800">
              <h5 className="text-xs font-medium mb-2 text-purple-700 dark:text-purple-300 flex items-center">
                <span className="mr-1.5">🔒</span>
                Confidentiality Protection
              </h5>
              <div className="grid grid-cols-1 gap-2 text-xs">
                {/* Replace with appropriate property that exists on the details object */}
                <KeyValuePair
                  label="Protection Method"
                  value={details.validationMethod || "N/A"}
                  valueClassName="text-purple-700 dark:text-purple-300 font-mono"
                />
              </div>
            </div>
          )}

          {/* Technical Info Box */}
          <div className="mt-4 p-3 bg-black bg-opacity-30 rounded-md border border-opacity-30 terminal-text-container">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center">
                <span className="inline-block w-2 h-2 rounded-full bg-red-500 mr-1"></span>
                <span className="inline-block w-2 h-2 rounded-full bg-yellow-500 mr-1"></span>
                <span className="inline-block w-2 h-2 rounded-full bg-green-500 mr-1"></span>
                <span className="ml-2 text-xs opacity-70 font-mono">
                  technical_implementation.sh
                </span>
              </div>
              <span className="text-xs opacity-70 font-mono">bash</span>
            </div>
            <div className="font-mono text-xs text-green-400">
              <p className="mb-1">
                <span className="text-blue-400">$</span> ./{activeTab}_deploy.sh
                --level={level}
              </p>
              <p className="mb-1 text-gray-400">
                # Running implementation for {level} {activeTab}...
              </p>
              <p className="mb-1 text-green-400">✓ Checking prerequisites</p>
              <p className="mb-1 text-green-400">✓ Loading configuration</p>
              <p className="mb-1 text-green-400">✓ Validating environment</p>
              <p className="mb-1 text-purple-400">
                ► Deploying {level} security controls
              </p>
              <p className="text-yellow-400 opacity-70">
                Status: Ready for implementation
              </p>
            </div>
          </div>
        </div>
      </div>
    </WidgetContainer>
  );
};

export default TechnicalDetailsWidget;
