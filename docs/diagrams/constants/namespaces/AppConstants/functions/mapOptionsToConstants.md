[**CIA Compliance Manager Diagrams v0.7.0**](../../../../README.md)

***

[CIA Compliance Manager Diagrams](../../../../modules.md) / [constants](../../../README.md) / [AppConstants](../README.md) / mapOptionsToConstants

# Function: mapOptionsToConstants()

> **mapOptionsToConstants**\<`T`, `R`\>(`options`, `key`, `transform`?): `object`

Defined in: [constants/appConstants.ts:26](https://github.com/Hack23/cia-compliance-manager/blob/959ad507202d1cb78ada77cec76006b099ceca7d/src/constants/appConstants.ts#L26)

Maps CIA option values to constants with consistent naming (NONE, LOW, etc.)
Modified version to avoid circular dependencies

## Type Parameters

• **T** *extends* keyof [`CIADetails`](../../../../types/cia/interfaces/CIADetails.md)

• **R** = [`CIADetails`](../../../../types/cia/interfaces/CIADetails.md)\[`T`\]

## Parameters

### options

`Record`\<`string`, [`CIADetails`](../../../../types/cia/interfaces/CIADetails.md)\>

### key

`T`

### transform?

(`value`, `level`) => `R`

## Returns

`object`

### HIGH

> **HIGH**: `undefined` \| `R` \| [`CIADetails`](../../../../types/cia/interfaces/CIADetails.md)\[`T`\]

### LOW

> **LOW**: `undefined` \| `R` \| [`CIADetails`](../../../../types/cia/interfaces/CIADetails.md)\[`T`\]

### MODERATE

> **MODERATE**: `undefined` \| `R` \| [`CIADetails`](../../../../types/cia/interfaces/CIADetails.md)\[`T`\]

### NONE

> **NONE**: `undefined` \| `R` \| [`CIADetails`](../../../../types/cia/interfaces/CIADetails.md)\[`T`\]

### VERY\_HIGH

> **VERY\_HIGH**: `undefined` \| `R` \| [`CIADetails`](../../../../types/cia/interfaces/CIADetails.md)\[`T`\]
