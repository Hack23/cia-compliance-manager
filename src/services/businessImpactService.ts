import { SecurityLevel } from "../types/cia";
import { BusinessImpactDetail, BusinessImpactDetails, CIAComponentType, CIADataProvider, CIADetails } from "../types/cia-services";
import { normalizeSecurityLevel } from "../utils/securityLevelUtils";

/**
 * Category icons for business impact categories
 */
const CATEGORY_ICONS: Record<string, string> = {
  financial: "💰",
  operational: "⚙️",
  reputational: "🏆",
  strategic: "🎯",
  regulatory: "📜",
  summary: "📊"
};

/**
 * Service for business impact related functionality
 *
 * ## Business Perspective
 *
 * This service quantifies the business impact of security controls across
 * different dimensions including financial, operational, reputational,
 * strategic, and regulatory perspectives. It helps organizations understand
 * the business value of their security investments. 💼
 */
export class BusinessImpactService {
  private dataProvider: CIADataProvider;

  constructor(dataProvider: CIADataProvider) {
    this.dataProvider = dataProvider;
  }

  /**
   * Get business impact details for a security level
   *
   * @param component - CIA component (confidentiality, integrity, availability)
   * @param level - Security level
   * @returns Business impact details
   */
  public getBusinessImpact(
    component: CIAComponentType,
    level: SecurityLevel = "Moderate" as SecurityLevel
  ): BusinessImpactDetails {
    const normalizedLevel = normalizeSecurityLevel(level);
    const options = this.getCIAOptions(component);
    
    // Fix the type by adding a more specific return type for getCIAOptions
    const componentDetails = options ? options[normalizedLevel] as CIADetails | undefined : undefined;

    // If we have detailed business impact details, use them
    if (componentDetails?.businessImpactDetails) {
      return componentDetails.businessImpactDetails;
    }

    // Otherwise, create a default structure
    return this.createDefaultBusinessImpact(component, normalizedLevel);
  }

  /**
   * Get impact category icon
   * 
   * @param category - Impact category
   * @returns Emoji icon representing the category
   */
  public getCategoryIcon(category: string): string {
    return CATEGORY_ICONS[category.toLowerCase()] || "❓";
  }

  /**
   * Get business impact description for a security level
   *
   * @param component - CIA component
   * @param level - Security level
   * @returns Business impact description
   */
  public getBusinessImpactDescription(
    component: CIAComponentType,
    level: SecurityLevel
  ): string {
    const options = this.getCIAOptions(component);
    // Fix the type by adding a more specific return type for getCIAOptions
    const componentDetails = options ? options[level] as CIADetails | undefined : undefined;
    // Use nullish coalescing for null/undefined handling
    return componentDetails?.businessImpact ?? this.getDefaultBusinessImpactDescription(component, level);
  }

  /**
   * Get detailed description of business impact
   * 
   * @param category - Impact category
   * @param detail - Business impact detail
   * @returns Formatted detailed description
   */
  public getDetailedDescription(
    category: string,
    detail?: BusinessImpactDetail
  ): string {
    if (!detail) {
      return `No ${category} impact details available`;
    }
    
    const icon = this.getCategoryIcon(category);
    return this.formatImpactDetail(detail, category, icon);
  }

  /**
   * Format impact detail
   * 
   * @param detail - Business impact detail
   * @param category - Impact category
   * @param icon - Category icon
   * @returns Formatted impact detail
   */
  private formatImpactDetail(
    detail: BusinessImpactDetail,
    category: string,
    icon: string
  ): string {
    let description = `${icon} **${this.capitalizeFirstLetter(category)} Impact**: ${detail.description}`;
    
    if (detail.riskLevel) {
      description += `\n- Risk Level: ${detail.riskLevel}`;
    }
    
    if (category === 'financial' && detail.annualRevenueLoss) {
      description += `\n- Potential Revenue Loss: ${detail.annualRevenueLoss}`;
    }
    
    if (category === 'operational' && detail.meanTimeToRecover) {
      description += `\n- Mean Time to Recover: ${detail.meanTimeToRecover}`;
    }
    
    return description;
  }

  /**
   * Calculate business impact level based on security levels
   *
   * @param availabilityLevel - Availability security level
   * @param integrityLevel - Integrity security level
   * @param confidentialityLevel - Confidentiality security level
   * @returns Business impact level description
   */
  public calculateBusinessImpactLevel(
    availabilityLevel: SecurityLevel,
    integrityLevel: SecurityLevel = availabilityLevel,
    confidentialityLevel: SecurityLevel = availabilityLevel
  ): string {
    // Get the minimum security level across all three components
    // as it represents the weakest link in the security chain
    const levelValues = {
      None: 0,
      Low: 1,
      Moderate: 2,
      High: 3,
      "Very High": 4,
    };
    
    // Find the minimum level value
    const minLevelValue = Math.min(
      levelValues[availabilityLevel], 
      levelValues[integrityLevel], 
      levelValues[confidentialityLevel]
    );
    
    // Map back to a SecurityLevel
    const minLevel = Object.keys(levelValues).find(
      key => levelValues[key as SecurityLevel] === minLevelValue
    ) as SecurityLevel;
    
    // Calculate impact based on the minimum security level
    switch (minLevel) {
      case "None":
        return "Critical";
      case "Low":
        return "High";
      case "Moderate":
        return "Medium";
      case "High":
        return "Low";
      case "Very High":
        return "Minimal";
      default:
        return "Unknown";
    }
  }

  /**
   * Get default business impact description based on component and level
   *
   * @param component - CIA component
   * @param level - Security level
   * @returns Default business impact description
   */
  private getDefaultBusinessImpactDescription(component: CIAComponentType, level: SecurityLevel): string {
    const impact = this.calculateBusinessImpactLevel(level);
    return `${impact} business impact due to ${level.toLowerCase()} ${component} security level`;
  }

  /**
   * Create default business impact details
   *
   * @param component - CIA component
   * @param level - Security level
   * @returns Default business impact details
   */
  private createDefaultBusinessImpact(component: CIAComponentType, level: SecurityLevel): BusinessImpactDetails {
    const impact = this.calculateBusinessImpactLevel(level);
    const riskLevel = this.getRiskLevelForSecurityLevel(level);
    
    return {
      summary: `${impact} impact for ${level} ${component}`,
      financial: {
        description: `${impact} financial impact due to ${level.toLowerCase()} ${component} controls`,
        riskLevel: `${impact} Risk`,
        annualRevenueLoss: this.getDefaultRevenueLoss(level)
      },
      operational: {
        description: `${impact} operational impact due to ${level.toLowerCase()} ${component} controls`,
        riskLevel: `${impact} Risk`,
        meanTimeToRecover: this.getDefaultRecoveryTime(level)
      },
      reputational: {
        description: `${impact} reputational impact due to ${level.toLowerCase()} ${component} controls`,
        riskLevel: `${impact} Risk`
      }
    };
  }

  /**
   * Get risk level based on security level
   */
  private getRiskLevelForSecurityLevel(level: SecurityLevel): string {
    switch (level) {
      case "None":
        return "Critical Risk";
      case "Low":
        return "High Risk";
      case "Moderate":
        return "Medium Risk";
      case "High":
        return "Low Risk";
      case "Very High":
        return "Minimal Risk";
      default:
        return "Unknown Risk";
    }
  }

  /**
   * Get default annual revenue loss percentage based on security level
   */
  private getDefaultRevenueLoss(level: SecurityLevel): string {
    switch (level) {
      case "None":
        return ">20% of annual revenue";
      case "Low":
        return "10-20% of annual revenue";
      case "Moderate":
        return "5-10% of annual revenue";
      case "High":
        return "1-5% of annual revenue";
      case "Very High":
        return "<1% of annual revenue";
      default:
        return "Unknown revenue impact";
    }
  }

  /**
   * Get default recovery time based on security level
   */
  private getDefaultRecoveryTime(level: SecurityLevel): string {
    switch (level) {
      case "None":
        return "Unpredictable";
      case "Low":
        return "24-48 hours";
      case "Moderate":
        return "4-8 hours";
      case "High":
        return "1 hour";
      case "Very High":
        return "<15 minutes";
      default:
        return "Unknown recovery time";
    }
  }

  /**
   * Get options for a CIA component
   */
  private getCIAOptions(
    component: CIAComponentType
  ): Record<string, CIADetails> {
    switch (component) {
      case "confidentiality":
        return this.dataProvider.confidentialityOptions;
      case "integrity":
        return this.dataProvider.integrityOptions;
      case "availability":
        return this.dataProvider.availabilityOptions;
      default:
        return {};
    }
  }

  /**
   * Capitalize first letter of a string
   */
  private capitalizeFirstLetter(string: string): string {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
}

/**
 * Create a BusinessImpactService with the provided data provider
 *
 * @param dataProvider - Data provider with CIA options
 * @returns BusinessImpactService instance
 */
export function createBusinessImpactService(
  dataProvider: CIADataProvider
): BusinessImpactService {
  return new BusinessImpactService(dataProvider);
}

const impactMapping: Record<SecurityLevel, any> = {
  None: { /* values */ },
  Low: { /* values */ },
  Moderate: { /* values */ },
  High: { /* values */ },
  "Very High": { /* values */ },
};

function getImpactForLevel(level: SecurityLevel): any {
  return impactMapping[level];
}
