import React, { useState } from "react";
import { WIDGET_ICONS, WIDGET_TITLES } from "../../../constants/appConstants";
import { SECURITY_SUMMARY_TEST_IDS } from "../../../constants/testIds";
import { useCIAContentService } from "../../../hooks/useCIAContentService";
import { useComplianceService } from "../../../hooks/useComplianceService";
import { useSecurityMetricsService } from "../../../hooks/useSecurityMetricsService";
import { useSecuritySummaryData } from "../../../hooks/useSecuritySummaryData";
import { SecurityLevel } from "../../../types/cia";
import WidgetContainer from "../../common/WidgetContainer";
import { SecurityBusinessTab } from "./SecurityBusinessTab";
import { SecurityComplianceTab } from "./SecurityComplianceTab";
import { SecurityImplementationTab } from "./SecurityImplementationTab";
import { SecurityOverviewTab } from "./SecurityOverviewTab";

/**
 * Props for SecuritySummaryWidget component
 */
export interface SecuritySummaryWidgetProps {
  /**
   * Selected availability level
   */
  availabilityLevel: SecurityLevel;

  /**
   * Selected integrity level
   */
  integrityLevel: SecurityLevel;

  /**
   * Selected confidentiality level
   */
  confidentialityLevel: SecurityLevel;

  /**
   * Optional overall security level
   */
  securityLevel?: SecurityLevel;

  /**
   * Optional CSS class name
   */
  className?: string;

  /**
   * Optional test ID
   */
  testId?: string;
}

/**
 * Tab options for the summary widget
 */
type SecuritySummaryTab =
  | "overview"
  | "business"
  | "implementation"
  | "compliance";

/**
 * Displays a comprehensive executive summary of security posture with key metrics
 *
 * ## Business Perspective
 *
 * This widget serves as an executive dashboard that provides a comprehensive view of
 * security posture, business value, implementation requirements, and compliance status.
 * It consolidates critical metrics from specialized widgets to support executive
 * decision-making and communication. 📊
 */
const SecuritySummaryWidget: React.FC<SecuritySummaryWidgetProps> = ({
  availabilityLevel,
  integrityLevel,
  confidentialityLevel,
  className = "",
  testId = SECURITY_SUMMARY_TEST_IDS.WIDGET,
}) => {
  // Active tab state
  const [activeTab, setActiveTab] = useState<SecuritySummaryTab>("overview");

  // Get services for data
  const {
    ciaContentService,
    error: ciaError,
    isLoading: ciaLoading,
  } = useCIAContentService();
  const {
    error: metricsError,
    isLoading: metricsLoading,
  } = useSecurityMetricsService();
  const {
    complianceService,
    error: complianceError,
    isLoading: complianceLoading,
  } = useComplianceService();

  // Determine if any service is loading or has errors
  const isLoading = ciaLoading || metricsLoading || complianceLoading;
  const error = ciaError || metricsError || complianceError;

  // Use custom hook for all data calculations
  const {
    securityLevelDescription,
    securityScore,
    riskLevel,
    securityClassification,
    dataClassification,
    implementationComplexity,
    complianceStatus,
    businessMaturityLevel,
    businessMaturityDescription,
    costDetails,
    getStatusVariant,
    getRiskColorClass,
    getImplementationTime,
    getRequiredResources,
    getROIEstimate,
  } = useSecuritySummaryData(
    availabilityLevel,
    integrityLevel,
    confidentialityLevel,
    ciaContentService,
    complianceService
  );

  return (
    <WidgetContainer
      title={WIDGET_TITLES.SECURITY_SUMMARY}
      icon={WIDGET_ICONS.SECURITY_SUMMARY}
      className={className}
      testId={testId}
      isLoading={isLoading}
      error={error}
    >
      <div className="p-4">
        {/* Security Classification Banner */}
        <div className="mb-4 p-3 bg-blue-50 dark:bg-blue-900 dark:bg-opacity-20 rounded-lg border-l-4 border-blue-500 dark:border-blue-400 shadow-sm">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-lg font-semibold flex items-center gap-2">
                <span className="inline-block w-3 h-3 rounded-full bg-blue-500 dark:bg-blue-400 pulse-dot"></span>
                {securityClassification}
              </h2>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                {securityLevelDescription}
              </p>
            </div>
            <div className="text-right">
              <div className="text-xs text-gray-500 dark:text-gray-400">
                Security Score
              </div>
              <div className="font-bold text-xl text-blue-600 dark:text-blue-400">
                {securityScore}%
              </div>
              <div
                className={`text-sm font-medium ${getRiskColorClass(
                  riskLevel
                )}`}
                data-testid={`${testId}-risk-level`}
              >
                {riskLevel}
              </div>
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="border-b border-gray-200 dark:border-gray-700 mb-4">
          <nav
            className="flex flex-wrap -mb-px gap-2"
            aria-label="Security Summary Tabs"
          >
            {[
              { id: "overview", label: "Overview" },
              { id: "business", label: "Business Value" },
              { id: "implementation", label: "Implementation" },
              { id: "compliance", label: "Compliance" },
            ].map((tab) => (
              <button
                key={tab.id}
                className={`py-2 px-4 text-sm font-medium border-b-2 transition-colors duration-200 ${
                  activeTab === tab.id
                    ? "border-blue-500 text-blue-600 dark:text-blue-400 dark:border-blue-400"
                    : "border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300 hover:border-gray-300"
                }`}
                onClick={() => setActiveTab(tab.id as SecuritySummaryTab)}
                data-testid={`${testId}-tab-${tab.id}`}
                aria-selected={activeTab === tab.id}
                role="tab"
              >
                {tab.label}
              </button>
            ))}
          </nav>
        </div>

        {/* Tab Content */}
        <div className="tab-content">
          {/* Overview Tab */}
          {activeTab === "overview" && (
            <SecurityOverviewTab
              availabilityLevel={availabilityLevel}
              integrityLevel={integrityLevel}
              confidentialityLevel={confidentialityLevel}
              dataClassification={dataClassification}
              implementationComplexity={implementationComplexity}
              businessMaturityLevel={businessMaturityLevel}
              businessMaturityDescription={businessMaturityDescription}
              securityScore={securityScore}
              complianceScore={complianceStatus?.complianceScore}
              testId={testId}
              getStatusVariant={getStatusVariant}
            />
          )}

          {/* Business Value Tab */}
          {activeTab === "business" && (
            <SecurityBusinessTab
              businessMaturityLevel={businessMaturityLevel}
              businessMaturityDescription={businessMaturityDescription}
              securityScore={securityScore}
              costDetails={costDetails}
              testId={testId}
              getROIEstimate={getROIEstimate}
            />
          )}

          {/* Implementation Tab */}
          {activeTab === "implementation" && (
            <SecurityImplementationTab
              availabilityLevel={availabilityLevel}
              integrityLevel={integrityLevel}
              confidentialityLevel={confidentialityLevel}
              implementationComplexity={implementationComplexity}
              testId={testId}
              getImplementationTime={getImplementationTime}
              getRequiredResources={getRequiredResources}
            />
          )}

          {/* Compliance Tab */}
          {activeTab === "compliance" && (
            <SecurityComplianceTab
              availabilityLevel={availabilityLevel}
              integrityLevel={integrityLevel}
              confidentialityLevel={confidentialityLevel}
              securityScore={securityScore}
              complianceStatus={complianceStatus}
              testId={testId}
            />
          )}
        </div>
      </div>
    </WidgetContainer>
  );
};

export default SecuritySummaryWidget;
