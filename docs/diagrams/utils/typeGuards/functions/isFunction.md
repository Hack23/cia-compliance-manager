[**CIA Compliance Manager — UML Diagrams v1.1.125**](../../../README.md)

***

[CIA Compliance Manager — UML Diagrams](../../../modules.md) / [utils/typeGuards](../README.md) / isFunction

# Function: isFunction()

> **isFunction**(`value`): `value is Function`

Defined in: [utils/typeGuards.ts:834](https://github.com/Hack23/cia-compliance-manager/blob/d9b35b5e30691338e6477d6720a70864ae43ae9b/src/utils/typeGuards.ts#L834)

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
