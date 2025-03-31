import React, { useMemo } from "react";
import { WIDGET_ICONS, WIDGET_TITLES } from "../../../constants/appConstants";
import { useCIAContentService } from "../../../hooks/useCIAContentService";
import { SecurityLevel } from "../../../types/cia";
import { calculateOverallSecurityLevel } from "../../../utils/securityLevelUtils";
import { isNullish } from "../../../utils/typeGuards";
import SecurityLevelIndicator from "../../common/SecurityLevelIndicator";
import WidgetContainer from "../../common/WidgetContainer";

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
    return calculateOverallSecurityLevel(
      availabilityLevel,
      integrityLevel,
      confidentialityLevel
    );
  }, [availabilityLevel, integrityLevel, confidentialityLevel]);

  // Get business value metrics with fallback implementation
  const valueMetrics = useMemo((): BusinessValueMetric[] => {
    try {
      if (!isNullish(ciaContentService)) {
        // Check if the service has getBusinessValueMetrics method
        if (
          typeof (ciaContentService as any).getBusinessValueMetrics ===
          "function"
        ) {
          const metrics = (ciaContentService as any).getBusinessValueMetrics(
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
        securityScore
      );
    } catch (err) {
      console.error("Error retrieving business value metrics:", err);
      return generateFallbackValueMetrics(
        availabilityLevel,
        integrityLevel,
        confidentialityLevel,
        securityScore
      );
    }
  }, [
    ciaContentService,
    availabilityLevel,
    integrityLevel,
    confidentialityLevel,
    securityScore,
  ]);

  // Get component-specific value statements
  const getComponentValueStatements = (
    component: "availability" | "integrity" | "confidentiality",
    level: SecurityLevel
  ): string[] => {
    try {
      if (!isNullish(ciaContentService)) {
        // Check if the service has getComponentValueStatements method
        if (
          typeof (ciaContentService as any).getComponentValueStatements ===
          "function"
        ) {
          const statements = (
            ciaContentService as any
          ).getComponentValueStatements(component, level);

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
      if (!isNullish(ciaContentService)) {
        // Check if the service has getROIEstimate method
        if (typeof (ciaContentService as any).getROIEstimate === "function") {
          const roi = (ciaContentService as any).getROIEstimate(
            availabilityLevel,
            integrityLevel,
            confidentialityLevel
          );

          if (!isNullish(roi)) {
            return roi;
          }
        }
      }

      // Fallback ROI based on security score
      switch (securityScore) {
        case "None":
          return {
            value: "0%",
            description: "No measurable return on investment",
          };
        case "Low":
          return {
            value: "50-100%",
            description: "Basic return, primarily through risk avoidance",
          };
        case "Moderate":
          return {
            value: "150-200%",
            description:
              "Balanced return through operational improvements and risk reduction",
          };
        case "High":
          return {
            value: "200-300%",
            description:
              "Strong return through business enablement and risk management",
          };
        case "Very High":
          return {
            value: "300-500%",
            description:
              "Premium return through competitive advantage and comprehensive protection",
          };
        default:
          return { value: "Unknown", description: "Unable to calculate ROI" };
      }
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
        if (
          typeof (ciaContentService as any).getBusinessValueSummary ===
          "function"
        ) {
          const summary = (ciaContentService as any).getBusinessValueSummary(
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
    <WidgetContainer
      title={WIDGET_TITLES.VALUE_CREATION || "Business Value Creation"}
      icon={WIDGET_ICONS.VALUE_CREATION || "💰"}
      className={className}
      testId={testId}
      isLoading={isLoading}
      error={error}
    >
      <div className="p-4">
        {/* Overview section */}
        <div className="mb-6">
          <div className="p-3 bg-blue-50 dark:bg-blue-900 dark:bg-opacity-20 rounded-lg mb-4">
            <p className="text-sm" data-testid="value-creation-summary">
              {getBusinessValueSummary()}
            </p>
          </div>

          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-medium">Overall Value Profile</h3>
            <div className="flex items-center">
              <span className="mr-2 text-sm text-gray-600 dark:text-gray-400">
                Security Level:
              </span>
              <SecurityLevelIndicator level={securityScore} size="md" />
            </div>
          </div>

          {/* ROI estimate */}
          <div className="p-4 bg-green-50 dark:bg-green-900 dark:bg-opacity-20 rounded-lg mb-4">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium text-green-700 dark:text-green-300">
                  Estimated Return on Investment
                </h4>
                <p className="text-sm text-green-600 dark:text-green-400 mt-1">
                  {roiEstimate.description}
                </p>
              </div>
              <div
                className="text-2xl font-bold text-green-600 dark:text-green-400"
                data-testid="roi-value"
              >
                {roiEstimate.value}
              </div>
            </div>
          </div>

          {/* Business value metrics grid */}
          <div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
            data-testid="value-metrics-grid"
          >
            {valueMetrics.map((metric, index) => (
              <div
                key={index}
                className="p-3 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700"
                data-testid={`value-metric-${index}`}
              >
                <div className="flex items-center mb-2">
                  <span className="text-xl mr-2 text-blue-500">
                    {metric.icon || "📈"}
                  </span>
                  <h4 className="font-medium">{metric.category}</h4>
                </div>
                <div className="text-lg font-bold text-blue-600 dark:text-blue-400 mb-1">
                  {metric.value}
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {metric.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Component-specific value sections */}
        <div className="mb-6">
          <h3 className="text-lg font-medium mb-4">Component Business Value</h3>

          {/* Confidentiality value */}
          <div
            className="p-3 bg-purple-50 dark:bg-purple-900 dark:bg-opacity-20 rounded-lg"
            data-testid="confidentiality-value-section"
          >
            <div className="flex items-center mb-2">
              <span className="text-xl mr-2">🔒</span>
              <h4 className="font-medium">
                Confidentiality Value ({confidentialityLevel})
              </h4>
            </div>
            <ul className="list-disc list-inside pl-2 text-sm text-gray-600 dark:text-gray-400">
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
  );
};

// Helper function to generate fallback value metrics
function generateFallbackValueMetrics(
  availabilityLevel: SecurityLevel,
  integrityLevel: SecurityLevel,
  confidentialityLevel: SecurityLevel,
  overallLevel: SecurityLevel
): BusinessValueMetric[] {
  // Map security levels to numeric scores
  const levelScores: Record<SecurityLevel, number> = {
    None: 0,
    Low: 1,
    Moderate: 2,
    High: 3,
    "Very High": 4,
  };

  // Calculate average score
  const avgScore =
    (levelScores[availabilityLevel] +
      levelScores[integrityLevel] +
      levelScores[confidentialityLevel]) /
    3;

  // Generate appropriate metrics based on the average score
  return [
    {
      category: "Trust Enhancement",
      value: getPercentageValue(avgScore, 95),
      description: "Increased customer and partner trust in your business",
      icon: "🤝",
    },
    {
      category: "Operational Efficiency",
      value: getPercentageValue(avgScore, 40),
      description: "Improved operational efficiency through reliable systems",
      icon: "⚙️",
    },
    {
      category: "Innovation Enablement",
      value: getPercentageValue(avgScore, 70),
      description: "Enhanced ability to launch new digital initiatives",
      icon: "💡",
    },
    {
      category: "Decision Quality",
      value: getPercentageValue(avgScore, 60),
      description: "Better business decisions through reliable data",
      icon: "📊",
    },
    {
      category: "Competitive Advantage",
      value: getPercentageValue(avgScore, 50),
      description: "Market differentiation through security capabilities",
      icon: "🏆",
    },
    {
      category: "Risk Reduction",
      value: getPercentageValue(avgScore, 80),
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
