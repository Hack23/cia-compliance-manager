import React from "react";
import { WidgetSize } from "../../types/widget";
import { getTestId } from "../../utils/widgetHelpers";

interface WidgetBaseProps {
  children: React.ReactNode;
  title?: string;
  className?: string;
  testId?: string;
  titleTestId?: string;
  contentTestId?: string;
  loading?: boolean;
  error?: Error | null;
  size?: WidgetSize;
  icon?: React.ReactNode;
}

/**
 * Base component for all dashboard widgets with standard layout and styling
 */
const WidgetBase: React.FC<WidgetBaseProps> = ({
  children,
  title,
  className = "",
  testId,
  titleTestId,
  contentTestId,
  loading = false,
  error = null,
  size,
  icon,
}) => {
  // Determine test IDs for child elements
  const baseTestId = testId || "widget-base";
  const titleId = titleTestId || `${baseTestId}-title`;
  const contentId = contentTestId || `${baseTestId}-content`;

  // Calculate grid sizing styles if size object provided
  const sizeStyles = size
    ? {
        gridColumn: `span ${size.width}`,
        gridRow: `span ${size.height}`,
      }
    : {};

  return (
    <div
      data-testid={baseTestId}
      className={`widget bg-white dark:bg-gray-800 rounded-lg shadow-md ${className}`}
      style={sizeStyles}
    >
      {/* Widget header with title if provided */}
      {title && (
        <div
          data-testid={getTestId(baseTestId, "header")}
          className="widget-header border-b border-gray-200 dark:border-gray-700 p-3 flex items-center"
        >
          {icon && <span className="mr-2">{icon}</span>}
          <h3
            data-testid={titleId}
            className="text-sm font-medium text-gray-700 dark:text-gray-300"
          >
            {title}
          </h3>
        </div>
      )}

      {/* Widget content area */}
      <div data-testid={contentId} className="widget-content p-4 h-full">
        {loading ? (
          <div className="flex justify-center items-center h-full">
            <div
              data-testid={`${baseTestId}-loading`}
              className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"
            ></div>
          </div>
        ) : error ? (
          <div
            data-testid={`${baseTestId}-error`}
            className="text-red-500 dark:text-red-400"
          >
            <p className="font-bold">Error:</p>
            <p>{error.message}</p>
          </div>
        ) : (
          children
        )}
      </div>
    </div>
  );
};

export default WidgetBase;
