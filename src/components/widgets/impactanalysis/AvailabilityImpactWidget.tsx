import React, { useMemo } from "react";
import { WIDGET_ICONS, WIDGET_TITLES } from "../../../constants/appConstants";
import { AVAILABILITY_IMPACT_TEST_IDS } from "../../../constants/testIds";
import { useCIAContentService } from "../../../hooks/useCIAContentService";
import { SecurityLevel } from "../../../types/cia";
import { BusinessImpactDetails, CIADetails } from "../../../types/cia-services";
import { getRiskLevelFromSecurityLevel } from "../../../utils/riskUtils";
import { isNullish } from "../../../utils/typeGuards";
import BusinessImpactSection from "../../common/BusinessImpactSection";
import SecurityLevelBadge from "../../common/SecurityLevelBadge";
import WidgetContainer from "../../common/WidgetContainer";

// Extended interface for infrastructure details to improve type safety
interface InfrastructureDetails {
  availabilityZones: string;
  redundancyLevel: string;
  failoverStrategy: string;
}

// Extended interface for SLA metrics to improve type safety
interface SLAMetrics {
  uptime: string;
  rto: string;
  rpo: string;
  mttr: string;
  sla: string;
}

// Extend the CIADetails type to include the properties we're accessing
interface ExtendedCIADetails extends CIADetails {
  availabilityZones?: string;
  redundancyLevel?: string;
  failoverStrategy?: string;
  sla?: string;
}

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
 * availability controls, including uptime targets, recovery objectives,
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
  const details = useMemo((): ExtendedCIADetails | null => {
    if (isNullish(ciaContentService)) return null;

    try {
      // Safely check if the method exists before calling it
      if (
        typeof (ciaContentService as any).getAvailabilityDetails === "function"
      ) {
        const result = (ciaContentService as any).getAvailabilityDetails(
          availabilityLevel
        );
        // Handle undefined result by returning null
        return isNullish(result) ? null : result;
      }

      // Try getComponentDetails as an alternative method
      if (typeof ciaContentService.getComponentDetails === "function") {
        const result = ciaContentService.getComponentDetails(
          "availability",
          availabilityLevel
        );
        // Handle undefined result by returning null
        return isNullish(result) ? null : result;
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
  const slaMetrics = useMemo((): SLAMetrics => {
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
  const infrastructureDetails = useMemo((): InfrastructureDetails => {
    const details: InfrastructureDetails = {
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

  // Format business impact description based on availability level
  const formatBusinessImpact = (level: SecurityLevel): string => {
    const descriptions: Record<SecurityLevel, string> = {
      None: "No specific availability requirements. Systems may have frequent and extended downtimes without notification.",
      Low: "Basic availability requirements. Systems may experience occasional downtimes with minimal impact on operations.",
      Moderate:
        "Standard availability requirements. Systems are expected to be available during business hours with planned maintenance windows.",
      High: "Enhanced availability requirements. Systems are expected to be available 24/7 with brief, scheduled maintenance windows.",
      "Very High":
        "Stringent availability requirements. Systems must maintain continuous operation with redundant components and no perceptible downtime.",
    };

    return (
      descriptions[level] ||
      "Standard availability controls to maintain system uptime and minimize disruptions."
    );
  };

  // Create a safe business impact object that matches the required type
  const safeBusinessImpact: BusinessImpactDetails = useMemo(() => {
    if (businessImpact) return businessImpact;

    // Provide a default business impact when the real one is null
    return {
      summary: "Comprehensive impact analysis",
      financial: {
        description:
          "Revenue impact is modest, estimated at approximately 1-3% annually, assuming typical outage scenarios.",
        riskLevel: "Medium Risk",
        annualRevenueLoss: "1-3% of annual revenue",
      },
      operational: {
        description:
          "Disruptions occur infrequently and recovery is relatively quick.",
        riskLevel: "Medium Risk",
        meanTimeToRecover: "2-4 hours",
      },
    };
  }, [businessImpact]);

  return (
    <WidgetContainer
      title={
        WIDGET_TITLES.AVAILABILITY_IMPACT || "Availability Impact Analysis"
      }
      icon={WIDGET_ICONS.AVAILABILITY_IMPACT || "⏱️"}
      className={`${className} cia-availability`} // Add cia-availability class for theme
      testId={testId}
      isLoading={isLoading}
      error={error}
    >
      <div className="p-4 cia-widget">
        {/* Impact overview */}
        <div className="mb-4 p-3 bg-blue-50 dark:bg-blue-900 dark:bg-opacity-20 rounded-lg">
          <p className="text-sm">
            This widget analyzes the business impact of your chosen availability
            level, including uptime requirements, recovery time objectives, and
            resilience strategies.
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
          className="mb-4 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg cia-section cia-risk-section"
          data-testid={`${testId}-risk-level`}
        >
          <h3 className="text-lg font-medium mb-2 cia-section-header">
            Risk Assessment
          </h3>
          <div className="flex items-center justify-between cia-risk-level">
            <span className="text-gray-600 dark:text-gray-400 cia-risk-label">
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
          <div className="mt-2 text-sm text-gray-600 dark:text-gray-400 cia-risk-description">
            {details?.businessImpact || formatBusinessImpact(availabilityLevel)}
          </div>
        </div>

        {/* Business Impact Analysis */}
        <div className="mb-4">
          <h3 className="text-lg font-medium mb-2">Business Impact</h3>
          <BusinessImpactSection
            impact={safeBusinessImpact}
            color="blue"
            testId={`${testId}-business-impact`}
          />
        </div>

        {/* SLA Metrics */}
        <div className="mb-4">
          <h3 className="text-lg font-medium mb-2 flex items-center">
            <span className="mr-2">⏱️</span>SLA Metrics
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            <div className="p-3 bg-blue-50 dark:bg-blue-900 dark:bg-opacity-20 rounded-lg border border-blue-100 dark:border-blue-800">
              <div className="text-sm font-medium mb-1 text-blue-700 dark:text-blue-300">
                Uptime Target
              </div>
              <div className="text-lg font-bold">
                {details?.uptime || slaMetrics.uptime}
              </div>
              <div className="text-xs text-blue-600 dark:text-blue-400">
                Expected system availability
              </div>
            </div>
            <div className="p-3 bg-blue-50 dark:bg-blue-900 dark:bg-opacity-20 rounded-lg border border-blue-100 dark:border-blue-800">
              <div className="text-sm font-medium mb-1 text-blue-700 dark:text-blue-300">
                Recovery Time Objective
              </div>
              <div className="text-lg font-bold">
                {details?.rto || slaMetrics.rto}
              </div>
              <div className="text-xs text-blue-600 dark:text-blue-400">
                Time to restore service
              </div>
            </div>
            <div className="p-3 bg-blue-50 dark:bg-blue-900 dark:bg-opacity-20 rounded-lg border border-blue-100 dark:border-blue-800">
              <div className="text-sm font-medium mb-1 text-blue-700 dark:text-blue-300">
                Recovery Point Objective
              </div>
              <div className="text-lg font-bold">
                {details?.rpo || slaMetrics.rpo}
              </div>
              <div className="text-xs text-blue-600 dark:text-blue-400">
                Maximum data loss allowed
              </div>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-3 bg-blue-50 dark:bg-blue-900 dark:bg-opacity-20 rounded-lg border border-blue-100 dark:border-blue-800">
              <div className="text-sm font-medium mb-1 text-blue-700 dark:text-blue-300">
                Mean Time To Recovery
              </div>
              <div className="text-lg font-bold">
                {details?.mttr || slaMetrics.mttr}
              </div>
              <div className="text-xs text-blue-600 dark:text-blue-400">
                Average recovery duration
              </div>
            </div>
            <div className="p-3 bg-blue-50 dark:bg-blue-900 dark:bg-opacity-20 rounded-lg border border-blue-100 dark:border-blue-800">
              <div className="text-sm font-medium mb-1 text-blue-700 dark:text-blue-300">
                Service Level Agreement
              </div>
              <div className="text-lg font-bold">
                {details?.sla || slaMetrics.sla}
              </div>
              <div className="text-xs text-blue-600 dark:text-blue-400">
                Support coverage period
              </div>
            </div>
          </div>
        </div>

        {/* Infrastructure Details */}
        <div className="mb-4">
          <h3 className="text-lg font-medium mb-2 flex items-center">
            <span className="mr-2">🏗️</span>Infrastructure Requirements
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
              <div className="text-sm font-medium mb-1">
                Geographic Distribution:
              </div>
              <div className="text-lg font-bold text-blue-600 dark:text-blue-400">
                {details?.availabilityZones ||
                  infrastructureDetails.availabilityZones}
              </div>
            </div>
            <div className="p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
              <div className="text-sm font-medium mb-1">Redundancy Level:</div>
              <div className="text-lg font-bold text-blue-600 dark:text-blue-400">
                {details?.redundancyLevel ||
                  infrastructureDetails.redundancyLevel}
              </div>
            </div>
            <div className="p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
              <div className="text-sm font-medium mb-1">Failover Strategy:</div>
              <div className="text-lg font-bold text-blue-600 dark:text-blue-400">
                {details?.failoverStrategy ||
                  infrastructureDetails.failoverStrategy}
              </div>
            </div>
          </div>
        </div>

        {/* Technical Implementation */}
        <div className="mb-4">
          <h3 className="text-lg font-medium mb-2 flex items-center">
            <span className="mr-2">🔧</span>Technical Implementation
          </h3>
          <p className="text-gray-600 dark:text-gray-300">
            {details?.technical ||
              `${availabilityLevel} level requires ${
                availabilityLevel === "None"
                  ? "minimal"
                  : availabilityLevel === "Low"
                  ? "basic"
                  : availabilityLevel === "Moderate"
                  ? "standard"
                  : availabilityLevel === "High"
                  ? "robust"
                  : "extensive"
              } technical controls including ${
                availabilityLevel === "None"
                  ? "no specific measures"
                  : availabilityLevel === "Low"
                  ? "basic monitoring"
                  : availabilityLevel === "Moderate"
                  ? "monitoring and alerts"
                  : availabilityLevel === "High"
                  ? "advanced monitoring, failover mechanisms"
                  : "comprehensive monitoring, automated recovery, and multi-region resilience"
              }.`}
          </p>
        </div>

        {/* Recommendations */}
        {details?.recommendations && details.recommendations.length > 0 && (
          <div
            className="mb-4 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg"
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
