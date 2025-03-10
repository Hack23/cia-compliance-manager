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
import { getSecurityLevelClass } from "../../utils/widgetHelpers";

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
    <div className="mt-6 bg-gray-50 dark:bg-gray-750 p-4 rounded-lg border border-gray-200 dark:border-gray-700">
      <h4 className="text-md font-medium mb-3 text-gray-800 dark:text-gray-200 flex items-center">
        <span className="mr-2">📊</span>
        {UI_TEXT.LABELS.CURRENT_PROFILE}
      </h4>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <SecurityLevelSummaryItem
          label={CIA_LABELS.CONFIDENTIALITY}
          value={confidentialityLevel as SecurityLevel}
          icon={CIA_COMPONENT_ICONS.CONFIDENTIALITY}
          testId="confidentiality-summary"
          color="purple"
        />
        <SecurityLevelSummaryItem
          label={CIA_LABELS.INTEGRITY}
          value={integrityLevel as SecurityLevel}
          icon={CIA_COMPONENT_ICONS.INTEGRITY}
          testId="integrity-summary"
          color="green"
        />
        <SecurityLevelSummaryItem
          label={CIA_LABELS.AVAILABILITY}
          value={availabilityLevel as SecurityLevel}
          icon={CIA_COMPONENT_ICONS.AVAILABILITY}
          testId="availability-summary"
          color="blue"
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
        <SecurityLevelSummary />
      </div>
    </WidgetContainer>
  );
};

/**
 * Component for displaying a single security level summary item
 */
interface SecurityLevelSummaryItemProps {
  label: string;
  value: SecurityLevel;
  icon: string;
  testId: string;
  color: "blue" | "green" | "purple";
}

const SecurityLevelSummaryItem: React.FC<SecurityLevelSummaryItemProps> = ({
  label,
  value,
  icon,
  testId,
  color,
}) => {
  const getBorderColor = () => {
    switch (color) {
      case "blue":
        return "border-blue-500";
      case "green":
        return "border-green-500";
      case "purple":
        return "border-purple-500";
      default:
        return "border-gray-300";
    }
  };

  return (
    <div
      className={`flex items-center p-3 bg-white dark:bg-gray-800 rounded-md border ${getBorderColor()} dark:border-opacity-50 shadow-sm`}
      data-testid={testId}
    >
      <span className="text-2xl mr-3">{icon}</span>
      <div>
        <div className="text-sm text-gray-500 dark:text-gray-400">{label}</div>
        <div className={`font-medium ${getSecurityLevelClass(value)}`}>
          {value}
        </div>
      </div>
    </div>
  );
};

export default SecurityLevelWidget;
