import { SecurityLevel } from "./cia";

/**
 * Core compliance types used throughout the application
 * 
 * ## Business Perspective
 * 
 * ### Compliance Impact
 * These types define how compliance status is represented in the application,
 * helping organizations understand their compliance posture. They capture the
 * key aspects of regulatory compliance that matter to businesses. 📋
 * 
 * ### Risk Management
 * By clearly defining compliance status and framework requirements, these types
 * help organizations identify and mitigate compliance-related risks. ⚠️
 */

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
export interface ComplianceStatus {
  // Required properties
  compliantFrameworks: string[];
  partiallyCompliantFrameworks: string[];
  nonCompliantFrameworks: string[];
  
  // Optional properties
  remediationSteps?: string[];
  requirements?: string[];
  
  // Adding these properties to match expected interface in tests and services
  status?: string;
  complianceScore?: number;
  score?: number; // Alias for complianceScore for backward compatibility
}

/**
 * Compliance status type constants
 */
export enum ComplianceStatusType {
  COMPLIANT = 'compliant',
  PARTIAL = 'partial',
  NON_COMPLIANT = 'non-compliant'
}
