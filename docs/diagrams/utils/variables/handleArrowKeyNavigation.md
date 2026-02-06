[**CIA Compliance Manager Diagrams v1.1.16**](../../README.md)

***

[CIA Compliance Manager Diagrams](../../modules.md) / [utils](../README.md) / handleArrowKeyNavigation

# Variable: handleArrowKeyNavigation()

> **handleArrowKeyNavigation**: (`event`, `currentIndex`, `totalItems`, `onIndexChange`, `orientation`) => `void`

Defined in: [utils/index.ts:47](https://github.com/Hack23/cia-compliance-manager/blob/08d981d9d23db94df1debc77186c22027f4d896e/src/utils/index.ts#L47)

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

### orientation

List orientation (horizontal or vertical)

`"horizontal"` | `"vertical"`

## Returns

`void`
