// Type for a single business consideration item
export interface BusinessConsideration {
  title?: string;
  description: string;
  impact?: string;
  type?: string;
  risk?: string;
}

// Type for business considerations structure
export interface BusinessConsiderations {
  [categoryKey: string]: {
    [levelKey: string]: BusinessConsideration[];
  };
}

// Ensure both singular and plural forms are exported
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

// Export the actual data
export const BUSINESS_CONSIDERATIONS: BusinessConsiderations = {
  AVAILABILITY: {
    NONE: [],
    LOW: [],
    MODERATE: [],
    HIGH: [],
    VERY_HIGH: [],
  },
  INTEGRITY: {
    NONE: [],
    LOW: [],
    MODERATE: [],
    HIGH: [],
    VERY_HIGH: [],
  },
  CONFIDENTIALITY: {
    NONE: [],
    LOW: [],
    MODERATE: [],
    HIGH: [],
    VERY_HIGH: [],
  },
};

// Export the actual business key benefits
export const BusinessKeyBenefits: BusinessKeyBenefits = {
  NONE: [],
  LOW: [
    "Cost-effective solution for non-critical systems",
    "Minimal maintenance overhead",
  ],
  MODERATE: [
    "Good balance of security vs. cost",
    "Meets regulatory requirements",
    "Suitable for most business applications",
  ],
  HIGH: [
    "Robust protection for sensitive data",
    "Compliance with stringent requirements",
    "Minimizes risk of security incidents",
  ],
  VERY_HIGH: [
    "Maximum protection for critical systems",
    "Suitable for highly regulated environments",
    "Comprehensive security guarantees",
  ],
};
