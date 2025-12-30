import React, { useEffect, useMemo } from "react";
import { WIDGET_ICONS, WIDGET_TITLES } from "../../../constants/appConstants";
import { CONFIDENTIALITY_IMPACT_WIDGET_IDS } from "../../../constants/testIds";
import { getDefaultPrivacyImpact } from "../../../data/ciaOptionsData";
import { useBusinessImpact, useComponentDetails } from "../../../hooks";
import { useCIAContentService } from "../../../hooks/useCIAContentService";
import type { ConfidentialityImpactWidgetProps } from "../../../types/widget-props";
import { getSecurityLevelBackgroundClass } from "../../../utils/colorUtils";
import { getWidgetAriaDescription } from "../../../utils/accessibility";
import BusinessImpactSection from "../../common/BusinessImpactSection";
import MetricCard from "../../common/MetricCard";
import SecurityLevelBadge from "../../common/SecurityLevelBadge";
import WidgetContainer from "../../common/WidgetContainer";
import WidgetErrorBoundary from "../../common/WidgetErrorBoundary";
import WidgetSection from "../../common/WidgetSection";

/**
 * Displays confidentiality impact details for the selected security level
 *
 * ## Business Perspective
 *
 * This widget helps stakeholders understand how confidentiality security levels
 * affect business operations through metrics like data classification, access controls,
 * and encryption methods. The visualization of these metrics supports better decision-making
 * about data protection requirements and privacy investments. 🔒
 */
const ConfidentialityImpactWidget: React.FC<
  ConfidentialityImpactWidgetProps
> = ({
  availabilityLevel: _availabilityLevel,
  integrityLevel: _integrityLevel,
  confidentialityLevel,
  className = "",
  testId = "widget-confidentiality-impact",
  showExtendedDetails: _showExtendedDetails = false,
  onError: _onError,
}) => {
  // Use the content service to get loading/error state
  const {
    ciaContentService,
    error: serviceError,
    isLoading,
  } = useCIAContentService();

  // Use the effective level - confidentialityLevel is required
  const effectiveLevel = confidentialityLevel || "Moderate";

  // Invoke error callback when service error occurs
  useEffect(() => {
    if (serviceError && _onError) {
      _onError(serviceError);
    }
  }, [serviceError, _onError]);

  // Use custom hooks for data fetching (replaces manual useMemo logic)
  const details = useComponentDetails("confidentiality", effectiveLevel);
  const businessImpact = useBusinessImpact("confidentiality", effectiveLevel);

  // Get data classification from service with fallback
  const dataClassification = useMemo(() => {
    if (!ciaContentService) {
      return `${effectiveLevel} Classification`;
    }

    try {
      return ciaContentService.getInformationSensitivity(effectiveLevel);
    } catch (err) {
      console.error("Error getting data classification:", err);
      return `${effectiveLevel} Classification`;
    }
  }, [ciaContentService, effectiveLevel]);

  // Get privacy impact with fallback to utility function
  const privacyImpact = useMemo(() => {
    if (details && details.privacyImpact) {
      return details.privacyImpact;
    }
    return getDefaultPrivacyImpact(effectiveLevel);
  }, [details, effectiveLevel]);

  return (
    <WidgetErrorBoundary widgetName="Confidentiality Impact">
      <WidgetContainer
        title={
          WIDGET_TITLES.CONFIDENTIALITY_IMPACT ||
          "Confidentiality Impact Analysis"
        }
        icon={WIDGET_ICONS.CONFIDENTIALITY_IMPACT || "🔒"}
        className={`${className} overflow-visible`}
        testId={testId}
        isLoading={isLoading}
        error={serviceError}
      >
      <div 
        className="max-h-[550px] overflow-y-auto pr-1"
        role="region"
        aria-label={getWidgetAriaDescription(
          "Confidentiality Impact Analysis",
          "Business impact of confidentiality controls including data classification and privacy measures"
        )}
      >
        <section
          className="p-md sm:p-lg"
          aria-labelledby="confidentiality-impact-heading"
        >
          <h3 id="confidentiality-impact-heading" className="sr-only">
            Confidentiality Impact Details
          </h3>
          <div className="mb-md">
            <SecurityLevelBadge
              category="Confidentiality"
              level={effectiveLevel}
              // Use utility functions for consistent color handling
              colorClass={getSecurityLevelBackgroundClass("purple")}
              textClass="text-purple-800 dark:text-purple-300"
              testId={CONFIDENTIALITY_IMPACT_WIDGET_IDS.label('security-badge')}
            />
          </div>

          {/* Business Impact */}
          {businessImpact && (
            <BusinessImpactSection
              impact={businessImpact}
              color="purple"
              testId={CONFIDENTIALITY_IMPACT_WIDGET_IDS.section('business-impact')}
            />
          )}

          {/* Data Protection & Classification */}
          <WidgetSection
            title="Data Protection"
            icon="📊"
            variant="primary"
            className="mb-lg"
            testId={CONFIDENTIALITY_IMPACT_WIDGET_IDS.section('data-protection')}
          >
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-md">
              <MetricCard
                label="Data Classification"
                value={dataClassification}
                icon="🏷️"
                description="Level of data sensitivity"
                variant="primary"
                testId={CONFIDENTIALITY_IMPACT_WIDGET_IDS.label('classification')}
              />
            </div>
          </WidgetSection>

          {/* Privacy Impact */}
          <WidgetSection
            title="Privacy Impact"
            icon="🔒"
            variant="primary"
            className="mb-lg"
            testId={CONFIDENTIALITY_IMPACT_WIDGET_IDS.section('privacy-impact')}
          >
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-md">
              <MetricCard
                label="Privacy Impact"
                value={privacyImpact}
                icon="🛡️"
                variant="primary"
                testId={CONFIDENTIALITY_IMPACT_WIDGET_IDS.label('privacy')}
              />
            </div>
          </WidgetSection>
        </section>
      </div>
    </WidgetContainer>
    </WidgetErrorBoundary>
  );
};

export default ConfidentialityImpactWidget;
