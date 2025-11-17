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
 * Security levels available for CIA triad components
 * 
 * Each level represents increasing security controls and associated costs:
 * - **None**: No security controls (not recommended for production)
 * - **Low**: Basic security controls for low-risk systems
 * - **Moderate**: Standard controls for typical business systems (recommended baseline)
 * - **High**: Enhanced controls for sensitive systems
 * - **Very High**: Maximum controls for critical systems
 * 
 * @example
 * ```typescript
 * const level: SecurityLevel = 'Moderate';
 * const criticalLevel: SecurityLevel = 'Very High';
 * ```
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
 * CIA triad components representing different security aspects
 * 
 * - **confidentiality**: Data privacy and access control (who can see the data)
 * - **integrity**: Data accuracy and consistency (ensuring data is not tampered with)
 * - **availability**: System uptime and accessibility (ensuring the system is accessible when needed)
 * 
 * @example
 * ```typescript
 * const component: CIAComponent = 'availability';
 * // Use to configure security level for availability
 * ```
 */
export type CIAComponent = "confidentiality" | "integrity" | "availability";

/**
 * Business impact detail structure
 * 
 * Provides comprehensive information about the business impact of security incidents
 * across financial, operational, reputational, and regulatory dimensions.
 * 
 * @example
 * ```typescript
 * const impact: BusinessImpactDetail = {
 *   description: "Major service disruption affecting customer transactions",
 *   riskLevel: "High Risk",
 *   annualRevenueLoss: "$500,000 - $2,000,000",
 *   meanTimeToRecover: "4-8 hours",
 *   complianceViolations: ["PCI DSS", "SOC 2"],
 *   financial: {
 *     description: "Revenue loss from transaction downtime",
 *     impact: "High",
 *     annualLoss: "$1,000,000"
 *   }
 * };
 * ```
 */
export interface BusinessImpactDetail {
  /** Detailed description of the business impact */
  description: string;
  
  /** Risk level classification (e.g., "Critical Risk", "High Risk", "Medium Risk") */
  riskLevel: string;
  
  /** Estimated annual revenue loss range */
  annualRevenueLoss?: string;
  
  /** Mean time to recover from the incident */
  meanTimeToRecover?: string;
  
  /** List of compliance frameworks that would be violated */
  complianceViolations?: string[];
  
  /** Financial impact details */
  financial?: {
    /** Description of financial impact */
    description: string;
    /** Impact severity level */
    impact: string;
    /** Estimated annual loss amount */
    annualLoss?: string;
  };
  
  /** Operational impact details */
  operational?: {
    /** Description of operational impact */
    description: string;
    /** Impact severity level */
    impact: string;
    /** Time required to recover operations */
    recoveryTime?: string;
  };
  
  /** Reputational impact details */
  reputational?: {
    /** Description of reputational impact */
    description: string;
    /** Impact severity level */
    impact: string;
  };
  
  /** Regulatory impact details */
  regulatory?: {
    /** Description of regulatory impact */
    description: string;
    /** Impact severity level */
    impact: string;
    /** List of affected regulatory frameworks */
    frameworks?: string[];
  };
  
  /** Executive summary of the overall impact */
  summary?: string;
}

/**
 * Security profile containing all security levels
 * 
 * Represents a complete security configuration for a system,
 * including individual CIA component levels and an overall security level.
 * 
 * @example
 * ```typescript
 * const profile: SecurityProfile = {
 *   availabilityLevel: 'High',
 *   integrityLevel: 'Very High',
 *   confidentialityLevel: 'High',
 *   securityLevel: 'Very High' // Calculated from highest component level
 * };
 * ```
 */
export interface SecurityProfile {
  /** Security level for system availability */
  availabilityLevel: SecurityLevel;
  
  /** Security level for data integrity */
  integrityLevel: SecurityLevel;
  
  /** Security level for data confidentiality */
  confidentialityLevel: SecurityLevel;
  
  /** Overall security level (typically the highest of the three components) */
  securityLevel: SecurityLevel;
}

/**
 * Base interface for CIA impacts
 * 
 * Common structure shared by all CIA component impact types.
 */
export interface BaseImpact {
  /** Security level associated with this impact */
  level: SecurityLevel;
  
  /** Human-readable description of the impact */
  description: string;
}

/**
 * Impact associated with the availability of the system
 * 
 * Describes the expected uptime and recovery characteristics
 * for the selected availability security level.
 * 
 * @example
 * ```typescript
 * const impact: AvailabilityImpact = {
 *   level: 'High',
 *   description: 'System must be available 99.9% of the time',
 *   uptime: '99.9%',
 *   recoveryTime: '< 1 hour'
 * };
 * ```
 */
export interface AvailabilityImpact extends BaseImpact {
  /** Expected uptime percentage (e.g., "99.9%", "99.99%") */
  uptime: string;
  
  /** Maximum acceptable recovery time (e.g., "< 1 hour", "< 15 minutes") */
  recoveryTime: string;
}

/**
 * Impact associated with the integrity of the system
 * 
 * Describes data accuracy requirements and verification processes
 * for the selected integrity security level.
 * 
 * @example
 * ```typescript
 * const impact: IntegrityImpact = {
 *   level: 'Very High',
 *   description: 'Data must be tamper-proof with audit trails',
 *   dataAccuracy: 'Zero tolerance for unauthorized modifications',
 *   verificationSteps: 'Cryptographic signatures, audit logs, checksums'
 * };
 * ```
 */
export interface IntegrityImpact extends BaseImpact {
  /** Expected data accuracy level and tolerance for errors */
  dataAccuracy: string;
  
  /** Verification and validation processes required */
  verificationSteps: string;
}

/**
 * Impact associated with the confidentiality of the system
 * 
 * Describes data classification and access control requirements
 * for the selected confidentiality security level.
 * 
 * @example
 * ```typescript
 * const impact: ConfidentialityImpact = {
 *   level: 'High',
 *   description: 'Data must be encrypted and access strictly controlled',
 *   dataClassification: 'Confidential - Restricted Access',
 *   accessControls: 'Multi-factor authentication, role-based access, encryption at rest and in transit'
 * };
 * ```
 */
export interface ConfidentialityImpact extends BaseImpact {
  /** Data classification level (e.g., "Public", "Internal", "Confidential", "Restricted") */
  dataClassification: string;
  
  /** Access control mechanisms required (e.g., "MFA", "RBAC", "encryption") */
  accessControls: string;
}

/**
 * Complete CIA impact model
 * 
 * Comprehensive impact assessment covering all three CIA triad components.
 * Used to communicate the full security posture and requirements.
 * 
 * @example
 * ```typescript
 * const ciaImpact: CIAImpact = {
 *   availability: {
 *     level: 'High',
 *     description: 'High availability required',
 *     uptime: '99.9%',
 *     recoveryTime: '< 1 hour'
 *   },
 *   integrity: {
 *     level: 'Very High',
 *     description: 'Data integrity critical',
 *     dataAccuracy: 'Zero tolerance',
 *     verificationSteps: 'Cryptographic validation'
 *   },
 *   confidentiality: {
 *     level: 'High',
 *     description: 'Sensitive data protection',
 *     dataClassification: 'Confidential',
 *     accessControls: 'MFA + RBAC'
 *   }
 * };
 * ```
 */
export interface CIAImpact {
  /** Availability impact assessment */
  availability: AvailabilityImpact;
  
  /** Integrity impact assessment */
  integrity: IntegrityImpact;
  
  /** Confidentiality impact assessment */
  confidentiality: ConfidentialityImpact;
}

/**
 * Available options for each CIA pillar
 * 
 * Defines the set of security levels that can be selected for each
 * CIA component. Typically includes all five security levels.
 * 
 * @example
 * ```typescript
 * const options: CIAOptions = {
 *   availability: ['None', 'Low', 'Moderate', 'High', 'Very High'],
 *   integrity: ['None', 'Low', 'Moderate', 'High', 'Very High'],
 *   confidentiality: ['None', 'Low', 'Moderate', 'High', 'Very High']
 * };
 * ```
 */
export interface CIAOptions {
  /** Available security level options for availability */
  availability: SecurityLevel[];
  
  /** Available security level options for integrity */
  integrity: SecurityLevel[];
  
  /** Available security level options for confidentiality */
  confidentiality: SecurityLevel[];
}

/**
 * Selected security levels for each CIA pillar
 * 
 * Represents the currently selected or recommended security levels
 * for a specific system or application.
 * 
 * @example
 * ```typescript
 * const selectedLevels: SecurityLevels = {
 *   availability: 'High',
 *   integrity: 'Very High',
 *   confidentiality: 'Moderate'
 * };
 * ```
 */
export interface SecurityLevels {
  /** Selected availability security level */
  availability: SecurityLevel;
  
  /** Selected integrity security level */
  integrity: SecurityLevel;
  
  /** Selected confidentiality security level */
  confidentiality: SecurityLevel;
}

/**
 * CIA details structure
 * 
 * Comprehensive information about a CIA component's configuration,
 * including technical details, business impact, and operational metrics.
 * 
 * @example
 * ```typescript
 * const details: CIADetails = {
 *   description: 'High availability configuration with redundancy',
 *   impact: 'Minimal downtime, fast recovery',
 *   technical: 'Multi-AZ deployment, auto-scaling, health checks',
 *   businessImpact: 'Protects revenue from service disruptions',
 *   uptime: '99.9%',
 *   mttr: '30 minutes',
 *   rto: '1 hour',
 *   rpo: '15 minutes',
 *   recommendations: ['Implement automated failover', 'Regular DR testing']
 * };
 * ```
 */
export interface CIADetails {
  /** General description of the configuration */
  description?: string;
  
  /** Impact statement describing the effect of this configuration */
  impact?: string;
  
  /** Technical implementation details */
  technical?: string;
  
  /** Business impact and value proposition */
  businessImpact?: string;
  
  /** Expected uptime percentage */
  uptime?: string;
  
  /** Mean Time To Repair - average time to fix issues */
  mttr?: string;
  
  /** Recovery Time Objective - maximum acceptable downtime */
  rto?: string;
  
  /** Recovery Point Objective - maximum acceptable data loss */
  rpo?: string;
  
  /** List of recommendations for improvement */
  recommendations?: string[];
}
