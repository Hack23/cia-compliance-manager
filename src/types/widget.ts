/**
 * Widget-related type definitions
 * 
 * ## Business Perspective
 * 
 * These types define the structure of widgets that compose the security assessment
 * dashboard, ensuring consistent widget configuration and behavior across the
 * application. 📊
 * 
 * The types support a flexible dashboard architecture that can adapt to different
 * security assessment needs and organizational requirements.
 */

import { SecurityLevel } from "./cia";

/**
 * Widget type identifiers
 */
export type WidgetType =
  | "security-level"
  | "security-summary"
  | "security-visualization"
  | "compliance-status"
  | "value-creation"
  | "cost-estimation"
  | "business-impact"
  | "technical-details"
  | "availability-impact"
  | "integrity-impact"
  | "confidentiality-impact"
  | "security-resources";

/**
 * Widget size string options for widget configuration
 */
export type WidgetSizeString = "small" | "medium" | "large" | "full";

/**
 * Widget size presets
 */
export enum WidgetSizePreset {
  SMALL = "small",
  MEDIUM = "medium",
  LARGE = "large",
  EXTRA_LARGE = "extraLarge",
  FULL_WIDTH = "fullWidth"
}

/**
 * Widget configuration
 */
export interface WidgetConfig {
  id: string;
  type: string;
  title: string;
  description?: string;
  icon?: string;
  priority?: number;
  visible?: boolean;
  size?: string;
  width?: number;
  height?: number;
  order?: number;
  requiredSecurityLevels?: string[];
  minSecurityLevel?: string | number;
  maxSecurityLevel?: string | number;
}

/**
 * Widget dimension properties - used for layout calculations
 */
export interface WidgetDimension {
  width: number;
  height: number;
}

// Alias for backward compatibility
export type WidgetSize = WidgetDimension;

/**
 * Widget metadata
 */
export interface Widget {
  id: string;
  type: WidgetType;
  title: string;
  size?: WidgetSizeString;
  initialProps?: Record<string, unknown>;
}

/**
 * Widget component props
 */
export interface WidgetComponentProps {
  id: string;
  title?: string;
  className?: string;
  testId?: string;
  availabilityLevel?: SecurityLevel;
  integrityLevel?: SecurityLevel;
  confidentialityLevel?: SecurityLevel;
  [key: string]: unknown;
}
