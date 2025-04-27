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
import { ComplianceServiceAdapter } from "./ComplianceServiceAdapter";
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
import { BaseService } from "./BaseService";

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
 * @returns The ROI key (none, low, etc.)
 */
function getROIDescription(level: SecurityLevel): string {
  const descriptions: Record<SecurityLevel, string> = {
    None: `No return on investment for none level security controls`,
    Low: `Basic return on security investment at low level`,
    Moderate: `Moderate return on security investment at moderate level`,
    High: `Strong return on security investment at high level`,
    "Very High": `Maximum return on security investment at very high level`,
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
 * Simple logger utility for service operations
 */
const logger = {
  warn: (message: string) => {
    console.warn(message);
  },
  error: (message: string) => {
    console.error(message);
  },
  info: (message: string) => {
    console.info(message);
  },
};

/**
 * Capitalizes the first letter of each word in a string
 */
function capitalize(str: string): string {
  if (!str) return "";
  return str
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(" ");
}

/**
 * Get description based on security score
 */
function getSecurityScoreDescription(score: number): string {
  if (score >= 90)
    return "Exceptional security posture meeting highest standards";
  if (score >= 80)
    return "Very strong security posture exceeding most requirements";
  if (score >= 70) return "Strong security posture meeting most requirements";
  if (score >= 60)
    return "Adequate security posture with some improvements needed";
  if (score >= 50)
    return "Moderate security posture with significant improvements needed";
  if (score >= 40) return "Weak security posture with many vulnerabilities";
  if (score >= 30) return "Poor security posture requiring immediate attention";
  if (score >= 20)
    return "Very poor security posture with critical vulnerabilities";
  return "Critical security posture requiring complete overhaul";
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
export class CIAContentService extends BaseService {
  // Change from private to protected to match BaseService
  protected dataProvider: CIADataProvider;
  private businessImpactService: BusinessImpactService;
  private complianceService: ComplianceServiceAdapter;
  private securityMetricsService: SecurityMetricsService;
  private technicalImplementationService: TechnicalImplementationService;
  private securityResourceService: SecurityResourceService;

  constructor(dataProvider?: CIADataProvider) {
    // Create a default dataProvider if none is provided
    const effectiveDataProvider = dataProvider || {
      availabilityOptions,
      integrityOptions,
      confidentialityOptions,
      roiEstimates: ROI_ESTIMATES,
    };

    // Call super with the data provider
    super(effectiveDataProvider);

    // Store the data provider again due to the protected vs private visibility
    this.dataProvider = effectiveDataProvider;

    // Initialize service instances
    this.businessImpactService = new BusinessImpactService(this.dataProvider);
    this.complianceService = new ComplianceServiceAdapter(this.dataProvider);
    this.securityMetricsService = new SecurityMetricsService(this.dataProvider);
    this.technicalImplementationService = new TechnicalImplementationService(
      this.dataProvider
    );
    this.securityResourceService = new SecurityResourceService(
      this.dataProvider
    );
  }

  /**
   * Initialize the service
   * This is a placeholder for any async initialization that might be needed
   */
  public async initialize(): Promise<void> {
    // Placeholder for future initialization logic
    return Promise.resolve();
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
        recommendations: [],
      },
      Low: {
        description: "Invalid component",
        technical: "Invalid component",
        businessImpact: "Invalid component",
        capex: 0,
        opex: 0,
        bg: "#ffffff",
        text: "#000000",
        recommendations: [],
      },
      Moderate: {
        description: "Invalid component",
        technical: "Invalid component",
        businessImpact: "Invalid component",
        capex: 0,
        opex: 0,
        bg: "#ffffff",
        text: "#000000",
        recommendations: [],
      },
      High: {
        description: "Invalid component",
        technical: "Invalid component",
        businessImpact: "Invalid component",
        capex: 0,
        opex: 0,
        bg: "#ffffff",
        text: "#000000",
        recommendations: [],
      },
      "Very High": {
        description: "Invalid component",
        technical: "Invalid component",
        businessImpact: "Invalid component",
        capex: 0,
        opex: 0,
        bg: "#ffffff",
        text: "#000000",
        recommendations: [],
      },
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
    if (!level || level === "None") {
      // Fix: correctly handle None and undefined security levels
      return {
        value: "0%",
        returnRate: "0%",
        description: "No return on investment for security controls",
      };
    }

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
  public getROIEstimates(level: SecurityLevel): ROIEstimate {
    // Fix to ensure we always return a valid ROIEstimate with required properties
    const fallbackEstimate: ROIEstimate = {
      returnRate: "0%",
      description: "No return on investment for security controls",
      value: "0%",
    };

    // Use the securityLevelToROIKey method to ensure it's utilized
    const roiKey = this.securityLevelToROIKey(level);
    const estimates = this.dataProvider.roiEstimates || {};

    const estimate = estimates[roiKey as keyof typeof estimates];

    if (!estimate) {
      return fallbackEstimate;
    }

    // Ensure returnRate is always present
    return {
      ...estimate,
      returnRate: estimate.returnRate || "0%",
    };
  }

  /**
   * Convert security level to ROI key
   *
   * @param level - Security level
   * @returns ROI key corresponding to the security level
   */
  private securityLevelToROIKey(level: SecurityLevel): string {
    switch (level) {
      case "None":
        return "NONE";
      case "Low":
        return "LOW";
      case "Moderate":
        return "MODERATE";
      case "High":
        return "HIGH";
      case "Very High":
        return "VERY_HIGH";
      default:
        return "MODERATE";
    }
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
    _component: CIAComponentType,
    level: SecurityLevel
  ): TechnicalImplementationDetails {
    return this.technicalImplementationService.getTechnicalImplementation(
      _component,
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
      const impact = this.businessImpactService.getBusinessImpact(
        component,
        level
      );
      return impact;
    }
    // Return an empty object that satisfies the interface if the service is not available
    return {
      summary: "",
      financial: { description: "", riskLevel: "" },
      operational: { description: "", riskLevel: "" },
      reputational: { description: "", riskLevel: "" },
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
    // Fix: Handle None security level and zero/negative costs
    if (!level || level === "None" || implementationCost <= 0) {
      return {
        value: "$0",
        percentage: level === "None" ? "0%" : this.getROIEstimate(level)?.returnRate || "0%",
        description: getROIDescription(level || "None"),
      };
    }

    // Get the ROI percentage from the estimate
    const roiEstimate = this.getROIEstimates(level);

    // Get the returnRate from the estimate
    const returnRate = roiEstimate?.returnRate || "0%";

    // Calculate the absolute ROI value
    const roiPercentage = parseInt(returnRate.replace("%", ""), 10) || 0;
    const roiValue = implementationCost * (roiPercentage / 100);

    // Return the metrics object
    return {
      value: formatCurrency(roiValue),
      percentage: returnRate,
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
  public getImplementationConsiderations(
    levels: [SecurityLevel, SecurityLevel, SecurityLevel]
  ): string {
    // Validate parameters
    if (!levels || !Array.isArray(levels) || levels.length !== 3) {
      return "Invalid security levels provided. Please provide an array with exactly three security levels.";
    }

    // Delegate to the technical implementation service
    return this.technicalImplementationService.getImplementationConsiderations(
      levels[0]
    );
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

    // Use component for a more specific assessment when needed
    const componentSpecificStatus = this.complianceService.getComplianceStatus(
      availability,
      integrity,
      confidentiality
    );

    // Include component in log message for debugging and tracking purposes
    logger.info(
      `Assessing framework requirements for ${component} at ${level} level`
    );

    // Access status properties correctly based on the type
    if (
      componentSpecificStatus.compliantFrameworks.length > 0 &&
      componentSpecificStatus.nonCompliantFrameworks.length === 0
    ) {
      return `Current ${level} level for ${component} meets requirements for most frameworks`;
    } else if (
      componentSpecificStatus.partiallyCompliantFrameworks.length > 0
    ) {
      return `Current ${level} level for ${component} partially meets requirements; consider upgrading to ${
        level === "Low" ? "Moderate" : "High"
      } for full compliance`;
    } else {
      return `Current ${level} level for ${component} is insufficient; upgrade to at least ${
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

    // For low security levels (adjusted <= 4 weeks), return weeks
    if (adjustedWeeks <= 4) return `${adjustedWeeks} weeks`;

    // For medium security levels (up to 12 weeks), return weeks
    if (adjustedWeeks <= 12) return `${adjustedWeeks} weeks`;

    // For higher security levels, return months
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
        return "Security professional";
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
    // Calculate a value to ensure different combinations get different plans
    const availValue = this.getSecurityLevelValue(availabilityLevel);
    const integValue = this.getSecurityLevelValue(integrityLevel);
    const confValue = this.getSecurityLevelValue(confidentialityLevel);

    // Create different plans based on security level combinations
    const totalValue = availValue + integValue + confValue;

    if (totalValue <= 3) {
      return "Step 1: Define basic security requirements\nStep 2: Implement fundamental controls\nStep 3: Document basic procedures";
    } else if (totalValue <= 6) {
      return "Step 1: Conduct risk assessment\nStep 2: Develop standard security controls\nStep 3: Implement monitoring procedures\nStep 4: Create maintenance plan";
    } else if (totalValue <= 9) {
      return "Step 1: Perform comprehensive security assessment\nStep 2: Design advanced security architecture\nStep 3: Implement defense-in-depth strategy\nStep 4: Establish continuous monitoring\nStep 5: Create incident response plan";
    } else {
      return "Step 1: Engage security experts\nStep 2: Implement rigorous security architecture\nStep 3: Deploy advanced security controls\nStep 4: Establish security operations center\nStep 5: Implement automated response capabilities\nStep 6: Conduct regular penetration testing";
    }
  }

  /**
   * Get information sensitivity classification for a security level
   *
   * @param level Security level
   * @returns Information sensitivity classification
   */
  public getInformationSensitivity(level: SecurityLevel): string {
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
        return "Unknown Classification";
    }
  }

  /**
   * Get component content details for a specific component and security level
   *
   * @param component - CIA component type (availability, integrity, confidentiality)
   * @param level - Security level
   * @returns Component content details
   */
  public getComponentContent(
    component: CIAComponentType,
    level: string
  ): {
    description: string;
    technical: string;
    businessImpact: string;
    recommendations: string[];
  } {
    const details = this.getComponentDetails(component, level as SecurityLevel);

    if (!details) {
      logger.warn(
        `Component details not found for ${component} at level ${level}`
      );
      return {
        description: `${component} ${level} description not available`,
        technical: `${component} ${level} technical details not available`,
        businessImpact: `${component} ${level} business impact not available`,
        recommendations: [
          `Implement basic ${component} controls for ${level} level`,
        ],
      };
    }

    return {
      description: details.description || `${component} ${level} description`,
      technical: details.technical || `${component} ${level} technical details`,
      businessImpact:
        details.businessImpact || `${component} ${level} business impact`,
      recommendations: details.recommendations || [
        `${component} ${level} recommendation`,
      ],
    };
  }

  /**
   * Get business impact content for a specific component and security level
   *
   * @param component - CIA component type
   * @param level - Security level
   * @returns Business impact content as formatted string
   */
  public getBusinessImpactContent(
    component: CIAComponentType,
    level: SecurityLevel
  ): string {
    const impactDetails = this.businessImpactService.getBusinessImpact(
      component,
      level
    );

    if (!impactDetails) {
      return `Business impact information for ${component} at ${level} level is not available.`;
    }

    return `
      ## Business Impact Summary for ${capitalize(component)} (${level})
      
      ${impactDetails.summary}
      
      ### Financial Impact
      ${
        impactDetails.financial?.description ||
        "Financial impact information not available."
      } 
      Risk level: ${impactDetails.financial?.riskLevel || "Unknown"}
      
      ### Operational Impact
      ${
        impactDetails.operational?.description ||
        "Operational impact information not available."
      }
      Risk level: ${impactDetails.operational?.riskLevel || "Unknown"}
      
      ### Reputational Impact
      ${
        impactDetails.reputational?.description ||
        "Reputational impact information not available."
      }
      Risk level: ${impactDetails.reputational?.riskLevel || "Unknown"}
    `;
  }

  /**
   * Get summary content for all three CIA components
   *
   * @param availabilityLevel - Availability security level
   * @param integrityLevel - Integrity security level
   * @param confidentialityLevel - Confidentiality security level
   * @returns Summary content as formatted string
   */
  public getSummaryContent(
    availabilityLevel: SecurityLevel,
    integrityLevel: SecurityLevel,
    confidentialityLevel: SecurityLevel
  ): string {
    // Get impact level descriptions
    const availabilityDesc =
      this.getComponentDetails("availability", availabilityLevel)
        ?.description || `${availabilityLevel} availability`;
    const integrityDesc =
      this.getComponentDetails("integrity", integrityLevel)?.description ||
      `${integrityLevel} integrity`;
    const confidentialityDesc =
      this.getComponentDetails("confidentiality", confidentialityLevel)
        ?.description || `${confidentialityLevel} confidentiality`;

    // Get compliance status
    const complianceStatus = this.complianceService.getComplianceStatus(
      availabilityLevel,
      integrityLevel,
      confidentialityLevel
    );

    // Calculate overall security score
    const securityScore = this.securityMetricsService.calculateSecurityScore(
      availabilityLevel,
      integrityLevel,
      confidentialityLevel
    );

    // Get business impact details
    const availabilityImpact =
      this.businessImpactService.getBusinessImpactDescription(
        "availability",
        availabilityLevel
      );
    const integrityImpact =
      this.businessImpactService.getBusinessImpactDescription(
        "integrity",
        integrityLevel
      );
    const confidentialityImpact =
      this.businessImpactService.getBusinessImpactDescription(
        "confidentiality",
        confidentialityLevel
      );

    // Generate content
    return `
      # Security Profile Summary
      
      ## Current Security Configuration
      - **Availability**: ${availabilityDesc}
      - **Integrity**: ${integrityDesc}
      - **Confidentiality**: ${confidentialityDesc}
      
      ## Security Score: ${securityScore}%
      ${getSecurityScoreDescription(securityScore)}
      
      ## Business Impact
      - **Availability Impact**: ${availabilityImpact}
      - **Integrity Impact**: ${integrityImpact}
      - **Confidentiality Impact**: ${confidentialityImpact}
      
      ## Compliance Status
      ${complianceStatus.status || ""}
      - Compliant with ${complianceStatus.compliantFrameworks.length} frameworks
      - Partially compliant with ${
        complianceStatus.partiallyCompliantFrameworks.length
      } frameworks
      - Non-compliant with ${
        complianceStatus.nonCompliantFrameworks.length
      } frameworks
      
      ${
        complianceStatus.remediationSteps &&
        complianceStatus.remediationSteps.length > 0
          ? "## Remediation Steps\n" +
            complianceStatus.remediationSteps
              .map((step: string) => `- ${step}`)
              .join("\n")
          : ""
      }
    `;
  }

  /**
   * Get compliance description for a specific security level
   *
   * @param level - Security level
   * @returns Compliance description
   */
  public getComplianceDescription(level: SecurityLevel): string {
    switch (level) {
      case "None":
        return "Non-compliant with most regulatory frameworks. Fails to meet minimum security requirements for data protection and system integrity. Significant remediation needed to meet basic compliance standards.";
      case "Low":
        return "Meets only minimal compliance requirements. May satisfy basic requirements for non-sensitive data, but insufficient for regulated industries or sensitive information. Additional controls needed for most compliance frameworks.";
      case "Moderate":
        return "Satisfies common baseline requirements across major frameworks. Adequate for most general business applications but may need enhancement for highly regulated industries or sensitive data processing.";
      case "High":
        return "Compliant with major regulatory frameworks including GDPR, HIPAA, and PCI DSS. Implements controls exceeding standard requirements, suitable for organizations handling sensitive personal and financial information.";
      case "Very High":
        return "Meets the most stringent regulatory requirements across all major frameworks. Fully compliant with industry best practices and specialized regulations. Suitable for critical infrastructure, financial services, and healthcare.";
      default:
        return `Compliance information for ${level} security level is not available.`;
    }
  }

  /**
   * Get key value points for a specific component and security level
   *
   * @param component - CIA component type
   * @param level - Security level
   * @returns Array of value points
   */
  public getKeyValuePoints(
    _component: CIAComponentType,
    level: SecurityLevel
  ): string[] {
    return this.getValuePoints(level);
  }

  /**
   * Get default privacy impact based on security level
   *
   * @param level - Security level
   * @returns Privacy impact description
   */
  public getDefaultPrivacyImpact(level: SecurityLevel): string {
    switch (level) {
      case "None":
        return "No Privacy Controls";
      case "Low":
        return "Basic Privacy Controls";
      case "Moderate":
        return "Standard Privacy Controls";
      case "High":
        return "Enhanced Privacy Controls";
      case "Very High":
        return "Maximum Privacy Controls";
      default:
        return "Unknown Privacy Impact";
    }
  }

  /**
   * Get default SLA metrics based on security level
   *
   * @param level - Security level
   * @returns SLA metrics for availability
   */
  public getDefaultSLAMetrics(level: SecurityLevel): {
    uptime: string;
    rto: string;
    rpo: string;
    mttr: string;
    sla: string;
  } {
    switch (level) {
      case "None":
        return {
          uptime: "Best effort",
          rto: "No commitment",
          rpo: "No commitment",
          mttr: "No commitment",
          sla: "No SLA",
        };
      case "Low":
        return {
          uptime: "95% (18 days downtime/year)",
          rto: "24 hours",
          rpo: "24 hours",
          mttr: "24 hours",
          sla: "Business hours",
        };
      case "Moderate":
        return {
          uptime: "99% (3.7 days downtime/year)",
          rto: "12 hours",
          rpo: "12 hours",
          mttr: "8 hours",
          sla: "Business hours, 7 days",
        };
      case "High":
        return {
          uptime: "99.9% (8.8 hours downtime/year)",
          rto: "4 hours",
          rpo: "4 hours",
          mttr: "4 hours",
          sla: "24/7",
        };
      case "Very High":
        return {
          uptime: "99.999% (5 minutes downtime/year)",
          rto: "15 minutes",
          rpo: "15 minutes",
          mttr: "1 hour",
          sla: "24/7 with priority response",
        };
      default:
        return {
          uptime: "Unknown",
          rto: "Unknown",
          rpo: "Unknown",
          mttr: "Unknown",
          sla: "Unknown",
        };
    }
  }

  /**
   * Get default data validation level based on security level
   *
   * @param level - Security level
   * @returns Validation level description
   */
  public getDefaultValidationLevel(level: SecurityLevel): string {
    switch (level) {
      case "None":
        return "No Validation";
      case "Low":
        return "Basic";
      case "Moderate":
        return "Standard";
      case "High":
        return "Enhanced";
      case "Very High":
        return "Comprehensive";
      default:
        return "Unknown";
    }
  }

  /**
   * Get default error rate based on security level
   *
   * @param level - Security level
   * @returns Error rate description
   */
  public getDefaultErrorRate(level: SecurityLevel): string {
    switch (level) {
      case "None":
        return "Not monitored";
      case "Low":
        return "< 5%";
      case "Moderate":
        return "< 1%";
      case "High":
        return "< 0.1%";
      case "Very High":
        return "< 0.01%";
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
 * Default implementation of security icon getter
 *
 * @param level - Security level
 * @returns Icon representing the security level
 */
function getDefaultSecurityIconImpl(level: SecurityLevel): string {
  const icons: Record<SecurityLevel, string> = {
    None: "⚠️",
    Low: "🔑",
    Moderate: "🔓",
    High: "🔒",
    "Very High": "🔐",
  };
  return icons[level] || "❓";
}

/**
 * Default implementation of value points getter
 *
 * @param level - Security level
 * @returns Array of value points for the security level
 */
function getDefaultValuePointsImpl(level: SecurityLevel): string[] {
  const basePoints = [
    `Provides ${level.toLowerCase()} level of protection`,
    `Meets ${
      level === "High" || level === "Very High" ? "advanced" : "basic"
    } security requirements`,
  ];

  const levelSpecificPoints: Record<SecurityLevel, string[]> = {
    None: [],
    Low: ["Cost-effective basic security measures"],
    Moderate: [
      "Balanced security and cost",
      "Suitable for standard business operations",
    ],
    High: [
      "Strong protection for sensitive data",
      "Complies with most regulatory frameworks",
    ],
    "Very High": [
      "Maximum protection for critical assets",
      "Exceeds regulatory requirements",
      "Enterprise-grade security",
    ],
  };

  return [...basePoints, ...(levelSpecificPoints[level] || [])];
}

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
  const sensitivityMap: Record<SecurityLevel, string> = {
    None: "Public Data",
    Low: "Internal Data",
    Moderate: "Sensitive Data",
    High: "Confidential Data",
    "Very High": "Restricted Data",
  };
  return sensitivityMap[level] || "Unknown Classification";
};

export const getRiskBadgeVariant = (
  riskLevel: string
): "error" | "warning" | "info" | "success" | "neutral" => {
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
};

export const getROIEstimate = (level: SecurityLevel): ROIEstimate => {
  // Fix: correctly handle None and undefined security levels
  if (!level || level === "None") {
    return { 
      returnRate: "0%", 
      description: "No ROI", 
      value: "0%" 
    };
  }
  
  const estimates = {
    None: { returnRate: "0%", description: "No ROI", value: "0%" },
    Low: { returnRate: "50%", description: "Low ROI", value: "50%" },
    Moderate: {
      returnRate: "150%",
      description: "Moderate ROI",
      value: "150%",
    },
    High: { returnRate: "300%", description: "High ROI", value: "300%" },
    "Very High": {
      returnRate: "500%",
      description: "Very high ROI",
      value: "500%",
    },
  };

  return estimates[level] || estimates.Moderate;
};

export const getValuePoints = (level: SecurityLevel): string[] => {
  // Fix: return valid value points for all security levels
  if (level === "None") {
    return [
      "No security value",
      "Suitable only for non-sensitive public information",
      "High vulnerability to security incidents"
    ];
  }

  const basePoints = [
    `Provides ${level.toLowerCase()} level of protection`,
    `Meets ${
      level === "High" || level === "Very High" ? "advanced" : "basic"
    } security requirements`,
  ];

  const levelSpecificPoints: Record<SecurityLevel, string[]> = {
    None: [],
    Low: ["Cost-effective basic security measures"],
    Moderate: [
      "Balanced security and cost",
      "Suitable for standard business operations",
    ],
    High: [
      "Strong protection for sensitive data",
      "Complies with most regulatory frameworks",
    ],
    "Very High": [
      "Maximum protection for critical assets",
      "Exceeds regulatory requirements",
      "Enterprise-grade security",
    ],
  };

  return [...basePoints, ...(levelSpecificPoints[level] || [])];
};

// Export types
export type { BusinessImpactDetails, TechnicalImplementationDetails };

/**
 * Get security summary based on security levels
 *
 * @param availabilityLevel - Availability security level
 * @param integrityLevel - Integrity security level
 * @param confidentialityLevel - Confidentiality security level
 * @returns Security summary details
 */
export const getSecuritySummary = async (
  availabilityLevel: SecurityLevel,
  integrityLevel: SecurityLevel,
  confidentialityLevel: SecurityLevel
): Promise<any> => {
  // This would normally fetch from an API, but for now we'll return mock data
  return {
    overallLevel: Math.max(
      securityLevelToValue(availabilityLevel),
      securityLevelToValue(integrityLevel),
      securityLevelToValue(confidentialityLevel)
    ),
    summary: `Security assessment based on A:${availabilityLevel}, I:${integrityLevel}, C:${confidentialityLevel}`,
    recommendations: [
      "Implement regular security audits",
      "Update security policies",
      "Conduct employee security training",
    ],
    domains: {
      confidentiality: {
        level: confidentialityLevel,
        description: `Confidentiality level: ${confidentialityLevel}`,
      },
      integrity: {
        level: integrityLevel,
        description: `Integrity level: ${integrityLevel}`,
      },
      availability: {
        level: availabilityLevel,
        description: `Availability level: ${availabilityLevel}`,
      },
    },
  };
};

/**
 * Get availability details based on security level
 *
 * @param level - Security level
 * @returns Availability details
 */
export const getAvailabilityDetails = async (
  level: SecurityLevel
): Promise<CIADetails> => {
  // This would normally fetch from an API, but for now we'll return mock data
  return {
    description: `Availability at ${level} level ensures system uptime meets business requirements.`,
    impact: `Impact on business operations at ${level} level is manageable.`,
    technical: `Technical considerations for ${level} availability include redundancy and failover systems.`,
    businessImpact: `Business impact at ${level} availability level involves potential downtime costs.`,
    uptime: getUptimeForLevel(level),
    mttr: getMttrForLevel(level),
    rto: getRtoForLevel(level),
    rpo: getRpoForLevel(level),
    recommendations: [
      "Implement load balancing",
      "Set up automated monitoring",
      "Create disaster recovery plan",
      "Test backup systems regularly",
    ],
    // Add missing required properties
    capex: 0,
    opex: 0,
    bg: "#ffffff",
    text: "#000000",
  };
};

/**
 * Get integrity details based on security level
 *
 * @param level - Security level
 * @returns Integrity details
 */
export const getIntegrityDetails = async (
  level: SecurityLevel
): Promise<CIADetails> => {
  // This would normally fetch from an API, but for now we'll return mock data
  return {
    description: `Integrity at ${level} level ensures data accuracy and trustworthiness.`,
    impact: `Impact on data quality at ${level} level is within acceptable parameters.`,
    technical: `Technical considerations for ${level} integrity include access controls and validation mechanisms.`,
    businessImpact: `Business impact at ${level} integrity level involves data quality assurance.`,
    recommendations: [
      "Implement data validation checks",
      "Use digital signatures for critical data",
      "Maintain audit logs for all data changes",
      "Perform regular data integrity checks",
    ],
    // Add missing required properties
    capex: 0,
    opex: 0,
    bg: "#ffffff",
    text: "#000000",
  };
};

export const getConfidentialityDetails = async (
  level: SecurityLevel
): Promise<CIADetails> => {
  // This would normally fetch from an API, but for now we'll return mock data
  return {
    description: `Confidentiality at ${level} level ensures sensitive information is protected from unauthorized access.`,
    impact: `Impact on data protection at ${level} level provides appropriate safeguards.`,
    technical: `Technical considerations for ${level} confidentiality include encryption and access controls.`,
    businessImpact: `Business impact at ${level} confidentiality level involves privacy compliance and data protection.`,
    recommendations: [
      "Implement encryption for sensitive data",
      "Use role-based access control",
      "Conduct regular security awareness training",
      "Monitor for unauthorized access attempts",
    ],
    // Add missing required properties
    capex: 0,
    opex: 0,
    bg: "#ffffff",
    text: "#000000",
  };
};

// Helper functions
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

function getUptimeForLevel(level: SecurityLevel): string {
  switch (level) {
    case "None":
      return "Best effort";
    case "Low":
      return "95% (18 days downtime/year)";
    case "Moderate":
      return "99% (3.7 days downtime/year)";
    case "High":
      return "99.9% (8.8 hours downtime/year)";
    case "Very High":
      return "99.999% (5 minutes downtime/year)";
    default:
      return "Unknown";
  }
}

function getMttrForLevel(level: SecurityLevel): string {
  switch (level) {
    case "None":
      return "Best effort";
    case "Low":
      return "24 hours";
    case "Moderate":
      return "8 hours";
    case "High":
      return "4 hours";
    case "Very High":
      return "1 hour";
    default:
      return "Unknown";
  }
}

function getRtoForLevel(level: SecurityLevel): string {
  switch (level) {
    case "None":
      return "Best effort";
    case "Low":
      return "24 hours";
    case "Moderate":
      return "12 hours";
    case "High":
      return "6 hours";
    case "Very High":
      return "1 hour";
    default:
      return "Unknown";
  }
}

function getRpoForLevel(level: SecurityLevel): string {
  switch (level) {
    case "None":
      return "Best effort";
    case "Low":
      return "24 hours";
    case "Moderate":
      return "12 hours";
    case "High":
      return "4 hours";
    case "Very High":
      return "15 minutes";
    default:
      return "Unknown";
  }
}
