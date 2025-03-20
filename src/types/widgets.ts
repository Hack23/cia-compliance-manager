import { ReactNode } from "react";
import { SecurityLevel } from "./cia";
import { BusinessImpactDetails, CIADetails, ROIEstimate, TechnicalImplementationDetails } from "./cia-services";
import { CommonWidgetProps, WithSecurityLevelProps } from "./widget-props";

/**
 * Widget-specific interfaces that extend or use the core CIA types
 * 
 * ## Business Perspective
 * 
 * These interfaces support the visual representation of security controls,
 * providing stakeholders with an intuitive way to understand security impact. 📊
 */

/**
 * Base widget props shared by all widgets
 */
export interface BaseWidgetProps extends CommonWidgetProps {
  /**
   * Optional children elements
   */
  children?: ReactNode;
}

/**
 * Props for security-related widgets
 */
export interface SecurityWidgetBaseProps extends WithSecurityLevelProps, BaseWidgetProps { }

/**
 * Props for widgets that display security summaries
 */
export interface SecuritySummaryWidgetProps extends SecurityWidgetBaseProps {
  /**
   * Optional overall security level
   */
  securityLevel?: SecurityLevel;
}

/**
 * Props for widgets that display security impacts
 */
export interface SecurityImpactWidgetProps extends SecurityWidgetBaseProps {
  /**
   * Optional level (for backward compatibility)
   */
  level?: SecurityLevel;
}

/**
 * Props for widgets that display business impacts
 */
export interface BusinessImpactWidgetProps extends SecurityWidgetBaseProps {
  /**
   * Optional ROI information
   */
  roi?: {
    value: string;
    description: string;
  };
}

/**
 * Props for widgets that display compliance status
 */
export interface ComplianceWidgetProps extends SecurityWidgetBaseProps {
  /**
   * Optional refresh trigger to reload data
   */
  refreshTrigger?: number;
}

/**
 * Base props for all widgets
 */
export interface WidgetBaseProps {
  /**
   * Optional CSS class name
   */
  className?: string;

  /**
   * Optional test ID for testing
   */
  testId?: string;

  /**
   * Optional security level for widgets that only need one level
   */
  securityLevel?: SecurityLevel;
}

/**
 * Alias type for WidgetBaseProps to maintain backward compatibility
 */
export type WidgetProps = WidgetBaseProps;

// Security level widget props
export interface SecurityLevelWidgetProps extends WidgetBaseProps {
  availabilityLevel: SecurityLevel;
  integrityLevel: SecurityLevel;
  confidentialityLevel: SecurityLevel;
  onLevelChange?: (component: "availability" | "integrity" | "confidentiality", level: SecurityLevel) => void;
  disabled?: boolean;
}

// Component detail interfaces
export interface AvailabilityDetail extends CIADetails {
  uptime: string;
  rto: string;
  rpo: string;
  mttr: string;
}

export interface IntegrityDetail extends CIADetails {
  validationMethod: string;
}

export interface ConfidentialityDetail extends CIADetails {
  protectionMethod: string;
}

// Business impact widget props
export interface BusinessImpactAnalysisWidgetProps extends WidgetBaseProps {
  availabilityLevel: SecurityLevel;
  integrityLevel: SecurityLevel;
  confidentialityLevel: SecurityLevel;
  businessImpact?: BusinessImpactDetails;
}

/**
 * Props for ComplianceStatusWidget component
 */
export interface ComplianceStatusWidgetProps extends WidgetBaseProps {
  /**
   * Availability security level
   */
  availabilityLevel?: SecurityLevel;

  /**
   * Integrity security level
   */
  integrityLevel?: SecurityLevel;

  /**
   * Confidentiality security level
   */
  confidentialityLevel?: SecurityLevel;
}

// Value creation widget props
export interface ValueCreationWidgetProps extends WidgetBaseProps {
  securityLevel: SecurityLevel;
  availabilityLevel: SecurityLevel;
  integrityLevel: SecurityLevel;
  confidentialityLevel: SecurityLevel;
  roi?: ROIEstimate;
}

// Cost estimation widget props
export interface CostEstimationWidgetProps extends WidgetBaseProps {
  availabilityLevel: SecurityLevel;
  integrityLevel: SecurityLevel;
  confidentialityLevel: SecurityLevel;
}

// Technical details widget props
export interface TechnicalDetailsWidgetProps extends WidgetBaseProps {
  availabilityLevel: SecurityLevel;
  integrityLevel: SecurityLevel;
  confidentialityLevel: SecurityLevel;
  implementationDetails?: TechnicalImplementationDetails;
}

// CIA Impact summary widget props
export interface CIAImpactSummaryWidgetProps extends WidgetBaseProps {
  availabilityLevel: SecurityLevel;
  integrityLevel: SecurityLevel;
  confidentialityLevel: SecurityLevel;
}

// Security visualization widget props
export interface SecurityVisualizationWidgetProps extends WidgetBaseProps {
  availabilityLevel: SecurityLevel;
  integrityLevel: SecurityLevel;
  confidentialityLevel: SecurityLevel;
  chartType?: 'radar' | 'bar' | 'gauge';
}

// Security resources widget props
export interface SecurityResourcesWidgetProps extends WidgetBaseProps {
  availabilityLevel: SecurityLevel;
  integrityLevel: SecurityLevel;
  confidentialityLevel: SecurityLevel;
  filter?: string;
  maxItems?: number;
}

// Security components
export interface SecurityComponentProps extends WidgetBaseProps {
  component: "availability" | "integrity" | "confidentiality";
  level: SecurityLevel;
}

// Security level selector props
export interface SecurityLevelSelectorProps extends WidgetBaseProps {
  selectedLevel: SecurityLevel;
  onLevelChange: (level: SecurityLevel) => void;
  component: "availability" | "integrity" | "confidentiality";
  mode?: "horizontal" | "vertical";
  highlight?: boolean;
  compact?: boolean;
  disabled?: boolean;
}

// Component impact props
export interface ComponentImpactWidgetProps extends WidgetBaseProps {
  level: SecurityLevel;
  componentType: "availability" | "integrity" | "confidentiality";
}

/**
 * Props for the CIA Impact Summary Widget
 */
export interface CIAImpactSummaryWidgetProps extends SecurityLevelWidgetProps {
  showDetails?: boolean;
}

/**
 * Props for the Availability Impact Widget
 */
export interface AvailabilityImpactWidgetProps extends WidgetBaseProps {
  // Keep level for backward compatibility
  level?: SecurityLevel;

  // New unified properties
  availabilityLevel: SecurityLevel;
  integrityLevel: SecurityLevel;
  confidentialityLevel: SecurityLevel;

  onLevelChange?: (level: SecurityLevel) => void;
}

/**
 * Props for the Integrity Impact Widget
 */
export interface IntegrityImpactWidgetProps extends WidgetBaseProps {
  // Keep level for backward compatibility
  level?: SecurityLevel;

  // New unified properties
  integrityLevel: SecurityLevel;
  availabilityLevel: SecurityLevel;
  confidentialityLevel: SecurityLevel;

  onLevelChange?: (level: SecurityLevel) => void;
}

/**
 * Props for the Confidentiality Impact Widget
 */
export interface ConfidentialityImpactWidgetProps extends WidgetBaseProps {
  // Keep level for backward compatibility
  level?: SecurityLevel;

  // New unified properties
  confidentialityLevel: SecurityLevel;
  availabilityLevel: SecurityLevel;
  integrityLevel: SecurityLevel;

  onLevelChange?: (level: SecurityLevel) => void;
}

/**
 * Props for the Security Summary Widget
 */
export interface SecuritySummaryWidgetProps extends WidgetBaseProps {
  availabilityLevel: SecurityLevel;
  integrityLevel: SecurityLevel;
  confidentialityLevel: SecurityLevel;
  securityLevel?: SecurityLevel;
}
