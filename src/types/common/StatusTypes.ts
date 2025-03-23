/**
 * Common status type definitions used across the application
 */

/**
 * Status badge variant type
 * Used for consistent color coding of status indicators
 */
export type StatusType =
  | "success"
  | "warning"
  | "error"
  | "info"
  | "neutral"
  | "purple";

/**
 * Alias for StatusType for backwards compatibility
 */
export type StatusBadgeVariant = StatusType;
