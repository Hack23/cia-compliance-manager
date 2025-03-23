import { RiskLevel } from "../constants/riskConstants";

/**
 * Business Impact Types
 *
 * ## Business Perspective
 *
 * These types define the structure of business impact data for security analyses.
 * They help organizations understand the consequences of different security
 * choices across various dimensions of business operation. 💼
 */

/**
 * Business consideration structure
 */
export interface BusinessConsideration {
  /**
   * Title of the consideration
   */
  title: string;

  /**
   * Description of the consideration
   */
  description: string;
}

/**
 * Business considerations by category
 */
export interface BusinessConsiderations {
  /**
   * Financial considerations
   */
  financial: BusinessConsideration[];

  /**
   * Operational considerations
   */
  operational: BusinessConsideration[];

  /**
   * Strategic considerations
   */
  strategic: BusinessConsideration[];

  /**
   * Reputational considerations
   */
  reputational: BusinessConsideration[];

  /**
   * Regulatory considerations
   */
  regulatory: BusinessConsideration[];
}

/**
 * Impact consideration with risk level
 */
export interface ImpactConsideration {
  /**
   * Type of impact
   */
  type: string;

  /**
   * Risk level
   */
  risk: RiskLevel;

  /**
   * Description of the impact
   */
  description: string;
}

/**
 * Business considerations by security level and component
 */
export interface ComponentBusinessConsiderations {
  AVAILABILITY: Record<string, ImpactConsideration[]>;
  INTEGRITY: Record<string, ImpactConsideration[]>;
  CONFIDENTIALITY: Record<string, ImpactConsideration[]>;
}

/**
 * Key business benefit
 */
export interface BusinessKeyBenefit {
  /**
   * Title of the benefit
   */
  title: string;

  /**
   * Description of the benefit
   */
  description: string;
}

/**
 * Business benefits by security level
 */
export interface BusinessKeyBenefits {
  [key: string]: BusinessKeyBenefit[];
}

// Type for business impact icons
export interface BusinessImpactIcons {
  [key: string]: string;
}

/**
 * Business impact detail structure
 */
export interface BusinessImpactDetail {
  /**
   * Description of the impact
   */
  description?: string;

  /**
   * Risk level (e.g., "Low", "Medium", "High", "Critical")
   */
  riskLevel?: string;

  /**
   * Annual revenue loss estimate (for financial impact)
   */
  annualRevenueLoss?: string;

  /**
   * Mean time to recover (for operational impact)
   */
  meanTimeToRecover?: string;

  /**
   * List of compliance violations (for regulatory impact)
   */
  complianceViolations?: string[];

  /**
   * Competitive advantage implications
   */
  competitiveAdvantage?: string;
}

/**
 * Business impact details structure containing impact categories
 */
export interface BusinessImpactDetails {
  /**
   * Summary of the overall business impact
   */
  summary?: string;

  /**
   * Financial impact details
   */
  financial?: BusinessImpactDetail;

  /**
   * Operational impact details
   */
  operational?: BusinessImpactDetail;

  /**
   * Reputational impact details
   */
  reputational?: BusinessImpactDetail;

  /**
   * Regulatory impact details
   */
  regulatory?: BusinessImpactDetail;

  /**
   * Strategic impact details
   */
  strategic?: BusinessImpactDetail;
}

/**
 * Business consideration or benefit item
 */
export interface BusinessItem {
  /**
   * Title of the consideration or benefit
   */
  title?: string;

  /**
   * Description of the consideration or benefit
   */
  description: string;

  /**
   * Category of the consideration or benefit (e.g., "financial", "operational")
   */
  category?: string;

  /**
   * Priority or importance (1-5)
   */
  priority?: number;
}

// Types for business value structures
export interface BusinessValueMetric {
  /**
   * Name of the metric
   */
  name: string;

  /**
   * Description of the metric
   */
  description: string;

  /**
   * How the metric is measured
   */
  measurementMethod: string;

  /**
   * How security impacts this metric
   */
  securityImpact: string;
}

export interface BusinessROIEstimates {
  [level: string]: BusinessValueMetric;
}

export interface BusinessTimeToValue {
  [level: string]: string;
}

export interface BusinessValueMetrics {
  ROI_ESTIMATES: BusinessROIEstimates;
  TIME_TO_VALUE: BusinessTimeToValue;
}

// Import and re-export the actual data from constants
// This resolves the circular dependency
import {
  BUSINESS_CONSIDERATIONS as BC,
  BUSINESS_KEY_BENEFITS as BKB,
} from "../constants/businessConstants";

// Fix the format to match the expected structure in tests
export const BUSINESS_CONSIDERATIONS = {
  // Use spread operator to copy all properties from BC
  ...BC,
  // Add these properties with a safer approach to access potential properties
  AVAILABILITY: {
    NONE: [],
    LOW: [],
    MODERATE: [],
    HIGH: [],
    VERY_HIGH: [],
    ...((BC as any)?.availability || (BC as any)?.AVAILABILITY || {}),
  },
  INTEGRITY: {
    NONE: [],
    LOW: [],
    MODERATE: [],
    HIGH: [],
    VERY_HIGH: [],
    ...((BC as any)?.integrity || (BC as any)?.INTEGRITY || {}),
  },
  CONFIDENTIALITY: {
    NONE: [],
    LOW: [],
    MODERATE: [],
    HIGH: [],
    VERY_HIGH: [],
    ...((BC as any)?.confidentiality || (BC as any)?.CONFIDENTIALITY || {}),
  },
};

export const BUSINESS_KEY_BENEFITS = {
  NONE: BKB?.None || [],
  LOW: BKB?.Low || [],
  MODERATE: BKB?.Moderate || [],
  HIGH: BKB?.High || [],
  VERY_HIGH: BKB?.["Very High"] || [],
  ...BKB,
};
