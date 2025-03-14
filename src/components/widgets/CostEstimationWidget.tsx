import React, { useMemo } from "react";
import { COST_ANALYSIS } from "../../constants/appConstants";
import { COST_TEST_IDS } from "../../constants/testIds";
import ciaContentService, {
  getImplementationTime,
} from "../../services/ciaContentService";
import { SecurityLevel } from "../../types/cia";
import MetricsCard from "../common/MetricsCard";
import StatusBadge from "../common/StatusBadge";
import WidgetContainer from "../common/WidgetContainer";

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

  const implementationTime = getImplementationTime(
    availabilityLevel as SecurityLevel,
    integrityLevel as SecurityLevel,
    confidentialityLevel as SecurityLevel
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
    // Convert "$X" or "$X/year" to "$X,XXX" or "$X,XXX/year"
    const match = value.match(/\$(\d+)(.*)$/);
    if (match && match[1]) {
      const amount = parseInt(match[1]);
      const suffix = match[2] || "";
      return `$${amount.toLocaleString()}${suffix}`;
    }
    return value;
  };

  return (
    <WidgetContainer
      title="Estimated Implementation Cost"
      icon="💰"
      testId={testId}
      className={className}
    >
      <div className="space-y-6">
        {/* Cost Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <MetricsCard
            title="Capital Expenditure"
            value={formatCurrency(securityMetrics.capexEstimate || "")} // Add default empty string
            icon="💼"
            testId={COST_TEST_IDS.CAPEX_ESTIMATE_VALUE}
            accentColor="#3498db"
            variant="info"
          />
          <MetricsCard
            title="Operational Expenditure"
            value={formatCurrency(securityMetrics.opexEstimate)}
            icon="⚙️"
            testId={COST_TEST_IDS.OPEX_ESTIMATE_VALUE}
            accentColor="#2ecc71"
            variant="success"
          />
          <MetricsCard
            title="3-Year TCO"
            value={threeYearTotal}
            icon="🔄"
            testId={COST_TEST_IDS.THREE_YEAR_TOTAL}
            accentColor="#9b59b6"
            variant="purple"
          />
        </div>

        {/* Budget Allocation */}
        <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg border shadow-sm">
          <h3 className="text-lg font-medium mb-3 flex items-center">
            <span className="mr-2">💰</span>
            Budget Allocation
          </h3>

          <div className="space-y-4">
            {/* CAPEX Budget Impact */}
            <div className="space-y-1">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600 dark:text-gray-300">
                  Capital Expenditure
                </span>
                <span
                  className="text-sm font-medium text-blue-700 dark:text-blue-300"
                  data-testid={COST_TEST_IDS.CAPEX_PERCENTAGE}
                >
                  {securityMetrics.totalCapex}% of IT budget
                </span>
              </div>
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
                <div
                  className="bg-blue-600 h-2.5 rounded-full"
                  style={{ width: `${securityMetrics.totalCapex}%` }}
                ></div>
              </div>
            </div>

            {/* OPEX Budget Impact */}
            <div className="space-y-1">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600 dark:text-gray-300">
                  Operational Expenditure
                </span>
                <span
                  className="text-sm font-medium text-green-700 dark:text-green-300"
                  data-testid={COST_TEST_IDS.OPEX_PERCENTAGE}
                >
                  {securityMetrics.totalOpex}% of IT budget
                </span>
              </div>
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
                <div
                  className="bg-green-600 h-2.5 rounded-full"
                  style={{ width: `${securityMetrics.totalOpex}%` }}
                ></div>
              </div>
            </div>
          </div>
        </div>

        {/* ROI and Implementation */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* ROI Card */}
          <div className="bg-green-50 dark:bg-green-900 dark:bg-opacity-20 p-4 rounded-lg border border-green-200 dark:border-green-800">
            <h3 className="text-lg font-medium mb-2 flex items-center">
              <span className="mr-2">📈</span>
              Return on Investment
            </h3>
            <div className="flex items-center mb-2">
              <StatusBadge
                status="success"
                size="lg"
                testId={COST_TEST_IDS.ROI_ESTIMATE}
              >
                {securityMetrics.roi}
              </StatusBadge>
              <span className="ml-2 text-sm text-gray-600 dark:text-gray-300">
                Estimated ROI
              </span>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-300">
              Based on prevented breaches, operational efficiencies, and
              compliance cost reduction.
            </p>
          </div>

          {/* Implementation Timeline */}
          <div className="bg-blue-50 dark:bg-blue-900 dark:bg-opacity-20 p-4 rounded-lg border border-blue-200 dark:border-blue-800">
            <h3 className="text-lg font-medium mb-2 flex items-center">
              <span className="mr-2">⏱️</span>
              Implementation Timeline
            </h3>
            <div className="flex items-center mb-2">
              <StatusBadge status="info" size="lg">
                {implementationTime}
              </StatusBadge>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-300">
              Estimated time to fully implement and operationalize these
              security controls.
            </p>
          </div>
        </div>

        {/* Cost Analysis & Recommendation */}
        <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg border shadow-sm">
          <h3 className="text-lg font-medium mb-3">Cost Analysis</h3>

          <p
            className="text-sm text-gray-700 dark:text-gray-300 mb-3"
            data-testid={COST_TEST_IDS.COST_ANALYSIS_TEXT}
          >
            {securityMetrics.isSmallSolution
              ? COST_ANALYSIS.SMALL_SOLUTION
              : COST_ANALYSIS.LARGE_SOLUTION}
          </p>

          <div className="flex flex-wrap gap-2 mt-2">
            <StatusBadge status="info">Capital Investment</StatusBadge>
            <StatusBadge status="success">Recurring Costs</StatusBadge>
            <StatusBadge status="purple">Long-term Value</StatusBadge>
          </div>
        </div>

        {/* Cost Breakdown */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* CAPEX Components */}
          <div className="bg-blue-50 dark:bg-blue-900 dark:bg-opacity-10 p-4 rounded-lg border border-blue-200 dark:border-blue-800">
            <h4 className="text-md font-medium mb-3 flex items-center">
              <span className="mr-2">⚙️</span>
              CAPEX Components
            </h4>
            <ul className="list-disc list-inside text-sm text-gray-600 dark:text-gray-300 space-y-1">
              <li>Security hardware and infrastructure</li>
              <li>Software licenses and tools</li>
              <li>Initial implementation services</li>
              <li>Training and certification</li>
            </ul>
          </div>

          {/* OPEX Components */}
          <div className="bg-green-50 dark:bg-green-900 dark:bg-opacity-10 p-4 rounded-lg border border-green-200 dark:border-green-800">
            <h4 className="text-md font-medium mb-3 flex items-center">
              <span className="mr-2">⚙️</span>
              OPEX Components
            </h4>
            <ul className="list-disc list-inside text-sm text-gray-600 dark:text-gray-300 space-y-1">
              <li>Personnel costs and staffing</li>
              <li>Maintenance and support contracts</li>
              <li>Subscription services</li>
              <li>Ongoing training and awareness</li>
            </ul>
          </div>
        </div>
      </div>
    </WidgetContainer>
  );
};

export default CostEstimationWidget;
