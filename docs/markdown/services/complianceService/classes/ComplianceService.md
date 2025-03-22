[**CIA Compliance Manager Documentation v0.8.5**](../../../README.md)

***

[CIA Compliance Manager Documentation](../../../modules.md) / [services/complianceService](../README.md) / ComplianceService

# Class: ComplianceService

Defined in: [src/services/complianceService.ts:43](https://github.com/Hack23/cia-compliance-manager/blob/3ae0301247f765ba03c8c0fe645db4718bb8af76/src/services/complianceService.ts#L43)

Service for compliance mapping and status reporting

## Compliance Perspective

This service maps security levels to compliance with various regulatory
frameworks, helping organizations understand their compliance posture
and identify gaps that need to be addressed to meet regulatory
requirements. 📋

## Extends

- [`BaseService`](../../BaseService/classes/BaseService.md)

## Constructors

### new ComplianceService()

> **new ComplianceService**(`dataProvider`): `ComplianceService`

Defined in: [src/services/complianceService.ts:83](https://github.com/Hack23/cia-compliance-manager/blob/3ae0301247f765ba03c8c0fe645db4718bb8af76/src/services/complianceService.ts#L83)

#### Parameters

##### dataProvider

[`CIADataProvider`](../../../types/cia-services/interfaces/CIADataProvider.md)

#### Returns

`ComplianceService`

#### Overrides

[`BaseService`](../../BaseService/classes/BaseService.md).[`constructor`](../../BaseService/classes/BaseService.md#constructor)

## Properties

### dataProvider

> `protected` **dataProvider**: [`CIADataProvider`](../../../types/cia-services/interfaces/CIADataProvider.md)

Defined in: [src/services/BaseService.ts:18](https://github.com/Hack23/cia-compliance-manager/blob/3ae0301247f765ba03c8c0fe645db4718bb8af76/src/services/BaseService.ts#L18)

#### Inherited from

[`BaseService`](../../BaseService/classes/BaseService.md).[`dataProvider`](../../BaseService/classes/BaseService.md#dataprovider)

## Methods

### getComplianceStatus()

> **getComplianceStatus**(`availabilityLevel`, `integrityLevel`, `confidentialityLevel`): [`ComplianceStatusDetails`](../interfaces/ComplianceStatusDetails.md)

Defined in: [src/services/complianceService.ts:95](https://github.com/Hack23/cia-compliance-manager/blob/3ae0301247f765ba03c8c0fe645db4718bb8af76/src/services/complianceService.ts#L95)

Get compliance status based on security levels

#### Parameters

##### availabilityLevel

[`SecurityLevel`](../../../types/cia/type-aliases/SecurityLevel.md)

Availability security level

##### integrityLevel

[`SecurityLevel`](../../../types/cia/type-aliases/SecurityLevel.md)

Integrity security level

##### confidentialityLevel

[`SecurityLevel`](../../../types/cia/type-aliases/SecurityLevel.md)

Confidentiality security level

#### Returns

[`ComplianceStatusDetails`](../interfaces/ComplianceStatusDetails.md)

Compliance status details

***

### getCompliantFrameworks()

> **getCompliantFrameworks**(`availabilityLevel`, `integrityLevel`, `confidentialityLevel`): `string`[]

Defined in: [src/services/complianceService.ts:181](https://github.com/Hack23/cia-compliance-manager/blob/3ae0301247f765ba03c8c0fe645db4718bb8af76/src/services/complianceService.ts#L181)

Get compliant frameworks for a specific security level

#### Parameters

##### availabilityLevel

[`SecurityLevel`](../../../types/cia/type-aliases/SecurityLevel.md)

Availability security level

##### integrityLevel

[`SecurityLevel`](../../../types/cia/type-aliases/SecurityLevel.md) = `availabilityLevel`

Integrity security level (optional, defaults to availabilityLevel)

##### confidentialityLevel

[`SecurityLevel`](../../../types/cia/type-aliases/SecurityLevel.md) = `availabilityLevel`

Confidentiality security level (optional, defaults to availabilityLevel)

#### Returns

`string`[]

Array of compliant framework names

***

### getFrameworkDescription()

> **getFrameworkDescription**(`framework`): `string`

Defined in: [src/services/complianceService.ts:212](https://github.com/Hack23/cia-compliance-manager/blob/3ae0301247f765ba03c8c0fe645db4718bb8af76/src/services/complianceService.ts#L212)

Get description of a specific compliance framework

#### Parameters

##### framework

`string`

Framework name

#### Returns

`string`

Framework description

***

### getFrameworkRequiredLevel()

> **getFrameworkRequiredLevel**(`framework`, `component`): [`SecurityLevel`](../../../types/cia/type-aliases/SecurityLevel.md)

Defined in: [src/services/complianceService.ts:299](https://github.com/Hack23/cia-compliance-manager/blob/3ae0301247f765ba03c8c0fe645db4718bb8af76/src/services/complianceService.ts#L299)

Get required security level for a specific framework and component

#### Parameters

##### framework

`string`

Framework name

##### component

[`CIAComponentType`](../../../types/cia-services/type-aliases/CIAComponentType.md)

CIA component

#### Returns

[`SecurityLevel`](../../../types/cia/type-aliases/SecurityLevel.md)

Required security level

***

### getFrameworkStatus()

> **getFrameworkStatus**(`framework`, `availabilityLevel`, `integrityLevel`, `confidentialityLevel`): [`ComplianceStatus`](../type-aliases/ComplianceStatus.md)

Defined in: [src/services/complianceService.ts:243](https://github.com/Hack23/cia-compliance-manager/blob/3ae0301247f765ba03c8c0fe645db4718bb8af76/src/services/complianceService.ts#L243)

Get compliance status for a specific framework

#### Parameters

##### framework

`string`

Framework name

##### availabilityLevel

[`SecurityLevel`](../../../types/cia/type-aliases/SecurityLevel.md)

Availability security level

##### integrityLevel

[`SecurityLevel`](../../../types/cia/type-aliases/SecurityLevel.md)

Integrity security level

##### confidentialityLevel

[`SecurityLevel`](../../../types/cia/type-aliases/SecurityLevel.md)

Confidentiality security level

#### Returns

[`ComplianceStatus`](../type-aliases/ComplianceStatus.md)

Compliance status for the framework

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
