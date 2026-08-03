[**CIA Compliance Manager — UML Diagrams v1.1.126**](../../../README.md)

***

[CIA Compliance Manager — UML Diagrams](../../../modules.md) / [utils/typeGuards](../README.md) / getSecurityLevelOption

# Function: getSecurityLevelOption()

> **getSecurityLevelOption**\<`T`\>(`options`, `key`): `T` \| `undefined`

Defined in: [utils/typeGuards.ts:219](https://github.com/Hack23/cia-compliance-manager/blob/9ccbd7f17a2eef277e3bb28ec127ec9fa27be180/src/utils/typeGuards.ts#L219)

Helper function to safely access CIA options with string keys

## Type Parameters

### T

`T`

## Parameters

### options

`Record`\<[`SecurityLevel`](../../../types/cia/type-aliases/SecurityLevel.md), `T`\>

The options object to access

### key

`string` \| `undefined`

The string key that should be treated as SecurityLevel

## Returns

`T` \| `undefined`

The option value or undefined if not found
