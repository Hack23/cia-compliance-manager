[**CIA Compliance Manager — Markdown Documentation v1.1.120**](../../../README.md)

***

[CIA Compliance Manager — Markdown Documentation](../../../modules.md) / [utils/keyboardUtils](../README.md) / detectPlatform

# Function: detectPlatform()

> **detectPlatform**(): [`Platform`](../../../types/keyboard/type-aliases/Platform.md)

Defined in: [utils/keyboardUtils.ts:82](https://github.com/Hack23/cia-compliance-manager/blob/c56ca9e444ac92e76d58acb93c1d36a453f9b938/src/utils/keyboardUtils.ts#L82)

Detect the current platform

Uses modern navigator.userAgentData when available, with fallback to
the older navigator.platform property for browsers that don't support it.
Result is cached for performance.

## Returns

[`Platform`](../../../types/keyboard/type-aliases/Platform.md)

The detected platform

## Example

```typescript
// Simple platform detection
const platform = detectPlatform();

if (platform === 'mac') {
  console.log('User is on macOS - show Cmd shortcuts');
} else if (platform === 'windows') {
  console.log('User is on Windows - show Ctrl shortcuts');
}

// Use in keyboard shortcut display
const modifier = platform === 'mac' ? '⌘' : 'Ctrl';
const shortcutText = `${modifier}+K to search`;
```
