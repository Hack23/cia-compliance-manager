import React, { useMemo } from "react";
import { WIDGET_ICONS, WIDGET_TITLES } from "../../../constants/appConstants";
import { SECURITY_VISUALIZATION_WIDGET_IDS } from "../../../constants/testIds";
import { useSecurityMetricsService } from "../../../hooks/useSecurityMetricsService";
import { SecurityLevel } from "../../../types/cia";
import { SecurityVisualizationWidgetProps } from "../../../types/widget-props";
import {
  getRiskLevelColor,
  getSecurityScoreColorClass,
} from "../../../utils/colorUtils";
import {
  calculateBusinessImpactLevel,
  getRiskLevelFromImpactLevel,
} from "../../../utils/riskUtils";
import {
  getSecurityLevelValue,
  normalizeSecurityLevel,
} from "../../../utils/securityLevelUtils";
import { getWidgetAriaDescription } from "../../../utils/accessibility";
import { WidgetClasses, cn } from "../../../utils/tailwindClassHelpers";
import RadarChart from "../../charts/RadarChart";
import SecurityLevelIndicator from "../../common/SecurityLevelIndicator";
import WidgetContainer from "../../common/WidgetContainer";
import WidgetErrorBoundary from "../../common/WidgetErrorBoundary";

/**
 * SecurityVisualizationWidget displays security metrics in visual form
 *
 * ## Business Perspective
 *
 * This widget helps stakeholders visualize the current security posture
 * and understand the relationship between security controls and risk levels.
 * It provides at-a-glance metrics and visual indicators to support
 * decision-making around security investments. 📊
 */
const SecurityVisualizationWidget: React.FC<
  SecurityVisualizationWidgetProps
> = ({
  availabilityLevel,
  integrityLevel,
  confidentialityLevel,
  className = "",
  testId = SECURITY_VISUALIZATION_WIDGET_IDS.root,
}) => {
  // Get error/loading state from the security metrics service
  const { error, isLoading } = useSecurityMetricsService();

  // Calculate security score based on selected levels
  const securityScore = useMemo(() => {
    // Normalize security levels to ensure consistent case handling
    const normalizedAvailability = normalizeSecurityLevel(availabilityLevel);
    const normalizedIntegrity = normalizeSecurityLevel(integrityLevel);
    const normalizedConfidentiality =
      normalizeSecurityLevel(confidentialityLevel);

    // Get security level values using normalized values
    const availabilityValue = getSecurityLevelValue(normalizedAvailability);
    const integrityValue = getSecurityLevelValue(normalizedIntegrity);
    const confidentialityValue = getSecurityLevelValue(
      normalizedConfidentiality
    );

    const totalScore =
      availabilityValue + integrityValue + confidentialityValue;
    const maxPossibleScore = 12; // 3 components x maximum value of 4

    return Math.round((totalScore / maxPossibleScore) * 100);
  }, [availabilityLevel, integrityLevel, confidentialityLevel]);

  // Use the business impact level to determine risk using utility functions
  const riskLevel = useMemo(() => {
    // Calculate impact level using the utility function
    const impactLevel = calculateBusinessImpactLevel(
      availabilityLevel,
      integrityLevel,
      confidentialityLevel
    );

    // Use the centralized utility to map impact level to risk level string
    return getRiskLevelFromImpactLevel(impactLevel);
  }, [availabilityLevel, integrityLevel, confidentialityLevel]);

  // Get security recommendations based on security levels
  const getSecurityRecommendations = () => {
    const availabilityValue = getSecurityLevelValue(availabilityLevel);
    const integrityValue = getSecurityLevelValue(integrityLevel);
    const confidentialityValue = getSecurityLevelValue(confidentialityLevel);

    // If all security levels are the same and high, show balanced recommendation
    if (
      availabilityLevel === integrityLevel &&
      integrityLevel === confidentialityLevel
    ) {
      if (availabilityLevel === "High" || availabilityLevel === "Very High") {
        return (
          <div
            data-testid={SECURITY_VISUALIZATION_WIDGET_IDS.section('balanced-recommendation')}
            className={cn("p-md bg-green-50 dark:bg-green-900/20 rounded-lg mt-md")}
          >
            <p className={cn(WidgetClasses.body, "text-sm")}>
              Your security posture is well-balanced with strong controls across
              all CIA components.
            </p>
          </div>
        );
      }
    }

    // Component-specific recommendations
    return (
      <div className={cn("space-y-xs mt-md")} data-testid={SECURITY_VISUALIZATION_WIDGET_IDS.section('recommendations')}>
        {availabilityValue < 2 && (
          <div className={cn("p-sm bg-info-light/10 dark:bg-info-dark/20 rounded")}>
            <p className={cn(WidgetClasses.body, "text-sm")}>
              Consider improving availability controls to ensure business
              continuity.
            </p>
          </div>
        )}
        {integrityValue < 3 && (
          <div className={cn("p-sm bg-success-light/10 dark:bg-success-dark/20 rounded")}>
            <p className={cn(WidgetClasses.body, "text-sm")}>
              Enhance data validation mechanisms and change management to
              improve integrity.
            </p>
          </div>
        )}
        {confidentialityValue < 2 && (
          <div className={cn("p-sm bg-primary-light/10 dark:bg-primary-dark/20 rounded-md")}>
            <p className={cn(WidgetClasses.body, "text-sm")}>
              Strengthen access controls and data protection to improve
              confidentiality.
            </p>
          </div>
        )}
      </div>
    );
  };

  return (
    <WidgetErrorBoundary widgetName="Security Visualization">
      <WidgetContainer
        title={WIDGET_TITLES.SECURITY_VISUALIZATION || "Security Visualization"}
        icon={WIDGET_ICONS.SECURITY_VISUALIZATION || "📊"}
        className={className}
        testId={testId}
        isLoading={isLoading}
        error={error}
      >
      <div 
        className={cn("p-md sm:p-lg")}
        role="region"
        aria-label={getWidgetAriaDescription(
          "Security Visualization",
          "Visual representation of security posture with CIA triad metrics, security score, and risk level"
        )}
      >
        {/* Security score section */}
        <section 
          className={cn(WidgetClasses.section)}
          aria-labelledby="security-posture-heading"
        >
          <h3 id="security-posture-heading" className={cn(WidgetClasses.subheading)}>Security Posture</h3>
          <div 
            className={cn("p-md bg-neutral-light/10 dark:bg-neutral-dark/20 rounded-md")}
            role="group"
            aria-label="Security metrics"
          >
            <div className={cn(WidgetClasses.flexRow, "justify-between items-center mb-md")}>
              <div>
                <div className={cn(WidgetClasses.body)}>
                  Security Score
                </div>
                <div
                  className="text-title font-bold"
                  data-testid={SECURITY_VISUALIZATION_WIDGET_IDS.value('security-score')}
                  aria-label={`Security score: ${securityScore} out of 100`}
                >
                  {securityScore}
                </div>
              </div>
              <div>
                <div className={cn(WidgetClasses.body)}>
                  Risk Level
                </div>
                <div
                  className={`text-xl font-bold ${getRiskLevelColor(
                    riskLevel
                  )}`}
                  data-testid={SECURITY_VISUALIZATION_WIDGET_IDS.label('risk-level')}
                  role="status"
                  aria-label={`Risk level: ${riskLevel}`}
                >
                  {riskLevel}
                </div>
              </div>
            </div>

            {/* Score gauge */}
            <div className={cn("mb-sm")} aria-label="Security score visualization">
              <div className={cn(WidgetClasses.body, "text-caption mb-xs")}>
                Security Level
              </div>
              <div className={cn("w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5")}>
                <div
                  className={`h-2.5 rounded-full ${getSecurityScoreColorClass(
                    securityScore
                  )}`}
                  style={{ width: `${securityScore}%` }}
                  data-testid={SECURITY_VISUALIZATION_WIDGET_IDS.section('security-score-bar')}
                ></div>
              </div>
              <div className={cn(WidgetClasses.body, "flex justify-between text-caption mt-xs")}>
                <div>Critical</div>
                <div>High</div>
                <div>Medium</div>
                <div>Low</div>
                <div>Minimal</div>
              </div>
            </div>
          </div>
        </section>

        {/* Security Radar Chart using existing component */}
        <div className={cn(WidgetClasses.section)}>
          <h3 className={cn(WidgetClasses.subheading)}>Security Components</h3>

          {/* Reuse the RadarChart component with responsive container */}
          <div className={cn(WidgetClasses.cardWhite, "p-md border-neutral-light dark:border-neutral-dark")}>
            <div className="w-full aspect-square max-h-[400px] mx-auto">
              <RadarChart
                availabilityLevel={availabilityLevel}
                integrityLevel={integrityLevel}
                confidentialityLevel={confidentialityLevel}
                testId={`${testId}-radar-chart`}
              />
            </div>
          </div>
        </div>

        {/* Component Details Section */}
        <div className={cn(WidgetClasses.section)}>
          <h3 className={cn(WidgetClasses.subheading)}>Component Details</h3>
          <div className={cn("grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-sm")}>
            {/* Confidentiality component */}
            <div
              className={cn("p-md bg-primary-light/10 dark:bg-primary-dark/20 rounded-md")}
              data-testid={SECURITY_VISUALIZATION_WIDGET_IDS.section('confidentiality-component')}
            >
              <div className={cn(WidgetClasses.flexRow, "items-center justify-between mb-sm")}>
                <div className="text-body-lg font-medium text-primary-dark dark:text-primary-light">
                  Confidentiality
                </div>
                <SecurityLevelIndicator
                  level={confidentialityLevel}
                  testId="confidentiality-level-indicator"
                />
              </div>
              <div className={cn("w-full bg-gray-200 dark:bg-gray-700 rounded-full h-1.5")}>
                <div
                  className={cn("bg-primary h-1.5 rounded-full")}
                  style={{
                    width: `${
                      (getSecurityLevelValue(confidentialityLevel) / 4) * 100
                    }%`,
                  }}
                  data-testid={SECURITY_VISUALIZATION_WIDGET_IDS.section('confidentiality-gauge')}
                ></div>
              </div>
            </div>

            {/* Integrity component */}
            <div
              className={cn("p-md bg-green-50 dark:bg-green-900/20 rounded-lg")}
              data-testid={SECURITY_VISUALIZATION_WIDGET_IDS.section('integrity-component')}
            >
              <div className={cn(WidgetClasses.flexRow, "items-center justify-between mb-sm")}>
                <div className="text-body-lg font-medium text-green-800 dark:text-green-300">
                  Integrity
                </div>
                <SecurityLevelIndicator
                  level={integrityLevel}
                  testId="integrity-level-indicator"
                />
              </div>
              <div className={cn("w-full bg-gray-200 dark:bg-gray-700 rounded-full h-1.5")}>
                <div
                  className={cn("bg-green-500 h-1.5 rounded-full")}
                  style={{
                    width: `${
                      (getSecurityLevelValue(integrityLevel) / 4) * 100
                    }%`,
                  }}
                  data-testid={SECURITY_VISUALIZATION_WIDGET_IDS.section('integrity-gauge')}
                ></div>
              </div>
            </div>

            {/* Availability component */}
            <div
              className={cn("p-md bg-blue-50 dark:bg-blue-900/20 rounded-lg")}
              data-testid={SECURITY_VISUALIZATION_WIDGET_IDS.section('availability-component')}
            >
              <div className={cn(WidgetClasses.flexRow, "items-center justify-between mb-sm")}>
                <div className="text-body-lg font-medium text-blue-800 dark:text-blue-300">
                  Availability
                </div>
                <SecurityLevelIndicator
                  level={availabilityLevel}
                  testId="availability-level-indicator"
                />
              </div>
              <div className={cn("w-full bg-gray-200 dark:bg-gray-700 rounded-full h-1.5")}>
                <div
                  className={cn("bg-blue-500 h-1.5 rounded-full")}
                  style={{
                    width: `${
                      (getSecurityLevelValue(availabilityLevel) / 4) * 100
                    }%`,
                  }}
                  data-testid={SECURITY_VISUALIZATION_WIDGET_IDS.section('availability-gauge')}
                ></div>
              </div>
            </div>
          </div>
        </div>

        {/* Recommendations Section - Added for test expectation */}
        {getSecurityRecommendations()}

        {/* Explanation section */}
        <div className={cn("p-md bg-blue-50 dark:bg-blue-900/20 rounded-lg mt-md")}>
          <h3 className={cn("text-body-lg font-medium mb-sm")}>
            Security Visualization Key
          </h3>
          <p className={cn(WidgetClasses.body, "mb-sm")}>
            The security score represents your overall security posture based on
            your CIA triad levels. The risk level indicates the potential
            business risk associated with your current security posture.
          </p>
          <div className={cn("grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-sm text-xs")}>
            <div className={cn("p-xs bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300 rounded text-center")}>
              Critical Risk
            </div>
            <div className={cn("p-xs bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-300 rounded text-center")}>
              High Risk
            </div>
            <div className={cn("p-xs bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300 rounded text-center")}>
              Medium Risk
            </div>
            <div className={cn("p-xs bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300 rounded text-center")}>
              Low Risk
            </div>
            <div className={cn("p-xs bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300 rounded text-center")}>
              Minimal Risk
            </div>
          </div>
        </div>
      </div>
    </WidgetContainer>
    </WidgetErrorBoundary>
  );
};

export default SecurityVisualizationWidget;
