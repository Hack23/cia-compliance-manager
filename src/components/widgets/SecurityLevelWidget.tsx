import React from "react";
import {
  CIA_COMPONENT_ICONS,
  CIA_DESCRIPTIONS,
  CIA_LABELS,
  SECURITY_LEVELS,
  UI_TEXT,
} from "../../constants/appConstants";
import { CIA_COMPONENT_COLORS } from "../../constants/colorConstants";
import { SECURITY_LEVEL_TEST_IDS } from "../../constants/testIds";
import { SecurityLevel } from "../../types/cia";
import SecurityLevelSelector from "../SecurityLevelSelector";
import SecurityLevelSummaryItem from "../common/SecurityLevelSummaryItem";
import WidgetContainer from "../common/WidgetContainer";

/**
 * Props for SecurityLevelWidget component
 */
export interface SecurityLevelWidgetProps {
  availabilityLevel: string;
  integrityLevel: string;
  confidentialityLevel: string;
  setAvailability: (level: string) => void;
  setIntegrity: (level: string) => void;
  setConfidentiality: (level: string) => void;
  className?: string;
  testId?: string;
  onAvailabilityChange?: (level: string) => void;
  onIntegrityChange?: (level: string) => void;
  onConfidentialityChange?: (level: string) => void;
  loading?: boolean;
  error?: Error | null;
  title?: string;
}

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
  title = UI_TEXT.WIDGET_TITLES.SECURITY_LEVEL,
}) => {
  // Create handlers that work with both callback styles
  const handleAvailabilityChange = (level: string) => {
    if (onAvailabilityChange) onAvailabilityChange(level);
    setAvailability(level);
  };

  const handleIntegrityChange = (level: string) => {
    if (onIntegrityChange) onIntegrityChange(level);
    setIntegrity(level);
  };

  const handleConfidentialityChange = (level: string) => {
    if (onConfidentialityChange) onConfidentialityChange(level);
    setConfidentiality(level);
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
              value={confidentialityLevel as SecurityLevel}
              icon={CIA_COMPONENT_ICONS.CONFIDENTIALITY}
              testId={`${testId}-confidentiality-summary`}
              color="purple"
              borderColor={CIA_COMPONENT_COLORS.CONFIDENTIALITY.PRIMARY}
            />
            <SecurityLevelSummaryItem
              label={CIA_LABELS.INTEGRITY}
              value={integrityLevel as SecurityLevel}
              icon={CIA_COMPONENT_ICONS.INTEGRITY}
              testId={`${testId}-integrity-summary`}
              color="green"
              borderColor={CIA_COMPONENT_COLORS.INTEGRITY.PRIMARY}
            />
            <SecurityLevelSummaryItem
              label={CIA_LABELS.AVAILABILITY}
              value={availabilityLevel as SecurityLevel}
              icon={CIA_COMPONENT_ICONS.AVAILABILITY}
              testId={`${testId}-availability-summary`}
              color="blue"
              borderColor={CIA_COMPONENT_COLORS.AVAILABILITY.PRIMARY}
            />
          </div>
        </div>

        {/* Confidentiality Selector */}
        <div className="security-level-selector">
          <SecurityLevelSelector
            label="Confidentiality Level"
            value={confidentialityLevel}
            onChange={handleConfidentialityChange}
            options={[
              SECURITY_LEVELS.NONE,
              SECURITY_LEVELS.LOW,
              SECURITY_LEVELS.MODERATE,
              SECURITY_LEVELS.HIGH,
              SECURITY_LEVELS.VERY_HIGH,
            ]}
            description={CIA_DESCRIPTIONS.CONFIDENTIALITY}
            icon={CIA_COMPONENT_ICONS.CONFIDENTIALITY}
            testId={SECURITY_LEVEL_TEST_IDS.CONFIDENTIALITY_SELECTOR}
            tooltipContent="Confidentiality measures how well your data is protected from unauthorized access"
            accentColor={CIA_COMPONENT_COLORS.CONFIDENTIALITY.PRIMARY}
          />
        </div>

        {/* Integrity Selector */}
        <div className="security-level-selector">
          <SecurityLevelSelector
            label="Integrity Level"
            value={integrityLevel}
            onChange={handleIntegrityChange}
            options={[
              SECURITY_LEVELS.NONE,
              SECURITY_LEVELS.LOW,
              SECURITY_LEVELS.MODERATE,
              SECURITY_LEVELS.HIGH,
              SECURITY_LEVELS.VERY_HIGH,
            ]}
            description={CIA_DESCRIPTIONS.INTEGRITY}
            icon={CIA_COMPONENT_ICONS.INTEGRITY}
            testId={SECURITY_LEVEL_TEST_IDS.INTEGRITY_SELECTOR}
            tooltipContent="Integrity measures how well your data is protected from unauthorized modification"
            accentColor={CIA_COMPONENT_COLORS.INTEGRITY.PRIMARY}
          />
        </div>

        {/* Availability Selector */}
        <div className="security-level-selector">
          <SecurityLevelSelector
            label="Availability Level"
            value={availabilityLevel}
            onChange={handleAvailabilityChange}
            options={[
              SECURITY_LEVELS.NONE,
              SECURITY_LEVELS.LOW,
              SECURITY_LEVELS.MODERATE,
              SECURITY_LEVELS.HIGH,
              SECURITY_LEVELS.VERY_HIGH,
            ]}
            description={CIA_DESCRIPTIONS.AVAILABILITY}
            icon={CIA_COMPONENT_ICONS.AVAILABILITY}
            testId={SECURITY_LEVEL_TEST_IDS.AVAILABILITY_SELECTOR}
            tooltipContent="Availability measures how well your systems can maintain operations and recover from disruptions"
            accentColor={CIA_COMPONENT_COLORS.AVAILABILITY.PRIMARY}
          />
        </div>
      </div>
    </WidgetContainer>
  );
};

export default SecurityLevelWidget;
