import { SecurityLevel } from "../types/cia";
import {
  CIAComponentType,
  CIADataProvider,
  ROIMetrics,
} from "../types/cia-services";
import logger from "../utils/logger";
import { BaseService } from "./BaseService";

/**
 * Represents security metrics for a component
 */
export interface ComponentMetrics {
  level: SecurityLevel;
  score: number;
  description: string;
  recommendations: string[];
  // Additional properties
  component?: CIAComponentType;
  value?: number;
  percentage?: string;
  capex?: number;
  opex?: number;
}

/**
 * Represents impact metrics for analysis
 */
export interface ImpactMetrics {
  financialImpact: string;
  operationalImpact: string;
  reputationalImpact: string;
  complianceImpact: string;
  // Additional properties
  securityLevel?: SecurityLevel;
  riskReduction?: string;
  description?: string;
  technical?: string;
  businessImpact?: string;
}

/**
 * Represents comprehensive security metrics
 */
export interface SecurityMetrics {
  overallScore: number;
  score: number; // Backwards compatibility alias for overallScore
  availability: ComponentMetrics;
  integrity: ComponentMetrics;
  confidentiality: ComponentMetrics;
  impactMetrics: ImpactMetrics;
  // Additional properties returned by getSecurityMetrics
  maxScore?: number;
  percentage?: string;
  totalCapex?: number;
  totalOpex?: number;
  totalCost?: number;
  riskReduction?: string;
}

/**
 * Interface for ROI estimates map
 */
export interface ROIEstimatesMap {
  NONE: {
    returnRate: string;
    value?: string;
    description: string;
    potentialSavings?: string;
    breakEvenPeriod?: string;
  };
  LOW: {
    returnRate: string;
    value?: string;
    description: string;
    potentialSavings?: string;
    breakEvenPeriod?: string;
  };
  MODERATE: {
    returnRate: string;
    value?: string;
    description: string;
    potentialSavings?: string;
    breakEvenPeriod?: string;
  };
  HIGH: {
    returnRate: string;
    value?: string;
    description: string;
    potentialSavings?: string;
    breakEvenPeriod?: string;
  };
  VERY_HIGH: {
    returnRate: string;
    value?: string;
    description: string;
    potentialSavings?: string;
    breakEvenPeriod?: string;
  };
}

/**
 * Service for security metrics and measurements
 *
 * ## Analytics Perspective
 *
 * This service provides quantitative metrics for security levels, enabling
 * organizations to measure their security posture, track improvements over time,
 * and quantify the impact of security investments through cost-benefit analysis
 * and risk reduction calculations. 📊
 */
export class SecurityMetricsService extends BaseService {
  constructor(dataProvider: CIADataProvider) {
    super(dataProvider);
  }

  /**
   * Calculate ROI metrics based on security level and implementation cost
   *
   * @param securityLevel - Selected security level
   * @param implementationCost - Cost of implementation in currency units
   * @returns ROI metrics with value, percentage and description
   */
  public calculateRoi(
    securityLevel: SecurityLevel,
    implementationCost: number
  ): ROIMetrics {
    if (securityLevel === "None" || implementationCost <= 0) {
      return {
        value: "$0",
        percentage: "0%",
        description: "No security investment means no return",
      };
    }

    const levelKey = securityLevel.toUpperCase().replace(" ", "_");
    const roiEstimates = this.getROIEstimates();
    const roiPercentage =
      roiEstimates[levelKey as keyof ROIEstimatesMap]?.returnRate || "0%";

    // Parse the percentage to calculate actual value
    let numericValue = parseInt(roiPercentage.replace(/[^0-9]/g, ""), 10);
    if (isNaN(numericValue)) {
      numericValue = 0;
    }

    const roiValue = (implementationCost * numericValue) / 100;

    return {
      value: `$${roiValue.toLocaleString()}`,
      percentage: roiPercentage,
      description: `Return on investment for ${securityLevel} security level implementation`,
    };
  }

  /**
   * Get ROI estimates from the data provider
   *
   * @returns Map of ROI estimates for different security levels
   */
  public getROIEstimates(): ROIEstimatesMap {
    return this.dataProvider.roiEstimates;
  }

  /**
   * Get comprehensive security metrics for security levels
   *
   * @param availabilityLevel - Availability security level
   * @param integrityLevel - Integrity security level (optional, defaults to availabilityLevel)
   * @param confidentialityLevel - Confidentiality security level (optional, defaults to availabilityLevel)
   * @returns Security metrics including score, costs, and risk reduction
   */
  public getSecurityMetrics(
    availabilityLevel: SecurityLevel,
    integrityLevel: SecurityLevel = availabilityLevel,
    confidentialityLevel: SecurityLevel = availabilityLevel
  ): SecurityMetrics {
    // Get component details
    const availabilityDetails = this.getComponentDetails(
      "availability",
      availabilityLevel
    );
    const integrityDetails = this.getComponentDetails(
      "integrity",
      integrityLevel
    );
    const confidentialityDetails = this.getComponentDetails(
      "confidentiality",
      confidentialityLevel
    );

    // Calculate security score (0-100)
    const score = this.calculateSecurityScore(
      availabilityLevel,
      integrityLevel,
      confidentialityLevel
    );

    // Calculate costs
    const availabilityCapex = availabilityDetails?.capex || 0;
    const integrityCapex = integrityDetails?.capex || 0;
    const confidentialityCapex = confidentialityDetails?.capex || 0;

    const availabilityOpex = availabilityDetails?.opex || 0;
    const integrityOpex = integrityDetails?.opex || 0;
    const confidentialityOpex = confidentialityDetails?.opex || 0;

    const totalCapex =
      availabilityCapex + integrityCapex + confidentialityCapex;
    const totalOpex = availabilityOpex + integrityOpex + confidentialityOpex;
    const totalCost = totalCapex + totalOpex;

    // Calculate risk reduction percentage
    const riskReduction = this.calculateRiskReduction(
      availabilityLevel,
      integrityLevel,
      confidentialityLevel
    );

    return {
      overallScore: score,
      score, // Alias for backward compatibility
      maxScore: 100,
      percentage: `${score}%`,
      totalCapex,
      totalOpex,
      totalCost,
      riskReduction: `${riskReduction}%`,
      // Add dummy values for required properties
      availability: {
        level: availabilityLevel,
        score: this.getSecurityLevelValue(availabilityLevel) * 25,
        description: this.getSecurityLevelDescription(availabilityLevel),
        recommendations: [],
      },
      integrity: {
        level: integrityLevel,
        score: this.getSecurityLevelValue(integrityLevel) * 25,
        description: this.getSecurityLevelDescription(integrityLevel),
        recommendations: [],
      },
      confidentiality: {
        level: confidentialityLevel,
        score: this.getSecurityLevelValue(confidentialityLevel) * 25,
        description: this.getSecurityLevelDescription(confidentialityLevel),
        recommendations: [],
      },
      impactMetrics: {
        financialImpact: "Not calculated",
        operationalImpact: "Not calculated",
        reputationalImpact: "Not calculated",
        complianceImpact: "Not calculated",
      },
    };
  }

  /**
   * Get component-specific metrics
   *
   * @param component - CIA component type
   * @param level - Security level
   * @returns Component metrics
   */
  public getComponentMetrics(
    component: CIAComponentType,
    level: SecurityLevel
  ): ComponentMetrics {
    const details = this.getComponentDetails(component, level);
    const value = this.getSecurityLevelValue(level);

    return {
      component,
      level,
      value,
      percentage: `${(value / 4) * 100}%`,
      description:
        details?.description || this.getSecurityLevelDescription(level),
      capex: details?.capex || 0,
      opex: details?.opex || 0,
      // Add missing required properties
      score: value * 25, // Convert to score out of 100
      recommendations: details?.recommendations || [],
    };
  }

  /**
   * Get technical metrics for a component
   *
   * @param component The CIA component
   * @param level The security level
   * @returns Component technical metrics
   */
  public getComponentTechnicalMetrics(
    component: CIAComponentType,
    level: SecurityLevel
  ): Record<string, string> {
    // Get the base metrics
    const metrics = this.getComponentMetrics(component, level);

    // Convert all values to strings to match the return type
    const result: Record<string, string> = {};

    Object.entries(metrics).forEach(([key, value]) => {
      if (value === null || value === undefined) {
        result[key] = "";
      } else if (typeof value === "object") {
        // Handle arrays and objects by JSON stringifying them
        result[key] = JSON.stringify(value);
      } else {
        result[key] =
          typeof value === "number" ? value.toString() : (value as string);
      }
    });

    return result;
  }

  /**
   * Get impact metrics for a component and level
   *
   * @param component - CIA component type
   * @param level - Security level
   * @returns Impact metrics
   */
  public getImpactMetrics(
    component: CIAComponentType,
    level: SecurityLevel
  ): ImpactMetrics {
    const details = this.getComponentDetails(component, level);

    // Calculate risk reduction for this specific component
    const riskReduction = this.calculateSingleComponentRiskReduction(level);

    return {
      securityLevel: level,
      riskReduction: `${riskReduction}%`,
      description:
        details?.description || this.getSecurityLevelDescription(level),
      technical: details?.technical || "",
      businessImpact: details?.businessImpact || "",
      // Add missing required properties
      financialImpact: "Impact not calculated",
      operationalImpact: "Impact not calculated",
      reputationalImpact: "Impact not calculated",
      complianceImpact: "Impact not calculated",
    };
  }

  /**
   * Calculate risk reduction percentage for a combination of security levels
   *
   * @param availabilityLevel - Availability security level
   * @param integrityLevel - Integrity security level
   * @param confidentialityLevel - Confidentiality security level
   * @returns Risk reduction percentage as a string
   */
  private calculateRiskReduction(
    availabilityLevel: SecurityLevel,
    integrityLevel: SecurityLevel = availabilityLevel,
    confidentialityLevel: SecurityLevel = availabilityLevel
  ): string {
    // Get individual component risk reductions
    const availReduction =
      this.calculateSingleComponentRiskReduction(availabilityLevel);
    const intReduction =
      this.calculateSingleComponentRiskReduction(integrityLevel);
    const confReduction =
      this.calculateSingleComponentRiskReduction(confidentialityLevel);

    // Calculate weighted average (confidentiality is weighted higher)
    const weightedReduction =
      availReduction * 0.3 + intReduction * 0.3 + confReduction * 0.4;

    return `${Math.round(weightedReduction)}%`;
  }

  /**
   * Calculate risk reduction for a single security level
   *
   * @param level - Security level
   * @returns Risk reduction percentage
   */
  private calculateSingleComponentRiskReduction(level: SecurityLevel): number {
    try {
      // Map security levels to approximate risk reduction percentages
      const reductionMap: Record<SecurityLevel, number> = {
        None: 0,
        Low: 25,
        Moderate: 50,
        High: 75,
        "Very High": 90,
      };

      return reductionMap[level] || 0;
    } catch (error) {
      logger.warn(`Failed to calculate risk reduction for level: ${level}`);
      return 0;
    }
  }

  /**
   * Get security level description based on level
   *
   * @param level - Security level
   * @returns Textual description of security level
   */
  public getSecurityLevelDescription(level: SecurityLevel): string {
    switch (level) {
      case "None":
        return "No security controls implemented";
      case "Low":
        return "Basic security controls with minimal protection";
      case "Moderate":
        return "Standard security controls with adequate protection";
      case "High":
        return "Advanced security controls with strong protection";
      case "Very High":
        return "Maximum security controls with comprehensive protection";
      default:
        return "Unknown security level";
    }
  }

  /**
   * Get protection level based on security level
   *
   * @param level - Security level
   * @returns Protection level description
   */
  public getProtectionLevel(level: SecurityLevel): string {
    // Try to use the data provider's function if available
    if (typeof this.dataProvider.getProtectionLevel === "function") {
      try {
        return this.dataProvider.getProtectionLevel(level);
      } catch (error) {
        // Continue with default implementation
      }
    }

    // Default implementation
    switch (level) {
      case "None":
        return "No Protection";
      case "Low":
        return "Basic Protection";
      case "Moderate":
        return "Standard Protection";
      case "High":
        return "Advanced Protection";
      case "Very High":
        return "Maximum Protection";
      default:
        return "Unknown Protection Level";
    }
  }

  /**
   * Get appropriate UI badge variant for a risk level
   *
   * @param riskLevel - Risk level string (High, Medium, Low, etc.)
   * @returns Badge variant name
   */
  public getRiskBadgeVariant(
    riskLevel: string
  ): "error" | "warning" | "info" | "success" | "neutral" {
    const lowercaseRisk = riskLevel.toLowerCase();

    if (lowercaseRisk.includes("critical") || lowercaseRisk.includes("high")) {
      return "error";
    } else if (
      lowercaseRisk.includes("medium") ||
      lowercaseRisk.includes("moderate")
    ) {
      return "warning";
    } else if (lowercaseRisk.includes("low")) {
      return "info";
    } else if (
      lowercaseRisk.includes("minimal") ||
      lowercaseRisk.includes("none")
    ) {
      return "success";
    }

    return "neutral";
  }

  /**
   * Get security icon for a security level
   *
   * @param level - Security level
   * @returns Security icon (emoji)
   */
  public getSecurityIcon(level: SecurityLevel): string {
    return this.getDefaultSecurityIcon(level);
  }

  /**
   * Get security level from a numeric value
   *
   * @param value - Numeric security level value (0-4)
   * @returns Security level string representation
   */
  public getSecurityLevelFromValue(value: number): SecurityLevel {
    switch (value) {
      case 0:
        return "None";
      case 1:
        return "Low";
      case 2:
        return "Moderate";
      case 3:
        return "High";
      case 4:
        return "Very High";
      default:
        return "None";
    }
  }

  /**
   * Calculate security score based on security levels
   *
   * @param availabilityLevel - Availability security level
   * @param integrityLevel - Integrity security level
   * @param confidentialityLevel - Confidentiality security level
   * @returns Security score (0-100)
   */
  public calculateSecurityScore(
    availabilityLevel: SecurityLevel,
    integrityLevel: SecurityLevel = availabilityLevel,
    confidentialityLevel: SecurityLevel = availabilityLevel
  ): number {
    // Get numerical values for each level
    const availValue = this.getSecurityLevelValue(availabilityLevel);
    const integValue = this.getSecurityLevelValue(integrityLevel);
    const confValue = this.getSecurityLevelValue(confidentialityLevel);

    // Calculate average value (all components weighted equally)
    const avgValue = (availValue + integValue + confValue) / 3;

    // Convert to score (0-100)
    // Max security level value is 4 (Very High)
    return Math.round((avgValue / 4) * 100);
  }

  /**
   * Get default security icon for a security level
   *
   * @param level - Security level
   * @returns Security icon (emoji)
   */
  protected getDefaultSecurityIcon(level: SecurityLevel): string {
    // Try to use the data provider's function if available
    if (typeof this.dataProvider.getDefaultSecurityIcon === "function") {
      try {
        return this.dataProvider.getDefaultSecurityIcon(level);
      } catch (error) {
        // Continue with default implementation
      }
    }

    // Default implementation
    switch (level) {
      case "None":
        return "⚠️";
      case "Low":
        return "🔑";
      case "Moderate":
        return "🔓";
      case "High":
        return "🔒";
      case "Very High":
        return "🔐";
      default:
        return "❓";
    }
  }
}

/**
 * Create a SecurityMetricsService instance
 *
 * @param dataProvider - Optional data provider for the service
 * @returns A new SecurityMetricsService instance
 */
export function createSecurityMetricsService(
  dataProvider?: CIADataProvider
): SecurityMetricsService {
  // Create a properly typed default data provider if none is provided
  if (!dataProvider) {
    const defaultDataProvider: CIADataProvider = {
      availabilityOptions: {
        None: {
          description: "",
          technical: "",
          businessImpact: "",
          capex: 0,
          opex: 0,
          bg: "",
          text: "",
          recommendations: [],
        },
        Low: {
          description: "",
          technical: "",
          businessImpact: "",
          capex: 0,
          opex: 0,
          bg: "",
          text: "",
          recommendations: [],
        },
        Moderate: {
          description: "",
          technical: "",
          businessImpact: "",
          capex: 0,
          opex: 0,
          bg: "",
          text: "",
          recommendations: [],
        },
        High: {
          description: "",
          technical: "",
          businessImpact: "",
          capex: 0,
          opex: 0,
          bg: "",
          text: "",
          recommendations: [],
        },
        "Very High": {
          description: "",
          technical: "",
          businessImpact: "",
          capex: 0,
          opex: 0,
          bg: "",
          text: "",
          recommendations: [],
        },
      },
      integrityOptions: {
        None: {
          description: "",
          technical: "",
          businessImpact: "",
          capex: 0,
          opex: 0,
          bg: "",
          text: "",
          recommendations: [],
        },
        Low: {
          description: "",
          technical: "",
          businessImpact: "",
          capex: 0,
          opex: 0,
          bg: "",
          text: "",
          recommendations: [],
        },
        Moderate: {
          description: "",
          technical: "",
          businessImpact: "",
          capex: 0,
          opex: 0,
          bg: "",
          text: "",
          recommendations: [],
        },
        High: {
          description: "",
          technical: "",
          businessImpact: "",
          capex: 0,
          opex: 0,
          bg: "",
          text: "",
          recommendations: [],
        },
        "Very High": {
          description: "",
          technical: "",
          businessImpact: "",
          capex: 0,
          opex: 0,
          bg: "",
          text: "",
          recommendations: [],
        },
      },
      confidentialityOptions: {
        None: {
          description: "",
          technical: "",
          businessImpact: "",
          capex: 0,
          opex: 0,
          bg: "",
          text: "",
          recommendations: [],
        },
        Low: {
          description: "",
          technical: "",
          businessImpact: "",
          capex: 0,
          opex: 0,
          bg: "",
          text: "",
          recommendations: [],
        },
        Moderate: {
          description: "",
          technical: "",
          businessImpact: "",
          capex: 0,
          opex: 0,
          bg: "",
          text: "",
          recommendations: [],
        },
        High: {
          description: "",
          technical: "",
          businessImpact: "",
          capex: 0,
          opex: 0,
          bg: "",
          text: "",
          recommendations: [],
        },
        "Very High": {
          description: "",
          technical: "",
          businessImpact: "",
          capex: 0,
          opex: 0,
          bg: "",
          text: "",
          recommendations: [],
        },
      },
      roiEstimates: {
        NONE: { returnRate: "0%", description: "No ROI" },
        LOW: { returnRate: "50%", description: "Low ROI" },
        MODERATE: { returnRate: "150%", description: "Moderate ROI" },
        HIGH: { returnRate: "250%", description: "High ROI" },
        VERY_HIGH: { returnRate: "400%", description: "Very High ROI" },
      },
    };
    return new SecurityMetricsService(defaultDataProvider);
  }

  return new SecurityMetricsService(dataProvider);
}
