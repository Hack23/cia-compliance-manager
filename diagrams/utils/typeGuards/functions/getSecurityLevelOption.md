[**CIA Compliance Manager Diagrams v0.8.0**](../../../README.md)

***

[CIA Compliance Manager Diagrams](../../../modules.md) / [utils/typeGuards](../README.md) / getSecurityLevelOption

# Function: getSecurityLevelOption()

> **getSecurityLevelOption**\<`T`\>(`options`, `key`): `undefined` \| `T`

Defined in: [src/utils/typeGuards.ts:163](https://github.com/Hack23/cia-compliance-manager/blob/ab84d120f6a49e6faf7bc7924811e0da9b635211/src/utils/typeGuards.ts#L163)

Helper function to safely access CIA options with string keys

## Type Parameters

• **T**

## Parameters

### options

`Record`\<[`SecurityLevel`](../../../types/cia/type-aliases/SecurityLevel.md), `T`\>

The options object to access

### key

The string key that should be treated as SecurityLevel

`undefined` | `string`

## Returns

`undefined` \| `T`

The option value or undefined if not found
