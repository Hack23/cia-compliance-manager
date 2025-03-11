import React, { useState, useEffect } from "react";
import { useCIAOptions } from "../hooks/useCIAOptions";
import {
  CIA_LABELS,
  CIA_DESCRIPTIONS,
  CIA_COMPONENT_ICONS,
  UI_TEXT,
} from "../constants/appConstants";
import {
  COMMON_COMPONENT_TEST_IDS,
  CIA_TEST_IDS,
  asSecurityLevel,
} from "../constants/testIds";
import KeyValuePair from "./common/KeyValuePair";
import { SecurityLevel } from "../types/cia";
import ciaContentService, {
  getSecurityLevelDescription,
  CIAComponentType, // Import the CIAComponentType
} from "../services/ciaContentService";
import { getSecurityLevelClass } from "../utils/widgetHelpers";

export interface SecurityLevelSelectorProps {
  initialAvailability?: string;
  initialIntegrity?: string;
  initialConfidentiality?: string;
  onAvailabilityChange?: (level: string) => void;
  onIntegrityChange?: (level: string) => void;
  onConfidentialityChange?: (level: string) => void;
  availabilityOptions?: Record<string, any>;
  integrityOptions?: Record<string, any>;
  confidentialityOptions?: Record<string, any>;
  showSelectionSummary?: boolean;
  disabled?: boolean;
  testId?: string;
  showDescriptions?: boolean;
}

/**
 * SecurityLevelSelector component for selecting CIA security levels
 * Enhanced with rich descriptions and visual indicators
 */
const SecurityLevelSelector: React.FC<SecurityLevelSelectorProps> = ({
  initialAvailability = "None",
  initialIntegrity = "None",
  initialConfidentiality = "None",
  onAvailabilityChange,
  onIntegrityChange,
  onConfidentialityChange,
  availabilityOptions: propAvailabilityOptions,
  integrityOptions: propIntegrityOptions,
  confidentialityOptions: propConfidentialityOptions,
  showSelectionSummary = true,
  disabled = false,
  testId = "security-level-selector",
  showDescriptions = true,
}) => {
  const [availability, setAvailability] = useState<SecurityLevel>(
    initialAvailability as SecurityLevel
  );
  const [integrity, setIntegrity] = useState<SecurityLevel>(
    initialIntegrity as SecurityLevel
  );
  const [confidentiality, setConfidentiality] = useState<SecurityLevel>(
    initialConfidentiality as SecurityLevel
  );
  const [activeTooltip, setActiveTooltip] = useState<string | null>(null);
  const [activeDescription, setActiveDescription] = useState<string | null>(
    null
  );

  const {
    availabilityOptions: hookAvailabilityOptions,
    integrityOptions: hookIntegrityOptions,
    confidentialityOptions: hookConfidentialityOptions,
  } = useCIAOptions();

  // Use prop options if provided, otherwise use options from the hook
  const availabilityOptions =
    propAvailabilityOptions || hookAvailabilityOptions;
  const integrityOptions = propIntegrityOptions || hookIntegrityOptions;
  const confidentialityOptions =
    propConfidentialityOptions || hookConfidentialityOptions;

  useEffect(() => {
    setAvailability(initialAvailability as SecurityLevel);
  }, [initialAvailability]);

  useEffect(() => {
    setIntegrity(initialIntegrity as SecurityLevel);
  }, [initialIntegrity]);

  useEffect(() => {
    setConfidentiality(initialConfidentiality as SecurityLevel);
  }, [initialConfidentiality]);

  // Handle availability change
  const handleAvailabilityChange = (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const level = e.target.value as SecurityLevel;
    setAvailability(level);
    setActiveDescription("availability");
    if (onAvailabilityChange) {
      onAvailabilityChange(level);
    }
  };

  // Handle integrity change
  const handleIntegrityChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const level = e.target.value as SecurityLevel;
    setIntegrity(level);
    setActiveDescription("integrity");
    if (onIntegrityChange) {
      onIntegrityChange(level);
    }
  };

  // Handle confidentiality change
  const handleConfidentialityChange = (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const level = e.target.value as SecurityLevel;
    setConfidentiality(level);
    setActiveDescription("confidentiality");
    if (onConfidentialityChange) {
      onConfidentialityChange(level);
    }
  };

  // Function to show tooltip
  const showTooltip = (component: string) => {
    setActiveTooltip(component);
  };

  // Function to hide tooltip
  const hideTooltip = () => {
    setActiveTooltip(null);
  };

  // Add a utility function to safely cast strings to CIAComponentType
  const safeCastToComponentType = (component: string): CIAComponentType => {
    // Check if it's a valid CIAComponentType
    const validComponents: CIAComponentType[] = [
      "confidentiality",
      "integrity",
      "availability",
    ];
    return validComponents.includes(component as CIAComponentType)
      ? (component as CIAComponentType)
      : "confidentiality"; // Default fallback
  };

  // Get component details from ciaContentService
  const getComponentDetails = (component: string, level: SecurityLevel) => {
    const safeComponent = safeCastToComponentType(component);

    // Use the safeComponent directly since it's properly typed now
    return ciaContentService.getComponentDetails(safeComponent, level);
  };

  // Add a utility function to safely cast strings to SecurityLevel
  const safeCastToSecurityLevel = (level: string): SecurityLevel => {
    // Check if it's a valid SecurityLevel
    const validLevels: SecurityLevel[] = [
      "None",
      "Low",
      "Moderate",
      "High",
      "Very High",
    ];
    return validLevels.includes(level as SecurityLevel)
      ? (level as SecurityLevel)
      : "None";
  };

  // Render options with enhanced descriptions
  const renderOptions = (
    optionsObject: Record<string, any>,
    componentType: string
  ) => {
    return Object.keys(optionsObject || {}).map((level) => {
      const securityLevel = safeCastToSecurityLevel(level);
      const details = getComponentDetails(
        componentType, // No need for type assertion now
        securityLevel
      );
      const description = details?.description || "";
      const shortDesc =
        description.length > 50
          ? description.substring(0, 50) + "..."
          : description;

      return (
        <option
          key={level}
          value={level}
          className={getSecurityLevelClass(level)}
        >
          {level} {shortDesc ? `- ${shortDesc}` : ""}
        </option>
      );
    });
  };

  return (
    <div
      data-testid={testId}
      className="bg-white dark:bg-gray-800 p-2 rounded-lg shadow-sm"
    >
      {/* Current Security Profile - Moved to top with reduced spacing */}
      {showSelectionSummary && (
        <div className="mb-2 pb-2 border-b border-gray-200 dark:border-gray-700">
          <h4 className="font-medium mb-1 text-gray-800 dark:text-gray-200 text-xs flex items-center">
            <span className="mr-1">📊</span>
            Current Security Profile
          </h4>
          <div className="flex flex-wrap gap-1 justify-between">
            <div
              className="flex items-center py-0.5 px-1.5 rounded-md border border-gray-200 dark:border-gray-700"
              data-testid={COMMON_COMPONENT_TEST_IDS.CURRENT_CONFIDENTIALITY}
            >
              <span className="text-base mr-1">
                {CIA_COMPONENT_ICONS.CONFIDENTIALITY}
              </span>
              <div>
                <div className="text-xs text-gray-500 dark:text-gray-400 leading-tight">
                  {CIA_LABELS.CONFIDENTIALITY}
                </div>
                <div
                  className={`font-medium ${getSecurityLevelClass(
                    confidentiality
                  )} text-sm leading-tight`}
                >
                  {confidentiality}
                </div>
              </div>
            </div>
            <div
              className="flex items-center py-0.5 px-1.5 rounded-md border border-gray-200 dark:border-gray-700"
              data-testid={COMMON_COMPONENT_TEST_IDS.CURRENT_INTEGRITY}
            >
              <span className="text-base mr-1">
                {CIA_COMPONENT_ICONS.INTEGRITY}
              </span>
              <div>
                <div className="text-xs text-gray-500 dark:text-gray-400 leading-tight">
                  {CIA_LABELS.INTEGRITY}
                </div>
                <div
                  className={`font-medium ${getSecurityLevelClass(
                    integrity
                  )} text-sm leading-tight`}
                >
                  {integrity}
                </div>
              </div>
            </div>
            <div
              className="flex items-center py-0.5 px-1.5 rounded-md border border-gray-200 dark:border-gray-700"
              data-testid={COMMON_COMPONENT_TEST_IDS.CURRENT_AVAILABILITY}
            >
              <span className="text-base mr-1">
                {CIA_COMPONENT_ICONS.AVAILABILITY}
              </span>
              <div>
                <div className="text-xs text-gray-500 dark:text-gray-400 leading-tight">
                  {CIA_LABELS.AVAILABILITY}
                </div>
                <div
                  className={`font-medium ${getSecurityLevelClass(
                    availability
                  )} text-sm leading-tight`}
                >
                  {availability}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <p className="text-xs text-gray-600 dark:text-gray-400 mb-2">
        Select appropriate security levels for your system's Confidentiality,
        Integrity, and Availability requirements.
      </p>

      {/* Security level description - even more compact version at top */}
      <div className="mb-2 pb-2 border-b border-gray-200 dark:border-gray-700">
        <div className="flex justify-between items-center text-xs">
          {["None", "Low", "Moderate", "High", "Very High"].map((level) => (
            <div
              key={level}
              className={`flex items-center ${
                level === availability ||
                level === integrity ||
                level === confidentiality
                  ? "text-blue-600 dark:text-blue-400 font-medium"
                  : "text-gray-500 dark:text-gray-400"
              }`}
            >
              <div
                className={`w-2 h-2 rounded-full mr-0.5 ${getSecurityLevelClass(
                  safeCastToSecurityLevel(level)
                )}`}
              ></div>
              {level}
            </div>
          ))}
        </div>
      </div>

      {/* Confidentiality Section - with reduced spacing */}
      <div
        className="mb-2 border-b pb-2 border-gray-100 dark:border-gray-700"
        data-testid={CIA_TEST_IDS.CONFIDENTIALITY_SECTION}
      >
        <div className="flex items-start mb-0.5">
          <div className="flex-grow">
            <label
              htmlFor="confidentialitySelect"
              className="block text-sm font-medium text-gray-800 dark:text-gray-200 mb-0.5 flex items-center"
              data-testid={CIA_TEST_IDS.CONFIDENTIALITY_LABEL}
            >
              <span className="mr-1">
                {CIA_COMPONENT_ICONS.CONFIDENTIALITY}
              </span>
              {CIA_LABELS.CONFIDENTIALITY}
            </label>
            <p className="text-xs text-gray-600 dark:text-gray-400 mb-1">
              {CIA_DESCRIPTIONS.CONFIDENTIALITY}
            </p>
          </div>
          <button
            type="button"
            className="info-button"
            onMouseEnter={() => showTooltip("confidentiality")}
            onMouseLeave={hideTooltip}
            data-testid={CIA_TEST_IDS.CONFIDENTIALITY_TECHNICAL_INFO_BUTTON}
            aria-label="Show technical information about confidentiality"
          >
            <span aria-hidden="true">ℹ️</span>
            <span className="sr-only">
              Technical information about confidentiality
            </span>
          </button>
        </div>

        <div className="relative">
          <select
            id="confidentialitySelect"
            className="block w-full px-3 py-2 pr-10 text-sm border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 rounded-md dark:bg-gray-700 dark:text-white transition-colors"
            value={confidentiality}
            onChange={handleConfidentialityChange}
            disabled={disabled}
            data-testid={CIA_TEST_IDS.CONFIDENTIALITY_SELECT}
          >
            {renderOptions(confidentialityOptions, "confidentiality")}
          </select>
          <div
            className={`absolute right-3 top-2.5 w-2.5 h-2.5 rounded-full ${getSecurityLevelClass(
              confidentiality
            )}`}
            data-testid={CIA_TEST_IDS.CONFIDENTIALITY_COLOR_INDICATOR}
          ></div>
        </div>

        {confidentialityOptions?.[confidentiality]?.description &&
          showDescriptions && (
            <div
              className="mt-2 p-2 bg-gray-50 dark:bg-gray-750 rounded-md text-xs text-gray-700 dark:text-gray-300 border-l-4 border-purple-500"
              data-testid={CIA_TEST_IDS.CONFIDENTIALITY_DESCRIPTION}
            >
              {confidentialityOptions[confidentiality].description}
            </div>
          )}

        {confidentialityOptions?.[confidentiality]?.protectionMethod && (
          <div className="mt-2">
            <span
              className="inline-flex items-center font-medium rounded-full bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300 text-xs py-0.5 px-2"
              data-testid={CIA_TEST_IDS.CONFIDENTIALITY_PROTECTION_BADGE}
            >
              <span className="mr-1">🛡️</span>
              {confidentialityOptions[confidentiality].protectionMethod}
            </span>
          </div>
        )}
      </div>

      {/* Integrity Section - with reduced spacing */}
      <div
        className="mb-2 border-b pb-2 border-gray-100 dark:border-gray-700"
        data-testid={CIA_TEST_IDS.INTEGRITY_SECTION}
      >
        <div className="flex items-start mb-0.5">
          <div className="flex-grow">
            <label
              htmlFor="integritySelect"
              className="block text-sm font-medium text-gray-800 dark:text-gray-200 mb-0.5 flex items-center"
              data-testid={CIA_TEST_IDS.INTEGRITY_LABEL}
            >
              <span className="mr-1">{CIA_COMPONENT_ICONS.INTEGRITY}</span>
              {CIA_LABELS.INTEGRITY}
            </label>
            <p className="text-xs text-gray-600 dark:text-gray-400 mb-1">
              {CIA_DESCRIPTIONS.INTEGRITY}
            </p>
          </div>
          <button
            type="button"
            className="info-button"
            onMouseEnter={() => showTooltip("integrity")}
            onMouseLeave={hideTooltip}
            data-testid={CIA_TEST_IDS.INTEGRITY_TECHNICAL_INFO_BUTTON}
            aria-label="Show technical information about integrity"
          >
            <span aria-hidden="true">ℹ️</span>
            <span className="sr-only">
              Technical information about integrity
            </span>
          </button>
        </div>

        <div className="relative">
          <select
            id="integritySelect"
            className="block w-full px-3 py-2 pr-10 text-sm border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 rounded-md dark:bg-gray-700 dark:text-white transition-colors"
            value={integrity}
            onChange={handleIntegrityChange}
            disabled={disabled}
            data-testid={CIA_TEST_IDS.INTEGRITY_SELECT}
          >
            {renderOptions(integrityOptions, "integrity")}
          </select>
          <div
            className={`absolute right-3 top-2.5 w-2.5 h-2.5 rounded-full ${getSecurityLevelClass(
              integrity
            )}`}
            data-testid={CIA_TEST_IDS.INTEGRITY_COLOR_INDICATOR}
          ></div>
        </div>

        {integrityOptions?.[integrity]?.description && showDescriptions && (
          <div
            className="mt-2 p-2 bg-gray-50 dark:bg-gray-750 rounded-md text-xs text-gray-700 dark:text-gray-300 border-l-4 border-green-500"
            data-testid={CIA_TEST_IDS.INTEGRITY_DESCRIPTION}
          >
            {integrityOptions[integrity].description}
          </div>
        )}

        {integrityOptions?.[integrity]?.validationMethod && (
          <div className="mt-2">
            <span
              className="inline-flex items-center font-medium rounded-full bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300 text-xs py-0.5 px-2"
              data-testid={CIA_TEST_IDS.INTEGRITY_VALIDATION_BADGE}
            >
              <span className="mr-1">✓</span>
              {integrityOptions[integrity].validationMethod}
            </span>
          </div>
        )}
      </div>

      {/* Availability Section - with reduced spacing */}
      <div className="mb-2" data-testid={CIA_TEST_IDS.AVAILABILITY_SECTION}>
        <div className="flex items-start mb-0.5">
          <div className="flex-grow">
            <label
              htmlFor="availabilitySelect"
              className="block text-sm font-medium text-gray-800 dark:text-gray-200 mb-0.5 flex items-center"
              data-testid={CIA_TEST_IDS.AVAILABILITY_LABEL}
            >
              <span className="mr-1">{CIA_COMPONENT_ICONS.AVAILABILITY}</span>
              {CIA_LABELS.AVAILABILITY}
            </label>
            <p className="text-xs text-gray-600 dark:text-gray-400 mb-1">
              {CIA_DESCRIPTIONS.AVAILABILITY}
            </p>
          </div>
          <button
            type="button"
            className="info-button"
            onMouseEnter={() => showTooltip("availability")}
            onMouseLeave={hideTooltip}
            data-testid={CIA_TEST_IDS.AVAILABILITY_TECHNICAL_INFO_BUTTON}
            aria-label="Show technical information about availability"
          >
            <span aria-hidden="true">ℹ️</span>
            <span className="sr-only">
              Technical information about availability
            </span>
          </button>
        </div>

        <div className="relative">
          <select
            id="availabilitySelect"
            className="block w-full px-3 py-2 pr-10 text-sm border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 rounded-md dark:bg-gray-700 dark:text-white transition-colors"
            value={availability}
            onChange={handleAvailabilityChange}
            disabled={disabled}
            data-testid={CIA_TEST_IDS.AVAILABILITY_SELECT}
          >
            {renderOptions(availabilityOptions, "availability")}
          </select>
          <div
            className={`absolute right-3 top-2.5 w-2.5 h-2.5 rounded-full ${getSecurityLevelClass(
              availability
            )}`}
            data-testid={CIA_TEST_IDS.AVAILABILITY_COLOR_INDICATOR}
          ></div>
        </div>

        {availabilityOptions?.[availability]?.description &&
          showDescriptions && (
            <div
              className="mt-2 p-2 bg-gray-50 dark:bg-gray-750 rounded-md text-xs text-gray-700 dark:text-gray-300 border-l-4 border-blue-500"
              data-testid={CIA_TEST_IDS.AVAILABILITY_DESCRIPTION}
            >
              {availabilityOptions[availability].description}
            </div>
          )}

        {availabilityOptions?.[availability]?.uptime && (
          <div className="mt-2">
            <span
              className="inline-flex items-center font-medium rounded-full bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300 text-xs py-0.5 px-2"
              data-testid={CIA_TEST_IDS.AVAILABILITY_UPTIME_BADGE}
            >
              <span className="mr-1">⏱️</span>
              {availabilityOptions[availability].uptime}
            </span>
            {availabilityOptions?.[availability]?.rto && (
              <span className="ml-2 inline-flex items-center font-medium rounded-full bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300 text-xs py-0.5 px-2">
                <span className="mr-1">🔄</span>
                RTO: {availabilityOptions[availability].rto}
              </span>
            )}
          </div>
        )}
      </div>

      {/* Active Tooltip - Technical Details */}
      {activeTooltip && (
        <div className="mt-2 p-2 bg-gray-50 dark:bg-gray-700 rounded-md border border-gray-200 dark:border-gray-600 shadow-sm">
          <h4 className="font-medium mb-1 flex items-center text-gray-800 dark:text-gray-200 text-sm">
            <span className="mr-2">
              {activeTooltip === "confidentiality" &&
                CIA_COMPONENT_ICONS.CONFIDENTIALITY}
              {activeTooltip === "integrity" && CIA_COMPONENT_ICONS.INTEGRITY}
              {activeTooltip === "availability" &&
                CIA_COMPONENT_ICONS.AVAILABILITY}
            </span>
            Technical Details
          </h4>
          <div className="text-xs text-gray-700 dark:text-gray-300">
            {activeTooltip === "confidentiality" && (
              <div className="space-y-2">
                <p>
                  {confidentialityOptions?.[confidentiality]?.technical ||
                    "Defines who can access your data and systems."}
                </p>
                {confidentialityOptions?.[confidentiality]?.recommendations && (
                  <div>
                    <h5 className="font-medium mt-2 mb-1">Recommendations:</h5>
                    <ul className="list-disc list-inside">
                      {confidentialityOptions[
                        confidentiality
                      ].recommendations.map((rec: string, idx: number) => (
                        <li key={idx} className="text-sm">
                          {rec}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            )}
            {activeTooltip === "integrity" && (
              <div className="space-y-2">
                <p>
                  {integrityOptions?.[integrity]?.technical ||
                    "Ensures your data remains accurate and hasn't been tampered with."}
                </p>
                {integrityOptions?.[integrity]?.recommendations && (
                  <div>
                    <h5 className="font-medium mt-2 mb-1">Recommendations:</h5>
                    <ul className="list-disc list-inside">
                      {integrityOptions[integrity].recommendations.map(
                        (rec: string, idx: number) => (
                          <li key={idx} className="text-sm">
                            {rec}
                          </li>
                        )
                      )}
                    </ul>
                  </div>
                )}
              </div>
            )}
            {activeTooltip === "availability" && (
              <div className="space-y-2">
                <p>
                  {availabilityOptions?.[availability]?.technical ||
                    "Defines how reliably your systems and data can be accessed."}
                </p>
                {availabilityOptions?.[availability]?.recommendations && (
                  <div>
                    <h5 className="font-medium mt-2 mb-1">Recommendations:</h5>
                    <ul className="list-disc list-inside">
                      {availabilityOptions[availability].recommendations.map(
                        (rec: string, idx: number) => (
                          <li key={idx} className="text-sm">
                            {rec}
                          </li>
                        )
                      )}
                    </ul>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default SecurityLevelSelector;
