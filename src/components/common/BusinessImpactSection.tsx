import React from 'react';
import { BusinessImpactDetails } from '../../types/cia-services';

interface BusinessImpactSectionProps {
  impact: BusinessImpactDetails;
  color: string;
  testId?: string;
}

/**
 * Reusable component for displaying business impact information
 * Used by various CIA impact widgets to provide consistent UI
 */
const BusinessImpactSection: React.FC<BusinessImpactSectionProps> = ({
  impact,
  color,
  testId = "business-impact-section"
}) => {
  // Get appropriate badge variant for risk level
  const getRiskBadgeVariant = (riskLevel?: string) => {
    if (!riskLevel) return "neutral";
    
    if (riskLevel.toLowerCase().includes("high")) {
      return "error";
    } else if (riskLevel.toLowerCase().includes("medium")) {
      return "warning";
    } else if (riskLevel.toLowerCase().includes("low")) {
      return "success";
    }
    
    return "info";
  };

  return (
    <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg border shadow-sm security-card" data-testid={testId}>
      <h4 className="text-md font-medium mb-3 flex items-center">
        <span className="mr-2">💼</span>
        Business Impact
      </h4>

      <p className="text-gray-600 dark:text-gray-300 mb-4" data-testid={`${testId}-summary`}>
        {impact.summary || "No business impact data available"}
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {impact.financial && (
          <div className={`p-3 rounded-md bg-opacity-10 bg-${color}-100 dark:bg-${color}-900 dark:bg-opacity-20 border border-${color}-200 dark:border-${color}-800`}>
            <div className="flex items-center mb-2">
              <span className="mr-2">💰</span>
              <span className={`font-medium text-${color}-700 dark:text-${color}-300`}>
                Financial Impact
              </span>
            </div>
            <p className="text-sm text-gray-700 dark:text-gray-300">
              {impact.financial.description || "No financial impact information available"}
            </p>
          </div>
        )}

        {impact.operational && (
          <div className={`p-3 rounded-md bg-opacity-10 bg-${color}-100 dark:bg-${color}-900 dark:bg-opacity-20 border border-${color}-200 dark:border-${color}-800`}>
            <div className="flex items-center mb-2">
              <span className="mr-2">⚙️</span>
              <span className={`font-medium text-${color}-700 dark:text-${color}-300`}>
                Operational Impact
              </span>
            </div>
            <p className="text-sm text-gray-700 dark:text-gray-300">
              {impact.operational.description || "No operational impact information available"}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default BusinessImpactSection;
