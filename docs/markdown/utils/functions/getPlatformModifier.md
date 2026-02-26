[**CIA Compliance Manager Documentation v1.1.24**](../../README.md)

***

[CIA Compliance Manager Documentation](../../modules.md) / [utils](../README.md) / getPlatformModifier

# Function: getPlatformModifier()

> **getPlatformModifier**(): `"ctrl"` \| `"cmd"`

Defined in: [utils/keyboardUtils.ts:152](https://github.com/Hack23/cia-compliance-manager/blob/38f6f5c07abe26db22d63c793ea812e50d687ce5/src/utils/keyboardUtils.ts#L152)

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
