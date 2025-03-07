[**CIA Compliance Manager API Documentation v0.6.0**](../README.md)

***

[CIA Compliance Manager API Documentation](../globals.md) / mapOptionsToConstants

# Function: mapOptionsToConstants()

> **mapOptionsToConstants**\<`T`, `R`\>(`options`, `key`, `transform`?): `object`

Defined in: [src/constants/appConstants.ts:26](https://github.com/Hack23/cia-compliance-manager/blob/main/src/constants/appConstants.ts#L26)

Maps CIA option values to constants with consistent naming (NONE, LOW, etc.)
Modified version to avoid circular dependencies

## Type Parameters

• **T** *extends* keyof [`CIADetails`](../interfaces/CIADetails.md)

• **R** = [`CIADetails`](../interfaces/CIADetails.md)\[`T`\]

## Parameters

### options

`Record`\<`string`, [`CIADetails`](../interfaces/CIADetails.md)\>

### key

`T`

### transform?

(`value`, `level`) => `R`

## Returns

`object`

### HIGH

> **HIGH**: `undefined` \| `R` \| [`CIADetails`](../interfaces/CIADetails.md)\[`T`\]

### LOW

> **LOW**: `undefined` \| `R` \| [`CIADetails`](../interfaces/CIADetails.md)\[`T`\]

### MODERATE

> **MODERATE**: `undefined` \| `R` \| [`CIADetails`](../interfaces/CIADetails.md)\[`T`\]

### NONE

> **NONE**: `undefined` \| `R` \| [`CIADetails`](../interfaces/CIADetails.md)\[`T`\]

### VERY\_HIGH

> **VERY\_HIGH**: `undefined` \| `R` \| [`CIADetails`](../interfaces/CIADetails.md)\[`T`\]
