[**CIA Compliance Manager — UML Diagrams v1.1.138**](../../README.md)

***

[CIA Compliance Manager — UML Diagrams](../../modules.md) / [utils](../README.md) / getSelectAriaProps

# Variable: getSelectAriaProps

> **getSelectAriaProps**: (`label`, `value`, `required`) => `object`

Defined in: [utils/index.ts:36](https://github.com/Hack23/cia-compliance-manager/blob/daf6e30357f2f03bad3af17a53802a86917ac171/src/utils/index.ts#L36)

Generate ARIA props for a select/dropdown component

## Parameters

### label

`string`

Select label

### value

`string`

Current value

### required?

`boolean` = `false`

Whether selection is required

## Returns

`object`

ARIA props object

### aria-label

> **aria-label**: `string`

### aria-required?

> `optional` **aria-required?**: `boolean`

### aria-describedby?

> `optional` **aria-describedby?**: `string`
