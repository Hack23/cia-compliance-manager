import { SecurityLevel } from "../types/cia";
import { CIADataProvider } from "../types/cia-services";
import logger from "../utils/logger";
import { BaseService } from "./BaseService";

/**
 * Interface representing compliance status
 */
export interface ComplianceStatus {
  compliantFrameworks: string[];
  partiallyCompliantFrameworks: string[];
  nonCompliantFrameworks: string[];
  remediationSteps?: string[];
  requirements?: string[];
  status?: string;
  complianceScore?: number;
}

/**
 * Interface representing a compliance framework
 */
export interface ComplianceFramework {
  name: string;
  description: string;
  requiredAvailabilityLevel?: SecurityLevel;
  requiredIntegrityLevel?: SecurityLevel;
  requiredConfidentialityLevel?: SecurityLevel;
  controls?: string[];
  status?: string;
}

/**
 * Service for compliance evaluation and mapping
 *
 * ## Business Perspective
 *
 * This service helps organizations understand their compliance status with
 * various regulatory frameworks based on their security posture. It identifies
 * compliance gaps and provides remediation steps to achieve compliance. 📜
 *
 * The service reduces compliance overhead by mapping security controls to
 * multiple frameworks and highlighting where control implementation can
 * satisfy multiple regulatory requirements simultaneously.
 */
export class ComplianceService extends BaseService {
  constructor(dataProvider: CIADataProvider) {
    super(dataProvider);
  }

  /**
   * Get supported compliance frameworks
   * 
   * @returns List of supported compliance frameworks
   */
  public getSupportedFrameworks(): ComplianceFramework[] {
    return [
      {
        name: "NIST 800-53",
        description: "Security and Privacy Controls for Federal Information Systems and Organizations",
        requiredAvailabilityLevel: "High",
        requiredIntegrityLevel: "High",
        requiredConfidentialityLevel: "High"
      },
      {
        name: "ISO 27001",
        description: "Information Security Management System Standard",
        requiredAvailabilityLevel: "Moderate",
        requiredIntegrityLevel: "Moderate",
        requiredConfidentialityLevel: "Moderate"
      },
      {
        name: "GDPR",
        description: "General Data Protection Regulation",
        requiredAvailabilityLevel: "Moderate",
        requiredIntegrityLevel: "High",
        requiredConfidentialityLevel: "High"
      },
      {
        name: "HIPAA",
        description: "Health Insurance Portability and Accountability Act",
        requiredAvailabilityLevel: "High",
        requiredIntegrityLevel: "High",
        requiredConfidentialityLevel: "High"
      },
      {
        name: "PCI DSS",
        description: "Payment Card Industry Data Security Standard",
        requiredAvailabilityLevel: "High",
        requiredIntegrityLevel: "High",
        requiredConfidentialityLevel: "High"
      },
      {
        name: "SOC2",
        description: "Service Organization Control 2",
        requiredAvailabilityLevel: "Moderate",
        requiredIntegrityLevel: "Moderate",
        requiredConfidentialityLevel: "Moderate"
      },
      {
        name: "NIST CSF",
        description: "Cybersecurity Framework",
        requiredAvailabilityLevel: "Moderate",
        requiredIntegrityLevel: "Moderate",
        requiredConfidentialityLevel: "Moderate"
      }
    ];
  }

  /**
   * Evaluate compliance status based on security levels
   * 
   * @param availabilityLevel - Current availability security level
   * @param integrityLevel - Current integrity security level
   * @param confidentialityLevel - Current confidentiality security level
   * @returns Compliance status with framework mapping and remediation steps
   */
  public getComplianceStatus(
    availabilityLevel: SecurityLevel,
    integrityLevel: SecurityLevel,
    confidentialityLevel: SecurityLevel
  ): ComplianceStatus {
    try {
      const frameworks = this.getSupportedFrameworks();
      const compliantFrameworks: string[] = [];
      const partiallyCompliantFrameworks: string[] = [];
      const nonCompliantFrameworks: string[] = [];

      // Convert security levels to numeric values for comparison
      const availValue = this.getSecurityLevelValue(availabilityLevel);
      const integValue = this.getSecurityLevelValue(integrityLevel);
      const confValue = this.getSecurityLevelValue(confidentialityLevel);

      // Evaluate each framework
      frameworks.forEach(framework => {
        const requiredAvail = this.getSecurityLevelValue(framework.requiredAvailabilityLevel || "None");
        const requiredInteg = this.getSecurityLevelValue(framework.requiredIntegrityLevel || "None");
        const requiredConf = this.getSecurityLevelValue(framework.requiredConfidentialityLevel || "None");

        // Calculate compliance score (0-100)
        const maxScore = requiredAvail + requiredInteg + requiredConf;
        const actualScore = Math.min(availValue, requiredAvail) +
          Math.min(integValue, requiredInteg) +
          Math.min(confValue, requiredConf);

        const compliancePercentage = maxScore > 0 ? (actualScore / maxScore) * 100 : 100;

        // Determine compliance status
        if (
          availValue >= requiredAvail &&
          integValue >= requiredInteg &&
          confValue >= requiredConf
        ) {
          compliantFrameworks.push(framework.name);
        } else if (compliancePercentage >= 70) {
          partiallyCompliantFrameworks.push(framework.name);
        } else {
          nonCompliantFrameworks.push(framework.name);
        }
      });

      // Generate remediation steps
      const remediationSteps = this.generateRemediationSteps(
        partiallyCompliantFrameworks,
        nonCompliantFrameworks,
        availabilityLevel,
        integrityLevel,
        confidentialityLevel
      );

      // Calculate overall compliance score (0-100)
      const totalFrameworks = frameworks.length;
      const complianceScore = totalFrameworks > 0
        ? ((compliantFrameworks.length + (partiallyCompliantFrameworks.length * 0.5)) / totalFrameworks) * 100
        : 0;

      // Determine overall compliance status
      let status = "Non-Compliant";
      if (nonCompliantFrameworks.length === 0) {
        status = partiallyCompliantFrameworks.length === 0 ? "Compliant" : "Partially Compliant";
      }

      return {
        compliantFrameworks,
        partiallyCompliantFrameworks,
        nonCompliantFrameworks,
        remediationSteps,
        status,
        complianceScore: Math.round(complianceScore)
      };
    } catch (error) {
      logger.error("Error evaluating compliance status", error);
      return {
        compliantFrameworks: [],
        partiallyCompliantFrameworks: [],
        nonCompliantFrameworks: [],
        status: "Error",
        complianceScore: 0
      };
    }
  }

  /**
   * Generate remediation steps based on compliance gaps
   * 
   * @param partiallyCompliantFrameworks - Frameworks that are partially compliant
   * @param nonCompliantFrameworks - Frameworks that are non-compliant
   * @param availabilityLevel - Current availability level
   * @param integrityLevel - Current integrity level
   * @param confidentialityLevel - Current confidentiality level
   * @returns List of remediation steps
   */
  private generateRemediationSteps(
    partiallyCompliantFrameworks: string[],
    nonCompliantFrameworks: string[],
    availabilityLevel: SecurityLevel,
    integrityLevel: SecurityLevel,
    confidentialityLevel: SecurityLevel
  ): string[] {
    const steps: string[] = [];
    const frameworks = this.getSupportedFrameworks();

    // Check each non-compliant framework for remediation steps
    [...nonCompliantFrameworks, ...partiallyCompliantFrameworks].forEach(frameworkName => {
      const framework = frameworks.find(f => f.name === frameworkName);
      if (!framework) return;

      const availNeeded = this.getSecurityLevelValue(framework.requiredAvailabilityLevel || "None");
      const integNeeded = this.getSecurityLevelValue(framework.requiredIntegrityLevel || "None");
      const confNeeded = this.getSecurityLevelValue(framework.requiredConfidentialityLevel || "None");

      const availCurrent = this.getSecurityLevelValue(availabilityLevel);
      const integCurrent = this.getSecurityLevelValue(integrityLevel);
      const confCurrent = this.getSecurityLevelValue(confidentialityLevel);

      // Add framework-specific remediation steps
      if (frameworkName === "GDPR" && confCurrent < confNeeded) {
        steps.push("Implement data protection impact assessments");
        steps.push("Establish data subject rights procedures");
      }

      if (frameworkName === "HIPAA" && confCurrent < confNeeded) {
        steps.push("Develop PHI handling procedures");
        steps.push("Implement breach notification process");
      }

      // Add general remediation steps based on security level gaps
      if (availCurrent < availNeeded) {
        steps.push(`Increase availability controls to ${framework.requiredAvailabilityLevel} level for ${frameworkName} compliance`);
      }

      if (integCurrent < integNeeded) {
        steps.push(`Increase integrity controls to ${framework.requiredIntegrityLevel} level for ${frameworkName} compliance`);
      }

      if (confCurrent < confNeeded) {
        steps.push(`Increase confidentiality controls to ${framework.requiredConfidentialityLevel} level for ${frameworkName} compliance`);
      }
    });

    // Remove duplicates
    return [...new Set(steps)];
  }

  /**
   * Get controls for a specific compliance framework
   * 
   * @param frameworkName - Name of the compliance framework
   * @returns List of controls for the framework
   */
  public getFrameworkControls(frameworkName: string): string[] {
    switch (frameworkName) {
      case "NIST 800-53":
        return [
          "AC-1: Access Control Policy and Procedures",
          "AU-2: Audit Events",
          "IA-2: Identification and Authentication",
          "SC-8: Transmission Confidentiality and Integrity"
        ];
      case "ISO 27001":
        return [
          "A.5: Information security policies",
          "A.8: Asset management",
          "A.9: Access control",
          "A.12: Operations security"
        ];
      case "GDPR":
        return [
          "Article 5: Principles relating to processing of personal data",
          "Article 25: Data protection by design and by default",
          "Article 32: Security of processing",
          "Article 35: Data protection impact assessment"
        ];
      default:
        return [];
    }
  }

  /**
   * Get framework requirements for a specific framework
   * 
   * @param frameworkName - Name of the compliance framework
   * @returns List of requirements for the framework
   */
  public getFrameworkRequirements(frameworkName: string): string[] {
    switch (frameworkName) {
      case "NIST 800-53":
        return [
          "Implement access control mechanisms",
          "Configure security audit logging",
          "Establish identification and authentication processes",
          "Ensure transmission confidentiality and integrity"
        ];
      case "ISO 27001":
        return [
          "Develop information security policies",
          "Implement asset management practices",
          "Establish access control measures",
          "Ensure operations security"
        ];
      case "GDPR":
        return [
          "Implement principles for processing personal data",
          "Design data protection measures by default",
          "Establish security of processing",
          "Conduct data protection impact assessments"
        ];
      case "HIPAA":
        return [
          "Implement administrative safeguards",
          "Establish physical safeguards",
          "Maintain technical safeguards",
          "Conduct risk analysis and management"
        ];
      case "PCI DSS":
        return [
          "Build and maintain secure network",
          "Protect cardholder data",
          "Implement strong access control measures",
          "Regularly monitor and test networks"
        ];
      default:
        return [];
    }
  }

  /**
   * Get required security levels for a specific framework
   * 
   * @param frameworkName - Name of the compliance framework
   * @returns Required security levels for each component
   */
  public getRequiredSecurityLevel(frameworkName: string): {
    availability: SecurityLevel;
    integrity: SecurityLevel;
    confidentiality: SecurityLevel;
  } {
    const framework = this.getSupportedFrameworks().find(
      (f) => f.name.toLowerCase() === frameworkName.toLowerCase()
    );

    if (framework) {
      return {
        availability: framework.requiredAvailabilityLevel || "Moderate",
        integrity: framework.requiredIntegrityLevel || "Moderate",
        confidentiality: framework.requiredConfidentialityLevel || "Moderate"
      };
    }

    // Default values for unknown frameworks
    return {
      availability: "Moderate",
      integrity: "Moderate",
      confidentiality: "Moderate"
    };
  }

  /**
   * Check if security levels meet framework requirements
   * 
   * @param frameworkName - Name of the compliance framework
   * @param availabilityLevel - Current availability level
   * @param integrityLevel - Current integrity level
   * @param confidentialityLevel - Current confidentiality level
   * @returns Whether the security levels meet framework requirements
   */
  public isCompliant(
    frameworkName: string,
    availabilityLevel: SecurityLevel,
    integrityLevel: SecurityLevel,
    confidentialityLevel: SecurityLevel
  ): boolean {
    const requirements = this.getRequiredSecurityLevel(frameworkName);

    const availValue = this.getSecurityLevelValue(availabilityLevel);
    const integValue = this.getSecurityLevelValue(integrityLevel);
    const confValue = this.getSecurityLevelValue(confidentialityLevel);

    const requiredAvailValue = this.getSecurityLevelValue(requirements.availability);
    const requiredIntegValue = this.getSecurityLevelValue(requirements.integrity);
    const requiredConfValue = this.getSecurityLevelValue(requirements.confidentiality);

    return (
      availValue >= requiredAvailValue &&
      integValue >= requiredIntegValue &&
      confValue >= requiredConfValue
    );
  }

  /**
   * Map security controls to compliance frameworks
   * 
   * @param availabilityLevel - Current availability level
   * @param integrityLevel - Current integrity level
   * @param confidentialityLevel - Current confidentiality level
   * @returns Mapping of security controls to compliance frameworks
   */
  public mapControlsToFrameworks(
    availabilityLevel: SecurityLevel,
    integrityLevel: SecurityLevel,
    confidentialityLevel: SecurityLevel
  ): Record<string, string[]> {
    const mapping: Record<string, string[]> = {};

    // Availability controls
    const availabilityControls = this.getComponentDetails("availability", availabilityLevel);
    if (availabilityControls && availabilityControls.recommendations) {
      availabilityControls.recommendations.forEach(control => {
        mapping[control] = this.getFrameworksForControl(control);
      });
    }

    // Integrity controls
    const integrityControls = this.getComponentDetails("integrity", integrityLevel);
    if (integrityControls && integrityControls.recommendations) {
      integrityControls.recommendations.forEach(control => {
        mapping[control] = this.getFrameworksForControl(control);
      });
    }

    // Confidentiality controls
    const confidentialityControls = this.getComponentDetails("confidentiality", confidentialityLevel);
    if (confidentialityControls && confidentialityControls.recommendations) {
      confidentialityControls.recommendations.forEach(control => {
        mapping[control] = this.getFrameworksForControl(control);
      });
    }

    return mapping;
  }

  /**
   * Get frameworks that require a specific control
   * 
   * @param control - Security control description
   * @returns List of frameworks requiring this control
   */
  private getFrameworksForControl(control: string): string[] {
    // This is a simplified mapping for demonstration purposes
    // In a real implementation, this would use a more complex mapping system
    const lowercaseControl = control.toLowerCase();

    if (lowercaseControl.includes("encryption") || lowercaseControl.includes("access control")) {
      return ["NIST 800-53", "ISO 27001", "GDPR", "HIPAA", "PCI DSS"];
    }

    if (lowercaseControl.includes("backup") || lowercaseControl.includes("recovery")) {
      return ["NIST 800-53", "ISO 27001", "HIPAA", "SOC2"];
    }

    if (lowercaseControl.includes("integrity") || lowercaseControl.includes("validation")) {
      return ["NIST 800-53", "ISO 27001", "PCI DSS", "SOC2"];
    }

    // Default return a subset of frameworks
    return ["NIST CSF", "ISO 27001"];
  }
}

/**
 * Creates a compliance service instance
 * 
 * @param dataProvider - Data provider for the service
 * @returns A new ComplianceService instance
 */
export function createComplianceService(dataProvider?: CIADataProvider) {
  // Create a properly typed default data provider if none is provided
  if (!dataProvider) {
    const defaultDataProvider: CIADataProvider = {
      availabilityOptions: {
        "None": { description: "", technical: "", businessImpact: "", capex: 0, opex: 0, bg: "", text: "", recommendations: [] },
        "Low": { description: "", technical: "", businessImpact: "", capex: 0, opex: 0, bg: "", text: "", recommendations: [] },
        "Moderate": { description: "", technical: "", businessImpact: "", capex: 0, opex: 0, bg: "", text: "", recommendations: [] },
        "High": { description: "", technical: "", businessImpact: "", capex: 0, opex: 0, bg: "", text: "", recommendations: [] },
        "Very High": { description: "", technical: "", businessImpact: "", capex: 0, opex: 0, bg: "", text: "", recommendations: [] }
      },
      integrityOptions: {
        "None": { description: "", technical: "", businessImpact: "", capex: 0, opex: 0, bg: "", text: "", recommendations: [] },
        "Low": { description: "", technical: "", businessImpact: "", capex: 0, opex: 0, bg: "", text: "", recommendations: [] },
        "Moderate": { description: "", technical: "", businessImpact: "", capex: 0, opex: 0, bg: "", text: "", recommendations: [] },
        "High": { description: "", technical: "", businessImpact: "", capex: 0, opex: 0, bg: "", text: "", recommendations: [] },
        "Very High": { description: "", technical: "", businessImpact: "", capex: 0, opex: 0, bg: "", text: "", recommendations: [] }
      },
      confidentialityOptions: {
        "None": { description: "", technical: "", businessImpact: "", capex: 0, opex: 0, bg: "", text: "", recommendations: [] },
        "Low": { description: "", technical: "", businessImpact: "", capex: 0, opex: 0, bg: "", text: "", recommendations: [] },
        "Moderate": { description: "", technical: "", businessImpact: "", capex: 0, opex: 0, bg: "", text: "", recommendations: [] },
        "High": { description: "", technical: "", businessImpact: "", capex: 0, opex: 0, bg: "", text: "", recommendations: [] },
        "Very High": { description: "", technical: "", businessImpact: "", capex: 0, opex: 0, bg: "", text: "", recommendations: [] }
      },
      roiEstimates: {
        "NONE": { returnRate: "0%", value: "0%", description: "No ROI" },
        "LOW": { returnRate: "50%", value: "50%", description: "Low ROI" },
        "MODERATE": { returnRate: "150%", value: "150%", description: "Moderate ROI" },
        "HIGH": { returnRate: "250%", value: "250%", description: "High ROI" },
        "VERY_HIGH": { returnRate: "400%", value: "400%", description: "Very High ROI" }
      }
    };
    return new ComplianceService(defaultDataProvider);
  }

  return new ComplianceService(dataProvider);
}
