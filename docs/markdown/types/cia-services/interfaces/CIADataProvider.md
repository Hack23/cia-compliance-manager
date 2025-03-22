[**CIA Compliance Manager Documentation v0.8.5**](../../../README.md)

***

[CIA Compliance Manager Documentation](../../../modules.md) / [types/cia-services](../README.md) / CIADataProvider

# Interface: CIADataProvider

Defined in: [src/types/cia-services.ts:236](https://github.com/Hack23/cia-compliance-manager/blob/3ae0301247f765ba03c8c0fe645db4718bb8af76/src/types/cia-services.ts#L236)

Data provider for CIA security information

## Properties

### availabilityOptions

> **availabilityOptions**: `Record`\<[`SecurityLevel`](../../cia/type-aliases/SecurityLevel.md), [`CIADetails`](CIADetails.md)\>

Defined in: [src/types/cia-services.ts:237](https://github.com/Hack23/cia-compliance-manager/blob/3ae0301247f765ba03c8c0fe645db4718bb8af76/src/types/cia-services.ts#L237)

***

### confidentialityOptions

> **confidentialityOptions**: `Record`\<[`SecurityLevel`](../../cia/type-aliases/SecurityLevel.md), [`CIADetails`](CIADetails.md)\>

Defined in: [src/types/cia-services.ts:239](https://github.com/Hack23/cia-compliance-manager/blob/3ae0301247f765ba03c8c0fe645db4718bb8af76/src/types/cia-services.ts#L239)

***

### getDefaultExpertiseLevel()?

> `optional` **getDefaultExpertiseLevel**: (`level`) => `string`

Defined in: [src/types/cia-services.ts:250](https://github.com/Hack23/cia-compliance-manager/blob/3ae0301247f765ba03c8c0fe645db4718bb8af76/src/types/cia-services.ts#L250)

Get default expertise level for a security level

#### Parameters

##### level

[`SecurityLevel`](../../cia/type-aliases/SecurityLevel.md)

#### Returns

`string`

***

### getDefaultSecurityIcon()?

> `optional` **getDefaultSecurityIcon**: (`level`) => `string`

Defined in: [src/types/cia-services.ts:245](https://github.com/Hack23/cia-compliance-manager/blob/3ae0301247f765ba03c8c0fe645db4718bb8af76/src/types/cia-services.ts#L245)

Get default security icon for a security level

#### Parameters

##### level

[`SecurityLevel`](../../cia/type-aliases/SecurityLevel.md)

#### Returns

`string`

***

### getDefaultValuePoints()?

> `optional` **getDefaultValuePoints**: (`level`) => `string`[]

Defined in: [src/types/cia-services.ts:260](https://github.com/Hack23/cia-compliance-manager/blob/3ae0301247f765ba03c8c0fe645db4718bb8af76/src/types/cia-services.ts#L260)

Get default value points for a security level

#### Parameters

##### level

[`SecurityLevel`](../../cia/type-aliases/SecurityLevel.md)

#### Returns

`string`[]

***

### getProtectionLevel()?

> `optional` **getProtectionLevel**: (`level`) => `string`

Defined in: [src/types/cia-services.ts:255](https://github.com/Hack23/cia-compliance-manager/blob/3ae0301247f765ba03c8c0fe645db4718bb8af76/src/types/cia-services.ts#L255)

Get protection level for a security level

#### Parameters

##### level

[`SecurityLevel`](../../cia/type-aliases/SecurityLevel.md)

#### Returns

`string`

***

### integrityOptions

> **integrityOptions**: `Record`\<[`SecurityLevel`](../../cia/type-aliases/SecurityLevel.md), [`CIADetails`](CIADetails.md)\>

Defined in: [src/types/cia-services.ts:238](https://github.com/Hack23/cia-compliance-manager/blob/3ae0301247f765ba03c8c0fe645db4718bb8af76/src/types/cia-services.ts#L238)

***

### roiEstimates

> **roiEstimates**: [`ROIEstimatesMap`](ROIEstimatesMap.md)

Defined in: [src/types/cia-services.ts:240](https://github.com/Hack23/cia-compliance-manager/blob/3ae0301247f765ba03c8c0fe645db4718bb8af76/src/types/cia-services.ts#L240)
