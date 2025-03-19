import { COMPLIANCE_STATUS } from "../constants/coreConstants";
import { SecurityLevel } from "../types/cia";
import { CIADataProvider } from "../types/cia-services";

/**
 * Type definition for framework compliance status
 */
export type FrameworkComplianceStatus = "compliant" | "partial" | "non-compliant";

/**
 * Interface for compliance status response
 * 
 * ## Business Perspective
 * 
 * This structure contains critical compliance information required for
 * regulatory reporting, audit preparation, and security governance. It
 * provides a complete view of an organization's regulatory posture. 📋
 */
export interface ComplianceStatusResponse {
  /** Overall compliance status description */
  status: string;
  /** Optional display label for UI presentation */
  label?: string;
  /** List of frameworks that are fully compliant */
  compliantFrameworks: string[];
  /** List of frameworks that are partially compliant */
  partiallyCompliantFrameworks: string[];
  /** List of frameworks that are non-compliant */
  nonCompliantFrameworks: string[];
  /** Actionable steps to remediate compliance gaps */
  remediationSteps: string[];
  /** Requirements from relevant compliance frameworks */
  requirements: string[];
  /** Compliance score as a percentage (0-100) */
  complianceScore: number;
}

/**
 * Service for evaluating compliance status based on security levels
 *
 * ## Business Perspective
 *
 * This service maps CIA security levels to compliance frameworks, helping
 * organizations understand their regulatory posture and identify gaps that
 * need addressing. 📋
 *
 * The getComplianceStatus function is critical for audit preparation and
 * provides actionable remediation steps for compliance shortfalls. 💼
 */
export class ComplianceService {
  private dataProvider?: CIADataProvider;

  /**
   * Constructor for the ComplianceService
   * @param dataProvider Optional CIA data provider
   */
  constructor(dataProvider?: CIADataProvider) {
    this.dataProvider = dataProvider;
  }

  /**
   * Get the compliance status based on security levels
   * 
   * @param availabilityLevel The selected availability security level
   * @param integrityLevel The selected integrity security level
   * @param confidentialityLevel The selected confidentiality security level
   * @param options Optional parameters like industry or region
   * @returns Compliance status object with framework lists and remediation steps
   */
  public getComplianceStatus(
    availabilityLevel: SecurityLevel,
    integrityLevel: SecurityLevel,
    confidentialityLevel: SecurityLevel,
    options?: { industry?: string; region?: string }
  ) {
    return ComplianceService.getComplianceStatus(
      availabilityLevel,
      integrityLevel,
      confidentialityLevel,
      options
    );
  }

  /**
   * Get the compliance status based on security levels (static version)
   * 
   * @param availabilityLevel The selected availability security level
   * @param integrityLevel The selected integrity security level
   * @param confidentialityLevel The selected confidentiality security level
   * @param options Optional parameters like industry or region
   * @returns Compliance status object with framework lists and remediation steps
   */
  public static getComplianceStatus(
    availabilityLevel: SecurityLevel,
    integrityLevel: SecurityLevel,
    confidentialityLevel: SecurityLevel,
    options?: { industry?: string; region?: string }
  ) {
    // Normalize security levels to handle edge cases
    const availability = this.normalizeSecurityLevel(availabilityLevel);
    const integrity = this.normalizeSecurityLevel(integrityLevel);
    const confidentiality = this.normalizeSecurityLevel(confidentialityLevel);

    // Get compliant frameworks based on security levels
    const compliantFrameworks = this.getCompliantFrameworks(
      availability,
      integrity,
      confidentiality,
      options
    );

    // Calculate partially compliant frameworks
    const partiallyCompliantFrameworks = this.getPartiallyCompliantFrameworks(
      availability,
      integrity,
      confidentiality,
      options
    );

    // Calculate non-compliant frameworks
    const nonCompliantFrameworks = this.getNonCompliantFrameworks(
      availability,
      integrity,
      confidentiality,
      options
    );

    // Generate remediation steps based on non-compliant frameworks
    const remediationSteps = this.generateRemediationSteps(
      partiallyCompliantFrameworks,
      nonCompliantFrameworks
    );

    // Get compliance requirements
    const requirements = this.getComplianceRequirements(
      compliantFrameworks,
      partiallyCompliantFrameworks,
      nonCompliantFrameworks
    );

    // Calculate compliance score (0-100)
    const score = this.calculateComplianceScore(
      compliantFrameworks,
      partiallyCompliantFrameworks,
      nonCompliantFrameworks
    );

    return {
      compliantFrameworks,
      partiallyCompliantFrameworks,
      nonCompliantFrameworks,
      remediationSteps,
      requirements,
      score: Math.round(score) // Ensure score is rounded to nearest integer
    };
  }

  /**
   * Gets the list of compliant frameworks based on security levels
   */
  public getCompliantFrameworks(
    availabilityLevel: SecurityLevel,
    integrityLevel: SecurityLevel,
    confidentialityLevel: SecurityLevel,
    options?: { industry?: string; region?: string }
  ): string[] {
    return ComplianceService.getCompliantFrameworks(
      availabilityLevel, 
      integrityLevel, 
      confidentialityLevel,
      options
    );
  }

  /**
   * Gets the list of compliant frameworks based on security levels (static version)
   */
  public static getCompliantFrameworks(
    availabilityLevel: SecurityLevel,
    integrityLevel: SecurityLevel,
    confidentialityLevel: SecurityLevel,
    options?: { industry?: string; region?: string }
  ): string[] {
    // Determine minimum security level across all dimensions
    const minLevel = this.getMinimumSecurityLevel(
      availabilityLevel,
      integrityLevel,
      confidentialityLevel
    );

    // Basic compliant frameworks for different security levels
    if (minLevel === "None") {
      return [];
    } else if (minLevel === "Low") {
      return ["Basic Security Guidelines"];
    } else if (minLevel === "Moderate") {
      return ["Basic Security Guidelines", "ISO 27001 (Tier 1)", "NIST CSF (Basic)"];
    } else if (minLevel === "High") {
      return [
        "Basic Security Guidelines",
        "ISO 27001 (Tier 1)",
        "ISO 27001 (Tier 2)",
        "NIST CSF (Basic)",
        "NIST CSF (Advanced)",
        "SOC2 (Type 1)",
        "GDPR (Basic)"
      ];
    } else if (minLevel === "Very High") {
      return [
        "Basic Security Guidelines",
        "ISO 27001 (Tier 1)",
        "ISO 27001 (Tier 2)",
        "ISO 27001 (Tier 3)",
        "NIST CSF (Basic)",
        "NIST CSF (Advanced)",
        "NIST 800-53",
        "SOC2 (Type 1)",
        "SOC2 (Type 2)",
        "GDPR (Basic)",
        "GDPR (Advanced)",
        "PCI DSS",
        "HIPAA"
      ];
    }

    return [];
  }

  /**
   * Gets the list of partially compliant frameworks based on security levels
   */
  private static getPartiallyCompliantFrameworks(
    availabilityLevel: SecurityLevel,
    integrityLevel: SecurityLevel,
    confidentialityLevel: SecurityLevel,
    options?: { industry?: string; region?: string }
  ): string[] {
    // Framework requirements for different dimensions
    const frameworks = [];
    const levels = [availabilityLevel, integrityLevel, confidentialityLevel];

    // If mixed security levels with at least one Moderate but none below Low
    if (
      levels.includes("Moderate") &&
      !levels.includes("None") &&
      !levels.some(level => level === "Low")
    ) {
      frameworks.push("ISO 27001 (Tier 2)", "NIST CSF (Advanced)");
    }

    // If at least one High but some Moderate
    if (
      levels.includes("High") &&
      levels.includes("Moderate") &&
      !levels.includes("Low") &&
      !levels.includes("None")
    ) {
      frameworks.push("SOC2 (Type 2)", "GDPR (Advanced)");
    }

    // Special case for mixed levels with high confidentiality
    if (
      confidentialityLevel === "High" &&
      (availabilityLevel === "Moderate" || integrityLevel === "Moderate")
    ) {
      frameworks.push("PCI DSS");
    }

    // Filter out any frameworks that are already fully compliant
    const compliantFrameworks = this.getCompliantFrameworks(
      availabilityLevel,
      integrityLevel,
      confidentialityLevel,
      options
    );
    
    return frameworks.filter(
      framework => !compliantFrameworks.includes(framework)
    );
  }

  /**
   * Gets the list of non-compliant frameworks based on security levels
   */
  private static getNonCompliantFrameworks(
    availabilityLevel: SecurityLevel,
    integrityLevel: SecurityLevel,
    confidentialityLevel: SecurityLevel,
    options?: { industry?: string; region?: string }
  ): string[] {
    // All possible frameworks
    const allFrameworks = [
      "Basic Security Guidelines",
      "ISO 27001 (Tier 1)",
      "ISO 27001 (Tier 2)",
      "ISO 27001 (Tier 3)",
      "NIST CSF (Basic)",
      "NIST CSF (Advanced)",
      "NIST 800-53",
      "SOC2 (Type 1)",
      "SOC2 (Type 2)",
      "GDPR (Basic)",
      "GDPR (Advanced)",
      "PCI DSS",
      "HIPAA"
    ];

    // Get compliant and partially compliant frameworks
    const compliantFrameworks = this.getCompliantFrameworks(
      availabilityLevel,
      integrityLevel,
      confidentialityLevel,
      options
    );
    
    const partiallyCompliantFrameworks = this.getPartiallyCompliantFrameworks(
      availabilityLevel,
      integrityLevel,
      confidentialityLevel,
      options
    );

    // Remove compliant and partially compliant frameworks from all frameworks
    return allFrameworks.filter(
      framework =>
        !compliantFrameworks.includes(framework) &&
        !partiallyCompliantFrameworks.includes(framework)
    );
  }

  /**
   * Gets the compliance status text based on security levels
   */
  public getComplianceStatusText(
    availabilityLevel: SecurityLevel,
    integrityLevel: SecurityLevel = availabilityLevel,
    confidentialityLevel: SecurityLevel = availabilityLevel
  ): string {
    return ComplianceService.getComplianceStatusText(
      availabilityLevel,
      integrityLevel,
      confidentialityLevel
    );
  }

  /**
   * Gets the compliance status text based on security levels (static version)
   */
  public static getComplianceStatusText(
    availabilityLevel: SecurityLevel,
    integrityLevel: SecurityLevel = availabilityLevel,
    confidentialityLevel: SecurityLevel = availabilityLevel
  ): string {
    // Determine minimum security level
    const minLevel = this.getMinimumSecurityLevel(
      availabilityLevel,
      integrityLevel,
      confidentialityLevel
    );

    // Map security level to compliance status text
    if (minLevel === "None") {
      return COMPLIANCE_STATUS.NON_COMPLIANT;
    } else if (minLevel === "Low") {
      return COMPLIANCE_STATUS.BASIC_COMPLIANCE;
    } else if (minLevel === "Moderate") {
      return COMPLIANCE_STATUS.STANDARD_COMPLIANCE;
    } else if (minLevel === "High" || minLevel === "Very High") {
      return COMPLIANCE_STATUS.FULL_COMPLIANCE;
    }

    return COMPLIANCE_STATUS.NON_COMPLIANT;
  }

  /**
   * Determines the compliance status for a specific framework
   */
  public getFrameworkStatus(
    framework: string,
    availabilityLevel: SecurityLevel,
    integrityLevel: SecurityLevel,
    confidentialityLevel: SecurityLevel
  ): "compliant" | "partial" | "non-compliant" {
    return ComplianceService.getFrameworkStatus(
      framework,
      availabilityLevel,
      integrityLevel,
      confidentialityLevel
    );
  }

  /**
   * Determines the compliance status for a specific framework (static version)
   */
  public static getFrameworkStatus(
    framework: string,
    availabilityLevel: SecurityLevel,
    integrityLevel: SecurityLevel,
    confidentialityLevel: SecurityLevel
  ): "compliant" | "partial" | "non-compliant" {
    // Normalize framework name for case-insensitive comparison
    const normalizedFramework = framework.trim().toLowerCase();
    
    // Get all framework lists
    const compliant = this.getCompliantFrameworks(
      availabilityLevel,
      integrityLevel,
      confidentialityLevel
    ).map(f => f.toLowerCase());
    
    const partial = this.getPartiallyCompliantFrameworks(
      availabilityLevel,
      integrityLevel,
      confidentialityLevel
    ).map(f => f.toLowerCase());
    
    // Check which list the framework is in
    if (compliant.some(f => f.includes(normalizedFramework))) {
      return "compliant";
    } else if (partial.some(f => f.includes(normalizedFramework))) {
      return "partial";
    }
    
    // Handle specific cases for known frameworks
    if (normalizedFramework.includes("iso")) {
      // ISO frameworks require at least Moderate
      const minLevel = this.getMinimumSecurityLevel(
        availabilityLevel,
        integrityLevel,
        confidentialityLevel
      );
      if (minLevel === "Moderate") return "partial";
    }
    
    if (normalizedFramework.includes("pci")) {
      // PCI DSS requires high confidentiality
      if (confidentialityLevel === "High" || confidentialityLevel === "Very High") {
        return "partial";
      }
    }
    
    // Default to non-compliant for unknown frameworks
    return "non-compliant";
  }

  /**
   * Gets the description for a compliance framework
   */
  public getFrameworkDescription(framework: string): string {
    return ComplianceService.getFrameworkDescription(framework);
  }

  /**
   * Gets the description for a compliance framework (static version)
   */
  public static getFrameworkDescription(framework: string): string {
    const normalizedFramework = framework.toLowerCase();
    
    // Return appropriate descriptions based on framework
    if (normalizedFramework.includes("iso 27001")) {
      return "Information security management standard that defines requirements for establishing, implementing, maintaining and continually improving an information security management system.";
    } else if (normalizedFramework.includes("nist csf")) {
      return "Cybersecurity Framework that provides a policy framework of computer security guidance for organizations to assess and improve their ability to prevent, detect, and respond to cyber attacks.";
    } else if (normalizedFramework.includes("soc2")) {
      return "Service Organization Control 2 (SOC 2) defines criteria for managing customer data based on five trust service principles—security, availability, processing integrity, confidentiality, and privacy.";
    } else if (normalizedFramework.includes("gdpr")) {
      return "General Data Protection Regulation (GDPR) is a regulation on data protection and privacy in the European Union and the European Economic Area.";
    } else if (normalizedFramework.includes("pci")) {
      return "Payment Card Industry Data Security Standard (PCI DSS) is an information security standard for organizations that handle branded credit cards from the major card schemes.";
    } else if (normalizedFramework.includes("hipaa")) {
      return "Health Insurance Portability and Accountability Act (HIPAA) establishes national standards for protecting sensitive patient health information.";
    } else if (normalizedFramework.includes("nist 800-53")) {
      return "NIST Special Publication 800-53 provides a catalog of security and privacy controls for federal information systems and organizations.";
    } else if (normalizedFramework.includes("basic security")) {
      return "Basic security guidelines that establish fundamental security controls and best practices.";
    }
    
    // Default description for unknown frameworks
    return "Compliance framework that establishes standards for information security and data protection.";
  }

  /**
   * Gets the required security level for a framework component
   */
  public getFrameworkRequiredLevel(
    framework: string,
    component: "availability" | "integrity" | "confidentiality"
  ): SecurityLevel {
    return ComplianceService.getFrameworkRequiredLevel(framework, component);
  }

  /**
   * Gets the required security level for a framework component (static version)
   */
  public static getFrameworkRequiredLevel(
    framework: string,
    component: "availability" | "integrity" | "confidentiality"
  ): SecurityLevel {
    const normalizedFramework = framework.toLowerCase();
    
    // Define requirements for specific frameworks
    if (normalizedFramework.includes("basic")) {
      return "Low";
    } else if (normalizedFramework.includes("iso 27001")) {
      if (normalizedFramework.includes("tier 1")) {
        return "Moderate";
      } else if (normalizedFramework.includes("tier 2")) {
        return "High";
      } else if (normalizedFramework.includes("tier 3")) {
        return "Very High";
      }
      return "Moderate";
    } else if (normalizedFramework.includes("nist csf")) {
      if (normalizedFramework.includes("basic")) {
        return "Moderate";
      } else if (normalizedFramework.includes("advanced")) {
        return "High";
      }
      return "Moderate";
    } else if (normalizedFramework.includes("nist 800-53")) {
      return "Very High";
    } else if (normalizedFramework.includes("soc2")) {
      if (normalizedFramework.includes("type 1")) {
        return "High";
      } else if (normalizedFramework.includes("type 2")) {
        return "Very High";
      }
      return "High";
    } else if (normalizedFramework.includes("gdpr")) {
      if (component === "confidentiality") {
        return normalizedFramework.includes("basic") ? "High" : "Very High";
      }
      return normalizedFramework.includes("basic") ? "Moderate" : "High";
    } else if (normalizedFramework.includes("pci")) {
      if (component === "confidentiality") {
        return "Very High";
      }
      return "High";
    } else if (normalizedFramework.includes("hipaa")) {
      if (component === "confidentiality") {
        return "Very High";
      }
      return "High";
    }
    
    // Default to moderate for unknown frameworks
    return "Moderate";
  }

  /**
   * Determines if a framework is applicable to a specific industry or region
   */
  public isFrameworkApplicable(
    framework: string,
    industry?: string,
    region?: string
  ): boolean {
    return ComplianceService.isFrameworkApplicable(framework, industry, region);
  }

  /**
   * Determines if a framework is applicable to a specific industry or region (static version)
   */
  public static isFrameworkApplicable(
    framework: string,
    industry?: string,
    region?: string
  ): boolean {
    const normalizedFramework = framework.toLowerCase();
    const normalizedIndustry = industry?.toLowerCase() || "";
    const normalizedRegion = region?.toLowerCase() || "";
    
    // General frameworks that apply to all industries and regions
    if (
      normalizedFramework.includes("iso 27001") ||
      normalizedFramework.includes("nist csf") ||
      normalizedFramework.includes("basic security")
    ) {
      return true;
    }
    
    // Industry-specific frameworks
    if (normalizedFramework.includes("hipaa")) {
      return normalizedIndustry.includes("health") || normalizedIndustry.includes("medical");
    }
    
    if (normalizedFramework.includes("pci")) {
      return (
        normalizedIndustry.includes("finance") ||
        normalizedIndustry.includes("retail") ||
        normalizedIndustry.includes("ecommerce")
      );
    }
    
    // Region-specific frameworks
    if (normalizedFramework.includes("gdpr")) {
      return (
        normalizedRegion.includes("eu") ||
        normalizedRegion.includes("europe") ||
        normalizedRegion.includes("global")
      );
    }
    
    // SOC2 is widely applicable but more common in certain industries
    if (normalizedFramework.includes("soc2")) {
      return true; // Generally applicable to service organizations
    }
    
    // Default to true for unknown frameworks
    return true;
  }

  /**
   * Generates remediation steps based on non-compliant and partially compliant frameworks
   */
  private static generateRemediationSteps(
    partiallyCompliantFrameworks: string[],
    nonCompliantFrameworks: string[]
  ): string[] {
    const steps: string[] = [];
    
    // Add remediation steps for non-compliant frameworks
    if (nonCompliantFrameworks.some(f => f.toLowerCase().includes("iso 27001"))) {
      steps.push("Implement an Information Security Management System (ISMS)");
      steps.push("Conduct risk assessment and treatment");
    }
    
    if (nonCompliantFrameworks.some(f => f.toLowerCase().includes("nist csf"))) {
      steps.push("Develop security incident response procedures");
      steps.push("Implement continuous monitoring capabilities");
    }
    
    if (nonCompliantFrameworks.some(f => f.toLowerCase().includes("soc2"))) {
      steps.push("Define and implement security policies and procedures");
      steps.push("Establish controls for data access and security monitoring");
    }
    
    if (nonCompliantFrameworks.some(f => f.toLowerCase().includes("gdpr"))) {
      steps.push("Implement data protection impact assessments");
      steps.push("Establish data subject rights procedures");
    }
    
    if (nonCompliantFrameworks.some(f => f.toLowerCase().includes("pci"))) {
      steps.push("Implement secure payment processing methods");
      steps.push("Establish regular vulnerability scanning and penetration testing");
    }
    
    if (nonCompliantFrameworks.some(f => f.toLowerCase().includes("hipaa"))) {
      steps.push("Develop PHI handling procedures");
      steps.push("Implement breach notification process");
    }
    
    // Add remediation steps for partially compliant frameworks
    if (partiallyCompliantFrameworks.some(f => f.toLowerCase().includes("iso 27001"))) {
      steps.push("Enhance existing ISMS with additional controls");
      steps.push("Conduct regular security awareness training");
    }
    
    if (partiallyCompliantFrameworks.some(f => f.toLowerCase().includes("nist csf"))) {
      steps.push("Improve detection capabilities for security events");
      steps.push("Enhance response and recovery procedures");
    }
    
    return [...new Set(steps)]; // Remove duplicates
  }

  /**
   * Gets compliance requirements based on compliant and non-compliant frameworks
   */
  private static getComplianceRequirements(
    compliantFrameworks: string[],
    partiallyCompliantFrameworks: string[],
    nonCompliantFrameworks: string[]
  ): string[] {
    const requirements: string[] = [];
    
    // Add general requirements based on framework status
    if (compliantFrameworks.length > 0) {
      requirements.push("Maintain compliance through regular assessments and audits");
    }
    
    if (partiallyCompliantFrameworks.length > 0) {
      requirements.push("Address gaps in partially compliant frameworks");
    }
    
    if (nonCompliantFrameworks.length > 0) {
      requirements.push("Prioritize implementation of missing controls for key frameworks");
    }
    
    // Add specific requirements based on frameworks
    if (
      nonCompliantFrameworks.some(f => f.toLowerCase().includes("iso 27001")) ||
      partiallyCompliantFrameworks.some(f => f.toLowerCase().includes("iso 27001"))
    ) {
      requirements.push("Establish information security management system (ISMS)");
    }
    
    if (
      nonCompliantFrameworks.some(f => f.toLowerCase().includes("gdpr")) ||
      partiallyCompliantFrameworks.some(f => f.toLowerCase().includes("gdpr"))
    ) {
      requirements.push("Implement data protection and privacy controls");
    }
    
    if (
      nonCompliantFrameworks.some(f => f.toLowerCase().includes("pci")) ||
      partiallyCompliantFrameworks.some(f => f.toLowerCase().includes("pci"))
    ) {
      requirements.push("Secure cardholder data environment");
    }
    
    return requirements;
  }

  /**
   * Calculates a compliance score based on framework coverage
   */
  private static calculateComplianceScore(
    compliantFrameworks: string[],
    partiallyCompliantFrameworks: string[],
    nonCompliantFrameworks: string[]
  ): number {
    // Count of all frameworks
    const totalFrameworks = 
      compliantFrameworks.length + 
      partiallyCompliantFrameworks.length + 
      nonCompliantFrameworks.length;
    
    if (totalFrameworks === 0) {
      return 0;
    }
    
    // Calculate weighted score
    // Fully compliant frameworks count as 1, partially compliant as 0.5
    const score = 
      (compliantFrameworks.length + partiallyCompliantFrameworks.length * 0.5) / 
      totalFrameworks * 100;
    
    return score;
  }

  /**
   * Gets the minimum security level from all three components
   */
  private static getMinimumSecurityLevel(
    availabilityLevel: SecurityLevel,
    integrityLevel: SecurityLevel,
    confidentialityLevel: SecurityLevel
  ): SecurityLevel {
    // Convert security levels to numeric values for comparison
    const levels = [availabilityLevel, integrityLevel, confidentialityLevel];
    const levelValues = {
      "None": 0,
      "Low": 1,
      "Moderate": 2,
      "High": 3,
      "Very High": 4
    };
    
    // Find the minimum level
    let minValue = 4; // Start with highest value
    for (const level of levels) {
      const value = levelValues[level] ?? 0;
      if (value < minValue) {
        minValue = value;
      }
    }
    
    // Convert back to SecurityLevel
    const securityLevels: SecurityLevel[] = [
      "None", "Low", "Moderate", "High", "Very High"
    ];
    
    return securityLevels[minValue];
  }

  /**
   * Normalizes a security level to handle edge cases
   */
  private static normalizeSecurityLevel(level: SecurityLevel): SecurityLevel {
    // Handle potential undefined/null values
    if (!level) {
      return "None";
    }
    
    // Normalize by trimming and checking against valid values
    const normalizedLevel = level.trim();
    const validLevels: SecurityLevel[] = [
      "None", "Low", "Moderate", "High", "Very High"
    ];
    
    if (validLevels.includes(normalizedLevel as SecurityLevel)) {
      return normalizedLevel as SecurityLevel;
    }
    
    // Default to None for invalid values
    return "None";
  }

  /**
   * Creates a new ComplianceService instance
   */
  public static createComplianceService(dataProvider?: CIADataProvider) {
    return new ComplianceService(dataProvider);
  }

  /**
   * For backward compatibility with tests and existing code
   * @deprecated Use createComplianceService instead
   */
  public static create(dataProvider?: CIADataProvider) {
    return new ComplianceService(dataProvider);
  }
}

/**
 * Create a ComplianceService instance with the provided data provider
 * 
 * @param dataProvider - Data provider with CIA options
 * @returns ComplianceService instance
 */
export function createComplianceService(
  dataProvider?: CIADataProvider
): ComplianceService {
  return ComplianceService.createComplianceService(dataProvider);
}
