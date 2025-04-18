[**CIA Compliance Manager Documentation v0.8.11**](../../../README.md)

***

[CIA Compliance Manager Documentation](../../../modules.md) / [services/BaseService](../README.md) / BaseService

# Class: BaseService

Defined in: [services/BaseService.ts:15](https://github.com/Hack23/cia-compliance-manager/blob/d6eede30e4f01622fe18187e98b207e9a06a781f/src/services/BaseService.ts#L15)

Base service class that provides common functionality
for security-related services

## Extended by

- [`SecurityMetricsService`](../../securityMetricsService/classes/SecurityMetricsService.md)
- [`ComplianceService`](../../complianceService/classes/ComplianceService.md)
- [`CIAContentService`](../../ciaContentService/classes/CIAContentService.md)
- [`SecurityResourceService`](../../securityResourceService/classes/SecurityResourceService.md)
- [`TechnicalImplementationService`](../../technicalImplementationService/classes/TechnicalImplementationService.md)
- [`ComplianceServiceAdapter`](../../classes/ComplianceServiceAdapter.md)

## Constructors

### Constructor

> **new BaseService**(`dataProvider`): `BaseService`

Defined in: [services/BaseService.ts:26](https://github.com/Hack23/cia-compliance-manager/blob/d6eede30e4f01622fe18187e98b207e9a06a781f/src/services/BaseService.ts#L26)

Create a new service instance

#### Parameters

##### dataProvider

[`CIADataProvider`](../../../types/interfaces/CIADataProvider.md)

Data provider for security information

#### Returns

`BaseService`
