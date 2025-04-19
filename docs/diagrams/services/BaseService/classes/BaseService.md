[**CIA Compliance Manager Diagrams v0.8.9**](../../../README.md)

***

[CIA Compliance Manager Diagrams](../../../modules.md) / [services/BaseService](../README.md) / BaseService

# Class: BaseService

Defined in: [services/BaseService.ts:15](https://github.com/Hack23/cia-compliance-manager/blob/e1ae27dd41c4ccea8a13cdec993022242a97dce3/src/services/BaseService.ts#L15)

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

Defined in: [services/BaseService.ts:26](https://github.com/Hack23/cia-compliance-manager/blob/e1ae27dd41c4ccea8a13cdec993022242a97dce3/src/services/BaseService.ts#L26)

Create a new service instance

#### Parameters

##### dataProvider

[`CIADataProvider`](../../../types/interfaces/CIADataProvider.md)

Data provider for security information

#### Returns

`BaseService`
