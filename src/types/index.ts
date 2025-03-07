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
export type {
  WidgetBaseProps,
  SecuritySummaryWidgetProps,
  IntegrityImpactWidgetProps,
  ConfidentialityImpactWidgetProps,
  AvailabilityImpactWidgetProps,
  SecurityResourcesWidgetProps,
  // Add any other non-conflicting types from widgets.ts here
} from "./widgets";

// Add any new type exports below
