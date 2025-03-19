import { SecurityLevel } from "../types/cia";
import {
  CIAComponentType,
  CIADataProvider,
  CIADetails,
  ROIEstimatesMap,
  ROIMetrics,
} from "../types/cia-services";
import { getRiskBadgeVariant } from "../utils";
import { getSecurityLevelValue } from "../utils/levelValuesUtils"; // Corrected import
import logger from "../utils/logger"; // Use the default export

/**
 * Service for security metrics related functionality
 *
 * ## Business Perspective
 *
 * This service provides quantifiable metrics for security investments,
 * enabling organizations to measure the effectiveness of their security
 * controls and justify security spending through ROI calculations and
 * risk reduction metrics. 📊
 */
export class SecurityMetricsService {
  private dataProvider: CIADataProvider;

  constructor(dataProvider: CIADataProvider) {
    this.dataProvider = dataProvider;
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
   * Get security metrics based on selected security levels
   *
   * @param availabilityLevel - Selected availability level
   * @param integrityLevel - Optional integrity level (defaults to availability level)
   * @param confidentialityLevel - Optional confidentiality level (defaults to availability level)
   * @returns Security metrics including costs, score, and risk reduction
   */
  public getSecurityMetrics(
    availabilityLevel: SecurityLevel,
    integrityLevel: SecurityLevel = availabilityLevel,
    confidentialityLevel: SecurityLevel = availabilityLevel
  ) {
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

    // Calculate capital expenditure
    const availabilityCapex = availabilityDetails?.capex || 0;
    const integrityCapex = integrityDetails?.capex || 0;
    const confidentialityCapex = confidentialityDetails?.capex || 0;
    const totalCapex =
      availabilityCapex + integrityCapex + confidentialityCapex;

    // Calculate operational expenditure
    const availabilityOpex = availabilityDetails?.opex || 0;
    const integrityOpex = integrityDetails?.opex || 0;
    const confidentialityOpex = confidentialityDetails?.opex || 0;
    const totalOpex = availabilityOpex + integrityOpex + confidentialityOpex;

    // Calculate security score
    const availValue = getSecurityLevelValue(availabilityLevel);
    const intValue = getSecurityLevelValue(integrityLevel);
    const confValue = getSecurityLevelValue(confidentialityLevel);

    const score = availValue + intValue + confValue;
    const maxScore = 12; // Max 4 points per component, 3 components
    const percentage = `${Math.round((score / maxScore) * 100)}%`;

    // Calculate risk reduction
    const riskReduction = this.calculateRiskReduction(
      availabilityLevel,
      integrityLevel,
      confidentialityLevel
    );

    return {
      score,
      maxScore,
      percentage,
      totalCapex,
      totalOpex,
      totalCost: totalCapex + totalOpex,
      availabilityCapex,
      availabilityOpex,
      integrityCapex,
      integrityOpex,
      confidentialityCapex,
      confidentialityOpex,
      riskReduction,
    };
  }

  /**
   * Get component-specific details based on component type and security level
   *
   * @param component - CIA component type
   * @param level - Security level
   * @returns Component details if found, undefined otherwise
   */
  private getComponentDetails(
    component: CIAComponentType,
    level: SecurityLevel
  ): CIADetails | undefined {
    const options = this.getCIAOptions(component);
    return options[level];
  }

  /**
   * Get CIA options for a specific component
   *
   * @param component - CIA component type
   * @returns Record of component options by security level
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
   * Get metrics for a specific component and security level
   *
   * @param component - CIA component type
   * @param level - Security level
   * @returns Component metrics including level, value, and description
   */
  public getComponentMetrics(
    component: CIAComponentType,
    level: SecurityLevel
  ) {
    const details = this.getComponentDetails(component, level);
    const value = getSecurityLevelValue(level);
    const percentage = `${Math.round((value / 4) * 100)}%`;

    return {
      component,
      level,
      value,
      percentage,
      description: details?.description || `${level} ${component}`,
      capex: details?.capex || 0,
      opex: details?.opex || 0,
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
      result[key] = typeof value === 'number' ? value.toString() : value as string;
    });
    
    return result;
  }

  /**
   * Get impact metrics for a component and security level
   *
   * @param component - CIA component type
   * @param level - Security level
   * @returns Impact metrics including security level, risk reduction, and component-specific metrics
   */
  public getImpactMetrics(component: CIAComponentType, level: SecurityLevel) {
    const details = this.getComponentDetails(component, level);
    const riskReduction = this.calculateSingleComponentRiskReduction(level);

    // Base metrics that apply to all components
    const baseMetrics = {
      securityLevel: level,
      riskReduction,
      description: details?.description || `${level} ${component}`,
      technical: details?.technical || `Standard ${level} implementation`,
      businessImpact: details?.businessImpact || "Business impact not provided",
    };

    // Component-specific metrics
    if (component === "availability") {
      return {
        ...baseMetrics,
        uptime: details?.uptime || "Not specified",
        rto: details?.rto || "Not specified",
        rpo: details?.rpo || "Not specified",
        mttr: details?.mttr || "Not specified",
      };
    } else if (component === "integrity") {
      return {
        ...baseMetrics,
        validationMethod: details?.validationMethod || "Not specified",
      };
    } else {
      return {
        ...baseMetrics,
        protectionMethod: details?.protectionMethod || "Not specified",
      };
    }
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
    integrityLevel: SecurityLevel,
    confidentialityLevel: SecurityLevel
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
      return getSecurityLevelValue(level) || 0;
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
        return "No security controls or protection measures";
      case "Low":
        return "Basic security controls with limited protection";
      case "Moderate":
        return "Standard security controls with reasonable protection";
      case "High":
        return "Robust security controls with strong protection";
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
    switch (level) {
      case "None":
        return "No Protection";
      case "Low":
        return "Basic Protection";
      case "Moderate":
        return "Balanced Protection";
      case "High":
        return "Strong Protection";
      case "Very High":
        return "Maximum Protection";
      default:
        return "Unknown Protection Level";
    }
  }

  /**
   * Get badge variant for risk level
   *
   * @param riskLevel - Risk level
   * @returns Badge variant name
   */
  public getRiskBadgeVariant(riskLevel: string): string {
    // Remove duplicate implementation and import from utils
    return getRiskBadgeVariant(riskLevel);
  }

  /**
   * Get security icon based on security level
   *
   * @param level - Security level
   * @returns Icon character
   */
  public getSecurityIcon(level: SecurityLevel): string {
    // Use data provider's icon function if available
    if (typeof this.dataProvider.getDefaultSecurityIcon === "function") {
      return this.dataProvider.getDefaultSecurityIcon(level);
    }

    // Default icons
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

  /**
   * Get security level from numeric value
   *
   * @param value - Numeric security level value (0-4)
   * @returns Security level
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
   * Calculate overall security score as a percentage
   *
   * @param availabilityLevel - Availability security level
   * @param integrityLevel - Integrity security level
   * @param confidentialityLevel - Confidentiality security level
   * @returns Security score as 0-100 percentage
   */
  public calculateSecurityScore(
    availabilityLevel: SecurityLevel,
    integrityLevel: SecurityLevel,
    confidentialityLevel: SecurityLevel
  ): number {
    const availValue = getSecurityLevelValue(availabilityLevel);
    const intValue = getSecurityLevelValue(integrityLevel);
    const confValue = getSecurityLevelValue(confidentialityLevel);

    const score = availValue + intValue + confValue;
    const maxScore = 12; // Max 4 points per component, 3 components

    return Math.round((score / maxScore) * 100);
  }
}

/**
 * Create a SecurityMetricsService with the provided data provider
 *
 * @param dataProvider - Data provider with CIA options
 * @returns SecurityMetricsService instance
 */
export function createSecurityMetricsService(
  dataProvider: CIADataProvider
): SecurityMetricsService {
  return new SecurityMetricsService(dataProvider);
}
