[**CIA Compliance Manager API Documentation v0.6.0**](../README.md)

***

[CIA Compliance Manager API Documentation](../globals.md) / ensureArray

# Function: ensureArray()

> **ensureArray**\<`T`\>(`value`): `T`[]

Defined in: [src/utils/typeGuards.ts:63](https://github.com/Hack23/cia-compliance-manager/blob/main/src/utils/typeGuards.ts#L63)

Ensures the value is an array. If it's already an array, returns it.
If it's null or undefined, returns an empty array. Otherwise wraps it in an array.

## Type Parameters

• **T**

## Parameters

### value

The value to ensure is an array

`undefined` | `null` | `T` | `T`[]

## Returns

`T`[]

An array
