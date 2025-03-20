/**
 * Centralized grid styles for dashboard layout
 */
import { Widget, WidgetConfig, WidgetDimension } from "../types/widget";

// Base grid container styles
export const gridClasses = `
  grid 
  grid-cols-1 
  sm:grid-cols-2 
  lg:grid-cols-3
  gap-4 
  p-4
`;

// Widget container styles
export const widgetClasses = `
  bg-white 
  dark:bg-gray-800 
  rounded-lg 
  shadow-md 
  overflow-hidden 
  flex 
  flex-col
  h-full
  border 
  border-gray-200 
  dark:border-gray-700
  transition-all
  duration-300
  ease-in-out
  hover:shadow-lg
  hover:-translate
`;

// Widget header styles
export const headerClasses = `
  p-4 
  border-b 
  border-gray-100 
  dark:border-gray-700
  bg-gray-50
  dark:bg-gray-800
  font-semibold
`;

// Widget content styles
export const contentClasses = `
  p-4 
  flex-1 
  overflow-auto
`;

// Grid style object for inline style application
export const gridStyle = {
  display: "grid",
  gridTemplateColumns: "repeat(3, 1fr)",
  gap: "1rem",
};

// Responsive grid configuration
export const gridConfig = {
  sm: 1, // 1 column on small screens
  md: 2, // 2 columns on medium screens
  lg: 3, // 3 columns on large screens
};

// Update widget size presets to use consistent 12-column grid
export enum WidgetSizePreset {
  SMALL = "small", // 3 columns
  MEDIUM = "medium", // 4 columns
  LARGE = "large", // 6 columns
  EXTRA_LARGE = "extraLarge", // 8 columns
  FULL_WIDTH = "fullWidth", // 12 columns
  DEFAULT = "medium",
}

// Update widget size spans
export const widgetSizes = {
  small: "col-span-3",
  medium: "col-span-4",
  large: "col-span-6",
  extraLarge: "col-span-8",
  full: "col-span-12",
};

// Update getWidgetSize function to use WidgetDimension
export function getWidgetSize(widget: Partial<WidgetConfig>): WidgetDimension {
  // Use explicit width and height if provided
  if (widget.width !== undefined && widget.height !== undefined) {
    return { width: widget.width, height: widget.height };
  }

  // Get dimensions based on size preset
  switch (widget.size) {
    case WidgetSizePreset.SMALL:
      return { width: 3, height: 1 };
    case WidgetSizePreset.MEDIUM:
      return { width: 4, height: 1 };
    case WidgetSizePreset.LARGE:
      return { width: 6, height: 2 };
    case WidgetSizePreset.EXTRA_LARGE:
      return { width: 8, height: 2 };
    case WidgetSizePreset.FULL_WIDTH:
      return { width: 12, height: 1 };
    default:
      return { width: 4, height: 1 };
  }
}

/**
 * Calculate grid layout styles based on widget configuration
 */
export function getGridLayoutStyles(widgets: Widget[]) {
  // Implementation details...
}

/**
 * Get dimensions for a widget based on size
 */
export function getWidgetDimensions(widget: {
  size?: string;
  width?: number;
  height?: number;
}): { width: number; height: number } {
  // If width and height are explicitly provided, use those
  if (widget.width !== undefined && widget.height !== undefined) {
    return { width: widget.width, height: widget.height };
  }

  // Otherwise, derive from size
  const size = widget.size?.toLowerCase() || "medium";

  if (size === "small") {
    return { width: 3, height: 1 };
  } else if (size === "medium") {
    return { width: 4, height: 1 };
  } else if (size === "large") {
    return { width: 6, height: 2 };
  } else if (size === "xlarge") {
    return { width: 8, height: 2 };
  } else if (size === "full" || size === "fullwidth") {
    return { width: 12, height: 1 };
  } else {
    // Default to medium
    return { width: 4, height: 1 };
  }
}
