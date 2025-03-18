import React, { useMemo } from "react";
import { SecurityLevel } from "../../types/cia";
import { getSecurityLevelValue } from "../../utils/securityLevelUtils";
import StatusBadge from "../common/StatusBadge";
import WidgetActions, { WidgetActionButton } from "../common/WidgetActions";
import WidgetContainer from "../common/WidgetContainer";

/**
 * Props for CostEstimationWidget
 */
export interface CostEstimationWidgetProps {
  availabilityLevel: SecurityLevel;
  integrityLevel: SecurityLevel;
  confidentialityLevel: SecurityLevel;
  className?: string;
  testId?: string;
}

/**
 * Widget that displays cost estimations for implementing security measures
 *
 * ## Business Perspective
 *
 * This widget provides financial impact analysis for implementing security controls,
 * helping stakeholders understand the investment required to achieve the desired
 * security levels. The estimation includes both capital and operational expenses,
 * allowing for budget planning and ROI calculations. 💰
 *
 * @param props - Component properties
 * @returns The rendered component
 */
const CostEstimationWidget: React.FC<CostEstimationWidgetProps> = ({
  availabilityLevel,
  integrityLevel,
  confidentialityLevel,
  className = "",
  testId = "cost-estimation-widget",
}) => {
  // Get numeric values for security levels
  const availabilityValue = getSecurityLevelValue(availabilityLevel);
  const integrityValue = getSecurityLevelValue(integrityLevel);
  const confidentialityValue = getSecurityLevelValue(confidentialityLevel);

  // Calculate cost estimations
  const costEstimates = useMemo(() => {
    // Base CAPEX (Capital Expenditure) cost per security level
    const baseCAPEX = 50000; // $50,000 per level
    const baseOPEX = 15000; // $15,000 per level annually

    // Calculate weighted costs
    const availabilityCAPEX = baseCAPEX * (availabilityValue + 1) * 0.8;
    const integrityCAPEX = baseCAPEX * (integrityValue + 1) * 1.0;
    const confidentialityCAPEX = baseCAPEX * (confidentialityValue + 1) * 1.2;

    const availabilityOPEX = baseOPEX * (availabilityValue + 1) * 0.8;
    const integrityOPEX = baseOPEX * (integrityValue + 1) * 1.0;
    const confidentialityOPEX = baseOPEX * (confidentialityValue + 1) * 1.2;

    // Total costs
    const totalCAPEX =
      availabilityCAPEX + integrityCAPEX + confidentialityCAPEX;
    const totalOPEX = availabilityOPEX + integrityOPEX + confidentialityOPEX;

    return {
      availability: {
        capex: availabilityCAPEX,
        opex: availabilityOPEX,
      },
      integrity: {
        capex: integrityCAPEX,
        opex: integrityOPEX,
      },
      confidentiality: {
        capex: confidentialityCAPEX,
        opex: confidentialityOPEX,
      },
      total: {
        capex: totalCAPEX,
        opex: totalOPEX,
        annual: totalOPEX + totalCAPEX * 0.2, // Annual cost including CAPEX amortization
      },
    };
  }, [availabilityValue, integrityValue, confidentialityValue]);

  // Format currency values
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  // Calculate ROI metrics
  const roi = useMemo(() => {
    // Calculate risk reduction value
    const avgSecurityValue =
      (availabilityValue + integrityValue + confidentialityValue) / 3;
    const riskReductionPercent = avgSecurityValue * 25;

    // Estimate potential breach cost saved
    const potentialBreachCost = 500000;
    const breachCostSaved = (potentialBreachCost * riskReductionPercent) / 100;

    // Calculate ROI percentage
    const totalAnnualCost = costEstimates.total.annual;
    const roiPercent = (breachCostSaved / totalAnnualCost) * 100;

    return {
      percentage: roiPercent.toFixed(0),
      riskReduction: riskReductionPercent.toFixed(0),
      breachCostSaved: formatCurrency(breachCostSaved),
    };
  }, [
    availabilityValue,
    integrityValue,
    confidentialityValue,
    costEstimates.total.annual,
  ]);

  // Create action buttons for the widget header
  const actionsElement = (
    <WidgetActions>
      <WidgetActionButton
        onClick={() => console.log("Export cost estimation")}
        icon={<span>📋</span>}
        ariaLabel="Export cost estimation"
        testId="export-cost-button"
      />
      <WidgetActionButton
        onClick={() => window.print()}
        icon={<span>🖨️</span>}
        ariaLabel="Print cost estimation"
        testId="print-cost-button"
      />
    </WidgetActions>
  );

  return (
    <WidgetContainer
      title="Cost Estimation"
      icon="💰"
      className={className}
      testId={testId}
      actions={actionsElement}
    >
      <div className="max-h-[550px] overflow-y-auto pr-1">
        <div className="space-y-4 p-2">
          {/* Total Implementation Costs */}
          <div className="p-4 bg-blue-50 dark:bg-blue-900 dark:bg-opacity-20 rounded-lg">
            <h3 className="text-lg font-medium mb-3">
              Total Implementation Costs
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-3 bg-white dark:bg-gray-800 rounded-lg text-center">
                <div className="text-sm text-gray-500 dark:text-gray-400 mb-1">
                  Initial Investment
                </div>
                <div className="text-xl font-bold text-blue-600 dark:text-blue-400">
                  {formatCurrency(costEstimates.total.capex)}
                </div>
              </div>
              <div className="p-3 bg-white dark:bg-gray-800 rounded-lg text-center">
                <div className="text-sm text-gray-500 dark:text-gray-400 mb-1">
                  Annual Operations
                </div>
                <div className="text-xl font-bold text-blue-600 dark:text-blue-400">
                  {formatCurrency(costEstimates.total.opex)}
                </div>
              </div>
              <div className="p-3 bg-white dark:bg-gray-800 rounded-lg text-center">
                <div className="text-sm text-gray-500 dark:text-gray-400 mb-1">
                  Total Annual Cost
                </div>
                <div className="text-xl font-bold text-blue-600 dark:text-blue-400">
                  {formatCurrency(costEstimates.total.annual)}
                </div>
              </div>
            </div>
          </div>

          {/* Component Costs */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Availability Cost */}
            <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg border-l-4 border-blue-500">
              <div className="flex justify-between items-center mb-2">
                <h4 className="font-medium flex items-center">
                  <span className="mr-2">⏱️</span>Availability
                </h4>
                <StatusBadge status="info">{availabilityLevel}</StatusBadge>
              </div>
              <div className="grid grid-cols-2 gap-2 text-center">
                <div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">
                    CAPEX
                  </div>
                  <div className="text-sm font-bold text-blue-600 dark:text-blue-400">
                    {formatCurrency(costEstimates.availability.capex)}
                  </div>
                </div>
                <div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">
                    OPEX
                  </div>
                  <div className="text-sm font-bold text-blue-600 dark:text-blue-400">
                    {formatCurrency(costEstimates.availability.opex)}
                  </div>
                </div>
              </div>
            </div>

            {/* Integrity Cost */}
            <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg border-l-4 border-green-500">
              <div className="flex justify-between items-center mb-2">
                <h4 className="font-medium flex items-center">
                  <span className="mr-2">✓</span>Integrity
                </h4>
                <StatusBadge status="success">{integrityLevel}</StatusBadge>
              </div>
              <div className="grid grid-cols-2 gap-2 text-center">
                <div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">
                    CAPEX
                  </div>
                  <div className="text-sm font-bold text-green-600 dark:text-green-400">
                    {formatCurrency(costEstimates.integrity.capex)}
                  </div>
                </div>
                <div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">
                    OPEX
                  </div>
                  <div className="text-sm font-bold text-green-600 dark:text-green-400">
                    {formatCurrency(costEstimates.integrity.opex)}
                  </div>
                </div>
              </div>
            </div>

            {/* Confidentiality Cost */}
            <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg border-l-4 border-purple-500">
              <div className="flex justify-between items-center mb-2">
                <h4 className="font-medium flex items-center">
                  <span className="mr-2">🔒</span>Confidentiality
                </h4>
                <StatusBadge status="purple">
                  {confidentialityLevel}
                </StatusBadge>
              </div>
              <div className="grid grid-cols-2 gap-2 text-center">
                <div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">
                    CAPEX
                  </div>
                  <div className="text-sm font-bold text-purple-600 dark:text-purple-400">
                    {formatCurrency(costEstimates.confidentiality.capex)}
                  </div>
                </div>
                <div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">
                    OPEX
                  </div>
                  <div className="text-sm font-bold text-purple-600 dark:text-purple-400">
                    {formatCurrency(costEstimates.confidentiality.opex)}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* ROI Analysis */}
          <div className="p-4 bg-green-50 dark:bg-green-900 dark:bg-opacity-20 rounded-lg">
            <h3 className="text-lg font-medium mb-3">ROI Analysis</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-3 bg-white dark:bg-gray-800 rounded-lg text-center shadow-sm">
                <div className="text-sm text-gray-500 dark:text-gray-400 mb-1">
                  Estimated ROI
                </div>
                <div className="text-xl font-bold text-green-600 dark:text-green-400">
                  {roi.percentage}%
                </div>
              </div>
              <div className="p-3 bg-white dark:bg-gray-800 rounded-lg text-center shadow-sm">
                <div className="text-sm text-gray-500 dark:text-gray-400 mb-1">
                  Risk Reduction
                </div>
                <div className="text-xl font-bold text-green-600 dark:text-green-400">
                  {roi.riskReduction}%
                </div>
              </div>
              <div className="p-3 bg-white dark:bg-gray-800 rounded-lg text-center shadow-sm">
                <div className="text-sm text-gray-500 dark:text-gray-400 mb-1">
                  Estimated Savings
                </div>
                <div className="text-xl font-bold text-green-600 dark:text-green-400">
                  {roi.breachCostSaved}
                </div>
              </div>
            </div>
          </div>

          {/* Implementation Timeline */}
          <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg border shadow-sm">
            <h3 className="text-lg font-medium mb-3">
              Implementation Timeline
            </h3>
            <div className="space-y-3">
              <div className="flex items-center">
                <div className="w-1/4 text-sm font-medium">Planning</div>
                <div className="w-3/4 bg-gray-200 dark:bg-gray-700 rounded-full h-4">
                  <div
                    className="bg-blue-500 h-4 rounded-full"
                    style={{ width: "15%" }}
                  ></div>
                </div>
                <div className="ml-2 text-sm">2-4 weeks</div>
              </div>
              <div className="flex items-center">
                <div className="w-1/4 text-sm font-medium">Development</div>
                <div className="w-3/4 bg-gray-200 dark:bg-gray-700 rounded-full h-4">
                  <div
                    className="bg-blue-500 h-4 rounded-full"
                    style={{ width: "40%" }}
                  ></div>
                </div>
                <div className="ml-2 text-sm">2-3 months</div>
              </div>
              <div className="flex items-center">
                <div className="w-1/4 text-sm font-medium">Testing</div>
                <div className="w-3/4 bg-gray-200 dark:bg-gray-700 rounded-full h-4">
                  <div
                    className="bg-blue-500 h-4 rounded-full"
                    style={{ width: "20%" }}
                  ></div>
                </div>
                <div className="ml-2 text-sm">3-4 weeks</div>
              </div>
              <div className="flex items-center">
                <div className="w-1/4 text-sm font-medium">Deployment</div>
                <div className="w-3/4 bg-gray-200 dark:bg-gray-700 rounded-full h-4">
                  <div
                    className="bg-blue-500 h-4 rounded-full"
                    style={{ width: "25%" }}
                  ></div>
                </div>
                <div className="ml-2 text-sm">1-2 weeks</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </WidgetContainer>
  );
};

export default CostEstimationWidget;
