import { ReactNode } from "react";

/**
 * Standard handler for widget errors
 *
 * @param error The error that occurred
 * @param widgetId ID of the widget that had the error
 * @returns Error display component
 */
const handleWidgetError = (error: Error, widgetId: string): ReactNode => {
  console.error(`Error rendering widget ${widgetId}:`, error);

  return (
    <div
      className="widget-error p-4 bg-red-50 border border-red-300 text-red-700 rounded-md"
      data-testid={`widget-error-${widgetId}`}
    >
      <h3 className="font-medium mb-2">Widget Error</h3>
      <p className="text-sm">{error.message}</p>
      <p className="text-xs mt-2 text-gray-600">
        Please try refreshing the page or contact support if the issue persists.
      </p>
    </div>
  );
};

export default handleWidgetError;
