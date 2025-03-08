import React from "react";
import {
  SECURITY_LEVELS,
  COST_ANALYSIS,
  UI_TEXT,
  WIDGET_ICONS,
} from "../../constants/appConstants";
import KeyValuePair from "../common/KeyValuePair";
import ValueDisplay from "../common/ValueDisplay";
import { COST_TEST_IDS } from "../../constants/testIds";

// Define proper TypeScript interfaces
interface CostOption {
  capex: number;
  opex: number;
}

interface CostOptionsMap {
  [level: string]: CostOption;
}

interface CostEstimationWidgetProps {
  totalCapex: number;
  totalOpex: number;
  capexEstimate: string;
  opexEstimate: string;
  isSmallSolution: boolean;
  roi?: string;
  implementationTime?: string;
  testId?: string;
  availabilityLevel?: string;
  integrityLevel?: string;
  confidentialityLevel?: string;
  availabilityOptions?: CostOptionsMap;
  integrityOptions?: CostOptionsMap;
  confidentialityOptions?: CostOptionsMap;
}

const CostEstimationWidget: React.FC<CostEstimationWidgetProps> = ({
  totalCapex,
  totalOpex,
  capexEstimate,
  opexEstimate,
  isSmallSolution,
  roi,
  implementationTime,
  availabilityLevel = SECURITY_LEVELS.NONE,
  integrityLevel = SECURITY_LEVELS.NONE,
  confidentialityLevel = SECURITY_LEVELS.NONE,
  availabilityOptions,
  integrityOptions,
  confidentialityOptions,
}) => {
  const getCostSeverity = (percentage: number): string => {
    if (percentage <= 15) return "low";
    if (percentage <= 40) return "medium";
    if (percentage <= 70) return "high";
    return "very-high";
  };

  const getCapexColorClass = (): string => {
    const severity = getCostSeverity(totalCapex);
    switch (severity) {
      case "low":
        return "bg-green-500";
      case "medium":
        return "bg-blue-500";
      case "high":
        return "bg-yellow-500";
      case "very-high":
        return "bg-red-500";
      default:
        return "bg-blue-500";
    }
  };

  const getOpexColorClass = (): string => {
    const severity = getCostSeverity(totalOpex);
    switch (severity) {
      case "low":
        return "bg-green-500";
      case "medium":
        return "bg-teal-500";
      case "high":
        return "bg-yellow-500";
      case "very-high":
        return "bg-red-500";
      default:
        return "bg-green-500";
    }
  };

  const formatCurrency = (value: string): string => {
    if (!value) return "";
    if (value.startsWith("$")) return value;
    return `$${value}`;
  };

  const getMonthlyOpex = (): string => {
    if (/^\$\d+([,.]\d+)?$/.test(opexEstimate)) {
      const numericValue = parseFloat(opexEstimate.replace(/[$,]/g, ""));
      if (!isNaN(numericValue)) {
        const monthlyValue = numericValue / 12;
        return `$${monthlyValue.toLocaleString("en-US", {
          minimumFractionDigits: 0,
          maximumFractionDigits: 0,
        })}/month`;
      }
    }
    return "";
  };

  const getTotalCost = (): string => {
    if (
      /^\$\d+([,.]\d+)?$/.test(capexEstimate) &&
      /^\$\d+([,.]\d+)?$/.test(opexEstimate)
    ) {
      const capexValue = parseFloat(capexEstimate.replace(/[$,]/g, ""));
      const opexValue = parseFloat(opexEstimate.replace(/[$,]/g, ""));

      if (!isNaN(capexValue) && !isNaN(opexValue)) {
        const totalCost = capexValue + 3 * opexValue;
        return `$${totalCost.toLocaleString("en-US", {
          minimumFractionDigits: 0,
          maximumFractionDigits: 0,
        })}`;
      }
    }
    return "Varies";
  };

  // Add cost icon indicators based on severity
  const getCostIcon = (percentage: number): string => {
    if (percentage <= 15) return "🟢"; // Low cost
    if (percentage <= 40) return "🟡"; // Medium cost
    if (percentage <= 70) return "🟠"; // High cost
    return "🔴"; // Very high cost
  };

  const monthlyOpex = getMonthlyOpex();
  const totalCost = getTotalCost();

  return (
    <div
      className="space-y-4"
      data-testid={COST_TEST_IDS.COST_ESTIMATION_CONTENT}
    >
      {/* Heading */}
      <div className="flex justify-between items-center">
        <h3
          className="text-lg font-medium text-gray-700 dark:text-gray-300"
          data-testid={COST_TEST_IDS.ESTIMATED_COST_HEADING}
        >
          {UI_TEXT.LABELS.ESTIMATED_COST}
        </h3>

        {implementationTime && (
          <KeyValuePair
            label="Est. Implementation Time"
            value={implementationTime}
            testId={COST_TEST_IDS.IMPLEMENTATION_TIME}
          />
        )}
      </div>

      {/* CAPEX Section */}
      <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700">
        <div className="flex justify-between mb-2">
          <div className="flex items-center">
            <span
              className="text-lg text-gray-700 dark:text-gray-300 mr-2"
              data-testid={COST_TEST_IDS.CAPEX_SEVERITY_ICON}
            >
              {getCostIcon(totalCapex)}
            </span>
            <KeyValuePair
              label={UI_TEXT.LABELS.CAPEX}
              value={
                <ValueDisplay
                  value={`${formatCurrency(capexEstimate)}`}
                  variant="primary"
                  size="lg"
                  testId={COST_TEST_IDS.CAPEX_ESTIMATE_VALUE} // Ensure consistent testId with unique "-value" suffix
                />
              }
              testId={COST_TEST_IDS.CAPEX_SECTION}
            />
          </div>
        </div>

        {/* Progress bar for CAPEX % */}
        <div className="mt-2">
          <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 mb-1">
            <span>{UI_TEXT.BUDGET.IT_BUDGET_CAPEX}</span>
          </div>
          <div className="w-full bg-gray-200 dark:bg-gray-700 h-2 rounded-full">
            <div
              className={`h-2 rounded-full ${getCapexColorClass()}`}
              style={{ width: `${Math.min(totalCapex, 100)}%` }}
              data-testid={COST_TEST_IDS.CAPEX_PROGRESS_BAR}
            ></div>
          </div>
          <span
            className="font-bold"
            data-testid={COST_TEST_IDS.CAPEX_PERCENTAGE}
          >
            {totalCapex}%
          </span>
        </div>
      </div>

      {/* OPEX Section */}
      <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700">
        <div className="flex justify-between mb-2">
          <div className="flex items-center">
            <span
              className="text-lg text-gray-700 dark:text-gray-300 mr-2"
              data-testid={COST_TEST_IDS.OPEX_SEVERITY_ICON}
            >
              {getCostIcon(totalOpex)}
            </span>
            <div>
              <KeyValuePair
                label={UI_TEXT.LABELS.OPEX}
                value={
                  <ValueDisplay
                    value={`${formatCurrency(opexEstimate)}`}
                    variant="primary"
                    size="lg"
                    testId={COST_TEST_IDS.OPEX_ESTIMATE_VALUE} // Ensure consistent testId with unique "-value" suffix
                  />
                }
                testId={COST_TEST_IDS.OPEX_SECTION}
              />
              {monthlyOpex && (
                <span
                  className="text-xs text-gray-500 dark:text-gray-400"
                  data-testid={COST_TEST_IDS.MONTHLY_OPEX}
                >
                  {monthlyOpex}
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Progress bar for OPEX % */}
        <div className="mt-2">
          <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 mb-1">
            <span>{UI_TEXT.BUDGET.IT_BUDGET_OPEX}</span>
          </div>
          <div className="w-full bg-gray-200 dark:bg-gray-700 h-2 rounded-full">
            <div
              className={`h-2 rounded-full ${getOpexColorClass()}`}
              style={{ width: `${Math.min(totalOpex, 100)}%` }}
              data-testid={COST_TEST_IDS.OPEX_PROGRESS_BAR}
            ></div>
          </div>
          <span
            className="font-bold"
            data-testid={COST_TEST_IDS.OPEX_PERCENTAGE}
          >
            {totalOpex}%
          </span>
        </div>
      </div>

      {/* Total Cost and ROI Section */}
      <div
        className="bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700"
        data-testid={COST_TEST_IDS.TOTAL_COST_SUMMARY}
      >
        <KeyValuePair
          label="3-Year Total Cost"
          value={totalCost}
          testId={COST_TEST_IDS.THREE_YEAR_TOTAL}
        />

        {roi && (
          <div className="mt-2 border-t pt-2 border-gray-100 dark:border-gray-700">
            <KeyValuePair
              label="Estimated ROI"
              value={
                <ValueDisplay
                  value={roi}
                  variant="success"
                  testId={COST_TEST_IDS.ROI_ESTIMATE}
                />
              }
              testId={COST_TEST_IDS.ROI_SECTION}
            />
          </div>
        )}
      </div>

      {/* Cost Analysis Section */}
      <div
        className="bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700"
        data-testid={COST_TEST_IDS.COST_ANALYSIS_SECTION}
      >
        <h3
          className="text-lg font-medium text-gray-700 dark:text-gray-300 mb-2"
          data-testid={COST_TEST_IDS.COST_ANALYSIS_HEADING}
        >
          {UI_TEXT.LABELS.COST_ANALYSIS}
        </h3>
        <p
          className="text-gray-600 dark:text-gray-400 text-sm"
          data-testid={COST_TEST_IDS.COST_ANALYSIS_TEXT}
        >
          {isSmallSolution
            ? COST_ANALYSIS.SMALL_SOLUTION
            : COST_ANALYSIS.LARGE_SOLUTION}
        </p>
      </div>
    </div>
  );
};

export default CostEstimationWidget;
