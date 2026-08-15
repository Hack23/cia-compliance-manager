[**CIA Compliance Manager — Markdown Documentation v1.1.133**](../../README.md)

***

[CIA Compliance Manager — Markdown Documentation](../../modules.md) / [utils](../README.md) / getTabIndex

# Variable: getTabIndex

> **getTabIndex**: (`isInteractive`, `isDisabled`) => `number` \| `undefined`

Defined in: [utils/index.ts:40](https://github.com/Hack23/cia-compliance-manager/blob/a3e63053a25f76d3ab18122863c3f4b04ccf4967/src/utils/index.ts#L40)

Check if an element should be keyboard focusable

## Parameters

### isInteractive

`boolean`

Whether element is interactive

### isDisabled?

`boolean` = `false`

Whether element is disabled

## Returns

`number` \| `undefined`

tabIndex value (-1, 0, or undefined)
