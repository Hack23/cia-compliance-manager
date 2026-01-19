import React from "react";
import { SECURITY_SUMMARY_WIDGET_IDS } from "../../../constants/testIds";
import { formatCurrency } from "../../../utils/formatUtils";
import { WidgetClasses, cn } from "../../../utils/tailwindClassHelpers";

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
    <div data-testid={testId || SECURITY_SUMMARY_WIDGET_IDS.section('content-business')} className="space-y-md">
      {/* Business Value content */}
      <div className="p-sm bg-blue-50 dark:bg-blue-900/20 rounded-lg mb-sm">
        <p className="text-sm">
          This section summarizes the business value and financial impact of
          your selected security levels, helping justify security investments to
          stakeholders.
        </p>
      </div>

      {/* Business Impact Summary */}
      <div className={cn(WidgetClasses.card, "shadow-sm")}>
        <h3 className="text-subheading font-medium mb-sm text-gray-800 dark:text-gray-100">
          Business Value Summary
        </h3>

        <div className={WidgetClasses.grid2Cols}>
          {/* Business Maturity */}
          <div className="p-sm bg-blue-50 dark:bg-blue-900/20 rounded-lg">
            <h4 className="font-medium text-blue-700 dark:text-blue-300">
              Business Maturity Level
            </h4>
            <div className="text-subheading font-bold text-blue-600 dark:text-blue-400 mt-sm">
              {businessMaturityLevel}
            </div>
            <p className="text-sm text-blue-600 dark:text-blue-400 mt-xs">
              {businessMaturityDescription}
            </p>
          </div>

          {/* ROI Estimation */}
          <div className="p-sm bg-green-50 dark:bg-green-900/20 rounded-lg">
            <h4 className="font-medium text-green-700 dark:text-green-300">
              Estimated ROI
            </h4>
            <div className="text-subheading font-bold text-green-600 dark:text-green-400 mt-sm">
              {roiEstimate}
            </div>
            <p className="text-sm text-green-600 dark:text-green-400 mt-xs">
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
      <div className={cn(WidgetClasses.card, "shadow-sm")}>
        <h3 className="text-subheading font-medium mb-sm text-gray-800 dark:text-gray-100">
          Cost Summary
        </h3>

        <div className={WidgetClasses.grid3Cols}>
          {/* Implementation Cost */}
          <div className="p-sm bg-gray-50 dark:bg-gray-700 rounded-lg">
            <div className="text-sm font-medium mb-xs text-gray-700 dark:text-gray-200">Implementation Cost</div>
            <div className="text-subheading font-bold text-blue-600 dark:text-blue-400">
              {formatCurrency(costDetails.totalCapex)}
            </div>
            <div className="text-xs text-gray-600 dark:text-gray-400">
              One-time investment
            </div>
          </div>

          {/* Operational Cost */}
          <div className="p-sm bg-gray-50 dark:bg-gray-700 rounded-lg">
            <div className="text-sm font-medium mb-xs text-gray-700 dark:text-gray-200">Operational Cost</div>
            <div className="text-subheading font-bold text-green-600 dark:text-green-400">
              {formatCurrency(costDetails.totalOpex)}
            </div>
            <div className="text-xs text-gray-600 dark:text-gray-400">
              Annual expense
            </div>
          </div>

          {/* Total Cost */}
          <div className="p-sm bg-gray-50 dark:bg-gray-700 rounded-lg">
            <div className="text-sm font-medium mb-xs text-gray-700 dark:text-gray-200">
              Total First-Year Cost
            </div>
            <div className="text-subheading font-bold text-purple-600 dark:text-purple-400">
              {formatCurrency(costDetails.totalCost)}
            </div>
            <div className="text-xs text-gray-600 dark:text-gray-400">
              Combined implementation and operational costs
            </div>
          </div>
        </div>
      </div>

      {/* Business Enablement */}
      <div className={cn(WidgetClasses.card, "shadow-sm")}>
        <h3 className="text-subheading font-medium mb-sm text-gray-800 dark:text-gray-100">
          Business Enablement
        </h3>

        <div className="space-y-sm">
          <div className="p-sm bg-gray-50 dark:bg-gray-700 rounded-lg">
            <h4 className="text-sm font-medium mb-sm text-gray-800 dark:text-gray-200">Business Capabilities</h4>
            <ul className="list-disc pl-5 space-y-xs text-sm">
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
