[**CIA Compliance Manager Documentation v1.1.14**](../../README.md)

***

[CIA Compliance Manager Documentation](../../modules.md) / [utils](../README.md) / getTabIndex

# Variable: getTabIndex()

> **getTabIndex**: (`isInteractive`, `isDisabled`) => `number` \| `undefined`

Defined in: [utils/index.ts:46](https://github.com/Hack23/cia-compliance-manager/blob/2572cfa2ede06cc7942019b0f742928ad9d5ceb3/src/utils/index.ts#L46)

Check if an element should be keyboard focusable

## Parameters

### isInteractive

`boolean`

Whether element is interactive

### isDisabled

`boolean` = `false`

Whether element is disabled

## Returns

`number` \| `undefined`

tabIndex value (-1, 0, or undefined)
