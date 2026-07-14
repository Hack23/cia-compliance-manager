[**CIA Compliance Manager — Markdown Documentation v1.1.108**](../../../README.md)

***

[CIA Compliance Manager — Markdown Documentation](../../../modules.md) / [services/BaseService](../README.md) / BaseService

# Class: BaseService

Defined in: [services/BaseService.ts:40](https://github.com/Hack23/cia-compliance-manager/blob/c8774c5adae041afe27c3067f53da22f1a7cb253/src/services/BaseService.ts#L40)

Base service class that provides common functionality
for security-related services

## Key Features
- Standardized error handling
- Input validation
- Common utility methods
- Consistent logging patterns

## Extended by

- [`CIAContentService`](../../ciaContentService/classes/CIAContentService.md)
- [`ComplianceService`](../../complianceService/classes/ComplianceService.md)
- [`ComplianceServiceAdapter`](../../ComplianceServiceAdapter/classes/ComplianceServiceAdapter.md)
- [`BusinessImpactService`](../../businessImpactService/classes/BusinessImpactService.md)
- [`SecurityMetricsService`](../../securityMetricsService/classes/SecurityMetricsService.md)
- [`SecurityResourceService`](../../securityResourceService/classes/SecurityResourceService.md)
- [`TechnicalImplementationService`](../../technicalImplementationService/classes/TechnicalImplementationService.md)

## Implements

- [`CIAService`](../interfaces/CIAService.md)
- [`IBaseService`](../../../types/services/interfaces/IBaseService.md)

## Constructors

### Constructor

> **new BaseService**(`dataProvider`): `BaseService`

Defined in: [services/BaseService.ts:56](https://github.com/Hack23/cia-compliance-manager/blob/c8774c5adae041afe27c3067f53da22f1a7cb253/src/services/BaseService.ts#L56)

Create a new service instance

#### Parameters

##### dataProvider

[`CIADataProvider`](../../../types/cia-services/interfaces/CIADataProvider.md)

Data provider for security information

#### Returns

`BaseService`

## Properties

### name

> `readonly` **name**: `string` = `'BaseService'`

Defined in: [services/BaseService.ts:44](https://github.com/Hack23/cia-compliance-manager/blob/c8774c5adae041afe27c3067f53da22f1a7cb253/src/services/BaseService.ts#L44)

Service name for identification

#### Implementation of

[`IBaseService`](../../../types/services/interfaces/IBaseService.md).[`name`](../../../types/services/interfaces/IBaseService.md#name)

## Methods

### validate()

> **validate**(`input`): `boolean`

Defined in: [services/BaseService.ts:72](https://github.com/Hack23/cia-compliance-manager/blob/c8774c5adae041afe27c3067f53da22f1a7cb253/src/services/BaseService.ts#L72)

Validate input parameters (to be overridden by subclasses)

#### Parameters

##### input

`unknown`

Input to validate

#### Returns

`boolean`

True if valid, false otherwise

#### Implementation of

[`IBaseService`](../../../types/services/interfaces/IBaseService.md).[`validate`](../../../types/services/interfaces/IBaseService.md#validate)

***

### handleError()

> **handleError**(`error`): [`ServiceError`](../../errors/classes/ServiceError.md)

Defined in: [services/BaseService.ts:101](https://github.com/Hack23/cia-compliance-manager/blob/c8774c5adae041afe27c3067f53da22f1a7cb253/src/services/BaseService.ts#L101)

Handle errors consistently across services

#### Parameters

##### error

`Error`

Error to handle

#### Returns

[`ServiceError`](../../errors/classes/ServiceError.md)

ServiceError

#### Implementation of

[`IBaseService`](../../../types/services/interfaces/IBaseService.md).[`handleError`](../../../types/services/interfaces/IBaseService.md#handleerror)

***

### getComponentDetails()

> **getComponentDetails**(`component`, `level`): [`CIADetails`](../../../types/cia-services/interfaces/CIADetails.md) \| `undefined`

Defined in: [services/BaseService.ts:188](https://github.com/Hack23/cia-compliance-manager/blob/c8774c5adae041afe27c3067f53da22f1a7cb253/src/services/BaseService.ts#L188)

Get component details for a specific component and security level

#### Parameters

##### component

[`CIAComponentType`](../../../types/cia-services/type-aliases/CIAComponentType.md)

##### level

[`SecurityLevel`](../../../types/cia/type-aliases/SecurityLevel.md)

#### Returns

[`CIADetails`](../../../types/cia-services/interfaces/CIADetails.md) \| `undefined`

#### Implementation of

[`CIAService`](../interfaces/CIAService.md).[`getComponentDetails`](../interfaces/CIAService.md#getcomponentdetails)

***

### getSecurityLevelDescription()

> **getSecurityLevelDescription**(`level`): `string`

Defined in: [services/BaseService.ts:228](https://github.com/Hack23/cia-compliance-manager/blob/c8774c5adae041afe27c3067f53da22f1a7cb253/src/services/BaseService.ts#L228)

Get security level description

#### Parameters

##### level

[`SecurityLevel`](../../../types/cia/type-aliases/SecurityLevel.md)

#### Returns

`string`

#### Implementation of

[`CIAService`](../interfaces/CIAService.md).[`getSecurityLevelDescription`](../interfaces/CIAService.md#getsecurityleveldescription)

***

### getRiskLevelFromSecurityLevel()

> **getRiskLevelFromSecurityLevel**(`level`): `string`

Defined in: [services/BaseService.ts:248](https://github.com/Hack23/cia-compliance-manager/blob/c8774c5adae041afe27c3067f53da22f1a7cb253/src/services/BaseService.ts#L248)

Get risk level from security level

#### Parameters

##### level

[`SecurityLevel`](../../../types/cia/type-aliases/SecurityLevel.md)

#### Returns

`string`

#### Implementation of

[`CIAService`](../interfaces/CIAService.md).[`getRiskLevelFromSecurityLevel`](../interfaces/CIAService.md#getrisklevelfromsecuritylevel)
