/**
 * # Service Interface Definitions
 *
 * Type-safe service contracts for all service layer classes.
 *
 * ## Business Perspective
 * Defines clear contracts between services and their consumers, ensuring
 * consistent interfaces and type safety across the application. 📋
 *
 * @packageDocumentation
 */

import { SecurityLevel } from './cia';
import {
  CIAComponentType,
  CIADetails,
  ROIEstimate,
  BusinessImpactDetails,
  TechnicalImplementationDetails,
} from './cia-services';
import { ComplianceGapAnalysis } from './compliance';
import { ServiceError } from '../services/errors';

/**
 * Compliance status details
 */
export interface ComplianceStatusDetails {
  status: string;
  compliantFrameworks: string[];
  partiallyCompliantFrameworks: string[];
  nonCompliantFrameworks: string[];
  remediationSteps?: string[];
  requirements?: string[];
  complianceScore: number;
}

/**
 * Base service interface that all services must implement
 *
 * Provides common functionality for validation and error handling
 */
export interface IBaseService {
  /**
   * Service name for identification and logging
   */
  readonly name: string;

  /**
   * Validate input parameters (returns simple boolean)
   *
   * @param input - Input to validate
   * @returns True if valid, false otherwise
   */
  validate(input: unknown): boolean;

  /**
   * Handle errors consistently across services
   *
   * @param error - Error to handle
   * @returns Formatted ServiceError
   */
  handleError(error: Error): ServiceError;
}

/**
 * CIA Content Service interface
 *
 * Provides access to CIA triad content, ROI calculations, and security metrics
 */
export interface ICIAContentService extends IBaseService {
  /**
   * Get details for a specific CIA component and security level
   *
   * @param component - CIA component type
   * @param level - Security level
   * @returns Component details or undefined if not found
   */
  getComponentDetails(
    component: CIAComponentType,
    level: SecurityLevel
  ): CIADetails | undefined;

  /**
   * Calculate ROI for a security implementation
   *
   * @param level - Security level
   * @param implementationCost - Cost of implementation
   * @returns ROI metrics
   */
  calculateRoi(level: SecurityLevel, implementationCost: number): {
    value: string;
    percentage: string;
    description: string;
  };

  /**
   * Get ROI estimate for a security level
   *
   * @param level - Security level
   * @returns ROI estimate details
   */
  getROIEstimate(level: SecurityLevel): ROIEstimate;

  /**
   * Get business impact details for a component and level
   *
   * @param component - CIA component type
   * @param level - Security level
   * @returns Business impact details
   */
  getBusinessImpact(
    component: CIAComponentType,
    level: SecurityLevel
  ): BusinessImpactDetails;

  /**
   * Get technical implementation details
   *
   * @param component - CIA component type
   * @param level - Security level
   * @returns Technical implementation details
   */
  getTechnicalImplementation(
    component: CIAComponentType,
    level: SecurityLevel
  ): TechnicalImplementationDetails;

  /**
   * Get security metrics for given security levels
   *
   * @param availabilityLevel - Availability security level
   * @param integrityLevel - Integrity security level
   * @param confidentialityLevel - Confidentiality security level
   * @returns Security metrics
   */
  getSecurityMetrics(
    availabilityLevel: SecurityLevel,
    integrityLevel: SecurityLevel,
    confidentialityLevel: SecurityLevel
  ): unknown;
}

/**
 * Compliance Service interface
 *
 * Provides compliance status checking and framework mapping
 */
export interface IComplianceService extends IBaseService {
  /**
   * Get compliance status for given security levels
   *
   * @param availabilityLevel - Availability security level
   * @param integrityLevel - Integrity security level
   * @param confidentialityLevel - Confidentiality security level
   * @returns Compliance status details
   */
  getComplianceStatus(
    availabilityLevel: SecurityLevel,
    integrityLevel: SecurityLevel,
    confidentialityLevel: SecurityLevel
  ): ComplianceStatusDetails;

  /**
   * Get compliant frameworks for given security levels
   *
   * @param availabilityLevel - Availability security level
   * @param integrityLevel - Integrity security level
   * @param confidentialityLevel - Confidentiality security level
   * @returns Array of compliant framework names
   */
  getCompliantFrameworks(
    availabilityLevel: SecurityLevel,
    integrityLevel: SecurityLevel,
    confidentialityLevel: SecurityLevel
  ): string[];

  /**
   * Get description of a compliance framework
   *
   * @param framework - Framework name
   * @returns Framework description
   */
  getFrameworkDescription(framework: string): string;

  /**
   * Get compliance gap analysis
   *
   * @param availabilityLevel - Availability security level
   * @param integrityLevel - Integrity security level
   * @param confidentialityLevel - Confidentiality security level
   * @param framework - Optional specific framework to analyze
   * @returns Gap analysis results
   */
  getComplianceGapAnalysis(
    availabilityLevel: SecurityLevel,
    integrityLevel: SecurityLevel,
    confidentialityLevel: SecurityLevel,
    framework?: string
  ): ComplianceGapAnalysis;
}

/**
 * Business Impact Service interface
 *
 * Provides business impact analysis and risk assessment
 */
export interface IBusinessImpactService extends IBaseService {
  /**
   * Get business impact details for a component and level
   *
   * @param component - CIA component type
   * @param level - Security level
   * @returns Business impact details
   */
  getBusinessImpact(
    component: CIAComponentType,
    level: SecurityLevel
  ): BusinessImpactDetails;

  /**
   * Get business impact description
   *
   * @param component - CIA component type
   * @param level - Security level
   * @returns Business impact description
   */
  getBusinessImpactDescription(
    component: CIAComponentType,
    level: SecurityLevel
  ): string;

  /**
   * Calculate overall business impact level
   *
   * @param availabilityLevel - Availability security level
   * @param integrityLevel - Integrity security level
   * @param confidentialityLevel - Confidentiality security level
   * @returns Business impact level description
   */
  calculateBusinessImpactLevel(
    availabilityLevel: SecurityLevel,
    integrityLevel: SecurityLevel,
    confidentialityLevel: SecurityLevel
  ): string;

  /**
   * Get category icon for business impact visualization
   *
   * @param category - Impact category
   * @returns Icon string or component
   */
  getCategoryIcon(category: string): string | unknown;
}

/**
 * Security Metrics Service interface
 *
 * Provides security scoring and metrics calculation
 */
export interface ISecurityMetricsService extends IBaseService {
  /**
   * Calculate overall security score
   *
   * @param availabilityLevel - Availability security level
   * @param integrityLevel - Integrity security level
   * @param confidentialityLevel - Confidentiality security level
   * @returns Security score (0-100)
   */
  calculateSecurityScore(
    availabilityLevel: SecurityLevel,
    integrityLevel: SecurityLevel,
    confidentialityLevel: SecurityLevel
  ): number;

  /**
   * Get component metrics
   *
   * @param component - CIA component type
   * @param level - Security level
   * @returns Component-specific metrics
   */
  getComponentMetrics(component: CIAComponentType, level: SecurityLevel): unknown;

  /**
   * Get impact metrics
   *
   * @param component - CIA component type
   * @param level - Security level
   * @returns Impact metrics
   */
  getImpactMetrics(component: CIAComponentType, level: SecurityLevel): unknown;

  /**
   * Get security icon for a level
   *
   * @param level - Security level
   * @returns Icon string or component
   */
  getSecurityIcon(level: SecurityLevel): string | unknown;

  /**
   * Get protection level description
   *
   * @param level - Security level
   * @returns Protection level description
   */
  getProtectionLevel(level: SecurityLevel): string;
}

/**
 * Technical Implementation Service interface
 *
 * Provides technical implementation guidance and details
 */
export interface ITechnicalImplementationService extends IBaseService {
  /**
   * Get technical implementation details
   *
   * @param component - CIA component type
   * @param level - Security level
   * @returns Technical implementation details
   */
  getTechnicalImplementation(
    component: CIAComponentType,
    level: SecurityLevel
  ): TechnicalImplementationDetails;

  /**
   * Get recommendations for implementation
   *
   * @param component - CIA component type
   * @param level - Security level
   * @returns Array of recommendations
   */
  getRecommendations(component: CIAComponentType, level: SecurityLevel): string[];

  /**
   * Get implementation time estimate
   *
   * @param level - Security level
   * @returns Time estimate string
   */
  getImplementationTime(level: SecurityLevel): string;

  /**
   * Get technical description
   *
   * @param component - CIA component type
   * @param level - Security level
   * @returns Technical description
   */
  getTechnicalDescription(component: CIAComponentType, level: SecurityLevel): string;
}

/**
 * Security Resource Service interface
 *
 * Provides security resources and references
 */
export interface ISecurityResourceService extends IBaseService {
  /**
   * Get security resources for a component and level
   *
   * @param component - CIA component type
   * @param level - Security level
   * @returns Security resources
   */
  getSecurityResources(component: CIAComponentType, level: SecurityLevel): unknown;

  /**
   * Get value points for a security level
   *
   * @param level - Security level
   * @returns Array of value points
   */
  getValuePoints(level: SecurityLevel): string[];
}

/**
 * Service factory interface
 *
 * Defines a standard way to create service instances
 */
export interface IServiceFactory<T extends IBaseService> {
  /**
   * Create a new service instance
   *
   * @param config - Optional configuration
   * @returns Service instance
   */
  create(config?: unknown): T;
}

/**
 * Detailed validation result (for internal use)
 */
export interface ValidationResult {
  /**
   * Whether validation passed
   */
  valid: boolean;

  /**
   * Validation errors if any
   */
  errors: string[];
}
