/**
 * Type definitions for widget system components
 */

export interface WidgetConfig {
  type: string;
  id: string; // Make sure id is a required property
  title?: string;
  description?: string;
  icon?: string;
  priority?: number;
  visible?: boolean;
  size?: string;
  width?: number;
  height?: number;
  order?: number;
  requiredSecurityLevels?: string[];
  minSecurityLevel?: number | string;
  maxSecurityLevel?: number | string;
}

export enum WidgetSizePreset {
  DEFAULT = "medium",
  SMALL = "small",
  MEDIUM = "medium",
  LARGE = "large",
  EXTRA_LARGE = "extraLarge",
  FULL_WIDTH = "fullWidth",
}

export interface WidgetSize {
  width: number;
  height: number;
}
