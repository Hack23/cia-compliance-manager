import defaultResources from "../data/securityResources";
import { SecurityLevel } from "../types/cia";
import { CIAComponentType, CIADataProvider } from "../types/cia-services";
import { EnhancedSecurityResource, SecurityResource } from "../types/securityResources";
import { ISecurityResourceService } from "../types/services";
import { BaseService } from "./BaseService";

/**
 * Service for security resource recommendations
 * 
 * ## Business Perspective
 * 
 * Provides curated security resources, best practices, and implementation
 * guidance tailored to specific security levels and CIA components. Helps
 * organizations find relevant documentation, tools, and frameworks to
 * implement effective security controls. 📚
 * 
 * @implements {ISecurityResourceService}
 */
export class SecurityResourceService extends BaseService implements ISecurityResourceService {
  /**
   * Service name for identification
   */
  public readonly name: string = 'SecurityResourceService';

  /**
   * Processed and enhanced security resources
   */
  private resources: EnhancedSecurityResource[];

  /**
   * Create a new SecurityResourceService instance
   * 
   * @param dataProvider - Data provider for CIA options and security data
   * @throws {ServiceError} If dataProvider is not provided
   */
  constructor(dataProvider: CIADataProvider) {
    super(dataProvider);
    this.resources = this.processResources(defaultResources);
  }

  /**
   * Process resources to add score and ensure required properties
   * 
   * @param resources - Raw security resources to process
   * @returns Enhanced security resources with relevance scores
   */
  private processResources(
    resources: SecurityResource[]
  ): EnhancedSecurityResource[] {
    return resources.map(
      (resource) =>
        ({
          ...resource,
          relevance: resource.priority || 50,
          score: resource.priority || 50,
        } as EnhancedSecurityResource)
    );
  }

  /**
   * Get security resources based on component and level
   * 
   * Returns a curated list of security resources tailored to the specific
   * CIA component and security level, including documentation, tools,
   * frameworks, and best practices.
   * 
   * @param component - CIA component type or 'general' for general resources
   * @param level - Security level
   * @returns Array of relevant security resources sorted by relevance
   * @throws {ServiceError} If component or level is invalid
   * 
   * @example
   * ```typescript
   * const resources = service.getSecurityResources('confidentiality', 'High');
   * console.log(`Found ${resources.length} resources`);
   * resources.forEach(r => console.log(`- ${r.title}: ${r.url}`));
   * ```
   */
  public getSecurityResources(
    component: CIAComponentType | "general" | "all",
    level: SecurityLevel
  ): EnhancedSecurityResource[] {
    if (component !== "general" && component !== "all") {
      this.validateComponent(component as CIAComponentType);
    }
    this.validateSecurityLevel(level);
    const fallbackResource: EnhancedSecurityResource = {
      id: `fallback-${component}`,
      title: `Basic security guidance for ${component}`,
      description: `Start with these resources to implement ${component} security controls`,
      url: "https://www.nist.gov/cyberframework",
      type: component === "all" ? "general" : (component as CIAComponentType),
      relevance: 100,
      score: 100,
      tags: ["beginner", "basics"],
      category: "documentation",
      source: "NIST",
    };

    const componentSpecificResources: Record<string, EnhancedSecurityResource> =
      {
        availability: {
          id: "avail-resource",
          title: "Availability Best Practices",
          description: "Guidance for implementing availability controls",
          url: "https://example.com/availability",
          type: "availability",
          relevance: 90,
          score: 90,
          tags: ["availability", "uptime"],
          category: "best_practices",
          source: "NIST",
        },
        integrity: {
          id: "integrity-resource",
          title: "Integrity Guidelines",
          description: "Guidance for implementing integrity controls",
          url: "https://example.com/integrity",
          type: "integrity",
          relevance: 90,
          score: 90,
          tags: ["integrity", "validation"],
          category: "best_practices",
          source: "NIST",
        },
        confidentiality: {
          id: "confidentiality-resource",
          title: "Confidentiality Controls",
          description: "Guidance for implementing confidentiality controls",
          url: "https://example.com/confidentiality",
          type: "confidentiality",
          relevance: 90,
          score: 90,
          tags: ["confidentiality", "encryption"],
          category: "best_practices",
          source: "NIST",
        },
      };

    const allResources = [
      ...this.resources,
      fallbackResource,
      ...Object.values(componentSpecificResources),
    ];

    return allResources
      .filter((resource) => {
        if (component === "all") {
          return true;
        }

        if (resource.type === component) {
          return true;
        }

        if (resource.components && resource.components.includes(component)) {
          return true;
        }

        return resource.type === "general";
      })
      .filter((resource) => {
        if (!resource.relevantLevels || resource.relevantLevels.length === 0) {
          return true;
        }

        return resource.relevantLevels.includes(level);
      })
      .map((resource) => ({
        ...resource,
        relevance: this.calculateRelevance(resource, component, level),
      }))
      .sort((a, b) => b.relevance - a.relevance);
  }

  /**
   * Calculate resource relevance score
   */
  private calculateRelevance(
    resource: EnhancedSecurityResource,
    component: CIAComponentType | "general" | "all",
    level: SecurityLevel
  ): number {
    let score = resource.priority || 50;

    if (resource.type === component) {
      score += 20;
    }

    if (resource.relevantLevels && resource.relevantLevels.includes(level)) {
      score += 20;
    }

    return score;
  }

  /**
   * Get value points for a security level
   * 
   * Returns a list of key value propositions and benefits for implementing
   * security controls at the specified security level. Helps justify
   * security investments to stakeholders.
   * 
   * @param level - Security level
   * @returns Array of value point strings describing the benefits and characteristics
   * @throws {ServiceError} If level is invalid
   * 
   * @example
   * ```typescript
   * const valuePoints = service.getValuePoints('High');
   * console.log('Benefits of High security:');
   * valuePoints.forEach(point => console.log(`- ${point}`));
   * ```
   */
  public getValuePoints(level: SecurityLevel): string[] {
    this.validateSecurityLevel(level);

    if (this.dataProvider.getDefaultValuePoints) {
      try {
        const valuePoints = this.dataProvider.getDefaultValuePoints(level);
        if (valuePoints && valuePoints.length > 0) {
          return valuePoints;
        }
      } catch (error) {
        this.logOperation('warn', 'Error fetching custom value points', {
          method: 'getValuePoints',
          level,
          error: error instanceof Error ? error.message : String(error)
        });
      }
    }

    if (level === "None") {
      return [
        "No security value",
        "Suitable only for non-sensitive public information",
        "High vulnerability to security incidents",
        "No protection against threats",
        "Does not meet any compliance requirements",
      ];
    }

    return [
      `Provides ${level.toLowerCase()} level of protection`,
      `Meets ${
        level === "High" || level === "Very High" ? "advanced" : "basic"
      } security requirements`,
    ];
  }
}

/**
 * Create SecurityResourceService with the provided data provider
 */
export function createSecurityResourceService(
  dataProvider: CIADataProvider
): SecurityResourceService {
  if (!dataProvider) {
    const defaultProvider: CIADataProvider = {
      availabilityOptions: {},
      integrityOptions: {},
      confidentialityOptions: {},
      roiEstimates: {
        NONE: { returnRate: "0%", description: "No ROI", value: "0%" },
        LOW: { returnRate: "50%", description: "Low ROI", value: "50%" },
        MODERATE: {
          returnRate: "150%",
          description: "Moderate ROI",
          value: "150%",
        },
        HIGH: { returnRate: "250%", description: "High ROI", value: "250%" },
        VERY_HIGH: {
          returnRate: "400%",
          description: "Very High ROI",
          value: "400%",
        },
      },
    } as CIADataProvider;

    return new SecurityResourceService(defaultProvider);
  }
  return new SecurityResourceService(dataProvider);
}
