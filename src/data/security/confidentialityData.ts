import { SecurityLevel } from "../../types/cia";
import { CIADetails } from "../../types/cia-services";
import { getSecurityLevelColorPair } from "../../utils/colorUtils";

/**
 * Detailed confidentiality security options for each security level
 *
 * ## Business Perspective
 *
 * These options define the technical and business implications of different
 * confidentiality security levels, focusing on data protection, access controls,
 * and privacy considerations. 🔒
 */
const confidentialityData: Record<SecurityLevel, CIADetails> = {
  None: {
    description:
      "No confidentiality controls are implemented, leaving sensitive information fully exposed to any user with system access.",
    technical:
      "There are no access controls, no encryption measures, and no data classification processes.",
    businessImpact:
      "This exposes the organization to severe reputational damage and regulatory non-compliance, with potential legal penalties if sensitive data is compromised.",
    capex: 0,
    opex: 0,
    bg: getSecurityLevelColorPair("None").bg,
    text: getSecurityLevelColorPair("None").text,
    recommendations: [
      "Implement basic authentication mechanisms",
      "Introduce simple authorization controls",
      "Establish a rudimentary data classification scheme",
    ],
    protectionMethod: "None",
    businessImpactDetails: {
      summary: "Analysis of data confidentiality impacts",
      reputational: {
        description:
          "Without confidentiality controls, sensitive information can be accessed by unauthorized parties, severely damaging customer trust and brand reputation.",
        riskLevel: "Critical",
      },
      financial: {
        description: "Reduced risk of financial penalties from data breaches",
        riskLevel: "Low",
      },
      operational: {
        description: "Smooth operations with secure data flows",
        riskLevel: "Low",
      },
      regulatory: {
        description:
          "Non-compliance with data protection regulations is highly likely, potentially resulting in fines and legal action.",
        riskLevel: "Critical",
        complianceViolations: ["GDPR", "CCPA", "HIPAA", "PCI-DSS"],
      },
    },
    securityIcon: "⚠️",
    valuePoints: [
      "No confidentiality safeguards",
      "All data accessible to anyone with system access",
      "High risk of data exposure and theft",
      "No protection for sensitive information",
      "Not suitable for handling personal or proprietary data",
    ],
    technicalImplementation: {
      description: "No confidentiality controls implemented",
      implementationSteps: [
        "No implementation required as no controls are in place",
        "Consider documenting current data access as a baseline",
      ],
      effort: {
        development: "None",
        maintenance: "None",
        expertise: "None",
      },
    },
  },
  Low: {
    description:
      "Basic confidentiality measures are in place but provide only minimal protection against unauthorized access.",
    technical:
      "Relies on password protection, basic role-based access controls, and minimal encryption.",
    businessImpact:
      "Sensitive data is somewhat protected, but the risk of exposure remains high, potentially leading to moderate reputational harm and regulatory challenges.",
    capex: 5,
    opex: 3,
    bg: getSecurityLevelColorPair("Low").bg,
    text: getSecurityLevelColorPair("Low").text,
    recommendations: [
      "Upgrade to a robust authentication system",
      "Implement comprehensive role-based access controls",
      "Enforce TLS/SSL for all data in transit",
    ],
    protectionMethod: "Basic access control",
    businessImpactDetails: {
      summary: "Analysis of data confidentiality impacts",
      reputational: {
        description:
          "Exposure of sensitive data is possible, which could lead to moderate damage to the organization's reputation if an incident occurs.",
        riskLevel: "High",
      },
      financial: {
        description: "Reduced risk of financial penalties from data breaches",
        riskLevel: "Low",
      },
      operational: {
        description: "Smooth operations with secure data flows",
        riskLevel: "Low",
      },
      regulatory: {
        description:
          "Existing measures may not fully satisfy privacy regulations, leading to potential fines or legal scrutiny.",
        riskLevel: "High",
      },
    },
    securityIcon: "🔑",
    valuePoints: [
      "Basic confidentiality with password protection",
      "Simple access controls for data access",
      "Limited protection for sensitive information",
      "Suitable for internal, less sensitive data",
      "Provides foundation for data protection initiatives",
    ],
    technicalImplementation: {
      description: "Basic authentication and access control",
      implementationSteps: [
        "Implement password-based authentication",
        "Set up basic role-based access controls",
        "Configure transport layer security (TLS)",
      ],
      effort: {
        development: "Days (1-5)",
        maintenance: "Monthly password resets and access reviews",
        expertise: "Junior IT security staff",
      },
    },
  },
  Moderate: {
    description:
      "Standard confidentiality measures provide a reasonable level of protection for sensitive information under typical threat scenarios.",
    technical:
      "Utilizes strong authentication, role-based access control, and encryption both at rest and in transit.",
    businessImpact:
      "Most unauthorized access attempts are thwarted, reducing the risk of data breaches. However, sophisticated threats might still pose a risk, leading to moderate operational and reputational impacts.",
    capex: 15,
    opex: 10,
    bg: getSecurityLevelColorPair("Moderate").bg,
    text: getSecurityLevelColorPair("Moderate").text,
    recommendations: [
      "Implement robust encryption for data both at rest and in transit",
      "Regularly review and update access controls",
      "Establish continuous monitoring and auditing of data access",
    ],
    protectionMethod: "Standard encryption",
    businessImpactDetails: {
      summary: "Analysis of data confidentiality impacts",
      reputational: {
        description:
          "Sensitive data is largely protected, mitigating the risk of reputational damage in the event of an incident.",
        riskLevel: "Medium",
      },
      financial: {
        description: "Reduced risk of financial penalties from data breaches",
        riskLevel: "Low",
      },
      operational: {
        description: "Smooth operations with secure data flows",
        riskLevel: "Low",
      },
      regulatory: {
        description:
          "Generally meets standard data protection requirements, though vulnerabilities may remain against highly sophisticated attacks.",
        riskLevel: "Medium",
      },
    },
    securityIcon: "🔓",
    valuePoints: [
      "Standard confidentiality with encryption protections",
      "Role-based access controls for data protection",
      "Encryption for data at rest and in transit",
      "Suitable for most business applications with sensitive data",
      "Meets requirements for standard regulatory compliance",
    ],
    technicalImplementation: {
      description: "Encryption and role-based access control",
      implementationSteps: [
        "Implement strong authentication mechanisms",
        "Configure comprehensive role-based access control",
        "Deploy encryption for sensitive data at rest and in transit",
        "Set up access logging and monitoring",
      ],
      effort: {
        development: "Weeks (2-3)",
        maintenance: "Quarterly access reviews, monthly updates",
        expertise: "Mid-level security professionals",
      },
    },
  },
  High: {
    description:
      "Advanced confidentiality measures provide strong protection against unauthorized access to sensitive information.",
    technical:
      "Employs multi-factor authentication, robust encryption, fine-grained access controls, and continuous security monitoring.",
    businessImpact:
      "Significantly reduces the risk of data breaches, thereby minimizing reputational damage and ensuring compliance with stringent regulatory standards.",
    capex: 30,
    opex: 20,
    bg: getSecurityLevelColorPair("High").bg,
    text: getSecurityLevelColorPair("High").text,
    recommendations: [
      "Deploy multi-factor authentication across all user access points",
      "Implement end-to-end encryption and conduct regular security audits",
      "Establish comprehensive monitoring of data access and activity",
    ],
    protectionMethod: "E2E encryption",
    businessImpactDetails: {
      summary: "Analysis of data confidentiality impacts",
      reputational: {
        description:
          "High-level measures substantially reduce the risk of sensitive data exposure, protecting the organization's reputation.",
        riskLevel: "Low",
      },
      financial: {
        description: "Reduced risk of financial penalties from data breaches",
        riskLevel: "Low",
      },
      operational: {
        description: "Smooth operations with secure data flows",
        riskLevel: "Low",
      },
      regulatory: {
        description:
          "Measures meet or exceed many regulatory requirements, thereby reducing legal risks.",
        riskLevel: "Low",
      },
    },
    securityIcon: "🔒",
    valuePoints: [
      "Strong confidentiality with advanced encryption",
      "Multi-factor authentication for secure access",
      "Fine-grained access controls with least privilege",
      "Suitable for sensitive financial and personal data",
      "Meets requirements for most regulatory frameworks",
    ],
    technicalImplementation: {
      description: "Advanced encryption and multi-factor authentication",
      implementationSteps: [
        "Deploy multi-factor authentication system",
        "Implement end-to-end encryption for sensitive data",
        "Configure fine-grained access controls",
        "Set up comprehensive security monitoring",
        "Establish regular security audit procedures",
      ],
      effort: {
        development: "Months (2-3)",
        maintenance: "Bi-weekly security reviews, continuous monitoring",
        expertise: "Senior security engineers",
      },
    },
  },
  "Very High": {
    description:
      "Maximum confidentiality measures provide comprehensive protection for highly sensitive information requiring the utmost security.",
    technical:
      "Utilizes military-grade encryption, hardware security modules, zero-trust architecture, and continuous threat monitoring and response.",
    businessImpact:
      "Provides the highest level of data protection required for regulated industries, government contractors, or organizations handling extremely sensitive data.",
    capex: 60,
    opex: 40,
    bg: getSecurityLevelColorPair("Very High").bg,
    text: getSecurityLevelColorPair("Very High").text,
    recommendations: [
      "Implement zero-trust security architecture",
      "Deploy advanced encryption with quantum-resistant algorithms",
      "Establish comprehensive data security governance program",
      "Conduct regular penetration testing and security assessments",
    ],
    protectionMethod: "Military-grade encryption with zero-trust",
    businessImpactDetails: {
      summary: "Analysis of data confidentiality impacts",
      reputational: {
        description:
          "Maximum-level measures virtually eliminate the risk of reputational damage from data breaches.",
        riskLevel: "Minimal",
      },
      financial: {
        description: "Reduced risk of financial penalties from data breaches",
        riskLevel: "Low",
      },
      operational: {
        description: "Smooth operations with secure data flows",
        riskLevel: "Low",
      },
      regulatory: {
        description:
          "Exceeds regulatory requirements for data protection in all major frameworks.",
        riskLevel: "Minimal",
        complianceViolations: [],
      },
    },
    securityIcon: "🔐",
    valuePoints: [
      "Maximum confidentiality with military-grade protection",
      "Zero-trust architecture for comprehensive security",
      "Advanced threat detection and prevention",
      "Suitable for classified, top-secret, or highly regulated data",
      "Exceeds requirements for all regulatory frameworks",
    ],
    technicalImplementation: {
      description: "Military-grade encryption with zero-trust architecture",
      implementationSteps: [
        "Implement zero-trust security architecture",
        "Deploy military-grade encryption with quantum resistance",
        "Set up hardware security modules for cryptographic keys",
        "Implement continuous security monitoring and threat hunting",
        "Establish comprehensive data security governance",
      ],
      effort: {
        development: "Months (6+)",
        maintenance: "Continuous monitoring, monthly assessments",
        expertise: "Elite security specialists and architects",
      },
    },
  },
};

export default confidentialityData;
