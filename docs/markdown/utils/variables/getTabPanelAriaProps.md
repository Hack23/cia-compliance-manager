[**CIA Compliance Manager — Markdown Documentation v1.1.136**](../../README.md)

***

[CIA Compliance Manager — Markdown Documentation](../../modules.md) / [utils](../README.md) / getTabPanelAriaProps

# Variable: getTabPanelAriaProps

> **getTabPanelAriaProps**: (`id`, `labelledBy`, `isHidden`) => `object`

Defined in: [utils/index.ts:34](https://github.com/Hack23/cia-compliance-manager/blob/5f73d9fe3573629a0de40e142b8deeb23a7ae9b4/src/utils/index.ts#L34)

Generate ARIA props for a tab panel

## Parameters

### id

`string`

Panel identifier

### labelledBy

`string`

ID of the tab that labels this panel

### isHidden

`boolean`

Whether the panel is currently hidden

## Returns

`object`

ARIA props object

### role

> **role**: `string`

### id

> **id**: `string`

### aria-labelledby

> **aria-labelledby**: `string`

### hidden?

> `optional` **hidden?**: `boolean`

### tabIndex

> **tabIndex**: `number`
