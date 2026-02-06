import React from "react";
import { SECURITY_SUMMARY_WIDGET_IDS } from "../../../constants/testIds";
import { formatCurrency } from "../../../utils/formatUtils";

/**
 * Props for SecurityBusinessTab component
 */
export interface SecurityBusinessTabProps {
  businessMaturityLevel: string;
  businessMaturityDescription: string;
  securityScore: number;
  costDetails: {
    totalCapex: number;
    totalOpex: number;
    totalCost: number;
  };
  testId: string;
  roiEstimate: string;
}

/**
 * Business Value tab component for SecuritySummaryWidget
 * Displays business impact, ROI, costs, and business enablement
 */
export const SecurityBusinessTab: React.FC<SecurityBusinessTabProps> = ({
  businessMaturityLevel,
  businessMaturityDescription,
  securityScore,
  costDetails,
  testId,
  roiEstimate,
}) => {
  return (
    <div data-testid={testId || SECURITY_SUMMARY_WIDGET_IDS.section('content-business')} className="space-y-sm">
      {/* Business Value content */}
      <div className="p-sm bg-blue-50 dark:bg-blue-900/20 rounded mb-sm">
        <p className="text-caption">
          Business value and financial impact of your security levels.
        </p>
      </div>

      {/* Business Impact Summary */}
      <div className="rounded-lg border border-gray-100 dark:border-gray-700 p-sm bg-white dark:bg-gray-800">
        <h3 className="text-body-lg font-medium mb-sm text-gray-800 dark:text-gray-100">
          Business Value Summary
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-sm">
          {/* Business Maturity */}
          <div className="p-sm bg-blue-50 dark:bg-blue-900/20 rounded">
            <h4 className="text-caption font-medium text-blue-700 dark:text-blue-300">
              Business Maturity
            </h4>
            <div className="text-body-lg font-bold text-blue-600 dark:text-blue-400 mt-sm">
              {businessMaturityLevel}
            </div>
          </div>

          {/* ROI Estimation */}
          <div className="p-sm bg-green-50 dark:bg-green-900/20 rounded">
            <h4 className="text-caption font-medium text-green-700 dark:text-green-300">
              Estimated ROI
            </h4>
            <div className="text-body-lg font-bold text-green-600 dark:text-green-400 mt-sm">
              {roiEstimate}
            </div>
          </div>
        </div>
      </div>

      {/* Cost Summary */}
      <div className="rounded-lg border border-gray-100 dark:border-gray-700 p-sm bg-white dark:bg-gray-800">
        <h3 className="text-body-lg font-medium mb-sm text-gray-800 dark:text-gray-100">
          Cost Summary
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-sm">
          {/* Implementation Cost */}
          <div className="p-sm bg-gray-50 dark:bg-gray-700 rounded">
            <div className="text-xs font-medium mb-sm text-gray-700 dark:text-gray-200">CAPEX</div>
            <div className="text-body-lg font-bold text-blue-600 dark:text-blue-400">
              {formatCurrency(costDetails.totalCapex)}
            </div>
          </div>

          {/* Operational Cost */}
          <div className="p-sm bg-gray-50 dark:bg-gray-700 rounded">
            <div className="text-xs font-medium mb-sm text-gray-700 dark:text-gray-200">OPEX</div>
            <div className="text-body-lg font-bold text-green-600 dark:text-green-400">
              {formatCurrency(costDetails.totalOpex)}
            </div>
          </div>

          {/* Total Cost */}
          <div className="p-sm bg-gray-50 dark:bg-gray-700 rounded">
            <div className="text-xs font-medium mb-sm text-gray-700 dark:text-gray-200">
              Total
            </div>
            <div className="text-body-lg font-bold text-purple-600 dark:text-purple-400">
              {formatCurrency(costDetails.totalCost)}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
