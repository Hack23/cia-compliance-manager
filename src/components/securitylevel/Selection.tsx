import React, { useState } from "react";

interface SelectionOption {
  value: string;
  label: string;
}

interface SelectionProps {
  id: string;
  label: string;
  description?: string;
  icon?: string;
  options: SelectionOption[];
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
 * Selection component for selecting security levels with rich information display
 * 
 * @param props Component properties
 * @returns React element
 */
export const Selection: React.FC<SelectionProps> = ({
  id,
  label,
  description,
  icon,
  options,
  value,
  onChange,
  iconClassName = "text-gray-600 dark:text-gray-400",
  labelClassName = "text-gray-800 dark:text-gray-200",
  infoContent,
  contextInfo,
  disabled = false,
  "aria-label": ariaLabel,
  "data-testid": dataTestId,
}) => {
  const [showInfo, setShowInfo] = useState(false);
  const [showContext, setShowContext] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onChange(e.target.value);
  };

  return (
    <div data-testid={dataTestId}>
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center">
          {icon && <span className={`mr-2 ${iconClassName}`}>{icon}</span>}
          <label htmlFor={id} className={`font-medium ${labelClassName}`}>
            {label}
          </label>
        </div>
        
        {infoContent && (
          <button
            type="button"
            onClick={() => setShowInfo(!showInfo)}
            className="text-blue-500 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
            aria-label={showInfo ? "Hide information" : "Show information"}
          >
            ⓘ
          </button>
        )}
      </div>
      
      {description && (
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
          {description}
        </p>
      )}
      
      {showInfo && infoContent && (
        <div className="bg-blue-50 dark:bg-blue-900 dark:bg-opacity-20 p-2 rounded-md mb-2 text-sm text-blue-800 dark:text-blue-300">
          {infoContent}
        </div>
      )}
      
      <div className="mb-2">
        <select
          id={id}
          value={value}
          onChange={handleChange}
          className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
          disabled={disabled}
          aria-label={ariaLabel}
          data-testid={id}
        >
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>
      
      {contextInfo && (
        <div className="text-right">
          <button
            type="button"
            onClick={() => setShowContext(!showContext)}
            className="text-xs text-blue-600 dark:text-blue-400 hover:underline"
          >
            {showContext ? "Hide details" : "Show details"}
          </button>
        </div>
      )}
      
      {showContext && contextInfo && (
        <div className="mt-1 p-2 border border-gray-200 dark:border-gray-700 rounded-md bg-gray-50 dark:bg-gray-800 text-xs text-gray-600 dark:text-gray-400">
          {contextInfo}
        </div>
      )}
    </div>
  );
};

export default Selection;
