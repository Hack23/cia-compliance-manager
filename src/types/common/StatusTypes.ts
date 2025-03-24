/**
 * Common status type definitions used across the application
 */

/**
 * Available status types for badges and indicators
 */
export type StatusType =
  | "success"
  | "info"
  | "warning"
  | "error"
  | "neutral"
  | "purple"; // Added for Very High security levels

/**
 * Alias for StatusType for backwards compatibility
 */
export type StatusBadgeVariant = StatusType;
