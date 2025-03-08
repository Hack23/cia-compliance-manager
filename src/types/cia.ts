/* c8 ignore start */
// This file contains TypeScript types that don't need test coverage

/**
 * Represents security levels in the CIA triad model
 * @category CIA Model
 */
export type SecurityLevel = "None" | "Low" | "Moderate" | "High" | "Very High";
export type SecurityFunctionGroup =
  | "Identify"
  | "Protect"
  | "Detect"
  | "Respond"
  | "Recover";
export type SecurityFunction = "ID" | "PR" | "DE" | "RS" | "RC";
/* c8 ignore end */

export enum CIALevel {
  None = "None",
  Low = "Low",
  Moderate = "Moderate",
  High = "High",
  VeryHigh = "Very High",
}

// CIA Types

import { RISK_LEVELS } from "../constants/riskConstants";

// New interface for detailed business impact information
/**
 * Business impact analysis interface for tracking security implications
 * @category CIA Model
 *
 * @example
 * ```ts
 * const financialImpact: BusinessImpactDetail = {
 *   description: "Revenue loss from service interruption",
 *   riskLevel: "High",
 *   annualRevenueLoss: "$2.5M"
 * };
 * ```
 */
export interface BusinessImpactDetail {
  description: string;
  riskLevel?: string; // One of the RISK_LEVELS values
  annualRevenueLoss?: string;
  meanTimeToRecover?: string;
  recoveryTime?: string;
  complianceViolations?: string[];
  reputationDamage?: string;
  customerImpact?: string;
  operationalImpact?: string;
  strategicImpact?: string;
  competitiveAdvantage?: {
    description: string;
    value: string;
  };
  [key: string]: any; // Allow for flexible additional properties
}

export interface BusinessImpactDetails {
  financialImpact?: BusinessImpactDetail;
  operationalImpact?: BusinessImpactDetail;
  reputationalImpact?: BusinessImpactDetail;
  regulatoryImpact?: BusinessImpactDetail;
  strategicImpact?: BusinessImpactDetail; // Add this explicitly
  competitiveAdvantage?: BusinessImpactDetail; // Add this explicitly
  [key: string]: BusinessImpactDetail | undefined; // Allow for additional impact types
}

// Base interface for CIA details
export interface CIADetails {
  description?: string;
  businessImpact?: string;
  capex?: number;
  opex?: number;
  technical?: string;
  protectionMethod?: string;
  validationMethod?: string;
  uptime?: string;
  recommendations?: string[];
  // Allow additional properties with an index signature
  [key: string]: any;
}

// Types for CIA ratings
export type AvailabilityRating =
  | "None"
  | "Low"
  | "Moderate"
  | "High"
  | "Very High";
export type IntegrityRating =
  | "None"
  | "Low"
  | "Moderate"
  | "High"
  | "Very High";
export type ConfidentialityRating =
  | "None"
  | "Low"
  | "Moderate"
  | "High"
  | "Very High";

// Combined CIA profile
export interface CIAProfile {
  availability: AvailabilityRating;
  integrity: IntegrityRating;
  confidentiality: ConfidentialityRating;
}

// Security level info
export interface SecurityLevelInfo {
  title: string;
  description: string;
  recommendation: string;
  level: SecurityLevel;
  icon: string;
  color: string;
  complianceFrameworks?: string[];
  // Direct keyed access to security levels
  None: CIADetails;
  Low: CIADetails;
  Moderate: CIADetails;
  High: CIADetails;
  "Very High": CIADetails;
  // Add any other properties needed by your components
  [key: string]: any; // Allow other properties for flexibility
}

// Interface for CIA widget props
export interface CIAWidgetProps {
  title: string;
  className?: string;
  children: React.ReactNode;
}

// Options for each component of CIA
export interface CIAOptions {
  None: CIADetails;
  Low: CIADetails;
  Moderate: CIADetails;
  High: CIADetails;
  "Very High": CIADetails;
}

// Widget properties
export interface WidgetProps {
  id: string;
  title: string;
  component: React.ComponentType<any>;
  props?: Record<string, any>;
  position?: number;
  size?: "small" | "medium" | "large" | "full";
}

// Business impact category
export type BusinessImpactCategory =
  | "financial"
  | "operational"
  | "reputational"
  | "regulatory"
  | "strategic";

// Security level options
export interface SecurityLevelOptions {
  availabilityOptions: CIAOptions;
  integrityOptions: CIAOptions;
  confidentialityOptions: CIAOptions;
}

/**
 * BusinessImpact represents the impact of a security breach or failure
 * on various aspects of the business
 */
export interface BusinessImpact {
  financial: string;
  operational: string;
  reputational: string;
  regulatory: string;
}

/**
 * SecurityImplementation represents implementation details for a specific
 * security control or measure
 */
export interface SecurityImplementation {
  technologies: string[];
  steps: string[];
  timeframe: string;
  complexity: string;
  team: string[];
}

/**
 * ComplianceRequirement represents a specific compliance requirement
 * that must be met
 */
export interface ComplianceRequirement {
  framework: string;
  control: string;
  description: string;
  status: "compliant" | "non-compliant" | "partial";
}

/**
 * ComplianceFramework represents a compliance framework and its
 * associated requirements
 */
export interface ComplianceFramework {
  name: string;
  description: string;
  requirements: ComplianceRequirement[];
  status: "compliant" | "non-compliant" | "partial";
  score?: number;
}

/**
 * SecurityRecommendation represents a recommended security measure
 * or control to implement
 */
export interface SecurityRecommendation {
  title: string;
  description: string;
  impact: string;
  effort: string;
  priority: "low" | "medium" | "high" | "critical";
}

/**
 * CostEstimate represents the estimated cost of implementing
 * a specific security measure or control
 */
export interface CostEstimate {
  capex: number;
  opex: number;
  roi: string;
  paybackPeriod: string;
}

/**
 * Generate a display format string for a security level
 */
export function formatSecurityLevel(level: string): string {
  if (!level) return "Unknown";
  return level.charAt(0).toUpperCase() + level.slice(1);
}

/**
 * Get a security level value for calculations
 */
export function getSecurityLevelValue(level: string): number {
  const levels: Record<string, number> = {
    None: 0,
    Low: 1,
    Moderate: 2,
    High: 3,
    "Very High": 4,
  };
  return levels[level] || 0;
}

/**
 * Get a security level from a numeric value
 */
export function getSecurityLevelFromValue(value: number): string {
  const levels = ["None", "Low", "Moderate", "High", "Very High"];
  return levels[value] || "None";
}

/**
 * Calculate the overall security level based on CIA components
 */
export function calculateOverallSecurityLevel(
  availabilityLevel: string,
  integrityLevel: string,
  confidentialityLevel: string
): string {
  const availValue = getSecurityLevelValue(availabilityLevel);
  const integrityValue = getSecurityLevelValue(integrityLevel);
  const confidentialityValue = getSecurityLevelValue(confidentialityLevel);

  const avgValue = Math.round(
    (availValue + integrityValue + confidentialityValue) / 3
  );

  return getSecurityLevelFromValue(avgValue);
}

/**
 * Calculate the risk level based on security levels
 */
export function calculateRiskLevel(
  availabilityLevel: string,
  integrityLevel: string,
  confidentialityLevel: string
): string {
  const securityLevel = calculateOverallSecurityLevel(
    availabilityLevel,
    integrityLevel,
    confidentialityLevel
  );

  switch (securityLevel) {
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
