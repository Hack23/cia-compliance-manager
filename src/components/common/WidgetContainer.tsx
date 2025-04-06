import React, { ReactNode } from "react";
import { ErrorMessage, LoadingSpinner } from "../UI";

interface WidgetContainerProps {
  /**
   * Title of the widget
   */
  title: string;

  /**
   * Icon for the widget (emoji or component)
   */
  icon?: ReactNode;

  /**
   * Additional CSS classes
   */
  className?: string;

  /**
   * Test ID for testing
   */
  testId?: string;

  /**
   * Whether the widget is in loading state
   */
  isLoading?: boolean;

  /**
   * Error message to display
   */
  error?: Error | string | null;

  /**
   * Widget content
   */
  children: ReactNode;

  /**
   * Optional actions to display in the header
   */
  actions?: ReactNode;

  /**
   * Optional description
   */
  description?: string;
}

/**
 * Enhanced container for widgets with improved styling
 */
const WidgetContainer: React.FC<WidgetContainerProps> = ({
  title,
  icon,
  className = "",
  testId = "widget-container",
  isLoading = false,
  error = null,
  children,
  actions,
  description,
}) => {
  // Extract CIA component type from className if present
  const isCIAComponent = className.includes("confidentiality")
    ? "confidentiality"
    : className.includes("integrity")
    ? "integrity"
    : className.includes("availability")
    ? "availability"
    : "";

  // Generate appropriate theme class
  const themeClass = isCIAComponent ? `widget-${isCIAComponent}` : "";

  return (
    <div
      className={`widget-container ${themeClass} ${className}`}
      data-testid={testId}
    >
      <div className="widget-header">
        <div className="widget-header-title">
          {icon && <span className="widget-icon">{icon}</span>}
          <h3 className="widget-title">{title}</h3>
        </div>

        {actions && <div className="widget-actions">{actions}</div>}
      </div>

      {description && (
        <div className="widget-description">
          <p>{description}</p>
        </div>
      )}

      <div className="widget-body">
        {isLoading ? (
          <div className="widget-loading">
            <LoadingSpinner size="medium" />
            <span>Loading...</span>
          </div>
        ) : error ? (
          <ErrorMessage
            error={typeof error === "string" ? error : error.message}
          />
        ) : (
          children
        )}
      </div>
    </div>
  );
};

export default WidgetContainer;
