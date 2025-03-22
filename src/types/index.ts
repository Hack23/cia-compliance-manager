/**
 * # Type Definitions Module
 *
 * This module exports all type definitions used across the CIA Compliance Manager.
 *
 * ## Business Perspective
 * Type definitions ensure consistent data structures throughout the application,
 * supporting reliable security assessments and business impact analysis.
 *
 * ## Technical Perspective
 * Centralized type exports simplify imports and enforce type consistency.
 *
 * @packageDocumentation
 */

// Core CIA Types - use explicit exports to avoid conflicts
export type {
  AvailabilityImpact,
  BaseImpact,
  CIAComponent,
  CIAImpact,
  CIAOptions,
  ConfidentialityImpact,
  IntegrityImpact,
  SecurityLevel,
  SecurityLevels,
  SecurityProfile,
} from "./cia";
export { CIAUtilities };

// Re-export utilities with namespacing to prevent conflicts
import * as CIAUtilities from "./cia.utility";

// Selective exports from cia-services to avoid conflicts
export type {
  // Use BusinessImpactDetail and CIADetails from here as the canonical source
  BusinessImpactDetail,
  BusinessImpactDetails,
  CIAComponentType,
  CIADataProvider,
  CIADetails,
  CodeExample,
  ComplianceImpact,
  ComplianceStatus,
  ImplementationEffort,
  ROIEstimate,
  TechnicalImplementationDetails,
} from "./cia-services";

// Compliance types
export type {
  ComplianceFramework,
  ComplianceStatusDetails,
  FrameworkApplicabilityOptions,
  FrameworkComplianceStatus,
} from "./compliance";

// Widget Types
export * from "./widget";
export * from "./widget-props";
export * from "./widgets";

// Selective export from businessImpact to avoid conflicts
export type {
  BusinessConsideration,
  BusinessConsiderations,
  BusinessImpactIcons,
  BusinessKeyBenefit,
  BusinessKeyBenefits,
  BusinessROIEstimates,
  BusinessValueMetric,
} from "./businessImpact";

// Selective export from componentProps to avoid conflicts
export type { SecurityLevelDisplayProps } from "./componentProps";

// Helper functions from cia
export {
  calculateOverallSecurityLevel,
  calculateRiskLevel,
  getSecurityLevelFromValue,
} from "./cia";

// Type guards for better type safety
export { isCIAComponentType } from "./cia-services";
