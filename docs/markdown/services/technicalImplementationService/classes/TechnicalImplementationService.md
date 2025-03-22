[**CIA Compliance Manager Documentation v0.8.5**](../../../README.md)

***

[CIA Compliance Manager Documentation](../../../modules.md) / [services/technicalImplementationService](../README.md) / TechnicalImplementationService

# Class: TechnicalImplementationService

Defined in: [src/services/technicalImplementationService.ts:33](https://github.com/Hack23/cia-compliance-manager/blob/3ae0301247f765ba03c8c0fe645db4718bb8af76/src/services/technicalImplementationService.ts#L33)

Service for technical implementation details and guidance

## Implementation Perspective

This service provides practical implementation guidance for security controls,
including effort estimation, technical requirements, and step-by-step
implementation guides. It helps technical teams understand how to operationalize
security requirements and implement controls effectively. 🔧

## Extends

- [`BaseService`](../../BaseService/classes/BaseService.md)

## Constructors

### new TechnicalImplementationService()

> **new TechnicalImplementationService**(`dataProvider`): `TechnicalImplementationService`

Defined in: [src/services/technicalImplementationService.ts:34](https://github.com/Hack23/cia-compliance-manager/blob/3ae0301247f765ba03c8c0fe645db4718bb8af76/src/services/technicalImplementationService.ts#L34)

#### Parameters

##### dataProvider

[`CIADataProvider`](../../../types/cia-services/interfaces/CIADataProvider.md)

#### Returns

`TechnicalImplementationService`

#### Overrides

[`BaseService`](../../BaseService/classes/BaseService.md).[`constructor`](../../BaseService/classes/BaseService.md#constructor)

## Properties

### dataProvider

> `protected` **dataProvider**: [`CIADataProvider`](../../../types/cia-services/interfaces/CIADataProvider.md)

Defined in: [src/services/BaseService.ts:18](https://github.com/Hack23/cia-compliance-manager/blob/3ae0301247f765ba03c8c0fe645db4718bb8af76/src/services/BaseService.ts#L18)

#### Inherited from

[`BaseService`](../../BaseService/classes/BaseService.md).[`dataProvider`](../../BaseService/classes/BaseService.md#dataprovider)

## Methods

### getComponentImplementationDetails()

> **getComponentImplementationDetails**(`component`, `level`): [`TechnicalImplementationDetails`](../../../types/cia-services/interfaces/TechnicalImplementationDetails.md)

Defined in: [src/services/technicalImplementationService.ts:95](https://github.com/Hack23/cia-compliance-manager/blob/3ae0301247f765ba03c8c0fe645db4718bb8af76/src/services/technicalImplementationService.ts#L95)

Get component-specific implementation details

#### Parameters

##### component

[`CIAComponentType`](../../../types/cia-services/type-aliases/CIAComponentType.md)

CIA component type

##### level

[`SecurityLevel`](../../../types/cia/type-aliases/SecurityLevel.md)

Security level

#### Returns

[`TechnicalImplementationDetails`](../../../types/cia-services/interfaces/TechnicalImplementationDetails.md)

Component-specific implementation details

***

### getImplementationConsiderations()

> **getImplementationConsiderations**(`level`): `string`

Defined in: [src/services/technicalImplementationService.ts:182](https://github.com/Hack23/cia-compliance-manager/blob/3ae0301247f765ba03c8c0fe645db4718bb8af76/src/services/technicalImplementationService.ts#L182)

Get implementation considerations based on security levels

#### Parameters

##### level

[`SecurityLevel`](../../../types/cia/type-aliases/SecurityLevel.md)

Security level for implementation

#### Returns

`string`

Implementation considerations text

***

### getImplementationEffort()

> **getImplementationEffort**(`component`, `level`): [`ImplementationEffort`](../../../types/cia-services/interfaces/ImplementationEffort.md)

Defined in: [src/services/technicalImplementationService.ts:205](https://github.com/Hack23/cia-compliance-manager/blob/3ae0301247f765ba03c8c0fe645db4718bb8af76/src/services/technicalImplementationService.ts#L205)

Get implementation effort for a component's security level

#### Parameters

##### component

[`CIAComponentType`](../../../types/cia-services/type-aliases/CIAComponentType.md)

The CIA component

##### level

[`SecurityLevel`](../../../types/cia/type-aliases/SecurityLevel.md)

The security level

#### Returns

[`ImplementationEffort`](../../../types/cia-services/interfaces/ImplementationEffort.md)

Implementation effort details or default effort

***

### getImplementationSteps()

> **getImplementationSteps**(`component`, `level`): `string`[]

Defined in: [src/services/technicalImplementationService.ts:219](https://github.com/Hack23/cia-compliance-manager/blob/3ae0301247f765ba03c8c0fe645db4718bb8af76/src/services/technicalImplementationService.ts#L219)

Get implementation steps for a component's security level

#### Parameters

##### component

[`CIAComponentType`](../../../types/cia-services/type-aliases/CIAComponentType.md)

The CIA component

##### level

[`SecurityLevel`](../../../types/cia/type-aliases/SecurityLevel.md)

The security level

#### Returns

`string`[]

Array of implementation steps

***

### getImplementationTime()

> **getImplementationTime**(`level`): `string`

Defined in: [src/services/technicalImplementationService.ts:159](https://github.com/Hack23/cia-compliance-manager/blob/3ae0301247f765ba03c8c0fe645db4718bb8af76/src/services/technicalImplementationService.ts#L159)

Get implementation time estimate based on security level

#### Parameters

##### level

[`SecurityLevel`](../../../types/cia/type-aliases/SecurityLevel.md)

Security level

#### Returns

`string`

Implementation time estimate

***

### getRecommendations()

> **getRecommendations**(`component`, `level`): `string`[]

Defined in: [src/services/technicalImplementationService.ts:129](https://github.com/Hack23/cia-compliance-manager/blob/3ae0301247f765ba03c8c0fe645db4718bb8af76/src/services/technicalImplementationService.ts#L129)

Get recommendations for a component and security level

#### Parameters

##### component

[`CIAComponentType`](../../../types/cia-services/type-aliases/CIAComponentType.md)

CIA component type

##### level

[`SecurityLevel`](../../../types/cia/type-aliases/SecurityLevel.md)

Security level

#### Returns

`string`[]

Array of recommendations

***

### getTechnicalDescription()

> **getTechnicalDescription**(`component`, `level`): `string`

Defined in: [src/services/technicalImplementationService.ts:109](https://github.com/Hack23/cia-compliance-manager/blob/3ae0301247f765ba03c8c0fe645db4718bb8af76/src/services/technicalImplementationService.ts#L109)

Get technical description for a component and security level

#### Parameters

##### component

[`CIAComponentType`](../../../types/cia-services/type-aliases/CIAComponentType.md)

CIA component type

##### level

[`SecurityLevel`](../../../types/cia/type-aliases/SecurityLevel.md)

Security level

#### Returns

`string`

Technical description

***

### getTechnicalImplementation()

> **getTechnicalImplementation**(`component`, `level`): [`TechnicalImplementationDetails`](../../../types/cia-services/interfaces/TechnicalImplementationDetails.md)

Defined in: [src/services/technicalImplementationService.ts:45](https://github.com/Hack23/cia-compliance-manager/blob/3ae0301247f765ba03c8c0fe645db4718bb8af76/src/services/technicalImplementationService.ts#L45)

Get technical implementation details for a component and security level

#### Parameters

##### component

[`CIAComponentType`](../../../types/cia-services/type-aliases/CIAComponentType.md)

CIA component type

##### level

[`SecurityLevel`](../../../types/cia/type-aliases/SecurityLevel.md)

Security level

#### Returns

[`TechnicalImplementationDetails`](../../../types/cia-services/interfaces/TechnicalImplementationDetails.md)

Technical implementation details

***

### capitalizeFirstLetter()

> `protected` **capitalizeFirstLetter**(`string`): `string`

Defined in: [src/services/BaseService.ts:75](https://github.com/Hack23/cia-compliance-manager/blob/3ae0301247f765ba03c8c0fe645db4718bb8af76/src/services/BaseService.ts#L75)

Capitalize first letter of a string

#### Parameters

##### string

`string`

#### Returns

`string`

#### Inherited from

[`BaseService`](../../BaseService/classes/BaseService.md).[`capitalizeFirstLetter`](../../BaseService/classes/BaseService.md#capitalizefirstletter)

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

#### Inherited from

[`BaseService`](../../BaseService/classes/BaseService.md).[`getCIAOptions`](../../BaseService/classes/BaseService.md#getciaoptions)

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

#### Inherited from

[`BaseService`](../../BaseService/classes/BaseService.md).[`getComponentDetails`](../../BaseService/classes/BaseService.md#getcomponentdetails)

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

#### Inherited from

[`BaseService`](../../BaseService/classes/BaseService.md).[`getDefaultSecurityIcon`](../../BaseService/classes/BaseService.md#getdefaultsecurityicon)

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

#### Inherited from

[`BaseService`](../../BaseService/classes/BaseService.md).[`getRiskLevelFromSecurityLevel`](../../BaseService/classes/BaseService.md#getrisklevelfromsecuritylevel)

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

#### Inherited from

[`BaseService`](../../BaseService/classes/BaseService.md).[`getSecurityLevelValue`](../../BaseService/classes/BaseService.md#getsecuritylevelvalue)

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

#### Inherited from

[`BaseService`](../../BaseService/classes/BaseService.md).[`getValuePoints`](../../BaseService/classes/BaseService.md#getvaluepoints)
