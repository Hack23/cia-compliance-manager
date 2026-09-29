[**CIA Compliance Manager — UML Diagrams v1.1.154**](../../../README.md)

***

[CIA Compliance Manager — UML Diagrams](../../../modules.md) / [utils/keyboardUtils](../README.md) / getPlatformModifier

# Function: getPlatformModifier()

> **getPlatformModifier**(): `"ctrl"` \| `"cmd"`

Defined in: [utils/keyboardUtils.ts:149](https://github.com/Hack23/cia-compliance-manager/blob/42e66b46977944fe728f624a83223bbbb90a81b2/src/utils/keyboardUtils.ts#L149)

Get platform modifier key (Cmd on Mac, Ctrl elsewhere)

## Returns

`"ctrl"` \| `"cmd"`

The platform-specific modifier key name

## Example

```typescript
// Get the right modifier for current platform
const modifier = getPlatformModifier();

// Use in shortcut configuration
const shortcuts = {
  search: `${modifier}+k`,    // 'cmd+k' on Mac, 'ctrl+k' elsewhere
  save: `${modifier}+s`,      // 'cmd+s' on Mac, 'ctrl+s' elsewhere
};

// Display in UI
const displayText = modifier === 'cmd' ? '⌘+K' : 'Ctrl+K';
```
