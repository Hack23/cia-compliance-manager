import React, { useMemo } from "react";
import { WIDGET_ICONS, WIDGET_TITLES } from "../../../constants/appConstants";
import { VALUE_CREATION_TEST_IDS } from "../../../constants/testIds";
import { useCIAContentService } from "../../../hooks/useCIAContentService";
import { SecurityLevel } from "../../../types/cia";
import SecurityLevelBadge from "../../common/SecurityLevelBadge";
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
  const { ciaContentService } = useCIAContentService();

  // Calculate overall security level
  const overallSecurityLevel = useMemo(() => {
    // Convert security levels to numeric values
    const levelValues: Record<SecurityLevel, number> = {
      None: 0,
      Low: 1,
      Moderate: 2,
      High: 3,
      "Very High": 4,
    };

    // Calculate average with higher weight for confidentiality
    const avgValue =
      (levelValues[availabilityLevel] +
        levelValues[integrityLevel] +
        levelValues[confidentialityLevel] * 1.5) /
      3.5;

    // Round to nearest level
    const roundedValue = Math.round(avgValue);

    // Map back to security level
    const levels: SecurityLevel[] = [
      "None",
      "Low",
      "Moderate",
      "High",
      "Very High",
    ];
    return levels[roundedValue];
  }, [availabilityLevel, integrityLevel, confidentialityLevel]);

  // Get ROI estimate for the current security level
  const roiEstimate = useMemo(() => {
    if (!ciaContentService) return null;
    return ciaContentService.getROIEstimate(overallSecurityLevel);
  }, [ciaContentService, overallSecurityLevel]);

  // Get value creation title for the current security level
  const valueTitle = useMemo(() => {
    // Use predefined titles based on security level
    const titles: Record<SecurityLevel, string> = {
      None: "No Security Controls - Maximum Risk",
      Low: "Basic Security Controls",
      Moderate: "Standard Security Controls",
      High: "Advanced Security Controls",
      "Very High": "Maximum Security Controls",
    };
    return titles[overallSecurityLevel] || "Unknown Value";
  }, [overallSecurityLevel]);

  // Get value points for the current security level
  const valuePoints = useMemo(() => {
    // Import from local utils to ensure we have the function available
    if (!ciaContentService) {
      // Fallback implementation if service is not available
      return [
        `Provides ${overallSecurityLevel.toLowerCase()} level of protection`,
        `Meets ${
          overallSecurityLevel === "High" ||
          overallSecurityLevel === "Very High"
            ? "advanced"
            : "basic"
        } security requirements`,
      ];
    }

    // Use the service's getValuePoints if available
    return ciaContentService.getValuePoints?.(overallSecurityLevel) || [];
  }, [ciaContentService, overallSecurityLevel]);

  return (
    <WidgetContainer
      title={WIDGET_TITLES.VALUE_CREATION}
      icon={WIDGET_ICONS.VALUE_CREATION}
      className={className}
      testId={testId}
    >
      <div className="p-4">
        <div
          className="mb-4"
          data-testid={VALUE_CREATION_TEST_IDS.SECURITY_LEVEL}
        >
          <SecurityLevelBadge
            category="Overall Value"
            level={overallSecurityLevel}
          />
        </div>

        <div className="mb-6">
          <h3
            className="text-xl font-medium mb-2"
            data-testid={VALUE_CREATION_TEST_IDS.VALUE_TITLE}
          >
            {valueTitle}
          </h3>
          <p className="text-gray-600 dark:text-gray-300">
            The selected security levels create business value through the
            following benefits:
          </p>
        </div>

        <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg border mb-6">
          <h4 className="text-md font-medium mb-3 flex items-center">
            <span className="mr-2">💡</span>
            Key Value Points
          </h4>
          <ul
            className="list-disc list-inside space-y-2 text-gray-600 dark:text-gray-300"
            data-testid={VALUE_CREATION_TEST_IDS.VALUE_POINTS}
          >
            {valuePoints.length > 0 ? (
              valuePoints.map((point, index) => (
                <li key={index} data-testid={`value-point-${index}`}>
                  {point}
                </li>
              ))
            ) : (
              <li>
                No specific value points available for this security level
              </li>
            )}
          </ul>
        </div>

        {roiEstimate && (
          <div className="bg-green-50 dark:bg-green-900 dark:bg-opacity-20 p-4 rounded-lg border border-green-100 dark:border-green-800">
            <h4 className="text-md font-medium mb-3 flex items-center text-green-800 dark:text-green-300">
              <span className="mr-2">📈</span>
              Return on Investment Estimate
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div
                className="p-3 bg-white dark:bg-gray-800 rounded-lg border border-green-100 dark:border-green-800"
                data-testid={VALUE_CREATION_TEST_IDS.ROI_PERCENTAGE}
              >
                <div className="text-sm font-medium mb-1 text-green-700 dark:text-green-300">
                  ROI Percentage
                </div>
                <div className="text-xl font-bold text-green-800 dark:text-green-300">
                  {roiEstimate.returnRate}
                </div>
              </div>
              {roiEstimate.potentialSavings && (
                <div
                  className="p-3 bg-white dark:bg-gray-800 rounded-lg border border-green-100 dark:border-green-800"
                  data-testid={VALUE_CREATION_TEST_IDS.POTENTIAL_SAVINGS}
                >
                  <div className="text-sm font-medium mb-1 text-green-700 dark:text-green-300">
                    Potential Savings
                  </div>
                  <div className="text-xl font-bold text-green-800 dark:text-green-300">
                    {roiEstimate.potentialSavings}
                  </div>
                </div>
              )}
              {roiEstimate.breakEvenPeriod && (
                <div
                  className="p-3 bg-white dark:bg-gray-800 rounded-lg border border-green-100 dark:border-green-800"
                  data-testid={VALUE_CREATION_TEST_IDS.BREAKEVEN_PERIOD}
                >
                  <div className="text-sm font-medium mb-1 text-green-700 dark:text-green-300">
                    Break-even Period
                  </div>
                  <div className="text-xl font-bold text-green-800 dark:text-green-300">
                    {roiEstimate.breakEvenPeriod}
                  </div>
                </div>
              )}
            </div>
            <p className="mt-3 text-sm text-green-700 dark:text-green-300">
              {roiEstimate.description}
            </p>
          </div>
        )}
      </div>
    </WidgetContainer>
  );
};

export default ValueCreationWidget;
