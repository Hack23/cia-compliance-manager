/**
 * Core CIA types used throughout the application
 */

/**
 * Security level definitions - None, Low, Moderate, High, Very High
 */
export type SecurityLevel = "None" | "Low" | "Moderate" | "High" | "Very High";

/**
 * Base interface for CIA impacts
 */
export interface BaseImpact {
  level: SecurityLevel;
  description: string;
}

/**
 * Impact associated with the availability of the system
 */
export interface AvailabilityImpact extends BaseImpact {
  uptime: string;
  recoveryTime: string;
}

/**
 * Impact associated with the integrity of the system
 */
export interface IntegrityImpact extends BaseImpact {
  dataAccuracy: string;
  verificationSteps: string;
}

/**
 * Impact associated with the confidentiality of the system
 */
export interface ConfidentialityImpact extends BaseImpact {
  dataClassification: string;
  accessControls: string;
}

/**
 * Complete CIA impact model
 */
export interface CIAImpact {
  availability: AvailabilityImpact;
  integrity: IntegrityImpact;
  confidentiality: ConfidentialityImpact;
}

/**
 * Available options for each CIA pillar
 */
export interface CIAOptions {
  availability: SecurityLevel[];
  integrity: SecurityLevel[];
  confidentiality: SecurityLevel[];
}

/**
 * Selected security levels for each CIA pillar
 */
export interface SecurityLevels {
  availability: SecurityLevel;
  integrity: SecurityLevel;
  confidentiality: SecurityLevel;
}

/**
 * Business impact analysis interface for tracking security implications
 */
export interface BusinessImpactDetail {
  description?: string;
  riskLevel?: string;
  annualRevenueLoss?: string;
  meanTimeToRecover?: string;
  complianceViolations?: string[];
}

/**
 * Detailed CIA information used across the application
 * Contains rich information about impacts, technical details, and recommendations
 */
export interface CIADetails {
  description?: string;
  impact?: string;
  technical?: string;
  businessImpact?: string;
  uptime?: string;
  mttr?: string;
  rto?: string;
  rpo?: string;
  recommendations?: string[];
  validationMethod?: string;
  technicalControls?: string[];
  technicalMeasures?: string[];
  complianceImplications?: string;
  riskLevel?: string;
  capex?: number;
  opex?: number;
  bg?: string;
  text?: string;
  businessImpactDetails?: {
    financialImpact?: { description?: string };
    operationalImpact?: { description?: string };
    reputationalImpact?: { description?: string };
    regulatory?: { description?: string };
  };
}

/**
 * CIA component type definition
 */
export type CIAComponentType = "availability" | "integrity" | "confidentiality";

/**
 * Format security level for display
 * @param level The security level to format
 * @returns The formatted security level string
 */
export function formatSecurityLevel(
  level: SecurityLevel | string | undefined
): string {
  if (!level) return "Unknown";

  // Already a valid security level
  if (["None", "Low", "Moderate", "High", "Very High"].includes(level)) {
    return level;
  }

  // Try to normalize
  const normalized =
    level.charAt(0).toUpperCase() + level.slice(1).toLowerCase();
  if (["None", "Low", "Moderate", "High"].includes(normalized)) {
    return normalized;
  } else if (normalized.toLowerCase() === "very high") {
    return "Very High";
  }

  return "Unknown";
}

/**
 * Gets a numerical value for a security level for calculations
 * @param level The security level string
 * @returns A number from 0 (None) to 4 (Very High)
 */
export function getSecurityLevelValue(level: SecurityLevel | string): number {
  switch (formatSecurityLevel(level)) {
    case "Very High":
      return 4;
    case "High":
      return 3;
    case "Moderate":
      return 2;
    case "Low":
      return 1;
    case "None":
    default:
      return 0;
  }
}

/**
 * Get a security level from a numeric value
 * @param value The numeric value (0-4)
 * @returns The corresponding security level
 */
export function getSecurityLevelFromValue(value: number): SecurityLevel {
  const levels: SecurityLevel[] = [
    "None",
    "Low",
    "Moderate",
    "High",
    "Very High",
  ];

  if (value < 0 || value >= levels.length) {
    return "None"; // Default to "None" for out-of-range values
  }

  return levels[value] as SecurityLevel; // Add type assertion for TypeScript
}

/**
 * Calculate the overall security level based on CIA components
 * @param availabilityLevel The availability security level
 * @param integrityLevel The integrity security level
 * @param confidentialityLevel The confidentiality security level
 * @returns The calculated overall security level
 */
export function calculateOverallSecurityLevel(
  availabilityLevel: string,
  integrityLevel: string,
  confidentialityLevel: string
): string {
  // Map security levels to numeric values
  const availValue = getSecurityLevelValue(availabilityLevel);
  const integrityValue = getSecurityLevelValue(integrityLevel);
  const confidentialityValue = getSecurityLevelValue(confidentialityLevel);

  // Calculate average and round to nearest integer
  const averageValue = Math.round(
    (availValue + integrityValue + confidentialityValue) / 3
  );

  // Map back to security level
  return getSecurityLevelFromValue(averageValue);
}

import { getRiskLevelFromSecurityLevel } from "../constants/riskConstants";

/**
 * Calculate the overall risk level based on security levels
 */
export function calculateRiskLevel(
  availabilityLevel: SecurityLevel,
  integrityLevel: SecurityLevel,
  confidentialityLevel: SecurityLevel
): string {
  const overallLevel = calculateOverallSecurityLevel(
    availabilityLevel,
    integrityLevel,
    confidentialityLevel
  );

  // Use the getRiskLevelFromSecurityLevel function to ensure consistent values
  return getRiskLevelFromSecurityLevel(overallLevel);
}
