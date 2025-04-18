[**CIA Compliance Manager Documentation v0.8.8**](../../README.md)

***

[CIA Compliance Manager Documentation](../../modules.md) / [services](../README.md) / BaseService

# Class: BaseService

Defined in: [services/BaseService.ts:15](https://github.com/Hack23/cia-compliance-manager/blob/67855c73d041b21b5f90a46884e0e48cd0961cda/src/services/BaseService.ts#L15)

Base service class that provides common functionality
for security-related services

## Extended by

- [`SecurityMetricsService`](../securityMetricsService/classes/SecurityMetricsService.md)
- [`CIAContentService`](CIAContentService.md)
- [`ComplianceServiceAdapter`](ComplianceServiceAdapter.md)
- [`SecurityResourceService`](SecurityResourceService.md)

## Constructors

### Constructor

> **new BaseService**(`dataProvider`): `BaseService`

Defined in: [services/BaseService.ts:26](https://github.com/Hack23/cia-compliance-manager/blob/67855c73d041b21b5f90a46884e0e48cd0961cda/src/services/BaseService.ts#L26)

Create a new service instance

#### Parameters

##### dataProvider

[`CIADataProvider`](../../types/interfaces/CIADataProvider.md)

Data provider for security information

#### Returns

`BaseService`
