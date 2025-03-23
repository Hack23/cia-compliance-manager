import { SecurityLevel } from "../types/cia";
import { ComplianceStatusDetails } from "./complianceService";
import { ComplianceServiceAdapter } from "./ComplianceServiceAdapter";

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
