[**CIA Compliance Manager Documentation v0.8.1**](../README.md)

***

[CIA Compliance Manager Documentation](../globals.md) / CIADataProvider

# Interface: CIADataProvider

Defined in: [src/services/ciaContentService.ts:55](https://github.com/Hack23/cia-compliance-manager/blob/aea527f1006de96602c10bb201453301cffe7b07/src/services/ciaContentService.ts#L55)

Interface for CIA data source provider

## Properties

### availabilityOptions

> **availabilityOptions**: `Record`\<`string`, [`EnhancedCIADetails`](EnhancedCIADetails.md)\>

Defined in: [src/services/ciaContentService.ts:56](https://github.com/Hack23/cia-compliance-manager/blob/aea527f1006de96602c10bb201453301cffe7b07/src/services/ciaContentService.ts#L56)

***

### confidentialityOptions

> **confidentialityOptions**: `Record`\<`string`, [`EnhancedCIADetails`](EnhancedCIADetails.md)\>

Defined in: [src/services/ciaContentService.ts:58](https://github.com/Hack23/cia-compliance-manager/blob/aea527f1006de96602c10bb201453301cffe7b07/src/services/ciaContentService.ts#L58)

***

### integrityOptions

> **integrityOptions**: `Record`\<`string`, [`EnhancedCIADetails`](EnhancedCIADetails.md)\>

Defined in: [src/services/ciaContentService.ts:57](https://github.com/Hack23/cia-compliance-manager/blob/aea527f1006de96602c10bb201453301cffe7b07/src/services/ciaContentService.ts#L57)

***

### roiEstimates

> **roiEstimates**: [`ROIEstimatesMap`](ROIEstimatesMap.md)

Defined in: [src/services/ciaContentService.ts:59](https://github.com/Hack23/cia-compliance-manager/blob/aea527f1006de96602c10bb201453301cffe7b07/src/services/ciaContentService.ts#L59)

## Methods

### getDefaultSecurityIcon()

> **getDefaultSecurityIcon**(`level`): `string`

Defined in: [src/services/ciaContentService.ts:62](https://github.com/Hack23/cia-compliance-manager/blob/aea527f1006de96602c10bb201453301cffe7b07/src/services/ciaContentService.ts#L62)

#### Parameters

##### level

[`SecurityLevel`](../type-aliases/SecurityLevel.md)

#### Returns

`string`

***

### getDefaultValuePoints()

> **getDefaultValuePoints**(`level`): `string`[]

Defined in: [src/services/ciaContentService.ts:63](https://github.com/Hack23/cia-compliance-manager/blob/aea527f1006de96602c10bb201453301cffe7b07/src/services/ciaContentService.ts#L63)

#### Parameters

##### level

[`SecurityLevel`](../type-aliases/SecurityLevel.md)

#### Returns

`string`[]
