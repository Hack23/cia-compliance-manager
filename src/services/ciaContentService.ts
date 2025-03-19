import { SecurityLevel } from "../types/cia";
import {
  BusinessImpactDetails,
  CIAComponentType,
  CIADataProvider,
  CIADetails,
  ROIEstimate,
  ROIEstimatesMap,
  TechnicalImplementationDetails,
  isCIAComponentType,
} from "../types/cia-services";
import { BusinessImpactService } from "./businessImpactService";
import { ComplianceService } from "./complianceService";
import { SecurityMetricsService } from "./securityMetricsService";
import { SecurityResourceService } from "./securityResourceService";
import { TechnicalImplementationService } from "./technicalImplementationService";

// Import default data provider
import {
  ROI_ESTIMATES,
  availabilityOptions,
  confidentialityOptions,
  integrityOptions,
} from "../data/security";

/**
 * Metrics for ROI assessment
 */
export interface ROIMetrics {
  value: string;
  percentage: string;
  description: string;
}

/**
 * Format a currency value as a string
 *
 * @param value - The value to format
 * @returns Formatted currency string
 */
function formatCurrency(value: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(value);
}

/**
 * Convert a security level to ROI key format
 *
 * @param level - The security level
 * @returns The ROI key (NONE, LOW, etc.)
 */
function securityLevelToROIKey(level: SecurityLevel): keyof ROIEstimatesMap {
  const mapping: Record<SecurityLevel, keyof ROIEstimatesMap> = {
    None: "NONE",
    Low: "LOW",
    Moderate: "MODERATE",
    High: "HIGH",
    "Very High": "VERY_HIGH",
  };
  return mapping[level] || "NONE";
}

/**
 * Get ROI description for a security level
 *
 * @param level - Security level
 * @returns ROI description
 */
function getROIDescription(level: SecurityLevel): string {
  const descriptions: Record<SecurityLevel, string> = {
    None: "No return on investment without security controls",
    Low: "Basic return on security investment",
    Moderate: "Moderate return on security investment",
    High: "Strong return on security investment",
    "Very High": "Maximum return on security investment",
  };
  return descriptions[level] || "Unknown ROI";
}

/**
 * Get CIA options for a specific component
 *
 * @param component - Component type
 * @returns Option mapping for the component
 */
export function getCIAOptions(
  component: CIAComponentType
): Record<SecurityLevel, CIADetails> {
  switch (component) {
    case "availability":
      return availabilityOptions;
    case "integrity":
      return integrityOptions;
    case "confidentiality":
      return confidentialityOptions;
    default:
      // Return a properly typed empty object with default values for each security level
      return {
        None: createEmptyCIADetails(),
        Low: createEmptyCIADetails(),
        Moderate: createEmptyCIADetails(),
        High: createEmptyCIADetails(),
        "Very High": createEmptyCIADetails(),
      };
  }
}

/**
 * Creates an empty CIADetails object with required fields
 */
function createEmptyCIADetails(): CIADetails {
  return {
    description: "",
    technical: "",
    businessImpact: "",
    capex: 0,
    opex: 0,
    bg: "#ffffff",
    text: "#000000",
    recommendations: [],
  };
}

/**
 * Main service to provide CIA content and utilities throughout the application
 *
 * ## Business Perspective
 *
 * This service acts as a central hub for accessing security-related information
 * across the CIA triad, providing consistent data and calculations for business
 * impact analysis, technical implementations, and compliance requirements. 🔒
 */
export class CIAContentService {
  private dataProvider: CIADataProvider;
  private businessImpactService: BusinessImpactService;
  private complianceService: ComplianceService;
  private securityMetricsService: SecurityMetricsService;
  private technicalImplementationService: TechnicalImplementationService;
  private securityResourceService: SecurityResourceService;

  constructor(dataProvider?: CIADataProvider) {
    this.dataProvider = dataProvider || {
      availabilityOptions,
      integrityOptions,
      confidentialityOptions,
      roiEstimates: ROI_ESTIMATES,
    };

    // Initialize service instances
    this.businessImpactService = new BusinessImpactService(this.dataProvider);
    this.complianceService = new ComplianceService(this.dataProvider);
    this.securityMetricsService = new SecurityMetricsService(this.dataProvider);
    this.technicalImplementationService = new TechnicalImplementationService(
      this.dataProvider
    );
    this.securityResourceService = new SecurityResourceService(
      this.dataProvider
    );
  }

  /**
   * Get options data for a CIA component
   */
  public getCIAOptions(
    component: CIAComponentType
  ): Record<SecurityLevel, CIADetails> {
    if (component === "availability") {
      return this.dataProvider.availabilityOptions;
    } else if (component === "integrity") {
      return this.dataProvider.integrityOptions;
    } else if (component === "confidentiality") {
      return this.dataProvider.confidentialityOptions;
    }
    return {
      None: { 
        description: "Invalid component",
        technical: "Invalid component",
        businessImpact: "Invalid component",
        capex: 0,
        opex: 0,
        bg: "#ffffff",
        text: "#000000",
        recommendations: []
      },
      Low: {
        description: "Invalid component",
        technical: "Invalid component",
        businessImpact: "Invalid component",
        capex: 0,
        opex: 0,
        bg: "#ffffff",
        text: "#000000",
        recommendations: []
      },
      Moderate: {
        description: "Invalid component",
        technical: "Invalid component",
        businessImpact: "Invalid component",
        capex: 0,
        opex: 0,
        bg: "#ffffff",
        text: "#000000",
        recommendations: []
      },
      High: {
        description: "Invalid component",
        technical: "Invalid component",
        businessImpact: "Invalid component", 
        capex: 0,
        opex: 0,
        bg: "#ffffff",
        text: "#000000",
        recommendations: []
      },
      "Very High": {
        description: "Invalid component",
        technical: "Invalid component",
        businessImpact: "Invalid component",
        capex: 0,
        opex: 0,
        bg: "#ffffff",
        text: "#000000",
        recommendations: []
      }
    };
  }

  /**
   * Get details for a specific component and security level
   */
  public getComponentDetails(
    component: CIAComponentType,
    level: SecurityLevel
  ): CIADetails | undefined {
    if (!isCIAComponentType(component)) {
      return undefined;
    }

    const options = this.getCIAOptions(component);
    if (!options || !options[level]) {
      return undefined;
    }

    return options[level];
  }

  /**
   * Get ROI estimate for a security level
   */
  public getROIEstimate(level: SecurityLevel): ROIEstimate {
    const levelKey = level
      .toUpperCase()
      .replace(" ", "_") as keyof ROIEstimatesMap;
    const estimate = this.dataProvider.roiEstimates[levelKey];

    if (!estimate) {
      return {
        value: "Negative",
        returnRate: "0%",
        description: "No return on investment for security controls",
      };
    }

    return estimate;
  }

  /**
   * Get ROI estimates for a specific security level
   */
  public getROIEstimates(level: SecurityLevel) {
    return this.getROIEstimate(level);
  }

  /**
   * Get overall ROI estimates map
   */
  public getAllROIEstimates(): ROIEstimatesMap {
    return this.dataProvider.roiEstimates;
  }

  /**
   * Get the business impact for a component and security level
   */
  public getBusinessImpact(
    component: CIAComponentType,
    level: SecurityLevel
  ): BusinessImpactDetails {
    return this.businessImpactService.getBusinessImpact(component, level);
  }

  /**
   * Get technical implementation details for a component and security level
   */
  public getTechnicalImplementation(
    component: CIAComponentType,
    level: SecurityLevel
  ): TechnicalImplementationDetails {
    return this.technicalImplementationService.getTechnicalImplementation(
      component,
      level
    );
  }

  /**
   * Get component implementation details
   */
  public getComponentImplementationDetails(
    component: CIAComponentType,
    level: SecurityLevel
  ): TechnicalImplementationDetails {
    return this.technicalImplementationService.getComponentImplementationDetails(
      component,
      level
    );
  }

  /**
   * Get business impact description
   */
  public getBusinessImpactDescription(
    component: CIAComponentType,
    level: SecurityLevel
  ): string {
    return this.businessImpactService.getBusinessImpactDescription(
      component,
      level
    );
  }

  /**
   * Get technical description
   */
  public getTechnicalDescription(
    component: CIAComponentType,
    level: SecurityLevel
  ): string {
    return this.technicalImplementationService.getTechnicalDescription(
      component,
      level
    );
  }

  /**
   * Get detailed description
   */
  public getDetailedDescription(
    component: CIAComponentType,
    level: SecurityLevel
  ): BusinessImpactDetails {
    // Get the impact from the business impact service
    if (this.businessImpactService) {
      const impact = this.businessImpactService.getBusinessImpact(component, level);
      return impact;
    }
    // Return an empty object that satisfies the interface if the service is not available
    return {
      summary: "",
      financial: { description: "", riskLevel: "" },
      operational: { description: "", riskLevel: "" },
      reputational: { description: "", riskLevel: "" }
    };
  }

  /**
   * Get recommendations
   */
  public getRecommendations(
    component: CIAComponentType,
    level: SecurityLevel
  ): string[] {
    return this.technicalImplementationService.getRecommendations(
      component,
      level
    );
  }

  /**
   * Calculate ROI
   */
  public calculateRoi(
    level: SecurityLevel,
    implementationCost: number
  ): ROIMetrics {
    // Get the ROI percentage from the estimate
    const roiEstimate = this.getROIEstimates(level);
    const roiPercentage =
      parseInt(roiEstimate.returnRate.replace("%", ""), 10) || 0;

    // Calculate the absolute ROI value
    const roiValue =
      implementationCost > 0 ? implementationCost * (roiPercentage / 100) : 0;

    // Return the metrics object
    return {
      value: formatCurrency(roiValue),
      percentage: `${roiPercentage}%`,
      description: getROIDescription(level),
    };
  }

  /**
   * Get security metrics
   */
  public getSecurityMetrics(
    availabilityLevel: SecurityLevel,
    integrityLevel: SecurityLevel = availabilityLevel,
    confidentialityLevel: SecurityLevel = availabilityLevel
  ) {
    return this.securityMetricsService.getSecurityMetrics(
      availabilityLevel,
      integrityLevel,
      confidentialityLevel
    );
  }

  /**
   * Get compliance status
   */
  public getComplianceStatus(
    availabilityLevel: SecurityLevel,
    integrityLevel: SecurityLevel,
    confidentialityLevel: SecurityLevel
  ) {
    // Call the compliance service with all three parameters
    return this.complianceService.getComplianceStatus(
      availabilityLevel,
      integrityLevel,
      confidentialityLevel
    );
  }

  /**
   * Get component metrics
   */
  public getComponentMetrics(
    component: CIAComponentType,
    level: SecurityLevel
  ) {
    return this.securityMetricsService.getComponentMetrics(component, level);
  }

  /**
   * Get impact metrics
   */
  public getImpactMetrics(component: CIAComponentType, level: SecurityLevel) {
    return this.securityMetricsService.getImpactMetrics(component, level);
  }

  /**
   * Get security resources
   */
  public getSecurityResources(
    component: CIAComponentType,
    level: SecurityLevel
  ) {
    return this.securityResourceService.getSecurityResources(component, level);
  }

  /**
   * Get security level description
   */
  public getSecurityLevelDescription(level: SecurityLevel) {
    return this.securityMetricsService.getSecurityLevelDescription(level);
  }

  /**
   * Get protection level
   */
  public getProtectionLevel(level: SecurityLevel) {
    return this.securityMetricsService.getProtectionLevel(level);
  }

  /**
   * Calculate business impact level based on security levels
   * 
   * @param availabilityLevel - Availability security level
   * @param integrityLevel - Integrity security level (optional, defaults to availabilityLevel)
   * @param confidentialityLevel - Confidentiality security level (optional, defaults to availabilityLevel)
   * @returns Business impact level description
   */
  public calculateBusinessImpactLevel(
    availabilityLevel: SecurityLevel,
    integrityLevel: SecurityLevel = availabilityLevel,
    confidentialityLevel: SecurityLevel = availabilityLevel
  ): string {
    // Call the business impact service with all three parameters
    return this.businessImpactService.calculateBusinessImpactLevel(
      availabilityLevel,
      integrityLevel,
      confidentialityLevel
    );
  }

  /**
   * Get risk badge variant
   */
  public getRiskBadgeVariant(riskLevel: string) {
    return this.securityMetricsService.getRiskBadgeVariant(riskLevel);
  }

  /**
   * Get category icon
   */
  public getCategoryIcon(category: string) {
    return this.businessImpactService.getCategoryIcon(category);
  }

  /**
   * Get value points
   */
  public getValuePoints(level: SecurityLevel) {
    return this.securityResourceService.getValuePoints(level);
  }

  /**
   * Get implementation considerations for the given CIA levels.
   * 
   * @param levels - Tuple containing exactly three security levels in order: [availability, integrity, confidentiality]
   * @returns String with implementation considerations
   */
  public getImplementationConsiderations(levels: [SecurityLevel, SecurityLevel, SecurityLevel]): string {
    // Validate parameters
    if (!levels || !Array.isArray(levels) || levels.length !== 3) {
      return "Invalid security levels provided. Please provide an array with exactly three security levels.";
    }
    
    // Delegate to the technical implementation service
    return this.technicalImplementationService.getImplementationConsiderations(levels);
  }

  /**
   * Get security icon
   */
  public getSecurityIcon(level: SecurityLevel) {
    return this.securityMetricsService.getSecurityIcon(level);
  }

  /**
   * Get compliant frameworks
   */
  public getCompliantFrameworks(level: SecurityLevel): string[] {
    // Fix: Pass the same level to all three parameters
    return this.complianceService.getCompliantFrameworks(level, level, level);
  }

  /**
   * Get framework description
   */
  public getFrameworkDescription(framework: string) {
    return this.complianceService.getFrameworkDescription(framework);
  }

  /**
   * Get framework required level for a component
   */
  public getFrameworkRequiredLevel(
    component: CIAComponentType,
    level: SecurityLevel
  ): string {
    // Use all security levels for a more comprehensive evaluation
    const availability = level;
    const integrity = level;
    const confidentiality = level;
    
    const status = this.complianceService.getComplianceStatus(
      availability,
      integrity,
      confidentiality
    );

    if (status.compliantFrameworks.length > 0 && status.nonCompliantFrameworks.length === 0) {
      return `Current ${level} level meets requirements for most frameworks`;
    } else if (status.partiallyCompliantFrameworks.length > 0) {
      return `Current ${level} level partially meets requirements; consider upgrading to ${
        level === "Low" ? "Moderate" : "High"
      } for full compliance`;
    } else {
      return `Current ${level} level is insufficient; upgrade to at least ${
        level === "None" ? "Low" : level === "Low" ? "Moderate" : "High"
      } for basic compliance`;
    }
  }

  /**
   * Get implementation time
   */
  public getImplementationTime(level: SecurityLevel) {
    return this.technicalImplementationService.getImplementationTime(level);
  }

  /**
   * Get total implementation time for combined security levels
   */
  public getTotalImplementationTime(
    availabilityLevel: SecurityLevel,
    integrityLevel: SecurityLevel,
    confidentialityLevel: SecurityLevel
  ): string {
    // Convert individual implementation times to a rough time estimate
    const timeMapping: Record<SecurityLevel, number> = {
      None: 0,
      Low: 2, // 2 weeks
      Moderate: 6, // 6 weeks
      High: 12, // 12 weeks
      "Very High": 24, // 24 weeks
    };

    const totalWeeks =
      timeMapping[availabilityLevel] +
      timeMapping[integrityLevel] +
      timeMapping[confidentialityLevel];

    // Apply a reduction factor for parallel implementation (roughly 40% reduction)
    const adjustedWeeks = Math.round(totalWeeks * 0.6);

    if (adjustedWeeks <= 0) return "No implementation required";
    if (adjustedWeeks <= 4) return `${adjustedWeeks} weeks`;
    if (adjustedWeeks <= 12)
      return `${Math.round(adjustedWeeks / 4)} to ${
        Math.round(adjustedWeeks / 4) + 1
      } months`;
    return `${Math.round(adjustedWeeks / 4)} to ${
      Math.round(adjustedWeeks / 4) + 2
    } months`;
  }

  /**
   * Get required expertise based on selected security levels
   */
  public getRequiredExpertise(
    availabilityLevel: SecurityLevel,
    integrityLevel: SecurityLevel,
    confidentialityLevel: SecurityLevel
  ): string {
    // Get maximum security level
    const levels = [availabilityLevel, integrityLevel, confidentialityLevel];
    const maxLevel = levels.sort((a, b) => {
      const order = { None: 0, Low: 1, Moderate: 2, High: 3, "Very High": 4 };
      return order[b as SecurityLevel] - order[a as SecurityLevel];
    })[0];

    // Return expertise based on maximum level
    switch (maxLevel) {
      case "None":
        return "No special expertise required";
      case "Low":
        return "IT staff with basic security knowledge";
      case "Moderate":
        return "Security professional with domain expertise";
      case "High":
        return "Senior security engineer or architect";
      case "Very High":
        return "Expert security team with specialized skills";
      default:
        return "Unknown expertise level";
    }
  }

  /**
   * Get recommended implementation plan based on selected security levels
   */
  public getRecommendedImplementationPlan(
    availabilityLevel: SecurityLevel,
    integrityLevel: SecurityLevel,
    confidentialityLevel: SecurityLevel
  ): string {
    // Create a phased implementation plan based on current security levels
    const phases = [];

    // Phase 1: Implement the lowest hanging fruit
    if (
      availabilityLevel === "None" ||
      integrityLevel === "None" ||
      confidentialityLevel === "None"
    ) {
      phases.push(
        "Phase 1: Implement basic security controls to eliminate 'None' security levels"
      );
    } else if (
      availabilityLevel === "Low" ||
      integrityLevel === "Low" ||
      confidentialityLevel === "Low"
    ) {
      phases.push(
        "Phase 1: Upgrade basic security controls from 'Low' to at least 'Moderate' level"
      );
    } else {
      phases.push(
        "Phase 1: Maintain current baseline security controls and perform regular security assessments"
      );
    }

    // Phase 2: Focus on the most critical component with the lowest security level
    const levels = [
      { component: "Availability", level: availabilityLevel },
      { component: "Integrity", level: integrityLevel },
      { component: "Confidentiality", level: confidentialityLevel },
    ];

    // Sort to find the lowest security level
    levels.sort((a, b) => {
      const order = { None: 0, Low: 1, Moderate: 2, High: 3, "Very High": 4 };
      return order[a.level as SecurityLevel] - order[b.level as SecurityLevel];
    });

    const lowestComponent = levels[0];
    if (lowestComponent.level !== "Very High") {
      const targetLevel =
        lowestComponent.level === "None"
          ? "Low"
          : lowestComponent.level === "Low"
          ? "Moderate"
          : lowestComponent.level === "Moderate"
          ? "High"
          : "Very High";

      phases.push(
        `Phase 2: Prioritize upgrading ${lowestComponent.component} controls to ${targetLevel} level`
      );
    }

    // Phase 3: Long-term improvement plan
    const highestNeeded = Math.min(
      levels[levels.length - 1].level === "Very High" ? 4 : 3,
      4
    );
    const highestLevel = ["None", "Low", "Moderate", "High", "Very High"][
      highestNeeded
    ];

    phases.push(
      `Phase 3: Develop a roadmap to systematically enhance all security controls to at least ${highestLevel} level`
    );

    return phases.join("\n\n");
  }

  /**
   * Get information sensitivity classification for a security level
   *
   * @param level Security level
   * @returns Information sensitivity classification
   */
  getInformationSensitivity(level: SecurityLevel): string {
    switch (level) {
      case "None":
        return "Public Data";
      case "Low":
        return "Internal Data";
      case "Moderate":
        return "Sensitive Data";
      case "High":
        return "Confidential Data";
      case "Very High":
        return "Restricted Data";
      default:
        return "Unknown";
    }
  }
}

// Create a default service instance
const defaultService = new CIAContentService();

// Export default service instance
export default defaultService;

/**
 * Create a CIA content service with the specified data provider
 *
 * @param dataProvider - Optional data provider for CIA options
 * @returns A new CIAContentService instance
 */
export function createCIAContentService(
  dataProvider?: CIADataProvider
): CIAContentService {
  // Use provided data provider or create a default one
  const provider: CIADataProvider = dataProvider || {
    availabilityOptions: availabilityOptions,
    integrityOptions: integrityOptions,
    confidentialityOptions: confidentialityOptions,
    roiEstimates: ROI_ESTIMATES,
    getDefaultSecurityIcon: getDefaultSecurityIconImpl,
    getDefaultValuePoints: getDefaultValuePointsImpl,
  };

  // Create service instance
  const service: CIAContentService = new CIAContentService(provider);

  return service;
}

// Export helper functions for direct use
export const getInformationSensitivity = (level: SecurityLevel): string => {
  switch (level) {
    case "None":
      return "Public Data";
    case "Low":
      return "Internal Data";
    case "Moderate":
      return "Sensitive Data";
    case "High":
      return "Confidential Data";
    case "Very High":
      return "Restricted Data";
    default:
      return "Unknown";
  }
};

export const getRiskBadgeVariant = defaultService.getRiskBadgeVariant;
export const getValuePoints = defaultService.getValuePoints;

// Export for use with security ROI calculations
export function getROIEstimate(level: SecurityLevel): ROIEstimate {
  const roiEstimatesMap: ROIEstimatesMap = {
    NONE: { returnRate: "0%", value: "Negative", description: "Negative ROI" },
    LOW: { returnRate: "50%", value: "50%", description: "Low ROI" },
    MODERATE: {
      returnRate: "150%",
      value: "150%",
      description: "Moderate ROI",
    },
    HIGH: { returnRate: "250%", value: "250%", description: "High ROI" },
    VERY_HIGH: {
      returnRate: "400%",
      value: "400%",
      description: "Very High ROI",
    },
  };

  const key = securityLevelToROIKey(level);
  return roiEstimatesMap[key];
}

/**
 * Calculate ROI metrics based on security level and implementation cost
 */
export function calculateROI(
  level: SecurityLevel,
  implementationCost: number
): ROIMetrics {
  // Get the ROI percentage from the estimate
  const roiEstimate = getROIEstimate(level);
  const roiPercentage =
    parseInt(roiEstimate.returnRate.replace("%", ""), 10) || 0;

  // Calculate the absolute ROI value
  const roiValue =
    implementationCost > 0 ? implementationCost * (roiPercentage / 100) : 0;

  // Return the metrics object
  return {
    value: formatCurrency(roiValue),
    percentage: `${roiPercentage}%`,
    description: getROIDescription(level),
  };
}

/**
 * Default implementation for getting security icon
 */
function getDefaultSecurityIconImpl(level: SecurityLevel): string {
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
      return "ℹ️";
  }
}

/**
 * Default implementation for getting value points
 */
function getDefaultValuePointsImpl(level: SecurityLevel): string[] {
  const valuePoints = {
    None: [
      "No security value creation",
      "Maximum exposure to security risks",
      "No protection for business assets or data",
      "Non-compliance with regulatory requirements",
      "Significant business risk with no mitigation",
    ],
    Low: [
      "Basic security foundation established",
      "Minimal protection against common threats",
      "Some risk reduction for non-critical systems",
      "First step toward regulatory compliance",
      "Limited business enablement for non-sensitive operations",
    ],
    Moderate: [
      "Standard security posture established",
      "Balanced protection for business operations",
      "Meets basic requirements for most business activities",
      "Enables operations in moderately regulated environments",
      "Reasonable risk management for business continuity",
    ],
    High: [
      "Strong security posture that enables business confidence",
      "Robust protection for sensitive data and operations",
      "Supports expansion into regulated industries",
      "Enhances reputation with security-conscious customers",
      "Significant risk reduction with measurable business value",
    ],
    "Very High": [
      "Maximum security enabling operations in highly regulated environments",
      "Comprehensive protection for critical business assets",
      "Competitive advantage through superior security capabilities",
      "Strategic enabler for high-value and high-risk business activities",
      "Meets the most stringent customer and regulatory requirements",
    ],
  };

  return valuePoints[level] || [];
}

// Export types
export type { BusinessImpactDetails, TechnicalImplementationDetails };
