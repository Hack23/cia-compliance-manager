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
