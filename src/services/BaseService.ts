import { SecurityLevel } from "../types/cia";
import {
  CIAComponentType,
  CIADataProvider,
  CIADetails,
} from "../types/cia-services";
import { IBaseService, ValidationResult } from "../types/services";
import { getSecurityLevelValue } from "../utils/levelValuesUtils";
import logger from "../utils/logger";
import {
  ServiceError,
  ServiceErrorCode,
  ErrorContext,
  createValidationError,
  isServiceError,
} from "./errors";

/**
 * Common interface for CIA services
 */
export interface CIAService {
  getComponentDetails(
    component: CIAComponentType,
    level: SecurityLevel
  ): CIADetails | undefined;
  getSecurityLevelDescription(level: SecurityLevel): string;
  getRiskLevelFromSecurityLevel(level: SecurityLevel): string;
}

/**
 * Base service class that provides common functionality
 * for security-related services
 *
 * ## Key Features
 * - Standardized error handling
 * - Input validation
 * - Common utility methods
 * - Consistent logging patterns
 */
export class BaseService implements CIAService, IBaseService {
  /**
   * Service name for identification
   */
  public readonly name: string = 'BaseService';

  /**
   * Data provider used by the service
   */
  protected dataProvider: CIADataProvider;

  /**
   * Create a new service instance
   *
   * @param dataProvider - Data provider for security information
   */
  constructor(dataProvider: CIADataProvider) {
    // Validate data provider before super() call
    if (!dataProvider) {
      throw createValidationError(
        'Data provider is required',
        { service: 'BaseService', method: 'constructor' }
      );
    }
    this.dataProvider = dataProvider;
  }

  /**
   * Validate input parameters (to be overridden by subclasses)
   *
   * @param input - Input to validate
   * @returns True if valid, false otherwise
   */
  public validate(input: unknown): boolean {
    // Default implementation returns true
    // Subclasses should override this method
    return input !== null && input !== undefined;
  }

  /**
   * Validate input with detailed results
   *
   * @param input - Input to validate
   * @returns Validation result with errors
   */
  protected validateWithDetails(input: unknown): ValidationResult {
    const errors: string[] = [];

    if (input === null || input === undefined) {
      errors.push('Input cannot be null or undefined');
    }

    return {
      valid: errors.length === 0,
      errors,
    };
  }

  /**
   * Handle errors consistently across services
   *
   * @param error - Error to handle
   * @returns ServiceError
   */
  public handleError(error: Error): ServiceError {
    // If already a ServiceError, return it
    if (isServiceError(error)) {
      logger.error(error.getFormattedMessage());
      return error;
    }

    // Convert to ServiceError
    const serviceError = new ServiceError(
      error.message,
      ServiceErrorCode.INTERNAL_ERROR,
      { service: this.name },
      error
    );

    logger.error(serviceError.getFormattedMessage());
    return serviceError;
  }

  /**
   * Validate security level
   *
   * @param level - Security level to validate
   * @returns True if valid
   * @throws ServiceError if invalid
   */
  protected validateSecurityLevel(level: SecurityLevel): boolean {
    const validLevels: SecurityLevel[] = [
      'None',
      'Low',
      'Moderate',
      'High',
      'Very High',
    ];

    if (!validLevels.includes(level)) {
      throw createValidationError(
        `Invalid security level: ${level}`,
        {
          service: this.name,
          level,
          validLevels: validLevels.join(', '),
        }
      );
    }

    return true;
  }

  /**
   * Validate CIA component type
   *
   * @param component - Component to validate
   * @returns True if valid
   * @throws ServiceError if invalid
   */
  protected validateComponent(component: CIAComponentType): boolean {
    const validComponents: CIAComponentType[] = [
      'availability',
      'integrity',
      'confidentiality',
    ];

    if (!validComponents.includes(component)) {
      throw createValidationError(
        `Invalid component type: ${component}`,
        {
          service: this.name,
          component,
          validComponents: validComponents.join(', '),
        }
      );
    }

    return true;
  }

  /**
   * Check if a string is a valid CIA component type
   */
  protected isCIAComponentType(
    component: string
  ): component is CIAComponentType {
    return ["availability", "integrity", "confidentiality"].includes(component);
  }

  /**
   * Get component details for a specific component and security level
   */
  public getComponentDetails(
    component: CIAComponentType,
    level: SecurityLevel
  ): CIADetails | undefined {
    try {
      const options = this.getCIAOptions(component);
      if (!options) {
        return undefined;
      }
      return options[level];
    } catch (error) {
      logger.warn(
        `Failed to get component details for ${component} at level ${level}`,
        error
      );
      return undefined;
    }
  }

  /**
   * Get options for a CIA component
   */
  protected getCIAOptions(
    component: CIAComponentType
  ): Record<string, CIADetails> {
    switch (component) {
      case "availability":
        return this.dataProvider.availabilityOptions;
      case "integrity":
        return this.dataProvider.integrityOptions;
      case "confidentiality":
        return this.dataProvider.confidentialityOptions;
      default:
        return {};
    }
  }

  /**
   * Get security level description
   */
  public getSecurityLevelDescription(level: SecurityLevel): string {
    // Default implementation
    switch (level) {
      case "None":
        return "No security controls";
      case "Low":
        return "Basic security controls";
      case "Moderate":
        return "Standard security controls";
      case "High":
        return "Enhanced security controls";
      case "Very High":
        return "Maximum security controls";
      default:
        return "Unknown security level";
    }
  }

  /**
   * Get risk level from security level
   */
  public getRiskLevelFromSecurityLevel(level: SecurityLevel): string {
    // Modified to return the exact format expected by tests
    const riskLevels: Record<SecurityLevel, string> = {
      None: "Critical",
      Low: "High",
      Moderate: "Medium",
      High: "Low",
      "Very High": "Minimal",
    };

    return riskLevels[level] || "Unknown";
  }

  /**
   * Calculate security level value from level string
   */
  protected getSecurityLevelValue(level: SecurityLevel): number {
    return getSecurityLevelValue(level);
  }

  /**
   * Capitalize first letter of a string
   */
  protected capitalizeFirstLetter(string: string): string {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  /**
   * Get default security icon for a level
   */
  protected getDefaultSecurityIcon(level: SecurityLevel): string {
    // Check if dataProvider provides the method and if it returns a non-null value
    if (typeof this.dataProvider.getDefaultSecurityIcon === "function") {
      const icon = this.dataProvider.getDefaultSecurityIcon(level);
      if (icon) return icon;
    }

    // Default icons
    switch (level) {
      case "None":
        return "⚠️";
      case "Low":
        return "🔑";
      case "Moderate":
        return "🔓";
      case "High":
        return "🔒";
      case "Very High":
        return "🔐";
      default:
        return "❓";
    }
  }

  /**
   * Get value points for a security level
   */
  protected getValuePoints(level: SecurityLevel): string[] {
    if (typeof this.dataProvider.getDefaultValuePoints === "function") {
      try {
        const customPoints = this.dataProvider.getDefaultValuePoints(level);
        if (customPoints && customPoints.length > 0) {
          return customPoints;
        }
      } catch (error) {
        logger.warn("Error fetching custom value points:", error);
      }
    }
    return this.getDefaultValuePoints(level);
  }

  /**
   * Default implementation of value points
   */
  private getDefaultValuePoints(level: SecurityLevel): string[] {
    switch (level) {
      case "Very High":
        return [
          "Maximum security value with comprehensive protection",
          "Enables business in highly regulated industries",
          "Provides competitive advantage through superior security posture",
          "Minimizes risk of data breaches and associated costs",
          "Ensures regulatory compliance across major frameworks",
        ];
      case "High":
        return [
          "Strong security value with robust protection",
          "Supports business in moderately regulated industries",
          "Reduces risk of security incidents significantly",
          "Protects sensitive data and critical operations",
          "Meets requirements for most compliance frameworks",
        ];
      case "Moderate":
        return [
          "Balanced security value with standard protection",
          "Suitable for most business applications",
          "Reduces common security risks",
          "Protects important business data",
          "Meets basic compliance requirements",
        ];
      case "Low":
        return [
          "Basic security value with minimal protection",
          "Suitable for non-critical systems",
          "Addresses obvious security vulnerabilities",
          "Provides foundation for security program",
          "May not meet regulatory requirements",
        ];
      case "None":
        return [
          "No security value",
          "Suitable only for non-sensitive public information",
          "High vulnerability to security incidents",
          "No protection against threats",
          "Does not meet any compliance requirements",
        ];
      default:
        return [
          "Unknown security level",
          "Security value cannot be determined",
        ];
    }
  }

  /**
   * Validate a numeric value for formatting
   *
   * @param value - Value to validate
   * @param context - Context for error logging
   * @returns True if valid, false otherwise
   */
  private validateNumericValue(value: number, context: string): boolean {
    if (!Number.isFinite(value)) {
      this.logOperation('warn', `Invalid ${context} value: ${value}`, {
        method: context === 'currency' ? 'formatCurrency' : 'formatPercentage',
      });
      return false;
    }
    return true;
  }

  /**
   * Formats a currency value
   *
   * @param value - Numeric value to format
   * @returns Formatted currency string
   */
  protected formatCurrency(value: number): string {
    if (!this.validateNumericValue(value, 'currency')) {
      return '$0';
    }

    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      maximumFractionDigits: 0,
    }).format(value);
  }

  /**
   * Formats a percentage value
   *
   * @param value - Numeric percentage value
   * @returns Formatted percentage string
   */
  protected formatPercentage(value: number): string {
    if (!this.validateNumericValue(value, 'percentage')) {
      return '0%';
    }

    return `${value}%`;
  }

  /**
   * Safe get from object with fallback
   *
   * @param obj - Object to get from
   * @param key - Key to retrieve
   * @param fallback - Fallback value
   * @returns Value or fallback
   */
  protected safeGet<T>(
    obj: Record<string, T> | undefined,
    key: string,
    fallback: T
  ): T {
    if (!obj || !obj[key]) {
      return fallback;
    }
    return obj[key];
  }

  /**
   * Log operation with context
   *
   * @param level - Log level
   * @param message - Message to log
   * @param context - Additional context
   */
  protected logOperation(
    level: 'info' | 'warn' | 'error',
    message: string,
    context: ErrorContext = {}
  ): void {
    const fullContext = {
      ...context,
      service: this.name,
    };

    logger[level](message, fullContext);
  }
}
