import React from "react";
import { SECURITY_LEVEL_TEST_IDS } from "../../constants/testIds";
import { SECURITY_LEVELS } from "../../constants/appConstants";

interface SecurityLevelSelectorProps {
  label: string;
  level: string;
  onChange: (level: string) => void;
  description?: string;
  icon?: string;
  testId?: string;
  color?: string;
}

const SecurityLevelSelector: React.FC<SecurityLevelSelectorProps> = ({
  label,
  level,
  onChange,
  description,
  icon,
  testId,
  color,
}) => (
  <div data-testid={testId}>
    <label>{label}</label>
    <select value={level} onChange={(e) => onChange(e.target.value)}>
      <option value="None">None</option>
      <option value="Low">Low</option>
      <option value="Moderate">Moderate</option>
      <option value="High">High</option>
      <option value="Very High">Very High</option>
    </select>
    {description && <p>{description}</p>}
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
    <div className="p-4" data-testid={testId}>
      <div className="mb-6">
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
          Select the appropriate security level for each of the CIA security
          dimensions.
        </p>
      </div>

      <div className="space-y-6">
        <SecurityLevelSelector
          label="Confidentiality"
          level={confidentialityLevel} // This should match the expected prop in SecurityLevelSelector
          onChange={setConfidentiality}
          description="Protection of data from unauthorized access"
          icon="🔒"
          testId={`${testId}-confidentiality`}
          color="purple"
        />

        <SecurityLevelSelector
          label="Integrity"
          level={integrityLevel} // This should match the expected prop in SecurityLevelSelector
          onChange={setIntegrity}
          description="Accuracy and consistency of data"
          icon="✓"
          testId={`${testId}-integrity`}
          color="green"
        />

        <SecurityLevelSelector
          label="Availability"
          level={availabilityLevel} // This should match the expected prop in SecurityLevelSelector
          onChange={setAvailability}
          description="Access to data when needed"
          icon="⟳"
          testId={`${testId}-availability`}
          color="blue"
        />
      </div>
    </div>
  );
};

export default SecurityLevelWidget;
