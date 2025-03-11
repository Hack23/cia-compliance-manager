import React, { ReactNode } from "react";
import { SecurityLevel } from "../../types/cia";
import StatusBadge from "./StatusBadge";

interface CIAImpactCardProps {
  title: string;
  level: SecurityLevel;
  description: string;
  icon: string;
  badgeVariant: "purple" | "success" | "info";
  cardClass: string;
  children?: ReactNode;
  testId?: string;
}

/**
 * Reusable component for displaying CIA impact information with enhanced Ingress styling
 */
const CIAImpactCard: React.FC<CIAImpactCardProps> = ({
  title,
  level,
  description,
  icon,
  badgeVariant,
  cardClass,
  children,
  testId,
}) => {
  // Determine icon class based on card class
  const getIconClass = () => {
    if (cardClass.includes("confidentiality")) return "icon-confidentiality";
    if (cardClass.includes("integrity")) return "icon-integrity";
    if (cardClass.includes("availability")) return "icon-availability";
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

    return levelMap[level] || "level-none";
  };

  return (
    <div
      className={`p-4 bg-gray-50 dark:bg-gray-800 rounded-lg border-l-4 ${cardClass} security-card`}
      data-testid={testId}
    >
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-lg font-medium flex items-center">
          <span className={`mr-2 ${getIconClass()}`}>{icon}</span>
          {title}
        </h3>
        <StatusBadge status={badgeVariant} className="text-xs px-3">
          <span
            className={`security-level-indicator ${getLevelClass()} mr-1`}
          ></span>
          {level}
        </StatusBadge>
      </div>

      <p className="text-gray-600 dark:text-gray-300 mb-4">{description}</p>

      {children}
    </div>
  );
};

export default CIAImpactCard;
