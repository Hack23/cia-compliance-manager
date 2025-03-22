[**CIA Compliance Manager Documentation v0.8.5**](../../../README.md)

***

[CIA Compliance Manager Documentation](../../../modules.md) / [services/BaseService](../README.md) / BaseService

# Class: `abstract` BaseService

Defined in: [src/services/BaseService.ts:17](https://github.com/Hack23/cia-compliance-manager/blob/3ae0301247f765ba03c8c0fe645db4718bb8af76/src/services/BaseService.ts#L17)

Base service class that provides common functionality for all services

## Business Perspective

The BaseService establishes a consistent foundation for all services,
ensuring uniform data access patterns, error handling, and security level 
processing. This improves maintainability and reduces duplication across
security-related services. 🛠️

## Extended by

- [`ComplianceService`](../../complianceService/classes/ComplianceService.md)
- [`SecurityMetricsService`](../../securityMetricsService/classes/SecurityMetricsService.md)
- [`SecurityResourceService`](../../securityResourceService/classes/SecurityResourceService.md)
- [`TechnicalImplementationService`](../../technicalImplementationService/classes/TechnicalImplementationService.md)

## Constructors

### new BaseService()

> **new BaseService**(`dataProvider`): `BaseService`

Defined in: [src/services/BaseService.ts:20](https://github.com/Hack23/cia-compliance-manager/blob/3ae0301247f765ba03c8c0fe645db4718bb8af76/src/services/BaseService.ts#L20)

#### Parameters

##### dataProvider

[`CIADataProvider`](../../../types/cia-services/interfaces/CIADataProvider.md)

#### Returns

`BaseService`

## Properties

### dataProvider

> `protected` **dataProvider**: [`CIADataProvider`](../../../types/cia-services/interfaces/CIADataProvider.md)

Defined in: [src/services/BaseService.ts:18](https://github.com/Hack23/cia-compliance-manager/blob/3ae0301247f765ba03c8c0fe645db4718bb8af76/src/services/BaseService.ts#L18)

## Methods

### capitalizeFirstLetter()

> `protected` **capitalizeFirstLetter**(`string`): `string`

Defined in: [src/services/BaseService.ts:75](https://github.com/Hack23/cia-compliance-manager/blob/3ae0301247f765ba03c8c0fe645db4718bb8af76/src/services/BaseService.ts#L75)

Capitalize first letter of a string

#### Parameters

##### string

`string`

#### Returns

`string`

***

### getCIAOptions()

> `protected` **getCIAOptions**(`component`): `Record`\<`string`, [`CIADetails`](../../../types/cia-services/interfaces/CIADetails.md)\>

Defined in: [src/services/BaseService.ts:43](https://github.com/Hack23/cia-compliance-manager/blob/3ae0301247f765ba03c8c0fe645db4718bb8af76/src/services/BaseService.ts#L43)

Get options for a CIA component

#### Parameters

##### component

[`CIAComponentType`](../../../types/cia-services/type-aliases/CIAComponentType.md)

#### Returns

`Record`\<`string`, [`CIADetails`](../../../types/cia-services/interfaces/CIADetails.md)\>

***

### getComponentDetails()

> `protected` **getComponentDetails**(`component`, `level`): `undefined` \| [`CIADetails`](../../../types/cia-services/interfaces/CIADetails.md)

Defined in: [src/services/BaseService.ts:27](https://github.com/Hack23/cia-compliance-manager/blob/3ae0301247f765ba03c8c0fe645db4718bb8af76/src/services/BaseService.ts#L27)

Get component details for a specific security level

#### Parameters

##### component

[`CIAComponentType`](../../../types/cia-services/type-aliases/CIAComponentType.md)

##### level

[`SecurityLevel`](../../../types/cia/type-aliases/SecurityLevel.md)

#### Returns

`undefined` \| [`CIADetails`](../../../types/cia-services/interfaces/CIADetails.md)

***

### getDefaultSecurityIcon()

> `protected` **getDefaultSecurityIcon**(`level`): `string`

Defined in: [src/services/BaseService.ts:82](https://github.com/Hack23/cia-compliance-manager/blob/3ae0301247f765ba03c8c0fe645db4718bb8af76/src/services/BaseService.ts#L82)

Get default security icon for a level

#### Parameters

##### level

[`SecurityLevel`](../../../types/cia/type-aliases/SecurityLevel.md)

#### Returns

`string`

***

### getRiskLevelFromSecurityLevel()

> `protected` **getRiskLevelFromSecurityLevel**(`level`): `string`

Defined in: [src/services/BaseService.ts:61](https://github.com/Hack23/cia-compliance-manager/blob/3ae0301247f765ba03c8c0fe645db4718bb8af76/src/services/BaseService.ts#L61)

Get risk level from security level

#### Parameters

##### level

[`SecurityLevel`](../../../types/cia/type-aliases/SecurityLevel.md)

#### Returns

`string`

***

### getSecurityLevelValue()

> `protected` **getSecurityLevelValue**(`level`): `number`

Defined in: [src/services/BaseService.ts:68](https://github.com/Hack23/cia-compliance-manager/blob/3ae0301247f765ba03c8c0fe645db4718bb8af76/src/services/BaseService.ts#L68)

Calculate security level value from level string

#### Parameters

##### level

[`SecurityLevel`](../../../types/cia/type-aliases/SecurityLevel.md)

#### Returns

`number`

***

### getValuePoints()

> `protected` **getValuePoints**(`level`): `string`[]

Defined in: [src/services/BaseService.ts:101](https://github.com/Hack23/cia-compliance-manager/blob/3ae0301247f765ba03c8c0fe645db4718bb8af76/src/services/BaseService.ts#L101)

Get value points for a security level

#### Parameters

##### level

[`SecurityLevel`](../../../types/cia/type-aliases/SecurityLevel.md)

#### Returns

`string`[]
