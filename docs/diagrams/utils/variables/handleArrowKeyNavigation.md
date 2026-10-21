[**CIA Compliance Manager — UML Diagrams v1.1.165**](../../README.md)

***

[CIA Compliance Manager — UML Diagrams](../../modules.md) / [utils](../README.md) / handleArrowKeyNavigation

# Variable: handleArrowKeyNavigation

> **handleArrowKeyNavigation**: (`event`, `currentIndex`, `totalItems`, `onIndexChange`, `orientation`) => `void`

Defined in: [utils/index.ts:41](https://github.com/Hack23/cia-compliance-manager/blob/1212b27dca9a90ca35b6865ea7beb24b601ee2c3/src/utils/index.ts#L41)

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

`"horizontal"` \| `"vertical"` = `'vertical'`

List orientation (horizontal or vertical)

## Returns

`void`
