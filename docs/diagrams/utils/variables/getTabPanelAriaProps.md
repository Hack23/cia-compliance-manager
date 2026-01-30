[**CIA Compliance Manager Diagrams v1.1.14**](../../README.md)

***

[CIA Compliance Manager Diagrams](../../modules.md) / [utils](../README.md) / getTabPanelAriaProps

# Variable: getTabPanelAriaProps()

> **getTabPanelAriaProps**: (`id`, `labelledBy`, `isHidden`) => `object`

Defined in: [utils/index.ts:40](https://github.com/Hack23/cia-compliance-manager/blob/2572cfa2ede06cc7942019b0f742928ad9d5ceb3/src/utils/index.ts#L40)

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

### aria-labelledby

> **aria-labelledby**: `string`

### hidden?

> `optional` **hidden**: `boolean`

### id

> **id**: `string`

### role

> **role**: `string`

### tabIndex

> **tabIndex**: `number`
