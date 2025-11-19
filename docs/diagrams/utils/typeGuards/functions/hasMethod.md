[**CIA Compliance Manager Diagrams v0.9.0**](../../../README.md)

***

[CIA Compliance Manager Diagrams](../../../modules.md) / [utils/typeGuards](../README.md) / hasMethod

# Function: hasMethod()

> **hasMethod**\<`T`, `K`\>(`obj`, `methodName`): `obj is T & Record<K, (args: unknown[]) => unknown>`

Defined in: [utils/typeGuards.ts:924](https://github.com/Hack23/cia-compliance-manager/blob/bc57971ed3748ecb634c027ecf03cc2853174aaa/src/utils/typeGuards.ts#L924)

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
