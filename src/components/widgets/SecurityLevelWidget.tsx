import React, { Dispatch, SetStateAction } from "react";
import {
  CIA_COMPONENT_ICONS,
  CIA_LABELS,
  UI_TEXT,
} from "../../constants/appConstants";
import {
  COMMON_COMPONENT_TEST_IDS,
  SECURITY_LEVEL_TEST_IDS,
  WIDGET_TEST_IDS,
} from "../../constants/testIds";
import { SecurityLevel } from "../../types/cia";
import SecurityLevelSummaryItem from "../common/SecurityLevelSummaryItem";
import WidgetContainer from "../common/WidgetContainer";
import SecurityLevelSelector from "../securitylevel/SecurityLevelSelector";

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
  setAvailability,
  setIntegrity,
  setConfidentiality,
  className = "",
  testId = WIDGET_TEST_IDS.SECURITY_LEVEL_WIDGET,
  title = UI_TEXT.WIDGET_TITLES.SECURITY_LEVEL,
  loading = false,
  error = null,
}) => {
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
    <WidgetContainer title={title} className={className} testId={testId}>
      <div className="p-4">
        {/* Current Security Profile - Compact summary at top */}
        <div className="mb-4 pb-3 border-b border-gray-200 dark:border-gray-700">
          <h4 className="font-medium mb-2 text-gray-800 dark:text-gray-200 text-sm flex items-center">
            <span className="mr-2">📊</span>
            Current Security Profile
          </h4>
          <div className="flex flex-wrap gap-2 justify-between">
            <SecurityLevelSummaryItem
              label={CIA_LABELS.CONFIDENTIALITY}
              value={confidentialityLevel as SecurityLevel}
              icon={CIA_COMPONENT_ICONS.CONFIDENTIALITY}
              testId={COMMON_COMPONENT_TEST_IDS.CURRENT_CONFIDENTIALITY}
              color="purple"
              compact={true}
            />
            <SecurityLevelSummaryItem
              label={CIA_LABELS.INTEGRITY}
              value={integrityLevel as SecurityLevel}
              icon={CIA_COMPONENT_ICONS.INTEGRITY}
              testId={COMMON_COMPONENT_TEST_IDS.CURRENT_INTEGRITY}
              color="green"
              compact={true}
            />
            <SecurityLevelSummaryItem
              label={CIA_LABELS.AVAILABILITY}
              value={availabilityLevel as SecurityLevel}
              icon={CIA_COMPONENT_ICONS.AVAILABILITY}
              testId={COMMON_COMPONENT_TEST_IDS.CURRENT_AVAILABILITY}
              color="blue"
              compact={true}
            />
          </div>
        </div>

        {/* SecurityLevelSelector */}
        <SecurityLevelSelector
          availabilityLevel={availabilityLevel as SecurityLevel}
          integrityLevel={integrityLevel as SecurityLevel}
          confidentialityLevel={confidentialityLevel as SecurityLevel}
          onAvailabilityChange={handleAvailabilityChange}
          onIntegrityChange={handleIntegrityChange}
          onConfidentialityChange={handleConfidentialityChange}
          showSelectionSummary={false}
          testId={SECURITY_LEVEL_TEST_IDS.SECURITY_LEVEL_SELECTOR}
        />
      </div>
    </WidgetContainer>
  );
};

export default SecurityLevelWidget;
