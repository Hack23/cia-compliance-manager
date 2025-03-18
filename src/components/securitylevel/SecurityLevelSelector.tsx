import React, { useCallback, useMemo } from "react";
import { CIA_COMPONENT_ICONS, CIA_LABELS } from "../../constants/coreConstants";
import { useCIAOptions } from "../../hooks/useCIAOptions";
import { SecurityLevel } from "../../types/cia";
import { Selection } from "./Selection";

type SecurityLevelSelectorProps = {
  availabilityLevel: SecurityLevel;
  integrityLevel: SecurityLevel;
  confidentialityLevel: SecurityLevel;
  onAvailabilityChange?: (level: SecurityLevel) => void;
  onIntegrityChange?: (level: SecurityLevel) => void;
  onConfidentialityChange?: (level: SecurityLevel) => void;
  disabled?: boolean;
  compact?: boolean;
  testId?: string;
};

/**
 * Component for selecting CIA security levels
 * 
 * ## Business Perspective
 * 
 * The SecurityLevelSelector is the primary interface for security officers
 * to establish their organization's security posture across the CIA triad.
 * These selections drive compliance assessments and implementation costs. 💼
 */
export const SecurityLevelSelector: React.FC<SecurityLevelSelectorProps> = ({
  availabilityLevel,
  integrityLevel,
  confidentialityLevel,
  onAvailabilityChange,
  onIntegrityChange,
  onConfidentialityChange,
  disabled = false,
  compact = false,
  testId = "security-level-selector",
}) => {
  const { availabilityOptions, integrityOptions, confidentialityOptions } = useCIAOptions();

  // Prepare options for each security level dropdown
  const availabilitySelectOptions = useMemo(
    () =>
      Object.entries(availabilityOptions).map(([key]) => ({
        value: key,
        label: `${key} - ${availabilityOptions[key as SecurityLevel]?.description || ""}`,
      })),
    [availabilityOptions]
  );

  const integritySelectOptions = useMemo(
    () =>
      Object.entries(integrityOptions).map(([key]) => ({
        value: key,
        label: `${key} - ${integrityOptions[key as SecurityLevel]?.description || ""}`,
      })),
    [integrityOptions]
  );

  const confidentialitySelectOptions = useMemo(
    () =>
      Object.entries(confidentialityOptions).map(([key]) => ({
        value: key,
        label: `${key} - ${confidentialityOptions[key as SecurityLevel]?.description || ""}`,
      })),
    [confidentialityOptions]
  );

  // Handle level change callbacks
  const handleAvailabilityChange = useCallback(
    (value: string) => {
      if (onAvailabilityChange) {
        onAvailabilityChange(value as SecurityLevel);
      }
    },
    [onAvailabilityChange]
  );

  const handleIntegrityChange = useCallback(
    (value: string) => {
      if (onIntegrityChange) {
        onIntegrityChange(value as SecurityLevel);
      }
    },
    [onIntegrityChange]
  );

  const handleConfidentialityChange = useCallback(
    (value: string) => {
      if (onConfidentialityChange) {
        onConfidentialityChange(value as SecurityLevel);
      }
    },
    [onConfidentialityChange]
  );

  // Information for tooltip/info panels
  const confidentialityInfo = useMemo(
    () => confidentialityOptions[confidentialityLevel]?.technical || "",
    [confidentialityOptions, confidentialityLevel]
  );

  const integrityInfo = useMemo(
    () => integrityOptions[integrityLevel]?.technical || "",
    [integrityOptions, integrityLevel]
  );

  const availabilityInfo = useMemo(
    () => availabilityOptions[availabilityLevel]?.technical || "",
    [availabilityOptions, availabilityLevel]
  );

  return (
    <div 
      className={`${compact ? 'space-y-3' : 'space-y-5'} ${disabled ? 'opacity-70' : ''}`}
      data-testid={testId}
    >
      <div 
        className={`mb-5 pb-4 border-b border-gray-100 dark:border-gray-700`}
        data-testid="confidentiality-section"
      >
        <Selection
          id="confidentialitySelect"
          label={CIA_LABELS.CONFIDENTIALITY}
          icon={CIA_COMPONENT_ICONS.CONFIDENTIALITY}
          description="Controls who can access your data and systems"
          options={confidentialitySelectOptions}
          value={confidentialityLevel}
          onChange={handleConfidentialityChange}
          iconClassName="text-purple-600 dark:text-purple-400"
          labelClassName="terminal-text text-purple-600 dark:text-purple-400"
          infoContent={confidentialityInfo}
          contextInfo={confidentialityOptions[confidentialityLevel]?.description || ""}
          disabled={disabled}
          aria-label="Select confidentiality level"
          data-testid="confidentiality-select"
        />
      </div>

      <div 
        className={`mb-5 pb-4 border-b border-gray-100 dark:border-gray-700`}
        data-testid="integrity-section"
      >
        <Selection
          id="integritySelect"
          label={CIA_LABELS.INTEGRITY}
          icon={CIA_COMPONENT_ICONS.INTEGRITY}
          description="Ensures data remains accurate and unaltered"
          options={integritySelectOptions}
          value={integrityLevel}
          onChange={handleIntegrityChange}
          iconClassName="text-green-600 dark:text-green-400"
          labelClassName="terminal-text text-green-600 dark:text-green-400"
          infoContent={integrityInfo}
          contextInfo={integrityOptions[integrityLevel]?.description || ""}
          disabled={disabled}
          aria-label="Select integrity level"
          data-testid="integrity-select"
        />
      </div>

      <div 
        className={`mb-2`}
        data-testid="availability-section"
      >
        <Selection
          id="availabilitySelect"
          label={CIA_LABELS.AVAILABILITY}
          icon={CIA_COMPONENT_ICONS.AVAILABILITY}
          description="Determines how reliably your systems can be accessed"
          options={availabilitySelectOptions}
          value={availabilityLevel}
          onChange={handleAvailabilityChange}
          iconClassName="text-blue-600 dark:text-blue-400"
          labelClassName="terminal-text text-blue-600 dark:text-blue-400"
          infoContent={availabilityInfo}
          contextInfo={availabilityOptions[availabilityLevel]?.description || ""}
          disabled={disabled}
          aria-label="Select availability level"
          data-testid="availability-select"
        />
      </div>
    </div>
  );
};

export default SecurityLevelSelector;
