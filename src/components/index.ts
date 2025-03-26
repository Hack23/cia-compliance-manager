/**
 * # Component Exports Module
 *
 * This module exports all components and their prop types used in the CIA Compliance Manager.
 *
 * ## Business Perspective
 * Components are the building blocks of the UI, providing security professionals
 * with intuitive interfaces for managing security compliance. 🎨
 *
 * ## Technical Perspective
 * Centralized component exports simplify imports and promote component reuse.
 *
 * @packageDocumentation
 */

// Widget Components - Keep these since they are used in the simplified app
export { default as BusinessImpactAnalysisWidget } from "./widgets/assessmentcenter/BusinessImpactAnalysisWidget";
export { default as SecurityLevelWidget } from "./widgets/assessmentcenter/SecurityLevelWidget";
export { default as SecuritySummaryWidget } from "./widgets/assessmentcenter/SecuritySummaryWidget";
export { default as ComplianceStatusWidget } from "./widgets/businessvalue/ComplianceStatusWidget";
export { default as CostEstimationWidget } from "./widgets/businessvalue/CostEstimationWidget";
export { default as ValueCreationWidget } from "./widgets/businessvalue/ValueCreationWidget";
export { default as AvailabilityImpactWidget } from "./widgets/impactanalysis/AvailabilityImpactWidget";
export { default as ConfidentialityImpactWidget } from "./widgets/impactanalysis/ConfidentialityImpactWidget";
export { default as IntegrityImpactWidget } from "./widgets/impactanalysis/IntegrityImpactWidget";
export { default as SecurityResourcesWidget } from "./widgets/implementationguide/SecurityResourcesWidget";
export { default as SecurityVisualizationWidget } from "./widgets/implementationguide/SecurityVisualizationWidget";
export { default as TechnicalDetailsWidget } from "./widgets/implementationguide/TechnicalDetailsWidget";

// Common Components
// Only include components that exist and are actively used
export { default as BusinessImpactSection } from "./common/BusinessImpactSection";
export { default as BusinessRiskDisplay } from "./common/BusinessRiskDisplay";
export { default as CIAImpactCard } from "./common/CIAImpactCard";
export { KeyValuePair } from "./common/KeyValuePair";
export { default as MetricsCard } from "./common/MetricsCard";
export { default as RiskAssessment } from "./common/RiskAssessment";
export { default as RiskLevelBadge } from "./common/RiskLevelBadge";
export { default as SecurityLevelBadge } from "./common/SecurityLevelBadge";
export { SecurityRiskScore } from "./common/SecurityRiskScore";
export { default as StatusBadge } from "./common/StatusBadge";
export { default as Tab } from "./common/Tab";
export { default as ThemeToggle } from "./common/ThemeToggle";
export { default as Tooltip } from "./common/Tooltip";
export { default as WidgetActions } from "./common/WidgetActions";
export { default as WidgetContainer } from "./common/WidgetContainer";
export { default as WidgetHeader } from "./common/WidgetHeader";

// Charts
export { default as RadarChart } from "./charts/RadarChart";
export { SecurityRiskScore as ChartSecurityRiskScore } from "./charts/SecurityRiskScore";

// Security level components
export { SecurityLevelSelector } from "./securitylevel/SecurityLevelSelector";
export { Selection } from "./securitylevel/Selection";

// Export widget components that are actively used
export * from "./widgets";

// Import and re-export only the component prop types that are actually used
export type {
  BusinessImpactSectionProps,
  BusinessRiskDisplayProps,
  CIAImpactCardProps,
  KeyValuePairProps,
  MetricsCardProps,
  RadarChartProps,
  RiskAssessmentProps,
  RiskLevelBadgeProps,
  SecurityLevelBadgeProps,
  SecurityRiskScoreProps,
  StatusBadgeProps,
  TabProps,
  ThemeToggleProps,
  TooltipProps,
  WidgetActionsProps,
  WidgetContainerProps,
  WidgetHeaderProps,
} from "../types/componentPropExports";
