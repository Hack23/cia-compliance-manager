[**CIA Compliance Manager API Documentation v0.7.0**](../README.md)

***

[CIA Compliance Manager API Documentation](../globals.md) / getSecurityLevelOption

# Function: getSecurityLevelOption()

> **getSecurityLevelOption**\<`T`\>(`options`, `key`): `undefined` \| `T`

Defined in: [src/utils/typeGuards.ts:149](https://github.com/Hack23/cia-compliance-manager/blob/main/src/utils/typeGuards.ts#L149)

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
