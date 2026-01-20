import React from "react";
import { WIDGET_ICONS, WIDGET_TITLES } from "../../../constants/appConstants";
import { SECURITY_SUMMARY_WIDGET_IDS, SECURITY_SUMMARY_TEST_IDS } from "../../../constants/testIds";
import { useCIAContentService } from "../../../hooks/useCIAContentService";
import { useComplianceService } from "../../../hooks/useComplianceService";
import { useSecurityMetricsService } from "../../../hooks/useSecurityMetricsService";
import { useSecuritySummaryData } from "../../../hooks/useSecuritySummaryData";
import { SecurityLevel } from "../../../types/cia";
import { SecuritySummaryWidgetProps } from "../../../types/widget-props";
import { Tab } from "../../../types/tabs";
import { 
  getWidgetAriaDescription,
  ARIA_ROLES 
} from "../../../utils/accessibility";
import { cn } from "../../../utils/tailwindClassHelpers";
import WidgetContainer from "../../common/WidgetContainer";
import WidgetErrorBoundary from "../../common/WidgetErrorBoundary";
import TabContainer from "../../common/TabContainer";
import { SecurityBusinessTab } from "./SecurityBusinessTab";
import { SecurityComplianceTab } from "./SecurityComplianceTab";
import { SecurityImplementationTab } from "./SecurityImplementationTab";
import { SecurityOverviewTab } from "./SecurityOverviewTab";



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

  // Configure tabs with content
  const tabs: Tab[] = [
    {
      id: 'overview',
      label: 'Overview',
      content: (
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
      ),
      testId: `${testId}-tab-overview`,
    },
    {
      id: 'business',
      label: 'Business Value',
      content: (
        <SecurityBusinessTab
          businessMaturityLevel={businessMaturityLevel}
          businessMaturityDescription={businessMaturityDescription}
          securityScore={securityScore}
          costDetails={costDetails}
          testId={testId}
          roiEstimate={roiEstimate}
        />
      ),
      testId: `${testId}-tab-business`,
    },
    {
      id: 'implementation',
      label: 'Implementation',
      content: (
        <SecurityImplementationTab
          availabilityLevel={availabilityLevel}
          integrityLevel={integrityLevel}
          confidentialityLevel={confidentialityLevel}
          implementationComplexity={implementationComplexity}
          testId={testId}
          implementationTime={implementationTime}
          requiredResources={requiredResources}
        />
      ),
      testId: `${testId}-tab-implementation`,
    },
    {
      id: 'compliance',
      label: 'Compliance',
      badge: complianceStatus 
        ? (complianceStatus.compliantFrameworks?.length || 0) + 
          (complianceStatus.partiallyCompliantFrameworks?.length || 0) + 
          (complianceStatus.nonCompliantFrameworks?.length || 0)
        : undefined,
      content: (
        <SecurityComplianceTab
          availabilityLevel={availabilityLevel}
          integrityLevel={integrityLevel}
          confidentialityLevel={confidentialityLevel}
          securityScore={securityScore}
          complianceStatus={complianceStatus}
          testId={testId}
        />
      ),
      testId: `${testId}-tab-compliance`,
    },
  ];

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
        <div 
          className="space-y-xs"
          role={ARIA_ROLES.REGION}
          aria-label={getWidgetAriaDescription(
            "Security Summary",
            "Comprehensive executive summary of security posture with key metrics"
          )}
        >
          {/* Security Classification Banner - Compact layout */}
          <section 
            className={cn(
              "p-xs rounded-md border-l-4 border-info dark:border-info-light",
              "bg-info-light/10 dark:bg-info-dark/20"
            )}
            aria-labelledby="security-classification-heading"
            data-testid={SECURITY_SUMMARY_WIDGET_IDS.section('classification-banner')}
          >
            <div className="flex justify-between items-center gap-sm">
              <div className="flex-1 min-w-0">
                <h2 
                  id="security-classification-heading"
                  className="text-body-lg font-semibold text-gray-800 dark:text-gray-100 flex items-center gap-xs mb-xs"
                >
                  <span 
                    className="inline-block w-2 h-2 rounded-full bg-info dark:bg-info-light pulse-dot"
                    aria-hidden="true"
                  ></span>
                  {securityClassification}
                </h2>
                <p 
                  className="text-caption text-gray-600 dark:text-gray-400"
                  id="security-classification-description"
                >
                  {securityLevelDescription}
                </p>
              </div>
              <div className="text-right flex-shrink-0" role="group" aria-label="Security metrics">
                <div 
                  className="text-xs font-medium text-gray-500 dark:text-gray-500 uppercase tracking-wide mb-xs"
                  id="security-score-label"
                >
                  Score
                </div>
                <div 
                  className="font-bold text-heading text-info dark:text-info-light leading-none"
                  aria-labelledby="security-score-label"
                  aria-live="polite"
                >
                  {securityScore}%
                </div>
                <div
                  className={cn(
                    "text-caption font-medium mt-xs",
                    getRiskColorClass(riskLevel)
                  )}
                  data-testid={SECURITY_SUMMARY_WIDGET_IDS.label('risk-level')}
                  aria-label={`Risk level: ${riskLevel}`}
                  role="status"
                >
                  {riskLevel}
                </div>
              </div>
            </div>
          </section>

          {/* Tab Navigation and Content */}
          <TabContainer
            tabs={tabs}
            initialTab="overview"
            testId={`${testId}-tabs`}
          />
        </div>
      </WidgetContainer>
    </WidgetErrorBoundary>
  );
};

export default SecuritySummaryWidget;
