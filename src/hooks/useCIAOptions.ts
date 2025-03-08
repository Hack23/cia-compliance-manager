import { useMemo } from "react";
import { CIADetails } from "../types/cia";
import {
  RISK_LEVELS,
  BUSINESS_IMPACT_CATEGORIES,
} from "../constants/riskConstants";

// Add enhanced contextual information to the CIA options
export const availabilityOptions: Record<string, CIADetails> = {
  None: {
    description: "No guaranteed uptime or availability controls.",
    impact: "Complete business disruption during outages",
    technical: "No redundancy or monitoring in place.",
    businessImpact:
      "Critical business operations completely halt during outages",
    capex: 0,
    opex: 0,
    uptime: "< 90%",
    // Add properties required by tests
    bg: "#ffcccc",
    text: "#800000",
    recommendations: ["Implement basic monitoring", "Create backup procedures"],
    // Add enhanced business impact details
    businessImpactDetails: {
      financialImpact: {
        description: "Complete revenue loss during outages",
        riskLevel: RISK_LEVELS.CRITICAL,
        annualRevenueLoss: ">20%",
      },
      operationalImpact: {
        description: "Business operations completely halt during outages",
        riskLevel: RISK_LEVELS.CRITICAL,
        meanTimeToRecover: "Unpredictable",
      },
      reputationalImpact: {
        description: "Severe customer dissatisfaction and churn",
        riskLevel: RISK_LEVELS.HIGH,
      },
    },
  },
  Low: {
    description: "Basic availability with limited redundancy.",
    impact: "Extended outages may occur frequently",
    technical: "Minimal manual backup systems only.",
    businessImpact: "Frequent disruptions to business operations",
    capex: 5,
    opex: 5,
    uptime: "95-97%",
    bg: "#ffe0cc",
    text: "#804000",
    recommendations: ["Implement automated alerts", "Create recovery plan"],
    // Add enhanced business impact details
    businessImpactDetails: {
      financialImpact: {
        description: "Significant revenue loss during frequent outages",
        riskLevel: RISK_LEVELS.HIGH,
        annualRevenueLoss: "10-20%",
      },
      operationalImpact: {
        description: "Frequent disruptions to business operations",
        riskLevel: RISK_LEVELS.HIGH,
        meanTimeToRecover: "Hours to days",
      },
    },
  },
  Moderate: {
    description:
      "Standard high availability configuration with some redundancy.",
    impact: "Limited downtime during planned maintenance",
    technical: "Automated failover with backup systems.",
    businessImpact: "Minimal business impact during standard operations",
    capex: 15,
    opex: 10,
    uptime: "99%",
    bg: "#ffffcc",
    text: "#808000",
    recommendations: [
      "Configure active-passive redundancy",
      "Core systems pre-configured",
    ],
    // Add enhanced business impact details
    businessImpactDetails: {
      financialImpact: {
        description: "Limited revenue impact from occasional outages",
        riskLevel: RISK_LEVELS.MEDIUM,
        annualRevenueLoss: "3-10%",
      },
      operationalImpact: {
        description: "Minimal business impact during standard operations",
        riskLevel: RISK_LEVELS.MEDIUM,
        meanTimeToRecover: "Minutes to hours",
      },
    },
  },
  High: {
    description: "Robust high availability with multiple redundancy.",
    impact: "Near-zero downtime except in catastrophic scenarios",
    technical: "Multiple redundant systems with automated recovery.",
    businessImpact: "Business continuity preserved in most scenarios",
    capex: 25,
    opex: 15,
    uptime: "99.9%",
    bg: "#ccffcc",
    text: "#008000",
    recommendations: [
      "Implement geographic redundancy",
      "Partially active redundant systems",
    ],
    // Add enhanced business impact details
    businessImpactDetails: {
      financialImpact: {
        description: "Minimal revenue impact, even during incidents",
        riskLevel: RISK_LEVELS.LOW,
        annualRevenueLoss: "<3%",
      },
      operationalImpact: {
        description: "Business continuity preserved in most scenarios",
        riskLevel: RISK_LEVELS.LOW,
        meanTimeToRecover: "Seconds to minutes",
      },
      strategicImpact: {
        description: "Enables business in regulated industries",
        riskLevel: RISK_LEVELS.LOW,
      },
    },
  },
  "Very High": {
    description: "Maximum availability with global redundancy.",
    impact: "Zero downtime guarantee under normal conditions",
    technical:
      "Geographically distributed redundant systems with real-time failover.",
    businessImpact: "Guaranteed business continuity with SLA protection",
    capex: 40,
    opex: 25,
    uptime: "99.999%",
    bg: "#ccccff",
    text: "#000080",
    recommendations: [
      "Full active-active implementation",
      "Real-time global load balancing",
    ],
    // Add enhanced business impact details
    businessImpactDetails: {
      financialImpact: {
        description: "Virtually no revenue impact from availability issues",
        riskLevel: RISK_LEVELS.LOW,
        annualRevenueLoss: "<1%",
      },
      operationalImpact: {
        description: "Guaranteed business continuity with SLA protection",
        riskLevel: RISK_LEVELS.LOW,
        meanTimeToRecover: "Near instant",
      },
      strategicImpact: {
        description: "Enables business in highly regulated markets",
        riskLevel: RISK_LEVELS.LOW,
      },
      competitiveAdvantage: {
        description: "Superior reliability as competitive differentiator",
        value: "High",
      },
    },
  },
};

export const integrityOptions: Record<string, CIADetails> = {
  None: {
    description: "No data integrity controls.",
    impact: "Data corruption may go undetected",
    technical: "No validation or verification processes.",
    businessImpact: "Decisions based on potentially corrupt data",
    capex: 0,
    opex: 0,
    validationMethod: "None",
    bg: "#ffcccc",
    text: "#800000",
    recommendations: [
      "Implement basic data validation",
      "Create manual verification processes",
    ],
  },
  Low: {
    description: "Basic data integrity with manual verification.",
    impact: "Data corruption may be detected but not prevented",
    technical: "Simple checksums and manual review processes.",
    businessImpact: "Potential for undetected corruption in critical data",
    capex: 5,
    opex: 5,
    validationMethod: "Manual checks",
    bg: "#ffe0cc",
    text: "#804000",
    recommendations: [
      "Implement checksum validation",
      "Create data validation rules",
    ],
  },
  Moderate: {
    description: "Standard integrity controls with automated verification.",
    impact: "Most corruption detected and correctable",
    technical: "Hash verification and automated validation routines.",
    businessImpact: "Most critical data protected from corruption",
    capex: 15,
    opex: 10,
    validationMethod: "Automated validation",
    bg: "#ffffcc",
    text: "#808000",
    recommendations: [
      "Implement digital signatures",
      "Core systems pre-configured",
    ],
  },
  High: {
    description: "Advanced integrity with blockchain verification.",
    impact: "All changes tracked and validated",
    technical: "Distributed ledger technology and digital signatures.",
    businessImpact: "Full validation trail for all critical information",
    capex: 25,
    opex: 15,
    validationMethod: "Blockchain verification",
    bg: "#ccffcc",
    text: "#008000",
    recommendations: [
      "Implement immutable audit logs",
      "Hash-based verification systems",
    ],
  },
  "Very High": {
    description: "Maximum integrity with real-time validation.",
    impact: "Tamper-proof with comprehensive audit trail",
    technical: "Zero-knowledge proofs and multi-party verification protocols.",
    businessImpact: "Cryptographic certainty for all data integrity",
    capex: 40,
    opex: 25,
    validationMethod: "Multi-party cryptographic verification",
    bg: "#ccccff",
    text: "#000080",
    recommendations: [
      "Implement zero-knowledge proofs",
      "Full cryptographic integrity model",
    ],
  },
};

export const confidentialityOptions: Record<string, CIADetails> = {
  None: {
    description: "No confidentiality controls.",
    impact: "Data accessible to anyone",
    technical: "No access control or encryption.",
    businessImpact: "No protection for sensitive information",
    capex: 0,
    opex: 0,
    protectionMethod: "None",
    bg: "#ffcccc",
    text: "#800000",
    recommendations: [
      "Implement basic access controls",
      "Create classification policy",
    ],
  },
  Low: {
    description: "Basic confidentiality with simple access controls.",
    impact: "Limited protection against casual access",
    technical: "Password protection and simple role-based controls.",
    businessImpact: "Minimal protection for internal data",
    capex: 5,
    opex: 5,
    protectionMethod: "Basic access control",
    bg: "#ffe0cc",
    text: "#804000",
    recommendations: [
      "Implement authorization framework",
      "Create data classification",
    ],
  },
  Moderate: {
    description: "Standard confidentiality with encryption at rest.",
    impact: "Protected against most unauthorized access",
    technical: "Industry-standard encryption with proper key management.",
    businessImpact: "Protects against most common threats",
    capex: 15,
    opex: 10,
    protectionMethod: "Standard encryption",
    bg: "#ffffcc",
    text: "#808000",
    recommendations: [
      "Implement encryption at rest",
      "Create key management procedures",
    ],
  },
  High: {
    description: "Advanced confidentiality with end-to-end encryption.",
    impact: "Protected against sophisticated attacks",
    technical: "End-to-end encryption with multi-factor authentication.",
    businessImpact: "Protects against advanced persistent threats",
    capex: 25,
    opex: 15,
    protectionMethod: "E2E encryption",
    bg: "#ccffcc",
    text: "#008000",
    recommendations: ["Implement E2E encryption", "Military-grade protection"],
  },
  "Very High": {
    description: "Maximum confidentiality with quantum-resistant encryption.",
    impact: "Highest possible data protection",
    technical: "Post-quantum cryptography with hardware security modules.",
    businessImpact: "Future-proof protection for highly sensitive data",
    capex: 40,
    opex: 25,
    protectionMethod: "Quantum-resistant encryption",
    bg: "#ccccff",
    text: "#000080",
    recommendations: [
      "Implement quantum-resistant algorithms",
      "Military-grade protection",
    ],
  },
};

// Add ROI estimates for different security levels
export const ROI_ESTIMATES = {
  // Keep the new structure with uppercase keys
  NONE: {
    description: "No security investment means no return",
    potentialLosses: "Very High",
    estimatedSavings: "$0",
    returnRate: "0%",
    breakEvenPeriod: "N/A",
  },
  LOW: {
    description: "Basic security measures provide minimal protection",
    potentialLosses: "High",
    estimatedSavings: "$10,000-50,000",
    returnRate: "120%",
    breakEvenPeriod: "10-12 months",
  },
  MODERATE: {
    description:
      "Standard security implementation provides good cost-benefit balance",
    potentialLosses: "Medium",
    estimatedSavings: "$50,000-200,000",
    returnRate: "200%",
    breakEvenPeriod: "6-8 months",
  },
  HIGH: {
    description:
      "Advanced security implementations provide significant protection",
    potentialLosses: "Low",
    estimatedSavings: "$200,000-500,000",
    returnRate: "350%",
    breakEvenPeriod: "3-5 months",
  },
  VERY_HIGH: {
    description:
      "Maximum security measures provide optimal protection and returns",
    potentialLosses: "Very Low",
    estimatedSavings: "$500,000+",
    returnRate: "450%",
    breakEvenPeriod: "1-3 months",
  },

  // Add the structure expected by TypeScript errors
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

export const useCIAOptions = () => {
  return useMemo(() => {
    return {
      availabilityOptions,
      integrityOptions,
      confidentialityOptions,
      ROI_ESTIMATES, // Add ROI_ESTIMATES to the returned object
    };
  }, []);
};

// Export CIADetails for backward compatibility
export type { CIADetails } from "../types/cia";
