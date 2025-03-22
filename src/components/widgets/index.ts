/**
 * # Security Widget Components
 *
 * This module exports specialized dashboard widgets for security compliance visualization.
 *
 * @module components/widgets
 */

// Assessment Center Widgets
export { default as SecurityLevelWidget } from "./assessmentcenter/SecurityLevelWidget";
export { default as SecuritySummaryWidget } from "./assessmentcenter/SecuritySummaryWidget";

// Business Value Widgets
export { default as BusinessImpactAnalysisWidget } from "./businessvalue/BusinessImpactAnalysisWidget";
export { default as ComplianceStatusWidget } from "./businessvalue/ComplianceStatusWidget";
export { default as CostEstimationWidget } from "./businessvalue/CostEstimationWidget";
export { default as ValueCreationWidget } from "./businessvalue/ValueCreationWidget";

// Implementation Guide Widgets
export { default as SecurityResourcesWidget } from "./implementationguide/SecurityResourcesWidget";
export { default as SecurityVisualizationWidget } from "./implementationguide/SecurityVisualizationWidget";
export { default as TechnicalDetailsWidget } from "./implementationguide/TechnicalDetailsWidget";

// Impact Analysis Widgets
export { default as AvailabilityImpactWidget } from "./impactanalysis/AvailabilityImpactWidget";
export { default as ConfidentialityImpactWidget } from "./impactanalysis/ConfidentialityImpactWidget";
export { default as IntegrityImpactWidget } from "./impactanalysis/IntegrityImpactWidget";

// Constants
export * from "./constants";
