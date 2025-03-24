import React, { useMemo } from "react";
import { WIDGET_ICONS, WIDGET_TITLES } from "../../../constants/appConstants";
import { VALUE_CREATION_TEST_IDS } from "../../../constants/testIds";
import { useCIAContentService } from "../../../hooks/useCIAContentService";
import { SecurityLevel } from "../../../types/cia";
import { SecurityRiskScore } from "../../charts/SecurityRiskScore";
import WidgetContainer from "../../common/WidgetContainer";

interface ValueCreationWidgetProps {
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
   * Optional test ID for testing
   */
  testId?: string;
}

/**
 * Display value creation information for chosen security levels
 *
 * ## Business Perspective
 *
 * This widget helps stakeholders understand the business value created
 * by security investments, articulating benefits beyond just risk reduction.
 * It provides clear value statements that can be used in business cases and
 * executive communications. 💰
 */
const ValueCreationWidget: React.FC<ValueCreationWidgetProps> = ({
  availabilityLevel,
  integrityLevel,
  confidentialityLevel,
  className = "",
  testId = "value-creation-widget",
}) => {
  // Get CIA content service for value creation data
  const { ciaContentService, error, isLoading } = useCIAContentService();

  // Calculate overall security level
  const securityScore = useMemo(() => {
    const levelValues: Record<SecurityLevel, number> = {
      None: 0,
      Low: 1,
      Moderate: 2,
      High: 3,
      "Very High": 4,
    };

    const totalValue =
      levelValues[availabilityLevel] +
      levelValues[integrityLevel] +
      levelValues[confidentialityLevel];
    return Math.round((totalValue / 12) * 100); // 12 is max possible (3 × Very High)
  }, [availabilityLevel, integrityLevel, confidentialityLevel]);

  // Get business value metrics
  const valueMetrics = useMemo(() => {
    if (!ciaContentService) return null;

    try {
      // Use type assertion with 'any' inside the condition
      if (typeof (ciaContentService as any).getValueCreation === "function") {
        return (
          (ciaContentService as any).getValueCreation(
            availabilityLevel,
            integrityLevel,
            confidentialityLevel
          ) || null
        );
      }
      return null;
    } catch (err) {
      console.error("Error getting value creation data:", err);
      return null;
    }
  }, [
    ciaContentService,
    availabilityLevel,
    integrityLevel,
    confidentialityLevel,
  ]);

  // Get component-specific value statements
  const availabilityValue = useMemo(() => {
    if (!ciaContentService) return null;

    try {
      // Use type assertion with 'any' inside the condition
      if (
        typeof (ciaContentService as any).getComponentBusinessValue ===
        "function"
      ) {
        return (
          (ciaContentService as any).getComponentBusinessValue(
            "availability",
            availabilityLevel
          ) || null
        );
      }
      return null;
    } catch (err) {
      console.error("Error getting availability value data:", err);
      return null;
    }
  }, [ciaContentService, availabilityLevel]);

  const integrityValue = useMemo(() => {
    if (!ciaContentService) return null;

    try {
      // Use type assertion with 'any' inside the condition
      if (
        typeof (ciaContentService as any).getComponentBusinessValue ===
        "function"
      ) {
        return (
          (ciaContentService as any).getComponentBusinessValue(
            "integrity",
            integrityLevel
          ) || null
        );
      }
      return null;
    } catch (err) {
      console.error("Error getting integrity value data:", err);
      return null;
    }
  }, [ciaContentService, integrityLevel]);

  const confidentialityValue = useMemo(() => {
    if (!ciaContentService) return null;

    try {
      // Use type assertion with 'any' inside the condition
      if (
        typeof (ciaContentService as any).getComponentBusinessValue ===
        "function"
      ) {
        return (
          (ciaContentService as any).getComponentBusinessValue(
            "confidentiality",
            confidentialityLevel
          ) || null
        );
      }
      return null;
    } catch (err) {
      console.error("Error getting confidentiality value data:", err);
      return null;
    }
  }, [ciaContentService, confidentialityLevel]);

  return (
    <WidgetContainer
      title={WIDGET_TITLES.VALUE_CREATION || "Business Value Creation"}
      icon={WIDGET_ICONS.VALUE_CREATION || "💰"}
      className={className}
      testId={testId}
      isLoading={isLoading}
      error={error}
    >
      <div className="p-4">
        {/* Value creation summary */}
        <div className="mb-4 p-3 bg-blue-50 dark:bg-blue-900 dark:bg-opacity-20 rounded-lg">
          <p className="text-sm">
            This widget shows the business value created by implementing your
            selected security levels, including financial benefits, operational
            improvements, and competitive advantages.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Value Creation Metrics */}
          <div>
            <h3 className="text-lg font-medium mb-3">Value Metrics</h3>

            <div className="grid grid-cols-2 gap-4">
              <div
                className="p-3 bg-gray-50 dark:bg-gray-800 rounded-lg flex flex-col items-center justify-center"
                data-testid={
                  VALUE_CREATION_TEST_IDS?.VALUE_SCORE || "value-score"
                }
              >
                <SecurityRiskScore score={securityScore} label="Value Score" />
              </div>

              <div
                className="p-3 bg-gray-50 dark:bg-gray-800 rounded-lg"
                data-testid={
                  VALUE_CREATION_TEST_IDS?.ROI_ESTIMATE || "roi-estimate"
                }
              >
                <div className="text-sm font-medium mb-1">Estimated ROI</div>
                <div className="text-xl font-bold text-green-600 dark:text-green-400">
                  {valueMetrics?.roi || "15-25%"}
                </div>
                <div className="text-xs text-gray-600 dark:text-gray-400">
                  {valueMetrics?.roiTimeframe || "Over 2 years"}
                </div>
              </div>

              <div
                className="p-3 bg-gray-50 dark:bg-gray-800 rounded-lg"
                data-testid={
                  VALUE_CREATION_TEST_IDS?.COST_SAVINGS || "cost-savings"
                }
              >
                <div className="text-sm font-medium mb-1">Cost Savings</div>
                <div className="text-xl font-bold text-green-600 dark:text-green-400">
                  {valueMetrics?.costSavings || "$50K-100K"}
                </div>
                <div className="text-xs text-gray-600 dark:text-gray-400">
                  {valueMetrics?.savingsTimeframe || "Annual"}
                </div>
              </div>

              <div
                className="p-3 bg-gray-50 dark:bg-gray-800 rounded-lg"
                data-testid={
                  VALUE_CREATION_TEST_IDS?.PRODUCTIVITY || "productivity"
                }
              >
                <div className="text-sm font-medium mb-1">
                  Productivity Gain
                </div>
                <div className="text-xl font-bold text-blue-600 dark:text-blue-400">
                  {valueMetrics?.productivityGain || "10-15%"}
                </div>
                <div className="text-xs text-gray-600 dark:text-gray-400">
                  {valueMetrics?.productivityDetails || "Reduced downtime"}
                </div>
              </div>
            </div>

            {/* Business Benefits */}
            <div className="mt-4">
              <h3 className="text-lg font-medium mb-3">Business Benefits</h3>
              <ul className="space-y-2">
                {valueMetrics?.benefits?.map(
                  (benefit: string, index: number) => (
                    <li
                      key={index}
                      className="p-2 bg-gray-50 dark:bg-gray-800 rounded-lg flex items-start"
                      data-testid={`value-benefit-${index}`}
                    >
                      <span className="mr-2 text-green-500">✓</span>
                      <span>{benefit}</span>
                    </li>
                  )
                ) || (
                  <>
                    <li className="p-2 bg-gray-50 dark:bg-gray-800 rounded-lg flex items-start">
                      <span className="mr-2 text-green-500">✓</span>
                      <span>Improved customer trust and retention</span>
                    </li>
                    <li className="p-2 bg-gray-50 dark:bg-gray-800 rounded-lg flex items-start">
                      <span className="mr-2 text-green-500">✓</span>
                      <span>
                        Reduced risk of security incidents and data breaches
                      </span>
                    </li>
                    <li className="p-2 bg-gray-50 dark:bg-gray-800 rounded-lg flex items-start">
                      <span className="mr-2 text-green-500">✓</span>
                      <span>
                        Enhanced compliance with regulatory requirements
                      </span>
                    </li>
                  </>
                )}
              </ul>
            </div>
          </div>

          {/* Component-specific Value */}
          <div>
            <h3 className="text-lg font-medium mb-3">
              Component Value Creation
            </h3>

            {/* Availability Value */}
            <div
              className="mb-4 p-3 bg-blue-50 dark:bg-blue-900 dark:bg-opacity-20 rounded-lg border-l-4 border-blue-500"
              data-testid={
                VALUE_CREATION_TEST_IDS?.AVAILABILITY_VALUE ||
                "availability-value"
              }
            >
              <h4 className="text-md font-medium flex items-center text-blue-700 dark:text-blue-300">
                <span className="mr-2">⏱️</span>
                Availability Value ({availabilityLevel})
              </h4>
              <p className="text-sm mt-1">
                {availabilityValue?.summary ||
                  `${availabilityLevel} availability helps your business by reducing downtime and ensuring systems are accessible when needed.`}
              </p>
              {availabilityValue?.financialImpact && (
                <div className="mt-2 text-sm">
                  <span className="font-medium">Financial Impact: </span>
                  {availabilityValue.financialImpact}
                </div>
              )}
            </div>

            {/* Integrity Value */}
            <div
              className="mb-4 p-3 bg-green-50 dark:bg-green-900 dark:bg-opacity-20 rounded-lg border-l-4 border-green-500"
              data-testid={
                VALUE_CREATION_TEST_IDS?.INTEGRITY_VALUE || "integrity-value"
              }
            >
              <h4 className="text-md font-medium flex items-center text-green-700 dark:text-green-300">
                <span className="mr-2">✓</span>
                Integrity Value ({integrityLevel})
              </h4>
              <p className="text-sm mt-1">
                {integrityValue?.summary ||
                  `${integrityLevel} integrity ensures your data is accurate and trustworthy, preventing costly errors and maintaining stakeholder confidence.`}
              </p>
              {integrityValue?.businessAdvantage && (
                <div className="mt-2 text-sm">
                  <span className="font-medium">Business Advantage: </span>
                  {integrityValue.businessAdvantage}
                </div>
              )}
            </div>

            {/* Confidentiality Value */}
            <div
              className="mb-4 p-3 bg-purple-50 dark:bg-purple-900 dark:bg-opacity-20 rounded-lg border-l-4 border-purple-500"
              data-testid={
                VALUE_CREATION_TEST_IDS?.CONFIDENTIALITY_VALUE ||
                "confidentiality-value"
              }
            >
              <h4 className="text-md font-medium flex items-center text-purple-700 dark:text-purple-300">
                <span className="mr-2">🔒</span>
                Confidentiality Value ({confidentialityLevel})
              </h4>
              <p className="text-sm mt-1">
                {confidentialityValue?.summary ||
                  `${confidentialityLevel} confidentiality protects your sensitive data, maintaining customer trust and reducing the risk of regulatory penalties.`}
              </p>
              {confidentialityValue?.competitiveAdvantage && (
                <div className="mt-2 text-sm">
                  <span className="font-medium">Competitive Advantage: </span>
                  {confidentialityValue.competitiveAdvantage}
                </div>
              )}
            </div>

            {/* Strategic Value */}
            <div
              className="p-3 bg-gray-50 dark:bg-gray-800 rounded-lg"
              data-testid={
                VALUE_CREATION_TEST_IDS?.STRATEGIC_VALUE || "strategic-value"
              }
            >
              <h4 className="text-md font-medium mb-1">Strategic Value</h4>
              <p className="text-sm">
                {valueMetrics?.strategicValue ||
                  "Your security posture aligns with industry standards and provides a foundation for sustainable growth. Organizations with mature security practices typically outperform peers in both customer acquisition and retention."}
              </p>
            </div>
          </div>
        </div>
      </div>
    </WidgetContainer>
  );
};

export default ValueCreationWidget;
