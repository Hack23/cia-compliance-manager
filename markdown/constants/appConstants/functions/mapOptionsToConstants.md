[**CIA Compliance Manager API Documentation v0.6.0**](../../../README.md)

***

[CIA Compliance Manager API Documentation](../../../modules.md) / [constants/appConstants](../README.md) / mapOptionsToConstants

# Function: mapOptionsToConstants()

> **mapOptionsToConstants**\<`T`, `R`\>(`options`, `key`, `transform`?): `object`

Defined in: [src/constants/appConstants.ts:26](https://github.com/Hack23/cia-compliance-manager/blob/ca083b463223765b22422b66b3a43930241849bd/src/constants/appConstants.ts#L26)

Maps CIA option values to constants with consistent naming (NONE, LOW, etc.)
Modified version to avoid circular dependencies

## Type Parameters

• **T** *extends* keyof [`CIADetails`](../../../types/cia/interfaces/CIADetails.md)

• **R** = [`CIADetails`](../../../types/cia/interfaces/CIADetails.md)\[`T`\]

## Parameters

### options

`Record`\<`string`, [`CIADetails`](../../../types/cia/interfaces/CIADetails.md)\>

### key

`T`

### transform?

(`value`, `level`) => `R`

## Returns

`object`

### HIGH

> **HIGH**: `undefined` \| `R` \| [`CIADetails`](../../../types/cia/interfaces/CIADetails.md)\[`T`\]

### LOW

> **LOW**: `undefined` \| `R` \| [`CIADetails`](../../../types/cia/interfaces/CIADetails.md)\[`T`\]

### MODERATE

> **MODERATE**: `undefined` \| `R` \| [`CIADetails`](../../../types/cia/interfaces/CIADetails.md)\[`T`\]

### NONE

> **NONE**: `undefined` \| `R` \| [`CIADetails`](../../../types/cia/interfaces/CIADetails.md)\[`T`\]

### VERY\_HIGH

> **VERY\_HIGH**: `undefined` \| `R` \| [`CIADetails`](../../../types/cia/interfaces/CIADetails.md)\[`T`\]
