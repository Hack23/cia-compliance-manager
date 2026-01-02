[**CIA Compliance Manager Diagrams v1.1.5**](../../README.md)

***

[CIA Compliance Manager Diagrams](../../modules.md) / [utils](../README.md) / getButtonAriaProps

# Variable: getButtonAriaProps()

> **getButtonAriaProps**: (`label`, `options?`) => `object`

Defined in: [utils/index.ts:41](https://github.com/Hack23/cia-compliance-manager/blob/a17ff8a572d7423ca01410dd8a5a66308c170558/src/utils/index.ts#L41)

Generate ARIA props for a button

## Parameters

### label

`string`

Button label

### options?

#### controls?

`string`

#### describedBy?

`string`

#### isExpanded?

`boolean`

#### isPressed?

`boolean`

## Returns

`object`

ARIA props object

### aria-controls?

> `optional` **aria-controls**: `string`

### aria-describedby?

> `optional` **aria-describedby**: `string`

### aria-expanded?

> `optional` **aria-expanded**: `boolean`

### aria-label

> **aria-label**: `string`

### aria-pressed?

> `optional` **aria-pressed**: `boolean`
