import React, { useMemo, useState, useEffect } from "react";
import { SecurityLevel } from "../../types/cia";
import RadarChart from "../RadarChart";
import WidgetContainer from "../common/WidgetContainer";
import MetricsCard from "../common/MetricsCard";
import { CHART_TEST_IDS } from "../../constants/testIds";
import { getSecurityLevelValue } from "../../utils/securityLevelUtils";

/**
 * Props interface for SecurityVisualizationWidget
 */
export interface SecurityVisualizationWidgetProps {
  availabilityLevel: SecurityLevel;
  integrityLevel: SecurityLevel;
  confidentialityLevel: SecurityLevel;
  className?: string;
  testId?: string;
}

/**
 * Calculates risk metrics based on security levels
 */
const calculateRiskMetrics = (
  availabilityLevel: SecurityLevel,
  integrityLevel: SecurityLevel,
  confidentialityLevel: SecurityLevel
) => {
  // Convert security levels to numerical values (0-4, where 4 is Very High)
  const availabilityValue = getSecurityLevelValue(availabilityLevel);
  const integrityValue = getSecurityLevelValue(integrityLevel);
  const confidentialityValue = getSecurityLevelValue(confidentialityLevel);

  // Calculate average security score
  const avgSecurityScore =
    (availabilityValue + integrityValue + confidentialityValue) / 3;

  // Calculate value at risk (inverse relationship to security)
  // Scale is 0-100 where 100 is highest risk
  const valueAtRisk = Math.round(100 - avgSecurityScore * 25);

  // Calculate probability (inverse relationship to security)
  // Scale is 0-100% where 100% is highest probability
  const probability = Math.round(90 - avgSecurityScore * 20);

  // Calculate combined risk score
  const riskScore = Math.round((valueAtRisk * probability) / 100);

  // Determine risk level based on score
  let riskLevel;
  if (riskScore >= 70) riskLevel = "Critical";
  else if (riskScore >= 50) riskLevel = "High";
  else if (riskScore >= 30) riskLevel = "Medium";
  else riskLevel = "Low";

  return {
    valueAtRisk,
    probability: `${probability}%`,
    riskScore,
    riskLevel,
  };
};

/**
 * SecurityVisualizationWidget displays a radar chart visualization of the security profile
 * and risk assessment metrics based on the selected security levels.
 */
const SecurityVisualizationWidget: React.FC<
  SecurityVisualizationWidgetProps
> = ({
  availabilityLevel,
  integrityLevel,
  confidentialityLevel,
  className = "",
  testId = CHART_TEST_IDS.RADAR_CHART, // Changed from RADAR_CHART_WIDGET to RADAR_CHART
}) => {
  // Calculate risk metrics
  const riskMetrics = useMemo(
    () =>
      calculateRiskMetrics(
        availabilityLevel,
        integrityLevel,
        confidentialityLevel
      ),
    [availabilityLevel, integrityLevel, confidentialityLevel]
  );

  // Add state for showing tips
  const [showTips, setShowTips] = useState({
    availability: false,
    integrity: false,
    confidentiality: false,
  });

  // Add typing effect state
  const [typedText, setTypedText] = useState("");
  const fullText =
    "Risk score is calculated by multiplying the value at risk by the probability of a security incident. Improving your security levels will decrease both factors, resulting in a lower overall risk.";

  useEffect(() => {
    let i = 0;
    setTypedText("");
    const typingInterval = setInterval(() => {
      if (i < fullText.length) {
        setTypedText((prev) => prev + fullText.charAt(i));
        i++;
      } else {
        clearInterval(typingInterval);
      }
    }, 30);

    return () => clearInterval(typingInterval);
  }, [fullText]);

  // Get risk indicator color based on risk level
  const getRiskColor = (riskLevel: string) => {
    switch (riskLevel) {
      case "Critical":
        return "danger";
      case "High":
        return "warning";
      case "Medium":
        return "info";
      case "Low":
        return "success";
      default:
        return "primary";
    }
  };

  return (
    <WidgetContainer
      title="Security Profile Visualization"
      icon="📊"
      className={className}
      testId={testId}
    >
      <div className="space-y-6">
        {/* Radar Chart Section */}
        <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg border shadow-sm">
          <h3 className="text-lg font-medium mb-4 flex items-center">
            <span className="mr-2">📊</span>
            CIA Security Profile
          </h3>
          <div
            className="h-64"
            data-testid={CHART_TEST_IDS.RADAR_CHART_CONTAINER}
          >
            <RadarChart
              availabilityLevel={availabilityLevel}
              integrityLevel={integrityLevel}
              confidentialityLevel={confidentialityLevel}
            />
          </div>
          <p className="text-sm text-gray-600 dark:text-gray-300 mt-3">
            This radar chart visualizes your current security profile across the
            CIA triad: Confidentiality, Integrity, and Availability.
          </p>
        </div>

        {/* Risk Assessment Section */}
        <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg border shadow-sm">
          <h3 className="text-lg font-medium mb-4 flex items-center">
            <span className="mr-2">⚠️</span>
            Risk Assessment
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Value at Risk Card */}
            <MetricsCard
              title="Value at Risk"
              value={`${riskMetrics.valueAtRisk}/100`}
              icon="💰"
              testId={`${testId}-value-at-risk`}
              variant="warning"
              subtitle="Potential impact value"
            />

            {/* Probability Card */}
            <MetricsCard
              title="Probability"
              value={riskMetrics.probability}
              icon="🎯"
              testId={`${testId}-probability`}
              variant="info"
              subtitle="Likelihood of security incident"
            />

            {/* Risk Score Card */}
            <MetricsCard
              title="Risk Score"
              value={riskMetrics.riskScore.toString()}
              icon="🔍"
              testId={`${testId}-risk-score`}
              variant={getRiskColor(riskMetrics.riskLevel)}
              subtitle={`Risk Level: ${riskMetrics.riskLevel}`}
            />
          </div>

          {/* Risk score gauge visualization - enhanced with Ingress styling */}
          <div className="mt-6 bg-gray-50 dark:bg-gray-900 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
            <h4 className="text-sm font-medium mb-3">Risk Score Gauge</h4>
            <div className="relative h-8 w-full bg-gray-200 dark:bg-gray-800 rounded-full overflow-hidden">
              {/* Color segments for risk levels with enhanced cyberpunk styling */}
              <div className="absolute top-0 left-0 h-full w-1/4 bg-gradient-to-r from-green-500 to-green-400"></div>
              <div className="absolute top-0 left-1/4 h-full w-1/4 bg-gradient-to-r from-yellow-400 to-yellow-500"></div>
              <div className="absolute top-0 left-2/4 h-full w-1/4 bg-gradient-to-r from-orange-500 to-orange-600"></div>
              <div className="absolute top-0 left-3/4 h-full w-1/4 bg-gradient-to-r from-red-600 to-red-700"></div>
              
              {/* Risk score indicator with glow effect */}
              <div 
                className="absolute top-0 h-full w-1 bg-white dark:bg-gray-100 z-10 shadow-glow"
                style={{
                  left: `${riskMetrics.riskScore}%`,
                  boxShadow: '0 0 10px 2px rgba(255, 255, 255, 0.7)',
                  transform: 'translateX(-50%)'
                }}
              ></div>
              
              {/* Risk labels */}
              <div className="absolute top-full mt-2 left-0 text-xs text-gray-600 dark:text-gray-400">Low Risk</div>
              <div className="absolute top-full mt-2 right-0 text-xs text-gray-600 dark:text-gray-400">High Risk</div>
            </div>
          </div>

          {/* Risk score details in cyberpunk style */}
          <div className="mt-4 bg-gray-50 dark:bg-gray-800 p-3 rounded-lg border border-gray-200 dark:border-gray-700 technical-text">
            <div className="flex justify-between items-center text-sm">
              <span className="text-gray-600 dark:text-gray-400">Risk Analysis:</span>
              <span className={`font-mono ${
                riskMetrics.riskLevel === "Critical" ? "text-red-500 dark:text-red-400" :
                riskMetrics.riskLevel === "High" ? "text-orange-500 dark:text-orange-400" :
                riskMetrics.riskLevel === "Medium" ? "text-yellow-500 dark:text-yellow-400" :
                "text-green-500 dark:text-green-400"
              }`}>{riskMetrics.riskScore}/100 - {riskMetrics.riskLevel}</span>
            </div>
          </div>

          <div className="mt-4 p-3 bg-yellow-50 dark:bg-yellow-900 dark:bg-opacity-10 rounded-lg border border-yellow-200 dark:border-yellow-800">
            <h4 className="text-sm font-medium mb-1 flex items-center text-yellow-700 dark:text-yellow-400">
              <span className="mr-1.5">ℹ️</span>
              Risk Calculation
            </h4>
            <p className="text-xs text-gray-600 dark:text-gray-300 font-mono">
              {typedText}
              <span className="inline-block w-2 h-4 bg-green-400 dark:bg-green-500 ml-1 animate-pulse">
                {typedText.length < fullText.length ? "" : " "}
              </span>
            </p>
          </div>
        </div>

        {/* Risk Mitigation Recommendations */}
        <div className="p-4 bg-blue-50 dark:bg-blue-900 dark:bg-opacity-10 rounded-lg border border-blue-200 dark:border-blue-800">
          <h4 className="text-sm font-medium mb-2 flex items-center justify-between text-blue-700 dark:text-blue-400">
            <span className="flex items-center">
              <span className="mr-1.5">💡</span>
              Risk Mitigation Recommendations
            </span>
            <span className="text-xs text-gray-500 dark:text-gray-400">
              Click for details
            </span>
          </h4>
          <ul className="list-disc pl-5 space-y-1 text-sm text-gray-600 dark:text-gray-300">
            {availabilityLevel !== "Very High" && (
              <li
                className="cursor-pointer hover:text-blue-600 dark:hover:text-blue-300 transition-colors"
                onClick={() =>
                  setShowTips((prev) => ({
                    ...prev,
                    availability: !prev.availability,
                  }))
                }
              >
                Increase your <strong>Availability</strong> security level to
                reduce downtime risk
                {showTips.availability && (
                  <div className="mt-2 ml-2 p-3 bg-blue-100 dark:bg-blue-900 dark:bg-opacity-50 rounded text-xs">
                    <p className="mb-1 font-semibold">Implementation tips:</p>
                    <ul className="list-disc pl-4 space-y-1">
                      <li>Deploy redundant systems and load balancers</li>
                      <li>Implement automated failover mechanisms</li>
                      <li>
                        Use distributed architecture across multiple zones
                      </li>
                      <li>
                        Establish robust backup and disaster recovery procedures
                      </li>
                    </ul>
                  </div>
                )}
              </li>
            )}
            {integrityLevel !== "Very High" && (
              <li
                className="cursor-pointer hover:text-blue-600 dark:hover:text-blue-300 transition-colors"
                onClick={() =>
                  setShowTips((prev) => ({
                    ...prev,
                    integrity: !prev.integrity,
                  }))
                }
              >
                Enhance <strong>Integrity</strong> controls to prevent data
                corruption risks
                {showTips.integrity && (
                  <div className="mt-2 ml-2 p-3 bg-blue-100 dark:bg-blue-900 dark:bg-opacity-50 rounded text-xs">
                    <p className="mb-1 font-semibold">Implementation tips:</p>
                    <ul className="list-disc pl-4 space-y-1">
                      <li>Implement data validation and checksums</li>
                      <li>Use secure code practices and input sanitization</li>
                      <li>Set up database integrity constraints</li>
                      <li>Establish proper access controls and audit logs</li>
                    </ul>
                  </div>
                )}
              </li>
            )}
            {confidentialityLevel !== "Very High" && (
              <li
                className="cursor-pointer hover:text-blue-600 dark:hover:text-blue-300 transition-colors"
                onClick={() =>
                  setShowTips((prev) => ({
                    ...prev,
                    confidentiality: !prev.confidentiality,
                  }))
                }
              >
                Strengthen <strong>Confidentiality</strong> measures to protect
                against data breaches
                {showTips.confidentiality && (
                  <div className="mt-2 ml-2 p-3 bg-blue-100 dark:bg-blue-900 dark:bg-opacity-50 rounded text-xs">
                    <p className="mb-1 font-semibold">Implementation tips:</p>
                    <ul className="list-disc pl-4 space-y-1">
                      <li>
                        Implement end-to-end encryption for sensitive data
                      </li>
                      <li>Use strong access control mechanisms</li>
                      <li>Deploy data loss prevention solutions</li>
                      <li>Conduct regular security awareness training</li>
                    </ul>
                  </div>
                )}
              </li>
            )}
            {availabilityLevel === "Very High" &&
              integrityLevel === "Very High" &&
              confidentialityLevel === "Very High" && (
                <li>
                  Your security profile is at maximum level. Continue
                  maintaining these robust controls.
                </li>
              )}
          </ul>
        </div>
      </div>
    </WidgetContainer>
  );
};

export default SecurityVisualizationWidget;
