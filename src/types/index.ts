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

import * as CIAUtilities from "./cia.utility";

export type {
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

export type {
  ComplianceFramework,
  ComplianceStatusDetails,
  FrameworkApplicabilityOptions,
  FrameworkComplianceStatus,
} from "./compliance";

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

export type {
  WidgetProps,
} from "./widgets";

export type { CommonWidgetProps, WithSecurityLevelProps, BaseWidgetProps } from "./widget-props";
export type { CIABaseWidgetProps } from "./widgets";

export type {
  BusinessConsideration,
  BusinessConsiderations,
  BusinessImpactIcons,
  BusinessKeyBenefit,
  BusinessKeyBenefits,
  BusinessROIEstimates,
  BusinessValueMetric,
} from "./businessImpact";

export type {
  BusinessImpactSectionProps,
  BusinessRiskDisplayProps,
  CIAComponentColor,
  CIAImpactCardProps,
  MetricsCardProps,
  RadarChartProps,
  RiskAssessmentProps,
  StatusBadgeProps,
  WidgetHeaderProps,
} from "./componentPropExports";

export {
  calculateOverallSecurityLevel,
  calculateRiskLevel,
  getSecurityLevelFromValue,
} from "./cia";

export { isCIAComponentType } from "./cia-services";

export type {
  KeyboardShortcut,
  KeyboardShortcutContextValue,
  KeyboardShortcutHelpProps,
  Platform,
  ShortcutBadgeProps,
  ShortcutCategory,
  ShortcutMap,
  UseKeyboardShortcutsOptions,
} from './keyboard';

export type {
  Tab,
  TabsState,
  UseTabsOptions,
  UseTabsReturn,
} from './tabs';
