import { SecurityLevel } from "../types/cia";
import {
    CIADataProvider,
    CIADetails,
    ROIEstimatesMap,
} from "../types/cia-services";
import { getSecurityLevelColorPair } from "../utils/colorUtils";

/**
 * Create a test data provider for unit testing
 *
 * This function creates a minimal test data provider with simplified mock data
 * that can be used in unit tests without requiring the full data set.
 *
 * @returns A test implementation of CIADataProvider
 */
export function createTestDataProvider(): CIADataProvider {
  // Create minimal test data for all security levels
  const securityLevels: SecurityLevel[] = [
    "None",
    "Low",
    "Moderate",
    "High",
    "Very High",
  ];

  // Create test availability options with minimal required properties
  const availabilityOptions = securityLevels.reduce((acc, level) => {
    acc[level] = {
      description: `${level} availability description`,
      technical: `${level} availability technical details`,
      businessImpact: `${level} availability business impact`,
      capex: getCapexForLevel(level),
      opex: getOpexForLevel(level),
      bg: getSecurityLevelColorPair(level).bg,
      text: getSecurityLevelColorPair(level).text,
      recommendations: [
        `${level} availability recommendation 1`,
        `${level} availability recommendation 2`,
      ],
      uptime: getUptimeForLevel(level),
      rto: getRtoForLevel(level),
      rpo: getRpoForLevel(level),
      mttr: getMttrForLevel(level),
      businessImpactDetails: {
        financialImpact: {
          description: `${level} financial impact`,
          riskLevel: getRiskLevelFromSecurityLevel(level),
          annualRevenueLoss: getRevenueImpactForLevel(level),
        },
        operationalImpact: {
          description: `${level} operational impact`,
          riskLevel: getRiskLevelFromSecurityLevel(level),
          meanTimeToRecover: getMttrForLevel(level),
        },
      },
      securityIcon: getSecurityIconForLevel(level),
      valuePoints: [`${level} value point 1`, `${level} value point 2`],
      technicalImplementation: {
        description: `${level} availability implementation`,
        implementationSteps: [
          `${level} availability step 1`,
          `${level} availability step 2`,
        ],
        effort: {
          development: `${level} development effort`,
          maintenance: `${level} maintenance effort`,
          expertise: `${level} expertise required`,
        },
      },
    } as CIADetails; // Use explicit type cast to CIADetails
    return acc;
  }, {} as Record<SecurityLevel, CIADetails>);

  // Create test integrity options with minimal required properties
  const integrityOptions = securityLevels.reduce((acc, level) => {
    acc[level] = {
      description: `${level} integrity description`,
      technical: `${level} integrity technical details`,
      businessImpact: `${level} integrity business impact`,
      capex: getCapexForLevel(level),
      opex: getOpexForLevel(level),
      bg: getSecurityLevelColorPair(level).bg,
      text: getSecurityLevelColorPair(level).text,
      recommendations: [
        `${level} integrity recommendation 1`,
        `${level} integrity recommendation 2`,
      ],
      validationMethod: getValidationMethodForLevel(level),
      businessImpactDetails: {
        financialImpact: {
          description: `${level} financial impact`,
          riskLevel: getRiskLevelFromSecurityLevel(level),
        },
        operationalImpact: {
          description: `${level} operational impact`,
          riskLevel: getRiskLevelFromSecurityLevel(level),
        },
      },
      securityIcon: getSecurityIconForLevel(level),
      valuePoints: [`${level} value point 1`, `${level} value point 2`],
      technicalImplementation: {
        description: `${level} integrity implementation`,
        implementationSteps: [
          `${level} integrity step 1`,
          `${level} integrity step 2`,
        ],
        effort: {
          development: `${level} development effort`,
          maintenance: `${level} maintenance effort`,
          expertise: `${level} expertise required`,
        },
      },
    } as CIADetails; // Use explicit type cast to CIADetails
    return acc;
  }, {} as Record<SecurityLevel, CIADetails>);

  // Create test confidentiality options with minimal required properties
  const confidentialityOptions = securityLevels.reduce((acc, level) => {
    acc[level] = {
      description: `${level} confidentiality description`,
      technical: `${level} confidentiality technical details`,
      businessImpact: `${level} confidentiality business impact`,
      capex: getCapexForLevel(level),
      opex: getOpexForLevel(level),
      bg: getSecurityLevelColorPair(level).bg,
      text: getSecurityLevelColorPair(level).text,
      recommendations: [
        `${level} confidentiality recommendation 1`,
        `${level} confidentiality recommendation 2`,
      ],
      protectionMethod: getProtectionMethodForLevel(level),
      businessImpactDetails: {
        reputationalImpact: {
          description: `${level} reputational impact`,
          riskLevel: getRiskLevelFromSecurityLevel(level),
        },
        regulatory: {
          description: `${level} regulatory impact`,
          riskLevel: getRiskLevelFromSecurityLevel(level),
          complianceViolations: level === "None" ? ["GDPR", "HIPAA"] : [],
        },
      },
      securityIcon: getSecurityIconForLevel(level),
      valuePoints: [`${level} value point 1`, `${level} value point 2`],
      technicalImplementation: {
        description: `${level} confidentiality implementation`,
        implementationSteps: [
          `${level} confidentiality step 1`,
          `${level} confidentiality step 2`,
        ],
        effort: {
          development: `${level} development effort`,
          maintenance: `${level} maintenance effort`,
          expertise: `${level} expertise required`,
        },
      },
    } as CIADetails; // Use explicit type cast to CIADetails
    return acc;
  }, {} as Record<SecurityLevel, CIADetails>);

  // Fix ROI estimates to include returnRate property
  const roiEstimates: ROIEstimatesMap = {
    NONE: {
      returnRate: "0%",
      value: "0%",
      description: "No return on investment",
      potentialSavings: "None",
      breakEvenPeriod: "N/A",
    },
    LOW: {
      returnRate: "50%",
      value: "50%",
      description: "Low return on investment",
      potentialSavings: "$5,000 annually",
      breakEvenPeriod: "18 months",
    },
    MODERATE: {
      returnRate: "150%",
      value: "150%",
      description: "Moderate return on investment",
      potentialSavings: "$15,000 annually",
      breakEvenPeriod: "12 months",
    },
    HIGH: {
      returnRate: "300%",
      value: "300%",
      description: "High return on investment",
      potentialSavings: "$30,000 annually",
      breakEvenPeriod: "6 months",
    },
    VERY_HIGH: {
      returnRate: "500%",
      value: "500%",
      description: "Maximum return on investment",
      potentialSavings: "$50,000 annually",
      breakEvenPeriod: "3 months",
    },
  };

  // Make sure these optional functions are defined with proper return types
  const getDefaultSecurityIcon = (level: SecurityLevel): string => {
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
        return "❓"; // Default case returns a fallback value
    }
  };

  const getDefaultValuePoints = (level: SecurityLevel): string[] => {
    switch (level) {
      case "None":
        return [
          "No security value",
          "Maximum exposure to security risks",
          "Non-compliance with regulatory requirements",
          "High risk of business disruption",
        ];
      case "Low":
        return [
          "Basic security value",
          "Minimal protection against common threats",
          "Some risk reduction for non-critical systems",
          "First steps toward regulatory compliance",
        ];
      case "Moderate":
        return [
          "Standard security value",
          "Balanced protection for most business operations",
          "Meets basic requirements for many regulatory frameworks",
          "Reasonable risk management for business continuity",
        ];
      case "High":
        return [
          "High value point 1",
          "High value point 2",
          "Strong security value with robust protection",
          "Significant risk reduction with measurable business value",
        ];
      case "Very High":
        return [
          "Very high value point 1",
          "Very high value point 2",
          "Maximum security value with comprehensive protection",
          "Strategic enabler for high-value and high-risk business activities",
        ];
      default:
        return ["Unknown value"]; // Default case returns a fallback value
    }
  };

  return {
    availabilityOptions,
    integrityOptions,
    confidentialityOptions,
    roiEstimates,
    getDefaultSecurityIcon,
    getDefaultValuePoints,
  };
}

// Helper functions to generate appropriate test values

function getCapexForLevel(level: SecurityLevel): number {
  switch (level) {
    case "None":
      return 0;
    case "Low":
      return 5;
    case "Moderate":
      return 15;
    case "High":
      return 30;
    case "Very High":
      return 60;
    default:
      return 0; // Default case returns a fallback value
  }
}

function getOpexForLevel(level: SecurityLevel): number {
  switch (level) {
    case "None":
      return 0;
    case "Low":
      return 3;
    case "Moderate":
      return 10;
    case "High":
      return 20;
    case "Very High":
      return 40;
    default:
      return 0; // Default case returns a fallback value
  }
}

function getUptimeForLevel(level: SecurityLevel): string {
  switch (level) {
    case "None":
      return "<90%";
    case "Low":
      return "95%";
    case "Moderate":
      return "99%";
    case "High":
      return "99.9%";
    case "Very High":
      return "99.99%";
    default:
      return "Unknown"; // Default case returns a fallback value
  }
}

function getRtoForLevel(level: SecurityLevel): string {
  switch (level) {
    case "None":
      return "Unpredictable";
    case "Low":
      return "24-48 hours";
    case "Moderate":
      return "4-8 hours";
    case "High":
      return "15-60 minutes";
    case "Very High":
      return "<5 minutes";
    default:
      return "Unknown"; // Default case returns a fallback value
  }
}

function getRpoForLevel(level: SecurityLevel): string {
  switch (level) {
    case "None":
      return "Unpredictable";
    case "Low":
      return "24 hours";
    case "Moderate":
      return "4 hours";
    case "High":
      return "15 minutes";
    case "Very High":
      return "<1 minute";
    default:
      return "Unknown"; // Default case returns a fallback value
  }
}

function getMttrForLevel(level: SecurityLevel): string {
  switch (level) {
    case "None":
      return "Unpredictable (hours to days)";
    case "Low":
      return "12-24 hours";
    case "Moderate":
      return "2-4 hours";
    case "High":
      return "10-30 minutes";
    case "Very High":
      return "<5 minutes";
    default:
      return "Unknown"; // Default case returns a fallback value
  }
}

function getRiskLevelFromSecurityLevel(level: SecurityLevel): string {
  switch (level) {
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
      return "Unknown"; // Default case returns a fallback value
  }
}

function getRevenueImpactForLevel(level: SecurityLevel): string {
  switch (level) {
    case "None":
      return ">20% of annual revenue";
    case "Low":
      return "5-15% of annual revenue";
    case "Moderate":
      return "2-5% of annual revenue";
    case "High":
      return "0.5-2% of annual revenue";
    case "Very High":
      return "<0.5% of annual revenue";
    default:
      return "Unknown"; // Default case returns a fallback value
  }
}

function getSecurityIconForLevel(level: SecurityLevel): string {
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
      return "❓"; // Default case returns a fallback value
  }
}

function getValidationMethodForLevel(level: SecurityLevel): string {
  switch (level) {
    case "None":
      return "None";
    case "Low":
      return "Manual checks";
    case "Moderate":
      return "Automated validation";
    case "High":
      return "Cryptographic verification";
    case "Very High":
      return "Blockchain/distributed ledger";
    default:
      return "Unknown"; // Default case returns a fallback value
  }
}

function getProtectionMethodForLevel(level: SecurityLevel): string {
  switch (level) {
    case "None":
      return "None";
    case "Low":
      return "Basic access control";
    case "Moderate":
      return "Standard encryption";
    case "High":
      return "E2E encryption";
    case "Very High":
      return "Military-grade encryption with zero-trust";
    default:
      return "Unknown"; // Default case returns a fallback value
  }
}
