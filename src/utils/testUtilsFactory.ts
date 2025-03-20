import { createTestDataProvider } from "../data/testDataProvider";
import { SecurityResourceService } from "../services/securityResourceService";
import { SecurityLevel } from "../types/cia";
import { BusinessImpactDetail, CIADataProvider, CIADetails, ROIEstimate } from "../types/cia-services";
import { getSecurityLevelColorPair } from "./colorUtils";
import { getRiskLevelFromSecurityLevel } from "./riskUtils";

/**
 * Create a test instance of the SecurityResourceService
 *
 * This factory function creates a SecurityResourceService instance
 * with a test data provider, suitable for testing components
 * that depend on the service.
 */
export function createTestSecurityResourceService(): SecurityResourceService {
  const testDataProvider: CIADataProvider = createTestDataProvider();
  return new SecurityResourceService(testDataProvider);
}

/**
 * Create test data provider with specified customizations
 */
export function createCustomTestDataProvider(
  customizations: Partial<CIADataProvider> = {}
): CIADataProvider {
  const baseProvider = createTestDataProvider();

  // Merge the base provider with any customizations
  return {
    ...baseProvider,
    ...customizations,
  };
}

/**
 * Factory functions for creating test data
 * 
 * ## Business Perspective
 * 
 * These factory functions help ensure consistent test data that accurately
 * represents real-world security scenarios, improving test coverage for
 * business-critical security assessment features. 🧪
 * 
 * Reliable test data ensures that security and compliance calculations
 * are properly validated across application updates.
 */

/**
 * Create a test CIA details object
 * 
 * @param level - Security level for the details
 * @param type - CIA component type (availability, integrity, confidentiality)
 * @returns CIADetails object for testing
 */
export function createTestCIADetails(
  level: SecurityLevel,
  type: "availability" | "integrity" | "confidentiality" = "availability"
): CIADetails {
  const colors = getSecurityLevelColorPair(level);

  const commonDetails: CIADetails = {
    description: `${level} ${type} description`,
    technical: `${level} ${type} technical details`,
    businessImpact: `${level} ${type} business impact`,
    capex: getTestCapex(level),
    opex: getTestOpex(level),
    bg: colors.bg,
    text: colors.text,
    recommendations: [
      `${level} ${type} recommendation 1`,
      `${level} ${type} recommendation 2`,
    ],
    businessImpactDetails: {
      summary: `${level} ${type} impact summary`,
      financial: {
        description: `${level} financial impact`,
        riskLevel: getRiskLevelFromSecurityLevel(level),
        annualRevenueLoss: getTestRevenueLoss(level),
      },
      operational: {
        description: `${level} operational impact`,
        riskLevel: getRiskLevelFromSecurityLevel(level),
        meanTimeToRecover: getTestMttr(level),
      },
    },
    securityIcon: getTestSecurityIcon(level),
    valuePoints: [`${level} value point 1`, `${level} value point 2`],
  };

  // Add type-specific properties
  if (type === "availability") {
    return {
      ...commonDetails,
      uptime: getTestUptime(level),
      rto: getTestRto(level),
      rpo: getTestRpo(level),
      mttr: getTestMttr(level),
    };
  } else if (type === "integrity") {
    return {
      ...commonDetails,
      validationMethod: getTestValidationMethod(level),
    };
  } else {
    return {
      ...commonDetails,
      protectionMethod: getTestProtectionMethod(level),
    };
  }
}

/**
 * Create a test ROI estimate
 * 
 * @param level - Security level for the ROI estimate
 * @returns ROI estimate object for testing
 */
export function createTestROIEstimate(level: SecurityLevel): ROIEstimate {
  const roiValues: Record<SecurityLevel, ROIEstimate> = {
    "None": {
      returnRate: "0%",
      value: "0%",
      description: "No return on investment",
      potentialSavings: "None",
      breakEvenPeriod: "N/A",
    },
    "Low": {
      returnRate: "50%",
      value: "50%",
      description: "Low return on investment",
      potentialSavings: "$5,000 annually",
      breakEvenPeriod: "18 months",
    },
    "Moderate": {
      returnRate: "150%",
      value: "150%",
      description: "Moderate return on investment",
      potentialSavings: "$15,000 annually",
      breakEvenPeriod: "12 months",
    },
    "High": {
      returnRate: "300%",
      value: "300%",
      description: "High return on investment",
      potentialSavings: "$30,000 annually",
      breakEvenPeriod: "6 months",
    },
    "Very High": {
      returnRate: "500%",
      value: "500%",
      description: "Maximum return on investment",
      potentialSavings: "$50,000 annually",
      breakEvenPeriod: "3 months",
    },
  };

  return roiValues[level];
}

/**
 * Create a test business impact detail
 * 
 * @param level - Security level for the business impact
 * @param type - Impact type (financial, operational, reputational, regulatory)
 * @returns Business impact detail object for testing
 */
export function createTestBusinessImpactDetail(
  level: SecurityLevel,
  type: "financial" | "operational" | "reputational" | "regulatory" = "financial"
): BusinessImpactDetail {
  const riskLevel = getRiskLevelFromSecurityLevel(level);

  const baseDetail: BusinessImpactDetail = {
    description: `${level} ${type} impact description`,
    riskLevel,
  };

  if (type === "financial") {
    return {
      ...baseDetail,
      annualRevenueLoss: getTestRevenueLoss(level),
    };
  } else if (type === "operational") {
    return {
      ...baseDetail,
      meanTimeToRecover: getTestMttr(level),
    };
  } else if (type === "regulatory") {
    return {
      ...baseDetail,
      complianceViolations: level === "None" ? ["GDPR", "HIPAA", "PCI DSS"] :
        level === "Low" ? ["HIPAA", "PCI DSS"] :
          level === "Moderate" ? ["PCI DSS"] : [],
    };
  } else {
    // Reputational
    return baseDetail;
  }
}

/**
 * Create mock implementation effort details
 * 
 * @param level - Security level for implementation effort
 * @returns Implementation effort details
 */
export function createTestImplementationEffort(level: SecurityLevel): {
  development: string;
  maintenance: string;
  expertise: string;
} {
  const efforts: Record<SecurityLevel, {
    development: string;
    maintenance: string;
    expertise: string;
  }> = {
    "None": {
      development: "Minimal",
      maintenance: "None",
      expertise: "Basic",
    },
    "Low": {
      development: "Days",
      maintenance: "Monthly checks",
      expertise: "Junior",
    },
    "Moderate": {
      development: "Weeks",
      maintenance: "Weekly checks",
      expertise: "Mid-level",
    },
    "High": {
      development: "1-2 Months",
      maintenance: "Daily monitoring",
      expertise: "Senior",
    },
    "Very High": {
      development: "2-6 Months",
      maintenance: "Continuous monitoring",
      expertise: "Expert",
    },
  };

  return efforts[level];
}

// Helper functions to generate test values based on security level

/**
 * Get test capital expenditure value for a security level
 * 
 * @param level - Security level
 * @returns CAPEX value for testing
 */
function getTestCapex(level: SecurityLevel): number {
  const capexMap: Record<SecurityLevel, number> = {
    "None": 0,
    "Low": 5,
    "Moderate": 15,
    "High": 30,
    "Very High": 60,
  };

  return capexMap[level] || 0;
}

/**
 * Get test operational expenditure value for a security level
 * 
 * @param level - Security level
 * @returns OPEX value for testing
 */
function getTestOpex(level: SecurityLevel): number {
  const opexMap: Record<SecurityLevel, number> = {
    "None": 0,
    "Low": 3,
    "Moderate": 10,
    "High": 20,
    "Very High": 40,
  };

  return opexMap[level] || 0;
}

/**
 * Get test uptime value for a security level
 * 
 * @param level - Security level
 * @returns Uptime string for testing
 */
function getTestUptime(level: SecurityLevel): string {
  const uptimeMap: Record<SecurityLevel, string> = {
    "None": "<90%",
    "Low": "95%",
    "Moderate": "99%",
    "High": "99.9%",
    "Very High": "99.99%",
  };

  return uptimeMap[level] || "Unknown";
}

/**
 * Get test recovery time objective for a security level
 * 
 * @param level - Security level
 * @returns RTO string for testing
 */
function getTestRto(level: SecurityLevel): string {
  const rtoMap: Record<SecurityLevel, string> = {
    "None": "Unpredictable",
    "Low": "24-48 hours",
    "Moderate": "4-8 hours",
    "High": "15-60 minutes",
    "Very High": "<5 minutes",
  };

  return rtoMap[level] || "Unknown";
}

/**
 * Get test recovery point objective for a security level
 * 
 * @param level - Security level
 * @returns RPO string for testing
 */
function getTestRpo(level: SecurityLevel): string {
  const rpoMap: Record<SecurityLevel, string> = {
    "None": "None",
    "Low": "24 hours",
    "Moderate": "4 hours",
    "High": "1 hour",
    "Very High": "Near real-time",
  };

  return rpoMap[level] || "Unknown";
}

/**
 * Get test mean time to recover for a security level
 * 
 * @param level - Security level
 * @returns MTTR string for testing
 */
function getTestMttr(level: SecurityLevel): string {
  const mttrMap: Record<SecurityLevel, string> = {
    "None": "Days or more",
    "Low": "12-24 hours",
    "Moderate": "2-8 hours",
    "High": "30-90 minutes",
    "Very High": "<15 minutes",
  };

  return mttrMap[level] || "Unknown";
}

/**
 * Get test annual revenue loss for a security level
 * 
 * @param level - Security level
 * @returns Annual revenue loss string for testing
 */
function getTestRevenueLoss(level: SecurityLevel): string {
  const lossMap: Record<SecurityLevel, string> = {
    "None": "15% or more of annual revenue",
    "Low": "5-15% of annual revenue",
    "Moderate": "1-5% of annual revenue",
    "High": "Less than 1% of annual revenue",
    "Very High": "Negligible",
  };

  return lossMap[level] || "Unknown";
}

/**
 * Get test security icon for a security level
 * 
 * @param level - Security level
 * @returns Security icon string for testing
 */
function getTestSecurityIcon(level: SecurityLevel): string {
  const iconMap: Record<SecurityLevel, string> = {
    "None": "⚠️",
    "Low": "🔑",
    "Moderate": "🔒",
    "High": "🛡️",
    "Very High": "🔐",
  };

  return iconMap[level] || "❓";
}

/**
 * Get test validation method for a security level
 * 
 * @param level - Security level
 * @returns Validation method string for testing
 */
function getTestValidationMethod(level: SecurityLevel): string {
  const methodMap: Record<SecurityLevel, string> = {
    "None": "No validation",
    "Low": "Manual validation",
    "Moderate": "Automated validation",
    "High": "Cryptographic validation",
    "Very High": "Blockchain validation",
  };

  return methodMap[level] || "Unknown";
}

/**
 * Get test protection method for a security level
 * 
 * @param level - Security level
 * @returns Protection method string for testing
 */
function getTestProtectionMethod(level: SecurityLevel): string {
  const methodMap: Record<SecurityLevel, string> = {
    "None": "No protection",
    "Low": "Basic access control",
    "Moderate": "Standard encryption",
    "High": "Advanced encryption",
    "Very High": "Military-grade encryption",
  };

  return methodMap[level] || "Unknown";
}
