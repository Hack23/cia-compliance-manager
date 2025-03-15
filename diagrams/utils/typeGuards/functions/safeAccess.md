[**CIA Compliance Manager Diagrams v0.8.0**](../../../README.md)

***

[CIA Compliance Manager Diagrams](../../../modules.md) / [utils/typeGuards](../README.md) / safeAccess

# Function: safeAccess()

> **safeAccess**\<`T`\>(`obj`, `path`, `defaultValue`?): `T`

Defined in: [src/utils/typeGuards.ts:107](https://github.com/Hack23/cia-compliance-manager/blob/9d71808d079d754f4b85858b6e4ea1bff990b076/src/utils/typeGuards.ts#L107)

Safely access a nested property in an object using a dot notation path

## Type Parameters

• **T** = `any`

## Parameters

### obj

`any`

The object to access

### path

The path to the property, e.g. 'a.b.c' or 'a[0].b.c'

`string` | (`string` \| `number`)[]

### defaultValue?

`T`

The default value to return if the property doesn't exist

## Returns

`T`

The value at the path or the default value
