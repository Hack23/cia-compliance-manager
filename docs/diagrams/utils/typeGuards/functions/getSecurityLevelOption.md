[**CIA Compliance Manager Diagrams v0.8.23**](../../../README.md)

***

[CIA Compliance Manager Diagrams](../../../modules.md) / [utils/typeGuards](../README.md) / getSecurityLevelOption

# Function: getSecurityLevelOption()

> **getSecurityLevelOption**\<`T`\>(`options`, `key`): `undefined` \| `T`

Defined in: [utils/typeGuards.ts:163](https://github.com/Hack23/cia-compliance-manager/blob/55488ba3ac0003e4435eb3634b6ab6e9b8b05a9b/src/utils/typeGuards.ts#L163)

Helper function to safely access CIA options with string keys

## Type Parameters

### T

`T`

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
