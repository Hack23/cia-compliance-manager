import { SecurityLevel } from "../types/cia";
import { CIAComponentType, CIADataProvider } from "../types/cia-services";
import { BaseService } from "./BaseService";

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
export class SecurityResourceService extends BaseService {
  constructor(dataProvider: CIADataProvider) {
    super(dataProvider);
  }

  /**
   * Get value points for a security level
   */
  public getValuePoints(level: SecurityLevel): string[] {
    return super.getValuePoints(level);
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
}

/**
 * Creates a security resource service instance
 * 
 * @param dataProvider - Data provider for the service
 * @returns A new SecurityResourceService instance
 */
export function createSecurityResourceService(dataProvider?: CIADataProvider) {
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
    return new SecurityResourceService(defaultDataProvider);
  }

  return new SecurityResourceService(dataProvider);
}
