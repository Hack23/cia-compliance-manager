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

import { BusinessImpact, SLAMetrics } from "./businessImpact";
import { SecurityLevels } from "./cia";
import { ComplianceFramework } from "./compliance";
import { SecurityResource } from "./securityResources";

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
  summary?: string; // Optional summary property

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
  // Additional optional properties for implementation guidance
  expertiseLevel?: string; // Expertise level required
  developmentEffort?: string; // Development effort estimate
  // Allow additional properties for extensibility (use unknown for type safety)
  [key: string]: unknown;
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

  // Financial metrics (optional for partial data)
  capex?: number;
  opex?: number;

  // Styling properties (optional for partial data)
  bg?: string;
  text?: string;

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
   * Get security level recommendations
   */
  getSecurityLevelRecommendations?: (level: SecurityLevel) => Promise<string[]>;

  /**
   * Get compliance frameworks
   */
  getComplianceFrameworks?: () => Promise<ComplianceFramework[]>;

  /**
   * Get compliance requirements
   */
  getComplianceRequirements?: () => Promise<Record<string, unknown>>;

  /**
   * Get business impact
   */
  getBusinessImpact?: () => Promise<BusinessImpactDetails>;

  /**
   * Get security metrics
   */
  getSecurityMetrics?: () => Promise<Record<string, unknown>>;

  /**
   * Get security resources
   */
  getSecurityResources?: () => Promise<SecurityResource[]>;

  /**
   * Get SLA metrics
   */
  getSLAMetrics?: () => Promise<SLAMetrics>;

  /**
   * Get cost estimates
   */
  getCostEstimates?: () => Promise<Record<string, unknown>>;

  /**
   * Get value creation metrics
   */
  getValueCreationMetrics?: () => Promise<Record<string, unknown>>;

  /**
   * Get implementation details
   */
  getImplementationDetails?: () => Promise<TechnicalImplementationDetails>;

  /**
   * Get remediation steps
   */
  getRemediationSteps?: () => Promise<string[]>;
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

/**
 * CIA Content Service interface
 * Defines methods for retrieving CIA-related content and technical details
 */
export interface CIAContentService {
  getComponentDetails?: (component: string, level: SecurityLevel) => unknown;
  getTechnicalRequirements?: (component: string, level: SecurityLevel) => string[];
  getRequiredExpertise?: (component: string, level: SecurityLevel) => string[];
  getInformationSensitivity?: (level: SecurityLevel) => string;
}

/**
 * Compliance Service interface
 * Defines methods for compliance status and framework checks
 */
export interface ComplianceService {
  getComplianceStatus?: (
    availabilityLevel: SecurityLevel,
    integrityLevel: SecurityLevel,
    confidentialityLevel: SecurityLevel
  ) => ComplianceStatus | null;
}
