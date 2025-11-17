import { SecurityLevel } from "./cia";
import { ComplianceStatus } from "./compliance";

/**
 * Declaration file for ComplianceService types to support both static and instance methods
 * This helps maintain backward compatibility with existing tests
 */

declare module './complianceService' {
  export class ComplianceService {
    // Static methods
    static readonly COMPLIANCE_STATUS: Record<string, string>;
    
    static getComplianceStatus(
      availabilityLevel: SecurityLevel,
      integrityLevel: SecurityLevel,
      confidentialityLevel: SecurityLevel,
      options?: { industry?: string; region?: string }
    ): ComplianceStatus;
    
    static getCompliantFrameworks(
      availabilityLevel: SecurityLevel,
      integrityLevel: SecurityLevel,
      confidentialityLevel: SecurityLevel,
      complianceType: 'compliant' | 'partial' | 'non-compliant'
    ): string[];
    
    static getComplianceStatusText(
      availabilityLevel: SecurityLevel,
      integrityLevel: SecurityLevel,
      confidentialityLevel: SecurityLevel
    ): string;
    
    static getFrameworkStatus(
      framework: string,
      availabilityLevel: SecurityLevel,
      integrityLevel: SecurityLevel,
      confidentialityLevel: SecurityLevel
    ): string;
    
    static getFrameworkDescription(framework: string): string;
    
    static getFrameworkRequiredLevel(
      framework: string,
      component: 'availability' | 'integrity' | 'confidentiality'
    ): SecurityLevel;
    
    static isFrameworkApplicable(
      framework: string,
      industry?: string,
      region?: string
    ): boolean;
    
    // Support for instance-based testing
    static create(dataProvider?: Record<string, unknown>): ComplianceServiceAdapter;
    
    // Instance methods (for compatibility with tests)
    constructor(dataProvider?: Record<string, unknown>);
    
    getComplianceStatus(
      availabilityLevel: SecurityLevel,
      integrityLevel: SecurityLevel,
      confidentialityLevel: SecurityLevel,
      options?: { industry?: string; region?: string }
    ): ComplianceStatus;
    
    getCompliantFrameworks(
      availabilityLevel: SecurityLevel,
      integrityLevel: SecurityLevel,
      confidentialityLevel: SecurityLevel,
      complianceType?: 'compliant' | 'partial' | 'non-compliant'
    ): string[];
    
    getComplianceStatusText(
      availabilityLevel: SecurityLevel,
      integrityLevel?: SecurityLevel,
      confidentialityLevel?: SecurityLevel
    ): string;
    
    getFrameworkStatus(
      framework: string,
      availabilityLevel: SecurityLevel,
      integrityLevel: SecurityLevel,
      confidentialityLevel: SecurityLevel
    ): string;
    
    getFrameworkDescription(framework: string): string;
    
    getFrameworkRequiredLevel(
      framework: string,
      component: 'availability' | 'integrity' | 'confidentiality'
    ): SecurityLevel;
    
    isFrameworkApplicable(
      framework: string,
      industry?: string,
      region?: string
    ): boolean;
  }
  
  interface ComplianceServiceAdapter {
    getComplianceStatus(
      availabilityLevel: SecurityLevel,
      integrityLevel: SecurityLevel,
      confidentialityLevel: SecurityLevel,
      options?: { industry?: string; region?: string }
    ): ComplianceStatus;
    
    getCompliantFrameworks(
      availabilityLevel: SecurityLevel,
      integrityLevel: SecurityLevel,
      confidentialityLevel: SecurityLevel,
      complianceType?: 'compliant' | 'partial' | 'non-compliant'
    ): string[];
    
    getComplianceStatusText(
      availabilityLevel: SecurityLevel,
      integrityLevel?: SecurityLevel,
      confidentialityLevel?: SecurityLevel
    ): string;
    
    getFrameworkStatus(
      framework: string,
      availabilityLevel: SecurityLevel,
      integrityLevel: SecurityLevel,
      confidentialityLevel: SecurityLevel
    ): string;
    
    getFrameworkDescription(framework: string): string;
    
    getFrameworkRequiredLevel(
      framework: string,
      component: 'availability' | 'integrity' | 'confidentiality'
    ): SecurityLevel;
    
    isFrameworkApplicable(
      framework: string,
      industry?: string,
      region?: string
    ): boolean;
  }
  
  export function createComplianceService(): typeof ComplianceService;
  export default ComplianceService;
}
