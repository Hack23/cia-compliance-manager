[**CIA Compliance Manager Documentation v1.1.5**](../../README.md)

***

[CIA Compliance Manager Documentation](../../modules.md) / [utils](../README.md) / handleArrowKeyNavigation

# Variable: handleArrowKeyNavigation()

> **handleArrowKeyNavigation**: (`event`, `currentIndex`, `totalItems`, `onIndexChange`, `orientation`) => `void`

Defined in: [utils/index.ts:47](https://github.com/Hack23/cia-compliance-manager/blob/a17ff8a572d7423ca01410dd8a5a66308c170558/src/utils/index.ts#L47)

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
