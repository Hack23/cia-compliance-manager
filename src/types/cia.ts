/**
 * # CIA Security Type Definitions
 *
 * Core types and interfaces for the CIA triad security model.
 *
 * ## Business Perspective
 * These types form the foundational data model for representing
 * Confidentiality, Integrity, and Availability security levels across
 * the application. They enable consistent security assessment and
 * reporting throughout all components. 🔒
 *
 * @packageDocumentation
 */

/**
 * Valid security levels for CIA components
 *
 * Ordered from least to most secure:
 * - None: No security controls in place
 * - Low: Basic security controls
 * - Moderate: Standard security controls
 * - High: Enhanced security controls
 * - Very High: Maximum security controls
 */
export type SecurityLevel = "None" | "Low" | "Moderate" | "High" | "Very High";

/**
 * Collection of security levels for all three CIA components
 */
export interface SecurityLevels {
  availabilityLevel: SecurityLevel;
  integrityLevel: SecurityLevel;
  confidentialityLevel: SecurityLevel;
}

/**
 * Label map for security levels - provides human-readable names
 */
export const SECURITY_LEVEL_LABELS: Record<SecurityLevel, string> = {
  None: "None",
  Low: "Low",
  Moderate: "Moderate",
  High: "High",
  "Very High": "Very High",
};

/**
 * All valid security level values for iteration and validation
 */
export const ALL_SECURITY_LEVELS: SecurityLevel[] = [
  "None",
  "Low",
  "Moderate",
  "High",
  "Very High",
];

/**
 * Numeric value mapping for security levels (used for calculations)
 */
export const SECURITY_LEVEL_VALUES: Record<SecurityLevel, number> = {
  None: 0,
  Low: 1,
  Moderate: 2,
  High: 3,
  "Very High": 4,
};

/**
 * CIA triad component types
 */
export type CIATriadComponent =
  | "confidentiality"
  | "integrity"
  | "availability";

/**
 * CIA component display names
 */
export const CIA_COMPONENT_NAMES: Record<CIATriadComponent, string> = {
  confidentiality: "Confidentiality",
  integrity: "Integrity",
  availability: "Availability",
};

/**
 * Security level description type
 */
export interface SecurityLevelDescription {
  level: SecurityLevel;
  description: string;
  numericValue: number;
  riskLevel: string;
}

/**
 * Get numeric value for a security level
 *
 * @param level - Security level to get value for
 * @returns Numeric value (0-4)
 */
export function getSecurityLevelNumericValue(level: SecurityLevel): number {
  return SECURITY_LEVEL_VALUES[level] ?? 0;
}

/**
 * Check if a string is a valid security level
 *
 * @param value - Value to check
 * @returns True if value is a valid SecurityLevel
 */
export function isValidSecurityLevel(value: unknown): value is SecurityLevel {
  return (
    typeof value === "string" && ALL_SECURITY_LEVELS.includes(value as SecurityLevel)
  );
}

/**
 * SecurityLevel constants for cleaner code references
 */
export const SecurityLevelEnum = {
  NONE: "None" as SecurityLevel,
  LOW: "Low" as SecurityLevel,
  MODERATE: "Moderate" as SecurityLevel,
  HIGH: "High" as SecurityLevel,
  VERY_HIGH: "Very High" as SecurityLevel,
};
