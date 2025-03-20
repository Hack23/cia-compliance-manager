import {
  BusinessConsiderations,
  BusinessKeyBenefits,
} from "../types/businessImpact";
import { BUSINESS_IMPACT_CATEGORIES, RISK_LEVELS } from "./riskConstants";

// Business impact considerations - these will populate our enhanced widget
export const BUSINESS_CONSIDERATIONS: BusinessConsiderations = {
  AVAILABILITY: {
    NONE: [
      {
        type: BUSINESS_IMPACT_CATEGORIES.OPERATIONAL,
        risk: RISK_LEVELS.CRITICAL,
        description: "Complete business stoppage during system outages",
      },
      {
        type: BUSINESS_IMPACT_CATEGORIES.FINANCIAL,
        risk: RISK_LEVELS.HIGH,
        description: "Revenue loss of up to 100% during downtime",
      },
      {
        type: BUSINESS_IMPACT_CATEGORIES.REPUTATIONAL,
        risk: RISK_LEVELS.HIGH,
        description: "Customer trust severely impacted by unreliable services",
      },
    ],
    LOW: [
      {
        type: BUSINESS_IMPACT_CATEGORIES.OPERATIONAL,
        risk: RISK_LEVELS.HIGH,
        description: "Frequent business disruptions with extended recovery",
      },
      {
        type: BUSINESS_IMPACT_CATEGORIES.FINANCIAL,
        risk: RISK_LEVELS.MEDIUM,
        description: "Revenue impact of 5-10% annually due to outages",
      },
      {
        type: BUSINESS_IMPACT_CATEGORIES.REPUTATIONAL,
        risk: RISK_LEVELS.MEDIUM,
        description: "Customer frustration due to inconsistent availability",
      },
    ],
    MODERATE: [
      {
        type: BUSINESS_IMPACT_CATEGORIES.OPERATIONAL,
        risk: RISK_LEVELS.MEDIUM,
        description: "Occasional disruptions with quick recovery",
      },
      {
        type: BUSINESS_IMPACT_CATEGORIES.FINANCIAL,
        risk: RISK_LEVELS.LOW,
        description: "Revenue impact of 1-5% annually due to planned downtime",
      },
      {
        type: BUSINESS_IMPACT_CATEGORIES.REPUTATIONAL,
        risk: RISK_LEVELS.LOW,
        description: "Customer expectations managed through SLAs",
      },
    ],
    HIGH: [
      {
        type: BUSINESS_IMPACT_CATEGORIES.OPERATIONAL,
        risk: RISK_LEVELS.LOW,
        description: "Minimal disruptions with automated recovery",
      },
      {
        type: BUSINESS_IMPACT_CATEGORIES.FINANCIAL,
        risk: RISK_LEVELS.LOW,
        description: "Revenue impact under 1% annually",
      },
      {
        type: BUSINESS_IMPACT_CATEGORIES.STRATEGIC,
        risk: RISK_LEVELS.LOW,
        description:
          "Enables expansion into markets requiring high reliability",
      },
    ],
    VERY_HIGH: [
      {
        type: BUSINESS_IMPACT_CATEGORIES.OPERATIONAL,
        risk: RISK_LEVELS.LOW,
        description: "Continuous business operations with no disruption",
      },
      {
        type: BUSINESS_IMPACT_CATEGORIES.STRATEGIC,
        risk: RISK_LEVELS.LOW,
        description: "Competitive advantage through superior reliability",
      },
      {
        type: BUSINESS_IMPACT_CATEGORIES.REGULATORY,
        risk: RISK_LEVELS.LOW,
        description: "Complies with most stringent availability requirements",
      },
    ],
  },
  INTEGRITY: {
    NONE: [
      {
        type: BUSINESS_IMPACT_CATEGORIES.OPERATIONAL,
        risk: RISK_LEVELS.CRITICAL,
        description: "Decisions based on potentially corrupted data",
      },
      {
        type: BUSINESS_IMPACT_CATEGORIES.FINANCIAL,
        risk: RISK_LEVELS.HIGH,
        description: "Financial reporting cannot be trusted",
      },
    ],
    LOW: [
      {
        type: BUSINESS_IMPACT_CATEGORIES.OPERATIONAL,
        risk: RISK_LEVELS.HIGH,
        description: "Data corruption may be detected but not prevented",
      },
      {
        type: BUSINESS_IMPACT_CATEGORIES.FINANCIAL,
        risk: RISK_LEVELS.MEDIUM,
        description: "Financial calculations may have errors",
      },
    ],
    MODERATE: [
      {
        type: BUSINESS_IMPACT_CATEGORIES.OPERATIONAL,
        risk: RISK_LEVELS.MEDIUM,
        description: "Most data corruption detected and correctable",
      },
      {
        type: BUSINESS_IMPACT_CATEGORIES.REGULATORY,
        risk: RISK_LEVELS.MEDIUM,
        description: "Meets basic regulatory requirements for data integrity",
      },
    ],
    HIGH: [
      {
        type: BUSINESS_IMPACT_CATEGORIES.OPERATIONAL,
        risk: RISK_LEVELS.LOW,
        description: "All changes tracked and validated",
      },
      {
        type: BUSINESS_IMPACT_CATEGORIES.REGULATORY,
        risk: RISK_LEVELS.LOW,
        description: "Meets stringent compliance requirements",
      },
    ],
    VERY_HIGH: [
      {
        type: BUSINESS_IMPACT_CATEGORIES.OPERATIONAL,
        risk: RISK_LEVELS.LOW,
        description: "Data integrity guaranteed with cryptographic certainty",
      },
      {
        type: BUSINESS_IMPACT_CATEGORIES.STRATEGIC,
        risk: RISK_LEVELS.LOW,
        description: "Enables business in highly-regulated industries",
      },
    ],
  },
  CONFIDENTIALITY: {
    NONE: [
      {
        type: BUSINESS_IMPACT_CATEGORIES.REPUTATIONAL,
        risk: RISK_LEVELS.CRITICAL,
        description: "All data accessible to unauthorized parties",
      },
      {
        type: BUSINESS_IMPACT_CATEGORIES.REGULATORY,
        risk: RISK_LEVELS.CRITICAL,
        description: "Non-compliant with all data protection regulations",
      },
    ],
    LOW: [
      {
        type: BUSINESS_IMPACT_CATEGORIES.REPUTATIONAL,
        risk: RISK_LEVELS.HIGH,
        description: "Sensitive data may be exposed",
      },
      {
        type: BUSINESS_IMPACT_CATEGORIES.REGULATORY,
        risk: RISK_LEVELS.HIGH,
        description: "May violate basic privacy requirements",
      },
    ],
    MODERATE: [
      {
        type: BUSINESS_IMPACT_CATEGORIES.REPUTATIONAL,
        risk: RISK_LEVELS.MEDIUM,
        description: "Most sensitive data protected",
      },
      {
        type: BUSINESS_IMPACT_CATEGORIES.REGULATORY,
        risk: RISK_LEVELS.MEDIUM,
        description: "Complies with standard data protection regulations",
      },
    ],
    HIGH: [
      {
        type: BUSINESS_IMPACT_CATEGORIES.REPUTATIONAL,
        risk: RISK_LEVELS.LOW,
        description: "Strong protection for sensitive data",
      },
      {
        type: BUSINESS_IMPACT_CATEGORIES.REGULATORY,
        risk: RISK_LEVELS.LOW,
        description: "Meets stringent privacy requirements",
      },
    ],
    VERY_HIGH: [
      {
        type: BUSINESS_IMPACT_CATEGORIES.REPUTATIONAL,
        risk: RISK_LEVELS.LOW,
        description: "Maximum protection for sensitive information",
      },
      {
        type: BUSINESS_IMPACT_CATEGORIES.STRATEGIC,
        risk: RISK_LEVELS.LOW,
        description: "Enables handling of top-secret or classified information",
      },
    ],
  },
};

// Business keys benefits for each security level - to show positive impacts
export const BUSINESS_KEY_BENEFITS: BusinessKeyBenefits = {
  NONE: [
    "No security investment costs",
    "Simplest implementation and management",
  ],
  LOW: [
    "Basic protection against common threats",
    "Low implementation and maintenance costs",
    "Suitable for non-sensitive public information",
  ],
  MODERATE: [
    "Good balance of security vs. cost",
    "Protection against most common threats",
    "Compliance with basic regulatory frameworks",
    "Acceptable for most internal business data",
  ],
  HIGH: [
    "Protection against sophisticated threats",
    "Compliance with stringent regulations",
    "Suitable for sensitive customer data",
    "Supports business with high-value clients",
  ],
  VERY_HIGH: [
    "Maximum protection against advanced threats",
    "Compliance with most stringent regulations",
    "Suitable for highly classified information",
    "Enables government and defense contracts",
  ],
};

// Value Creation Points
export const VALUE_CREATION_POINTS = {
  NONE: ["No security investment means all budget can go to other areas"],
  LOW: ["Satisfies minimum viable security for non-critical systems"],
  MODERATE: ["Demonstrates security diligence"],
  HIGH: ["Enables expansion into regulated markets"],
  VERY_HIGH: ["Enables participation in classified contracts"],
};

// Detailed value creation points by security level
export const DETAILED_VALUE_POINTS = {
  NONE: [
    "No value creation from security perspective",
    "High risk of security incidents with significant business impact",
    "Limited ability to participate in business relationships requiring security",
    "Potential regulatory issues in many industries",
  ],
  // ... rest of existing detailed value points ...
};

// Security Descriptions
export const SECURITY_DESCRIPTIONS = {
  NONE: "No security controls implemented.",
  LOW: "Basic protection with minimal controls and manual processes.",
  MODERATE:
    "Balanced protection with automated recovery, validation checks, and standard encryption.",
  HIGH: "Robust protection with minimal single points of failure, blockchain validation, and strong encryption.",
  VERY_HIGH:
    "Maximum protection with quantum-safe encryption, multi-site redundancy, and real-time validation.",
};

// Business value metrics - new addition to make the widget more comprehensive
export const BUSINESS_VALUE_METRICS = {
  ROI_ESTIMATES: {
    NONE: {
      value: "Negative",
      icon: "📉",
      description: "High risk of financial losses",
    },
    LOW: {
      value: "1-2x",
      icon: "📊",
      description: "Modest return on basic security investment",
    },
    MODERATE: {
      value: "2-3x",
      icon: "📈",
      description: "Good return for standard operations",
    },
    HIGH: {
      value: "3-5x",
      icon: "🔝",
      description: "Strong return including breach prevention",
    },
    VERY_HIGH: {
      value: "5-10x",
      icon: "💎",
      description: "Premium return for specialized markets",
    },
  },
  TIME_TO_VALUE: {
    NONE: "Immediate (no implementation)",
    LOW: "1-3 months",
    MODERATE: "3-6 months",
    HIGH: "6-12 months",
    VERY_HIGH: "12-18 months",
  },
};

// Return on Investment estimates for security measures
export const ROI_ESTIMATES = {
  highImpact: {
    minSavings: 500000,
    maxSavings: 2000000,
    averageReturn: 4.5, // 450% ROI
  },
  mediumImpact: {
    minSavings: 100000,
    maxSavings: 500000,
    averageReturn: 3.2, // 320% ROI
  },
  lowImpact: {
    minSavings: 10000,
    maxSavings: 100000,
    averageReturn: 1.8, // 180% ROI
  },
};
