import React from "react";
import { WidgetSize } from "../../types/widget";

interface WidgetContainerProps {
  children: React.ReactNode;
  title?: string;
  icon?: React.ReactNode;
  testId?: string;
  className?: string;
  style?: React.CSSProperties;
  size?: WidgetSize;
  loading?: boolean;
  error?: Error | null;
}

/**
 * Container component for dashboard widgets that provides consistent styling
 */
const WidgetContainer: React.FC<WidgetContainerProps> = ({
  children,
  title,
  icon,
  testId,
  className = "",
  style,
  size,
  loading = false,
  error = null,
}) => {
  // Base classes for the widget container
  const containerClasses = `widget-container bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden 
    border border-gray-200 dark:border-gray-700 ${className}`;

  // Combine standard style with size dimensions if provided
  const containerStyle = {
    ...style,
    ...(size && {
      gridColumn: `span ${size.width}`,
      gridRow: `span ${size.height}`,
    }),
  };

  return (
    <div
      data-testid={testId}
      className={containerClasses}
      style={containerStyle}
      data-loading={loading ? "true" : undefined}
    >
      {/* Optional widget header with title and icon */}
      {title && (
        <div className="widget-header p-3 border-b border-gray-200 dark:border-gray-700 flex items-center bg-gray-50 dark:bg-gray-900">
          {icon && <span className="widget-icon mr-2">{icon}</span>}
          <h2 className="text-md font-semibold text-gray-800 dark:text-gray-200">
            {title}
          </h2>
        </div>
      )}

      {/* Widget content area */}
      <div className="widget-content h-full">
        {loading ? (
          <div className="animate-pulse h-full w-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
            <div className="w-8 h-8 border-t-2 border-b-2 border-blue-500 rounded-full animate-spin"></div>
          </div>
        ) : error ? (
          <div className="p-4 text-red-500 dark:text-red-400">
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

export default WidgetContainer;
