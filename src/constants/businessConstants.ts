import {
  BusinessConsideration,
  BusinessConsiderations,
  BusinessKeyBenefit,
  BusinessKeyBenefits,
  BusinessValueMetric,
  ComponentBusinessConsiderations,
} from "../types/businessImpact";
import { SecurityLevel } from "../types/cia";
import { BUSINESS_IMPACT_CATEGORIES, RISK_LEVELS } from "./riskConstants";

/**
 * Business-related constants for the CIA Compliance Manager
 *
 * ## Business Perspective
 *
 * These constants provide the business context for security decisions,
 * helping stakeholders understand the value, benefits, and considerations
 * of implementing various security controls. 💼
 */

/**
 * Business considerations for security implementations
 */
export const BUSINESS_CONSIDERATIONS: BusinessConsiderations = {
  financial: [
    {
      title: "Implementation Cost",
      description:
        "Initial investment required for implementing security controls",
    },
    {
      title: "Operational Cost",
      description: "Ongoing maintenance and operational costs",
    },
    {
      title: "Return on Investment",
      description: "Expected financial return from security investments",
    },
    {
      title: "Cost Avoidance",
      description: "Potential costs avoided by preventing security incidents",
    },
  ],
  operational: [
    {
      title: "Resource Requirements",
      description:
        "Staff and resources needed for implementation and maintenance",
    },
    {
      title: "Process Changes",
      description:
        "Changes to operational processes required for security implementation",
    },
    {
      title: "Training Needs",
      description:
        "Staff training required for security awareness and implementation",
    },
    {
      title: "Performance Impact",
      description: "Potential impact on system performance and efficiency",
    },
  ],
  strategic: [
    {
      title: "Competitive Advantage",
      description: "How security posture provides competitive differentiation",
    },
    {
      title: "Market Positioning",
      description: "Impact on market positioning and customer perception",
    },
    {
      title: "Long-term Sustainability",
      description: "Alignment with long-term strategic objectives",
    },
    {
      title: "Growth Enablement",
      description: "How security enables or constrains business growth",
    },
  ],
  reputational: [
    {
      title: "Customer Trust",
      description: "Impact on customer trust and loyalty",
    },
    {
      title: "Brand Protection",
      description: "Protection of brand value and reputation",
    },
    {
      title: "Public Perception",
      description: "How the organization is perceived by the public",
    },
    {
      title: "Partner Confidence",
      description: "Trust from business partners and supply chain",
    },
  ],
  regulatory: [
    {
      title: "Compliance Requirements",
      description: "Regulatory obligations the organization must meet",
    },
    {
      title: "Audit Readiness",
      description: "Preparation for regulatory audits and assessments",
    },
    {
      title: "Penalty Avoidance",
      description: "Prevention of fines and sanctions from non-compliance",
    },
    {
      title: "Regulatory Change Management",
      description: "Adaptation to evolving regulatory requirements",
    },
  ],
};

/**
 * Business key benefits for each security level
 */
export const BUSINESS_KEY_BENEFITS: BusinessKeyBenefits = {
  None: [
    {
      title: "No Investment Required",
      description: "No upfront or ongoing costs for security controls",
    },
    {
      title: "Maximum Flexibility",
      description: "No security constraints on operations or development",
    },
  ],
  Low: [
    {
      title: "Basic Protection",
      description:
        "Minimal security controls to protect against common threats",
    },
    {
      title: "Cost Efficiency",
      description: "Low-cost implementation with minimal maintenance overhead",
    },
    {
      title: "Operational Simplicity",
      description: "Simple security controls with minimal operational impact",
    },
  ],
  Moderate: [
    {
      title: "Balanced Security",
      description:
        "Reasonable protection against most threats with balanced cost",
    },
    {
      title: "Regulatory Compliance",
      description: "Meets basic regulatory requirements for many frameworks",
    },
    {
      title: "Business Enablement",
      description: "Supports standard business operations and partnerships",
    },
  ],
  High: [
    {
      title: "Strong Protection",
      description: "Robust security controls against advanced threats",
    },
    {
      title: "Comprehensive Compliance",
      description: "Meets requirements for most regulated industries",
    },
    {
      title: "Customer Trust",
      description: "Builds strong customer and partner trust",
    },
    {
      title: "Risk Reduction",
      description: "Significantly reduces security-related business risks",
    },
  ],
  "Very High": [
    {
      title: "Maximum Protection",
      description: "Highest level of protection against sophisticated threats",
    },
    {
      title: "Premium Positioning",
      description:
        "Enables premium service offerings with strong security guarantees",
    },
    {
      title: "Market Leadership",
      description:
        "Positions the organization as a security leader in the industry",
    },
    {
      title: "Enterprise Readiness",
      description:
        "Meets the strictest security requirements of enterprise customers",
    },
  ],
};

/**
 * Business value metrics for measuring security impact
 */
export const BUSINESS_VALUE_METRICS: Record<string, BusinessValueMetric> = {
  customerTrust: {
    name: "Customer Trust",
    description: "Measure of customer confidence in security practices",
    measurementMethod:
      "Customer surveys, retention rates, security-related feedback",
    securityImpact:
      "Higher security levels typically correlate with increased trust",
  },
  marketAccess: {
    name: "Market Access",
    description: "Ability to enter regulated or security-sensitive markets",
    measurementMethod:
      "Number of qualified market segments, successful RFP responses",
    securityImpact: "Higher security levels open access to restricted markets",
  },
  competitiveAdvantage: {
    name: "Competitive Advantage",
    description:
      "Differentiation from competitors based on security capabilities",
    measurementMethod:
      "Win/loss analysis, security as decision factor in sales",
    securityImpact: "Advanced security can be a significant differentiator",
  },
  operationalEfficiency: {
    name: "Operational Efficiency",
    description: "Impact of security controls on business operations",
    measurementMethod:
      "Process cycle times, automation rates, incident response times",
    securityImpact: "Well-designed security can improve operational efficiency",
  },
  riskReduction: {
    name: "Risk Reduction",
    description: "Quantifiable reduction in security risks",
    measurementMethod:
      "Reduced incident rates, lower impact from security events",
    securityImpact:
      "Higher security levels directly reduce organizational risk",
  },
  revenueProtection: {
    name: "Revenue Protection",
    description: "Prevention of revenue loss due to security incidents",
    measurementMethod: "Avoided downtime costs, prevented fraud, reduced churn",
    securityImpact: "Security controls help protect existing revenue streams",
  },
  revenueGeneration: {
    name: "Revenue Generation",
    description: "New revenue opportunities enabled by security capabilities",
    measurementMethod:
      "Security-related upsells, premium services, new customers",
    securityImpact: "Strong security can be monetized as a value-add",
  },
  complianceReadiness: {
    name: "Compliance Readiness",
    description: "Preparation for regulatory audits and assessments",
    measurementMethod:
      "Audit preparation time, number of findings, remediation costs",
    securityImpact:
      "Higher security levels typically improve compliance posture",
  },
};

/**
 * Security ROI factors by industry
 */
export const INDUSTRY_ROI_FACTORS: Record<string, number> = {
  finance: 1.8, // Financial services see higher ROI from security
  healthcare: 1.6, // Healthcare also sees significant ROI from security
  retail: 1.3, // Retail sees moderate ROI from security
  manufacturing: 1.0, // Manufacturing sees standard ROI
  technology: 1.4, // Technology companies see above-average ROI
  government: 0.9, // Government entities often see lower direct ROI
  education: 0.8, // Education sector typically sees lower ROI
  general: 1.0, // Default for unspecified industries
};

/**
 * Business value statements for security levels
 */
export const BUSINESS_VALUE_STATEMENTS: Record<SecurityLevel, string[]> = {
  None: [
    "No investment in security controls",
    "Maximum operational flexibility, but with significant risk exposure",
    "Not recommended for any production systems or sensitive data",
  ],
  Low: [
    "Cost-effective protection for non-sensitive systems",
    "Basic protection against common threats",
    "Suitable for non-critical internal systems and public information",
  ],
  Moderate: [
    "Balanced approach to security with reasonable protection",
    "Meets requirements for many standard business relationships",
    "Cost-effective protection for most business systems",
  ],
  High: [
    "Strong protection suitable for sensitive data and critical systems",
    "Meets requirements for most regulated industries",
    "Provides significant competitive advantage in security-conscious markets",
  ],
  "Very High": [
    "Maximum protection for mission-critical systems and highly sensitive data",
    "Exceeds requirements for even the most stringent regulatory frameworks",
    "Enables premium positioning and trusted partner status",
  ],
};

/**
 * Business impact considerations by component and security level
 */
export const COMPONENT_BUSINESS_CONSIDERATIONS: ComponentBusinessConsiderations =
  {
    AVAILABILITY: {
      NONE: [
        {
          type: "operational",
          risk: RISK_LEVELS.CRITICAL,
          description: "Complete business stoppage during system outages",
        },
        {
          type: "financial",
          risk: RISK_LEVELS.HIGH,
          description: "Revenue loss of up to 100% during downtime",
        },
        {
          type: "reputational",
          risk: RISK_LEVELS.HIGH,
          description:
            "Customer trust severely impacted by unreliable services",
        },
      ],
      LOW: [
        {
          type: "operational",
          risk: RISK_LEVELS.HIGH,
          description: "Frequent business disruptions with extended recovery",
        },
        {
          type: "financial",
          risk: RISK_LEVELS.MEDIUM,
          description: "Revenue impact of 5-10% annually due to outages",
        },
        {
          type: "reputational",
          risk: RISK_LEVELS.MEDIUM,
          description: "Customer frustration due to inconsistent availability",
        },
      ],
      MODERATE: [
        {
          type: "operational",
          risk: RISK_LEVELS.MEDIUM,
          description: "Occasional disruptions with quick recovery",
        },
        {
          type: "financial",
          risk: RISK_LEVELS.LOW,
          description:
            "Revenue impact of 1-5% annually due to planned downtime",
        },
        {
          type: "reputational",
          risk: RISK_LEVELS.LOW,
          description: "Customer expectations managed through SLAs",
        },
      ],
      HIGH: [
        {
          type: "operational",
          risk: RISK_LEVELS.LOW,
          description: "Minimal disruptions with automated recovery",
        },
        {
          type: "financial",
          risk: RISK_LEVELS.LOW,
          description: "Revenue impact under 1% annually",
        },
        {
          type: "strategic",
          risk: RISK_LEVELS.LOW,
          description:
            "Enables expansion into markets requiring high reliability",
        },
      ],
      VERY_HIGH: [
        {
          type: "operational",
          risk: RISK_LEVELS.LOW,
          description: "Continuous business operations with no disruption",
        },
        {
          type: "strategic",
          risk: RISK_LEVELS.LOW,
          description: "Competitive advantage through superior reliability",
        },
        {
          type: "regulatory",
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
          description:
            "Enables handling of top-secret or classified information",
        },
      ],
    },
  };

/**
 * Value creation metrics by security level
 */
export const SECURITY_VALUE_METRICS = {
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

/**
 * Get business considerations for a specific category
 *
 * @param category - Business impact category
 * @returns Array of business considerations
 */
export function getBusinessConsiderationsForCategory(
  category: string
): BusinessConsideration[] {
  const normalizedCategory = category.toLowerCase();
  if (normalizedCategory in BUSINESS_CONSIDERATIONS) {
    return BUSINESS_CONSIDERATIONS[
      normalizedCategory as keyof BusinessConsiderations
    ];
  }
  return [];
}

/**
 * Get business benefits for a specific security level
 *
 * @param level - Security level
 * @returns Array of business benefits
 */
export function getBusinessBenefitsForLevel(
  level: SecurityLevel
): BusinessKeyBenefit[] {
  return BUSINESS_KEY_BENEFITS[level] || [];
}

/**
 * Get ROI factor for a specific industry
 *
 * @param industry - Industry name
 * @returns ROI factor as multiplier
 */
export function getIndustryROIFactor(industry: string): number {
  const normalizedIndustry = industry.toLowerCase();
  return (
    INDUSTRY_ROI_FACTORS[normalizedIndustry] || INDUSTRY_ROI_FACTORS.general
  );
}
