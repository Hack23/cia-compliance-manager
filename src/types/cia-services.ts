/**
 * CIA security service types and interfaces
 *
 * ## Business Perspective
 *
 * These types define the core data structures for representing CIA security
 * information across the application. They enable consistent data handling
 * and provide a common language for discussing security controls between
 * technical and business stakeholders. 🔒
 */

import { SecurityLevel } from "./cia";

// Re-export SecurityLevel for backward compatibility
export type { SecurityLevel };

import { BusinessImpact } from "./businessImpact";
import { SecurityLevels } from "./cia";
import { ComplianceFramework } from "./compliance";

/**
 * Core data structure representing CIA assessment data
 */
export interface CIAData {
  /** Security levels for availability, integrity, and confidentiality */
  securityLevels: SecurityLevels;

  /** Business impact analysis results */
  businessImpact?: BusinessImpact;

  /** Relevant compliance frameworks */
  complianceFrameworks?: ComplianceFramework[];

  /** Timestamp of last update */
  lastUpdated?: Date;

  /** Any additional metadata */
  metadata?: Record<string, unknown>;
}

/**
 * Type representing CIA component types
 */
export type CIAComponentType = "confidentiality" | "integrity" | "availability";

/**
 * Type guard to check if a value is a valid CIA component type
 *
 * @param value - Value to check
 * @returns True if value is a valid CIA component type
 */
export function isCIAComponentType(value: unknown): value is CIAComponentType {
  return (
    typeof value === "string" &&
    ["confidentiality", "integrity", "availability"].includes(value)
  );
}

/**
 * Business impact category details
 */
export interface ImpactCategoryDetails {
  description: string;
  riskLevel: string;
  complianceViolations?: string[];
  complianceImpact?: string;
  competitiveAdvantage?: string;
  annualRevenueLoss?: string;
  meanTimeToRecover?: string;
}

/**
 * Business impact detail for specific impact categories
 */
export interface BusinessImpactDetail {
  /**
   * Description of the impact
   */
  description: string;

  /**
   * Risk level associated with this impact
   */
  riskLevel: string;

  /**
   * Annual revenue loss estimate
   */
  annualRevenueLoss?: string;

  /**
   * Mean time to recover from incidents
   */
  meanTimeToRecover?: string;

  /**
   * List of potential compliance violations
   */
  complianceViolations?: string[];

  /**
   * Competitive advantage implications
   */
  competitiveAdvantage?: string;

  /**
   * Compliance impact description
   */
  complianceImpact?: string;

  /**
   * Reputational impact description
   */
  reputationalImpact?: string;
}

/**
 * Business impact details
 */
export interface BusinessImpactDetails {
  summary: string; // Required summary property

  // Either use the new names or the legacy names
  financial?: BusinessImpactDetail;
  operational?: BusinessImpactDetail;

  // Legacy property names kept for backward compatibility
  financialImpact?: BusinessImpactDetail;
  operationalImpact?: BusinessImpactDetail;

  // Optional detail types
  reputational?: BusinessImpactDetail;
  reputationalImpact?: BusinessImpactDetail;
  strategic?: BusinessImpactDetail;
  regulatory?: BusinessImpactDetail;
}

/**
 * Technical implementation effort details
 */
export interface ImplementationEffort {
  development: string;
  maintenance: string;
  expertise: string;
}

/**
 * Technical implementation details
 */
export interface TechnicalImplementationDetails {
  description: string;
  implementationSteps: string[];
  effort: {
    development: string;
    maintenance: string;
    expertise: string;
  };
  // Add the component-specific properties
  validationMethod?: string; // For integrity
  protectionMethod?: string; // For confidentiality
  recoveryMethod?: string; // For availability
  [key: string]: any; // Allow additional properties
}

/**
 * Code example for technical implementation
 */
export interface CodeExample {
  language: string;
  title: string;
  code: string;
}

/**
 * Compliance impact details
 */
export interface ComplianceImpact {
  frameworks?: {
    compliant: string[];
    partiallyCompliant: string[];
    nonCompliant: string[];
  };
  requirements: string[];
  remediationSteps: string[];
}

/**
 * Enhanced ROI estimate interface that combines existing definitions
 */
export interface ROIEstimate {
  returnRate: string; // Percentage return rate (e.g., "150%")
  description: string; // Description of the ROI
  value?: string; // Value representation (can be formatted currency or percentage)
  potentialSavings?: string; // Potential savings estimation
  breakEvenPeriod?: string; // Time to break even on investment
}

/**
 * Return on investment metrics
 */
export interface ROIMetrics {
  value: string;
  percentage: string;
  description: string;
}

/**
 * ROI estimates map by security level
 */
export interface ROIEstimatesMap {
  NONE: ROIEstimate;
  LOW: ROIEstimate;
  MODERATE: ROIEstimate;
  HIGH: ROIEstimate;
  VERY_HIGH: ROIEstimate;
  // Remove duplicate index signature, keep only one
  [key: string]: ROIEstimate; // Add string index signature for easier access
}

/**
 * Core CIA security details interface
 *
 * This comprehensive interface represents all security details for a specific
 * security level across availability, integrity, or confidentiality.
 */
export interface CIADetails {
  // Core descriptive fields
  description: string;
  technical: string;
  businessImpact: string;
  impact?: string; // Legacy field - use businessImpact instead

  // Financial metrics
  capex: number;
  opex: number;

  // Styling properties
  bg: string;
  text: string;

  // Security guidance
  recommendations: string[];

  // Business impact analysis
  businessImpactDetails?: BusinessImpactDetails;

  // Availability-specific metrics
  uptime?: string;
  rto?: string;
  rpo?: string;
  mttr?: string;
  sla?: string; // Added missing property

  // Integrity-specific metrics
  validationMethod?: string;
  validationLevel?: string; // Added missing property
  errorRate?: string; // Added missing property

  // Confidentiality-specific metrics
  protectionMethod?: string;
  privacyImpact?: string; // Added missing property

  // Implementation details
  implementationComplexity?: string;
  maintenanceRequirements?: string;
  requiredExpertise?: string;
  controlFamily?: string[];
  applicableFrameworks?: string[];

  // Business perspective and value creation
  businessPerspective?: string;
  implementationSteps?: string[];
  effort?: ImplementationEffort;
  keyImpact?: string;
  metric?: string;
  valuePoints?: string[];
  roiEstimate?: ROIEstimate;
  implementationConsiderations?: string;

  // Visual and compliance indicators
  securityIcon?: string;
  complianceImpact?: ComplianceImpact;

  // Implementation guidance
  codeExamples?: CodeExample[];
  technicalImplementation?: TechnicalImplementationDetails;

  // Add missing properties
  expertise?: string;
  timeframe?: string;
}

/**
 * @deprecated Use CIADetails instead - kept for backward compatibility
 */
export type EnhancedCIADetails = CIADetails;

/**
 * Data provider for CIA security information
 */
export interface CIADataProvider {
  /**
   * Initialize the data provider
   */
  initialize?: () => Promise<boolean>;

  availabilityOptions: Record<SecurityLevel, CIADetails>;
  integrityOptions: Record<SecurityLevel, CIADetails>;
  confidentialityOptions: Record<SecurityLevel, CIADetails>;
  roiEstimates: ROIEstimatesMap;

  /**
   * Get default security icon for a security level
   */
  getDefaultSecurityIcon?: (level: SecurityLevel) => string;

  /**
   * Get default expertise level for a security level
   */
  getDefaultExpertiseLevel?: (level: SecurityLevel) => string;

  /**
   * Get protection level for a security level
   */
  getProtectionLevel?: (level: SecurityLevel) => string;

  /**
   * Get default value points for a security level
   */
  getDefaultValuePoints?: (level: SecurityLevel) => string[];

  /**
   * Get value points for a security level
   * @deprecated Use getDefaultValuePoints instead
   */
  getValuePoints?: (level: SecurityLevel) => string[];

  /**
   * Get security level recommendations
   */
  getSecurityLevelRecommendations?: (level: SecurityLevel) => Promise<string[]>;

  /**
   * Get compliance frameworks
   */
  getComplianceFrameworks?: () => Promise<any[]>;

  /**
   * Get compliance requirements
   */
  getComplianceRequirements?: () => Promise<any>;

  /**
   * Get business impact
   */
  getBusinessImpact?: () => Promise<any>;

  /**
   * Get security metrics
   */
  getSecurityMetrics?: () => Promise<any>;

  /**
   * Get security resources
   */
  getSecurityResources?: () => Promise<any[]>;

  /**
   * Get SLA metrics
   */
  getSLAMetrics?: () => Promise<any>;

  /**
   * Get cost estimates
   */
  getCostEstimates?: () => Promise<any>;

  /**
   * Get value creation metrics
   */
  getValueCreationMetrics?: () => Promise<any>;

  /**
   * Get implementation details
   */
  getImplementationDetails?: () => Promise<any>;

  /**
   * Get remediation steps
   */
  getRemediationSteps?: () => Promise<any[]>;
}

// Types used by CIA service modules

export interface ComplianceStatus {
  status: string;
  compliantFrameworks: string[];
  partiallyCompliantFrameworks: string[];
  nonCompliantFrameworks: string[];
  remediationSteps?: string[];
  complianceScore: number;
  // ...other properties...
}
