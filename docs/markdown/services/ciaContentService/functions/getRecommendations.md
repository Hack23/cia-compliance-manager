[**CIA Compliance Manager API Documentation v0.7.0**](../../../README.md)

***

[CIA Compliance Manager API Documentation](../../../modules.md) / [services/ciaContentService](../README.md) / getRecommendations

# Function: getRecommendations()

> **getRecommendations**(`component`, `level`): `string`[]

Defined in: [src/services/ciaContentService.ts:1376](https://github.com/Hack23/cia-compliance-manager/blob/a904e43458f81faf7066f9da9fc149cc9f6e236d/src/services/ciaContentService.ts#L1376)

Get recommendations for a specific component and level
Always returns a string array, even when no recommendations are found

## Parameters

### component

[`CIAComponentType`](../../../types/cia-services/type-aliases/CIAComponentType.md)

### level

[`SecurityLevel`](../../../types/cia/type-aliases/SecurityLevel.md)

## Returns

`string`[]
