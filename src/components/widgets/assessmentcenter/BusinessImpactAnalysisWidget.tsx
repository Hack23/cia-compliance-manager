import React, { useMemo, useState } from "react";
import { WIDGET_ICONS, WIDGET_TITLES } from "../../../constants/appConstants";
import { BUSINESS_IMPACT_TEST_IDS } from "../../../constants/testIds";
import {
  getBusinessImpactIcon,
  SECURITY_ICONS,
} from "../../../constants/uiConstants";
import { useCIAOptions } from "../../../hooks/useCIAOptions";
import { createBusinessImpactService } from "../../../services/businessImpactService";
import { BusinessItem } from "../../../types/businessImpact";
import { BusinessImpactDetail, SecurityLevel } from "../../../types/cia";
import { StatusBadge, WidgetContainer } from "../../common";

/**
 * Props for BusinessImpactAnalysisWidget component
 */
interface BusinessImpactAnalysisWidgetProps {
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
   * Optional test ID for automated testing
   */
  testId?: string;
}

/**
 * Business Impact Analysis Widget provides insights on security impacts
 *
 * ## Business Perspective
 *
 * This widget helps executives understand the business implications of
 * security measures across financial, operational, reputational and
 * regulatory dimensions, supporting risk-based decision making and
 * providing justification for security investments. 📊
 */
const BusinessImpactAnalysisWidget: React.FC<
  BusinessImpactAnalysisWidgetProps
> = ({
  availabilityLevel,
  integrityLevel,
  confidentialityLevel,
  className = "",
  testId = "widget-business-impact",
}) => {
  // Get CIA options to use as the data provider
  const ciaOptions = useCIAOptions();

  // Create business impact service with data provider
  const businessImpactService = useMemo(
    () =>
      createBusinessImpactService({
        availabilityOptions: ciaOptions.availabilityOptions,
        integrityOptions: ciaOptions.integrityOptions,
        confidentialityOptions: ciaOptions.confidentialityOptions,
        // Add required roiEstimates property
        roiEstimates: ciaOptions.ROI_ESTIMATES || {},
      }),
    [ciaOptions]
  );

  // State for active tab
  const [activeTab, setActiveTab] = useState<"considerations" | "benefits">(
    "considerations"
  );

  // Calculate impact level
  const impactLevel = useMemo(() => {
    return businessImpactService.calculateBusinessImpactLevel(
      availabilityLevel,
      integrityLevel,
      confidentialityLevel
    );
  }, [
    businessImpactService,
    availabilityLevel,
    integrityLevel,
    confidentialityLevel,
  ]);

  // Get impact details for each component
  const availabilityImpact = useMemo(() => {
    return businessImpactService.getBusinessImpact(
      "availability",
      availabilityLevel
    );
  }, [businessImpactService, availabilityLevel]);

  const integrityImpact = useMemo(() => {
    return businessImpactService.getBusinessImpact("integrity", integrityLevel);
  }, [businessImpactService, integrityLevel]);

  const confidentialityImpact = useMemo(() => {
    return businessImpactService.getBusinessImpact(
      "confidentiality",
      confidentialityLevel
    );
  }, [businessImpactService, confidentialityLevel]);

  // Add state for loading and error handling
  const [isLoading, _setIsLoading] = useState(false);
  const [error, _setError] = useState<Error | null>(null);

  // Helper function to determine implementation complexity
  const getImplementationComplexity = (
    availabilityLevel: SecurityLevel,
    integrityLevel: SecurityLevel,
    confidentialityLevel: SecurityLevel
  ): string => {
    const levelValues: Record<SecurityLevel, number> = {
      None: 0,
      Low: 1,
      Moderate: 2,
      High: 3,
      "Very High": 4,
    };

    const totalValue =
      levelValues[availabilityLevel] +
      levelValues[integrityLevel] +
      levelValues[confidentialityLevel];

    if (totalValue <= 3) return "minimal";
    if (totalValue <= 6) return "moderate";
    if (totalValue <= 9) return "significant";
    return "extensive";
  };

  // Helper to render an impact category with standardized icons
  const renderImpactCategory = (
    category: string,
    impact: BusinessImpactDetail
  ) => {
    if (!impact) return null;
    const icon = getBusinessImpactIcon(category);
    return (
      <div
        className="mb-4"
        data-testid={`${BUSINESS_IMPACT_TEST_IDS.IMPACT_CATEGORY}-${category}`}
      >
        <h4 className="text-md font-medium mb-2 flex items-center">
          <span className="mr-2">{icon}</span>
          {category.charAt(0).toUpperCase() + category.slice(1)} Impact
        </h4>
        <div className="p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
          <div
            className="mb-2"
            data-testid={`${BUSINESS_IMPACT_TEST_IDS.IMPACT_DESCRIPTION}-${category}`}
          >
            {impact.description}
          </div>
          <div className="flex items-center">
            <span className="mr-2 text-sm">Risk Level:</span>
            <StatusBadge
              status={getStatusBadgeVariant(impact.riskLevel || "Medium")}
              testId={`${BUSINESS_IMPACT_TEST_IDS.RISK_LEVEL}-${category}`}
            >
              {impact.riskLevel || "Medium Risk"}
            </StatusBadge>
          </div>
          {category === "financial" && impact.annualRevenueLoss && (
            <div className="mt-2 text-sm">
              <span className="font-medium">Potential Revenue Loss:</span>{" "}
              {impact.annualRevenueLoss}
            </div>
          )}
          {category === "operational" && impact.meanTimeToRecover && (
            <div className="mt-2 text-sm">
              <span className="font-medium">Mean Recovery Time:</span>{" "}
              {impact.meanTimeToRecover}
            </div>
          )}
        </div>
      </div>
    );
  };

  // Generate sample considerations and benefits since they're not implemented in the service
  const considerations = useMemo((): BusinessItem[] => {
    return [
      {
        title: "Financial Investment",
        description: `Consider the financial impact of implementing ${availabilityLevel} availability, ${integrityLevel} integrity, and ${confidentialityLevel} confidentiality controls.`,
      },
      {
        title: "Operational Changes",
        description:
          "Evaluate the operational changes needed to support the selected security levels.",
      },
      {
        title: "Training Requirements",
        description:
          "Identify training needs for staff to support the implementation of these security controls.",
      },
    ];
  }, [availabilityLevel, integrityLevel, confidentialityLevel]);

  const benefits = useMemo((): BusinessItem[] => {
    return [
      {
        title: "Risk Reduction",
        description: `Implementing these controls reduces business risk related to ${availabilityLevel} availability, ${integrityLevel} integrity, and ${confidentialityLevel} confidentiality breaches.`,
      },
      {
        title: "Compliance Improvement",
        description:
          "Enhanced compliance with industry standards and regulatory requirements.",
      },
      {
        title: "Competitive Advantage",
        description:
          "Improved security posture can be a differentiator when dealing with security-conscious customers.",
      },
    ];
  }, [availabilityLevel, integrityLevel, confidentialityLevel]);

  // Add visual impact heat map component
  const renderImpactHeatMap = () => {
    const getHeatMapColor = (level: string): string => {
      switch (level) {
        case "Minimal":
          return "bg-green-100 dark:bg-green-900 dark:bg-opacity-20";
        case "Low":
          return "bg-blue-100 dark:bg-blue-900 dark:bg-opacity-20";
        case "Medium":
          return "bg-yellow-100 dark:bg-yellow-900 dark:bg-opacity-20";
        case "High":
          return "bg-orange-100 dark:bg-orange-900 dark:bg-opacity-20";
        case "Critical":
          return "bg-red-100 dark:bg-red-900 dark:bg-opacity-20";
        default:
          return "bg-gray-100 dark:bg-gray-800";
      }
    };

    return (
      <div
        className="mt-4 p-3 rounded-lg border border-gray-200 dark:border-gray-700"
        data-testid={BUSINESS_IMPACT_TEST_IDS.IMPACT_HEATMAP}
      >
        <h4 className="text-md font-medium mb-3">Impact Heat Map</h4>
        <div className="grid grid-cols-3 gap-2">
          <div
            className={`p-3 rounded-lg text-center ${getHeatMapColor(
              availabilityImpact?.financial?.riskLevel || "Medium"
            )}`}
          >
            <div className="text-xs font-medium mb-1">Financial</div>
            <div className="text-sm font-bold">
              {availabilityImpact?.financial?.riskLevel || "Medium"}
            </div>
          </div>
          <div
            className={`p-3 rounded-lg text-center ${getHeatMapColor(
              availabilityImpact?.operational?.riskLevel || "Medium"
            )}`}
          >
            <div className="text-xs font-medium mb-1">Operational</div>
            <div className="text-sm font-bold">
              {availabilityImpact?.operational?.riskLevel || "Medium"}
            </div>
          </div>
          <div
            className={`p-3 rounded-lg text-center ${getHeatMapColor(
              confidentialityImpact?.reputational?.riskLevel || "Medium"
            )}`}
          >
            <div className="text-xs font-medium mb-1">Reputational</div>
            <div className="text-sm font-bold">
              {confidentialityImpact?.reputational?.riskLevel || "Medium"}
            </div>
          </div>
        </div>
      </div>
    );
  };

  // Add a "Summary at a glance" section for executives
  const renderExecutiveSummary = () => {
    return (
      <div
        className="mb-4 p-3 bg-blue-50 dark:bg-blue-900 dark:bg-opacity-20 rounded-lg"
        data-testid={BUSINESS_IMPACT_TEST_IDS.EXECUTIVE_SUMMARY}
      >
        <h4 className="text-md font-medium mb-2">Executive Summary</h4>
        <p className="text-sm">
          With
          <span className="font-medium"> {availabilityLevel} </span>
          availability,
          <span className="font-medium"> {integrityLevel} </span>
          integrity, and
          <span className="font-medium"> {confidentialityLevel} </span>
          confidentiality, your organization faces a
          <span className="font-bold"> {impactLevel} </span>
          overall business impact.
        </p>
        <div className="mt-2 text-sm flex items-center">
          <span className="font-medium mr-2">Recommended action:</span>
          <span className="mr-1">{SECURITY_ICONS.recommendation}</span>
          {impactLevel === "Critical" || impactLevel === "High"
            ? "Immediate attention required to mitigate risks"
            : impactLevel === "Medium"
            ? "Review and address key risk areas"
            : "Monitor and maintain current controls"}
        </div>
      </div>
    );
  };

  // Get status badge color based on impact level
  const getStatusBadgeVariant = (
    level: string
  ): "info" | "success" | "warning" | "error" | "neutral" => {
    switch (level) {
      case "Minimal":
        return "success";
      case "Low":
        return "info";
      case "Medium":
        return "warning";
      case "High":
        return "error";
      case "Critical":
        return "error";
      default:
        return "neutral";
    }
  };

  return (
    <WidgetContainer
      title={WIDGET_TITLES.BUSINESS_IMPACT_ANALYSIS}
      icon={WIDGET_ICONS.BUSINESS_IMPACT_ANALYSIS}
      className={className}
      testId={testId}
    >
      <div className="p-4">
        {/* Error and loading states */}
        {error && (
          <div className="p-3 mb-4 bg-red-100 dark:bg-red-900 dark:bg-opacity-20 text-red-800 dark:text-red-200 rounded-lg">
            <h4 className="font-medium">Error</h4>
            <p className="text-sm">
              {error.message ||
                "Unable to calculate business impact. Please try again."}
            </p>
          </div>
        )}

        {isLoading && (
          <div className="p-3 mb-4 bg-blue-100 dark:bg-blue-900 dark:bg-opacity-20 text-blue-800 dark:text-blue-200 rounded-lg">
            <p className="text-sm">Loading business impact analysis...</p>
          </div>
        )}

        {/* Add high-level description */}
        <div className="mb-4 p-3 bg-blue-50 dark:bg-blue-900 dark:bg-opacity-20 rounded-lg">
          <p className="text-sm">
            This analysis shows the business impact of your selected security
            levels across different perspectives, helping you understand the
            implications of your security decisions on your organization.
          </p>
        </div>

        {/* Add Executive Summary at the top */}
        {renderExecutiveSummary()}

        {/* Three-Perspective Framework */}
        <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Business Perspective */}
          <div className="p-3 bg-gray-50 dark:bg-gray-800 rounded-lg border-l-4 border-blue-500">
            <h4 className="text-sm font-medium text-blue-700 dark:text-blue-300">
              Business Impact
            </h4>
            <p className="text-xs text-gray-600 dark:text-gray-400">
              {impactLevel === "Critical"
                ? "Critical business impact requiring immediate attention"
                : impactLevel === "High"
                ? "Significant business impact affecting operations"
                : "Moderate business impact with manageable consequences"}
            </p>
          </div>

          {/* Security Perspective */}
          <div className="p-3 bg-gray-50 dark:bg-gray-800 rounded-lg border-l-4 border-green-500">
            <h4 className="text-sm font-medium text-green-700 dark:text-green-300">
              Security Implications
            </h4>
            <p className="text-xs text-gray-600 dark:text-gray-400">
              Security controls align with {availabilityLevel}/{integrityLevel}/
              {confidentialityLevel} protection levels
            </p>
          </div>

          {/* Architecture Perspective */}
          <div className="p-3 bg-gray-50 dark:bg-gray-800 rounded-lg border-l-4 border-purple-500">
            <h4 className="text-sm font-medium text-purple-700 dark:text-purple-300">
              Implementation
            </h4>
            <p className="text-xs text-gray-600 dark:text-gray-400">
              Requires{" "}
              {getImplementationComplexity(
                availabilityLevel,
                integrityLevel,
                confidentialityLevel
              )}
              implementation effort
            </p>
          </div>
        </div>

        {/* Impact Summary */}
        <div className="mb-6">
          <h3 className="text-lg font-medium mb-2">Business Impact Summary</h3>
          <div
            className="p-3 bg-gray-50 dark:bg-gray-800 rounded-lg"
            data-testid={BUSINESS_IMPACT_TEST_IDS.BUSINESS_IMPACT_SUMMARY}
          >
            <div className="flex items-center justify-between mb-3">
              <div className="text-gray-600 dark:text-gray-400">
                Overall Business Impact
              </div>
              <StatusBadge
                status={getStatusBadgeVariant(impactLevel)}
                testId={BUSINESS_IMPACT_TEST_IDS.IMPACT_LEVEL_INDICATOR_PREFIX}
              >
                {impactLevel} Impact
              </StatusBadge>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              {impactLevel === "Critical"
                ? "Severe business impact with significant financial, operational, and reputational consequences."
                : impactLevel === "High"
                ? "Major business impact with substantial financial and operational consequences."
                : impactLevel === "Medium"
                ? "Moderate business impact with manageable but noticeable consequences."
                : impactLevel === "Low"
                ? "Minor business impact with limited financial and operational consequences."
                : "Minimal business impact with negligible consequences."}
            </p>
          </div>
        </div>

        {/* Add Heat Map visualization */}
        {renderImpactHeatMap()}

        {/* Tab navigation */}
        <div className="flex border-b border-gray-200 dark:border-gray-700 mb-4">
          <button
            className={`px-4 py-2 text-sm font-medium ${
              activeTab === "considerations"
                ? "border-b-2 border-blue-500 text-blue-600 dark:text-blue-400"
                : "text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
            }`}
            onClick={() => setActiveTab("considerations")}
            data-testid={BUSINESS_IMPACT_TEST_IDS.TAB_CONSIDERATIONS}
          >
            Business Considerations
          </button>
          <button
            className={`px-4 py-2 text-sm font-medium ${
              activeTab === "benefits"
                ? "border-b-2 border-blue-500 text-blue-600 dark:text-blue-400"
                : "text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
            }`}
            onClick={() => setActiveTab("benefits")}
            data-testid={BUSINESS_IMPACT_TEST_IDS.TAB_BENEFITS}
          >
            Key Benefits
          </button>
        </div>

        {/* Tab content */}
        {activeTab === "considerations" ? (
          <div data-testid={BUSINESS_IMPACT_TEST_IDS.BUSINESS_CONSIDERATIONS}>
            {considerations.length > 0 ? (
              <ul className="space-y-3">
                {considerations.map(
                  (consideration: BusinessItem, index: number) => (
                    <li
                      key={index}
                      className="p-3 bg-gray-50 dark:bg-gray-800 rounded-lg"
                      data-testid={`${BUSINESS_IMPACT_TEST_IDS.BUSINESS_IMPACT_PREFIX}-consideration-${index}`}
                    >
                      <div className="font-medium">
                        {consideration.title || `Consideration ${index + 1}`}
                      </div>
                      <div
                        className="text-sm text-gray-600 dark:text-gray-400 mt-1"
                        data-testid={`consideration-description-${index}`}
                      >
                        {consideration.description}
                      </div>
                    </li>
                  )
                )}
              </ul>
            ) : (
              <div
                className="text-center text-gray-500 dark:text-gray-400 p-6"
                data-testid={BUSINESS_IMPACT_TEST_IDS.NO_CONSIDERATIONS_MESSAGE}
              >
                No specific business considerations for the current security
                levels.
              </div>
            )}
          </div>
        ) : (
          <div data-testid={BUSINESS_IMPACT_TEST_IDS.BUSINESS_BENEFITS}>
            {benefits.length > 0 ? (
              <ul className="space-y-3">
                {benefits.map((benefit: BusinessItem, index: number) => (
                  <li
                    key={index}
                    className="p-3 bg-gray-50 dark:bg-gray-800 rounded-lg"
                    data-testid={`${BUSINESS_IMPACT_TEST_IDS.BUSINESS_IMPACT_PREFIX}-benefit-${index}`}
                  >
                    <div className="font-medium">
                      {benefit.title || `Benefit ${index + 1}`}
                    </div>
                    <div
                      className="text-sm text-gray-600 dark:text-gray-400 mt-1"
                      data-testid={`benefit-description-${index}`}
                    >
                      {benefit.description}
                    </div>
                  </li>
                ))}
              </ul>
            ) : (
              <div
                className="text-center text-gray-500 dark:text-gray-400 p-6"
                data-testid={BUSINESS_IMPACT_TEST_IDS.NO_BENEFITS_MESSAGE}
              >
                No specific business benefits for the current security levels.
              </div>
            )}
          </div>
        )}

        {/* Impact Metrics */}
        <div
          className="mt-6"
          data-testid={BUSINESS_IMPACT_TEST_IDS.IMPACT_METRICS_SECTION}
        >
          <h3 className="text-lg font-medium mb-3">Impact Metrics</h3>
          <div className="space-y-4">
            {/* Financial Impact */}
            {availabilityImpact?.financial && (
              <div data-testid={BUSINESS_IMPACT_TEST_IDS.FINANCIAL_IMPACT_CARD}>
                {renderImpactCategory(
                  "financial",
                  availabilityImpact.financial
                )}
              </div>
            )}
            {/* Operational Impact */}
            {availabilityImpact?.operational && (
              <div
                data-testid={BUSINESS_IMPACT_TEST_IDS.OPERATIONAL_IMPACT_CARD}
              >
                {renderImpactCategory(
                  "operational",
                  availabilityImpact.operational
                )}
              </div>
            )}
            {/* Reputational Impact */}
            {confidentialityImpact?.reputational && (
              <div
                data-testid={BUSINESS_IMPACT_TEST_IDS.REPUTATIONAL_IMPACT_CARD}
              >
                {renderImpactCategory(
                  "reputational",
                  confidentialityImpact.reputational
                )}
              </div>
            )}
            {/* Regulatory Impact */}
            {integrityImpact?.regulatory && (
              <div
                data-testid={BUSINESS_IMPACT_TEST_IDS.REGULATORY_IMPACT_CARD}
              >
                {renderImpactCategory("regulatory", integrityImpact.regulatory)}
              </div>
            )}
          </div>
        </div>
      </div>
    </WidgetContainer>
  );
};

export default BusinessImpactAnalysisWidget;
