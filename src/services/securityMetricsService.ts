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
  // Component metrics objects
  availability: ComponentMetrics;
  integrity: ComponentMetrics;
  confidentiality: ComponentMetrics;

  // Legacy numeric properties
  availabilityScore?: number;
  integrityScore?: number;
  confidentialityScore?: number;

  // Impact metrics
  impactMetrics: ImpactMetrics;

  // Score metrics
  overallScore: number;
  score?: number; // Alias for overallScore
  maxScore?: number;
  percentage?: string;

  // Cost metrics
  totalCapex?: number;
  totalOpex?: number;
  totalCost?: number;

  // Risk and value metrics
  riskReduction?: string;

  // Compliance metrics
  monitoring: number;
  resilience: number;
  compliance: number;
  benchmarkScore: number;
  securityMaturity: string;
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
      monitoring: 0,
      resilience: 0,
      compliance: 0,
      benchmarkScore: 0,
      securityMaturity: "",
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

/**
 * Get cost estimation based on security levels
 *
 * @param availabilityLevel - Availability security level
 * @param integrityLevel - Integrity security level
 * @param confidentialityLevel - Confidentiality security level
 * @returns Cost estimation details
 */
export const getCostEstimation = async (
  availabilityLevel: SecurityLevel,
  integrityLevel: SecurityLevel,
  confidentialityLevel: SecurityLevel
): Promise<any> => {
  // This would normally fetch from an API, but for now we'll return mock data
  return {
    totalImplementationCost: calculateTotalCost(
      availabilityLevel,
      integrityLevel,
      confidentialityLevel
    ),
    annualMaintenanceCost: calculateMaintenanceCost(
      availabilityLevel,
      integrityLevel,
      confidentialityLevel
    ),
    costBreakdown: {
      availability: {
        level: availabilityLevel,
        implementationCost: calculateComponentCost(
          availabilityLevel,
          "availability"
        ),
        maintenanceCost: calculateComponentMaintenanceCost(
          availabilityLevel,
          "availability"
        ),
        itemizedCosts: [
          {
            item: "Redundant systems",
            cost: calculateItemCost(availabilityLevel, "redundancy"),
          },
          {
            item: "Backup infrastructure",
            cost: calculateItemCost(availabilityLevel, "backup"),
          },
          {
            item: "Disaster recovery",
            cost: calculateItemCost(availabilityLevel, "disaster_recovery"),
          },
        ],
      },
      integrity: {
        level: integrityLevel,
        implementationCost: calculateComponentCost(integrityLevel, "integrity"),
        maintenanceCost: calculateComponentMaintenanceCost(
          integrityLevel,
          "integrity"
        ),
        itemizedCosts: [
          {
            item: "Data validation systems",
            cost: calculateItemCost(integrityLevel, "validation"),
          },
          {
            item: "Audit logging",
            cost: calculateItemCost(integrityLevel, "audit"),
          },
          {
            item: "Change management",
            cost: calculateItemCost(integrityLevel, "change_management"),
          },
        ],
      },
      confidentiality: {
        level: confidentialityLevel,
        implementationCost: calculateComponentCost(
          confidentialityLevel,
          "confidentiality"
        ),
        maintenanceCost: calculateComponentMaintenanceCost(
          confidentialityLevel,
          "confidentiality"
        ),
        itemizedCosts: [
          {
            item: "Encryption",
            cost: calculateItemCost(confidentialityLevel, "encryption"),
          },
          {
            item: "Access control",
            cost: calculateItemCost(confidentialityLevel, "access_control"),
          },
          {
            item: "Security monitoring",
            cost: calculateItemCost(confidentialityLevel, "monitoring"),
          },
        ],
      },
    },
    roi: {
      paybackPeriod: calculatePaybackPeriod(
        availabilityLevel,
        integrityLevel,
        confidentialityLevel
      ),
      riskReduction: calculateRiskReduction(
        availabilityLevel,
        integrityLevel,
        confidentialityLevel
      ),
      businessBenefits: [
        "Reduced downtime costs",
        "Improved customer trust",
        "Reduced risk of data breaches",
        "Compliance with regulations",
      ],
    },
  };
};

/**
 * Get value creation metrics based on security levels
 *
 * @param availabilityLevel - Availability security level
 * @param integrityLevel - Integrity security level
 * @param confidentialityLevel - Confidentiality security level
 * @returns Value creation metrics
 */
export const getValueCreationMetrics = async (
  availabilityLevel: SecurityLevel,
  integrityLevel: SecurityLevel,
  confidentialityLevel: SecurityLevel
): Promise<any> => {
  // This would normally fetch from an API, but for now we'll return mock data
  return {
    roi: calculateROI(availabilityLevel, integrityLevel, confidentialityLevel),
    riskReduction: calculateRiskReduction(
      availabilityLevel,
      integrityLevel,
      confidentialityLevel
    ),
    valuePoints: [
      {
        title: "Customer Trust",
        score: calculateTrustScore(confidentialityLevel),
        description: "Impact on customer trust and loyalty",
      },
      {
        title: "Operational Efficiency",
        score: calculateEfficiencyScore(availabilityLevel, integrityLevel),
        description: "Impact on operational efficiency and productivity",
      },
      {
        title: "Competitive Advantage",
        score: calculateCompetitiveScore(
          availabilityLevel,
          integrityLevel,
          confidentialityLevel
        ),
        description: "Position relative to industry peers",
      },
      {
        title: "Innovation Enablement",
        score: calculateInnovationScore(availabilityLevel),
        description: "Ability to innovate and adapt quickly",
      },
    ],
    businessImpacts: {
      revenueProtection: calculateRevenueProtection(
        availabilityLevel,
        confidentialityLevel
      ),
      costAvoidance: calculateCostAvoidance(
        availabilityLevel,
        integrityLevel,
        confidentialityLevel
      ),
      productivityImprovement: calculateProductivityImprovement(
        availabilityLevel,
        integrityLevel
      ),
    },
  };
};

/**
 * Get security metrics based on security levels
 *
 * @param availabilityLevel - Availability security level
 * @param integrityLevel - Integrity security level
 * @param confidentialityLevel - Confidentiality security level
 * @returns Security metrics
 */
export const getSecurityMetrics = async (
  availabilityLevel: SecurityLevel,
  integrityLevel: SecurityLevel,
  confidentialityLevel: SecurityLevel
): Promise<SecurityMetrics> => {
  // This would normally fetch from an API, but for now we'll return mock data
  const availScore = securityLevelToPercentage(availabilityLevel);
  const integScore = securityLevelToPercentage(integrityLevel);
  const confScore = securityLevelToPercentage(confidentialityLevel);

  return {
    // Create ComponentMetrics objects instead of just numbers
    confidentiality: {
      level: confidentialityLevel,
      score: confScore,
      description: `Confidentiality level: ${confidentialityLevel}`,
      recommendations: [],
    },
    integrity: {
      level: integrityLevel,
      score: integScore,
      description: `Integrity level: ${integrityLevel}`,
      recommendations: [],
    },
    availability: {
      level: availabilityLevel,
      score: availScore,
      description: `Availability level: ${availabilityLevel}`,
      recommendations: [],
    },
    monitoring: calculateMonitoringScore(
      availabilityLevel,
      integrityLevel,
      confidentialityLevel
    ),
    resilience: calculateResilienceScore(availabilityLevel),
    compliance: calculateComplianceScore(
      availabilityLevel,
      integrityLevel,
      confidentialityLevel
    ),
    overallScore: calculateOverallScore(
      availabilityLevel,
      integrityLevel,
      confidentialityLevel
    ),
    benchmarkScore: 75, // Industry benchmark (fixed for now)
    securityMaturity: calculateSecurityMaturity(
      availabilityLevel,
      integrityLevel,
      confidentialityLevel
    ),
    impactMetrics: {
      financialImpact: "Impact not calculated",
      operationalImpact: "Impact not calculated",
      reputationalImpact: "Impact not calculated",
      complianceImpact: "Impact not calculated",
    },
  };
};

/**
 * Get technical details based on security levels
 *
 * @param availabilityLevel - Availability security level
 * @param integrityLevel - Integrity security level
 * @param confidentialityLevel - Confidentiality security level
 * @returns Technical details
 */
export const getTechnicalDetails = async (
  availabilityLevel: SecurityLevel,
  integrityLevel: SecurityLevel,
  confidentialityLevel: SecurityLevel
): Promise<any> => {
  // This would normally fetch from an API, but for now we'll return mock data
  return {
    architecture: {
      description: `Technical architecture for A:${availabilityLevel}, I:${integrityLevel}, C:${confidentialityLevel}`,
      components: [
        {
          name: "Load Balancer",
          purpose: "Ensure high availability",
          security: "Network segregation",
        },
        {
          name: "Database",
          purpose: "Data storage",
          security: `Encryption (${getEncryptionLevel(confidentialityLevel)})`,
        },
        {
          name: "API Gateway",
          purpose: "Access control",
          security: "Authentication and authorization",
        },
      ],
      diagrams: [
        {
          type: "Network Diagram",
          url: "https://example.com/network_diagram.png",
        },
        { type: "Data Flow Diagram", url: "https://example.com/data_flow.png" },
      ],
    },
    technologies: {
      availability: getAvailabilityTechnologies(availabilityLevel),
      integrity: getIntegrityTechnologies(integrityLevel),
      confidentiality: getConfidentialityTechnologies(confidentialityLevel),
    },
    implementation: {
      complexity: calculateImplementationComplexity(
        availabilityLevel,
        integrityLevel,
        confidentialityLevel
      ),
      timeline: calculateImplementationTimeline(
        availabilityLevel,
        integrityLevel,
        confidentialityLevel
      ),
      keyMilestones: [
        "Security architecture design",
        "Infrastructure setup",
        "Security controls implementation",
        "Testing and validation",
        "Deployment and monitoring",
      ],
      resources: [
        { role: "Security Architect", effort: "40 hours" },
        { role: "Network Engineer", effort: "30 hours" },
        { role: "Database Administrator", effort: "25 hours" },
        { role: "Security Analyst", effort: "35 hours" },
      ],
    },
  };
};

/**
 * Get security resources based on security levels
 *
 * @param availabilityLevel - Availability security level
 * @param integrityLevel - Integrity security level
 * @param confidentialityLevel - Confidentiality security level
 * @returns Security resources
 */
export const getSecurityResources = async (
  availabilityLevel: SecurityLevel,
  integrityLevel: SecurityLevel,
  confidentialityLevel: SecurityLevel
): Promise<any> => {
  // This would normally fetch from an API, but for now we'll return mock data
  return {
    standards: [
      {
        name: "ISO 27001",
        relevance: "High",
        link: "https://www.iso.org/isoiec-27001-information-security.html",
      },
      {
        name: "NIST Cybersecurity Framework",
        relevance: "High",
        link: "https://www.nist.gov/cyberframework",
      },
      {
        name: "CIS Controls",
        relevance: "Medium",
        link: "https://www.cisecurity.org/controls/",
      },
    ],
    tools: [
      {
        category: "Availability",
        items: getAvailabilityTools(availabilityLevel),
      },
      {
        category: "Integrity",
        items: getIntegrityTools(integrityLevel),
      },
      {
        category: "Confidentiality",
        items: getConfidentialityTools(confidentialityLevel),
      },
    ],
    guidance: [
      {
        title: "Security Architecture Guide",
        type: "PDF",
        link: "https://example.com/security_architecture.pdf",
      },
      {
        title: "Implementation Checklist",
        type: "Spreadsheet",
        link: "https://example.com/implementation_checklist.xlsx",
      },
      {
        title: "Security Control Testing Procedures",
        type: "Document",
        link: "https://example.com/testing_procedures.docx",
      },
    ],
    training: [
      {
        title: "Security Awareness Training",
        audience: "All Staff",
        duration: "1 hour",
      },
      {
        title: "Security Implementation Workshop",
        audience: "IT Staff",
        duration: "1 day",
      },
      {
        title: "Security Controls Deep Dive",
        audience: "Security Team",
        duration: "2 days",
      },
    ],
  };
};

// Helper functions
function calculateTotalCost(
  availabilityLevel: SecurityLevel,
  integrityLevel: SecurityLevel,
  confidentialityLevel: SecurityLevel
): string {
  const availCost = calculateComponentCost(availabilityLevel, "availability");
  const intCost = calculateComponentCost(integrityLevel, "integrity");
  const confCost = calculateComponentCost(
    confidentialityLevel,
    "confidentiality"
  );

  const totalValue =
    parseFloat(availCost) + parseFloat(intCost) + parseFloat(confCost);
  return `$${totalValue.toLocaleString()}`;
}

function calculateMaintenanceCost(
  availabilityLevel: SecurityLevel,
  integrityLevel: SecurityLevel,
  confidentialityLevel: SecurityLevel
): string {
  const availCost = calculateComponentMaintenanceCost(
    availabilityLevel,
    "availability"
  );
  const intCost = calculateComponentMaintenanceCost(
    integrityLevel,
    "integrity"
  );
  const confCost = calculateComponentMaintenanceCost(
    confidentialityLevel,
    "confidentiality"
  );

  const totalValue =
    parseFloat(availCost) + parseFloat(intCost) + parseFloat(confCost);
  return `$${totalValue.toLocaleString()}/year`;
}

function calculateComponentCost(
  level: SecurityLevel,
  component: string
): string {
  const baseCosts: Record<string, number> = {
    availability: 15000,
    integrity: 12000,
    confidentiality: 18000,
  };

  const multipliers: Record<SecurityLevel, number> = {
    None: 0,
    Low: 0.5,
    Moderate: 1,
    High: 1.75,
    "Very High": 3,
  };

  const baseCost = baseCosts[component] || 10000;
  const value = baseCost * multipliers[level];
  return value.toLocaleString();
}

function calculateComponentMaintenanceCost(
  level: SecurityLevel,
  component: string
): string {
  const baseCost = parseInt(
    calculateComponentCost(level, component).replace(/,/g, "")
  );
  return (baseCost * 0.2).toLocaleString(); // 20% of implementation cost
}

function calculateItemCost(level: SecurityLevel, item: string): string {
  const baseCosts: Record<string, number> = {
    redundancy: 8000,
    backup: 5000,
    disaster_recovery: 7000,
    validation: 4000,
    audit: 3000,
    change_management: 5000,
    encryption: 6000,
    access_control: 5000,
    monitoring: 4000,
  };

  const multipliers: Record<SecurityLevel, number> = {
    None: 0,
    Low: 0.5,
    Moderate: 1,
    High: 1.5,
    "Very High": 2.5,
  };

  const baseCost = baseCosts[item] || 5000;
  const value = baseCost * multipliers[level];
  return `$${value.toLocaleString()}`;
}

function calculatePaybackPeriod(
  availabilityLevel: SecurityLevel,
  integrityLevel: SecurityLevel,
  confidentialityLevel: SecurityLevel
): string {
  const levels = [availabilityLevel, integrityLevel, confidentialityLevel];
  const avgLevel = calculateAverageSecurityLevel(levels);

  switch (avgLevel) {
    case "None":
      return "N/A";
    case "Low":
      return "24-36 months";
    case "Moderate":
      return "18-24 months";
    case "High":
      return "12-18 months";
    case "Very High":
      return "6-12 months";
    default:
      return "Unknown";
  }
}

function calculateRiskReduction(
  availabilityLevel: SecurityLevel,
  integrityLevel: SecurityLevel,
  confidentialityLevel: SecurityLevel
): string {
  const levels = [availabilityLevel, integrityLevel, confidentialityLevel];
  const avgLevel = calculateAverageSecurityLevel(levels);

  switch (avgLevel) {
    case "None":
      return "0%";
    case "Low":
      return "25%";
    case "Moderate":
      return "50%";
    case "High":
      return "75%";
    case "Very High":
      return "90%";
    default:
      return "Unknown";
  }
}

function calculateROI(
  availabilityLevel: SecurityLevel,
  integrityLevel: SecurityLevel,
  confidentialityLevel: SecurityLevel
): string {
  const levels = [availabilityLevel, integrityLevel, confidentialityLevel];
  const avgLevel = calculateAverageSecurityLevel(levels);

  switch (avgLevel) {
    case "None":
      return "N/A";
    case "Low":
      return "15%";
    case "Moderate":
      return "40%";
    case "High":
      return "85%";
    case "Very High":
      return "120%";
    default:
      return "Unknown";
  }
}

function calculateTrustScore(confidentialityLevel: SecurityLevel): number {
  switch (confidentialityLevel) {
    case "None":
      return 10;
    case "Low":
      return 30;
    case "Moderate":
      return 60;
    case "High":
      return 80;
    case "Very High":
      return 95;
    default:
      return 0;
  }
}

function calculateEfficiencyScore(
  availabilityLevel: SecurityLevel,
  integrityLevel: SecurityLevel
): number {
  const availScore = securityLevelToValue(availabilityLevel) * 20;
  const intScore = securityLevelToValue(integrityLevel) * 20;
  return Math.min(95, (availScore + intScore) / 2);
}

function calculateCompetitiveScore(
  availabilityLevel: SecurityLevel,
  integrityLevel: SecurityLevel,
  confidentialityLevel: SecurityLevel
): number {
  const levels = [availabilityLevel, integrityLevel, confidentialityLevel];
  const avgValue =
    levels.reduce((sum, level) => sum + securityLevelToValue(level), 0) / 3;
  return Math.min(95, avgValue * 20);
}

function calculateInnovationScore(availabilityLevel: SecurityLevel): number {
  switch (availabilityLevel) {
    case "None":
      return 20;
    case "Low":
      return 40;
    case "Moderate":
      return 60;
    case "High":
      return 80;
    case "Very High":
      return 90;
    default:
      return 0;
  }
}

function calculateRevenueProtection(
  availabilityLevel: SecurityLevel,
  confidentialityLevel: SecurityLevel
): string {
  const availValue = securityLevelToValue(availabilityLevel);
  const confValue = securityLevelToValue(confidentialityLevel);
  const avgValue = (availValue + confValue) / 2;
  const baseAmount = 250000; // Base amount for calculations

  return `$${Math.round(baseAmount * avgValue).toLocaleString()}/year`;
}

function calculateCostAvoidance(
  availabilityLevel: SecurityLevel,
  integrityLevel: SecurityLevel,
  confidentialityLevel: SecurityLevel
): string {
  const levels = [availabilityLevel, integrityLevel, confidentialityLevel];
  const avgValue =
    levels.reduce((sum, level) => sum + securityLevelToValue(level), 0) / 3;
  const baseAmount = 100000; // Base amount for calculations

  return `$${Math.round(baseAmount * avgValue).toLocaleString()}/year`;
}

function calculateProductivityImprovement(
  availabilityLevel: SecurityLevel,
  integrityLevel: SecurityLevel
): string {
  const availValue = securityLevelToValue(availabilityLevel);
  const intValue = securityLevelToValue(integrityLevel);
  const avgValue = (availValue + intValue) / 2;

  return `${Math.round(5 * avgValue)}%`;
}

function securityLevelToValue(level: SecurityLevel): number {
  switch (level) {
    case "None":
      return 0;
    case "Low":
      return 1;
    case "Moderate":
      return 2;
    case "High":
      return 3;
    case "Very High":
      return 4;
    default:
      return 0;
  }
}

function calculateAverageSecurityLevel(levels: SecurityLevel[]): SecurityLevel {
  const sum = levels.reduce(
    (total, level) => total + securityLevelToValue(level),
    0
  );
  const avg = sum / levels.length;

  if (avg < 0.5) return "None";
  if (avg < 1.5) return "Low";
  if (avg < 2.5) return "Moderate";
  if (avg < 3.5) return "High";
  return "Very High";
}

function securityLevelToPercentage(level: SecurityLevel): number {
  switch (level) {
    case "None":
      return 10;
    case "Low":
      return 30;
    case "Moderate":
      return 50;
    case "High":
      return 75;
    case "Very High":
      return 95;
    default:
      return 0;
  }
}

function calculateMonitoringScore(
  availabilityLevel: SecurityLevel,
  integrityLevel: SecurityLevel,
  confidentialityLevel: SecurityLevel
): number {
  const baseScore =
    (securityLevelToPercentage(availabilityLevel) +
      securityLevelToPercentage(integrityLevel) +
      securityLevelToPercentage(confidentialityLevel)) /
    3;

  // Adjust based on level combinations
  if (securityLevelToValue(confidentialityLevel) > 2) {
    return Math.min(95, baseScore + 10);
  }

  return baseScore;
}

function calculateResilienceScore(availabilityLevel: SecurityLevel): number {
  return Math.min(95, securityLevelToPercentage(availabilityLevel) + 5);
}

function calculateComplianceScore(
  availabilityLevel: SecurityLevel,
  integrityLevel: SecurityLevel,
  confidentialityLevel: SecurityLevel
): number {
  const baseScore =
    securityLevelToPercentage(availabilityLevel) * 0.3 +
    securityLevelToPercentage(integrityLevel) * 0.3 +
    securityLevelToPercentage(confidentialityLevel) * 0.4;

  // Adjust for compliance requirements
  if (securityLevelToValue(confidentialityLevel) < 2) {
    return Math.max(10, baseScore - 15);
  }

  return baseScore;
}

function calculateOverallScore(
  availabilityLevel: SecurityLevel,
  integrityLevel: SecurityLevel,
  confidentialityLevel: SecurityLevel
): number {
  const scores = [
    securityLevelToPercentage(availabilityLevel),
    securityLevelToPercentage(integrityLevel),
    securityLevelToPercentage(confidentialityLevel),
    calculateMonitoringScore(
      availabilityLevel,
      integrityLevel,
      confidentialityLevel
    ),
    calculateResilienceScore(availabilityLevel),
    calculateComplianceScore(
      availabilityLevel,
      integrityLevel,
      confidentialityLevel
    ),
  ];

  return Math.round(
    scores.reduce((sum, score) => sum + score, 0) / scores.length
  );
}

function calculateSecurityMaturity(
  availabilityLevel: SecurityLevel,
  integrityLevel: SecurityLevel,
  confidentialityLevel: SecurityLevel
): string {
  const overallScore = calculateOverallScore(
    availabilityLevel,
    integrityLevel,
    confidentialityLevel
  );

  if (overallScore < 20) return "Initial";
  if (overallScore < 40) return "Developing";
  if (overallScore < 60) return "Defined";
  if (overallScore < 80) return "Managed";
  return "Optimized";
}

function calculateImplementationComplexity(
  availabilityLevel: SecurityLevel,
  integrityLevel: SecurityLevel,
  confidentialityLevel: SecurityLevel
): string {
  const levels = [availabilityLevel, integrityLevel, confidentialityLevel];
  const avgValue =
    levels.reduce((sum, level) => sum + securityLevelToValue(level), 0) / 3;

  if (avgValue < 1) return "Low";
  if (avgValue < 2) return "Moderate";
  if (avgValue < 3) return "High";
  return "Very High";
}

function calculateImplementationTimeline(
  availabilityLevel: SecurityLevel,
  integrityLevel: SecurityLevel,
  confidentialityLevel: SecurityLevel
): string {
  const levels = [availabilityLevel, integrityLevel, confidentialityLevel];
  const avgValue =
    levels.reduce((sum, level) => sum + securityLevelToValue(level), 0) / 3;

  if (avgValue < 1) return "1-2 weeks";
  if (avgValue < 2) return "1-2 months";
  if (avgValue < 3) return "3-6 months";
  return "6-12 months";
}

function getEncryptionLevel(confidentialityLevel: SecurityLevel): string {
  switch (confidentialityLevel) {
    case "None":
      return "None";
    case "Low":
      return "Basic (AES-128)";
    case "Moderate":
      return "Standard (AES-256)";
    case "High":
      return "Strong (AES-256 with key rotation)";
    case "Very High":
      return "Comprehensive (AES-256 with HSM)";
    default:
      return "Unknown";
  }
}

function getAvailabilityTechnologies(level: SecurityLevel): string[] {
  const baseTech = ["Load balancing"];

  switch (level) {
    case "None":
      return ["Basic server setup"];
    case "Low":
      return [...baseTech, "Simple backup solutions"];
    case "Moderate":
      return [
        ...baseTech,
        "Regular backups",
        "Basic monitoring",
        "Redundant storage",
      ];
    case "High":
      return [
        ...baseTech,
        "Automated backups",
        "Advanced monitoring",
        "Redundant systems",
        "Cold failover",
      ];
    case "Very High":
      return [
        ...baseTech,
        "Multi-site redundancy",
        "Hot failover",
        "Real-time monitoring",
        "Automatic scaling",
      ];
    default:
      return [];
  }
}

function getIntegrityTechnologies(level: SecurityLevel): string[] {
  const baseTech = ["Input validation"];

  switch (level) {
    case "None":
      return ["Basic error handling"];
    case "Low":
      return [...baseTech, "Simple data validation"];
    case "Moderate":
      return [
        ...baseTech,
        "Database constraints",
        "Audit logging",
        "Checksums",
      ];
    case "High":
      return [
        ...baseTech,
        "Digital signatures",
        "Advanced logging",
        "Change detection",
      ];
    case "Very High":
      return [
        ...baseTech,
        "Blockchain verification",
        "Comprehensive audit trails",
        "Tamper-proof storage",
      ];
    default:
      return [];
  }
}

function getConfidentialityTechnologies(level: SecurityLevel): string[] {
  const baseTech = ["Password authentication"];

  switch (level) {
    case "None":
      return ["Basic access control"];
    case "Low":
      return [...baseTech, "Transport encryption (TLS)"];
    case "Moderate":
      return [
        ...baseTech,
        "Data encryption at rest",
        "Role-based access control",
      ];
    case "High":
      return [
        ...baseTech,
        "Advanced encryption",
        "Multi-factor authentication",
        "Data loss prevention",
      ];
    case "Very High":
      return [
        ...baseTech,
        "End-to-end encryption",
        "Zero trust architecture",
        "Hardware security modules",
      ];
    default:
      return [];
  }
}

function getAvailabilityTools(level: SecurityLevel): any[] {
  const baseTools = [
    {
      name: "Server monitoring tools",
      example: "Nagios",
      purpose: "Monitor server health",
    },
  ];

  switch (level) {
    case "None":
      return [];
    case "Low":
      return baseTools;
    case "Moderate":
      return [
        ...baseTools,
        {
          name: "Backup solutions",
          example: "Veeam",
          purpose: "Regular data backups",
        },
      ];
    case "High":
      return [
        ...baseTools,
        {
          name: "Backup solutions",
          example: "Veeam",
          purpose: "Regular data backups",
        },
        {
          name: "Load balancers",
          example: "NGINX",
          purpose: "Distribute traffic",
        },
      ];
    case "Very High":
      return [
        ...baseTools,
        {
          name: "Backup solutions",
          example: "Veeam",
          purpose: "Regular data backups",
        },
        {
          name: "Load balancers",
          example: "NGINX",
          purpose: "Distribute traffic",
        },
        {
          name: "Disaster recovery tools",
          example: "Site Recovery Manager",
          purpose: "Automate recovery",
        },
      ];
    default:
      return [];
  }
}

function getIntegrityTools(level: SecurityLevel): any[] {
  const baseTools = [
    {
      name: "Validation frameworks",
      example: "JSON Schema",
      purpose: "Validate data structure",
    },
  ];

  switch (level) {
    case "None":
      return [];
    case "Low":
      return baseTools;
    case "Moderate":
      return [
        ...baseTools,
        {
          name: "Logging tools",
          example: "ELK Stack",
          purpose: "Log management",
        },
      ];
    case "High":
      return [
        ...baseTools,
        {
          name: "Logging tools",
          example: "ELK Stack",
          purpose: "Log management",
        },
        {
          name: "Digital signature tools",
          example: "OpenSSL",
          purpose: "Sign and verify data",
        },
      ];
    case "Very High":
      return [
        ...baseTools,
        {
          name: "Logging tools",
          example: "ELK Stack",
          purpose: "Log management",
        },
        {
          name: "Digital signature tools",
          example: "OpenSSL",
          purpose: "Sign and verify data",
        },
        {
          name: "Integrity monitoring",
          example: "Tripwire",
          purpose: "Detect unauthorized changes",
        },
      ];
    default:
      return [];
  }
}

function getConfidentialityTools(level: SecurityLevel): any[] {
  const baseTools = [
    {
      name: "Authentication systems",
      example: "OAuth",
      purpose: "User authentication",
    },
  ];

  switch (level) {
    case "None":
      return [];
    case "Low":
      return baseTools;
    case "Moderate":
      return [
        ...baseTools,
        {
          name: "Encryption tools",
          example: "OpenSSL",
          purpose: "Data encryption",
        },
      ];
    case "High":
      return [
        ...baseTools,
        {
          name: "Encryption tools",
          example: "OpenSSL",
          purpose: "Data encryption",
        },
        {
          name: "Access control systems",
          example: "RBAC",
          purpose: "Manage permissions",
        },
      ];
    case "Very High":
      return [
        ...baseTools,
        {
          name: "Encryption tools",
          example: "OpenSSL",
          purpose: "Data encryption",
        },
        {
          name: "Access control systems",
          example: "RBAC",
          purpose: "Manage permissions",
        },
        {
          name: "DLP solutions",
          example: "Symantec DLP",
          purpose: "Prevent data leakage",
        },
      ];
    default:
      return [];
  }
}
