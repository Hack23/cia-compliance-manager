import React from "react";
import { SECURITY_LEVEL_TEST_IDS, CIA_TEST_IDS } from "../../constants/testIds";
import { SECURITY_LEVELS } from "../../constants/appConstants";

interface SecurityLevelSelectorProps {
  label: string;
  level: string;
  onChange: (level: string) => void;
  description?: string;
  icon?: string;
  testId?: string;
  color?: string;
  selectTestId?: string;
}

const SecurityLevelSelector: React.FC<SecurityLevelSelectorProps> = ({
  label,
  level,
  onChange,
  description,
  icon,
  testId,
  color,
  selectTestId,
}) => (
  <div data-testid={testId} className="security-level-selector">
    <label
      htmlFor={selectTestId}
      className="block mb-1 font-medium text-gray-700 dark:text-gray-300"
    >
      {icon && (
        <span className="mr-2" aria-hidden="true">
          {icon}
        </span>
      )}
      {label}
    </label>
    <select
      id={selectTestId}
      value={level}
      onChange={(e) => onChange(e.target.value)}
      data-testid={selectTestId}
      className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
      aria-label={`Select ${label} security level`}
    >
      <option value="None">None</option>
      <option value="Low">Low</option>
      <option value="Moderate">Moderate</option>
      <option value="High">High</option>
      <option value="Very High">Very High</option>
    </select>
    {description && (
      <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
        {description}
      </p>
    )}
  </div>
);

interface SecurityLevelWidgetProps {
  availabilityLevel: string;
  integrityLevel: string;
  confidentialityLevel: string;
  setAvailability: (level: string) => void;
  setIntegrity: (level: string) => void;
  setConfidentiality: (level: string) => void;
  testId?: string;
}

const SecurityLevelWidget: React.FC<SecurityLevelWidgetProps> = ({
  availabilityLevel = SECURITY_LEVELS.NONE,
  integrityLevel = SECURITY_LEVELS.NONE,
  confidentialityLevel = SECURITY_LEVELS.NONE,
  setAvailability,
  setIntegrity,
  setConfidentiality,
  testId = SECURITY_LEVEL_TEST_IDS.SECURITY_LEVEL_PREFIX,
}) => {
  return (
    <div
      className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow-sm"
      data-testid={testId}
      aria-labelledby="security-level-controls-heading"
      id="security-level-controls"
    >
      <h2
        id="security-level-controls-heading"
        className="text-lg font-medium mb-4 text-gray-800 dark:text-gray-200"
      >
        Security Level Configuration
      </h2>

      <div className="mb-6">
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
          Select the appropriate security level for each of the CIA security
          dimensions to establish your security profile.
        </p>
      </div>

      <div className="space-y-6">
        <SecurityLevelSelector
          label="Confidentiality"
          level={confidentialityLevel}
          onChange={setConfidentiality}
          description="Protection of data from unauthorized access and disclosure"
          icon="🔒"
          testId={`${testId}-confidentiality`}
          selectTestId={CIA_TEST_IDS.CONFIDENTIALITY_SELECT}
          color="purple"
        />

        <SecurityLevelSelector
          label="Integrity"
          level={integrityLevel}
          onChange={setIntegrity}
          description="Accuracy, consistency, and trustworthiness of data"
          icon="✓"
          testId={`${testId}-integrity`}
          selectTestId={CIA_TEST_IDS.INTEGRITY_SELECT}
          color="green"
        />

        <SecurityLevelSelector
          label="Availability"
          level={availabilityLevel}
          onChange={setAvailability}
          description="Ensuring timely and reliable access to data and services"
          icon="⏱️"
          testId={`${testId}-availability`}
          selectTestId={CIA_TEST_IDS.AVAILABILITY_SELECT}
          color="blue"
        />
      </div>
    </div>
  );
};

export default SecurityLevelWidget;
