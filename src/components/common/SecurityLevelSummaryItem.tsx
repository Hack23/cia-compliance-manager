import React from "react";
import { SecurityLevel } from "../../types/cia";
import { getSecurityLevelClass } from "../../utils/securityLevelUtils";

export interface SecurityLevelSummaryItemProps {
  label: string;
  value: SecurityLevel;
  icon: string;
  testId?: string;
  color?: string;
  borderColor?: string;
  compact?: boolean;
}

/**
 * Security level summary item with enhanced Ingress styling
 * Used to display security level information in a compact, consistent format
 */
const SecurityLevelSummaryItem: React.FC<SecurityLevelSummaryItemProps> = ({
  label,
  value,
  icon,
  testId,
  color = "blue",
  borderColor,
  compact = false,
}) => {
  // Get the icon class based on the label (for consistent styling)
  const getIconClass = () => {
    if (label.toLowerCase().includes("confidentiality"))
      return "icon-confidentiality";
    if (label.toLowerCase().includes("integrity")) return "icon-integrity";
    if (label.toLowerCase().includes("availability"))
      return "icon-availability";
    return "";
  };

  // Get the security level indicator class
  const getLevelClass = () => {
    const levelMap: Record<string, string> = {
      None: "level-none",
      Low: "level-low",
      Moderate: "level-moderate",
      High: "level-high",
      "Very High": "level-very-high",
    };

    return levelMap[value] || "level-none";
  };

  if (compact) {
    return (
      <div
        data-testid={testId}
        className="flex items-center bg-gray-50 dark:bg-gray-800 px-2 py-1 rounded-md text-xs"
        style={{
          borderLeft: borderColor ? `3px solid ${borderColor}` : undefined,
        }}
      >
        <span className={`mr-1 ${getIconClass()}`}>{icon}</span>
        <div>
          <div className="text-gray-500 dark:text-gray-400 text-xxs">
            {label}
          </div>
          <div className="font-medium flex items-center">
            <span
              className={`security-level-indicator ${getLevelClass()} mr-1`}
            ></span>
            {value}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      className="bg-gray-50 dark:bg-gray-800 p-3 rounded-md flex items-center security-card"
      style={{
        borderLeft: borderColor ? `3px solid ${borderColor}` : undefined,
      }}
      data-testid={testId}
    >
      <div className="icon-container mr-3">
        <span className={getIconClass()}>{icon}</span>
      </div>
      <div className="flex-grow">
        <div className="text-xs text-gray-500 dark:text-gray-400">{label}</div>
        <div className="font-medium flex items-center">
          <span
            className={`security-level-indicator ${getLevelClass()} mr-1`}
          ></span>
          {value}
        </div>
      </div>
    </div>
  );
};

export default SecurityLevelSummaryItem;
