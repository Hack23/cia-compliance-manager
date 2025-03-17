import React from "react";
import ciaContentService from "../../services/ciaContentService";
import { SecurityLevel } from "../../types/cia";
import Tooltip from "../common/Tooltip";

interface SecurityLevelSelectorProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: string[];
  description?: string;
  icon?: string;
  tooltipContent?: string;
  testId?: string;
  accentColor?: string;
  disabled?: boolean;
  className?: string;
}

/**
 * A component for selecting security levels with description and tooltip
 */
const SecurityLevelSelector: React.FC<SecurityLevelSelectorProps> = ({
  label,
  value,
  onChange,
  options,
  description,
  icon,
  tooltipContent,
  testId,
  accentColor,
  disabled = false,
  className = "",
}) => {
  // Get detailed description based on the selected value
  const getDetailedDescription = () => {
    // This would normally come from a service, but for now we'll create a simplified version
    // showing the value with a prefix like in the original
    if (!value) return "";

    // Try to get a description from the service first
    const component = label.toLowerCase().includes("confidentiality")
      ? "confidentiality"
      : label.toLowerCase().includes("integrity")
      ? "integrity"
      : "availability";

    const details = ciaContentService.getComponentDetails(
      component,
      value as SecurityLevel
    );

    // Return a detailed description or a simplified fallback
    return (
      details?.description ||
      `${value} - ${
        component.charAt(0).toUpperCase() + component.slice(1)
      } security level of ${value}.`
    );
  };

  // Calculate the level-specific characteristics
  const getLevelSpecificValue = () => {
    if (!value) return "";

    // Get a specific characteristic based on CIA component
    const component = label.toLowerCase().includes("confidentiality")
      ? "confidentiality"
      : label.toLowerCase().includes("integrity")
      ? "integrity"
      : "availability";

    const details = ciaContentService.getComponentDetails(
      component,
      value as SecurityLevel
    );

    // Return a characteristic based on component type (e.g., uptime for availability)
    if (component === "availability" && details?.uptime) {
      return details.uptime;
    } else if (component === "integrity" && details?.validationMethod) {
      return details.validationMethod;
    } else if (component === "confidentiality" && details?.protectionMethod) {
      return details.protectionMethod;
    }

    return "";
  };

  return (
    <div className={`mb-4 ${className}`} data-testid={testId}>
      <div className="flex items-center mb-1">
        {icon && <span className="mr-2">{icon}</span>}
        <label
          htmlFor={`select-${label.toLowerCase().replace(/\s/g, "-")}`}
          className="font-medium text-gray-700 dark:text-gray-300"
        >
          {label}
        </label>
        {tooltipContent && (
          <Tooltip content={tooltipContent}>
            <button
              type="button"
              className="info-button ml-1 text-gray-500 hover:text-gray-600 dark:text-gray-400"
              aria-label={`Info about ${label}`}
            >
              <span>ℹ️</span>
            </button>
          </Tooltip>
        )}
      </div>

      {description && (
        <p className="text-xs text-gray-600 dark:text-gray-400 mb-2">
          {description}
        </p>
      )}

      <div className="flex items-center mb-2">
        <span
          className="mr-2 font-medium"
          style={accentColor ? { color: accentColor } : undefined}
        >
          {value}
        </span>

        <select
          id={`select-${label.toLowerCase().replace(/\s/g, "-")}`}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="block w-full px-2 py-1.5 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300"
          style={accentColor ? { borderColor: accentColor } : undefined}
          disabled={disabled}
        >
          {options.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </div>

      {/* Detailed description of selected value */}
      {value && (
        <div className="mt-2">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            {getDetailedDescription()}
          </p>
          {getLevelSpecificValue() && (
            <span
              className="inline-block text-xs mt-1 px-2 py-1 bg-gray-100 dark:bg-gray-700 rounded"
              style={accentColor ? { color: accentColor } : undefined}
            >
              {getLevelSpecificValue()}
            </span>
          )}
        </div>
      )}
    </div>
  );
};

export default SecurityLevelSelector;
