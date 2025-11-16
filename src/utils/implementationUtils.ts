import { SecurityLevel } from "../types/cia";

/**
 * Gets implementation description for a CIA component at a specific security level
 *
 * @param component - The CIA component (confidentiality, integrity, availability)
 * @param level - The security level
 * @returns Human-readable implementation description
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
 * @param level - The integrity security level
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
 * @param level - The availability security level
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
