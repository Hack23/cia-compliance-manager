[**CIA Compliance Manager Diagrams v0.8.5**](../../README.md)

***

[CIA Compliance Manager Diagrams](../../modules.md) / [types](../README.md) / CIADataProvider

# Interface: CIADataProvider

Defined in: [types/cia-services.ts:236](https://github.com/Hack23/cia-compliance-manager/blob/b7c3bc9644fb5b9d82b5b184ba290206da25104b/src/types/cia-services.ts#L236)

Data provider for CIA security information

## Properties

### availabilityOptions

> **availabilityOptions**: `Record`\<[`SecurityLevel`](../../index/type-aliases/SecurityLevel.md), [`CIADetails`](CIADetails.md)\>

Defined in: [types/cia-services.ts:237](https://github.com/Hack23/cia-compliance-manager/blob/b7c3bc9644fb5b9d82b5b184ba290206da25104b/src/types/cia-services.ts#L237)

***

### confidentialityOptions

> **confidentialityOptions**: `Record`\<[`SecurityLevel`](../../index/type-aliases/SecurityLevel.md), [`CIADetails`](CIADetails.md)\>

Defined in: [types/cia-services.ts:239](https://github.com/Hack23/cia-compliance-manager/blob/b7c3bc9644fb5b9d82b5b184ba290206da25104b/src/types/cia-services.ts#L239)

***

### getDefaultExpertiseLevel()?

> `optional` **getDefaultExpertiseLevel**: (`level`) => `string`

Defined in: [types/cia-services.ts:250](https://github.com/Hack23/cia-compliance-manager/blob/b7c3bc9644fb5b9d82b5b184ba290206da25104b/src/types/cia-services.ts#L250)

Get default expertise level for a security level

#### Parameters

##### level

[`SecurityLevel`](../../index/type-aliases/SecurityLevel.md)

#### Returns

`string`

***

### getDefaultSecurityIcon()?

> `optional` **getDefaultSecurityIcon**: (`level`) => `string`

Defined in: [types/cia-services.ts:245](https://github.com/Hack23/cia-compliance-manager/blob/b7c3bc9644fb5b9d82b5b184ba290206da25104b/src/types/cia-services.ts#L245)

Get default security icon for a security level

#### Parameters

##### level

[`SecurityLevel`](../../index/type-aliases/SecurityLevel.md)

#### Returns

`string`

***

### getDefaultValuePoints()?

> `optional` **getDefaultValuePoints**: (`level`) => `string`[]

Defined in: [types/cia-services.ts:260](https://github.com/Hack23/cia-compliance-manager/blob/b7c3bc9644fb5b9d82b5b184ba290206da25104b/src/types/cia-services.ts#L260)

Get default value points for a security level

#### Parameters

##### level

[`SecurityLevel`](../../index/type-aliases/SecurityLevel.md)

#### Returns

`string`[]

***

### getProtectionLevel()?

> `optional` **getProtectionLevel**: (`level`) => `string`

Defined in: [types/cia-services.ts:255](https://github.com/Hack23/cia-compliance-manager/blob/b7c3bc9644fb5b9d82b5b184ba290206da25104b/src/types/cia-services.ts#L255)

Get protection level for a security level

#### Parameters

##### level

[`SecurityLevel`](../../index/type-aliases/SecurityLevel.md)

#### Returns

`string`

***

### integrityOptions

> **integrityOptions**: `Record`\<[`SecurityLevel`](../../index/type-aliases/SecurityLevel.md), [`CIADetails`](CIADetails.md)\>

Defined in: [types/cia-services.ts:238](https://github.com/Hack23/cia-compliance-manager/blob/b7c3bc9644fb5b9d82b5b184ba290206da25104b/src/types/cia-services.ts#L238)

***

### roiEstimates

> **roiEstimates**: [`ROIEstimatesMap`](ROIEstimatesMap.md)

Defined in: [types/cia-services.ts:240](https://github.com/Hack23/cia-compliance-manager/blob/b7c3bc9644fb5b9d82b5b184ba290206da25104b/src/types/cia-services.ts#L240)
