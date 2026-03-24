[**CIA Compliance Manager — Markdown Documentation v1.1.34**](../../../README.md)

***

[CIA Compliance Manager — Markdown Documentation](../../../modules.md) / [contexts/KeyboardShortcutContext](../README.md) / useKeyboardShortcutContextOptional

# Function: useKeyboardShortcutContextOptional()

> **useKeyboardShortcutContextOptional**(): [`KeyboardShortcutContextValue`](../../../types/keyboard/interfaces/KeyboardShortcutContextValue.md) \| `undefined`

Defined in: [contexts/KeyboardShortcutContext.tsx:169](https://github.com/Hack23/cia-compliance-manager/blob/bf8189075bc86cb5a8999dce70d7c9c39852b616/src/contexts/KeyboardShortcutContext.tsx#L169)

Optional hook to access keyboard shortcut context (returns undefined if not in provider)

## Returns

[`KeyboardShortcutContextValue`](../../../types/keyboard/interfaces/KeyboardShortcutContextValue.md) \| `undefined`

Keyboard shortcut context value or undefined

## Example

```tsx
const context = useKeyboardShortcutContextOptional();
if (context) {
  // Use context
}
```
