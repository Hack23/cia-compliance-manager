import React from "react";
import { WidgetSizeString } from "../../types/widget";
import { getWidgetColumnSpan } from "../../utils/widgetHelpers";

/**
 * Base props for all widgets
 */
export interface WidgetBaseProps {
  id?: string;
  testId?: string;
  title?: string;
  description?: string;
  className?: string;
  children?: React.ReactNode;
  size?: WidgetSizeString;
  isLoading?: boolean;
  error?: Error | null;
}

/**
 * Base component for all widgets
 * 
 * Provides consistent styling and structure for widgets
 */
export const WidgetBase: React.FC<WidgetBaseProps> = ({
  id,
  testId,
  title,
  description,
  className = "",
  children,
  size = "medium",
  isLoading = false,
  error = null,
}) => {
  // CSS class for the size
  const sizeClass = getWidgetColumnSpan(size);

  // Determine grid span based on size
  const gridStyle = {
    gridColumn: `span ${size === "small" ? 1 : size === "medium" ? 2 : size === "large" ? 3 : 4}`,
    gridRow: `span ${size === "small" ? 1 : size === "large" ? 2 : 1}`,
  };

  return (
    <div
      id={id}
      data-testid={testId}
      className={`widget bg-white dark:bg-gray-800 rounded-lg shadow-sm p-4 overflow-hidden ${sizeClass} ${className}`}
      style={gridStyle}
    >
      {title && (
        <div className="widget-header mb-4">
          <h3 className="text-lg font-medium text-gray-900 dark:text-white">
            {title}
          </h3>
          {description && (
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
              {description}
            </p>
          )}
        </div>
      )}
      
      <div className="widget-content">
        {isLoading ? (
          <div className="flex justify-center items-center h-full py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primary-500"></div>
          </div>
        ) : error ? (
          <div className="text-red-500 dark:text-red-400 p-4 text-center">
            <p className="font-medium">Error</p>
            <p className="text-sm">{error.message}</p>
          </div>
        ) : (
          children
        )}
      </div>
    </div>
  );
};
