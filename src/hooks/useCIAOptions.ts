import { useCallback, useMemo } from "react";
import { SecurityLevel, CIADetails } from "../types/cia";
import { ROIMetrics, ROIEstimatesMap } from "../types/cia-services";
import { getSecurityLevelColorPair } from "../constants/colorConstants";

/**
 * Common interface for all CIA security options to ensure consistency
 */
export interface EnhancedCIADetails extends CIADetails {
  description: string;
  technical: string;
  businessImpact: string;
  capex: number;
  opex: number;
  bg: string;
  text: string;
  recommendations: string[];
  businessImpactDetails?: {
    financialImpact?: {
      description: string;
      riskLevel: string;
      annualRevenueLoss?: string;
    };
    operationalImpact?: {
      description: string;
      riskLevel: string;
      meanTimeToRecover?: string;
    };
    reputationalImpact?: {
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
      complianceViolations?: string[];
    };
  };
  rto?: string; // Recovery Time Objective
  rpo?: string; // Recovery Point Objective
  mttr?: string; // Mean Time To Recovery
  uptime?: string; // For availability options
  validationMethod?: string; // For integrity options
  protectionMethod?: string; // For confidentiality options
  implementationComplexity?: string;
  maintenanceRequirements?: string;
  requiredExpertise?: string;
  controlFamily?: string[];
  applicableFrameworks?: string[];
  // New fields to reduce hardcoding in ciaContentService
  businessPerspective?: string;
  implementationSteps?: string[];
  effort?: {
    development: string;
    maintenance: string;
    expertise: string;
  };
  keyImpact?: string;
  metric?: string;
  valuePoints?: string[];
  roiEstimate?: {
    value: string;
    description: string;
  };
  implementationConsiderations?: string;
  securityIcon?: string;
  complianceImpact?: {
    frameworks: {
      compliant: string[];
      partiallyCompliant: string[];
      nonCompliant: string[];
    };
    requirements?: string[];
    remediationSteps?: string[];
  };
  codeExamples?: Array<{
    language: string;
    title: string;
    code: string;
  }>;
}

// Define all options as private internal constants
const _availabilityOptions: Record<SecurityLevel, EnhancedCIADetails> = {
  None: {
    description:
      "No availability measures are in place. The system may experience frequent unplanned downtime with no recovery process.",
    technical:
      "No redundancy, backup systems, monitoring, or disaster recovery procedures are implemented.",
    businessImpact:
      "Business operations completely stop during outages with significant revenue impact and potential long-term customer loss.",
    capex: 0,
    opex: 0,
    bg: getSecurityLevelColorPair("None").bg,
    text: getSecurityLevelColorPair("None").text,
    recommendations: [
      "Implement basic monitoring to detect outages (e.g., simple uptime checks)",
      "Create a simple backup process with regular verification",
      "Document manual recovery procedures with clear responsibilities",
      "Establish baseline uptime metrics to quantify current availability",
      "Identify critical systems that need availability improvements first",
    ],
    uptime: "<90%",
    businessImpactDetails: {
      financialImpact: {
        description:
          "Complete revenue loss during downtime periods with potential customer churn",
        riskLevel: "Critical Risk",
        annualRevenueLoss: "10-20% of annual revenue potential",
      },
      operationalImpact: {
        description:
          "Operations completely cease during outages with no recovery timeline predictability",
        riskLevel: "Critical Risk",
        meanTimeToRecover: "Unpredictable (hours to days)",
      },
      regulatory: {
        description:
          "Likely violates basic service agreements and regulatory requirements",
        riskLevel: "High Risk",
        complianceViolations: ["SLAs", "Basic industry standards"],
      },
    },
    securityIcon: "⚠️", // Add default icon
  },
  Low: {
    description:
      "Basic availability measures with significant limitations. Extended downtime expected during disruptions.",
    technical:
      "Manual backup processes, limited monitoring, basic documentation of recovery procedures.",
    businessImpact:
      "Extended business disruptions during system failures with substantial recovery effort.",
    capex: 5,
    opex: 3,
    bg: getSecurityLevelColorPair("Low").bg,
    text: getSecurityLevelColorPair("Low").text,
    recommendations: [
      "Implement scheduled backups",
      "Create basic monitoring alerts",
      "Document and test recovery procedures",
      "Set up simple status page for outage communication",
    ],
    uptime: "95%",
    rto: "24-48 hours",
    rpo: "24 hours",
    mttr: "12-24 hours",
    businessImpactDetails: {
      financialImpact: {
        description: "Revenue impact of 5-10% annually due to outages",
        riskLevel: "High Risk",
        annualRevenueLoss: "5-10% of annual revenue",
      },
      operationalImpact: {
        description:
          "Extended business disruptions requiring manual intervention",
        riskLevel: "High Risk",
        meanTimeToRecover: "12-24 hours",
      },
    },
    securityIcon: "🔒",
  },
  Moderate: {
    description:
      "Standard availability measures ensuring reasonable uptime. Limited redundancy with planned disaster recovery.",
    technical:
      "Scheduled backups, monitoring with alerts, documented recovery procedures, partial redundancy for critical components.",
    businessImpact:
      "Business disruptions are limited to several hours with defined recovery processes.",
    capex: 15,
    opex: 10,
    bg: getSecurityLevelColorPair("Moderate").bg,
    text: getSecurityLevelColorPair("Moderate").text,
    recommendations: [
      "Implement redundancy for critical components",
      "Set up automated backup systems",
      "Deploy comprehensive monitoring with alerting",
      "Create and test detailed disaster recovery plans",
      "Establish SLAs for service availability",
    ],
    uptime: "99%",
    rto: "4-8 hours",
    rpo: "4 hours",
    mttr: "2-4 hours",
    businessImpactDetails: {
      financialImpact: {
        description:
          "Revenue impact of 1-5% annually due to planned and unplanned downtime",
        riskLevel: "Medium Risk",
        annualRevenueLoss: "1-5% of annual revenue",
      },
      operationalImpact: {
        description: "Occasional disruptions with relatively quick recovery",
        riskLevel: "Medium Risk",
        meanTimeToRecover: "2-4 hours",
      },
    },
    securityIcon: "🛡️",
  },
  High: {
    description:
      "Robust availability with minimal unplanned downtime. Comprehensive redundancy and automated recovery systems.",
    technical:
      "N+1 redundancy, multi-region standby systems, automated failover, comprehensive monitoring with alerts, regular disaster recovery testing.",
    businessImpact:
      "Business continuity maintained through most disruptions with minimal customer impact.",
    capex: 30,
    opex: 20,
    bg: getSecurityLevelColorPair("High").bg,
    text: getSecurityLevelColorPair("High").text,
    recommendations: [
      "Deploy N+1 redundancy for all critical systems",
      "Implement automated failover mechanisms",
      "Set up multi-region standby systems",
      "Create comprehensive monitoring with automated alerts",
      "Establish regular disaster recovery testing",
      "Define clear escalation procedures",
    ],
    uptime: "99.9%",
    rto: "15-60 minutes",
    rpo: "15 minutes",
    mttr: "10-30 minutes",
    businessImpactDetails: {
      financialImpact: {
        description: "Minimal revenue impact under 1% annually",
        riskLevel: "Low Risk",
        annualRevenueLoss: "<1% of annual revenue",
      },
      operationalImpact: {
        description:
          "Very limited business disruptions with automated recovery",
        riskLevel: "Low Risk",
        meanTimeToRecover: "10-30 minutes",
      },
      strategic: {
        description:
          "Enables expansion into markets requiring high reliability",
        riskLevel: "Low Risk",
      },
    },
    securityIcon: "🛡️🛡️",
  },
  "Very High": {
    description:
      "Maximum availability with continuous operations. Multi-region redundancy, real-time replication, and automated recovery.",
    technical:
      "N+2 redundancy, multi-region active-active architecture, real-time replication, comprehensive monitoring with automated remediation.",
    businessImpact:
      "Continuous business operations maintained through all but catastrophic failures.",
    capex: 60,
    opex: 40,
    bg: getSecurityLevelColorPair("Very High").bg,
    text: getSecurityLevelColorPair("Very High").text,
    recommendations: [
      "Implement N+2 redundancy for all system components",
      "Deploy multi-region active-active architecture",
      "Set up real-time data replication",
      "Create automated remediation systems",
      "Establish 24/7 operations team coverage",
      "Conduct regular chaos engineering exercises",
    ],
    uptime: "99.99%",
    rto: "<5 minutes",
    rpo: "<1 minute",
    mttr: "<5 minutes",
    businessImpactDetails: {
      financialImpact: {
        description: "Negligible revenue impact from availability issues",
        riskLevel: "Minimal Risk",
      },
      operationalImpact: {
        description:
          "Near-continuous business operations with immediate automated recovery",
        riskLevel: "Minimal Risk",
        meanTimeToRecover: "<5 minutes",
      },
      strategic: {
        description: "Competitive advantage through superior reliability",
        riskLevel: "Minimal Risk",
      },
      regulatory: {
        description:
          "Meets most stringent regulatory availability requirements",
        riskLevel: "Minimal Risk",
        complianceViolations: [],
      },
    },
    securityIcon: "🛡️🛡️🛡️",
  },
};

// Create full integrity options with all levels
const _integrityOptions: Record<SecurityLevel, EnhancedCIADetails> = {
  None: {
    description:
      "No data integrity controls or validation mechanisms in place.",
    technical:
      "No input validation, checksums, audit logging, or data verification.",
    businessImpact:
      "High risk of data corruption affecting business decisions and operations.",
    capex: 0,
    opex: 0,
    bg: getSecurityLevelColorPair("None").bg,
    text: getSecurityLevelColorPair("None").text,
    recommendations: [
      "Implement basic input validation",
      "Add application-level data checks",
      "Create simple audit logs for critical changes",
    ],
    businessImpactDetails: {
      financialImpact: {
        description: "Financial reporting cannot be trusted",
        riskLevel: "Critical Risk",
      },
      operationalImpact: {
        description: "Decisions based on potentially corrupted data",
        riskLevel: "Critical Risk",
      },
    },
    validationMethod: "None",
  },
  Low: {
    description: "Basic data integrity with manual verification processes.",
    technical:
      "Simple input validation, basic access controls, manual checksums.",
    businessImpact:
      "Limited protection against data corruption with manual verification required.",
    capex: 5,
    opex: 3,
    bg: getSecurityLevelColorPair("Low").bg,
    text: getSecurityLevelColorPair("Low").text,
    recommendations: [
      "Implement server-side validation",
      "Create basic data verification checks",
      "Establish manual review processes",
    ],
    validationMethod: "Manual checks",
    businessImpactDetails: {
      financialImpact: {
        description: "Financial calculations may have errors",
        riskLevel: "High Risk",
      },
      operationalImpact: {
        description: "Data corruption may be detected but not prevented",
        riskLevel: "High Risk",
      },
    },
  },
  Moderate: {
    description: "Standard integrity controls with automated verification.",
    technical:
      "Comprehensive validation, checksums, version control, and audit logging.",
    businessImpact:
      "Most data corruption detected and correctable with audit trails.",
    capex: 15,
    opex: 10,
    bg: getSecurityLevelColorPair("Moderate").bg,
    text: getSecurityLevelColorPair("Moderate").text,
    recommendations: [
      "Implement comprehensive data validation",
      "Use database constraints and triggers",
      "Set up automated integrity checking",
    ],
    validationMethod: "Automated validation",
    businessImpactDetails: {
      financialImpact: {
        description: "Financial data generally trustworthy",
        riskLevel: "Medium Risk",
      },
      operationalImpact: {
        description: "Most data corruption detected and correctable",
        riskLevel: "Medium Risk",
      },
      regulatory: {
        description: "Meets basic regulatory requirements for data integrity",
        riskLevel: "Medium Risk",
      },
    },
  },
  High: {
    description: "Advanced integrity with cryptographic verification.",
    technical:
      "Digital signatures, hash verification, tamper-resistant audit logs.",
    businessImpact:
      "Strong data integrity guarantees with cryptographic verification.",
    capex: 30,
    opex: 20,
    bg: getSecurityLevelColorPair("High").bg,
    text: getSecurityLevelColorPair("High").text,
    recommendations: [
      "Implement digital signatures for critical data",
      "Deploy cryptographic hash validation",
      "Set up immutable audit logging",
    ],
    validationMethod: "Cryptographic verification",
    businessImpactDetails: {
      financialImpact: {
        description: "Financial data highly trustworthy",
        riskLevel: "Low Risk",
      },
      operationalImpact: {
        description: "All changes tracked and validated",
        riskLevel: "Low Risk",
      },
      regulatory: {
        description: "Meets stringent compliance requirements",
        riskLevel: "Low Risk",
      },
    },
  },
  "Very High": {
    description: "Maximum integrity with blockchain or similar technology.",
    technical:
      "Multi-party verification, blockchain-based ledgers, zero-knowledge proofs.",
    businessImpact:
      "Complete data integrity guarantees with immutable audit trails.",
    capex: 60,
    opex: 40,
    bg: getSecurityLevelColorPair("Very High").bg,
    text: getSecurityLevelColorPair("Very High").text,
    recommendations: [
      "Implement blockchain for critical data",
      "Deploy multi-party verification systems",
      "Use zero-knowledge proofs where applicable",
    ],
    validationMethod: "Blockchain/distributed ledger",
    businessImpactDetails: {
      financialImpact: {
        description: "Complete financial data trustworthiness",
        riskLevel: "Minimal Risk",
      },
      operationalImpact: {
        description: "Data integrity guaranteed with cryptographic certainty",
        riskLevel: "Minimal Risk",
      },
      strategic: {
        description: "Enables business in highly-regulated industries",
        riskLevel: "Minimal Risk",
      },
    },
  },
};

// Create full confidentiality options with all levels
const _confidentialityOptions: Record<SecurityLevel, EnhancedCIADetails> = {
  None: {
    description:
      "No confidentiality controls to protect sensitive information.",
    technical: "No access controls, encryption, or data classification.",
    businessImpact:
      "All information is accessible to anyone with system access.",
    capex: 0,
    opex: 0,
    bg: getSecurityLevelColorPair("None").bg,
    text: getSecurityLevelColorPair("None").text,
    recommendations: [
      "Implement basic authentication",
      "Add simple authorization controls",
      "Create data classification scheme",
    ],
    protectionMethod: "None",
    businessImpactDetails: {
      reputationalImpact: {
        description: "All data accessible to unauthorized parties",
        riskLevel: "Critical Risk",
      },
      regulatory: {
        description: "Non-compliant with all data protection regulations",
        riskLevel: "Critical Risk",
        complianceViolations: ["GDPR", "CCPA", "HIPAA", "PCI-DSS"],
      },
    },
  },
  Low: {
    description: "Basic confidentiality with simple access controls.",
    technical: "Password protection, basic roles, minimal encryption.",
    businessImpact: "Basic protection against casual access attempts.",
    capex: 5,
    opex: 3,
    bg: getSecurityLevelColorPair("Low").bg,
    text: getSecurityLevelColorPair("Low").text,
    recommendations: [
      "Implement proper authentication system",
      "Set up role-based access control",
      "Enable TLS for all connections",
    ],
    protectionMethod: "Basic access control",
    businessImpactDetails: {
      reputationalImpact: {
        description: "Sensitive data may be exposed",
        riskLevel: "High Risk",
      },
      regulatory: {
        description: "May violate basic privacy requirements",
        riskLevel: "High Risk",
      },
    },
  },
  Moderate: {
    description: "Standard confidentiality with encryption for sensitive data.",
    technical:
      "Strong authentication, role-based access control, encryption at rest and in transit.",
    businessImpact:
      "Reasonable protection for sensitive information against common threats.",
    capex: 15,
    opex: 10,
    bg: getSecurityLevelColorPair("Moderate").bg,
    text: getSecurityLevelColorPair("Moderate").text,
    recommendations: [
      "Implement encryption for data at rest",
      "Set up comprehensive access controls",
      "Establish security monitoring",
    ],
    protectionMethod: "Standard encryption",
    businessImpactDetails: {
      reputationalImpact: {
        description: "Most sensitive data protected",
        riskLevel: "Medium Risk",
      },
      regulatory: {
        description: "Complies with standard data protection regulations",
        riskLevel: "Medium Risk",
      },
    },
  },
  High: {
    description:
      "Advanced confidentiality with strong encryption and access controls.",
    technical:
      "Multi-factor authentication, strong encryption, fine-grained access controls, security monitoring.",
    businessImpact:
      "Strong protection for sensitive information against sophisticated threats.",
    capex: 30,
    opex: 20,
    bg: getSecurityLevelColorPair("High").bg,
    text: getSecurityLevelColorPair("High").text,
    recommendations: [
      "Implement multi-factor authentication",
      "Deploy end-to-end encryption",
      "Establish security information management",
    ],
    protectionMethod: "E2E encryption",
    businessImpactDetails: {
      reputationalImpact: {
        description: "Strong protection for sensitive data",
        riskLevel: "Low Risk",
      },
      regulatory: {
        description: "Meets stringent privacy requirements",
        riskLevel: "Low Risk",
      },
    },
  },
  "Very High": {
    description: "Maximum confidentiality with military-grade protection.",
    technical:
      "Advanced encryption, hardware security modules, strict access controls, comprehensive monitoring.",
    businessImpact:
      "Maximum protection for highly sensitive or classified information.",
    capex: 60,
    opex: 40,
    bg: getSecurityLevelColorPair("Very High").bg,
    text: getSecurityLevelColorPair("Very High").text,
    recommendations: [
      "Implement quantum-resistant algorithms",
      "Deploy hardware security modules",
      "Establish zero-trust architecture",
    ],
    protectionMethod: "Military-grade encryption",
    businessImpactDetails: {
      reputationalImpact: {
        description: "Maximum protection for sensitive information",
        riskLevel: "Minimal Risk",
      },
      strategic: {
        description: "Enables handling of top-secret or classified information",
        riskLevel: "Minimal Risk",
      },
    },
  },
};

// ROI estimates with proper typing
const _ROI_ESTIMATES: ROIEstimatesMap = {
  NONE: {
    returnRate: "0%",
    description:
      "No security investment results in no cost avoidance or operational benefits.",
    potentialSavings: "$0",
    breakEvenPeriod: "N/A",
  },
  LOW: {
    returnRate: "10-15%",
    description:
      "Basic security measures provide modest protection. Returns here are minimal and highly dependent on effective process integration.",
    potentialSavings: "$1,000-$5,000",
    breakEvenPeriod: "18-24 months",
  },
  MODERATE: {
    returnRate: "15-25%",
    description:
      "Standard security investments deliver moderate cost avoidance. Benefits are realized over time and depend on consistent operational support.",
    potentialSavings: "$5,000-$20,000",
    breakEvenPeriod: "12-18 months",
  },
  HIGH: {
    returnRate: "25-35%",
    description:
      "Advanced security measures can yield significant cost avoidance, though returns vary with quality of implementation and external factors.",
    potentialSavings: "$20,000-$80,000",
    breakEvenPeriod: "8-12 months",
  },
  VERY_HIGH: {
    returnRate: "30-45%",
    description:
      "Maximum security investments offer the highest potential returns, yet require substantial upfront expenditure. Actual ROI remains highly variable.",
    potentialSavings: "$80,000-$150,000",
    breakEvenPeriod: "6-9 months",
    implementationCost: "High initial investment",
  },
};

// Expose constants for external use - avoiding duplicate exports
export const availabilityOptions = _availabilityOptions;
export const integrityOptions = _integrityOptions;
export const confidentialityOptions = _confidentialityOptions;
export const ROI_ESTIMATES = _ROI_ESTIMATES;

/**
 * Custom hook for accessing CIA security options with memoization
 */
export function useCIAOptions() {
  // Memoize individual objects to prevent unnecessary re-renders
  const availabilityOpts = useMemo(() => _availabilityOptions, []);
  const integrityOpts = useMemo(() => _integrityOptions, []);
  const confidentialityOpts = useMemo(() => _confidentialityOptions, []);
  const roiEstimates = useMemo(() => _ROI_ESTIMATES, []);

  // Memoize the combined object to prevent re-renders when hook is used
  return useMemo(
    () => ({
      availabilityOptions: availabilityOpts,
      integrityOptions: integrityOpts,
      confidentialityOptions: confidentialityOpts,
      ROI_ESTIMATES: roiEstimates,
    }),
    [availabilityOpts, integrityOpts, confidentialityOpts, roiEstimates]
  );
}

// Export CIADetails for backward compatibility
export type { CIADetails } from "../types/cia";
