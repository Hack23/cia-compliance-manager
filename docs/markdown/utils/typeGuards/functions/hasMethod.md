[**CIA Compliance Manager Documentation v1.0.5**](../../../README.md)

***

[CIA Compliance Manager Documentation](../../../modules.md) / [utils/typeGuards](../README.md) / hasMethod

# Function: hasMethod()

> **hasMethod**\<`T`, `K`\>(`obj`, `methodName`): `obj is T & Record<K, (args: unknown[]) => unknown>`

Defined in: [utils/typeGuards.ts:924](https://github.com/Hack23/cia-compliance-manager/blob/c49a34536cfcfd69c910d0edcabcf96845464e51/src/utils/typeGuards.ts#L924)

Type guard to check if an object has a specific method

## Type Parameters

### T

`T` *extends* `object`

### K

`K` *extends* `PropertyKey`

## Parameters

### obj

The object to check

`T` | `null` | `undefined`

### methodName

`K`

The method name to check for

## Returns

`obj is T & Record<K, (args: unknown[]) => unknown>`

True if the object has the method as a function
