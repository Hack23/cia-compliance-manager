import React, { useState } from "react";
import { WIDGET_ICONS, WIDGET_TITLES } from "../../../constants/appConstants";
import { SECURITY_SUMMARY_TEST_IDS } from "../../../constants/testIds";
import { useCIAContentService } from "../../../hooks/useCIAContentService";
import { useComplianceService } from "../../../hooks/useComplianceService";
import { useSecurityMetricsService } from "../../../hooks/useSecurityMetricsService";
import { useSecuritySummaryData } from "../../../hooks/useSecuritySummaryData";
import { SecurityLevel } from "../../../types/cia";
import WidgetContainer from "../../common/WidgetContainer";
import WidgetErrorBoundary from "../../common/WidgetErrorBoundary";
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
    implementationTime,
    requiredResources,
    roiEstimate,
    getStatusVariant,
    getRiskColorClass,
  } = useSecuritySummaryData(
    availabilityLevel,
    integrityLevel,
    confidentialityLevel,
    ciaContentService,
    complianceService
  );

  return (
    <WidgetErrorBoundary widgetName="Security Summary">
      <WidgetContainer
        title={WIDGET_TITLES.SECURITY_SUMMARY}
        icon={WIDGET_ICONS.SECURITY_SUMMARY}
        className={className}
        testId={testId}
        isLoading={isLoading}
        error={error}
      >
        <div className="p-md sm:p-lg">
          {/* Security Classification Banner */}
          <div className="mb-md p-md bg-info-light/10 dark:bg-info-dark/20 rounded-md border-l-4 border-info dark:border-info-light shadow-md">
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-heading font-semibold flex items-center gap-sm">
                  <span className="inline-block w-3 h-3 rounded-full bg-info dark:bg-info-light pulse-dot"></span>
                  {securityClassification}
                </h2>
                <p className="text-body text-neutral dark:text-neutral-light">
                  {securityLevelDescription}
                </p>
              </div>
              <div className="text-right">
                <div className="text-caption text-neutral dark:text-neutral-light">
                  Security Score
                </div>
                <div className="font-bold text-title text-info dark:text-info-light">
                  {securityScore}%
                </div>
                <div
                  className={`text-body font-medium ${getRiskColorClass(
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
          <div className="border-b border-neutral-light dark:border-neutral-dark mb-md">
            <nav
              className="flex flex-wrap -mb-px gap-sm"
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
                  className={`py-sm px-md text-body font-medium border-b-2 transition-all duration-normal ${
                    activeTab === tab.id
                      ? "border-primary text-primary dark:text-primary-light dark:border-primary-light"
                      : "border-transparent text-neutral hover:text-neutral-dark dark:text-neutral-light dark:hover:text-white hover:border-neutral-light"
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
                roiEstimate={roiEstimate}
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
                implementationTime={implementationTime}
                requiredResources={requiredResources}
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
    </WidgetErrorBoundary>
  );
};

export default SecuritySummaryWidget;
