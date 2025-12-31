import React, { useMemo } from "react";
import { WIDGET_ICONS, WIDGET_TITLES } from "../../../constants/appConstants";
import { COST_ESTIMATION_WIDGET_IDS } from "../../../constants/testIds";
import { useCIAContentService } from "../../../hooks/useCIAContentService";
import { CIAComponent, SecurityLevel } from "../../../types/cia";
import { CostEstimationWidgetProps } from "../../../types/widget-props";
import { calculateTotalSecurityCost } from "../../../utils/costCalculationUtils";
import { formatCurrency } from "../../../utils/formatUtils";
import { getImplementationComplexity } from "../../../utils/riskUtils";
import { getSecurityLevelValue } from "../../../utils/securityLevelUtils";
import { isArray, isNullish, isString } from "../../../utils/typeGuards";
import { getWidgetAriaDescription } from "../../../utils/accessibility";
import { WidgetClasses, cn } from "../../../utils/tailwindClassHelpers";
import MetricCard from "../../common/MetricCard";
import SecurityLevelBadge from "../../common/SecurityLevelBadge";
import WidgetContainer from "../../common/WidgetContainer";
import WidgetErrorBoundary from "../../common/WidgetErrorBoundary";

/**
 * Widget for estimating implementation and operational costs
 *
 * ## Business Perspective
 *
 * This widget provides financial stakeholders with cost estimates
 * for implementing and maintaining the selected security levels,
 * helping with budget planning and investment decisions related
 * to security initiatives. 💲
 */
const CostEstimationWidget: React.FC<CostEstimationWidgetProps> = ({
  availabilityLevel,
  integrityLevel,
  confidentialityLevel,
  className = "",
  testId = "cost-estimation-widget",
}) => {
  // Use the content service
  const {
    ciaContentService,
    error: serviceError,
    isLoading,
  } = useCIAContentService();

  // Calculate costs using consistent utility function
  const {
    totalCapex,
    totalOpex,
    totalCost,
    availabilityCost,
    integrityCost,
    confidentialityCost,
  } = useMemo(
    () =>
      calculateTotalSecurityCost(
        availabilityLevel,
        integrityLevel,
        confidentialityLevel
      ),
    [availabilityLevel, integrityLevel, confidentialityLevel]
  );

  // Calculate implementation complexity using existing utility
  const implementationComplexity = useMemo(
    () =>
      getImplementationComplexity(
        availabilityLevel,
        integrityLevel,
        confidentialityLevel
      ),
    [availabilityLevel, integrityLevel, confidentialityLevel]
  );

  // Calculate FTE requirements using same approach as TechnicalDetailsWidget
  const fteRequirements = useMemo(() => {
    // FTE mapping from security level - same as in TechnicalDetailsWidget
    const levelFteMap: Record<SecurityLevel, number> = {
      None: 0.1,
      Low: 0.25,
      Moderate: 0.5,
      High: 1,
      "Very High": 2,
    };

    // Calculate FTEs for each component based on their respective security levels
    const availFte = levelFteMap[availabilityLevel] || 0.5;
    const integFte = levelFteMap[integrityLevel] || 0.5;
    const confFte = levelFteMap[confidentialityLevel] || 0.5;

    // Find the max FTE across all components to match TechnicalDetailsWidget exactly
    const maxFte = Math.max(availFte, integFte, confFte);

    // Implementation is the primary FTE
    const implementationFte = maxFte;

    // Maintenance FTE is typically 60% of implementation
    const maintenanceFte = Number((implementationFte * 0.6).toFixed(1));

    return {
      implementation: implementationFte,
      maintenance: maintenanceFte,
      total: Number((implementationFte + maintenanceFte).toFixed(1)),
    };
  }, [availabilityLevel, integrityLevel, confidentialityLevel]);

  // Get expertise required - using defined type and handling missing property
  const getExpertiseForComponent = (
    component: CIAComponent,
    level: SecurityLevel
  ): string[] => {
    try {
      if (isNullish(ciaContentService)) {
        return getDefaultExpertise(component, level);
      }

      const details = ciaContentService.getComponentDetails(component, level);

      // Since expertiseRequired is not in CIADetails type, we need to handle it differently
      // Use runtime checks for safety without type assertions
      if (!isNullish(details) && typeof details === "object" && "expertiseRequired" in details) {
        const expertise = (details as { expertiseRequired?: unknown }).expertiseRequired;
        if (isArray(expertise) && expertise.every(item => isString(item))) {
          return expertise as string[];
        }
        if (isString(expertise)) {
          return [expertise];
        }
      }

      return getDefaultExpertise(component, level);
    } catch (err) {
      console.error(`Error getting expertise for ${component}:`, err);
      return getDefaultExpertise(component, level);
    }
  };

  // Get highest component expertise
  const expertiseRequired = useMemo(() => {
    // Get the component with the highest security level for expertise determination
    const highestComponent = [
      { type: "availability" as CIAComponent, level: availabilityLevel },
      { type: "integrity" as CIAComponent, level: integrityLevel },
      {
        type: "confidentiality" as CIAComponent,
        level: confidentialityLevel,
      },
    ].sort(
      (a, b) => getSecurityLevelValue(b.level) - getSecurityLevelValue(a.level)
    )[0];

    return getExpertiseForComponent(
      highestComponent.type,
      highestComponent.level
    );
  }, [availabilityLevel, integrityLevel, confidentialityLevel]);

  // Calculate the complexity percentage for visualization
  const complexityPercentage = useMemo(() => {
    const complexityMap: Record<string, number> = {
      Low: 25,
      Moderate: 50,
      High: 75,
      "Very High": 100,
    };
    return complexityMap[implementationComplexity] || 0;
  }, [implementationComplexity]);

  // Calculate cost breakdown percentages for visualization
  const costBreakdown = useMemo(() => {
    const totalComponentCost =
      availabilityCost.capex +
      availabilityCost.opex +
      integrityCost.capex +
      integrityCost.opex +
      confidentialityCost.capex +
      confidentialityCost.opex;

    return {
      availability:
        totalComponentCost > 0
          ? (
              ((availabilityCost.capex + availabilityCost.opex) /
                totalComponentCost) *
              100
            ).toFixed(0)
          : "0",
      integrity:
        totalComponentCost > 0
          ? (
              ((integrityCost.capex + integrityCost.opex) /
                totalComponentCost) *
              100
            ).toFixed(0)
          : "0",
      confidentiality:
        totalComponentCost > 0
          ? (
              ((confidentialityCost.capex + confidentialityCost.opex) /
                totalComponentCost) *
              100
            ).toFixed(0)
          : "0",
    };
  }, [availabilityCost, integrityCost, confidentialityCost]);

  // Calculate capex vs opex ratio
  const costRatio = useMemo(() => {
    const total = totalCapex + totalOpex;
    return {
      capex: total > 0 ? ((totalCapex / total) * 100).toFixed(0) : "0",
      opex: total > 0 ? ((totalOpex / total) * 100).toFixed(0) : "0",
    };
  }, [totalCapex, totalOpex]);

  return (
    <WidgetErrorBoundary widgetName="Cost Estimation">
      <WidgetContainer
        title={WIDGET_TITLES.COST_ESTIMATION || "Cost Estimation"}
        icon={WIDGET_ICONS.COST_ESTIMATION || "💰"}
        className={className}
        testId={testId}
        isLoading={isLoading}
        error={serviceError}
      >
      <div 
        className={cn("p-md sm:p-lg")}
        role="region"
        aria-label={getWidgetAriaDescription(
          "Cost Estimation",
          "Cost estimates for implementing and maintaining security controls"
        )}
      >
        {/* Introduction */}
        <section 
          className={cn(
            WidgetClasses.section,
            "bg-info-light/10 dark:bg-info-dark/20"
          )}
          aria-labelledby="cost-intro-heading"
        >
          <p id="cost-intro-heading" className={WidgetClasses.body}>
            This widget provides cost estimates for implementing and maintaining
            security controls based on your selected security levels across the
            CIA triad.
          </p>
        </section>

        {/* Summary cost section */}
        <section 
          className={cn(WidgetClasses.grid3Cols, "mb-lg")}
          aria-labelledby="cost-summary-heading"
        >
          <h3 id="cost-summary-heading" className="sr-only">Cost Summary</h3>
          <MetricCard
            label="Implementation Cost"
            value={formatCurrency(totalCapex)}
            icon="💼"
            description="One-time capital expenditure"
            variant="info"
            testId={COST_ESTIMATION_WIDGET_IDS.label('capex')}
          />
          <MetricCard
            label="Annual Operations"
            value={formatCurrency(totalOpex)}
            icon="🔄"
            description="Yearly operational expenses"
            variant="success"
            testId={COST_ESTIMATION_WIDGET_IDS.label('opex')}
          />
          <MetricCard
            label="Total First Year Cost"
            value={formatCurrency(totalCost)}
            icon="💲"
            description="Implementation + first year operations"
            variant="primary"
            testId={COST_ESTIMATION_WIDGET_IDS.label('total')}
          />
        </section>

        {/* CAPEX vs OPEX ratio visualization */}
        <div className="mb-lg">
          <h3 className={cn(WidgetClasses.heading)}>Cost Breakdown</h3>
          <div className={cn(WidgetClasses.card, "shadow-md")}>
            <div className="flex justify-between items-center mb-xs">
              <div className={cn(WidgetClasses.body, "font-medium")}>CAPEX</div>
              <div className={cn(WidgetClasses.body, "font-medium")}>OPEX</div>
            </div>
            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3 mb-sm">
              <div
                className="h-3 bg-blue-500 rounded-l-full"
                style={{ width: `${costRatio.capex}%` }}
              ></div>
            </div>
            <div className={cn(WidgetClasses.label, "flex justify-between lowercase")}>
              <div>
                {costRatio.capex}% ({formatCurrency(totalCapex)})
              </div>
              <div>
                {costRatio.opex}% ({formatCurrency(totalOpex)})
              </div>
            </div>
          </div>
        </div>

        {/* Implementation details grid */}
        <div className={cn(WidgetClasses.grid2Cols, "mb-lg")}>
          {/* Implementation complexity */}
          <div className={cn(WidgetClasses.card, "shadow-sm")}>
            <h4 className={cn(WidgetClasses.subheading)}>
              Implementation Complexity
            </h4>
            <div className="mb-md">
              <div className="text-lg font-bold text-primary-dark dark:text-primary-light">
                {implementationComplexity}
              </div>
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5 mt-sm">
                <div
                  className="h-2.5 bg-primary dark:bg-primary-light rounded-full"
                  style={{ width: `${complexityPercentage}%` }}
                ></div>
              </div>
            </div>
            <div className={cn(WidgetClasses.label, "lowercase")}>
              Based on combined complexity across CIA components
            </div>
          </div>

          {/* Personnel requirements */}
          <div className={cn(WidgetClasses.card, "shadow-sm")}>
            <h4 className={cn(WidgetClasses.subheading)}>Personnel Requirements</h4>
            <div className="grid grid-cols-1 gap-md">
              <div className="flex justify-between items-center">
                <div className={cn(WidgetClasses.body)}>
                  Implementation Team
                </div>
                <div className="text-lg font-bold text-blue-600 dark:text-blue-400">
                  {fteRequirements.implementation} FTE
                </div>
              </div>
              <div className="flex justify-between items-center">
                <div className={cn(WidgetClasses.body)}>
                  Ongoing Maintenance
                </div>
                <div className="text-lg font-bold text-green-600 dark:text-green-400">
                  {fteRequirements.maintenance} FTE
                </div>
              </div>
              <div className={cn(
                "flex justify-between items-center pt-2 mt-sm",
                WidgetClasses.dividerHorizontal
              )}>
                <div className={cn(WidgetClasses.body, "font-medium")}>
                  Annual Personnel Cost
                </div>
                <div className="text-lg font-bold">
                  {formatCurrency(fteRequirements.total * 120000)}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Component breakdown */}
        <div className="mb-lg">
          <h3 className={cn(WidgetClasses.heading)}>
            Cost by Security Component
          </h3>
          <div className="grid grid-cols-1 gap-md">
            {/* Using SecurityLevelBadge component for consistency with other widgets */}
            <div className={cn(WidgetClasses.card, "bg-primary-light/10 dark:bg-primary-dark/20 shadow-none")}>
              <div className="flex justify-between items-center mb-sm">
                <div className="font-medium text-primary-dark dark:text-primary-light flex items-center">
                  <span className="mr-sm">🔒</span>Confidentiality
                </div>
                <SecurityLevelBadge
                  category=""
                  level={confidentialityLevel}
                  colorClass="bg-primary-light/20 dark:bg-primary-dark/20"
                  textClass="text-primary-dark dark:text-primary-light"
                  testId={COST_ESTIMATION_WIDGET_IDS.label('conf-level')}
                />
              </div>
              <div className="flex justify-between items-center">
                <div className="text-md font-bold text-primary-dark dark:text-primary-light">
                  {formatCurrency(
                    confidentialityCost.capex + confidentialityCost.opex
                  )}
                </div>
                <div className={cn(WidgetClasses.badge, "bg-primary-light/20 dark:bg-primary-dark/30")}>
                  {costBreakdown.confidentiality}% of total
                </div>
              </div>
              <div className={cn(WidgetClasses.label, "mt-sm flex justify-between lowercase")}>
                <span>CAPEX: {formatCurrency(confidentialityCost.capex)}</span>
                <span>OPEX: {formatCurrency(confidentialityCost.opex)}</span>
              </div>
            </div>

            <div className={cn(WidgetClasses.card, "bg-green-50 dark:bg-green-900 dark:bg-opacity-20 shadow-none")}>
              <div className="flex justify-between items-center mb-sm">
                <div className="font-medium text-green-800 dark:text-green-300 flex items-center">
                  <span className="mr-sm">✓</span>Integrity
                </div>
                <SecurityLevelBadge
                  category=""
                  level={integrityLevel}
                  colorClass="bg-green-100 dark:bg-green-900 dark:bg-opacity-20"
                  textClass="text-green-800 dark:text-green-300"
                  testId={COST_ESTIMATION_WIDGET_IDS.label('int-level')}
                />
              </div>
              <div className="flex justify-between items-center">
                <div className="text-md font-bold text-green-600 dark:text-green-400">
                  {formatCurrency(integrityCost.capex + integrityCost.opex)}
                </div>
                <div className={cn(WidgetClasses.badge, "bg-green-100 dark:bg-green-900 dark:bg-opacity-30")}>
                  {costBreakdown.integrity}% of total
                </div>
              </div>
              <div className={cn(WidgetClasses.label, "mt-sm flex justify-between lowercase")}>
                <span>CAPEX: {formatCurrency(integrityCost.capex)}</span>
                <span>OPEX: {formatCurrency(integrityCost.opex)}</span>
              </div>
            </div>

            <div className={cn(WidgetClasses.card, "bg-blue-50 dark:bg-blue-900 dark:bg-opacity-20 shadow-none")}>
              <div className="flex justify-between items-center mb-sm">
                <div className="font-medium text-blue-800 dark:text-blue-300 flex items-center">
                  <span className="mr-sm">⏱️</span>Availability
                </div>
                <SecurityLevelBadge
                  category=""
                  level={availabilityLevel}
                  colorClass="bg-blue-100 dark:bg-blue-900 dark:bg-opacity-20"
                  textClass="text-blue-800 dark:text-blue-300"
                  testId={COST_ESTIMATION_WIDGET_IDS.label('avail-level')}
                />
              </div>
              <div className="flex justify-between items-center">
                <div className="text-md font-bold text-blue-600 dark:text-blue-400">
                  {formatCurrency(
                    availabilityCost.capex + availabilityCost.opex
                  )}
                </div>
                <div className={cn(WidgetClasses.badge, "bg-blue-100 dark:bg-blue-900 dark:bg-opacity-30")}>
                  {costBreakdown.availability}% of total
                </div>
              </div>
              <div className={cn(WidgetClasses.label, "mt-sm flex justify-between lowercase")}>
                <span>CAPEX: {formatCurrency(availabilityCost.capex)}</span>
                <span>OPEX: {formatCurrency(availabilityCost.opex)}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Expertise required */}
        <div className="mb-lg">
          <h3 className={cn(WidgetClasses.heading)}>Expertise Required</h3>
          <div className={cn(WidgetClasses.card, "shadow-sm")}>
            <ul className={cn(WidgetClasses.grid2Cols)}>
              {expertiseRequired.map((expertise: string, index: number) => (
                <li
                  key={`expertise-${index}`}
                  className={cn(WidgetClasses.body, "flex items-center")}
                >
                  <span className="mr-sm text-blue-500">•</span>
                  <span>{expertise}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Cost notes */}
        <div className={cn(WidgetClasses.card, "bg-yellow-50 dark:bg-yellow-900 dark:bg-opacity-20 shadow-none")}>
          <h4 className={cn(WidgetClasses.subheading, "flex items-center")}>
            <span className="mr-sm">💡</span>Cost Notes
          </h4>
          <ul className={cn(WidgetClasses.body, "list-disc list-inside space-y-1 pl-2")}>
            <li>
              Estimates are based on industry averages for the selected security
              levels
            </li>
            <li>
              Actual costs may vary based on your organization's size and
              industry
            </li>
            <li>
              FTE calculations assume an average annual cost of $120,000 per
              full-time employee
            </li>
            <li>
              Consider consulting with security professionals for more accurate
              cost projections
            </li>
          </ul>
        </div>
      </div>
    </WidgetContainer>
    </WidgetErrorBoundary>
  );
};

// Helper function to provide default expertise requirements
function getDefaultExpertise(
  component: CIAComponent,
  level: SecurityLevel
): string[] {
  if (component === "confidentiality") {
    switch (level) {
      case "None":
        return ["No specific expertise required"];
      case "Low":
        return ["Basic security knowledge", "Access control fundamentals"];
      case "Moderate":
        return [
          "Identity management",
          "Encryption technologies",
          "Authentication systems",
        ];
      case "High":
        return [
          "Advanced cryptography",
          "Identity and access management",
          "Security architecture",
          "Data protection",
        ];
      case "Very High":
        return [
          "Security architecture",
          "Advanced cryptography",
          "Zero-trust implementation",
          "Data protection specialization",
          "Hardware security",
        ];
      default:
        return ["General security knowledge"];
    }
  }

  if (component === "integrity") {
    switch (level) {
      case "None":
        return ["No specific expertise required"];
      case "Low":
        return ["Basic data validation", "Error handling"];
      case "Moderate":
        return [
          "Data validation techniques",
          "Database integrity",
          "Error handling",
        ];
      case "High":
        return [
          "Cryptographic verification",
          "Digital signatures",
          "Secure logging",
          "Change management",
        ];
      case "Very High":
        return [
          "Advanced cryptography",
          "Formal verification",
          "Distributed ledger technologies",
          "Immutable logging systems",
        ];
      default:
        return ["Data integrity fundamentals"];
    }
  }

  // Default to availability expertise
  switch (level) {
    case "None":
      return ["No specific expertise required"];
    case "Low":
      return ["Basic system monitoring", "Manual recovery procedures"];
    case "Moderate":
      return ["System redundancy", "Backup management", "Basic load balancing"];
    case "High":
      return [
        "High availability architecture",
        "Disaster recovery",
        "Advanced monitoring",
        "Automated failover",
      ];
    case "Very High":
      return [
        "Distributed systems",
        "Site reliability engineering",
        "Global load balancing",
        "Chaos engineering",
        "Real-time recovery systems",
      ];
    default:
      return ["System reliability fundamentals"];
  }
}

export default CostEstimationWidget;
