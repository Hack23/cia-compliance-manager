import React, { useMemo } from "react";
import { WIDGET_ICONS, WIDGET_TITLES } from "../../../constants/appConstants";
import { useCIAContentService } from "../../../hooks/useCIAContentService";
import { CIAComponent, SecurityLevel } from "../../../types/cia";
import { CostEstimationWidgetProps } from "../../../types/widgets";
import { calculateTotalSecurityCost } from "../../../utils/costCalculationUtils";
import { formatCurrency } from "../../../utils/formatUtils";
import { getImplementationComplexity } from "../../../utils/riskUtils";
import { getSecurityLevelValue } from "../../../utils/securityLevelUtils";
import { isArray, isNullish, isString } from "../../../utils/typeGuards";
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
      <div className="p-4">
        {/* Introduction */}
        <div className="mb-4 p-3 bg-blue-50 dark:bg-blue-900 dark:bg-opacity-20 rounded-lg">
          <p className="text-sm">
            This widget provides cost estimates for implementing and maintaining
            security controls based on your selected security levels across the
            CIA triad.
          </p>
        </div>

        {/* Summary cost section - using direct JSX instead of InfoCard */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
          <div className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
            <div className="flex items-center mb-2">
              <span className="mr-2 text-blue-500">💼</span>
              <div className="text-sm text-gray-600 dark:text-gray-400">
                Implementation Cost
              </div>
            </div>
            <div className="text-xl sm:text-2xl font-bold text-blue-600 dark:text-blue-400">
              {formatCurrency(totalCapex)}
            </div>
            <div className="text-xs text-gray-500 dark:text-gray-500">
              One-time capital expenditure
            </div>
          </div>

          <div className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
            <div className="flex items-center mb-2">
              <span className="mr-2 text-green-500">🔄</span>
              <div className="text-sm text-gray-600 dark:text-gray-400">
                Annual Operations
              </div>
            </div>
            <div className="text-xl sm:text-2xl font-bold text-green-600 dark:text-green-400">
              {formatCurrency(totalOpex)}
            </div>
            <div className="text-xs text-gray-500 dark:text-gray-500">
              Yearly operational expenses
            </div>
          </div>

          <div className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
            <div className="flex items-center mb-2">
              <span className="mr-2 text-purple-500">💲</span>
              <div className="text-sm text-gray-600 dark:text-gray-400">
                Total First Year Cost
              </div>
            </div>
            <div className="text-xl sm:text-2xl font-bold text-purple-600 dark:text-purple-400">
              {formatCurrency(totalCost)}
            </div>
            <div className="text-xs text-gray-500 dark:text-gray-500">
              Implementation + first year operations
            </div>
          </div>
        </div>

        {/* CAPEX vs OPEX ratio visualization */}
        <div className="mb-6">
          <h3 className="text-lg font-medium mb-3">Cost Breakdown</h3>
          <div className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
            <div className="flex justify-between items-center mb-1">
              <div className="text-sm font-medium">CAPEX</div>
              <div className="text-sm font-medium">OPEX</div>
            </div>
            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3 mb-2">
              <div
                className="h-3 bg-blue-500 rounded-l-full"
                style={{ width: `${costRatio.capex}%` }}
              ></div>
            </div>
            <div className="flex justify-between text-xs text-gray-600 dark:text-gray-400">
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
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-6">
          {/* Implementation complexity */}
          <div className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
            <h4 className="text-md font-medium mb-3">
              Implementation Complexity
            </h4>
            <div className="mb-3">
              <div className="text-lg font-bold text-purple-600 dark:text-purple-400">
                {implementationComplexity}
              </div>
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5 mt-2">
                <div
                  className="h-2.5 bg-purple-500 dark:bg-purple-600 rounded-full"
                  style={{ width: `${complexityPercentage}%` }}
                ></div>
              </div>
            </div>
            <div className="text-xs text-gray-500 dark:text-gray-500">
              Based on combined complexity across CIA components
            </div>
          </div>

          {/* Personnel requirements */}
          <div className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
            <h4 className="text-md font-medium mb-3">Personnel Requirements</h4>
            <div className="grid grid-cols-1 gap-3">
              <div className="flex justify-between items-center">
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  Implementation Team
                </div>
                <div className="text-lg font-bold text-blue-600 dark:text-blue-400">
                  {fteRequirements.implementation} FTE
                </div>
              </div>
              <div className="flex justify-between items-center">
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  Ongoing Maintenance
                </div>
                <div className="text-lg font-bold text-green-600 dark:text-green-400">
                  {fteRequirements.maintenance} FTE
                </div>
              </div>
              <div className="flex justify-between items-center pt-2 mt-2 border-t border-gray-200 dark:border-gray-700">
                <div className="text-sm font-medium text-gray-600 dark:text-gray-400">
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
        <div className="mb-6">
          <h3 className="text-lg font-medium mb-3">
            Cost by Security Component
          </h3>
          <div className="grid grid-cols-1 gap-3">
            {/* Using SecurityLevelBadge component for consistency with other widgets */}
            <div className="p-3 bg-purple-50 dark:bg-purple-900 dark:bg-opacity-20 rounded-lg">
              <div className="flex justify-between items-center mb-2">
                <div className="font-medium text-purple-800 dark:text-purple-300 flex items-center">
                  <span className="mr-2">🔒</span>Confidentiality
                </div>
                <SecurityLevelBadge
                  category=""
                  level={confidentialityLevel}
                  colorClass="bg-purple-100 dark:bg-purple-900 dark:bg-opacity-20"
                  textClass="text-purple-800 dark:text-purple-300"
                  testId={`${testId}-conf-level`}
                />
              </div>
              <div className="flex justify-between items-center">
                <div className="text-md font-bold text-purple-600 dark:text-purple-400">
                  {formatCurrency(
                    confidentialityCost.capex + confidentialityCost.opex
                  )}
                </div>
                <div className="text-sm bg-purple-100 dark:bg-purple-900 dark:bg-opacity-30 px-2 py-1 rounded">
                  {costBreakdown.confidentiality}% of total
                </div>
              </div>
              <div className="text-xs mt-2 text-gray-600 dark:text-gray-400 flex justify-between">
                <span>CAPEX: {formatCurrency(confidentialityCost.capex)}</span>
                <span>OPEX: {formatCurrency(confidentialityCost.opex)}</span>
              </div>
            </div>

            <div className="p-3 bg-green-50 dark:bg-green-900 dark:bg-opacity-20 rounded-lg">
              <div className="flex justify-between items-center mb-2">
                <div className="font-medium text-green-800 dark:text-green-300 flex items-center">
                  <span className="mr-2">✓</span>Integrity
                </div>
                <SecurityLevelBadge
                  category=""
                  level={integrityLevel}
                  colorClass="bg-green-100 dark:bg-green-900 dark:bg-opacity-20"
                  textClass="text-green-800 dark:text-green-300"
                  testId={`${testId}-int-level`}
                />
              </div>
              <div className="flex justify-between items-center">
                <div className="text-md font-bold text-green-600 dark:text-green-400">
                  {formatCurrency(integrityCost.capex + integrityCost.opex)}
                </div>
                <div className="text-sm bg-green-100 dark:bg-green-900 dark:bg-opacity-30 px-2 py-1 rounded">
                  {costBreakdown.integrity}% of total
                </div>
              </div>
              <div className="text-xs mt-2 text-gray-600 dark:text-gray-400 flex justify-between">
                <span>CAPEX: {formatCurrency(integrityCost.capex)}</span>
                <span>OPEX: {formatCurrency(integrityCost.opex)}</span>
              </div>
            </div>

            <div className="p-3 bg-blue-50 dark:bg-blue-900 dark:bg-opacity-20 rounded-lg">
              <div className="flex justify-between items-center mb-2">
                <div className="font-medium text-blue-800 dark:text-blue-300 flex items-center">
                  <span className="mr-2">⏱️</span>Availability
                </div>
                <SecurityLevelBadge
                  category=""
                  level={availabilityLevel}
                  colorClass="bg-blue-100 dark:bg-blue-900 dark:bg-opacity-20"
                  textClass="text-blue-800 dark:text-blue-300"
                  testId={`${testId}-avail-level`}
                />
              </div>
              <div className="flex justify-between items-center">
                <div className="text-md font-bold text-blue-600 dark:text-blue-400">
                  {formatCurrency(
                    availabilityCost.capex + availabilityCost.opex
                  )}
                </div>
                <div className="text-sm bg-blue-100 dark:bg-blue-900 dark:bg-opacity-30 px-2 py-1 rounded">
                  {costBreakdown.availability}% of total
                </div>
              </div>
              <div className="text-xs mt-2 text-gray-600 dark:text-gray-400 flex justify-between">
                <span>CAPEX: {formatCurrency(availabilityCost.capex)}</span>
                <span>OPEX: {formatCurrency(availabilityCost.opex)}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Expertise required */}
        <div className="mb-6">
          <h3 className="text-lg font-medium mb-3">Expertise Required</h3>
          <div className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
              {expertiseRequired.map((expertise: string, index: number) => (
                <li
                  key={`expertise-${index}`}
                  className="flex items-center text-sm"
                >
                  <span className="mr-2 text-blue-500">•</span>
                  <span>{expertise}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Cost notes */}
        <div className="p-3 bg-yellow-50 dark:bg-yellow-900 dark:bg-opacity-20 rounded-lg">
          <h4 className="text-md font-medium mb-2 flex items-center">
            <span className="mr-2">💡</span>Cost Notes
          </h4>
          <ul className="list-disc list-inside space-y-1 text-sm text-gray-600 dark:text-gray-400 pl-2">
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
