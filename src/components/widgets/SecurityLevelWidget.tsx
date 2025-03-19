import React from "react";
import {
  CIA_COMPONENT_ICONS,
  CIA_LABELS,
  UI_TEXT
} from "../../constants/appConstants";
import { SECURITY_LEVEL_TEST_IDS } from "../../constants/testIds";
import { SecurityLevel } from "../../types/cia";
// Use the unified selector - this now determines which implementation to use
import SecurityLevelSelector from "../SecurityLevelSelector";
import SecurityLevelSummaryItem from "../common/SecurityLevelSummaryItem";
import WidgetContainer from "../common/WidgetContainer";

/**
 * Props for SecurityLevelWidget component
 */
export interface SecurityLevelWidgetProps {
  availabilityLevel: SecurityLevel;
  integrityLevel: SecurityLevel;
  confidentialityLevel: SecurityLevel;
  setAvailability: (level: SecurityLevel) => void;
  setIntegrity: (level: SecurityLevel) => void;
  setConfidentiality: (level: SecurityLevel) => void;
  className?: string;
  testId?: string;
  onAvailabilityChange?: (level: SecurityLevel) => void;
  onIntegrityChange?: (level: SecurityLevel) => void;
  onConfidentialityChange?: (level: SecurityLevel) => void;
  loading?: boolean;
  error?: Error | null;
  title?: string;
}

// Define CIA_COMPONENT_COLORS directly since it's missing from imports
const CIA_COMPONENT_COLORS = {
  AVAILABILITY: { PRIMARY: "#3498db" },
  INTEGRITY: { PRIMARY: "#2ecc71" },
  CONFIDENTIALITY: { PRIMARY: "#9b59b6" }
};

/**
 * SecurityLevelWidget provides controls to set security levels for availability, integrity, and confidentiality
 *
 * ## Business Perspective
 *
 * This widget is the primary control center for security officers to define
 * their organization's security requirements across the CIA triad. The selections
 * made here drive all other security assessments and recommendations. 🔒
 *
 * Setting appropriate security levels helps organizations align their security
 * investments with actual business requirements, avoiding both under-protection
 * and unnecessary expenditure. 💼
 */
const SecurityLevelWidget: React.FC<SecurityLevelWidgetProps> = ({
  availabilityLevel,
  integrityLevel,
  confidentialityLevel,
  setAvailability,
  setIntegrity,
  setConfidentiality,
  className = "",
  testId = SECURITY_LEVEL_TEST_IDS.SECURITY_LEVEL_WIDGET,
  onAvailabilityChange,
  onIntegrityChange,
  onConfidentialityChange,
  loading = false,
  error = null,
  title = UI_TEXT?.WIDGET_TITLES?.SECURITY_LEVEL || "Security Levels",
}) => {
  // Create handlers that adapt between string and SecurityLevel types
  const handleConfidentialityChange = (value: string) => {
    // Cast the string to SecurityLevel since we know it comes from a valid set of options
    const level = value as SecurityLevel;
    if (onConfidentialityChange) onConfidentialityChange(level);
    setConfidentiality(level);
  };

  const handleIntegrityChange = (value: string) => {
    // Cast the string to SecurityLevel since we know it comes from a valid set of options
    const level = value as SecurityLevel;
    if (onIntegrityChange) onIntegrityChange(level);
    setIntegrity(level);
  };

  const handleAvailabilityChange = (value: string) => {
    // Cast the string to SecurityLevel since we know it comes from a valid set of options
    const level = value as SecurityLevel;
    if (onAvailabilityChange) onAvailabilityChange(level);
    setAvailability(level);
  };

  // Show a loading state
  if (loading) {
    return (
      <WidgetContainer
        title={title}
        className={className}
        testId={testId}
        loading={true}
      >
        {/* Empty children to satisfy required prop */}
        <div className="loading-placeholder"></div>
      </WidgetContainer>
    );
  }

  // Show error state
  if (error) {
    return (
      <WidgetContainer title={title} className={className} testId={testId}>
        <div className="p-4 text-red-600 dark:text-red-400">
          <h3 className="font-medium mb-2">Error Loading Security Levels</h3>
          <p className="text-sm">{error.message}</p>
        </div>
      </WidgetContainer>
    );
  }

  return (
    <WidgetContainer
      title={title}
      icon="📊"
      className={className}
      testId={testId}
    >
      <div className="space-y-6">
        {/* Current Security Profile Header */}
        <div>
          <h3 className="font-medium text-gray-700 dark:text-gray-300 mb-2">
            Current Security Profile
          </h3>

          {/* Summary of current selections */}
          <div className="flex flex-wrap gap-2 mb-4">
            <SecurityLevelSummaryItem
              label={CIA_LABELS.CONFIDENTIALITY}
              value={confidentialityLevel}
              icon={CIA_COMPONENT_ICONS.CONFIDENTIALITY}
              testId={`${testId}-confidentiality-summary`}
              color="purple"
              borderColor={CIA_COMPONENT_COLORS.CONFIDENTIALITY.PRIMARY}
            />
            <SecurityLevelSummaryItem
              label={CIA_LABELS.INTEGRITY}
              value={integrityLevel}
              icon={CIA_COMPONENT_ICONS.INTEGRITY}
              testId={`${testId}-integrity-summary`}
              color="green"
              borderColor={CIA_COMPONENT_COLORS.INTEGRITY.PRIMARY}
            />
            <SecurityLevelSummaryItem
              label={CIA_LABELS.AVAILABILITY}
              value={availabilityLevel}
              icon={CIA_COMPONENT_ICONS.AVAILABILITY}
              testId={`${testId}-availability-summary`}
              color="blue"
              borderColor={CIA_COMPONENT_COLORS.AVAILABILITY.PRIMARY}
            />
          </div>
        </div>

        {/* Use the enhanced version of SecurityLevelSelector */}
        <SecurityLevelSelector
          availabilityLevel={availabilityLevel}
          integrityLevel={integrityLevel}
          confidentialityLevel={confidentialityLevel}
          onAvailabilityChange={handleAvailabilityChange}
          onIntegrityChange={handleIntegrityChange}
          onConfidentialityChange={handleConfidentialityChange}
          testId={`${testId}-selector`}
          useEnhancedVersion={true} // Force the use of enhanced version
        />
      </div>
    </WidgetContainer>
  );
};

export default SecurityLevelWidget;
