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
 * Constants and configurations for compliance frameworks
 */

export interface ComplianceFramework {
  name: string;
  description: string;
  requirements: string[];
  url: string;
}

export const COMPLIANCE_FRAMEWORKS: Record<string, ComplianceFramework> = {
  NIST800_53: {
    name: "NIST 800-53",
    description:
      "Security and Privacy Controls for Information Systems and Organizations",
    requirements: [
      "Access Control",
      "Awareness and Training",
      "Audit and Accountability",
    ],
    url: "https://csrc.nist.gov/publications/detail/sp/800-53/rev-5/final",
  },
  ISO27001: {
    name: "ISO 27001",
    description: "Information Security Management",
    requirements: [
      "Information Security Policies",
      "Organization of Information Security",
    ],
    url: "https://www.iso.org/isoiec-27001-information-security.html",
  },
  GDPR: {
    name: "GDPR",
    description: "General Data Protection Regulation",
    requirements: ["Data Subject Rights", "Data Protection Impact Assessment"],
    url: "https://gdpr.eu/",
  },
  HIPAA: {
    name: "HIPAA",
    description: "Health Insurance Portability and Accountability Act",
    requirements: ["Privacy Rule", "Security Rule", "Breach Notification Rule"],
    url: "https://www.hhs.gov/hipaa/",
  },
  SOC2: {
    name: "SOC2",
    description: "Service Organization Control 2",
    requirements: ["Security", "Availability", "Processing Integrity"],
    url: "https://www.aicpa.org/interestareas/frc/assuranceadvisoryservices/sorhome.html",
  },
  PCI_DSS: {
    name: "PCI DSS",
    description: "Payment Card Industry Data Security Standard",
    requirements: [
      "Build and Maintain Secure Network",
      "Protect Cardholder Data",
    ],
    url: "https://www.pcisecuritystandards.org/",
  },
};

/**
 * Standardized compliance status levels
 */
export const COMPLIANCE_STATUS_LEVELS = {
  COMPLIANT: "compliant",
  PARTIALLY_COMPLIANT: "partially_compliant",
  NON_COMPLIANT: "non_compliant"
};

/**
 * Framework requirements mapping security levels to compliance frameworks
 */
export const FRAMEWORK_REQUIREMENTS = {
  "ISO 27001": {
    availability: {
      minimum: "Moderate" as SecurityLevel,
      recommended: "High" as SecurityLevel
    },
    integrity: {
      minimum: "Moderate" as SecurityLevel,
      recommended: "High" as SecurityLevel
    },
    confidentiality: {
      minimum: "Moderate" as SecurityLevel,
      recommended: "High" as SecurityLevel
    },
    description: "Information Security Management System (ISMS) standard",
    controls: [
      "A.17.1 - Information security continuity",
      "A.12.1 - Operational procedures and responsibilities",
      "A.8.2 - Information classification"
    ]
  },
  "NIST CSF": {
    availability: {
      minimum: "Moderate" as SecurityLevel,
      recommended: "High" as SecurityLevel
    },
    integrity: {
      minimum: "High" as SecurityLevel,
      recommended: "Very High" as SecurityLevel
    },
    confidentiality: {
      minimum: "Moderate" as SecurityLevel,
      recommended: "High" as SecurityLevel
    },
    description: "Cybersecurity Framework for improving critical infrastructure",
    controls: [
      "ID.AM - Asset Management",
      "PR.DS - Data Security",
      "PR.AC - Access Control",
      "DE.CM - Security Continuous Monitoring",
      "RC.RP - Recovery Planning"
    ]
  },
  "GDPR": {
    availability: {
      minimum: "Low" as SecurityLevel,
      recommended: "Moderate" as SecurityLevel
    },
    integrity: {
      minimum: "Moderate" as SecurityLevel,
      recommended: "High" as SecurityLevel
    },
    confidentiality: {
      minimum: "High" as SecurityLevel,
      recommended: "Very High" as SecurityLevel
    },
    description: "General Data Protection Regulation for EU personal data",
    controls: [
      "Article 5 - Principles relating to processing of personal data",
      "Article 25 - Data protection by design and by default",
      "Article 32 - Security of processing"
    ]
  },
  "HIPAA": {
    availability: {
      minimum: "High" as SecurityLevel,
      recommended: "Very High" as SecurityLevel
    },
    integrity: {
      minimum: "High" as SecurityLevel,
      recommended: "Very High" as SecurityLevel
    },
    confidentiality: {
      minimum: "High" as SecurityLevel,
      recommended: "Very High" as SecurityLevel
    },
    description: "Health Insurance Portability and Accountability Act",
    controls: [
      "164.306 - Security standards",
      "164.308 - Administrative safeguards",
      "164.312 - Technical safeguards"
    ]
  },
  "PCI DSS": {
    availability: {
      minimum: "Moderate" as SecurityLevel,
      recommended: "High" as SecurityLevel
    },
    integrity: {
      minimum: "High" as SecurityLevel,
      recommended: "Very High" as SecurityLevel
    },
    confidentiality: {
      minimum: "High" as SecurityLevel,
      recommended: "Very High" as SecurityLevel
    },
    description: "Payment Card Industry Data Security Standard",
    controls: [
      "Requirement 3: Protect stored cardholder data",
      "Requirement 4: Encrypt transmission of cardholder data",
      "Requirement 6: Develop and maintain secure systems and applications",
      "Requirement 10: Track and monitor all access to network resources and cardholder data"
    ]
  },
  "SOC2": {
    availability: {
      minimum: "Moderate" as SecurityLevel,
      recommended: "High" as SecurityLevel
    },
    integrity: {
      minimum: "Moderate" as SecurityLevel,
      recommended: "High" as SecurityLevel
    },
    confidentiality: {
      minimum: "High" as SecurityLevel,
      recommended: "Very High" as SecurityLevel
    },
    description: "Service Organization Control 2",
    controls: [
      "CC7.1 - Availability principle criteria",
      "CC5.1 - Logical access security",
      "CC6.1 - System operations",
      "CC4.1 - Risk assessment"
    ]
  }
};

/**
 * Compliance frameworks grouped by category
 */
export const COMPLIANCE_FRAMEWORK_CATEGORIES = {
  general: ["ISO 27001", "NIST CSF"],
  privacy: ["GDPR", "HIPAA"],
  industry: ["PCI DSS", "SOC2"]
};

/**
 * Mapping of security levels to framework compliance status
 */
export const SECURITY_LEVEL_COMPLIANCE_MAPPING = {
  None: {
    "ISO 27001": COMPLIANCE_STATUS_LEVELS.NON_COMPLIANT,
    "NIST CSF": COMPLIANCE_STATUS_LEVELS.NON_COMPLIANT,
    "GDPR": COMPLIANCE_STATUS_LEVELS.NON_COMPLIANT,
    "HIPAA": COMPLIANCE_STATUS_LEVELS.NON_COMPLIANT,
    "PCI DSS": COMPLIANCE_STATUS_LEVELS.NON_COMPLIANT,
    "SOC2": COMPLIANCE_STATUS_LEVELS.NON_COMPLIANT
  },
  Low: {
    "ISO 27001": COMPLIANCE_STATUS_LEVELS.NON_COMPLIANT,
    "NIST CSF": COMPLIANCE_STATUS_LEVELS.NON_COMPLIANT,
    "GDPR": COMPLIANCE_STATUS_LEVELS.PARTIALLY_COMPLIANT,
    "HIPAA": COMPLIANCE_STATUS_LEVELS.NON_COMPLIANT,
    "PCI DSS": COMPLIANCE_STATUS_LEVELS.NON_COMPLIANT,
    "SOC2": COMPLIANCE_STATUS_LEVELS.NON_COMPLIANT
  },
  Moderate: {
    "ISO 27001": COMPLIANCE_STATUS_LEVELS.PARTIALLY_COMPLIANT,
    "NIST CSF": COMPLIANCE_STATUS_LEVELS.PARTIALLY_COMPLIANT,
    "GDPR": COMPLIANCE_STATUS_LEVELS.PARTIALLY_COMPLIANT,
    "HIPAA": COMPLIANCE_STATUS_LEVELS.PARTIALLY_COMPLIANT,
    "PCI DSS": COMPLIANCE_STATUS_LEVELS.PARTIALLY_COMPLIANT,
    "SOC2": COMPLIANCE_STATUS_LEVELS.PARTIALLY_COMPLIANT
  },
  High: {
    "ISO 27001": COMPLIANCE_STATUS_LEVELS.COMPLIANT,
    "NIST CSF": COMPLIANCE_STATUS_LEVELS.COMPLIANT,
    "GDPR": COMPLIANCE_STATUS_LEVELS.COMPLIANT,
    "HIPAA": COMPLIANCE_STATUS_LEVELS.COMPLIANT,
    "PCI DSS": COMPLIANCE_STATUS_LEVELS.COMPLIANT,
    "SOC2": COMPLIANCE_STATUS_LEVELS.COMPLIANT
  },
  "Very High": {
    "ISO 27001": COMPLIANCE_STATUS_LEVELS.COMPLIANT,
    "NIST CSF": COMPLIANCE_STATUS_LEVELS.COMPLIANT,
    "GDPR": COMPLIANCE_STATUS_LEVELS.COMPLIANT,
    "HIPAA": COMPLIANCE_STATUS_LEVELS.COMPLIANT,
    "PCI DSS": COMPLIANCE_STATUS_LEVELS.COMPLIANT,
    "SOC2": COMPLIANCE_STATUS_LEVELS.COMPLIANT
  }
};
