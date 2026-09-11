[**CIA Compliance Manager — UML Diagrams v1.1.146**](../../../README.md)

***

[CIA Compliance Manager — UML Diagrams](../../../modules.md) / [constants/appConstants](../README.md) / mapOptionsToConstants

# Function: mapOptionsToConstants()

> **mapOptionsToConstants**\<`T`, `R`\>(`options`, `key`, `transform?`): \{ `NONE`: `undefined`; `LOW`: `undefined`; `MODERATE`: `undefined`; `HIGH`: `undefined`; `VERY_HIGH`: `undefined`; \} \| \{ `NONE`: `R` \| [`CIADetails`](../../../types/cia-services/interfaces/CIADetails.md)\[`T`\]; `LOW`: `R` \| [`CIADetails`](../../../types/cia-services/interfaces/CIADetails.md)\[`T`\]; `MODERATE`: `R` \| [`CIADetails`](../../../types/cia-services/interfaces/CIADetails.md)\[`T`\]; `HIGH`: `R` \| [`CIADetails`](../../../types/cia-services/interfaces/CIADetails.md)\[`T`\]; `VERY_HIGH`: `R` \| [`CIADetails`](../../../types/cia-services/interfaces/CIADetails.md)\[`T`\]; \}

Defined in: [constants/appConstants.ts:23](https://github.com/Hack23/cia-compliance-manager/blob/1ad940e5aedd08b10a800e582746541da5c51dd4/src/constants/appConstants.ts#L23)

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
