import { SecurityLevel } from "../types/cia";
import {
  CIAComponentType,
  CIADataProvider,
  CIADetails,
  TechnicalImplementationDetails,
} from "../types/cia-services";
import {
  getDefaultDevelopmentEffort,
  getDefaultExpertiseLevel,
  getDefaultMaintenanceEffort,
} from "../utils/securityDefaults";
import { BaseService } from "./BaseService";

/**
 * Technical implementation details for different security components
 */
interface ComponentTechnicalDetails {
  description: string;
  implementationSteps: string[];
  effort: {
    development: string;
    maintenance: string;
    expertise: string;
  };
}

/**
 * Interface defining the effort required for technical implementation
 */
interface TechnicalImplementationEffort {
  development: string;
  maintenance: string;
  expertise: string;
}

/**
 * Service for technical implementation related functionality
 *
 * ## Technical Perspective
 *
 * This service provides implementation guidance for security controls, helping
 * technical teams understand what is required to achieve different security levels.
 * It transforms security requirements into actionable technical specifications
 * and implementation plans that development teams can execute. 🔧
 */
export class TechnicalImplementationService extends BaseService {
  constructor(dataProvider: CIADataProvider) {
    super(dataProvider);
  }

  /**
   * Gets default effort level for a specific area based on security level
   *
   * @param level - Security level
   * @param area - Area of effort (development, maintenance, expertise)
   * @returns Default effort description
   */
  private getDefaultEffortLevel(level: SecurityLevel, area: string): string {
    switch (area) {
      case "development":
        return getDefaultDevelopmentEffort(level);
      case "maintenance":
        return getDefaultMaintenanceEffort(level);
      case "expertise":
        return getDefaultExpertiseLevel(level);
      default:
        return "Not specified";
    }
  }

  /**
   * Generate an effort summary for implementation
   */
  generateEffortSummary(
    technicalImpl: Partial<TechnicalImplementationDetails>,
    level: SecurityLevel
  ): TechnicalImplementationEffort {
    if (!technicalImpl || !technicalImpl.effort) {
      // Return a default effort object based on the security level
      return {
        development: this.getDefaultEffortLevel(level, "development"),
        maintenance: this.getDefaultEffortLevel(level, "maintenance"),
        expertise: this.getDefaultEffortLevel(level, "expertise"),
      };
    }

    return {
      development:
        technicalImpl.effort?.development ||
        this.getDefaultEffortLevel(level, "development"),
      maintenance:
        technicalImpl.effort?.maintenance ||
        this.getDefaultEffortLevel(level, "maintenance"),
      expertise:
        technicalImpl.effort?.expertise ||
        this.getDefaultEffortLevel(level, "expertise"),
    };
  }

  /**
   * Get default implementation details when none are available
   */
  private getDefaultImplementationDetails(
    component?: CIAComponentType,
    level?: SecurityLevel
  ): TechnicalImplementationDetails {
    const normalizedLevel = level || "None";
    const componentName = component || "component";

    return {
      description: `No technical implementation details available for ${normalizedLevel} ${componentName}`,
      implementationSteps: ["Consider implementing basic security controls"],
      effort: {
        development: getDefaultDevelopmentEffort(normalizedLevel),
        maintenance: getDefaultMaintenanceEffort(normalizedLevel),
        expertise: getDefaultExpertiseLevel(normalizedLevel),
      },
      requirements: [],
      technologies: [],
    };
  }

  /**
   * Get detailed technical implementation information
   */
  public getTechnicalImplementation(
    component: CIAComponentType,
    level: string
  ): TechnicalImplementationDetails {
    // Normalize security level input by trimming whitespace and capitalizing appropriately
    const normalizedLevel = this.normalizeSecurityLevel(level);

    // Get the component options for this security component
    const componentOptions = this.getComponentOptions(component);
    if (!componentOptions) {
      return this.getDefaultImplementationDetails();
    }

    // Get the technical implementation details for this security level
    const details = componentOptions[normalizedLevel]?.technicalImplementation;
    if (!details) {
      return this.getDefaultImplementationDetails(component, normalizedLevel);
    }

    // Ensure all required fields are present
    return {
      description:
        details.description ||
        `No technical implementation details available for ${normalizedLevel} ${component}`,
      implementationSteps: details.implementationSteps || [],
      effort: {
        development:
          details.effort?.development ||
          getDefaultDevelopmentEffort(normalizedLevel),
        maintenance:
          details.effort?.maintenance ||
          getDefaultMaintenanceEffort(normalizedLevel),
        expertise:
          details.effort?.expertise ||
          getDefaultExpertiseLevel(normalizedLevel),
      },
      requirements: details.requirements || [],
      technologies: details.technologies || [],
      rto: details.rto,
      rpo: details.rpo,
      mttr: details.mttr,
    };
  }

  /**
   * Normalize a security level string by trimming whitespace and capitalizing appropriately
   */
  private normalizeSecurityLevel(level: string): SecurityLevel {
    if (!level) return "None";

    // Trim whitespace and convert to lowercase
    const trimmedLevel = level.trim().toLowerCase();

    // Handle "Very High" as special case
    if (trimmedLevel === "very high") return "Very High";

    // Capitalize first letter
    return (trimmedLevel.charAt(0).toUpperCase() +
      trimmedLevel.slice(1)) as SecurityLevel;
  }

  /**
   * Get recommendations for a component and security level
   * Always returns a string array, even when no recommendations are found
   */
  public getRecommendations(
    component: CIAComponentType,
    level: SecurityLevel
  ): string[] {
    // Return empty array for None security level
    if (level === "None") {
      return [];
    }

    // Get component details from data provider
    const details = this.getComponentDetails(component, level);

    // Return recommendations if available, otherwise empty array
    return details?.recommendations || [];
  }

  /**
   * Get implementation considerations based on security levels
   *
   * @param levels Array of three security levels [availability, integrity, confidentiality]
   * @returns Implementation considerations text
   */
  public getImplementationConsiderations(
    levels: [SecurityLevel, SecurityLevel, SecurityLevel]
  ): string {
    if (!levels || !Array.isArray(levels) || levels.length !== 3) {
      return "Invalid security levels provided. Please provide all three CIA components.";
    }

    const [availabilityLevel, integrityLevel, confidentialityLevel] = levels;

    // Check if all levels are the same
    if (
      availabilityLevel === integrityLevel &&
      integrityLevel === confidentialityLevel
    ) {
      const uniformLevel = availabilityLevel;
      const levelValue = this.getSecurityLevelValue(uniformLevel);

      if (levelValue >= 3) {
        // High or Very High levels - include expected terms
        return `Implementation for a uniform ${uniformLevel} security level requires significant effort and expertise. 
          This level of security involves extensive controls across all CIA components with 
          substantial investment in infrastructure, monitoring, and staff expertise.`;
      } else if (levelValue === 0) {
        return `No implementation required for None security level. This provides no security controls.`;
      } else {
        return `Implementation for a uniform ${uniformLevel} security level requires consistent effort across all 
          CIA components. Ensure controls are applied systematically.`;
      }
    } else {
      // Mixed levels - include expected terms
      return `Implementation for different or mixed security levels requires varying approaches:
        - Availability (${availabilityLevel}): ${this.getImplementationTime(
        availabilityLevel
      )}
        - Integrity (${integrityLevel}): ${this.getImplementationTime(
        integrityLevel
      )}
        - Confidentiality (${confidentialityLevel}): ${this.getImplementationTime(
        confidentialityLevel
      )}
        
        These mixed levels need a tailored approach with differing resource allocations.`;
    }
  }

  /**
   * Get technical implementation details for each component and level
   */
  public getComponentImplementationDetails(
    component: CIAComponentType,
    level: SecurityLevel
  ): ComponentTechnicalDetails {
    // Get component details from appropriate options
    const details = this.getComponentDetails(component, level);

    // Get technical implementation if available
    const technicalImpl = details?.technicalImplementation;

    return {
      description:
        technicalImpl?.description ||
        `Standard ${component} controls for ${level} security level`,
      implementationSteps: technicalImpl?.implementationSteps || [],
      effort: this.generateEffortSummary(technicalImpl || {}, level),
    };
  }

  /**
   * Get technical description for a component and security level
   */
  public getTechnicalDescription(
    component: CIAComponentType,
    level: SecurityLevel
  ): string {
    const details = this.getComponentDetails(component, level);
    return (
      details?.technical || `Standard ${level} ${component} implementation`
    );
  }

  /**
   * Get implementation time estimate based on security level
   */
  public getImplementationTime(level: SecurityLevel): string {
    switch (level) {
      case "None":
        return "No implementation required";
      case "Low":
        return "1-2 weeks";
      case "Moderate":
        return "1-2 months";
      case "High":
        return "2-4 months";
      case "Very High":
        return "4-6+ months";
      default:
        return "Unknown";
    }
  }

  /**
   * Get technical icon based on component and level
   */
  private getTechnicalIcon(
    component: CIAComponentType,
    level: SecurityLevel
  ): string {
    // Get appropriate icon based on component and level
    if (level === "None") return "⚠️";

    switch (component) {
      case "availability":
        return "⏱️";
      case "integrity":
        return "✓";
      case "confidentiality":
        return "🔒";
      default:
        return "🔧";
    }
  }

  /**
   * Get formatted technical description with icons for enhanced display
   * @param component CIA component name
   * @param level Security level
   * @returns Formatted description with icons
   */
  public getFormattedTechnicalDescription(
    component: CIAComponentType,
    level: SecurityLevel
  ): { text: string; icon: string } {
    const text = this.getTechnicalDescription(component, level);
    const icon = this.getTechnicalIcon(component, level);

    return { text, icon };
  }

  /**
   * Get implementation difficulty rating
   * @param level Security level
   * @returns Implementation difficulty rating (Easy, Moderate, Complex, Very Complex)
   */
  public getImplementationDifficulty(level: SecurityLevel): string {
    switch (level) {
      case "None":
        return "None";
      case "Low":
        return "Easy";
      case "Moderate":
        return "Moderate";
      case "High":
        return "Complex";
      case "Very High":
        return "Very Complex";
      default:
        return "Unknown";
    }
  }

  /**
   * Get the component options for this security component
   */
  private getComponentOptions(
    component: CIAComponentType
  ): Record<string, CIADetails> {
    return this.getCIAOptions(component);
  }
}

/**
 * Create a TechnicalImplementationService instance with the provided data provider
 *
 * @param dataProvider - Data provider for CIA options
 * @returns TechnicalImplementationService instance
 */
export function createTechnicalImplementationService(
  dataProvider: CIADataProvider
): TechnicalImplementationService {
  return new TechnicalImplementationService(dataProvider);
}
