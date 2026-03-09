[**CIA Compliance Manager Diagrams v1.1.28**](../../README.md)

***

[CIA Compliance Manager Diagrams](../../modules.md) / [utils](../README.md) / getStatusAriaProps

# Variable: getStatusAriaProps()

> **getStatusAriaProps**: (`message`, `politeness`) => `object`

Defined in: [utils/index.ts:44](https://github.com/Hack23/cia-compliance-manager/blob/6c4bbd75cd3a4f379a2a2228e6a1be5ddc7ed98b/src/utils/index.ts#L44)

Generate ARIA props for a status/live region

## Parameters

### message

`string`

Status message

### politeness?

ARIA live politeness level

`"OFF"` | `"POLITE"` | `"ASSERTIVE"`

## Returns

`object`

ARIA props object

### aria-atomic

> **aria-atomic**: `boolean`

### aria-live

> **aria-live**: `string`

### role

> **role**: `string`
