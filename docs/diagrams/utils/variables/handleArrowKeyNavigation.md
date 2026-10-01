[**CIA Compliance Manager — UML Diagrams v1.1.156**](../../README.md)

***

[CIA Compliance Manager — UML Diagrams](../../modules.md) / [utils](../README.md) / handleArrowKeyNavigation

# Variable: handleArrowKeyNavigation

> **handleArrowKeyNavigation**: (`event`, `currentIndex`, `totalItems`, `onIndexChange`, `orientation`) => `void`

Defined in: [utils/index.ts:41](https://github.com/Hack23/cia-compliance-manager/blob/b835e9565f8f6ef32fee2fb9cff3193b9e0e73ec/src/utils/index.ts#L41)

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
