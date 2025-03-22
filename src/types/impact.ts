/**
 * Types related to business impact analysis
 * 
 * ## Business Perspective
 * 
 * These types represent the business impact aspects of security levels
 * and help organizations understand the potential consequences of
 * security incidents across different dimensions. 💼
 */

/**
 * Enhanced interface for business impact details
 */
export interface BusinessImpactDetails {
  /**
   * Overall summary of business impact
   */
  summary: string;

  /**
   * Financial impact details
   */
  financial: {
    /**
     * Risk level of financial impact
     */
    riskLevel: string;
    /**
     * Description of financial impact
     */
    description: string;
    /**
     * Estimated annual revenue loss
     */
    annualRevenueLoss?: string;
  };

  /**
   * Operational impact details
   */
  operational: {
    /**
     * Risk level of operational impact
     */
    riskLevel: string;
    /**
     * Description of operational impact
     */
    description: string;
    /**
     * Mean time to recover from incidents
     */
    meanTimeToRecover?: string;
  };

  /**
   * Reputational impact details
   */
  reputational?: {
    /**
     * Risk level of reputational impact
     */
    riskLevel: string;
    /**
     * Description of reputational impact
     */
    description: string;
  };

  /**
   * Regulatory impact details
   */
  regulatory?: {
    /**
     * Risk level of regulatory impact
     */
    riskLevel: string;
    /**
     * Description of regulatory impact
     */
    description: string;
    /**
     * List of potential compliance violations
     */
    complianceViolations?: string[];
  };

  /**
   * Strategic impact details
   */
  strategic?: {
    /**
     * Risk level of strategic impact
     */
    riskLevel: string;
    /**
     * Description of strategic impact
     */
    description: string;
    /**
     * Competitive advantage implications
     */
    competitiveAdvantage?: string;
  };
}

/**
 * Business impact detail for a specific aspect
 */
export interface BusinessImpactDetail {
  /**
   * Description of the business impact
   */
  description?: string;

  /**
   * Risk level associated with this impact
   */
  riskLevel?: string;

  /**
   * Estimated annual revenue loss
   */
  annualRevenueLoss?: string;

  /**
   * Mean time to recover from incidents
   */
  meanTimeToRecover?: string;

  /**
   * List of potential compliance violations
   */
  complianceViolations?: string[];
}
