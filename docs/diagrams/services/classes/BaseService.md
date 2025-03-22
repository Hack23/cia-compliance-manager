[**CIA Compliance Manager Diagrams v0.8.5**](../../README.md)

***

[CIA Compliance Manager Diagrams](../../modules.md) / [services](../README.md) / BaseService

# Class: `abstract` BaseService

Defined in: [services/BaseService.ts:17](https://github.com/Hack23/cia-compliance-manager/blob/b7c3bc9644fb5b9d82b5b184ba290206da25104b/src/services/BaseService.ts#L17)

Base service class that provides common functionality for all services

## Business Perspective

The BaseService establishes a consistent foundation for all services,
ensuring uniform data access patterns, error handling, and security level 
processing. This improves maintainability and reduces duplication across
security-related services. 🛠️

## Extended by

- [`SecurityMetricsService`](../securityMetricsService/classes/SecurityMetricsService.md)
- [`ComplianceService`](../../typedoc-entry/classes/ComplianceService.md)
- [`TechnicalImplementationService`](../../typedoc-entry/classes/TechnicalImplementationService.md)
- [`SecurityResourceService`](SecurityResourceService.md)

## Constructors

### new BaseService()

> **new BaseService**(`dataProvider`): `BaseService`

Defined in: [services/BaseService.ts:20](https://github.com/Hack23/cia-compliance-manager/blob/b7c3bc9644fb5b9d82b5b184ba290206da25104b/src/services/BaseService.ts#L20)

#### Parameters

##### dataProvider

[`CIADataProvider`](../../types/interfaces/CIADataProvider.md)

#### Returns

`BaseService`
