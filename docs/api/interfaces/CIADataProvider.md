[**CIA Compliance Manager API Documentation v0.7.0**](../README.md)

***

[CIA Compliance Manager API Documentation](../globals.md) / CIADataProvider

# Interface: CIADataProvider

Defined in: [src/services/ciaContentService.ts:54](https://github.com/Hack23/cia-compliance-manager/blob/main/src/services/ciaContentService.ts#L54)

Interface for CIA data source provider

## Properties

### availabilityOptions

> **availabilityOptions**: `Record`\<`string`, [`EnhancedCIADetails`](EnhancedCIADetails.md)\>

Defined in: [src/services/ciaContentService.ts:55](https://github.com/Hack23/cia-compliance-manager/blob/main/src/services/ciaContentService.ts#L55)

***

### confidentialityOptions

> **confidentialityOptions**: `Record`\<`string`, [`EnhancedCIADetails`](EnhancedCIADetails.md)\>

Defined in: [src/services/ciaContentService.ts:57](https://github.com/Hack23/cia-compliance-manager/blob/main/src/services/ciaContentService.ts#L57)

***

### integrityOptions

> **integrityOptions**: `Record`\<`string`, [`EnhancedCIADetails`](EnhancedCIADetails.md)\>

Defined in: [src/services/ciaContentService.ts:56](https://github.com/Hack23/cia-compliance-manager/blob/main/src/services/ciaContentService.ts#L56)

***

### roiEstimates

> **roiEstimates**: [`ROIEstimatesMap`](../type-aliases/ROIEstimatesMap.md)

Defined in: [src/services/ciaContentService.ts:58](https://github.com/Hack23/cia-compliance-manager/blob/main/src/services/ciaContentService.ts#L58)

## Methods

### getDefaultSecurityIcon()

> **getDefaultSecurityIcon**(`level`): `string`

Defined in: [src/services/ciaContentService.ts:61](https://github.com/Hack23/cia-compliance-manager/blob/main/src/services/ciaContentService.ts#L61)

#### Parameters

##### level

[`SecurityLevel`](../type-aliases/SecurityLevel.md)

#### Returns

`string`

***

### getDefaultValuePoints()

> **getDefaultValuePoints**(`level`): `string`[]

Defined in: [src/services/ciaContentService.ts:62](https://github.com/Hack23/cia-compliance-manager/blob/main/src/services/ciaContentService.ts#L62)

#### Parameters

##### level

[`SecurityLevel`](../type-aliases/SecurityLevel.md)

#### Returns

`string`[]
