import { SecurityLevel } from "../types/cia";
import {
  CIAComponentType,
  CIADataProvider,
  ROIMetrics,
} from "../types/cia-services";
import { ISecurityMetricsService } from "../types/services";
import logger from "../utils/logger";
import { BaseService } from "./BaseService";

/**
 * Represents a security tool recommendation
 */
export interface SecurityTool {
  name: string;
  example: string;
  purpose: string;
}

/**
 * Cost estimation details for security implementation
 * 
 * @property totalImplementationCost - Total upfront implementation cost (formatted string like "$50,000" or numeric value)
 * @property annualMaintenanceCost - Ongoing annual maintenance cost (formatted string or numeric value)
 * @property costBreakdown - Detailed breakdown by component (availability, integrity, confidentiality)
 * @property roi - Optional ROI analysis including payback period, risk reduction, and business benefits
 */
export interface CostEstimation {
  totalImplementationCost: string | number;
  annualMaintenanceCost: string | number;
  costBreakdown: Record<string, unknown>;
  roi?: Record<string, unknown>;
}

/**
 * Technical details response for security implementation
 * 
 * @property architecture - Architecture details including components and optional diagrams
 * @property architecture.diagrams - Array of diagram objects with type and URL properties
 * @property implementation - Implementation plan details
 * @property implementation.steps - Optional implementation steps (when dynamically generated)
 * @property implementation.complexity - Optional complexity assessment (e.g., "Low", "Medium", "High")
 * @property technologies - Technology stack by component (availability, integrity, confidentiality)
 */
export interface TechnicalDetailsResponse {
  architecture: {
    description: string;
    components: Array<{
      name: string;
      purpose: string;
      security: string;
    }>;
    diagrams?: unknown[];
  };
  implementation: {
    steps?: string[];
    timeline: string;
    keyMilestones: string[];
    resources: Array<{
      role: string;
      effort: string;
    }>;
    complexity?: string;
  };
  technologies?: Record<string, unknown>;
}

/**
 * Business impact metrics for value creation
 */
export interface BusinessImpactMetrics {
  revenueProtection: string;
  costAvoidance: string;
  productivityImprovement: string;
}

/**
 * Value creation metrics
 */
export interface ValueCreationMetrics {
  roi: ROIMetrics;
  riskReduction: string;
  valuePoints: Array<{
    title: string;
    score: number;
    description: string;
  }>;
  businessImpacts?: BusinessImpactMetrics;
}

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
  // Required properties
  financialImpact: string;
  operationalImpact: string;
  reputationalImpact: string;
  complianceImpact: string;

  // Optional properties (marked explicitly)
  securityLevel?: SecurityLevel;
  riskReduction?: string;
  description?: string;
  technical?: string;
  businessImpact?: string;
  
  // Allow additional properties
  [key: string]: unknown;
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
 * 
 * @implements {ISecurityMetricsService}
 */
export class SecurityMetricsService extends BaseService implements ISecurityMetricsService {
  /**
   * Service name for identification
   */
  public readonly name: string = 'SecurityMetricsService';

  /**
   * Create a new SecurityMetricsService instance
   * 
   * @param dataProvider - Data provider for CIA options and metrics data
   * @throws {ServiceError} If dataProvider is not provided
   */
  constructor(dataProvider: CIADataProvider) {
    super(dataProvider);
  }

  /**
   * Calculate ROI metrics based on security level and implementation cost
   * 
   * Computes return on investment (ROI) for security implementations by analyzing
   * the expected returns for different security levels. Higher security levels
   * typically yield better ROI through reduced incident costs and improved resilience.
   *
   * @param securityLevel - Selected security level to calculate ROI for
   * @param implementationCost - Total cost of implementation in currency units (CAPEX + OPEX)
   * @returns ROI metrics including monetary value, percentage return, and description
   * @throws {ServiceError} If security level is invalid
   * 
   * @example
   * ```typescript
   * const service = new SecurityMetricsService(dataProvider);
   * 
   * // Calculate ROI for High security level with $100,000 investment
   * const roi = service.calculateRoi('High', 100000);
   * console.log(roi.value);        // "$300,000"
   * console.log(roi.percentage);   // "300%"
   * console.log(roi.description);  // "Return on investment for High security level implementation"
   * 
   * // No ROI for zero investment
   * const noRoi = service.calculateRoi('High', 0);
   * console.log(noRoi.value);      // "$0"
   * ```
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
   * Retrieves pre-configured return on investment estimates for all security levels.
   * Each level has associated return rates, potential savings, and break-even periods
   * based on industry research and historical data.
   *
   * @returns Map of ROI estimates keyed by security level (NONE, LOW, MODERATE, HIGH, VERY_HIGH)
   * 
   * @example
   * ```typescript
   * const service = new SecurityMetricsService(dataProvider);
   * const estimates = service.getROIEstimates();
   * 
   * console.log(estimates.HIGH.returnRate);        // "300%"
   * console.log(estimates.HIGH.description);       // "High ROI with significant risk reduction"
   * console.log(estimates.MODERATE.breakEvenPeriod); // "2 years"
   * ```
   */
  public getROIEstimates(): ROIEstimatesMap {
    return this.dataProvider.roiEstimates;
  }

  /**
   * Get comprehensive security metrics for selected security levels
   * 
   * Calculates a complete security assessment including scores, costs, risk reduction,
   * compliance metrics, and component-specific analysis. This is the primary method
   * for obtaining a holistic view of security posture across all CIA triad components.
   *
   * @param availabilityLevel - Availability security level
   * @param integrityLevel - Integrity security level (defaults to availabilityLevel if not provided)
   * @param confidentialityLevel - Confidentiality security level (defaults to availabilityLevel if not provided)
   * @returns Comprehensive security metrics object with scores, costs, and assessments
   * 
   * @example
   * ```typescript
   * const service = new SecurityMetricsService(dataProvider);
   * 
   * // Get metrics for specific configuration
   * const metrics = service.getSecurityMetrics('High', 'Very High', 'Moderate');
   * console.log(metrics.overallScore);     // 75 (0-100 scale)
   * console.log(metrics.totalCost);        // 450000 (total CAPEX + OPEX)
   * console.log(metrics.riskReduction);    // "85%"
   * console.log(metrics.securityMaturity); // "Advanced"
   * 
   * // Use uniform level across all components
   * const uniformMetrics = service.getSecurityMetrics('Moderate');
   * console.log(uniformMetrics.availability.level);      // "Moderate"
   * console.log(uniformMetrics.integrity.level);         // "Moderate"
   * console.log(uniformMetrics.confidentiality.level);   // "Moderate"
   * 
   * // Access component-specific metrics
   * console.log(metrics.availability.score);           // Score for availability
   * console.log(metrics.availability.recommendations); // Recommendations array
   * ```
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

    // Calculate monitoring, resilience, and compliance scores
    const monitoring = this.calculateMonitoringScore(
      availabilityLevel,
      integrityLevel,
      confidentialityLevel
    );
    const resilience = this.calculateResilienceScore(availabilityLevel);
    const compliance = this.calculateComplianceScore(
      availabilityLevel,
      integrityLevel,
      confidentialityLevel
    );

    // Calculate security maturity
    const securityMaturity = this.calculateSecurityMaturity(
      availabilityLevel,
      integrityLevel,
      confidentialityLevel
    );

    // Get impact metrics
    const impactMetrics = this.calculateImpactMetrics(
      availabilityLevel,
      integrityLevel,
      confidentialityLevel
    );

    // Create component metrics
    const availabilityMetrics = this.getComponentMetrics(
      "availability",
      availabilityLevel
    );
    const integrityMetrics = this.getComponentMetrics(
      "integrity",
      integrityLevel
    );
    const confidentialityMetrics = this.getComponentMetrics(
      "confidentiality",
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
      availability: availabilityMetrics,
      integrity: integrityMetrics,
      confidentiality: confidentialityMetrics,
      impactMetrics,
      monitoring,
      resilience,
      compliance,
      benchmarkScore: 75, // Industry benchmark (default)
      securityMaturity,
    };
  }

  /**
   * Get component-specific security metrics
   * 
   * Provides detailed metrics for a single CIA component at a specific security level,
   * including score, description, recommendations, and cost information. Useful for
   * component-level analysis and detailed reporting.
   *
   * @param component - CIA component type ('availability', 'integrity', or 'confidentiality')
   * @param level - Security level for the component
   * @returns Component metrics with score, description, recommendations, and cost details
   * 
   * @example
   * ```typescript
   * const service = new SecurityMetricsService(dataProvider);
   * 
   * // Get metrics for availability at High level
   * const availMetrics = service.getComponentMetrics('availability', 'High');
   * console.log(availMetrics.score);         // 75 (0-100 scale)
   * console.log(availMetrics.level);         // "High"
   * console.log(availMetrics.description);   // "High availability with 99.9% uptime"
   * console.log(availMetrics.recommendations); // Array of improvement suggestions
   * console.log(availMetrics.capex);         // Capital expenditure cost
   * console.log(availMetrics.opex);          // Operational expenditure cost
   * 
   * // Get metrics for integrity
   * const integrityMetrics = service.getComponentMetrics('integrity', 'Very High');
   * console.log(integrityMetrics.component); // "integrity"
   * ```
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
   * Calculate impact metrics based on security levels
   *
   * @param availabilityLevel - Availability security level
   * @param integrityLevel - Integrity security level
   * @param confidentialityLevel - Confidentiality security level
   * @returns Impact metrics
   */
  private calculateImpactMetrics(
    availabilityLevel: SecurityLevel,
    integrityLevel: SecurityLevel,
    confidentialityLevel: SecurityLevel
  ): ImpactMetrics {
    // Calculate financial impact based on security levels
    const financialImpactLevel = this.calculateFinancialImpactLevel(
      availabilityLevel,
      confidentialityLevel
    );

    // Calculate operational impact based on availability and integrity
    const operationalImpactLevel = this.calculateOperationalImpactLevel(
      availabilityLevel,
      integrityLevel
    );

    // Calculate reputational impact primarily based on confidentiality
    const reputationalImpactLevel = this.calculateReputationalImpactLevel(
      confidentialityLevel,
      integrityLevel
    );

    // Calculate compliance impact based on all components
    const complianceImpactLevel = this.calculateComplianceImpactLevel(
      availabilityLevel,
      integrityLevel,
      confidentialityLevel
    );

    return {
      financialImpact: financialImpactLevel,
      operationalImpact: operationalImpactLevel,
      reputationalImpact: reputationalImpactLevel,
      complianceImpact: complianceImpactLevel,
      securityLevel: this.calculateAverageSecurityLevel([
        availabilityLevel,
        integrityLevel,
        confidentialityLevel,
      ]),
      riskReduction: `${this.calculateRiskReduction(
        availabilityLevel,
        integrityLevel,
        confidentialityLevel
      )}%`,
    };
  }

  /**
   * Calculate financial impact level
   */
  private calculateFinancialImpactLevel(
    availabilityLevel: SecurityLevel,
    confidentialityLevel: SecurityLevel
  ): string {
    const availValue = this.getSecurityLevelValue(availabilityLevel);
    const confValue = this.getSecurityLevelValue(confidentialityLevel);
    const avgValue = (availValue + confValue) / 2;

    if (avgValue < 1) return "Severe financial impact risk";
    if (avgValue < 2) return "High financial impact risk";
    if (avgValue < 3) return "Moderate financial impact risk";
    if (avgValue < 4) return "Low financial impact risk";
    return "Minimal financial impact risk";
  }

  /**
   * Calculate operational impact level
   */
  private calculateOperationalImpactLevel(
    availabilityLevel: SecurityLevel,
    integrityLevel: SecurityLevel
  ): string {
    const availValue = this.getSecurityLevelValue(availabilityLevel);
    const integValue = this.getSecurityLevelValue(integrityLevel);
    const avgValue = (availValue + integValue) / 2;

    if (avgValue < 1) return "Severe operational disruption risk";
    if (avgValue < 2) return "High operational disruption risk";
    if (avgValue < 3) return "Moderate operational disruption risk";
    if (avgValue < 4) return "Low operational disruption risk";
    return "Minimal operational disruption risk";
  }

  /**
   * Calculate reputational impact level
   */
  private calculateReputationalImpactLevel(
    confidentialityLevel: SecurityLevel,
    integrityLevel: SecurityLevel
  ): string {
    const confValue = this.getSecurityLevelValue(confidentialityLevel);
    const integValue = this.getSecurityLevelValue(integrityLevel);
    // Confidentiality weighted more heavily for reputation
    const avgValue = confValue * 0.7 + integValue * 0.3;

    if (avgValue < 1) return "Severe reputational damage risk";
    if (avgValue < 2) return "High reputational damage risk";
    if (avgValue < 3) return "Moderate reputational damage risk";
    if (avgValue < 4) return "Low reputational damage risk";
    return "Minimal reputational damage risk";
  }

  /**
   * Calculate compliance impact level
   */
  private calculateComplianceImpactLevel(
    availabilityLevel: SecurityLevel,
    integrityLevel: SecurityLevel,
    confidentialityLevel: SecurityLevel
  ): string {
    const availValue = this.getSecurityLevelValue(availabilityLevel);
    const integValue = this.getSecurityLevelValue(integrityLevel);
    const confValue = this.getSecurityLevelValue(confidentialityLevel);
    const avgValue = (availValue + integValue + confValue) / 3;

    if (avgValue < 1) return "Severe compliance violation risk";
    if (avgValue < 2) return "High compliance violation risk";
    if (avgValue < 3) return "Moderate compliance violation risk";
    if (avgValue < 4) return "Low compliance violation risk";
    return "Minimal compliance violation risk";
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
   * Get risk level based on security score
   *
   * @param score Security score (0-100)
   * @returns Risk level description
   */
  public getRiskLevel(score: number): string {
    if (score <= 30) return "Critical Risk";
    if (score <= 40) return "High Risk";
    if (score <= 60) return "Medium Risk";
    if (score <= 80) return "Low Risk";
    return "Minimal Risk";
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
   * Calculate monitoring score based on security levels
   */
  private calculateMonitoringScore(
    availabilityLevel: SecurityLevel,
    integrityLevel: SecurityLevel,
    confidentialityLevel: SecurityLevel
  ): number {
    const baseScore =
      (this.securityLevelToPercentage(availabilityLevel) +
        this.securityLevelToPercentage(integrityLevel) +
        this.securityLevelToPercentage(confidentialityLevel)) /
      3;

    // Adjust based on level combinations
    if (this.getSecurityLevelValue(confidentialityLevel) > 2) {
      return Math.min(95, baseScore + 10);
    }

    return baseScore;
  }

  /**
   * Calculate resilience score based on availability level
   */
  private calculateResilienceScore(availabilityLevel: SecurityLevel): number {
    return Math.min(95, this.securityLevelToPercentage(availabilityLevel) + 5);
  }

  /**
   * Calculate compliance score based on security levels
   */
  private calculateComplianceScore(
    availabilityLevel: SecurityLevel,
    integrityLevel: SecurityLevel,
    confidentialityLevel: SecurityLevel
  ): number {
    const baseScore =
      this.securityLevelToPercentage(availabilityLevel) * 0.3 +
      this.securityLevelToPercentage(integrityLevel) * 0.3 +
      this.securityLevelToPercentage(confidentialityLevel) * 0.4;

    // Adjust for compliance requirements
    if (this.getSecurityLevelValue(confidentialityLevel) < 2) {
      return Math.max(10, baseScore - 15);
    }

    return baseScore;
  }

  /**
   * Calculate security maturity based on security levels
   */
  private calculateSecurityMaturity(
    availabilityLevel: SecurityLevel,
    integrityLevel: SecurityLevel,
    confidentialityLevel: SecurityLevel
  ): string {
    const overallScore = this.calculateOverallScore(
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

  /**
   * Calculate overall score based on security levels and other metrics
   */
  private calculateOverallScore(
    availabilityLevel: SecurityLevel,
    integrityLevel: SecurityLevel,
    confidentialityLevel: SecurityLevel
  ): number {
    const scores = [
      this.securityLevelToPercentage(availabilityLevel),
      this.securityLevelToPercentage(integrityLevel),
      this.securityLevelToPercentage(confidentialityLevel),
      this.calculateMonitoringScore(
        availabilityLevel,
        integrityLevel,
        confidentialityLevel
      ),
      this.calculateResilienceScore(availabilityLevel),
      this.calculateComplianceScore(
        availabilityLevel,
        integrityLevel,
        confidentialityLevel
      ),
    ];

    return Math.round(
      scores.reduce((sum, score) => sum + score, 0) / scores.length
    );
  }

  /**
   * Calculate average security level from an array of security levels
   */
  private calculateAverageSecurityLevel(
    levels: SecurityLevel[]
  ): SecurityLevel {
    const sum = levels.reduce(
      (total, level) => total + this.getSecurityLevelValue(level),
      0
    );
    const avg = sum / levels.length;

    if (avg < 0.5) return "None";
    if (avg < 1.5) return "Low";
    if (avg < 2.5) return "Moderate";
    if (avg < 3.5) return "High";
    return "Very High";
  }

  /**
   * Convert security level to percentage value (0-100)
   */
  private securityLevelToPercentage(level: SecurityLevel): number {
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

  /**
   * Get security level value (0-4)
   */
  protected getSecurityLevelValue(level: SecurityLevel): number {
    return securityLevelToValue(level);
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
): Promise<CostEstimation> => {
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
): Promise<ValueCreationMetrics> => {
  // This would normally fetch from an API, but for now we'll return mock data
  const roiPercentage = calculateROI(availabilityLevel, integrityLevel, confidentialityLevel);
  return {
    roi: {
      value: "N/A", // Requires implementation cost input for calculation
      percentage: roiPercentage,
      description: `Expected return on investment for security implementation`,
    },
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
  // Create a service instance to leverage its calculations
  const service = createSecurityMetricsService();

  // Use the service to calculate comprehensive metrics
  return service.getSecurityMetrics(
    availabilityLevel,
    integrityLevel,
    confidentialityLevel
  );
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
): Promise<TechnicalDetailsResponse> => {
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
): Promise<Record<string, unknown>> => {
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

function getAvailabilityTools(level: SecurityLevel): SecurityTool[] {
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

function getIntegrityTools(level: SecurityLevel): SecurityTool[] {
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

function getConfidentialityTools(level: SecurityLevel): SecurityTool[] {
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
