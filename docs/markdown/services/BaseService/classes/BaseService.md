[**CIA Compliance Manager Documentation v1.1.13**](../../../README.md)

***

[CIA Compliance Manager Documentation](../../../modules.md) / [services/BaseService](../README.md) / BaseService

# Class: BaseService

Defined in: [services/BaseService.ts:40](https://github.com/Hack23/cia-compliance-manager/blob/d1f49c8017dd6649366103fd87fa14f3af19f220/src/services/BaseService.ts#L40)

Base service class that provides common functionality
for security-related services

## Key Features
- Standardized error handling
- Input validation
- Common utility methods
- Consistent logging patterns

## Extended by

- [`SecurityMetricsService`](../../securityMetricsService/classes/SecurityMetricsService.md)
- [`ComplianceService`](../../complianceService/classes/ComplianceService.md)
- [`CIAContentService`](../../ciaContentService/classes/CIAContentService.md)
- [`BusinessImpactService`](../../businessImpactService/classes/BusinessImpactService.md)
- [`SecurityResourceService`](../../securityResourceService/classes/SecurityResourceService.md)
- [`TechnicalImplementationService`](../../technicalImplementationService/classes/TechnicalImplementationService.md)
- [`ComplianceServiceAdapter`](../../classes/ComplianceServiceAdapter.md)

## Implements

- [`CIAService`](../interfaces/CIAService.md)
- `IBaseService`

## Constructors

### Constructor

> **new BaseService**(`dataProvider`): `BaseService`

Defined in: [services/BaseService.ts:56](https://github.com/Hack23/cia-compliance-manager/blob/d1f49c8017dd6649366103fd87fa14f3af19f220/src/services/BaseService.ts#L56)

Create a new service instance

#### Parameters

##### dataProvider

[`CIADataProvider`](../../../types/interfaces/CIADataProvider.md)

Data provider for security information

#### Returns

`BaseService`

## Properties

### name

> `readonly` **name**: `string` = `'BaseService'`

Defined in: [services/BaseService.ts:44](https://github.com/Hack23/cia-compliance-manager/blob/d1f49c8017dd6649366103fd87fa14f3af19f220/src/services/BaseService.ts#L44)

Service name for identification

#### Implementation of

`IBaseService.name`

## Methods

### getComponentDetails()

> **getComponentDetails**(`component`, `level`): [`CIADetails`](../../../types/interfaces/CIADetails.md) \| `undefined`

Defined in: [services/BaseService.ts:193](https://github.com/Hack23/cia-compliance-manager/blob/d1f49c8017dd6649366103fd87fa14f3af19f220/src/services/BaseService.ts#L193)

Get component details for a specific component and security level

#### Parameters

##### component

[`CIAComponentType`](../../../types/type-aliases/CIAComponentType.md)

##### level

[`SecurityLevel`](../../../types/cia/type-aliases/SecurityLevel.md)

#### Returns

[`CIADetails`](../../../types/interfaces/CIADetails.md) \| `undefined`

#### Implementation of

[`CIAService`](../interfaces/CIAService.md).[`getComponentDetails`](../interfaces/CIAService.md#getcomponentdetails)

***

### getRiskLevelFromSecurityLevel()

> **getRiskLevelFromSecurityLevel**(`level`): `string`

Defined in: [services/BaseService.ts:254](https://github.com/Hack23/cia-compliance-manager/blob/d1f49c8017dd6649366103fd87fa14f3af19f220/src/services/BaseService.ts#L254)

Get risk level from security level

#### Parameters

##### level

[`SecurityLevel`](../../../types/cia/type-aliases/SecurityLevel.md)

#### Returns

`string`

#### Implementation of

[`CIAService`](../interfaces/CIAService.md).[`getRiskLevelFromSecurityLevel`](../interfaces/CIAService.md#getrisklevelfromsecuritylevel)

***

### getSecurityLevelDescription()

> **getSecurityLevelDescription**(`level`): `string`

Defined in: [services/BaseService.ts:233](https://github.com/Hack23/cia-compliance-manager/blob/d1f49c8017dd6649366103fd87fa14f3af19f220/src/services/BaseService.ts#L233)

Get security level description

#### Parameters

##### level

[`SecurityLevel`](../../../types/cia/type-aliases/SecurityLevel.md)

#### Returns

`string`

#### Implementation of

[`CIAService`](../interfaces/CIAService.md).[`getSecurityLevelDescription`](../interfaces/CIAService.md#getsecurityleveldescription)

***

### handleError()

> **handleError**(`error`): [`ServiceError`](../../classes/ServiceError.md)

Defined in: [services/BaseService.ts:104](https://github.com/Hack23/cia-compliance-manager/blob/d1f49c8017dd6649366103fd87fa14f3af19f220/src/services/BaseService.ts#L104)

Handle errors consistently across services

#### Parameters

##### error

`Error`

Error to handle

#### Returns

[`ServiceError`](../../classes/ServiceError.md)

ServiceError

#### Implementation of

`IBaseService.handleError`

***

### validate()

> **validate**(`input`): `boolean`

Defined in: [services/BaseService.ts:73](https://github.com/Hack23/cia-compliance-manager/blob/d1f49c8017dd6649366103fd87fa14f3af19f220/src/services/BaseService.ts#L73)

Validate input parameters (to be overridden by subclasses)

#### Parameters

##### input

`unknown`

Input to validate

#### Returns

`boolean`

True if valid, false otherwise

#### Implementation of

`IBaseService.validate`
