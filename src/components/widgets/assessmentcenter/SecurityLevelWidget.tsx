import React, { useCallback, useEffect, useState } from "react";
import {
  SECURITY_LEVELS,
  WIDGET_ICONS,
  WIDGET_TITLES,
} from "../../../constants/appConstants";
import { CIA_COMPONENT_ICONS } from "../../../constants/uiConstants";
import { SECURITY_LEVEL_WIDGET_IDS, CIA_TEST_IDS } from "../../../constants/testIds";
import { useCIAContentService } from "../../../hooks/useCIAContentService";
import { SecurityLevel } from "../../../types/cia";
import { CIADetails } from "../../../types/cia-services";
import { SecurityLevelWidgetProps } from "../../../types/widget-props";
import { 
  getWidgetAriaDescription,
  announceToScreenReader 
} from "../../../utils/accessibility";
import { WidgetClasses, cn } from "../../../utils/tailwindClassHelpers";
import SecurityLevelBadge from "../../common/SecurityLevelBadge";
import WidgetContainer from "../../common/WidgetContainer";
import WidgetErrorBoundary from "../../common/WidgetErrorBoundary";

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
 * ## Security Perspective
 *
 * Enables fine-grained control over each CIA component, with detailed
 * explanations of security implications for each level. Helps security
 * teams implement appropriate controls based on organizational needs.
 *
 * ## Architecture Perspective
 *
 * Provides technical implementation details for each security level,
 * helping system architects understand what controls and mechanisms
 * need to be implemented to achieve the selected security levels.
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

  // Define local state for error and loading
  const [serviceError, setServiceError] = useState<Error | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // Track which component is active for details display
  const [activeComponent, setActiveComponent] = useState<
    "availability" | "integrity" | "confidentiality"
  >("availability");

  // Add error state
  const [error, setError] = useState<Error | null>(null);
  const [activeDetails, setActiveDetails] = useState<CIADetails | null>(null);

  // Track the last changed component for visual feedback
  const [lastChangedComponent, setLastChangedComponent] = useState<
    "availability" | "integrity" | "confidentiality" | null
  >(null);

  // Get details for the active component with error handling
  useEffect(() => {
    setIsLoading(true);
    try {
      if (!ciaContentService) {
        throw new Error("Content service unavailable");
      }

      const selectedLevel =
        activeComponent === "availability"
          ? availabilityLevel
          : activeComponent === "integrity"
          ? integrityLevel
          : confidentialityLevel;

      const details = ciaContentService.getComponentDetails(
        activeComponent,
        selectedLevel
      ) || {
        description: "No details available",
        technical: "No technical information available",
        businessImpact: "No business impact information available",
        recommendations: [],
      };

      setActiveDetails(details);
      setError(null);
      setServiceError(null);
    } catch (err) {
      console.error("Error loading component details:", err);
      setError(
        err instanceof Error
          ? err
          : new Error("Failed to load component details")
      );
      setServiceError(err instanceof Error ? err : new Error("Service error"));
    } finally {
      setIsLoading(false);
    }
  }, [
    ciaContentService,
    activeComponent,
    availabilityLevel,
    integrityLevel,
    confidentialityLevel,
  ]);

  // Create handler functions that call the prop handlers
  const handleAvailabilityChange = useCallback(
    (event: React.ChangeEvent<HTMLSelectElement>) => {
      const newLevel = event.target.value as SecurityLevel;
      if (onAvailabilityChange) onAvailabilityChange(newLevel);
      setLastChangedComponent("availability");
      // Announce change to screen readers
      announceToScreenReader(`Availability security level changed to ${newLevel}`, 'polite');
    },
    [onAvailabilityChange]
  );

  const handleIntegrityChange = useCallback(
    (event: React.ChangeEvent<HTMLSelectElement>) => {
      const newLevel = event.target.value as SecurityLevel;
      if (onIntegrityChange) onIntegrityChange(newLevel);
      setLastChangedComponent("integrity");
      // Announce change to screen readers
      announceToScreenReader(`Integrity security level changed to ${newLevel}`, 'polite');
    },
    [onIntegrityChange]
  );

  const handleConfidentialityChange = useCallback(
    (event: React.ChangeEvent<HTMLSelectElement>) => {
      const newLevel = event.target.value as SecurityLevel;
      if (onConfidentialityChange) onConfidentialityChange(newLevel);
      setLastChangedComponent("confidentiality");
      // Announce change to screen readers
      announceToScreenReader(`Confidentiality security level changed to ${newLevel}`, 'polite');
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

  // Get color class for component - Use standardized utility
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

  return (
    <WidgetErrorBoundary widgetName="Security Level">
      <WidgetContainer
        title={WIDGET_TITLES.SECURITY_LEVEL}
        icon={WIDGET_ICONS.SECURITY_LEVEL}
        className={className}
        testId={testId}
      >
      <div 
        className={cn("p-md sm:p-lg")}
        role="region"
        aria-label={getWidgetAriaDescription(
          "Security Level Configuration",
          "Configure security levels for each CIA component to set your organization's security posture"
        )}
      >
        <div className={cn(
          WidgetClasses.section,
          "p-md rounded-md",
          "bg-info-light/10 dark:bg-info-dark/20"
        )}>
          <p className={cn(WidgetClasses.body)}>
            Configure security levels for each CIA component to set your
            organization's security posture. Higher levels provide stronger
            protection but may require more resources to implement.
          </p>
        </div>

        {/* Display error message if there's an error */}
        {(error || serviceError) && (
          <div className={cn(
            WidgetClasses.card,
            "mb-md bg-error-light/10 dark:bg-error-dark/20 text-error-dark dark:text-error-light shadow-none"
          )}>
            <h4 className="font-medium">Error</h4>
            <p className={cn(WidgetClasses.body)}>
              Unable to load component details. Please try again later.
            </p>
          </div>
        )}

        {/* Display loading state */}
        {isLoading && (
          <div className={cn(
            WidgetClasses.card,
            WidgetClasses.loading,
            "mb-md bg-info-light/10 dark:bg-info-dark/20 text-info-dark dark:text-info-light shadow-none"
          )}>
            <p className={cn(WidgetClasses.body)}>Loading security level details...</p>
          </div>
        )}

        <div className={cn(WidgetClasses.grid2Cols)}>
          {/* Security level selectors */}
          <div>
            <h3 className={cn(WidgetClasses.heading)}>
              Configure Security Levels
            </h3>

            <div className="space-y-md">
              {/* Confidentiality selector */}
              <div
                className={cn(
                  WidgetClasses.card,
                  "bg-neutral-light/10 dark:bg-neutral-dark/20"
                )}
                data-testid={SECURITY_LEVEL_WIDGET_IDS.section('confidentiality')}
              >
                <div className="flex justify-between items-center mb-sm">
                  <label
                    htmlFor="confidentiality-select"
                    className={cn(WidgetClasses.body, "font-medium flex items-center")}
                  >
                    <span className="text-purple-500 dark:text-purple-400 mr-sm">
                      {CIA_COMPONENT_ICONS.confidentiality}
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
                  className={cn(
                    "w-full p-sm border rounded-md bg-white dark:bg-gray-700 dark:border-gray-600 transition-all duration-normal hover:border-purple-400",
                    WidgetClasses.focusVisible
                  )}
                  value={confidentialityLevel}
                  onChange={handleConfidentialityChange}
                  data-testid={CIA_TEST_IDS.CONFIDENTIALITY_SELECT}
                >
                  {securityLevelOptions.map((level) => (
                    <option key={`confidentiality-${level}`} value={level}>
                      {level}
                    </option>
                  ))}
                </select>

                <div
                  className={cn(WidgetClasses.labelNormal, "mt-sm")}
                  data-testid={SECURITY_LEVEL_WIDGET_IDS.label('confidentiality-summary')}
                >
                  {confidentialityLevel}:{" "}
                  {getComponentSummary("confidentiality", confidentialityLevel)}
                </div>

                <button
                  className={cn(
                    WidgetClasses.buttonPrimary,
                    "mt-sm min-h-[44px] min-w-[44px]"
                  )}
                  onClick={() => setActiveComponent("confidentiality")}
                  data-testid={SECURITY_LEVEL_WIDGET_IDS.button('confidentiality-details')}
                >
                  View details
                </button>

                {lastChangedComponent === "confidentiality" && (
                  <div
                    className={cn(WidgetClasses.labelNormal, "mt-sm text-green-600 dark:text-green-400 animate-pulse")}
                    data-testid={SECURITY_LEVEL_WIDGET_IDS.label('confidentiality-changed')}
                  >
                    ✓ Security level updated
                  </div>
                )}
              </div>

              {/* Integrity selector */}
              <div
                className="p-md bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700"
                data-testid={SECURITY_LEVEL_WIDGET_IDS.section('integrity')}
              >
                <div className="flex justify-between items-center mb-sm">
                  <label
                    htmlFor="integrity-select"
                    className="text-sm font-medium flex items-center"
                  >
                    <span className="text-green-500 dark:text-green-400 mr-sm">
                      {CIA_COMPONENT_ICONS.integrity}
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
                  className="w-full p-sm border rounded-md bg-white dark:bg-gray-700 dark:border-gray-600 transition-all duration-300 hover:border-green-400 focus:border-green-500 focus:ring-2 focus:ring-green-200"
                  value={integrityLevel}
                  onChange={handleIntegrityChange}
                  data-testid={CIA_TEST_IDS.INTEGRITY_SELECT}
                >
                  {securityLevelOptions.map((level) => (
                    <option key={`integrity-${level}`} value={level}>
                      {level}
                    </option>
                  ))}
                </select>

                <div
                  className="mt-sm text-xs text-gray-600 dark:text-gray-400"
                  data-testid={SECURITY_LEVEL_WIDGET_IDS.label('integrity-summary')}
                >
                  {integrityLevel}:{" "}
                  {getComponentSummary("integrity", integrityLevel)}
                </div>

                <button
                  className="mt-sm px-4 py-3 sm:px-3 sm:py-2 text-sm sm:text-xs min-h-[44px] min-w-[44px] bg-green-600 text-white rounded hover:bg-green-700 dark:bg-green-700 dark:hover:bg-green-600 transition-colors"
                  onClick={() => setActiveComponent("integrity")}
                  data-testid={SECURITY_LEVEL_WIDGET_IDS.button('integrity-details')}
                >
                  View details
                </button>

                {lastChangedComponent === "integrity" && (
                  <div
                    className="mt-sm text-xs text-green-600 dark:text-green-400 animate-pulse"
                    data-testid={SECURITY_LEVEL_WIDGET_IDS.label('integrity-changed')}
                  >
                    ✓ Security level updated
                  </div>
                )}
              </div>

              {/* Availability selector */}
              <div
                className="p-md bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700"
                data-testid={SECURITY_LEVEL_WIDGET_IDS.section('availability')}
              >
                <div className="flex justify-between items-center mb-sm">
                  <label
                    htmlFor="availability-select"
                    className="text-sm font-medium flex items-center"
                  >
                    <span className="text-blue-500 dark:text-blue-400 mr-sm">
                      {CIA_COMPONENT_ICONS.availability}
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
                  className="w-full p-sm border rounded-md bg-white dark:bg-gray-700 dark:border-gray-600 transition-all duration-300 hover:border-blue-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                  value={availabilityLevel}
                  onChange={handleAvailabilityChange}
                  data-testid={CIA_TEST_IDS.AVAILABILITY_SELECT}
                >
                  {securityLevelOptions.map((level) => (
                    <option key={`availability-${level}`} value={level}>
                      {level}
                    </option>
                  ))}
                </select>

                <div
                  className="mt-sm text-xs text-gray-600 dark:text-gray-400"
                  data-testid={SECURITY_LEVEL_WIDGET_IDS.label('availability-summary')}
                >
                  {availabilityLevel}:{" "}
                  {getComponentSummary("availability", availabilityLevel)}
                </div>

                <button
                  className="mt-sm px-4 py-3 sm:px-3 sm:py-2 text-sm sm:text-xs min-h-[44px] min-w-[44px] bg-blue-600 text-white rounded hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-600 transition-colors"
                  onClick={() => setActiveComponent("availability")}
                  data-testid={SECURITY_LEVEL_WIDGET_IDS.button('availability-details')}
                >
                  View details
                </button>

                {lastChangedComponent === "availability" && (
                  <div
                    className="mt-sm text-xs text-green-600 dark:text-green-400 animate-pulse"
                    data-testid={SECURITY_LEVEL_WIDGET_IDS.label('availability-changed')}
                  >
                    ✓ Security level updated
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Security level details */}
          <div>
            <h3 className="text-base sm:text-lg font-medium mb-md">
              {activeComponent.charAt(0).toUpperCase() +
                activeComponent.slice(1)}{" "}
              Details
            </h3>

            <div
              className="p-md bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 h-full"
              data-testid={`${activeComponent}-details-content`}
            >
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
                      <h5 className="text-sm font-medium mb-xs">Description</h5>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {activeDetails.description ||
                          "No description available"}
                      </p>
                    </div>

                    {/* Technical implementation */}
                    <div>
                      <h5 className="text-sm font-medium mb-xs">
                        Technical Implementation
                      </h5>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {activeDetails.technical ||
                          "No technical details available"}
                      </p>
                    </div>

                    {/* Business impact */}
                    <div>
                      <h5 className="text-sm font-medium mb-xs">
                        Business Impact
                      </h5>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {activeDetails.businessImpact ||
                          "No business impact details available"}
                      </p>
                    </div>

                    {/* Component-specific details */}
                    {activeComponent === "availability" && (
                      <div className="mt-md grid grid-cols-2 gap-md">
                        <div className="bg-blue-50 dark:bg-blue-900 dark:bg-opacity-20 p-sm rounded">
                          <div className="text-xs font-medium mb-xs text-blue-700 dark:text-blue-300">
                            Uptime
                          </div>
                          <div className="text-sm">
                            {activeDetails.uptime || "N/A"}
                          </div>
                        </div>
                        <div className="bg-blue-50 dark:bg-blue-900 dark:bg-opacity-20 p-sm rounded">
                          <div className="text-xs font-medium mb-xs text-blue-700 dark:text-blue-300">
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
                        <div className="mt-md bg-green-50 dark:bg-green-900 dark:bg-opacity-20 p-sm rounded">
                          <div className="text-xs font-medium mb-xs text-green-700 dark:text-green-300">
                            Validation Method
                          </div>
                          <div className="text-sm">
                            {activeDetails.validationMethod}
                          </div>
                        </div>
                      )}

                    {activeComponent === "confidentiality" &&
                      activeDetails.protectionMethod && (
                        <div className="mt-md bg-purple-50 dark:bg-purple-900 dark:bg-opacity-20 p-sm rounded">
                          <div className="text-xs font-medium mb-xs text-purple-700 dark:text-purple-300">
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
        <div className="mt-lg bg-gray-100 dark:bg-gray-800 p-md rounded-lg">
          <h3 className="text-md font-medium mb-sm">Security Level Overview</h3>
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-md">
            Higher security levels provide stronger protection but typically
            require more resources to implement and maintain. Consider your
            organization's needs and constraints when selecting security levels.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-sm text-xs">
            <div className="p-sm bg-red-50 dark:bg-red-900 dark:bg-opacity-20 rounded">
              <div className="font-medium text-red-700 dark:text-red-300">
                None
              </div>
              <div className="text-red-600 dark:text-red-400">
                Minimal to no security controls
              </div>
            </div>
            <div className="p-sm bg-yellow-50 dark:bg-yellow-900 dark:bg-opacity-20 rounded">
              <div className="font-medium text-yellow-700 dark:text-yellow-300">
                Low
              </div>
              <div className="text-yellow-600 dark:text-yellow-400">
                Basic security controls
              </div>
            </div>
            <div className="p-sm bg-blue-50 dark:bg-blue-900 dark:bg-opacity-20 rounded">
              <div className="font-medium text-blue-700 dark:text-blue-300">
                Moderate
              </div>
              <div className="text-blue-600 dark:text-blue-400">
                Standard security controls
              </div>
            </div>
            <div className="p-sm bg-green-50 dark:bg-green-900 dark:bg-opacity-20 rounded">
              <div className="font-medium text-green-700 dark:text-green-300">
                High
              </div>
              <div className="text-green-600 dark:text-green-400">
                Advanced security controls
              </div>
            </div>
            <div className="p-sm bg-purple-50 dark:bg-purple-900 dark:bg-opacity-20 rounded">
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
    </WidgetErrorBoundary>
  );
};

// Export the component directly without HOC
export default SecurityLevelWidget;
