/**
 * # Services Module
 *
 * This module exports all service classes and functions used in the CIA Compliance Manager.
 *
 * ## Business Perspective
 * Services implement core business logic for security assessment, compliance mapping,
 * and business impact analysis, centralizing critical functionality. 💼
 *
 * ## Technical Perspective
 * Centralized service exports simplify imports and promote service reuse.
 *
 * @packageDocumentation
 */

// Service Factories
export { createBusinessImpactService } from "./businessImpactService";
export { createCIAContentService } from "./ciaContentService";
export { createComplianceService } from "./complianceService";
export { createTechnicalImplementationService } from "./technicalImplementationService";

// Service Classes
export { BaseService } from "./BaseService";
export { BusinessImpactService } from "./businessImpactService";

// Export CIA content service
export {
  CIAContentService,
  default as defaultCIAContentService,
  getInformationSensitivity,
  getRiskBadgeVariant,
  getROIEstimate,
  getValuePoints,
} from "./ciaContentService";

// Export compliance service adapter
export { ComplianceServiceAdapter } from "./ComplianceServiceAdapter";

// Export security metrics service
export {
  createSecurityMetricsService,
  SecurityMetricsService,
} from "./securityMetricsService";

// Export security resource service
export {
  createSecurityResourceService,
  SecurityResourceService,
} from "./securityResourceService";

// Update to import SecurityResource from the correct location
import { SecurityResource } from "../types/securityResources";

// Export SecurityResource type
export type { SecurityResource };

// Export error service
export {
  ErrorService,
  errorService,
  ErrorSeverity,
  type ErrorLogEntry,
} from "./errorService";

// Export error types
export {
  ServiceError,
  ServiceErrorCode,
  ValidationError,
  NetworkError,
  RetryableError,
  type ErrorContext,
  createValidationError,
  createDataNotFoundError,
  createCalculationError,
  isServiceError,
  isValidationError,
  isNetworkError,
  isRetryableError,
  getErrorMessage,
} from "./errors";
