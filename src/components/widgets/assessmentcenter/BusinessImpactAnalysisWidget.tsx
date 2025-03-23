import React, { useMemo, useState } from "react";
import { BUSINESS_IMPACT_TEST_IDS } from "../../../constants/testIds";
import { useCIAOptions } from "../../../hooks/useCIAOptions";
import { createBusinessImpactService } from "../../../services/businessImpactService";
import { BusinessImpactDetail, SecurityLevel } from "../../../types/cia";
// Import BusinessItem from businessImpact.ts instead of cia.ts
import { BusinessItem } from "../../../types/businessImpact";
// Change from import type to regular import
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
      case "Critical":
        return "error";
      default:
        return "neutral";
    }
  };

  // Helper to render an impact category
  const renderImpactCategory = (
    category: string,
    impact: BusinessImpactDetail
  ) => {
    if (!impact) return null;

    const icon = businessImpactService.getCategoryIcon(category);

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

  return (
    <WidgetContainer
      title="Business Impact Analysis"
      icon="📊"
      className={className}
      testId={testId}
    >
      <div className="p-4">
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
              <div>
                {renderImpactCategory(
                  "reputational",
                  confidentialityImpact.reputational
                )}
              </div>
            )}

            {/* Regulatory Impact */}
            {integrityImpact?.regulatory && (
              <div>
                {renderImpactCategory("regulatory", integrityImpact.regulatory)}
              </div>
            )}
          </div>
        </div>
      </div>
    </WidgetContainer>
  );
};

// Export the component directly without HOC
export default BusinessImpactAnalysisWidget;
