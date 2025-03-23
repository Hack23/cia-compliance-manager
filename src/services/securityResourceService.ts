import { SecurityLevel } from "../types/cia";
import { CIADataProvider } from "../types/cia-services";
import { BaseService } from "./BaseService";

/**
 * Security resource interface
 */
export interface SecurityResource {
  title: string;
  description: string;
  url: string;
  category?: string;
  source?: string;
  tags?: string[];
  securityLevels?: {
    availability?: SecurityLevel[];
    integrity?: SecurityLevel[];
    confidentiality?: SecurityLevel[];
  };
}

/**
 * Service for managing security resources
 *
 * ## Business Perspective
 *
 * This service provides access to curated security resources that help
 * organizations implement appropriate security controls based on their
 * selected security levels across the CIA triad. It saves time in research
 * and ensures alignment with industry best practices. 📚
 */
export class SecurityResourceService extends BaseService {
  constructor(dataProvider: CIADataProvider) {
    super(dataProvider);
  }

  /**
   * Get resources relevant to the selected security levels
   *
   * @param availabilityLevel - Availability security level
   * @param integrityLevel - Integrity security level
   * @param confidentialityLevel - Confidentiality security level
   * @returns Filtered security resources
   */
  getResourcesForSecurityLevels(
    availabilityLevel: SecurityLevel,
    integrityLevel: SecurityLevel,
    confidentialityLevel: SecurityLevel
  ): SecurityResource[] {
    // For now, return some mock resources
    // In a real implementation, this would filter from a larger set
    return [
      {
        title: "NIST SP 800-53 Security Controls",
        description: "Comprehensive guide to security controls by NIST",
        url: "https://csrc.nist.gov/publications/detail/sp/800-53/rev-5/final",
        category: "standards",
        source: "NIST",
        tags: ["compliance", "controls", "government"],
      },
      {
        title: "OWASP Top 10",
        description: "Top 10 web application security risks",
        url: "https://owasp.org/www-project-top-ten/",
        category: "best_practices",
        source: "OWASP",
        tags: ["web", "application security", "risks"],
      },
      {
        title: "CIS Benchmarks",
        description: "Consensus-developed secure configuration guidelines",
        url: "https://www.cisecurity.org/cis-benchmarks/",
        category: "standards",
        source: "Center for Internet Security",
        tags: ["configuration", "hardening", "compliance"],
      },
      {
        title: "AWS Well-Architected Framework",
        description: "Best practices for cloud architecture",
        url: "https://aws.amazon.com/architecture/well-architected/",
        category: "frameworks",
        source: "Amazon Web Services",
        tags: ["cloud", "architecture", "security"],
      },
      {
        title: "ISO 27001 Implementation Guide",
        description:
          "Guide to implementing ISO 27001 information security standard",
        url: "https://www.iso.org/isoiec-27001-information-security.html",
        category: "documentation",
        source: "ISO",
        tags: ["compliance", "management", "certification"],
      },
    ];
  }

  /**
   * Get security resources for a specific component and level
   *
   * @param component - CIA component type
   * @param level - Security level
   * @returns List of security resources
   */
  getSecurityResources(
    component: string,
    level: SecurityLevel
  ): SecurityResource[] {
    // Simplified implementation - filter resources by component and level
    const allResources = this.getResourcesForSecurityLevels(
      component === "availability" ? level : "Moderate",
      component === "integrity" ? level : "Moderate",
      component === "confidentiality" ? level : "Moderate"
    );

    // Return all resources for now - in a real implementation, we'd filter by component
    return allResources;
  }

  /**
   * Get value points based on security level
   * This method needs to be public to be accessed by ciaContentService
   *
   * @param level - Security level
   * @returns Array of value points
   */
  public getValuePoints(level: SecurityLevel): string[] {
    // Basic implementation with placeholder values
    const valuePoints: Record<SecurityLevel, string[]> = {
      None: ["No significant value points"],
      Low: ["Basic security protection", "Minimal compliance coverage"],
      Moderate: [
        "Standard security coverage",
        "Meets common compliance requirements",
      ],
      High: [
        "Advanced security protection",
        "Comprehensive compliance coverage",
      ],
      "Very High": [
        "Maximum security assurance",
        "Exceeds most compliance requirements",
      ],
    };

    return valuePoints[level] || [];
  }
}

/**
 * Create a SecurityResourceService instance
 *
 * @param dataProvider - Optional data provider
 * @returns SecurityResourceService instance
 */
export function createSecurityResourceService(
  dataProvider?: CIADataProvider
): SecurityResourceService {
  // Use default data provider if none provided
  const defaultProvider: CIADataProvider = {
    availabilityOptions: {
      None: {
        description: "No availability controls",
        technical: "No technical implementation",
        businessImpact: "No business impact details",
        capex: 0,
        opex: 0,
        bg: "#ffffff",
        text: "#000000",
        recommendations: [],
      },
      Low: {
        description: "Basic availability controls",
        technical: "Basic technical implementation",
        businessImpact: "Low business impact details",
        capex: 5,
        opex: 2,
        bg: "#fffaf0",
        text: "#000000",
        recommendations: [],
      },
      Moderate: {
        description: "Standard availability controls",
        technical: "Standard technical implementation",
        businessImpact: "Moderate business impact details",
        capex: 15,
        opex: 5,
        bg: "#f0f8ff",
        text: "#000000",
        recommendations: [],
      },
      High: {
        description: "Advanced availability controls",
        technical: "Advanced technical implementation",
        businessImpact: "High business impact details",
        capex: 30,
        opex: 10,
        bg: "#f0fff0",
        text: "#000000",
        recommendations: [],
      },
      "Very High": {
        description: "Maximum availability controls",
        technical: "Maximum technical implementation",
        businessImpact: "Very high business impact details",
        capex: 50,
        opex: 20,
        bg: "#fff0f5",
        text: "#000000",
        recommendations: [],
      },
    },
    integrityOptions: {
      None: {
        description: "No integrity controls",
        technical: "No technical implementation",
        businessImpact: "No business impact details",
        capex: 0,
        opex: 0,
        bg: "#ffffff",
        text: "#000000",
        recommendations: [],
      },
      Low: {
        description: "Basic integrity controls",
        technical: "Basic technical implementation",
        businessImpact: "Low business impact details",
        capex: 5,
        opex: 2,
        bg: "#fffaf0",
        text: "#000000",
        recommendations: [],
      },
      Moderate: {
        description: "Standard integrity controls",
        technical: "Standard technical implementation",
        businessImpact: "Moderate business impact details",
        capex: 15,
        opex: 5,
        bg: "#f0f8ff",
        text: "#000000",
        recommendations: [],
      },
      High: {
        description: "Advanced integrity controls",
        technical: "Advanced technical implementation",
        businessImpact: "High business impact details",
        capex: 30,
        opex: 10,
        bg: "#f0fff0",
        text: "#000000",
        recommendations: [],
      },
      "Very High": {
        description: "Maximum integrity controls",
        technical: "Maximum technical implementation",
        businessImpact: "Very high business impact details",
        capex: 50,
        opex: 20,
        bg: "#fff0f5",
        text: "#000000",
        recommendations: [],
      },
    },
    confidentialityOptions: {
      None: {
        description: "No confidentiality controls",
        technical: "No technical implementation",
        businessImpact: "No business impact details",
        capex: 0,
        opex: 0,
        bg: "#ffffff",
        text: "#000000",
        recommendations: [],
      },
      Low: {
        description: "Basic confidentiality controls",
        technical: "Basic technical implementation",
        businessImpact: "Low business impact details",
        capex: 5,
        opex: 2,
        bg: "#fffaf0",
        text: "#000000",
        recommendations: [],
      },
      Moderate: {
        description: "Standard confidentiality controls",
        technical: "Standard technical implementation",
        businessImpact: "Moderate business impact details",
        capex: 15,
        opex: 5,
        bg: "#f0f8ff",
        text: "#000000",
        recommendations: [],
      },
      High: {
        description: "Advanced confidentiality controls",
        technical: "Advanced technical implementation",
        businessImpact: "High business impact details",
        capex: 30,
        opex: 10,
        bg: "#f0fff0",
        text: "#000000",
        recommendations: [],
      },
      "Very High": {
        description: "Maximum confidentiality controls",
        technical: "Maximum technical implementation",
        businessImpact: "Very high business impact details",
        capex: 50,
        opex: 20,
        bg: "#fff0f5",
        text: "#000000",
        recommendations: [],
      },
    },
    roiEstimates: {
      NONE: { returnRate: "0%", description: "No investment, no return" },
      LOW: {
        returnRate: "120%",
        description: "Basic security measures provide minimal protection",
      },
      MODERATE: {
        returnRate: "200%",
        description: "Standard security provides good cost-benefit balance",
      },
      HIGH: {
        returnRate: "350%",
        description: "Advanced security provides significant protection",
      },
      VERY_HIGH: {
        returnRate: "450%",
        description: "Maximum security provides optimal protection",
      },
    },
  };

  const provider = dataProvider || defaultProvider;
  return new SecurityResourceService(provider);
}
