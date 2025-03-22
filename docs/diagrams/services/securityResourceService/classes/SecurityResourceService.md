[**CIA Compliance Manager Diagrams v0.8.5**](../../../README.md)

***

[CIA Compliance Manager Diagrams](../../../modules.md) / [services/securityResourceService](../README.md) / SecurityResourceService

# Class: SecurityResourceService

Defined in: [src/services/securityResourceService.ts:28](https://github.com/Hack23/cia-compliance-manager/blob/3ae0301247f765ba03c8c0fe645db4718bb8af76/src/services/securityResourceService.ts#L28)

Service for security resources related functionality

## Educational Perspective

This service provides educational resources and implementation guides
that help security teams build their knowledge and implement security
controls effectively. It curates relevant documentation and learning
resources based on selected security levels. 📚

## Extends

- [`BaseService`](../../BaseService/classes/BaseService.md)

## Constructors

### new SecurityResourceService()

> **new SecurityResourceService**(`dataProvider`): `SecurityResourceService`

Defined in: [src/services/securityResourceService.ts:29](https://github.com/Hack23/cia-compliance-manager/blob/3ae0301247f765ba03c8c0fe645db4718bb8af76/src/services/securityResourceService.ts#L29)

#### Parameters

##### dataProvider

[`CIADataProvider`](../../../types/cia-services/interfaces/CIADataProvider.md)

#### Returns

`SecurityResourceService`

#### Overrides

[`BaseService`](../../BaseService/classes/BaseService.md).[`constructor`](../../BaseService/classes/BaseService.md#constructor)

## Properties

### dataProvider

> `protected` **dataProvider**: [`CIADataProvider`](../../../types/cia-services/interfaces/CIADataProvider.md)

Defined in: [src/services/BaseService.ts:18](https://github.com/Hack23/cia-compliance-manager/blob/3ae0301247f765ba03c8c0fe645db4718bb8af76/src/services/BaseService.ts#L18)

#### Inherited from

[`BaseService`](../../BaseService/classes/BaseService.md).[`dataProvider`](../../BaseService/classes/BaseService.md#dataprovider)

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

### getSecurityResources()

> **getSecurityResources**(`component`, `level`): [`SecurityResource`](../interfaces/SecurityResource.md)[]

Defined in: [src/services/securityResourceService.ts:43](https://github.com/Hack23/cia-compliance-manager/blob/3ae0301247f765ba03c8c0fe645db4718bb8af76/src/services/securityResourceService.ts#L43)

Get security resources for a specific level

#### Parameters

##### component

[`CIAComponentType`](../../../types/cia-services/type-aliases/CIAComponentType.md)

##### level

[`SecurityLevel`](../../../types/cia/type-aliases/SecurityLevel.md)

#### Returns

[`SecurityResource`](../interfaces/SecurityResource.md)[]

***

### getValuePoints()

> **getValuePoints**(`level`): `string`[]

Defined in: [src/services/securityResourceService.ts:36](https://github.com/Hack23/cia-compliance-manager/blob/3ae0301247f765ba03c8c0fe645db4718bb8af76/src/services/securityResourceService.ts#L36)

Get value points for a security level

#### Parameters

##### level

[`SecurityLevel`](../../../types/cia/type-aliases/SecurityLevel.md)

#### Returns

`string`[]

#### Overrides

[`BaseService`](../../BaseService/classes/BaseService.md).[`getValuePoints`](../../BaseService/classes/BaseService.md#getvaluepoints)
