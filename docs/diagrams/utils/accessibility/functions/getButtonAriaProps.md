[**CIA Compliance Manager — UML Diagrams v1.1.111**](../../../README.md)

***

[CIA Compliance Manager — UML Diagrams](../../../modules.md) / [utils/accessibility](../README.md) / getButtonAriaProps

# Function: getButtonAriaProps()

> **getButtonAriaProps**(`label`, `options?`): `object`

Defined in: [utils/accessibility.ts:245](https://github.com/Hack23/cia-compliance-manager/blob/9d682528d83baaf05162deecb226a0ab8890288b/src/utils/accessibility.ts#L245)

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
