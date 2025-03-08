import React from "react";
import { AVAILABILITY_IMPACT_TEST_IDS } from "../../constants/testIds";
import { CIA_COMPONENT_ICONS } from "../../constants/coreConstants";
import {
  AvailabilityImpactWidgetProps,
  AvailabilityDetail,
} from "../../types/widgets";
import { SECURITY_LEVELS } from "../../constants/appConstants";
import WidgetBase from "../common/WidgetBase";

const AvailabilityImpactWidget: React.FC<AvailabilityImpactWidgetProps> = ({
  level = SECURITY_LEVELS.NONE,
  options = {},
  testId = AVAILABILITY_IMPACT_TEST_IDS.AVAILABILITY_IMPACT_PREFIX,
}) => {
  // Define default options with improved business context
  const defaultOptions: Record<string, AvailabilityDetail> = {
    None: {
      description: "No guaranteed uptime or availability controls",
      businessImpact:
        "Critical business operations completely halt during outages with no predictable recovery timeline, potentially causing significant revenue loss and customer dissatisfaction",
      uptime: "< 90%",
      recommendations: [
        "Implement basic system monitoring",
        "Create backup procedures for critical data",
        "Document manual recovery processes",
      ],
      mttr: "Days to weeks",
      rto: "Undefined",
      rpo: "Undefined",
    },
    Low: {
      description: "Basic availability with minimal redundancy",
      businessImpact:
        "Business operations face significant disruption during outages with extended recovery times, limiting service reliability",
      uptime: "~95%",
      recommendations: [
        "Implement regular backup strategy",
        "Deploy basic monitoring with alerts",
        "Create incident response procedures",
      ],
      mttr: "Hours to days",
      rto: "24-48 hours",
      rpo: "24 hours",
    },
    Moderate: {
      description: "Standard availability with partial redundancy",
      businessImpact:
        "Business operations recover within acceptable timeframes with reasonable continuity capabilities for most scenarios",
      uptime: "99%",
      recommendations: [
        "Deploy high-availability components for critical systems",
        "Implement comprehensive monitoring and alerting",
        "Create and test disaster recovery procedures",
      ],
      mttr: "1-8 hours",
      rto: "4-8 hours",
      rpo: "4 hours",
    },
    High: {
      description: "Robust high availability with multiple redundancy",
      businessImpact:
        "Business continuity preserved in most scenarios with minimal disruption to operations and customer experience",
      uptime: "99.9%",
      recommendations: [
        "Implement geographic redundancy",
        "Deploy automated failover mechanisms",
        "Conduct regular disaster recovery testing",
      ],
      mttr: "Minutes to 1 hour",
      rto: "1 hour",
      rpo: "15 minutes",
    },
    "Very High": {
      description: "Maximum availability with full redundancy",
      businessImpact:
        "Business operations continue uninterrupted even during major incidents, providing consistent customer experience and service reliability",
      uptime: "99.99%+",
      recommendations: [
        "Implement active-active multi-region architecture",
        "Deploy advanced auto-scaling and self-healing systems",
        "Establish comprehensive business continuity framework",
      ],
      mttr: "Seconds to minutes",
      rto: "< 5 minutes",
      rpo: "< 1 minute",
    },
  };

  // Safely merge provided options with defaults
  const mergedOptions = { ...defaultOptions, ...options };

  // Safe access to current option with fallback
  const currentOption = mergedOptions[level] ||
    mergedOptions["None"] || {
      description: "No availability information available",
      businessImpact: "No impact information available",
      uptime: "Unknown",
      recommendations: ["Implement availability controls"],
    };

  return (
    <WidgetBase
      title={`Availability Impact: ${level}`}
      icon={CIA_COMPONENT_ICONS.AVAILABILITY}
      testId={testId}
    >
      <div className="space-y-4">
        <div className="bg-gray-50 dark:bg-gray-700 p-3 rounded-md mb-3">
          <h4 className="text-sm font-medium mb-2">Description</h4>
          <p className="text-sm">{currentOption.description}</p>
        </div>

        <div className="bg-gray-50 dark:bg-gray-700 p-3 rounded-md mb-3">
          <h4 className="text-sm font-medium mb-2">Business Impact</h4>
          <p className="text-sm">{currentOption.businessImpact}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-3">
          <div className="bg-gray-50 dark:bg-gray-700 p-3 rounded-md">
            <h4 className="text-sm font-medium mb-2">Uptime Target</h4>
            <p className="text-sm font-bold">{currentOption.uptime}</p>
          </div>

          {currentOption.mttr && (
            <div className="bg-gray-50 dark:bg-gray-700 p-3 rounded-md">
              <h4 className="text-sm font-medium mb-2">
                Mean Time to Recovery
              </h4>
              <p className="text-sm font-bold">{currentOption.mttr}</p>
            </div>
          )}
        </div>

        {currentOption.rto && currentOption.rpo && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-3">
            <div className="bg-gray-50 dark:bg-gray-700 p-3 rounded-md">
              <h4
                className="text-sm font-medium mb-2"
                aria-label="Recovery Time Objective"
              >
                RTO
              </h4>
              <p className="text-sm font-bold">{currentOption.rto}</p>
              <p className="text-xs text-gray-500">Recovery Time Objective</p>
            </div>
            <div className="bg-gray-50 dark:bg-gray-700 p-3 rounded-md">
              <h4
                className="text-sm font-medium mb-2"
                aria-label="Recovery Point Objective"
              >
                RPO
              </h4>
              <p className="text-sm font-bold">{currentOption.rpo}</p>
              <p className="text-xs text-gray-500">Recovery Point Objective</p>
            </div>
          </div>
        )}

        {currentOption.recommendations &&
          currentOption.recommendations.length > 0 && (
            <div className="bg-gray-50 dark:bg-gray-700 p-3 rounded-md">
              <h4 className="text-sm font-medium mb-2">
                Key Implementation Considerations
              </h4>
              <ul
                className="list-disc pl-5 space-y-1"
                aria-label="Implementation recommendations"
              >
                {currentOption.recommendations.map(
                  (rec: string, idx: number) => (
                    <li key={idx} className="text-sm">
                      {rec}
                    </li>
                  )
                )}
              </ul>
            </div>
          )}

        <div className="bg-blue-50 dark:bg-blue-900 p-3 rounded-md border border-blue-100 dark:border-blue-800">
          <h4 className="text-sm font-medium mb-2 flex items-center">
            <span aria-hidden="true" className="mr-2">
              💡
            </span>
            Business Perspective
          </h4>
          <p className="text-sm">{getBusinessPerspective(level)}</p>
        </div>
      </div>
    </WidgetBase>
  );
};

// Helper function to provide a business-friendly explanation
function getBusinessPerspective(level: string): string {
  switch (level) {
    case "Very High":
      return "Investment in maximum availability ensures continuous business operations even during major disruptions, supporting critical customer-facing services and revenue streams. The ROI comes from prevented downtime costs, preserved brand reputation, and maintained customer trust.";
    case "High":
      return "High availability provides strong business continuity assurance for important systems. It represents an optimal balance between cost and protection for most business-critical applications.";
    case "Moderate":
      return "Standard availability measures provide good business protection for typical applications. This level balances operational needs with implementation costs, suitable for most internal business systems.";
    case "Low":
      return "Basic availability measures provide minimal business continuity capabilities. Suitable only for non-critical systems where occasional downtime has limited operational impact.";
    default:
      return "Without availability measures, business operations are at high risk of extended disruption during outages. Consider implementing basic continuity measures to protect critical business functions.";
  }
}

export default AvailabilityImpactWidget;
