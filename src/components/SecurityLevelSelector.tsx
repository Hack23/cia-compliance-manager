import React, { useState, useEffect } from "react";
import { useCIAOptions } from "../hooks/useCIAOptions";
import {
  CIA_LABELS,
  CIA_DESCRIPTIONS,
  CIA_COMPONENT_ICONS,
  UI_TEXT,
} from "../constants/appConstants";
import { COMMON_COMPONENT_TEST_IDS, CIA_TEST_IDS } from "../constants/testIds";
import KeyValuePair from "./common/KeyValuePair";
import { SecurityLevel } from "../types/cia";

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
}

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
}) => {
  const [availability, setAvailability] = useState(initialAvailability);
  const [integrity, setIntegrity] = useState(initialIntegrity);
  const [confidentiality, setConfidentiality] = useState(
    initialConfidentiality
  );
  const [activeTooltip, setActiveTooltip] = useState<string | null>(null);

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
    setAvailability(initialAvailability);
  }, [initialAvailability]);

  useEffect(() => {
    setIntegrity(initialIntegrity);
  }, [initialIntegrity]);

  useEffect(() => {
    setConfidentiality(initialConfidentiality);
  }, [initialConfidentiality]);

  // Handle availability change
  const handleAvailabilityChange = (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const level = e.target.value;
    setAvailability(level);
    if (onAvailabilityChange) {
      onAvailabilityChange(level);
    }
  };

  // Handle integrity change
  const handleIntegrityChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const level = e.target.value;
    setIntegrity(level);
    if (onIntegrityChange) {
      onIntegrityChange(level);
    }
  };

  // Handle confidentiality change
  const handleConfidentialityChange = (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const level = e.target.value;
    setConfidentiality(level);
    if (onConfidentialityChange) {
      onConfidentialityChange(level);
    }
  };

  // Helper function to get color class based on security level
  const getColorClass = (level: string): string => {
    switch (level) {
      case "None":
        return "bg-gray-200";
      case "Low":
        return "bg-yellow-200";
      case "Moderate":
        return "bg-orange-300";
      case "High":
        return "bg-red-400";
      case "Very High":
        return "bg-purple-400";
      default:
        return "bg-gray-200";
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

  return (
    <div
      data-testid={testId}
      className="bg-white dark:bg-gray-800 p-4 rounded-lg"
    >
      <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-6 flex items-center">
        <span className="mr-2">🛡️</span>
        {UI_TEXT.WIDGET_TITLES.SECURITY_LEVEL}
      </h3>

      {/* Confidentiality Section */}
      <div
        className="mb-6 border-b pb-4 border-gray-100 dark:border-gray-700"
        data-testid={CIA_TEST_IDS.CONFIDENTIALITY_SECTION}
      >
        <div className="flex items-center mb-2">
          <label
            htmlFor="confidentialitySelect"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300 mr-2"
            data-testid={CIA_TEST_IDS.CONFIDENTIALITY_LABEL}
          >
            {CIA_LABELS.CONFIDENTIALITY}
          </label>
          <div
            className={`w-4 h-4 rounded-full mr-2 ${getColorClass(
              confidentiality
            )}`}
            data-testid={CIA_TEST_IDS.CONFIDENTIALITY_COLOR_INDICATOR}
          ></div>
          <select
            id="confidentialitySelect"
            className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            value={confidentiality}
            onChange={handleConfidentialityChange}
            disabled={disabled}
            data-testid={CIA_TEST_IDS.CONFIDENTIALITY_SELECT}
          >
            {Object.keys(confidentialityOptions || {}).map((level) => (
              <option key={level} value={level}>
                {level}
              </option>
            ))}
          </select>
          <button
            type="button"
            className="ml-2 p-1 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
            onMouseEnter={() => showTooltip("confidentiality")}
            onMouseLeave={hideTooltip}
            data-testid={CIA_TEST_IDS.CONFIDENTIALITY_TECHNICAL_INFO_BUTTON}
          >
            <span aria-hidden="true">ℹ️</span>
            <span className="sr-only">Technical information</span>
          </button>
        </div>
        <div
          className="text-sm text-gray-600 dark:text-gray-400 mt-2"
          data-testid={CIA_TEST_IDS.CONFIDENTIALITY_DESCRIPTION}
        >
          {confidentialityOptions?.[confidentiality as SecurityLevel]
            ?.description || CIA_DESCRIPTIONS.CONFIDENTIALITY}
        </div>
        {confidentialityOptions?.[confidentiality as SecurityLevel]
          ?.protectionMethod && (
          <div className="mt-2">
            <span
              className="inline-flex items-center font-medium rounded-full bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300 text-xs py-0.5 px-1.5 "
              data-testid={CIA_TEST_IDS.CONFIDENTIALITY_PROTECTION_BADGE}
            >
              {
                confidentialityOptions[confidentiality as SecurityLevel]
                  .protectionMethod
              }
            </span>
          </div>
        )}
      </div>

      {/* Integrity Section */}
      <div
        className="mb-6 border-b pb-4 border-gray-100 dark:border-gray-700"
        data-testid={CIA_TEST_IDS.INTEGRITY_SECTION}
      >
        <div className="flex items-center mb-2">
          <label
            htmlFor="integritySelect"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300 mr-2"
            data-testid={CIA_TEST_IDS.INTEGRITY_LABEL}
          >
            {CIA_LABELS.INTEGRITY}
          </label>
          <div
            className={`w-4 h-4 rounded-full mr-2 ${getColorClass(integrity)}`}
            data-testid={CIA_TEST_IDS.INTEGRITY_COLOR_INDICATOR}
          ></div>
          <select
            id="integritySelect"
            className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            value={integrity}
            onChange={handleIntegrityChange}
            disabled={disabled}
            data-testid={CIA_TEST_IDS.INTEGRITY_SELECT}
          >
            {Object.keys(integrityOptions || {}).map((level) => (
              <option key={level} value={level}>
                {level}
              </option>
            ))}
          </select>
          <button
            type="button"
            className="ml-2 p-1 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
            onMouseEnter={() => showTooltip("integrity")}
            onMouseLeave={hideTooltip}
            data-testid={CIA_TEST_IDS.INTEGRITY_TECHNICAL_INFO_BUTTON}
          >
            <span aria-hidden="true">ℹ️</span>
            <span className="sr-only">Technical information</span>
          </button>
        </div>
        <div
          className="text-sm text-gray-600 dark:text-gray-400 mt-2"
          data-testid={CIA_TEST_IDS.INTEGRITY_DESCRIPTION}
        >
          {integrityOptions?.[integrity as SecurityLevel]?.description ||
            CIA_DESCRIPTIONS.INTEGRITY}
        </div>
        {integrityOptions?.[integrity as SecurityLevel]?.validationMethod && (
          <div className="mt-2">
            <span
              className="inline-flex items-center font-medium rounded-full bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300 text-xs py-0.5 px-1.5 "
              data-testid={CIA_TEST_IDS.INTEGRITY_VALIDATION_BADGE}
            >
              {integrityOptions[integrity as SecurityLevel].validationMethod}
            </span>
          </div>
        )}
      </div>

      {/* Availability Section */}
      <div className="mb-2" data-testid={CIA_TEST_IDS.AVAILABILITY_SECTION}>
        <div className="flex items-center mb-2">
          <label
            htmlFor="availabilitySelect"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300 mr-2"
            data-testid={CIA_TEST_IDS.AVAILABILITY_LABEL}
          >
            {CIA_LABELS.AVAILABILITY}
          </label>
          <div
            className={`w-4 h-4 rounded-full mr-2 ${getColorClass(
              availability
            )}`}
            data-testid={CIA_TEST_IDS.AVAILABILITY_COLOR_INDICATOR}
          ></div>
          <select
            id="availabilitySelect"
            className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            value={availability}
            onChange={handleAvailabilityChange}
            disabled={disabled}
            data-testid={CIA_TEST_IDS.AVAILABILITY_SELECT}
          >
            {Object.keys(availabilityOptions || {}).map((level) => (
              <option key={level} value={level}>
                {level}
              </option>
            ))}
          </select>
          <button
            type="button"
            className="ml-2 p-1 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
            onMouseEnter={() => showTooltip("availability")}
            onMouseLeave={hideTooltip}
            data-testid={CIA_TEST_IDS.AVAILABILITY_TECHNICAL_INFO_BUTTON}
          >
            <span aria-hidden="true">ℹ️</span>
            <span className="sr-only">Technical information</span>
          </button>
        </div>
        <div
          className="text-sm text-gray-600 dark:text-gray-400 mt-2"
          data-testid={CIA_TEST_IDS.AVAILABILITY_DESCRIPTION}
        >
          {availabilityOptions?.[availability as SecurityLevel]?.description ||
            CIA_DESCRIPTIONS.AVAILABILITY}
        </div>
        {availabilityOptions?.[availability as SecurityLevel]?.uptime && (
          <div className="mt-2">
            <span
              className="inline-flex items-center font-medium rounded-full bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300 text-xs py-0.5 px-1.5 "
              data-testid={CIA_TEST_IDS.AVAILABILITY_UPTIME_BADGE}
            >
              {availabilityOptions[availability as SecurityLevel].uptime}
            </span>
          </div>
        )}
      </div>

      {/* Active Tooltip - Technical Details */}
      {activeTooltip && (
        <div className="mt-4 p-3 bg-gray-50 dark:bg-gray-700 rounded-md border border-gray-200 dark:border-gray-600 text-sm">
          <h4 className="font-medium mb-1 flex items-center">
            <span className="mr-2">
              {activeTooltip === "confidentiality" && "🔒"}
              {activeTooltip === "integrity" && "🔐"}
              {activeTooltip === "availability" && "⏱️"}
            </span>
            Technical Details:
          </h4>
          <p>
            {activeTooltip === "confidentiality" &&
              (confidentialityOptions?.[confidentiality as SecurityLevel]
                ?.technical ||
                "Defines who can access your data and systems.")}
            {activeTooltip === "integrity" &&
              (integrityOptions?.[integrity as SecurityLevel]?.technical ||
                "Ensures your data remains accurate and hasn't been tampered with.")}
            {activeTooltip === "availability" &&
              (availabilityOptions?.[availability as SecurityLevel]
                ?.technical ||
                "Defines how reliably your systems and data can be accessed.")}
          </p>
        </div>
      )}

      {/* Selection Summary */}
      {showSelectionSummary && (
        <div className="mt-6 pt-4 border-t border-gray-200 dark:border-gray-700 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div data-testid={COMMON_COMPONENT_TEST_IDS.CURRENT_CONFIDENTIALITY}>
            <KeyValuePair
              label={CIA_LABELS.CONFIDENTIALITY}
              value={confidentiality}
              testId={COMMON_COMPONENT_TEST_IDS.CONFIDENTIALITY_KV}
            />
          </div>
          <div data-testid={COMMON_COMPONENT_TEST_IDS.CURRENT_INTEGRITY}>
            <KeyValuePair
              label={CIA_LABELS.INTEGRITY}
              value={integrity}
              testId={COMMON_COMPONENT_TEST_IDS.INTEGRITY_KV}
            />
          </div>
          <div data-testid={COMMON_COMPONENT_TEST_IDS.CURRENT_AVAILABILITY}>
            <KeyValuePair
              label={CIA_LABELS.AVAILABILITY}
              value={availability}
              testId={COMMON_COMPONENT_TEST_IDS.AVAILABILITY_KV}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default SecurityLevelSelector;
