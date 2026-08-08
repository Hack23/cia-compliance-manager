[**CIA Compliance Manager — Markdown Documentation v1.1.129**](../../README.md)

***

[CIA Compliance Manager — Markdown Documentation](../../modules.md) / [utils](../README.md) / getProgressAriaProps

# Variable: getProgressAriaProps

> **getProgressAriaProps**: (`label`, `valuenow`, `valuemin`, `valuemax`, `valuetext?`) => `object`

Defined in: [utils/index.ts:37](https://github.com/Hack23/cia-compliance-manager/blob/caa20908239c393ad6ffb27f9a5d3b0eb037294e/src/utils/index.ts#L37)

Generate ARIA props for a progress bar or meter

## Parameters

### label

`string`

Progress bar label

### valuenow

`number`

Current value

### valuemin?

`number` = `0`

Minimum value

### valuemax?

`number` = `100`

Maximum value

### valuetext?

`string`

Textual representation of value

## Returns

`object`

ARIA props object

### role

> **role**: `string`

### aria-label

> **aria-label**: `string`

### aria-valuenow

> **aria-valuenow**: `number`

### aria-valuemin

> **aria-valuemin**: `number`

### aria-valuemax

> **aria-valuemax**: `number`

### aria-valuetext?

> `optional` **aria-valuetext?**: `string`
