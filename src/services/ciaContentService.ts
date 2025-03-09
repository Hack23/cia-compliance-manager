import {
  availabilityOptions,
  integrityOptions,
  confidentialityOptions,
  ROI_ESTIMATES,
  EnhancedCIADetails, // Add the missing import
} from "../hooks/useCIAOptions";
import { BusinessImpactDetail, CIADetails, SecurityLevel } from "../types/cia";
import { RISK_LEVELS } from "../constants/riskConstants";

/**
 * Enhanced interface for technical implementation details
 */
export interface TechnicalImplementationDetails {
  description: string;
  implementationSteps: string[];
  effort: {
    development: string;
    maintenance: string;
    expertise: string;
  };
  requirements?: string[];
  technologies?: string[];
  rto?: string; // Recovery Time Objective
  rpo?: string; // Recovery Point Objective
  mttr?: string; // Mean Time To Recovery
}

/**
 * Enhanced interface for business impact details
 */
export interface BusinessImpactDetails {
  summary: string;
  financial: {
    description: string;
    riskLevel: string;
    annualRevenueLoss?: string;
  };
  operational: {
    description: string;
    riskLevel: string;
    meanTimeToRecover?: string;
  };
  reputational?: {
    description: string;
    riskLevel: string;
  };
  strategic?: {
    description: string;
    riskLevel: string;
    competitiveAdvantage?: string;
  };
  regulatory?: {
    description: string;
    riskLevel: string;
    complianceImpact?: string;
  };
}

/**
 * Component type for CIA triad
 */
export type CIAComponentType = "availability" | "integrity" | "confidentiality";

/**
 * Type for ROI metrics with specific structure
 */
export interface ROIMetrics {
  returnRate: string;
  description: string;
  potentialSavings?: string;
  breakEvenPeriod?: string;
  implementationCost?: string;
}

/**
 * Type for ROI estimates by security level
 */
export type ROIEstimatesMap = Record<string, ROIMetrics>;

/**
 * Interface for CIA data source provider
 */
export interface CIADataProvider {
  availabilityOptions: Record<string, EnhancedCIADetails>; // Fix type
  integrityOptions: Record<string, EnhancedCIADetails>; // Fix type
  confidentialityOptions: Record<string, EnhancedCIADetails>; // Fix type
  roiEstimates: ROIEstimatesMap;
}

/**
 * Default CIA data provider that uses imported options
 */
const defaultDataProvider: CIADataProvider = {
  availabilityOptions,
  integrityOptions,
  confidentialityOptions,
  roiEstimates: ROI_ESTIMATES as unknown as ROIEstimatesMap,
};

/**
 * Create a CIA content service with dependency injection
 */
export function createCIAContentService(
  dataProvider: CIADataProvider = defaultDataProvider
) {
  /**
   * Get the base options for a CIA component
   */
  function getCIAOptions(
    component: CIAComponentType
  ): Record<string, EnhancedCIADetails> {
    // Fix return type
    switch (component) {
      case "availability":
        return dataProvider.availabilityOptions;
      case "integrity":
        return dataProvider.integrityOptions;
      case "confidentiality":
        return dataProvider.confidentialityOptions;
      default:
        return {};
    }
  }

  /**
   * Get component details for a specific level with strong typing
   */
  function getComponentDetails(
    component: CIAComponentType,
    level: SecurityLevel
  ): EnhancedCIADetails | undefined {
    // Fix return type
    // Validate input parameters
    if (!component || !level) {
      return undefined;
    }

    const options = getCIAOptions(component);
    return options[level];
  }

  /**
   * Get detailed technical implementation information
   */
  function getTechnicalImplementation(
    component: CIAComponentType,
    level: SecurityLevel
  ): TechnicalImplementationDetails {
    const details = getComponentDetails(component, level);

    // Default implementation if no details found
    if (!details) {
      return {
        description: "No technical implementation details available",
        implementationSteps: ["Consider implementing basic security controls"],
        effort: {
          development: "Minimal",
          maintenance: "None",
          expertise: "Basic",
        },
      };
    }

    // Use implementation steps directly from enhanced details
    return {
      description:
        details.technical ||
        `Standard ${component} controls for ${level} security level`,
      implementationSteps: details.implementationSteps || [],
      effort: details.effort || {
        development: "Not specified",
        maintenance: "Not specified",
        expertise: "Not specified",
      },
      rto: component === "availability" ? details.rto : undefined,
      rpo: component === "availability" ? details.rpo : undefined,
      mttr: component === "availability" ? details.mttr : undefined,
    };
  }

  /**
   * Get comprehensive business impact details
   */
  function getBusinessImpact(
    component: CIAComponentType,
    level: SecurityLevel
  ): BusinessImpactDetails {
    const details = getComponentDetails(component, level);

    // Default response if no details found
    if (!details) {
      return {
        summary: "No business impact details available",
        financial: {
          description: "Financial impact not specified",
          riskLevel: RISK_LEVELS.UNKNOWN,
        },
        operational: {
          description: "Operational impact not specified",
          riskLevel: RISK_LEVELS.UNKNOWN,
        },
      };
    }

    // Extract impact details from businessImpactDetails if available
    const impactDetails = details.businessImpactDetails || {};

    // Return structured business impact
    return {
      summary:
        details.businessImpact ||
        `Standard ${level} ${component} security impact`,
      financial: {
        description:
          impactDetails.financialImpact?.description ||
          "Financial impact not specified",
        riskLevel:
          impactDetails.financialImpact?.riskLevel || RISK_LEVELS.UNKNOWN,
        annualRevenueLoss: impactDetails.financialImpact?.annualRevenueLoss,
      },
      operational: {
        description:
          impactDetails.operationalImpact?.description ||
          "Operational impact not specified",
        riskLevel:
          impactDetails.operationalImpact?.riskLevel || RISK_LEVELS.UNKNOWN,
        meanTimeToRecover: impactDetails.operationalImpact?.meanTimeToRecover,
      },
      reputational: impactDetails.reputationalImpact && {
        description: impactDetails.reputationalImpact.description,
        riskLevel:
          impactDetails.reputationalImpact.riskLevel || RISK_LEVELS.UNKNOWN,
      },
      strategic: impactDetails.strategic && {
        description: impactDetails.strategic.description,
        riskLevel: impactDetails.strategic.riskLevel || RISK_LEVELS.UNKNOWN,
        competitiveAdvantage: undefined,
      },
      regulatory: impactDetails.regulatory && {
        description: impactDetails.regulatory.description,
        riskLevel: impactDetails.regulatory.riskLevel || RISK_LEVELS.UNKNOWN,
        complianceImpact: undefined,
      },
    };
  }

  /**
   * Get detailed component description with enhanced type safety
   */
  function getDetailedDescription(
    component: CIAComponentType,
    level: SecurityLevel
  ): string {
    // Validate input parameters
    if (!component || !level) {
      return "Invalid component or security level specified";
    }

    const details = getComponentDetails(component, level);
    return details?.description || `${level} ${component} controls`;
  }

  /**
   * Get business perspective information for a component and level
   */
  function getBusinessPerspective(
    component: CIAComponentType,
    level: SecurityLevel
  ): string {
    const details = getComponentDetails(component, level);
    return (
      details?.businessPerspective ||
      `No business perspective available for ${level} ${component}`
    );
  }

  /**
   * Get recommendations for a specific component and level
   * Always returns a string array, even when no recommendations are found
   */
  function getRecommendations(
    component: CIAComponentType,
    level: SecurityLevel
  ): string[] {
    const details = getComponentDetails(component, level);

    // If we have recommendations, return them
    if (details?.recommendations && Array.isArray(details.recommendations)) {
      return details.recommendations;
    }

    // Final fallback - empty array
    return [];
  }

  /**
   * Get ROI information for a security level with proper type handling
   */
  function getROIEstimates(level: SecurityLevel): ROIMetrics {
    const normalizedLevel = level.toUpperCase().replace(/\s+/g, "_");

    // Create a safer default ROI metrics object
    const defaultROI: ROIMetrics = {
      returnRate: "0%",
      description: "No ROI data available",
      potentialSavings: "N/A",
      breakEvenPeriod: "N/A",
    };

    // Use type assertion only after checking if the key exists
    const availableKeys = Object.keys(dataProvider.roiEstimates);
    const key = availableKeys.includes(normalizedLevel)
      ? normalizedLevel
      : "NONE";

    // Use nullish coalescing to provide a default if the key doesn't exist
    return dataProvider.roiEstimates[key] ?? defaultROI;
  }

  /**
   * Calculate ROI based on security levels with improved type safety
   */
  function calculateRoi(
    availabilityLevel: SecurityLevel,
    integrityLevel: SecurityLevel,
    confidentialityLevel: SecurityLevel
  ): string {
    // Define valid security levels
    const levels: readonly SecurityLevel[] = [
      "None",
      "Low",
      "Moderate",
      "High",
      "Very High",
    ];

    // Safely handle potentially invalid levels
    const safeGetIndex = (level: SecurityLevel): number => {
      const index = levels.indexOf(level);
      return index >= 0 ? index : 0; // Default to 0 (None) if level is invalid
    };

    const availIdx = safeGetIndex(availabilityLevel);
    const integrityIdx = safeGetIndex(integrityLevel);
    const confidentialityIdx = safeGetIndex(confidentialityLevel);

    const avgLevel = Math.round(
      (availIdx + integrityIdx + confidentialityIdx) / 3
    );
    const baseRoi = 100 + avgLevel * 75; // None: 100%, Low: 175%, Moderate: 250%, etc.

    return `${baseRoi}%`;
  }

  /**
   * Get combined metrics for a security profile
   */
  function getSecurityMetrics(
    availabilityLevel: SecurityLevel,
    integrityLevel: SecurityLevel,
    confidentialityLevel: SecurityLevel
  ) {
    const availDetail = getComponentDetails("availability", availabilityLevel);
    const integrityDetail = getComponentDetails("integrity", integrityLevel);
    const confidentialityDetail = getComponentDetails(
      "confidentiality",
      confidentialityLevel
    );

    const totalCapex =
      (availDetail?.capex || 0) +
      (integrityDetail?.capex || 0) +
      (confidentialityDetail?.capex || 0);

    const totalOpex =
      (availDetail?.opex || 0) +
      (integrityDetail?.opex || 0) +
      (confidentialityDetail?.opex || 0);

    return {
      totalCapex,
      totalOpex,
      capexEstimate: `$${totalCapex * 5000}`,
      opexEstimate: `$${totalOpex * 2000}/year`,
      isSmallSolution: totalCapex <= 60,
      roi: calculateRoi(
        availabilityLevel,
        integrityLevel,
        confidentialityLevel
      ),
    };
  }

  // Return the public service API
  return {
    getCIAOptions,
    getComponentDetails,
    getTechnicalImplementation,
    getBusinessImpact,
    getDetailedDescription,
    getBusinessPerspective,
    getRecommendations,
    getROIEstimates,
    getSecurityMetrics,
  };
}

// Create a default instance of the service for backward compatibility
const defaultService = createCIAContentService();

// Export the default instance
export default defaultService;
export const getBusinessImpact = defaultService.getBusinessImpact;
export const getDetailedDescription = defaultService.getDetailedDescription;
export const getBusinessPerspective = defaultService.getBusinessPerspective;
export const getRecommendations = defaultService.getRecommendations;
export const getROIEstimates = defaultService.getROIEstimates;
export const getSecurityMetrics = defaultService.getSecurityMetrics;
