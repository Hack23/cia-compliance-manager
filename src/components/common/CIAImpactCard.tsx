import React, { ReactNode } from "react";
import { SecurityLevel } from "../../types/cia";
import StatusBadge from "./StatusBadge";

interface CIAImpactCardProps {
  title: string;
  level: SecurityLevel;
  description: string;
  icon: string;
  badgeVariant: "info" | "success" | "purple" | "warning" | "error" | "neutral";
  cardClass?: string;
  testId?: string;
  children?: ReactNode;
}

/**
 * Reusable card component for displaying CIA impact information
 *
 * Provides consistent styling and organization for CIA impact details across widgets
 */
const CIAImpactCard: React.FC<CIAImpactCardProps> = ({
  title,
  level,
  description,
  icon,
  badgeVariant,
  cardClass = "",
  testId,
  children,
}) => {
  return (
    <div
      className={`bg-gray-50 dark:bg-gray-800 p-4 rounded-lg border shadow-sm ${cardClass}`}
      data-testid={testId}
    >
      <div className="flex justify-between items-center mb-2">
        <h4 className="font-medium flex items-center">
          <span className="mr-2">{icon}</span>
          {title}
        </h4>
        <StatusBadge status={badgeVariant}>{level}</StatusBadge>
      </div>

      <p className="text-sm text-gray-700 dark:text-gray-300">{description}</p>

      {children}
    </div>
  );
};

export default CIAImpactCard;
