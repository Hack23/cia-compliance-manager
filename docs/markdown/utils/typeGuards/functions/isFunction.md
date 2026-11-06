[**CIA Compliance Manager — Markdown Documentation v1.1.170**](../../../README.md)

***

[CIA Compliance Manager — Markdown Documentation](../../../modules.md) / [utils/typeGuards](../README.md) / isFunction

# Function: isFunction()

> **isFunction**(`value`): `value is Function`

Defined in: [utils/typeGuards.ts:834](https://github.com/Hack23/cia-compliance-manager/blob/276996e15a71466c7b9b1aed3e1a103db89356a5/src/utils/typeGuards.ts#L834)

Type guard to check if a value is a function.
Note: `typeof` returns "function" for both callables and class constructors,
so the `Function` type is the correct predicate here.

## Parameters

### value

`unknown`

Value to check

## Returns

`value is Function`

True if the value is a function
