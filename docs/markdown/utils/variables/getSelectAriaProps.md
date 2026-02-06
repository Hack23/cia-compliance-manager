[**CIA Compliance Manager Documentation v1.1.16**](../../README.md)

***

[CIA Compliance Manager Documentation](../../modules.md) / [utils](../README.md) / getSelectAriaProps

# Variable: getSelectAriaProps()

> **getSelectAriaProps**: (`label`, `value`, `required`) => `object`

Defined in: [utils/index.ts:42](https://github.com/Hack23/cia-compliance-manager/blob/08d981d9d23db94df1debc77186c22027f4d896e/src/utils/index.ts#L42)

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
