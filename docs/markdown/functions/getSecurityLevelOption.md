[**CIA Compliance Manager Documentation v0.8.2**](../README.md)

***

[CIA Compliance Manager Documentation](../globals.md) / getSecurityLevelOption

# Function: getSecurityLevelOption()

> **getSecurityLevelOption**\<`T`\>(`options`, `key`): `undefined` \| `T`

Defined in: [src/utils/typeGuards.ts:163](https://github.com/Hack23/cia-compliance-manager/blob/423c5d261c747ade8ca2550e176aa05168b5a31e/src/utils/typeGuards.ts#L163)

Helper function to safely access CIA options with string keys

## Type Parameters

• **T**

## Parameters

### options

`Record`\<[`SecurityLevel`](../type-aliases/SecurityLevel.md), `T`\>

The options object to access

### key

The string key that should be treated as SecurityLevel

`undefined` | `string`

## Returns

`undefined` \| `T`

The option value or undefined if not found
