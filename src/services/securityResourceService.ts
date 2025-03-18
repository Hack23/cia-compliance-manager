import { SecurityLevel } from "../types/cia";
import {
    CIAComponentType,
    CIADataProvider,
    CIADetails,
} from "../types/cia-services";

/**
 * Security resource model
 */
export interface SecurityResource {
  id: string;
  title: string;
  description: string;
  url: string;
  type: string;
  relevance: number; // 0-100 scale
  tags?: string[];
}

/**
 * Service for security resources related functionality
 *
 * ## Educational Perspective
 *
 * This service provides educational resources and implementation guides
 * that help security teams build their knowledge and implement security
 * controls effectively. It curates relevant documentation and learning
 * resources based on selected security levels. 📚
 */
export class SecurityResourceService {
  private dataProvider: CIADataProvider;

  constructor(dataProvider: CIADataProvider) {
    this.dataProvider = dataProvider;
  }

  /**
   * Get the component details for a specific level
   */
  private getComponentDetails(
    component: CIAComponentType,
    level: SecurityLevel
  ): CIADetails | undefined {
    const options = this.getCIAOptions(component);
    return options[level];
  }

  /**
   * Get options for a CIA component
   */
  private getCIAOptions(
    component: CIAComponentType
  ): Record<string, CIADetails> {
    switch (component) {
      case "availability":
        return this.dataProvider.availabilityOptions;
      case "integrity":
        return this.dataProvider.integrityOptions;
      case "confidentiality":
        return this.dataProvider.confidentialityOptions;
      default:
        return {};
    }
  }

  /**
   * Get value points for a security level
   */
  public getValuePoints(level: SecurityLevel): string[] {
    const defaultValuePoints = this.getDefaultValuePoints(level);

    // If data provider has a custom function, use that
    if (typeof this.dataProvider.getDefaultValuePoints === "function") {
      try {
        const customPoints = this.dataProvider.getDefaultValuePoints(level);
        if (customPoints && customPoints.length > 0) {
          return customPoints;
        }
      } catch (error) {
        console.error("Error fetching custom value points:", error);
      }
    }

    return defaultValuePoints;
  }

  /**
   * Default implementation of value points
   */
  private getDefaultValuePoints(level: SecurityLevel): string[] {
    switch (level) {
      case "Very High":
        return [
          "Maximum security value with comprehensive protection",
          "Enables business in highly regulated industries",
          "Provides competitive advantage through superior security posture",
          "Minimizes risk of data breaches and associated costs",
          "Ensures regulatory compliance across major frameworks",
        ];
      case "High":
        return [
          "Strong security value with robust protection",
          "Supports business in moderately regulated industries",
          "Reduces risk of security incidents significantly",
          "Protects sensitive data and critical operations",
          "Meets requirements for most compliance frameworks",
        ];
      case "Moderate":
        return [
          "Balanced security value with standard protection",
          "Suitable for most business applications",
          "Reduces common security risks",
          "Protects important business data",
          "Meets basic compliance requirements",
        ];
      case "Low":
        return [
          "Basic security value with minimal protection",
          "Suitable for non-critical systems",
          "Addresses obvious security vulnerabilities",
          "Provides foundation for security program",
          "May not meet regulatory requirements",
        ];
      case "None":
      default:
        return [
          "No security value",
          "Suitable only for non-sensitive public information",
          "High vulnerability to security incidents",
          "No protection against threats",
          "Does not meet any compliance requirements",
        ];
    }
  }

  /**
   * Get security resources for a specific level
   */
  public getSecurityResources(
    component: CIAComponentType,
    level: SecurityLevel
  ): SecurityResource[] {
    // Basic starting set of resources
    const resources: SecurityResource[] = [
      {
        id: "general-security-guidelines",
        title: "General Security Guidelines",
        description: `General security guidelines for ${level} security level`,
        url: "https://www.nist.gov/cyberframework",
        type: "general",
        relevance: 100,
        tags: ["guidelines", "best practices"],
      },
    ];

    // Add level-specific resources
    switch (level) {
      case "Very High":
        resources.push({
          id: `${component}-very-high`,
          title: `${this.capitalizeFirstLetter(
            component
          )} Security for Critical Systems`,
          description: `Comprehensive ${component} controls for mission-critical systems`,
          url: "https://csrc.nist.gov/publications/detail/sp/800-53/rev-5/final",
          type: component,
          relevance: 90,
          tags: ["critical", "comprehensive"],
        });
        break;
      case "High":
        resources.push({
          id: `${component}-high`,
          title: `${this.capitalizeFirstLetter(
            component
          )} Protection for Sensitive Data`,
          description: `Strong ${component} controls for sensitive information`,
          url: "https://www.iso.org/isoiec-27001-information-security.html",
          type: component,
          relevance: 80,
          tags: ["sensitive", "robust"],
        });
        break;
      case "Moderate":
        resources.push({
          id: `${component}-moderate`,
          title: `${this.capitalizeFirstLetter(
            component
          )} Controls for Business Systems`,
          description: `Standard ${component} controls for business applications`,
          url: "https://www.cisecurity.org/controls",
          type: component,
          relevance: 70,
          tags: ["standard", "balanced"],
        });
        break;
      case "Low":
        resources.push({
          id: `${component}-low`,
          title: `Basic ${this.capitalizeFirstLetter(component)} Controls`,
          description: `Minimal ${component} controls for non-critical systems`,
          url: "https://www.sans.org/security-resources",
          type: component,
          relevance: 60,
          tags: ["basic", "minimal"],
        });
        break;
      default:
        resources.push({
          id: `${component}-none`,
          title: `${this.capitalizeFirstLetter(
            component
          )} Security Fundamentals`,
          description: "Basic understanding of security concepts",
          url: "https://www.cybrary.it/course/introduction-cyber-security",
          type: component,
          relevance: 50,
          tags: ["fundamentals", "introduction"],
        });
    }

    // Component-specific resources
    if (component === "availability") {
      resources.push({
        id: "availability-resources",
        title: "Availability Best Practices",
        description: "Guidelines for ensuring system availability",
        url: "https://docs.microsoft.com/en-us/azure/architecture/framework/resiliency/overview",
        type: "availability",
        relevance: 85,
        tags: ["resiliency", "high-availability"],
      });
    } else if (component === "integrity") {
      resources.push({
        id: "integrity-resources",
        title: "Data Integrity Controls",
        description: "Guidelines for ensuring data integrity",
        url: "https://csrc.nist.gov/publications/detail/sp/800-162/final",
        type: "integrity",
        relevance: 85,
        tags: ["data integrity", "validation"],
      });
    } else if (component === "confidentiality") {
      resources.push({
        id: "confidentiality-resources",
        title: "Data Protection Guidelines",
        description: "Guidelines for ensuring data confidentiality",
        url: "https://www.ncsc.gov.uk/collection/protecting-bulk-personal-data",
        type: "confidentiality",
        relevance: 85,
        tags: ["encryption", "access control"],
      });
    }

    return resources;
  }

  /**
   * Helper function to capitalize first letter
   */
  private capitalizeFirstLetter(string: string): string {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
}
