[**CIA Compliance Manager Diagrams v1.1.2**](../../README.md)

***

[CIA Compliance Manager Diagrams](../../modules.md) / [utils](../README.md) / getSelectAriaProps

# Variable: getSelectAriaProps()

> **getSelectAriaProps**: (`label`, `value`, `required`) => `object`

Defined in: [utils/index.ts:42](https://github.com/Hack23/cia-compliance-manager/blob/9c3f9c0212e00ca1f7e7e22ddf0d1c98efb3e2be/src/utils/index.ts#L42)

Generate ARIA props for a select/dropdown component

## Parameters

### label

`string`

Select label

### value

`string`

Current value

### required

`boolean` = `false`

Whether selection is required

## Returns

`object`

ARIA props object

### aria-describedby?

> `optional` **aria-describedby**: `string`

### aria-label

> **aria-label**: `string`

### aria-required?

> `optional` **aria-required**: `boolean`
