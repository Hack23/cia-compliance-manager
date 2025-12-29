import React, { useMemo } from "react";
import { WIDGET_ICONS, WIDGET_TITLES } from "../../../constants/appConstants";
import { AVAILABILITY_IMPACT_TEST_IDS, AVAILABILITY_IMPACT_WIDGET_IDS } from "../../../constants/testIds";
import { getDefaultSLAMetrics } from "../../../data/ciaOptionsData";
import { useBusinessImpact, useComponentDetails } from "../../../hooks";
import { useCIAContentService } from "../../../hooks/useCIAContentService";
import type { AvailabilityImpactWidgetProps } from "../../../types/widget-props";
import { getSecurityLevelBackgroundClass } from "../../../utils/colorUtils";
import { normalizeSecurityLevel } from "../../../utils/securityLevelUtils";
import { getWidgetAriaDescription } from "../../../utils/accessibility";
import BusinessImpactSection from "../../common/BusinessImpactSection";
import SecurityLevelBadge from "../../common/SecurityLevelBadge";
import WidgetContainer from "../../common/WidgetContainer";
import WidgetErrorBoundary from "../../common/WidgetErrorBoundary";

// Extended interface for SLA metrics to improve type safety
interface SLAMetrics {
  uptime: string;
  rto: string;
  rpo: string;
  mttr: string;
  sla: string;
}

/**
 * Widget that displays the impact of selected availability level
 *
 * ## Business Perspective
 *
 * This widget helps stakeholders understand the business impact of
 * availability controls, including uptime targets, recovery objectives,
 * and resilience requirements for business continuity. ⏱️
 */
const AvailabilityImpactWidget: React.FC<AvailabilityImpactWidgetProps> = ({
  availabilityLevel,
  integrityLevel: _integrityLevel,
  confidentialityLevel: _confidentialityLevel,
  showExtendedDetails: _showExtendedDetails = false,
  className = "",
  testId = AVAILABILITY_IMPACT_TEST_IDS.AVAILABILITY_IMPACT_PREFIX,
}) => {
  // Use security level utility for consistent normalization
  const effectiveLevel = normalizeSecurityLevel(
    availabilityLevel || "Moderate"
  );

  // Get CIA content service for loading/error states
  const { error, isLoading } = useCIAContentService();

  // Use custom hooks for data fetching (replaces manual useMemo logic)
  const details = useComponentDetails("availability", effectiveLevel);
  const businessImpact = useBusinessImpact("availability", effectiveLevel);

  // Get SLA metrics with fallback to utility function
  const slaMetrics = useMemo((): SLAMetrics => {
    // Get default metrics first
    const defaultMetrics = getDefaultSLAMetrics(effectiveLevel);

    // If no details, return defaults
    if (!details) return defaultMetrics;

    // Return metrics from details with fallbacks to defaults
    return {
      uptime: details.uptime || defaultMetrics.uptime,
      rto: details.rto || defaultMetrics.rto,
      rpo: details.rpo || defaultMetrics.rpo,
      mttr: details.mttr || defaultMetrics.mttr,
      sla: details.sla || defaultMetrics.sla,
    };
  }, [details, effectiveLevel]);

  return (
    <WidgetErrorBoundary widgetName="Availability Impact">
      <WidgetContainer
        title={
          WIDGET_TITLES.AVAILABILITY_IMPACT || "Availability Impact Analysis"
        }
        icon={WIDGET_ICONS.AVAILABILITY_IMPACT || "⏱️"}
        className={`${className} cia-availability`}
        testId={testId}
        isLoading={isLoading}
        error={error}
      >
      <div 
        className="p-md sm:p-lg cia-widget"
        role="region"
        aria-label={getWidgetAriaDescription(
          "Availability Impact Analysis",
          "Business impact of availability controls including uptime targets and recovery objectives"
        )}
      >
        {/* Security level indicator */}
        <section 
          className="mb-4"
          aria-labelledby="availability-level-heading"
        >
          <h3 id="availability-level-heading" className="sr-only">
            Current Availability Security Level
          </h3>
          <SecurityLevelBadge
            category="Availability"
            level={effectiveLevel}
            // Use utility for consistent styling
            colorClass={getSecurityLevelBackgroundClass("blue")}
            textClass="text-blue-800 dark:text-blue-300"
            testId={AVAILABILITY_IMPACT_WIDGET_IDS.label('security-level')}
          />
        </section>

        {/* Business Impact Analysis */}
        {businessImpact && (
          <section 
            className="mb-4"
            aria-labelledby="availability-business-impact-heading"
          >
            <h3 id="availability-business-impact-heading" className="text-lg font-medium mb-2">
              Business Impact
            </h3>
            <BusinessImpactSection
              impact={businessImpact}
              color="blue"
              testId={AVAILABILITY_IMPACT_WIDGET_IDS.section('business-impact')}
            />
          </section>
        )}

        {/* SLA Metrics */}
        <section 
          className="mb-4"
          aria-labelledby="sla-metrics-heading"
        >
          <h3 id="sla-metrics-heading" className="text-lg font-medium mb-2 flex items-center">
            <span className="mr-2" aria-hidden="true">⏱️</span>SLA Metrics
          </h3>
          <div 
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-4"
            role="group"
            aria-label="Service level agreement metrics"
          >
            <div className="p-md bg-info-light/10 dark:bg-info-dark/20 rounded-md border border-info-light dark:border-info-dark">
              <div className="text-sm font-medium mb-1 text-blue-700 dark:text-blue-300">
                Uptime Target
              </div>
              <div className="text-lg font-bold" aria-label={`Uptime target: ${slaMetrics.uptime}`}>
                {slaMetrics.uptime}
              </div>
              <div className="text-xs text-blue-600 dark:text-blue-400">
                Expected system availability
              </div>
            </div>
            <div className="p-md bg-info-light/10 dark:bg-info-dark/20 rounded-md border border-info-light dark:border-info-dark">
              <div className="text-sm font-medium mb-1 text-blue-700 dark:text-blue-300">
                Recovery Time Objective
              </div>
              <div className="text-lg font-bold" aria-label={`Recovery time objective: ${slaMetrics.rto}`}>
                {slaMetrics.rto}
              </div>
              <div className="text-xs text-blue-600 dark:text-blue-400">
                Time to restore service
              </div>
            </div>
            <div className="p-md bg-info-light/10 dark:bg-info-dark/20 rounded-md border border-info-light dark:border-info-dark">
              <div className="text-sm font-medium mb-1 text-blue-700 dark:text-blue-300">
                Recovery Point Objective
              </div>
              <div className="text-lg font-bold" aria-label={`Recovery point objective: ${slaMetrics.rpo}`}>
                {slaMetrics.rpo}
              </div>
              <div className="text-xs text-blue-600 dark:text-blue-400">
                Maximum data loss allowed
              </div>
            </div>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <div className="p-md bg-info-light/10 dark:bg-info-dark/20 rounded-md border border-info-light dark:border-info-dark">
              <div className="text-sm font-medium mb-1 text-blue-700 dark:text-blue-300">
                Service Level Agreement
              </div>
              <div className="text-lg font-bold" aria-label={`Service level agreement: ${slaMetrics.sla}`}>
                {slaMetrics.sla}
              </div>
              <div className="text-xs text-blue-600 dark:text-blue-400">
                Support coverage period
              </div>
            </div>
          </div>
        </section>
      </div>
    </WidgetContainer>
    </WidgetErrorBoundary>
  );
};

export default AvailabilityImpactWidget;
