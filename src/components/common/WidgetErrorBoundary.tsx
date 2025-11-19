import React, { Component, ReactNode } from 'react';
import ErrorMessage from './ErrorMessage';
import logger from '../../utils/logger';

/**
 * Props for WidgetErrorBoundary component
 */
export interface WidgetErrorBoundaryProps {
  /**
   * Child components to wrap with error boundary
   */
  children: ReactNode;
  
  /**
   * Optional custom fallback component to display on error
   */
  fallback?: ReactNode;
  
  /**
   * Optional callback when an error is caught
   */
  onError?: (error: Error, errorInfo: React.ErrorInfo) => void;
  
  /**
   * Optional widget name for error messages
   */
  widgetName?: string;
  
  /**
   * Optional test ID for automated testing
   */
  testId?: string;
}

/**
 * State for WidgetErrorBoundary component
 */
interface WidgetErrorBoundaryState {
  hasError: boolean;
  error?: Error;
}

/**
 * Error boundary component for wrapping widgets
 * 
 * ## Business Perspective
 * 
 * Prevents widget failures from crashing the entire application, ensuring
 * users can continue working even when individual components encounter errors.
 * Critical for maintaining operational continuity and user trust. 🛡️
 * 
 * ## Technical Perspective
 * 
 * React Error Boundary that catches JavaScript errors in child components,
 * logs them, and displays a fallback UI. Implements the error boundary
 * lifecycle methods to gracefully handle rendering errors.
 * 
 * Per React best practices, error boundaries catch errors during:
 * - Rendering
 * - Lifecycle methods
 * - Constructors of child components
 * 
 * They do NOT catch errors in:
 * - Event handlers (use try-catch)
 * - Asynchronous code (use try-catch)
 * - Server-side rendering
 * - Errors in the error boundary itself
 * 
 * @example
 * ```tsx
 * // Basic usage
 * <WidgetErrorBoundary>
 *   <SecurityMetricsWidget />
 * </WidgetErrorBoundary>
 * 
 * // With custom fallback
 * <WidgetErrorBoundary fallback={<CustomErrorUI />}>
 *   <ComplianceWidget />
 * </WidgetErrorBoundary>
 * 
 * // With error callback and widget name
 * <WidgetErrorBoundary 
 *   widgetName="Security Metrics"
 *   onError={(error, info) => logError(error, info)}
 * >
 *   <SecurityMetricsWidget />
 * </WidgetErrorBoundary>
 * ```
 */
export class WidgetErrorBoundary extends Component<
  WidgetErrorBoundaryProps,
  WidgetErrorBoundaryState
> {
  constructor(props: WidgetErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  /**
   * Update state when an error is caught
   */
  static getDerivedStateFromError(error: Error): WidgetErrorBoundaryState {
    return { hasError: true, error };
  }

  /**
   * Log error information and call optional callback
   */
  componentDidCatch(error: Error, errorInfo: React.ErrorInfo): void {
    const { widgetName, onError } = this.props;
    
    // Log using centralized logger for debugging
    logger.error(
      `WidgetErrorBoundary caught error${widgetName ? ` in ${widgetName}` : ''}`,
      { error, errorInfo }
    );
    
    // Call optional error callback
    if (onError) {
      onError(error, errorInfo);
    }
  }

  /**
   * Reset error state (for retry functionality)
   */
  private resetError = (): void => {
    this.setState({ hasError: false, error: undefined });
  };

  render(): ReactNode {
    const { hasError, error } = this.state;
    const { children, fallback, widgetName, testId = 'widget-error-boundary' } = this.props;

    if (hasError) {
      // Use custom fallback if provided
      if (fallback) {
        return fallback;
      }

      // Default error UI using ErrorMessage component
      return (
        <div data-testid={testId} className="p-4">
          <ErrorMessage
            title={widgetName ? `${widgetName} Error` : 'Widget Error'}
            message={error?.message || 'An unexpected error occurred in this widget'}
            retry={this.resetError}
            testId={`${testId}-message`}
          />
        </div>
      );
    }

    return children;
  }
}

export default WidgetErrorBoundary;
