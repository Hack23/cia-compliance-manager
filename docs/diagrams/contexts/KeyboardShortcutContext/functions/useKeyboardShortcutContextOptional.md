[**CIA Compliance Manager — UML Diagrams v1.1.146**](../../../README.md)

***

[CIA Compliance Manager — UML Diagrams](../../../modules.md) / [contexts/KeyboardShortcutContext](../README.md) / useKeyboardShortcutContextOptional

# Function: useKeyboardShortcutContextOptional()

> **useKeyboardShortcutContextOptional**(): [`KeyboardShortcutContextValue`](../../../types/keyboard/interfaces/KeyboardShortcutContextValue.md) \| `undefined`

Defined in: [contexts/KeyboardShortcutContext.tsx:166](https://github.com/Hack23/cia-compliance-manager/blob/1ad940e5aedd08b10a800e582746541da5c51dd4/src/contexts/KeyboardShortcutContext.tsx#L166)

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
