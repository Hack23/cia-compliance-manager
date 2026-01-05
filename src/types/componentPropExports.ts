/**
 * # Component Props Type Exports
 *
 * This file centralizes component prop type exports to ensure they're
 * properly documented and available for type checking.
 *
 * ## Business Perspective
 * Standardized prop types ensure consistent component behavior and integration
 * across the CIA compliance visualization tools. 📝
 *
 * @packageDocumentation
 */

// Import common component prop interfaces
import type { ReactNode } from "react";
import { CIAComponent, SecurityLevel } from "./cia";
import { BusinessImpactDetails } from "./cia-services";
import { TechnicalImplementationDetails } from "./cia-services";

/**
 * Valid color values for CIA component visualizations
 * Limited to colors actually used by CIA components (Availability=blue, Integrity=green, Confidentiality=orange)
 */
export type CIAComponentColor = "blue" | "green" | "orange";

/**
 * Props for the BusinessImpactSection component
 * @property {BusinessImpactDetails} impact - Business impact data to display
 * @property {CIAComponentColor} color - Color theme for the section (blue, green, or orange)
 * @property {string} [testId] - Optional test ID for testing purposes
 */
export interface BusinessImpactSectionProps {
  impact: BusinessImpactDetails;
  color: CIAComponentColor;
  testId?: string;
}

export interface BusinessRiskDisplayProps {
  riskLevel: string;
  description?: string;
  showIcon?: boolean;
  className?: string;
  testId?: string;
}

export interface CIAImpactCardProps {
  title: string;
  description: string;
  icon: string;
  value: string;
  impact?: string;
  color?: string;
  testId?: string;
}

export interface CodeBlockProps {
  /**
   * The code content to display
   */
  code: string;
  
  /**
   * The programming language for syntax highlighting
   * @example "typescript", "javascript", "python", "bash"
   */
  language?: string;
  
  /**
   * Whether to show line numbers
   * @default false
   */
  showLineNumbers?: boolean;
  
  /**
   * Whether to show a copy button
   * @default true
   */
  copyable?: boolean;
  
  /**
   * Additional CSS classes
   */
  className?: string;
  
  /**
   * Test ID for testing
   */
  testId?: string;
}

export interface ImplementationGuidancePanelProps {
  /**
   * Implementation guides for the CIA components
   */
  implementationGuides: (TechnicalImplementationDetails | undefined)[];

  /**
   * The selected availability level
   */
  availabilityLevel: SecurityLevel;

  /**
   * The selected integrity level
   */
  integrityLevel: SecurityLevel;

  /**
   * The selected confidentiality level
   */
  confidentialityLevel: SecurityLevel;

  /**
   * Additional CSS classes
   */
  className?: string;

  /**
   * Test ID for testing
   */
  testId?: string;
}

export interface KeyValuePairProps {
  label: string;
  value: string | number | React.ReactNode;
  className?: string;
  testId?: string;
}

export interface MetricsCardProps {
  title: string;
  value: string | number;
  icon?: string;
  description?: string;
  testId?: string;
  className?: string;
}

export interface RiskAssessmentProps {
  riskLevel: string;
  description?: string;
  recommendations?: string[];
  showIcon?: boolean;
  className?: string;
  testId?: string;
}

export interface RiskLevelBadgeProps {
  level: string;
  showIcon?: boolean;
  className?: string;
  testId?: string;
}

export interface SecurityLevelBadgeProps {
  level: SecurityLevel;
  category?: CIAComponent | string;
  showIcon?: boolean;
  colorClass?: string;
  textClass?: string;
  className?: string;
  testId?: string;
}

export interface SecurityLevelSummaryItemProps {
  label: string;
  value: SecurityLevel;
  icon?: string;
  testId?: string;
  color?: string;
  borderColor?: string;
  compact?: boolean;
}

export interface SecurityRiskScoreProps {
  score: number;
  maxScore?: number;
  label?: string;
  size?: "sm" | "md" | "lg";
  showPercentage?: boolean;
  className?: string;
  testId?: string;
}

export interface StatusBadgeProps {
  status: string;
  variant?: "success" | "warning" | "error" | "info" | "neutral" | "purple";
  className?: string;
  testId?: string;
}

export interface TabProps {
  label: string;
  value: string;
  isActive?: boolean;
  onClick: (value: string) => void;
  testId?: string;
}

export interface ThemeToggleProps {
  isDarkMode: boolean;
  onToggle: () => void;
  className?: string;
  testId?: string;
}

export interface TooltipProps {
  content: React.ReactNode;
  children: React.ReactElement;
  className?: string;
  testId?: string;
}

export interface WidgetActionButtonProps {
  icon: string;
  onClick: () => void;
  label: string;
  testId?: string;
}

export interface WidgetActionsProps {
  actions: WidgetActionButtonProps[];
  className?: string;
  testId?: string;
}

export interface WidgetHeaderProps {
  title: string;
  subtitle?: string;
  icon?: string;
  actions?: WidgetActionButtonProps[];
  className?: string;
  testId?: string;
}

// Chart component props
export interface RadarChartProps {
  availabilityLevel: SecurityLevel;
  integrityLevel: SecurityLevel;
  confidentialityLevel: SecurityLevel;
  className?: string;
  testId?: string;
}

// Security level component props
export interface SecurityLevelSelectorProps {
  component: "availability" | "integrity" | "confidentiality";
  selectedLevel: SecurityLevel;
  onLevelChange: (level: SecurityLevel) => void;
  mode?: "horizontal" | "vertical";
  highlight?: boolean;
  compact?: boolean;
  disabled?: boolean;
  testId?: string;
}

export interface SelectionProps {
  value: string;
  options: string[];
  onChange: (value: string) => void;
  label: string;
  className?: string;
  testId?: string;
}

// Performance component props
export interface SecurityLevelChangeTrackerProps {
  showPerformance?: boolean;
  children: React.ReactNode;
  testId?: string;
}

// Context props
export interface SecurityLevelContextType {
  availabilityLevel: SecurityLevel;
  integrityLevel: SecurityLevel;
  confidentialityLevel: SecurityLevel;
  setAvailabilityLevel: (level: SecurityLevel) => void;
  setIntegrityLevel: (level: SecurityLevel) => void;
  setConfidentialityLevel: (level: SecurityLevel) => void;
}

export interface SecurityLevelProviderProps {
  children: React.ReactNode;
  initialAvailability?: SecurityLevel;
  initialIntegrity?: SecurityLevel;
  initialConfidentiality?: SecurityLevel;
}

// Hook options
export interface UseSecurityLevelStateOptions {
  availabilityLevel?: SecurityLevel;
  integrityLevel?: SecurityLevel;
  confidentialityLevel?: SecurityLevel;
  onAvailabilityChange?: (level: SecurityLevel) => void;
  onIntegrityChange?: (level: SecurityLevel) => void;
  onConfidentialityChange?: (level: SecurityLevel) => void;
}

// Export WidgetContainerProps which was missing
export interface WidgetContainerProps {
  children: ReactNode;
  className?: string;
  testId?: string;
}

// Error handling component props
export interface ErrorMessageProps {
  /**
   * Error title
   * @default 'Error'
   */
  title?: string;
  
  /**
   * Error message to display
   */
  message: string;
  
  /**
   * Optional retry callback function
   */
  retry?: () => void;
  
  /**
   * Optional test ID for automated testing
   */
  testId?: string;
  
  /**
   * Optional CSS class name
   */
  className?: string;
}

export interface LoadingSpinnerProps {
  /**
   * Size of the spinner
   * @default 'md'
   */
  size?: 'sm' | 'md' | 'lg';
  
  /**
   * Optional test ID for automated testing
   */
  testId?: string;
  
  /**
   * Optional CSS class name
   */
  className?: string;
}

export interface LoadingSkeletonProps {
  /**
   * Number of skeleton lines to display
   * @default 3
   */
  lines?: number;
  
  /**
   * Optional test ID for automated testing
   */
  testId?: string;
  
  /**
   * Optional CSS class name
   */
  className?: string;
}

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

export interface WidgetSectionProps {
  /**
   * Section title
   */
  title: string;
  
  /**
   * Section content
   */
  children: ReactNode;
  
  /**
   * Optional subtitle
   */
  subtitle?: string;
  
  /**
   * Optional icon
   */
  icon?: ReactNode;
  
  /**
   * Optional CSS class
   */
  className?: string;
  
  /**
   * Test ID
   */
  testId?: string;
  
  /**
   * Optional aria-labelledby for accessibility
   */
  ariaLabelledBy?: string;
  
  /**
   * Section background color variant
   */
  variant?: 'default' | 'primary' | 'success' | 'info' | 'warning' | 'error';
}

export interface MetricCardProps {
  /**
   * Metric label
   */
  label: string;
  
  /**
   * Metric value
   */
  value: string | number;
  
  /**
   * Optional unit (e.g., '%', '$')
   */
  unit?: string;
  
  /**
   * Optional icon
   */
  icon?: ReactNode;
  
  /**
   * Optional description/subtitle
   */
  description?: string;
  
  /**
   * Optional color variant
   */
  variant?: 'default' | 'primary' | 'success' | 'warning' | 'error' | 'info';
  
  /**
   * Test ID
   */
  testId?: string;
  
  /**
   * Optional CSS class
   */
  className?: string;
  
  /**
   * Optional aria-label for accessibility
   */
  ariaLabel?: string;
}

// ============================================================================
// STANDARDIZED WIDGET PROP INTERFACES
// ============================================================================

// Export all standardized widget prop interfaces from widget-props
export type {
  // Base interfaces
  BaseWidgetProps,
  CIAComponentWidgetProps,
  SecurityLevelChangeWidgetProps,
  AllCIAComponentsProps,
  
  // Utility types
  CIALevelsOnly,
  PartialCIALevels,
  WidgetPropsWithLoading,
  
  // Assessment Center widgets
  SecurityLevelWidgetProps,
  SecuritySummaryWidgetProps,
  BusinessImpactAnalysisWidgetProps,
  
  // Business Value widgets
  CostEstimationWidgetProps,
  ComplianceStatusWidgetProps,
  ValueCreationWidgetProps,
  
  // Impact Analysis widgets
  AvailabilityImpactWidgetProps,
  IntegrityImpactWidgetProps,
  ConfidentialityImpactWidgetProps,
  ImpactWidgetProps,
  
  // Implementation Guide widgets
  TechnicalDetailsWidgetProps,
  SecurityResourcesWidgetProps,
  SecurityVisualizationWidgetProps,
} from './widget-props';

/**
 * Skeleton variant types for different widget layouts
 */
export type SkeletonVariant = 'summary' | 'chart' | 'list' | 'metrics' | 'tabs' | 'default';

/**
 * Props for LoadingSkeleton component
 */
export interface LoadingSkeletonProps {
  /**
   * Number of skeleton lines to display (used for 'default' variant)
   * @default 3
   */
  lines?: number;
  
  /**
   * Skeleton variant for different widget types
   * @default 'default'
   */
  variant?: SkeletonVariant;
  
  /**
   * Optional test ID for automated testing
   */
  testId?: string;
  
  /**
   * Optional CSS class name
   */
  className?: string;
}
