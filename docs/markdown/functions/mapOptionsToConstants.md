[**CIA Compliance Manager Documentation v0.8.5**](../README.md)

***

[CIA Compliance Manager Documentation](../globals.md) / mapOptionsToConstants

# Function: mapOptionsToConstants()

> **mapOptionsToConstants**\<`T`, `R`\>(`options`, `key`, `transform`?): \{ `HIGH`: `undefined`; `LOW`: `undefined`; `MODERATE`: `undefined`; `NONE`: `undefined`; `VERY_HIGH`: `undefined`; \} \| \{ `HIGH`: `R` \| [`CIADetails`](../interfaces/CIADetails.md)\[`T`\]; `LOW`: `R` \| [`CIADetails`](../interfaces/CIADetails.md)\[`T`\]; `MODERATE`: `R` \| [`CIADetails`](../interfaces/CIADetails.md)\[`T`\]; `NONE`: `R` \| [`CIADetails`](../interfaces/CIADetails.md)\[`T`\]; `VERY_HIGH`: `R` \| [`CIADetails`](../interfaces/CIADetails.md)\[`T`\]; \}

Defined in: [src/constants/appConstants.ts:26](https://github.com/Hack23/cia-compliance-manager/blob/eca22610f41e5f6b6c0cece88769b1ffbe9db4bd/src/constants/appConstants.ts#L26)

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
