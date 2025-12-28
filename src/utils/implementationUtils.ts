import { SecurityLevel } from "../types/cia";

/**
 * Implementation planning and guidance utilities for security controls
 * 
 * Provides human-readable implementation descriptions, validation levels,
 * and uptime targets for different security levels across CIA components.
 * Helps stakeholders understand practical implementation requirements.
 * 
 * @example
 * ```typescript
 * import { 
 *   getImplementationDescription,
 *   getIntegrityValidationLevel,
 *   getAvailabilityUptimeTarget
 * } from './implementationUtils';
 * 
 * // Get implementation guidance
 * const desc = getImplementationDescription('confidentiality', 'High');
 * // 'Comprehensive encryption and access controls'
 * 
 * // Get validation level
 * const validation = getIntegrityValidationLevel('High');
 * // 'Strongly Validated'
 * 
 * // Get uptime target
 * const uptime = getAvailabilityUptimeTarget('Very High');
 * // '99.99%'
 * ```
 */

/**
 * Gets implementation description for a CIA component at a specific security level
 * 
 * Provides actionable implementation guidance tailored to each security level
 * and CIA component. Helps teams understand what controls to implement.
 *
 * @param component - The CIA component (confidentiality, integrity, availability)
 * @param level - The security level
 * @returns Human-readable implementation description
 * 
 * @example
 * ```typescript
 * // Confidentiality implementations
 * getImplementationDescription('confidentiality', 'None')
 * // 'No data protection controls needed'
 * 
 * getImplementationDescription('confidentiality', 'High')
 * // 'Comprehensive encryption and access controls'
 * 
 * // Integrity implementations
 * getImplementationDescription('integrity', 'Moderate')
 * // 'Data validation and cryptographic checksums'
 * 
 * // Availability implementations
 * getImplementationDescription('availability', 'Very High')
 * // 'Multi-site redundancy and continuous availability'
 * 
 * // Usage in widget display
 * const description = getImplementationDescription(component, selectedLevel);
 * <ImplementationGuide description={description} />
 * ```
 */
export function getImplementationDescription(
  component: "confidentiality" | "integrity" | "availability",
  level: SecurityLevel
): string {
  if (component === "confidentiality") {
    switch (level) {
      case "None":
        return "No data protection controls needed";
      case "Low":
        return "Basic access controls and authentication";
      case "Moderate":
        return "Role-based access and encryption for sensitive data";
      case "High":
        return "Comprehensive encryption and access controls";
      case "Very High":
        return "Maximum protection with advanced encryption and zero-trust";
      default:
        return "Standard data protection controls";
    }
  }

  if (component === "integrity") {
    switch (level) {
      case "None":
        return "No data validation controls needed";
      case "Low":
        return "Basic input validation and error checking";
      case "Moderate":
        return "Data validation and cryptographic checksums";
      case "High":
        return "Digital signatures and strong validation";
      case "Very High":
        return "Formal verification and immutable audit trails";
      default:
        return "Standard data integrity controls";
    }
  }

  // availability
  switch (level) {
    case "None":
      return "No uptime guarantees or redundancy";
    case "Low":
      return "Basic backup and recovery procedures";
    case "Moderate":
      return "Redundant components and standard backups";
    case "High":
      return "High availability clustering and failover";
    case "Very High":
      return "Multi-site redundancy and continuous availability";
    default:
      return "Standard availability controls";
  }
}

/**
 * Gets validation level text for integrity security level
 *
 * @param level - The security level
 * @returns Human-readable validation level
 */
export function getIntegrityValidationLevel(level: SecurityLevel): string {
  switch (level) {
    case "None":
      return "Unverified";
    case "Low":
      return "Basic Validation";
    case "Moderate":
      return "Validated";
    case "High":
      return "Strongly Validated";
    case "Very High":
      return "Formally Verified";
    default:
      return "Unknown";
  }
}

/**
 * Gets uptime target text for availability security level
 *
 * @param level - The security level
 * @returns Human-readable uptime target
 */
export function getAvailabilityUptimeTarget(level: SecurityLevel): string {
  switch (level) {
    case "None":
      return "No guarantee";
    case "Low":
      return "95%";
    case "Moderate":
      return "99%";
    case "High":
      return "99.9%";
    case "Very High":
      return "99.999%";
    default:
      return "Unknown";
  }
}
