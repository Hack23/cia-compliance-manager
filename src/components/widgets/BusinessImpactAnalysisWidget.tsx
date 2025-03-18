import React, { useMemo } from "react";
import { BUSINESS_IMPACT_TEST_IDS } from "../../constants/testIds";
import { useCIAOptions } from "../../hooks/useCIAOptions";
import { BusinessImpactService } from "../../services/businessImpactService";
import { SecurityLevel } from "../../types/cia";
import { CIAComponentType } from "../../types/cia-services";
import StatusBadge from "../common/StatusBadge";
import WidgetContainer from "../common/WidgetContainer"; // Add this import

/**
 * Interface for business impact data
 */
interface BusinessImpactData {
  component: CIAComponentType;
  level: SecurityLevel;
  value: number;
  percentage: string;
  description: string;
  capex: number;
  opex: number;
  // Add missing properties that are used in the component
  financialImpact?: {
    description: string;
    riskLevel: string;
    annualRevenueLoss?: string;
  };
  operationalImpact?: {
    description: string;
    riskLevel: string;
    meanTimeToRecover?: string;
  };
  uptime?: string;
  rto?: string;
  rpo?: string;
  mttr?: string;
}

/**
 * Interface for component props
 */
interface BusinessImpactAnalysisWidgetProps {
  availabilityLevel: SecurityLevel;
  integrityLevel: SecurityLevel;
  confidentialityLevel: SecurityLevel;
  securityLevel?: SecurityLevel;
  testId?: string;
}

/**
 * Business Impact Analysis Widget Component
 *
 * Displays an analysis of business impacts across the CIA triad components,
 * including financial, operational, and reputational impacts, with metrics
 * for each component.
 *
 * ## Business Perspective
 *
 * This widget translates technical security levels into business outcomes,
 * helping stakeholders understand the operational and financial implications
 * of their security choices across availability, integrity, and confidentiality. 💼
 *
 * @param props - Component props
 * @returns React component
 */
const BusinessImpactAnalysisWidget: React.FC<
  BusinessImpactAnalysisWidgetProps
> = ({
  availabilityLevel,
  integrityLevel,
  confidentialityLevel,
  testId = BUSINESS_IMPACT_TEST_IDS.BUSINESS_IMPACT_WIDGET,
}) => {
  const { availabilityOptions, integrityOptions, confidentialityOptions } =
    useCIAOptions();

  const businessImpactService = useMemo(() => {
    return new BusinessImpactService({
      availabilityOptions,
      integrityOptions,
      confidentialityOptions,
      roiEstimates: {
        NONE: { returnRate: "0%", description: "No return" },
        LOW: { returnRate: "50%", description: "Low return" },
        MODERATE: { returnRate: "150%", description: "Moderate return" },
        HIGH: { returnRate: "300%", description: "High return" },
        VERY_HIGH: { returnRate: "500%", description: "Maximum return" },
      },
    });
  }, [availabilityOptions, integrityOptions, confidentialityOptions]);

  // Get business impact details for each component
  const availabilityImpact = useMemo(
    () =>
      businessImpactService.getBusinessImpact(
        "availability",
        availabilityLevel
      ),
    [businessImpactService, availabilityLevel]
  );

  const integrityImpact = useMemo(
    () => businessImpactService.getBusinessImpact("integrity", integrityLevel),
    [businessImpactService, integrityLevel]
  );

  const confidentialityImpact = useMemo(
    () =>
      businessImpactService.getBusinessImpact(
        "confidentiality",
        confidentialityLevel
      ),
    [businessImpactService, confidentialityLevel]
  );

  // Prepare impact data for each component for rendering
  const impactData = useMemo((): BusinessImpactData[] => {
    // Create data for availability component
    const availData: BusinessImpactData = {
      component: "availability",
      level: availabilityLevel,
      value: availabilityOptions[availabilityLevel]?.opex || 0,
      percentage: `${
        ((availabilityOptions[availabilityLevel]?.opex || 0) * 100) / 40
      }%`,
      description: availabilityImpact.summary,
      capex: availabilityOptions[availabilityLevel]?.capex || 0,
      opex: availabilityOptions[availabilityLevel]?.opex || 0,
      // Add these properties from the impact details
      financialImpact: availabilityImpact.financial,
      operationalImpact: availabilityImpact.operational,
      uptime: availabilityOptions[availabilityLevel]?.uptime,
      rto: availabilityOptions[availabilityLevel]?.rto,
      rpo: availabilityOptions[availabilityLevel]?.rpo,
      mttr: availabilityOptions[availabilityLevel]?.mttr,
    };

    // Create data for integrity component
    const integrityData: BusinessImpactData = {
      component: "integrity",
      level: integrityLevel,
      value: integrityOptions[integrityLevel]?.opex || 0,
      percentage: `${
        ((integrityOptions[integrityLevel]?.opex || 0) * 100) / 40
      }%`,
      description: integrityImpact.summary,
      capex: integrityOptions[integrityLevel]?.capex || 0,
      opex: integrityOptions[integrityLevel]?.opex || 0,
      // Add these properties from the impact details
      financialImpact: integrityImpact.financial,
      operationalImpact: integrityImpact.operational,
    };

    // Create data for confidentiality component
    const confidentialityData: BusinessImpactData = {
      component: "confidentiality",
      level: confidentialityLevel,
      value: confidentialityOptions[confidentialityLevel]?.opex || 0,
      percentage: `${
        ((confidentialityOptions[confidentialityLevel]?.opex || 0) * 100) / 40
      }%`,
      description: confidentialityImpact.summary,
      capex: confidentialityOptions[confidentialityLevel]?.capex || 0,
      opex: confidentialityOptions[confidentialityLevel]?.opex || 0,
      // Add these properties from the impact details
      financialImpact: confidentialityImpact.financial,
      operationalImpact: confidentialityImpact.operational,
    };

    return [availData, integrityData, confidentialityData];
  }, [
    availabilityLevel,
    integrityLevel,
    confidentialityLevel,
    availabilityOptions,
    integrityOptions,
    confidentialityOptions,
    availabilityImpact,
    integrityImpact,
    confidentialityImpact,
  ]);

  // Convert risk level to badge variant
  const getRiskBadgeVariant = (riskLevel: string | undefined): "success" | "warning" | "error" | "info" | "neutral" => {
    if (!riskLevel) return "neutral";
    
    const level = riskLevel.toLowerCase();
    
    if (level.includes("critical")) return "error";
    if (level.includes("high")) return "warning";
    if (level.includes("medium") || level.includes("moderate")) return "info";
    if (level.includes("low")) return "success";
    if (level.includes("minimal")) return "success";
    
    return "neutral";
  };

  return (
    <WidgetContainer title="Business Impact Analysis" testId={testId}>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Operational Impact Section */}
        <div
          className="bg-white dark:bg-gray-800 p-4 rounded shadow"
          data-testid={BUSINESS_IMPACT_TEST_IDS.OPERATIONAL_IMPACT_SECTION}
        >
          <h3 className="text-lg font-semibold mb-4">Operational Impact</h3>
          <div className="space-y-4">
            {impactData.map((impact) => (
              <div
                key={`operational-${impact.component}`}
                className="border-l-4 border-blue-500 pl-3"
                data-testid={BUSINESS_IMPACT_TEST_IDS.IMPACT_CATEGORY}
              >
                <h4 className="text-md font-medium capitalize">
                  {impact.component}: {impact.level}
                </h4>
                <p
                  className="text-sm text-gray-600 dark:text-gray-400 mb-2"
                  data-testid={BUSINESS_IMPACT_TEST_IDS.IMPACT_DESCRIPTION}
                >
                  {impact.operationalImpact?.description ||
                    "No operational impact data available"}
                </p>
                {impact.component === "availability" && (
                  <div className="grid grid-cols-2 gap-2 mt-2">
                    {impact.uptime && (
                      <div>
                        <span className="text-xs font-semibold">Uptime:</span>
                        <p className="text-sm">{impact.uptime}</p>
                      </div>
                    )}
                    {impact.operationalImpact?.meanTimeToRecover && (
                      <div>
                        <span className="text-xs font-semibold">MTTR:</span>
                        <p className="text-sm">
                          {impact.operationalImpact.meanTimeToRecover}
                        </p>
                      </div>
                    )}
                  </div>
                )}
                <div className="mt-2">
                  <span className="text-xs font-semibold">Risk Level:</span>
                  <StatusBadge
                    status={getRiskBadgeVariant(impact.operationalImpact?.riskLevel)}
                    testId={BUSINESS_IMPACT_TEST_IDS.RISK_LEVEL}
                  >
                    {impact.operationalImpact?.riskLevel || "Unknown"}
                  </StatusBadge>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Financial Impact Section */}
        <div
          className="bg-white dark:bg-gray-800 p-4 rounded shadow"
          data-testid={BUSINESS_IMPACT_TEST_IDS.FINANCIAL_IMPACT_SECTION}
        >
          <h3 className="text-lg font-semibold mb-4">Financial Impact</h3>
          <div className="space-y-4">
            {impactData.map((impact) => (
              <div
                key={`financial-${impact.component}`}
                className="border-l-4 border-green-500 pl-3"
                data-testid={BUSINESS_IMPACT_TEST_IDS.IMPACT_CATEGORY}
              >
                <h4 className="text-md font-medium capitalize">
                  {impact.component}: {impact.level}
                </h4>
                <p
                  className="text-sm text-gray-600 dark:text-gray-400 mb-2"
                  data-testid={BUSINESS_IMPACT_TEST_IDS.IMPACT_DESCRIPTION}
                >
                  {impact.financialImpact?.description ||
                    "No financial impact data available"}
                </p>
                {impact.financialImpact?.annualRevenueLoss && (
                  <div className="mt-2">
                    <span className="text-xs font-semibold">
                      Potential Loss:
                    </span>
                    <p className="text-sm">
                      {impact.financialImpact.annualRevenueLoss}
                    </p>
                  </div>
                )}
                <div className="mt-2">
                  <span className="text-xs font-semibold">Risk Level:</span>
                  <StatusBadge
                    status={getRiskBadgeVariant(impact.financialImpact?.riskLevel)}
                    testId={BUSINESS_IMPACT_TEST_IDS.RISK_LEVEL}
                  >
                    {impact.financialImpact?.riskLevel || "Unknown"}
                  </StatusBadge>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Availability Metrics Section */}
        <div
          className="bg-white dark:bg-gray-800 p-4 rounded shadow"
          data-testid={BUSINESS_IMPACT_TEST_IDS.REPUTATIONAL_IMPACT_SECTION}
        >
          <h3 className="text-lg font-semibold mb-4">Availability Metrics</h3>
          <div className="space-y-4">
            <div
              className="border-l-4 border-purple-500 pl-3"
              data-testid={BUSINESS_IMPACT_TEST_IDS.IMPACT_CATEGORY}
            >
              <h4 className="text-md font-medium">Uptime Target</h4>
              {impactData[0].uptime && (
                <div className="p-2 bg-blue-50 dark:bg-blue-900 dark:bg-opacity-20 rounded mt-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">Uptime:</span>
                    <span className="text-sm">{impactData[0].uptime}</span>
                  </div>
                </div>
              )}

              <h4 className="text-md font-medium mt-4">Recovery Objectives</h4>
              {impactData[0].rto && (
                <div className="p-2 bg-green-50 dark:bg-green-900 dark:bg-opacity-20 rounded mt-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">RTO:</span>
                    <span className="text-sm">{impactData[0].rto}</span>
                  </div>
                </div>
              )}

              {impactData[0].rpo && (
                <div className="p-2 bg-yellow-50 dark:bg-yellow-900 dark:bg-opacity-20 rounded mt-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">RPO:</span>
                    <span className="text-sm">{impactData[0].rpo}</span>
                  </div>
                </div>
              )}

              {impactData[0].mttr && (
                <div className="p-2 bg-orange-50 dark:bg-orange-900 dark:bg-opacity-20 rounded mt-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">MTTR:</span>
                    <span className="text-sm">{impactData[0].mttr}</span>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </WidgetContainer>
  );
};

/**
 * Helper function to get the appropriate badge variant for a risk level
 * 
 * @param riskLevel - The risk level string
 * @returns The badge variant for UI styling
 */
function getRiskVariant(
  riskLevel: string | undefined
): "error" | "warning" | "info" | "success" | "neutral" {
  if (!riskLevel) return "neutral";

  const level = riskLevel.toLowerCase();

  if (level.includes("critical")) return "error";
  if (level.includes("high")) return "warning";
  if (level.includes("medium") || level.includes("moderate")) return "info";
  if (level.includes("low")) return "success";
  if (level.includes("minimal")) return "success";

  return "neutral";
}

export default BusinessImpactAnalysisWidget;
