import { COMPLIANCE_FRAMEWORKS } from "../constants/complianceConstants";
import { SecurityLevel } from "../types/cia";
import { CIADataProvider } from "../types/cia-services";
import { ComplianceStatusDetails } from "../types/compliance";
import {
  ComplianceGapAnalysis,
  ComplianceServiceAdapter,
} from "./ComplianceServiceAdapter";

/**
 * Test helper for compliance service functions
 * Provides simplified access to ComplianceServiceAdapter methods for testing
 */
export class ComplianceServiceStatic {
  /**
   * Get compliance status text for tests
   */
  static getComplianceStatusText(
    availabilityLevel: SecurityLevel,
    integrityLevel: SecurityLevel = availabilityLevel,
    confidentialityLevel: SecurityLevel = availabilityLevel
  ): string {
    const adapter = new ComplianceServiceAdapter({} as any);
    return adapter.getComplianceStatusText(
      availabilityLevel,
      integrityLevel,
      confidentialityLevel
    );
  }

  /**
   * Get compliance status for tests
   */
  static getComplianceStatus(
    availabilityLevel: SecurityLevel,
    integrityLevel: SecurityLevel,
    confidentialityLevel: SecurityLevel
  ): ComplianceStatusDetails {
    const adapter = new ComplianceServiceAdapter({} as any);
    return adapter.getComplianceStatus(
      availabilityLevel,
      integrityLevel,
      confidentialityLevel
    );
  }

  /**
   * Get framework description for tests
   */
  static getFrameworkDescription(framework: string): string {
    const adapter = new ComplianceServiceAdapter({} as any);
    return adapter.getFrameworkDescription(framework);
  }
}

// Add this explicit export to ensure it's available
export default ComplianceServiceStatic;

/**
 * Generate mock compliance status for testing
 *
 * @param overrides - Optional overrides for the mock data
 * @returns Mock compliance status
 */
export function createMockComplianceStatus(
  overrides?: Partial<ComplianceStatusDetails>
): ComplianceStatusDetails {
  return {
    compliantFrameworks: [
      COMPLIANCE_FRAMEWORKS.ISO_27001,
      COMPLIANCE_FRAMEWORKS.NIST_CSF,
    ],
    partiallyCompliantFrameworks: [COMPLIANCE_FRAMEWORKS.GDPR],
    nonCompliantFrameworks: [
      COMPLIANCE_FRAMEWORKS.HIPAA,
      COMPLIANCE_FRAMEWORKS.PCI_DSS,
    ],
    remediationSteps: ["Improve security controls", "Implement encryption"],
    requirements: ["Data protection", "Access control"],
    status: "Partially Compliant",
    complianceScore: 60,
    ...overrides,
  };
}

/**
 * Generate mock compliance gap analysis for testing
 *
 * @param isCompliant - Whether the analysis should show compliance
 * @param overrides - Optional overrides for the mock data
 * @returns Mock compliance gap analysis
 */
export function createMockGapAnalysis(
  isCompliant: boolean,
  overrides?: Partial<ComplianceGapAnalysis>
): ComplianceGapAnalysis {
  if (isCompliant) {
    return {
      isCompliant: true,
      gaps: [],
      recommendations: ["Maintain current controls", "Regular reviews"],
      ...overrides,
    };
  }

  return {
    isCompliant: false,
    gaps: ["Insufficient security controls", "Missing documentation"],
    recommendations: ["Implement required controls", "Document procedures"],
    ...overrides,
  };
}

/**
 * Generate mock compliance status based on security levels
 *
 * @param availabilityLevel - Availability security level
 * @param integrityLevel - Integrity security level
 * @param confidentialityLevel - Confidentiality security level
 * @returns Mock compliance status
 */
export function createLevelBasedComplianceStatus(
  availabilityLevel: SecurityLevel,
  integrityLevel: SecurityLevel,
  confidentialityLevel: SecurityLevel
): ComplianceStatusDetails {
  // Calculate a simple compliance score based on security levels
  const levelValues: Record<SecurityLevel, number> = {
    None: 0,
    Low: 25,
    Moderate: 50,
    High: 75,
    "Very High": 100,
  };

  const avgScore = Math.round(
    (levelValues[availabilityLevel] +
      levelValues[integrityLevel] +
      levelValues[confidentialityLevel]) /
      3
  );

  // Determine compliant frameworks based on score
  const compliantFrameworks: string[] = [];
  const partiallyCompliantFrameworks: string[] = [];
  const nonCompliantFrameworks: string[] = [];

  if (avgScore >= 75) {
    compliantFrameworks.push(
      COMPLIANCE_FRAMEWORKS.ISO_27001,
      COMPLIANCE_FRAMEWORKS.NIST_CSF,
      COMPLIANCE_FRAMEWORKS.SOC2
    );
    partiallyCompliantFrameworks.push(
      COMPLIANCE_FRAMEWORKS.GDPR,
      COMPLIANCE_FRAMEWORKS.HIPAA
    );
    nonCompliantFrameworks.push(COMPLIANCE_FRAMEWORKS.PCI_DSS);
  } else if (avgScore >= 50) {
    compliantFrameworks.push(COMPLIANCE_FRAMEWORKS.NIST_CSF);
    partiallyCompliantFrameworks.push(
      COMPLIANCE_FRAMEWORKS.ISO_27001,
      COMPLIANCE_FRAMEWORKS.SOC2
    );
    nonCompliantFrameworks.push(
      COMPLIANCE_FRAMEWORKS.GDPR,
      COMPLIANCE_FRAMEWORKS.HIPAA,
      COMPLIANCE_FRAMEWORKS.PCI_DSS
    );
  } else if (avgScore >= 25) {
    partiallyCompliantFrameworks.push(COMPLIANCE_FRAMEWORKS.NIST_CSF);
    nonCompliantFrameworks.push(
      COMPLIANCE_FRAMEWORKS.ISO_27001,
      COMPLIANCE_FRAMEWORKS.SOC2,
      COMPLIANCE_FRAMEWORKS.GDPR,
      COMPLIANCE_FRAMEWORKS.HIPAA,
      COMPLIANCE_FRAMEWORKS.PCI_DSS
    );
  } else {
    nonCompliantFrameworks.push(
      COMPLIANCE_FRAMEWORKS.ISO_27001,
      COMPLIANCE_FRAMEWORKS.NIST_CSF,
      COMPLIANCE_FRAMEWORKS.SOC2,
      COMPLIANCE_FRAMEWORKS.GDPR,
      COMPLIANCE_FRAMEWORKS.HIPAA,
      COMPLIANCE_FRAMEWORKS.PCI_DSS
    );
  }

  // Determine status
  let status = "Non-Compliant";
  if (compliantFrameworks.length > 0 && nonCompliantFrameworks.length === 0) {
    status = "Fully Compliant";
  } else if (
    compliantFrameworks.length > 0 ||
    partiallyCompliantFrameworks.length > 0
  ) {
    status = "Partially Compliant";
  }

  // Example remediation steps
  const remediationSteps: string[] = [];
  if (availabilityLevel === "None" || availabilityLevel === "Low") {
    remediationSteps.push("Improve availability controls");
  }
  if (integrityLevel === "None" || integrityLevel === "Low") {
    remediationSteps.push("Enhance data integrity controls");
  }
  if (confidentialityLevel === "None" || confidentialityLevel === "Low") {
    remediationSteps.push("Strengthen confidentiality measures");
  }
  if (remediationSteps.length === 0) {
    remediationSteps.push("Maintain current security controls");
  }

  // Example requirements
  const requirements = [
    "Information security management",
    "Risk assessment and treatment",
    "Security policy and documentation",
  ];

  return {
    compliantFrameworks,
    partiallyCompliantFrameworks,
    nonCompliantFrameworks,
    remediationSteps,
    requirements,
    status,
    complianceScore: avgScore,
  };
}

/**
 * Mock service class for testing components that use ComplianceService
 */
export class MockComplianceService {
  getComplianceStatus(
    availabilityLevel: SecurityLevel,
    integrityLevel: SecurityLevel,
    confidentialityLevel: SecurityLevel
  ): ComplianceStatusDetails {
    return createLevelBasedComplianceStatus(
      availabilityLevel,
      integrityLevel,
      confidentialityLevel
    );
  }

  getComplianceStatusText(): string {
    return "Partially Compliant";
  }

  getFrameworkDescription(framework: string): string {
    return `Description for ${framework}`;
  }

  getComplianceGapAnalysis(
    availabilityLevel: SecurityLevel,
    integrityLevel: SecurityLevel,
    confidentialityLevel: SecurityLevel,
    _framework: string
  ): ComplianceGapAnalysis {
    const levelValues: Record<SecurityLevel, number> = {
      None: 0,
      Low: 1,
      Moderate: 2,
      High: 3,
      "Very High": 4,
    };

    const avgScore =
      (levelValues[availabilityLevel] +
        levelValues[integrityLevel] +
        levelValues[confidentialityLevel]) /
      3;

    if (avgScore >= 2.5) {
      return createMockGapAnalysis(true);
    }

    return createMockGapAnalysis(false);
  }

  getFrameworkRequiredLevel(
    framework: string,
    component: "availability" | "integrity" | "confidentiality"
  ): SecurityLevel {
    if (
      component === "confidentiality" &&
      framework === COMPLIANCE_FRAMEWORKS.GDPR
    ) {
      return "High";
    }
    return "Moderate";
  }
}

/**
 * Function to get compliance status text for testing
 */
export function getComplianceStatusTextForTest(
  availabilityLevel: SecurityLevel,
  integrityLevel: SecurityLevel,
  confidentialityLevel: SecurityLevel,
  dataProvider?: CIADataProvider
): string {
  // Create adapter or use provided one
  const adapter = new ComplianceServiceAdapter(
    dataProvider || ({} as CIADataProvider)
  );

  // Call getComplianceStatusText method
  return adapter.getComplianceStatusText(
    availabilityLevel,
    integrityLevel,
    confidentialityLevel
  );
}

/**
 * Function to get compliance status for testing
 */
export function getComplianceStatusForTest(
  availabilityLevel: SecurityLevel,
  integrityLevel: SecurityLevel,
  confidentialityLevel: SecurityLevel,
  dataProvider?: CIADataProvider
) {
  // Create adapter or use provided one
  const adapter = new ComplianceServiceAdapter(
    dataProvider || ({} as CIADataProvider)
  );

  // Get compliance status
  return adapter.getComplianceStatus(
    availabilityLevel,
    integrityLevel,
    confidentialityLevel
  );
}
