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
  ROIEstimatesMap,
  ROIMetrics,
  TechnicalImplementationDetails,
} from "./cia-services";

// Compliance types
export type {
  ComplianceFramework,
  ComplianceStatusDetails,
  FrameworkApplicabilityOptions,
  FrameworkComplianceStatus,
} from "./compliance";

// Widget Types - export from widget-props.ts for impact widgets
export type {
  AvailabilityImpactWidgetProps,
  IntegrityImpactWidgetProps,
  ConfidentialityImpactWidgetProps,
  BusinessImpactAnalysisWidgetProps,
  ComplianceStatusWidgetProps,
  CostEstimationWidgetProps,
  SecurityLevelWidgetProps,
  SecurityResourcesWidgetProps,
  TechnicalDetailsWidgetProps,
  ValueCreationWidgetProps,
} from "./widget-props";

// Export remaining widget types from widgets.ts
export type {
  WidgetProps,
} from "./widgets";

export type { CommonWidgetProps, WithSecurityLevelProps, BaseWidgetProps } from "./widget-props";
export type { CIABaseWidgetProps } from "./widgets";

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

// Component Props - use more specific exports to avoid conflicts
export type {
  BusinessImpactSectionProps,
  BusinessRiskDisplayProps,
  CIAImpactCardProps,
  MetricsCardProps,
  RadarChartProps,
  RiskAssessmentProps,
  StatusBadgeProps,
  WidgetHeaderProps,
} from "./componentPropExports";

// Helper functions from cia
export {
  calculateOverallSecurityLevel,
  calculateRiskLevel,
  getSecurityLevelFromValue,
} from "./cia";

// Type guards for better type safety
export { isCIAComponentType } from "./cia-services";
