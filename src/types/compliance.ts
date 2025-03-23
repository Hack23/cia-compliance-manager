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

  // Optional status text for display
  statusText?: string;
}

// Alias ComplianceStatus to ComplianceStatusDetails for backward compatibility
export type ComplianceStatus = ComplianceStatusDetails;

/**
 * Industry or region specific applicability options
 */
export interface FrameworkApplicabilityOptions {
  industries?: string[];
  regions?: string[];
}

/**
 * Interface for compliance gap analysis
 */
export interface ComplianceGapAnalysis {
  /**
   * Overall compliance status
   */
  overallStatus: string;

  /**
   * Compliance score (0-100)
   */
  complianceScore: number;

  /**
   * List of compliance gaps by framework
   */
  gaps: ComplianceGap[];

  /**
   * Recommendations for addressing compliance gaps
   */
  recommendations: string[];

  /**
   * Flag indicating if the configuration is compliant
   */
  isCompliant?: boolean;
}

/**
 * Interface for individual compliance gap
 */
export interface ComplianceGap {
  /**
   * Framework name
   */
  framework: string;

  /**
   * Framework description
   */
  frameworkDescription: string;

  /**
   * Component-specific gap details
   */
  components: {
    availability: {
      current: SecurityLevel;
      required: SecurityLevel;
      gap: number;
    };
    integrity: {
      current: SecurityLevel;
      required: SecurityLevel;
      gap: number;
    };
    confidentiality: {
      current: SecurityLevel;
      required: SecurityLevel;
      gap: number;
    };
  };

  /**
   * Recommendations for addressing this gap
   */
  recommendations: string[];
}
