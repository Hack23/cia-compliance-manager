/**
 * # React Hooks Module
 *
 * This module exports all custom hooks used throughout the CIA Compliance Manager.
 *
 * ## Business Perspective
 * Custom hooks encapsulate business logic and security assessment functionality,
 * enabling consistent behavior across the application. 🔄
 *
 * ## Technical Perspective
 * Centralized hook exports simplify imports and promote hook reuse.
 *
 * @packageDocumentation
 */

// Security Level Hooks
export { useCIAContentService } from "./useCIAContentService";
export { useCIAOptions } from "./useCIAOptions";
export { useComplianceService } from "./useComplianceService";
export { useSecurityMetricsService } from "./useSecurityMetricsService";

// Component Data Hooks
export { useComponentDetails } from "./useComponentDetails";
export { useBusinessImpact } from "./useBusinessImpact";

// Formatting Hooks
export { useFormattedMetrics } from "./useFormattedMetrics";
export type { MetricFormatters, MetricFormattingOptions } from "./useFormattedMetrics";

// UI Hooks
export { useResponsiveBreakpoint } from "./useResponsiveBreakpoint";
export type { Breakpoint } from "./useResponsiveBreakpoint";

// State Management Hooks
export { useSecurityLevelState } from "./useSecurityLevelState";
export type { 
  SecurityLevelState, 
  UseSecurityLevelStateReturn 
} from "./useSecurityLevelState";

// Data Fetching Hooks
export { useServiceData } from "./useServiceData";
export type { ServiceDataState } from "./useServiceData";

// Storage Hooks
export { useLocalStorage } from "./useLocalStorage";

// Keyboard Shortcuts Hooks
export { useKeyboardShortcuts } from "./useKeyboardShortcuts";
export type { UseKeyboardShortcutsOptions } from "../types/keyboard";

// Error Handling Hooks
export { useWidgetError } from "./useWidgetError";
export type { WidgetErrorState } from "./useWidgetError";
