import defaultResources from "../data/securityResources";
import { SecurityLevel } from "../types/cia";
import { CIAComponentType, CIADataProvider } from "../types/cia-services";
import { SecurityResource } from "../types/securityResources";
import { BaseService } from "./BaseService";

// Add the interface extension here to include relevance property
interface EnhancedSecurityResource extends SecurityResource {
  relevance: number;
  score?: number;
}

/**
 * Service for security resource recommendations
 *
 * ## Business Perspective
 *
 * This service recommends security resources based on selected security
 * levels and components, helping organizations implement appropriate
 * security controls with guidance from authoritative sources. 📚
 */
export class SecurityResourceService extends BaseService {
  private resources: EnhancedSecurityResource[];

  constructor(dataProvider: CIADataProvider) {
    super(dataProvider);
    this.resources = this.processResources(defaultResources);
  }

  /**
   * Process resources to add score and ensure required properties
   */
  private processResources(
    resources: SecurityResource[]
  ): EnhancedSecurityResource[] {
    return resources.map(
      (resource) =>
        ({
          ...resource,
          // Add relevance property if missing (for backward compatibility)
          relevance: resource.priority || 50,
          score: resource.priority || 50,
        } as EnhancedSecurityResource)
    );
  }

  /**
   * Get security resources based on component and level
   *
   * @param component - Security component type
   * @param level - Security level
   * @returns Array of security resources
   */
  public getSecurityResources(
    component: CIAComponentType | "general" | "all",
    level: SecurityLevel
  ): EnhancedSecurityResource[] {
    // For None level, still return at least one resource per component
    if (level === "None") {
      const fallbackResource: EnhancedSecurityResource = {
        id: `fallback-${component}`,
        title: `Basic security guidance for ${component}`,
        description: `Start with these resources to implement ${component} security controls`,
        url: "https://www.nist.gov/cyberframework",
        type: component === "all" ? "general" : (component as any),
        relevance: 100,
        score: 100,
        tags: ["beginner", "basics"],
        category: "documentation",
        source: "NIST",
      };
      return [fallbackResource];
    }

    // Filter resources by component and level
    return this.resources
      .filter((resource) => {
        // Handle 'all' component
        if (component === "all") {
          return true;
        }

        // Check component type
        if (resource.type === component) {
          return true;
        }

        // Check components array if it exists
        if (resource.components && resource.components.includes(component)) {
          return true;
        }

        // Include general resources for all components
        return resource.type === "general";
      })
      .filter((resource) => {
        // If no relevantLevels, assume it's relevant for all levels
        if (!resource.relevantLevels || resource.relevantLevels.length === 0) {
          return true;
        }

        // Check if the resource is relevant for the selected level
        return resource.relevantLevels.includes(level);
      })
      .map((resource) => ({
        ...resource,
        // Calculate relevance for sorting
        relevance: this.calculateRelevance(resource, component, level),
      }))
      .sort((a, b) => b.relevance - a.relevance);
  }

  /**
   * Calculate resource relevance score
   *
   * @param resource - Security resource
   * @param component - Target component
   * @param level - Security level
   * @returns Relevance score
   */
  private calculateRelevance(
    resource: EnhancedSecurityResource,
    component: CIAComponentType | "general" | "all",
    level: SecurityLevel
  ): number {
    let score = resource.priority || 50;

    // Higher score for exact component match
    if (resource.type === component) {
      score += 20;
    }

    // Higher score for exact level match
    if (resource.relevantLevels && resource.relevantLevels.includes(level)) {
      score += 20;
    }

    return score;
  }

  /**
   * Get value points for a security level
   *
   * @param level - Security level
   * @returns Array of value points
   */
  public getValuePoints(level: SecurityLevel): string[] {
    // Use the dataProvider's method if available
    if (this.dataProvider.getDefaultValuePoints) {
      return this.dataProvider.getDefaultValuePoints(level);
    }

    // Fallback implementation
    return this.getDefaultValuePointsImpl(level);
  }

  /**
   * Default implementation of value points for a security level
   *
   * @param level - Security level
   * @returns Array of value points
   */
  private getDefaultValuePointsImpl(level: SecurityLevel): string[] {
    if (level === "None") {
      return [];
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
 *
 * @param dataProvider - Data provider
 * @returns SecurityResourceService instance
 */
export function createSecurityResourceService(
  dataProvider?: CIADataProvider
): SecurityResourceService {
  if (!dataProvider) {
    throw new Error("Data provider is required");
  }
  return new SecurityResourceService(dataProvider);
}
