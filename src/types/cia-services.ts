/**
 * ROI metrics interface
 */
export interface ROIMetrics {
  returnRate: string;
  description: string;
  potentialSavings?: string; // Make this optional for compatibility
  breakEvenPeriod?: string; // Make this optional for compatibility
  implementationCost?: string; // Make this optional for compatibility
}

/**
 * Interface for storing ROI estimates by security level
 */
export interface ROIEstimatesMap {
  NONE: ROIMetrics;
  LOW: ROIMetrics;
  MODERATE: ROIMetrics;
  HIGH: ROIMetrics;
  VERY_HIGH: ROIMetrics;
}

/**
 * Enhanced interface for technical implementation details
 */
export interface TechnicalImplementationDetails {
  description: string;
  implementationSteps: string[];
  effort: {
    development: string;
    maintenance: string;
    expertise: string;
  };
  requirements?: string[];
  technologies?: string[];
  rto?: string; // Recovery Time Objective
  rpo?: string; // Recovery Point Objective
  mttr?: string; // Mean Time To Recovery
  validationMethod?: string; // Add this property
  protectionMethod?: string;
  uptime?: string;
}

/**
 * Enhanced interface for business impact details
 */
export interface BusinessImpactDetails {
  summary: string;
  financial: {
    description: string;
    riskLevel: string;
    annualRevenueLoss?: string;
  };
  operational: {
    description: string;
    riskLevel: string;
    meanTimeToRecover?: string;
  };
  reputational?: {
    description: string;
    riskLevel: string;
  };
  strategic?: {
    description: string;
    riskLevel: string;
    competitiveAdvantage?: string;
  };
  regulatory?: {
    description: string;
    riskLevel: string;
    complianceImpact?: string;
  };
}

/**
 * Component type for CIA triad
 */
export type CIAComponentType = "availability" | "integrity" | "confidentiality";
