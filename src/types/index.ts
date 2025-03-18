/**
 * Central export file for all types used in the CIA Compliance Manager
 *
 * @packageDocumentation
 * @group Types
 */

// Export primary CIA types
export * from "./cia";

// Export business impact types
export * from "./businessImpact";

// Export component prop types - these are the primary interfaces for components
export * from "./componentProps";

// Export widget-specific types - avoid ambiguity with named imports
// (excludes any types that would conflict with componentProps exports)
import type {
  SecurityResourcesWidgetProps,
  WidgetProps // Use this instead of WidgetBaseProps
} from "./widgets";

export type { SecurityResourcesWidgetProps, WidgetProps };

// Add any new type exports below
