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

// Re-export component props that were missing in documentation
export type { StatusType } from "./components/common/StatusBadge";
export type { ROIMetrics } from "./types/cia-services";
export type {
  ComplianceStatusDetails,
  FrameworkComplianceStatus,
} from "./types/compliance";

// Re-export from componentPropExports to get the correct types
export type {
  SecurityLevelChangeTrackerProps,
  SecurityLevelContextType,
  UseSecurityLevelStateOptions,
} from "./types/componentPropExports";

// Re-export from widget types
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

// Re-export service classes
export { ComplianceService } from "./services/complianceService";
export { TechnicalImplementationService } from "./services/technicalImplementationService";
