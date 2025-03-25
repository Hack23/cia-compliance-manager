/**
 * Data provider interface for CIA services
 */
export interface CIADataProvider {
  /**
   * Initialize the data provider
   */
  initialize: () => Promise<boolean>;

  /**
   * Get security level details
   * @param component - CIA component
   * @param level - Security level
   */
  getSecurityLevelDetails: (component: string, level: string) => Promise<any>;

  /**
   * Get security level recommendations
   * @param component - CIA component
   * @param level - Security level
   */
  getSecurityLevelRecommendations: (
    component: string,
    level: string
  ) => Promise<string[]>;

  /**
   * Get compliance frameworks
   */
  getComplianceFrameworks: () => Promise<any[]>;

  /**
   * Get compliance requirements
   */
  getComplianceRequirements: () => Promise<Record<string, any>>;

  /**
   * Get business impact data
   * @param component - CIA component
   * @param level - Security level
   */
  getBusinessImpact: (component: string, level: string) => Promise<any>;

  /**
   * Get security metrics
   * @param availabilityLevel - Availability security level
   * @param integrityLevel - Integrity security level
   * @param confidentialityLevel - Confidentiality security level
   */
  getSecurityMetrics: (
    availabilityLevel: string,
    integrityLevel: string,
    confidentialityLevel: string
  ) => Promise<any>;

  /**
   * Get security resources
   * @param filter - Optional resource filter
   */
  getSecurityResources: (filter?: string) => Promise<any[]>;

  /**
   * Get SLA metrics
   * @param level - Security level
   */
  getSLAMetrics: (level: string) => Promise<any>;

  /**
   * Get cost estimates
   * @param level - Security level
   */
  getCostEstimates: (level: string) => Promise<any>;

  /**
   * Get value creation metrics
   * @param level - Security level
   */
  getValueCreationMetrics: (level: string) => Promise<any>;

  /**
   * Get implementation details
   * @param component - CIA component
   * @param level - Security level
   */
  getImplementationDetails: (component: string, level: string) => Promise<any>;

  /**
   * Get remediation steps
   * @param framework - Compliance framework
   */
  getRemediationSteps: (framework: string) => Promise<string[]>;
}
