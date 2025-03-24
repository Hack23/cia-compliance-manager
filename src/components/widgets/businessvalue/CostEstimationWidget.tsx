import React, { useMemo } from "react";
import { WIDGET_ICONS, WIDGET_TITLES } from "../../../constants/appConstants";
import { COST_ESTIMATION_TEST_IDS } from "../../../constants/testIds";
import { useCIAContentService } from "../../../hooks/useCIAContentService";
import { SecurityLevel } from "../../../types/cia";
import { getSecurityLevelValue } from "../../../utils/securityLevelUtils";
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
  const { ciaContentService, error, isLoading } = useCIAContentService();

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
  const implementationCost = useMemo((): ImplementationCost | null => {
    if (!ciaContentService) return null;

    try {
      // Check if method exists by checking its type before calling
      // Use type assertion with 'any' only inside the condition
      if (
        typeof (ciaContentService as any).calculateImplementationCost ===
        "function"
      ) {
        return (ciaContentService as any).calculateImplementationCost(
          availabilityLevel,
          integrityLevel,
          confidentialityLevel
        );
      }

      // Fallback calculation
      const total =
        (availabilityValue + integrityValue + confidentialityValue) * 25000;
      return {
        total,
        personnel: `${
          (availabilityValue + integrityValue + confidentialityValue) * 0.5
        } FTE`,
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
      return null;
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

  // Calculate annual operational cost
  const operationalCost = useMemo((): OperationalCost | null => {
    if (!ciaContentService) return null;

    try {
      // Check if method exists by checking its type before calling
      if (
        typeof (ciaContentService as any).calculateOperationalCost ===
        "function"
      ) {
        return (ciaContentService as any).calculateOperationalCost(
          availabilityLevel,
          integrityLevel,
          confidentialityLevel
        );
      }

      // Fallback calculation
      return {
        annual:
          (availabilityValue + integrityValue + confidentialityValue) * 10000,
      };
    } catch (err) {
      console.error("Error calculating operational cost:", err);
      return null;
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

  // Get component costs
  const getComponentCost = (
    component: "availability" | "integrity" | "confidentiality",
    level: SecurityLevel
  ): ComponentCost => {
    if (!ciaContentService) {
      // Default component cost
      return {
        implementation: formatCurrency(getSecurityLevelValue(level) * 25000),
        operational: `${formatCurrency(
          getSecurityLevelValue(level) * 10000
        )} / year`,
        personnel: `${getSecurityLevelValue(level) * 0.5} FTE`,
      };
    }

    try {
      // Check if method exists by checking its type before calling
      if (typeof (ciaContentService as any).getComponentCost === "function") {
        const cost = (ciaContentService as any).getComponentCost(
          component,
          level
        );
        if (cost) return cost;
      }

      // If method doesn't exist or returns null, use the fallback
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
  const implementationTimeline = useMemo((): ImplementationTimeline | null => {
    if (!ciaContentService) return null;

    try {
      // Check if method exists by checking its type before calling
      if (
        typeof (ciaContentService as any).getImplementationTimeline ===
        "function"
      ) {
        return (ciaContentService as any).getImplementationTimeline(
          availabilityLevel,
          integrityLevel,
          confidentialityLevel
        );
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
      return null;
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

  // Calculate totals as fallbacks
  const totalImplementationCost =
    implementationCost?.total ||
    (availabilityValue + integrityValue + confidentialityValue) * 25000;

  const totalOperationalCost =
    operationalCost?.annual ||
    (availabilityValue + integrityValue + confidentialityValue) * 10000;

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
      error={error}
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
              data-testid={
                COST_ESTIMATION_TEST_IDS?.IMPLEMENTATION_COST ||
                "implementation-cost"
              }
            >
              <div className="text-sm font-medium mb-1">
                Implementation Cost
              </div>
              <div className="text-xl font-bold text-blue-600 dark:text-blue-400">
                {formatCurrency(
                  implementationCost?.total || totalImplementationCost
                )}
              </div>
              <div className="text-xs text-gray-600 dark:text-gray-400">
                One-time cost
              </div>
            </div>

            <div
              className="p-3 bg-gray-50 dark:bg-gray-800 rounded-lg"
              data-testid={
                COST_ESTIMATION_TEST_IDS?.OPERATIONAL_COST || "operational-cost"
              }
            >
              <div className="text-sm font-medium mb-1">Operational Cost</div>
              <div className="text-xl font-bold text-green-600 dark:text-green-400">
                {formatCurrency(
                  operationalCost?.annual || totalOperationalCost
                )}
              </div>
              <div className="text-xs text-gray-600 dark:text-gray-400">
                Annual cost
              </div>
            </div>

            <div
              className="p-3 bg-gray-50 dark:bg-gray-800 rounded-lg"
              data-testid={
                COST_ESTIMATION_TEST_IDS?.PERSONNEL_COST || "personnel-cost"
              }
            >
              <div className="text-sm font-medium mb-1">Personnel Needs</div>
              <div className="text-xl font-bold text-purple-600 dark:text-purple-400">
                {implementationCost?.personnel ||
                  `${
                    (availabilityValue +
                      integrityValue +
                      confidentialityValue) *
                    0.5
                  } FTE`}
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
            {/* Availability Costs */}
            <div
              className="p-3 bg-blue-50 dark:bg-blue-900 dark:bg-opacity-20 rounded-lg"
              data-testid={
                COST_ESTIMATION_TEST_IDS?.AVAILABILITY_COST ||
                "availability-cost"
              }
            >
              <h4 className="text-md font-medium flex items-center text-blue-700 dark:text-blue-300">
                <span className="mr-2">⏱️</span>
                Availability Costs ({availabilityLevel})
              </h4>
              <div className="mt-2 grid grid-cols-1 md:grid-cols-3 gap-3 text-sm">
                <div>
                  <div className="font-medium">Implementation</div>
                  <div>
                    {availabilityCost?.implementation ||
                      formatCurrency(availabilityValue * 25000)}
                  </div>
                </div>
                <div>
                  <div className="font-medium">Operational</div>
                  <div>
                    {availabilityCost?.operational ||
                      `${formatCurrency(availabilityValue * 10000)} / year`}
                  </div>
                </div>
                <div>
                  <div className="font-medium">Personnel</div>
                  <div>
                    {availabilityCost?.personnel ||
                      `${availabilityValue * 0.5} FTE`}
                  </div>
                </div>
              </div>
            </div>

            {/* Integrity Costs */}
            <div
              className="p-3 bg-green-50 dark:bg-green-900 dark:bg-opacity-20 rounded-lg"
              data-testid={
                COST_ESTIMATION_TEST_IDS?.INTEGRITY_COST || "integrity-cost"
              }
            >
              <h4 className="text-md font-medium flex items-center text-green-700 dark:text-green-300">
                <span className="mr-2">✓</span>
                Integrity Costs ({integrityLevel})
              </h4>
              <div className="mt-2 grid grid-cols-1 md:grid-cols-3 gap-3 text-sm">
                <div>
                  <div className="font-medium">Implementation</div>
                  <div>
                    {integrityCost?.implementation ||
                      formatCurrency(integrityValue * 25000)}
                  </div>
                </div>
                <div>
                  <div className="font-medium">Operational</div>
                  <div>
                    {integrityCost?.operational ||
                      `${formatCurrency(integrityValue * 10000)} / year`}
                  </div>
                </div>
                <div>
                  <div className="font-medium">Personnel</div>
                  <div>
                    {integrityCost?.personnel || `${integrityValue * 0.5} FTE`}
                  </div>
                </div>
              </div>
            </div>

            {/* Confidentiality Costs */}
            <div
              className="p-3 bg-purple-50 dark:bg-purple-900 dark:bg-opacity-20 rounded-lg"
              data-testid={
                COST_ESTIMATION_TEST_IDS?.CONFIDENTIALITY_COST ||
                "confidentiality-cost"
              }
            >
              <h4 className="text-md font-medium flex items-center text-purple-700 dark:text-purple-300">
                <span className="mr-2">🔒</span>
                Confidentiality Costs ({confidentialityLevel})
              </h4>
              <div className="mt-2 grid grid-cols-1 md:grid-cols-3 gap-3 text-sm">
                <div>
                  <div className="font-medium">Implementation</div>
                  <div>
                    {confidentialityCost?.implementation ||
                      formatCurrency(confidentialityValue * 25000)}
                  </div>
                </div>
                <div>
                  <div className="font-medium">Operational</div>
                  <div>
                    {confidentialityCost?.operational ||
                      `${formatCurrency(confidentialityValue * 10000)} / year`}
                  </div>
                </div>
                <div>
                  <div className="font-medium">Personnel</div>
                  <div>
                    {confidentialityCost?.personnel ||
                      `${confidentialityValue * 0.5} FTE`}
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
            data-testid={
              COST_ESTIMATION_TEST_IDS?.IMPLEMENTATION_TIMELINE ||
              "implementation-timeline"
            }
          >
            <div className="flex justify-between items-center mb-3">
              <div className="font-medium">Estimated Timeline</div>
              <div className="text-blue-600 dark:text-blue-400 font-medium">
                {implementationTimeline?.total ||
                  `${Math.round(
                    (availabilityValue +
                      integrityValue +
                      confidentialityValue) *
                      1.5
                  )} weeks`}
              </div>
            </div>

            <div className="relative">
              <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                <div
                  className="h-full bg-blue-500 rounded-full"
                  style={{ width: "100%" }}
                ></div>
              </div>

              <div className="mt-2 grid grid-cols-3 text-xs text-gray-600 dark:text-gray-400">
                {implementationTimeline?.phases ? (
                  <>
                    {implementationTimeline.phases.map(
                      (phase: TimelinePhase, index: number) => (
                        <div key={index} className="text-center">
                          <div>{phase.name}</div>
                          <div>{phase.duration}</div>
                        </div>
                      )
                    )}
                  </>
                ) : (
                  <>
                    <div className="text-center">
                      <div>Planning</div>
                      <div>
                        {Math.round(
                          (availabilityValue +
                            integrityValue +
                            confidentialityValue) *
                            0.3
                        )}{" "}
                        weeks
                      </div>
                    </div>
                    <div className="text-center">
                      <div>Implementation</div>
                      <div>
                        {Math.round(
                          (availabilityValue +
                            integrityValue +
                            confidentialityValue) *
                            0.8
                        )}{" "}
                        weeks
                      </div>
                    </div>
                    <div className="text-center">
                      <div>Testing & Adoption</div>
                      <div>
                        {Math.round(
                          (availabilityValue +
                            integrityValue +
                            confidentialityValue) *
                            0.4
                        )}{" "}
                        weeks
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Cost Factors */}
        <div>
          <h3 className="text-lg font-medium mb-3">Cost Factors</h3>
          <ul className="space-y-2 text-sm">
            {implementationCost?.factors?.map(
              (
                factor: { name: string; description: string },
                index: number
              ) => (
                <li
                  key={index}
                  className="p-2 bg-gray-50 dark:bg-gray-800 rounded-lg"
                  data-testid={`cost-factor-${index}`}
                >
                  <div className="font-medium">{factor.name}</div>
                  <div className="text-gray-600 dark:text-gray-400">
                    {factor.description}
                  </div>
                </li>
              )
            ) || (
              <>
                <li className="p-2 bg-gray-50 dark:bg-gray-800 rounded-lg">
                  <div className="font-medium">Technology & Infrastructure</div>
                  <div className="text-gray-600 dark:text-gray-400">
                    Hardware, software licenses, cloud services, and specialized
                    tools required for implementation.
                  </div>
                </li>
                <li className="p-2 bg-gray-50 dark:bg-gray-800 rounded-lg">
                  <div className="font-medium">Personnel & Training</div>
                  <div className="text-gray-600 dark:text-gray-400">
                    Staff time for implementation, operation, and ongoing
                    training requirements.
                  </div>
                </li>
                <li className="p-2 bg-gray-50 dark:bg-gray-800 rounded-lg">
                  <div className="font-medium">Integration & Testing</div>
                  <div className="text-gray-600 dark:text-gray-400">
                    Costs associated with integrating security controls with
                    existing systems and testing.
                  </div>
                </li>
                <li className="p-2 bg-gray-50 dark:bg-gray-800 rounded-lg">
                  <div className="font-medium">Maintenance & Updates</div>
                  <div className="text-gray-600 dark:text-gray-400">
                    Ongoing operational costs for maintenance, updates, and
                    periodic reassessments.
                  </div>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </WidgetContainer>
  );
};

export default CostEstimationWidget;
