import React, { Dispatch, SetStateAction } from "react";
import { useCIAOptions } from "../../hooks/useCIAOptions";
import {
  CIA_LABELS,
  CIA_DESCRIPTIONS,
  CIA_COMPONENT_ICONS,
  UI_TEXT,
} from "../../constants/appConstants";
import {
  SECURITY_LEVEL_TEST_IDS,
  WIDGET_TEST_IDS,
} from "../../constants/testIds";
import SecurityLevelSelector from "../SecurityLevelSelector";
import WidgetContainer from "../common/WidgetContainer";
import { SecurityLevel } from "../../types/cia";
import { getSecurityLevelClass } from "../../utils/securityLevelUtils";
import { CIA_COMPONENT_COLORS } from "../../constants/colorConstants";
import SecurityLevelSummaryItem from "../common/SecurityLevelSummaryItem";

/**
 * Props for the SecurityLevelWidget component
 */
export interface SecurityLevelWidgetProps {
  availabilityLevel?: string;
  integrityLevel?: string;
  confidentialityLevel?: string;
  onAvailabilityChange?: (level: string) => void;
  onIntegrityChange?: (level: string) => void;
  onConfidentialityChange?: (level: string) => void;
  // Update these types to be compatible with both function and state setter usage
  setAvailability?:
    | ((level: string) => void)
    | Dispatch<SetStateAction<string>>;
  setIntegrity?: ((level: string) => void) | Dispatch<SetStateAction<string>>;
  setConfidentiality?:
    | ((level: string) => void)
    | Dispatch<SetStateAction<string>>;
  className?: string;
  testId?: string;
  title?: string;
  loading?: boolean;
  error?: Error | null;
}

/**
 * SecurityLevelWidget component for selecting CIA security levels
 * Enhanced with rich descriptions and visual indicators
 *
 * @param props Component properties
 * @returns SecurityLevelWidget React component
 */
const SecurityLevelWidget: React.FC<SecurityLevelWidgetProps> = ({
  availabilityLevel = "None",
  integrityLevel = "None",
  confidentialityLevel = "None",
  onAvailabilityChange,
  onIntegrityChange,
  onConfidentialityChange,
  // Add these new props with sensible defaults
  setAvailability,
  setIntegrity,
  setConfidentiality,
  className = "",
  testId = WIDGET_TEST_IDS.SECURITY_LEVEL_WIDGET,
  title = UI_TEXT.WIDGET_TITLES.SECURITY_LEVEL,
  loading = false,
  error = null,
}) => {
  const { availabilityOptions, integrityOptions, confidentialityOptions } =
    useCIAOptions();

  // Create handlers that work with both callback styles
  const handleAvailabilityChange = (level: string) => {
    if (onAvailabilityChange) onAvailabilityChange(level);
    if (setAvailability) setAvailability(level);
  };

  const handleIntegrityChange = (level: string) => {
    if (onIntegrityChange) onIntegrityChange(level);
    if (setIntegrity) setIntegrity(level);
  };

  const handleConfidentialityChange = (level: string) => {
    if (onConfidentialityChange) onConfidentialityChange(level);
    if (setConfidentiality) setConfidentiality(level);
  };

  /**
   * Summary component to display the current security profile
   */
  const SecurityLevelSummary = () => (
    <div className="mb-2 pb-2 border-b border-gray-200 dark:border-gray-700">
      <h4 className="text-xs font-medium mb-1 text-gray-800 dark:text-gray-200 flex items-center">
        <span className="mr-1">📊</span>
        {UI_TEXT.LABELS.CURRENT_PROFILE}
      </h4>
      <div className="flex flex-wrap justify-between gap-1">
        <SecurityLevelSummaryItem
          label={CIA_LABELS.CONFIDENTIALITY}
          value={confidentialityLevel as SecurityLevel}
          icon={CIA_COMPONENT_ICONS.CONFIDENTIALITY}
          testId="confidentiality-summary"
          color="purple"
          borderColor={CIA_COMPONENT_COLORS.CONFIDENTIALITY.PRIMARY}
          compact={true}
        />
        <SecurityLevelSummaryItem
          label={CIA_LABELS.INTEGRITY}
          value={integrityLevel as SecurityLevel}
          icon={CIA_COMPONENT_ICONS.INTEGRITY}
          testId="integrity-summary"
          color="green"
          borderColor={CIA_COMPONENT_COLORS.INTEGRITY.PRIMARY}
          compact={true}
        />
        <SecurityLevelSummaryItem
          label={CIA_LABELS.AVAILABILITY}
          value={availabilityLevel as SecurityLevel}
          icon={CIA_COMPONENT_ICONS.AVAILABILITY}
          testId="availability-summary"
          color="blue"
          borderColor={CIA_COMPONENT_COLORS.AVAILABILITY.PRIMARY}
          compact={true}
        />
      </div>
    </div>
  );

  return (
    <WidgetContainer
      title={title}
      testId={testId}
      className={className}
      icon="🛡️"
      loading={loading}
      error={error}
    >
      <div data-testid={SECURITY_LEVEL_TEST_IDS.SECURITY_LEVEL_SELECTOR}>
        <SecurityLevelSummary />
        <SecurityLevelSelector
          initialAvailability={availabilityLevel}
          initialIntegrity={integrityLevel}
          initialConfidentiality={confidentialityLevel}
          onAvailabilityChange={handleAvailabilityChange}
          onIntegrityChange={handleIntegrityChange}
          onConfidentialityChange={handleConfidentialityChange}
          availabilityOptions={availabilityOptions}
          integrityOptions={integrityOptions}
          confidentialityOptions={confidentialityOptions}
          showSelectionSummary={false}
          showDescriptions={true}
          testId={SECURITY_LEVEL_TEST_IDS.SECURITY_LEVEL_SELECTOR}
        />
      </div>
    </WidgetContainer>
  );
};

export default SecurityLevelWidget;
