import React, { useMemo } from "react";
import { WIDGET_ICONS, WIDGET_TITLES } from "../../../constants/appConstants";
import { 
  AVAILABILITY_IMPACT_TEST_IDS, 
  AVAILABILITY_IMPACT_WIDGET_IDS,
  INTEGRITY_IMPACT_TEST_IDS,
  INTEGRITY_IMPACT_WIDGET_IDS,
  CONFIDENTIALITY_IMPACT_TEST_IDS,
  CONFIDENTIALITY_IMPACT_WIDGET_IDS,
} from "../../../constants/testIds";
import { 
  getDefaultSLAMetrics,
  getDefaultErrorRate,
  getDefaultValidationLevel,
  getDefaultPrivacyImpact,
} from "../../../data/ciaOptionsData";
import { useBusinessImpact, useComponentDetails } from "../../../hooks";
import { useCIAContentService } from "../../../hooks/useCIAContentService";
import type { CIAComponent, SecurityLevel } from "../../../types/cia";
import { getSecurityLevelBackgroundClass } from "../../../utils/colorUtils";
import { normalizeSecurityLevel } from "../../../utils/securityLevelUtils";
import { getWidgetAriaDescription } from "../../../utils/accessibility";
import BusinessImpactSection from "../../common/BusinessImpactSection";
import MetricCard from "../../common/MetricCard";
import SecurityLevelBadge from "../../common/SecurityLevelBadge";
import WidgetContainer from "../../common/WidgetContainer";
import WidgetErrorBoundary from "../../common/WidgetErrorBoundary";
import WidgetSection from "../../common/WidgetSection";

/**
 * Props for the shared ImpactWidget component
 */
export interface ImpactWidgetProps {
  /** CIA component (availability, integrity, or confidentiality) */
  component: CIAComponent;
  /** Selected security level for this component */
  level: SecurityLevel;
  /** Optional CSS class */
  className?: string;
  /** Test ID */
  testId?: string;
  /** If true, displays extended details (e.g., recommendations) */
  showExtendedDetails?: boolean;
  /** Optional error callback */
  onError?: (error: Error) => void;
}

/**
 * Configuration for each CIA component type
 */
interface ComponentConfig {
  titleKey: keyof typeof WIDGET_TITLES;
  iconKey: keyof typeof WIDGET_ICONS;
  defaultTitle: string;
  defaultIcon: string;
  color: "blue" | "green" | "purple";
  textClass: string;
  ariaDescription: string;
  categoryLabel: string;
}

/**
 * Get configuration for a specific CIA component
 */
const getComponentConfig = (component: CIAComponent): ComponentConfig => {
  switch (component) {
    case "availability":
      return {
        titleKey: "AVAILABILITY_IMPACT",
        iconKey: "AVAILABILITY_IMPACT",
        defaultTitle: "Availability Impact Analysis",
        defaultIcon: "⏱️",
        color: "blue",
        textClass: "text-blue-800 dark:text-blue-300",
        ariaDescription: "Business impact of availability controls including uptime targets and recovery objectives",
        categoryLabel: "Availability",
      };
    case "integrity":
      return {
        titleKey: "INTEGRITY_IMPACT",
        iconKey: "INTEGRITY_IMPACT",
        defaultTitle: "Integrity Impact Analysis",
        defaultIcon: "✓",
        color: "green",
        textClass: "text-green-800 dark:text-green-300",
        ariaDescription: "Business impact of integrity controls including data accuracy and validation mechanisms",
        categoryLabel: "Integrity",
      };
    case "confidentiality":
      return {
        titleKey: "CONFIDENTIALITY_IMPACT",
        iconKey: "CONFIDENTIALITY_IMPACT",
        defaultTitle: "Confidentiality Impact Analysis",
        defaultIcon: "🔒",
        color: "purple",
        textClass: "text-purple-800 dark:text-purple-300",
        ariaDescription: "Business impact of confidentiality controls including data classification and privacy measures",
        categoryLabel: "Confidentiality",
      };
  }
};

/**
 * Get test IDs based on component type
 */
const getTestIds = (component: CIAComponent) => {
  switch (component) {
    case "availability":
      return {
        prefix: AVAILABILITY_IMPACT_TEST_IDS.AVAILABILITY_IMPACT_PREFIX,
        widgetIds: AVAILABILITY_IMPACT_WIDGET_IDS,
      };
    case "integrity":
      return {
        prefix: INTEGRITY_IMPACT_TEST_IDS.INTEGRITY_IMPACT_PREFIX,
        widgetIds: INTEGRITY_IMPACT_WIDGET_IDS,
      };
    case "confidentiality":
      return {
        prefix: CONFIDENTIALITY_IMPACT_TEST_IDS.CONFIDENTIALITY_IMPACT_PREFIX,
        widgetIds: CONFIDENTIALITY_IMPACT_WIDGET_IDS,
      };
  }
};

/**
 * Shared widget component for displaying CIA component impact analysis
 * 
 * ## Business Perspective
 * 
 * This widget provides a unified interface for displaying the business impact
 * of security levels across all CIA triad components (Availability, Integrity,
 * Confidentiality). It helps stakeholders understand the practical implications
 * of their security choices through metrics, business impact analysis, and
 * technical details. 📊
 */
const ImpactWidget: React.FC<ImpactWidgetProps> = ({
  component,
  level,
  className = "",
  testId,
  showExtendedDetails = false,
  onError,
}) => {
  // Get component-specific configuration
  const config = getComponentConfig(component);
  const testIds = getTestIds(component);
  const effectiveTestId = testId || testIds.prefix;

  // Use security level utility for consistent normalization
  const effectiveLevel = normalizeSecurityLevel(level || "Moderate");

  // Get CIA content service for loading/error states
  const { ciaContentService, error, isLoading } = useCIAContentService();

  // Invoke error callback when service error occurs
  React.useEffect(() => {
    if (error && onError) {
      onError(error);
    }
  }, [error, onError]);

  // Use custom hooks for data fetching
  const details = useComponentDetails(component, effectiveLevel);
  const businessImpact = useBusinessImpact(component, effectiveLevel);

  // Get recommendations for extended details
  const recommendations = useMemo(() => {
    if (!showExtendedDetails || !ciaContentService) return [];
    
    try {
      return ciaContentService.getRecommendations(component, effectiveLevel) || [];
    } catch (err) {
      console.error(`Error getting ${component} recommendations:`, err);
      return [];
    }
  }, [showExtendedDetails, ciaContentService, component, effectiveLevel]);

  // Get component-specific metrics
  const metrics = useMemo(() => {
    switch (component) {
      case "availability": {
        const defaultMetrics = getDefaultSLAMetrics(effectiveLevel);
        return {
          type: "availability" as const,
          data: {
            uptime: details?.uptime || defaultMetrics.uptime,
            rto: details?.rto || defaultMetrics.rto,
            rpo: details?.rpo || defaultMetrics.rpo,
            mttr: details?.mttr || defaultMetrics.mttr,
            sla: details?.sla || defaultMetrics.sla,
          },
        };
      }
      case "integrity":
        return {
          type: "integrity" as const,
          data: {
            validationLevel: details?.validationLevel || getDefaultValidationLevel(effectiveLevel),
            errorRate: details?.errorRate || getDefaultErrorRate(effectiveLevel),
          },
        };
      case "confidentiality": {
        const dataClassification = ciaContentService
          ? (() => {
              try {
                return ciaContentService.getInformationSensitivity(effectiveLevel);
              } catch {
                return `${effectiveLevel} Classification`;
              }
            })()
          : `${effectiveLevel} Classification`;

        return {
          type: "confidentiality" as const,
          data: {
            dataClassification,
            privacyImpact: details?.privacyImpact || getDefaultPrivacyImpact(effectiveLevel),
          },
        };
      }
    }
  }, [component, effectiveLevel, details, ciaContentService]);

  return (
    <WidgetErrorBoundary widgetName={`${config.categoryLabel} Impact`}>
      <WidgetContainer
        title={WIDGET_TITLES[config.titleKey] || config.defaultTitle}
        icon={WIDGET_ICONS[config.iconKey] || config.defaultIcon}
        className={`${className} ${component === "availability" ? "cia-availability" : ""} ${
          component === "confidentiality" ? "overflow-visible" : ""
        }`}
        testId={effectiveTestId}
        isLoading={isLoading}
        error={error}
      >
        <div
          className={`p-md sm:p-lg ${component === "availability" ? "cia-widget" : ""} ${
            component === "confidentiality" ? "max-h-[550px] overflow-y-auto pr-1" : ""
          }`}
          role="region"
          aria-label={getWidgetAriaDescription(config.defaultTitle, config.ariaDescription)}
        >
          {/* Security level indicator */}
          <section
            className="mb-md"
            aria-labelledby={`${component}-level-heading`}
          >
            <h3 id={`${component}-level-heading`} className="sr-only">
              Current {config.categoryLabel} Security Level
            </h3>
            <SecurityLevelBadge
              category={config.categoryLabel}
              level={effectiveLevel}
              colorClass={getSecurityLevelBackgroundClass(config.color)}
              textClass={config.textClass}
              testId={
                component === "integrity"
                  ? `${effectiveTestId}-integrity-badge`
                  : component === "confidentiality"
                  ? testIds.widgetIds.label("security-badge")
                  : testIds.widgetIds.label("security-level")
              }
            />
          </section>

          {/* Business Impact Analysis */}
          {businessImpact && (
            <section
              className={component === "integrity" ? "mt-md" : "mb-md"}
              aria-labelledby={`${component}-business-impact-heading`}
            >
              {component !== "integrity" && (
                <h3 id={`${component}-business-impact-heading`} className="text-lg font-medium mb-sm">
                  Business Impact
                </h3>
              )}
              <BusinessImpactSection
                impact={businessImpact}
                color={config.color}
                testId={
                  component === "integrity"
                    ? `${effectiveTestId}-business-impact`
                    : testIds.widgetIds.section("business-impact")
                }
              />
            </section>
          )}

          {/* Component-specific metrics */}
          {metrics.type === "availability" && (
            <WidgetSection
              title="SLA Metrics"
              icon="⏱️"
              variant="info"
              className="mb-md"
              ariaLabelledBy="sla-metrics-heading"
              testId={testIds.widgetIds.section("sla-metrics")}
            >
              <div
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-md mb-md"
                role="group"
                aria-label="Service level agreement metrics"
              >
                <MetricCard
                  label="Uptime Target"
                  value={metrics.data.uptime}
                  icon="📈"
                  description="Expected system availability"
                  variant="info"
                  testId={testIds.widgetIds.label("uptime")}
                />
                <MetricCard
                  label="Recovery Time Objective"
                  value={metrics.data.rto}
                  icon="⏱️"
                  description="Time to restore service"
                  variant="info"
                  testId={testIds.widgetIds.label("rto")}
                />
                <MetricCard
                  label="Recovery Point Objective"
                  value={metrics.data.rpo}
                  icon="💾"
                  description="Maximum data loss allowed"
                  variant="info"
                  testId={testIds.widgetIds.label("rpo")}
                />
              </div>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-md">
                <MetricCard
                  label="Service Level Agreement"
                  value={metrics.data.sla}
                  icon="📋"
                  description="Support coverage period"
                  variant="info"
                  testId={testIds.widgetIds.label("sla")}
                />
              </div>
            </WidgetSection>
          )}

          {metrics.type === "integrity" && (
            <WidgetSection
              title="Data Integrity Metrics"
              icon="📊"
              variant="success"
              className="mb-md"
              testId={testIds.widgetIds.section("metrics")}
            >
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-md">
                <MetricCard
                  label="Data Validation Controls"
                  value={metrics.data.validationLevel}
                  icon="✓"
                  variant="success"
                  testId={testIds.widgetIds.label("validation")}
                />
                <MetricCard
                  label="Acceptable Error Rate"
                  value={metrics.data.errorRate}
                  icon="📉"
                  variant="success"
                  testId={testIds.widgetIds.label("error-rate")}
                />
              </div>
            </WidgetSection>
          )}

          {metrics.type === "confidentiality" && (
            <>
              <WidgetSection
                title="Data Protection"
                icon="📊"
                variant="primary"
                className="mb-lg"
                testId={testIds.widgetIds.section("data-protection")}
              >
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-md">
                  <MetricCard
                    label="Data Classification"
                    value={metrics.data.dataClassification}
                    icon="🏷️"
                    description="Level of data sensitivity"
                    variant="primary"
                    testId={testIds.widgetIds.label("classification")}
                  />
                </div>
              </WidgetSection>

              <WidgetSection
                title="Privacy Impact"
                icon="🔒"
                variant="primary"
                className="mb-lg"
                testId={testIds.widgetIds.section("privacy-impact")}
              >
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-md">
                  <MetricCard
                    label="Privacy Impact"
                    value={metrics.data.privacyImpact}
                    icon="🛡️"
                    variant="primary"
                    testId={testIds.widgetIds.label("privacy")}
                  />
                </div>
              </WidgetSection>
            </>
          )}

          {/* 
            Recommendations (visible only for integrity when showExtendedDetails is true)
            Note: Only IntegrityImpactWidget supports recommendations in the original implementation.
            This maintains backward compatibility with the existing API.
          */}
          {showExtendedDetails && component === "integrity" && recommendations.length > 0 && (
            <div className="mt-md">
              <h3 className="text-lg font-medium mb-sm">Recommendations</h3>
              <ul className="list-disc pl-5 space-y-1">
                {recommendations.map((rec, index) => (
                  <li
                    key={index}
                    className="text-sm text-gray-600 dark:text-gray-400"
                  >
                    {rec}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </WidgetContainer>
    </WidgetErrorBoundary>
  );
};

export default ImpactWidget;
