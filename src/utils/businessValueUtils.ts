import roiEstimatesData from "../data/security/roiEstimatesData";
import { SecurityLevel } from "../types/cia";
import { ROIEstimate } from "../types/cia-services";
import {
  calculateImplementationCost as calculateImplCost,
  Industry,
  OrganizationSize,
} from "./costCalculationUtils";
import {
  calculateOverallSecurityLevel,
  getSecurityLevelValue,
} from "./securityLevelUtils";

/**
 * Interface for representing implementation timeline
 */
export interface ImplementationTimeline {
  total: string;
  phases?: Array<{
    name: string;
    duration: string;
  }>;
}

/**
 * Calculates ROI estimate based on security levels
 * @param availabilityLevel - Availability security level
 * @param integrityLevel - Integrity security level
 * @param confidentialityLevel - Confidentiality security level
 * @returns ROI estimate object with value and description
 */
export function calculateROIEstimate(
  availabilityLevel: SecurityLevel,
  integrityLevel: SecurityLevel,
  confidentialityLevel: SecurityLevel
): ROIEstimate {
  // Calculate overall security level for consistent ROI estimation
  const securityLevel = calculateOverallSecurityLevel(
    availabilityLevel,
    integrityLevel,
    confidentialityLevel
  );

  // Convert security level to ROI key format (e.g., "Very High" -> "VERY_HIGH")
  const roiKey = securityLevel
    .toUpperCase()
    .replace(" ", "_") as keyof typeof roiEstimatesData;

  // Return the ROI estimate from the existing data
  return roiEstimatesData[roiKey] || roiEstimatesData.MODERATE;
}

/**
 * Calculates implementation timeline based on security levels
 * @param availabilityLevel - Availability security level
 * @param integrityLevel - Integrity security level
 * @param confidentialityLevel - Confidentiality security level
 * @returns Implementation timeline object
 */
export function calculateImplementationTimeline(
  availabilityLevel: SecurityLevel,
  integrityLevel: SecurityLevel,
  confidentialityLevel: SecurityLevel
): ImplementationTimeline {
  // Get security level values
  const availabilityValue = getSecurityLevelValue(availabilityLevel);
  const integrityValue = getSecurityLevelValue(integrityLevel);
  const confidentialityValue = getSecurityLevelValue(confidentialityLevel);

  // Calculate total weeks based on security levels
  const totalWeeks = Math.round(
    (availabilityValue + integrityValue + confidentialityValue) * 1.5
  );

  // Calculate phases based on total time
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
        name: "Testing & Adoption",
        duration: `${Math.round(totalWeeks * 0.2)} weeks`,
      },
    ],
  };
}

/**
 * @deprecated Use calculateTotalSecurityCost from costCalculationUtils.ts instead
 * Estimates implementation cost based on security levels
 * @param availabilityLevel - Availability security level
 * @param integrityLevel - Integrity security level
 * @param confidentialityLevel - Confidentiality security level
 * @param orgSize - Optional organization size
 * @param industry - Optional industry
 * @returns Estimated implementation cost
 */
export function calculateImplementationCost(
  availabilityLevel: SecurityLevel,
  integrityLevel: SecurityLevel,
  confidentialityLevel: SecurityLevel,
  orgSize: OrganizationSize = "medium",
  industry: Industry = "general"
): number {
  // Redirect to the canonical implementation in costCalculationUtils
  const availCost = calculateImplCost(availabilityLevel, orgSize, industry);
  const integCost = calculateImplCost(integrityLevel, orgSize, industry);
  const confCost = calculateImplCost(confidentialityLevel, orgSize, industry);

  // Return total CAPEX as implementation cost
  return availCost.capex + integCost.capex + confCost.capex;
}

/**
 * @deprecated Use calculateTotalSecurityCost from costCalculationUtils.ts instead
 * Estimates operational cost based on security levels
 * @param availabilityLevel - Availability security level
 * @param integrityLevel - Integrity security level
 * @param confidentialityLevel - Confidentiality security level
 * @param orgSize - Optional organization size
 * @param industry - Optional industry
 * @returns Estimated annual operational cost
 */
export function calculateOperationalCost(
  availabilityLevel: SecurityLevel,
  integrityLevel: SecurityLevel,
  confidentialityLevel: SecurityLevel,
  orgSize: OrganizationSize = "medium",
  industry: Industry = "general"
): number {
  // Redirect to the canonical implementation in costCalculationUtils
  const availCost = calculateImplCost(availabilityLevel, orgSize, industry);
  const integCost = calculateImplCost(integrityLevel, orgSize, industry);
  const confCost = calculateImplCost(confidentialityLevel, orgSize, industry);

  // Return total OPEX as operational cost
  return availCost.opex + integCost.opex + confCost.opex;
}
