[**CIA Compliance Manager Diagrams v0.8.0**](../../../README.md)

***

[CIA Compliance Manager Diagrams](../../../modules.md) / [constants/appConstants](../README.md) / mapOptionsToConstants

# Function: mapOptionsToConstants()

> **mapOptionsToConstants**\<`T`, `R`\>(`options`, `key`, `transform`?): \{ `HIGH`: `undefined`; `LOW`: `undefined`; `MODERATE`: `undefined`; `NONE`: `undefined`; `VERY_HIGH`: `undefined`; \} \| \{ `HIGH`: `R` \| [`CIADetails`](../../../types/cia/interfaces/CIADetails.md)\[`T`\]; `LOW`: `R` \| [`CIADetails`](../../../types/cia/interfaces/CIADetails.md)\[`T`\]; `MODERATE`: `R` \| [`CIADetails`](../../../types/cia/interfaces/CIADetails.md)\[`T`\]; `NONE`: `R` \| [`CIADetails`](../../../types/cia/interfaces/CIADetails.md)\[`T`\]; `VERY_HIGH`: `R` \| [`CIADetails`](../../../types/cia/interfaces/CIADetails.md)\[`T`\]; \}

Defined in: [src/constants/appConstants.ts:26](https://github.com/Hack23/cia-compliance-manager/blob/ab84d120f6a49e6faf7bc7924811e0da9b635211/src/constants/appConstants.ts#L26)

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

\{ `HIGH`: `undefined`; `LOW`: `undefined`; `MODERATE`: `undefined`; `NONE`: `undefined`; `VERY_HIGH`: `undefined`; \} \| \{ `HIGH`: `R` \| [`CIADetails`](../../../types/cia/interfaces/CIADetails.md)\[`T`\]; `LOW`: `R` \| [`CIADetails`](../../../types/cia/interfaces/CIADetails.md)\[`T`\]; `MODERATE`: `R` \| [`CIADetails`](../../../types/cia/interfaces/CIADetails.md)\[`T`\]; `NONE`: `R` \| [`CIADetails`](../../../types/cia/interfaces/CIADetails.md)\[`T`\]; `VERY_HIGH`: `R` \| [`CIADetails`](../../../types/cia/interfaces/CIADetails.md)\[`T`\]; \}
