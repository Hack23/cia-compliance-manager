[**CIA Compliance Manager Documentation v1.1.14**](../../../README.md)

***

[CIA Compliance Manager Documentation](../../../modules.md) / [utils/typeGuards](../README.md) / getSecurityLevelOption

# Function: getSecurityLevelOption()

> **getSecurityLevelOption**\<`T`\>(`options`, `key`): `T` \| `undefined`

Defined in: [utils/typeGuards.ts:216](https://github.com/Hack23/cia-compliance-manager/blob/2572cfa2ede06cc7942019b0f742928ad9d5ceb3/src/utils/typeGuards.ts#L216)

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

`string` | `undefined`

## Returns

`T` \| `undefined`

The option value or undefined if not found
