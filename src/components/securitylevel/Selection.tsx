import React, { useState } from "react";

interface SelectionOption {
  value: string;
  label: string;
}

interface SelectionProps {
  id: string;
  label: string;
  icon?: React.ReactNode;
  description?: string;
  options: SelectionOption[];
  value: string;
  onChange: (value: string) => void;
  iconClassName?: string;
  labelClassName?: string;
  infoContent?: string;
  contextInfo?: string;
  disabled?: boolean;
  [key: string]: any; // For additional props like aria attributes
}

/**
 * Selection component for security level selection
 * 
 * ## Business Perspective
 * 
 * This component provides a standardized selection interface across
 * the application, allowing users to make consistent security level
 * choices with appropriate visual cues and contextual information. 💼
 */
export const Selection: React.FC<SelectionProps> = ({
  id,
  label,
  icon,
  description,
  options,
  value,
  onChange,
  iconClassName = "text-gray-600 dark:text-gray-400",
  labelClassName = "text-gray-800 dark:text-gray-200",
  infoContent = "",
  contextInfo = "",
  disabled = false,
  ...rest
}) => {
  const [showInfo, setShowInfo] = useState(false);
  const [showContext, setShowContext] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onChange(e.target.value);
  };

  const toggleInfo = () => {
    setShowInfo(!showInfo);
    if (showContext) setShowContext(false);
  };

  const toggleContext = () => {
    setShowContext(!showContext);
    if (showInfo) setShowInfo(false);
  };

  const selectId = `${id}-select`;

  return (
    <div className="selection-component" data-testid={id}>
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center">
          {icon && <span className={`mr-2 ${iconClassName}`} aria-hidden="true">{icon}</span>}
          <label 
            htmlFor={selectId} 
            className={`font-medium ${labelClassName}`}
            data-testid={`${id}-label`}
          >
            {label}
          </label>
          {description && (
            <span className="ml-2 text-sm text-gray-500 dark:text-gray-400">
              {description}
            </span>
          )}
        </div>
        <div className="flex items-center space-x-2">
          {infoContent && (
            <button
              type="button"
              onClick={toggleInfo}
              className="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 focus:outline-none"
              aria-label={`Toggle information about ${label}`}
              data-testid={`${id}-info-toggle`}
            >
              ℹ️
            </button>
          )}
        </div>
      </div>
      
      <select
        id={selectId}
        value={value}
        onChange={handleChange}
        disabled={disabled}
        className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
        data-testid={selectId}
        aria-describedby={showInfo ? `${id}-info-content` : undefined}
        {...rest}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value} data-testid={`${id}-option-${option.value}`}>
            {option.label}
          </option>
        ))}
      </select>
      
      {showInfo && infoContent && (
        <div 
          className="mt-2 p-3 bg-blue-50 dark:bg-blue-900 dark:bg-opacity-20 rounded text-sm text-gray-700 dark:text-gray-300"
          id={`${id}-info-content`}
          data-testid={`${id}-info-content`}
        >
          <div className="flex justify-between items-start">
            <h4 className="font-medium text-blue-700 dark:text-blue-400 mb-1">Technical Details</h4>
            <button
              onClick={toggleInfo}
              className="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
              aria-label="Close information"
              data-testid={`${id}-info-close`}
            >
              ✕
            </button>
          </div>
          <p>{infoContent}</p>
        </div>
      )}
      
      {contextInfo && (
        <div className="mt-2 flex items-center justify-between" data-testid={`${id}-context-container`}>
          <div className="text-sm text-gray-600 dark:text-gray-400" data-testid={`${id}-context-info`}>
            {showContext ? contextInfo : `${contextInfo.substring(0, 50)}${contextInfo.length > 50 ? '...' : ''}`}
          </div>
          {contextInfo.length > 50 && (
            <button
              onClick={toggleContext}
              className="ml-2 text-xs text-blue-600 dark:text-blue-400 hover:underline"
              aria-label={showContext ? "Show less" : "Show more"}
              data-testid={`${id}-context-toggle`}
            >
              {showContext ? "Show less" : "Show more"}
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default Selection;
