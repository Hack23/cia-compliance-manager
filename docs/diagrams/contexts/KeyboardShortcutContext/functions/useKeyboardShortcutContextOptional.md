[**CIA Compliance Manager — UML Diagrams v1.1.111**](../../../README.md)

***

[CIA Compliance Manager — UML Diagrams](../../../modules.md) / [contexts/KeyboardShortcutContext](../README.md) / useKeyboardShortcutContextOptional

# Function: useKeyboardShortcutContextOptional()

> **useKeyboardShortcutContextOptional**(): [`KeyboardShortcutContextValue`](../../../types/keyboard/interfaces/KeyboardShortcutContextValue.md) \| `undefined`

Defined in: [contexts/KeyboardShortcutContext.tsx:166](https://github.com/Hack23/cia-compliance-manager/blob/9d682528d83baaf05162deecb226a0ab8890288b/src/contexts/KeyboardShortcutContext.tsx#L166)

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
