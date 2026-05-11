/**
 * # Technical Implementation Service
 *
 * Provides technical implementation details and guidance for CIA security components.
 *
 * ## Business Perspective
 * Delivers actionable technical specifications for implementing security controls
 * at each security level, bridging the gap between security policy and technical
 * implementation. Supports development teams in implementing appropriate controls. 🔧
 *
 * @packageDocumentation
 */

import { SecurityLevel } from "../types/cia";
import { CIAComponentType, CIADataProvider, TechnicalImplementationDetails } from "../types/cia-services";
import { ITechnicalImplementationService } from "../types/services";
import { getDefaultTechnicalImplementation } from "../utils/technicalDetailsDefaults";
import { BaseService } from "./BaseService";

/**
 * Service for technical implementation details
 *
 * Provides detailed technical specifications and implementation guidance
 * for each CIA component at various security levels.
 */
export class TechnicalImplementationService extends BaseService implements ITechnicalImplementationService {
  /**
   * Service name for identification
   */
  public readonly name: string = 'TechnicalImplementationService';

  /**
   * Create a new TechnicalImplementationService instance
   *
   * @param dataProvider - Data provider for CIA security information
   * @throws {ServiceError} If dataProvider is not provided
   */
  constructor(dataProvider: CIADataProvider) {
    super(dataProvider);
  }

  /**
   * Get technical implementation details for a CIA component and security level
   *
   * Returns comprehensive technical specifications including implementation steps,
   * effort requirements, validation methods, and deployment considerations for the
   * specified CIA component at the given security level.
   *
   * @param component - CIA component type (availability, integrity, confidentiality)
   * @param level - Security level (None, Low, Moderate, High, Very High)
   * @returns Technical implementation details with steps, effort, and specifications
   *
   * @example
   * ```typescript
   * const details = service.getTechnicalImplementation('availability', 'High');
   * console.log(details.implementationSteps);
   * // ['Implement redundant systems', 'Configure load balancing', ...]
   * console.log(details.effort.development); // '3-6 months'
   * ```
   */
  public getTechnicalImplementation(
    component: CIAComponentType,
    level: SecurityLevel
  ): TechnicalImplementationDetails {
    const details = this.getComponentDetails(component, level);
    
    if (details?.technicalImplementation) {
      return details.technicalImplementation;
    }

    const implementationSteps = details?.implementationSteps || [];
    const effort = details?.effort || { development: '', maintenance: '', expertise: '' };

    if (implementationSteps.length > 0 || (effort.development && effort.maintenance && effort.expertise)) {
      return {
        description: details?.technical || details?.description || '',
        implementationSteps,
        effort,
        validationMethod: component === 'integrity' ? details?.validationMethod : undefined,
        protectionMethod: component === 'confidentiality' ? details?.protectionMethod : undefined,
        recoveryMethod: component === 'availability' ? details?.recommendations?.[0] : undefined,
      };
    }

    return getDefaultTechnicalImplementation(component, level);
  }

  /**
   * Get implementation steps for a component at a security level
   *
   * @param component - CIA component type
   * @param level - Security level
   * @returns Array of implementation step strings
   */
  public getImplementationSteps(
    component: CIAComponentType,
    level: SecurityLevel
  ): string[] {
    return this.getTechnicalImplementation(component, level).implementationSteps;
  }

  /**
   * Get required expertise for a component at a security level
   *
   * @param component - CIA component type
   * @param level - Security level
   * @returns Required expertise level description
   */
  public getRequiredExpertise(
    component: CIAComponentType,
    level: SecurityLevel
  ): string {
    const details = this.getComponentDetails(component, level);
    
    if (details?.requiredExpertise) {
      return details.requiredExpertise;
    }

    return this.getTechnicalImplementation(component, level).effort.expertise;
  }

  /**
   * Get technical recommendations for a CIA component and security level
   *
   * @param component - CIA component type
   * @param level - Security level
   * @returns Array of recommendation strings
   */
  public getRecommendations(
    component: CIAComponentType,
    level: SecurityLevel
  ): string[] {
    const details = this.getComponentDetails(component, level);
    return details?.recommendations || [];
  }

  /**
   * Get uptime requirement for availability component
   *
   * @param level - Security level
   * @returns Uptime requirement string (e.g., '99.9%')
   */
  public getUptimeRequirement(level: SecurityLevel): string {
    const details = this.getComponentDetails('availability', level);
    return details?.uptime || this.getDefaultUptimeRequirement(level);
  }

  /**
   * Get recovery time objective for availability component
   *
   * @param level - Security level
   * @returns RTO string
   */
  public getRecoveryTimeObjective(level: SecurityLevel): string {
    const details = this.getComponentDetails('availability', level);
    return details?.rto || this.getDefaultRTO(level);
  }

  /**
   * Get recovery point objective for availability component
   *
   * @param level - Security level
   * @returns RPO string
   */
  public getRecoveryPointObjective(level: SecurityLevel): string {
    const details = this.getComponentDetails('availability', level);
    return details?.rpo || this.getDefaultRPO(level);
  }

  /**
   * Get validation method for integrity component
   *
   * @param level - Security level
   * @returns Validation method description
   */
  public getValidationMethod(level: SecurityLevel): string {
    const details = this.getComponentDetails('integrity', level);
    return details?.validationMethod || 'Not specified';
  }

  /**
   * Get protection method for confidentiality component
   *
   * @param level - Security level
   * @returns Protection method description
   */
  public getProtectionMethod(level: SecurityLevel): string {
    const details = this.getComponentDetails('confidentiality', level);
    return details?.protectionMethod || 'Not specified';
  }

  /**
   * Get default uptime requirement based on security level
   */
  private getDefaultUptimeRequirement(level: SecurityLevel): string {
    const uptimeMap: Record<SecurityLevel, string> = {
      None: '< 90%',
      Low: '95%',
      Moderate: '99%',
      High: '99.9%',
      'Very High': '99.99%',
    };
    return uptimeMap[level] || '99%';
  }

  /**
   * Get default RTO based on security level
   */
  private getDefaultRTO(level: SecurityLevel): string {
    const rtoMap: Record<SecurityLevel, string> = {
      None: 'No defined RTO',
      Low: '72 hours',
      Moderate: '24 hours',
      High: '4 hours',
      'Very High': '15 minutes',
    };
    return rtoMap[level] || '24 hours';
  }

  /**
   * Get default RPO based on security level
   */
  private getDefaultRPO(level: SecurityLevel): string {
    const rpoMap: Record<SecurityLevel, string> = {
      None: 'No defined RPO',
      Low: '24 hours',
      Moderate: '8 hours',
      High: '1 hour',
      'Very High': '5 minutes',
    };
    return rpoMap[level] || '8 hours';
  }
}

/**
 * Create TechnicalImplementationService with the provided data provider
 */
export function createTechnicalImplementationService(
  dataProvider: CIADataProvider
): TechnicalImplementationService {
  return new TechnicalImplementationService(dataProvider);
}
