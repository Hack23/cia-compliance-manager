import React, { useMemo } from "react";
import { SecurityLevel } from "../../types/cia";
import { COST_TEST_IDS } from "../../constants/testIds";
import { DISPLAY_FORMAT, COST_ANALYSIS } from "../../constants/appConstants";
import ciaContentService from "../../services/ciaContentService";
import WidgetContainer from "../common/WidgetContainer";
import KeyValuePair from "../common/KeyValuePair";
import StatusBadge from "../common/StatusBadge";

/**
 * Props for the CostEstimationWidget component
 */
export interface CostEstimationWidgetProps {
  availabilityLevel: SecurityLevel;
  integrityLevel: SecurityLevel;
  confidentialityLevel: SecurityLevel;
  className?: string;
  testId?: string;
}

// Define a proper interface for security metrics
interface SecurityMetricsType {
  totalCapex: number;
  totalOpex: number;
  capexEstimate: string;
  opexEstimate: string;
  isSmallSolution: boolean;
  roi: string;
  implementationTime?: string; // Make this optional
}

/**
 * CostEstimationWidget displays cost estimates for implementing security measures
 * based on the selected CIA levels.
 */
const CostEstimationWidget: React.FC<CostEstimationWidgetProps> = ({
  availabilityLevel,
  integrityLevel,
  confidentialityLevel,
  className = "",
  testId = COST_TEST_IDS.COST_ESTIMATION_WIDGET,
}) => {
  // Get security metrics from ciaContentService
  const securityMetrics = useMemo<SecurityMetricsType>(
    () =>
      ciaContentService.getSecurityMetrics(
        availabilityLevel,
        integrityLevel,
        confidentialityLevel
      ) as SecurityMetricsType, // Cast to our interface
    [availabilityLevel, integrityLevel, confidentialityLevel]
  );

  // Calculate 3-year total cost (CAPEX + 3 years of OPEX)
  const threeYearTotal = useMemo(() => {
    const capex = parseInt(
      securityMetrics.capexEstimate.replace(/[^0-9]/g, "")
    );
    const opex = parseInt(securityMetrics.opexEstimate.replace(/[^0-9]/g, ""));
    return `$${(capex + opex * 3).toLocaleString()}`;
  }, [securityMetrics.capexEstimate, securityMetrics.opexEstimate]);

  const formatCurrency = (value: string) => {
    // Add commas to the number for better readability
    return value.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  return (
    <WidgetContainer
      title="Estimated Implementation Cost"
      icon="💰"
      className={className}
      testId={testId}
    >
      <div className="space-y-6">
        {/* Implementation Time */}
        {securityMetrics.implementationTime && (
          <div className="mb-4">
            <KeyValuePair
              label="Estimated Implementation Time"
              value={securityMetrics.implementationTime}
              valueClassName="text-blue-600 dark:text-blue-400 font-bold text-base"
              testId={COST_TEST_IDS.IMPLEMENTATION_TIME}
            />
          </div>
        )}

        {/* CAPEX Section */}
        <div className="mb-5" data-testid={COST_TEST_IDS.CAPEX_SECTION}>
          <div className="flex justify-between items-center mb-2">
            <h4 className="text-md font-medium flex items-center">
              <span
                className="mr-2"
                data-testid={COST_TEST_IDS.CAPEX_SEVERITY_ICON}
              >
                {securityMetrics.totalCapex > 50 ? "⚠️" : "💵"}
              </span>
              Capital Expenditure
            </h4>
            <div
              className="text-lg font-bold text-blue-600 dark:text-blue-400"
              data-testid={COST_TEST_IDS.CAPEX_ESTIMATE_VALUE}
            >
              {formatCurrency(securityMetrics.capexEstimate)}
            </div>
          </div>

          <div className="w-full bg-gray-200 rounded-full h-2 dark:bg-gray-700">
            <div
              className="bg-blue-600 h-2 rounded-full dark:bg-blue-500"
              style={{ width: `${Math.min(securityMetrics.totalCapex, 100)}%` }}
              data-testid={COST_TEST_IDS.CAPEX_PROGRESS_BAR}
            ></div>
          </div>

          <div
            className="text-right text-xs text-gray-500 mt-1 dark:text-gray-400"
            data-testid={COST_TEST_IDS.CAPEX_PERCENTAGE}
          >
            {securityMetrics.totalCapex}% of IT budget
          </div>
        </div>

        {/* OPEX Section */}
        <div className="mb-5" data-testid={COST_TEST_IDS.OPEX_SECTION}>
          <div className="flex justify-between items-center mb-2">
            <h4 className="text-md font-medium flex items-center">
              <span
                className="mr-2"
                data-testid={COST_TEST_IDS.OPEX_SEVERITY_ICON}
              >
                {securityMetrics.totalOpex > 50 ? "⚠️" : "💵"}
              </span>
              Operational Expenditure
            </h4>
            <div className="flex flex-col items-end">
              <div
                className="text-lg font-bold text-green-600 dark:text-green-400"
                data-testid={COST_TEST_IDS.OPEX_ESTIMATE_VALUE}
              >
                {formatCurrency(securityMetrics.opexEstimate)}
              </div>
              <div
                className="text-xs text-gray-500 dark:text-gray-400"
                data-testid={COST_TEST_IDS.MONTHLY_OPEX}
              >
                per year
              </div>
            </div>
          </div>

          <div className="w-full bg-gray-200 rounded-full h-2 dark:bg-gray-700">
            <div
              className="bg-green-600 h-2 rounded-full dark:bg-green-500"
              style={{ width: `${Math.min(securityMetrics.totalOpex, 100)}%` }}
              data-testid={COST_TEST_IDS.OPEX_PROGRESS_BAR}
            ></div>
          </div>

          <div
            className="text-right text-xs text-gray-500 mt-1 dark:text-gray-400"
            data-testid={COST_TEST_IDS.OPEX_PERCENTAGE}
          >
            {securityMetrics.totalOpex}% of IT budget
          </div>
        </div>

        {/* Total Cost Summary */}
        <div
          className="bg-gray-50 p-4 rounded-lg dark:bg-gray-800 mb-5"
          data-testid={COST_TEST_IDS.TOTAL_COST_SUMMARY}
        >
          <div className="flex justify-between items-center">
            <span className="text-gray-600 dark:text-gray-300">
              Total CAPEX:
            </span>
            <span
              className="font-bold text-gray-800 dark:text-gray-200"
              data-testid={COST_TEST_IDS.CAPEX_VALUE}
            >
              {formatCurrency(securityMetrics.capexEstimate)}
            </span>
          </div>
          <div className="flex justify-between items-center mt-1">
            <span className="text-gray-600 dark:text-gray-300">
              Annual OPEX:
            </span>
            <span
              className="font-bold text-gray-800 dark:text-gray-200"
              data-testid={COST_TEST_IDS.OPEX_VALUE}
            >
              {formatCurrency(securityMetrics.opexEstimate)}
            </span>
          </div>
          <div className="border-t border-gray-200 dark:border-gray-700 mt-2 pt-2">
            <div className="flex justify-between items-center">
              <span className="text-gray-600 dark:text-gray-300">
                3-Year Total Cost:
              </span>
              <span
                className="font-bold text-gray-800 dark:text-gray-200"
                data-testid={COST_TEST_IDS.THREE_YEAR_TOTAL}
              >
                {threeYearTotal}
              </span>
            </div>
          </div>
        </div>

        {/* Cost Analysis */}
        <div data-testid={COST_TEST_IDS.COST_ANALYSIS_SECTION}>
          <h4
            className="text-md font-medium mb-2"
            data-testid={COST_TEST_IDS.COST_ANALYSIS_HEADING}
          >
            Cost Analysis
          </h4>
          <p
            className="text-gray-600 dark:text-gray-300"
            data-testid={COST_TEST_IDS.COST_ANALYSIS_TEXT}
          >
            {securityMetrics.isSmallSolution
              ? COST_ANALYSIS.SMALL_SOLUTION
              : COST_ANALYSIS.LARGE_SOLUTION}
          </p>
        </div>

        {/* ROI Section */}
        {securityMetrics.roi && (
          <div
            className="bg-blue-50 dark:bg-blue-900 dark:bg-opacity-20 p-4 rounded-lg"
            data-testid={COST_TEST_IDS.ROI_SECTION}
          >
            <h4 className="text-md font-medium mb-2 flex items-center">
              <span className="mr-2">📈</span>
              Return on Investment
            </h4>
            <div className="flex justify-between items-center">
              <span className="text-gray-700 dark:text-gray-300">
                Estimated ROI:
              </span>
              <span
                className="font-bold text-green-600 dark:text-green-400"
                data-testid={COST_TEST_IDS.ROI_ESTIMATE}
              >
                {securityMetrics.roi}
              </span>
            </div>
          </div>
        )}
      </div>
    </WidgetContainer>
  );
};

export default CostEstimationWidget;
