[**CIA Compliance Manager Documentation v1.1.7**](../../README.md)

***

[CIA Compliance Manager Documentation](../../modules.md) / [utils](../README.md) / getStatusAriaProps

# Variable: getStatusAriaProps()

> **getStatusAriaProps**: (`message`, `politeness`) => `object`

Defined in: [utils/index.ts:44](https://github.com/Hack23/cia-compliance-manager/blob/6efa8b7e4173b2ed17e0594b4b26c48a1b704d1e/src/utils/index.ts#L44)

Generate ARIA props for a status/live region

## Parameters

### message

`string`

Status message

### politeness

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
