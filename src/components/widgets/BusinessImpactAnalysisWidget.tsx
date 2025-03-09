import React, { useState, useMemo } from "react";
import ciaContentService, {
  BusinessImpactDetails,
} from "../../services/ciaContentService";
import { CIAComponentType, SecurityLevel } from "../../types/cia";
import {
  BUSINESS_IMPACT_TEST_IDS,
  WIDGET_TEST_IDS,
} from "../../constants/testIds";
import { BUSINESS_IMPACT_ICONS } from "../../constants/uiConstants";
import {
  BUSINESS_IMPACT_CATEGORIES,
  RISK_LEVELS,
} from "../../constants/riskConstants";
import KeyValuePair from "../common/KeyValuePair";
import StatusBadge from "../common/StatusBadge";
import MetricsCard from "../common/MetricsCard";
import WidgetContainer from "../common/WidgetContainer";
import { WIDGET_ICONS, WIDGET_TITLES } from "../../constants/coreConstants";

/**
 * Props for the BusinessImpactAnalysisWidget component
 *
 * @interface BusinessImpactAnalysisWidgetProps
 * @property {SecurityLevel} availabilityLevel - The selected availability security level
 * @property {SecurityLevel} integrityLevel - The selected integrity security level
 * @property {SecurityLevel} confidentialityLevel - The selected confidentiality security level
 * @property {SecurityLevel} [securityLevel] - Optional overall security level
 * @property {string} [className] - Optional CSS class to apply to the widget
 * @property {string} [testId] - Optional test ID for testing purposes
 * @property {CIAComponentType} [activeComponent] - Optional active component to focus on
 */
export interface BusinessImpactAnalysisWidgetProps {
  availabilityLevel: SecurityLevel;
  integrityLevel: SecurityLevel;
  confidentialityLevel: SecurityLevel;
  securityLevel?: SecurityLevel;
  className?: string;
  testId?: string;
  activeComponent?: CIAComponentType;
}

/**
 * BusinessImpactAnalysisWidget displays detailed business impact analysis based on the selected
 * CIA security levels. It fetches data from ciaContentService and presents a comprehensive
 * breakdown of the business impacts across different categories such as financial, operational,
 * reputational, regulatory, and strategic.
 *
 * @component
 * @example
 * ```tsx
 * <BusinessImpactAnalysisWidget
 *   availabilityLevel="High"
 *   integrityLevel="Moderate"
 *   confidentialityLevel="High"
 * />
 * ```
 */
const BusinessImpactAnalysisWidget: React.FC<
  BusinessImpactAnalysisWidgetProps
> = ({
  availabilityLevel,
  integrityLevel,
  confidentialityLevel,
  className = "",
  testId = BUSINESS_IMPACT_TEST_IDS.BUSINESS_IMPACT_ANALYSIS_PREFIX,
  activeComponent,
}) => {
  // Component state
  const [activeTab, setActiveTab] = useState<"considerations" | "benefits">(
    "considerations"
  );
  const [selectedComponent, setSelectedComponent] = useState<CIAComponentType>(
    activeComponent || "confidentiality"
  );

  // Fetch business impact details from the service for each component
  const availabilityImpact = useMemo(
    () =>
      ciaContentService.getBusinessImpact("availability", availabilityLevel),
    [availabilityLevel]
  );

  const integrityImpact = useMemo(
    () => ciaContentService.getBusinessImpact("integrity", integrityLevel),
    [integrityLevel]
  );

  const confidentialityImpact = useMemo(
    () =>
      ciaContentService.getBusinessImpact(
        "confidentiality",
        confidentialityLevel
      ),
    [confidentialityLevel]
  );

  // Get impact details based on selected component
  const getActiveImpact = (): BusinessImpactDetails => {
    switch (selectedComponent) {
      case "availability":
        return availabilityImpact;
      case "integrity":
        return integrityImpact;
      case "confidentiality":
      default:
        return confidentialityImpact;
    }
  };

  const activeImpact = getActiveImpact();

  /**
   * Maps risk level to appropriate StatusBadge variant
   *
   * @param riskLevel - The risk level string from the service
   * @returns The appropriate StatusBadge variant
   */
  const getRiskBadgeVariant = (
    riskLevel: string
  ): "info" | "success" | "warning" | "error" | "neutral" => {
    switch (riskLevel) {
      case RISK_LEVELS.CRITICAL:
        return "error";
      case RISK_LEVELS.HIGH:
        return "warning";
      case RISK_LEVELS.MEDIUM:
        return "info";
      case RISK_LEVELS.LOW:
        return "success";
      case RISK_LEVELS.MINIMAL:
        return "success";
      default:
        return "neutral";
    }
  };

  /**
   * Get component name with proper capitalization
   *
   * @param component - The component type
   * @returns The component name with proper capitalization
   */
  const getComponentName = (component: CIAComponentType): string => {
    return component.charAt(0).toUpperCase() + component.slice(1);
  };

  /**
   * Get icon for a business impact category
   *
   * @param category - The impact category
   * @returns The emoji icon for the category
   */
  const getCategoryIcon = (category: string): string => {
    const normalizedCategory = category.toUpperCase();
    return (
      BUSINESS_IMPACT_ICONS[
        normalizedCategory as keyof typeof BUSINESS_IMPACT_ICONS
      ] || BUSINESS_IMPACT_ICONS.NEUTRAL
    );
  };

  return (
    <WidgetContainer
      title={WIDGET_TITLES.BUSINESS_IMPACT}
      icon={WIDGET_ICONS.BUSINESS_IMPACT}
      className={className}
      testId={testId}
    >
      {/* Component Selection Tabs */}
      <div className="flex mb-4 border-b border-gray-200 dark:border-gray-700">
        <button
          className={`px-4 py-2 text-sm font-medium ${
            selectedComponent === "confidentiality"
              ? "text-blue-600 border-b-2 border-blue-600 dark:text-blue-400 dark:border-blue-400"
              : "text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
          }`}
          onClick={() => setSelectedComponent("confidentiality")}
          data-testid={`${testId}-tab-confidentiality`}
        >
          🔒 Confidentiality
        </button>
        <button
          className={`px-4 py-2 text-sm font-medium ${
            selectedComponent === "integrity"
              ? "text-blue-600 border-b-2 border-blue-600 dark:text-blue-400 dark:border-blue-400"
              : "text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
          }`}
          onClick={() => setSelectedComponent("integrity")}
          data-testid={`${testId}-tab-integrity`}
        >
          🔐 Integrity
        </button>
        <button
          className={`px-4 py-2 text-sm font-medium ${
            selectedComponent === "availability"
              ? "text-blue-600 border-b-2 border-blue-600 dark:text-blue-400 dark:border-blue-400"
              : "text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
          }`}
          onClick={() => setSelectedComponent("availability")}
          data-testid={`${testId}-tab-availability`}
        >
          ⏱️ Availability
        </button>
      </div>

      {/* Business Impact Summary */}
      <div
        className="mb-6"
        data-testid={BUSINESS_IMPACT_TEST_IDS.BUSINESS_IMPACT_SUMMARY}
      >
        <h3 className="text-lg font-medium mb-2">
          {getComponentName(selectedComponent)} Impact Summary
        </h3>
        <p className="text-gray-700 dark:text-gray-300 mb-4">
          {activeImpact.summary}
        </p>

        {/* Security Level Indicator */}
        <div className="flex items-center mb-4">
          <span className="mr-2 text-sm font-medium text-gray-700 dark:text-gray-300">
            Security Level:
          </span>
          <StatusBadge
            status={
              selectedComponent === "availability"
                ? "info"
                : selectedComponent === "integrity"
                ? "success"
                : "purple"
            }
            testId={`${testId}-${selectedComponent}-level`}
          >
            {selectedComponent === "availability"
              ? availabilityLevel
              : selectedComponent === "integrity"
              ? integrityLevel
              : confidentialityLevel}
          </StatusBadge>
        </div>
      </div>

      {/* Impact Metrics Panel */}
      <div
        className="mb-6 bg-gray-50 dark:bg-gray-800 p-4 rounded-lg"
        data-testid={BUSINESS_IMPACT_TEST_IDS.IMPACT_METRICS_SECTION}
      >
        <h3 className="text-md font-medium mb-3">Impact Metrics</h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Financial Impact */}
          {activeImpact.financial && (
            <div
              data-testid={BUSINESS_IMPACT_TEST_IDS.FINANCIAL_IMPACT_CARD}
              className="bg-white dark:bg-gray-700 p-4 rounded-lg shadow-sm"
            >
              <div className="flex items-center mb-2">
                <span className="mr-2">{getCategoryIcon("financial")}</span>
                <h4 className="text-sm font-medium">Financial Impact</h4>
                <StatusBadge
                  status={getRiskBadgeVariant(activeImpact.financial.riskLevel)}
                  size="xs"
                  className="ml-auto"
                  testId={BUSINESS_IMPACT_TEST_IDS.FINANCIAL_RISK_BADGE}
                >
                  {activeImpact.financial.riskLevel}
                </StatusBadge>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">
                {activeImpact.financial.description}
              </p>
              {activeImpact.financial.annualRevenueLoss && (
                <div
                  data-testid={
                    BUSINESS_IMPACT_TEST_IDS.FINANCIAL_IMPACT_METRICS
                  }
                  className="mt-3"
                >
                  <KeyValuePair
                    label="Potential Annual Revenue Loss"
                    value={activeImpact.financial.annualRevenueLoss}
                    testId={BUSINESS_IMPACT_TEST_IDS.REVENUE_LOSS_KV}
                    valueClassName="text-red-600 dark:text-red-400 font-semibold"
                  />
                </div>
              )}
            </div>
          )}

          {/* Operational Impact */}
          {activeImpact.operational && (
            <div
              data-testid={BUSINESS_IMPACT_TEST_IDS.OPERATIONAL_IMPACT_CARD}
              className="bg-white dark:bg-gray-700 p-4 rounded-lg shadow-sm"
            >
              <div className="flex items-center mb-2">
                <span className="mr-2">{getCategoryIcon("operational")}</span>
                <h4 className="text-sm font-medium">Operational Impact</h4>
                <StatusBadge
                  status={getRiskBadgeVariant(
                    activeImpact.operational.riskLevel
                  )}
                  size="xs"
                  className="ml-auto"
                >
                  {activeImpact.operational.riskLevel}
                </StatusBadge>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">
                {activeImpact.operational.description}
              </p>
              {activeImpact.operational.meanTimeToRecover && (
                <div
                  data-testid={
                    BUSINESS_IMPACT_TEST_IDS.OPERATIONAL_IMPACT_METRICS
                  }
                  className="mt-3"
                >
                  <KeyValuePair
                    label="Mean Time to Recover"
                    value={activeImpact.operational.meanTimeToRecover}
                    testId={BUSINESS_IMPACT_TEST_IDS.RECOVERY_TIME_KV}
                    valueClassName="text-blue-600 dark:text-blue-400 font-semibold"
                  />
                </div>
              )}
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
          {/* Reputational Impact */}
          {activeImpact.reputational && (
            <div className="bg-white dark:bg-gray-700 p-4 rounded-lg shadow-sm">
              <div className="flex items-center mb-2">
                <span className="mr-2">{getCategoryIcon("reputational")}</span>
                <h4 className="text-sm font-medium">Reputational</h4>
                <StatusBadge
                  status={getRiskBadgeVariant(
                    activeImpact.reputational.riskLevel
                  )}
                  size="xs"
                  className="ml-auto"
                >
                  {activeImpact.reputational.riskLevel}
                </StatusBadge>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                {activeImpact.reputational.description}
              </p>
            </div>
          )}

          {/* Strategic Impact */}
          {activeImpact.strategic && (
            <div className="bg-white dark:bg-gray-700 p-4 rounded-lg shadow-sm">
              <div className="flex items-center mb-2">
                <span className="mr-2">{getCategoryIcon("strategic")}</span>
                <h4 className="text-sm font-medium">Strategic</h4>
                <StatusBadge
                  status={getRiskBadgeVariant(activeImpact.strategic.riskLevel)}
                  size="xs"
                  className="ml-auto"
                >
                  {activeImpact.strategic.riskLevel}
                </StatusBadge>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                {activeImpact.strategic.description}
              </p>
            </div>
          )}

          {/* Regulatory Impact */}
          {activeImpact.regulatory && (
            <div className="bg-white dark:bg-gray-700 p-4 rounded-lg shadow-sm">
              <div className="flex items-center mb-2">
                <span className="mr-2">{getCategoryIcon("regulatory")}</span>
                <h4 className="text-sm font-medium">Regulatory</h4>
                <StatusBadge
                  status={getRiskBadgeVariant(
                    activeImpact.regulatory.riskLevel
                  )}
                  size="xs"
                  className="ml-auto"
                >
                  {activeImpact.regulatory.riskLevel}
                </StatusBadge>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                {activeImpact.regulatory.description}
              </p>
              {activeImpact.regulatory.complianceImpact && (
                <div className="mt-2 text-xs text-gray-500 dark:text-gray-400">
                  Compliance: {activeImpact.regulatory.complianceImpact}
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* View type tabs */}
      <div className="flex mb-4 border-b border-gray-200 dark:border-gray-700">
        <button
          className={`px-4 py-2 text-sm font-medium ${
            activeTab === "considerations"
              ? "text-blue-600 border-b-2 border-blue-600 dark:text-blue-400 dark:border-blue-400"
              : "text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
          }`}
          onClick={() => setActiveTab("considerations")}
          data-testid={BUSINESS_IMPACT_TEST_IDS.TAB_CONSIDERATIONS}
        >
          Business Considerations
        </button>
        <button
          className={`px-4 py-2 text-sm font-medium ${
            activeTab === "benefits"
              ? "text-blue-600 border-b-2 border-blue-600 dark:text-blue-400 dark:border-blue-400"
              : "text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
          }`}
          onClick={() => setActiveTab("benefits")}
          data-testid={BUSINESS_IMPACT_TEST_IDS.TAB_BENEFITS}
        >
          Business Benefits
        </button>
      </div>

      {/* Recommendations or Business Considerations */}
      {activeTab === "considerations" ? (
        <div data-testid={BUSINESS_IMPACT_TEST_IDS.BUSINESS_CONSIDERATIONS}>
          <h3 className="text-md font-medium mb-2">
            Key Business Considerations
          </h3>
          <div className="space-y-2">
            {/* We would fetch and display business considerations here */}
            {/* For now, we'll display a placeholder message */}
            <div
              className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg"
              data-testid={BUSINESS_IMPACT_TEST_IDS.NO_CONSIDERATIONS_MESSAGE}
            >
              <p className="text-sm text-gray-600 dark:text-gray-400">
                This security level for {selectedComponent} generally{" "}
                {activeImpact.summary.toLowerCase()}
              </p>
            </div>
          </div>
        </div>
      ) : (
        <div data-testid={BUSINESS_IMPACT_TEST_IDS.BUSINESS_BENEFITS}>
          <h3 className="text-md font-medium mb-2">Business Benefits</h3>
          <div className="space-y-2">
            {/* We would fetch and display business benefits here */}
            {/* For now, we'll display a placeholder message */}
            <div
              className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg"
              data-testid={BUSINESS_IMPACT_TEST_IDS.NO_BENEFITS_MESSAGE}
            >
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Implementing this security level for {selectedComponent}{" "}
                provides significant business benefits related to risk reduction
                and operational stability.
              </p>
            </div>
          </div>
        </div>
      )}
    </WidgetContainer>
  );
};

export default BusinessImpactAnalysisWidget;
