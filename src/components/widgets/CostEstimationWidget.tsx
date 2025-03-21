import React from "react";
import { SecurityLevel } from "../../types/cia";
import {
  calculateSecurityROI,
  calculateTotalSecurityCost,
} from "../../utils/costCalculationUtils";
import WidgetContainer from "../common/WidgetContainer";

/**
 * Props for the Cost Estimation Widget
 */
export interface CostEstimationWidgetProps {
  // CIA security levels
  availabilityLevel: SecurityLevel;
  integrityLevel: SecurityLevel;
  confidentialityLevel: SecurityLevel;

  // Organizational context
  organizationSize?: "small" | "medium" | "large" | "enterprise";
  industry?:
    | "general"
    | "financial"
    | "healthcare"
    | "government"
    | "retail"
    | "technology"
    | "manufacturing";

  // Optional props
  estimatedAnnualLoss?: number;
  showROI?: boolean;
  timeframeYears?: number;
  className?: string;
  testId?: string;
}

/**
 * Format numeric values with proper formatting for security metrics
 *
 * @param value Numeric value to format
 * @param prefix Optional prefix to add (e.g., '$')
 * @param suffix Optional suffix to add (e.g., '%')
 * @returns Formatted string
 */
function formatSecurityMetric(value: number, prefix = "", suffix = ""): string {
  // Format the number with commas for thousands
  const formattedValue = new Intl.NumberFormat().format(value);
  return `${prefix}${formattedValue}${suffix}`;
}

/**
 * Widget for cost estimation of security implementations
 *
 * ## Business Perspective
 *
 * This widget helps organizations understand the financial implications of their security choices.
 * It provides cost estimates for implementing security controls based on selected security levels,
 * which is essential for budget planning and resource allocation. 💰
 *
 * The ROI calculations help justify security investments to business stakeholders by
 * demonstrating the financial benefits of appropriate security controls. 📊
 */
export function CostEstimationWidget({
  availabilityLevel,
  integrityLevel,
  confidentialityLevel,
  organizationSize = "medium",
  industry = "general",
  estimatedAnnualLoss = 1000000, // Default $1M annual loss for ROI calculation
  showROI = true,
  timeframeYears = 3,
  className,
  testId = "cost-estimation-widget",
}: CostEstimationWidgetProps): React.ReactElement {
  // Calculate cost estimates using the utility function
  const costEstimates = React.useMemo(() => {
    return calculateTotalSecurityCost(
      availabilityLevel,
      integrityLevel,
      confidentialityLevel,
      organizationSize,
      industry
    );
  }, [
    availabilityLevel,
    integrityLevel,
    confidentialityLevel,
    organizationSize,
    industry,
  ]);

  // Calculate ROI metrics if enabled
  const roiMetrics = React.useMemo(() => {
    if (!showROI) return null;

    // Calculate risk reduction based on security levels (simplified)
    const securityLevels = {
      None: 0,
      Low: 1,
      Moderate: 2,
      High: 3,
      "Very High": 4,
    };
    const avgLevel =
      (securityLevels[availabilityLevel] +
        securityLevels[integrityLevel] +
        securityLevels[confidentialityLevel]) /
      3;

    // Risk reduction percentage (0-80% scale based on security level)
    const riskReduction = Math.min(80, avgLevel * 20);

    return calculateSecurityROI(
      costEstimates.totalCost,
      riskReduction,
      estimatedAnnualLoss,
      timeframeYears
    );
  }, [
    showROI,
    availabilityLevel,
    integrityLevel,
    confidentialityLevel,
    costEstimates.totalCost,
    estimatedAnnualLoss,
    timeframeYears,
  ]);

  return (
    <WidgetContainer
      title="Security Implementation Cost Estimation"
      className={className}
      testId={testId}
      icon="💰"
    >
      <div className="space-y-6" data-testid={`${testId}-content`}>
        {/* Summary section */}
        <div className="bg-blue-50 dark:bg-blue-900 p-4 rounded-lg">
          <h3 className="text-lg font-medium mb-2">Cost Summary</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                Total Implementation Cost:
              </p>
              <p
                className="text-2xl font-bold"
                data-testid={`${testId}-total-cost`}
              >
                {formatSecurityMetric(costEstimates.totalCost, "$")}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                Annual Operational Cost:
              </p>
              <p
                className="text-2xl font-bold"
                data-testid={`${testId}-annual-opex`}
              >
                {formatSecurityMetric(costEstimates.totalOpex, "$")}
              </p>
            </div>
          </div>
        </div>

        {/* Cost breakdown section */}
        <div>
          <h3 className="text-lg font-medium mb-2">Cost Breakdown</h3>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
              <thead>
                <tr>
                  <th className="px-4 py-2 text-left">Component</th>
                  <th className="px-4 py-2 text-right">Capital Expense</th>
                  <th className="px-4 py-2 text-right">Operational Expense</th>
                  <th className="px-4 py-2 text-right">Total</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                <tr>
                  <td className="px-4 py-2">
                    Availability ({availabilityLevel})
                  </td>
                  <td className="px-4 py-2 text-right">
                    {formatSecurityMetric(
                      costEstimates.availabilityCost.capex,
                      "$"
                    )}
                  </td>
                  <td className="px-4 py-2 text-right">
                    {formatSecurityMetric(
                      costEstimates.availabilityCost.opex,
                      "$"
                    )}
                  </td>
                  <td className="px-4 py-2 text-right">
                    {formatSecurityMetric(
                      costEstimates.availabilityCost.capex +
                        costEstimates.availabilityCost.opex,
                      "$"
                    )}
                  </td>
                </tr>
                <tr>
                  <td className="px-4 py-2">Integrity ({integrityLevel})</td>
                  <td className="px-4 py-2 text-right">
                    {formatSecurityMetric(
                      costEstimates.integrityCost.capex,
                      "$"
                    )}
                  </td>
                  <td className="px-4 py-2 text-right">
                    {formatSecurityMetric(
                      costEstimates.integrityCost.opex,
                      "$"
                    )}
                  </td>
                  <td className="px-4 py-2 text-right">
                    {formatSecurityMetric(
                      costEstimates.integrityCost.capex +
                        costEstimates.integrityCost.opex,
                      "$"
                    )}
                  </td>
                </tr>
                <tr>
                  <td className="px-4 py-2">
                    Confidentiality ({confidentialityLevel})
                  </td>
                  <td className="px-4 py-2 text-right">
                    {formatSecurityMetric(
                      costEstimates.confidentialityCost.capex,
                      "$"
                    )}
                  </td>
                  <td className="px-4 py-2 text-right">
                    {formatSecurityMetric(
                      costEstimates.confidentialityCost.opex,
                      "$"
                    )}
                  </td>
                  <td className="px-4 py-2 text-right">
                    {formatSecurityMetric(
                      costEstimates.confidentialityCost.capex +
                        costEstimates.confidentialityCost.opex,
                      "$"
                    )}
                  </td>
                </tr>
                <tr className="font-medium bg-gray-50 dark:bg-gray-800">
                  <td className="px-4 py-2">Total</td>
                  <td className="px-4 py-2 text-right">
                    {formatSecurityMetric(costEstimates.totalCapex, "$")}
                  </td>
                  <td className="px-4 py-2 text-right">
                    {formatSecurityMetric(costEstimates.totalOpex, "$")}
                  </td>
                  <td className="px-4 py-2 text-right">
                    {formatSecurityMetric(costEstimates.totalCost, "$")}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* ROI section */}
        {showROI && roiMetrics && (
          <div className="mt-6">
            <h3 className="text-lg font-medium mb-2">Return on Investment</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-green-50 dark:bg-green-900 p-4 rounded-lg">
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  ROI ({timeframeYears} years):
                </p>
                <p className="text-2xl font-bold" data-testid={`${testId}-roi`}>
                  {roiMetrics.roiPercentage}
                </p>
              </div>
              <div className="bg-blue-50 dark:bg-blue-900 p-4 rounded-lg">
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  Payback Period:
                </p>
                <p
                  className="text-2xl font-bold"
                  data-testid={`${testId}-payback`}
                >
                  {roiMetrics.paybackPeriodMonths.toFixed(1)} months
                </p>
              </div>
              <div className="bg-purple-50 dark:bg-purple-900 p-4 rounded-lg">
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  Cost Avoidance:
                </p>
                <p
                  className="text-2xl font-bold"
                  data-testid={`${testId}-cost-avoidance`}
                >
                  {formatSecurityMetric(roiMetrics.costAvoidance, "$")}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </WidgetContainer>
  );
}

export default CostEstimationWidget;
