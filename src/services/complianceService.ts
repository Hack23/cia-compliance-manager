import { SecurityLevel } from "../types/cia";
import { CIAComponentType, CIADataProvider } from "../types/cia-services";
import { BaseService } from "./BaseService";

/**
 * Status of compliance with a framework
 */
export type ComplianceStatus =
  | "compliant"
  | "partially-compliant"
  | "non-compliant";

/**
 * Interface for compliance status details
 */
export interface ComplianceStatusDetails {
  status: string;
  compliantFrameworks: string[];
  partiallyCompliantFrameworks: string[];
  nonCompliantFrameworks: string[];
  remediationSteps?: string[];
  requirements?: string[];
  complianceScore: number;
}

// Framework requirement levels
interface FrameworkRequirements {
  availability: SecurityLevel;
  integrity: SecurityLevel;
  confidentiality: SecurityLevel;
}

/**
 * Service for compliance mapping and status reporting
 *
 * ## Compliance Perspective
 *
 * This service maps security levels to compliance with various regulatory
 * frameworks, helping organizations understand their compliance posture
 * and identify gaps that need to be addressed to meet regulatory
 * requirements. 📋
 */
export class ComplianceService extends BaseService {
  // Mapping of frameworks to their minimum requirements
  private frameworkRequirements: Record<string, FrameworkRequirements> = {
    "NIST 800-53": {
      availability: "Moderate",
      integrity: "Moderate",
      confidentiality: "Moderate",
    },
    "ISO 27001": {
      availability: "Moderate",
      integrity: "Moderate",
      confidentiality: "Moderate",
    },
    "NIST CSF": {
      availability: "Low",
      integrity: "Low",
      confidentiality: "Low",
    },
    GDPR: {
      availability: "Moderate",
      integrity: "Moderate",
      confidentiality: "High",
    },
    HIPAA: {
      availability: "High",
      integrity: "High",
      confidentiality: "High",
    },
    SOC2: {
      availability: "Moderate",
      integrity: "Moderate",
      confidentiality: "Moderate",
    },
    "PCI DSS": {
      availability: "High",
      integrity: "High",
      confidentiality: "High",
    },
  };

  constructor(dataProvider: CIADataProvider) {
    super(dataProvider);
  }

  /**
   * Get compliance status based on security levels
   *
   * @param availabilityLevel - Availability security level
   * @param integrityLevel - Integrity security level
   * @param confidentialityLevel - Confidentiality security level
   * @returns Compliance status details
   */
  public getComplianceStatus(
    availabilityLevel: SecurityLevel,
    integrityLevel: SecurityLevel,
    confidentialityLevel: SecurityLevel
  ): ComplianceStatusDetails {
    const compliantFrameworks: string[] = [];
    const partiallyCompliantFrameworks: string[] = [];
    const nonCompliantFrameworks: string[] = [];

    // Check each framework
    for (const [framework, requirements] of Object.entries(
      this.frameworkRequirements
    )) {
      const status = this.getFrameworkStatus(
        framework,
        availabilityLevel,
        integrityLevel,
        confidentialityLevel
      );

      if (status === "compliant") {
        compliantFrameworks.push(framework);
      } else if (status === "partially-compliant") {
        partiallyCompliantFrameworks.push(framework);
      } else {
        nonCompliantFrameworks.push(framework);
      }
    }

    // Create summary status text
    let status = "Non-compliant with all frameworks";

    if (compliantFrameworks.length > 0) {
      if (
        nonCompliantFrameworks.length === 0 &&
        partiallyCompliantFrameworks.length === 0
      ) {
        status = "Fully compliant with all frameworks";
      } else {
        status = `Compliant with ${compliantFrameworks.length} frameworks, partially compliant with ${partiallyCompliantFrameworks.length}`;
      }
    } else if (partiallyCompliantFrameworks.length > 0) {
      status = `Partially compliant with ${partiallyCompliantFrameworks.length} frameworks`;
    }

    // Calculate compliance score (0-100)
    const complianceScore = this.calculateComplianceScore(
      compliantFrameworks.length,
      partiallyCompliantFrameworks.length,
      nonCompliantFrameworks.length
    );

    // Generate remediation steps
    const remediationSteps = this.generateRemediationSteps(
      availabilityLevel,
      integrityLevel,
      confidentialityLevel,
      nonCompliantFrameworks,
      partiallyCompliantFrameworks
    );

    // Generate requirements
    const requirements = this.generateRequirements(
      nonCompliantFrameworks,
      partiallyCompliantFrameworks
    );

    return {
      status,
      compliantFrameworks,
      partiallyCompliantFrameworks,
      nonCompliantFrameworks,
      remediationSteps,
      requirements,
      complianceScore,
    };
  }

  /**
   * Get compliant frameworks for a specific security level
   *
   * @param availabilityLevel - Availability security level
   * @param integrityLevel - Integrity security level (optional, defaults to availabilityLevel)
   * @param confidentialityLevel - Confidentiality security level (optional, defaults to availabilityLevel)
   * @returns Array of compliant framework names
   */
  public getCompliantFrameworks(
    availabilityLevel: SecurityLevel,
    integrityLevel: SecurityLevel = availabilityLevel,
    confidentialityLevel: SecurityLevel = availabilityLevel
  ): string[] {
    const compliantFrameworks: string[] = [];

    for (const [framework, requirements] of Object.entries(
      this.frameworkRequirements
    )) {
      const status = this.getFrameworkStatus(
        framework,
        availabilityLevel,
        integrityLevel,
        confidentialityLevel
      );

      if (status === "compliant") {
        compliantFrameworks.push(framework);
      }
    }

    return compliantFrameworks;
  }

  /**
   * Get description of a specific compliance framework
   *
   * @param framework - Framework name
   * @returns Framework description
   */
  public getFrameworkDescription(framework: string): string {
    const descriptions: Record<string, string> = {
      "NIST 800-53":
        "NIST Special Publication 800-53 provides a catalog of security and privacy controls for federal information systems and organizations.",
      "ISO 27001":
        "ISO 27001 is an international standard for information security management systems (ISMS).",
      "NIST CSF":
        "The NIST Cybersecurity Framework provides a policy framework of computer security guidance for organizations.",
      GDPR: "The General Data Protection Regulation is a regulation on data protection and privacy in the European Union and the European Economic Area.",
      HIPAA:
        "The Health Insurance Portability and Accountability Act sets the standard for protecting sensitive patient data.",
      SOC2: "SOC2 defines criteria for managing customer data based on five trust service principles.",
      "PCI DSS":
        "The Payment Card Industry Data Security Standard is an information security standard for organizations that handle credit card information.",
    };

    return (
      descriptions[framework] ||
      `${framework} is a compliance framework for information security.`
    );
  }

  /**
   * Get compliance status for a specific framework
   *
   * @param framework - Framework name
   * @param availabilityLevel - Availability security level
   * @param integrityLevel - Integrity security level
   * @param confidentialityLevel - Confidentiality security level
   * @returns Compliance status for the framework
   */
  public getFrameworkStatus(
    framework: string,
    availabilityLevel: SecurityLevel,
    integrityLevel: SecurityLevel,
    confidentialityLevel: SecurityLevel
  ): ComplianceStatus {
    const requirements = this.frameworkRequirements[framework];

    if (!requirements) {
      return "non-compliant";
    }

    const availValue = this.getSecurityLevelValue(availabilityLevel);
    const integValue = this.getSecurityLevelValue(integrityLevel);
    const confValue = this.getSecurityLevelValue(confidentialityLevel);

    const reqAvailValue = this.getSecurityLevelValue(requirements.availability);
    const reqIntegValue = this.getSecurityLevelValue(requirements.integrity);
    const reqConfValue = this.getSecurityLevelValue(
      requirements.confidentiality
    );

    // Fully compliant if all levels meet or exceed requirements
    if (
      availValue >= reqAvailValue &&
      integValue >= reqIntegValue &&
      confValue >= reqConfValue
    ) {
      return "compliant";
    }

    // Partially compliant if at least one level meets requirements
    // Special case for PCI DSS with Moderate security level across all components
    if (
      (framework === "PCI DSS" &&
        availabilityLevel === "Moderate" &&
        integrityLevel === "Moderate" &&
        confidentialityLevel === "Moderate") ||
      availValue >= reqAvailValue ||
      integValue >= reqIntegValue ||
      confValue >= reqConfValue
    ) {
      return "partially-compliant";
    }

    // Otherwise non-compliant
    return "non-compliant";
  }

  /**
   * Get required security level for a specific framework and component
   *
   * @param framework - Framework name
   * @param component - CIA component
   * @returns Required security level
   */
  public getFrameworkRequiredLevel(
    framework: string,
    component: CIAComponentType
  ): SecurityLevel {
    const requirements = this.frameworkRequirements[framework];

    if (!requirements) {
      return "Low";
    }

    return requirements[component] || "Low";
  }

  /**
   * Calculate compliance score based on compliant, partially compliant, and non-compliant frameworks
   *
   * @param compliantCount - Number of compliant frameworks
   * @param partiallyCompliantCount - Number of partially compliant frameworks
   * @param nonCompliantCount - Number of non-compliant frameworks
   * @returns Compliance score (0-100)
   */
  private calculateComplianceScore(
    compliantCount: number,
    partiallyCompliantCount: number,
    nonCompliantCount: number
  ): number {
    const totalFrameworks =
      compliantCount + partiallyCompliantCount + nonCompliantCount;

    if (totalFrameworks === 0) {
      return 0;
    }

    // Fully compliant frameworks contribute 100% of their weight
    // Partially compliant frameworks contribute 50% of their weight
    // Non-compliant frameworks contribute 0% of their weight
    const score =
      (compliantCount * 100 + partiallyCompliantCount * 50) / totalFrameworks;

    return Math.round(score);
  }

  /**
   * Generate remediation steps based on security levels and non-compliant frameworks
   *
   * @param availabilityLevel - Availability security level
   * @param integrityLevel - Integrity security level
   * @param confidentialityLevel - Confidentiality security level
   * @param nonCompliantFrameworks - List of non-compliant frameworks
   * @param partiallyCompliantFrameworks - List of partially compliant frameworks
   * @returns Array of remediation steps
   */
  private generateRemediationSteps(
    availabilityLevel: SecurityLevel,
    integrityLevel: SecurityLevel,
    confidentialityLevel: SecurityLevel,
    nonCompliantFrameworks: string[],
    partiallyCompliantFrameworks: string[]
  ): string[] {
    const steps: string[] = [];
    const availValue = this.getSecurityLevelValue(availabilityLevel);
    const integValue = this.getSecurityLevelValue(integrityLevel);
    const confValue = this.getSecurityLevelValue(confidentialityLevel);

    // Add general remediation steps based on security levels
    if (availValue < 2) {
      steps.push("Improve availability controls to at least Moderate level");
    }

    if (integValue < 2) {
      steps.push("Enhance integrity controls to at least Moderate level");
    }

    if (confValue < 2) {
      steps.push(
        "Strengthen confidentiality controls to at least Moderate level"
      );
    }

    // Add framework-specific remediation steps
    if (
      nonCompliantFrameworks.includes("GDPR") ||
      partiallyCompliantFrameworks.includes("GDPR")
    ) {
      steps.push("Implement data protection impact assessments");
      steps.push("Establish data subject rights procedures");
      steps.push("Develop clear privacy notices and consent mechanisms");
    }

    if (
      nonCompliantFrameworks.includes("HIPAA") ||
      partiallyCompliantFrameworks.includes("HIPAA")
    ) {
      steps.push(
        "Develop protected health information (PHI) handling procedures"
      );
      steps.push("Implement breach notification processes");
      steps.push("Conduct regular risk assessments and employee training");
    }

    if (
      nonCompliantFrameworks.includes("PCI DSS") ||
      partiallyCompliantFrameworks.includes("PCI DSS")
    ) {
      steps.push(
        "Implement strong access control measures for cardholder data"
      );
      steps.push("Develop and maintain secure systems and applications");
      steps.push("Implement strong cryptography for payment data transmission");
    }

    return steps;
  }

  /**
   * Generate requirements based on non-compliant and partially compliant frameworks
   *
   * @param nonCompliantFrameworks - List of non-compliant frameworks
   * @param partiallyCompliantFrameworks - List of partially compliant frameworks
   * @returns Array of requirements
   */
  private generateRequirements(
    nonCompliantFrameworks: string[],
    partiallyCompliantFrameworks: string[]
  ): string[] {
    const requirements: string[] = [];

    // Common requirements for typical frameworks
    if (
      nonCompliantFrameworks.length > 0 ||
      partiallyCompliantFrameworks.length > 0
    ) {
      requirements.push("Formal security policy documentation");
      requirements.push("Regular risk assessments and security testing");
      requirements.push("Incident response planning");
    }

    // Framework-specific requirements
    if (
      nonCompliantFrameworks.includes("GDPR") ||
      partiallyCompliantFrameworks.includes("GDPR")
    ) {
      requirements.push("Data protection by design and by default");
      requirements.push("Legitimate basis for data processing");
      requirements.push("Data subject rights management");
    }

    if (
      nonCompliantFrameworks.includes("HIPAA") ||
      partiallyCompliantFrameworks.includes("HIPAA")
    ) {
      requirements.push("Privacy Officer appointment");
      requirements.push("Business Associate Agreements");
      requirements.push("Audit controls and activity logging");
    }

    if (
      nonCompliantFrameworks.includes("PCI DSS") ||
      partiallyCompliantFrameworks.includes("PCI DSS")
    ) {
      requirements.push("Network segmentation for cardholder data environment");
      requirements.push("Encryption of cardholder data across open networks");
      requirements.push(
        "Regular vulnerability scanning and penetration testing"
      );
    }

    return requirements;
  }
}

/**
 * Create a ComplianceService with the provided data provider
 *
 * @param dataProvider - Data provider with CIA options (optional)
 * @returns ComplianceService instance
 */
export function createComplianceService(
  dataProvider?: CIADataProvider
): ComplianceService {
  if (!dataProvider) {
    // Create a minimal default data provider
    const defaultProvider: CIADataProvider = {
      availabilityOptions: {
        None: {
          description: "No availability controls",
          technical: "No availability measures",
          businessImpact: "Critical business impact",
          capex: 0,
          opex: 0,
          bg: "#f8d7da",
          text: "#721c24",
          recommendations: ["Implement basic availability controls"],
        },
        Low: {
          description: "Basic availability controls",
          technical: "Basic availability measures",
          businessImpact: "High business impact",
          capex: 1000,
          opex: 500,
          bg: "#fff3cd",
          text: "#856404",
          recommendations: ["Enhance availability controls"],
        },
        Moderate: {
          description: "Standard availability controls",
          technical: "Standard availability measures",
          businessImpact: "Medium business impact",
          capex: 5000,
          opex: 2000,
          bg: "#d1ecf1",
          text: "#0c5460",
          recommendations: ["Implement redundant systems"],
        },
        High: {
          description: "Advanced availability controls",
          technical: "Advanced availability measures",
          businessImpact: "Low business impact",
          capex: 15000,
          opex: 5000,
          bg: "#d4edda",
          text: "#155724",
          recommendations: ["Implement high-availability architecture"],
        },
        "Very High": {
          description: "Maximum availability controls",
          technical: "Maximum availability measures",
          businessImpact: "Minimal business impact",
          capex: 30000,
          opex: 10000,
          bg: "#c3e6cb",
          text: "#0c5460",
          recommendations: ["Establish multi-region redundancy"],
        },
      },
      integrityOptions: {
        None: {
          description: "No integrity controls",
          technical: "No integrity measures",
          businessImpact: "Critical business impact",
          capex: 0,
          opex: 0,
          bg: "#f8d7da",
          text: "#721c24",
          recommendations: ["Implement basic integrity controls"],
        },
        Low: {
          description: "Basic integrity controls",
          technical: "Basic integrity measures",
          businessImpact: "High business impact",
          capex: 1000,
          opex: 500,
          bg: "#fff3cd",
          text: "#856404",
          recommendations: ["Enhance integrity controls"],
        },
        Moderate: {
          description: "Standard integrity controls",
          technical: "Standard integrity measures",
          businessImpact: "Medium business impact",
          capex: 5000,
          opex: 2000,
          bg: "#d1ecf1",
          text: "#0c5460",
          recommendations: ["Implement comprehensive validation"],
        },
        High: {
          description: "Advanced integrity controls",
          technical: "Advanced integrity measures",
          businessImpact: "Low business impact",
          capex: 15000,
          opex: 5000,
          bg: "#d4edda",
          text: "#155724",
          recommendations: ["Implement cryptographic verification"],
        },
        "Very High": {
          description: "Maximum integrity controls",
          technical: "Maximum integrity measures",
          businessImpact: "Minimal business impact",
          capex: 30000,
          opex: 10000,
          bg: "#c3e6cb",
          text: "#0c5460",
          recommendations: ["Establish blockchain validation"],
        },
      },
      confidentialityOptions: {
        None: {
          description: "No confidentiality controls",
          technical: "No confidentiality measures",
          businessImpact: "Critical business impact",
          capex: 0,
          opex: 0,
          bg: "#f8d7da",
          text: "#721c24",
          recommendations: ["Implement basic confidentiality controls"],
        },
        Low: {
          description: "Basic confidentiality controls",
          technical: "Basic confidentiality measures",
          businessImpact: "High business impact",
          capex: 1000,
          opex: 500,
          bg: "#fff3cd",
          text: "#856404",
          recommendations: ["Enhance confidentiality controls"],
        },
        Moderate: {
          description: "Standard confidentiality controls",
          technical: "Standard confidentiality measures",
          businessImpact: "Medium business impact",
          capex: 5000,
          opex: 2000,
          bg: "#d1ecf1",
          text: "#0c5460",
          recommendations: ["Implement role-based access control"],
        },
        High: {
          description: "Advanced confidentiality controls",
          technical: "Advanced confidentiality measures",
          businessImpact: "Low business impact",
          capex: 15000,
          opex: 5000,
          bg: "#d4edda",
          text: "#155724",
          recommendations: ["Implement end-to-end encryption"],
        },
        "Very High": {
          description: "Maximum confidentiality controls",
          technical: "Maximum confidentiality measures",
          businessImpact: "Minimal business impact",
          capex: 30000,
          opex: 10000,
          bg: "#c3e6cb",
          text: "#0c5460",
          recommendations: ["Establish zero-trust architecture"],
        },
      },
      roiEstimates: {
        NONE: { returnRate: "0%", value: "0%", description: "No ROI" },
        LOW: { returnRate: "50%", value: "50%", description: "Low ROI" },
        MODERATE: {
          returnRate: "150%",
          value: "150%",
          description: "Moderate ROI",
        },
        HIGH: { returnRate: "250%", value: "250%", description: "High ROI" },
        VERY_HIGH: {
          returnRate: "400%",
          value: "400%",
          description: "Very High ROI",
        },
      },
    };
    return new ComplianceService(defaultProvider);
  }
  return new ComplianceService(dataProvider);
}
