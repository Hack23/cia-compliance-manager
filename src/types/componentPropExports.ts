/**
 * Component prop exports for CIA Compliance Manager widgets
 *
 * ## Business Perspective
 * This module provides type definitions for all widget components,
 * enabling consistent prop interfaces across the application's security
 * dashboard components. 🔒
 *
 * @packageDocumentation
 */

import React from "react";
import { SecurityLevel } from "./cia";
import { CIAComponentType } from "./cia-services";

/**
 * Base widget props shared by most widgets
 */
export interface BaseWidgetProps {
  /** Availability security level */
  availabilityLevel?: SecurityLevel;
  /** Integrity security level */
  integrityLevel?: SecurityLevel;
  /** Confidentiality security level */
  confidentialityLevel?: SecurityLevel;
  /** Optional CSS class */
  className?: string;
  /** Test ID for testing */
  testId?: string;
}

/**
 * Props for widgets that focus on a single CIA component
 */
export interface SingleComponentWidgetProps {
  /** The CIA component being displayed */
  component?: CIAComponentType;
  /** Security level for the component */
  securityLevel?: SecurityLevel;
  /** Optional CSS class */
  className?: string;
  /** Test ID for testing */
  testId?: string;
}

/**
 * Props for RadarChart component
 */
export interface RadarChartProps {
  /** Data values for radar axes */
  values: number[];
  /** Labels for radar axes */
  labels?: string[];
  /** Chart title */
  title?: string;
  /** Chart size */
  size?: number;
  /** Whether to show legend */
  showLegend?: boolean;
  /** Optional CSS class */
  className?: string;
  /** Test ID for testing */
  testId?: string;
  /** Maximum value for scale */
  maxValue?: number;
  /** Color for radar area fill */
  color?: string;
}

/**
 * Props for SecurityRadarChart component
 */
export interface SecurityRadarChartProps {
  /** Availability security level */
  availabilityLevel: SecurityLevel;
  /** Integrity security level */
  integrityLevel: SecurityLevel;
  /** Confidentiality security level */
  confidentialityLevel: SecurityLevel;
  /** Optional CSS class */
  className?: string;
  /** Chart title */
  title?: string;
  /** Test ID for testing */
  testId?: string;
}

/**
 * Props for SecurityWidget component
 */
export interface SecurityWidgetProps {
  /** Widget title */
  title: string;
  /** Widget content */
  children?: React.ReactNode;
  /** Optional CSS class */
  className?: string;
  /** Optional icon */
  icon?: string;
  /** Test ID for testing */
  testId?: string;
}

/**
 * Props for SecurityMetricsWidget
 */
export interface SecurityMetricsWidgetProps extends BaseWidgetProps {
  /** Whether to show detailed metrics */
  showDetails?: boolean;
}

/**
 * Props for BusinessImpactWidget
 */
export interface BusinessImpactWidgetProps extends BaseWidgetProps {
  /** Component to focus on (optional) */
  focusComponent?: CIAComponentType;
}

/**
 * Props for ComplianceWidget
 */
export interface ComplianceWidgetProps extends BaseWidgetProps {
  /** Whether to show all frameworks */
  showAllFrameworks?: boolean;
}

/**
 * Props for TechnicalDetailsWidget
 */
export interface TechnicalDetailsWidgetProps extends BaseWidgetProps {
  /** Whether to show code examples */
  showCodeExamples?: boolean;
}

/**
 * Props for CostEstimationWidget
 */
export interface CostEstimationWidgetProps extends BaseWidgetProps {
  /** Budget in dollars (optional) */
  budget?: number;
}

/**
 * Props for RiskAssessmentWidget
 */
export interface RiskAssessmentWidgetProps extends BaseWidgetProps {
  /** Whether to show risk trends */
  showTrends?: boolean;
}

/**
 * Props for SecuritySummaryWidget
 */
export interface SecuritySummaryWidgetProps extends BaseWidgetProps {
  /** Whether to show detailed breakdown */
  showDetails?: boolean;
}
