[**CIA Compliance Manager Documentation v0.8.31**](../README.md)

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

## Classes

- [ComplianceServiceAdapter](classes/ComplianceServiceAdapter.md)

## Interfaces

- [SecurityResource](interfaces/SecurityResource.md)

## Variables

- [defaultCIAContentService](variables/defaultCIAContentService.md)

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
