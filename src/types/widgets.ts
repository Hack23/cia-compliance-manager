import { CIADetails } from "./cia";

/**
 * Base properties for all widgets
 */
export interface WidgetBaseProps {
  /** Test ID for component selection in tests */
  testId?: string;
}

export interface CostEstimationWidgetProps extends WidgetBaseProps {
  totalCapex: number;
  totalOpex: number;
  capexEstimate: string;
  opexEstimate: string;
  isSmallSolution: boolean;
  roi?: string;
  implementationTime?: string;
}

export interface ValueCreationWidgetProps extends WidgetBaseProps {
  securityLevel: string;
}

export interface SecuritySummaryWidgetProps extends WidgetBaseProps {
  securityLevel: string;
  availabilityLevel?: string; // Make this optional
  integrityLevel?: string; // Make this optional
  confidentialityLevel?: string; // Make this optional
}

export interface ComplianceStatusWidgetProps {
  securityLevel?: string;
  availabilityLevel?: string;
  integrityLevel?: string;
  confidentialityLevel?: string;
  availability?: string; // Add compatibility with older usages
  integrity?: string; // Add compatibility with older usages
  confidentiality?: string; // Add compatibility with older usages
  testId?: string;
}

/**
 * Properties for the IntegrityImpactWidget component
 */
export interface IntegrityImpactWidgetProps extends WidgetBaseProps {
  /** Integrity security level */
  level?: string;
  /** Options for each level */
  options?: Record<string, CIADetails>;
}

/**
 * Properties for the ConfidentialityImpactWidget component
 */
export interface ConfidentialityImpactWidgetProps extends WidgetBaseProps {
  /** Confidentiality security level */
  level?: string;
  /** Options for each level */
  options?: Record<string, CIADetails>;
}

/**
 * Properties for the AvailabilityImpactWidget component
 */
export interface AvailabilityImpactWidgetProps extends WidgetBaseProps {
  /** Availability security level */
  level?: string;
  /** Options for each level */
  options?: Record<string, CIADetails>;
}

/**
 * Properties for the SecurityResourcesWidget component
 */
export interface SecurityResourcesWidgetProps extends WidgetBaseProps {
  /** Overall security level */
  securityLevel?: string;
}

// Import these interfaces in each component file
