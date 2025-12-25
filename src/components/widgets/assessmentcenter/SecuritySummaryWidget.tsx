import React, { useState, useRef, useEffect } from "react";
import { WIDGET_ICONS, WIDGET_TITLES } from "../../../constants/appConstants";
import { SECURITY_SUMMARY_TEST_IDS, ACCESSIBILITY_TEST_IDS } from "../../../constants/testIds";
import { useCIAContentService } from "../../../hooks/useCIAContentService";
import { useComplianceService } from "../../../hooks/useComplianceService";
import { useSecurityMetricsService } from "../../../hooks/useSecurityMetricsService";
import { useSecuritySummaryData } from "../../../hooks/useSecuritySummaryData";
import { SecurityLevel } from "../../../types/cia";
import { 
  getTabAriaProps, 
  getTabPanelAriaProps, 
  handleArrowKeyNavigation,
  getWidgetAriaDescription,
  ARIA_ROLES 
} from "../../../utils/accessibility";
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
 * Tab configuration for accessibility navigation
 */
const SUMMARY_TABS = [
  { id: "overview" as const, label: "Overview" },
  { id: "business" as const, label: "Business Value" },
  { id: "implementation" as const, label: "Implementation" },
  { id: "compliance" as const, label: "Compliance" },
] as const;

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
  const tabListRef = useRef<HTMLDivElement>(null);

  // Handle keyboard navigation for tabs
  const handleTabKeyDown = (event: React.KeyboardEvent, index: number): void => {
    handleArrowKeyNavigation(
      event,
      index,
      SUMMARY_TABS.length,
      (newIndex) => {
        setActiveTab(SUMMARY_TABS[newIndex].id);
        
        // Focus the new tab button
        const tabButtons = tabListRef.current?.querySelectorAll('button[role="tab"]');
        if (tabButtons && tabButtons[newIndex]) {
          (tabButtons[newIndex] as HTMLButtonElement).focus();
        }
      },
      'horizontal'
    );
  };

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
        aria-label={getWidgetAriaDescription(
          "Security Summary",
          "Comprehensive executive summary of security posture with key metrics"
        )}
      >
        <div className="p-md sm:p-lg">
          {/* Security Classification Banner */}
          <section 
            className="mb-md p-md bg-info-light/10 dark:bg-info-dark/20 rounded-md border-l-4 border-info dark:border-info-light shadow-md"
            aria-labelledby="security-classification-heading"
            data-testid={`${testId}-classification-banner`}
          >
            <div className="flex justify-between items-center">
              <div>
                <h2 
                  id="security-classification-heading"
                  className="text-heading font-semibold flex items-center gap-sm"
                >
                  <span 
                    className="inline-block w-3 h-3 rounded-full bg-info dark:bg-info-light pulse-dot"
                    aria-hidden="true"
                  ></span>
                  {securityClassification}
                </h2>
                <p 
                  className="text-body text-neutral dark:text-neutral-light"
                  id="security-classification-description"
                >
                  {securityLevelDescription}
                </p>
              </div>
              <div className="text-right" role="group" aria-label="Security metrics">
                <div 
                  className="text-caption text-neutral dark:text-neutral-light"
                  id="security-score-label"
                >
                  Security Score
                </div>
                <div 
                  className="font-bold text-title text-info dark:text-info-light"
                  aria-labelledby="security-score-label"
                  aria-live="polite"
                >
                  {securityScore}%
                </div>
                <div
                  className={`text-body font-medium ${getRiskColorClass(
                    riskLevel
                  )}`}
                  data-testid={`${testId}-risk-level`}
                  aria-label={`Risk level: ${riskLevel}`}
                  role="status"
                >
                  {riskLevel}
                </div>
              </div>
            </div>
          </section>

          {/* Tab Navigation */}
          <div className="border-b border-neutral-light dark:border-neutral-dark mb-md">
            <nav
              ref={tabListRef}
              className="flex flex-wrap -mb-px gap-sm"
              aria-label="Security Summary Tabs"
              role={ARIA_ROLES.TABLIST}
              data-testid={ACCESSIBILITY_TEST_IDS.WIDGET_KEYBOARD_INSTRUCTIONS}
            >
              <span className="sr-only" id="tab-keyboard-instructions">
                Use arrow keys to navigate between tabs. Press Enter or Space to activate a tab.
              </span>
              {SUMMARY_TABS.map((tab, index) => {
                const isSelected = activeTab === tab.id;
                const tabId = `${testId}-tab-${tab.id}`;
                const panelId = `${testId}-panel-${tab.id}`;
                
                return (
                  <button
                    key={tab.id}
                    className={`py-sm px-md text-body font-medium border-b-2 transition-all duration-normal ${
                      isSelected
                        ? "border-primary text-primary dark:text-primary-light dark:border-primary-light"
                        : "border-transparent text-neutral hover:text-neutral-dark dark:text-neutral-light dark:hover:text-white hover:border-neutral-light"
                    }`}
                    onClick={() => {
                      setActiveTab(tab.id);
                    }}
                    onKeyDown={(e) => handleTabKeyDown(e, index)}
                    data-testid={tabId}
                    {...getTabAriaProps(tabId, isSelected, panelId)}
                    aria-describedby="tab-keyboard-instructions"
                  >
                    {tab.label}
                  </button>
                );
              })}
            </nav>
          </div>

          {/* Tab Content */}
          <div className="tab-content">
            {/* Overview Tab */}
            <div
              {...getTabPanelAriaProps(
                `${testId}-panel-overview`,
                `${testId}-tab-overview`,
                activeTab !== 'overview'
              )}
              data-testid={ACCESSIBILITY_TEST_IDS.CONTENT_REGION}
            >
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
            </div>

            {/* Business Value Tab */}
            <div
              {...getTabPanelAriaProps(
                `${testId}-panel-business`,
                `${testId}-tab-business`,
                activeTab !== 'business'
              )}
            >
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
            </div>

            {/* Implementation Tab */}
            <div
              {...getTabPanelAriaProps(
                `${testId}-panel-implementation`,
                `${testId}-tab-implementation`,
                activeTab !== 'implementation'
              )}
            >
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
            </div>

            {/* Compliance Tab */}
            <div
              {...getTabPanelAriaProps(
                `${testId}-panel-compliance`,
                `${testId}-tab-compliance`,
                activeTab !== 'compliance'
              )}
            >
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
        </div>
      </WidgetContainer>
    </WidgetErrorBoundary>
  );
};

export default SecuritySummaryWidget;
