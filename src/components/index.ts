/**
 * Component exports for the CIA Compliance Manager
 */

// Common Components
export { default as CIAImpactCard } from "./common/CIAImpactCard";
export { default as KeyValuePair } from "./common/KeyValuePair";
export { default as MetricsCard } from "./common/MetricsCard";
export { default as RiskAssessment } from "./common/RiskAssessment";
export { default as SecurityLevelBadge } from "./common/SecurityLevelBadge";
export { default as SecurityLevelSummaryItem } from "./common/SecurityLevelSummaryItem";
export { default as SecurityRiskScore } from "./common/SecurityRiskScore";
export { default as StatusBadge } from "./common/StatusBadge";
export { default as ThemeToggle } from "./common/ThemeToggle";
export { default as Tooltip } from "./common/Tooltip";
export { default as WidgetActions } from "./common/WidgetActions";
export { default as WidgetContainer } from "./common/WidgetContainer";
export { default as WidgetHeader } from "./common/WidgetHeader";

// Security Level Components
export { default as SecurityLevelSelector } from "./securitylevel/SecurityLevelSelector";

// Widget Components
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

// Dashboard
export { default as Dashboard } from "./dashboard/Dashboard";
export { widgetRegistry };

// Chart Components
// ... existing chart component exports ...

// Import widgetRegistry as a default import, not a named export
import widgetRegistry from "../utils/widgetRegistry";

