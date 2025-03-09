import { CIADetails } from "./cia";
import { SecurityLevel } from "./cia";

/**
 * Base properties for all widgets
 */
export interface WidgetBaseProps {
  /** Test ID for component selection in tests */
  testId?: string;
  availabilityLevel: string;
  integrityLevel: string;
  confidentialityLevel: string;
  className?: string;
  securityLevel?: string; // Add this property
}

/**
 * Generic details interface that all specific detail interfaces should extend
 * This ensures compatibility across different widget implementations
 */
export interface BaseWidgetDetails {
  description?: string;
  businessImpact?: string;
  impact?: string;
  technical?: string;
  recommendations?: string[];
  [key: string]: unknown; // Allow additional properties with stricter type
}

/**
 * Props for the CostEstimationWidget component
 */
export interface CostEstimationWidgetProps extends WidgetBaseProps {
  /** Total capital expenditure as percentage of IT budget */
  totalCapex: number;
  /** Total operational expenditure as percentage of IT budget */
  totalOpex: number;
  /** Formatted capital expenditure estimate */
  capexEstimate: string;
  /** Formatted operational expenditure estimate */
  opexEstimate: string;
  /** Whether this is a small solution (affects cost calculations) */
  isSmallSolution: boolean;
  /** Return on investment estimate */
  roi?: string;
  /** Implementation time estimate */
  implementationTime?: string;
  /** Availability options */
  availabilityOptions?: Record<string, CIADetails>;
  /** Integrity options */
  integrityOptions?: Record<string, CIADetails>;
  /** Confidentiality options */
  confidentialityOptions?: Record<string, CIADetails>;
}

/**
 * Props for the ValueCreationWidget component
 */
export interface ValueCreationWidgetProps extends WidgetBaseProps {
  /** Overall security level */
  securityLevel: string;
}

/**
 * Props for the SecuritySummaryWidget component
 */
export interface SecuritySummaryWidgetProps {
  securityLevel: SecurityLevel;
  availabilityLevel: SecurityLevel;
  integrityLevel: SecurityLevel;
  confidentialityLevel: SecurityLevel;
  // ...other existing props...
}

/**
 * Props for ComplianceStatusWidget component
 */
export interface ComplianceStatusWidgetProps extends WidgetBaseProps {
  /** Overall security level */
  securityLevel?: string;
}

/**
 * Types for Integrity Impact Widget
 * Compatible with CIADetails for easier integration
 */
export interface IntegrityDetail extends BaseWidgetDetails {
  description: string;
  businessImpact: string;
  validationMethod?: string;
  recommendations: string[];
  technicalControls?: string[];
  complianceImplications?: string;
}

/**
 * Props for the IntegrityImpactWidget component
 */
export interface IntegrityImpactWidgetProps extends WidgetBaseProps {
  integrityLevel: SecurityLevel;
  // Change the optional fields to align with WidgetBaseProps constraint
  availabilityLevel: SecurityLevel;
  confidentialityLevel: SecurityLevel;
  className?: string;
  testId?: string;
}

/**
 * Types for Confidentiality Impact Widget
 * Compatible with CIADetails for easier integration
 */
export interface ConfidentialityDetail extends BaseWidgetDetails {
  impact: string;
  businessImpact: string;
  recommendations: string[];
  technicalMeasures?: string[];
  complianceImplications?: string;
  riskLevel?: string;
}

/**
 * Props for the ConfidentialityImpactWidget component
 */
export interface ConfidentialityImpactWidgetProps extends WidgetBaseProps {
  confidentialityLevel: SecurityLevel;
  // Change the optional fields to align with WidgetBaseProps constraint
  availabilityLevel: SecurityLevel;
  integrityLevel: SecurityLevel;
  className?: string;
  testId?: string;
}

/**
 * Types for Availability Impact Widget
 * Compatible with CIADetails for easier integration
 */
export interface AvailabilityDetail extends BaseWidgetDetails {
  description: string;
  businessImpact: string;
  uptime: string;
  recommendations: string[];
  mttr?: string;
  rto?: string;
  rpo?: string;
}

/**
 * Props for the AvailabilityImpactWidget component
 */
export interface AvailabilityImpactWidgetProps extends WidgetBaseProps {
  /** Options for each level - optional when using ciaContentService */
  options?: Record<string, AvailabilityDetail | CIADetails>;
}

/**
 * Props for the SecurityResourcesWidget component
 */
export interface SecurityResourcesWidgetProps extends WidgetBaseProps {
  /** Overall security level */
  securityLevel: string;
}

/**
 * Props for the TechnicalDetailsWidget component
 */
export interface TechnicalDetailsWidgetProps extends WidgetBaseProps {
  /** Availability options for specific technical details */
  availabilityOptions?: Record<string, CIADetails>;
  /** Integrity options for specific technical details */
  integrityOptions?: Record<string, CIADetails>;
  /** Confidentiality options for specific technical details */
  confidentialityOptions?: Record<string, CIADetails>;
  /** Optional CSS class name */
  className?: string;
}

/**
 * Props for the BusinessImpactAnalysisWidget component
 */
export interface BusinessImpactAnalysisWidgetProps {
  availabilityLevel: SecurityLevel;
  integrityLevel: SecurityLevel;
  confidentialityLevel: SecurityLevel;
  securityLevel?: SecurityLevel; // Add securityLevel property to match component
  className?: string;
  testId?: string;
  activeComponent?: "availability" | "integrity" | "confidentiality";
}

/**
 * Props for the SecurityLevelWidget component
 */
export interface SecurityLevelWidgetProps extends WidgetBaseProps {
  setAvailability: (level: string) => void;
  setIntegrity: (level: string) => void;
  setConfidentiality: (level: string) => void;
}

/**
 * Type adapter functions to convert between different detail types
 */
export const typeAdapters = {
  /**
   * Converts CIADetails to IntegrityDetail
   */
  toIntegrityDetail(details: CIADetails): IntegrityDetail {
    return {
      description: details.description || "",
      businessImpact: details.businessImpact || "",
      validationMethod: details.validationMethod,
      recommendations: details.recommendations || [],
      // Force casting to specific type instead of using 'as'
      technicalControls: Array.isArray(details.technicalControls)
        ? details.technicalControls
        : undefined,
      complianceImplications:
        typeof details.complianceImplications === "string"
          ? details.complianceImplications
          : undefined,
    };
  },

  /**
   * Converts CIADetails to ConfidentialityDetail
   */
  toConfidentialityDetail(details: CIADetails): ConfidentialityDetail {
    return {
      impact: details.impact || details.description || "",
      businessImpact: details.businessImpact || "",
      recommendations: details.recommendations || [],
      // Force casting to specific type instead of using 'as'
      technicalMeasures: Array.isArray(details.technicalMeasures)
        ? details.technicalMeasures
        : undefined,
      complianceImplications:
        typeof details.complianceImplications === "string"
          ? details.complianceImplications
          : undefined,
      riskLevel:
        typeof details.riskLevel === "string" ? details.riskLevel : undefined,
    };
  },

  /**
   * Converts CIADetails to AvailabilityDetail
   */
  toAvailabilityDetail(details: CIADetails): AvailabilityDetail {
    return {
      description: details.description || "",
      businessImpact: details.businessImpact || "",
      uptime: details.uptime || "Unknown",
      recommendations: details.recommendations || [],
      // Force casting to specific type instead of using 'as'
      mttr: typeof details.mttr === "string" ? details.mttr : undefined,
      rto: typeof details.rto === "string" ? details.rto : undefined,
      rpo: typeof details.rpo === "string" ? details.rpo : undefined,
    };
  },
};
