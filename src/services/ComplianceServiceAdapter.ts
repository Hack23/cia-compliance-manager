import { SecurityLevel } from '../types/cia';
import { ComplianceStatus } from '../types/compliance';
import ComplianceService from './complianceService';

/**
 * Adapter class for ComplianceService that provides instance methods
 * wrapping the static methods of ComplianceService
 * 
 * This is provided for backward compatibility with existing tests
 * and components that expect an instance-based API.
 */
export class ComplianceServiceAdapter {
  /**
   * Create a new ComplianceServiceAdapter
   * 
   * @param dataProvider - Optional data provider (not used in implementation)
   */
  constructor(private dataProvider?: any) {}
  
  /**
   * Get compliance status based on CIA security levels
   * 
   * @param availabilityLevel - Current availability security level
   * @param integrityLevel - Current integrity security level
   * @param confidentialityLevel - Current confidentiality security level
   * @param options - Optional configuration options
   * @returns Compliance status with framework mapping and remediation steps
   */
  public getComplianceStatus(
    availabilityLevel: SecurityLevel,
    integrityLevel: SecurityLevel,
    confidentialityLevel: SecurityLevel,
    options?: { industry?: string; region?: string }
  ): ComplianceStatus {
    return ComplianceService.getComplianceStatus(
      availabilityLevel,
      integrityLevel,
      confidentialityLevel,
      options
    );
  }
  
  /**
   * Get compliant frameworks based on security levels and compliance type
   * 
   * @param availabilityLevel - Availability security level
   * @param integrityLevel - Integrity security level
   * @param confidentialityLevel - Confidentiality security level
   * @param complianceType - Type of compliance to check (compliant, partial, non-compliant)
   * @returns Array of framework names
   */
  public getCompliantFrameworks(
    availabilityLevel: SecurityLevel,
    integrityLevel: SecurityLevel,
    confidentialityLevel: SecurityLevel,
    complianceType?: 'compliant' | 'partial' | 'non-compliant'
  ): string[] {
    return ComplianceService.getCompliantFrameworks(
      availabilityLevel,
      integrityLevel,
      confidentialityLevel,
      complianceType || 'compliant'
    );
  }
  
  /**
   * Get compliance status text based on security levels
   * 
   * @param availabilityLevel - Availability security level
   * @param integrityLevel - Integrity security level
   * @param confidentialityLevel - Confidentiality security level
   * @returns Compliance status text
   */
  public getComplianceStatusText(
    availabilityLevel: SecurityLevel,
    integrityLevel?: SecurityLevel,
    confidentialityLevel?: SecurityLevel
  ): string {
    return ComplianceService.getComplianceStatusText(
      availabilityLevel,
      integrityLevel || availabilityLevel,
      confidentialityLevel || availabilityLevel
    );
  }
  
  /**
   * Determine compliance status for a specific framework based on security levels
   * 
   * @param framework - Framework name
   * @param availabilityLevel - Availability security level
   * @param integrityLevel - Integrity security level
   * @param confidentialityLevel - Confidentiality security level
   * @returns Framework compliance status (compliant, partial, non-compliant)
   */
  public getFrameworkStatus(
    framework: string,
    availabilityLevel: SecurityLevel,
    integrityLevel: SecurityLevel,
    confidentialityLevel: SecurityLevel
  ): string {
    return ComplianceService.getFrameworkStatus(
      framework,
      availabilityLevel,
      integrityLevel,
      confidentialityLevel
    );
  }
  
  /**
   * Get a description of a compliance framework
   * 
   * @param framework - Framework name
   * @returns Framework description
   */
  public getFrameworkDescription(framework: string): string {
    return ComplianceService.getFrameworkDescription(framework);
  }
  
  /**
   * Get the required security level for a framework component
   * 
   * @param framework - Framework name
   * @param component - CIA component (availability, integrity, confidentiality)
   * @returns Required security level for the component
   */
  public getFrameworkRequiredLevel(
    framework: string,
    component: 'availability' | 'integrity' | 'confidentiality'
  ): SecurityLevel {
    return ComplianceService.getFrameworkRequiredLevel(framework, component);
  }
  
  /**
   * Check if a framework is applicable to a specific industry or region
   * 
   * @param framework - Framework name
   * @param industry - Industry name
   * @param region - Region name
   * @returns True if the framework is applicable
   */
  public isFrameworkApplicable(
    framework: string,
    industry?: string,
    region?: string
  ): boolean {
    return ComplianceService.isFrameworkApplicable(framework, industry, region);
  }
}

/**
 * Factory function for ComplianceServiceAdapter
 * This is included for compatibility with the factory pattern used elsewhere
 * 
 * @param dataProvider - Optional data provider
 * @returns A new ComplianceServiceAdapter instance
 */
export function createComplianceServiceAdapter(dataProvider?: any): ComplianceServiceAdapter {
  return new ComplianceServiceAdapter(dataProvider);
}

// Add the create method to ComplianceService for backward compatibility with tests
// Use function property assignment to avoid TypeScript error
(ComplianceService as any).create = (dataProvider?: any) => new ComplianceServiceAdapter(dataProvider);

export default ComplianceServiceAdapter;
