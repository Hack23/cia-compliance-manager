[**CIA Compliance Manager Documentation v1.1.3**](../../README.md)

***

[CIA Compliance Manager Documentation](../../modules.md) / [utils](../README.md) / getStatusAriaProps

# Variable: getStatusAriaProps()

> **getStatusAriaProps**: (`message`, `politeness`) => `object`

Defined in: [utils/index.ts:44](https://github.com/Hack23/cia-compliance-manager/blob/3cff826a4aee0338a550571cbd8e427564a36426/src/utils/index.ts#L44)

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
