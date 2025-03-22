import { SecurityLevel } from "../../types/cia";
import { CIADetails } from "../../types/cia-services";
import { getSecurityLevelColorPair } from "../../utils/colorUtils";

/**
 * Detailed integrity security options for each security level
 *
 * ## Business Perspective
 *
 * These options define the technical and business implications of different
 * integrity security levels, focusing on data accuracy, validation methods,
 * and business trust considerations. ✓
 */
const integrityData: Record<SecurityLevel, CIADetails> = {
  None: {
    description:
      "No integrity controls are implemented, leaving the system vulnerable to undetected data corruption.",
    technical:
      "There is no input validation, no checksums, no audit logging, and no data verification mechanisms.",
    businessImpact:
      "This lack of controls poses a critical risk to decision-making and financial reporting, potentially leading to significant operational disruptions.",
    capex: 0,
    opex: 0,
    bg: getSecurityLevelColorPair("None").bg,
    text: getSecurityLevelColorPair("None").text,
    recommendations: [
      "Implement fundamental input validation measures",
      "Introduce basic application-level data checks",
      "Set up rudimentary audit logs for critical transactions",
    ],
    businessImpactDetails: {
      summary: "Analysis of data integrity impacts",
      financial: {
        description:
          "Financial reporting reliability is severely compromised, risking misallocation of resources.",
        riskLevel: "Critical",
      },
      operational: {
        description:
          "Decisions based on inaccurate data can lead to cascading failures and prolonged recovery times.",
        riskLevel: "Critical",
      },
    },
    validationMethod: "None",
    securityIcon: "⚠️",
    valuePoints: [
      "No data integrity safeguards",
      "Vulnerable to undetected data corruption",
      "High risk of making decisions based on inaccurate data",
      "No protection against unauthorized modifications",
      "Not suitable for any data requiring accuracy",
    ],
    technicalImplementation: {
      description: "No data integrity controls implemented",
      implementationSteps: [
        "No implementation required as no controls are in place",
        "Consider documenting current data flows as a baseline",
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
      "Basic integrity controls are present, relying mainly on manual verification processes that are error-prone and hard to scale.",
    technical:
      "Relies on simple input validation, rudimentary access controls, and manual checksum verification without automated oversight.",
    businessImpact:
      "Data inaccuracies may occur intermittently, potentially leading to errors in financial calculations and operational inefficiencies.",
    capex: 5,
    opex: 3,
    bg: getSecurityLevelColorPair("Low").bg,
    text: getSecurityLevelColorPair("Low").text,
    recommendations: [
      "Adopt server-side validation to minimize human error",
      "Introduce automated data verification where possible",
      "Schedule regular manual reviews to detect anomalies",
    ],
    validationMethod: "Manual checks",
    businessImpactDetails: {
      summary: "Analysis of data integrity impacts",
      financial: {
        description:
          "Financial calculations might be affected by occasional errors, though the overall impact is moderate.",
        riskLevel: "High",
      },
      operational: {
        description:
          "Manual processes may catch corruption inconsistently, leading to sporadic operational delays.",
        riskLevel: "High",
      },
    },
    securityIcon: "🔑",
    valuePoints: [
      "Basic data integrity with minimal protection",
      "Simple input validation to catch obvious errors",
      "Periodic manual verification processes",
      "Suitable for low-importance internal data",
      "Provides foundation for data quality initiatives",
    ],
    technicalImplementation: {
      description: "Basic manual validation processes",
      implementationSteps: [
        "Implement basic input validation in applications",
        "Create procedures for manual data reviews",
        "Document data validation requirements",
      ],
      effort: {
        development: "Days (1-5)",
        maintenance: "Weekly manual checks",
        expertise: "Junior developers",
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
    bg: getSecurityLevelColorPair("Moderate").bg,
    text: getSecurityLevelColorPair("Moderate").text,
    recommendations: [
      "Implement end-to-end automated data validation",
      "Utilize database constraints and triggers to enforce integrity rules",
      "Establish robust audit trails and periodic integrity reviews",
    ],
    validationMethod: "Automated validation",
    businessImpactDetails: {
      summary: "Analysis of data integrity impacts",
      financial: {
        description:
          "Financial data is generally reliable; however, occasional discrepancies may still impact reporting accuracy.",
        riskLevel: "Medium",
      },
      operational: {
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
    securityIcon: "🔓",
    valuePoints: [
      "Standard integrity with automated validation",
      "Comprehensive input validation and data checks",
      "Database constraints to enforce data rules",
      "Suitable for standard business applications",
      "Meets requirements for most business operations",
    ],
    technicalImplementation: {
      description: "Automated validation with database constraints",
      implementationSteps: [
        "Implement comprehensive server-side validation",
        "Configure database constraints and triggers",
        "Set up automated data quality checks",
        "Establish audit logging for data changes",
      ],
      effort: {
        development: "Weeks (2-3)",
        maintenance: "Monthly reviews and updates",
        expertise: "Mid-level developers",
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
    bg: getSecurityLevelColorPair("High").bg,
    text: getSecurityLevelColorPair("High").text,
    recommendations: [
      "Deploy digital signatures for high-risk data entries",
      "Implement cryptographic hash validations for data immutability",
      "Establish immutable audit logging mechanisms",
    ],
    validationMethod: "Cryptographic verification",
    businessImpactDetails: {
      summary: "Analysis of data integrity impacts",
      financial: {
        description:
          "High confidence in financial data minimizes the risk of significant misreporting.",
        riskLevel: "Low",
      },
      operational: {
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
    securityIcon: "🔒",
    valuePoints: [
      "Strong integrity with cryptographic protection",
      "Digital signatures to verify data origin",
      "Cryptographic hash validation for detecting tampering",
      "Suitable for financial and regulated applications",
      "Provides strong audit and compliance capabilities",
    ],
    technicalImplementation: {
      description: "Cryptographic integrity verification systems",
      implementationSteps: [
        "Implement digital signature infrastructure",
        "Deploy hash verification for critical data",
        "Set up immutable audit logging",
        "Establish key management processes",
      ],
      effort: {
        development: "Months (1-2)",
        maintenance: "Bi-weekly checks and key rotation",
        expertise: "Senior security engineers",
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
    bg: getSecurityLevelColorPair("Very High").bg,
    text: getSecurityLevelColorPair("Very High").text,
    recommendations: [
      "Explore blockchain or distributed ledger solutions for critical data",
      "Deploy multi-party verification systems to enhance auditability",
      "Investigate zero-knowledge proofs to verify data integrity without compromising confidentiality",
    ],
    validationMethod: "Blockchain/distributed ledger",
    businessImpactDetails: {
      summary: "Analysis of data integrity impacts",
      financial: {
        description:
          "Ensures exceptional reliability of financial data, enabling precise reporting in regulated sectors.",
        riskLevel: "Minimal",
      },
      operational: {
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
    securityIcon: "🔐",
    valuePoints: [
      "Maximum integrity with blockchain/distributed ledger technology",
      "Immutable audit trail of all data changes",
      "Multi-party consensus verification",
      "Suitable for high-value financial transactions and legal evidence",
      "Virtually tamper-proof data storage and verification",
    ],
    technicalImplementation: {
      description: "Distributed ledger or blockchain-based integrity systems",
      implementationSteps: [
        "Implement blockchain or distributed ledger infrastructure",
        "Set up consensus mechanisms for data validation",
        "Deploy smart contracts for automated verification",
        "Establish multi-party validation processes",
        "Implement zero-knowledge proofs where applicable",
      ],
      effort: {
        development: "Months (3-6+)",
        maintenance: "Continuous monitoring, regular protocol updates",
        expertise: "Specialized blockchain/cryptography experts",
      },
    },
  },
};

export default integrityData;
