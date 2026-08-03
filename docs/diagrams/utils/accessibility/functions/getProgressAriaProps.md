[**CIA Compliance Manager — UML Diagrams v1.1.126**](../../../README.md)

***

[CIA Compliance Manager — UML Diagrams](../../../modules.md) / [utils/accessibility](../README.md) / getProgressAriaProps

# Function: getProgressAriaProps()

> **getProgressAriaProps**(`label`, `valuenow`, `valuemin?`, `valuemax?`, `valuetext?`): `object`

Defined in: [utils/accessibility.ts:331](https://github.com/Hack23/cia-compliance-manager/blob/9ccbd7f17a2eef277e3bb28ec127ec9fa27be180/src/utils/accessibility.ts#L331)

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
