[**CIA Compliance Manager — Markdown Documentation v1.1.34**](../README.md)

***

[CIA Compliance Manager — Markdown Documentation](../modules.md) / services

# services

# Services Module

This module exports all service classes and functions used in the CIA Compliance Manager.

## Business Perspective
Services implement core business logic for security assessment, compliance mapping,
and business impact analysis, centralizing critical functionality. 💼

## Technical Perspective
Centralized service exports simplify imports and promote service reuse.

## Variables

- [defaultCIAContentService](variables/defaultCIAContentService.md)

## References

### createBusinessImpactService

Re-exports [createBusinessImpactService](businessImpactService/functions/createBusinessImpactService.md)

***

### createCIAContentService

Re-exports [createCIAContentService](ciaContentService/functions/createCIAContentService.md)

***

### createComplianceService

Re-exports [createComplianceService](complianceService/functions/createComplianceService.md)

***

### createTechnicalImplementationService

Re-exports [createTechnicalImplementationService](technicalImplementationService/functions/createTechnicalImplementationService.md)

***

### BaseService

Re-exports [BaseService](BaseService/classes/BaseService.md)

***

### BusinessImpactService

Re-exports [BusinessImpactService](businessImpactService/classes/BusinessImpactService.md)

***

### CIAContentService

Re-exports [CIAContentService](ciaContentService/classes/CIAContentService.md)

***

### getInformationSensitivity

Re-exports [getInformationSensitivity](ciaContentService/functions/getInformationSensitivity.md)

***

### getRiskBadgeVariant

Re-exports [getRiskBadgeVariant](ciaContentService/functions/getRiskBadgeVariant.md)

***

### getROIEstimate

Re-exports [getROIEstimate](ciaContentService/functions/getROIEstimate.md)

***

### getValuePoints

Re-exports [getValuePoints](ciaContentService/functions/getValuePoints.md)

***

### ComplianceServiceAdapter

Re-exports [ComplianceServiceAdapter](ComplianceServiceAdapter/classes/ComplianceServiceAdapter.md)

***

### createSecurityMetricsService

Re-exports [createSecurityMetricsService](securityMetricsService/functions/createSecurityMetricsService.md)

***

### SecurityMetricsService

Re-exports [SecurityMetricsService](securityMetricsService/classes/SecurityMetricsService.md)

***

### createSecurityResourceService

Re-exports [createSecurityResourceService](securityResourceService/functions/createSecurityResourceService.md)

***

### SecurityResourceService

Re-exports [SecurityResourceService](securityResourceService/classes/SecurityResourceService.md)

***

### EnhancedSecurityResource

Re-exports [EnhancedSecurityResource](../types/securityResources/interfaces/EnhancedSecurityResource.md)

***

### SecurityResource

Re-exports [SecurityResource](../types/securityResources/interfaces/SecurityResource.md)

***

### ErrorService

Re-exports [ErrorService](errorService/classes/ErrorService.md)

***

### errorService

Re-exports [errorService](errorService/variables/errorService.md)

***

### ErrorSeverity

Re-exports [ErrorSeverity](errorService/enumerations/ErrorSeverity.md)

***

### ErrorLogEntry

Re-exports [ErrorLogEntry](errorService/interfaces/ErrorLogEntry.md)

***

### ServiceError

Re-exports [ServiceError](errors/classes/ServiceError.md)

***

### ServiceErrorCode

Re-exports [ServiceErrorCode](errors/enumerations/ServiceErrorCode.md)

***

### createValidationServiceError

Re-exports [createValidationServiceError](errors/functions/createValidationServiceError.md)

***

### createNetworkServiceError

Re-exports [createNetworkServiceError](errors/functions/createNetworkServiceError.md)

***

### createRetryableServiceError

Re-exports [createRetryableServiceError](errors/functions/createRetryableServiceError.md)

***

### ErrorContext

Re-exports [ErrorContext](errors/interfaces/ErrorContext.md)

***

### createValidationError

Re-exports [createValidationError](errors/functions/createValidationError.md)

***

### createDataNotFoundError

Re-exports [createDataNotFoundError](errors/functions/createDataNotFoundError.md)

***

### createCalculationError

Re-exports [createCalculationError](errors/functions/createCalculationError.md)

***

### isServiceError

Re-exports [isServiceError](errors/functions/isServiceError.md)

***

### isValidationError

Re-exports [isValidationError](errors/functions/isValidationError.md)

***

### isNetworkError

Re-exports [isNetworkError](errors/functions/isNetworkError.md)

***

### isRetryableError

Re-exports [isRetryableError](errors/functions/isRetryableError.md)

***

### getErrorMessage

Re-exports [getErrorMessage](errors/functions/getErrorMessage.md)
