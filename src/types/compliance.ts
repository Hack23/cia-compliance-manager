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
export type FrameworkComplianceStatusType =
  | "compliant"
  | "partially-compliant"
  | "non-compliant";

/**
 * Represents a compliance framework definition
 */
export interface ComplianceFramework {
  id: string;
  name: string;
  description: string;
  status: string;
  requiredAvailabilityLevel: SecurityLevel;
  requiredIntegrityLevel: SecurityLevel;
  requiredConfidentialityLevel: SecurityLevel;
  applicableIndustries?: string[];
  applicableRegions?: string[];
  requirements?: string[];
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
  frameworks?: ComplianceFramework[];

  // Optional properties
  remediationSteps?: string[];
  requirements?: string[];
  complianceScore: number;

  // Optional status text for display
  statusText?: string;

  // For interface compatibility
  frameworkName?: string;
  findings?: string[];
  metRequirements?: string[];
  unmetRequirements?: string[];
  recommendations?: string[];
}

// Alias ComplianceStatus to ComplianceStatusDetails for backward compatibility
export type ComplianceStatus = ComplianceStatusDetails;

/**
 * Industry or region specific applicability options
 */
export interface FrameworkApplicabilityOptions {
  industries?: string[];
  regions?: string[];
  processesPersonalData: boolean;
  industry: string;
  companySize: "small" | "medium" | "large";
  dataTypes: string[];
}

/**
 * Interface for compliance gap analysis
 */
export interface ComplianceGapAnalysis {
  /**
   * Whether the organization is compliant with the framework
   */
  isCompliant: boolean;

  /**
   * List of compliance gaps by framework
   */
  gaps: ComplianceGap[];

  /**
   * Recommendations for addressing compliance gaps
   */
  recommendations: string[];

  /**
   * Overall compliance status text
   */
  overallStatus?: string;

  /**
   * Compliance score (0-100)
   */
  complianceScore?: number;
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

/**
 * Details about compliance status for a specific framework
 */
export interface ComplianceFrameworkStatusDetails {
  /** Name of the framework */
  frameworkName: string;

  /** Current compliance status */
  status: string;

  /** List of findings or gaps */
  findings: string[];

  /** List of requirements that are met */
  metRequirements: string[];

  /** List of requirements that are not met */
  unmetRequirements: string[];

  /** Recommendations for achieving compliance */
  recommendations: string[];
}

/**
 * Status of compliance with a specific framework
 */
export interface FrameworkComplianceStatus {
  /** Name of the framework */
  name: string;

  /** Whether the framework applies */
  applicable: boolean;

  /** Current compliance status */
  status: "Compliant" | "Partially Compliant" | "Non-Compliant";

  /** Percentage of requirements met */
  compliancePercentage: number;

  /** Key gaps in compliance */
  complianceGaps: string[];

  /** Required security level to satisfy the framework */
  requiredSecurityLevel: SecurityLevel;
}

/**
 * Security metrics for visualization from compliance perspective
 */
export interface ComplianceSecurityMetrics {
  /** Confidentiality score (0-100) */
  confidentiality: number;

  /** Integrity score (0-100) */
  integrity: number;

  /** Availability score (0-100) */
  availability: number;

  /** Monitoring capabilities score (0-100) */
  monitoring: number;

  /** Resilience score (0-100) */
  resilience: number;

  /** Compliance score (0-100) */
  compliance: number;

  /** Overall security score (0-100) */
  overallScore: number;

  /** Industry benchmark score for comparison */
  benchmarkScore: number;

  /** Security maturity level */
  securityMaturity: string;
}

// Add missing type needed by ComplianceServiceAdapter
export interface ComplianceFrameworkCoverage {
  id: string;
  name: string;
  coverage: number;
  required: boolean;
  status: "compliant" | "partially-compliant" | "non-compliant";
  details?: string;
}
