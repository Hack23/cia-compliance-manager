[**CIA Compliance Manager — Markdown Documentation v1.1.112**](../../README.md)

***

[CIA Compliance Manager — Markdown Documentation](../../modules.md) / [utils](../README.md) / getTabIndex

# Variable: getTabIndex

> **getTabIndex**: (`isInteractive`, `isDisabled`) => `number` \| `undefined`

Defined in: [utils/index.ts:40](https://github.com/Hack23/cia-compliance-manager/blob/72fa42d162c7bd411972c979f0e49eb7a915751c/src/utils/index.ts#L40)

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
