import { SecurityLevel } from "./cia";
import { BusinessImpactDetails, CIADetails, ROIEstimate, TechnicalImplementationDetails } from "./cia-services";

/**
 * Widget-specific interfaces that extend or use the core CIA types
 * 
 * ## Business Perspective
 * 
 * These interfaces support the visual representation of security controls,
 * providing stakeholders with an intuitive way to understand security impact. 📊
 */

// Common widget props interface
export interface WidgetProps {
  className?: string;
  testId?: string;
}

// Security level widget props
export interface SecurityLevelWidgetProps extends WidgetProps {
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
export interface BusinessImpactAnalysisWidgetProps extends WidgetProps {
  availabilityLevel: SecurityLevel;
  integrityLevel: SecurityLevel;
  confidentialityLevel: SecurityLevel;
  businessImpact?: BusinessImpactDetails;
}

// Compliance status widget props
export interface ComplianceStatusWidgetProps extends WidgetProps {
  availabilityLevel: SecurityLevel;
  integrityLevel: SecurityLevel;
  confidentialityLevel: SecurityLevel;
  showRequirements?: boolean;
}

// Value creation widget props
export interface ValueCreationWidgetProps extends WidgetProps {
  securityLevel: SecurityLevel;
  availabilityLevel: SecurityLevel;
  integrityLevel: SecurityLevel;
  confidentialityLevel: SecurityLevel;
  roi?: ROIEstimate;
}

// Cost estimation widget props
export interface CostEstimationWidgetProps extends WidgetProps {
  availabilityLevel: SecurityLevel;
  integrityLevel: SecurityLevel;
  confidentialityLevel: SecurityLevel;
}

// Technical details widget props
export interface TechnicalDetailsWidgetProps extends WidgetProps {
  availabilityLevel: SecurityLevel;
  integrityLevel: SecurityLevel;
  confidentialityLevel: SecurityLevel;
  implementationDetails?: TechnicalImplementationDetails;
}

// CIA Impact summary widget props
export interface CIAImpactSummaryWidgetProps extends WidgetProps {
  availabilityLevel: SecurityLevel;
  integrityLevel: SecurityLevel;
  confidentialityLevel: SecurityLevel;
}

// Security visualization widget props
export interface SecurityVisualizationWidgetProps extends WidgetProps {
  availabilityLevel: SecurityLevel;
  integrityLevel: SecurityLevel;
  confidentialityLevel: SecurityLevel;
  chartType?: 'radar' | 'bar' | 'gauge';
}

// Security resources widget props
export interface SecurityResourcesWidgetProps extends WidgetProps {
  availabilityLevel: SecurityLevel;
  integrityLevel: SecurityLevel;
  confidentialityLevel: SecurityLevel;
  filter?: string;
  maxItems?: number;
}

// Security components
export interface SecurityComponentProps extends WidgetProps {
  component: "availability" | "integrity" | "confidentiality";
  level: SecurityLevel;
}

// Security level selector props
export interface SecurityLevelSelectorProps extends WidgetProps {
  selectedLevel: SecurityLevel;
  onLevelChange: (level: SecurityLevel) => void;
  component: "availability" | "integrity" | "confidentiality";
  mode?: "horizontal" | "vertical";
  highlight?: boolean;
  compact?: boolean;
  disabled?: boolean;
}

// Component impact props
export interface ComponentImpactWidgetProps extends WidgetProps {
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
export interface AvailabilityImpactWidgetProps extends WidgetProps {
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
export interface IntegrityImpactWidgetProps extends WidgetProps {
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
export interface ConfidentialityImpactWidgetProps extends WidgetProps {
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
export interface SecuritySummaryWidgetProps extends WidgetProps {
  availabilityLevel: SecurityLevel;
  integrityLevel: SecurityLevel;
  confidentialityLevel: SecurityLevel;
  securityLevel?: SecurityLevel;
}
