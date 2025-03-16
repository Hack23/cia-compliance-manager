import React, { useMemo } from "react";
import { ROI_ESTIMATES, SECURITY_LEVELS } from "../../constants/appConstants";
import { VALUE_CREATION_TEST_IDS } from "../../constants/testIds";
import {
  getBusinessImpactDescription,
  getROIEstimate,
} from "../../services/ciaContentService";
import { SecurityLevel } from "../../types/cia";
import MetricsCard from "../common/MetricsCard";
import StatusBadge from "../common/StatusBadge";
import WidgetContainer from "../common/WidgetContainer";

/**
 * Props for ValueCreationWidget
 */
export interface ValueCreationWidgetProps {
  securityLevel: SecurityLevel;
  availabilityLevel: SecurityLevel;
  integrityLevel: SecurityLevel;
  confidentialityLevel: SecurityLevel;
  className?: string;
  testId?: string;
}

/**
 * ValueCreationWidget displays business value and ROI metrics for security investments
 *
 * ## Business Perspective
 *
 * This widget translates security investments into business value metrics,
 * helping executives and business stakeholders understand the financial
 * benefits of security controls. It provides quantifiable ROI data that
 * supports budget justification and demonstrates the value created through
 * security investments. 💰
 *
 * By providing metrics like breach cost avoidance and productivity impacts,
 * this widget helps security teams articulate the business case for security
 * and align security decisions with broader organizational goals. 📈
 */
const ValueCreationWidget: React.FC<ValueCreationWidgetProps> = ({
  securityLevel,
  availabilityLevel,
  integrityLevel,
  confidentialityLevel,
  className = "",
  testId = VALUE_CREATION_TEST_IDS.VALUE_CREATION_WIDGET,
}) => {
  // Get ROI data for the selected security level
  const roiData = useMemo(() => getROIEstimate(securityLevel), [securityLevel]);

  // Get business impact descriptions
  const availabilityBusinessImpact = useMemo(
    () => getBusinessImpactDescription("availability", availabilityLevel),
    [availabilityLevel]
  );

  const integrityBusinessImpact = useMemo(
    () => getBusinessImpactDescription("integrity", integrityLevel),
    [integrityLevel]
  );

  const confidentialityBusinessImpact = useMemo(
    () => getBusinessImpactDescription("confidentiality", confidentialityLevel),
    [confidentialityLevel]
  );

  // Calculate breach cost avoidance based on security level
  const breachCostAvoidance = useMemo(() => {
    const levelValues = {
      [SECURITY_LEVELS.NONE]: "$0",
      [SECURITY_LEVELS.LOW]: "$100,000 - $250,000",
      [SECURITY_LEVELS.MODERATE]: "$250,000 - $750,000",
      [SECURITY_LEVELS.HIGH]: "$750,000 - $2,000,000",
      [SECURITY_LEVELS.VERY_HIGH]: "$2,000,000+",
    };
    return levelValues[securityLevel] || "$0";
  }, [securityLevel]);

  // Calculate productivity impact based on security level
  const productivityImpact = useMemo(() => {
    const levelValues = {
      [SECURITY_LEVELS.NONE]: "High disruption risk",
      [SECURITY_LEVELS.LOW]: "Moderate disruption risk",
      [SECURITY_LEVELS.MODERATE]: "Controlled disruption",
      [SECURITY_LEVELS.HIGH]: "Minimal disruption",
      [SECURITY_LEVELS.VERY_HIGH]: "Business continuity assured",
    };
    return levelValues[securityLevel] || "Unknown impact";
  }, [securityLevel]);

  // Calculate an investment impact score based on ROI value
  const investmentImpactScore = useMemo(() => {
    // Extract numeric value from ROI string (e.g., "200%" -> 200)
    const roiValue = parseInt(roiData.value.replace(/[^0-9]/g, ""), 10) || 0;

    if (roiValue >= 400) return { score: "A+", label: "Exceptional" };
    if (roiValue >= 300) return { score: "A", label: "Excellent" };
    if (roiValue >= 200) return { score: "B+", label: "Very Good" };
    if (roiValue >= 100) return { score: "B", label: "Good" };
    if (roiValue >= 50) return { score: "C", label: "Average" };
    return { score: "D", label: "Minimal" };
  }, [roiData.value]);

  // Get standard ROI estimates
  const standardROI = useMemo(
    () => ({
      NONE: ROI_ESTIMATES.NONE,
      LOW: ROI_ESTIMATES.LOW,
      MODERATE: ROI_ESTIMATES.MODERATE,
      HIGH: ROI_ESTIMATES.HIGH,
      VERY_HIGH: ROI_ESTIMATES.VERY_HIGH,
    }),
    []
  );

  // Calculate breakeven timeframe
  const breakEvenTimeframe = useMemo(() => {
    const timeframes = {
      [SECURITY_LEVELS.NONE]: "N/A",
      [SECURITY_LEVELS.LOW]: "18-24 months",
      [SECURITY_LEVELS.MODERATE]: "12-18 months",
      [SECURITY_LEVELS.HIGH]: "6-12 months",
      [SECURITY_LEVELS.VERY_HIGH]: "3-6 months",
    };
    return timeframes[securityLevel] || "Unknown";
  }, [securityLevel]);

  return (
    <WidgetContainer
      title="Business Value & ROI"
      icon="💰"
      className={className}
      testId={testId}
    >
      <div className="space-y-6">
        {/* ROI Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <MetricsCard
            title="Return on Investment"
            value={roiData.value}
            icon="📈"
            testId={`${testId}-roi`}
            accentColor="#9b59b6"
            variant="purple"
          />

          <MetricsCard
            title="Break-Even Period"
            value={breakEvenTimeframe}
            icon="⏱️"
            testId={`${testId}-breakeven`}
            accentColor="#3498db"
            variant="info"
          />

          <MetricsCard
            title="Investment Impact"
            value={`${investmentImpactScore.score} - ${investmentImpactScore.label}`}
            icon="🎯"
            testId={`${testId}-impact-score`}
            accentColor="#2ecc71"
            variant="success"
          />
        </div>

        {/* Business Value Metrics */}
        <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg border shadow-sm">
          <h3 className="text-lg font-medium mb-3">Business Value Metrics</h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-3">
            <div className="p-3 rounded-md bg-purple-100 dark:bg-purple-900 dark:bg-opacity-20 border border-purple-200 dark:border-purple-800">
              <div className="flex items-center mb-2">
                <span className="mr-2">🛡️</span>
                <span className="font-medium">Breach Cost Avoidance</span>
              </div>
              <p
                className="text-lg font-bold text-purple-700 dark:text-purple-300"
                data-testid={`${testId}-breach-cost`}
              >
                {breachCostAvoidance}
              </p>
              <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                Estimated financial loss avoided based on risk reduction
              </p>
            </div>

            <div className="p-3 rounded-md bg-blue-100 dark:bg-blue-900 dark:bg-opacity-20 border border-blue-200 dark:border-blue-800">
              <div className="flex items-center mb-2">
                <span className="mr-2">⚡</span>
                <span className="font-medium">Productivity Impact</span>
              </div>
              <p
                className="text-lg font-bold text-blue-700 dark:text-blue-300"
                data-testid={`${testId}-productivity`}
              >
                {productivityImpact}
              </p>
              <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                Effect on business operations and employee productivity
              </p>
            </div>
          </div>
        </div>

        {/* Business Impact Summary */}
        <div>
          <h3 className="text-lg font-medium mb-3">Impact Summary</h3>

          <div className="space-y-4">
            {/* Confidentiality Business Impact */}
            <div
              className="p-3 bg-purple-50 dark:bg-gray-800 rounded-md border-l-4"
              style={{ borderLeftColor: "#9b59b6" }}
              data-testid={`${testId}-conf-impact`}
            >
              <h4 className="text-sm font-medium mb-1 flex items-center">
                <span className="mr-2">🔒</span>
                Confidentiality Value
              </h4>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                {confidentialityBusinessImpact ||
                  "No business impact information available."}
              </p>
              <div className="mt-2">
                <StatusBadge status="purple" size="sm">
                  {confidentialityLevel}
                </StatusBadge>
              </div>
            </div>

            {/* Integrity Business Impact */}
            <div
              className="p-3 bg-green-50 dark:bg-gray-800 rounded-md border-l-4"
              style={{ borderLeftColor: "#2ecc71" }}
              data-testid={`${testId}-int-impact`}
            >
              <h4 className="text-sm font-medium mb-1 flex items-center">
                <span className="mr-2">✓</span>
                Integrity Value
              </h4>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                {integrityBusinessImpact ||
                  "No business impact information available."}
              </p>
              <div className="mt-2">
                <StatusBadge status="success" size="sm">
                  {integrityLevel}
                </StatusBadge>
              </div>
            </div>

            {/* Availability Business Impact */}
            <div
              className="p-3 bg-blue-50 dark:bg-gray-800 rounded-md border-l-4"
              style={{ borderLeftColor: "#3498db" }}
              data-testid={`${testId}-avail-impact`}
            >
              <h4 className="text-sm font-medium mb-1 flex items-center">
                <span className="mr-2">⏱️</span>
                Availability Value
              </h4>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                {availabilityBusinessImpact ||
                  "No business impact information available."}
              </p>
              <div className="mt-2">
                <StatusBadge status="info" size="sm">
                  {availabilityLevel}
                </StatusBadge>
              </div>
            </div>
          </div>
        </div>

        {/* Value Comparison Table */}
        <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg border shadow-sm">
          <h3 className="text-md font-medium mb-3">
            Security Value Comparison
          </h3>

          <div className="overflow-x-auto">
            <table className="min-w-full text-sm">
              <thead>
                <tr className="border-b dark:border-gray-700">
                  <th className="text-left py-2 px-3">Security Level</th>
                  <th className="text-left py-2 px-3">Est. ROI</th>
                  <th className="text-left py-2 px-3">Notes</th>
                </tr>
              </thead>
              <tbody>
                {Object.entries(standardROI).map(([level, data]) => {
                  // Convert data to the correct type
                  const roiInfo = data as unknown as {
                    returnRate: string;
                    description: string;
                  };

                  return (
                    <tr
                      key={level}
                      className={`border-b dark:border-gray-700 ${
                        securityLevel === level.replace(/_/g, " ")
                          ? "bg-blue-50 dark:bg-blue-900 dark:bg-opacity-20"
                          : ""
                      }`}
                    >
                      <td className="py-2 px-3">{level.replace(/_/g, " ")}</td>
                      <td className="py-2 px-3">{roiInfo.returnRate}</td>
                      <td className="py-2 px-3">{roiInfo.description}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </WidgetContainer>
  );
};

export default ValueCreationWidget;
