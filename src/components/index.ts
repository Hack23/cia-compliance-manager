/**
 * Component exports for the CIA Compliance Manager
 *
 * ## Business Perspective
 * This file exports all available components for easy access throughout the application,
 * promoting consistent interface design and component reuse across security interfaces.
 */

// Widget Components - Keep these since they are used in the simplified app
export { default as SecurityLevelWidget } from "./widgets/assessmentcenter/SecurityLevelWidget";
export { default as SecuritySummaryWidget } from "./widgets/assessmentcenter/SecuritySummaryWidget";
export { default as BusinessImpactAnalysisWidget } from "./widgets/businessvalue/BusinessImpactAnalysisWidget";
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
export { default as Tooltip } from "./common/Tooltip";
export { default as WidgetHeader } from "./common/WidgetHeader";
