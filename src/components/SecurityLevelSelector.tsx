import React, { useState, useEffect } from "react";
import { SecurityLevel } from "../types/cia";
import { useCIAOptions } from "../hooks/useCIAOptions";
import {
  CIA_LABELS,
  CIA_COMPONENT_ICONS,
  SECURITY_LEVELS,
} from "../constants/appConstants";
import { CIA_TEST_IDS, COMMON_COMPONENT_TEST_IDS } from "../constants/testIds";
import { CIA_COMPONENT_COLORS } from "../constants/colorConstants";
import {
  getSecurityLevelClass,
  normalizeSecurityLevel,
} from "../utils/securityLevelUtils";
import SecurityLevelSummaryItem from "./common/SecurityLevelSummaryItem";
import ciaContentService, {
  getSecurityLevelDescription,
  CIAComponentType, // Import the CIAComponentType
} from "../services/ciaContentService";

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
    return normalizeSecurityLevel(level);
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
      className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg shadow-md border border-gray-200 dark:border-gray-700"
    >
      {/* Current Security Profile - Compact summary at top */}
      {showSelectionSummary && (
        <div className="mb-4 pb-3 border-b border-gray-200 dark:border-gray-700">
          <h4 className="font-medium mb-2 text-gray-800 dark:text-gray-200 text-sm flex items-center terminal-text">
            <span className="mr-2 pulse-dot">◉</span>
            Current Security Profile
          </h4>
          <div className="flex flex-wrap gap-2 justify-between">
            <SecurityLevelSummaryItem
              label={CIA_LABELS.CONFIDENTIALITY}
              value={confidentiality}
              icon={CIA_COMPONENT_ICONS.CONFIDENTIALITY}
              testId={COMMON_COMPONENT_TEST_IDS.CURRENT_CONFIDENTIALITY}
              color="purple"
              compact={true}
            />
            <SecurityLevelSummaryItem
              label={CIA_LABELS.INTEGRITY}
              value={integrity}
              icon={CIA_COMPONENT_ICONS.INTEGRITY}
              testId={COMMON_COMPONENT_TEST_IDS.CURRENT_INTEGRITY}
              color="green"
              compact={true}
            />
            <SecurityLevelSummaryItem
              label={CIA_LABELS.AVAILABILITY}
              value={availability}
              icon={CIA_COMPONENT_ICONS.AVAILABILITY}
              testId={COMMON_COMPONENT_TEST_IDS.CURRENT_AVAILABILITY}
              color="blue"
              compact={true}
            />
          </div>
        </div>
      )}

      {/* Security level legend - consistent visual scale */}
      <div className="mb-4 pb-3 border-b border-gray-200 dark:border-gray-700">
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
              <span
                className={`w-2 h-2 mr-1 rounded-full inline-block security-level-indicator level-${level.toLowerCase()}`}
              ></span>
              {level}
            </div>
          ))}
        </div>
      </div>

      {/* Confidentiality Section - consistent styling */}
      <div
        className="mb-5 pb-4 border-b border-gray-100 dark:border-gray-700"
        data-testid={CIA_TEST_IDS.CONFIDENTIALITY_SECTION}
      >
        <div className="flex items-center justify-between mb-2">
          <label
            htmlFor="confidentialitySelect"
            className="flex items-center terminal-text text-purple-600 dark:text-purple-400 font-medium"
          >
            <span className="mr-2 icon-confidentiality">
              {CIA_COMPONENT_ICONS.CONFIDENTIALITY}
            </span>
            {CIA_LABELS.CONFIDENTIALITY}
            <span className="text-xs text-gray-500 dark:text-gray-400 ml-2">
              Controls who can access your data and systems
            </span>
          </label>
          <button
            type="button"
            className="info-button w-6 h-6 rounded-full flex items-center justify-center bg-purple-100 dark:bg-purple-900 dark:bg-opacity-30 text-purple-600 dark:text-purple-400 hover:bg-purple-200 dark:hover:bg-purple-800 transition-colors"
            onMouseEnter={() => showTooltip("confidentiality")}
            onMouseLeave={hideTooltip}
            data-testid={CIA_TEST_IDS.CONFIDENTIALITY_TECHNICAL_INFO_BUTTON}
            aria-label="Show technical information about confidentiality"
          >
            <span className="text-xs">ℹ️</span>
          </button>
        </div>

        <div className="relative">
          <select
            id="confidentialitySelect"
            className="block w-full px-3 py-2 pr-10 text-sm border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 rounded-md dark:bg-gray-700 dark:text-white transition-colors"
            value={confidentiality}
            onChange={handleConfidentialityChange}
            disabled={disabled}
            data-testid={CIA_TEST_IDS.CONFIDENTIALITY_SELECT}
          >
            {renderOptions(confidentialityOptions, "confidentiality")}
          </select>
          <div
            className={`absolute right-3 top-2.5 w-3 h-3 rounded-full ${getSecurityLevelClass(
              confidentiality
            )}`}
            data-testid={CIA_TEST_IDS.CONFIDENTIALITY_COLOR_INDICATOR}
          ></div>
        </div>

        {confidentialityOptions?.[confidentiality]?.description &&
          showDescriptions && (
            <div
              className="mt-3 p-2.5 bg-purple-50 dark:bg-purple-900 dark:bg-opacity-10 rounded-md text-xs text-gray-700 dark:text-gray-300 border-l-4 border-purple-500"
              data-testid={CIA_TEST_IDS.CONFIDENTIALITY_DESCRIPTION}
            >
              {confidentialityOptions[confidentiality].description}
            </div>
          )}

        {confidentialityOptions?.[confidentiality]?.protectionMethod && (
          <div className="mt-2 flex items-center text-xs text-purple-600 dark:text-purple-400">
            <span className="mr-1">🛡️</span>
            <span>
              {confidentialityOptions[confidentiality].protectionMethod}
            </span>
          </div>
        )}
      </div>

      {/* Integrity Section - consistent styling */}
      <div
        className="mb-5 pb-4 border-b border-gray-100 dark:border-gray-700"
        data-testid={CIA_TEST_IDS.INTEGRITY_SECTION}
      >
        <div className="flex items-center justify-between mb-2">
          <label
            htmlFor="integritySelect"
            className="flex items-center terminal-text text-green-600 dark:text-green-400 font-medium"
          >
            <span className="mr-2 icon-integrity">
              {CIA_COMPONENT_ICONS.INTEGRITY}
            </span>
            {CIA_LABELS.INTEGRITY}
            <span className="text-xs text-gray-500 dark:text-gray-400 ml-2">
              Ensures data remains accurate and unaltered
            </span>
          </label>
          <button
            type="button"
            className="info-button w-6 h-6 rounded-full flex items-center justify-center bg-green-100 dark:bg-green-900 dark:bg-opacity-30 text-green-600 dark:text-green-400 hover:bg-green-200 dark:hover:bg-green-800 transition-colors"
            onMouseEnter={() => showTooltip("integrity")}
            onMouseLeave={hideTooltip}
            data-testid={CIA_TEST_IDS.INTEGRITY_TECHNICAL_INFO_BUTTON}
            aria-label="Show technical information about integrity"
          >
            <span className="text-xs">ℹ️</span>
          </button>
        </div>

        <div className="relative">
          <select
            id="integritySelect"
            className="block w-full px-3 py-2 pr-10 text-sm border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 rounded-md dark:bg-gray-700 dark:text-white transition-colors"
            value={integrity}
            onChange={handleIntegrityChange}
            disabled={disabled}
            data-testid={CIA_TEST_IDS.INTEGRITY_SELECT}
          >
            {renderOptions(integrityOptions, "integrity")}
          </select>
          <div
            className={`absolute right-3 top-2.5 w-3 h-3 rounded-full ${getSecurityLevelClass(
              integrity
            )}`}
            data-testid={CIA_TEST_IDS.INTEGRITY_COLOR_INDICATOR}
          ></div>
        </div>

        {integrityOptions?.[integrity]?.description && showDescriptions && (
          <div
            className="mt-3 p-2.5 bg-green-50 dark:bg-green-900 dark:bg-opacity-10 rounded-md text-xs text-gray-700 dark:text-gray-300 border-l-4 border-green-500"
            data-testid={CIA_TEST_IDS.INTEGRITY_DESCRIPTION}
          >
            {integrityOptions[integrity].description}
          </div>
        )}

        {integrityOptions?.[integrity]?.validationMethod && (
          <div className="mt-2 flex items-center text-xs text-green-600 dark:text-green-400">
            <span className="mr-1">✓</span>
            <span>{integrityOptions[integrity].validationMethod}</span>
          </div>
        )}
      </div>

      {/* Availability Section - consistent styling */}
      <div className="mb-2" data-testid={CIA_TEST_IDS.AVAILABILITY_SECTION}>
        <div className="flex items-center justify-between mb-2">
          <label
            htmlFor="availabilitySelect"
            className="flex items-center terminal-text text-blue-600 dark:text-blue-400 font-medium"
          >
            <span className="mr-2 icon-availability">
              {CIA_COMPONENT_ICONS.AVAILABILITY}
            </span>
            {CIA_LABELS.AVAILABILITY}
            <span className="text-xs text-gray-500 dark:text-gray-400 ml-2">
              Determines how reliably your systems can be accessed
            </span>
          </label>
          <button
            type="button"
            className="info-button w-6 h-6 rounded-full flex items-center justify-center bg-blue-100 dark:bg-blue-900 dark:bg-opacity-30 text-blue-600 dark:text-blue-400 hover:bg-blue-200 dark:hover:bg-blue-800 transition-colors"
            onMouseEnter={() => showTooltip("availability")}
            onMouseLeave={hideTooltip}
            data-testid={CIA_TEST_IDS.AVAILABILITY_TECHNICAL_INFO_BUTTON}
            aria-label="Show technical information about availability"
          >
            <span className="text-xs">ℹ️</span>
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
            className={`absolute right-3 top-2.5 w-3 h-3 rounded-full ${getSecurityLevelClass(
              availability
            )}`}
            data-testid={CIA_TEST_IDS.AVAILABILITY_COLOR_INDICATOR}
          ></div>
        </div>

        {availabilityOptions?.[availability]?.description &&
          showDescriptions && (
            <div
              className="mt-3 p-2.5 bg-blue-50 dark:bg-blue-900 dark:bg-opacity-10 rounded-md text-xs text-gray-700 dark:text-gray-300 border-l-4 border-blue-500"
              data-testid={CIA_TEST_IDS.AVAILABILITY_DESCRIPTION}
            >
              {availabilityOptions[availability].description}
            </div>
          )}

        {availabilityOptions?.[availability]?.uptime && (
          <div className="mt-2 flex items-center text-xs text-blue-600 dark:text-blue-400">
            <span className="mr-1">⏱️</span>
            <span>{availabilityOptions[availability].uptime}</span>
            {availabilityOptions?.[availability]?.rto && (
              <span className="ml-3">
                <span className="mr-1">🔄</span>RTO:{" "}
                {availabilityOptions[availability].rto}
              </span>
            )}
          </div>
        )}
      </div>

      {/* Active Tooltip - Technical Details with Ingress styling */}
      {activeTooltip && (
        <div className="mt-4 p-3 bg-gray-50 dark:bg-gray-800 rounded-md border border-gray-200 dark:border-gray-700 shadow-md terminal-text-container">
          <h4 className="font-medium mb-2 flex items-center text-gray-800 dark:text-gray-200 text-sm">
            <span className="mr-2 pulse-dot">◉</span>
            Technical Details
          </h4>
          <div className="text-xs leading-relaxed bg-black bg-opacity-20 dark:bg-black dark:bg-opacity-40 p-2 rounded border-l-2 border-cyan-500">
            {activeTooltip === "confidentiality" && (
              <div className="color-confidentiality terminal-text">
                <p>
                  Confidentiality measures protect sensitive data from
                  unauthorized access.
                </p>
                <p className="mt-1">
                  Higher levels implement stronger access controls, encryption,
                  and data protection mechanisms.
                </p>
              </div>
            )}
            {activeTooltip === "integrity" && (
              <div className="color-integrity terminal-text">
                <p>
                  Integrity controls ensure data remains accurate and free from
                  unauthorized modifications.
                </p>
                <p className="mt-1">
                  Higher levels implement cryptographic checksums, blockchain,
                  and advanced validation mechanisms.
                </p>
              </div>
            )}
            {activeTooltip === "availability" && (
              <div className="color-availability terminal-text">
                <p>
                  Availability measures ensure systems remain operational and
                  accessible.
                </p>
                <p className="mt-1">
                  Higher levels implement redundancy, failover systems, and
                  disaster recovery protocols.
                </p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default SecurityLevelSelector;
