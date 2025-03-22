import { SecurityLevel } from "../types/cia";
import { CIAComponentType, CIADataProvider, CIADetails } from "../types/cia-services";
import { getSecurityLevelValue } from "../utils/levelValuesUtils";
import logger from "../utils/logger";
import { getRiskLevelFromSecurityLevel } from "../utils/riskUtils";

/**
 * Base service class that provides common functionality for all services
 *
 * ## Business Perspective
 *
 * The BaseService establishes a consistent foundation for all services,
 * ensuring uniform data access patterns, error handling, and security level 
 * processing. This improves maintainability and reduces duplication across
 * security-related services. 🛠️
 */
export abstract class BaseService {
  protected dataProvider: CIADataProvider;

  constructor(dataProvider: CIADataProvider) {
    this.dataProvider = dataProvider;
  }

  /**
   * Get component details for a specific security level
   */
  protected getComponentDetails(
    component: CIAComponentType,
    level: SecurityLevel
  ): CIADetails | undefined {
    try {
      const options = this.getCIAOptions(component);
      return options[level];
    } catch (error) {
      logger.warn(`Failed to get component details for ${component} at level ${level}`, error);
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
   * Get risk level from security level
   */
  protected getRiskLevelFromSecurityLevel(level: SecurityLevel): string {
    return getRiskLevelFromSecurityLevel(level);
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
    if (typeof this.dataProvider.getDefaultSecurityIcon === "function") {
      return this.dataProvider.getDefaultSecurityIcon(level);
    }

    // Default icons
    switch (level) {
      case "None": return "⚠️";
      case "Low": return "🔑";
      case "Moderate": return "🔓";
      case "High": return "🔒";
      case "Very High": return "🔐";
      default: return "❓";
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
      default:
        return [
          "No security value",
          "Suitable only for non-sensitive public information",
          "High vulnerability to security incidents",
          "No protection against threats",
          "Does not meet any compliance requirements",
        ];
    }
  }
}
