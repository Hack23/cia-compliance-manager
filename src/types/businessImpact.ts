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
 * Detailed business impact structure
 * 
 * ## Business Perspective
 * 
 * This structure represents comprehensive business impact analysis
 * across multiple dimensions such as financial, operational, and regulatory
 * concerns, enabling CISOs to present security impacts in business terms. 💼
 */
export interface BusinessImpactDetails {
  summary: string;
  financial?: {
    description: string;
    riskLevel: string;
    annualRevenueLoss?: string;
  };
  operational?: {
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
  };
  regulatory?: {
    description: string;
    riskLevel: string;
  };
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
  BUSINESS_KEY_BENEFITS as BKB
} from "../constants/businessConstants";

export const BUSINESS_CONSIDERATIONS = BC;
export const BUSINESS_KEY_BENEFITS = BKB;

