import React, { useState } from "react";
import {
  BUSINESS_IMPACT_ICONS,
  CIA_COMPONENT_ICONS,
} from "../../constants/uiConstants";
import {
  BUSINESS_IMPACT_TEST_IDS,
  CIA_TEST_IDS,
} from "../../constants/testIds";
import {
  BUSINESS_CONSIDERATIONS,
  BusinessKeyBenefits,
  BusinessConsideration,
} from "../../types/businessImpact";
import { RISK_LEVELS } from "../../constants/riskConstants";
import KeyValuePair from "../common/KeyValuePair";

interface BusinessImpactAnalysisWidgetProps {
  availability?: string;
  integrity?: string;
  confidentiality?: string;
  securityLevel?: string;
  testId?: string;
}

const BusinessImpactAnalysisWidget: React.FC<
  BusinessImpactAnalysisWidgetProps
> = ({
  availability = "None",
  integrity = "None",
  confidentiality = "None",
  securityLevel = "None",
  testId = BUSINESS_IMPACT_TEST_IDS.BUSINESS_IMPACT_ANALYSIS_PREFIX,
}) => {
  // Track active tab - considerations or benefits
  const [activeTab, setActiveTab] = useState<"considerations" | "benefits">(
    "considerations"
  );

  // Convert string level to uppercase constant key
  const getUppercaseLevel = (level: string) =>
    level.toUpperCase() as keyof typeof BusinessKeyBenefits;

  // Get appropriate security level color
  const getSecurityLevelClass = (level: string) => {
    switch (level) {
      case "None":
        return "text-red-600";
      case "Low":
        return "text-orange-600";
      case "Moderate":
        return "text-yellow-600";
      case "High":
        return "text-blue-600";
      case "Very High":
        return "text-green-600";
      default:
        return "text-gray-600";
    }
  };

  // Get business considerations for a specific CIA component
  const getConsiderationsForComponent = (
    component: string,
    level: string
  ): BusinessConsideration[] => {
    const upperComponent =
      component.toUpperCase() as keyof typeof BUSINESS_CONSIDERATIONS;
    const upperLevel =
      level.toUpperCase() as keyof (typeof BUSINESS_CONSIDERATIONS)[keyof typeof BUSINESS_CONSIDERATIONS];

    return BUSINESS_CONSIDERATIONS[upperComponent]?.[upperLevel] || [];
  };

  // Get all considerations across components
  const getAllConsiderations = () => {
    const availabilityConsiderations = getConsiderationsForComponent(
      "AVAILABILITY",
      availability
    );
    const integrityConsiderations = getConsiderationsForComponent(
      "INTEGRITY",
      integrity
    );
    const confidentialityConsiderations = getConsiderationsForComponent(
      "CONFIDENTIALITY",
      confidentiality
    );

    return [
      ...availabilityConsiderations,
      ...integrityConsiderations,
      ...confidentialityConsiderations,
    ];
  };

  // Get business benefits for the current security level
  const getBusinessBenefits = () => {
    return BusinessKeyBenefits[getUppercaseLevel(securityLevel)] || [];
  };

  const considerations = getAllConsiderations();
  const benefits = getBusinessBenefits();

  // Helper to get badge color for risk level
  const getRiskBadgeClass = (risk: string) => {
    switch (risk) {
      case RISK_LEVELS.CRITICAL:
        return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300";
      case RISK_LEVELS.HIGH:
        return "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300";
      case RISK_LEVELS.MEDIUM:
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300";
      case RISK_LEVELS.LOW:
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300";
      default:
        return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300";
    }
  };

  return (
    <div className="p-4" data-testid={testId}>
      {/* CIA Security Profile Section */}
      <div
        className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg mb-4"
        data-testid={BUSINESS_IMPACT_TEST_IDS.BUSINESS_IMPACT_SUMMARY}
      >
        <h3 className="text-md font-medium mb-3">CIA Security Profile</h3>

        <div className="space-y-2">
          <div
            className="flex items-center"
            data-testid={CIA_TEST_IDS.CONFIDENTIALITY_SECTION}
          >
            <span className="text-md mr-2">
              {CIA_COMPONENT_ICONS.CONFIDENTIALITY}
            </span>
            <KeyValuePair
              label="Confidentiality:"
              value={
                <span className={getSecurityLevelClass(confidentiality)}>
                  {confidentiality}
                </span>
              }
              testId={CIA_TEST_IDS.CONFIDENTIALITY_KV}
            />
          </div>

          <div
            className="flex items-center"
            data-testid={CIA_TEST_IDS.INTEGRITY_SECTION}
          >
            <span className="text-md mr-2">
              {CIA_COMPONENT_ICONS.INTEGRITY}
            </span>
            <KeyValuePair
              label="Integrity:"
              value={
                <span className={getSecurityLevelClass(integrity)}>
                  {integrity}
                </span>
              }
              testId={CIA_TEST_IDS.INTEGRITY_KV}
            />
          </div>

          <div
            className="flex items-center"
            data-testid={CIA_TEST_IDS.AVAILABILITY_SECTION}
          >
            <span className="text-md mr-2">
              {CIA_COMPONENT_ICONS.AVAILABILITY}
            </span>
            <KeyValuePair
              label="Availability:"
              value={
                <span className={getSecurityLevelClass(availability)}>
                  {availability}
                </span>
              }
              testId={CIA_TEST_IDS.AVAILABILITY_KV}
            />
          </div>
        </div>
      </div>

      {/* Tabs for Considerations and Benefits */}
      <div className="border-b border-gray-200 dark:border-gray-700 mb-4">
        <nav className="flex" aria-label="Business Impact Analysis Tabs">
          <button
            className={`py-2 px-4 font-medium ${
              activeTab === "considerations"
                ? "border-b-2 border-blue-500 text-blue-600 dark:text-blue-400"
                : "text-gray-500"
            }`}
            onClick={() => setActiveTab("considerations")}
            data-testid={BUSINESS_IMPACT_TEST_IDS.TAB_CONSIDERATIONS}
          >
            Business Considerations
          </button>
          <button
            className={`py-2 px-4 font-medium ${
              activeTab === "benefits"
                ? "border-b-2 border-blue-500 text-blue-600 dark:text-blue-400"
                : "text-gray-500"
            }`}
            onClick={() => setActiveTab("benefits")}
            data-testid={BUSINESS_IMPACT_TEST_IDS.TAB_BENEFITS}
          >
            Key Benefits
          </button>
        </nav>
      </div>

      {/* Considerations Tab Content */}
      {activeTab === "considerations" && (
        <div
          className="space-y-3"
          data-testid={BUSINESS_IMPACT_TEST_IDS.BUSINESS_CONSIDERATIONS}
        >
          {considerations.length > 0 ? (
            considerations.map((item, index) => (
              <div
                key={index}
                className="bg-gray-50 dark:bg-gray-700 p-3 rounded-md"
                data-testid={`consideration-item-${index}`}
              >
                <div className="flex items-center mb-2">
                  <span className="text-lg mr-2">
                    {BUSINESS_IMPACT_ICONS[
                      item.type as keyof typeof BUSINESS_IMPACT_ICONS
                    ] || BUSINESS_IMPACT_ICONS.NEUTRAL}
                  </span>
                  {item.risk && (
                    <span
                      className={`text-xs font-medium px-2.5 py-0.5 rounded ${getRiskBadgeClass(
                        item.risk
                      )}`}
                      data-testid={`risk-badge-${index}`}
                    >
                      {item.risk}
                    </span>
                  )}
                </div>
                <p
                  className="text-sm text-gray-700 dark:text-gray-300"
                  data-testid={`consideration-description-${index}`}
                >
                  {item.description}
                </p>
              </div>
            ))
          ) : (
            <div
              className="text-center text-sm text-gray-500 p-4"
              data-testid={BUSINESS_IMPACT_TEST_IDS.NO_CONSIDERATIONS_MESSAGE}
            >
              No business considerations available for the current security
              profile.
            </div>
          )}
        </div>
      )}

      {/* Benefits Tab Content */}
      {activeTab === "benefits" && (
        <div
          className="space-y-3"
          data-testid={BUSINESS_IMPACT_TEST_IDS.BUSINESS_BENEFITS}
        >
          {benefits.length > 0 ? (
            benefits.map((benefit, index) => (
              <div
                key={index}
                className="bg-gray-50 dark:bg-gray-700 p-3 rounded-md"
                data-testid={`benefit-item-${index}`}
              >
                <p className="text-sm text-gray-700 dark:text-gray-300">
                  {typeof benefit === "string" ? benefit : benefit.title}
                </p>
                {typeof benefit !== "string" && benefit.description && (
                  <p className="text-xs text-gray-500 mt-1">
                    {benefit.description}
                  </p>
                )}
              </div>
            ))
          ) : (
            <div
              className="text-center text-sm text-gray-500 p-4"
              data-testid={BUSINESS_IMPACT_TEST_IDS.NO_BENEFITS_MESSAGE}
            >
              No key benefits available for the current security profile.
            </div>
          )}
        </div>
      )}

      {/* Impact Metrics Section - only show if medium or higher */}
      {securityLevel !== "None" && securityLevel !== "Low" && (
        <div
          className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700"
          data-testid={BUSINESS_IMPACT_TEST_IDS.IMPACT_METRICS_SECTION}
        >
          <h3 className="text-md font-medium mb-3">Impact Metrics</h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {/* Financial Impact */}
            <div
              className="bg-gray-50 dark:bg-gray-700 p-3 rounded-md"
              data-testid={BUSINESS_IMPACT_TEST_IDS.FINANCIAL_IMPACT_CARD}
            >
              <div className="flex items-center mb-2">
                <span className="text-lg mr-2">
                  {BUSINESS_IMPACT_ICONS.FINANCIAL}
                </span>
                <h4 className="text-sm font-medium">Financial Impact</h4>
              </div>
              <div
                className="space-y-1 text-sm"
                data-testid={BUSINESS_IMPACT_TEST_IDS.FINANCIAL_IMPACT_METRICS}
              >
                <KeyValuePair
                  label="Revenue Loss Risk"
                  value={
                    securityLevel === "Very High"
                      ? "< 1%"
                      : securityLevel === "High"
                      ? "1-3%"
                      : "5-10%"
                  }
                  testId={BUSINESS_IMPACT_TEST_IDS.REVENUE_LOSS_KV}
                />
              </div>
            </div>

            {/* Operational Impact */}
            <div
              className="bg-gray-50 dark:bg-gray-700 p-3 rounded-md"
              data-testid={BUSINESS_IMPACT_TEST_IDS.OPERATIONAL_IMPACT_CARD}
            >
              <div className="flex items-center mb-2">
                <span className="text-lg mr-2">
                  {BUSINESS_IMPACT_ICONS.OPERATIONAL}
                </span>
                <h4 className="text-sm font-medium">Operational Impact</h4>
              </div>
              <div
                className="space-y-1 text-sm"
                data-testid={
                  BUSINESS_IMPACT_TEST_IDS.OPERATIONAL_IMPACT_METRICS
                }
              >
                <KeyValuePair
                  label="Mean Recovery Time"
                  value={
                    securityLevel === "Very High"
                      ? "Minutes"
                      : securityLevel === "High"
                      ? "Hours"
                      : "Days"
                  }
                  testId={BUSINESS_IMPACT_TEST_IDS.RECOVERY_TIME_KV}
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BusinessImpactAnalysisWidget;
