[**CIA Compliance Manager — Markdown Documentation v1.1.164**](../../../README.md)

***

[CIA Compliance Manager — Markdown Documentation](../../../modules.md) / [utils/accessibility](../README.md) / handleArrowKeyNavigation

# Function: handleArrowKeyNavigation()

> **handleArrowKeyNavigation**(`event`, `currentIndex`, `totalItems`, `onIndexChange`, `orientation?`): `void`

Defined in: [utils/accessibility.ts:448](https://github.com/Hack23/cia-compliance-manager/blob/3774b84329aba54283915923ce99a7a5f49cc296/src/utils/accessibility.ts#L448)

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
