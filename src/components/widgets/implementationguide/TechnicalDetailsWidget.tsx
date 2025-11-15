import React, { useMemo, useState } from "react";
import { WIDGET_ICONS, WIDGET_TITLES } from "../../../constants/appConstants";
import { useCIAContentService } from "../../../hooks/useCIAContentService";
import { SecurityLevel } from "../../../types/cia";
import { getImplementationComplexity } from "../../../utils/riskUtils";
import { getSecurityLevelValue } from "../../../utils/securityLevelUtils";
import { hasMethod, isNullish } from "../../../utils/typeGuards";
import SecurityLevelBadge from "../../common/SecurityLevelBadge";
import WidgetContainer from "../../common/WidgetContainer";

/**
 * Props for TechnicalDetailsWidget
 */
interface TechnicalDetailsWidgetProps {
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
   * Optional CSS class name
   */
  className?: string;

  /**
   * Optional test ID for testing
   */
  testId?: string;
}

/**
 * Widget that displays detailed technical implementation requirements
 *
 * ## Business Perspective
 *
 * This widget provides technical teams with specific implementation details
 * for achieving the selected security levels. It helps bridge the gap between
 * security requirements and technical implementation by providing concrete
 * guidance on controls, configurations, and technologies. 🛠️
 */
const TechnicalDetailsWidget: React.FC<TechnicalDetailsWidgetProps> = ({
  availabilityLevel,
  integrityLevel,
  confidentialityLevel,
  className = "",
  testId = "technical-details-widget",
}) => {
  // State for active tab
  const [activeTab, setActiveTab] = useState<
    "confidentiality" | "integrity" | "availability"
  >("confidentiality");

  // Get CIA content service
  const { ciaContentService, error, isLoading } = useCIAContentService();

  // Helper to convert complexity string to numeric value for UI
  // Simplified using existing utility
  const getComplexityValue = (complexity: string): number => {
    // Convert security level value (0-4) to percentage (0-100)
    const value = getSecurityLevelValue(complexity as SecurityLevel);
    return value * 25;
  };

  // Get technical details for each component with error handling
  const confidentialityDetails = useMemo(() => {
    try {
      if (isNullish(ciaContentService)) {
        return getDefaultTechnicalDetails(
          "confidentiality",
          confidentialityLevel
        );
      }

      const details = ciaContentService.getComponentDetails?.(
        "confidentiality",
        confidentialityLevel
      );
      return isNullish(details)
        ? getDefaultTechnicalDetails("confidentiality", confidentialityLevel)
        : details;
    } catch (err) {
      console.error("Error getting confidentiality details:", err);
      return getDefaultTechnicalDetails(
        "confidentiality",
        confidentialityLevel
      );
    }
  }, [ciaContentService, confidentialityLevel]);

  // Get integrity technical details
  const integrityDetails = useMemo(() => {
    try {
      if (isNullish(ciaContentService)) {
        return getDefaultTechnicalDetails("integrity", integrityLevel);
      }

      const details = ciaContentService.getComponentDetails?.(
        "integrity",
        integrityLevel
      );
      return isNullish(details)
        ? getDefaultTechnicalDetails("integrity", integrityLevel)
        : details;
    } catch (err) {
      console.error("Error getting integrity details:", err);
      return getDefaultTechnicalDetails("integrity", integrityLevel);
    }
  }, [ciaContentService, integrityLevel]);

  // Get availability technical details
  const availabilityDetails = useMemo(() => {
    try {
      if (isNullish(ciaContentService)) {
        return getDefaultTechnicalDetails("availability", availabilityLevel);
      }

      const details = ciaContentService.getComponentDetails?.(
        "availability",
        availabilityLevel
      );
      return isNullish(details)
        ? getDefaultTechnicalDetails("availability", availabilityLevel)
        : details;
    } catch (err) {
      console.error("Error getting availability details:", err);
      return getDefaultTechnicalDetails("availability", availabilityLevel);
    }
  }, [ciaContentService, availabilityLevel]);

  // Helper to safely access optional properties from details objects
  const getOptionalProperty = (
    details: unknown,
    propertyName: string,
    defaultValue: string
  ): string => {
    if (
      details !== null &&
      typeof details === "object" &&
      Object.prototype.hasOwnProperty.call(details, propertyName)
    ) {
      const value = (details as { [key: string]: unknown })[propertyName];
      if (typeof value === "string") {
        return value;
      }
    }
    return defaultValue;
  };

  // Get technical requirements for a specific component and level
  const getTechnicalRequirements = (
    component: string,
    level: SecurityLevel
  ): string[] => {
    try {
      if (isNullish(ciaContentService)) {
        return getDefaultRequirements(component, level);
      }

      if (hasMethod(ciaContentService, "getTechnicalRequirements")) {
        const requirements = ciaContentService.getTechnicalRequirements(
          component,
          level
        );
        if (Array.isArray(requirements) && requirements.length > 0) {
          return requirements;
        }
      }

      return getDefaultRequirements(component, level);
    } catch (err) {
      console.error(`Error getting ${component} requirements:`, err);
      return getDefaultRequirements(component, level);
    }
  };

  // Get expertise required for implementation
  const getExpertiseRequired = (
    component: string,
    level: SecurityLevel
  ): string[] => {
    try {
      if (
        !isNullish(ciaContentService) &&
        hasMethod(ciaContentService, "getExpertiseRequired")
      ) {
        const expertise = ciaContentService.getExpertiseRequired(
          component,
          level
        );
        if (Array.isArray(expertise) && expertise.length > 0) {
          return expertise;
        }
      }

      return getDefaultExpertise(component, level);
    } catch (err) {
      console.error(`Error getting ${component} expertise requirements:`, err);
      return getDefaultExpertise(component, level);
    }
  };

  // Get personnel requirements
  const getPersonnelRequirements = (level: SecurityLevel): string => {
    const levelValues: Record<SecurityLevel, number> = {
      None: 0.1,
      Low: 0.25,
      Moderate: 0.5,
      High: 1,
      "Very High": 2,
    };

    return `${levelValues[level] || 0.5} FTE`;
  };

  // Calculate component complexities using riskUtils
  const confidentialityComplexity = useMemo(() => {
    const complexity = getImplementationComplexity(
      confidentialityLevel,
      confidentialityLevel,
      confidentialityLevel
    );

    return {
      value: getComplexityValue(complexity),
      label: complexity,
    };
  }, [confidentialityLevel]);

  const integrityComplexity = useMemo(() => {
    const complexity = getImplementationComplexity(
      integrityLevel,
      integrityLevel,
      integrityLevel
    );

    return {
      value: getComplexityValue(complexity),
      label: complexity,
    };
  }, [integrityLevel]);

  const availabilityComplexity = useMemo(() => {
    const complexity = getImplementationComplexity(
      availabilityLevel,
      availabilityLevel,
      availabilityLevel
    );

    return {
      value: getComplexityValue(complexity),
      label: complexity,
    };
  }, [availabilityLevel]);

  return (
    <WidgetContainer
      title={
        WIDGET_TITLES.TECHNICAL_DETAILS || "Technical Implementation Details"
      }
      icon={WIDGET_ICONS.TECHNICAL_DETAILS || "🛠️"}
      className={className}
      testId={testId}
      isLoading={isLoading}
      error={error}
    >
      <div className="p-4">
        {/* Technical details description */}
        <div className="mb-4 p-3 bg-blue-50 dark:bg-blue-900 dark:bg-opacity-20 rounded-lg">
          <p className="text-sm">
            This widget provides technical implementation details for achieving
            your selected security levels. Use these guidelines when designing
            and implementing your security controls.
          </p>
        </div>

        {/* Tab Navigation */}
        <div className="flex border-b border-gray-200 dark:border-gray-700 mb-4">
          <button
            onClick={() => setActiveTab("confidentiality")}
            className={`py-2 px-4 font-medium text-sm focus:outline-none ${
              activeTab === "confidentiality"
                ? "border-b-2 border-purple-500 text-purple-600 dark:text-purple-400"
                : "text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
            }`}
            data-testid="confidentiality-tab"
          >
            <span className="mr-1">🔒</span> Confidentiality
          </button>
          <button
            onClick={() => setActiveTab("integrity")}
            className={`py-2 px-4 font-medium text-sm focus:outline-none ${
              activeTab === "integrity"
                ? "border-b-2 border-green-500 text-green-600 dark:text-green-400"
                : "text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
            }`}
            data-testid="integrity-tab"
          >
            <span className="mr-1">✓</span> Integrity
          </button>
          <button
            onClick={() => setActiveTab("availability")}
            className={`py-2 px-4 font-medium text-sm focus:outline-none ${
              activeTab === "availability"
                ? "border-b-2 border-blue-500 text-blue-600 dark:text-blue-400"
                : "text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
            }`}
            data-testid="availability-tab"
          >
            <span className="mr-1">⏱️</span> Availability
          </button>
        </div>

        {/* Confidentiality details */}
        {activeTab === "confidentiality" && (
          <div className="mb-6" data-testid="confidentiality-section">
            <div
              className="flex items-center mb-4"
              data-testid="technical-header"
            >
              <span className="text-xl mr-2 text-purple-500">🔒</span>
              <h3 className="text-lg font-medium">Confidentiality Controls</h3>
              <div className="ml-auto">
                <SecurityLevelBadge
                  category=""
                  level={confidentialityLevel}
                  colorClass="bg-purple-100 dark:bg-purple-900 dark:bg-opacity-20"
                  textClass="text-purple-800 dark:text-purple-300"
                  testId={`${testId}-confidentiality-badge`}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              {/* Main technical details card */}
              <div className="p-4 bg-purple-50 dark:bg-purple-900 dark:bg-opacity-20 rounded-lg shadow-sm border border-purple-100 dark:border-purple-800">
                <h4 className="text-md font-medium text-purple-700 dark:text-purple-300 mb-3">
                  Technical Description
                </h4>
                <p
                  className="text-sm text-gray-600 dark:text-gray-400"
                  data-testid="technical-description"
                >
                  {confidentialityDetails?.technical ||
                    getDefaultTechDescription(
                      "confidentiality",
                      confidentialityLevel
                    )}
                </p>

                <div className="mt-4">
                  <h5 className="text-sm font-medium text-purple-700 dark:text-purple-300 mb-2">
                    Implementation Complexity
                  </h5>
                  <div
                    className="flex items-center"
                    data-testid="development-effort"
                  >
                    <div className="flex-1 h-2 bg-gray-200 dark:bg-gray-700 rounded-full mr-2">
                      <div
                        className="h-2 bg-purple-500 dark:bg-purple-600 rounded-full"
                        style={{ width: `${confidentialityComplexity.value}%` }}
                      ></div>
                    </div>
                    <span className="text-xs font-medium">
                      {confidentialityComplexity.label}
                    </span>
                  </div>
                </div>

                <div className="mt-4">
                  <h5 className="text-sm font-medium text-purple-700 dark:text-purple-300 mb-2">
                    Personnel Requirements
                  </h5>
                  <div
                    className="flex items-center"
                    data-testid="maintenance-level"
                  >
                    <span className="text-sm">Estimated staffing: </span>
                    <span className="ml-2 text-sm font-medium text-purple-600 dark:text-purple-400">
                      {getPersonnelRequirements(confidentialityLevel)}
                    </span>
                  </div>
                </div>
              </div>

              {/* Implementation requirements card */}
              <div className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
                <h4
                  className="text-md font-medium mb-3"
                  data-testid="implementation-header"
                >
                  Implementation Requirements
                </h4>
                <ul
                  className="list-disc list-inside space-y-2 text-sm text-gray-600 dark:text-gray-400"
                  data-testid="implementation-steps"
                >
                  {getTechnicalRequirements(
                    "confidentiality",
                    confidentialityLevel
                  ).map((req, index) => (
                    <li
                      key={`conf-req-${index}`}
                      data-testid={`conf-req-${index}`}
                    >
                      {req}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              {/* Technologies card */}
              <div className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
                <h4 className="text-md font-medium flex items-center mb-3">
                  <span className="mr-2 text-purple-500">💻</span>Technologies
                </h4>
                <p className="text-sm text-purple-600 dark:text-purple-400">
                  {getOptionalProperty(
                    confidentialityDetails,
                    "technologies",
                    getDefaultTechnologies(
                      "confidentiality",
                      confidentialityLevel
                    )
                  )}
                </p>
              </div>

              {/* Configurations card */}
              <div className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
                <h4 className="text-md font-medium flex items-center mb-3">
                  <span className="mr-2 text-purple-500">⚙️</span>Configurations
                </h4>
                <p className="text-sm text-purple-600 dark:text-purple-400">
                  {getOptionalProperty(
                    confidentialityDetails,
                    "configurations",
                    getDefaultConfigurations(
                      "confidentiality",
                      confidentialityLevel
                    )
                  )}
                </p>
              </div>
            </div>

            {/* Expertise Required card */}
            <div className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 mb-4">
              <h4 className="text-md font-medium flex items-center mb-3">
                <span className="mr-2 text-purple-500">👨‍💻</span>Expertise
                Required
              </h4>
              <ul
                className="grid grid-cols-1 md:grid-cols-2 gap-2"
                data-testid="required-expertise"
              >
                {getExpertiseRequired(
                  "confidentiality",
                  confidentialityLevel
                ).map((expertise, index) => (
                  <li
                    key={`conf-exp-${index}`}
                    className="flex items-center text-sm"
                  >
                    <span className="mr-2 text-purple-500">•</span>
                    <span>{expertise}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}

        {/* Integrity details */}
        {activeTab === "integrity" && (
          <div className="mb-6" data-testid="integrity-section">
            <div
              className="flex items-center mb-4"
              data-testid="technical-header"
            >
              <span className="text-xl mr-2 text-green-500">✓</span>
              <h3 className="text-lg font-medium">Integrity Controls</h3>
              <div className="ml-auto">
                <SecurityLevelBadge
                  category=""
                  level={integrityLevel}
                  colorClass="bg-green-100 dark:bg-green-900 dark:bg-opacity-20"
                  textClass="text-green-800 dark:text-green-300"
                  testId={`${testId}-integrity-badge`}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              {/* Main technical details card */}
              <div className="p-4 bg-green-50 dark:bg-green-900 dark:bg-opacity-20 rounded-lg shadow-sm border border-green-100 dark:border-green-800">
                <h4 className="text-md font-medium text-green-700 dark:text-green-300 mb-3">
                  Technical Description
                </h4>
                <p
                  className="text-sm text-gray-600 dark:text-gray-400"
                  data-testid="technical-description"
                >
                  {integrityDetails?.technical ||
                    getDefaultTechDescription("integrity", integrityLevel)}
                </p>

                <div className="mt-4">
                  <h5 className="text-sm font-medium text-green-700 dark:text-green-300 mb-2">
                    Implementation Complexity
                  </h5>
                  <div
                    className="flex items-center"
                    data-testid="development-effort"
                  >
                    <div className="flex-1 h-2 bg-gray-200 dark:bg-gray-700 rounded-full mr-2">
                      <div
                        className="h-2 bg-green-500 dark:bg-green-600 rounded-full"
                        style={{ width: `${integrityComplexity.value}%` }}
                      ></div>
                    </div>
                    <span className="text-xs font-medium">
                      {integrityComplexity.label}
                    </span>
                  </div>
                </div>

                <div className="mt-4">
                  <h5 className="text-sm font-medium text-green-700 dark:text-green-300 mb-2">
                    Personnel Requirements
                  </h5>
                  <div
                    className="flex items-center"
                    data-testid="maintenance-level"
                  >
                    <span className="text-sm">Estimated staffing: </span>
                    <span className="ml-2 text-sm font-medium text-green-600 dark:text-green-400">
                      {getPersonnelRequirements(integrityLevel)}
                    </span>
                  </div>
                </div>
              </div>

              {/* Implementation requirements card */}
              <div className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
                <h4
                  className="text-md font-medium mb-3"
                  data-testid="implementation-header"
                >
                  Implementation Requirements
                </h4>
                <ul
                  className="list-disc list-inside space-y-2 text-sm text-gray-600 dark:text-gray-400"
                  data-testid="implementation-steps"
                >
                  {getTechnicalRequirements("integrity", integrityLevel).map(
                    (req, index) => (
                      <li
                        key={`int-req-${index}`}
                        data-testid={`int-req-${index}`}
                      >
                        {req}
                      </li>
                    )
                  )}
                </ul>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              {/* Technologies card */}
              <div className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
                <h4 className="text-md font-medium flex items-center mb-3">
                  <span className="mr-2 text-green-500">💻</span>Technologies
                </h4>
                <p className="text-sm text-green-600 dark:text-green-400">
                  {getOptionalProperty(
                    integrityDetails,
                    "technologies",
                    getDefaultTechnologies("integrity", integrityLevel)
                  )}
                </p>
              </div>

              {/* Configurations card */}
              <div className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
                <h4 className="text-md font-medium flex items-center mb-3">
                  <span className="mr-2 text-green-500">⚙️</span>Configurations
                </h4>
                <p className="text-sm text-green-600 dark:text-green-400">
                  {getOptionalProperty(
                    integrityDetails,
                    "configurations",
                    getDefaultConfigurations("integrity", integrityLevel)
                  )}
                </p>
              </div>
            </div>

            {/* Expertise Required card */}
            <div className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 mb-4">
              <h4 className="text-md font-medium flex items-center mb-3">
                <span className="mr-2 text-green-500">👨‍💻</span>Expertise
                Required
              </h4>
              <ul
                className="grid grid-cols-1 md:grid-cols-2 gap-2"
                data-testid="required-expertise"
              >
                {getExpertiseRequired("integrity", integrityLevel).map(
                  (expertise, index) => (
                    <li
                      key={`int-exp-${index}`}
                      className="flex items-center text-sm"
                    >
                      <span className="mr-2 text-green-500">•</span>
                      <span>{expertise}</span>
                    </li>
                  )
                )}
              </ul>
            </div>
          </div>
        )}

        {/* Availability details */}
        {activeTab === "availability" && (
          <div className="mb-6" data-testid="availability-section">
            <div
              className="flex items-center mb-4"
              data-testid="technical-header"
            >
              <span className="text-xl mr-2 text-blue-500">⏱️</span>
              <h3 className="text-lg font-medium">Availability Controls</h3>
              <div className="ml-auto">
                <SecurityLevelBadge
                  category=""
                  level={availabilityLevel}
                  colorClass="bg-blue-100 dark:bg-blue-900 dark:bg-opacity-20"
                  textClass="text-blue-800 dark:text-blue-300"
                  testId={`${testId}-availability-badge`}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              {/* Main technical details card */}
              <div className="p-4 bg-blue-50 dark:bg-blue-900 dark:bg-opacity-20 rounded-lg shadow-sm border border-blue-100 dark:border-blue-800">
                <h4 className="text-md font-medium text-blue-700 dark:text-blue-300 mb-3">
                  Technical Description
                </h4>
                <p
                  className="text-sm text-gray-600 dark:text-gray-400"
                  data-testid="technical-description"
                >
                  {availabilityDetails?.technical ||
                    getDefaultTechDescription(
                      "availability",
                      availabilityLevel
                    )}
                </p>

                <div className="mt-4">
                  <h5 className="text-sm font-medium text-blue-700 dark:text-blue-300 mb-2">
                    Implementation Complexity
                  </h5>
                  <div
                    className="flex items-center"
                    data-testid="development-effort"
                  >
                    <div className="flex-1 h-2 bg-gray-200 dark:bg-gray-700 rounded-full mr-2">
                      <div
                        className="h-2 bg-blue-500 dark:bg-blue-600 rounded-full"
                        style={{ width: `${availabilityComplexity.value}%` }}
                      ></div>
                    </div>
                    <span className="text-xs font-medium">
                      {availabilityComplexity.label}
                    </span>
                  </div>
                </div>

                <div className="mt-4">
                  <h5 className="text-sm font-medium text-blue-700 dark:text-blue-300 mb-2">
                    Personnel Requirements
                  </h5>
                  <div
                    className="flex items-center"
                    data-testid="maintenance-level"
                  >
                    <span className="text-sm">Estimated staffing: </span>
                    <span className="ml-2 text-sm font-medium text-blue-600 dark:text-blue-400">
                      {getPersonnelRequirements(availabilityLevel)}
                    </span>
                  </div>
                </div>
              </div>

              {/* Implementation requirements card */}
              <div className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
                <h4
                  className="text-md font-medium mb-3"
                  data-testid="implementation-header"
                >
                  Implementation Requirements
                </h4>
                <ul
                  className="list-disc list-inside space-y-2 text-sm text-gray-600 dark:text-gray-400"
                  data-testid="implementation-steps"
                >
                  {getTechnicalRequirements(
                    "availability",
                    availabilityLevel
                  ).map((req, index) => (
                    <li
                      key={`avail-req-${index}`}
                      data-testid={`avail-req-${index}`}
                    >
                      {req}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              {/* Technologies card */}
              <div className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
                <h4 className="text-md font-medium flex items-center mb-3">
                  <span className="mr-2 text-blue-500">💻</span>Technologies
                </h4>
                <p className="text-sm text-blue-600 dark:text-blue-400">
                  {getOptionalProperty(
                    availabilityDetails,
                    "technologies",
                    getDefaultTechnologies("availability", availabilityLevel)
                  )}
                </p>
              </div>

              {/* Configurations card */}
              <div className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
                <h4 className="text-md font-medium flex items-center mb-3">
                  <span className="mr-2 text-blue-500">⚙️</span>Configurations
                </h4>
                <p className="text-sm text-blue-600 dark:text-blue-400">
                  {getOptionalProperty(
                    availabilityDetails,
                    "configurations",
                    getDefaultConfigurations("availability", availabilityLevel)
                  )}
                </p>
              </div>
            </div>

            {/* Expertise Required card */}
            <div className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 mb-4">
              <h4 className="text-md font-medium flex items-center mb-3">
                <span className="mr-2 text-blue-500">👨‍💻</span>Expertise Required
              </h4>
              <ul
                className="grid grid-cols-1 md:grid-cols-2 gap-2"
                data-testid="required-expertise"
              >
                {getExpertiseRequired("availability", availabilityLevel).map(
                  (expertise, index) => (
                    <li
                      key={`avail-exp-${index}`}
                      className="flex items-center text-sm"
                    >
                      <span className="mr-2 text-blue-500">•</span>
                      <span>{expertise}</span>
                    </li>
                  )
                )}
              </ul>
            </div>
          </div>
        )}

        {/* Implementation considerations */}
        <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
          <h3 className="text-lg font-medium mb-3 flex items-center">
            <span className="mr-2">💡</span>Implementation Notes
          </h3>
          <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
            <li className="flex items-start">
              <span className="mr-2 text-blue-500">•</span>
              <span>
                Implement these technical controls in a layered approach,
                starting with foundational controls.
              </span>
            </li>
            <li className="flex items-start">
              <span className="mr-2 text-blue-500">•</span>
              <span>
                Regular testing and validation are required to ensure controls
                are functioning as intended.
              </span>
            </li>
            <li className="flex items-start">
              <span className="mr-2 text-blue-500">•</span>
              <span>
                Consider integrating with existing security infrastructure to
                maximize effectiveness.
              </span>
            </li>
            <li className="flex items-start">
              <span className="mr-2 text-blue-500">•</span>
              <span>
                Document all implementation details and maintain up-to-date
                configuration records.
              </span>
            </li>
          </ul>
        </div>
      </div>
    </WidgetContainer>
  );
};

// Helper function to get default technical details when service isn't available
function getDefaultTechnicalDetails(
  component: string,
  level: SecurityLevel
): {
  description: string;
  technical: string;
  recommendations: string[];
} {
  return {
    description: getDefaultDescription(component, level),
    technical: getDefaultTechDescription(component, level),
    recommendations: getDefaultRequirements(component, level),
  };
}

// Default description based on component and security level
function getDefaultDescription(
  component: string,
  level: SecurityLevel
): string {
  if (component === "confidentiality") {
    switch (level) {
      case "None":
        return "No confidentiality controls implemented, allowing unrestricted access to data.";
      case "Low":
        return "Basic confidentiality controls to prevent casual unauthorized access to data.";
      case "Moderate":
        return "Standard confidentiality controls with defined access privileges and protections.";
      case "High":
        return "Advanced confidentiality controls with strong encryption and strict access management.";
      case "Very High":
        return "Comprehensive confidentiality controls with the highest level of protection.";
      default:
        return "Standard confidentiality controls.";
    }
  }

  if (component === "integrity") {
    switch (level) {
      case "None":
        return "No integrity controls implemented, data can be modified without detection.";
      case "Low":
        return "Basic integrity controls that provide minimal protection against unauthorized changes.";
      case "Moderate":
        return "Standard integrity controls that detect unauthorized modifications to data.";
      case "High":
        return "Advanced integrity controls with cryptographic verification of data.";
      case "Very High":
        return "Comprehensive integrity controls with immutable audit trails.";
      default:
        return "Standard integrity controls.";
    }
  }

  // Default to availability
  switch (level) {
    case "None":
      return "No availability controls implemented, no guarantees for system uptime.";
    case "Low":
      return "Basic availability controls providing minimal resilience to disruptions.";
    case "Moderate":
      return "Standard availability controls ensuring reasonable system uptime.";
    case "High":
      return "Advanced availability controls with redundancy and quick recovery capabilities.";
    case "Very High":
      return "Comprehensive availability controls with maximum fault tolerance.";
    default:
      return "Standard availability controls.";
  }
}

// Default technical description based on component and security level
function getDefaultTechDescription(
  component: string,
  level: SecurityLevel
): string {
  if (component === "confidentiality") {
    switch (level) {
      case "None":
        return "No specific technical controls for protecting data confidentiality.";
      case "Low":
        return "Basic access controls and password protection for sensitive resources.";
      case "Moderate":
        return "Role-based access control (RBAC), data encryption at rest and in transit, and proper authentication mechanisms.";
      case "High":
        return "Granular access control, strong encryption with proper key management, DLP controls, and multi-factor authentication.";
      case "Very High":
        return "Zero-trust architecture, advanced encryption with hardware security modules, comprehensive DLP, and context-aware access controls.";
      default:
        return "Standard confidentiality technical controls.";
    }
  }

  if (component === "integrity") {
    switch (level) {
      case "None":
        return "No specific technical controls for ensuring data integrity.";
      case "Low":
        return "Basic input validation and error detection mechanisms.";
      case "Moderate":
        return "Comprehensive input validation, checksums, access controls, and error detection.";
      case "High":
        return "Digital signatures, cryptographic hashing, strong change control, and comprehensive logging.";
      case "Very High":
        return "Blockchain or similar technologies for critical data, immutable audit logs, and formal verification methods.";
      default:
        return "Standard integrity technical controls.";
    }
  }

  // Default to availability
  switch (level) {
    case "None":
      return "No specific technical controls for ensuring system availability.";
    case "Low":
      return "Basic monitoring and manual recovery procedures.";
    case "Moderate":
      return "Redundant components, scheduled backups, load balancing, and defined recovery procedures.";
    case "High":
      return "Automatic failover, real-time monitoring, comprehensive disaster recovery, and advanced load balancing.";
    case "Very High":
      return "Multi-site active-active configurations, continuous data protection, and fully automated recovery with zero data loss.";
    default:
      return "Standard availability technical controls.";
  }
}

// Default technical requirements based on component and security level
function getDefaultRequirements(
  component: string,
  level: SecurityLevel
): string[] {
  if (component === "confidentiality") {
    switch (level) {
      case "None":
        return ["No specific requirements."];
      case "Low":
        return [
          "Implement user authentication",
          "Use basic password policies",
          "Apply simple access controls",
          "Secure sensitive data storage",
        ];
      case "Moderate":
        return [
          "Implement role-based access control",
          "Use standard TLS for data in transit",
          "Encrypt sensitive data at rest",
          "Enforce strong password policies",
          "Implement session management",
        ];
      case "High":
        return [
          "Implement multi-factor authentication",
          "Deploy data loss prevention solutions",
          "Use strong encryption for all data",
          "Implement privileged access management",
          "Conduct regular access reviews",
        ];
      case "Very High":
        return [
          "Implement zero-trust network architecture",
          "Use hardware security modules for encryption",
          "Deploy advanced data loss prevention",
          "Implement just-in-time access",
          "Use behavioral analytics for access monitoring",
        ];
      default:
        return ["Standard confidentiality requirements."];
    }
  }

  if (component === "integrity") {
    switch (level) {
      case "None":
        return ["No specific requirements."];
      case "Low":
        return [
          "Implement basic input validation",
          "Use simple error detection",
          "Apply basic data quality checks",
        ];
      case "Moderate":
        return [
          "Implement comprehensive input validation",
          "Use checksums for data verification",
          "Implement change detection mechanisms",
          "Maintain data validation logs",
          "Use database constraints",
        ];
      case "High":
        return [
          "Implement digital signatures",
          "Use cryptographic hash verification",
          "Deploy comprehensive audit logging",
          "Implement strict change controls",
          "Use data integrity monitoring",
        ];
      case "Very High":
        return [
          "Implement blockchain for critical data",
          "Use immutable audit trails",
          "Deploy formal verification methods",
          "Implement hardware-based integrity controls",
          "Use zero-knowledge proofs where applicable",
        ];
      default:
        return ["Standard integrity requirements."];
    }
  }

  // Default to availability
  switch (level) {
    case "None":
      return ["No specific requirements."];
    case "Low":
      return [
        "Set up basic system monitoring",
        "Implement manual backup procedures",
        "Create simple incident response plan",
      ];
    case "Moderate":
      return [
        "Implement redundant components",
        "Set up scheduled backup routines",
        "Deploy basic load balancing",
        "Create disaster recovery procedures",
        "Implement health checks and alerts",
      ];
    case "High":
      return [
        "Implement automatic failover mechanisms",
        "Deploy real-time monitoring and alerting",
        "Set up geographically distributed backups",
        "Implement advanced load balancing",
        "Create comprehensive disaster recovery plan",
      ];
    case "Very High":
      return [
        "Implement multi-site active-active configuration",
        "Deploy continuous data protection",
        "Use fully automated recovery mechanisms",
        "Implement zero-downtime deployment processes",
        "Deploy dedicated site reliability engineering",
      ];
    default:
      return ["Standard availability requirements."];
  }
}

// Default technologies based on component and security level
function getDefaultTechnologies(
  component: string,
  level: SecurityLevel
): string {
  if (component === "confidentiality") {
    switch (level) {
      case "None":
        return "No specific technologies";
      case "Low":
        return "Password managers, basic access control lists";
      case "Moderate":
        return "LDAP, Active Directory, TLS 1.2+, AES-128";
      case "High":
        return "MFA solutions, DLP tools, AES-256, Key Management Systems";
      case "Very High":
        return "Zero-trust platforms, HSMs, Advanced SIEM/SOAR, PAM solutions";
      default:
        return "Standard security technologies";
    }
  }

  if (component === "integrity") {
    switch (level) {
      case "None":
        return "No specific technologies";
      case "Low":
        return "Form validation libraries, database constraints";
      case "Moderate":
        return "Checksum tools, hash functions (SHA-256), validation frameworks";
      case "High":
        return "Digital signature tools, cryptographic libraries, audit platforms";
      case "Very High":
        return "Blockchain frameworks, zero-knowledge proof systems, formal verification tools";
      default:
        return "Standard integrity technologies";
    }
  }

  // Default to availability
  switch (level) {
    case "None":
      return "No specific technologies";
    case "Low":
      return "Basic monitoring tools, manual backup solutions";
    case "Moderate":
      return "Load balancers, backup solutions, monitoring systems";
    case "High":
      return "Clustering solutions, automated failover systems, advanced monitoring";
    case "Very High":
      return "Global load balancing, containerization, automated recovery systems";
    default:
      return "Standard availability technologies";
  }
}

// Default configurations based on component and security level
function getDefaultConfigurations(
  component: string,
  level: SecurityLevel
): string {
  if (component === "confidentiality") {
    switch (level) {
      case "None":
        return "No specific configurations";
      case "Low":
        return "Basic password policies, minimal HTTPS";
      case "Moderate":
        return "RBAC configurations, TLS 1.2+, standard encryption setup";
      case "High":
        return "MFA policies, DLP rules, key management procedures";
      case "Very High":
        return "Zero-trust policies, HSM integration, advanced access controls";
      default:
        return "Standard security configurations";
    }
  }

  if (component === "integrity") {
    switch (level) {
      case "None":
        return "No specific configurations";
      case "Low":
        return "Basic validation rules, simple error handling";
      case "Moderate":
        return "Comprehensive validation rules, hash verification setup";
      case "High":
        return "Digital signature verification, advanced audit logging, strong change control";
      case "Very High":
        return "Blockchain node configuration, immutable storage settings";
      default:
        return "Standard integrity configurations";
    }
  }

  // Default to availability
  switch (level) {
    case "None":
      return "No specific configurations";
    case "Low":
      return "Basic monitoring alerts, manual backup procedures";
    case "Moderate":
      return "Redundant configurations, backup schedules, load balancer settings";
    case "High":
      return "Cluster configurations, automated failover settings, monitoring rules";
    case "Very High":
      return "Multi-region deployments, automated scaling, zero-downtime configurations";
    default:
      return "Standard availability configurations";
  }
}

// Add function to return default expertise requirements
function getDefaultExpertise(
  component: string,
  level: SecurityLevel
): string[] {
  if (component === "confidentiality") {
    switch (level) {
      case "None":
        return ["No specific expertise required"];
      case "Low":
        return ["Basic security knowledge", "Access control fundamentals"];
      case "Moderate":
        return [
          "Identity management",
          "Encryption technologies",
          "Authentication systems",
        ];
      case "High":
        return [
          "Advanced cryptography",
          "Identity and access management",
          "Security architecture",
          "Data protection",
        ];
      case "Very High":
        return [
          "Security architecture",
          "Advanced cryptography",
          "Zero-trust implementation",
          "Data protection specialization",
          "Hardware security",
        ];
      default:
        return ["General security knowledge"];
    }
  }

  if (component === "integrity") {
    switch (level) {
      case "None":
        return ["No specific expertise required"];
      case "Low":
        return ["Basic data validation", "Error handling"];
      case "Moderate":
        return [
          "Data validation techniques",
          "Database integrity",
          "Error handling",
        ];
      case "High":
        return [
          "Cryptographic verification",
          "Digital signatures",
          "Secure logging",
          "Change management",
        ];
      case "Very High":
        return [
          "Advanced cryptography",
          "Formal verification",
          "Distributed ledger technologies",
          "Immutable logging systems",
        ];
      default:
        return ["Data integrity fundamentals"];
    }
  }

  // Default to availability expertise
  switch (level) {
    case "None":
      return ["No specific expertise required"];
    case "Low":
      return ["Basic system monitoring", "Manual recovery procedures"];
    case "Moderate":
      return ["System redundancy", "Backup management", "Basic load balancing"];
    case "High":
      return [
        "High availability architecture",
        "Disaster recovery",
        "Advanced monitoring",
        "Automated failover",
      ];
    case "Very High":
      return [
        "Distributed systems",
        "Site reliability engineering",
        "Global load balancing",
        "Chaos engineering",
        "Real-time recovery systems",
      ];
    default:
      return ["System reliability fundamentals"];
  }
}

export default TechnicalDetailsWidget;
