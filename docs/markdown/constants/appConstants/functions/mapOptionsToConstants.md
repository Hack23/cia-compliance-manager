[**CIA Compliance Manager Documentation v0.8.17**](../../../README.md)

***

[CIA Compliance Manager Documentation](../../../modules.md) / [constants/appConstants](../README.md) / mapOptionsToConstants

# Function: mapOptionsToConstants()

> **mapOptionsToConstants**\<`T`, `R`\>(`options`, `key`, `transform?`): \{ `HIGH`: `undefined`; `LOW`: `undefined`; `MODERATE`: `undefined`; `NONE`: `undefined`; `VERY_HIGH`: `undefined`; \} \| \{ `HIGH`: `R` \| [`CIADetails`](../../../types/interfaces/CIADetails.md)\[`T`\]; `LOW`: `R` \| [`CIADetails`](../../../types/interfaces/CIADetails.md)\[`T`\]; `MODERATE`: `R` \| [`CIADetails`](../../../types/interfaces/CIADetails.md)\[`T`\]; `NONE`: `R` \| [`CIADetails`](../../../types/interfaces/CIADetails.md)\[`T`\]; `VERY_HIGH`: `R` \| [`CIADetails`](../../../types/interfaces/CIADetails.md)\[`T`\]; \}

Defined in: [constants/appConstants.ts:28](https://github.com/Hack23/cia-compliance-manager/blob/6a2219920f4c187f7eafa3e355e36b35c9c19248/src/constants/appConstants.ts#L28)

Maps CIA option values to constants with consistent naming (NONE, LOW, etc.)
Modified version to avoid circular dependencies

## Type Parameters

### T

`T` *extends* keyof [`CIADetails`](../../../types/interfaces/CIADetails.md)

### R

`R` = [`CIADetails`](../../../types/interfaces/CIADetails.md)\[`T`\]

## Parameters

### options

`Record`\<`string`, [`CIADetails`](../../../types/interfaces/CIADetails.md)\>

### key

`T`

### transform?

(`value`, `level`) => `R`

## Returns

\{ `HIGH`: `undefined`; `LOW`: `undefined`; `MODERATE`: `undefined`; `NONE`: `undefined`; `VERY_HIGH`: `undefined`; \} \| \{ `HIGH`: `R` \| [`CIADetails`](../../../types/interfaces/CIADetails.md)\[`T`\]; `LOW`: `R` \| [`CIADetails`](../../../types/interfaces/CIADetails.md)\[`T`\]; `MODERATE`: `R` \| [`CIADetails`](../../../types/interfaces/CIADetails.md)\[`T`\]; `NONE`: `R` \| [`CIADetails`](../../../types/interfaces/CIADetails.md)\[`T`\]; `VERY_HIGH`: `R` \| [`CIADetails`](../../../types/interfaces/CIADetails.md)\[`T`\]; \}
