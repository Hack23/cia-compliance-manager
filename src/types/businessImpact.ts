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
 * Business impact detail structure
 */
export interface BusinessImpactDetail {
  /** Description of the impact */
  description: string;

  /** Risk level: "Critical", "High", "Medium", "Low", or "Minimal" */
  riskLevel: string;

  /** Estimated annual revenue loss */
  annualRevenueLoss?: string;

  /** Mean time to recover from incidents */
  meanTimeToRecover?: string;

  /** Potential compliance violations */
  complianceViolations?: string[];

  /** Operational impact description */
  operationalImpact?: string;

  /** Reputational impact description */
  reputationalImpact?: string;

  /** Compliance impact description */
  complianceImpact?: string;

  /** Value for competitiveAdvantage */
  competitiveAdvantage?: string;

  /** Financial impact details */
  financial?: {
    /** Description of financial impact */
    description: string;

    /** Severity of impact */
    impact: string;

    /** Estimated annual loss */
    annualLoss?: string;
  };

  /** Operational impact details */
  operational?: {
    /** Description of operational impact */
    description: string;

    /** Severity of impact */
    impact: string;

    /** Expected recovery time */
    recoveryTime?: string;
  };

  /** Reputational impact details */
  reputational?: {
    /** Description of reputational impact */
    description: string;

    /** Severity of impact */
    impact: string;
  };

  /** Regulatory impact details */
  regulatory?: {
    /** Description of regulatory impact */
    description: string;

    /** Severity of impact */
    impact: string;

    /** Affected compliance frameworks */
    frameworks?: string[];
  };

  /** Summary of overall impact */
  summary?: string;
}

/**
 * Business consideration structure
 */
export interface BusinessConsideration {
  /** Type of consideration */
  type: "risk" | "opportunity" | "requirement";

  /** Title of the consideration */
  title: string;

  /** Description of the consideration */
  description: string;

  /** Impact level or importance */
  importance: "low" | "medium" | "high" | "critical";

  /** Related business area */
  businessArea: string;

  /** Estimated financial impact */
  financialImpact?: string;
}

/**
 * Collection of business considerations by category
 */
export interface BusinessConsiderations {
  /** Financial considerations */
  financial: BusinessConsideration[];

  /** Operational considerations */
  operational: BusinessConsideration[];

  /** Strategic considerations */
  strategic: BusinessConsideration[];

  /** Compliance considerations */
  compliance?: BusinessConsideration[];

  /** Reputational considerations */
  reputational?: BusinessConsideration[];

  /** Regulatory considerations */
  regulatory?: BusinessConsideration[];
}

/**
 * Icon mappings for business impact categories
 */
export interface BusinessImpactIcons {
  /** Financial impact icon */
  financial: string;

  /** Operational impact icon */
  operational: string;

  /** Strategic impact icon */
  strategic: string;

  /** Compliance/regulatory impact icon */
  compliance: string;

  /** Reputational impact icon */
  reputational: string;
}

/**
 * Service level agreement metrics
 */
export interface SLAMetrics {
  /** Uptime target (e.g., "99.9%") */
  uptime: string;

  /** Recovery Time Objective */
  rto?: string;

  /** Recovery Point Objective */
  rpo?: string;

  /** Mean Time to Recover */
  mttr?: string;
}

/**
 * Business impact structure
 */
export interface BusinessImpact {
  /** Financial impact details */
  financial: {
    /** Description of impact */
    description: string;

    /** Risk level */
    riskLevel: string;
  };

  /** Operational impact details */
  operational: {
    /** Description of impact */
    description: string;

    /** Risk level */
    riskLevel: string;
  };

  /** Reputational impact details */
  reputation: {
    /** Description of impact */
    description: string;

    /** Risk level */
    riskLevel: string;
  };

  /** Legal/regulatory impact details */
  legal: {
    /** Description of impact */
    description: string;

    /** Risk level */
    riskLevel: string;
  };
}

/**
 * Impact consideration type used in component business considerations
 */
export interface ImpactConsideration {
  /** Title of the consideration */
  title: string;

  /** Description of the consideration */
  description: string;

  /** Type of the consideration */
  type?: string;

  /** Business area affected */
  businessArea?: string;

  /** Impact level */
  importance?: string;

  /** Risk level - added to match usage in businessConstants */
  risk?: string;
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

  /**
   * Icon representation
   */
  icon?: string;
}

/**
 * Business value metric
 */
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
