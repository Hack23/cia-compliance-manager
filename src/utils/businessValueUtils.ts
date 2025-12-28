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
 * 
 * @param availabilityLevel - Availability security level
 * @param integrityLevel - Integrity security level
 * @param confidentialityLevel - Confidentiality security level
 * @returns ROI estimate object with value and description
 * 
 * @example
 * ```typescript
 * // Calculate ROI for high security configuration
 * const roi = calculateROIEstimate('High', 'High', 'Moderate');
 * console.log(`ROI: ${roi.value}, ${roi.description}`);
 * // Output: ROI: 150-250%, Significant risk reduction
 * 
 * // Calculate ROI for moderate security
 * const moderateROI = calculateROIEstimate('Moderate', 'Moderate', 'Low');
 * console.log(moderateROI.value); // "100-150%"
 * ```
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
