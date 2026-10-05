[**CIA Compliance Manager — UML Diagrams v1.1.160**](../../README.md)

***

[CIA Compliance Manager — UML Diagrams](../../modules.md) / [utils](../README.md) / getStatusAriaProps

# Variable: getStatusAriaProps

> **getStatusAriaProps**: (`message`, `politeness`) => `object`

Defined in: [utils/index.ts:38](https://github.com/Hack23/cia-compliance-manager/blob/65d80050336fcb6ec803a647b772abde27cf817d/src/utils/index.ts#L38)

Generate ARIA props for a status/live region

## Parameters

### message

`string`

Status message

### politeness?

`"OFF"` \| `"POLITE"` \| `"ASSERTIVE"`

ARIA live politeness level

## Returns

`object`

ARIA props object

### role

> **role**: `string`

### aria-live

> **aria-live**: `string`

### aria-atomic

> **aria-atomic**: `boolean`
