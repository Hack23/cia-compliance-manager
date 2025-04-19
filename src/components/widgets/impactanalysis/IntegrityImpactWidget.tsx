import React, { useMemo } from "react";
import { WIDGET_ICONS, WIDGET_TITLES } from "../../../constants/appConstants";
import { INTEGRITY_IMPACT_TEST_IDS } from "../../../constants/testIds";
import {
  getDefaultErrorRate,
  getDefaultValidationLevel,
} from "../../../data/ciaOptionsData";
import { useCIAContentService } from "../../../hooks/useCIAContentService";
import { ComponentImpactBaseProps } from "../../../types/widgets";
import { getSecurityLevelBackgroundClass } from "../../../utils/colorUtils";
import { getDefaultComponentImpact } from "../../../utils/riskUtils";
import { normalizeSecurityLevel } from "../../../utils/securityLevelUtils";
import { isNullish } from "../../../utils/typeGuards";
import BusinessImpactSection from "../../common/BusinessImpactSection";
import SecurityLevelBadge from "../../common/SecurityLevelBadge";
import WidgetContainer from "../../common/WidgetContainer";

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
  level, // For backward compatibility
  availabilityLevel,
  integrityLevel,
  confidentialityLevel,
  className = "",
  testId = INTEGRITY_IMPACT_TEST_IDS.INTEGRITY_IMPACT_PREFIX,
  showExtendedDetails = false,
}) => {
  // Use the utility for consistent security level normalization
  const effectiveLevel = normalizeSecurityLevel(
    integrityLevel || level || "Moderate"
  );

  // Get CIA content service
  const { ciaContentService, error, isLoading } = useCIAContentService();

  // Get integrity details from service
  const integrityDetails = useMemo(() => {
    try {
      if (isNullish(ciaContentService) || isNullish(effectiveLevel)) {
        return null;
      }

      const details = ciaContentService.getComponentDetails(
        "integrity",
        effectiveLevel
      );
      return isNullish(details) ? null : details;
    } catch (err) {
      console.error("Error getting integrity details:", err);
      return null;
    }
  }, [ciaContentService, effectiveLevel]);

  // Get business impact from service with fallback to our utility
  const businessImpact = useMemo(() => {
    try {
      if (isNullish(ciaContentService) || isNullish(effectiveLevel)) {
        return getDefaultComponentImpact("integrity", effectiveLevel);
      }

      const impact = ciaContentService.getBusinessImpact(
        "integrity",
        effectiveLevel
      );
      return impact || getDefaultComponentImpact("integrity", effectiveLevel);
    } catch (err) {
      console.error("Error getting integrity business impact:", err);
      return getDefaultComponentImpact("integrity", effectiveLevel);
    }
  }, [ciaContentService, effectiveLevel]);

  // Get recommendations from service
  const recommendations = useMemo(() => {
    try {
      if (isNullish(ciaContentService) || isNullish(effectiveLevel)) {
        return [];
      }

      return (
        ciaContentService.getRecommendations("integrity", effectiveLevel) || []
      );
    } catch (err) {
      console.error("Error getting recommendations:", err);
      return [];
    }
  }, [ciaContentService, effectiveLevel]);

  // Get validation level with fallback to utility function
  const validationLevel = useMemo(() => {
    if (!isNullish(integrityDetails) && integrityDetails.validationLevel) {
      return integrityDetails.validationLevel;
    }
    return getDefaultValidationLevel(effectiveLevel);
  }, [integrityDetails, effectiveLevel]);

  // Get error rate with fallback to utility function
  const errorRate = useMemo(() => {
    if (!isNullish(integrityDetails) && integrityDetails.errorRate) {
      return integrityDetails.errorRate;
    }
    return getDefaultErrorRate(effectiveLevel);
  }, [integrityDetails, effectiveLevel]);

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
        {/* Security level indicator */}
        <div className="mb-4">
          <SecurityLevelBadge
            category="Integrity"
            level={effectiveLevel}
            // Use utility for consistent styling
            colorClass={getSecurityLevelBackgroundClass("green")}
            textClass="text-green-800 dark:text-green-300"
            testId={`${testId}-integrity-badge`}
          />
        </div>

        {/* Business impact */}
        {businessImpact && (
          <div
            className="mt-4"
            data-testid={`${testId}-business-impact-container`}
          >
            <BusinessImpactSection
              impact={businessImpact}
              color="green"
              testId={`${testId}-business-impact`}
            />
          </div>
        )}

        {/* Data Integrity metrics */}
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
                {validationLevel}
              </div>
            </div>
            <div className="p-2 bg-white dark:bg-gray-800 rounded-lg">
              <div className="text-sm font-medium mb-1">
                Acceptable Error Rate:
              </div>
              <div className="text-lg font-bold text-green-600 dark:text-green-400">
                {errorRate}
              </div>
            </div>
          </div>
        </div>

        {/* Recommendations (visible only when showExtendedDetails is true) */}
        {showExtendedDetails && recommendations.length > 0 && (
          <div className="mt-4">
            <h3 className="text-lg font-medium mb-2">Recommendations</h3>
            <ul className="list-disc pl-5 space-y-1">
              {recommendations.map((rec, index) => (
                <li
                  key={index}
                  className="text-sm text-gray-600 dark:text-gray-400"
                >
                  {rec}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </WidgetContainer>
  );
};

export default IntegrityImpactWidget;
