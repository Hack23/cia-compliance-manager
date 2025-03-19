import { COMPLIANCE_STATUS } from '../constants/coreConstants';
import { SecurityLevel, getSecurityLevelValue } from '../types/cia';
import { ComplianceStatus } from '../types/compliance';

/**
 * ComplianceService provides methods for determining compliance with various
 * security frameworks based on CIA security levels.
 * 
 * ## Business Perspective
 * 
 * This service helps organizations understand their compliance position against
 * industry standards and regulations. It maps CIA security levels to compliance
 * frameworks and identifies gaps that may need addressing. 📋
 * 
 * The mapping logic reflects real-world regulatory requirements and helps organizations
 * prepare for audits and certifications. 💼
 */
export class ComplianceService {
  // Expose COMPLIANCE_STATUS for use in components
  static readonly COMPLIANCE_STATUS = COMPLIANCE_STATUS;
  
  /**
   * Get compliance status based on CIA security levels
   * 
   * @param availabilityLevel - Current availability security level
   * @param integrityLevel - Current integrity security level
   * @param confidentialityLevel - Current confidentiality security level
   * @returns Compliance status with framework mapping and remediation steps
   */
  public static getComplianceStatus(
    availabilityLevel: SecurityLevel,
    integrityLevel: SecurityLevel,
    confidentialityLevel: SecurityLevel,
    options?: { industry?: string; region?: string }
  ): ComplianceStatus {
    // Get compliant frameworks based on security levels
    const compliantFrameworks = this.getCompliantFrameworks(
      availabilityLevel,
      integrityLevel,
      confidentialityLevel,
      'compliant'
    );
    
    // Get partially compliant frameworks
    const partiallyCompliantFrameworks = this.getCompliantFrameworks(
      availabilityLevel,
      integrityLevel,
      confidentialityLevel,
      'partial'
    );
    
    // Get non-compliant frameworks
    const nonCompliantFrameworks = this.getCompliantFrameworks(
      availabilityLevel,
      integrityLevel,
      confidentialityLevel,
      'non-compliant'
    );
    
    // Generate remediation steps based on compliance gaps
    const remediationSteps = this.generateRemediationSteps(
      nonCompliantFrameworks,
      partiallyCompliantFrameworks,
      availabilityLevel,
      integrityLevel,
      confidentialityLevel
    );
    
    // Generate requirements based on applicable frameworks
    const requirements = this.generateRequirements(
      [...compliantFrameworks, ...partiallyCompliantFrameworks, ...nonCompliantFrameworks]
    );
    
    // Calculate compliance score based on framework coverage
    const totalFrameworks = compliantFrameworks.length + partiallyCompliantFrameworks.length + nonCompliantFrameworks.length;
    const complianceScore = totalFrameworks > 0 
      ? Math.round((compliantFrameworks.length / totalFrameworks) * 100) 
      : 0;
      
    // Get status text
    const status = this.getComplianceStatusText(
      availabilityLevel,
      integrityLevel,
      confidentialityLevel
    );
    
    return {
      compliantFrameworks,
      partiallyCompliantFrameworks,
      nonCompliantFrameworks,
      remediationSteps,
      requirements,
      status,
      complianceScore
    };
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
  public static getCompliantFrameworks(
    availabilityLevel: SecurityLevel,
    integrityLevel: SecurityLevel,
    confidentialityLevel: SecurityLevel,
    complianceType: 'compliant' | 'partial' | 'non-compliant'
  ): string[] {
    // Define all supported frameworks
    const allFrameworks = [
      'NIST 800-53', 'ISO 27001', 'NIST CSF', 'GDPR', 
      'HIPAA', 'SOC2', 'PCI DSS', 'FISMA', 'CCPA',
      'FEDRAMP', 'CIS Controls'
    ];
    
    // Calculate framework statuses
    const frameworkStatuses = new Map<string, string>();
    
    for (const framework of allFrameworks) {
      const status = this.getFrameworkStatus(
        framework,
        availabilityLevel,
        integrityLevel,
        confidentialityLevel
      );
      frameworkStatuses.set(framework, status);
    }
    
    // Filter frameworks based on compliance type
    let filteredFrameworks: string[] = [];
    
    if (complianceType === 'compliant') {
      filteredFrameworks = allFrameworks.filter(fw => 
        frameworkStatuses.get(fw) === 'compliant'
      );
    } else if (complianceType === 'partial') {
      filteredFrameworks = allFrameworks.filter(fw => 
        frameworkStatuses.get(fw) === 'partial'
      );
    } else if (complianceType === 'non-compliant') {
      filteredFrameworks = allFrameworks.filter(fw => 
        frameworkStatuses.get(fw) === 'non-compliant'
      );
    }
    
    // Ensure framework lists are mutually exclusive
    return filteredFrameworks;
  }
  
  /**
   * Get compliance status text based on security levels
   * 
   * @param availabilityLevel - Availability security level
   * @param integrityLevel - Integrity security level
   * @param confidentialityLevel - Confidentiality security level
   * @returns Compliance status text
   */
  public static getComplianceStatusText(
    availabilityLevel: SecurityLevel,
    integrityLevel: SecurityLevel,
    confidentialityLevel: SecurityLevel
  ): string {
    const avgLevel = this.calculateAverageSecurityLevel(
      availabilityLevel,
      integrityLevel,
      confidentialityLevel
    );
    
    if (avgLevel >= 3.5) {
      return COMPLIANCE_STATUS.FULL_COMPLIANCE;
    } else if (avgLevel >= 2.5) {
      return COMPLIANCE_STATUS.STANDARD_COMPLIANCE;
    } else if (avgLevel >= 1.5) {
      return COMPLIANCE_STATUS.BASIC_COMPLIANCE;
    } else {
      return COMPLIANCE_STATUS.NON_COMPLIANT;
    }
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
  public static getFrameworkStatus(
    framework: string,
    availabilityLevel: SecurityLevel,
    integrityLevel: SecurityLevel,
    confidentialityLevel: SecurityLevel
  ): string {
    const frameworkLower = framework.toLowerCase();
    
    // Get required security levels for this framework
    const requiredAvailability = this.getFrameworkRequiredLevel(frameworkLower, 'availability');
    const requiredIntegrity = this.getFrameworkRequiredLevel(frameworkLower, 'integrity');
    const requiredConfidentiality = this.getFrameworkRequiredLevel(frameworkLower, 'confidentiality');
    
    // Get numeric values
    const availValue = getSecurityLevelValue(availabilityLevel);
    const integrityValue = getSecurityLevelValue(integrityLevel);
    const confidentialityValue = getSecurityLevelValue(confidentialityLevel);
    
    const reqAvailValue = getSecurityLevelValue(requiredAvailability);
    const reqIntegrityValue = getSecurityLevelValue(requiredIntegrity);
    const reqConfidentialityValue = getSecurityLevelValue(requiredConfidentiality);
    
    // Calculate how many components meet requirements
    let metComponents = 0;
    if (availValue >= reqAvailValue) metComponents++;
    if (integrityValue >= reqIntegrityValue) metComponents++;
    if (confidentialityValue >= reqConfidentialityValue) metComponents++;
    
    // Determine status based on met components
    if (metComponents === 3) {
      return 'compliant';
    } else if (metComponents >= 1) {
      return 'partial';
    } else {
      return 'non-compliant';
    }
  }
  
  /**
   * Get a description of a compliance framework
   * 
   * @param framework - Framework name
   * @returns Framework description
   */
  public static getFrameworkDescription(framework: string): string {
    const frameworkLower = framework.toLowerCase();
    
    const descriptions: Record<string, string> = {
      'nist 800-53': 'NIST Special Publication 800-53 provides security and privacy controls for federal information systems and organizations.',
      'iso 27001': 'ISO 27001 is an international standard for information security management systems (ISMS).',
      'nist csf': 'NIST Cybersecurity Framework provides guidelines for organizations to better manage and reduce cybersecurity risk.',
      'gdpr': 'General Data Protection Regulation is a regulation in EU law on data protection and privacy for all individuals within the EU.',
      'hipaa': 'Health Insurance Portability and Accountability Act sets standards for protecting sensitive patient health information.',
      'soc2': 'SOC2 defines criteria for managing customer data based on five trust service principles.',
      'pci dss': 'Payment Card Industry Data Security Standard is a set of security standards for organizations that handle credit cards.',
      'fisma': 'Federal Information Security Management Act defines a framework to protect government information and operations.',
      'ccpa': 'California Consumer Privacy Act enhances privacy rights and consumer protection for residents of California.',
      'fedramp': 'Federal Risk and Authorization Management Program provides a standardized approach to security assessment for cloud services.',
      'cis controls': 'Center for Internet Security Controls are a set of actions for cyber defense that provide specific ways to stop attacks.'
    };
    
    return descriptions[frameworkLower] || `${framework} is a security compliance framework.`;
  }
  
  /**
   * Get the required security level for a framework component
   * 
   * @param framework - Framework name
   * @param component - CIA component (availability, integrity, confidentiality)
   * @returns Required security level for the component
   */
  public static getFrameworkRequiredLevel(
    framework: string,
    component: 'availability' | 'integrity' | 'confidentiality'
  ): SecurityLevel {
    const frameworkLower = framework.toLowerCase();
    
    // Define required security levels for each framework and component
    const frameworkRequirements: Record<string, Record<string, SecurityLevel>> = {
      'nist 800-53': {
        availability: 'High',
        integrity: 'High',
        confidentiality: 'High'
      },
      'iso 27001': {
        availability: 'Moderate',
        integrity: 'High',
        confidentiality: 'High'
      },
      'nist csf': {
        availability: 'Moderate',
        integrity: 'Moderate',
        confidentiality: 'High'
      },
      'gdpr': {
        availability: 'Moderate',
        integrity: 'High',
        confidentiality: 'Very High'
      },
      'hipaa': {
        availability: 'High',
        integrity: 'High',
        confidentiality: 'Very High'
      },
      'soc2': {
        availability: 'Moderate',
        integrity: 'High',
        confidentiality: 'High'
      },
      'pci dss': {
        availability: 'High',
        integrity: 'High',
        confidentiality: 'Very High'
      },
      'fisma': {
        availability: 'High',
        integrity: 'High',
        confidentiality: 'High'
      },
      'ccpa': {
        availability: 'Low',
        integrity: 'Moderate',
        confidentiality: 'High'
      },
      'fedramp': {
        availability: 'High',
        integrity: 'High',
        confidentiality: 'High'
      },
      'cis controls': {
        availability: 'Moderate',
        integrity: 'Moderate',
        confidentiality: 'High'
      }
    };
    
    // Return framework requirement or default to Moderate
    if (frameworkRequirements[frameworkLower] && frameworkRequirements[frameworkLower][component]) {
      return frameworkRequirements[frameworkLower][component];
    }
    return 'Moderate';
  }
  
  /**
   * Check if a framework is applicable to a specific industry or region
   * 
   * @param framework - Framework name
   * @param industry - Industry name
   * @param region - Region name
   * @returns True if the framework is applicable
   */
  public static isFrameworkApplicable(
    framework: string,
    industry?: string,
    region?: string
  ): boolean {
    const frameworkLower = framework.toLowerCase();
    const industryLower = industry?.toLowerCase() || '';
    const regionLower = region?.toLowerCase() || '';
    
    // Industry-specific frameworks
    const industryFrameworks: Record<string, string[]> = {
      'healthcare': ['hipaa'],
      'finance': ['pci dss', 'soc2'],
      'government': ['fisma', 'fedramp', 'nist 800-53'],
      'retail': ['pci dss'],
      'technology': ['iso 27001', 'soc2', 'nist csf']
    };
    
    // Region-specific frameworks
    const regionFrameworks: Record<string, string[]> = {
      'eu': ['gdpr'],
      'us': ['hipaa', 'fisma', 'fedramp'],
      'california': ['ccpa']
    };
    
    // General frameworks that apply to all industries/regions
    const generalFrameworks = ['iso 27001', 'nist csf', 'cis controls'];
    
    // Check if framework is in general frameworks
    if (generalFrameworks.includes(frameworkLower)) {
      return true;
    }
    
    // Check if framework applies to the industry
    if (industry && industryLower in industryFrameworks) {
      if (industryFrameworks[industryLower].includes(frameworkLower)) {
        return true;
      }
    }
    
    // Check if framework applies to the region
    if (region && regionLower in regionFrameworks) {
      if (regionFrameworks[regionLower].includes(frameworkLower)) {
        return true;
      }
    }
    
    return false;
  }
  
  /**
   * Generate remediation steps for non-compliant frameworks
   * 
   * @param nonCompliantFrameworks - Array of non-compliant framework names
   * @param partiallyCompliantFrameworks - Array of partially compliant framework names
   * @param availabilityLevel - Current availability security level
   * @param integrityLevel - Current integrity security level
   * @param confidentialityLevel - Current confidentiality security level
   * @returns Array of remediation steps
   */
  private static generateRemediationSteps(
    nonCompliantFrameworks: string[],
    partiallyCompliantFrameworks: string[],
    availabilityLevel: SecurityLevel,
    integrityLevel: SecurityLevel,
    confidentialityLevel: SecurityLevel
  ): string[] {
    const steps: string[] = [];
    
    // Handle non-compliant frameworks
    nonCompliantFrameworks.forEach(framework => {
      const lowerFramework = framework.toLowerCase();
      
      if (lowerFramework === 'gdpr') {
        steps.push('Implement comprehensive data subject rights procedures');
        steps.push('Conduct data protection impact assessments');
        steps.push('Establish data breach notification procedures');
      } else if (lowerFramework === 'hipaa') {
        steps.push('Implement technical safeguards for PHI');
        steps.push('Establish business associate agreements');
        steps.push('Develop incident response procedures for healthcare data');
      } else if (lowerFramework === 'pci dss') {
        steps.push('Implement strong access control measures for cardholder data');
        steps.push('Regularly test security systems and processes');
        steps.push('Maintain an information security policy');
      } else if (lowerFramework === 'nist 800-53') {
        steps.push('Implement security controls according to NIST 800-53 guidelines');
        steps.push('Develop system security plans');
        steps.push('Conduct security assessments regularly');
      } else if (lowerFramework === 'iso 27001') {
        steps.push('Establish an Information Security Management System (ISMS)');
        steps.push('Conduct risk assessments and implement risk treatment plans');
        steps.push('Develop security policies and procedures');
      } else {
        steps.push(`Enhance security controls to meet ${framework} requirements`);
      }
    });
    
    // Handle partially compliant frameworks
    partiallyCompliantFrameworks.forEach(framework => {
      const lowerFramework = framework.toLowerCase();
      const reqAvail = this.getFrameworkRequiredLevel(lowerFramework, 'availability');
      const reqInt = this.getFrameworkRequiredLevel(lowerFramework, 'integrity');
      const reqConf = this.getFrameworkRequiredLevel(lowerFramework, 'confidentiality');
      
      if (getSecurityLevelValue(availabilityLevel) < getSecurityLevelValue(reqAvail)) {
        steps.push(`Improve availability controls to meet ${framework} requirements (${reqAvail} level required)`);
      }
      
      if (getSecurityLevelValue(integrityLevel) < getSecurityLevelValue(reqInt)) {
        steps.push(`Enhance integrity controls to meet ${framework} requirements (${reqInt} level required)`);
      }
      
      if (getSecurityLevelValue(confidentialityLevel) < getSecurityLevelValue(reqConf)) {
        steps.push(`Strengthen confidentiality controls to meet ${framework} requirements (${reqConf} level required)`);
      }
    });
    
    // Remove duplicates
    return [...new Set(steps)];
  }
  
  /**
   * Generate requirements for applicable frameworks
   * 
   * @param frameworks - Array of framework names
   * @returns Array of framework requirements
   */
  private static generateRequirements(frameworks: string[]): string[] {
    const requirements: string[] = [];
    
    frameworks.forEach(framework => {
      const lowerFramework = framework.toLowerCase();
      
      if (lowerFramework === 'gdpr') {
        requirements.push('Implement data subject access rights');
        requirements.push('Ensure lawful basis for processing');
        requirements.push('Maintain records of processing activities');
      } else if (lowerFramework === 'hipaa') {
        requirements.push('Implement technical safeguards for PHI');
        requirements.push('Maintain audit controls and integrity controls');
        requirements.push('Establish appropriate authentication mechanisms');
      } else if (lowerFramework === 'pci dss') {
        requirements.push('Build and maintain secure network and systems');
        requirements.push('Protect cardholder data');
        requirements.push('Maintain vulnerability management program');
      }
    });
    
    // Remove duplicates
    return [...new Set(requirements)];
  }
  
  /**
   * Calculate average security level value
   * 
   * @param availabilityLevel - Availability security level
   * @param integrityLevel - Integrity security level
   * @param confidentialityLevel - Confidentiality security level
   * @returns Average security level value
   */
  private static calculateAverageSecurityLevel(
    availabilityLevel: SecurityLevel,
    integrityLevel: SecurityLevel,
    confidentialityLevel: SecurityLevel
  ): number {
    const availValue = getSecurityLevelValue(availabilityLevel);
    const integrityValue = getSecurityLevelValue(integrityLevel);
    const confidentialityValue = getSecurityLevelValue(confidentialityLevel);
    
    return (availValue + integrityValue + confidentialityValue) / 3;
  }
}

/**
 * Factory function to create a ComplianceService instance
 * 
 * @returns ComplianceService instance
 */
export function createComplianceService(): typeof ComplianceService {
  return ComplianceService;
}

export default ComplianceService;
