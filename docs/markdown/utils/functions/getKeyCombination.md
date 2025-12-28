[**CIA Compliance Manager Documentation v1.1.1**](../../README.md)

***

[CIA Compliance Manager Documentation](../../modules.md) / [utils](../README.md) / getKeyCombination

# Function: getKeyCombination()

> **getKeyCombination**(`event`): `string`

Defined in: [utils/keyboardUtils.ts:191](https://github.com/Hack23/cia-compliance-manager/blob/1ebf341a32b3e817927a60b7d1a0904ca94c68ff/src/utils/keyboardUtils.ts#L191)

Get key combination string from keyboard event

Converts KeyboardEvent to a normalized key combination string.
Handles platform differences (Cmd vs. Ctrl) and special keys.

## Parameters

### event

`KeyboardEvent`

The keyboard event

## Returns

`string`

Key combination string (e.g., 'ctrl+shift+k')

## Example

```typescript
// In event handler
document.addEventListener('keydown', (event) => {
  const combo = getKeyCombination(event);
  
  // Match against shortcuts
  if (combo === 'ctrl+shift+k' || combo === 'cmd+shift+k') {
    event.preventDefault();
    openCommandPalette();
  }
  
  // Log for debugging
  console.log('Key combo:', combo);
  // Examples: 'ctrl+s', 'cmd+k', 'shift+enter', 'escape'
});

// Handle special keys
// Space key: 'ctrl+space'
// Escape key: 'escape'
// Enter key: 'shift+enter'
```
