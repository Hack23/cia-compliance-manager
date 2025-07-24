[**CIA Compliance Manager Documentation v0.8.20**](../../../README.md)

***

[CIA Compliance Manager Documentation](../../../modules.md) / [utils/typeGuards](../README.md) / getSecurityLevelOption

# Function: getSecurityLevelOption()

> **getSecurityLevelOption**\<`T`\>(`options`, `key`): `undefined` \| `T`

Defined in: [utils/typeGuards.ts:163](https://github.com/Hack23/cia-compliance-manager/blob/9180e2700dca841f6711d7243c036db4de73db57/src/utils/typeGuards.ts#L163)

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
