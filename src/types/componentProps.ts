/**
 * This file defines component prop interfaces to ensure they're properly
 * included in the TypeDoc documentation.
 *
 * @packageDocumentation
 */

import React from "react";
import { CIADetails } from "./cia";
import { ReactNode } from "react";

/**
 * Props for the KeyValuePair component that displays a key-value combination.
 * @category Common Components
 * @interface KeyValuePairProps
 */
export interface KeyValuePairProps {
  /** Label to display for the key */
  label: string;
  /** Value to display */
  value: React.ReactNode;
  /** Optional CSS class name */
  className?: string;
  /** Optional test ID for component selection in tests */
  testId?: string;
  /** Whether to render in a horizontal layout */
  horizontal?: boolean;
}

/**
 * Props for the MetricsCard component that displays numerical metrics.
 * @category Common Components
 * @interface MetricsCardProps
 */
export interface MetricsCardProps {
  /** Title of the metrics card */
  title: string;
  /** Main value to display */
  value: React.ReactNode;
  /** Optional trend indicator (up/down) */
  trend?: "up" | "down" | "neutral";
  /** Optional CSS class name */
  className?: string;
  /** Optional test ID for component selection in tests */
  testId?: string;
}

/**
 * Props for the ValueDisplay component that formats and displays values.
 * @category Common Components
 * @interface ValueDisplayProps
 */
export interface ValueDisplayProps {
  /** Value to display */
  value: string | number;
  /** Optional prefix (e.g. "$") */
  prefix?: string;
  /** Optional suffix (e.g. "%") */
  suffix?: string;
  /** Optional CSS class name */
  className?: string;
  /** Optional test ID for component selection in tests */
  testId?: string;
}

/**
 * Props for the WidgetContainer component that provides a consistent container for widgets.
 * @category Common Components
 * @interface WidgetContainerProps
 */
export interface WidgetContainerProps {
  /** Title of the widget */
  title: string;
  /** Widget content */
  children: React.ReactNode;
  /** Optional CSS class name */
  className?: string;
  /** Optional test ID for component selection in tests */
  testId?: string;
  /** Icon to display in the header */
  icon?: string;
  loading?: boolean;
  error?: Error | null;
}

/**
 * Props for the WidgetHeader component that provides a consistent header for widgets.
 * @category Common Components
 * @interface WidgetHeaderProps
 */
export interface WidgetHeaderProps {
  /** Title of the widget */
  title: string;
  /** Optional CSS class name */
  className?: string;
  /** Optional test ID for component selection in tests */
  testId?: string;
  /** Icon to display in the header */
  icon?: string;
}

/**
 * Props for the Dashboard component that serves as the main application interface.
 * @category Main Components
 * @interface DashboardProps
 */
export interface DashboardProps {
  /** Dashboard content */
  children?: React.ReactNode;
  /** Whether to use widget registry */
  useRegistry?: boolean;
  /** Availability security level */
  availability?: string;
  /** Integrity security level */
  integrity?: string;
  /** Confidentiality security level */
  confidentiality?: string;
  /** Number of columns for small widgets */
  columnsSmall?: number;
  /** Number of columns for medium widgets */
  columnsMedium?: number;
  /** Number of columns for large widgets */
  columnsLarge?: number;
  /** Optional CSS class name */
  className?: string;
  /** Whether to use compact mode */
  compact?: boolean;
  /** Whether to show borders */
  showBorders?: boolean;
}

/**
 * Props for the DashboardWidget component that displays widgets within the dashboard.
 * @category Main Components
 * @interface DashboardWidgetProps
 */
export interface DashboardWidgetProps {
  /** Widget ID */
  id: string;
  /** Widget title */
  title: string;
  /** Widget component */
  component: React.ComponentType<any>;
  /** Widget props */
  props?: Record<string, any>;
  /** Optional position */
  position?: number;
  /** Widget size */
  size?: "small" | "medium" | "large" | "full";
}

/**
 * Props for the RadarChart component that visualizes security levels.
 * @category Main Components
 * @interface RadarChartProps
 */
export interface RadarChartProps {
  /** Availability security level */
  availability: string;
  /** Integrity security level */
  integrity: string;
  /** Confidentiality security level */
  confidentiality: string;
  /** Optional CSS class name */
  className?: string;
  /** Optional test ID for component selection in tests */
  testId?: string;
}

/**
 * Props for the Selection component that allows users to select security levels.
 * @category Main Components
 * @interface SelectionProps
 */
export interface SelectionProps {
  /** Selected security level */
  value: string;
  /** Options for selection */
  options: string[];
  /** Change handler */
  onChange: (value: string) => void;
  /** Label for the selection */
  label: string;
  /** Optional CSS class name */
  className?: string;
  /** Optional test ID for component selection in tests */
  testId?: string;
}

/**
 * Props for the BusinessImpactAnalysisWidget component that displays business impact analysis.
 * @category Widget Components
 * @interface BusinessImpactAnalysisWidgetProps
 */
export interface BusinessImpactAnalysisWidgetProps {
  /** Category (Availability, Integrity, Confidentiality) */
  category: "Availability" | "Integrity" | "Confidentiality";
  /** Security level */
  level: string;
  /** Security level options */
  options?: Record<string, CIADetails>;
  /** Optional test ID for component selection in tests */
  testId?: string;
}

/**
 * Props for the CIAImpactSummaryWidget component that summarizes CIA impacts.
 * @category Widget Components
 * @interface CIAImpactSummaryWidgetProps
 */
export interface CIAImpactSummaryWidgetProps {
  /** Availability security level */
  availability: string;
  /** Integrity security level */
  integrity: string;
  /** Confidentiality security level */
  confidentiality: string;
  /** Optional CSS class name */
  className?: string;
  /** Optional test ID for component selection in tests */
  testId?: string;
}

/**
 * Props for the ComplianceStatusWidget component that displays compliance status.
 * @category Widget Components
 * @interface ComplianceStatusWidgetProps
 */
export interface ComplianceStatusWidgetProps {
  /** Overall security level */
  securityLevel?: string;
  /** Availability security level */
  availabilityLevel?: string;
  /** Integrity security level */
  integrityLevel?: string;
  /** Confidentiality security level */
  confidentialityLevel?: string;
  /** Backward compatibility for availability */
  availability?: string;
  /** Backward compatibility for integrity */
  integrity?: string;
  /** Backward compatibility for confidentiality */
  confidentiality?: string;
  /** Optional test ID for component selection in tests */
  testId?: string;
}

/**
 * Props for the CostEstimationWidget component that displays cost estimates.
 * @category Widget Components
 * @interface CostEstimationWidgetProps
 */
export interface CostEstimationWidgetProps {
  /** Total capital expenditure */
  totalCapex: number;
  /** Total operational expenditure */
  totalOpex: number;
  /** Capital expenditure estimate string */
  capexEstimate: string;
  /** Operational expenditure estimate string */
  opexEstimate: string;
  /** Whether the solution is small */
  isSmallSolution: boolean;
  /** Return on investment */
  roi?: string;
  /** Implementation time */
  implementationTime?: string;
  /** Optional test ID for component selection in tests */
  testId?: string;
}

/**
 * Props for the SecurityLevelWidget component that displays security levels.
 * @category Widget Components
 * @interface SecurityLevelWidgetProps
 */
export interface SecurityLevelWidgetProps {
  /** Security level */
  securityLevel: string;
  /** Availability level */
  availabilityLevel?: string;
  /** Integrity level */
  integrityLevel?: string;
  /** Confidentiality level */
  confidentialityLevel?: string;
  /** Optional CSS class name */
  className?: string;
  /** Optional test ID for component selection in tests */
  testId?: string;
}

/**
 * Props for the TechnicalDetailsWidget component that displays technical implementation details.
 * @category Widget Components
 * @interface TechnicalDetailsWidgetProps
 */
export interface TechnicalDetailsWidgetProps {
  /** Availability security level */
  availabilityLevel?: string;
  /** Integrity security level */
  integrityLevel?: string;
  /** Confidentiality security level */
  confidentialityLevel?: string;
  /** Backward compatibility availability security level */
  availability?: string;
  /** Backward compatibility integrity security level */
  integrity?: string;
  /** Backward compatibility confidentiality security level */
  confidentiality?: string;
  /** Availability options */
  availabilityOptions?: Record<string, CIADetails>;
  /** Integrity options */
  integrityOptions?: Record<string, CIADetails>;
  /** Confidentiality options */
  confidentialityOptions?: Record<string, CIADetails>;
  /** Optional CSS class name */
  className?: string;
  /** Optional test ID for component selection in tests */
  testId?: string;
}

/**
 * Props for the IntegrityImpactWidget component
 * @interface IntegrityImpactWidgetProps
 */
export interface IntegrityImpactWidgetProps {
  level?: string;
  options?: Record<string, CIADetails>;
  testId?: string;
}

/**
 * Props for the ConfidentialityImpactWidget component
 * @interface ConfidentialityImpactWidgetProps
 */
export interface ConfidentialityImpactWidgetProps {
  level?: string;
  options?: Record<string, CIADetails>;
  testId?: string;
}

/**
 * Props for the AvailabilityImpactWidget component
 * @interface AvailabilityImpactWidgetProps
 */
export interface AvailabilityImpactWidgetProps {
  level?: string;
  options?: Record<string, CIADetails>;
  testId?: string;
}

/**
 * Props for the SecurityResourcesWidget component
 * @interface SecurityResourcesWidgetProps
 */
export interface SecurityResourcesWidgetProps {
  securityLevel?: string;
  testId?: string;
}

/**
 * Props for the TechnicalDetailsWidget component
 * @interface TechnicalDetailsWidgetProps
 */
export interface TechnicalDetailsWidgetProps {
  availabilityLevel?: string;
  integrityLevel?: string;
  confidentialityLevel?: string;
  availability?: string; // For backward compatibility
  integrity?: string; // For backward compatibility
  confidentiality?: string; // For backward compatibility
  availabilityOptions?: Record<string, CIADetails>;
  integrityOptions?: Record<string, CIADetails>;
  confidentialityOptions?: Record<string, CIADetails>;
  testId?: string;
}

/**
 * Props for the BusinessImpactAnalysisWidget component
 * @interface BusinessImpactAnalysisWidgetProps
 */
export interface BusinessImpactAnalysisWidgetProps {
  availability?: string;
  integrity?: string;
  confidentiality?: string;
  securityLevel?: string;
  testId?: string;
}

export interface SecuritySummaryWidgetProps {
  securityLevel: string;
  availabilityLevel: string;
  integrityLevel: string;
  confidentialityLevel: string;
  testId?: string;
}
