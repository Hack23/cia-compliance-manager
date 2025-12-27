/**
 * # Enhanced Error Boundary Component
 *
 * Custom error boundary with recovery options, user-friendly error display,
 * and integration with centralized error service.
 *
 * ## Business Perspective
 * Prevents component failures from crashing the entire application, ensuring
 * users can continue working even when individual components encounter errors.
 * Provides clear error messages and recovery options. Critical for operational
 * continuity and user trust. 🛡️
 *
 * ## Technical Perspective
 * React Error Boundary that catches JavaScript errors in child components,
 * logs them via centralized error service, and displays a fallback UI with
 * recovery options. Supports custom fallback components and error callbacks.
 *
 * @packageDocumentation
 */

import React, { Component, ReactNode } from 'react';
import { errorService, ErrorSeverity } from '../../services/errorService';
import ErrorFallback from './ErrorFallback';

/**
 * Props for ErrorBoundary component
 */
export interface ErrorBoundaryProps {
  /**
   * Child components to wrap with error boundary
   */
  children: ReactNode;
  
  /**
   * Optional custom fallback component to display on error
   */
  fallback?: (error: Error, reset: () => void) => ReactNode;
  
  /**
   * Optional callback when an error is caught
   */
  onError?: (error: Error, errorInfo: React.ErrorInfo) => void;
  
  /**
   * Optional component name for error messages
   */
  componentName?: string;
  
  /**
   * Optional test ID for automated testing
   */
  testId?: string;
  
  /**
   * Whether to show technical details in error messages
   * @default false
   */
  showTechnicalDetails?: boolean;
  
  /**
   * Whether to allow reset/retry
   * @default true
   */
  allowReset?: boolean;
}

/**
 * State for ErrorBoundary component
 */
interface ErrorBoundaryState {
  hasError: boolean;
  error?: Error;
  errorInfo?: React.ErrorInfo;
}

/**
 * Enhanced Error Boundary Component
 *
 * Catches errors in child components and displays user-friendly error UI
 * with recovery options. Integrates with centralized error service for
 * consistent error handling and logging.
 *
 * @example
 * ```tsx
 * // Basic usage
 * <ErrorBoundary>
 *   <SecurityMetricsWidget />
 * </ErrorBoundary>
 *
 * // With custom component name
 * <ErrorBoundary componentName="Security Metrics Widget">
 *   <SecurityMetricsWidget />
 * </ErrorBoundary>
 *
 * // With custom fallback
 * <ErrorBoundary
 *   fallback={(error, reset) => (
 *     <CustomErrorUI error={error} onReset={reset} />
 *   )}
 * >
 *   <ComplianceWidget />
 * </ErrorBoundary>
 *
 * // With error callback and technical details
 * <ErrorBoundary
 *   componentName="Business Impact Widget"
 *   onError={(error, info) => trackError(error, info)}
 *   showTechnicalDetails={true}
 * >
 *   <BusinessImpactWidget />
 * </ErrorBoundary>
 * ```
 */
export class ErrorBoundary extends Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  /**
   * Update state when an error is caught
   */
  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  /**
   * Log error information and call optional callback
   */
  componentDidCatch(error: Error, errorInfo: React.ErrorInfo): void {
    const { componentName, onError } = this.props;
    
    // Store error info in state for display
    this.setState({ errorInfo });
    
    // Log using centralized error service
    const severity = errorService.getErrorSeverity(error);
    errorService.logError(
      error,
      {
        component: componentName || 'Unknown Component',
        errorBoundary: 'ErrorBoundary',
        componentStack: errorInfo.componentStack,
      },
      severity
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
    this.setState({ 
      hasError: false, 
      error: undefined,
      errorInfo: undefined 
    });
  };

  render(): ReactNode {
    const { hasError, error, errorInfo } = this.state;
    const {
      children,
      fallback,
      componentName,
      testId = 'error-boundary',
      showTechnicalDetails = false,
      allowReset = true,
    } = this.props;

    if (hasError && error) {
      // Use custom fallback if provided
      if (fallback) {
        return fallback(error, this.resetError);
      }

      // Check if error is recoverable
      const recoverable = errorService.canRecover(error);
      const userMessage = errorService.getUserFriendlyMessage(error);
      
      // Default error UI using ErrorFallback component
      return (
        <div data-testid={testId}>
          <ErrorFallback
            title={componentName ? `${componentName} Error` : 'Component Error'}
            message={userMessage}
            error={error}
            errorInfo={errorInfo}
            onReset={allowReset && recoverable ? this.resetError : undefined}
            showTechnicalDetails={showTechnicalDetails}
            testId={`${testId}-fallback`}
          />
        </div>
      );
    }

    return children;
  }
}

export default ErrorBoundary;
