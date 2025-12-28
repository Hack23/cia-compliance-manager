import { SecurityLevel } from "../types/cia";

/**
 * Gets compliance requirement text for a security component and level
 *
 * @param component - The CIA component (confidentiality, integrity, availability)
 * @param level - The security level
 * @returns Human-readable compliance requirement description
 * 
 * @example
 * ```typescript
 * // Get compliance text for confidentiality
 * const confText = getComplianceRequirementText('confidentiality', 'High');
 * console.log(confText); // "Meets stringent compliance standards"
 * 
 * // Check availability compliance
 * const availText = getComplianceRequirementText('availability', 'Moderate');
 * console.log(availText); // "Satisfies most compliance needs"
 * 
 * // Display in compliance report
 * const components = ['confidentiality', 'integrity', 'availability'] as const;
 * components.forEach(comp => {
 *   const requirement = getComplianceRequirementText(comp, 'High');
 *   console.log(`${comp}: ${requirement}`);
 * });
 * ```
 */
export function getComplianceRequirementText(
  component: "confidentiality" | "integrity" | "availability",
  level: SecurityLevel
): string {
  if (level === "None") {
    return `Not sufficient for most compliance frameworks`;
  }
  if (level === "Low") {
    return component === "availability"
      ? "Meets basic availability requirements"
      : "Meets basic compliance requirements";
  }
  if (level === "Moderate") {
    return component === "availability"
      ? "Satisfies most compliance needs"
      : component === "integrity"
      ? "Satisfies standard compliance expectations"
      : "Satisfies most regulatory requirements";
  }
  if (level === "High") {
    return component === "availability"
      ? "Meets high availability standards"
      : component === "integrity"
      ? "Meets advanced compliance standards"
      : "Meets stringent compliance standards";
  }
  // Very High
  return component === "availability"
    ? "Exceeds enterprise requirements"
    : component === "integrity"
    ? "Exceeds regulatory requirements"
    : "Exceeds most compliance requirements";
}
