import { SecurityLevel } from "../types/cia";
import { CIAComponentType, CIADataProvider } from "../types/cia-services";
import {
  ComplianceService,
  ComplianceStatusDetails,
} from "./complianceService";

/**
 * Type for framework compliance status
 */
export type FrameworkComplianceStatus =
  | "compliant"
  | "partially-compliant"
  | "non-compliant";

/**
 * Adapter for the ComplianceService that provides additional integration capabilities
 *
 * ## Integration Perspective
 *
 * This adapter extends the base ComplianceService with additional integration
 * capabilities, allowing the application to connect with external compliance
 * systems and provide more detailed compliance mapping. It serves as a bridge
 * between the application's internal compliance model and external standards. 🔄
 */
export class ComplianceServiceAdapter {
  private complianceService: ComplianceService;

  constructor(dataProvider: CIADataProvider) {
    this.complianceService = new ComplianceService(dataProvider);
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
    return this.complianceService.getComplianceStatus(
      availabilityLevel,
      integrityLevel,
      confidentialityLevel
    );
  }

  /**
   * Get compliance status text based on security levels
   *
   * @param availabilityLevel - Availability security level
   * @param integrityLevel - Integrity security level
   * @param confidentialityLevel - Confidentiality security level
   * @returns Compliance status text
   */
  public getComplianceStatusText(
    availabilityLevel: SecurityLevel,
    integrityLevel: SecurityLevel = availabilityLevel,
    confidentialityLevel: SecurityLevel = availabilityLevel
  ): string {
    // Map the status to a text representation
    const status = this.getComplianceStatus(
      availabilityLevel,
      integrityLevel,
      confidentialityLevel
    );

    if (status.compliantFrameworks.length === 0) {
      return "Non-Compliant";
    } else if (
      status.compliantFrameworks.length > 0 &&
      status.nonCompliantFrameworks.length === 0
    ) {
      return "Compliant with all major frameworks";
    } else if (status.compliantFrameworks.length > 3) {
      return "Compliant with standard frameworks";
    } else {
      return "Meets basic compliance only";
    }
  }

  /**
   * Get list of frameworks that the current security levels comply with
   *
   * @param availabilityLevel - Availability security level
   * @param integrityLevel - Integrity security level
   * @param confidentialityLevel - Confidentiality security level
   * @returns Array of compliant framework names
   */
  public getCompliantFrameworks(
    availabilityLevel: SecurityLevel,
    integrityLevel: SecurityLevel = availabilityLevel,
    confidentialityLevel: SecurityLevel = availabilityLevel
  ): string[] {
    return this.complianceService.getCompliantFrameworks(
      availabilityLevel,
      integrityLevel,
      confidentialityLevel
    );
  }

  /**
   * Get description of a specific compliance framework
   *
   * @param framework - Framework name
   * @returns Framework description
   */
  public getFrameworkDescription(framework: string): string {
    return this.complianceService.getFrameworkDescription(framework);
  }

  /**
   * Get compliance gap analysis for security levels compared to framework requirements
   *
   * @param availabilityLevel - Availability security level
   * @param integrityLevel - Integrity security level
   * @param confidentialityLevel - Confidentiality security level
   * @param framework - Target compliance framework
   * @returns Gap analysis with recommendations
   */
  public getComplianceGapAnalysis(
    availabilityLevel: SecurityLevel,
    integrityLevel: SecurityLevel,
    confidentialityLevel: SecurityLevel,
    framework: string
  ): {
    isCompliant: boolean;
    gaps: string[];
    recommendations: string[];
  } {
    const status = this.complianceService.getFrameworkStatus(
      framework,
      availabilityLevel,
      integrityLevel,
      confidentialityLevel
    );

    const isCompliant = status === "compliant";
    const gaps: string[] = [];
    const recommendations: string[] = [];

    // If not fully compliant, identify the gaps
    if (status !== "compliant") {
      // Get required levels for each component
      const availRequired = this.complianceService.getFrameworkRequiredLevel(
        framework,
        "availability"
      );
      const integRequired = this.complianceService.getFrameworkRequiredLevel(
        framework,
        "integrity"
      );
      const confRequired = this.complianceService.getFrameworkRequiredLevel(
        framework,
        "confidentiality"
      );

      // Check each component for gaps
      if (
        this.getSecurityLevelValue(availabilityLevel) <
        this.getSecurityLevelValue(availRequired)
      ) {
        gaps.push(
          `Availability (Current: ${availabilityLevel}, Required: ${availRequired})`
        );
        recommendations.push(
          `Improve availability controls to meet ${availRequired} level requirements`
        );
      }

      if (
        this.getSecurityLevelValue(integrityLevel) <
        this.getSecurityLevelValue(integRequired)
      ) {
        gaps.push(
          `Integrity (Current: ${integrityLevel}, Required: ${integRequired})`
        );
        recommendations.push(
          `Enhance integrity controls to meet ${integRequired} level requirements`
        );
      }

      if (
        this.getSecurityLevelValue(confidentialityLevel) <
        this.getSecurityLevelValue(confRequired)
      ) {
        gaps.push(
          `Confidentiality (Current: ${confidentialityLevel}, Required: ${confRequired})`
        );
        recommendations.push(
          `Strengthen confidentiality controls to meet ${confRequired} level requirements`
        );
      }

      // Add framework-specific recommendations
      if (framework === "GDPR") {
        recommendations.push("Implement data protection impact assessments");
        recommendations.push("Establish data subject rights procedures");
      } else if (framework === "HIPAA") {
        recommendations.push("Develop PHI handling procedures");
        recommendations.push("Implement breach notification process");
      } else if (framework === "PCI DSS") {
        recommendations.push("Implement strong access control measures");
        recommendations.push(
          "Develop secure applications for payment processing"
        );
      }
    }

    return {
      isCompliant,
      gaps,
      recommendations,
    };
  }

  /**
   * Get compliance assessment for a specific component and framework
   *
   * @param component - CIA component
   * @param level - Security level
   * @param framework - Target compliance framework
   * @returns Assessment of component's compliance with the framework
   */
  public getComponentComplianceAssessment(
    component: CIAComponentType,
    level: SecurityLevel,
    framework: string
  ): {
    isCompliant: boolean;
    requiredLevel: SecurityLevel;
    gap: number;
  } {
    const requiredLevel = this.complianceService.getFrameworkRequiredLevel(
      framework,
      component
    );
    const currentValue = this.getSecurityLevelValue(level);
    const requiredValue = this.getSecurityLevelValue(requiredLevel);
    const gap = Math.max(0, requiredValue - currentValue);

    return {
      isCompliant: currentValue >= requiredValue,
      requiredLevel,
      gap,
    };
  }

  /**
   * Helper method to get numeric value for a security level
   *
   * @param level - Security level
   * @returns Numeric value (0-4)
   */
  private getSecurityLevelValue(level: SecurityLevel): number {
    const values: Record<SecurityLevel, number> = {
      None: 0,
      Low: 1,
      Moderate: 2,
      High: 3,
      "Very High": 4,
    };

    return values[level] || 0;
  }

  /**
   * Get framework status based on security levels
   *
   * @param framework - Framework name
   * @param availabilityLevel - Availability security level
   * @param integrityLevel - Integrity security level
   * @param confidentialityLevel - Confidentiality security level
   * @returns Framework compliance status
   */
  public getFrameworkStatus(
    framework: string,
    availabilityLevel: SecurityLevel,
    integrityLevel: SecurityLevel,
    confidentialityLevel: SecurityLevel
  ): FrameworkComplianceStatus {
    return this.complianceService.getFrameworkStatus(
      framework,
      availabilityLevel,
      integrityLevel,
      confidentialityLevel
    );
  }

  /**
   * Get required security level for a framework component
   *
   * @param framework - Framework name
   * @param component - CIA component
   * @returns Required security level
   */
  public getFrameworkRequiredLevel(
    framework: string,
    component: CIAComponentType
  ): SecurityLevel {
    // Normalize framework name to handle case insensitivity
    const normalizedFramework = this.normalizeFrameworkName(framework);
    return this.complianceService.getFrameworkRequiredLevel(
      normalizedFramework,
      component
    );
  }

  /**
   * Normalize framework name to handle case insensitivity
   *
   * @param framework - Framework name in any case format
   * @returns Normalized framework name
   */
  private normalizeFrameworkName(framework: string): string {
    // Check for common framework names regardless of case
    const frameworkMap: Record<string, string> = {
      "pci dss": "PCI DSS",
      pcidss: "PCI DSS",
      "pci-dss": "PCI DSS",
      hipaa: "HIPAA",
      gdpr: "GDPR",
      "nist csf": "NIST CSF",
      "nist 800-53": "NIST 800-53",
      "iso 27001": "ISO 27001",
      soc2: "SOC2",
    };

    // Try to match by lowercase name
    const lowercaseName = framework.toLowerCase().trim();
    if (frameworkMap[lowercaseName]) {
      return frameworkMap[lowercaseName];
    }

    // If no match found, return the original framework name
    return framework;
  }

  /**
   * Check if a framework is applicable to an industry or region
   *
   * @param framework - Framework name
   * @param industry - Industry name
   * @param region - Region name
   * @returns Boolean indicating if the framework is applicable
   */
  public isFrameworkApplicable(
    framework: string,
    industry?: string,
    region?: string
  ): boolean {
    // Simple implementation that assumes most frameworks are applicable
    const healthcareFrameworks = ["HIPAA", "HITECH"];
    const financeFrameworks = ["PCI DSS", "SOX", "GLBA"];
    const euFrameworks = ["GDPR", "eIDAS"];
    const usFrameworks = ["NIST 800-53", "NIST CSF", "HIPAA"];

    // If no industry or region specified, assume it's applicable
    if (!industry && !region) return true;

    // Check industry-specific frameworks
    if (industry) {
      const lowerIndustry = industry.toLowerCase();
      if (
        lowerIndustry === "healthcare" &&
        healthcareFrameworks.some(
          (f) => f.toLowerCase() === framework.toLowerCase()
        )
      ) {
        return true;
      }

      if (
        (lowerIndustry === "finance" || lowerIndustry === "banking") &&
        financeFrameworks.some(
          (f) => f.toLowerCase() === framework.toLowerCase()
        )
      ) {
        return true;
      }
    }

    // Check region-specific frameworks
    if (region) {
      const lowerRegion = region.toLowerCase();
      if (
        (lowerRegion === "eu" || lowerRegion === "europe") &&
        euFrameworks.some((f) => f.toLowerCase() === framework.toLowerCase())
      ) {
        return true;
      }

      if (
        lowerRegion === "us" &&
        usFrameworks.some((f) => f.toLowerCase() === framework.toLowerCase())
      ) {
        return true;
      }
    }

    // For general frameworks or when we don't have specific rules, return true
    const generalFrameworks = ["ISO 27001", "SOC2", "NIST CSF"];
    return (
      generalFrameworks.some(
        (f) => f.toLowerCase() === framework.toLowerCase()
      ) || true
    );
  }
}

/**
 * Static compatibility methods for ComplianceService
 * These are used to maintain backward compatibility with existing code
 */
export class StaticComplianceService {
  /**
   * Get compliance status for a given configuration
   */
  public static getComplianceStatus(
    availabilityLevel: SecurityLevel,
    integrityLevel: SecurityLevel,
    confidentialityLevel: SecurityLevel,
    options?: { industry?: string; region?: string }
  ): ComplianceStatusDetails {
    // Create a temporary adapter with default data provider
    const adapter = new ComplianceServiceAdapter({} as any);
    return adapter.getComplianceStatus(
      availabilityLevel,
      integrityLevel,
      confidentialityLevel
    );
  }

  /**
   * Get compliance status text
   */
  public static getComplianceStatusText(
    availabilityLevel: SecurityLevel,
    integrityLevel?: SecurityLevel,
    confidentialityLevel?: SecurityLevel
  ): string {
    // Create a temporary adapter with default data provider
    const adapter = new ComplianceServiceAdapter({} as any);
    return adapter.getComplianceStatusText(
      availabilityLevel,
      integrityLevel,
      confidentialityLevel
    );
  }

  /**
   * Get framework description
   */
  public static getFrameworkDescription(framework: string): string {
    // Create a temporary adapter with default data provider
    const adapter = new ComplianceServiceAdapter({} as any);
    return adapter.getFrameworkDescription(framework);
  }
}

// Backward compatibility - export as ComplianceService
export { StaticComplianceService as ComplianceService };
