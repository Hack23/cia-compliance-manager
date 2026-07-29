[**CIA Compliance Manager — Markdown Documentation v1.1.122**](../../README.md)

***

[CIA Compliance Manager — Markdown Documentation](../../modules.md) / [utils](../README.md) / handleArrowKeyNavigation

# Variable: handleArrowKeyNavigation

> **handleArrowKeyNavigation**: (`event`, `currentIndex`, `totalItems`, `onIndexChange`, `orientation`) => `void`

Defined in: [utils/index.ts:41](https://github.com/Hack23/cia-compliance-manager/blob/fdbd0224f5e379f45807637facf704ea40d9b47d/src/utils/index.ts#L41)

Handle keyboard navigation for arrow keys in a list or grid

## Parameters

### event

`KeyboardEvent`

Keyboard event

### currentIndex

`number`

Current focused item index

### totalItems

`number`

Total number of items

### onIndexChange

(`newIndex`) => `void`

Callback when index changes

### orientation?

`"horizontal"` \| `"vertical"`

List orientation (horizontal or vertical)

## Returns

`void`
