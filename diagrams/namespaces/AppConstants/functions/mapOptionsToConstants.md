[**CIA Compliance Manager Diagrams v0.7.0**](../../../README.md)

***

[CIA Compliance Manager Diagrams](../../../globals.md) / [AppConstants](../README.md) / mapOptionsToConstants

# Function: mapOptionsToConstants()

> **mapOptionsToConstants**\<`T`, `R`\>(`options`, `key`, `transform`?): `object`

Defined in: [constants/appConstants.ts:26](https://github.com/Hack23/cia-compliance-manager/blob/a49474b1f59fd372b1bbc77b918221c4932a9f00/src/constants/appConstants.ts#L26)

Maps CIA option values to constants with consistent naming (NONE, LOW, etc.)
Modified version to avoid circular dependencies

## Type Parameters

• **T** *extends* keyof `CIADetails`

• **R** = `CIADetails`\[`T`\]

## Parameters

### options

`Record`\<`string`, `CIADetails`\>

### key

`T`

### transform?

(`value`, `level`) => `R`

## Returns

`object`

### HIGH

> **HIGH**: `undefined` \| `R` \| `CIADetails`\[`T`\]

### LOW

> **LOW**: `undefined` \| `R` \| `CIADetails`\[`T`\]

### MODERATE

> **MODERATE**: `undefined` \| `R` \| `CIADetails`\[`T`\]

### NONE

> **NONE**: `undefined` \| `R` \| `CIADetails`\[`T`\]

### VERY\_HIGH

> **VERY\_HIGH**: `undefined` \| `R` \| `CIADetails`\[`T`\]
