import React, { useMemo } from "react";
import { WIDGET_ICONS, WIDGET_TITLES } from "../../../constants/appConstants";
import { TEST_IDS } from "../../../constants/testIds";
import { useCIAContentService } from "../../../hooks/useCIAContentService";
import { useCIAOptions } from "../../../hooks/useCIAOptions";
import { SecurityLevel } from "../../../types/cia";
import { getSecurityLevelValue } from "../../../utils/securityLevelUtils";
import { isNullish } from "../../../utils/typeGuards";
import WidgetContainer from "../../common/WidgetContainer";

/**
 * Props for CostEstimationWidget component
 */
interface CostEstimationWidgetProps {
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
  // Get CIA content service
  const {
    ciaContentService,
    error: serviceError,
    isLoading,
  } = useCIAContentService();

  // Get CIA options for cost data
  const { availabilityOptions, integrityOptions, confidentialityOptions } =
    useCIAOptions();

  // Get security level values
  const availabilityValue = getSecurityLevelValue(availabilityLevel);
  const integrityValue = getSecurityLevelValue(integrityLevel);
  const confidentialityValue = getSecurityLevelValue(confidentialityLevel);

  // Define necessary interfaces for fallback implementations
  interface ImplementationCost {
    total: number;
    personnel: string;
    factors?: Array<{ name: string; description: string }>;
  }

  interface OperationalCost {
    annual: number;
  }

  interface ComponentCost {
    implementation: string;
    operational: string;
    personnel: string;
  }

  interface TimelinePhase {
    name: string;
    duration: string;
  }

  interface ImplementationTimeline {
    total: string;
    phases?: TimelinePhase[];
  }

  // Calculate total implementation cost
  const implementationCost = useMemo((): ImplementationCost => {
    try {
      if (!isNullish(ciaContentService)) {
        // Check if method exists by checking its type before calling
        if (
          typeof (ciaContentService as any).calculateImplementationCost ===
          "function"
        ) {
          const result = (ciaContentService as any).calculateImplementationCost(
            availabilityLevel,
            integrityLevel,
            confidentialityLevel
          );

          if (!isNullish(result)) {
            return result;
          }
        }
      }

      // Fallback calculation using options if available
      let total = 0;
      if (
        !isNullish(availabilityOptions) &&
        !isNullish(availabilityOptions[availabilityLevel]) &&
        !isNullish(availabilityOptions[availabilityLevel].capex)
      ) {
        total += availabilityOptions[availabilityLevel].capex;
      } else {
        total += availabilityValue * 25000;
      }

      if (
        !isNullish(integrityOptions) &&
        !isNullish(integrityOptions[integrityLevel]) &&
        !isNullish(integrityOptions[integrityLevel].capex)
      ) {
        total += integrityOptions[integrityLevel].capex;
      } else {
        total += integrityValue * 25000;
      }

      if (
        !isNullish(confidentialityOptions) &&
        !isNullish(confidentialityOptions[confidentialityLevel]) &&
        !isNullish(confidentialityOptions[confidentialityLevel].capex)
      ) {
        total += confidentialityOptions[confidentialityLevel].capex;
      } else {
        total += confidentialityValue * 25000;
      }

      // Simple personnel calculation
      const fte =
        (availabilityValue + integrityValue + confidentialityValue) * 0.5;

      return {
        total,
        personnel: `${fte.toFixed(1)} FTE`,
        factors: [
          {
            name: "Technology & Infrastructure",
            description:
              "Hardware, software licenses, cloud services, and specialized tools.",
          },
          {
            name: "Personnel & Training",
            description:
              "Staff time for implementation, operation, and ongoing training.",
          },
          {
            name: "Integration & Testing",
            description:
              "Costs for integrating controls with existing systems and testing.",
          },
          {
            name: "Maintenance & Updates",
            description:
              "Ongoing operational costs for maintenance and updates.",
          },
        ],
      };
    } catch (err) {
      console.error("Error calculating implementation cost:", err);
      // Return default values with an appropriate personnel amount
      return {
        total:
          (availabilityValue + integrityValue + confidentialityValue) * 25000,
        personnel: `${(
          (availabilityValue + integrityValue + confidentialityValue) *
          0.5
        ).toFixed(1)} FTE`,
        factors: [
          {
            name: "Technology & Infrastructure",
            description: "Hardware, software, cloud services, and tools.",
          },
          {
            name: "Personnel & Training",
            description: "Staff time and training costs.",
          },
          {
            name: "Integration & Testing",
            description: "Integration and testing costs.",
          },
          {
            name: "Maintenance & Updates",
            description: "Ongoing maintenance costs.",
          },
        ],
      };
    }
  }, [
    ciaContentService,
    availabilityLevel,
    integrityLevel,
    confidentialityLevel,
    availabilityValue,
    integrityValue,
    confidentialityValue,
    availabilityOptions,
    integrityOptions,
    confidentialityOptions,
  ]);

  // Calculate annual operational cost
  const operationalCost = useMemo((): OperationalCost => {
    try {
      if (!isNullish(ciaContentService)) {
        // Check if method exists by checking its type before calling
        if (
          typeof (ciaContentService as any).calculateOperationalCost ===
          "function"
        ) {
          const result = (ciaContentService as any).calculateOperationalCost(
            availabilityLevel,
            integrityLevel,
            confidentialityLevel
          );

          if (!isNullish(result)) {
            return result;
          }
        }
      }

      // Fallback calculation using options if available
      let annual = 0;
      if (
        !isNullish(availabilityOptions) &&
        !isNullish(availabilityOptions[availabilityLevel]) &&
        !isNullish(availabilityOptions[availabilityLevel].opex)
      ) {
        annual += availabilityOptions[availabilityLevel].opex;
      } else {
        annual += availabilityValue * 10000;
      }

      if (
        !isNullish(integrityOptions) &&
        !isNullish(integrityOptions[integrityLevel]) &&
        !isNullish(integrityOptions[integrityLevel].opex)
      ) {
        annual += integrityOptions[integrityLevel].opex;
      } else {
        annual += integrityValue * 10000;
      }

      if (
        !isNullish(confidentialityOptions) &&
        !isNullish(confidentialityOptions[confidentialityLevel]) &&
        !isNullish(confidentialityOptions[confidentialityLevel].opex)
      ) {
        annual += confidentialityOptions[confidentialityLevel].opex;
      } else {
        annual += confidentialityValue * 10000;
      }

      return { annual };
    } catch (err) {
      console.error("Error calculating operational cost:", err);
      return {
        annual:
          (availabilityValue + integrityValue + confidentialityValue) * 10000,
      };
    }
  }, [
    ciaContentService,
    availabilityLevel,
    integrityLevel,
    confidentialityLevel,
    availabilityValue,
    integrityValue,
    confidentialityValue,
    availabilityOptions,
    integrityOptions,
    confidentialityOptions,
  ]);

  // Get component costs
  const getComponentCost = (
    component: "availability" | "integrity" | "confidentiality",
    level: SecurityLevel
  ): ComponentCost => {
    try {
      if (!isNullish(ciaContentService)) {
        // Check if method exists by checking its type before calling
        if (typeof (ciaContentService as any).getComponentCost === "function") {
          const cost = (ciaContentService as any).getComponentCost(
            component,
            level
          );
          if (!isNullish(cost)) return cost;
        }
      }

      // Use options if available
      const options =
        component === "availability"
          ? availabilityOptions
          : component === "integrity"
          ? integrityOptions
          : confidentialityOptions;

      if (!isNullish(options) && !isNullish(options[level])) {
        const capex =
          options[level].capex || getSecurityLevelValue(level) * 25000;
        const opex =
          options[level].opex || getSecurityLevelValue(level) * 10000;
        const fte = getSecurityLevelValue(level) * 0.5;

        return {
          implementation: formatCurrency(capex),
          operational: `${formatCurrency(opex)} / year`,
          personnel: `${fte.toFixed(1)} FTE`,
        };
      }

      // If service doesn't exist or returns null, use the fallback
      return {
        implementation: formatCurrency(getSecurityLevelValue(level) * 25000),
        operational: `${formatCurrency(
          getSecurityLevelValue(level) * 10000
        )} / year`,
        personnel: `${getSecurityLevelValue(level) * 0.5} FTE`,
      };
    } catch (err) {
      console.error(`Error getting ${component} cost:`, err);
      return {
        implementation: formatCurrency(getSecurityLevelValue(level) * 25000),
        operational: `${formatCurrency(
          getSecurityLevelValue(level) * 10000
        )} / year`,
        personnel: `${getSecurityLevelValue(level) * 0.5} FTE`,
      };
    }
  };

  // Get implementation timeline
  const implementationTimeline = useMemo((): ImplementationTimeline => {
    try {
      if (!isNullish(ciaContentService)) {
        // Check if method exists by checking its type before calling
        if (
          typeof (ciaContentService as any).getImplementationTimeline ===
          "function"
        ) {
          const result = (ciaContentService as any).getImplementationTimeline(
            availabilityLevel,
            integrityLevel,
            confidentialityLevel
          );

          if (!isNullish(result)) {
            return result;
          }
        }
      }

      // Fallback calculation
      const totalWeeks = Math.round(
        (availabilityValue + integrityValue + confidentialityValue) * 1.5
      );

      return {
        total: `${totalWeeks} weeks`,
        phases: [
          {
            name: "Planning",
            duration: `${Math.round(
              (availabilityValue + integrityValue + confidentialityValue) * 0.3
            )} weeks`,
          },
          {
            name: "Implementation",
            duration: `${Math.round(
              (availabilityValue + integrityValue + confidentialityValue) * 0.8
            )} weeks`,
          },
          {
            name: "Testing & Adoption",
            duration: `${Math.round(
              (availabilityValue + integrityValue + confidentialityValue) * 0.4
            )} weeks`,
          },
        ],
      };
    } catch (err) {
      console.error("Error getting implementation timeline:", err);
      const totalWeeks = Math.round(
        (availabilityValue + integrityValue + confidentialityValue) * 1.5
      );

      return {
        total: `${totalWeeks} weeks`,
        phases: [
          {
            name: "Planning",
            duration: `${Math.round(totalWeeks * 0.3)} weeks`,
          },
          {
            name: "Implementation",
            duration: `${Math.round(totalWeeks * 0.5)} weeks`,
          },
          {
            name: "Testing",
            duration: `${Math.round(totalWeeks * 0.2)} weeks`,
          },
        ],
      };
    }
  }, [
    ciaContentService,
    availabilityLevel,
    integrityLevel,
    confidentialityLevel,
    availabilityValue,
    integrityValue,
    confidentialityValue,
  ]);

  // Format currency for display
  const formatCurrency = (
    amount: number | string | null | undefined
  ): string => {
    if (amount == null) return "$0";

    if (typeof amount === "string") {
      if (amount.startsWith("$")) return amount;
      return `$${amount}`;
    }

    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      maximumFractionDigits: 0,
    }).format(amount);
  };

  // Calculate totals
  const totalImplementationCost = implementationCost.total;
  const totalOperationalCost = operationalCost.annual;

  // Get component costs
  const availabilityCost = getComponentCost("availability", availabilityLevel);
  const integrityCost = getComponentCost("integrity", integrityLevel);
  const confidentialityCost = getComponentCost(
    "confidentiality",
    confidentialityLevel
  );

  return (
    <WidgetContainer
      title={WIDGET_TITLES.COST_ESTIMATION || "Security Cost Estimation"}
      icon={WIDGET_ICONS.COST_ESTIMATION || "💰"}
      className={className}
      testId={testId}
      isLoading={isLoading}
      error={serviceError}
    >
      <div className="p-4">
        {/* Cost estimation summary */}
        <div className="mb-4 p-3 bg-blue-50 dark:bg-blue-900 dark:bg-opacity-20 rounded-lg">
          <p className="text-sm">
            This widget provides estimated costs for implementing and
            maintaining your selected security levels across the CIA triad,
            helping with budget planning for security initiatives.
          </p>
        </div>

        {/* Cost Summary */}
        <div className="mb-6">
          <h3 className="text-lg font-medium mb-3">Cost Summary</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div
              className="p-3 bg-gray-50 dark:bg-gray-800 rounded-lg"
              data-testid={TEST_IDS.costEstimation.implementationCost}
            >
              <div className="text-sm font-medium mb-1">
                Implementation Cost
              </div>
              <div className="text-xl font-bold text-blue-600 dark:text-blue-400">
                {formatCurrency(totalImplementationCost)}
              </div>
              <div className="text-xs text-gray-600 dark:text-gray-400">
                One-time cost
              </div>
            </div>

            <div
              className="p-3 bg-gray-50 dark:bg-gray-800 rounded-lg"
              data-testid={TEST_IDS.costEstimation.operationalCost}
            >
              <div className="text-sm font-medium mb-1">Operational Cost</div>
              <div className="text-xl font-bold text-green-600 dark:text-green-400">
                {formatCurrency(totalOperationalCost)}
              </div>
              <div className="text-xs text-gray-600 dark:text-gray-400">
                Annual cost
              </div>
            </div>

            <div
              className="p-3 bg-gray-50 dark:bg-gray-800 rounded-lg"
              data-testid={TEST_IDS.costEstimation.personnelCost}
            >
              <div className="text-sm font-medium mb-1">Personnel Needs</div>
              <div className="text-xl font-bold text-purple-600 dark:text-purple-400">
                {implementationCost.personnel}
              </div>
              <div className="text-xs text-gray-600 dark:text-gray-400">
                Full-time equivalents
              </div>
            </div>
          </div>
        </div>

        {/* Component Cost Breakdown */}
        <div className="mb-6">
          <h3 className="text-lg font-medium mb-3">Component Cost Breakdown</h3>
          <div className="space-y-4">
            {/* Confidentiality Costs */}
            <div
              className="p-3 bg-purple-50 dark:bg-purple-900 dark:bg-opacity-20 rounded-lg"
              data-testid={TEST_IDS.costEstimation.confidentialityCost}
            >
              <h4 className="text-md font-medium flex items-center text-purple-700 dark:text-purple-300">
                <span className="mr-2">🔒</span>
                Confidentiality Costs ({confidentialityLevel})
              </h4>
              <div className="mt-2 grid grid-cols-1 md:grid-cols-3 gap-3 text-sm">
                <div className="p-2 bg-white dark:bg-gray-800 rounded">
                  <div className="font-medium mb-1">Implementation</div>
                  <div className="text-purple-600 dark:text-purple-400">
                    {confidentialityCost.implementation}
                  </div>
                </div>
                <div className="p-2 bg-white dark:bg-gray-800 rounded">
                  <div className="font-medium mb-1">Operational</div>
                  <div className="text-purple-600 dark:text-purple-400">
                    {confidentialityCost.operational}
                  </div>
                </div>
                <div className="p-2 bg-white dark:bg-gray-800 rounded">
                  <div className="font-medium mb-1">Personnel</div>
                  <div className="text-purple-600 dark:text-purple-400">
                    {confidentialityCost.personnel}
                  </div>
                </div>
              </div>
            </div>

            {/* Integrity Costs */}
            <div
              className="p-3 bg-green-50 dark:bg-green-900 dark:bg-opacity-20 rounded-lg"
              data-testid={TEST_IDS.costEstimation.integrityCost}
            >
              <h4 className="text-md font-medium flex items-center text-green-700 dark:text-green-300">
                <span className="mr-2">✓</span>
                Integrity Costs ({integrityLevel})
              </h4>
              <div className="mt-2 grid grid-cols-1 md:grid-cols-3 gap-3 text-sm">
                <div className="p-2 bg-white dark:bg-gray-800 rounded">
                  <div className="font-medium mb-1">Implementation</div>
                  <div className="text-green-600 dark:text-green-400">
                    {integrityCost.implementation}
                  </div>
                </div>
                <div className="p-2 bg-white dark:bg-gray-800 rounded">
                  <div className="font-medium mb-1">Operational</div>
                  <div className="text-green-600 dark:text-green-400">
                    {integrityCost.operational}
                  </div>
                </div>
                <div className="p-2 bg-white dark:bg-gray-800 rounded">
                  <div className="font-medium mb-1">Personnel</div>
                  <div className="text-green-600 dark:text-green-400">
                    {integrityCost.personnel}
                  </div>
                </div>
              </div>
            </div>

            {/* Availability Costs */}
            <div
              className="p-3 bg-blue-50 dark:bg-blue-900 dark:bg-opacity-20 rounded-lg"
              data-testid={TEST_IDS.costEstimation.availabilityCost}
            >
              <h4 className="text-md font-medium flex items-center text-blue-700 dark:text-blue-300">
                <span className="mr-2">⏱️</span>
                Availability Costs ({availabilityLevel})
              </h4>
              <div className="mt-2 grid grid-cols-1 md:grid-cols-3 gap-3 text-sm">
                <div className="p-2 bg-white dark:bg-gray-800 rounded">
                  <div className="font-medium mb-1">Implementation</div>
                  <div className="text-blue-600 dark:text-blue-400">
                    {availabilityCost.implementation}
                  </div>
                </div>
                <div className="p-2 bg-white dark:bg-gray-800 rounded">
                  <div className="font-medium mb-1">Operational</div>
                  <div className="text-blue-600 dark:text-blue-400">
                    {availabilityCost.operational}
                  </div>
                </div>
                <div className="p-2 bg-white dark:bg-gray-800 rounded">
                  <div className="font-medium mb-1">Personnel</div>
                  <div className="text-blue-600 dark:text-blue-400">
                    {availabilityCost.personnel}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Implementation Timeline */}
        <div className="mb-6">
          <h3 className="text-lg font-medium mb-3">Implementation Timeline</h3>
          <div
            className="p-3 bg-gray-50 dark:bg-gray-800 rounded-lg"
            data-testid={TEST_IDS.costEstimation.implementationTimeline}
          >
            <div className="flex justify-between items-center mb-3">
              <h4 className="font-medium">Estimated Duration</h4>
              <span className="text-blue-600 dark:text-blue-400 font-bold">
                {implementationTimeline.total}
              </span>
            </div>

            <div className="relative">
              {/* Timeline visualization */}
              <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded mb-4">
                <div
                  className="h-2 bg-blue-500 dark:bg-blue-600 rounded"
                  style={{ width: "100%" }}
                ></div>
              </div>

              {/* Timeline phases */}
              {implementationTimeline.phases && (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                  {implementationTimeline.phases.map((phase, index) => (
                    <div
                      key={index}
                      className="p-2 bg-blue-50 dark:bg-blue-900 dark:bg-opacity-20 rounded"
                    >
                      <div className="text-xs font-medium mb-1">
                        {phase.name}
                      </div>
                      <div className="text-sm font-bold">{phase.duration}</div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Cost Factors */}
        <div>
          <h3 className="text-lg font-medium mb-3">Cost Factors</h3>
          <ul className="space-y-2 text-sm">
            {implementationCost.factors?.map(
              (
                factor: { name: string; description: string },
                index: number
              ) => (
                <li
                  key={index}
                  className="p-2 bg-gray-50 dark:bg-gray-800 rounded flex"
                >
                  <span className="mr-2 text-blue-500">•</span>
                  <div>
                    <div className="font-medium">{factor.name}</div>
                    <div className="text-gray-600 dark:text-gray-400">
                      {factor.description}
                    </div>
                  </div>
                </li>
              )
            ) || (
              <li className="p-2 bg-gray-50 dark:bg-gray-800 rounded">
                No cost factors available
              </li>
            )}
          </ul>
        </div>
      </div>
    </WidgetContainer>
  );
};

export default CostEstimationWidget;
