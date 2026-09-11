[**CIA Compliance Manager — Markdown Documentation v1.1.146**](../../../README.md)

***

[CIA Compliance Manager — Markdown Documentation](../../../modules.md) / [utils/accessibility](../README.md) / getStatusAriaProps

# Function: getStatusAriaProps()

> **getStatusAriaProps**(`message`, `politeness?`): `object`

Defined in: [utils/accessibility.ts:374](https://github.com/Hack23/cia-compliance-manager/blob/1ad940e5aedd08b10a800e582746541da5c51dd4/src/utils/accessibility.ts#L374)

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
