[**CIA Compliance Manager — Markdown Documentation v1.1.135**](../../../README.md)

***

[CIA Compliance Manager — Markdown Documentation](../../../modules.md) / [utils/accessibility](../README.md) / getStatusAriaProps

# Function: getStatusAriaProps()

> **getStatusAriaProps**(`message`, `politeness?`): `object`

Defined in: [utils/accessibility.ts:374](https://github.com/Hack23/cia-compliance-manager/blob/adbb4925fe59f61a674ca7ca5a3bd8d1bad15900/src/utils/accessibility.ts#L374)

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
