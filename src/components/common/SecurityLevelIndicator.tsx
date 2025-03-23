import React from "react";
import { SecurityLevel } from "../../types/cia";
import { getSecurityLevelClass } from "../../utils/securityLevelUtils";

interface SecurityLevelIndicatorProps {
  /**
   * The security level to display
   */
  level: SecurityLevel;

  /**
   * Optional size of the indicator (default: 'md')
   */
  size?: "sm" | "md" | "lg";

  /**
   * Optional CSS class name
   */
  className?: string;

  /**
   * Optional test ID for automated testing
   */
  testId?: string;
}

/**
 * SecurityLevelIndicator displays a visual indicator for a security level
 */
const SecurityLevelIndicator: React.FC<SecurityLevelIndicatorProps> = ({
  level,
  size = "md",
  className = "",
  testId,
}) => {
  const getSizeClass = () => {
    switch (size) {
      case "sm":
        return "text-xs px-1.5 py-0.5";
      case "lg":
        return "text-sm px-3 py-1.5";
      default:
        return "text-xs px-2 py-1"; // md
    }
  };

  return (
    <span
      className={`inline-block rounded font-medium ${getSecurityLevelClass(
        level
      )} ${getSizeClass()} ${className}`}
      data-testid={testId}
    >
      {level}
    </span>
  );
};

export default SecurityLevelIndicator;
