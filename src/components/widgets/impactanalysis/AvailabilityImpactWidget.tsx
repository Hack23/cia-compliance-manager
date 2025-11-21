import React, { useMemo } from "react";
import { WIDGET_ICONS, WIDGET_TITLES } from "../../../constants/appConstants";
import { AVAILABILITY_IMPACT_TEST_IDS } from "../../../constants/testIds";
import { getDefaultSLAMetrics } from "../../../data/ciaOptionsData";
import { useBusinessImpact, useComponentDetails } from "../../../hooks";
import { useCIAContentService } from "../../../hooks/useCIAContentService";
import type { AvailabilityImpactWidgetProps } from "../../../types/widget-props";
import { getSecurityLevelBackgroundClass } from "../../../utils/colorUtils";
import { normalizeSecurityLevel } from "../../../utils/securityLevelUtils";
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
      <div className="p-4 cia-widget">
        {/* Security level indicator */}
        <div className="mb-4">
          <SecurityLevelBadge
            category="Availability"
            level={effectiveLevel}
            // Use utility for consistent styling
            colorClass={getSecurityLevelBackgroundClass("blue")}
            textClass="text-blue-800 dark:text-blue-300"
            testId={`${testId}-level`}
          />
        </div>

        {/* Business Impact Analysis */}
        {businessImpact && (
          <div className="mb-4">
            <h3 className="text-lg font-medium mb-2">Business Impact</h3>
            <BusinessImpactSection
              impact={businessImpact}
              color="blue"
              testId={`${testId}-business-impact`}
            />
          </div>
        )}

        {/* SLA Metrics */}
        <div className="mb-4">
          <h3 className="text-lg font-medium mb-2 flex items-center">
            <span className="mr-2">⏱️</span>SLA Metrics
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
            <div className="p-3 bg-blue-50 dark:bg-blue-900 dark:bg-opacity-20 rounded-lg border border-blue-100 dark:border-blue-800">
              <div className="text-sm font-medium mb-1 text-blue-700 dark:text-blue-300">
                Uptime Target
              </div>
              <div className="text-lg font-bold">{slaMetrics.uptime}</div>
              <div className="text-xs text-blue-600 dark:text-blue-400">
                Expected system availability
              </div>
            </div>
            <div className="p-3 bg-blue-50 dark:bg-blue-900 dark:bg-opacity-20 rounded-lg border border-blue-100 dark:border-blue-800">
              <div className="text-sm font-medium mb-1 text-blue-700 dark:text-blue-300">
                Recovery Time Objective
              </div>
              <div className="text-lg font-bold">{slaMetrics.rto}</div>
              <div className="text-xs text-blue-600 dark:text-blue-400">
                Time to restore service
              </div>
            </div>
            <div className="p-3 bg-blue-50 dark:bg-blue-900 dark:bg-opacity-20 rounded-lg border border-blue-100 dark:border-blue-800">
              <div className="text-sm font-medium mb-1 text-blue-700 dark:text-blue-300">
                Recovery Point Objective
              </div>
              <div className="text-lg font-bold">{slaMetrics.rpo}</div>
              <div className="text-xs text-blue-600 dark:text-blue-400">
                Maximum data loss allowed
              </div>
            </div>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <div className="p-3 bg-blue-50 dark:bg-blue-900 dark:bg-opacity-20 rounded-lg border border-blue-100 dark:border-blue-800">
              <div className="text-sm font-medium mb-1 text-blue-700 dark:text-blue-300">
                Service Level Agreement
              </div>
              <div className="text-lg font-bold">{slaMetrics.sla}</div>
              <div className="text-xs text-blue-600 dark:text-blue-400">
                Support coverage period
              </div>
            </div>
          </div>
        </div>
      </div>
    </WidgetContainer>
    </WidgetErrorBoundary>
  );
};

export default AvailabilityImpactWidget;
