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
    <div data-testid={testId || SECURITY_SUMMARY_WIDGET_IDS.section('content-business')} className="space-y-4">
      {/* Business Value content */}
      <div className="p-3 bg-blue-50 dark:bg-blue-900 dark:bg-opacity-20 rounded-lg mb-4">
        <p className="text-sm">
          This section summarizes the business value and financial impact of
          your selected security levels, helping justify security investments to
          stakeholders.
        </p>
      </div>

      {/* Business Impact Summary */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-4 border border-gray-100 dark:border-gray-700">
        <h3 className="text-lg font-medium mb-3 text-gray-800 dark:text-gray-100">
          Business Value Summary
        </h3>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {/* Business Maturity */}
          <div className="p-3 bg-blue-50 dark:bg-blue-900 dark:bg-opacity-20 rounded-lg">
            <h4 className="font-medium text-blue-700 dark:text-blue-300">
              Business Maturity Level
            </h4>
            <div className="text-xl font-bold text-blue-600 dark:text-blue-400 mt-2">
              {businessMaturityLevel}
            </div>
            <p className="text-sm text-blue-600 dark:text-blue-400 mt-1">
              {businessMaturityDescription}
            </p>
          </div>

          {/* ROI Estimation */}
          <div className="p-3 bg-green-50 dark:bg-green-900 dark:bg-opacity-20 rounded-lg">
            <h4 className="font-medium text-green-700 dark:text-green-300">
              Estimated ROI
            </h4>
            <div className="text-xl font-bold text-green-600 dark:text-green-400 mt-2">
              {roiEstimate}
            </div>
            <p className="text-sm text-green-600 dark:text-green-400 mt-1">
              {securityScore >= 80
                ? "Strong return from security investments"
                : securityScore >= 60
                ? "Good return from security investments"
                : securityScore >= 40
                ? "Basic return, primarily risk avoidance"
                : "Minimal return on investment"}
            </p>
          </div>
        </div>
      </div>

      {/* Cost Summary */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-4 border border-gray-100 dark:border-gray-700">
        <h3 className="text-lg font-medium mb-3 text-gray-800 dark:text-gray-100">
          Cost Summary
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {/* Implementation Cost */}
          <div className="p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
            <div className="text-sm font-medium mb-1">Implementation Cost</div>
            <div className="text-xl font-bold text-blue-600 dark:text-blue-400">
              {formatCurrency(costDetails.totalCapex)}
            </div>
            <div className="text-xs text-gray-600 dark:text-gray-400">
              One-time investment
            </div>
          </div>

          {/* Operational Cost */}
          <div className="p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
            <div className="text-sm font-medium mb-1">Operational Cost</div>
            <div className="text-xl font-bold text-green-600 dark:text-green-400">
              {formatCurrency(costDetails.totalOpex)}
            </div>
            <div className="text-xs text-gray-600 dark:text-gray-400">
              Annual expense
            </div>
          </div>

          {/* Total Cost */}
          <div className="p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
            <div className="text-sm font-medium mb-1">
              Total First-Year Cost
            </div>
            <div className="text-xl font-bold text-purple-600 dark:text-purple-400">
              {formatCurrency(costDetails.totalCost)}
            </div>
            <div className="text-xs text-gray-600 dark:text-gray-400">
              Combined implementation and operational costs
            </div>
          </div>
        </div>
      </div>

      {/* Business Enablement */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-4 border border-gray-100 dark:border-gray-700">
        <h3 className="text-lg font-medium mb-3 text-gray-800 dark:text-gray-100">
          Business Enablement
        </h3>

        <div className="space-y-3">
          <div className="p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
            <h4 className="text-sm font-medium mb-2">Business Capabilities</h4>
            <ul className="list-disc pl-5 space-y-1 text-sm">
              {securityScore >= 80 ? (
                <>
                  <li>Enables digital transformation initiatives</li>
                  <li>Supports secure cloud adoption</li>
                  <li>Facilitates secure partner integrations</li>
                  <li>
                    Provides competitive advantage through security as a value
                  </li>
                </>
              ) : securityScore >= 60 ? (
                <>
                  <li>Supports most digital business initiatives</li>
                  <li>Enables secure customer data handling</li>
                  <li>Allows controlled partner access</li>
                  <li>Meets most customer security requirements</li>
                </>
              ) : securityScore >= 40 ? (
                <>
                  <li>Supports basic business operations</li>
                  <li>Enables limited partner interactions</li>
                  <li>Meets minimum customer expectations</li>
                </>
              ) : (
                <>
                  <li>Limited security capabilities</li>
                  <li>May restrict business opportunities</li>
                  <li>Potential compliance limitations</li>
                </>
              )}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};
