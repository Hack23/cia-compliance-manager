[**CIA Compliance Manager — UML Diagrams v1.1.166**](../../../README.md)

***

[CIA Compliance Manager — UML Diagrams](../../../modules.md) / [utils/accessibility](../README.md) / getTabPanelAriaProps

# Function: getTabPanelAriaProps()

> **getTabPanelAriaProps**(`id`, `labelledBy`, `isHidden`): `object`

Defined in: [utils/accessibility.ts:205](https://github.com/Hack23/cia-compliance-manager/blob/6c5ab08a904eba39a19afb7ed081b6ddf715632e/src/utils/accessibility.ts#L205)

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
