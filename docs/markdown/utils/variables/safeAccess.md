[**CIA Compliance Manager Documentation v0.8.15**](../../README.md)

***

[CIA Compliance Manager Documentation](../../modules.md) / [utils](../README.md) / safeAccess

# Variable: safeAccess()

> **safeAccess**: \<`T`\>(`obj`, `path`, `defaultValue?`) => `T`

Defined in: [utils/index.ts:193](https://github.com/Hack23/cia-compliance-manager/blob/50a3bb1fa64948444e36c06fee075b5043350db0/src/utils/index.ts#L193)

Safely access a nested property in an object using a dot notation path

## Type Parameters

### T

`T` = `any`

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
