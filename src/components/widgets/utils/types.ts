// New file to explicitly export types from widget utilities

/**
 * Types used by widget registry and utilities
 * @packageDocumentation
 */

import { ComponentType } from "react";

/**
 * Type for widget components that can be registered in the registry
 */
export type WidgetComponentType<P = any> = ComponentType<P>;

/**
 * Configuration for a widget definition
 */
export interface WidgetDefinition<P = any> {
  id: string;
  title: string;
  component: WidgetComponentType<P>;
  defaultProps?: Partial<P>;
  icon?: string;
  size?: "small" | "medium" | "large" | "full";
  order?: number;
}

/**
 * Widget registry interface
 */
export interface WidgetRegistry {
  register<P>(definition: WidgetDefinition<P>): void;
  get(id: string): WidgetDefinition | undefined;
  getAll(): WidgetDefinition[];
  renderWidget<P>(id: string, props?: Partial<P>): React.ReactNode;
  renderWidgets(
    filter?: (widget: WidgetDefinition) => boolean,
    props?: Record<string, any>
  ): React.ReactNode[];
}
