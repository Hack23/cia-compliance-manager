import React, { useMemo } from "react";
import { WIDGET_ICONS, WIDGET_TITLES } from "../../../constants/appConstants";
import { COST_TEST_IDS } from "../../../constants/testIds";
import { useCIAOptions } from "../../../hooks/useCIAOptions";
import { SecurityLevel } from "../../../types/cia";
import {
  calculateOverallSecurityLevel,
  getSecurityLevelValue,
} from "../../../utils/securityLevelUtils";
import ProgressBar from "../../common/ProgressBar";
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
          <div className="text-2xl font-bold text-blue-700 dark:text-blue-300">
            {formatImplementationTime(implementationTime)}
          </div>
        </div>

        {/* CAPEX - Capital Expenditure */}
        <div className="mb-6" data-testid={COST_TEST_IDS.CAPEX_SECTION}>
          <h3 className="text-md font-medium mb-2">
            Implementation Cost (CAPEX)
          </h3>
          <div className="p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
            <div
              className="text-xl font-bold mb-2"
              data-testid={COST_TEST_IDS.CAPEX_ESTIMATE_VALUE}
            >
              {formatCurrency(capexEstimate)}
            </div>
            <ProgressBar
              percentage={capexPercentage}
              bgColorClass="bg-blue-500"
              testId={COST_TEST_IDS.CAPEX_PROGRESS_BAR}
            />
            <div className="text-sm text-gray-600 dark:text-gray-400 mt-1">
              One-time implementation cost
            </div>
          </div>
        </div>

        {/* OPEX - Operational Expenditure */}
        <div className="mb-6" data-testid={COST_TEST_IDS.OPEX_SECTION}>
          <h3 className="text-md font-medium mb-2">Maintenance Cost (OPEX)</h3>
          <div className="p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
            <div
              className="text-xl font-bold mb-2"
              data-testid={COST_TEST_IDS.OPEX_ESTIMATE_VALUE}
            >
              {formatCurrency(opexEstimate)} / month
            </div>
            <ProgressBar
              percentage={opexPercentage}
              bgColorClass="bg-green-500"
              testId={COST_TEST_IDS.OPEX_PROGRESS_BAR}
            />
            <div
              className="text-sm text-gray-600 dark:text-gray-400 mt-1"
              data-testid={COST_TEST_IDS.MONTHLY_OPEX}
            >
              Monthly operational costs
            </div>
          </div>
        </div>

        {/* Total Cost */}
        <div className="mb-6" data-testid={COST_TEST_IDS.TOTAL_COST_SUMMARY}>
          <h3 className="text-md font-medium mb-2">Total 3-Year Cost</h3>
          <div className="p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
            <div
              className="text-xl font-bold"
              data-testid={COST_TEST_IDS.TOTAL_COST}
            >
              {formatCurrency(totalCost)}
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400 mt-1">
              Implementation + 3 years maintenance
            </div>
          </div>
        </div>

        {/* ROI Estimate */}
        <div
          className="p-3 bg-gray-50 dark:bg-gray-800 rounded-lg"
          data-testid={COST_TEST_IDS.ROI_SECTION}
        >
          <h3 className="text-md font-medium mb-2">Return on Investment</h3>
          <div className="p-3 bg-blue-50 dark:bg-blue-900 dark:bg-opacity-20 rounded-lg">
            <div
              className="text-lg font-bold text-blue-700 dark:text-blue-300"
              data-testid={COST_TEST_IDS.ROI_ESTIMATE}
            >
              {roiEstimate.returnRate}
            </div>
            <div className="text-sm text-blue-600 dark:text-blue-400 mt-1">
              {roiEstimate.description}
            </div>
          </div>
        </div>
      </div>
    </WidgetContainer>
  );
};

// Export the component directly without HOC
export default CostEstimationWidget;
