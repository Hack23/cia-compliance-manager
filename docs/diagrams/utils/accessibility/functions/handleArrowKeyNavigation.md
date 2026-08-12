[**CIA Compliance Manager — UML Diagrams v1.1.131**](../../../README.md)

***

[CIA Compliance Manager — UML Diagrams](../../../modules.md) / [utils/accessibility](../README.md) / handleArrowKeyNavigation

# Function: handleArrowKeyNavigation()

> **handleArrowKeyNavigation**(`event`, `currentIndex`, `totalItems`, `onIndexChange`, `orientation?`): `void`

Defined in: [utils/accessibility.ts:448](https://github.com/Hack23/cia-compliance-manager/blob/bb9cb6ff8b9ad8246d145529d368cb2eb49471c5/src/utils/accessibility.ts#L448)

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
