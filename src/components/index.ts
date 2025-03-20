/**
 * Component exports for the CIA Compliance Manager
 * 
 * ## Business Perspective
 * This file exports all available components for easy access throughout the application,
 * promoting consistent interface design and component reuse across security interfaces.
 */

// Widget Components - Keep these since they are used in the simplified app
export { default as AvailabilityImpactWidget } from "./widgets/AvailabilityImpactWidget";
export { default as BusinessImpactAnalysisWidget } from "./widgets/BusinessImpactAnalysisWidget";
export { default as CIAImpactSummaryWidget } from "./widgets/CIAImpactSummaryWidget";
export { ComplianceStatusWidget } from "./widgets/ComplianceStatusWidget";
export { default as ConfidentialityImpactWidget } from "./widgets/ConfidentialityImpactWidget";
export { default as CostEstimationWidget } from "./widgets/CostEstimationWidget";
export { default as IntegrityImpactWidget } from "./widgets/IntegrityImpactWidget";
export { default as SecurityLevelWidget } from "./widgets/SecurityLevelWidget";
export { default as SecurityResourcesWidget } from "./widgets/SecurityResourcesWidget";
export { default as SecuritySummaryWidget } from "./widgets/SecuritySummaryWidget";
export { default as SecurityVisualizationWidget } from "./widgets/SecurityVisualizationWidget";
export { default as TechnicalDetailsWidget } from "./widgets/TechnicalDetailsWidget";
export { default as ValueCreationWidget } from "./widgets/ValueCreationWidget";

// Common Components
// Only include components that exist and are actively used
export { default as Tooltip } from "./common/Tooltip";
export { default as WidgetHeader } from "./common/WidgetHeader";

