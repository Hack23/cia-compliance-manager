[**CIA Compliance Manager Documentation v1.1.18**](../README.md)

***

[CIA Compliance Manager Documentation](../modules.md) / services

# services

# Services Module

This module exports all service classes and functions used in the CIA Compliance Manager.

## Business Perspective
Services implement core business logic for security assessment, compliance mapping,
and business impact analysis, centralizing critical functionality. 💼

## Technical Perspective
Centralized service exports simplify imports and promote service reuse.

## Enumerations

- [ErrorSeverity](enumerations/ErrorSeverity.md)
- [ServiceErrorCode](enumerations/ServiceErrorCode.md)

## Classes

- [ComplianceServiceAdapter](classes/ComplianceServiceAdapter.md)
- [ErrorService](classes/ErrorService.md)
- [ServiceError](classes/ServiceError.md)

## Interfaces

- [ErrorContext](interfaces/ErrorContext.md)
- [ErrorLogEntry](interfaces/ErrorLogEntry.md)
- [SecurityResource](interfaces/SecurityResource.md)

## Variables

- [defaultCIAContentService](variables/defaultCIAContentService.md)
- [errorService](variables/errorService.md)

## Functions

- [createCalculationError](functions/createCalculationError.md)
- [createDataNotFoundError](functions/createDataNotFoundError.md)
- [createNetworkServiceError](functions/createNetworkServiceError.md)
- [createRetryableServiceError](functions/createRetryableServiceError.md)
- [createValidationError](functions/createValidationError.md)
- [createValidationServiceError](functions/createValidationServiceError.md)
- [getErrorMessage](functions/getErrorMessage.md)
- [isNetworkError](functions/isNetworkError.md)
- [isRetryableError](functions/isRetryableError.md)
- [isServiceError](functions/isServiceError.md)
- [isValidationError](functions/isValidationError.md)

## References

### BaseService

Re-exports [BaseService](BaseService/classes/BaseService.md)

***

### BusinessImpactService

Re-exports [BusinessImpactService](businessImpactService/classes/BusinessImpactService.md)

***

### CIAContentService

Re-exports [CIAContentService](ciaContentService/classes/CIAContentService.md)

***

### createBusinessImpactService

Re-exports [createBusinessImpactService](businessImpactService/functions/createBusinessImpactService.md)

***

### createCIAContentService

Re-exports [createCIAContentService](ciaContentService/functions/createCIAContentService.md)

***

### createComplianceService

Re-exports [createComplianceService](complianceService/functions/createComplianceService.md)

***

### createSecurityMetricsService

Re-exports [createSecurityMetricsService](securityMetricsService/functions/createSecurityMetricsService.md)

***

### createSecurityResourceService

Re-exports [createSecurityResourceService](securityResourceService/functions/createSecurityResourceService.md)

***

### createTechnicalImplementationService

Re-exports [createTechnicalImplementationService](technicalImplementationService/functions/createTechnicalImplementationService.md)

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

### SecurityMetricsService

Re-exports [SecurityMetricsService](securityMetricsService/classes/SecurityMetricsService.md)

***

### SecurityResourceService

Re-exports [SecurityResourceService](securityResourceService/classes/SecurityResourceService.md)
