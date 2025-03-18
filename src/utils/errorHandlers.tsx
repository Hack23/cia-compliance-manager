import { ReactNode } from "react";

/**
 * Handles widget rendering errors
 *
 * ## Business Perspective
 *
 * Provides a consistent way to display and log errors across widgets,
 * improving user experience during failures and facilitating faster
 * troubleshooting for development teams. Proper error handling reduces
 * support costs and improves customer satisfaction. 🛠️
 *
 * @param error - The error that occurred
 * @param widgetId - The ID of the widget that encountered an error
 * @returns A React node representing the error state
 */
function handleWidgetError(error: unknown, widgetId: string): ReactNode {
  console.error(`Error rendering widget ${widgetId}:`, error);

  return (
    <div
      key={`error-${widgetId}`}
      className="widget-error p-4 bg-red-50 dark:bg-red-900 dark:bg-opacity-20 text-red-600 dark:text-red-400 border border-red-200 dark:border-red-800 rounded-lg"
      data-testid={`widget-error-${widgetId}`}
    >
      <div className="flex items-center mb-2">
        <span className="text-xl mr-2">⚠️</span>
        <h3 className="text-lg font-medium">Widget Error</h3>
      </div>
      <p className="mb-1">An error occurred while rendering this widget.</p>
      <details className="text-sm">
        <summary className="cursor-pointer">Error details</summary>
        <pre className="mt-2 p-2 bg-red-100 dark:bg-red-950 rounded overflow-auto">
          {error instanceof Error ? error.message : String(error)}
        </pre>
      </details>
    </div>
  );
}

export default handleWidgetError;
