[**CIA Compliance Manager — Markdown Documentation v1.1.121**](../../../README.md)

***

[CIA Compliance Manager — Markdown Documentation](../../../modules.md) / [utils/typeGuards](../README.md) / hasMethod

# Function: hasMethod()

> **hasMethod**\<`T`, `K`\>(`obj`, `methodName`): `obj is T & Record<K, (args: unknown[]) => unknown>`

Defined in: [utils/typeGuards.ts:956](https://github.com/Hack23/cia-compliance-manager/blob/5fee1bc4aabc01ca6dd59fb34a80389334401588/src/utils/typeGuards.ts#L956)

Type guard to check if an object has a specific method

## Type Parameters

### T

`T` *extends* `object`

### K

`K` *extends* `PropertyKey`

## Parameters

### obj

`T` \| `null` \| `undefined`

The object to check

### methodName

`K`

The method name to check for

## Returns

`obj is T & Record<K, (args: unknown[]) => unknown>`

True if the object has the method as a function
