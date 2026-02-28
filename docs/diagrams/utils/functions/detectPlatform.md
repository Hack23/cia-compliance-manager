[**CIA Compliance Manager Diagrams v1.1.26**](../../README.md)

***

[CIA Compliance Manager Diagrams](../../modules.md) / [utils](../README.md) / detectPlatform

# Function: detectPlatform()

> **detectPlatform**(): [`Platform`](../../types/type-aliases/Platform.md)

Defined in: [utils/keyboardUtils.ts:82](https://github.com/Hack23/cia-compliance-manager/blob/5f2722b27ad5a860c0c32d7458a8ddb0e3dddde9/src/utils/keyboardUtils.ts#L82)

Detect the current platform

Uses modern navigator.userAgentData when available, with fallback to
deprecated navigator.platform for older browsers.
Result is cached for performance.

## Returns

[`Platform`](../../types/type-aliases/Platform.md)

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
