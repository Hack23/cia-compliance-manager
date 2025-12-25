import React, { useMemo } from "react";
import { WIDGET_ICONS, WIDGET_TITLES } from "../../../constants/appConstants";
import { useCIAContentService } from "../../../hooks/useCIAContentService";
import { SecurityLevel } from "../../../types/cia";
import { calculateROIEstimate } from "../../../utils/businessValueUtils";
import { calculateBusinessImpactLevel } from "../../../utils/riskUtils";
import { hasMethod, isNullish } from "../../../utils/typeGuards";
import { getWidgetAriaDescription } from "../../../utils/accessibility";
import SecurityLevelIndicator from "../../common/SecurityLevelIndicator";
import WidgetContainer from "../../common/WidgetContainer";
import WidgetErrorBoundary from "../../common/WidgetErrorBoundary";

/**
 * Props for ValueCreationWidget component
 */
export interface ValueCreationWidgetProps {
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
   * Optional CSS class name
   */
  className?: string;

  /**
   * Optional test ID for testing
   */
  testId?: string;
}

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
  testId = "value-creation-widget",
}) => {
  // Get CIA content service for value creation data
  const { ciaContentService, error, isLoading } = useCIAContentService();

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

  return (
    <WidgetErrorBoundary widgetName="Value Creation">
      <WidgetContainer
        title={WIDGET_TITLES.VALUE_CREATION || "Business Value Creation"}
        icon={WIDGET_ICONS.VALUE_CREATION || "💰"}
        className={className}
        testId={testId}
        isLoading={isLoading}
        error={error}
        aria-label={getWidgetAriaDescription(
          "Business Value Creation",
          "Business value and return on investment created by security investments"
        )}
      >
      <div className="p-md sm:p-lg">
        {/* Overview section */}
        <section 
          className="mb-lg"
          aria-labelledby="value-profile-heading"
        >
          <div className="p-md bg-info-light/10 dark:bg-info-dark/20 rounded-md mb-md">
            <p className="text-body" data-testid="value-creation-summary">
              {getBusinessValueSummary()}
            </p>
          </div>

          <div className="flex justify-between items-center mb-md">
            <h3 id="value-profile-heading" className="text-heading font-medium">
              Overall Value Profile
            </h3>
            <div className="flex items-center">
              <span className="mr-sm text-body text-neutral dark:text-neutral-light">
                Security Level:
              </span>
              <SecurityLevelIndicator level={securityScoreAsLevel} size="md" />
            </div>
          </div>

          {/* ROI estimate */}
          <div 
            className="p-md bg-success-light/10 dark:bg-success-dark/20 rounded-md mb-md"
            role="region"
            aria-labelledby="roi-heading"
          >
            <div className="flex items-center justify-between">
              <div>
                <h4 id="roi-heading" className="font-medium text-success-dark dark:text-success-light">
                  Estimated Return on Investment
                </h4>
                <p className="text-body text-success dark:text-success-light mt-1">
                  {roiEstimate.description}
                </p>
              </div>
              <div
                className="text-title font-bold text-success dark:text-success-light"
                data-testid="roi-value"
                aria-label={`Return on investment: ${roiEstimate.percentage}`}
              >
                {roiEstimate.value}
              </div>
            </div>
          </div>

          {/* Business value metrics grid */}
          <div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-md"
            data-testid="value-metrics-grid"
          >
            {valueMetrics.map((metric, index) => (
              <div
                key={index}
                className="p-md bg-neutral-light/10 dark:bg-neutral-dark/20 rounded-md border border-neutral-light dark:border-neutral-dark"
                data-testid={`value-metric-${index}`}
              >
                <div className="flex items-center mb-sm">
                  <span className="text-title mr-sm text-info">
                    {metric.icon || "📈"}
                  </span>
                  <h4 className="font-medium">{metric.category}</h4>
                </div>
                <div className="text-heading font-bold text-info dark:text-info-light mb-1">
                  {metric.value}
                </div>
                <p className="text-body text-neutral dark:text-neutral-light">
                  {metric.description}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Component-specific value sections */}
        <div className="mb-lg">
          <h3 className="text-heading font-medium mb-md">Component Business Value</h3>

          {/* Confidentiality value */}
          <div
            className="p-md bg-primary-light/10 dark:bg-primary-dark/20 rounded-md"
            data-testid="confidentiality-value-section"
          >
            <div className="flex items-center mb-sm">
              <span className="text-title mr-sm">🔒</span>
              <h4 className="font-medium">
                Confidentiality Value ({confidentialityLevel})
              </h4>
            </div>
            <ul className="list-disc list-inside pl-2 text-body text-neutral dark:text-neutral-light">
              {getComponentValueStatements(
                "confidentiality",
                confidentialityLevel
              ).map((statement, index) => (
                <li
                  key={index}
                  className="mb-1"
                  data-testid={`confidentiality-value-item-${index}`}
                >
                  {statement}
                </li>
              ))}
            </ul>
          </div>

          {/* Integrity value */}
          <div
            className="mb-4 p-3 bg-green-50 dark:bg-green-900 dark:bg-opacity-20 rounded-lg"
            data-testid="integrity-value-section"
          >
            <div className="flex items-center mb-2">
              <span className="text-xl mr-2">✓</span>
              <h4 className="font-medium">
                Integrity Value ({integrityLevel})
              </h4>
            </div>
            <ul className="list-disc list-inside pl-2 text-sm text-gray-600 dark:text-gray-400">
              {getComponentValueStatements("integrity", integrityLevel).map(
                (statement, index) => (
                  <li
                    key={index}
                    className="mb-1"
                    data-testid={`integrity-value-item-${index}`}
                  >
                    {statement}
                  </li>
                )
              )}
            </ul>
          </div>

          {/* Availability value */}
          <div
            className="mb-4 p-3 bg-blue-50 dark:bg-blue-900 dark:bg-opacity-20 rounded-lg"
            data-testid="availability-value-section"
          >
            <div className="flex items-center mb-2">
              <span className="text-xl mr-2">⏱️</span>
              <h4 className="font-medium">
                Availability Value ({availabilityLevel})
              </h4>
            </div>
            <ul className="list-disc list-inside pl-2 text-sm text-gray-600 dark:text-gray-400">
              {getComponentValueStatements(
                "availability",
                availabilityLevel
              ).map((statement, index) => (
                <li
                  key={index}
                  className="mb-1"
                  data-testid={`availability-value-item-${index}`}
                >
                  {statement}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Business case section */}
        <div>
          <h3 className="text-lg font-medium mb-3">
            Security Investment Business Case
          </h3>
          <div className="p-3 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
              Use these value statements to build your business case for
              security investments:
            </p>
            <div className="space-y-3">
              <div className="p-2 bg-blue-50 dark:bg-blue-900 dark:bg-opacity-20 rounded">
                <h5 className="text-sm font-medium mb-1">Executive Summary</h5>
                <p className="text-sm">
                  Our {securityScore.toLowerCase()} security investment strategy
                  delivers business value through improved operational
                  reliability, data integrity, and information protection.
                </p>
              </div>
              <div className="p-2 bg-green-50 dark:bg-green-900 dark:bg-opacity-20 rounded">
                <h5 className="text-sm font-medium mb-1">Financial Value</h5>
                <p className="text-sm">
                  With an estimated ROI of {roiEstimate.value}, our security
                  investments provide strong financial returns through risk
                  reduction, operational improvements, and business enablement.
                </p>
              </div>
              <div className="p-2 bg-purple-50 dark:bg-purple-900 dark:bg-opacity-20 rounded">
                <h5 className="text-sm font-medium mb-1">Strategic Value</h5>
                <p className="text-sm">
                  Beyond direct financial returns, our security program creates
                  strategic value by enabling digital initiatives, protecting
                  our brand, and building customer trust.
                </p>
              </div>
            </div>
          </div>
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
