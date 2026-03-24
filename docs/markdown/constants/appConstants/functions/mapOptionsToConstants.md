[**CIA Compliance Manager — Markdown Documentation v1.1.34**](../../../README.md)

***

[CIA Compliance Manager — Markdown Documentation](../../../modules.md) / [constants/appConstants](../README.md) / mapOptionsToConstants

# Function: mapOptionsToConstants()

> **mapOptionsToConstants**\<`T`, `R`\>(`options`, `key`, `transform?`): \{ `NONE`: `undefined`; `LOW`: `undefined`; `MODERATE`: `undefined`; `HIGH`: `undefined`; `VERY_HIGH`: `undefined`; \} \| \{ `NONE`: `R` \| [`CIADetails`](../../../types/cia-services/interfaces/CIADetails.md)\[`T`\]; `LOW`: `R` \| [`CIADetails`](../../../types/cia-services/interfaces/CIADetails.md)\[`T`\]; `MODERATE`: `R` \| [`CIADetails`](../../../types/cia-services/interfaces/CIADetails.md)\[`T`\]; `HIGH`: `R` \| [`CIADetails`](../../../types/cia-services/interfaces/CIADetails.md)\[`T`\]; `VERY_HIGH`: `R` \| [`CIADetails`](../../../types/cia-services/interfaces/CIADetails.md)\[`T`\]; \}

Defined in: [constants/appConstants.ts:28](https://github.com/Hack23/cia-compliance-manager/blob/bf8189075bc86cb5a8999dce70d7c9c39852b616/src/constants/appConstants.ts#L28)

Maps CIA option values to constants with consistent naming (NONE, LOW, etc.)
Modified version to avoid circular dependencies

## Type Parameters

### T

`T` *extends* keyof [`CIADetails`](../../../types/cia-services/interfaces/CIADetails.md)

### R

`R` = [`CIADetails`](../../../types/cia-services/interfaces/CIADetails.md)\[`T`\]

## Parameters

### options

`Record`\<`string`, [`CIADetails`](../../../types/cia-services/interfaces/CIADetails.md)\>

### key

`T`

### transform?

(`value`, `level`) => `R`

## Returns

\{ `NONE`: `undefined`; `LOW`: `undefined`; `MODERATE`: `undefined`; `HIGH`: `undefined`; `VERY_HIGH`: `undefined`; \} \| \{ `NONE`: `R` \| [`CIADetails`](../../../types/cia-services/interfaces/CIADetails.md)\[`T`\]; `LOW`: `R` \| [`CIADetails`](../../../types/cia-services/interfaces/CIADetails.md)\[`T`\]; `MODERATE`: `R` \| [`CIADetails`](../../../types/cia-services/interfaces/CIADetails.md)\[`T`\]; `HIGH`: `R` \| [`CIADetails`](../../../types/cia-services/interfaces/CIADetails.md)\[`T`\]; `VERY_HIGH`: `R` \| [`CIADetails`](../../../types/cia-services/interfaces/CIADetails.md)\[`T`\]; \}
