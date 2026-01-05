import React, { useMemo, useCallback } from "react";
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
import type { ImpactWidgetProps } from "../../../types/widget-props";
import { getSecurityLevelBackgroundClass } from "../../../utils/colorUtils";
import { normalizeSecurityLevel } from "../../../utils/securityLevelUtils";
import { getWidgetAriaDescription } from "../../../utils/accessibility";
import { WidgetClasses, cn } from "../../../utils/tailwindClassHelpers";
import BusinessImpactSection from "../../common/BusinessImpactSection";
import MetricCard from "../../common/MetricCard";
import SecurityLevelBadge from "../../common/SecurityLevelBadge";
import WidgetContainer from "../../common/WidgetContainer";
import WidgetErrorBoundary from "../../common/WidgetErrorBoundary";
import WidgetSection from "../../common/WidgetSection";

/**
 * Configuration for each CIA component type
 * 
 * Defines component-specific settings including titles, icons, colors,
 * ARIA descriptions, and CSS classes for consistent rendering across
 * all three impact widgets.
 */
interface ComponentConfig {
  titleKey: keyof typeof WIDGET_TITLES;
  iconKey: keyof typeof WIDGET_ICONS;
  defaultTitle: string;
  defaultIcon: string;
  color: "blue" | "green" | "purple" | "orange";
  textClass: string;
  ariaDescription: string;
  categoryLabel: string;
  /** Container-specific CSS classes */
  containerClassName: string;
  /** Content area-specific CSS classes */
  contentClassName: string;
  /** Function to generate security badge testId */
  getSecurityBadgeTestId: (effectiveTestId: string, widgetIds: typeof AVAILABILITY_IMPACT_WIDGET_IDS) => string;
}

/**
 * Retrieves the configuration used to render a specific CIA (Confidentiality, Integrity, Availability)
 * impact widget variant.
 *
 * Maps the provided {@link CIAComponent} to its corresponding {@link ComponentConfig}, which includes
 * titles, icons, colors, ARIA descriptions, layout classes, and test ID helpers for the widget UI.
 *
 * @param component - The CIA component type to configure. Supported values are
 * `"availability"`, `"integrity"`, and `"confidentiality"`. Any other value will cause an error
 * to be thrown to preserve exhaustive type checking.
 * @returns A {@link ComponentConfig} object containing all visual and accessibility settings for
 * the specified CIA component.
 *
 * @example
 * ```ts
 * // Get configuration for the availability impact widget
 * const availabilityConfig = getComponentConfig("availability");
 *
 * console.log(availabilityConfig.defaultTitle);
 * // → "Availability Impact Analysis"
 *
 * // Use the test ID helper to build a badge test ID
 * const badgeTestId = availabilityConfig.getSecurityBadgeTestId(
 *   "availability-impact",
 *   AVAILABILITY_IMPACT_WIDGET_IDS
 * );
 * ```
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
        containerClassName: "cia-availability",
        contentClassName: "cia-widget",
        getSecurityBadgeTestId: (_effectiveTestId, widgetIds) => widgetIds.label("security-level"),
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
        containerClassName: "",
        contentClassName: "",
        getSecurityBadgeTestId: (_effectiveTestId, widgetIds) => widgetIds.label("security-badge"),
      };
    case "confidentiality":
      return {
        titleKey: "CONFIDENTIALITY_IMPACT",
        iconKey: "CONFIDENTIALITY_IMPACT",
        defaultTitle: "Confidentiality Impact Analysis",
        defaultIcon: "🔒",
        color: "orange",
        textClass: "text-orange-800 dark:text-orange-300",
        ariaDescription: "Business impact of confidentiality controls including data classification and privacy measures",
        categoryLabel: "Confidentiality",
        containerClassName: "overflow-visible",
        contentClassName: "max-h-[550px] overflow-y-auto pr-1",
        getSecurityBadgeTestId: (_effectiveTestId, widgetIds) => widgetIds.label("security-badge"),
      };
    default: {
      // Exhaustive check to ensure all CIAComponent values are handled
      const exhaustiveCheck: never = component;
      throw new Error(`Unsupported CIA component in ImpactWidget: ${String(exhaustiveCheck)}`);
    }
  }
};

/**
 * Resolves test ID configuration for a given CIA component.
 *
 * Maps the logical CIA component (`availability`, `integrity`, or `confidentiality`)
 * to the corresponding test ID prefix and widget-specific test ID constants.
 * This ensures that all impact widgets use a consistent and centrally managed
 * set of test IDs for automated testing and QA tooling.
 *
 * @param component - The CIA component type for which test IDs should be resolved.
 * @returns An object containing:
 * - `prefix`: The base test ID prefix for the selected CIA component.
 * - `widgetIds`: The collection of widget-specific test ID constants associated
 *   with the selected CIA component.
 *
 * @example
 * ```ts
 * // Get test ID configuration for the availability impact widget
 * const { prefix, widgetIds } = getTestIds("availability");
 *
 * // Example usage when building a test ID for the security level badge
 * const securityBadgeTestId = `${prefix}${widgetIds.SECURITY_LEVEL_BADGE}`;
 * ```
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
    default: {
      // Exhaustive check to ensure all CIAComponent values are handled
      const exhaustiveCheck: never = component;
      throw new Error(`Unsupported CIA component in getTestIds: ${String(exhaustiveCheck)}`);
    }
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
const ImpactWidget = React.memo<ImpactWidgetProps>(({
  component,
  level,
  className = "",
  testId,
  showExtendedDetails = false,
  onError,
}) => {
  // Get component-specific configuration (memoized for performance)
  const config = useMemo(() => getComponentConfig(component), [component]);
  const testIds = useMemo(() => getTestIds(component), [component]);
  const effectiveTestId = testId || testIds.prefix;

  // Use security level utility for consistent normalization
  const effectiveLevel = useMemo(() => 
    normalizeSecurityLevel(level || "Moderate"), 
    [level]
  );

  // Get CIA content service for loading/error states
  const { ciaContentService, error, isLoading } = useCIAContentService();

  // Invoke error callback when service error occurs (memoized callback)
  const handleError = useCallback((err: Error) => {
    if (onError) {
      onError(err);
    }
  }, [onError]);

  React.useEffect(() => {
    if (error) {
      handleError(error);
    }
  }, [error, handleError]);

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
        // Get data classification with proper error handling
        let dataClassification: string;
        if (ciaContentService) {
          try {
            dataClassification = ciaContentService.getInformationSensitivity(effectiveLevel);
          } catch {
            dataClassification = `${effectiveLevel} Classification`;
          }
        } else {
          dataClassification = `${effectiveLevel} Classification`;
        }

        return {
          type: "confidentiality" as const,
          data: {
            dataClassification,
            privacyImpact: details?.privacyImpact || getDefaultPrivacyImpact(effectiveLevel),
          },
        };
      }
      default: {
        // Exhaustive check to ensure all CIAComponent values are handled
        const exhaustiveCheck: never = component;
        throw new Error(`Unsupported CIA component in metrics calculation: ${String(exhaustiveCheck)}`);
      }
    }
  }, [component, effectiveLevel, details, ciaContentService]);

  // Get border color class based on component color (explicit for Tailwind purging)
  const getBorderColorClass = (color: "blue" | "green" | "purple" | "orange"): string => {
    switch (color) {
      case "blue": return "border-blue-500";
      case "green": return "border-green-500";
      case "orange": return "border-orange-500";
      case "purple": return "border-purple-500";
      default: {
        // Exhaustive check - TypeScript will error if new colors are added
        const exhaustiveCheck: never = color;
        throw new Error(`Unsupported color: ${String(exhaustiveCheck)}`);
      }
    }
  };

  return (
    <WidgetErrorBoundary widgetName={`${config.categoryLabel} Impact`}>
      <WidgetContainer
        title={WIDGET_TITLES[config.titleKey] || config.defaultTitle}
        icon={WIDGET_ICONS[config.iconKey] || config.defaultIcon}
        className={`${className} ${config.containerClassName}`}
        testId={effectiveTestId}
        isLoading={isLoading}
        error={error}
      >
        <div
          className={cn(
            "p-sm sm:p-md border-l-4",
            getBorderColorClass(config.color),
            config.contentClassName
          )}
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
              testId={config.getSecurityBadgeTestId(effectiveTestId, testIds.widgetIds)}
            />
          </section>

          {/* Business Impact Analysis */}
          {businessImpact && (
            <section
              className="mb-sm"
              aria-labelledby={`${component}-business-impact-heading`}
            >
              <h3 id={`${component}-business-impact-heading`} className={WidgetClasses.heading}>
                Business Impact
              </h3>
              <BusinessImpactSection
                impact={businessImpact}
                color={config.color}
                testId={testIds.widgetIds.section("business-impact")}
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
                className={cn(WidgetClasses.grid3Cols, "mb-md")}
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
              <div className={WidgetClasses.grid2Cols}>
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
              <div className={WidgetClasses.grid2Cols}>
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
                <div className={WidgetClasses.grid2Cols}>
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
});

// Set display name for debugging
ImpactWidget.displayName = "ImpactWidget";

export default ImpactWidget;
