import React, { useEffect, useMemo, useState } from "react";
import { BUSINESS_IMPACT_TEST_IDS } from "../../constants/testIds";
import { useCIAOptions } from "../../hooks/useCIAOptions";
import { BusinessImpactService } from "../../services/businessImpactService";
import { SecurityLevel } from "../../types/cia";
import { CIAComponentType } from "../../types/cia-services";
import { getRiskBadgeVariant } from "../../utils";
import BusinessRiskDisplay from "../common/BusinessRiskDisplay";
import WidgetContainer from "../common/WidgetContainer";

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
    
  // Add local state to sync with props
  const [localAvailabilityLevel, setLocalAvailabilityLevel] = useState<SecurityLevel>(availabilityLevel);
  const [localIntegrityLevel, setLocalIntegrityLevel] = useState<SecurityLevel>(integrityLevel);
  const [localConfidentialityLevel, setLocalConfidentialityLevel] = useState<SecurityLevel>(confidentialityLevel);
  
  // Sync local state with props
  useEffect(() => {
    setLocalAvailabilityLevel(availabilityLevel);
  }, [availabilityLevel]);
  
  useEffect(() => {
    setLocalIntegrityLevel(integrityLevel);
  }, [integrityLevel]);
  
  useEffect(() => {
    setLocalConfidentialityLevel(confidentialityLevel);
  }, [confidentialityLevel]);
  
  // Debug logging
  useEffect(() => {
    console.log("BusinessImpactAnalysisWidget levels:", {
      props: { availabilityLevel, integrityLevel, confidentialityLevel },
      local: { localAvailabilityLevel, localIntegrityLevel, localConfidentialityLevel }
    });
  }, [
    availabilityLevel, integrityLevel, confidentialityLevel,
    localAvailabilityLevel, localIntegrityLevel, localConfidentialityLevel
  ]);

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

  // Get business impact details for each component - using local state values
  const availabilityImpact = useMemo(
    () =>
      businessImpactService.getBusinessImpact(
        "availability",
        localAvailabilityLevel  // Changed from availabilityLevel to localAvailabilityLevel
      ),
    [businessImpactService, localAvailabilityLevel]
  );

  const integrityImpact = useMemo(
    () => businessImpactService.getBusinessImpact("integrity", localIntegrityLevel),  // Using local state
    [businessImpactService, localIntegrityLevel]
  );

  const confidentialityImpact = useMemo(
    () =>
      businessImpactService.getBusinessImpact(
        "confidentiality",
        localConfidentialityLevel  // Using local state
      ),
    [businessImpactService, localConfidentialityLevel]
  );

  // Prepare impact data for each component for rendering - use local state
  const impactData = useMemo((): BusinessImpactData[] => {
    // Create data for availability component
    const availData: BusinessImpactData = {
      component: "availability",
      level: localAvailabilityLevel,  // Using local state
      value: availabilityOptions[localAvailabilityLevel]?.opex || 0,
      percentage: `${
        ((availabilityOptions[localAvailabilityLevel]?.opex || 0) * 100) / 40
      }%`,
      description: availabilityImpact.summary,
      capex: availabilityOptions[localAvailabilityLevel]?.capex || 0,
      opex: availabilityOptions[localAvailabilityLevel]?.opex || 0,
      // Add these properties from the impact details
      financialImpact: availabilityImpact.financial,
      operationalImpact: availabilityImpact.operational,
      uptime: availabilityOptions[localAvailabilityLevel]?.uptime,
      rto: availabilityOptions[localAvailabilityLevel]?.rto,
      rpo: availabilityOptions[localAvailabilityLevel]?.rpo,
      mttr: availabilityOptions[localAvailabilityLevel]?.mttr,
    };

    // Create data for integrity component
    const integrityData: BusinessImpactData = {
      component: "integrity",
      level: localIntegrityLevel,
      value: integrityOptions[localIntegrityLevel]?.opex || 0,
      percentage: `${
        ((integrityOptions[localIntegrityLevel]?.opex || 0) * 100) / 40
      }%`,
      description: integrityImpact.summary,
      capex: integrityOptions[localIntegrityLevel]?.capex || 0,
      opex: integrityOptions[localIntegrityLevel]?.opex || 0,
      // Add these properties from the impact details
      financialImpact: integrityImpact.financial,
      operationalImpact: integrityImpact.operational,
    };

    // Create data for confidentiality component
    const confidentialityData: BusinessImpactData = {
      component: "confidentiality",
      level: localConfidentialityLevel,
      value: confidentialityOptions[localConfidentialityLevel]?.opex || 0,
      percentage: `${
        ((confidentialityOptions[localConfidentialityLevel]?.opex || 0) * 100) / 40
      }%`,
      description: confidentialityImpact.summary,
      capex: confidentialityOptions[localConfidentialityLevel]?.capex || 0,
      opex: confidentialityOptions[localConfidentialityLevel]?.opex || 0,
      // Add these properties from the impact details
      financialImpact: confidentialityImpact.financial,
      operationalImpact: confidentialityImpact.operational,
    };

    return [availData, integrityData, confidentialityData];
  }, [
    localAvailabilityLevel,
    localIntegrityLevel,
    localConfidentialityLevel,
    availabilityOptions,
    integrityOptions,
    confidentialityOptions,
    availabilityImpact,
    integrityImpact,
    confidentialityImpact,
  ]);

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
              <BusinessRiskDisplay
                key={`operational-${impact.component}`}
                impactCategory={impact.component}
                riskLevel={impact.operationalImpact?.riskLevel || "Unknown"}
                description={impact.operationalImpact?.description || "No operational impact data available"}
                metric={impact.component === "availability" && impact.operationalImpact?.meanTimeToRecover ? {
                  label: "MTTR",
                  value: impact.operationalImpact.meanTimeToRecover
                } : undefined}
                testId={`${testId}-${impact.component}-operational`}
              />
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
              <BusinessRiskDisplay
                key={`financial-${impact.component}`}
                impactCategory={impact.component}
                riskLevel={impact.financialImpact?.riskLevel || "Unknown"}
                description={impact.financialImpact?.description || "No financial impact data available"}
                metric={impact.financialImpact?.annualRevenueLoss ? {
                  label: "Potential Loss",
                  value: impact.financialImpact.annualRevenueLoss
                } : undefined}
                testId={`${testId}-${impact.component}-financial`}
              />
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
): "error" | "warning" | "info" | "success" | "neutral" | "purple" {
  // Use the imported utility but ensure the return type matches what's expected
  const variant = getRiskBadgeVariant(riskLevel);
  
  // Make sure the returned variant is one of the expected values
  switch (variant) {
    case "error": return "error";
    case "warning": return "warning";
    case "info": return "info";
    case "success": return "success";
    case "purple": return "purple"; // Add support for purple
    default: return "neutral";
  }
}

export default BusinessImpactAnalysisWidget;
