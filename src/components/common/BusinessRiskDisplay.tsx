import React from "react";
import { parseRiskLevel } from "../../utils";
import RiskLevelBadge from "./RiskLevelBadge";

interface BusinessRiskDisplayProps {
  impactCategory: string;
  riskLevel: string;
  description?: string;
  metric?: {
    label: string;
    value: string;
  };
  testId?: string;
}

/**
 * Displays business risk information for a specific impact category
 * 
 * ## Business Perspective
 * 
 * This component provides a standardized way to present business risk information
 * across various widgets, helping stakeholders understand specific risk areas and
 * their potential business impact. 💼
 */
const BusinessRiskDisplay: React.FC<BusinessRiskDisplayProps> = ({
  impactCategory,
  riskLevel,
  description,
  metric,
  testId = "business-risk-display"
}) => {
  // Parse risk level to numeric value for styling decisions
  const riskValue = parseRiskLevel(riskLevel);
  
  // Set border color based on risk level
  const getBorderColor = () => {
    if (riskValue >= 4) return "border-red-500";
    if (riskValue >= 3) return "border-orange-500";
    if (riskValue >= 2) return "border-yellow-500";
    if (riskValue >= 1) return "border-blue-500";
    return "border-green-500";
  };

  return (
    <div
      className={`p-3 rounded-md border-l-4 bg-gray-50 dark:bg-gray-800 ${getBorderColor()}`}
      data-testid={testId}
    >
      <div className="flex items-center justify-between mb-2">
        <h4 className="text-md font-medium capitalize">{impactCategory} Impact</h4>
        <RiskLevelBadge riskLevel={riskLevel} testId={`${testId}-risk-level`} />
      </div>
      
      {description && (
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-2" data-testid={`${testId}-description`}>
          {description}
        </p>
      )}
      
      {metric && (
        <div className="mt-2 text-sm">
          <span className="font-semibold">{metric.label}:</span> {metric.value}
        </div>
      )}
    </div>
  );
};

export default BusinessRiskDisplay;
