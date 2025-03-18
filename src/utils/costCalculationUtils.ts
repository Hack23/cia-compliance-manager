import { useCIAOptions } from "../hooks/useCIAOptions";
import { SecurityLevel } from "../types/cia";

/**
 * Calculates the total implementation cost based on security levels
 *
 * ## Business Perspective
 *
 * This utility function provides critical financial insights for organizations
 * implementing security controls. It helps decision-makers understand the total
 * cost implications of different security level choices across the CIA triad. 💰
 *
 * @param availabilityLevel - Selected availability security level
 * @param integrityLevel - Selected integrity security level
 * @param confidentialityLevel - Selected confidentiality security level
 * @returns Total cost (capex + opex) across all three components
 */
export function calculateTotalCost(
  availabilityLevel: SecurityLevel,
  integrityLevel: SecurityLevel,
  confidentialityLevel: SecurityLevel
): number {
  const { availabilityOptions, integrityOptions, confidentialityOptions } =
    useCIAOptions();

  // Get the details for each selected level
  const availabilityDetails = availabilityOptions[availabilityLevel];
  const integrityDetails = integrityOptions[integrityLevel];
  const confidentialityDetails = confidentialityOptions[confidentialityLevel];

  // Calculate total capex
  const totalCapex =
    (availabilityDetails?.capex || 0) +
    (integrityDetails?.capex || 0) +
    (confidentialityDetails?.capex || 0);

  // Calculate total opex
  const totalOpex =
    (availabilityDetails?.opex || 0) +
    (integrityDetails?.opex || 0) +
    (confidentialityDetails?.opex || 0);

  // Return the sum of capex and opex
  return totalCapex + totalOpex;
}

/**
 * Calculates the cost breakdown for a component
 *
 * @param level - Selected security level
 * @param component - CIA component type (availability, integrity, confidentiality)
 * @returns Object with capex and opex values
 */
export function getComponentCost(
  level: SecurityLevel,
  component: "availability" | "integrity" | "confidentiality"
): { capex: number; opex: number } {
  const { availabilityOptions, integrityOptions, confidentialityOptions } =
    useCIAOptions();

  let details;
  switch (component) {
    case "availability":
      details = availabilityOptions[level];
      break;
    case "integrity":
      details = integrityOptions[level];
      break;
    case "confidentiality":
      details = confidentialityOptions[level];
      break;
  }

  return {
    capex: details?.capex || 0,
    opex: details?.opex || 0,
  };
}
