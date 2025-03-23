import {
  availabilityData,
  confidentialityData,
  integrityData,
  roiEstimatesData,
} from "./security";

// Import CIADetails from types
import { CIADetails } from "../types/cia-services";

// Use imported data from their respective modules
/**
 * Availability options derived from security module.
 * Ensures system availability and uptime.
 */
export const availabilityOptions = availabilityData;

/**
 * Integrity options derived from security module.
 * Ensures data integrity and accuracy.
 */
export const integrityOptions = integrityData;

/**
 * Confidentiality options derived from security module.
 * Ensures data confidentiality and privacy.
 */
export const confidentialityOptions = confidentialityData;

/**
 * ROI estimates derived from security module.
 * Provides return on investment estimates.
 */
export const ROI_ESTIMATES = roiEstimatesData;

// Export types for documentation
export type { CIADetails };

import { SecurityLevel } from "../types/cia";
import { CIADataProvider } from "../types/cia-services";
import { getValuePoints } from "./valueCreationData";

/**
 * Default availability details for each security level
 */
const defaultAvailabilityOptions: Record<SecurityLevel, CIADetails> = {
  None: {
    description: "No guaranteed uptime or recovery capabilities.",
    technical: "No redundancy, backups, or disaster recovery.",
    businessImpact:
      "Critical disruption to business operations during outages.",
    capex: 0,
    opex: 0,
    bg: "#f8d7da",
    text: "#721c24",
    recommendations: ["Implement basic availability measures"],
    uptime: "<90%",
    rto: "Unpredictable",
    rpo: "No defined objective",
    mttr: "Days to weeks",
  },
  Low: {
    description: "Basic uptime with simple recovery mechanisms.",
    technical: "Basic backup procedures with minimal redundancy.",
    businessImpact: "Significant impact to operations during outages.",
    capex: 5,
    opex: 2,
    bg: "#fff3cd",
    text: "#856404",
    recommendations: [
      "Implement backup automation",
      "Define recovery procedures",
    ],
    uptime: "95-97%",
    rto: "24-48 hours",
    rpo: "24 hours",
    mttr: "12-24 hours",
  },
  Moderate: {
    description: "Standard uptime with documented recovery procedures.",
    technical: "Regular backups, some redundancy, documented recovery.",
    businessImpact: "Moderate impact to operations during outages.",
    capex: 10,
    opex: 5,
    bg: "#d1ecf1",
    text: "#0c5460",
    recommendations: ["Implement automated failover", "Enhance monitoring"],
    uptime: "98-99%",
    rto: "4-8 hours",
    rpo: "4 hours",
    mttr: "2-4 hours",
  },
  High: {
    description: "High uptime with rapid recovery capabilities.",
    technical:
      "Redundant components, automated recovery, proactive monitoring.",
    businessImpact: "Minimal impact to operations during outages.",
    capex: 15,
    opex: 8,
    bg: "#d4edda",
    text: "#155724",
    recommendations: ["Implement geo-redundancy", "Deploy load balancing"],
    uptime: "99.9%",
    rto: "15-60 minutes",
    rpo: "15 minutes",
    mttr: "15-30 minutes",
  },
  "Very High": {
    description: "Maximum uptime with near-instantaneous recovery.",
    technical:
      "Fully redundant architecture, geo-distributed, real-time replication.",
    businessImpact: "Negligible impact to operations during outages.",
    capex: 20,
    opex: 10,
    bg: "#cce5ff",
    text: "#004085",
    recommendations: [
      "Implement multi-region redundancy",
      "Deploy automatic failover",
    ],
    uptime: "99.99%+",
    rto: "<5 minutes",
    rpo: "Near zero",
    mttr: "<5 minutes",
  },
};

/**
 * Default integrity details for each security level
 */
const defaultIntegrityOptions: Record<SecurityLevel, CIADetails> = {
  None: {
    description: "No data integrity controls.",
    technical: "No validation, authentication, or audit trails.",
    businessImpact: "Critical risk of data corruption affecting decisions.",
    capex: 0,
    opex: 0,
    bg: "#f8d7da",
    text: "#721c24",
    recommendations: ["Implement basic data validation"],
    validationMethod: "None",
  },
  Low: {
    description: "Basic data validation with limited audit trails.",
    technical: "Simple input validation, basic error checking.",
    businessImpact: "High risk of data errors affecting operations.",
    capex: 5,
    opex: 2,
    bg: "#fff3cd",
    text: "#856404",
    recommendations: ["Implement data checksums", "Create basic audit logging"],
    validationMethod: "Basic checksums",
  },
  Moderate: {
    description: "Comprehensive data validation with audit trails.",
    technical:
      "Structured validation, integrity checks, comprehensive logging.",
    businessImpact: "Moderate risk of data issues affecting operations.",
    capex: 10,
    opex: 5,
    bg: "#d1ecf1",
    text: "#0c5460",
    recommendations: [
      "Implement cryptographic validation",
      "Enhance audit trails",
    ],
    validationMethod: "Checksums with validation",
  },
  High: {
    description:
      "Advanced integrity protection with cryptographic verification.",
    technical:
      "Cryptographic verification, digital signatures, tamper detection.",
    businessImpact: "Low risk of data integrity issues.",
    capex: 15,
    opex: 8,
    bg: "#d4edda",
    text: "#155724",
    recommendations: [
      "Implement blockchain for critical data",
      "Add non-repudiation",
    ],
    validationMethod: "Cryptographic hashing",
  },
  "Very High": {
    description: "Maximum integrity protection with blockchain validation.",
    technical:
      "Blockchain verification, advanced signatures, immutable audit logs.",
    businessImpact: "Minimal risk of data integrity issues.",
    capex: 20,
    opex: 10,
    bg: "#cce5ff",
    text: "#004085",
    recommendations: [
      "Implement zero-knowledge proofs",
      "Add formal verification",
    ],
    validationMethod: "Blockchain with ZK proofs",
  },
};

/**
 * Default confidentiality details for each security level
 */
const defaultConfidentialityOptions: Record<SecurityLevel, CIADetails> = {
  None: {
    description: "No access controls or confidentiality protection.",
    technical: "No encryption, access control, or data classification.",
    businessImpact: "Critical risk of data exposure or theft.",
    capex: 0,
    opex: 0,
    bg: "#f8d7da",
    text: "#721c24",
    recommendations: [
      "Implement basic access controls",
      "Add user authentication",
    ],
    protectionMethod: "None",
  },
  Low: {
    description: "Basic access controls with minimal encryption.",
    technical: "Simple authorization, basic encryption at rest.",
    businessImpact: "High risk of unauthorized data access.",
    capex: 5,
    opex: 2,
    bg: "#fff3cd",
    text: "#856404",
    recommendations: ["Implement role-based access", "Encrypt sensitive data"],
    protectionMethod: "Basic access control",
  },
  Moderate: {
    description: "Role-based controls with standard encryption.",
    technical: "Role-based access, strong encryption, secure key management.",
    businessImpact: "Moderate risk of data exposure.",
    capex: 10,
    opex: 5,
    bg: "#d1ecf1",
    text: "#0c5460",
    recommendations: ["Implement MFA", "Add data loss prevention"],
    protectionMethod: "RBAC with encryption",
  },
  High: {
    description: "Advanced access controls with strong encryption.",
    technical: "Least privilege, MFA, end-to-end encryption, DLP.",
    businessImpact: "Low risk of data exposure or breach.",
    capex: 15,
    opex: 8,
    bg: "#d4edda",
    text: "#155724",
    recommendations: ["Implement zero trust architecture", "Add advanced DLP"],
    protectionMethod: "E2E encryption with MFA",
  },
  "Very High": {
    description:
      "Maximum confidentiality controls with zero trust architecture.",
    technical:
      "Zero trust, quantum-resistant encryption, strict data governance.",
    businessImpact: "Minimal risk of data exposure or breach.",
    capex: 20,
    opex: 10,
    bg: "#cce5ff",
    text: "#004085",
    recommendations: [
      "Implement quantum-resistant encryption",
      "Advanced threat detection",
    ],
    protectionMethod: "Zero trust with post-quantum crypto",
  },
};

/**
 * Default CIA Options Data Provider
 */
export const defaultCIADataProvider: CIADataProvider = {
  availabilityOptions: defaultAvailabilityOptions,
  integrityOptions: defaultIntegrityOptions,
  confidentialityOptions: defaultConfidentialityOptions,
  roiEstimates: {
    NONE: {
      returnRate: "0%",
      description: "No security investment means no security return.",
    },
    LOW: {
      returnRate: "50%",
      description:
        "Basic security controls provide limited return on investment.",
    },
    MODERATE: {
      returnRate: "150%",
      description:
        "Standard security controls offer positive return on investment.",
    },
    HIGH: {
      returnRate: "300%",
      description:
        "Advanced security controls deliver strong return on investment.",
    },
    VERY_HIGH: {
      returnRate: "500%",
      description:
        "Maximum security controls provide premium return on investment.",
    },
  },
  getDefaultValuePoints: getValuePoints,
  // Keep for backward compatibility
  getValuePoints: getValuePoints,
};

/**
 * Get CIA options for a specific component
 *
 * @param component - The CIA component to get options for
 * @returns Record of security levels and their details
 */
export function getCIAOptionsForComponent(
  component: "availability" | "integrity" | "confidentiality"
): Record<SecurityLevel, CIADetails> {
  switch (component) {
    case "availability":
      return defaultAvailabilityOptions;
    case "integrity":
      return defaultIntegrityOptions;
    case "confidentiality":
      return defaultConfidentialityOptions;
    default:
      return defaultAvailabilityOptions;
  }
}

/**
 * Get the implementation details for a specific component and level
 *
 * @param component - CIA component
 * @param level - Security level
 * @returns Implementation details
 */
export function getImplementationDetails(
  component: "availability" | "integrity" | "confidentiality",
  level: SecurityLevel
): { effort: string; expertise: string; timeframe: string } {
  const baseEffort: Record<SecurityLevel, string> = {
    None: "Minimal",
    Low: "Low",
    Moderate: "Medium",
    High: "Significant",
    "Very High": "Extensive",
  };

  const baseExpertise: Record<SecurityLevel, string> = {
    None: "Basic IT skills",
    Low: "Junior security professional",
    Moderate: "Mid-level security professional",
    High: "Senior security professional",
    "Very High": "Security expert/specialist",
  };

  const baseTimeframe: Record<SecurityLevel, string> = {
    None: "Days",
    Low: "1-2 weeks",
    Moderate: "1-2 months",
    High: "2-4 months",
    "Very High": "4-6 months",
  };

  // Adjust based on component
  let effortModifier = 1;
  let expertiseModifier = "";
  let timeframeModifier = 1;

  switch (component) {
    case "availability":
      effortModifier = 1.2; // Availability typically requires more infrastructure
      expertiseModifier = " with infrastructure focus";
      timeframeModifier = 1.1;
      break;
    case "integrity":
      effortModifier = 1;
      expertiseModifier = " with data management focus";
      timeframeModifier = 1;
      break;
    case "confidentiality":
      effortModifier = 0.9; // Confidentiality can often be implemented more quickly
      expertiseModifier = " with security focus";
      timeframeModifier = 0.9;
      break;
  }

  // Format the effort based on level and modifier
  const effort = baseEffort[level];

  // Combine expertise with modifier
  const expertise = baseExpertise[level] + expertiseModifier;

  // Adjust timeframe based on modifier
  const timeframe = baseTimeframe[level];

  return {
    effort,
    expertise,
    timeframe,
  };
}

export default defaultCIADataProvider;
