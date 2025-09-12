[**CIA Compliance Manager Documentation v0.8.27**](../../../README.md)

***

[CIA Compliance Manager Documentation](../../../modules.md) / [utils/typeGuards](../README.md) / safeAccess

# Function: safeAccess()

> **safeAccess**\<`T`\>(`obj`, `path`, `defaultValue?`): `T`

Defined in: [utils/typeGuards.ts:107](https://github.com/Hack23/cia-compliance-manager/blob/26bb73ca86d23be8656cdd29d12202323a449310/src/utils/typeGuards.ts#L107)

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
