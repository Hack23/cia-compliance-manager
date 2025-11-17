/**
 * Core CIA types used throughout the application
 *
 * ## Business Perspective
 *
 * ### Business Impact
 * The types defined in this file are crucial for representing the core concepts
 * of the CIA triad. They are used throughout the application to ensure consistent
 * handling of security levels and impacts. 💼
 *
 * ### Compliance
 * By defining clear and consistent types for security levels and impacts,
 * this file helps the application meet various compliance requirements. 📋
 *
 * ### Risk Management
 * The types in this file play a key role in identifying and mitigating potential
 * risks by providing a structured way to represent and analyze security impacts. ⚠️
 */

import { RISK_LEVELS } from "../constants/riskConstants";

/**
 * Represents security levels in the system
 */
export type SecurityLevel = "None" | "Low" | "Moderate" | "High" | "Very High";

/**
 * The RISK_LEVELS constant values that can be returned by risk calculation functions
 */
export type RiskLevel =
  | typeof RISK_LEVELS.CRITICAL
  | typeof RISK_LEVELS.HIGH
  | typeof RISK_LEVELS.MEDIUM
  | typeof RISK_LEVELS.LOW
  | typeof RISK_LEVELS.MINIMAL
  | typeof RISK_LEVELS.UNKNOWN;

/**
 * Check if a value is a valid SecurityLevel
 *
 * @param value - Value to check
 * @returns True if the value is a valid SecurityLevel
 */
export function isSecurityLevel(value: unknown): value is SecurityLevel {
  if (typeof value !== "string") {
    return false;
  }

  return ["None", "Low", "Moderate", "High", "Very High"].includes(value);
}

/**
 * Format a security level string to ensure proper capitalization
 *
 * @param level - Security level string to format
 * @returns Formatted security level string
 */
export function formatSecurityLevel(level?: string): SecurityLevel | string {
  if (!level) {
    return "Unknown";
  }

  const lowerLevel = level.toLowerCase();

  switch (lowerLevel) {
    case "none":
      return "None";
    case "low":
      return "Low";
    case "moderate":
      return "Moderate";
    case "high":
      return "High";
    case "very high":
      return "Very High";
    default:
      return "Unknown";
  }
}

/**
 * Get a numeric value for a security level
 *
 * @param level - Security level to convert
 * @returns Numeric value (0-4)
 */
export function getSecurityLevelValue(level: SecurityLevel | string): number {
  const levels: Record<string, number> = {
    None: 0,
    Low: 1,
    Moderate: 2,
    High: 3,
    "Very High": 4,
  };

  // Standardize the level format
  const formattedLevel =
    typeof level === "string" ? formatSecurityLevel(level) : "None";

  return levels[formattedLevel as SecurityLevel] || 0;
}

/**
 * Convert a numeric value to a security level
 *
 * @param value - Numeric value (0-4)
 * @returns Security level
 */
export function getSecurityLevelFromValue(value: number): SecurityLevel {
  switch (value) {
    case 0:
      return "None";
    case 1:
      return "Low";
    case 2:
      return "Moderate";
    case 3:
      return "High";
    case 4:
      return "Very High";
    default:
      return "None";
  }
}

/**
 * Calculate overall security level from individual component levels
 *
 * @param availabilityLevel - Availability security level
 * @param integrityLevel - Integrity security level
 * @param confidentialityLevel - Confidentiality security level
 * @returns Overall security level
 */
export function calculateOverallSecurityLevel(
  availabilityLevel: SecurityLevel,
  integrityLevel: SecurityLevel,
  confidentialityLevel: SecurityLevel
): SecurityLevel {
  if (
    [availabilityLevel, integrityLevel, confidentialityLevel].includes(
      "Very High"
    )
  )
    return "Very High";
  if (
    [availabilityLevel, integrityLevel, confidentialityLevel].includes("High")
  )
    return "High";
  if (
    [availabilityLevel, integrityLevel, confidentialityLevel].includes(
      "Moderate"
    )
  )
    return "Moderate";
  if ([availabilityLevel, integrityLevel, confidentialityLevel].includes("Low"))
    return "Low";
  return "None";
}

/**
 * Calculate risk level based on security levels
 *
 * @param availabilityLevel - Availability security level
 * @param integrityLevel - Integrity security level
 * @param confidentialityLevel - Confidentiality security level
 * @returns Risk level string
 */
export function calculateRiskLevel(
  availabilityLevel: SecurityLevel,
  integrityLevel: SecurityLevel,
  confidentialityLevel: SecurityLevel
): RiskLevel {
  // Calculate overall security level
  const overallLevel = calculateOverallSecurityLevel(
    availabilityLevel,
    integrityLevel,
    confidentialityLevel
  );

  // Map security levels to risk levels
  switch (overallLevel) {
    case "None":
      return RISK_LEVELS.CRITICAL;
    case "Low":
      return RISK_LEVELS.HIGH;
    case "Moderate":
      return RISK_LEVELS.MEDIUM;
    case "High":
      return RISK_LEVELS.LOW;
    case "Very High":
      return RISK_LEVELS.MINIMAL;
    default:
      return RISK_LEVELS.UNKNOWN;
  }
}

// No need to re-export ROIEstimate, it's already exported from cia-services.ts
// The conflicting export has been removed

/**
 * CIA component type
 */
export type CIAComponent = "confidentiality" | "integrity" | "availability";

/**
 * Business impact detail structure
 */
export interface BusinessImpactDetail {
  description: string; // Changed from optional to required
  riskLevel: string; // Changed from optional to required
  annualRevenueLoss?: string;
  meanTimeToRecover?: string;
  complianceViolations?: string[];
  financial?: {
    description: string;
    impact: string;
    annualLoss?: string;
  };
  operational?: {
    description: string;
    impact: string;
    recoveryTime?: string;
  };
  reputational?: {
    description: string;
    impact: string;
  };
  regulatory?: {
    description: string;
    impact: string;
    frameworks?: string[];
  };
  summary?: string;
}

/**
 * Security profile containing all security levels
 */
export interface SecurityProfile {
  availabilityLevel: SecurityLevel;
  integrityLevel: SecurityLevel;
  confidentialityLevel: SecurityLevel;
  securityLevel: SecurityLevel;
}

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
 * CIA details structure
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
}
