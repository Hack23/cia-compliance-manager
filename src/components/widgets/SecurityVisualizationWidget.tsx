import React, { useMemo } from "react";
import { RISK_LEVEL_DESCRIPTIONS } from "../../constants/appConstants";
import { SecurityLevel } from "../../types/cia";
import { getSecurityLevelValue } from "../../utils/securityLevelUtils";
import RadarChart from "../charts/RadarChart";
import { SecurityRiskScore } from "../common";
import SecurityLevelBadge from "../common/SecurityLevelBadge"; // Add this import

export interface SecurityVisualizationWidgetProps {
  availabilityLevel: SecurityLevel;
  integrityLevel: SecurityLevel;
  confidentialityLevel: SecurityLevel;
  className?: string;
  testId?: string;
}

/**
 * SecurityVisualizationWidget provides visual representations of security posture
 *
 * ## Business Perspective
 *
 * This widget translates complex security concepts into intuitive visualizations,
 * helping stakeholders at all levels understand the organization's security posture. 📊
 *
 * The radar chart enables quick identification of imbalances between CIA components,
 * while the risk score provides a concrete metric for security program effectiveness.
 * These visualizations are particularly valuable for security reporting to executives
 * and board members. 💼
 */
const SecurityVisualizationWidget: React.FC<
  SecurityVisualizationWidgetProps
> = ({
  availabilityLevel,
  integrityLevel,
  confidentialityLevel,
  className = "",
  testId = "security-visualization-widget",
}) => {
  // Convert security levels to numeric values for the chart
  const securityData = useMemo(() => {
    const aValue = getSecurityLevelValue(availabilityLevel);
    const iValue = getSecurityLevelValue(integrityLevel);
    const cValue = getSecurityLevelValue(confidentialityLevel);

    return [
      {
        category: "Availability",
        value: aValue,
        maxValue: 4,
        color: "#3498db", // Blue
      },
      {
        category: "Integrity",
        value: iValue,
        maxValue: 4,
        color: "#2ecc71", // Green
      },
      {
        category: "Confidentiality",
        value: cValue,
        maxValue: 4,
        color: "#9b59b6", // Purple
      },
    ];
  }, [availabilityLevel, integrityLevel, confidentialityLevel]);

  // Calculate overall risk score (inversely related to security level)
  const riskScore = useMemo(() => {
    const aValue = getSecurityLevelValue(availabilityLevel);
    const iValue = getSecurityLevelValue(integrityLevel);
    const cValue = getSecurityLevelValue(confidentialityLevel);

    // Calculate weighted average score (0-100)
    // Higher security levels = lower risk
    const maxSecurityValue = 4; // "Very High" level
    const avgSecurityValue = (aValue + iValue + cValue) / 3;

    // Convert to risk score (100 = highest risk, 0 = lowest risk)
    return Math.round(100 - (avgSecurityValue / maxSecurityValue) * 100);
  }, [availabilityLevel, integrityLevel, confidentialityLevel]);

  // Determine risk level based on score
  const riskLevel = useMemo(() => {
    if (riskScore >= 80) return "Critical";
    if (riskScore >= 60) return "High";
    if (riskScore >= 40) return "Medium";
    if (riskScore >= 20) return "Low";
    return "Minimal";
  }, [riskScore]);

  // Get risk description
  const riskDescription = useMemo(() => {
    const riskKey = riskLevel.toUpperCase();
    return RISK_LEVEL_DESCRIPTIONS[riskKey as keyof typeof RISK_LEVEL_DESCRIPTIONS] || 
      "Risk level description not available";
  }, [riskLevel]);

  return (
    <div className={`h-full flex flex-col ${className}`} data-testid={testId}>
      <div className="flex flex-col md:flex-row gap-4 h-full">
        {/* Radar Chart */}
        <div className="md:w-3/5 h-full flex items-center justify-center radar-chart-container overflow-hidden">
          <RadarChart
            availabilityLevel={availabilityLevel}
            integrityLevel={integrityLevel}
            confidentialityLevel={confidentialityLevel}
            testId={`${testId}-radar-chart`}
          />
        </div>

        {/* Risk Score */}
        <div className="md:w-2/5 flex flex-col">
          <SecurityRiskScore
            score={riskScore}
            label={riskLevel}
            testId={`${testId}-risk-score`}
          />

          <div className="mt-4 bg-gray-50 dark:bg-gray-800 p-3 rounded-lg border shadow-sm">
            <h4 className="text-sm font-medium mb-2">Risk Assessment</h4>
            <p className="text-xs text-gray-600 dark:text-gray-300">
              {riskDescription}
            </p>
          </div>

          {/* Security Metrics - This is the part with the best level display */}
          <div className="mt-4 grid grid-cols-3 gap-2 text-center">
            <SecurityLevelBadge
              category="Availability"
              level={availabilityLevel}
              colorClass="bg-blue-50 dark:bg-blue-900 dark:bg-opacity-20"
              textClass="text-blue-600 dark:text-blue-400"
            />
            <SecurityLevelBadge
              category="Integrity"
              level={integrityLevel}
              colorClass="bg-green-50 dark:bg-green-900 dark:bg-opacity-20"
              textClass="text-green-600 dark:text-green-400"
            />
            <SecurityLevelBadge
              category="Confidentiality"
              level={confidentialityLevel}
              colorClass="bg-purple-50 dark:bg-purple-900 dark:bg-opacity-20"
              textClass="text-purple-600 dark:text-purple-400"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SecurityVisualizationWidget;
