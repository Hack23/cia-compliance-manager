import { useMemo } from "react";
import { getSecurityLevelColorPair } from "../constants/colorConstants";
import { CIADetails, SecurityLevel } from "../types/cia";

/**
 * Interface defining the structure of an ROI estimate for a specific security level
 */
export interface ROIEstimate {
  value: string; // Primary property name
  returnRate: string; // Alias for backward compatibility
  description: string;
  potentialSavings?: string;
  breakEvenPeriod?: string;
  implementationCost?: string;
}

/**
 * Map of ROI estimates by security level
 */
export interface ROIEstimatesMap {
  NONE: ROIEstimate;
  LOW: ROIEstimate;
  MODERATE: ROIEstimate;
  HIGH: ROIEstimate;
  VERY_HIGH: ROIEstimate;
}

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
  // Add technical implementation details
  technicalImplementation?: {
    description: string;
    implementationSteps: string[];
    effort: {
      development: string;
      maintenance: string;
      expertise: string;
    };
    requirements?: string[];
    technologies?: string[];
  };
}

// Define all options as private internal constants
const _availabilityOptions: Partial<Record<SecurityLevel, EnhancedCIADetails>> =
  {
    None: {
      description:
        "No availability measures are in place. The system is prone to frequent, unpredictable outages.",
      technical:
        "No redundancy, backup systems, monitoring, or disaster recovery procedures are implemented.",
      businessImpact:
        "Severe disruptions occur during outages, potentially resulting in revenue losses estimated at 5-10% annually under prolonged conditions.",
      capex: 0,
      opex: 0,
      bg: getSecurityLevelColorPair("None" as SecurityLevel).bg,
      text: getSecurityLevelColorPair("None" as SecurityLevel).text,
      recommendations: [
        "Implement basic monitoring to detect outages early",
        "Establish a rudimentary backup process with periodic testing",
        "Document manual recovery procedures with clear roles",
        "Establish baseline uptime metrics to gauge current performance",
        "Identify and prioritize critical systems for improvement",
      ],
      uptime: "<90%",
      businessImpactDetails: {
        financialImpact: {
          description:
            "Prolonged outages can lead to significant revenue loss, estimated at 5-10% of annual revenue.",
          riskLevel: "Critical",
          annualRevenueLoss: "5-10% of annual revenue",
        },
        operationalImpact: {
          description:
            "Operations are severely disrupted with recovery timelines that are highly unpredictable.",
          riskLevel: "Critical",
          meanTimeToRecover: "Unpredictable (hours to days)",
        },
        regulatory: {
          description:
            "Likely violates basic service agreements and regulatory requirements.",
          riskLevel: "High",
          complianceViolations: ["SLAs", "Basic industry standards"],
        },
      },
      securityIcon: "⚠️",
    },
    Low: {
      description:
        "Basic availability measures are present but have significant limitations, leading to extended downtime during disruptions.",
      technical:
        "Reliance on manual backup processes and limited monitoring, with basic recovery documentation.",
      businessImpact:
        "Moderate disruptions can lead to revenue losses estimated at 3-5% annually, heavily dependent on recovery speed.",
      capex: 5,
      opex: 3,
      bg: getSecurityLevelColorPair("Low" as SecurityLevel).bg,
      text: getSecurityLevelColorPair("Low" as SecurityLevel).text,
      recommendations: [
        "Implement scheduled backups and test recovery procedures regularly",
        "Set up basic monitoring alerts for early detection",
        "Document recovery processes and establish a communication protocol for outages",
      ],
      uptime: "95%",
      rto: "24-48 hours",
      rpo: "24 hours",
      mttr: "12-24 hours",
      businessImpactDetails: {
        financialImpact: {
          description:
            "Revenue impact is estimated at around 3-5% annually due to extended downtimes.",
          riskLevel: "High",
          annualRevenueLoss: "3-5% of annual revenue",
        },
        operationalImpact: {
          description:
            "Business disruptions are significant and require manual intervention, leading to slower recovery.",
          riskLevel: "High",
          meanTimeToRecover: "12-24 hours",
        },
      },
      securityIcon: "🔒",
    },
    Moderate: {
      description:
        "Standard availability measures that yield acceptable uptime with planned disaster recovery processes.",
      technical:
        "Scheduled backups, automated monitoring with alerts, documented recovery procedures, and partial redundancy for key components.",
      businessImpact:
        "Occasional disruptions are generally contained, with revenue losses estimated at 1-3% annually.",
      capex: 15,
      opex: 10,
      bg: getSecurityLevelColorPair("Moderate" as SecurityLevel).bg,
      text: getSecurityLevelColorPair("Moderate" as SecurityLevel).text,
      recommendations: [
        "Enhance redundancy for mission-critical systems",
        "Automate backup and disaster recovery testing",
        "Integrate comprehensive monitoring with defined SLAs",
      ],
      uptime: "99%",
      rto: "4-8 hours",
      rpo: "4 hours",
      mttr: "2-4 hours",
      businessImpactDetails: {
        financialImpact: {
          description:
            "Revenue impact is modest, estimated at approximately 1-3% annually, assuming typical outage scenarios.",
          riskLevel: "Medium",
          annualRevenueLoss: "1-3% of annual revenue",
        },
        operationalImpact: {
          description:
            "Disruptions occur infrequently and recovery is relatively quick.",
          riskLevel: "Medium",
          meanTimeToRecover: "2-4 hours",
        },
      },
      securityIcon: "🛡️",
    },
    High: {
      description:
        "Robust availability measures with high redundancy and automated recovery systems ensure near-continuous operations.",
      technical:
        "N+1 redundancy, multi-region standby systems, automated failover, comprehensive monitoring, and regular disaster recovery testing.",
      businessImpact:
        "Business continuity is well-maintained with negligible revenue impact (generally under 1%).",
      capex: 30,
      opex: 20,
      bg: getSecurityLevelColorPair("High" as SecurityLevel).bg,
      text: getSecurityLevelColorPair("High" as SecurityLevel).text,
      recommendations: [
        "Deploy N+1 redundancy for all critical systems",
        "Implement automated failover and real-time monitoring",
        "Conduct regular disaster recovery drills and define escalation procedures",
      ],
      uptime: "99.9%",
      rto: "15-60 minutes",
      rpo: "15 minutes",
      mttr: "10-30 minutes",
      businessImpactDetails: {
        financialImpact: {
          description:
            "Revenue impact is minimal, generally estimated at less than 1% of annual revenue.",
          riskLevel: "Low",
          annualRevenueLoss: "<1% of annual revenue",
        },
        operationalImpact: {
          description:
            "Disruptions are rare and recovery is almost instantaneous due to automation.",
          riskLevel: "Low",
          meanTimeToRecover: "10-30 minutes",
        },
        strategic: {
          description:
            "High reliability can support market expansion and reinforces customer trust.",
          riskLevel: "Low",
        },
      },
      securityIcon: "🛡️🛡️",
    },
    "Very High": {
      description:
        "Maximum availability with continuous operations enabled by multi-region redundancy, real-time replication, and fully automated recovery.",
      technical:
        "N+2 redundancy, active-active multi-region architecture, real-time replication, and automated remediation ensure near-zero downtime.",
      businessImpact:
        "Operational continuity is nearly uninterrupted under normal conditions, with revenue impact considered negligible—though extreme events remain a risk.",
      capex: 60,
      opex: 40,
      bg: getSecurityLevelColorPair("Very High" as SecurityLevel).bg,
      text: getSecurityLevelColorPair("Very High" as SecurityLevel).text,
      recommendations: [
        "Implement N+2 redundancy across all critical components",
        "Deploy an active-active multi-region architecture with real-time replication",
        "Establish fully automated remediation systems and 24/7 operations support",
        "Conduct regular chaos engineering exercises to stress-test resilience",
      ],
      uptime: "99.99%",
      rto: "<5 minutes",
      rpo: "<1 minute",
      mttr: "<5 minutes",
      businessImpactDetails: {
        financialImpact: {
          description:
            "Revenue losses due to availability issues are negligible under normal conditions.",
          riskLevel: "Minimal",
        },
        operationalImpact: {
          description:
            "Business operations are maintained nearly continuously with rapid, automated recovery.",
          riskLevel: "Minimal",
          meanTimeToRecover: "<5 minutes",
        },
        strategic: {
          description:
            "Superior reliability offers a competitive advantage in high-demand markets.",
          riskLevel: "Minimal",
        },
        regulatory: {
          description:
            "Exceeds stringent regulatory and SLA requirements for availability.",
          riskLevel: "Minimal",
          complianceViolations: [],
        },
      },
      securityIcon: "🛡️🛡️🛡️",
    },
  };

const _integrityOptions: Partial<Record<SecurityLevel, EnhancedCIADetails>> = {
  None: {
    description:
      "No integrity controls are implemented, leaving the system vulnerable to undetected data corruption.",
    technical:
      "There is no input validation, no checksums, no audit logging, and no data verification mechanisms.",
    businessImpact:
      "This lack of controls poses a critical risk to decision-making and financial reporting, potentially leading to significant operational disruptions.",
    capex: 0,
    opex: 0,
    bg: getSecurityLevelColorPair("None" as SecurityLevel).bg,
    text: getSecurityLevelColorPair("None" as SecurityLevel).text,
    recommendations: [
      "Implement fundamental input validation measures",
      "Introduce basic application-level data checks",
      "Set up rudimentary audit logs for critical transactions",
    ],
    businessImpactDetails: {
      financialImpact: {
        description:
          "Financial reporting reliability is severely compromised, risking misallocation of resources.",
        riskLevel: "Critical",
      },
      operationalImpact: {
        description:
          "Decisions based on inaccurate data can lead to cascading failures and prolonged recovery times.",
        riskLevel: "Critical",
      },
    },
    validationMethod: "None",
  },
  Low: {
    description:
      "Basic integrity controls are present, relying mainly on manual verification processes that are error-prone and hard to scale.",
    technical:
      "Relies on simple input validation, rudimentary access controls, and manual checksum verification without automated oversight.",
    businessImpact:
      "Data inaccuracies may occur intermittently, potentially leading to errors in financial calculations and operational inefficiencies.",
    capex: 5,
    opex: 3,
    bg: getSecurityLevelColorPair("Low" as SecurityLevel).bg,
    text: getSecurityLevelColorPair("Low" as SecurityLevel).text,
    recommendations: [
      "Adopt server-side validation to minimize human error",
      "Introduce automated data verification where possible",
      "Schedule regular manual reviews to detect anomalies",
    ],
    validationMethod: "Manual checks",
    businessImpactDetails: {
      financialImpact: {
        description:
          "Financial calculations might be affected by occasional errors, though the overall impact is moderate.",
        riskLevel: "High",
      },
      operationalImpact: {
        description:
          "Manual processes may catch corruption inconsistently, leading to sporadic operational delays.",
        riskLevel: "High",
      },
    },
  },
  Moderate: {
    description:
      "Standard integrity controls combine automated verification with periodic manual oversight, providing a reasonable level of assurance.",
    technical:
      "Utilizes comprehensive input validation, checksums, version control, and audit logging with a blend of automated and manual checks.",
    businessImpact:
      "Most data corruption is detected and corrected, though sophisticated attacks or subtle errors may still occur.",
    capex: 15,
    opex: 10,
    bg: getSecurityLevelColorPair("Moderate" as SecurityLevel).bg,
    text: getSecurityLevelColorPair("Moderate" as SecurityLevel).text,
    recommendations: [
      "Implement end-to-end automated data validation",
      "Utilize database constraints and triggers to enforce integrity rules",
      "Establish robust audit trails and periodic integrity reviews",
    ],
    validationMethod: "Automated validation",
    businessImpactDetails: {
      financialImpact: {
        description:
          "Financial data is generally reliable; however, occasional discrepancies may still impact reporting accuracy.",
        riskLevel: "Medium",
      },
      operationalImpact: {
        description:
          "Operational disruptions are infrequent and usually resolved quickly via established audit trails.",
        riskLevel: "Medium",
      },
      regulatory: {
        description:
          "Controls meet basic regulatory standards, though they might fall short of stricter compliance requirements.",
        riskLevel: "Medium",
      },
    },
  },
  High: {
    description:
      "Advanced integrity controls employing cryptographic techniques provide strong data assurance, albeit with increased complexity and cost.",
    technical:
      "Incorporates digital signatures, hash verifications, and tamper-resistant audit logs to secure data integrity.",
    businessImpact:
      "Data integrity is strongly maintained, reducing risks in financial and operational decision-making, but the high investment may limit broader scalability.",
    capex: 30,
    opex: 20,
    bg: getSecurityLevelColorPair("High" as SecurityLevel).bg,
    text: getSecurityLevelColorPair("High" as SecurityLevel).text,
    recommendations: [
      "Deploy digital signatures for high-risk data entries",
      "Implement cryptographic hash validations for data immutability",
      "Establish immutable audit logging mechanisms",
    ],
    validationMethod: "Cryptographic verification",
    businessImpactDetails: {
      financialImpact: {
        description:
          "High confidence in financial data minimizes the risk of significant misreporting.",
        riskLevel: "Low",
      },
      operationalImpact: {
        description:
          "Robust change tracking enables timely detection and correction of data errors.",
        riskLevel: "Low",
      },
      regulatory: {
        description:
          "These controls typically exceed many regulatory requirements, providing a strong compliance posture.",
        riskLevel: "Low",
      },
    },
  },
  "Very High": {
    description:
      "State-of-the-art integrity controls leveraging distributed ledger technologies provide near-absolute data assurance, though they introduce significant complexity and cost.",
    technical:
      "Employs multi-party verification, blockchain-based ledgers, and zero-knowledge proofs to ensure immutable audit trails.",
    businessImpact:
      "Data integrity is virtually guaranteed, which is critical for high-stakes regulatory and financial environments, but the substantial investment and complexity may not be justifiable for all organizations.",
    capex: 60,
    opex: 40,
    bg: getSecurityLevelColorPair("Very High" as SecurityLevel).bg,
    text: getSecurityLevelColorPair("Very High" as SecurityLevel).text,
    recommendations: [
      "Explore blockchain or distributed ledger solutions for critical data",
      "Deploy multi-party verification systems to enhance auditability",
      "Investigate zero-knowledge proofs to verify data integrity without compromising confidentiality",
    ],
    validationMethod: "Blockchain/distributed ledger",
    businessImpactDetails: {
      financialImpact: {
        description:
          "Ensures exceptional reliability of financial data, enabling precise reporting in regulated sectors.",
        riskLevel: "Minimal",
      },
      operationalImpact: {
        description:
          "Data integrity is nearly absolute, reducing operational risk to an absolute minimum, despite high system complexity.",
        riskLevel: "Minimal",
      },
      strategic: {
        description:
          "Supports organizations in highly regulated or high-stakes markets; however, the cost and complexity may outweigh benefits for most.",
        riskLevel: "Minimal",
      },
    },
  },
};

// Create full confidentiality options with all levels
const _confidentialityOptions: Partial<
  Record<SecurityLevel, EnhancedCIADetails>
> = {
  None: {
    description:
      "No confidentiality controls are implemented, leaving sensitive information fully exposed to any user with system access.",
    technical:
      "There are no access controls, no encryption measures, and no data classification processes.",
    businessImpact:
      "This exposes the organization to severe reputational damage and regulatory non-compliance, with potential legal penalties if sensitive data is compromised.",
    capex: 0,
    opex: 0,
    bg: getSecurityLevelColorPair("None" as SecurityLevel).bg,
    text: getSecurityLevelColorPair("None" as SecurityLevel).text,
    recommendations: [
      "Implement basic authentication mechanisms",
      "Introduce simple authorization controls",
      "Establish a rudimentary data classification scheme",
    ],
    protectionMethod: "None",
    businessImpactDetails: {
      reputationalImpact: {
        description:
          "Without confidentiality controls, sensitive information can be accessed by unauthorized parties, severely damaging customer trust and brand reputation.",
        riskLevel: "Critical",
      },
      regulatory: {
        description:
          "Non-compliance with data protection regulations is highly likely, potentially resulting in fines and legal action.",
        riskLevel: "Critical",
        complianceViolations: ["GDPR", "CCPA", "HIPAA", "PCI-DSS"],
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
    bg: getSecurityLevelColorPair("Low" as SecurityLevel).bg,
    text: getSecurityLevelColorPair("Low" as SecurityLevel).text,
    recommendations: [
      "Upgrade to a robust authentication system",
      "Implement comprehensive role-based access controls",
      "Enforce TLS/SSL for all data in transit",
    ],
    protectionMethod: "Basic access control",
    businessImpactDetails: {
      reputationalImpact: {
        description:
          "Exposure of sensitive data is possible, which could lead to moderate damage to the organization’s reputation if an incident occurs.",
        riskLevel: "High",
      },
      regulatory: {
        description:
          "Existing measures may not fully satisfy privacy regulations, leading to potential fines or legal scrutiny.",
        riskLevel: "High",
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
    bg: getSecurityLevelColorPair("Moderate" as SecurityLevel).bg,
    text: getSecurityLevelColorPair("Moderate" as SecurityLevel).text,
    recommendations: [
      "Implement robust encryption for data both at rest and in transit",
      "Regularly review and update access controls",
      "Establish continuous monitoring and auditing of data access",
    ],
    protectionMethod: "Standard encryption",
    businessImpactDetails: {
      reputationalImpact: {
        description:
          "Sensitive data is largely protected, mitigating the risk of reputational damage in the event of an incident.",
        riskLevel: "Medium",
      },
      regulatory: {
        description:
          "Generally meets standard data protection requirements, though vulnerabilities may remain against highly sophisticated attacks.",
        riskLevel: "Medium",
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
    bg: getSecurityLevelColorPair("High" as SecurityLevel).bg,
    text: getSecurityLevelColorPair("High" as SecurityLevel).text,
    recommendations: [
      "Deploy multi-factor authentication across all user access points",
      "Implement end-to-end encryption and conduct regular security audits",
      "Establish comprehensive monitoring of data access and activity",
    ],
    protectionMethod: "E2E encryption",
    businessImpactDetails: {
      reputationalImpact: {
        description:
          "High-level measures substantially reduce the risk of sensitive data exposure, protecting the organization’s reputation.",
        riskLevel: "Low",
      },
      regulatory: {
        description:
          "Measures meet or exceed many regulatory requirements, thereby reducing legal risks.",
        riskLevel: "Low",
      },
    },
  },
  "Very High": {
    description:
      "Maximum confidentiality measures are implemented for protecting highly sensitive or classified information.",
    technical:
      "Uses advanced encryption standards, hardware security modules, strict access controls, and a zero-trust architecture with continuous monitoring.",
    businessImpact:
      "Provides best-in-class protection, virtually eliminating the risk of unauthorized data access. However, the high cost and system complexity may not be justifiable for all organizations.",
    capex: 60,
    opex: 40,
    bg: getSecurityLevelColorPair("Very High" as SecurityLevel).bg,
    text: getSecurityLevelColorPair("Very High" as SecurityLevel).text,
    recommendations: [
      "Implement quantum-resistant encryption algorithms",
      "Deploy hardware security modules for critical data repositories",
      "Adopt a zero-trust architecture to continuously validate access",
    ],
    protectionMethod: "Military-grade encryption",
    businessImpactDetails: {
      reputationalImpact: {
        description:
          "Provides near-absolute protection of sensitive data, virtually eliminating the risk of reputational damage.",
        riskLevel: "Minimal",
      },
      strategic: {
        description:
          "Enables secure handling of top-secret or highly regulated information, although the high investment and complexity require careful justification.",
        riskLevel: "Minimal",
      },
    },
  },
};

// ROI estimates with refined, more pessimistic values and revised descriptions
const _ROI_ESTIMATES: ROIEstimatesMap = {
  NONE: {
    value: "0%",
    returnRate: "0%", // Retained for backward compatibility
    description:
      "No security investment yields no cost avoidance, leaving the firm fully exposed.",
    potentialSavings: "$0",
    breakEvenPeriod: "N/A",
  },
  LOW: {
    value: "0-10%",
    returnRate: "0-10%", // Retained for backward compatibility
    description:
      "Minimal investment yields negligible benefits; returns are marginal and highly context-dependent.",
    potentialSavings: "$0.5K-$2K (contextual)",
    breakEvenPeriod: "30-36 months",
  },
  MODERATE: {
    value: "10-20%",
    returnRate: "10-20%", // Retained for backward compatibility
    description:
      "Standard investments offer modest risk reduction with benefits that vary by environment.",
    potentialSavings: "$2K-$10K (contextual)",
    breakEvenPeriod: "24-30 months",
  },
  HIGH: {
    value: "20-30%",
    returnRate: "20-30%", // Retained for backward compatibility
    description:
      "Advanced measures improve protection, though realized returns may be lower than expected.",
    potentialSavings: "$10K-$30K (contextual)",
    breakEvenPeriod: "18-24 months",
  },
  VERY_HIGH: {
    value: "30-50%",
    returnRate: "30-50%", // Retained for backward compatibility
    description:
      "Premium investments aim for robust risk management but may not fully justify the high cost in less favorable contexts.",
    potentialSavings: "$30K-$70K (contextual)",
    breakEvenPeriod: "12-18 months",
    implementationCost: "High initial investment with variable returns",
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
