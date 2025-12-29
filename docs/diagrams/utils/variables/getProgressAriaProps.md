[**CIA Compliance Manager Diagrams v1.1.3**](../../README.md)

***

[CIA Compliance Manager Diagrams](../../modules.md) / [utils](../README.md) / getProgressAriaProps

# Variable: getProgressAriaProps()

> **getProgressAriaProps**: (`label`, `valuenow`, `valuemin`, `valuemax`, `valuetext?`) => `object`

Defined in: [utils/index.ts:43](https://github.com/Hack23/cia-compliance-manager/blob/3cff826a4aee0338a550571cbd8e427564a36426/src/utils/index.ts#L43)

Generate ARIA props for a progress bar or meter

## Parameters

### label

`string`

Progress bar label

### valuenow

`number`

Current value

### valuemin

`number` = `0`

Minimum value

### valuemax

`number` = `100`

Maximum value

### valuetext?

`string`

Textual representation of value

## Returns

`object`

ARIA props object

### aria-label

> **aria-label**: `string`

### aria-valuemax

> **aria-valuemax**: `number`

### aria-valuemin

> **aria-valuemin**: `number`

### aria-valuenow

> **aria-valuenow**: `number`

### aria-valuetext?

> `optional` **aria-valuetext**: `string`

### role

> **role**: `string`
