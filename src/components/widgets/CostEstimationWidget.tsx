import React, { useMemo } from "react";
import { SecurityLevel } from "../../types/cia";
import { COST_TEST_IDS } from "../../constants/testIds";
import { DISPLAY_FORMAT } from "../../constants/appConstants";
import ciaContentService from "../../services/ciaContentService";
import WidgetContainer from "../common/WidgetContainer";
import { WIDGET_ICONS, WIDGET_TITLES } from "../../constants/coreConstants";

/**
 * Props for the CostEstimationWidget component
 *
 * @interface CostEstimationWidgetProps
 * @property {SecurityLevel} availabilityLevel - The selected availability security level
 * @property {SecurityLevel} integrityLevel - The selected integrity security level
 * @property {SecurityLevel} confidentialityLevel - The selected confidentiality security level
 * @property {string} [className] - Optional CSS class to apply to the widget
 * @property {string} [testId] - Optional test ID for testing purposes
 */
export interface CostEstimationWidgetProps {
  availabilityLevel: SecurityLevel;
  integrityLevel: SecurityLevel;
  confidentialityLevel: SecurityLevel;
  className?: string;
  testId?: string;
}

/**
 * CostEstimationWidget displays estimated implementation costs based on the selected
 * CIA security levels. It uses ciaContentService to calculate implementation costs
 * and provides a breakdown of CAPEX and OPEX expenses.
 *
 * @component
 * @example
 * ```tsx
 * <CostEstimationWidget
 *   availabilityLevel="High"
 *   integrityLevel="Moderate"
 *   confidentialityLevel="High"
 * />
 * ```
 */
const CostEstimationWidget: React.FC<CostEstimationWidgetProps> = ({
  availabilityLevel,
  integrityLevel,
  confidentialityLevel,
  className = "",
  testId = COST_TEST_IDS.COST_ESTIMATION_WIDGET,
}) => {
  // Use ciaContentService to get security metrics
  const metrics = useMemo(
    () =>
      ciaContentService.getSecurityMetrics(
        availabilityLevel,
        integrityLevel,
        confidentialityLevel
      ),
    [availabilityLevel, integrityLevel, confidentialityLevel]
  );

  // Use calculated metrics for display
  const {
    totalCapex,
    totalOpex,
    capexEstimate,
    opexEstimate,
    isSmallSolution,
    roi,
  } = metrics;

  // Format the estimates for better display
  const formattedCapexEstimate = capexEstimate.startsWith("$")
    ? capexEstimate
    : `$${parseInt(capexEstimate).toLocaleString()}`;

  const formattedOpexEstimate = opexEstimate.includes("/year")
    ? opexEstimate
    : `$${parseInt(opexEstimate).toLocaleString()}/year`;

  // Calculate percentage of total for progress bars
  const capexPercentage = Math.min(Math.round((totalCapex / 180) * 100), 100);
  const opexPercentage = Math.min(Math.round((totalOpex / 120) * 100), 100);

  // Calculate three-year total cost
  const threeYearCost =
    parseFloat(formattedCapexEstimate.replace(/[^0-9.-]+/g, "")) +
    parseFloat(formattedOpexEstimate.replace(/[^0-9.-]+/g, "")) * 3;

  return (
    <WidgetContainer
      title={WIDGET_TITLES.COST_ESTIMATION}
      icon={WIDGET_ICONS.COST_ESTIMATION}
      className={className}
      testId={testId}
    >
      <div
        data-testid={COST_TEST_IDS.COST_ESTIMATION_CONTENT}
        className="space-y-6"
      >
        <div>
          <h3
            className="text-lg font-medium mb-2"
            data-testid={COST_TEST_IDS.ESTIMATED_COST_HEADING}
          >
            Estimated Implementation Cost
          </h3>

          {/* CAPEX Section */}
          <div className="mb-4" data-testid={COST_TEST_IDS.CAPEX_SECTION}>
            <div className="flex justify-between items-center mb-1">
              <div>
                <span className="text-gray-600 dark:text-gray-400 mr-1">
                  CAPEX:
                </span>
                <span
                  className="font-semibold"
                  data-testid={COST_TEST_IDS.CAPEX_ESTIMATE_VALUE}
                >
                  {formattedCapexEstimate}
                </span>
              </div>
              <span
                className="text-sm text-gray-500 dark:text-gray-400"
                data-testid={COST_TEST_IDS.CAPEX_PERCENTAGE}
              >
                {capexPercentage}%
              </span>
            </div>
            <div
              className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700"
              data-testid={COST_TEST_IDS.CAPEX_PROGRESS_BAR}
            >
              <div
                className="bg-blue-600 h-2.5 rounded-full"
                style={{ width: `${capexPercentage}%` }}
              ></div>
            </div>
          </div>

          {/* OPEX Section */}
          <div className="mb-4" data-testid={COST_TEST_IDS.OPEX_SECTION}>
            <div className="flex justify-between items-center mb-1">
              <div>
                <span className="text-gray-600 dark:text-gray-400 mr-1">
                  OPEX:
                </span>
                <span
                  className="font-semibold"
                  data-testid={COST_TEST_IDS.OPEX_ESTIMATE_VALUE}
                >
                  {formattedOpexEstimate}
                </span>
              </div>
              <span
                className="text-sm text-gray-500 dark:text-gray-400"
                data-testid={COST_TEST_IDS.OPEX_PERCENTAGE}
              >
                {opexPercentage}%
              </span>
            </div>
            <div
              className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700"
              data-testid={COST_TEST_IDS.OPEX_PROGRESS_BAR}
            >
              <div
                className="bg-green-600 h-2.5 rounded-full"
                style={{ width: `${opexPercentage}%` }}
              ></div>
            </div>
          </div>

          {/* Total Cost Summary */}
          <div
            className="bg-gray-50 dark:bg-gray-800 p-3 rounded-lg mt-3"
            data-testid={COST_TEST_IDS.TOTAL_COST_SUMMARY}
          >
            <div className="flex justify-between items-center mb-1">
              <span className="text-gray-700 dark:text-gray-300">
                Total Cost (3 years):
              </span>
              <span
                className="font-bold text-gray-900 dark:text-white"
                data-testid={COST_TEST_IDS.THREE_YEAR_TOTAL}
              >
                ${threeYearCost.toLocaleString()}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-700 dark:text-gray-300">
                Estimated ROI:
              </span>
              <span
                className="font-bold text-green-600 dark:text-green-400"
                data-testid={COST_TEST_IDS.ROI_ESTIMATE}
              >
                {roi}
              </span>
            </div>
          </div>
        </div>

        {/* Cost Analysis */}
        <div
          className="bg-blue-50 dark:bg-blue-900 dark:bg-opacity-20 p-4 rounded-lg"
          data-testid={COST_TEST_IDS.COST_ANALYSIS_SECTION}
        >
          <h4
            className="text-md font-medium text-blue-800 dark:text-blue-300 mb-2"
            data-testid={COST_TEST_IDS.COST_ANALYSIS_HEADING}
          >
            Cost Analysis
          </h4>
          <p
            className="text-sm text-blue-700 dark:text-blue-400"
            data-testid={COST_TEST_IDS.COST_ANALYSIS_TEXT}
          >
            {isSmallSolution
              ? "Basic security implementation with minimal investment. Suitable for small businesses or non-critical systems."
              : "Comprehensive security solution requiring significant investment. Recommended for critical systems or regulated industries."}
          </p>
        </div>
      </div>
    </WidgetContainer>
  );
};

export default CostEstimationWidget;
