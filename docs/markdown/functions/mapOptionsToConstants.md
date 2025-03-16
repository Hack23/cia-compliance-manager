[**CIA Compliance Manager Documentation v0.8.4**](../README.md)

***

[CIA Compliance Manager Documentation](../globals.md) / mapOptionsToConstants

# Function: mapOptionsToConstants()

> **mapOptionsToConstants**\<`T`, `R`\>(`options`, `key`, `transform`?): \{ `HIGH`: `undefined`; `LOW`: `undefined`; `MODERATE`: `undefined`; `NONE`: `undefined`; `VERY_HIGH`: `undefined`; \} \| \{ `HIGH`: `R` \| [`CIADetails`](../interfaces/CIADetails.md)\[`T`\]; `LOW`: `R` \| [`CIADetails`](../interfaces/CIADetails.md)\[`T`\]; `MODERATE`: `R` \| [`CIADetails`](../interfaces/CIADetails.md)\[`T`\]; `NONE`: `R` \| [`CIADetails`](../interfaces/CIADetails.md)\[`T`\]; `VERY_HIGH`: `R` \| [`CIADetails`](../interfaces/CIADetails.md)\[`T`\]; \}

Defined in: [src/constants/appConstants.ts:26](https://github.com/Hack23/cia-compliance-manager/blob/a6d8d6a2cab2160940b9a047208c12088d7e02cf/src/constants/appConstants.ts#L26)

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

\{ `HIGH`: `undefined`; `LOW`: `undefined`; `MODERATE`: `undefined`; `NONE`: `undefined`; `VERY_HIGH`: `undefined`; \} \| \{ `HIGH`: `R` \| [`CIADetails`](../interfaces/CIADetails.md)\[`T`\]; `LOW`: `R` \| [`CIADetails`](../interfaces/CIADetails.md)\[`T`\]; `MODERATE`: `R` \| [`CIADetails`](../interfaces/CIADetails.md)\[`T`\]; `NONE`: `R` \| [`CIADetails`](../interfaces/CIADetails.md)\[`T`\]; `VERY_HIGH`: `R` \| [`CIADetails`](../interfaces/CIADetails.md)\[`T`\]; \}
