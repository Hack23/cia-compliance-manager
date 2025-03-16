import React, { useState } from "react";
import { SecurityLevel } from "../../types/cia";
import { BUSINESS_IMPACT_TEST_IDS } from "../../constants/testIds";
import { CIA_COMPONENT_COLORS } from "../../constants/colorConstants";
import { CIA_LABELS, CIA_COMPONENT_ICONS } from "../../constants/appConstants";
import ciaContentService from "../../services/ciaContentService";
import WidgetContainer from "../common/WidgetContainer";
import StatusBadge from "../common/StatusBadge";

/**
 * Props for the BusinessImpactAnalysisWidget component
 */
export interface BusinessImpactAnalysisWidgetProps {
  availabilityLevel: SecurityLevel;
  integrityLevel: SecurityLevel;
  confidentialityLevel: SecurityLevel;
  securityLevel?: SecurityLevel; // Overall security level
  className?: string;
  testId?: string;
  activeComponent?: "availability" | "integrity" | "confidentiality";
}

/**
 * BusinessImpactAnalysisWidget displays business impact analysis for CIA components
 */
const BusinessImpactAnalysisWidget: React.FC<
  BusinessImpactAnalysisWidgetProps
> = ({
  availabilityLevel,
  integrityLevel,
  confidentialityLevel,
  securityLevel, // Overall security level
  className = "",
  testId = BUSINESS_IMPACT_TEST_IDS.BUSINESS_IMPACT_WIDGET,
  activeComponent = "availability",
}) => {
  const [activeTab, setActiveTab] = useState<
    "availability" | "integrity" | "confidentiality"
  >(activeComponent);

  // Get business impact for each component
  const availabilityImpact = ciaContentService.getBusinessImpact(
    "availability",
    availabilityLevel
  );

  const integrityImpact = ciaContentService.getBusinessImpact(
    "integrity",
    integrityLevel
  );

  const confidentialityImpact = ciaContentService.getBusinessImpact(
    "confidentiality",
    confidentialityLevel
  );

  // Get component metrics
  const availabilityMetrics = ciaContentService.getComponentMetrics(
    "availability",
    availabilityLevel
  );

  const integrityMetrics = ciaContentService.getComponentMetrics(
    "integrity",
    integrityLevel
  );

  const confidentialityMetrics = ciaContentService.getComponentMetrics(
    "confidentiality",
    confidentialityLevel
  );

  // Get appropriate badge variant for risk level
  const getRiskBadgeVariant = (riskLevel?: string) => {
    if (!riskLevel) return "neutral";

    if (riskLevel.toLowerCase().includes("high")) {
      return "error";
    } else if (riskLevel.toLowerCase().includes("medium")) {
      return "warning";
    } else if (riskLevel.toLowerCase().includes("low")) {
      return "success";
    }

    return "info";
  };

  // Active component details
  const getActiveImpact = () => {
    switch (activeTab) {
      case "availability":
        return {
          impact: availabilityImpact,
          metrics: availabilityMetrics,
          color: CIA_COMPONENT_COLORS.AVAILABILITY.PRIMARY,
          level: availabilityLevel,
          icon: CIA_COMPONENT_ICONS.AVAILABILITY,
          badgeVariant: "info" as const,
          label: CIA_LABELS.AVAILABILITY,
        };
      case "integrity":
        return {
          impact: integrityImpact,
          metrics: integrityMetrics,
          color: CIA_COMPONENT_COLORS.INTEGRITY.PRIMARY,
          level: integrityLevel,
          icon: CIA_COMPONENT_ICONS.INTEGRITY,
          badgeVariant: "success" as const,
          label: CIA_LABELS.INTEGRITY,
        };
      case "confidentiality":
        return {
          impact: confidentialityImpact,
          metrics: confidentialityMetrics,
          color: CIA_COMPONENT_COLORS.CONFIDENTIALITY.PRIMARY,
          level: confidentialityLevel,
          icon: CIA_COMPONENT_ICONS.CONFIDENTIALITY,
          badgeVariant: "purple" as const,
          label: CIA_LABELS.CONFIDENTIALITY,
        };
    }
  };

  const { impact, metrics, color, level, icon, badgeVariant, label } =
    getActiveImpact();

  // Handle cases where data might not be available
  if (!impact) {
    return (
      <WidgetContainer
        title="Business Impact Analysis"
        icon="📊"
        className={className}
        testId={testId}
        error={new Error("Business impact details not available")}
      >
        <div>Business impact details not available</div>
      </WidgetContainer>
    );
  }

  return (
    <WidgetContainer
      title="Business Impact Analysis"
      icon="📊"
      className={className}
      testId={testId}
    >
      <div className="space-y-6">
        {/* Tab navigation */}
        <div className="flex border-b mb-4" role="tablist">
          <button
            className={`px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              activeTab === "availability"
                ? "border-b-2 border-blue-500 text-blue-600 dark:text-blue-400"
                : "text-gray-600 dark:text-gray-400"
            }`}
            onClick={() => setActiveTab("availability")}
            data-testid={`${testId}-availability-tab`}
            role="tab"
            aria-selected={activeTab === "availability"}
            aria-controls="availability-tab-panel"
            id="availability-tab-button"
            style={
              activeTab === "availability"
                ? { borderColor: CIA_COMPONENT_COLORS.AVAILABILITY.PRIMARY }
                : undefined
            }
          >
            <span className="mr-1">{CIA_COMPONENT_ICONS.AVAILABILITY}</span>
            Availability
          </button>
          <button
            className={`px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              activeTab === "integrity"
                ? "border-b-2 border-blue-500 text-blue-600 dark:text-blue-400"
                : "text-gray-600 dark:text-gray-400"
            }`}
            onClick={() => setActiveTab("integrity")}
            data-testid={`${testId}-integrity-tab`}
            role="tab"
            aria-selected={activeTab === "integrity"}
            aria-controls="integrity-tab-panel"
            id="integrity-tab-button"
            style={
              activeTab === "integrity"
                ? { borderColor: CIA_COMPONENT_COLORS.INTEGRITY.PRIMARY }
                : undefined
            }
          >
            <span className="mr-1">{CIA_COMPONENT_ICONS.INTEGRITY}</span>
            Integrity
          </button>
          <button
            className={`px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              activeTab === "confidentiality"
                ? "border-b-2 border-blue-500 text-blue-600 dark:text-blue-400"
                : "text-gray-600 dark:text-gray-400"
            }`}
            onClick={() => setActiveTab("confidentiality")}
            data-testid={`${testId}-confidentiality-tab`}
            role="tab"
            aria-selected={activeTab === "confidentiality"}
            aria-controls="confidentiality-tab-panel"
            id="confidentiality-tab-button"
            style={
              activeTab === "confidentiality"
                ? { borderColor: CIA_COMPONENT_COLORS.CONFIDENTIALITY.PRIMARY }
                : undefined
            }
          >
            <span className="mr-1">{CIA_COMPONENT_ICONS.CONFIDENTIALITY}</span>
            Confidentiality
          </button>
        </div>

        {/* Component Summary */}
        <div
          className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg border-l-4 security-card"
          style={{ borderLeftColor: color }}
        >
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-lg font-medium flex items-center">
              <span className="mr-2">{icon}</span>
              {label} Impact
            </h3>
            <StatusBadge status={badgeVariant} className="text-xs px-3">
              {level}
            </StatusBadge>
          </div>

          <p
            className="text-gray-600 dark:text-gray-300 mb-4"
            data-testid={`${testId}-summary`}
          >
            {impact.summary}
          </p>
        </div>

        {/* Impact Areas */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Operational Impact */}
          {impact.operational && (
            <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg border shadow-sm security-card">
              <div className="flex items-center justify-between mb-3">
                <h4 className="text-md font-medium flex items-center">
                  <span className="mr-2">⚙️</span>
                  Operational Impact
                </h4>
                <StatusBadge
                  status={getRiskBadgeVariant(impact.operational.riskLevel)}
                  size="sm"
                >
                  {impact.operational.riskLevel || "Unknown"}
                </StatusBadge>
              </div>

              <p className="text-sm text-gray-600 dark:text-gray-300">
                {impact.operational.description}
              </p>

              {metrics.operationalImpact && (
                <div className="mt-3 pt-3 border-t border-gray-200 dark:border-gray-700">
                  <span className="text-xs text-gray-500 dark:text-gray-400">
                    Key Metric
                  </span>
                  <div className="text-sm font-medium mt-1">
                    {activeTab === "availability"
                      ? `Uptime: ${metrics.uptime || "N/A"}`
                      : metrics.operationalImpact}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Financial Impact */}
          {impact.financial && (
            <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg border shadow-sm security-card">
              <div className="flex items-center justify-between mb-3">
                <h4 className="text-md font-medium flex items-center">
                  <span className="mr-2">💰</span>
                  Financial Impact
                </h4>
                <StatusBadge
                  status={getRiskBadgeVariant(impact.financial.riskLevel)}
                  size="sm"
                >
                  {impact.financial.riskLevel || "Unknown"}
                </StatusBadge>
              </div>

              <p className="text-sm text-gray-600 dark:text-gray-300">
                {impact.financial.description}
              </p>

              {metrics.financialImpact && (
                <div className="mt-3 pt-3 border-t border-gray-200 dark:border-gray-700">
                  <span className="text-xs text-gray-500 dark:text-gray-400">
                    Potential Cost
                  </span>
                  <div className="text-sm font-medium mt-1">
                    {metrics.financialImpact}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Secondary Impact Areas */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {/* Reputational Impact */}
          {impact.reputational && (
            <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg border shadow-sm security-card">
              <div className="flex items-center justify-between mb-2">
                <h4 className="text-sm font-medium flex items-center">
                  <span className="mr-2">🏆</span>
                  Reputational Impact
                </h4>
                {impact.reputational.riskLevel && (
                  <StatusBadge
                    status={getRiskBadgeVariant(impact.reputational.riskLevel)}
                    size="xs"
                  >
                    {impact.reputational.riskLevel}
                  </StatusBadge>
                )}
              </div>
              <p className="text-xs text-gray-600 dark:text-gray-300">
                {impact.reputational.description}
              </p>
            </div>
          )}

          {/* Regulatory Impact */}
          {impact.regulatory && (
            <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg border shadow-sm security-card">
              <div className="flex items-center justify-between mb-2">
                <h4 className="text-sm font-medium flex items-center">
                  <span className="mr-2">⚖️</span>
                  Regulatory Impact
                </h4>
                {impact.regulatory.riskLevel && (
                  <StatusBadge
                    status={getRiskBadgeVariant(impact.regulatory.riskLevel)}
                    size="xs"
                  >
                    {impact.regulatory.riskLevel}
                  </StatusBadge>
                )}
              </div>
              <p className="text-xs text-gray-600 dark:text-gray-300">
                {impact.regulatory.description}
              </p>
            </div>
          )}

          {/* Strategic Impact */}
          {impact.strategic && (
            <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg border shadow-sm security-card">
              <div className="flex items-center justify-between mb-2">
                <h4 className="text-sm font-medium flex items-center">
                  <span className="mr-2">🎯</span>
                  Strategic Impact
                </h4>
                {impact.strategic.riskLevel && (
                  <StatusBadge
                    status={getRiskBadgeVariant(impact.strategic.riskLevel)}
                    size="xs"
                  >
                    {impact.strategic.riskLevel}
                  </StatusBadge>
                )}
              </div>
              <p className="text-xs text-gray-600 dark:text-gray-300">
                {impact.strategic.description}
              </p>
            </div>
          )}
        </div>

        {/* Component-specific metrics */}
        {activeTab === "availability" && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
            {metrics.uptime && (
              <div className="p-3 bg-blue-50 dark:bg-blue-900 dark:bg-opacity-20 rounded-lg text-center">
                <div className="text-xs text-gray-500 dark:text-gray-400">
                  Uptime
                </div>
                <div className="text-lg font-bold text-blue-600 dark:text-blue-400">
                  {metrics.uptime}
                </div>
              </div>
            )}
            {metrics.rto && (
              <div className="p-3 bg-blue-50 dark:bg-blue-900 dark:bg-opacity-20 rounded-lg text-center">
                <div className="text-xs text-gray-500 dark:text-gray-400">
                  RTO
                </div>
                <div className="text-lg font-bold text-blue-600 dark:text-blue-400">
                  {metrics.rto}
                </div>
              </div>
            )}
            {metrics.rpo && (
              <div className="p-3 bg-blue-50 dark:bg-blue-900 dark:bg-opacity-20 rounded-lg text-center">
                <div className="text-xs text-gray-500 dark:text-gray-400">
                  RPO
                </div>
                <div className="text-lg font-bold text-blue-600 dark:text-blue-400">
                  {metrics.rpo}
                </div>
              </div>
            )}
            {metrics.mttr && (
              <div className="p-3 bg-blue-50 dark:bg-blue-900 dark:bg-opacity-20 rounded-lg text-center">
                <div className="text-xs text-gray-500 dark:text-gray-400">
                  MTTR
                </div>
                <div className="text-lg font-bold text-blue-600 dark:text-blue-400">
                  {metrics.mttr}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </WidgetContainer>
  );
};

export default BusinessImpactAnalysisWidget;
