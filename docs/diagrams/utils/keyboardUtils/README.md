[**CIA Compliance Manager — UML Diagrams v1.1.142**](../../README.md)

***

[CIA Compliance Manager — UML Diagrams](../../modules.md) / utils/keyboardUtils

# utils/keyboardUtils

Keyboard utilities for shortcut handling and platform detection

This module provides cross-platform keyboard shortcut handling with proper
platform detection (Mac vs. Windows/Linux) and key combination parsing.

## Example

```typescript
import { detectPlatform, getKeyCombination, formatKeyDisplay } from './keyboardUtils';

// Detect user's platform
const platform = detectPlatform(); // 'mac' | 'windows' | 'linux' | 'unknown'

// Handle keyboard event
document.addEventListener('keydown', (e) => {
  const combo = getKeyCombination(e);
  console.log('Pressed:', combo); // e.g., 'ctrl+shift+k'
});
```

## Functions

- [resetPlatformCache](functions/resetPlatformCache.md)
- [detectPlatform](functions/detectPlatform.md)
- [getPlatformModifier](functions/getPlatformModifier.md)
- [getKeyCombination](functions/getKeyCombination.md)
- [normalizeShortcut](functions/normalizeShortcut.md)
- [shortcutsMatch](functions/shortcutsMatch.md)
- [formatShortcut](functions/formatShortcut.md)
- [splitShortcutKeys](functions/splitShortcutKeys.md)
- [isInputElement](functions/isInputElement.md)
- [shouldIgnoreKeyboardEvent](functions/shouldIgnoreKeyboardEvent.md)
- [getPlatformShortcut](functions/getPlatformShortcut.md)
- [getShortcutAriaLabel](functions/getShortcutAriaLabel.md)
- [areKeyboardShortcutsSupported](functions/areKeyboardShortcutsSupported.md)
