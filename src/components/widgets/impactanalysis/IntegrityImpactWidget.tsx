import React, { useMemo } from "react";
import { WIDGET_ICONS, WIDGET_TITLES } from "../../../constants/appConstants";
import { INTEGRITY_IMPACT_WIDGET_IDS } from "../../../constants/testIds";
import { INTEGRITY_IMPACT_TEST_IDS } from "../../../constants/testIds";
import {
  getDefaultErrorRate,
  getDefaultValidationLevel,
} from "../../../data/ciaOptionsData";
import { useBusinessImpact, useComponentDetails } from "../../../hooks";
import { useCIAContentService } from "../../../hooks/useCIAContentService";
import type { IntegrityImpactWidgetProps } from "../../../types/widget-props";
import { getSecurityLevelBackgroundClass } from "../../../utils/colorUtils";
import { normalizeSecurityLevel } from "../../../utils/securityLevelUtils";
import { getWidgetAriaDescription } from "../../../utils/accessibility";
import BusinessImpactSection from "../../common/BusinessImpactSection";
import MetricCard from "../../common/MetricCard";
import SecurityLevelBadge from "../../common/SecurityLevelBadge";
import WidgetContainer from "../../common/WidgetContainer";
import WidgetErrorBoundary from "../../common/WidgetErrorBoundary";
import WidgetSection from "../../common/WidgetSection";

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
  availabilityLevel: _availabilityLevel,
  integrityLevel,
  confidentialityLevel: _confidentialityLevel,
  className = "",
  testId = INTEGRITY_IMPACT_TEST_IDS.INTEGRITY_IMPACT_PREFIX,
  showExtendedDetails = false,
}) => {
  // Use the utility for consistent security level normalization
  const effectiveLevel = normalizeSecurityLevel(integrityLevel || "Moderate");

  // Get CIA content service for loading/error states
  const { ciaContentService, error, isLoading } = useCIAContentService();

  // Use custom hooks for data fetching (replaces manual useMemo logic)
  const integrityDetails = useComponentDetails("integrity", effectiveLevel);
  const businessImpact = useBusinessImpact("integrity", effectiveLevel);

  // Get recommendations from service
  const recommendations = useMemo(() => {
    try {
      if (!ciaContentService || !effectiveLevel) {
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
    if (integrityDetails && integrityDetails.validationLevel) {
      return integrityDetails.validationLevel;
    }
    return getDefaultValidationLevel(effectiveLevel);
  }, [integrityDetails, effectiveLevel]);

  // Get error rate with fallback to utility function
  const errorRate = useMemo(() => {
    if (integrityDetails && integrityDetails.errorRate) {
      return integrityDetails.errorRate;
    }
    return getDefaultErrorRate(effectiveLevel);
  }, [integrityDetails, effectiveLevel]);

  return (
    <WidgetErrorBoundary widgetName="Integrity Impact">
      <WidgetContainer
        title={WIDGET_TITLES.INTEGRITY_IMPACT || "Integrity Impact Analysis"}
        icon={WIDGET_ICONS.INTEGRITY_IMPACT || "✓"}
        className={className}
        testId={testId}
        isLoading={isLoading}
        error={error}
      >
      <div 
        className="p-md sm:p-lg"
        role="region"
        aria-label={getWidgetAriaDescription(
          "Integrity Impact Analysis",
          "Business impact of integrity controls including data accuracy and validation mechanisms"
        )}
      >
        {/* Security level indicator */}
        <section 
          className="mb-md"
          aria-labelledby="integrity-level-heading"
        >
          <h3 id="integrity-level-heading" className="sr-only">
            Current Integrity Security Level
          </h3>
          <SecurityLevelBadge
            category="Integrity"
            level={effectiveLevel}
            // Use utility for consistent styling
            colorClass={getSecurityLevelBackgroundClass("green")}
            textClass="text-green-800 dark:text-green-300"
            testId={`${testId}-integrity-badge`}
          />
        </section>

        {/* Business impact */}
        {businessImpact && (
          <div
            className="mt-md"
            data-testid={INTEGRITY_IMPACT_WIDGET_IDS.section('business-impact')}
          >
            <BusinessImpactSection
              impact={businessImpact}
              color="green"
              testId={`${testId}-business-impact`}
            />
          </div>
        )}

        {/* Data Integrity metrics */}
        <WidgetSection
          title="Data Integrity Metrics"
          icon="📊"
          variant="success"
          className="mb-md"
          testId={INTEGRITY_IMPACT_WIDGET_IDS.section('metrics')}
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-md">
            <MetricCard
              label="Data Validation Controls"
              value={validationLevel}
              icon="✓"
              variant="success"
              testId={INTEGRITY_IMPACT_WIDGET_IDS.label('validation')}
            />
            <MetricCard
              label="Acceptable Error Rate"
              value={errorRate}
              icon="📉"
              variant="success"
              testId={INTEGRITY_IMPACT_WIDGET_IDS.label('error-rate')}
            />
          </div>
        </WidgetSection>

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
    </WidgetErrorBoundary>
  );
};

export default IntegrityImpactWidget;
