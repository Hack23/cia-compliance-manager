import { SecurityLevel } from "./cia";

/**
 * Compliance types used throughout the application
 *
 * ## Business Perspective
 *
 * These types define the core compliance structures used to assess
 * and report on regulatory alignment. They support compliance officers
 * in understanding gaps and remediation requirements. 📋
 *
 * @packageDocumentation
 */

/**
 * Status of framework compliance
 */
export type FrameworkComplianceStatus =
  | "compliant"
  | "partially-compliant"
  | "non-compliant";

/**
 * Represents a compliance framework definition
 */
export interface ComplianceFramework {
  name: string;
  description: string;
  requiredAvailabilityLevel: SecurityLevel;
  requiredIntegrityLevel: SecurityLevel;
  requiredConfidentialityLevel: SecurityLevel;
  applicableIndustries?: string[];
  applicableRegions?: string[];
}

/**
 * Represents the overall compliance status
 */
export interface ComplianceStatusDetails {
  // Required properties
  status: string;
  compliantFrameworks: string[];
  partiallyCompliantFrameworks: string[];
  nonCompliantFrameworks: string[];

  // Optional properties
  remediationSteps?: string[];
  requirements?: string[];
  complianceScore: number;
}

/**
 * Industry or region specific applicability options
 */
export interface FrameworkApplicabilityOptions {
  industries?: string[];
  regions?: string[];
}
