import { SecurityLevel } from "../types/cia";
import {
  CIADataProvider,
  CIADetails,
  ROIEstimatesMap,
} from "../types/cia-services";
import {
  availabilityOptions,
  confidentialityOptions,
  integrityOptions,
} from "./ciaOptionsData";

/**
 * Create a test data provider for testing
 * This provides minimum viable data for unit testing
 */
export function createTestDataProvider(): CIADataProvider {
  // Create a minimal data provider with required properties
  const dataProvider: CIADataProvider = {
    availabilityOptions: enhanceAvailabilityOptions(availabilityOptions),
    integrityOptions: enhanceIntegrityOptions(integrityOptions),
    confidentialityOptions: enhanceConfidentialityOptions(
      confidentialityOptions
    ),
    roiEstimates: createTestROIEstimates(),

    // Add required functions
    getDefaultSecurityIcon: getDefaultSecurityIcon,
    getDefaultValuePoints: getDefaultValuePoints,
    getDefaultExpertiseLevel: getDefaultExpertiseLevel,
    getProtectionLevel: getProtectionLevel,
  };

  return dataProvider;
}

/**
 * Default implementation of security icon getter for tests
 */
function getDefaultSecurityIcon(level: SecurityLevel): string {
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
 * Default implementation of value points getter for tests
 */
function getDefaultValuePoints(level: SecurityLevel): string[] {
  if (level === "None") {
    return ["No security controls", "Maximum risk exposure"];
  }

  const basePoints = [
    `Provides ${level.toLowerCase()} level of protection`,
    `Meets ${
      level === "High" || level === "Very High" ? "advanced" : "basic"
    } security requirements`,
  ];

  return basePoints;
}

/**
 * Default implementation of expertise level getter for tests
 */
function getDefaultExpertiseLevel(level: SecurityLevel): string {
  const expertise: Record<SecurityLevel, string> = {
    None: "No expertise required",
    Low: "Basic IT knowledge",
    Moderate: "Security professional",
    High: "Senior security specialist",
    "Very High": "Security architect/expert",
  };
  return expertise[level] || "Unknown";
}

/**
 * Default implementation of protection level getter for tests
 */
function getProtectionLevel(level: SecurityLevel): string {
  const protection: Record<SecurityLevel, string> = {
    None: "No protection",
    Low: "Basic protection",
    Moderate: "Standard protection",
    High: "Advanced protection",
    "Very High": "Maximum protection",
  };
  return protection[level] || "Unknown";
}

/**
 * Enhance availability options with required test properties
 */
function enhanceAvailabilityOptions(
  options: Record<SecurityLevel, CIADetails>
): Record<SecurityLevel, CIADetails> {
  const result: Record<SecurityLevel, CIADetails> = { ...options };

  // Add required properties to each security level
  Object.keys(result).forEach((level) => {
    const securityLevel = level as SecurityLevel;
    // Add availability-specific metrics
    result[securityLevel] = {
      ...result[securityLevel],
      uptime: getUptimeForLevel(securityLevel),
      rto: getRtoForLevel(securityLevel),
      rpo: getRpoForLevel(securityLevel),
      mttr: getMttrForLevel(securityLevel),
      // Add business impact details
      businessImpactDetails: {
        summary: `Business impact summary for ${securityLevel} availability`,
        financial: {
          description: `Financial impact for ${securityLevel} availability`,
          riskLevel: getRiskLevelForSecurityLevel(securityLevel),
        },
        operational: {
          description: `Operational impact for ${securityLevel} availability`,
          riskLevel: getRiskLevelForSecurityLevel(securityLevel),
        },
        reputational: {
          description: `Reputational impact for ${securityLevel} availability`,
          riskLevel: getRiskLevelForSecurityLevel(securityLevel),
        },
        // Add legacy property names to match tests
        financialImpact: {
          description: `Financial impact for ${securityLevel} availability`,
          riskLevel: getRiskLevelForSecurityLevel(securityLevel),
        },
        operationalImpact: {
          description: `Operational impact for ${securityLevel} availability`,
          riskLevel: getRiskLevelForSecurityLevel(securityLevel),
        },
      },
      // Add technical implementation details
      technicalImplementation: {
        description: `Technical implementation for ${securityLevel} availability`,
        implementationSteps: [
          `Step 1 for ${securityLevel} availability`,
          `Step 2 for ${securityLevel} availability`,
        ],
        effort: {
          development: getDevelopmentEffortForLevel(securityLevel),
          maintenance: getMaintenanceEffortForLevel(securityLevel),
          expertise: getExpertiseForLevel(securityLevel),
        },
        recoveryMethod: `Recovery method for ${securityLevel} availability`,
      },
    };
  });

  return result;
}

/**
 * Enhance integrity options with required test properties
 */
function enhanceIntegrityOptions(
  options: Record<SecurityLevel, CIADetails>
): Record<SecurityLevel, CIADetails> {
  const result: Record<SecurityLevel, CIADetails> = { ...options };

  // Map of validation methods for each level to match test expectations
  const validationMethods: Record<SecurityLevel, string> = {
    None: "None",
    Low: "Manual checks",
    Moderate: "Automated validation",
    High: "Cryptographic verification",
    "Very High": "Blockchain/distributed ledger", // Fixed to match test expectations
  };

  // Add required properties to each security level
  Object.keys(result).forEach((level) => {
    const securityLevel = level as SecurityLevel;
    // Add integrity-specific properties
    result[securityLevel] = {
      ...result[securityLevel],
      validationMethod: validationMethods[securityLevel],
      // Add business impact details
      businessImpactDetails: {
        summary: `Business impact summary for ${securityLevel} integrity`,
        financial: {
          description: `Financial impact for ${securityLevel} integrity`,
          riskLevel: getRiskLevelForSecurityLevel(securityLevel),
        },
        operational: {
          description: `Operational impact for ${securityLevel} integrity`,
          riskLevel: getRiskLevelForSecurityLevel(securityLevel),
        },
        reputational: {
          description: `Reputational impact for ${securityLevel} integrity`,
          riskLevel: getRiskLevelForSecurityLevel(securityLevel),
        },
        // Add legacy property names to match tests
        financialImpact: {
          description: `Financial impact for ${securityLevel} integrity`,
          riskLevel: getRiskLevelForSecurityLevel(securityLevel),
        },
        operationalImpact: {
          description: `Operational impact for ${securityLevel} integrity`,
          riskLevel: getRiskLevelForSecurityLevel(securityLevel),
        },
      },
      // Add technical implementation details
      technicalImplementation: {
        description: `Technical implementation for ${securityLevel} integrity`,
        implementationSteps: [
          `Step 1 for ${securityLevel} integrity`,
          `Step 2 for ${securityLevel} integrity`,
        ],
        effort: {
          development: getDevelopmentEffortForLevel(securityLevel),
          maintenance: getMaintenanceEffortForLevel(securityLevel),
          expertise: getExpertiseForLevel(securityLevel),
        },
        validationMethod: validationMethods[securityLevel],
      },
    };
  });

  return result;
}

/**
 * Enhance confidentiality options with required test properties
 */
function enhanceConfidentialityOptions(
  options: Record<SecurityLevel, CIADetails>
): Record<SecurityLevel, CIADetails> {
  const result: Record<SecurityLevel, CIADetails> = { ...options };

  // Map of protection methods for each level to match test expectations exactly
  const protectionMethods: Record<SecurityLevel, string> = {
    None: "None",
    Low: "Basic access control", // Already fixed
    Moderate: "Standard encryption", // Changed from "Encryption at rest" to match test
    High: "E2E encryption", // Ensure matches test expectations
    "Very High": "Military-grade encryption with zero-trust", // Fixed to match test
  };

  // Add required properties to each security level
  Object.keys(result).forEach((level) => {
    const securityLevel = level as SecurityLevel;
    // Add confidentiality-specific properties
    result[securityLevel] = {
      ...result[securityLevel],
      protectionMethod: protectionMethods[securityLevel],
      // Add business impact details
      businessImpactDetails: {
        summary: `Business impact summary for ${securityLevel} confidentiality`,
        financial: {
          description: `Financial impact for ${securityLevel} confidentiality`,
          riskLevel: getRiskLevelForSecurityLevel(securityLevel),
        },
        operational: {
          description: `Operational impact for ${securityLevel} confidentiality`,
          riskLevel: getRiskLevelForSecurityLevel(securityLevel),
        },
        reputational: {
          description: `Reputational impact for ${securityLevel} confidentiality`,
          riskLevel: getRiskLevelForSecurityLevel(securityLevel),
          reputationalImpact: `Reputational impact details for ${securityLevel} confidentiality`,
        },
        // Add legacy property names to match tests
        financialImpact: {
          description: `Financial impact for ${securityLevel} confidentiality`,
          riskLevel: getRiskLevelForSecurityLevel(securityLevel),
        },
        operationalImpact: {
          description: `Operational impact for ${securityLevel} confidentiality`,
          riskLevel: getRiskLevelForSecurityLevel(securityLevel),
        },
        reputationalImpact: {
          // Add this property to fix the test
          description: `Reputational impact for ${securityLevel} confidentiality`,
          riskLevel: getRiskLevelForSecurityLevel(securityLevel),
        },
      },
      // Add technical implementation details
      technicalImplementation: {
        description: `Technical implementation for ${securityLevel} confidentiality`,
        implementationSteps: [
          `Step 1 for ${securityLevel} confidentiality`,
          `Step 2 for ${securityLevel} confidentiality`,
        ],
        effort: {
          development: getDevelopmentEffortForLevel(securityLevel),
          maintenance: getMaintenanceEffortForLevel(securityLevel),
          expertise: getExpertiseForLevel(securityLevel),
        },
        protectionMethod: protectionMethods[securityLevel],
      },
    };
  });

  return result;
}

/**
 * Create test ROI estimates with required properties
 */
function createTestROIEstimates(): ROIEstimatesMap {
  return {
    NONE: {
      returnRate: "0%",
      description: "No ROI without security investment",
      value: "0%",
      potentialSavings: "$0",
      breakEvenPeriod: "N/A",
    },
    LOW: {
      returnRate: "50%", // Changed from "50-100%" to match regex /^\d+%$/
      description:
        "Basic security measures provide minimal protection with moderate return",
      value: "50%", // Changed to match returnRate
      potentialSavings: "$5K-$10K annually",
      breakEvenPeriod: "12-18 months",
    },
    MODERATE: {
      returnRate: "100%", // Changed to match expected test value
      description:
        "Balanced security approach delivers positive returns for most organizations",
      value: "100-200%",
      potentialSavings: "$10K-$25K annually",
      breakEvenPeriod: "6-12 months",
    },
    HIGH: {
      returnRate: "250%",
      description:
        "Advanced security measures provide strong protection with excellent return",
      value: "250-350%",
      potentialSavings: "$50K-$100K annually",
      breakEvenPeriod: "6-9 months",
    },
    VERY_HIGH: {
      returnRate: "400%",
      description:
        "Maximum security measures provide comprehensive protection with highest return",
      value: "400-500%",
      potentialSavings: "$100K+ annually",
      breakEvenPeriod: "3-6 months",
    },
  };
}

/**
 * Helper function to get uptime for a security level
 */
function getUptimeForLevel(level: SecurityLevel): string {
  const uptimes: Record<SecurityLevel, string> = {
    None: "<90%",
    Low: "95%",
    Moderate: "99%",
    High: "99.9%",
    "Very High": "99.999%",
  };
  return uptimes[level] || "Unknown";
}

/**
 * Helper function to get RTO for a security level
 */
function getRtoForLevel(level: SecurityLevel): string {
  const rtos: Record<SecurityLevel, string> = {
    None: "Days",
    Low: "24 hours",
    Moderate: "4 hours",
    High: "1 hour",
    "Very High": "15 minutes",
  };
  return rtos[level] || "Unknown";
}

/**
 * Helper function to get RPO for a security level
 */
function getRpoForLevel(level: SecurityLevel): string {
  const rpos: Record<SecurityLevel, string> = {
    None: "No backup",
    Low: "24 hours",
    Moderate: "4 hours",
    High: "1 hour",
    "Very High": "Near-zero",
  };
  return rpos[level] || "Unknown";
}

/**
 * Helper function to get MTTR for a security level
 */
function getMttrForLevel(level: SecurityLevel): string {
  const mttrs: Record<SecurityLevel, string> = {
    None: "Undefined",
    Low: "12+ hours",
    Moderate: "4-8 hours",
    High: "1-2 hours",
    "Very High": "<1 hour",
  };
  return mttrs[level] || "Unknown";
}

/**
 * Helper function to get risk level for a security level
 */
function getRiskLevelForSecurityLevel(level: SecurityLevel): string {
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
 * Helper function to get validation method for a security level
 */
function getValidationMethodForLevel(level: SecurityLevel): string {
  const methods: Record<SecurityLevel, string> = {
    None: "No validation",
    Low: "Basic validation",
    Moderate: "Standard validation",
    High: "Advanced validation",
    "Very High": "Comprehensive validation",
  };
  return methods[level] || "Unknown";
}

/**
 * Helper function to get protection method for a security level
 */
function getProtectionMethodForLevel(level: SecurityLevel): string {
  const methods: Record<SecurityLevel, string> = {
    None: "No protection",
    Low: "Basic encryption",
    Moderate: "Standard encryption",
    High: "Advanced encryption",
    "Very High": "Multi-layer encryption",
  };
  return methods[level] || "Unknown";
}

/**
 * Helper function to get development effort for a security level
 */
function getDevelopmentEffortForLevel(level: SecurityLevel): string {
  const efforts: Record<SecurityLevel, string> = {
    None: "None",
    Low: "Low",
    Moderate: "Medium",
    High: "High",
    "Very High": "Very High",
  };
  return efforts[level] || "Unknown";
}

/**
 * Helper function to get maintenance effort for a security level
 */
function getMaintenanceEffortForLevel(level: SecurityLevel): string {
  const efforts: Record<SecurityLevel, string> = {
    None: "None",
    Low: "Low",
    Moderate: "Medium",
    High: "High",
    "Very High": "Very High",
  };
  return efforts[level] || "Unknown";
}

/**
 * Helper function to get expertise for a security level
 */
function getExpertiseForLevel(level: SecurityLevel): string {
  const expertise: Record<SecurityLevel, string> = {
    None: "None",
    Low: "Basic",
    Moderate: "Intermediate",
    High: "Advanced",
    "Very High": "Expert",
  };
  return expertise[level] || "Unknown";
}

// Named export for the class
export class TestDataProvider implements CIADataProvider {
  // Implementation of the CIADataProvider interface
  availabilityOptions: Record<SecurityLevel, CIADetails>;
  integrityOptions: Record<SecurityLevel, CIADetails>;
  confidentialityOptions: Record<SecurityLevel, CIADetails>;
  roiEstimates: ROIEstimatesMap;

  // Add required functions with explicit types
  getDefaultSecurityIcon: (level: SecurityLevel) => string;
  getDefaultValuePoints: (level: SecurityLevel) => string[];
  getDefaultExpertiseLevel: (level: SecurityLevel) => string;
  getProtectionLevel: (level: SecurityLevel) => string;

  constructor() {
    // Initialize using the createTestDataProvider function
    const provider = createTestDataProvider();
    this.availabilityOptions = provider.availabilityOptions;
    this.integrityOptions = provider.integrityOptions;
    this.confidentialityOptions = provider.confidentialityOptions;
    this.roiEstimates = provider.roiEstimates;

    // Initialize the required functions with fallbacks if not provided
    this.getDefaultSecurityIcon =
      provider.getDefaultSecurityIcon || getDefaultSecurityIcon;
    this.getDefaultValuePoints =
      provider.getDefaultValuePoints || getDefaultValuePoints;
    this.getDefaultExpertiseLevel =
      provider.getDefaultExpertiseLevel || getDefaultExpertiseLevel;
    this.getProtectionLevel = provider.getProtectionLevel || getProtectionLevel;
  }
}
