import React from "react";
import { VALUE_CREATION_TEST_IDS } from "../../constants/testIds";
import ciaContentService, {
  getROIEstimate,
  getValuePoints,
} from "../../services/ciaContentService";
import { SecurityLevel } from "../../types/cia";
import { getSecurityLevelBadgeVariant } from "../../utils/securityLevelUtils";
import MetricsCard from "../common/MetricsCard";
import StatusBadge from "../common/StatusBadge";
import WidgetContainer from "../common/WidgetContainer";

/**
 * Props for the ValueCreationWidget component
 */
export interface ValueCreationWidgetProps {
  securityLevel: SecurityLevel;
  availabilityLevel?: SecurityLevel;
  integrityLevel?: SecurityLevel;
  confidentialityLevel?: SecurityLevel;
  className?: string;
  testId?: string;
}

/**
 * ValueCreationWidget displays the business value created by security investments
 * based on the selected security levels
 */
const ValueCreationWidget: React.FC<ValueCreationWidgetProps> = ({
  securityLevel,
  availabilityLevel = "None",
  integrityLevel = "None",
  confidentialityLevel = "None",
  className = "",
  testId = VALUE_CREATION_TEST_IDS.VALUE_CREATION_WIDGET,
}) => {
  // Get ROI data
  const roiEstimate = getROIEstimate(securityLevel);
  const roiData = ciaContentService.getROIEstimates(securityLevel);

  // Get value points for the security level
  const valuePoints = getValuePoints(securityLevel);

  return (
    <WidgetContainer
      title="Security Value Creation"
      icon="📈"
      className={className}
      testId={testId}
    >
      <div className="space-y-6">
        {/* Value Summary */}
        <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg border-l-4 border-blue-500">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-lg font-medium flex items-center">
              <span className="mr-2">💰</span>
              Business Value
            </h3>
            <StatusBadge
              status={getSecurityLevelBadgeVariant(securityLevel)}
              className="text-xs px-3"
            >
              {securityLevel}
            </StatusBadge>
          </div>

          <p className="text-gray-600 dark:text-gray-300 mb-2">
            {roiData.description}
          </p>
        </div>

        {/* ROI Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <MetricsCard
            title="Return on Investment"
            value={roiData.returnRate}
            icon="📊"
            testId={`${testId}-roi`}
            accentColor="#9b59b6"
            variant="purple"
          />
          <MetricsCard
            title="Potential Savings"
            value={roiData.potentialSavings ?? "N/A"}
            icon="💰"
            testId={`${testId}-savings`}
            accentColor="#2ecc71"
            variant="success"
          />
          <MetricsCard
            title="Break-even Period"
            value={roiData.breakEvenPeriod ?? "N/A"}
            icon="⏱️"
            testId={`${testId}-breakeven`}
            accentColor="#3498db"
            variant="info"
          />
        </div>

        {/* Value Creation Benefits */}
        <div className="bg-blue-50 dark:bg-blue-900 dark:bg-opacity-20 p-4 rounded-lg border border-blue-200 dark:border-blue-800">
          <h4 className="font-medium mb-3 flex items-center">
            <span className="mr-2">🎯</span>
            Key Benefits
          </h4>

          <ul className="space-y-2">
            {valuePoints.map((point, index) => (
              <li
                key={index}
                className="flex items-start"
                data-testid={`${testId}-value-point-${index}`}
              >
                <span className="text-green-600 dark:text-green-400 mr-2 mt-0.5">
                  ✓
                </span>
                <span className="text-sm text-gray-700 dark:text-gray-300">
                  {point}
                </span>
              </li>
            ))}
          </ul>
        </div>

        {/* Security Investment Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Business Benefits */}
          <div className="bg-green-50 dark:bg-green-900 dark:bg-opacity-20 p-4 rounded-lg border border-green-200 dark:border-green-800">
            <h4 className="text-md font-medium mb-3 flex items-center">
              <span className="mr-2">📊</span>
              Business Benefits
            </h4>
            <ul className="list-disc list-inside text-sm text-gray-600 dark:text-gray-300 space-y-2">
              <li>Reduced risk of business disruption</li>
              <li>Enhanced customer trust and reputation</li>
              <li>Improved compliance posture</li>
              <li>Increased business resilience</li>
            </ul>
          </div>

          {/* Technical Benefits */}
          <div className="bg-blue-50 dark:bg-blue-900 dark:bg-opacity-20 p-4 rounded-lg border border-blue-200 dark:border-blue-800">
            <h4 className="text-md font-medium mb-3 flex items-center">
              <span className="mr-2">⚙️</span>
              Technical Benefits
            </h4>
            <ul className="list-disc list-inside text-sm text-gray-600 dark:text-gray-300 space-y-2">
              <li>Improved system stability and reliability</li>
              <li>Reduced incident response time</li>
              <li>Enhanced data protection capabilities</li>
              <li>More efficient security operations</li>
            </ul>
          </div>
        </div>

        {/* Security Maturity */}
        <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg border shadow-sm">
          <h4 className="text-md font-medium mb-3">Security Maturity Impact</h4>

          <div className="space-y-3">
            <div>
              <div className="flex justify-between items-center mb-1">
                <span className="text-sm text-gray-700 dark:text-gray-300">
                  Current Security Posture
                </span>
                <span className="text-sm font-medium text-blue-600 dark:text-blue-400">
                  {securityLevel}
                </span>
              </div>
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5 mb-2">
                {securityLevel === "None" && (
                  <div
                    className="bg-red-600 h-2.5 rounded-full"
                    style={{ width: "5%" }}
                  ></div>
                )}
                {securityLevel === "Low" && (
                  <div
                    className="bg-yellow-500 h-2.5 rounded-full"
                    style={{ width: "25%" }}
                  ></div>
                )}
                {securityLevel === "Moderate" && (
                  <div
                    className="bg-blue-500 h-2.5 rounded-full"
                    style={{ width: "50%" }}
                  ></div>
                )}
                {securityLevel === "High" && (
                  <div
                    className="bg-green-600 h-2.5 rounded-full"
                    style={{ width: "75%" }}
                  ></div>
                )}
                {securityLevel === "Very High" && (
                  <div
                    className="bg-purple-600 h-2.5 rounded-full"
                    style={{ width: "95%" }}
                  ></div>
                )}
              </div>
            </div>
          </div>

          <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
            Increasing security levels provides additional business value
            through risk reduction and operational improvements.
          </p>
        </div>
      </div>
    </WidgetContainer>
  );
};

export default ValueCreationWidget;
