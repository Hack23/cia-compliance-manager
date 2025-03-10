import {
  availabilityOptions,
  integrityOptions,
  confidentialityOptions,
  ROI_ESTIMATES,
  EnhancedCIADetails, // Add the missing import
} from "../hooks/useCIAOptions";
import { BusinessImpactDetail, CIADetails, SecurityLevel } from "../types/cia";
import { RISK_LEVELS } from "../constants/riskConstants";

// Add these interface definitions at the top of the file
interface SecurityResource {
  title: string;
  description: string;
  url: string;
  category: string;
  tags: string[];
  relevanceScore: number;
  type: string;
}

interface ComponentMetrics {
  financialImpact?: string;
  operationalImpact?: string;
  reputationalImpact?: string;
  regulatoryImpact?: string;
  uptime?: string;
  rto?: string;
  rpo?: string;
  mttr?: string;
  keyImpact?: string;
  metric?: string;
}

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

    // Use data from EnhancedCIADetails if available, otherwise use default values
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

  /**
   * Get compliance status based on CIA security levels
   */
  function getComplianceStatus(
    availabilityLevel: SecurityLevel,
    integrityLevel: SecurityLevel,
    confidentialityLevel: SecurityLevel
  ): {
    compliantFrameworks: string[];
    partiallyCompliantFrameworks: string[];
    nonCompliantFrameworks: string[];
    requirements?: string[];
    remediationSteps?: string[];
  } {
    const levelValues = {
      None: 0,
      Low: 1,
      Moderate: 2,
      High: 3,
      "Very High": 4,
    };

    const availValue = levelValues[availabilityLevel];
    const integValue = levelValues[integrityLevel];
    const confidValue = levelValues[confidentialityLevel];

    const totalScore = availValue + integValue + confidValue;

    // Determine compliance status based on total score
    let compliantFrameworks: string[] = [];
    let partiallyCompliantFrameworks: string[] = [];
    let nonCompliantFrameworks: string[] = [];

    // SOC2 compliance - requires moderate security in all areas
    if (availValue >= 2 && integValue >= 2 && confidValue >= 2) {
      compliantFrameworks.push("SOC2");
    } else if (availValue >= 1 && integValue >= 1 && confidValue >= 1) {
      partiallyCompliantFrameworks.push("SOC2");
    } else {
      nonCompliantFrameworks.push("SOC2");
    }

    // ISO27001 compliance - requires high security in at least one area
    if (availValue >= 3 || integValue >= 3 || confidValue >= 3) {
      compliantFrameworks.push("ISO27001");
    } else if (availValue >= 2 && integValue >= 2 && confidValue >= 2) {
      partiallyCompliantFrameworks.push("ISO27001");
    } else {
      nonCompliantFrameworks.push("ISO27001");
    }

    // PCI DSS - heavily focused on confidentiality
    if (confidValue >= 3 && integValue >= 2) {
      compliantFrameworks.push("PCI_DSS");
    } else if (confidValue >= 2) {
      partiallyCompliantFrameworks.push("PCI_DSS");
    } else {
      nonCompliantFrameworks.push("PCI_DSS");
    }

    // HIPAA - requires high on confidentiality and moderate on others
    if (confidValue >= 3 && availValue >= 2 && integValue >= 2) {
      compliantFrameworks.push("HIPAA");
    } else if (confidValue >= 2 && availValue >= 1 && integValue >= 1) {
      partiallyCompliantFrameworks.push("HIPAA");
    } else {
      nonCompliantFrameworks.push("HIPAA");
    }

    // NIST 800-53 High - requires high or very high on all
    if (availValue >= 3 && integValue >= 3 && confidValue >= 3) {
      compliantFrameworks.push("NIST");
    } else if (availValue >= 2 && integValue >= 2 && confidValue >= 2) {
      partiallyCompliantFrameworks.push("NIST");
    } else {
      nonCompliantFrameworks.push("NIST");
    }

    // Generate requirements and remediation steps
    const requirements = generateRequirements(compliantFrameworks);
    const remediationSteps = generateRemediationSteps(
      partiallyCompliantFrameworks,
      nonCompliantFrameworks
    );

    return {
      compliantFrameworks,
      partiallyCompliantFrameworks,
      nonCompliantFrameworks,
      requirements,
      remediationSteps,
    };
  }

  /**
   * Generate compliance requirements based on compliant frameworks
   */
  function generateRequirements(compliantFrameworks: string[]): string[] {
    const requirements: string[] = [];

    if (compliantFrameworks.includes("SOC2")) {
      requirements.push("Logical access controls");
      requirements.push("Change management processes");
    }

    if (compliantFrameworks.includes("ISO27001")) {
      requirements.push("Risk assessment framework");
      requirements.push("Security incident management");
    }

    if (compliantFrameworks.includes("PCI_DSS")) {
      requirements.push("Data encryption");
      requirements.push("Network monitoring");
      requirements.push("Regular vulnerability scanning");
    }

    if (compliantFrameworks.includes("HIPAA")) {
      requirements.push("Protected health information safeguards");
      requirements.push("Breach notification protocols");
    }

    if (compliantFrameworks.includes("NIST")) {
      requirements.push("Continuous monitoring");
      requirements.push("Comprehensive documentation");
      requirements.push("Strict access controls");
    }

    return requirements;
  }

  /**
   * Generate remediation steps for non-compliant frameworks
   */
  function generateRemediationSteps(
    partiallyCompliantFrameworks: string[],
    nonCompliantFrameworks: string[]
  ): string[] {
    const steps: string[] = [];

    // Add steps for partially compliant frameworks
    if (partiallyCompliantFrameworks.includes("SOC2")) {
      steps.push("Implement additional access controls");
    }

    if (partiallyCompliantFrameworks.includes("ISO27001")) {
      steps.push("Develop and document risk assessment framework");
    }

    // Add steps for non-compliant frameworks
    if (nonCompliantFrameworks.includes("PCI_DSS")) {
      steps.push("Implement encryption for sensitive data");
      steps.push("Establish network segmentation");
    }

    if (nonCompliantFrameworks.includes("HIPAA")) {
      steps.push("Develop PHI handling procedures");
      steps.push("Implement breach notification process");
    }

    if (nonCompliantFrameworks.includes("NIST")) {
      steps.push("Implement continuous monitoring solution");
      steps.push("Develop comprehensive security documentation");
    }

    return steps;
  }

  /**
   * Get impact metrics for a given CIA component and security level
   */
  const getComponentMetrics = (
    component: CIAComponentType,
    level: SecurityLevel
  ): ComponentMetrics => {
    const details = getComponentDetails(component, level);

    // Handle regulatory impact specially since the path might be different
    let regulatoryImpactDesc = "";
    if (
      details?.businessImpactDetails &&
      "regulatory" in details.businessImpactDetails
    ) {
      const regulatory = details.businessImpactDetails.regulatory;
      regulatoryImpactDesc = regulatory?.description || "";
    }

    return {
      financialImpact:
        details?.businessImpactDetails?.financialImpact?.description,
      operationalImpact:
        details?.businessImpactDetails?.operationalImpact?.description,
      reputationalImpact:
        details?.businessImpactDetails?.reputationalImpact?.description,
      regulatoryImpact: regulatoryImpactDesc,
      uptime: details?.uptime,
      rto: details?.rto,
      rpo: details?.rpo,
      mttr: details?.mttr,
      keyImpact: details?.keyImpact || determineKeyImpact(component, level),
      metric: details?.metric || determineMetric(component, level),
    };
  };

  /**
   * Determine a key impact message for each component and level
   */
  function determineKeyImpact(
    component: CIAComponentType,
    level: SecurityLevel
  ): string {
    if (component === "availability") {
      switch (level) {
        case "None":
          return "No guaranteed uptime";
        case "Low":
          return "Basic availability";
        case "Moderate":
          return "Standard business hours";
        case "High":
          return "High availability";
        case "Very High":
          return "Continuous availability";
        default:
          return "Unknown impact";
      }
    } else if (component === "integrity") {
      switch (level) {
        case "None":
          return "No data integrity";
        case "Low":
          return "Basic integrity checks";
        case "Moderate":
          return "Standard validation";
        case "High":
          return "Advanced integrity controls";
        case "Very High":
          return "Complete data integrity";
        default:
          return "Unknown impact";
      }
    } else if (component === "confidentiality") {
      switch (level) {
        case "None":
          return "Public information only";
        case "Low":
          return "Limited protection";
        case "Moderate":
          return "Business confidential";
        case "High":
          return "Sensitive information";
        case "Very High":
          return "Highly classified";
        default:
          return "Unknown impact";
      }
    }
    return "Unknown component";
  }

  /**
   * Determine a metric for each component and level
   */
  function determineMetric(
    component: CIAComponentType,
    level: SecurityLevel
  ): string {
    if (component === "availability") {
      switch (level) {
        case "None":
          return "< 90% uptime";
        case "Low":
          return "95% uptime";
        case "Moderate":
          return "99% uptime";
        case "High":
          return "99.9% uptime";
        case "Very High":
          return "99.999% uptime";
        default:
          return "Unknown metric";
      }
    } else if (component === "integrity") {
      switch (level) {
        case "None":
          return "No validation";
        case "Low":
          return "Basic checksums";
        case "Moderate":
          return "Hash validation";
        case "High":
          return "Digital signatures";
        case "Very High":
          return "Blockchain verification";
        default:
          return "Unknown metric";
      }
    } else if (component === "confidentiality") {
      switch (level) {
        case "None":
          return "No encryption";
        case "Low":
          return "Basic encryption";
        case "Moderate":
          return "Standard encryption";
        case "High":
          return "Advanced encryption";
        case "Very High":
          return "Quantum-safe encryption";
        default:
          return "Unknown metric";
      }
    }
    return "Unknown component";
  }

  /**
   * Get combined impact metrics for all CIA components
   */
  const getImpactMetrics = (
    availabilityLevel: SecurityLevel,
    integrityLevel: SecurityLevel,
    confidentialityLevel: SecurityLevel
  ): Record<string, ComponentMetrics> => {
    return {
      availability: getComponentMetrics("availability", availabilityLevel),
      integrity: getComponentMetrics("integrity", integrityLevel),
      confidentiality: getComponentMetrics(
        "confidentiality",
        confidentialityLevel
      ),
      // Add aggregate metrics as strings to avoid type issues
      businessImpact: determineBusinessImpact(
        availabilityLevel,
        integrityLevel,
        confidentialityLevel
      ) as unknown as ComponentMetrics,
      technicalImpact: determineTechnicalImpact(
        availabilityLevel,
        integrityLevel,
        confidentialityLevel
      ) as unknown as ComponentMetrics,
      regulatoryImpact: determineRegulatoryImpact(
        availabilityLevel,
        integrityLevel,
        confidentialityLevel
      ) as unknown as ComponentMetrics,
      securityScore: calculateSecurityScore(
        availabilityLevel,
        integrityLevel,
        confidentialityLevel
      ) as unknown as ComponentMetrics,
      complianceScore: calculateComplianceScore(
        availabilityLevel,
        integrityLevel,
        confidentialityLevel
      ) as unknown as ComponentMetrics,
      costEffectivenessScore: calculateCostEffectivenessScore(
        availabilityLevel,
        integrityLevel,
        confidentialityLevel
      ) as unknown as ComponentMetrics,
    };
  };

  // Helper functions for impact metrics
  function determineBusinessImpact(
    a: SecurityLevel,
    i: SecurityLevel,
    c: SecurityLevel
  ): string {
    return "Business impact assessment";
  }

  function determineTechnicalImpact(
    a: SecurityLevel,
    i: SecurityLevel,
    c: SecurityLevel
  ): string {
    return "Technical impact assessment";
  }

  function determineRegulatoryImpact(
    a: SecurityLevel,
    i: SecurityLevel,
    c: SecurityLevel
  ): string {
    return "Regulatory impact assessment";
  }

  function calculateSecurityScore(
    a: SecurityLevel,
    i: SecurityLevel,
    c: SecurityLevel
  ): number {
    const levelToScore = (level: SecurityLevel): number => {
      switch (level) {
        case "None":
          return 0;
        case "Low":
          return 25;
        case "Moderate":
          return 50;
        case "High":
          return 75;
        case "Very High":
          return 100;
      }
    };

    return Math.round(
      (levelToScore(a) + levelToScore(i) + levelToScore(c)) / 3
    );
  }

  function calculateComplianceScore(
    a: SecurityLevel,
    i: SecurityLevel,
    c: SecurityLevel
  ): number {
    return calculateSecurityScore(a, i, c) - 10; // Just for demonstration
  }

  function calculateCostEffectivenessScore(
    a: SecurityLevel,
    i: SecurityLevel,
    c: SecurityLevel
  ): number {
    return 100 - calculateSecurityScore(a, i, c); // Inverse correlation for demo
  }

  /**
   * Get security resources based on security levels
   */
  const getSecurityResources = (
    availabilityLevel: SecurityLevel,
    integrityLevel: SecurityLevel,
    confidentialityLevel: SecurityLevel,
    securityLevel: SecurityLevel
  ): SecurityResource[] => {
    // This is a placeholder implementation - in a real app, you would fetch these from a database or API
    return [
      {
        title: "NIST Cybersecurity Framework",
        description:
          "Guidelines, standards, and best practices to manage cybersecurity-related risk",
        url: "https://www.nist.gov/cyberframework",
        category: "Framework",
        tags: ["framework", "guidelines", "risk-management"],
        relevanceScore: 95,
        type: "Documentation",
      },
      {
        title: "OWASP Top Ten",
        description:
          "Standard awareness document for developers about the most critical security risks to web applications",
        url: "https://owasp.org/www-project-top-ten/",
        category: "Web Security",
        tags: ["web", "vulnerabilities", "coding-standards"],
        relevanceScore: 90,
        type: "Guidelines",
      },
      {
        title: "AWS Well-Architected Framework",
        description:
          "Helps cloud architects build secure, high-performing, resilient, and efficient infrastructure",
        url: "https://aws.amazon.com/architecture/well-architected/",
        category: "Cloud Security",
        tags: ["cloud", "architecture", "best-practices"],
        relevanceScore: 85,
        type: "Framework",
      },
      {
        title: "Encryption Best Practices",
        description:
          "Guidelines for implementing strong encryption to protect sensitive data",
        url: "https://csrc.nist.gov/publications/detail/sp/800-175b/rev-1/final",
        category: "Encryption",
        tags: ["cryptography", "data-protection", "confidentiality"],
        relevanceScore: 80,
        type: "Best Practices",
      },
      {
        title: "Security Testing Guide",
        description:
          "Comprehensive guide on how to test for security vulnerabilities",
        url: "https://owasp.org/www-project-web-security-testing-guide/",
        category: "Security Testing",
        tags: ["testing", "vulnerability-assessment", "penetration-testing"],
        relevanceScore: 75,
        type: "Guide",
      },
    ];
  };

  /**
   * Helper functions and types for technical implementation details
   */

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
   * Get security level description with meaningful context
   */
  function getSecurityLevelDescription(level: SecurityLevel): string {
    // Ideally, this would come from a shared definitions object in useCIAOptions
    const descriptions: Record<SecurityLevel, string> = {
      None: "No specific security controls applied. Suitable only for non-sensitive public information.",
      Low: "Basic security controls for internal use. Minimal protection against casual threats.",
      Moderate:
        "Standard security controls suitable for business data. Balanced protection against common threats.",
      High: "Enhanced security controls for sensitive data. Robust protection against sophisticated threats.",
      "Very High":
        "Maximum security controls for critical data. Comprehensive protection against advanced threats.",
    };

    return descriptions[level] || `${level} security level`;
  }

  /**
   * Get information sensitivity classification based on confidentiality level
   */
  function getInformationSensitivity(level: SecurityLevel): string {
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

  /**
   * Get protection level description based on confidentiality level
   */
  function getProtectionLevel(level: SecurityLevel): string {
    switch (level) {
      case "None":
        return "No Protection";
      case "Low":
        return "Basic Protection";
      case "Moderate":
        return "Standard Protection";
      case "High":
        return "Enhanced Protection";
      case "Very High":
        return "Maximum Protection";
      default:
        return "Unknown";
    }
  }

  /**
   * Calculate business impact level based on CIA security levels
   */
  function calculateBusinessImpactLevel(
    availLevel: SecurityLevel,
    integrLevel: SecurityLevel,
    confLevel: SecurityLevel
  ): SecurityLevel {
    const levels: SecurityLevel[] = [
      "None",
      "Low",
      "Moderate",
      "High",
      "Very High",
    ];
    const availIndex = levels.indexOf(availLevel);
    const integrIndex = levels.indexOf(integrLevel);
    const confIndex = levels.indexOf(confLevel);

    const avgIndex = Math.round((availIndex + integrIndex + confIndex) / 3);
    return levels[avgIndex] || "Moderate";
  }

  /**
   * Get appropriate badge variant based on risk level
   */
  function getRiskBadgeVariant(
    riskLevel: string
  ): "info" | "success" | "warning" | "error" | "neutral" {
    const riskMap: Record<
      string,
      "info" | "success" | "warning" | "error" | "neutral"
    > = {
      Critical: "error",
      High: "warning",
      Medium: "info",
      Low: "success",
      Minimal: "success",
    };

    return riskMap[riskLevel] || "neutral";
  }

  /**
   * Get icon for business impact category
   */
  function getCategoryIcon(category: string): string {
    const icons: Record<string, string> = {
      FINANCIAL: "💰",
      OPERATIONAL: "⚙️",
      REPUTATIONAL: "🏆",
      REGULATORY: "⚖️",
      STRATEGIC: "🎯",
      NEUTRAL: "📊",
    };

    const normalizedCategory = category.toUpperCase();
    // Ensure we always return a string by using nullish coalescing with a default
    return icons[normalizedCategory] ?? icons.NEUTRAL ?? "📊";
  }

  /**
   * Get value points for a security level
   */
  function getValuePoints(level: SecurityLevel): string[] {
    // Get component details for any component (just to check if valuePoints exists)
    const availDetails = getComponentDetails("availability", level);

    // If the component has valuePoints defined, use them
    if (availDetails?.valuePoints && availDetails.valuePoints.length > 0) {
      return availDetails.valuePoints;
    }

    // Default points as fallback
    const defaultPoints = ["Provides basic security foundation"];

    switch (level) {
      case "Very High":
        return [
          "Maximum security value with comprehensive protection",
          "Enables business in highly regulated industries",
          "Provides competitive advantage through superior security posture",
          "Minimizes risk of data breaches and associated costs",
          "Ensures regulatory compliance across major frameworks",
        ];
      case "High":
        return [
          "Strong security value with robust protection",
          "Supports business in moderately regulated industries",
          "Reduces risk of security incidents significantly",
          "Protects sensitive data and critical operations",
          "Meets requirements for most compliance frameworks",
        ];
      // ...other cases...
      default:
        return defaultPoints;
    }
  }

  /**
   * Get ROI estimate data for security level
   */
  function getROIEstimate(level: SecurityLevel): {
    value: string;
    description: string;
  } {
    switch (level) {
      case "Very High":
        return {
          value: "5x+",
          description: "Maximum return with comprehensive security controls",
        };
      case "High":
        return {
          value: "3-5x",
          description: "Strong return with robust security implementation",
        };
      case "Moderate":
        return {
          value: "2-3x",
          description: "Good return with balanced security approach",
        };
      case "Low":
        return {
          value: "1-2x",
          description: "Basic return with minimal security investment",
        };
      default:
        return {
          value: "Negative",
          description: "No return without security investment",
        };
    }
  }

  /**
   * Get implementation considerations for a security level
   */
  function getImplementationConsiderations(level: SecurityLevel): string {
    switch (level) {
      case "Very High":
        return "Implementation requires significant upfront investment but offers maximum long-term value through comprehensive risk reduction and regulatory compliance.";
      case "High":
        return "Balanced approach with substantial security benefits and reasonable implementation costs for most organizations with sensitive data or operations.";
      case "Moderate":
        return "Cost-effective implementation that provides standard security capabilities suitable for most business applications and moderate risk environments.";
      case "Low":
        return "Minimal implementation effort focused on essential security controls, appropriate for non-critical systems or limited budgets.";
      default:
        return "No security implementation considerations. Consider baseline security controls for any business system.";
    }
  }

  /**
   * Get technical implementation details for each component and level
   */
  function getComponentImplementationDetails(
    component: CIAComponentType,
    level: SecurityLevel
  ): ComponentTechnicalDetails {
    const details = getComponentDetails(component, level);

    // If details has implementationSteps and effort, use them directly
    if (details?.implementationSteps && details?.effort) {
      return {
        description:
          details.technical || "No specific implementation details available.",
        implementationSteps: details.implementationSteps,
        effort: details.effort,
      };
    }

    // Fallback to the hardcoded implementation if no details in the data source
    // This can be gradually moved to useCIAOptions as data is added
    const defaultDetails = {
      description: "No specific implementation details available.",
      implementationSteps: ["Consider implementing basic security controls"],
      effort: {
        development: "Minimal",
        maintenance: "None",
        expertise: "Basic",
      },
    };

    // Component-specific implementations (fallbacks)
    // ...existing implementations...

    return defaultDetails;
  }

  /**
   * Get business impact description for a component and level
   */
  function getBusinessImpactDescription(
    component: CIAComponentType,
    level: SecurityLevel
  ): string {
    const details = getComponentDetails(component, level);
    return (
      details?.businessImpact ||
      `${level} ${component} impact on business operations`
    );
  }

  /**
   * Get technical description for a component and level
   */
  function getTechnicalDescription(
    component: CIAComponentType,
    level: SecurityLevel
  ): string {
    const details = getComponentDetails(component, level);
    return (
      details?.technical || `${level} ${component} technical implementation`
    );
  }

  /**
   * Get security icon for a security level
   */
  function getSecurityIcon(level: SecurityLevel): string {
    // Check if any component for this level has a securityIcon
    const availDetails = getComponentDetails("availability", level);

    if (availDetails?.securityIcon) {
      return availDetails.securityIcon;
    }

    // Fallback to hardcoded icons
    switch (level) {
      case "Very High":
        return "🛡️🛡️🛡️";
      case "High":
        return "🛡️🛡️";
      case "Moderate":
        return "🛡️";
      case "Low":
        return "🔒";
      default:
        return "⚠️";
    }
  }

  /**
   * Get compliant frameworks based on security levels
   */
  function getCompliantFrameworks(
    availabilityLevel: SecurityLevel,
    integrityLevel: SecurityLevel,
    confidentialityLevel: SecurityLevel
  ): string[] {
    const complianceStatus = getComplianceStatus(
      availabilityLevel,
      integrityLevel,
      confidentialityLevel
    );

    return complianceStatus.compliantFrameworks;
  }

  /**
   * Get framework description for a specific compliance framework
   */
  function getFrameworkDescription(framework: string): string {
    const frameworkDescriptions: Record<string, string> = {
      SOC2: "System and Organization Controls 2 - Focuses on security, availability, processing integrity, confidentiality, and privacy",
      ISO27001: "International standard for information security management",
      PCI_DSS:
        "Payment Card Industry Data Security Standard - Security standard for organizations handling credit cards",
      HIPAA:
        "Health Insurance Portability and Accountability Act - Standards for sensitive patient data protection",
      NIST: "National Institute of Standards and Technology - Framework for improving critical infrastructure cybersecurity",
      GDPR: "General Data Protection Regulation - EU data protection and privacy regulation",
      CCPA: "California Consumer Privacy Act - Enhances privacy rights and consumer protection",
    };

    return (
      frameworkDescriptions[framework] || `${framework} compliance framework`
    );
  }

  /**
   * Get implementation time estimate based on security levels
   */
  function getImplementationTime(
    availabilityLevel: SecurityLevel,
    integrityLevel: SecurityLevel,
    confidentialityLevel: SecurityLevel
  ): string {
    const levelValues = {
      None: 0,
      Low: 1,
      Moderate: 2,
      High: 3,
      "Very High": 4,
    };

    const availValue = levelValues[availabilityLevel];
    const integValue = levelValues[integrityLevel];
    const confidValue = levelValues[confidentialityLevel];

    const totalScore = availValue + integValue + confidValue;

    if (totalScore <= 2) return "1-2 weeks";
    if (totalScore <= 5) return "2-4 weeks";
    if (totalScore <= 8) return "1-3 months";
    if (totalScore <= 10) return "3-6 months";
    return "6+ months";
  }

  // Return the public service API
  return {
    getCIAOptions,
    getComponentDetails,
    getBusinessImpact,
    getDetailedDescription,
    getBusinessPerspective,
    getRecommendations,
    getROIEstimates,
    getSecurityMetrics,
    getComplianceStatus,
    getComponentMetrics,
    getImpactMetrics,
    getSecurityResources,
    getTechnicalImplementation,
    getSecurityLevelDescription,
    getInformationSensitivity,
    getProtectionLevel,
    calculateBusinessImpactLevel,
    getRiskBadgeVariant,
    getCategoryIcon,
    getValuePoints,
    getROIEstimate,
    getImplementationConsiderations,
    getComponentImplementationDetails,
    getBusinessImpactDescription,
    getTechnicalDescription,
    getSecurityIcon,
    getCompliantFrameworks,
    getFrameworkDescription,
    getImplementationTime,
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
export const getComplianceStatus = defaultService.getComplianceStatus;

// Add new exports for these functions
export const getSecurityLevelDescription =
  defaultService.getSecurityLevelDescription;
export const getInformationSensitivity =
  defaultService.getInformationSensitivity;
export const getProtectionLevel = defaultService.getProtectionLevel;
export const calculateBusinessImpactLevel =
  defaultService.calculateBusinessImpactLevel;
export const getRiskBadgeVariant = defaultService.getRiskBadgeVariant;
export const getCategoryIcon = defaultService.getCategoryIcon;
export const getValuePoints = defaultService.getValuePoints;
export const getROIEstimate = defaultService.getROIEstimate;
export const getImplementationConsiderations =
  defaultService.getImplementationConsiderations;
export const getComponentImplementationDetails =
  defaultService.getComponentImplementationDetails;
export const getBusinessImpactDescription =
  defaultService.getBusinessImpactDescription;
export const getTechnicalDescription = defaultService.getTechnicalDescription;
export const getSecurityIcon = defaultService.getSecurityIcon;
export const getCompliantFrameworks = defaultService.getCompliantFrameworks;
export const getFrameworkDescription = defaultService.getFrameworkDescription;
export const getImplementationTime = defaultService.getImplementationTime;

// Export the types
export type { SecurityResource, ComponentMetrics };
