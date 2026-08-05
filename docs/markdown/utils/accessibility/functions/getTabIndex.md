[**CIA Compliance Manager — Markdown Documentation v1.1.127**](../../../README.md)

***

[CIA Compliance Manager — Markdown Documentation](../../../modules.md) / [utils/accessibility](../README.md) / getTabIndex

# Function: getTabIndex()

> **getTabIndex**(`isInteractive`, `isDisabled?`): `number` \| `undefined`

Defined in: [utils/accessibility.ts:429](https://github.com/Hack23/cia-compliance-manager/blob/b44ae23b82aba288e01694c3ce1c42a26c105d38/src/utils/accessibility.ts#L429)

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
