/**
 * # TypeDoc Entry File
 *
 * This file serves as an entry point for TypeDoc documentation generation.
 * It re-exports all types, interfaces, and classes that should be included
 * in the generated documentation.
 *
 * This file is specifically for documentation purposes and should not be
 * imported in application code.
 *
 * @packageDocumentation
 */

// Use named exports instead of wildcards to avoid conflicts
import * as Components from "./components";
import * as Hooks from "./hooks";
import * as Services from "./services";
import * as Types from "./types";
import * as Utils from "./utils";

// Export namespaces to avoid naming conflicts
export { Components, Hooks, Services, Types, Utils };

// Essential component and utility type exports
export type { StatusType } from "./components/common/StatusBadge";
export type { ROIMetrics } from "./types/cia-services";
export type {
  ComplianceStatusDetails,
  FrameworkComplianceStatus,
} from "./types/compliance";

// Component prop types
export type {
  SecurityLevelChangeTrackerProps,
  SecurityLevelContextType,
  UseSecurityLevelStateOptions,
} from "./types/componentPropExports";

// Widget props
export type {
  AvailabilityImpactWidgetProps,
  BusinessImpactAnalysisWidgetProps,
  ConfidentialityImpactWidgetProps,
  CostEstimationWidgetProps,
  IntegrityImpactWidgetProps,
  SecurityLevelWidgetProps,
  SecurityResourcesWidgetProps,
  SecuritySummaryWidgetProps,
  SecurityVisualizationWidgetProps,
  TechnicalDetailsWidgetProps,
  ValueCreationWidgetProps,
  WidgetBaseProps,
} from "./types/widgets";

// Core services
export { ComplianceService } from "./services/complianceService";
export { TechnicalImplementationService } from "./services/technicalImplementationService";
