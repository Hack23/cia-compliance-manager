import React from "react";
import { SECURITY_LEVELS } from "../../constants/appConstants";
import { SecurityLevel } from "../../types/cia";
import Tooltip from "./Tooltip";

interface SecurityLevelSelectorProps {
  label: string;
  value: SecurityLevel;
  onChange: (value: SecurityLevel) => void;
  icon?: string;
  tooltipContent?: string;
  className?: string;
  testId?: string;
  disabled?: boolean;
}

/**
 * A selector component for choosing security levels with consistency across the app
 *
 * ## Business Perspective
 *
 * This component gives users a consistent way to select security levels across
 * the CIA triad, incorporating standardized options, informational tooltips, and
 * icons to enhance understanding and decision-making. 🔧
 */
const SecurityLevelSelector: React.FC<SecurityLevelSelectorProps> = ({
  label,
  value,
  onChange,
  icon,
  tooltipContent,
  className = "",
  testId = "security-level-selector",
  disabled = false,
}) => {
  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    onChange(event.target.value as SecurityLevel);
  };

  return (
    <div
      className={`security-level-selector mb-4 ${className}`}
      data-testid={testId}
    >
      <div className="flex items-center mb-1">
        <label
          htmlFor={`${testId}-select`}
          className="mr-2 font-medium text-sm"
        >
          {icon && <span className="mr-1">{icon}</span>}
          {label}
        </label>

        {tooltipContent && (
          <Tooltip content={tooltipContent} testId={`${testId}-tooltip`}>
            <span className="info-button text-gray-500 dark:text-gray-400 cursor-help">
              ⓘ
            </span>
          </Tooltip>
        )}
      </div>

      <select
        id={`${testId}-select`}
        value={value}
        onChange={handleChange}
        className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
        disabled={disabled}
        data-testid={`${testId}-select`}
      >
        <option value={SECURITY_LEVELS.NONE}>{SECURITY_LEVELS.NONE}</option>
        <option value={SECURITY_LEVELS.LOW}>{SECURITY_LEVELS.LOW}</option>
        <option value={SECURITY_LEVELS.MODERATE}>
          {SECURITY_LEVELS.MODERATE}
        </option>
        <option value={SECURITY_LEVELS.HIGH}>{SECURITY_LEVELS.HIGH}</option>
        <option value={SECURITY_LEVELS.VERY_HIGH}>
          {SECURITY_LEVELS.VERY_HIGH}
        </option>
      </select>
    </div>
  );
};

export default SecurityLevelSelector;
