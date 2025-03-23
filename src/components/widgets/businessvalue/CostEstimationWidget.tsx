import React, { useMemo } from "react";
import { WIDGET_ICONS, WIDGET_TITLES } from "../../../constants/appConstants";
import { COST_TEST_IDS } from "../../../constants/testIds";
import { useCIAOptions } from "../../../hooks/useCIAOptions";
import { SecurityLevel } from "../../../types/cia";
import {
  calculateOverallSecurityLevel,
  getSecurityLevelValue,
} from "../../../utils/securityLevelUtils";
import WidgetContainer from "../../common/WidgetContainer";

/**
 * Props for CostEstimationWidget component
 */
interface CostEstimationWidgetProps {
  /**
   * Selected availability level
   */
  availabilityLevel: SecurityLevel;

  /**
   * Selected integrity level
   */
  integrityLevel: SecurityLevel;

  /**
   * Selected confidentiality level
   */
  confidentialityLevel: SecurityLevel;

  /**
   * Optional CSS class name
   */
  className?: string;

  /**
   * Optional test ID for automated testing
   */
  testId?: string;
}

/**
 * Cost Estimation Widget provides financial calculations for security implementations
 *
 * ## Business Perspective
 *
 * This widget helps CFOs and security executives understand the financial
 * implications of security controls, providing cost estimations for both
 * implementation (CAPEX) and ongoing maintenance (OPEX). It supports
 * budgeting, ROI calculations, and financial planning for security projects. 💰
 */
const CostEstimationWidget: React.FC<CostEstimationWidgetProps> = ({
  availabilityLevel,
  integrityLevel,
  confidentialityLevel,
  className = "",
  testId = "widget-cost-estimation",
}) => {
  // Use the CIA options hook to get cost data
  const {
    availabilityOptions,
    integrityOptions,
    confidentialityOptions,
    ROI_ESTIMATES,
  } = useCIAOptions();

  // Calculate overall security level
  const overallSecurityLevel = useMemo(() => {
    return calculateOverallSecurityLevel(
      availabilityLevel,
      integrityLevel,
      confidentialityLevel
    );
  }, [availabilityLevel, integrityLevel, confidentialityLevel]);

  // Calculate CAPEX (capital expenditure) for implementation
  const capexEstimate = useMemo(() => {
    const availCapex = availabilityOptions[availabilityLevel]?.capex || 0;
    const integCapex = integrityOptions[integrityLevel]?.capex || 0;
    const confCapex = confidentialityOptions[confidentialityLevel]?.capex || 0;

    return availCapex + integCapex + confCapex;
  }, [
    availabilityOptions,
    integrityOptions,
    confidentialityOptions,
    availabilityLevel,
    integrityLevel,
    confidentialityLevel,
  ]);

  // Calculate OPEX (operational expenditure) for maintenance
  const opexEstimate = useMemo(() => {
    const availOpex = availabilityOptions[availabilityLevel]?.opex || 0;
    const integOpex = integrityOptions[integrityLevel]?.opex || 0;
    const confOpex = confidentialityOptions[confidentialityLevel]?.opex || 0;

    return availOpex + integOpex + confOpex;
  }, [
    availabilityOptions,
    integrityOptions,
    confidentialityOptions,
    availabilityLevel,
    integrityLevel,
    confidentialityLevel,
  ]);

  // Calculate total cost (implementation + 3 years maintenance)
  const totalCost = useMemo(() => {
    const implementation = capexEstimate;
    const maintenance = opexEstimate * 12 * 3; // Monthly OPEX for 3 years
    return implementation + maintenance;
  }, [capexEstimate, opexEstimate]);

  // Calculate implementation time (in months)
  const implementationTime = useMemo(() => {
    // Base implementation time is 1 month, plus 0.5 months for each security level
    const availTime = getSecurityLevelValue(availabilityLevel) * 0.5;
    const integTime = getSecurityLevelValue(integrityLevel) * 0.5;
    const confTime = getSecurityLevelValue(confidentialityLevel) * 0.5;

    return 1 + availTime + integTime + confTime;
  }, [availabilityLevel, integrityLevel, confidentialityLevel]);

  // Format costs as currency
  const formatCurrency = (amount: number): string => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      maximumFractionDigits: 0,
    }).format(amount * 5000); // Multiply by 5000 to get a realistic estimate
  };

  // Format implementation time
  const formatImplementationTime = (months: number): string => {
    const wholeMonths = Math.floor(months);
    const days = Math.round((months - wholeMonths) * 30);

    if (days === 0) {
      return `${wholeMonths} month${wholeMonths !== 1 ? "s" : ""}`;
    } else {
      return `${wholeMonths} month${
        wholeMonths !== 1 ? "s" : ""
      } and ${days} day${days !== 1 ? "s" : ""}`;
    }
  };

  // Calculate ROI estimate based on security level
  const roiEstimate = useMemo(() => {
    const levelKey = overallSecurityLevel.toUpperCase().replace(" ", "_");
    return ROI_ESTIMATES[levelKey as keyof typeof ROI_ESTIMATES];
  }, [ROI_ESTIMATES, overallSecurityLevel]);

  // Calculate progress percentages for visualization
  const capexPercentage = useMemo(() => {
    // Maximum possible CAPEX is 60 (20 for each component at Very High)
    return Math.min(100, (capexEstimate / 60) * 100);
  }, [capexEstimate]);

  const opexPercentage = useMemo(() => {
    // Maximum possible OPEX is 30 (10 for each component at Very High)
    return Math.min(100, (opexEstimate / 30) * 100);
  }, [opexEstimate]);

  return (
    <WidgetContainer
      title={WIDGET_TITLES.COST_ESTIMATION}
      icon={WIDGET_ICONS.COST_ESTIMATION}
      className={className}
      testId={testId}
    >
      <div className="p-4" data-testid={COST_TEST_IDS.COST_ESTIMATION_CONTENT}>
        {/* Implementation Time */}
        <div className="mb-4 p-3 bg-blue-50 dark:bg-blue-900 dark:bg-opacity-20 rounded-lg">
          <h3 className="text-lg font-medium">Estimated Implementation Time</h3>
          <div className="flex items-center mt-2">
            <span className="text-3xl text-blue-600 dark:text-blue-400 mr-3">
              ⏱️
            </span>
            <div>
              <p
                className="text-xl font-bold text-blue-800 dark:text-blue-300"
                data-testid={COST_TEST_IDS.IMPLEMENTATION_TIME}
              >
                {formatImplementationTime(implementationTime)}
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                From project kickoff to full implementation
              </p>
            </div>
          </div>
        </div>

        {/* CAPEX Section */}
        <div className="mb-6" data-testid={COST_TEST_IDS.CAPEX_SECTION}>
          <h3 className="text-lg font-medium mb-2">
            Implementation Costs (CAPEX)
          </h3>
          <div className="p-3 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
            <div className="flex justify-between items-center mb-2">
              <div className="flex items-center">
                <span
                  className="text-2xl mr-2 text-orange-500"
                  data-testid={COST_TEST_IDS.CAPEX_SEVERITY_ICON}
                >
                  {capexEstimate > 40
                    ? "💰💰💰"
                    : capexEstimate > 20
                    ? "💰💰"
                    : "💰"}
                </span>
                <span className="font-medium">One-time Investment</span>
              </div>
              <span
                className="text-xl font-bold text-orange-600 dark:text-orange-400"
                data-testid={COST_TEST_IDS.CAPEX_ESTIMATE_VALUE}
              >
                {formatCurrency(capexEstimate)}
              </span>
            </div>
            <div className="mt-3">
              <div className="relative pt-1">
                <div className="flex mb-2 items-center justify-between">
                  <div>
                    <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-orange-600 bg-orange-200 dark:text-orange-200 dark:bg-orange-800">
                      Implementation Cost
                    </span>
                  </div>
                  <div className="text-right">
                    <span
                      className="text-xs font-semibold inline-block text-orange-600 dark:text-orange-400"
                      data-testid={COST_TEST_IDS.CAPEX_PERCENTAGE}
                    >
                      {Math.round(capexPercentage)}%
                    </span>
                  </div>
                </div>
                <div
                  className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-orange-200 dark:bg-orange-900"
                  data-testid={COST_TEST_IDS.CAPEX_PROGRESS_BAR}
                >
                  <div
                    style={{ width: `${capexPercentage}%` }}
                    className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-orange-500 dark:bg-orange-600"
                  ></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* OPEX Section */}
        <div className="mb-6" data-testid={COST_TEST_IDS.OPEX_SECTION}>
          <h3 className="text-lg font-medium mb-2">
            Ongoing Maintenance (OPEX)
          </h3>
          <div className="p-3 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
            <div className="flex justify-between items-center mb-2">
              <div className="flex items-center">
                <span
                  className="text-2xl mr-2 text-blue-500"
                  data-testid={COST_TEST_IDS.OPEX_SEVERITY_ICON}
                >
                  {opexEstimate > 20
                    ? "⚙️⚙️⚙️"
                    : opexEstimate > 10
                    ? "⚙️⚙️"
                    : "⚙️"}
                </span>
                <span className="font-medium">Monthly Maintenance</span>
              </div>
              <span
                className="text-xl font-bold text-blue-600 dark:text-blue-400"
                data-testid={COST_TEST_IDS.OPEX_ESTIMATE_VALUE}
              >
                {formatCurrency(opexEstimate / 12)}{" "}
                <span className="text-sm font-normal">/ month</span>
              </span>
            </div>
            <div
              className="text-sm text-gray-600 dark:text-gray-400 text-right mb-2"
              data-testid={COST_TEST_IDS.MONTHLY_OPEX}
            >
              ({formatCurrency(opexEstimate)} annually)
            </div>
            <div className="mt-3">
              <div className="relative pt-1">
                <div className="flex mb-2 items-center justify-between">
                  <div>
                    <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-blue-600 bg-blue-200 dark:text-blue-200 dark:bg-blue-800">
                      Maintenance Cost
                    </span>
                  </div>
                  <div className="text-right">
                    <span
                      className="text-xs font-semibold inline-block text-blue-600 dark:text-blue-400"
                      data-testid={COST_TEST_IDS.OPEX_PERCENTAGE}
                    >
                      {Math.round(opexPercentage)}%
                    </span>
                  </div>
                </div>
                <div
                  className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-blue-200 dark:bg-blue-900"
                  data-testid={COST_TEST_IDS.OPEX_PROGRESS_BAR}
                >
                  <div
                    style={{ width: `${opexPercentage}%` }}
                    className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-blue-500 dark:bg-blue-600"
                  ></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Total Cost Section */}
        <div className="mb-6" data-testid={COST_TEST_IDS.TOTAL_COST_SUMMARY}>
          <h3 className="text-lg font-medium mb-2">Total Cost of Ownership</h3>
          <div className="p-3 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
            <div className="flex justify-between items-center">
              <span className="font-medium">3-Year Total Cost</span>
              <span
                className="text-xl font-bold text-purple-600 dark:text-purple-400"
                data-testid={COST_TEST_IDS.THREE_YEAR_TOTAL}
              >
                {formatCurrency(totalCost)}
              </span>
            </div>
            <div className="mt-2 text-sm text-gray-600 dark:text-gray-400">
              <p>Includes implementation and 3 years of maintenance costs</p>
            </div>
          </div>
        </div>

        {/* ROI Section */}
        <div
          className="p-3 bg-gray-50 dark:bg-gray-800 rounded-lg"
          data-testid={COST_TEST_IDS.ROI_SECTION}
        >
          <h3 className="text-lg font-medium mb-2">Return on Investment</h3>
          <div className="flex items-center justify-between mb-2">
            <span className="text-gray-700 dark:text-gray-300">
              Estimated ROI:
            </span>
            <span
              className="font-bold text-green-600 dark:text-green-400"
              data-testid={COST_TEST_IDS.ROI_ESTIMATE}
            >
              {roiEstimate.returnRate}
            </span>
          </div>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            {roiEstimate.description}
          </p>
        </div>
      </div>
    </WidgetContainer>
  );
};

// Export the component directly without HOC
export default CostEstimationWidget;
