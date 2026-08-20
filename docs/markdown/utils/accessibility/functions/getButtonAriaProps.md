[**CIA Compliance Manager — Markdown Documentation v1.1.135**](../../../README.md)

***

[CIA Compliance Manager — Markdown Documentation](../../../modules.md) / [utils/accessibility](../README.md) / getButtonAriaProps

# Function: getButtonAriaProps()

> **getButtonAriaProps**(`label`, `options?`): `object`

Defined in: [utils/accessibility.ts:245](https://github.com/Hack23/cia-compliance-manager/blob/adbb4925fe59f61a674ca7ca5a3bd8d1bad15900/src/utils/accessibility.ts#L245)

Generate ARIA props for a button

## Parameters

### label

`string`

Button label

### options?

#### isPressed?

`boolean`

#### isExpanded?

`boolean`

#### controls?

`string`

#### describedBy?

`string`

## Returns

`object`

ARIA props object

### aria-label

> **aria-label**: `string`

### aria-pressed?

> `optional` **aria-pressed?**: `boolean`

### aria-expanded?

> `optional` **aria-expanded?**: `boolean`

### aria-controls?

> `optional` **aria-controls?**: `string`

### aria-describedby?

> `optional` **aria-describedby?**: `string`
