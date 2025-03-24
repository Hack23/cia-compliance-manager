import React, { useMemo } from "react";
import { WIDGET_ICONS, WIDGET_TITLES } from "../../../constants/appConstants";
import { AVAILABILITY_IMPACT_TEST_IDS } from "../../../constants/testIds";
import { useCIAContentService } from "../../../hooks/useCIAContentService";
import { SecurityLevel } from "../../../types/cia";
import { CIADetails } from "../../../types/cia-services";
import { getRiskLevelFromSecurityLevel } from "../../../utils/riskUtils";
import BusinessImpactSection from "../../common/BusinessImpactSection";
import SecurityLevelBadge from "../../common/SecurityLevelBadge";
import WidgetContainer from "../../common/WidgetContainer";

interface AvailabilityImpactWidgetProps {
  /**
   * Selected availability level
   */
  availabilityLevel: SecurityLevel;

  /**
   * Current integrity level (optional)
   */
  integrityLevel?: SecurityLevel;

  /**
   * Current confidentiality level (optional)
   */
  confidentialityLevel?: SecurityLevel;

  /**
   * Flag to show extended details (optional)
   */
  showExtendedDetails?: boolean;

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
 * Widget that displays the impact of selected availability level
 *
 * ## Business Perspective
 *
 * This widget helps stakeholders understand the business impact of
 * availability controls, including uptime targets, recovery metrics,
 * and resilience requirements for business continuity. ⏱️
 */
const AvailabilityImpactWidget: React.FC<AvailabilityImpactWidgetProps> = ({
  availabilityLevel,
  integrityLevel,
  confidentialityLevel,
  showExtendedDetails = false,
  className = "",
  testId = AVAILABILITY_IMPACT_TEST_IDS.AVAILABILITY_IMPACT_PREFIX,
}) => {
  // Get CIA content service
  const { ciaContentService, error, isLoading } = useCIAContentService();

  // Calculate risk level based on security level
  const riskLevel = useMemo(
    () => getRiskLevelFromSecurityLevel(availabilityLevel),
    [availabilityLevel]
  );

  // Get availability details from service if available
  const details = useMemo((): CIADetails | null => {
    if (!ciaContentService) return null;

    try {
      // Safely check if the method exists before calling it
      if (
        typeof (ciaContentService as any).getAvailabilityDetails === "function"
      ) {
        return (ciaContentService as any).getAvailabilityDetails(
          availabilityLevel
        );
      }
      return null;
    } catch (err) {
      console.error("Error getting availability details:", err);
      return null;
    }
  }, [ciaContentService, availabilityLevel]);

  // Get business impact data from service if available
  const businessImpact = useMemo(() => {
    if (!ciaContentService) return null;

    try {
      if (typeof ciaContentService.getBusinessImpact === "function") {
        return ciaContentService.getBusinessImpact(
          "availability",
          availabilityLevel
        );
      }
      return null;
    } catch (err) {
      console.error("Error getting availability business impact:", err);
      return null;
    }
  }, [ciaContentService, availabilityLevel]);

  // Default/fallback SLA metrics based on availability level
  const slaMetrics = useMemo(() => {
    const metrics = {
      uptime: "",
      rto: "",
      rpo: "",
      mttr: "",
      sla: "",
    };

    switch (availabilityLevel) {
      case "None":
        metrics.uptime = "< 90%";
        metrics.rto = "Undefined";
        metrics.rpo = "Undefined";
        metrics.mttr = "Undefined";
        metrics.sla = "No SLA";
        break;
      case "Low":
        metrics.uptime = "90-95%";
        metrics.rto = "< 24 hours";
        metrics.rpo = "< 24 hours";
        metrics.mttr = "< 12 hours";
        metrics.sla = "Best effort";
        break;
      case "Moderate":
        metrics.uptime = "95-99%";
        metrics.rto = "< 8 hours";
        metrics.rpo = "< 8 hours";
        metrics.mttr = "< 4 hours";
        metrics.sla = "Business hours";
        break;
      case "High":
        metrics.uptime = "99-99.9%";
        metrics.rto = "< 4 hours";
        metrics.rpo = "< 4 hours";
        metrics.mttr = "< 2 hours";
        metrics.sla = "24/7 with exceptions";
        break;
      case "Very High":
        metrics.uptime = "99.9-99.999%";
        metrics.rto = "< 1 hour";
        metrics.rpo = "< 15 minutes";
        metrics.mttr = "< 30 minutes";
        metrics.sla = "24/7/365";
        break;
      default:
        metrics.uptime = "Unknown";
        metrics.rto = "Unknown";
        metrics.rpo = "Unknown";
        metrics.mttr = "Unknown";
        metrics.sla = "Unknown";
    }

    return metrics;
  }, [availabilityLevel]);

  // Default/fallback infrastructure details based on availability level
  const infrastructureDetails = useMemo(() => {
    const details = {
      availabilityZones: "",
      redundancyLevel: "",
      failoverStrategy: "",
    };

    switch (availabilityLevel) {
      case "None":
        details.availabilityZones = "Single zone";
        details.redundancyLevel = "No redundancy";
        details.failoverStrategy = "Manual recovery";
        break;
      case "Low":
        details.availabilityZones = "Single zone";
        details.redundancyLevel = "Limited redundancy";
        details.failoverStrategy = "Manual failover";
        break;
      case "Moderate":
        details.availabilityZones = "Dual zone";
        details.redundancyLevel = "N+1 redundancy";
        details.failoverStrategy = "Semi-automated failover";
        break;
      case "High":
        details.availabilityZones = "Multi-zone";
        details.redundancyLevel = "N+1 redundancy";
        details.failoverStrategy = "Automated failover";
        break;
      case "Very High":
        details.availabilityZones = "Multi-region";
        details.redundancyLevel = "N+2 redundancy";
        details.failoverStrategy = "Active-active with automated failover";
        break;
      default:
        details.availabilityZones = "Unknown";
        details.redundancyLevel = "Unknown";
        details.failoverStrategy = "Unknown";
    }

    return details;
  }, [availabilityLevel]);

  return (
    <WidgetContainer
      title={
        WIDGET_TITLES.AVAILABILITY_IMPACT || "Availability Impact Analysis"
      }
      icon={WIDGET_ICONS.AVAILABILITY_IMPACT || "⏱️"}
      className={className}
      testId={testId}
      isLoading={isLoading}
      error={error}
    >
      <div className="p-4">
        {/* Availability impact summary */}
        <div className="mb-4 p-3 bg-blue-50 dark:bg-blue-900 dark:bg-opacity-20 rounded-lg">
          <p className="text-sm">
            This widget analyzes the business impact of your chosen availability
            level, including uptime requirements, recovery objectives, and
            resilience requirements.
          </p>
        </div>

        {/* Security level indicator */}
        <div className="mb-4">
          <SecurityLevelBadge
            category="Availability"
            level={availabilityLevel}
            colorClass="bg-blue-100 dark:bg-blue-900 dark:bg-opacity-20"
            textClass="text-blue-800 dark:text-blue-300"
            testId={`${testId}-level`}
          />
        </div>

        {/* Availability risk level */}
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
            {details?.businessImpact ||
              `${availabilityLevel} availability provides ${
                availabilityLevel === "None"
                  ? "minimal protection against"
                  : availabilityLevel === "Low"
                  ? "basic protection against"
                  : availabilityLevel === "Moderate"
                  ? "standard protection against"
                  : availabilityLevel === "High"
                  ? "strong protection against"
                  : "very strong protection against"
              } system downtime and service disruptions. Business operations ${
                availabilityLevel === "None"
                  ? "are at significant risk"
                  : availabilityLevel === "Low"
                  ? "may experience frequent disruptions"
                  : availabilityLevel === "Moderate"
                  ? "will experience occasional disruptions"
                  : availabilityLevel === "High"
                  ? "will rarely experience disruptions"
                  : "will almost never experience disruptions"
              }.`}
          </div>
        </div>

        {/* Technical Description */}
        <div
          className="mb-4 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg"
          data-testid={`${testId}-description`}
        >
          <h3 className="text-lg font-medium mb-2">Technical Description</h3>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            {details?.description ||
              `${availabilityLevel} availability level focuses on ensuring systems and data are accessible when needed. This involves implementing controls for high uptime, quick recovery from disruptions, and resilient infrastructure to maintain business continuity.`}
          </p>
        </div>

        {/* SLA metrics */}
        <div
          className="mb-4 p-3 bg-blue-50 dark:bg-blue-900 dark:bg-opacity-20 rounded-lg"
          data-testid={`${testId}-metrics`}
        >
          <h3 className="text-lg font-medium mb-2 text-blue-800 dark:text-blue-300">
            Availability Metrics
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-2 bg-white dark:bg-gray-800 rounded-lg">
              <div className="text-sm font-medium mb-1">Target Uptime:</div>
              <div className="text-lg font-bold text-blue-600 dark:text-blue-400">
                {details?.uptime || slaMetrics.uptime}
              </div>
            </div>
            <div className="p-2 bg-white dark:bg-gray-800 rounded-lg">
              <div className="text-sm font-medium mb-1">
                Recovery Time Objective (RTO):
              </div>
              <div className="text-lg font-bold text-blue-600 dark:text-blue-400">
                {details?.rto || slaMetrics.rto}
              </div>
            </div>
            <div className="p-2 bg-white dark:bg-gray-800 rounded-lg">
              <div className="text-sm font-medium mb-1">
                Recovery Point Objective (RPO):
              </div>
              <div className="text-lg font-bold text-blue-600 dark:text-blue-400">
                {details?.rpo || slaMetrics.rpo}
              </div>
            </div>
          </div>
        </div>

        {/* More metrics */}
        <div className="mb-4 grid grid-cols-1 md:grid-cols-2 gap-4">
          <div
            className="p-3 bg-gray-50 dark:bg-gray-800 rounded-lg"
            data-testid={`${testId}-mttr`}
          >
            <h4 className="text-md font-medium mb-3 flex items-center">
              <span className="mr-2">⚡</span>
              Response Metrics
            </h4>
            <div className="grid grid-cols-2 gap-2">
              <div>
                <div className="text-sm font-medium mb-1">
                  Mean Time to Repair:
                </div>
                <div className="text-blue-600 dark:text-blue-400">
                  {details?.mttr || slaMetrics.mttr}
                </div>
              </div>
              <div>
                <div className="text-sm font-medium mb-1">
                  Service Level Agreement:
                </div>
                <div className="text-blue-600 dark:text-blue-400">
                  {(details as any)?.sla || slaMetrics.sla}
                </div>
              </div>
            </div>
          </div>

          <div
            className="p-3 bg-gray-50 dark:bg-gray-800 rounded-lg"
            data-testid={`${testId}-infrastructure`}
          >
            <h4 className="text-md font-medium mb-3 flex items-center">
              <span className="mr-2">🏗️</span>
              Infrastructure Requirements
            </h4>
            <div className="grid grid-cols-1 gap-2">
              <div>
                <div className="text-sm font-medium mb-1">
                  Geographic Distribution:
                </div>
                <div className="text-blue-600 dark:text-blue-400">
                  {(details as any)?.availabilityZones ||
                    infrastructureDetails.availabilityZones}
                </div>
              </div>
              <div>
                <div className="text-sm font-medium mb-1">Redundancy:</div>
                <div className="text-blue-600 dark:text-blue-400">
                  {(details as any)?.redundancyLevel ||
                    infrastructureDetails.redundancyLevel}
                </div>
              </div>
              <div>
                <div className="text-sm font-medium mb-1">
                  Failover Approach:
                </div>
                <div className="text-blue-600 dark:text-blue-400">
                  {(details as any)?.failoverStrategy ||
                    infrastructureDetails.failoverStrategy}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Business Impact */}
        <div className="mt-4" data-testid={`${testId}-business-impact`}>
          {businessImpact && (
            <BusinessImpactSection
              impact={businessImpact}
              color="blue"
              testId={`${testId}-business-impact`}
            />
          )}
        </div>

        {/* Recommendations */}
        {details?.recommendations && details.recommendations.length > 0 && (
          <div
            className="mt-4 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg"
            data-testid={`${testId}-recommendations`}
          >
            <h3 className="text-lg font-medium mb-2">Recommendations</h3>
            <ul className="space-y-2 text-sm">
              {details.recommendations.map(
                (recommendation: string, index: number) => (
                  <li
                    key={index}
                    className="flex items-start"
                    data-testid={`${testId}-recommendation-${index}`}
                  >
                    <span className="mr-2 text-blue-500">✓</span>
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

export default AvailabilityImpactWidget;
