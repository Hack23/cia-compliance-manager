[**CIA Compliance Manager Diagrams v0.8.38**](../../../README.md)

***

[CIA Compliance Manager Diagrams](../../../modules.md) / [utils/typeGuards](../README.md) / getSecurityLevelOption

# Function: getSecurityLevelOption()

> **getSecurityLevelOption**\<`T`\>(`options`, `key`): `T` \| `undefined`

Defined in: [utils/typeGuards.ts:163](https://github.com/Hack23/cia-compliance-manager/blob/aedb85c440cd82a5c63a8b131e99fe72da8b07ec/src/utils/typeGuards.ts#L163)

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
