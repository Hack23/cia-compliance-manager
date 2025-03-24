import React, { useMemo } from "react";
import { WIDGET_ICONS, WIDGET_TITLES } from "../../../constants/appConstants";
import { INTEGRITY_IMPACT_TEST_IDS } from "../../../constants/testIds";
import { useCIAContentService } from "../../../hooks/useCIAContentService";
import { SecurityLevel } from "../../../types/cia";
import { getRiskLevelFromSecurityLevel } from "../../../utils/riskUtils";
import BusinessImpactSection from "../../common/BusinessImpactSection";
import SecurityLevelBadge from "../../common/SecurityLevelBadge";
import WidgetContainer from "../../common/WidgetContainer";

/**
 * Base props shared by all CIA component impact widgets
 */
interface ComponentImpactBaseProps {
  /**
   * Security level to display impact for
   */
  level: SecurityLevel;

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
 * Props for IntegrityImpactWidget component
 */
export interface IntegrityImpactWidgetProps extends ComponentImpactBaseProps {
  /**
   * Flag to show extended details (optional)
   */
  showExtendedDetails?: boolean;
}

/**
 * Widget that displays the impact of selected integrity level
 *
 * ## Business Perspective
 *
 * This widget helps stakeholders understand the business impact of
 * integrity controls, including how data accuracy and validation
 * mechanisms protect business operations and decision-making. 📊
 */
const IntegrityImpactWidget: React.FC<IntegrityImpactWidgetProps> = ({
  level,
  className = "",
  testId = INTEGRITY_IMPACT_TEST_IDS.INTEGRITY_IMPACT_PREFIX,
  showExtendedDetails = false,
}) => {
  // Get CIA content service
  const { ciaContentService, error, isLoading } = useCIAContentService();

  // Calculate risk level based on security level
  const riskLevel = useMemo(
    () => getRiskLevelFromSecurityLevel(level),
    [level]
  );

  // Get integrity details from service if available
  const integrityDetails = useMemo(() => {
    if (!ciaContentService) return null;

    try {
      // Safely check if the method exists before calling it
      // Using type assertion with unknown first for better type safety
      const service = ciaContentService as unknown as {
        getIntegrityDetails?: (level: SecurityLevel) => any;
      };

      if (typeof service.getIntegrityDetails === "function") {
        return service.getIntegrityDetails(level);
      }
      return null;
    } catch (err) {
      console.error("Error getting integrity details:", err);
      return null;
    }
  }, [ciaContentService, level]);

  // Get business impact data from service if available
  const businessImpact = useMemo(() => {
    if (!ciaContentService) return null;

    try {
      if (typeof ciaContentService.getBusinessImpact === "function") {
        return ciaContentService.getBusinessImpact("integrity", level);
      }
      return null;
    } catch (err) {
      console.error("Error getting integrity business impact:", err);
      return null;
    }
  }, [ciaContentService, level]);

  // Format risk description
  const formatBusinessRisk = (risk: string, component: string): string => {
    const riskDescriptions: Record<string, string> = {
      "Critical Risk": `Critical risk to ${component} means data may be completely unusable or unreliable, potentially causing severe business impact.`,
      "High Risk": `High risk to ${component} means data accuracy is significantly compromised, likely leading to harmful business decisions.`,
      "Medium Risk": `Medium risk to ${component} means some data validation controls are in place, but gaps may allow errors to occur occasionally.`,
      "Low Risk": `Low risk to ${component} means good data validation controls are in place, with occasional minor errors possible.`,
      "Minimal Risk": `Minimal risk to ${component} means comprehensive data validation and protection mechanisms are in place.`,
    };

    return (
      riskDescriptions[risk] || `Unknown risk level for ${component} integrity.`
    );
  };

  return (
    <WidgetContainer
      title={WIDGET_TITLES.INTEGRITY_IMPACT || "Integrity Impact Analysis"}
      icon={WIDGET_ICONS.INTEGRITY_IMPACT || "✓"}
      className={className}
      testId={testId}
      isLoading={isLoading}
      error={error}
    >
      <div className="p-4">
        {/* Integrity impact summary */}
        <div className="mb-4 p-3 bg-blue-50 dark:bg-blue-900 dark:bg-opacity-20 rounded-lg">
          <p className="text-sm">
            This widget analyzes the business impact of your chosen integrity
            level, including data accuracy requirements, validation controls,
            and potential consequences of data corruption.
          </p>
        </div>

        {/* Security level indicator */}
        <div className="mb-4">
          <SecurityLevelBadge
            category="Integrity"
            level={level}
            colorClass="bg-green-100 dark:bg-green-900 dark:bg-opacity-20"
            textClass="text-green-800 dark:text-green-300"
            testId={`${testId}-level`}
          />
        </div>

        {/* Integrity risk level */}
        <div
          className="mb-4 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg"
          data-testid={`${testId}-risk-level`}
        >
          <h3 className="text-lg font-medium mb-2">Risk Assessment</h3>
          <div className="flex items-center justify-between">
            <span className="text-gray-600 dark:text-gray-400">
              Risk Level:
            </span>
            <span
              className={`${
                riskLevel.includes("Critical") || riskLevel.includes("High")
                  ? "text-red-600 dark:text-red-400"
                  : riskLevel.includes("Medium")
                  ? "text-yellow-600 dark:text-yellow-400"
                  : "text-green-600 dark:text-green-400"
              } font-medium`}
            >
              {riskLevel}
            </span>
          </div>
          <div className="mt-2 text-sm text-gray-600 dark:text-gray-400">
            {formatBusinessRisk(riskLevel, "integrity")}
          </div>
        </div>

        {/* Technical Details */}
        <div
          className="mb-4 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg"
          data-testid={`${testId}-description`}
        >
          <h3 className="text-lg font-medium mb-2">Technical Description</h3>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            {integrityDetails?.description ||
              `${level} integrity level focuses on ensuring data is accurate, reliable, and protected from unauthorized modification. This involves implementing controls to validate data inputs, detect unauthorized changes, and maintain data consistency across systems.`}
          </p>
        </div>

        {/* Recovery metrics */}
        {integrityDetails && (
          <div
            className="mb-4 p-3 bg-green-50 dark:bg-green-900 dark:bg-opacity-20 rounded-lg"
            data-testid={`${testId}-metrics`}
          >
            <h3 className="text-lg font-medium mb-2 text-green-800 dark:text-green-300">
              Data Integrity Metrics
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-2 bg-white dark:bg-gray-800 rounded-lg">
                <div className="text-sm font-medium mb-1">
                  Data Validation Controls:
                </div>
                <div className="text-lg font-bold text-green-600 dark:text-green-400">
                  {integrityDetails.validationLevel || "Standard"}
                </div>
              </div>
              <div className="p-2 bg-white dark:bg-gray-800 rounded-lg">
                <div className="text-sm font-medium mb-1">
                  Acceptable Error Rate:
                </div>
                <div className="text-lg font-bold text-green-600 dark:text-green-400">
                  {integrityDetails.errorRate || "< 0.1%"}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Business impact */}
        <div className="mt-4" data-testid={`${testId}-business-impact`}>
          {businessImpact && (
            <BusinessImpactSection
              impact={businessImpact}
              color="green"
              testId={`${testId}-business-impact`}
            />
          )}
        </div>

        {/* Recommendations */}
        {integrityDetails?.recommendations && (
          <div
            className="mt-4 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg"
            data-testid={`${testId}-recommendations`}
          >
            <h3 className="text-lg font-medium mb-2">Recommendations</h3>
            <ul className="space-y-2 text-sm">
              {integrityDetails.recommendations.map(
                (recommendation: string, index: number) => (
                  <li
                    key={index}
                    className="flex items-start"
                    data-testid={`${testId}-recommendation-${index}`}
                  >
                    <span className="mr-2 text-green-500">✓</span>
                    <span>{recommendation}</span>
                  </li>
                )
              )}
            </ul>
          </div>
        )}
      </div>
    </WidgetContainer>
  );
};

export default IntegrityImpactWidget;
