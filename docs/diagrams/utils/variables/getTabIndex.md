[**CIA Compliance Manager Diagrams v1.1.28**](../../README.md)

***

[CIA Compliance Manager Diagrams](../../modules.md) / [utils](../README.md) / getTabIndex

# Variable: getTabIndex()

> **getTabIndex**: (`isInteractive`, `isDisabled`) => `number` \| `undefined`

Defined in: [utils/index.ts:46](https://github.com/Hack23/cia-compliance-manager/blob/6c4bbd75cd3a4f379a2a2228e6a1be5ddc7ed98b/src/utils/index.ts#L46)

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
