import React, { useMemo } from "react";
import { WIDGET_ICONS, WIDGET_TITLES } from "../../../constants/appConstants";
import { VALUE_CREATION_WIDGET_IDS } from "../../../constants/testIds";
import { useCIAContentService } from "../../../hooks/useCIAContentService";
import { SecurityLevel } from "../../../types/cia";
import { ValueCreationWidgetProps } from "../../../types/widget-props";
import { calculateROIEstimate } from "../../../utils/businessValueUtils";
import { calculateBusinessImpactLevel } from "../../../utils/riskUtils";
import { hasMethod, isNullish } from "../../../utils/typeGuards";
import { getWidgetAriaDescription } from "../../../utils/accessibility";
import { WidgetClasses, cn } from "../../../utils/tailwindClassHelpers";
import SecurityLevelIndicator from "../../common/SecurityLevelIndicator";
import WidgetContainer from "../../common/WidgetContainer";
import WidgetErrorBoundary from "../../common/WidgetErrorBoundary";

/**
 * Interface for business value metric
 */
interface BusinessValueMetric {
  category: string;
  value: string;
  description: string;
  icon?: string;
}

/**
 * Display value creation information for chosen security levels
 *
 * ## Business Perspective
 *
 * This widget helps stakeholders understand the business value created
 * by security investments, articulating benefits beyond just risk reduction.
 * It provides clear value statements that can be used in business cases and
 * executive communications. 💰
 */
const ValueCreationWidget: React.FC<ValueCreationWidgetProps> = ({
  availabilityLevel,
  integrityLevel,
  confidentialityLevel,
  className = "",
  testId = VALUE_CREATION_WIDGET_IDS.root,
}) => {
  // Get CIA content service for value creation data
  const { ciaContentService, error, isLoading } = useCIAContentService();

  // State for collapsible sections
  const [expandedSection, setExpandedSection] = React.useState<string | null>("summary");

  // Calculate overall security level
  const securityScore = useMemo(() => {
    // Use riskUtils instead of local calculation
    return calculateBusinessImpactLevel(
      availabilityLevel,
      integrityLevel,
      confidentialityLevel
    );
  }, [availabilityLevel, integrityLevel, confidentialityLevel]);

  // Convert security score to SecurityLevel for component compatibility
  const securityScoreAsLevel = useMemo((): SecurityLevel => {
    // Convert the string returned by calculateBusinessImpactLevel to SecurityLevel type
    switch (securityScore) {
      case "Minimal":
        return "None";
      case "Low":
        return "Low";
      case "Moderate":
        return "Moderate";
      case "High":
        return "High";
      case "Very High":
        return "Very High";
      default:
        return "Moderate"; // Default fallback
    }
  }, [securityScore]);

  // Create a numeric impact level for percentage calculations
  const impactLevelNumeric = useMemo((): number => {
    switch (securityScore) {
      case "Minimal":
        return 1;
      case "Low":
        return 2;
      case "Moderate":
        return 3;
      case "High":
        return 4;
      case "Very High":
        return 5;
      default:
        return 3; // Default fallback
    }
  }, [securityScore]);

  // Get business value metrics with fallback implementation
  const valueMetrics = useMemo((): BusinessValueMetric[] => {
    try {
      if (!isNullish(ciaContentService)) {
        // Check if the service has getBusinessValueMetrics method
        if (hasMethod(ciaContentService, "getBusinessValueMetrics")) {
          const metrics = ciaContentService.getBusinessValueMetrics(
            availabilityLevel,
            integrityLevel,
            confidentialityLevel
          );

          if (Array.isArray(metrics) && metrics.length > 0) {
            return metrics;
          }
        }
      }

      // Fallback metrics if service doesn't provide them
      return generateFallbackValueMetrics(
        availabilityLevel,
        integrityLevel,
        confidentialityLevel,
        impactLevelNumeric
      );
    } catch (err) {
      console.error("Error retrieving business value metrics:", err);
      return generateFallbackValueMetrics(
        availabilityLevel,
        integrityLevel,
        confidentialityLevel,
        impactLevelNumeric
      );
    }
  }, [
    ciaContentService,
    availabilityLevel,
    integrityLevel,
    confidentialityLevel,
    impactLevelNumeric,
  ]);

  // Get component-specific value statements
  const getComponentValueStatements = (
    component: "availability" | "integrity" | "confidentiality",
    level: SecurityLevel
  ): string[] => {
    try {
      if (!isNullish(ciaContentService)) {
        // Check if the service has getComponentValueStatements method
        if (hasMethod(ciaContentService, "getComponentValueStatements")) {
          const statements =
            ciaContentService.getComponentValueStatements(component, level);

          if (Array.isArray(statements) && statements.length > 0) {
            return statements;
          }
        }
      }

      // Fallback value statements
      switch (component) {
        case "availability":
          if (level === "None" || level === "Low") {
            return [
              "Basic operational continuity",
              "Minimal protection against service disruptions",
            ];
          } else if (level === "Moderate") {
            return [
              "Predictable system access and reliable operations",
              "Improved user satisfaction through consistent service delivery",
              "Enhanced operational efficiency with reduced downtime",
            ];
          } else {
            return [
              "Near-continuous operations even during adverse events",
              "Competitive advantage through superior service reliability",
              "Protected revenue streams with minimal service interruptions",
              "Maintained customer trust through consistent service delivery",
            ];
          }

        case "integrity":
          if (level === "None" || level === "Low") {
            return [
              "Basic data consistency",
              "Minimal protection against data errors",
            ];
          } else if (level === "Moderate") {
            return [
              "Trustworthy data for operational and strategic decisions",
              "Reduced costs from data errors and reconciliation efforts",
              "Improved compliance posture with accurate record-keeping",
            ];
          } else {
            return [
              "Data you can stake your business reputation on",
              "Enhanced business intelligence through high-quality data",
              "Reduced fraud risk with validated transactions",
              "Defensible audit trail for regulatory scrutiny",
            ];
          }

        case "confidentiality":
          if (level === "None" || level === "Low") {
            return [
              "Basic information protection",
              "Minimal safeguards for sensitive data",
            ];
          } else if (level === "Moderate") {
            return [
              "Protected intellectual property and business secrets",
              "Reduced risk of data breaches and associated costs",
              "Enhanced customer and partner trust in data handling",
            ];
          } else {
            return [
              "Secured competitive advantage through protected innovations",
              "Strengthened customer trust with demonstrable privacy controls",
              "Reputation as a secure business partner",
              "Reduced breach-related costs and regulatory penalties",
            ];
          }

        default:
          return ["No value statements available"];
      }
    } catch (err) {
      console.error(`Error retrieving ${component} value statements:`, err);
      return [`Unable to retrieve ${component} value statements`];
    }
  };

  // Get ROI estimates based on security levels
  const getROIEstimate = (): { value: string; description: string } => {
    try {
      // Use the centralized utility function for consistent ROI calculation
      const roiEstimate = calculateROIEstimate(
        availabilityLevel,
        integrityLevel,
        confidentialityLevel
      );

      return {
        value: roiEstimate.value ?? "Unable to calculate", // Ensure value is a string
        description: roiEstimate.description,
      };
    } catch (err) {
      console.error("Error calculating ROI estimate:", err);
      return {
        value: "Unable to calculate",
        description: "ROI estimation error",
      };
    }
  };

  // Get the business value summary text
  const getBusinessValueSummary = (): string => {
    try {
      if (!isNullish(ciaContentService)) {
        // Check if the service has getBusinessValueSummary method
        if (hasMethod(ciaContentService, "getBusinessValueSummary")) {
          const summary = ciaContentService.getBusinessValueSummary(
            availabilityLevel,
            integrityLevel,
            confidentialityLevel
          );

          if (typeof summary === "string" && summary) {
            return summary;
          }
        }
      }

      // Fallback summary based on security score
      switch (securityScore) {
        case "None":
          return "Minimal security investments provide basic operational capabilities but limited business value.";
        case "Low":
          return "Basic security controls enable fundamental business operations with modest protection against common threats.";
        case "Moderate":
          return "Balanced security investments deliver operational stability, data reliability, and reasonable protection that enable business growth.";
        case "High":
          return "Strategic security investments create significant business value through enhanced reliability, data integrity, and protected information assets.";
        case "Very High":
          return "Premium security investments establish market-leading capabilities and competitive advantages through exceptional reliability, data quality, and information protection.";
        default:
          return "Security investments can deliver business value through improved operations, enhanced decision-making, and protected information assets.";
      }
    } catch (err) {
      console.error("Error generating business value summary:", err);
      return "Security investments can deliver business value beyond just risk reduction.";
    }
  };

  // Get the ROI estimate
  const roiEstimate = useMemo(
    () => getROIEstimate(),
    [
      ciaContentService,
      availabilityLevel,
      integrityLevel,
      confidentialityLevel,
      securityScore,
    ]
  );

  // Toggle section expansion
  const toggleSection = (section: string): void => {
    setExpandedSection(expandedSection === section ? null : section);
  };

  return (
    <WidgetErrorBoundary widgetName="Value Creation">
      <WidgetContainer
        title={WIDGET_TITLES.VALUE_CREATION || "Business Value Creation"}
        icon={WIDGET_ICONS.VALUE_CREATION || "💰"}
        className={className}
        testId={testId}
        isLoading={isLoading}
        error={error}
      >
      <div 
        className="p-md"
        role="region"
        aria-label={getWidgetAriaDescription(
          "Business Value Creation",
          "Business value and return on investment created by security investments"
        )}
      >
        {/* Summary cards at top - Compact 3-column grid */}
        <section className="grid grid-cols-3 gap-sm mb-md">
          <div className="p-sm bg-success-light/10 dark:bg-success-dark/20 rounded-md border border-success-light/30 dark:border-success-dark/30">
            <div className="text-caption text-success-dark dark:text-success-light font-medium mb-xs">ROI</div>
            <div className="text-heading font-bold text-success-dark dark:text-success-light" data-testid={VALUE_CREATION_WIDGET_IDS.value('roi')}>
              {roiEstimate.value}
            </div>
            <div className="text-caption text-success-dark/70 dark:text-success-light/70">{roiEstimate.description}</div>
          </div>
          <div className="p-sm bg-info-light/10 dark:bg-info-dark/20 rounded-md border border-info-light/30 dark:border-info-dark/30">
            <div className="text-caption text-info-dark dark:text-info-light font-medium mb-xs">Security Level</div>
            <div className="flex items-center">
              <SecurityLevelIndicator level={securityScoreAsLevel} size="sm" />
              <span className="text-body-lg font-bold text-info-dark dark:text-info-light ml-xs">{securityScore}</span>
            </div>
          </div>
          <div className="p-sm bg-primary-light/10 dark:bg-primary-dark/20 rounded-md border border-primary-light/30 dark:border-primary-dark/30">
            <div className="text-caption text-primary-dark dark:text-primary-light font-medium mb-xs">Value Metrics</div>
            <div className="text-heading font-bold text-primary-dark dark:text-primary-light">
              {valueMetrics.length}
            </div>
            <div className="text-caption text-primary-dark/70 dark:text-primary-light/70">Categories</div>
          </div>
        </section>

        {/* Collapsible sections */}
        {/* Value Overview */}
        <div className="mb-sm">
          <button
            onClick={() => toggleSection("summary")}
            className="w-full p-sm bg-neutral-light/5 dark:bg-neutral-dark/10 rounded-md border border-neutral-light/20 dark:border-neutral-dark/20 flex justify-between items-center hover:bg-neutral-light/10 dark:hover:bg-neutral-dark/15 transition-colors"
            aria-expanded={expandedSection === "summary"}
          >
            <span className="text-body-lg font-medium">📊 Value Overview</span>
            <span className="text-body">{expandedSection === "summary" ? "▼" : "▶"}</span>
          </button>
          {expandedSection === "summary" && (
            <div className="p-sm mt-xs bg-info-light/5 dark:bg-info-dark/10 rounded-md border border-info-light/20 dark:border-info-dark/20">
              <p className="text-body text-neutral-dark dark:text-neutral-light mb-sm" data-testid={VALUE_CREATION_WIDGET_IDS.label('summary')}>
                {getBusinessValueSummary()}
              </p>
              <div className="grid grid-cols-2 gap-xs">
                {valueMetrics.slice(0, 4).map((metric, index) => (
                  <div key={index} className="p-xs bg-white/50 dark:bg-gray-800/50 rounded">
                    <div className="flex items-center mb-xs">
                      <span className="mr-xs">{metric.icon || "📈"}</span>
                      <span className="text-caption font-medium">{metric.category}</span>
                    </div>
                    <div className="text-body font-bold text-info-dark dark:text-info-light">{metric.value}</div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Component Value - Collapsible */}
        <div className="mb-sm">
          <button
            onClick={() => toggleSection("components")}
            className="w-full p-sm bg-neutral-light/5 dark:bg-neutral-dark/10 rounded-md border border-neutral-light/20 dark:border-neutral-dark/20 flex justify-between items-center hover:bg-neutral-light/10 dark:hover:bg-neutral-dark/15 transition-colors"
            aria-expanded={expandedSection === "components"}
          >
            <span className="text-body-lg font-medium">🔒 Component Business Value</span>
            <span className="text-body">{expandedSection === "components" ? "▼" : "▶"}</span>
          </button>
          {expandedSection === "components" && (
            <div className="p-sm mt-xs bg-neutral-light/5 dark:bg-neutral-dark/10 rounded-md border border-neutral-light/20 dark:border-neutral-dark/20 space-y-sm">
              {/* Confidentiality */}
              <div className="p-xs bg-primary-light/10 dark:bg-primary-dark/20 rounded">
                <div className="flex items-center mb-xs">
                  <span className="mr-xs">🔒</span>
                  <span className="text-body font-medium text-primary-dark dark:text-primary-light">
                    Confidentiality ({confidentialityLevel})
                  </span>
                </div>
                <ul className="text-caption text-neutral-dark dark:text-neutral-light space-y-xs pl-sm">
                  {getComponentValueStatements("confidentiality", confidentialityLevel).map((statement, index) => (
                    <li key={index} data-testid={`confidentiality-value-item-${index}`}>• {statement}</li>
                  ))}
                </ul>
              </div>

              {/* Integrity */}
              <div className="p-xs bg-success-light/10 dark:bg-success-dark/20 rounded">
                <div className="flex items-center mb-xs">
                  <span className="mr-xs">✓</span>
                  <span className="text-body font-medium text-success-dark dark:text-success-light">
                    Integrity ({integrityLevel})
                  </span>
                </div>
                <ul className="text-caption text-neutral-dark dark:text-neutral-light space-y-xs pl-sm">
                  {getComponentValueStatements("integrity", integrityLevel).map((statement, index) => (
                    <li key={index} data-testid={`integrity-value-item-${index}`}>• {statement}</li>
                  ))}
                </ul>
              </div>

              {/* Availability */}
              <div className="p-xs bg-info-light/10 dark:bg-info-dark/20 rounded">
                <div className="flex items-center mb-xs">
                  <span className="mr-xs">⏱️</span>
                  <span className="text-body font-medium text-info-dark dark:text-info-light">
                    Availability ({availabilityLevel})
                  </span>
                </div>
                <ul className="text-caption text-neutral-dark dark:text-neutral-light space-y-xs pl-sm">
                  {getComponentValueStatements("availability", availabilityLevel).map((statement, index) => (
                    <li key={index} data-testid={`availability-value-item-${index}`}>• {statement}</li>
                  ))}
                </ul>
              </div>
            </div>
          )}
        </div>

        {/* Business Case - Collapsible */}
        <div className="mb-sm">
          <button
            onClick={() => toggleSection("business-case")}
            className="w-full p-sm bg-neutral-light/5 dark:bg-neutral-dark/10 rounded-md border border-neutral-light/20 dark:border-neutral-dark/20 flex justify-between items-center hover:bg-neutral-light/10 dark:hover:bg-neutral-dark/15 transition-colors"
            aria-expanded={expandedSection === "business-case"}
          >
            <span className="text-body-lg font-medium">💼 Investment Business Case</span>
            <span className="text-body">{expandedSection === "business-case" ? "▼" : "▶"}</span>
          </button>
          {expandedSection === "business-case" && (
            <div className="p-sm mt-xs bg-neutral-light/5 dark:bg-neutral-dark/10 rounded-md border border-neutral-light/20 dark:border-neutral-dark/20 space-y-xs">
              <div className="p-xs bg-info-light/10 dark:bg-info-dark/20 rounded">
                <h5 className="text-caption font-medium mb-xs">Executive Summary</h5>
                <p className="text-caption">
                  Our {securityScore.toLowerCase()} security investment strategy delivers business value through improved operational reliability, data integrity, and information protection.
                </p>
              </div>
              <div className="p-xs bg-success-light/10 dark:bg-success-dark/20 rounded">
                <h5 className="text-caption font-medium mb-xs">Financial Value</h5>
                <p className="text-caption">
                  With an estimated ROI of {roiEstimate.value}, our security investments provide strong financial returns through risk reduction, operational improvements, and business enablement.
                </p>
              </div>
              <div className="p-xs bg-primary-light/10 dark:bg-primary-dark/20 rounded">
                <h5 className="text-caption font-medium mb-xs">Strategic Value</h5>
                <p className="text-caption">
                  Beyond direct financial returns, our security program creates strategic value by enabling digital initiatives, protecting our brand, and building customer trust.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </WidgetContainer>
    </WidgetErrorBoundary>
  );
};

// Helper function to generate fallback value metrics - refactored to use riskUtils
function generateFallbackValueMetrics(
  availabilityLevel: SecurityLevel,
  integrityLevel: SecurityLevel,
  confidentialityLevel: SecurityLevel,
  overallLevel: number
): BusinessValueMetric[] {
  // Import calculateBusinessImpactLevel from riskUtils instead of recalculating here
  const impactLevel = calculateBusinessImpactLevel(
    availabilityLevel,
    integrityLevel,
    confidentialityLevel
  );

  // Use the impact level to generate appropriate metrics
  return [
    {
      category: "Trust Enhancement",
      value: getPercentageValue(overallLevel, 95),
      description: "Increased customer and partner trust in your business",
      icon: "🤝",
    },
    {
      category: "Operational Efficiency",
      value: getPercentageValue(overallLevel, 40),
      description: "Improved operational efficiency through reliable systems",
      icon: "⚙️",
    },
    {
      category: "Innovation Enablement",
      value: getPercentageValue(overallLevel, 70),
      description: "Enhanced ability to launch new digital initiatives",
      icon: "💡",
    },
    {
      category: "Decision Quality",
      value: getPercentageValue(overallLevel, 60),
      description: "Better business decisions through reliable data",
      icon: "📊",
    },
    {
      category: "Competitive Advantage",
      value: getPercentageValue(overallLevel, 50),
      description: "Market differentiation through security capabilities",
      icon: "🏆",
    },
    {
      category: "Risk Reduction",
      value: getPercentageValue(overallLevel, 80),
      description: "Reduced likelihood of business disruptions",
      icon: "🛡️",
    },
  ];
}

// Helper to generate a reasonable percentage based on security score
function getPercentageValue(score: number, baseValue: number): string {
  const percentage = Math.min(
    95,
    Math.max(5, Math.round(baseValue * (0.3 + score * 0.2)))
  );
  return `${percentage}%`;
}

export default ValueCreationWidget;
