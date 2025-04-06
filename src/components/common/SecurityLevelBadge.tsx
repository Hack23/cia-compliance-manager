import React from "react";
import { SecurityLevel } from "../../types/cia";

interface SecurityLevelBadgeProps {
  /**
   * Security level to display
   */
  level: SecurityLevel;

  /**
   * Category label (e.g., "Confidentiality", "Integrity", "Availability")
   */
  category?: string;

  /**
   * Optional color class for background
   */
  colorClass?: string;

  /**
   * Optional color class for text
   */
  textClass?: string;

  /**
   * Optional test ID for testing
   */
  testId?: string;
}

/**
 * Enhanced security level badge component with visual improvements
 */
const SecurityLevelBadge: React.FC<SecurityLevelBadgeProps> = ({
  level,
  category,
  colorClass = "",
  textClass = "",
  testId = "security-level-badge",
}) => {
  const levelClass = level.toLowerCase().replace(" ", "-");

  return (
    <div
      className={`security-level-badge ${levelClass} ${colorClass}`}
      data-testid={testId}
    >
      <span className="security-level-icon"></span>
      <span className={`security-level-text ${textClass}`}>
        {category && <span className="security-category">{category}: </span>}
        <span className="security-level">{level}</span>
      </span>
    </div>
  );
};

export default SecurityLevelBadge;
