import React, { useState } from "react";

/**
 * Props for the Selection component
 */
interface SelectionProps {
  id: string;
  label: string;
  icon?: string;
  description?: string;
  options: Array<{ value: string; label: string }>;
  value: string;
  onChange: (value: string) => void;
  iconClassName?: string;
  labelClassName?: string;
  infoContent?: string;
  contextInfo?: string;
  disabled?: boolean;
  "aria-label"?: string;
  "data-testid"?: string;
}

/**
 * Component for selecting security levels with consistent styling
 * 
 * ## Business Perspective
 * 
 * This component provides a standardized interface for selecting security levels,
 * with additional context information to help users understand the implications
 * of their choices. 🔒
 */
export const Selection: React.FC<SelectionProps> = ({
  id,
  label,
  icon,
  description,
  options,
  value,
  onChange,
  iconClassName = "",
  labelClassName = "",
  infoContent,
  contextInfo,
  disabled = false,
  "aria-label": ariaLabel,
  "data-testid": testId,
}) => {
  // State for showing/hiding info content
  const [showInfo, setShowInfo] = useState(false);
  
  // Handle selection change
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onChange(e.target.value);
  };
  
  // Toggle info panel
  const toggleInfo = () => {
    setShowInfo(!showInfo);
  };
  
  return (
    <div className="selection-component" data-testid={testId}>
      <div className="flex items-center mb-2">
        {icon && (
          <span className={`text-xl mr-2 ${iconClassName}`} role="img" aria-hidden="true">
            {icon}
          </span>
        )}
        <label htmlFor={id} className={`font-medium ${labelClassName}`}>
          {label}
        </label>
        {infoContent && (
          <button
            type="button"
            onClick={toggleInfo}
            className="ml-2 text-sm text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300 focus:outline-none"
            aria-expanded={showInfo}
            aria-label={`${showInfo ? "Hide" : "Show"} ${label} information`}
          >
            {showInfo ? "▲" : "▼"}
          </button>
        )}
      </div>
      
      {description && (
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
          {description}
        </p>
      )}
      
      <div className="relative">
        <select
          id={id}
          className="block w-full px-4 py-2 pr-8 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
          value={value}
          onChange={handleChange}
          disabled={disabled}
          aria-label={ariaLabel}
          data-testid={`${testId}-select`}
        >
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
          <svg
            className="h-5 w-5 text-gray-400"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            aria-hidden="true"
          >
            <path
              fillRule="evenodd"
              d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
              clipRule="evenodd"
            />
          </svg>
        </div>
      </div>
      
      {contextInfo && (
        <div className="mt-2 text-sm text-gray-600 dark:text-gray-400">
          {contextInfo}
        </div>
      )}
      
      {showInfo && infoContent && (
        <div className="mt-3 p-3 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-md">
          <h4 className="text-sm font-medium mb-1">Implementation Details</h4>
          <p className="text-sm text-gray-600 dark:text-gray-300">{infoContent}</p>
        </div>
      )}
    </div>
  );
};

export default Selection;
