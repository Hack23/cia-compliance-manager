[**CIA Compliance Manager Diagrams v0.8.0**](../../../README.md)

***

[CIA Compliance Manager Diagrams](../../../modules.md) / [services/ciaContentService](../README.md) / CIADataProvider

# Interface: CIADataProvider

Defined in: [src/services/ciaContentService.ts:55](https://github.com/Hack23/cia-compliance-manager/blob/9d71808d079d754f4b85858b6e4ea1bff990b076/src/services/ciaContentService.ts#L55)

Interface for CIA data source provider

## Properties

### availabilityOptions

> **availabilityOptions**: `Record`\<`string`, [`EnhancedCIADetails`](../../../hooks/useCIAOptions/interfaces/EnhancedCIADetails.md)\>

Defined in: [src/services/ciaContentService.ts:56](https://github.com/Hack23/cia-compliance-manager/blob/9d71808d079d754f4b85858b6e4ea1bff990b076/src/services/ciaContentService.ts#L56)

***

### confidentialityOptions

> **confidentialityOptions**: `Record`\<`string`, [`EnhancedCIADetails`](../../../hooks/useCIAOptions/interfaces/EnhancedCIADetails.md)\>

Defined in: [src/services/ciaContentService.ts:58](https://github.com/Hack23/cia-compliance-manager/blob/9d71808d079d754f4b85858b6e4ea1bff990b076/src/services/ciaContentService.ts#L58)

***

### integrityOptions

> **integrityOptions**: `Record`\<`string`, [`EnhancedCIADetails`](../../../hooks/useCIAOptions/interfaces/EnhancedCIADetails.md)\>

Defined in: [src/services/ciaContentService.ts:57](https://github.com/Hack23/cia-compliance-manager/blob/9d71808d079d754f4b85858b6e4ea1bff990b076/src/services/ciaContentService.ts#L57)

***

### roiEstimates

> **roiEstimates**: [`ROIEstimatesMap`](../../../types/cia-services/interfaces/ROIEstimatesMap.md)

Defined in: [src/services/ciaContentService.ts:59](https://github.com/Hack23/cia-compliance-manager/blob/9d71808d079d754f4b85858b6e4ea1bff990b076/src/services/ciaContentService.ts#L59)

## Methods

### getDefaultSecurityIcon()

> **getDefaultSecurityIcon**(`level`): `string`

Defined in: [src/services/ciaContentService.ts:62](https://github.com/Hack23/cia-compliance-manager/blob/9d71808d079d754f4b85858b6e4ea1bff990b076/src/services/ciaContentService.ts#L62)

#### Parameters

##### level

[`SecurityLevel`](../../../types/cia/type-aliases/SecurityLevel.md)

#### Returns

`string`

***

### getDefaultValuePoints()

> **getDefaultValuePoints**(`level`): `string`[]

Defined in: [src/services/ciaContentService.ts:63](https://github.com/Hack23/cia-compliance-manager/blob/9d71808d079d754f4b85858b6e4ea1bff990b076/src/services/ciaContentService.ts#L63)

#### Parameters

##### level

[`SecurityLevel`](../../../types/cia/type-aliases/SecurityLevel.md)

#### Returns

`string`[]
