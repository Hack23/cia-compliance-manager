[**CIA Compliance Manager Diagrams v0.8.0**](../../../README.md)

***

[CIA Compliance Manager Diagrams](../../../modules.md) / [services/ciaContentService](../README.md) / getRecommendations

# Function: getRecommendations()

> **getRecommendations**(`component`, `level`): `string`[]

Defined in: [src/services/ciaContentService.ts:1377](https://github.com/Hack23/cia-compliance-manager/blob/78912779fad2796d4afcf9e0a863cca80a66b25f/src/services/ciaContentService.ts#L1377)

Get recommendations for a specific component and level
Always returns a string array, even when no recommendations are found

## Parameters

### component

[`CIAComponentType`](../../../types/cia-services/type-aliases/CIAComponentType.md)

### level

[`SecurityLevel`](../../../types/cia/type-aliases/SecurityLevel.md)

## Returns

`string`[]
