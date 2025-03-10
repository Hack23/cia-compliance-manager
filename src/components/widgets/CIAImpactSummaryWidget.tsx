import React, { useMemo } from "react";
import WidgetContainer from "../common/WidgetContainer";
import KeyValuePair from "../common/KeyValuePair";
import MetricsCard from "../common/MetricsCard";
import { SecurityLevel } from "../../types/cia";
import ciaContentService from "../../services/ciaContentService";
import type { ComponentMetrics } from "../../services/ciaContentService";
import { WIDGET_TEST_IDS } from "../../constants/testIds";

/**
 * Props for CIAImpactSummaryWidget component
 */
export interface CIAImpactSummaryWidgetProps {
  // Changed from availabilityLevel to availability for consistency with other widgets
  availability: SecurityLevel;
  integrity: SecurityLevel;
  confidentiality: SecurityLevel;
  className?: string;
  testId?: string;
}

/**
 * Widget that displays a summary of CIA impacts
 */
const CIAImpactSummaryWidget: React.FC<CIAImpactSummaryWidgetProps> = ({
  availability,
  integrity,
  confidentiality,
  className = "",
  testId = WIDGET_TEST_IDS.CIA_IMPACT_SUMMARY,
}) => {
  // Get impact metrics for each component
  const impactMetrics = useMemo(() => {
    return ciaContentService.getImpactMetrics(
      availability,
      integrity,
      confidentiality
    );
  }, [availability, integrity, confidentiality]);

  // Get the metrics for each CIA component
  const componentMetrics = useMemo(() => {
    return {
      availability: ciaContentService.getComponentMetrics(
        "availability",
        availability
      ),
      integrity: ciaContentService.getComponentMetrics("integrity", integrity),
      confidentiality: ciaContentService.getComponentMetrics(
        "confidentiality",
        confidentiality
      ),
    };
  }, [availability, integrity, confidentiality]);

  // Render a metric row
  const renderMetricRow = (label: string, value: string | undefined) => {
    if (!value) return null;

    return (
      <div className="flex justify-between items-center py-2 border-b border-gray-100 dark:border-gray-700 last:border-b-0">
        <span className="text-sm text-gray-600 dark:text-gray-400">
          {label}
        </span>
        <span className="text-sm font-medium text-gray-800 dark:text-gray-200">
          {value}
        </span>
      </div>
    );
  };

  // Function to stringify impact metrics for MetricsCard
  const stringifyMetric = (
    metric: ComponentMetrics | string | number | undefined
  ): string => {
    if (typeof metric === "string") return metric;
    if (typeof metric === "number") return metric.toString();
    if (!metric) return "N/A";
    // For ComponentMetrics objects, return a simplified string
    return "See detailed assessment";
  };

  return (
    <WidgetContainer
      title="CIA Impact Summary"
      icon="📊"
      className={className}
      testId={testId}
    >
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Availability Impact */}
        <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
          <div
            className="flex items-center justify-between mb-3"
            data-testid={WIDGET_TEST_IDS.CIA_IMPACT_AVAILABILITY_ROW}
          >
            <h3 className="text-md font-semibold text-gray-800 dark:text-gray-200">
              Availability
            </h3>
            <span
              className="px-2 py-1 text-sm font-medium rounded bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300"
              data-testid={WIDGET_TEST_IDS.CIA_IMPACT_AVAILABILITY_LEVEL}
            >
              {availability}
            </span>
          </div>

          <div className="space-y-2">
            {renderMetricRow("Uptime", componentMetrics.availability.uptime)}
            {renderMetricRow(
              "Recovery Time",
              componentMetrics.availability.rto
            )}
            {renderMetricRow(
              "Recovery Point",
              componentMetrics.availability.rpo
            )}
            {renderMetricRow(
              "Financial Impact",
              componentMetrics.availability.financialImpact
            )}
            {renderMetricRow(
              "Operational Impact",
              componentMetrics.availability.operationalImpact
            )}
          </div>
        </div>

        {/* Integrity Impact */}
        <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
          <div
            className="flex items-center justify-between mb-3"
            data-testid={WIDGET_TEST_IDS.CIA_IMPACT_INTEGRITY_ROW}
          >
            <h3 className="text-md font-semibold text-gray-800 dark:text-gray-200">
              Integrity
            </h3>
            <span
              className="px-2 py-1 text-sm font-medium rounded bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
              data-testid={WIDGET_TEST_IDS.CIA_IMPACT_INTEGRITY_LEVEL}
            >
              {integrity}
            </span>
          </div>

          <div className="space-y-2">
            {renderMetricRow(
              "Financial Impact",
              componentMetrics.integrity.financialImpact
            )}
            {renderMetricRow(
              "Operational Impact",
              componentMetrics.integrity.operationalImpact
            )}
            {renderMetricRow(
              "Regulatory Impact",
              componentMetrics.integrity.regulatoryImpact
            )}
            {renderMetricRow(
              "Reputational Impact",
              componentMetrics.integrity.reputationalImpact
            )}
          </div>
        </div>

        {/* Confidentiality Impact */}
        <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
          <div
            className="flex items-center justify-between mb-3"
            data-testid={WIDGET_TEST_IDS.CIA_IMPACT_CONFIDENTIALITY_ROW}
          >
            <h3 className="text-md font-semibold text-gray-800 dark:text-gray-200">
              Confidentiality
            </h3>
            <span
              className="px-2 py-1 text-sm font-medium rounded bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300"
              data-testid={WIDGET_TEST_IDS.CIA_IMPACT_CONFIDENTIALITY_LEVEL}
            >
              {confidentiality}
            </span>
          </div>

          <div className="space-y-2">
            {renderMetricRow(
              "Financial Impact",
              componentMetrics.confidentiality.financialImpact
            )}
            {renderMetricRow(
              "Regulatory Impact",
              componentMetrics.confidentiality.regulatoryImpact
            )}
            {renderMetricRow(
              "Reputational Impact",
              componentMetrics.confidentiality.reputationalImpact
            )}
          </div>
        </div>
      </div>

      {/* Overall Impact Summary */}
      <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
        <MetricsCard
          title="Business Impact"
          value={stringifyMetric(impactMetrics.businessImpact)}
          variant="primary"
        />

        <MetricsCard
          title="Technical Impact"
          value={stringifyMetric(impactMetrics.technicalImpact)}
          variant="info"
        />

        <MetricsCard
          title="Regulatory Impact"
          value={stringifyMetric(impactMetrics.regulatoryImpact)}
          variant="warning"
        />
      </div>

      {/* Confidentiality Specific Metrics */}
      <div className="mt-6">
        <h3 className="font-medium text-gray-800 dark:text-gray-200 mb-4">
          Confidentiality Metrics
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700">
            <div className="text-sm text-gray-500 dark:text-gray-400">
              Key Impact
            </div>
            <div className="font-medium text-gray-800 dark:text-gray-200 mt-1">
              {componentMetrics.confidentiality.keyImpact ||
                "No impact data available"}
            </div>
          </div>
          <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700">
            <div className="text-sm text-gray-500 dark:text-gray-400">
              Metric
            </div>
            <div className="font-medium text-gray-800 dark:text-gray-200 mt-1">
              {componentMetrics.confidentiality.metric || "N/A"}
            </div>
          </div>
        </div>
      </div>

      {/* Integrity Specific Metrics */}
      <div className="mt-6">
        <h3 className="font-medium text-gray-800 dark:text-gray-200 mb-4">
          Integrity Metrics
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700">
            <div className="text-sm text-gray-500 dark:text-gray-400">
              Key Impact
            </div>
            <div className="font-medium text-gray-800 dark:text-gray-200 mt-1">
              {componentMetrics.integrity.keyImpact ||
                "No impact data available"}
            </div>
          </div>
          <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700">
            <div className="text-sm text-gray-500 dark:text-gray-400">
              Metric
            </div>
            <div className="font-medium text-gray-800 dark:text-gray-200 mt-1">
              {componentMetrics.integrity.metric || "N/A"}
            </div>
          </div>
        </div>
      </div>

      {/* Availability Specific Metrics */}
      <div className="mt-6">
        <h3 className="font-medium text-gray-800 dark:text-gray-200 mb-4">
          Availability Metrics
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700">
            <div className="text-sm text-gray-500 dark:text-gray-400">
              Key Impact
            </div>
            <div className="font-medium text-gray-800 dark:text-gray-200 mt-1">
              {componentMetrics.availability.keyImpact ||
                "No impact data available"}
            </div>
          </div>
          <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700">
            <div className="text-sm text-gray-500 dark:text-gray-400">
              Metric
            </div>
            <div className="font-medium text-gray-800 dark:text-gray-200 mt-1">
              {componentMetrics.availability.metric || "N/A"}
            </div>
          </div>
        </div>
      </div>

      {/* Overall Impact Scores */}
      <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-blue-50 dark:bg-blue-900 dark:bg-opacity-20 p-4 rounded-lg">
          <div className="text-blue-700 dark:text-blue-300 font-medium mb-2">
            Security Score
          </div>
          <span className="text-2xl font-bold text-blue-800 dark:text-blue-200">
            {stringifyMetric(impactMetrics.securityScore)}
          </span>
          <div className="text-sm text-blue-600 dark:text-blue-400 mt-1">
            Based on CIA security levels
          </div>
        </div>

        <div className="bg-green-50 dark:bg-green-900 dark:bg-opacity-20 p-4 rounded-lg">
          <div className="text-green-700 dark:text-green-300 font-medium mb-2">
            Compliance Score
          </div>
          <span className="text-2xl font-bold text-green-800 dark:text-green-200">
            {stringifyMetric(impactMetrics.complianceScore)}
          </span>
          <div className="text-sm text-green-600 dark:text-green-400 mt-1">
            Based on regulatory requirements
          </div>
        </div>

        <div className="bg-purple-50 dark:bg-purple-900 dark:bg-opacity-20 p-4 rounded-lg">
          <div className="text-purple-700 dark:text-purple-300 font-medium mb-2">
            Cost-Effectiveness
          </div>
          <span className="text-2xl font-bold text-purple-800 dark:text-purple-200">
            {stringifyMetric(impactMetrics.costEffectivenessScore)}
          </span>
          <div className="text-sm text-purple-600 dark:text-purple-400 mt-1">
            Based on ROI analysis
          </div>
        </div>
      </div>
    </WidgetContainer>
  );
};

export default CIAImpactSummaryWidget;
