[**CIA Compliance Manager Documentation v0.8.8**](../README.md)

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

- [BaseService](classes/BaseService.md)
- [BusinessImpactService](classes/BusinessImpactService.md)
- [CIAContentService](classes/CIAContentService.md)
- [ComplianceServiceAdapter](classes/ComplianceServiceAdapter.md)
- [SecurityResourceService](classes/SecurityResourceService.md)

## Interfaces

- [SecurityResource](interfaces/SecurityResource.md)

## Variables

- [defaultCIAContentService](variables/defaultCIAContentService.md)

## Functions

- [createBusinessImpactService](functions/createBusinessImpactService.md)
- [createCIAContentService](functions/createCIAContentService.md)
- [createComplianceService](functions/createComplianceService.md)
- [createSecurityResourceService](functions/createSecurityResourceService.md)
- [createTechnicalImplementationService](functions/createTechnicalImplementationService.md)
- [getInformationSensitivity](functions/getInformationSensitivity.md)
- [getRiskBadgeVariant](functions/getRiskBadgeVariant.md)
- [getROIEstimate](functions/getROIEstimate.md)
- [getValuePoints](functions/getValuePoints.md)

## References

### createSecurityMetricsService

Re-exports [createSecurityMetricsService](securityMetricsService/functions/createSecurityMetricsService.md)

***

### SecurityMetricsService

Re-exports [SecurityMetricsService](securityMetricsService/classes/SecurityMetricsService.md)
