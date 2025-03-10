import React, { useState, useEffect } from "react";
import { useCIAOptions } from "../hooks/useCIAOptions";
import {
  CIA_LABELS,
  CIA_DESCRIPTIONS,
  CIA_COMPONENT_ICONS,
  UI_TEXT,
  SECURITY_DESCRIPTIONS,
} from "../constants/appConstants";
import { COMMON_COMPONENT_TEST_IDS, CIA_TEST_IDS } from "../constants/testIds";
import KeyValuePair from "./common/KeyValuePair";
import { SecurityLevel } from "../types/cia";
import ciaContentService from "../services/ciaContentService";
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

  // Get component details from ciaContentService
  const getComponentDetails = (component: string, level: SecurityLevel) => {
    switch (component) {
      case "confidentiality":
        return ciaContentService.getComponentDetails("confidentiality", level);
      case "integrity":
        return ciaContentService.getComponentDetails("integrity", level);
      case "availability":
        return ciaContentService.getComponentDetails("availability", level);
      default:
        return null;
    }
  };

  // Get security level description from service or constants
  const getSecurityLevelDescription = (level: SecurityLevel) => {
    return (
      SECURITY_DESCRIPTIONS[
        level.toUpperCase() as keyof typeof SECURITY_DESCRIPTIONS
      ] || `${level} security level`
    );
  };

  // Render options with enhanced descriptions
  const renderOptions = (
    optionsObject: Record<string, any>,
    componentType: string
  ) => {
    return Object.keys(optionsObject || {}).map((level) => {
      const details = getComponentDetails(
        componentType,
        level as SecurityLevel
      );
      // Fix the TypeScript error with a more robust null check
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
      className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm"
    >
      <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-6 flex items-center">
        <span className="mr-2">🛡️</span>
        {UI_TEXT.WIDGET_TITLES.SECURITY_LEVEL}
      </h3>

      <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
        Select appropriate security levels for your system's Confidentiality,
        Integrity, and Availability requirements.
      </p>

      {/* Confidentiality Section */}
      <div
        className="mb-6 border-b pb-6 border-gray-100 dark:border-gray-700"
        data-testid={CIA_TEST_IDS.CONFIDENTIALITY_SECTION}
      >
        <div className="flex items-start mb-2">
          <div className="flex-grow">
            <label
              htmlFor="confidentialitySelect"
              className="block text-md font-medium text-gray-800 dark:text-gray-200 mb-2 flex items-center"
              data-testid={CIA_TEST_IDS.CONFIDENTIALITY_LABEL}
            >
              <span className="mr-2">
                {CIA_COMPONENT_ICONS.CONFIDENTIALITY}
              </span>
              {CIA_LABELS.CONFIDENTIALITY}
            </label>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
              {CIA_DESCRIPTIONS.CONFIDENTIALITY}
            </p>
          </div>
          <button
            type="button"
            className="ml-2 p-1 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300 transition-colors rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
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
            className="block w-full px-4 py-3 pr-10 text-base border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md dark:bg-gray-700 dark:text-white transition-colors"
            value={confidentiality}
            onChange={handleConfidentialityChange}
            disabled={disabled}
            data-testid={CIA_TEST_IDS.CONFIDENTIALITY_SELECT}
          >
            {renderOptions(confidentialityOptions, "confidentiality")}
          </select>
          <div
            className={`absolute right-3 top-3 w-3 h-3 rounded-full ${getSecurityLevelClass(
              confidentiality
            )}`}
            data-testid={CIA_TEST_IDS.CONFIDENTIALITY_COLOR_INDICATOR}
          ></div>
        </div>

        {confidentialityOptions?.[confidentiality]?.description &&
          showDescriptions && (
            <div
              className="mt-3 p-3 bg-gray-50 dark:bg-gray-750 rounded-md text-sm text-gray-700 dark:text-gray-300 border-l-4 border-purple-500"
              data-testid={CIA_TEST_IDS.CONFIDENTIALITY_DESCRIPTION}
            >
              {confidentialityOptions[confidentiality].description}
            </div>
          )}

        {confidentialityOptions?.[confidentiality]?.protectionMethod && (
          <div className="mt-3">
            <span
              className="inline-flex items-center font-medium rounded-full bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300 text-xs py-1 px-2.5"
              data-testid={CIA_TEST_IDS.CONFIDENTIALITY_PROTECTION_BADGE}
            >
              <span className="mr-1">🛡️</span>
              {confidentialityOptions[confidentiality].protectionMethod}
            </span>
          </div>
        )}
      </div>

      {/* Integrity Section */}
      <div
        className="mb-6 border-b pb-6 border-gray-100 dark:border-gray-700"
        data-testid={CIA_TEST_IDS.INTEGRITY_SECTION}
      >
        <div className="flex items-start mb-2">
          <div className="flex-grow">
            <label
              htmlFor="integritySelect"
              className="block text-md font-medium text-gray-800 dark:text-gray-200 mb-2 flex items-center"
              data-testid={CIA_TEST_IDS.INTEGRITY_LABEL}
            >
              <span className="mr-2">{CIA_COMPONENT_ICONS.INTEGRITY}</span>
              {CIA_LABELS.INTEGRITY}
            </label>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
              {CIA_DESCRIPTIONS.INTEGRITY}
            </p>
          </div>
          <button
            type="button"
            className="ml-2 p-1 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300 transition-colors rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
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
            className="block w-full px-4 py-3 pr-10 text-base border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md dark:bg-gray-700 dark:text-white transition-colors"
            value={integrity}
            onChange={handleIntegrityChange}
            disabled={disabled}
            data-testid={CIA_TEST_IDS.INTEGRITY_SELECT}
          >
            {renderOptions(integrityOptions, "integrity")}
          </select>
          <div
            className={`absolute right-3 top-3 w-3 h-3 rounded-full ${getSecurityLevelClass(
              integrity
            )}`}
            data-testid={CIA_TEST_IDS.INTEGRITY_COLOR_INDICATOR}
          ></div>
        </div>

        {integrityOptions?.[integrity]?.description && showDescriptions && (
          <div
            className="mt-3 p-3 bg-gray-50 dark:bg-gray-750 rounded-md text-sm text-gray-700 dark:text-gray-300 border-l-4 border-green-500"
            data-testid={CIA_TEST_IDS.INTEGRITY_DESCRIPTION}
          >
            {integrityOptions[integrity].description}
          </div>
        )}

        {integrityOptions?.[integrity]?.validationMethod && (
          <div className="mt-3">
            <span
              className="inline-flex items-center font-medium rounded-full bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300 text-xs py-1 px-2.5"
              data-testid={CIA_TEST_IDS.INTEGRITY_VALIDATION_BADGE}
            >
              <span className="mr-1">✓</span>
              {integrityOptions[integrity].validationMethod}
            </span>
          </div>
        )}
      </div>

      {/* Availability Section */}
      <div className="mb-6" data-testid={CIA_TEST_IDS.AVAILABILITY_SECTION}>
        <div className="flex items-start mb-2">
          <div className="flex-grow">
            <label
              htmlFor="availabilitySelect"
              className="block text-md font-medium text-gray-800 dark:text-gray-200 mb-2 flex items-center"
              data-testid={CIA_TEST_IDS.AVAILABILITY_LABEL}
            >
              <span className="mr-2">{CIA_COMPONENT_ICONS.AVAILABILITY}</span>
              {CIA_LABELS.AVAILABILITY}
            </label>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
              {CIA_DESCRIPTIONS.AVAILABILITY}
            </p>
          </div>
          <button
            type="button"
            className="ml-2 p-1 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300 transition-colors rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
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
            className="block w-full px-4 py-3 pr-10 text-base border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md dark:bg-gray-700 dark:text-white transition-colors"
            value={availability}
            onChange={handleAvailabilityChange}
            disabled={disabled}
            data-testid={CIA_TEST_IDS.AVAILABILITY_SELECT}
          >
            {renderOptions(availabilityOptions, "availability")}
          </select>
          <div
            className={`absolute right-3 top-3 w-3 h-3 rounded-full ${getSecurityLevelClass(
              availability
            )}`}
            data-testid={CIA_TEST_IDS.AVAILABILITY_COLOR_INDICATOR}
          ></div>
        </div>

        {availabilityOptions?.[availability]?.description &&
          showDescriptions && (
            <div
              className="mt-3 p-3 bg-gray-50 dark:bg-gray-750 rounded-md text-sm text-gray-700 dark:text-gray-300 border-l-4 border-blue-500"
              data-testid={CIA_TEST_IDS.AVAILABILITY_DESCRIPTION}
            >
              {availabilityOptions[availability].description}
            </div>
          )}

        {availabilityOptions?.[availability]?.uptime && (
          <div className="mt-3">
            <span
              className="inline-flex items-center font-medium rounded-full bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300 text-xs py-1 px-2.5"
              data-testid={CIA_TEST_IDS.AVAILABILITY_UPTIME_BADGE}
            >
              <span className="mr-1">⏱️</span>
              {availabilityOptions[availability].uptime}
            </span>
            {availabilityOptions?.[availability]?.rto && (
              <span className="ml-2 inline-flex items-center font-medium rounded-full bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300 text-xs py-1 px-2.5">
                <span className="mr-1">🔄</span>
                RTO: {availabilityOptions[availability].rto}
              </span>
            )}
          </div>
        )}
      </div>

      {/* Active Tooltip - Technical Details */}
      {activeTooltip && (
        <div className="mt-4 p-4 bg-gray-50 dark:bg-gray-700 rounded-md border border-gray-200 dark:border-gray-600 shadow-sm">
          <h4 className="font-medium mb-2 flex items-center text-gray-800 dark:text-gray-200">
            <span className="mr-2">
              {activeTooltip === "confidentiality" &&
                CIA_COMPONENT_ICONS.CONFIDENTIALITY}
              {activeTooltip === "integrity" && CIA_COMPONENT_ICONS.INTEGRITY}
              {activeTooltip === "availability" &&
                CIA_COMPONENT_ICONS.AVAILABILITY}
            </span>
            Technical Details
          </h4>
          <div className="text-sm text-gray-700 dark:text-gray-300">
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

      {/* Security level description */}
      <div className="mt-4 mb-6">
        <h4 className="font-medium mb-2 text-gray-800 dark:text-gray-200">
          Security Level Explanation
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-5 gap-2 text-sm">
          {["None", "Low", "Moderate", "High", "Very High"].map((level) => (
            <div
              key={level}
              className={`p-2 rounded-md border ${
                level === availability ||
                level === integrity ||
                level === confidentiality
                  ? "border-blue-500 bg-blue-50 dark:bg-blue-900 dark:bg-opacity-20"
                  : "border-gray-200 dark:border-gray-700"
              }`}
            >
              <div className="font-medium flex items-center">
                <div
                  className={`w-3 h-3 rounded-full mr-2 ${getSecurityLevelClass(
                    level
                  )}`}
                ></div>
                {level}
              </div>
              <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                {getSecurityLevelDescription(level as SecurityLevel)}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Selection Summary */}
      {showSelectionSummary && (
        <div className="mt-6 pt-4 border-t border-gray-200 dark:border-gray-700">
          <h4 className="font-medium mb-3 text-gray-800 dark:text-gray-200">
            Current Security Profile
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div
              className="flex items-center p-3 bg-white dark:bg-gray-750 rounded-md border border-gray-200 dark:border-gray-700 shadow-sm"
              data-testid={COMMON_COMPONENT_TEST_IDS.CURRENT_CONFIDENTIALITY}
            >
              <span className="text-2xl mr-3">
                {CIA_COMPONENT_ICONS.CONFIDENTIALITY}
              </span>
              <KeyValuePair
                label={CIA_LABELS.CONFIDENTIALITY}
                value={
                  <span
                    className={`font-medium ${getSecurityLevelClass(
                      confidentiality
                    )}`}
                  >
                    {confidentiality}
                  </span>
                }
                testId={COMMON_COMPONENT_TEST_IDS.CONFIDENTIALITY_KV}
              />
            </div>
            <div
              className="flex items-center p-3 bg-white dark:bg-gray-750 rounded-md border border-gray-200 dark:border-gray-700 shadow-sm"
              data-testid={COMMON_COMPONENT_TEST_IDS.CURRENT_INTEGRITY}
            >
              <span className="text-2xl mr-3">
                {CIA_COMPONENT_ICONS.INTEGRITY}
              </span>
              <KeyValuePair
                label={CIA_LABELS.INTEGRITY}
                value={
                  <span
                    className={`font-medium ${getSecurityLevelClass(
                      integrity
                    )}`}
                  >
                    {integrity}
                  </span>
                }
                testId={COMMON_COMPONENT_TEST_IDS.INTEGRITY_KV}
              />
            </div>
            <div
              className="flex items-center p-3 bg-white dark:bg-gray-750 rounded-md border border-gray-200 dark:border-gray-700 shadow-sm"
              data-testid={COMMON_COMPONENT_TEST_IDS.CURRENT_AVAILABILITY}
            >
              <span className="text-2xl mr-3">
                {CIA_COMPONENT_ICONS.AVAILABILITY}
              </span>
              <KeyValuePair
                label={CIA_LABELS.AVAILABILITY}
                value={
                  <span
                    className={`font-medium ${getSecurityLevelClass(
                      availability
                    )}`}
                  >
                    {availability}
                  </span>
                }
                testId={COMMON_COMPONENT_TEST_IDS.AVAILABILITY_KV}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SecurityLevelSelector;
