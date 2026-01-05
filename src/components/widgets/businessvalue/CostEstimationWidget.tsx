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
  testId = COST_ESTIMATION_WIDGET_IDS.root,
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
        className="p-md"
        role="region"
        aria-label={getWidgetAriaDescription(
          "Cost Estimation",
          "Cost estimates for implementing and maintaining security controls"
        )}
      >
        {/* Summary cost section - Compact 3-column grid */}
        <section 
          className="grid grid-cols-1 sm:grid-cols-3 gap-sm mb-md"
          aria-labelledby="cost-summary-heading"
        >
          <h3 id="cost-summary-heading" className="sr-only">Cost Summary</h3>
          <div className="p-sm bg-info-light/10 dark:bg-info-dark/20 rounded-md border border-info-light/30 dark:border-info-dark/30">
            <div className="text-caption text-info-dark dark:text-info-light font-medium mb-xs">CAPEX</div>
            <div className="text-heading font-bold text-info-dark dark:text-info-light" data-testid={COST_ESTIMATION_WIDGET_IDS.label('capex')}>
              {formatCurrency(totalCapex)}
            </div>
            <div className="text-caption text-info-dark/70 dark:text-info-light/70">One-time</div>
          </div>
          <div className="p-sm bg-success-light/10 dark:bg-success-dark/20 rounded-md border border-success-light/30 dark:border-success-dark/30">
            <div className="text-caption text-success-dark dark:text-success-light font-medium mb-xs">OPEX</div>
            <div className="text-heading font-bold text-success-dark dark:text-success-light" data-testid={COST_ESTIMATION_WIDGET_IDS.label('opex')}>
              {formatCurrency(totalOpex)}
            </div>
            <div className="text-caption text-success-dark/70 dark:text-success-light/70">Annual</div>
          </div>
          <div className="p-sm bg-primary-light/10 dark:bg-primary-dark/20 rounded-md border border-primary-light/30 dark:border-primary-dark/30">
            <div className="text-caption text-primary-dark dark:text-primary-light font-medium mb-xs">TOTAL</div>
            <div className="text-heading font-bold text-primary-dark dark:text-primary-light" data-testid={COST_ESTIMATION_WIDGET_IDS.label('total')}>
              {formatCurrency(totalCost)}
            </div>
            <div className="text-caption text-primary-dark/70 dark:text-primary-light/70">First Year</div>
          </div>
        </section>

        {/* Implementation details - Compact inline layout */}
        <div className="grid grid-cols-2 gap-sm mb-md">
          {/* Implementation complexity */}
          <div className="p-sm bg-neutral-light/5 dark:bg-neutral-dark/10 rounded-md border border-neutral-light/20 dark:border-neutral-dark/20">
            <div className="flex justify-between items-center mb-xs">
              <span className="text-caption font-medium">Complexity</span>
              <span className="text-body-lg font-bold text-primary-dark dark:text-primary-light">
                {implementationComplexity}
              </span>
            </div>
            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-1.5">
              <div
                className="h-1.5 bg-primary dark:bg-primary-light rounded-full"
                style={{ width: `${complexityPercentage}%` }}
                role="progressbar"
                aria-valuenow={complexityPercentage}
                aria-valuemin={0}
                aria-valuemax={100}
                aria-label={`Implementation complexity: ${implementationComplexity}`}
              ></div>
            </div>
          </div>

          {/* Personnel requirements - Compact */}
          <div className="p-sm bg-neutral-light/5 dark:bg-neutral-dark/10 rounded-md border border-neutral-light/20 dark:border-neutral-dark/20">
            <div className="flex justify-between items-center mb-xs">
              <span className="text-caption font-medium">Personnel</span>
              <span className="text-body-lg font-bold text-info-dark dark:text-info-light">
                {fteRequirements.total} FTE
              </span>
            </div>
            <div className="flex justify-between text-caption">
              <span className="text-neutral-dark/70 dark:text-neutral-light/70">
                Impl: {fteRequirements.implementation} | Maint: {fteRequirements.maintenance}
              </span>
            </div>
          </div>
        </div>

        {/* Component breakdown - Horizontal cards */}
        <div className="mb-md">
          <h3 className="text-body-lg font-medium mb-sm">Cost by Component</h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-sm">
            {/* Confidentiality */}
            <div className="p-sm bg-primary-light/10 dark:bg-primary-dark/20 rounded-md border border-primary-light/30 dark:border-primary-dark/30">
              <div className="flex items-center justify-between mb-xs">
                <span className="text-caption font-medium text-primary-dark dark:text-primary-light">🔒 Confidentiality</span>
                <SecurityLevelBadge
                  category=""
                  level={confidentialityLevel}
                  colorClass="text-xs"
                  textClass="text-primary-dark dark:text-primary-light"
                  testId={COST_ESTIMATION_WIDGET_IDS.label('conf-level')}
                />
              </div>
              <div className="text-subheading font-bold text-primary-dark dark:text-primary-light mb-xs">
                {formatCurrency(confidentialityCost.capex + confidentialityCost.opex)}
              </div>
              <div className="flex justify-between text-caption text-primary-dark/70 dark:text-primary-light/70">
                <span>{formatCurrency(confidentialityCost.capex)}</span>
                <span>{formatCurrency(confidentialityCost.opex)}</span>
              </div>
            </div>

            {/* Integrity */}
            <div className="p-sm bg-success-light/10 dark:bg-success-dark/20 rounded-md border border-success-light/30 dark:border-success-dark/30">
              <div className="flex items-center justify-between mb-xs">
                <span className="text-caption font-medium text-success-dark dark:text-success-light">✓ Integrity</span>
                <SecurityLevelBadge
                  category=""
                  level={integrityLevel}
                  colorClass="text-xs"
                  textClass="text-success-dark dark:text-success-light"
                  testId={COST_ESTIMATION_WIDGET_IDS.label('int-level')}
                />
              </div>
              <div className="text-subheading font-bold text-success-dark dark:text-success-light mb-xs">
                {formatCurrency(integrityCost.capex + integrityCost.opex)}
              </div>
              <div className="flex justify-between text-caption text-success-dark/70 dark:text-success-light/70">
                <span>{formatCurrency(integrityCost.capex)}</span>
                <span>{formatCurrency(integrityCost.opex)}</span>
              </div>
            </div>

            {/* Availability */}
            <div className="p-sm bg-info-light/10 dark:bg-info-dark/20 rounded-md border border-info-light/30 dark:border-info-dark/30">
              <div className="flex items-center justify-between mb-xs">
                <span className="text-caption font-medium text-info-dark dark:text-info-light">⏱️ Availability</span>
                <SecurityLevelBadge
                  category=""
                  level={availabilityLevel}
                  colorClass="text-xs"
                  textClass="text-info-dark dark:text-info-light"
                  testId={COST_ESTIMATION_WIDGET_IDS.label('avail-level')}
                />
              </div>
              <div className="text-subheading font-bold text-info-dark dark:text-info-light mb-xs">
                {formatCurrency(availabilityCost.capex + availabilityCost.opex)}
              </div>
              <div className="flex justify-between text-caption text-info-dark/70 dark:text-info-light/70">
                <span>{formatCurrency(availabilityCost.capex)}</span>
                <span>{formatCurrency(availabilityCost.opex)}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Expertise required - Compact grid */}
        <div className="p-sm bg-info-light/5 dark:bg-info-dark/10 rounded-md border border-info-light/20 dark:border-info-dark/20">
          <h3 className="text-body-lg font-medium mb-sm flex items-center">
            <span className="mr-xs">💡</span>Expertise Required
          </h3>
          <div className="grid grid-cols-2 gap-x-md gap-y-xs text-caption text-neutral-dark dark:text-neutral-light">
            {expertiseRequired.map((expertise: string, index: number) => (
              <div key={`expertise-${index}`} className="flex items-start">
                <span className="text-info-dark dark:text-info-light mr-xs">•</span>
                <span>{expertise}</span>
              </div>
            ))}
          </div>
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
