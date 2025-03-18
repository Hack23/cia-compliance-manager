import React, { useEffect, useState } from "react";
import { CIA_COMPONENT_ICONS } from "../../constants";
import { SECURITY_LEVEL_TEST_IDS } from "../../constants/testIds";
import { SecurityLevel } from "../../types/cia";
import {
  calculateOverallSecurityLevel,
  getSecurityLevelValue,
} from "../../utils/securityLevelUtils";
import SecurityLevelBadge from "../common/SecurityLevelBadge";
import SecurityLevelSelector from "../common/SecurityLevelSelector";
import Tooltip from "../common/Tooltip";
import WidgetContainer from "../common/WidgetContainer";

/**
 * Props for SecurityLevelWidget
 */
export interface SecurityLevelWidgetProps {
  availabilityLevel: SecurityLevel;
  integrityLevel: SecurityLevel;
  confidentialityLevel: SecurityLevel;
  securityLevel: SecurityLevel;
  onAvailabilityLevelChange: (level: SecurityLevel) => void;
  onIntegrityLevelChange: (level: SecurityLevel) => void;
  onConfidentialityLevelChange: (level: SecurityLevel) => void;
  onSecurityLevelChange: (level: SecurityLevel) => void;
  className?: string;
  testId?: string;
}

/**
 * Widget for selecting security levels for availability, integrity, and confidentiality
 *
 * @param props - Component properties
 * @returns Rendered component
 */
const SecurityLevelWidget: React.FC<SecurityLevelWidgetProps> = ({
  availabilityLevel,
  integrityLevel,
  confidentialityLevel,
  securityLevel,
  onAvailabilityLevelChange,
  onIntegrityLevelChange,
  onConfidentialityLevelChange,
  onSecurityLevelChange,
  className = "",
  testId = SECURITY_LEVEL_TEST_IDS.SECURITY_LEVEL_WIDGET,
}) => {
  // State to track if the overall level has been auto-calculated
  const [isAutoCalculated, setIsAutoCalculated] = useState(true);

  // Effect to auto-calculate overall security level when component levels change
  useEffect(() => {
    if (isAutoCalculated) {
      const calculatedSecurityLevel = calculateOverallSecurityLevel(
        availabilityLevel,
        integrityLevel,
        confidentialityLevel
      );

      if (calculatedSecurityLevel !== securityLevel) {
        onSecurityLevelChange(calculatedSecurityLevel);
      }
    }
  }, [
    availabilityLevel,
    integrityLevel,
    confidentialityLevel,
    isAutoCalculated,
    securityLevel,
    onSecurityLevelChange,
  ]);

  // Handle overall security level change
  const handleSecurityLevelChange = (level: SecurityLevel) => {
    setIsAutoCalculated(false);
    onSecurityLevelChange(level);
  };

  // Calculate the visual indicator for security level
  const getSecurityLevelIndicator = (level: SecurityLevel) => {
    const value = getSecurityLevelValue(level);
    return "●".repeat(value + 1) + "○".repeat(4 - value);
  };

  return (
    <WidgetContainer
      title="Security Levels"
      icon="🛡️"
      className={className}
      testId={testId}
    >
      <div
        className="security-level-widget p-3"
        role="region"
        aria-label="Security Level Selection"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-4">
            {/* Availability Level Selector */}
            <SecurityLevelSelector
              label="Availability Level"
              value={availabilityLevel}
              onChange={onAvailabilityLevelChange}
              icon={CIA_COMPONENT_ICONS.AVAILABILITY}
              tooltipContent="Accessibility and uptime of systems and data"
              testId={SECURITY_LEVEL_TEST_IDS.AVAILABILITY_SELECTOR}
            />

            {/* Integrity Level Selector */}
            <SecurityLevelSelector
              label="Integrity Level"
              value={integrityLevel}
              onChange={onIntegrityLevelChange}
              icon={CIA_COMPONENT_ICONS.INTEGRITY}
              tooltipContent="Protection against unauthorized modification of data"
              testId={SECURITY_LEVEL_TEST_IDS.INTEGRITY_SELECTOR}
            />

            {/* Confidentiality Level Selector */}
            <SecurityLevelSelector
              label="Confidentiality Level"
              value={confidentialityLevel}
              onChange={onConfidentialityLevelChange}
              icon={CIA_COMPONENT_ICONS.CONFIDENTIALITY}
              tooltipContent="Protection against unauthorized disclosure of data"
              testId={SECURITY_LEVEL_TEST_IDS.CONFIDENTIALITY_SELECTOR}
            />
          </div>

          {/* Security Level Summary */}
          <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-md font-medium flex items-center">
                <span className="mr-2">🔐</span>
                Overall Security
              </h3>
              <Tooltip content="The overall security level based on your CIA selections">
                <span className="text-gray-500 dark:text-gray-400">ⓘ</span>
              </Tooltip>
            </div>

            {/* Display current security levels as badges */}
            <div className="grid grid-cols-3 gap-2 mb-4">
              <SecurityLevelBadge
                category="Availability"
                level={availabilityLevel}
                colorClass="bg-blue-50 dark:bg-blue-900 dark:bg-opacity-20"
                textClass="text-blue-600 dark:text-blue-400"
                testId={`${testId}-availability-badge`}
              />

              <SecurityLevelBadge
                category="Integrity"
                level={integrityLevel}
                colorClass="bg-green-50 dark:bg-green-900 dark:bg-opacity-20"
                textClass="text-green-600 dark:text-green-400"
                testId={`${testId}-integrity-badge`}
              />

              <SecurityLevelBadge
                category="Confidentiality"
                level={confidentialityLevel}
                colorClass="bg-purple-50 dark:bg-purple-900 dark:bg-opacity-20"
                textClass="text-purple-600 dark:text-purple-400"
                testId={`${testId}-confidentiality-badge`}
              />
            </div>

            {/* Overall Security Level */}
            <div
              className="p-3 bg-blue-50 dark:bg-blue-900 dark:bg-opacity-20 rounded-lg border border-blue-200 dark:border-blue-800"
              data-testid={SECURITY_LEVEL_TEST_IDS.CALCULATED_LEVEL}
            >
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">Overall Level:</span>
                <span className="flex items-center space-x-2">
                  <span className="text-lg font-bold">{securityLevel}</span>
                  {isAutoCalculated && (
                    <Tooltip content="Automatically calculated from CIA components">
                      <span className="text-xs text-blue-600 dark:text-blue-400">
                        Auto
                      </span>
                    </Tooltip>
                  )}
                </span>
              </div>

              <div className="mt-2">
                <div className="text-center text-xl text-blue-600 dark:text-blue-300">
                  {getSecurityLevelIndicator(securityLevel)}
                </div>
              </div>
            </div>

            {/* Manual Security Level Selector */}
            <div className="mt-4">
              <div className="flex items-center justify-between mb-1">
                <label
                  htmlFor="manual-security-level"
                  className="text-sm font-medium text-gray-600 dark:text-gray-400"
                >
                  Manual Override
                </label>
                <span
                  className={`text-xs ${
                    isAutoCalculated
                      ? "text-gray-500 dark:text-gray-500"
                      : "text-blue-600 dark:text-blue-400 font-medium"
                  }`}
                >
                  {isAutoCalculated ? "Auto" : "Manual"}
                </span>
              </div>

              <div className="flex space-x-2">
                <select
                  id="manual-security-level"
                  value={securityLevel}
                  onChange={(e) =>
                    handleSecurityLevelChange(e.target.value as SecurityLevel)
                  }
                  className="flex-grow p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  data-testid={SECURITY_LEVEL_TEST_IDS.MANUAL_LEVEL_SELECTOR}
                >
                  <option value="None">None</option>
                  <option value="Low">Low</option>
                  <option value="Moderate">Moderate</option>
                  <option value="High">High</option>
                  <option value="Very High">Very High</option>
                </select>
                <button
                  onClick={() => setIsAutoCalculated(true)}
                  className="px-3 py-2 bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 rounded-md hover:bg-blue-200 dark:hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  aria-label="Reset to auto calculation"
                  title="Reset to auto calculation"
                  data-testid={SECURITY_LEVEL_TEST_IDS.AUTO_CALCULATE_BUTTON}
                >
                  Auto
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </WidgetContainer>
  );
};

export default SecurityLevelWidget;
