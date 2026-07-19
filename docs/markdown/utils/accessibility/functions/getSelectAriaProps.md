[**CIA Compliance Manager — Markdown Documentation v1.1.115**](../../../README.md)

***

[CIA Compliance Manager — Markdown Documentation](../../../modules.md) / [utils/accessibility](../README.md) / getSelectAriaProps

# Function: getSelectAriaProps()

> **getSelectAriaProps**(`label`, `value`, `required?`): `object`

Defined in: [utils/accessibility.ts:297](https://github.com/Hack23/cia-compliance-manager/blob/7ccd437a9a11f08277626ae4f6879b747fb31d1f/src/utils/accessibility.ts#L297)

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
