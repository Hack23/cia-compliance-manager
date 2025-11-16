import { useMemo } from "react";
import { SecurityLevel } from "../types/cia";
import { ComplianceStatusType } from "../types/compliance";
import { calculateROIEstimate } from "../utils/businessValueUtils";
import { calculateTotalSecurityCost } from "../utils/costCalculationUtils";
import {
  calculateOverallSecurityLevel,
  getSecurityLevelDescription,
  getSecurityLevelValue,
} from "../utils/securityLevelUtils";
import {
  getStatusVariant,
  getRiskColorClass,
} from "../utils/statusUtils";
import { hasMethod, isNullish } from "../utils/typeGuards";

/**
 * Custom hook for SecuritySummaryWidget data calculations
 * Extracts all data transformation logic for better testability and reusability
 *
 * @param availabilityLevel - Selected availability security level
 * @param integrityLevel - Selected integrity security level  
 * @param confidentialityLevel - Selected confidentiality security level
 * @param ciaContentService - CIA content service instance
 * @param complianceService - Compliance service instance
 * @returns Computed security summary data and helper functions
 */
export function useSecuritySummaryData(
  availabilityLevel: SecurityLevel,
  integrityLevel: SecurityLevel,
  confidentialityLevel: SecurityLevel,
  ciaContentService: unknown,
  complianceService: unknown
) {
  // Calculate overall security level
  const overallSecurityLevel = useMemo(
    () =>
      calculateOverallSecurityLevel(
        availabilityLevel,
        integrityLevel,
        confidentialityLevel
      ),
    [availabilityLevel, integrityLevel, confidentialityLevel]
  );

  // Get security level description
  const securityLevelDescription = useMemo(
    () => getSecurityLevelDescription(overallSecurityLevel),
    [overallSecurityLevel]
  );

  // Calculate security score (0-100)
  const securityScore = useMemo(() => {
    const availabilityValue = getSecurityLevelValue(availabilityLevel);
    const integrityValue = getSecurityLevelValue(integrityLevel);
    const confidentialityValue = getSecurityLevelValue(confidentialityLevel);

    const totalValue =
      availabilityValue + integrityValue + confidentialityValue;
    const maxPossibleValue = 12; // 3 components x maximum value of 4
    return Math.round((totalValue / maxPossibleValue) * 100);
  }, [availabilityLevel, integrityLevel, confidentialityLevel]);

  // Calculate risk level based on security score
  const riskLevel = useMemo(() => {
    if (securityScore >= 80) return "Low Risk";
    if (securityScore >= 60) return "Medium Risk";
    if (securityScore >= 40) return "High Risk";
    return "Critical Risk";
  }, [securityScore]);

  // Get security classification
  const securityClassification = useMemo(() => {
    if (!isNullish(ciaContentService)) {
      try {
        if (hasMethod(ciaContentService, "getSecurityClassification")) {
          const classification =
            ciaContentService.getSecurityClassification(overallSecurityLevel);
          if (!isNullish(classification)) return classification;
        }
      } catch (err) {
        console.error("Error fetching security classification:", err);
      }
    }

    // Fallback classification
    switch (overallSecurityLevel) {
      case "None":
        return "Minimal Security";
      case "Low":
        return "Basic Security";
      case "Moderate":
        return "Standard Security";
      case "High":
        return "Enhanced Security";
      case "Very High":
        return "Maximum Security";
      default:
        return "Unknown Security Level";
    }
  }, [ciaContentService, overallSecurityLevel]);

  // Get data classification
  const dataClassification = useMemo(() => {
    if (
      !isNullish(ciaContentService) &&
      hasMethod(ciaContentService, "getInformationSensitivity")
    ) {
      try {
        const sensitivity = (ciaContentService as any).getInformationSensitivity(
          confidentialityLevel
        );
        if (!isNullish(sensitivity)) return sensitivity;
      } catch (err) {
        console.error("Error fetching information sensitivity:", err);
      }
    }

    // Fallback classification
    switch (confidentialityLevel) {
      case "None":
        return "Public Data";
      case "Low":
        return "Internal Data";
      case "Moderate":
        return "Confidential Data";
      case "High":
        return "Restricted Data";
      case "Very High":
        return "Classified Data";
      default:
        return "Unclassified Data";
    }
  }, [ciaContentService, confidentialityLevel]);

  // Get implementation complexity
  const implementationComplexity = useMemo(() => {
    if (
      !isNullish(ciaContentService) &&
      hasMethod(ciaContentService, "getImplementationComplexity")
    ) {
      try {
        const complexity = ciaContentService.getImplementationComplexity(
          availabilityLevel,
          integrityLevel,
          confidentialityLevel
        );
        if (!isNullish(complexity)) return complexity;
      } catch (err) {
        console.error("Error fetching implementation complexity:", err);
      }
    }

    // Fallback calculation
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

    if (totalValue <= 3) return "Low";
    if (totalValue <= 6) return "Moderate";
    if (totalValue <= 9) return "High";
    return "Very High";
  }, [
    ciaContentService,
    availabilityLevel,
    integrityLevel,
    confidentialityLevel,
  ]);

  // Get compliance status
  const complianceStatus = useMemo((): ComplianceStatusType | null => {
    try {
      if (isNullish(complianceService)) return null;

      const status = (complianceService as any).getComplianceStatus?.(
        availabilityLevel,
        integrityLevel,
        confidentialityLevel
      );

      // Ensure we have proper arrays
      if (status) {
        return {
          ...status,
          compliantFrameworks: status.compliantFrameworks || [],
          partiallyCompliantFrameworks:
            status.partiallyCompliantFrameworks || [],
          nonCompliantFrameworks: status.nonCompliantFrameworks || [],
        };
      }

      return null;
    } catch (err) {
      console.error("Error fetching compliance status:", err);
      return null;
    }
  }, [
    complianceService,
    availabilityLevel,
    integrityLevel,
    confidentialityLevel,
  ]);

  // Calculate business maturity level based on security score
  const businessMaturityLevel = useMemo(() => {
    if (securityScore >= 80) return "Strategic";
    if (securityScore >= 60) return "Advanced";
    if (securityScore >= 40) return "Standard";
    return "Basic";
  }, [securityScore]);

  // Get business maturity description
  const businessMaturityDescription = useMemo(() => {
    switch (businessMaturityLevel) {
      case "Strategic":
        return "Enables competitive advantage and innovation";
      case "Advanced":
        return "Supports business growth and trusted partnerships";
      case "Standard":
        return "Maintains core business operations securely";
      case "Basic":
        return "Enables fundamental business activities";
      default:
        return "Unknown business maturity level";
    }
  }, [businessMaturityLevel]);

  // Get cost details using standardized cost calculation utility
  const costDetails = useMemo(() => {
    return calculateTotalSecurityCost(
      availabilityLevel,
      integrityLevel,
      confidentialityLevel,
      "medium",
      "general"
    );
  }, [availabilityLevel, integrityLevel, confidentialityLevel]);

  // Compute implementation time
  const implementationTime = useMemo(() => {
    try {
      if (
        !isNullish(ciaContentService) &&
        hasMethod(ciaContentService, "getTotalImplementationTime")
      ) {
        const time = ciaContentService.getTotalImplementationTime(
          availabilityLevel,
          integrityLevel,
          confidentialityLevel
        );
        if (!isNullish(time)) return time;
      }
    } catch (err) {
      console.error("Error fetching implementation time:", err);
    }

    // Fallback based on security score
    if (securityScore >= 80) return "3-6 months";
    if (securityScore >= 60) return "2-4 months";
    if (securityScore >= 40) return "1-2 months";
    return "2-4 weeks";
  }, [ciaContentService, securityScore, availabilityLevel, integrityLevel, confidentialityLevel]);

  // Compute resource requirements
  const requiredResources = useMemo(() => {
    try {
      if (
        !isNullish(ciaContentService) &&
        hasMethod(ciaContentService, "getRequiredExpertise")
      ) {
        const resources = ciaContentService.getRequiredExpertise(
          availabilityLevel,
          integrityLevel,
          confidentialityLevel
        );
        if (!isNullish(resources)) return resources;
      }
    } catch (err) {
      console.error("Error fetching resource requirements:", err);
    }

    // Fallback based on security score
    if (securityScore >= 80) return "Specialized Team";
    if (securityScore >= 60) return "Dedicated Team";
    if (securityScore >= 40) return "Small Team";
    return "Individual Effort";
  }, [ciaContentService, securityScore, availabilityLevel, integrityLevel, confidentialityLevel]);

  // Compute ROI estimate
  const roiEstimate = useMemo(() => {
    try {
      const estimate = calculateROIEstimate(
        availabilityLevel,
        integrityLevel,
        confidentialityLevel
      );
      return estimate.value ?? "N/A";
    } catch (err) {
      console.error("Error calculating ROI estimate:", err);
      return "N/A";
    }
  }, [availabilityLevel, integrityLevel, confidentialityLevel]);

  return {
    overallSecurityLevel,
    securityLevelDescription,
    securityScore,
    riskLevel,
    securityClassification,
    dataClassification,
    implementationComplexity,
    complianceStatus,
    businessMaturityLevel,
    businessMaturityDescription,
    costDetails,
    implementationTime,
    requiredResources,
    roiEstimate,
    getStatusVariant,
    getRiskColorClass,
  };
}
