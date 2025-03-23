/**
 * Business Impact Types
 *
 * ## Business Perspective
 *
 * These types define the structure of business impact data for security analyses.
 * They help organizations understand the consequences of different security
 * choices across various dimensions of business operation. 💼
 */

// Type for a single business consideration item
export interface BusinessConsideration {
  type: string;
  risk: string;
  description: string;
}

// Type for business considerations structure
export interface BusinessConsiderations {
  [categoryKey: string]: {
    [levelKey: string]: BusinessConsideration[];
  };
}

// Type for business key benefit items
export type BusinessKeyBenefit =
  | string
  | { title: string; description: string };

// Type for business key benefits structure
export interface BusinessKeyBenefits {
  [levelKey: string]: BusinessKeyBenefit[];
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
  value: string;
  icon: string;
  description: string;
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

export const BUSINESS_CONSIDERATIONS = BC;
export const BUSINESS_KEY_BENEFITS = BKB;
