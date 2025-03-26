import { SecurityLevel } from "../types/cia";

/**
 * Compliance-related constants for the CIA Compliance Manager
 *
 * ## Business Perspective
 *
 * These constants define the compliance frameworks, requirements, and status
 * levels used throughout the application, providing consistent references for
 * compliance mapping and reporting. 📋
 */

/**
 * Compliance frameworks supported by the application
 */
export const COMPLIANCE_FRAMEWORKS = {
  ISO_27001: "ISO 27001",
  NIST_CSF: "NIST CSF",
  NIST_800_53: "NIST 800-53",
  PCI_DSS: "PCI DSS",
  HIPAA: "HIPAA",
  GDPR: "GDPR",
  SOC2: "SOC 2",
  CCPA: "CCPA",
  CIS: "CIS Controls",
  FedRAMP: "FedRAMP",
};

/**
 * Compliance status levels
 */
export const COMPLIANCE_STATUS = {
  NON_COMPLIANT: "Non-Compliant",
  PARTIALLY_COMPLIANT: "Partially Compliant",
  FULLY_COMPLIANT: "Fully Compliant",
};

/**
 * Descriptions for compliance frameworks
 */
export const FRAMEWORK_DESCRIPTIONS: Record<string, string> = {
  [COMPLIANCE_FRAMEWORKS.ISO_27001]:
    "International standard for information security management systems",
  [COMPLIANCE_FRAMEWORKS.NIST_CSF]:
    "Framework for improving critical infrastructure cybersecurity",
  [COMPLIANCE_FRAMEWORKS.NIST_800_53]:
    "Security and privacy controls for federal information systems",
  [COMPLIANCE_FRAMEWORKS.PCI_DSS]:
    "Payment Card Industry Data Security Standard for protecting cardholder data",
  [COMPLIANCE_FRAMEWORKS.HIPAA]:
    "Health Insurance Portability and Accountability Act for protecting health information",
  [COMPLIANCE_FRAMEWORKS.GDPR]:
    "General Data Protection Regulation for protecting personal data in the EU",
  [COMPLIANCE_FRAMEWORKS.SOC2]:
    "System and Organization Controls for service organizations' security",
  [COMPLIANCE_FRAMEWORKS.CCPA]:
    "California Consumer Privacy Act for protecting consumer privacy rights",
  [COMPLIANCE_FRAMEWORKS.CIS]:
    "Center for Internet Security Controls for best practice security",
  [COMPLIANCE_FRAMEWORKS.FedRAMP]:
    "Federal Risk and Authorization Management Program for cloud services",
};

/**
 * Regulatory regions
 */
export const REGULATORY_REGIONS = {
  US: "United States",
  EU: "European Union",
  UK: "United Kingdom",
  GLOBAL: "Global",
  AUSTRALIA: "Australia",
  CANADA: "Canada",
  JAPAN: "Japan",
  SINGAPORE: "Singapore",
  BRAZIL: "Brazil",
};

/**
 * Industry sectors for compliance
 */
export const INDUSTRY_SECTORS = {
  HEALTHCARE: "Healthcare",
  FINANCE: "Finance",
  RETAIL: "Retail",
  TECHNOLOGY: "Technology",
  GOVERNMENT: "Government",
  EDUCATION: "Education",
  MANUFACTURING: "Manufacturing",
  ENERGY: "Energy",
  TRANSPORTATION: "Transportation",
  TELECOMMUNICATIONS: "Telecommunications",
};

/**
 * Framework requirements by security level for availability
 */
export const AVAILABILITY_REQUIREMENTS: Record<
  string,
  Record<SecurityLevel, string[]>
> = {
  [COMPLIANCE_FRAMEWORKS.ISO_27001]: {
    None: [],
    Low: ["Basic backup procedures", "Simple disaster recovery plan"],
    Moderate: [
      "Regular backup testing",
      "Documented recovery procedures",
      "Redundancy for critical systems",
    ],
    High: [
      "Comprehensive disaster recovery plan",
      "Automatic failover for critical systems",
      "Regular DR testing",
    ],
    "Very High": [
      "Full redundancy across all systems",
      "Near-zero RTO/RPO",
      "Continuous availability monitoring",
    ],
  },
  // Additional frameworks could be added here
};

/**
 * Framework requirements by security level for integrity
 */
export const INTEGRITY_REQUIREMENTS: Record<
  string,
  Record<SecurityLevel, string[]>
> = {
  [COMPLIANCE_FRAMEWORKS.ISO_27001]: {
    None: [],
    Low: ["Basic input validation", "Error checking", "Simple access controls"],
    Moderate: [
      "Data validation processes",
      "Integrity checking",
      "Audit trails",
      "Change management",
    ],
    High: [
      "Cryptographic controls",
      "Digital signatures",
      "Comprehensive audit logs",
      "Tamper detection",
    ],
    "Very High": [
      "Advanced integrity verification",
      "Blockchain or similar technology",
      "Immutable audit trails",
    ],
  },
  // Additional frameworks could be added here
};

/**
 * Framework requirements by security level for confidentiality
 */
export const CONFIDENTIALITY_REQUIREMENTS: Record<
  string,
  Record<SecurityLevel, string[]>
> = {
  [COMPLIANCE_FRAMEWORKS.ISO_27001]: {
    None: [],
    Low: ["Basic access controls", "Password policies", "Data classification"],
    Moderate: [
      "Role-based access control",
      "Encryption for sensitive data",
      "Secure disposal processes",
    ],
    High: [
      "Multi-factor authentication",
      "Encryption in transit and at rest",
      "DLP solutions",
      "Access monitoring",
    ],
    "Very High": [
      "End-to-end encryption",
      "Zero-trust architecture",
      "Advanced threat protection",
      "Data tokenization",
    ],
  },
  // Additional frameworks could be added here
};

/**
 * Minimum security levels required for each framework
 */
export const FRAMEWORK_MINIMUM_LEVELS: Record<
  string,
  {
    availability: SecurityLevel;
    integrity: SecurityLevel;
    confidentiality: SecurityLevel;
  }
> = {
  [COMPLIANCE_FRAMEWORKS.ISO_27001]: {
    availability: "Moderate",
    integrity: "Moderate",
    confidentiality: "Moderate",
  },
  [COMPLIANCE_FRAMEWORKS.NIST_CSF]: {
    availability: "Moderate",
    integrity: "Moderate",
    confidentiality: "Moderate",
  },
  [COMPLIANCE_FRAMEWORKS.NIST_800_53]: {
    availability: "High",
    integrity: "High",
    confidentiality: "High",
  },
  [COMPLIANCE_FRAMEWORKS.PCI_DSS]: {
    availability: "Moderate",
    integrity: "High",
    confidentiality: "High",
  },
  [COMPLIANCE_FRAMEWORKS.HIPAA]: {
    availability: "Moderate",
    integrity: "High",
    confidentiality: "High",
  },
  [COMPLIANCE_FRAMEWORKS.GDPR]: {
    availability: "Low",
    integrity: "Moderate",
    confidentiality: "High",
  },
  [COMPLIANCE_FRAMEWORKS.SOC2]: {
    availability: "Moderate",
    integrity: "Moderate",
    confidentiality: "Moderate",
  },
  // Additional frameworks could be added here
};

/**
 * Get the required security level for a specific framework and component
 *
 * @param framework - Compliance framework
 * @param component - CIA component
 * @returns Required security level
 */
export function getRequiredSecurityLevel(
  framework: string,
  component: "availability" | "integrity" | "confidentiality"
): SecurityLevel {
  return FRAMEWORK_MINIMUM_LEVELS[framework]?.[component] || "Moderate";
}
