import React, { useCallback, useState } from "react";
import {
  SECURITY_LEVELS,
  WIDGET_ICONS,
  WIDGET_TITLES,
} from "../../../constants/appConstants";
import { useCIAContentService } from "../../../hooks/useCIAContentService";
import { SecurityLevel } from "../../../types/cia";
import SecurityLevelBadge from "../../common/SecurityLevelBadge";
import WidgetContainer from "../../common/WidgetContainer";

/**
 * Props for SecurityLevelWidget component
 */
export interface SecurityLevelWidgetProps {
  /**
   * Selected availability level
   */
  availabilityLevel: SecurityLevel;

  /**
   * Selected integrity level
   */
  integrityLevel: SecurityLevel;

  /**
   * Selected confidentiality level
   */
  confidentialityLevel: SecurityLevel;

  /**
   * Handler for availability level changes
   */
  onAvailabilityChange?: (level: SecurityLevel) => void;

  /**
   * Handler for integrity level changes
   */
  onIntegrityChange?: (level: SecurityLevel) => void;

  /**
   * Handler for confidentiality level changes
   */
  onConfidentialityChange?: (level: SecurityLevel) => void;

  /**
   * Optional CSS class name
   */
  className?: string;

  /**
   * Optional test ID for testing
   */
  testId?: string;
}

/**
 * Widget for configuring CIA triad security levels
 *
 * ## Business Perspective
 *
 * This widget serves as the primary control center for security officers to
 * configure their organization's security posture across the CIA triad. It
 * provides clear descriptions of each security level to help users make
 * informed decisions about their security requirements. 🔒
 *
 * The immediate visual feedback helps users understand the impact of their
 * security level choices, supporting better risk management decisions. 📊
 */
const SecurityLevelWidget: React.FC<SecurityLevelWidgetProps> = ({
  availabilityLevel,
  integrityLevel,
  confidentialityLevel,
  onAvailabilityChange,
  onIntegrityChange,
  onConfidentialityChange,
  className = "",
  testId = "security-level-widget",
}) => {
  // Use the content service for security level details
  const { ciaContentService } = useCIAContentService();

  // Track which component is active for details display
  const [activeComponent, setActiveComponent] = useState<
    "availability" | "integrity" | "confidentiality"
  >("availability");

  // Get details for the active component
  const activeDetails = ciaContentService.getComponentDetails(
    activeComponent,
    activeComponent === "availability"
      ? availabilityLevel
      : activeComponent === "integrity"
      ? integrityLevel
      : confidentialityLevel
  );

  // Create handler functions that call the prop handlers
  const handleAvailabilityChange = useCallback(
    (event: React.ChangeEvent<HTMLSelectElement>) => {
      const newLevel = event.target.value as SecurityLevel;
      console.log("SecurityLevelWidget: Setting availability to", newLevel);
      if (onAvailabilityChange) onAvailabilityChange(newLevel);
    },
    [onAvailabilityChange]
  );

  const handleIntegrityChange = useCallback(
    (event: React.ChangeEvent<HTMLSelectElement>) => {
      const newLevel = event.target.value as SecurityLevel;
      console.log("SecurityLevelWidget: Setting integrity to", newLevel);
      if (onIntegrityChange) onIntegrityChange(newLevel);
    },
    [onIntegrityChange]
  );

  const handleConfidentialityChange = useCallback(
    (event: React.ChangeEvent<HTMLSelectElement>) => {
      const newLevel = event.target.value as SecurityLevel;
      console.log("SecurityLevelWidget: Setting confidentiality to", newLevel);
      if (onConfidentialityChange) onConfidentialityChange(newLevel);
    },
    [onConfidentialityChange]
  );

  // Get security level options
  const securityLevelOptions = [
    SECURITY_LEVELS.NONE,
    SECURITY_LEVELS.LOW,
    SECURITY_LEVELS.MODERATE,
    SECURITY_LEVELS.HIGH,
    SECURITY_LEVELS.VERY_HIGH,
  ];

  // Helper function to get component-specific summary
  const getComponentSummary = (
    component: string,
    level: SecurityLevel
  ): string => {
    switch (component) {
      case "availability":
        if (level === "None") return "No uptime guarantees";
        if (level === "Low") return "~95% uptime, 24-48h recovery";
        if (level === "Moderate") return "~99% uptime, 4-8h recovery";
        if (level === "High") return "~99.9% uptime, 15-60min recovery";
        if (level === "Very High") return "~99.99% uptime, <5min recovery";
        return "";

      case "integrity":
        if (level === "None") return "No validation controls";
        if (level === "Low") return "Manual validation with basic checks";
        if (level === "Moderate") return "Automated validation with checks";
        if (level === "High") return "Cryptographic verification";
        if (level === "Very High") return "Blockchain validation";
        return "";

      case "confidentiality":
        if (level === "None") return "No access controls";
        if (level === "Low") return "Basic access control";
        if (level === "Moderate") return "RBAC with encryption";
        if (level === "High") return "E2E encryption with MFA";
        if (level === "Very High") return "Zero-trust architecture";
        return "";

      default:
        return "No details available";
    }
  };

  // Get color class for component
  const getComponentColor = (component: string): string => {
    switch (component) {
      case "availability":
        return "text-blue-600 dark:text-blue-400";
      case "integrity":
        return "text-green-600 dark:text-green-400";
      case "confidentiality":
        return "text-purple-600 dark:text-purple-400";
      default:
        return "text-gray-600 dark:text-gray-400";
    }
  };

  // Add debugging to the component render
  console.log("SecurityLevelWidget rendering with levels:", {
    availabilityLevel,
    integrityLevel,
    confidentialityLevel,
  });

  return (
    <WidgetContainer
      title={WIDGET_TITLES.SECURITY_LEVEL}
      icon={WIDGET_ICONS.SECURITY_LEVEL}
      className={className}
      testId={testId}
    >
      <div className="p-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Security level selectors */}
          <div>
            <h3 className="text-lg font-medium mb-4">
              Configure Security Levels
            </h3>

            <div className="space-y-4">
              {/* Availability selector */}
              <div
                className="p-3 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700"
                data-testid="security-level-availability"
              >
                <div className="flex justify-between items-center mb-2">
                  <label
                    htmlFor="availability-select"
                    className="text-sm font-medium flex items-center"
                  >
                    <span className="text-blue-500 dark:text-blue-400 mr-2">
                      ⏱️
                    </span>
                    Availability
                  </label>
                  <SecurityLevelBadge
                    category=""
                    level={availabilityLevel}
                    colorClass="bg-blue-100 dark:bg-blue-900 dark:bg-opacity-20"
                    textClass="text-blue-800 dark:text-blue-300"
                    testId="security-level-widget-availability-badge"
                  />
                </div>

                <select
                  id="availability-select"
                  className="w-full p-2 border rounded-md bg-white dark:bg-gray-700 dark:border-gray-600"
                  value={availabilityLevel}
                  onChange={handleAvailabilityChange}
                  data-testid="availability-select"
                >
                  {securityLevelOptions.map((level) => (
                    <option key={`availability-${level}`} value={level}>
                      {level}
                    </option>
                  ))}
                </select>

                <div
                  className="mt-2 text-xs text-gray-600 dark:text-gray-400"
                  data-testid="security-level-widget-availability-summary"
                >
                  {availabilityLevel}:{" "}
                  {getComponentSummary("availability", availabilityLevel)}
                </div>

                <button
                  className="mt-2 text-xs text-blue-600 dark:text-blue-400 hover:underline"
                  onClick={() => setActiveComponent("availability")}
                  data-testid="availability-details-button"
                >
                  View details
                </button>
              </div>

              {/* Integrity selector */}
              <div
                className="p-3 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700"
                data-testid="security-level-integrity"
              >
                <div className="flex justify-between items-center mb-2">
                  <label
                    htmlFor="integrity-select"
                    className="text-sm font-medium flex items-center"
                  >
                    <span className="text-green-500 dark:text-green-400 mr-2">
                      ✓
                    </span>
                    Integrity
                  </label>
                  <SecurityLevelBadge
                    category=""
                    level={integrityLevel}
                    colorClass="bg-green-100 dark:bg-green-900 dark:bg-opacity-20"
                    textClass="text-green-800 dark:text-green-300"
                    testId="security-level-widget-integrity-badge"
                  />
                </div>

                <select
                  id="integrity-select"
                  className="w-full p-2 border rounded-md bg-white dark:bg-gray-700 dark:border-gray-600"
                  value={integrityLevel}
                  onChange={handleIntegrityChange}
                  data-testid="integrity-select"
                >
                  {securityLevelOptions.map((level) => (
                    <option key={`integrity-${level}`} value={level}>
                      {level}
                    </option>
                  ))}
                </select>

                <div
                  className="mt-2 text-xs text-gray-600 dark:text-gray-400"
                  data-testid="security-level-widget-integrity-summary"
                >
                  {integrityLevel}:{" "}
                  {getComponentSummary("integrity", integrityLevel)}
                </div>

                <button
                  className="mt-2 text-xs text-blue-600 dark:text-blue-400 hover:underline"
                  onClick={() => setActiveComponent("integrity")}
                  data-testid="integrity-details-button"
                >
                  View details
                </button>
              </div>

              {/* Confidentiality selector */}
              <div
                className="p-3 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700"
                data-testid="security-level-confidentiality"
              >
                <div className="flex justify-between items-center mb-2">
                  <label
                    htmlFor="confidentiality-select"
                    className="text-sm font-medium flex items-center"
                  >
                    <span className="text-purple-500 dark:text-purple-400 mr-2">
                      🔒
                    </span>
                    Confidentiality
                  </label>
                  <SecurityLevelBadge
                    category=""
                    level={confidentialityLevel}
                    colorClass="bg-purple-100 dark:bg-purple-900 dark:bg-opacity-20"
                    textClass="text-purple-800 dark:text-purple-300"
                    testId="security-level-widget-confidentiality-badge"
                  />
                </div>

                <select
                  id="confidentiality-select"
                  className="w-full p-2 border rounded-md bg-white dark:bg-gray-700 dark:border-gray-600"
                  value={confidentialityLevel}
                  onChange={handleConfidentialityChange}
                  data-testid="confidentiality-select"
                >
                  {securityLevelOptions.map((level) => (
                    <option key={`confidentiality-${level}`} value={level}>
                      {level}
                    </option>
                  ))}
                </select>

                <div
                  className="mt-2 text-xs text-gray-600 dark:text-gray-400"
                  data-testid="security-level-widget-confidentiality-summary"
                >
                  {confidentialityLevel}:{" "}
                  {getComponentSummary("confidentiality", confidentialityLevel)}
                </div>

                <button
                  className="mt-2 text-xs text-blue-600 dark:text-blue-400 hover:underline"
                  onClick={() => setActiveComponent("confidentiality")}
                  data-testid="confidentiality-details-button"
                >
                  View details
                </button>
              </div>
            </div>
          </div>

          {/* Security level details */}
          <div>
            <h3 className="text-lg font-medium mb-4">
              {activeComponent.charAt(0).toUpperCase() +
                activeComponent.slice(1)}{" "}
              Details
            </h3>

            <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 h-full">
              {activeDetails ? (
                <div className="space-y-4">
                  <h4
                    className={`font-medium ${getComponentColor(
                      activeComponent
                    )}`}
                  >
                    {activeComponent === "availability"
                      ? availabilityLevel
                      : activeComponent === "integrity"
                      ? integrityLevel
                      : confidentialityLevel}{" "}
                    Level
                  </h4>

                  <div className="space-y-3">
                    {/* Description */}
                    <div>
                      <h5 className="text-sm font-medium mb-1">Description</h5>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {activeDetails.description ||
                          "No description available"}
                      </p>
                    </div>

                    {/* Technical implementation */}
                    <div>
                      <h5 className="text-sm font-medium mb-1">
                        Technical Implementation
                      </h5>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {activeDetails.technical ||
                          "No technical details available"}
                      </p>
                    </div>

                    {/* Business impact */}
                    <div>
                      <h5 className="text-sm font-medium mb-1">
                        Business Impact
                      </h5>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {activeDetails.businessImpact ||
                          "No business impact details available"}
                      </p>
                    </div>

                    {/* Component-specific details */}
                    {activeComponent === "availability" && (
                      <div className="mt-4 grid grid-cols-2 gap-3">
                        <div className="bg-blue-50 dark:bg-blue-900 dark:bg-opacity-20 p-2 rounded">
                          <div className="text-xs font-medium mb-1 text-blue-700 dark:text-blue-300">
                            Uptime
                          </div>
                          <div className="text-sm">
                            {activeDetails.uptime || "N/A"}
                          </div>
                        </div>
                        <div className="bg-blue-50 dark:bg-blue-900 dark:bg-opacity-20 p-2 rounded">
                          <div className="text-xs font-medium mb-1 text-blue-700 dark:text-blue-300">
                            Recovery Time
                          </div>
                          <div className="text-sm">
                            {activeDetails.rto || "N/A"}
                          </div>
                        </div>
                      </div>
                    )}

                    {activeComponent === "integrity" &&
                      activeDetails.validationMethod && (
                        <div className="mt-4 bg-green-50 dark:bg-green-900 dark:bg-opacity-20 p-2 rounded">
                          <div className="text-xs font-medium mb-1 text-green-700 dark:text-green-300">
                            Validation Method
                          </div>
                          <div className="text-sm">
                            {activeDetails.validationMethod}
                          </div>
                        </div>
                      )}

                    {activeComponent === "confidentiality" &&
                      activeDetails.protectionMethod && (
                        <div className="mt-4 bg-purple-50 dark:bg-purple-900 dark:bg-opacity-20 p-2 rounded">
                          <div className="text-xs font-medium mb-1 text-purple-700 dark:text-purple-300">
                            Protection Method
                          </div>
                          <div className="text-sm">
                            {activeDetails.protectionMethod}
                          </div>
                        </div>
                      )}
                  </div>
                </div>
              ) : (
                <div className="text-center text-gray-500 dark:text-gray-400 py-8">
                  <p>No details available for this security level.</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Security level overview */}
        <div className="mt-6 bg-gray-100 dark:bg-gray-800 p-4 rounded-lg">
          <h3 className="text-md font-medium mb-2">Security Level Overview</h3>
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
            Higher security levels provide stronger protection but typically
            require more resources to implement and maintain. Consider your
            organization's needs and constraints when selecting security levels.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-2 text-xs">
            <div className="p-2 bg-red-50 dark:bg-red-900 dark:bg-opacity-20 rounded">
              <div className="font-medium text-red-700 dark:text-red-300">
                None
              </div>
              <div className="text-red-600 dark:text-red-400">
                Minimal to no security controls
              </div>
            </div>
            <div className="p-2 bg-yellow-50 dark:bg-yellow-900 dark:bg-opacity-20 rounded">
              <div className="font-medium text-yellow-700 dark:text-yellow-300">
                Low
              </div>
              <div className="text-yellow-600 dark:text-yellow-400">
                Basic security controls
              </div>
            </div>
            <div className="p-2 bg-blue-50 dark:bg-blue-900 dark:bg-opacity-20 rounded">
              <div className="font-medium text-blue-700 dark:text-blue-300">
                Moderate
              </div>
              <div className="text-blue-600 dark:text-blue-400">
                Standard security controls
              </div>
            </div>
            <div className="p-2 bg-green-50 dark:bg-green-900 dark:bg-opacity-20 rounded">
              <div className="font-medium text-green-700 dark:text-green-300">
                High
              </div>
              <div className="text-green-600 dark:text-green-400">
                Advanced security controls
              </div>
            </div>
            <div className="p-2 bg-purple-50 dark:bg-purple-900 dark:bg-opacity-20 rounded">
              <div className="font-medium text-purple-700 dark:text-purple-300">
                Very High
              </div>
              <div className="text-purple-600 dark:text-purple-400">
                Maximum security controls
              </div>
            </div>
          </div>
        </div>
      </div>
    </WidgetContainer>
  );
};

// Export the component directly without HOC
export default SecurityLevelWidget;
