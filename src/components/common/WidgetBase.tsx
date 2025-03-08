import React, { ReactNode } from "react";
import { WidgetBaseProps } from "../../types/widgets";
import { handleWidgetError } from "../../utils/widgetHelpers";

export interface WidgetBaseComponentProps extends WidgetBaseProps {
  title: string;
  icon?: ReactNode;
  children: ReactNode;
  className?: string;
  loading?: boolean;
  error?: Error | null;
}

/**
 * Base component for all widgets to provide consistent structure and error handling
 */
const WidgetBase: React.FC<WidgetBaseComponentProps> = ({
  title,
  icon,
  children,
  testId,
  className = "",
  loading = false,
  error = null,
}) => {
  return (
    <div
      className={`widget-base p-4 bg-white dark:bg-gray-800 rounded-lg ${className}`}
      data-testid={testId}
      aria-labelledby={`widget-${testId}-title`}
    >
      <div className="flex items-center mb-4">
        {icon && <span className="text-xl mr-2">{icon}</span>}
        <h3 id={`widget-${testId}-title`} className="text-lg font-medium">
          {title}
        </h3>
      </div>

      {loading ? (
        <div className="flex justify-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-700"></div>
        </div>
      ) : error ? (
        handleWidgetError(error)
      ) : (
        <div className="widget-content">{children}</div>
      )}
    </div>
  );
};

export default WidgetBase;
