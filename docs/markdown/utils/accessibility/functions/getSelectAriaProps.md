[**CIA Compliance Manager — Markdown Documentation v1.1.168**](../../../README.md)

***

[CIA Compliance Manager — Markdown Documentation](../../../modules.md) / [utils/accessibility](../README.md) / getSelectAriaProps

# Function: getSelectAriaProps()

> **getSelectAriaProps**(`label`, `value`, `required?`): `object`

Defined in: [utils/accessibility.ts:297](https://github.com/Hack23/cia-compliance-manager/blob/820d7a4fb23f28f59c88e35c49e2e30ecd03cd0d/src/utils/accessibility.ts#L297)

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
