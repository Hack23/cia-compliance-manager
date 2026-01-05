import React, { useMemo } from "react";
import { WIDGET_ICONS, WIDGET_TITLES } from "../../../constants/appConstants";
import { BUSINESS_IMPACT_WIDGET_IDS, BUSINESS_IMPACT_TEST_IDS } from "../../../constants/testIds";
import { useCIAContentService } from "../../../hooks/useCIAContentService";
import {
  BusinessImpactDetail,
  BusinessItem,
} from "../../../types/businessImpact";
import { SecurityLevel } from "../../../types/cia";
import { BusinessImpactDetails } from "../../../types/cia-services";
import { BusinessImpactAnalysisWidgetProps } from "../../../types/widget-props";
import { Tab } from "../../../types/tabs";
import { isNullish } from "../../../utils/typeGuards";
import { getWidgetAriaDescription } from "../../../utils/accessibility";
import { WidgetClasses, cn } from "../../../utils/tailwindClassHelpers";
import KeyValuePair from "../../common/KeyValuePair";
import RiskLevelBadge from "../../common/RiskLevelBadge";
import SecurityLevelBadge from "../../common/SecurityLevelBadge";
import WidgetContainer from "../../common/WidgetContainer";
import WidgetErrorBoundary from "../../common/WidgetErrorBoundary";
import TabContainer from "../../common/TabContainer";

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
  testId = BUSINESS_IMPACT_TEST_IDS.BUSINESS_IMPACT_WIDGET,
}) => {
  // Get the CIA content service to access business impact data
  const {
    ciaContentService,
    error: serviceError,
    isLoading,
  } = useCIAContentService();

  // Calculate overall impact level with proper error handling
  const impactLevel = useMemo(() => {
    try {
      if (isNullish(ciaContentService)) {
        return calculateDefaultImpactLevel(
          availabilityLevel,
          integrityLevel,
          confidentialityLevel
        );
      }

      if (
        typeof ciaContentService.calculateBusinessImpactLevel === "function"
      ) {
        const impact = ciaContentService.calculateBusinessImpactLevel(
          availabilityLevel,
          integrityLevel,
          confidentialityLevel
        );
        return isNullish(impact)
          ? calculateDefaultImpactLevel(
              availabilityLevel,
              integrityLevel,
              confidentialityLevel
            )
          : impact;
      }

      return calculateDefaultImpactLevel(
        availabilityLevel,
        integrityLevel,
        confidentialityLevel
      );
    } catch (err) {
      console.error("Error calculating impact level:", err);
      return calculateDefaultImpactLevel(
        availabilityLevel,
        integrityLevel,
        confidentialityLevel
      );
    }
  }, [
    ciaContentService,
    availabilityLevel,
    integrityLevel,
    confidentialityLevel,
  ]);

  // Get availability impact with error handling
  const availabilityImpact = useMemo(() => {
    try {
      if (isNullish(ciaContentService)) {
        return getDefaultComponentImpact("availability", availabilityLevel);
      }

      if (typeof ciaContentService.getBusinessImpact === "function") {
        const impact = ciaContentService.getBusinessImpact(
          "availability",
          availabilityLevel
        );
        return isNullish(impact)
          ? getDefaultComponentImpact("availability", availabilityLevel)
          : impact;
      }

      return getDefaultComponentImpact("availability", availabilityLevel);
    } catch (err) {
      console.error("Error getting availability impact:", err);
      return getDefaultComponentImpact("availability", availabilityLevel);
    }
  }, [ciaContentService, availabilityLevel]);

  // Get integrity impact with error handling
  const integrityImpact = useMemo(() => {
    try {
      if (isNullish(ciaContentService)) {
        return getDefaultComponentImpact("integrity", integrityLevel);
      }

      if (typeof ciaContentService.getBusinessImpact === "function") {
        const impact = ciaContentService.getBusinessImpact(
          "integrity",
          integrityLevel
        );
        return isNullish(impact)
          ? getDefaultComponentImpact("integrity", integrityLevel)
          : impact;
      }

      return getDefaultComponentImpact("integrity", integrityLevel);
    } catch (err) {
      console.error("Error getting integrity impact:", err);
      return getDefaultComponentImpact("integrity", integrityLevel);
    }
  }, [ciaContentService, integrityLevel]);

  // Get confidentiality impact with error handling
  const confidentialityImpact = useMemo(() => {
    try {
      if (isNullish(ciaContentService)) {
        return getDefaultComponentImpact(
          "confidentiality",
          confidentialityLevel
        );
      }

      if (typeof ciaContentService.getBusinessImpact === "function") {
        const impact = ciaContentService.getBusinessImpact(
          "confidentiality",
          confidentialityLevel
        );
        return isNullish(impact)
          ? getDefaultComponentImpact("confidentiality", confidentialityLevel)
          : impact;
      }

      return getDefaultComponentImpact("confidentiality", confidentialityLevel);
    } catch (err) {
      console.error("Error getting confidentiality impact:", err);
      return getDefaultComponentImpact("confidentiality", confidentialityLevel);
    }
  }, [ciaContentService, confidentialityLevel]);

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

    const availabilityValue = levelValues[availabilityLevel] || 0;
    const integrityValue = levelValues[integrityLevel] || 0;
    const confidentialityValue = levelValues[confidentialityLevel] || 0;

    const totalValue =
      availabilityValue + integrityValue + confidentialityValue;

    if (totalValue <= 2) return "Low";
    if (totalValue <= 6) return "Moderate";
    if (totalValue <= 9) return "High";
    return "Very High";
  };

  // Helper to render an impact category with standardized icons
  const renderImpactCategory = (
    category: string,
    impact: BusinessImpactDetail
  ) => {
    const icons: Record<string, string> = {
      Availability: "⏱️",
      Integrity: "✅",
      Confidentiality: "🔒",
      Financial: "💰",
      Operational: "⚙️",
      Reputational: "👥",
      Regulatory: "📜",
    };

    return (
      <div
        key={`impact-${category}`}
        className={cn(WidgetClasses.card, "bg-gray-50 dark:bg-gray-800 mb-sm")}
        data-testid={BUSINESS_IMPACT_WIDGET_IDS.section(`impact-${category.toLowerCase()}`)}
      >
        <div className="flex justify-between items-center mb-sm">
          <h3 className={cn(WidgetClasses.subheading, "flex items-center")}>
            <span className="mr-sm" aria-hidden="true">{icons[category] || "📊"}</span>
            {category} Impact
          </h3>
          {impact.riskLevel && (
            <RiskLevelBadge
              risk={impact.riskLevel}
              testId={`${testId}-risk-level`}
            />
          )}
        </div>
        <p className={WidgetClasses.body}>
          {impact.description || "No description available"}
        </p>
      </div>
    );
  };

  // Generate considerations and benefits based on security levels
  const considerations = useMemo((): BusinessItem[] => {
    const totalLevelValue =
      getSecurityLevelValue(availabilityLevel) +
      getSecurityLevelValue(integrityLevel) +
      getSecurityLevelValue(confidentialityLevel);

    return [
      {
        title: "Implementation Effort",
        description: `${getImplementationComplexity(
          availabilityLevel,
          integrityLevel,
          confidentialityLevel
        )} complexity implementation requiring appropriate planning and resources.`,
        icon: "⚙️",
      },
      {
        title: "Resource Requirements",
        description: `Security levels of this tier typically require ${
          totalLevelValue < 3
            ? "minimal resources and can be implemented with existing staff."
            : totalLevelValue < 6
            ? "moderate resources including some specialized expertise."
            : totalLevelValue < 9
            ? "significant resources and dedicated security personnel."
            : "extensive resources and specialized security expertise."
        }`,
        icon: "👥",
      },
      {
        title: "Maintenance Overhead",
        description: `Ongoing maintenance will require ${
          totalLevelValue < 3
            ? "minimal effort with basic monitoring."
            : totalLevelValue < 6
            ? "regular attention and periodic reviews."
            : totalLevelValue < 9
            ? "dedicated staff time and routine assessments."
            : "continuous monitoring and regular reassessment."
        }`,
        icon: "🔧",
      },
      {
        title: "Organizational Impact",
        description: `These security controls will have ${
          totalLevelValue < 3
            ? "minimal impact on business processes."
            : totalLevelValue < 6
            ? "some impact on business processes requiring minor adjustments."
            : totalLevelValue < 9
            ? "moderate impact on business processes requiring training and adaptation."
            : "significant impact requiring process redesign and extensive training."
        }`,
        icon: "🏢",
      },
    ];
  }, [availabilityLevel, integrityLevel, confidentialityLevel]);

  const benefits = useMemo((): BusinessItem[] => {
    const totalLevelValue =
      getSecurityLevelValue(availabilityLevel) +
      getSecurityLevelValue(integrityLevel) +
      getSecurityLevelValue(confidentialityLevel);

    return [
      {
        title: "Risk Reduction",
        description: `${
          totalLevelValue < 3
            ? "Basic protection against common threats."
            : totalLevelValue < 6
            ? "Moderate risk reduction for most business scenarios."
            : totalLevelValue < 9
            ? "Significant protection against advanced threats."
            : "Comprehensive protection against sophisticated attacks."
        }`,
        icon: "🛡️",
      },
      {
        title: "Compliance Coverage",
        description: `These security controls provide ${
          totalLevelValue < 3
            ? "minimal compliance coverage for basic requirements."
            : totalLevelValue < 6
            ? "moderate compliance coverage for common regulations."
            : totalLevelValue < 9
            ? "substantial compliance coverage for most frameworks."
            : "comprehensive compliance with stringent regulatory requirements."
        }`,
        icon: "✅",
      },
      {
        title: "Business Enablement",
        description: `Security at this level ${
          totalLevelValue < 3
            ? "enables basic business operations with minimal protection."
            : totalLevelValue < 6
            ? "supports standard business functions with adequate protection."
            : totalLevelValue < 9
            ? "enables business growth with strong security assurances."
            : "provides competitive advantage through superior security posture."
        }`,
        icon: "📈",
      },
      {
        title: "Customer Trust",
        description: `This security profile ${
          totalLevelValue < 3
            ? "meets minimal customer expectations."
            : totalLevelValue < 6
            ? "satisfies standard customer security requirements."
            : totalLevelValue < 9
            ? "exceeds typical customer security expectations."
            : "establishes your organization as a security leader in the industry."
        }`,
        icon: "🤝",
      },
    ];
  }, [availabilityLevel, integrityLevel, confidentialityLevel]);

  // Add visual impact heat map component
  const renderImpactHeatMap = () => {
    // Create a visual representation of impact across CIA components
    return (
      <div className={cn(WidgetClasses.grid3Cols, "mt-sm mb-sm")}>
        <div
          className={cn(
            "p-sm rounded text-center",
            getImpactColorClass(confidentialityLevel)
          )}
          data-testid={BUSINESS_IMPACT_WIDGET_IDS.section('heatmap-confidentiality')}
        >
          <div className={WidgetClasses.labelNormal}>Confidentiality</div>
          <div className={cn(WidgetClasses.body, "font-bold")}>{confidentialityLevel}</div>
        </div>
        <div
          className={cn(
            "p-sm rounded text-center",
            getImpactColorClass(integrityLevel)
          )}
          data-testid={BUSINESS_IMPACT_WIDGET_IDS.section('heatmap-integrity')}
        >
          <div className={WidgetClasses.labelNormal}>Integrity</div>
          <div className={cn(WidgetClasses.body, "font-bold")}>{integrityLevel}</div>
        </div>
        <div
          className={cn(
            "p-sm rounded text-center",
            getImpactColorClass(availabilityLevel)
          )}
          data-testid={BUSINESS_IMPACT_WIDGET_IDS.section('heatmap-availability')}
        >
          <div className={WidgetClasses.labelNormal}>Availability</div>
          <div className={cn(WidgetClasses.body, "font-bold")}>{availabilityLevel}</div>
        </div>
      </div>
    );
  };

  // Add a "Summary at a glance" section for executives
  const renderExecutiveSummary = () => {
    return (
      <div
        className={cn(
          WidgetClasses.card,
          "bg-blue-50 dark:bg-blue-900 dark:bg-opacity-20 mb-sm shadow-none"
        )}
        data-testid={BUSINESS_IMPACT_WIDGET_IDS.section('executive-summary')}
      >
        <h3 className={cn(WidgetClasses.heading, "flex items-center")}>
          <span className="mr-sm" aria-hidden="true">📊</span>Executive Summary
        </h3>
        <p className={cn(WidgetClasses.body, "mb-sm")}>
          Current security posture provides{" "}
          <span className="font-medium">{impactLevel}</span> protection for
          business operations. Business impacts are most significant in{" "}
          {getHighestImpactArea(
            availabilityImpact,
            integrityImpact,
            confidentialityImpact
          )}{" "}
          areas.
        </p>
        <div className={cn(WidgetClasses.grid3Cols, "gap-sm")}>
          <KeyValuePair
            label="Overall Impact"
            value={impactLevel}
            testId={`${testId}-overall-impact`}
            valueClassName={cn("font-medium", getImpactTextColorClass(impactLevel))}
          />
          <KeyValuePair
            label="Implementation Complexity"
            value={getImplementationComplexity(
              availabilityLevel,
              integrityLevel,
              confidentialityLevel
            )}
            testId={`${testId}-implementation-complexity`}
          />
          <KeyValuePair
            label="Security Profile"
            value={
              availabilityLevel === integrityLevel &&
              integrityLevel === confidentialityLevel
                ? availabilityLevel
                : "Mixed"
            }
            testId={`${testId}-security-profile`}
          />
        </div>
      </div>
    );
  };

  // Configure tabs with content
  const tabs: Tab[] = [
    {
      id: 'considerations',
      label: 'Implementation Considerations',
      content: (
        <div
          className={WidgetClasses.grid2Cols}
          data-testid={BUSINESS_IMPACT_WIDGET_IDS.section('considerations')}
        >
          {considerations.map((item, index) => (
            <div
              key={`consideration-${index}`}
              className="p-sm bg-gray-50 dark:bg-gray-800 rounded-lg"
              data-testid={BUSINESS_IMPACT_WIDGET_IDS.item(`consideration-${index}`)}
            >
              <div className="flex items-center mb-sm">
                <span className="mr-sm text-blue-500 dark:text-blue-400" aria-hidden="true">{item.icon}</span>
                <h4 className={WidgetClasses.subheading}>{item.title}</h4>
              </div>
              <p className={WidgetClasses.body}>
                {item.description}
              </p>
            </div>
          ))}
        </div>
      ),
      testId: BUSINESS_IMPACT_WIDGET_IDS.button('tab-considerations'),
    },
    {
      id: 'benefits',
      label: 'Business Benefits',
      content: (
        <div
          className={WidgetClasses.grid2Cols}
          data-testid={BUSINESS_IMPACT_WIDGET_IDS.section('benefits')}
        >
          {benefits.map((item, index) => (
            <div
              key={`benefit-${index}`}
              className="p-sm bg-gray-50 dark:bg-gray-800 rounded-lg"
              data-testid={BUSINESS_IMPACT_WIDGET_IDS.item(`benefit-${index}`)}
            >
              <div className="flex items-center mb-sm">
                <span className="mr-sm text-green-500 dark:text-green-400" aria-hidden="true">{item.icon}</span>
                <h4 className={WidgetClasses.subheading}>{item.title}</h4>
              </div>
              <p className={WidgetClasses.body}>
                {item.description}
              </p>
            </div>
          ))}
        </div>
      ),
      testId: BUSINESS_IMPACT_WIDGET_IDS.button('tab-benefits'),
    },
  ];

  return (
    <WidgetErrorBoundary widgetName="Business Impact Analysis">
      <WidgetContainer
        title={
          WIDGET_TITLES.BUSINESS_IMPACT_ANALYSIS || "Business Impact Analysis"
        }
        icon={WIDGET_ICONS.BUSINESS_IMPACT_ANALYSIS || "💼"}
        className={className}
        testId={testId}
        isLoading={isLoading}
        error={serviceError}
      >
      <div 
        className="p-sm space-y-sm"
        role="region"
        aria-label={getWidgetAriaDescription(
          "Business Impact Analysis",
          "Business implications of security measures across financial, operational, reputational and regulatory dimensions"
        )}
      >
        {/* Component Business Impacts */}
        <section 
          className="mb-sm"
          aria-labelledby="business-impacts-heading"
        >
          <h3 id="business-impacts-heading" className={cn(WidgetClasses.subheading, "mb-sm")}>
            Business Impacts by Component
          </h3>

          {/* Confidentiality impact */}
          {confidentialityImpact && (
            <div className="mb-sm">
              <h4 className={cn(WidgetClasses.subheading, "flex items-center")}>
                <span className="mr-sm" aria-hidden="true">🔒</span>Confidentiality Impact
              </h4>
              <div className={WidgetClasses.grid2Cols}>
                {confidentialityImpact.reputational &&
                  renderImpactCategory(
                    "Reputational",
                    confidentialityImpact.reputational
                  )}
                {confidentialityImpact.regulatory &&
                  renderImpactCategory(
                    "Regulatory",
                    confidentialityImpact.regulatory
                  )}
              </div>
            </div>
          )}

          {/* Integrity impact */}
          {integrityImpact && (
            <div className="mb-sm">
              <h4 className={cn(WidgetClasses.subheading, "flex items-center")}>
                <span className="mr-sm" aria-hidden="true">✅</span>Integrity Impact
              </h4>
              <div className={WidgetClasses.grid2Cols}>
                {integrityImpact.financial &&
                  renderImpactCategory("Financial", integrityImpact.financial)}
                {integrityImpact.operational &&
                  renderImpactCategory(
                    "Operational",
                    integrityImpact.operational
                  )}
              </div>
            </div>
          )}

          {/* Availability impact - Full width */}
          {availabilityImpact && (
            <div className="mb-sm">
              <h4 className={cn(WidgetClasses.subheading, "flex items-center")}>
                <span className="mr-sm" aria-hidden="true">⏱️</span>Availability Impact
              </h4>
              <div className={WidgetClasses.grid2Cols}>
                {availabilityImpact.financial &&
                  renderImpactCategory("Financial", availabilityImpact.financial)}
                {availabilityImpact.operational &&
                  renderImpactCategory(
                    "Operational",
                    availabilityImpact.operational
                  )}
              </div>
            </div>
          )}
        </section>

        {/* Executive Summary and Heatmap combined */}
        <div className="mb-sm">
          {renderExecutiveSummary()}
        </div>

        {/* Current Security Levels & Impact */}
        <div className="mb-sm">
          <h3 className={cn(WidgetClasses.subheading, "mb-sm")}>Current Security Levels</h3>
          <div className="flex flex-wrap gap-sm">
            <SecurityLevelBadge
              category="Confidentiality"
              level={confidentialityLevel}
              colorClass="bg-purple-100 dark:bg-purple-900 dark:bg-opacity-20"
              textClass="text-purple-800 dark:text-purple-300"
              testId={`${testId}-confidentiality-badge`}
            />
            <SecurityLevelBadge
              category="Integrity"
              level={integrityLevel}
              colorClass="bg-green-100 dark:bg-green-900 dark:bg-opacity-20"
              textClass="text-green-800 dark:text-green-300"
              testId={`${testId}-integrity-badge`}
            />
            <SecurityLevelBadge
              category="Availability"
              level={availabilityLevel}
              colorClass="bg-blue-100 dark:bg-blue-900 dark:bg-opacity-20"
              textClass="text-blue-800 dark:text-blue-300"
              testId={`${testId}-availability-badge`}
            />
          </div>
          {renderImpactHeatMap()}
        </div>

        {/* Business Considerations & Benefits */}
        <div className="mt-sm">
          <TabContainer
            tabs={tabs}
            initialTab="considerations"
            testId={`${testId}-tabs`}
          />
        </div>
      </div>
    </WidgetContainer>
    </WidgetErrorBoundary>
  );
};

// Helper function to determine the highest impact area from the components
function getHighestImpactArea(
  availabilityImpact: BusinessImpactDetails,
  integrityImpact: BusinessImpactDetails,
  confidentialityImpact: BusinessImpactDetails
): string {
  const impactAreas = [];

  if (availabilityImpact?.operational?.riskLevel?.includes("High")) {
    impactAreas.push("operational");
  }
  if (availabilityImpact?.financial?.riskLevel?.includes("High")) {
    impactAreas.push("financial");
  }
  if (integrityImpact?.operational?.riskLevel?.includes("High")) {
    impactAreas.push("operational");
  }
  if (integrityImpact?.financial?.riskLevel?.includes("High")) {
    impactAreas.push("financial");
  }
  if (confidentialityImpact?.reputational?.riskLevel?.includes("High")) {
    impactAreas.push("reputational");
  }
  if (confidentialityImpact?.regulatory?.riskLevel?.includes("High")) {
    impactAreas.push("regulatory");
  }

  if (impactAreas.length === 0) {
    return "minimal";
  }

  if (impactAreas.length === 1) {
    return impactAreas[0];
  }

  if (impactAreas.length === 2) {
    return `${impactAreas[0]} and ${impactAreas[1]}`;
  }

  return "multiple";
}

// Helper function to get security level value for calculations
function getSecurityLevelValue(level: SecurityLevel): number {
  const levelValues: Record<SecurityLevel, number> = {
    None: 0,
    Low: 1,
    Moderate: 2,
    High: 3,
    "Very High": 4,
  };

  return levelValues[level] || 0;
}

// Helper function to get color class for impact heat map
function getImpactColorClass(level: SecurityLevel): string {
  switch (level) {
    case "None":
      return "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300";
    case "Low":
      return "bg-green-100 text-green-800 dark:bg-green-900 dark:bg-opacity-30 dark:text-green-300";
    case "Moderate":
      return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:bg-opacity-30 dark:text-yellow-300";
    case "High":
      return "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:bg-opacity-30 dark:text-orange-300";
    case "Very High":
      return "bg-red-100 text-red-800 dark:bg-red-900 dark:bg-opacity-30 dark:text-red-300";
    default:
      return "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300";
  }
}

// Helper function to get text color class for impact level
function getImpactTextColorClass(level: string): string {
  if (level.includes("Low")) {
    return "text-green-600 dark:text-green-400";
  } else if (level.includes("Moderate")) {
    return "text-yellow-600 dark:text-yellow-400";
  } else if (level.includes("High")) {
    return "text-orange-600 dark:text-orange-400";
  } else if (level.includes("Very High") || level.includes("Critical")) {
    return "text-red-600 dark:text-red-400";
  }
  return "text-gray-600 dark:text-gray-400";
}

// Helper function to calculate default impact level when service isn't available
function calculateDefaultImpactLevel(
  availabilityLevel: SecurityLevel,
  integrityLevel: SecurityLevel,
  confidentialityLevel: SecurityLevel
): string {
  const levelValues: Record<SecurityLevel, number> = {
    None: 0,
    Low: 1,
    Moderate: 2,
    High: 3,
    "Very High": 4,
  };

  const availabilityValue = levelValues[availabilityLevel] || 0;
  const integrityValue = levelValues[integrityLevel] || 0;
  const confidentialityValue = levelValues[confidentialityLevel] || 0;

  const avgValue =
    (availabilityValue + integrityValue + confidentialityValue) / 3;

  if (avgValue <= 0.5) return "Minimal";
  if (avgValue <= 1.5) return "Low";
  if (avgValue <= 2.5) return "Moderate";
  if (avgValue <= 3.5) return "High";
  return "Very High";
}

// Helper function to generate default component impact data
function getDefaultComponentImpact(component: string, level: SecurityLevel) {
  const isLowSecurity = level === "None" || level === "Low";

  if (component === "availability") {
    return {
      summary: `${level} availability impact on business operations`,
      operational: {
        description: `${
          isLowSecurity
            ? "Significant operational disruptions possible due to limited availability controls"
            : "Operations protected by appropriate availability controls"
        }`,
        riskLevel: isLowSecurity ? "High Risk" : "Low Risk",
      },
      financial: {
        description: `${
          isLowSecurity
            ? "Potential financial losses due to service disruptions and downtime"
            : "Financial impact minimized through robust availability controls"
        }`,
        riskLevel: isLowSecurity ? "Medium Risk" : "Low Risk",
      },
    };
  }

  if (component === "integrity") {
    return {
      summary: `${level} integrity impact on business operations`,
      operational: {
        description: `${
          isLowSecurity
            ? "Business decisions may be based on inaccurate or corrupted data"
            : "Data accuracy protected by appropriate integrity controls"
        }`,
        riskLevel: isLowSecurity ? "High Risk" : "Low Risk",
      },
      financial: {
        description: `${
          isLowSecurity
            ? "Financial losses possible due to data errors affecting decision making"
            : "Financial impact minimized through data validation and integrity mechanisms"
        }`,
        riskLevel: isLowSecurity ? "Medium Risk" : "Low Risk",
      },
    };
  }

  // confidentiality
  return {
    summary: `${level} confidentiality impact on business operations`,
    reputational: {
      description: `${
        isLowSecurity
          ? "High risk of reputational damage from data exposures or breaches"
          : "Reputation protected by appropriate confidentiality controls"
      }`,
      riskLevel: isLowSecurity ? "High Risk" : "Low Risk",
    },
    regulatory: {
      description: `${
        isLowSecurity
          ? "Increased risk of non-compliance with data protection regulations"
          : "Regulatory compliance supported by appropriate data protection measures"
      }`,
      riskLevel: isLowSecurity ? "Medium Risk" : "Low Risk",
    },
  };
}

export default BusinessImpactAnalysisWidget;
