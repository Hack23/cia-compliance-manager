/**
 * Type definitions for widget system components
 */

export interface WidgetConfig {
  id: string;
  type: string;
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
  minSecurityLevel?: string | number;
  maxSecurityLevel?: string | number;
}

export enum WidgetSizePreset {
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
