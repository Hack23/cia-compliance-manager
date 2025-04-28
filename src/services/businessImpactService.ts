import { SecurityLevel } from "../types/cia";
import {
  BusinessImpactDetail,
  BusinessImpactDetails,
  CIAComponentType,
  CIADataProvider,
  CIADetails,
} from "../types/cia-services";
import { normalizeSecurityLevel } from "../utils/securityLevelUtils";
import { BaseService } from "./BaseService";

/**
 * Category icons for business impact categories
 */
const CATEGORY_ICONS: Record<string, string> = {
  financial: "💰",
  operational: "⚙️",
  reputational: "🏆",
  strategic: "🎯",
  regulatory: "📜",
  summary: "📊",
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
export class BusinessImpactService extends BaseService {
  constructor(dataProvider: CIADataProvider) {
    super(dataProvider);
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
    const componentDetails = options
      ? (options[normalizedLevel] as CIADetails | undefined)
      : undefined;

    // If we have detailed business impact details, use them
    if (componentDetails?.businessImpactDetails) {
      // Special case: Validate that "None" confidentiality level has critical risk descriptors
      if (component === "confidentiality" && normalizedLevel === "None") {
        // Override any incorrect positive descriptions that might exist in the data
        return {
          ...componentDetails.businessImpactDetails,
          summary: "Critical risk due to absence of confidentiality controls",
          financial: {
            description:
              componentDetails.businessImpactDetails.financial?.description ||
              "Severe financial impact from data breaches and regulatory penalties",
            riskLevel: "Critical Risk",
          },
          operational: {
            description:
              componentDetails.businessImpactDetails.operational?.description ||
              "Significant operational disruption from data exposure and unauthorized access",
            riskLevel: "Critical Risk",
          },
          reputational: {
            description:
              componentDetails.businessImpactDetails.reputational
                ?.description ||
              "Without confidentiality controls, sensitive information can be accessed by unauthorized parties, severely damaging customer trust and brand reputation.",
            riskLevel: "Critical Risk",
          },
          regulatory: {
            description:
              componentDetails.businessImpactDetails.regulatory?.description ||
              "Non-compliance with data protection regulations is highly likely, potentially resulting in fines and legal action.",
            riskLevel: "Critical Risk",
            complianceViolations: ["GDPR", "CCPA", "HIPAA", "PCI-DSS"],
          },
        };
      }
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
    const componentDetails = options
      ? (options[level] as CIADetails | undefined)
      : undefined;
    // Use nullish coalescing for null/undefined handling
    return (
      componentDetails?.businessImpact ??
      this.getDefaultBusinessImpactDescription(component, level)
    );
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
    let description = `${icon} **${this.capitalizeFirstLetter(
      category
    )} Impact**: ${detail.description}`;

    if (detail.riskLevel) {
      description += `\n- Risk Level: ${detail.riskLevel}`;
    }

    if (category === "financial" && detail.annualRevenueLoss) {
      description += `\n- Potential Revenue Loss: ${detail.annualRevenueLoss}`;
    }

    if (category === "operational" && detail.meanTimeToRecover) {
      description += `\n- Mean Time to Recover: ${detail.meanTimeToRecover}`;
    }

    if (
      category === "regulatory" &&
      detail.complianceViolations &&
      detail.complianceViolations.length > 0
    ) {
      description += `\n- Compliance Violations: ${detail.complianceViolations.join(
        ", "
      )}`;
    }

    if (category === "strategic" && detail.competitiveAdvantage) {
      description += `\n- Competitive Advantage: ${detail.competitiveAdvantage}`;
    }

    if (detail.complianceImpact) {
      description += `\n- Compliance Impact: ${detail.complianceImpact}`;
    }

    if (detail.reputationalImpact) {
      description += `\n- Reputational Impact: ${detail.reputationalImpact}`;
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
      (key) => levelValues[key as SecurityLevel] === minLevelValue
    ) as SecurityLevel;

    // Calculate impact based on the minimum security level
    switch (minLevel) {
      case "None":
        return "Critical"; // This is correct - None security = Critical impact
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
  private getDefaultBusinessImpactDescription(
    component: CIAComponentType,
    level: SecurityLevel
  ): string {
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
  private createDefaultBusinessImpact(
    component: CIAComponentType,
    level: SecurityLevel
  ): BusinessImpactDetails {
    const riskLevel = this.getRiskLevelWithSuffix(level);

    // Special handling for "None" confidentiality level
    if (component === "confidentiality" && level === "None") {
      return {
        // Correct mapping: None → Critical Risk
        summary: "Critical risk due to absence of confidentiality controls",
        financial: {
          description:
            "Severe financial impact from data breaches and regulatory penalties",
          riskLevel: "Critical Risk",
        },
        operational: {
          description: "Significant operational disruption from data exposure",
          riskLevel: "Critical Risk",
        },
        reputational: {
          description: "Major reputational damage from failure to protect data",
          riskLevel: "Critical Risk",
        },
      };
    }
    // This is correct
    return {
      summary: `${component} impact analysis for ${level} level`,
      financial: {
        description: `Financial impact for ${level} ${component} security level`,
        riskLevel,
      },
      operational: {
        description: `Operational impact for ${level} ${component} security level`,
        riskLevel,
      },
      reputational: {
        description: `Reputational impact for ${level} ${component} security level`,
        riskLevel,
      },
    };
  }

  /**
   * Get risk level from security level
   *
   * @param level - Security level
   * @returns Risk level
   */
  public getRiskLevelFromSecurityLevel(level: SecurityLevel): string {
    const riskLevels: Record<SecurityLevel, string> = {
      None: "Critical",
      Low: "High",
      Moderate: "Medium",
      High: "Low",
      "Very High": "Minimal",
    };

    return riskLevels[level] || "Unknown";
  }

  /**
   * Get risk level with "Risk" suffix
   *
   * @param level - Security level
   * @returns Risk level string with "Risk" suffix
   */
  private getRiskLevelWithSuffix(level: SecurityLevel): string {
    return this.getRiskLevelFromSecurityLevel(level) + " Risk";
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
  protected getCIAOptions(
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
  protected capitalizeFirstLetter(string: string): string {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  // Convert unused constants and functions to proper implementation
  // We're properly marking mapping as a utility type with clearer usage intent
  private readonly impactMapping: Record<
    SecurityLevel,
    {
      financialImpact: string;
      operationalImpact: string;
      reputationalImpact: string;
    }
  > = {
    None: {
      financialImpact: "Negligible",
      operationalImpact: "Minimal",
      reputationalImpact: "Insignificant",
    },
    Low: {
      financialImpact: "Minor",
      operationalImpact: "Limited",
      reputationalImpact: "Localized",
    },
    Moderate: {
      financialImpact: "Significant",
      operationalImpact: "Substantial",
      reputationalImpact: "Moderate",
    },
    High: {
      financialImpact: "Major",
      operationalImpact: "Severe",
      reputationalImpact: "Extensive",
    },
    "Very High": {
      financialImpact: "Critical",
      operationalImpact: "Catastrophic",
      reputationalImpact: "Global",
    },
  };

  /**
   * Gets impact details for a security level from the mapping
   * @param level - Security level to look up
   * @returns Impact details for the specified level
   */
  private getImpactForLevel(level: SecurityLevel): {
    financialImpact: string;
    operationalImpact: string;
    reputationalImpact: string;
  } {
    return this.impactMapping[level] || this.impactMapping.Moderate;
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

/**
 * Get business impact details based on security levels
 *
 * @param availabilityLevel - Availability security level
 * @param integrityLevel - Integrity security level
 * @param confidentialityLevel - Confidentiality security level
 * @returns Business impact details
 */
export const getBusinessImpact = async (
  availabilityLevel: SecurityLevel,
  integrityLevel: SecurityLevel,
  confidentialityLevel: SecurityLevel
): Promise<BusinessImpactDetail> => {
  // This would normally fetch from an API, but for now we'll return mock data

  // Calculate overall risk level based on security levels
  const overallSecurityLevel = calculateOverallSecurityLevel(
    availabilityLevel,
    integrityLevel,
    confidentialityLevel
  );

  // Map security level to risk level (inverse relationship)
  const riskLevel = securityLevelToRiskLevel(overallSecurityLevel);

  return {
    description: `Business impact assessment based on A:${availabilityLevel}, I:${integrityLevel}, C:${confidentialityLevel}`,
    riskLevel: riskLevel,
    annualRevenueLoss: calculateRevenueLoss(riskLevel),
    complianceViolations: ["GDPR", "HIPAA", "PCI DSS"],
    meanTimeToRecover: calculateOperationalDowntime(riskLevel),
    complianceImpact: `Potential compliance violations with ${calculateRegulatoryImpact(
      riskLevel
    )}`,
    reputationalImpact: `Reputation damage could affect ${calculateReputationImpact(
      riskLevel
    )} of customers`,
    // Remove summary property as it's not in the interface
  };
};

// Helper functions
function calculateOverallSecurityLevel(
  availabilityLevel: SecurityLevel,
  integrityLevel: SecurityLevel,
  confidentialityLevel: SecurityLevel
): SecurityLevel {
  const levels = [availabilityLevel, integrityLevel, confidentialityLevel];

  if (levels.includes("None")) return "None";
  if (levels.includes("Low")) return "Low";
  if (levels.includes("Moderate")) return "Moderate";
  if (levels.includes("High")) return "High";
  return "Very High";
}

function securityLevelToRiskLevel(securityLevel: SecurityLevel): string {
  switch (securityLevel) {
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

function calculateRevenueLoss(riskLevel: string): string {
  switch (riskLevel) {
    case "Critical":
      return "$500,000+";
    case "High":
      return "$100,000-$500,000";
    case "Medium":
      return "$50,000-$100,000";
    case "Low":
      return "$10,000-$50,000";
    case "Minimal":
      return "Under $10,000";
    default:
      return "Unknown";
  }
}

function calculateOperationalDowntime(riskLevel: string): string {
  switch (riskLevel) {
    case "Critical":
      return "7+ days";
    case "High":
      return "3-7 days";
    case "Medium":
      return "1-3 days";
    case "Low":
      return "4-24 hours";
    case "Minimal":
      return "Under 4 hours";
    default:
      return "Unknown";
  }
}

function calculateReputationImpact(riskLevel: string): string {
  switch (riskLevel) {
    case "Critical":
      return "50%+";
    case "High":
      return "25-50%";
    case "Medium":
      return "10-25%";
    case "Low":
      return "5-10%";
    case "Minimal":
      return "Under 5%";
    default:
      return "Unknown";
  }
}

function calculateRegulatoryImpact(riskLevel: string): string {
  switch (riskLevel) {
    case "Critical":
      return "major regulatory frameworks with severe penalties";
    case "High":
      return "multiple regulatory frameworks";
    case "Medium":
      return "at least one major regulatory framework";
    case "Low":
      return "minor regulatory requirements";
    case "Minimal":
      return "few or no regulatory requirements";
    default:
      return "Unknown";
  }
}
