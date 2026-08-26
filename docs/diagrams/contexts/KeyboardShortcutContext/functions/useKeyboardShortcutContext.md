[**CIA Compliance Manager — UML Diagrams v1.1.139**](../../../README.md)

***

[CIA Compliance Manager — UML Diagrams](../../../modules.md) / [contexts/KeyboardShortcutContext](../README.md) / useKeyboardShortcutContext

# Function: useKeyboardShortcutContext()

> **useKeyboardShortcutContext**(): [`KeyboardShortcutContextValue`](../../../types/keyboard/interfaces/KeyboardShortcutContextValue.md)

Defined in: [contexts/KeyboardShortcutContext.tsx:141](https://github.com/Hack23/cia-compliance-manager/blob/fb48405c6b6b18111764c7bebe65fc8cb86df743/src/contexts/KeyboardShortcutContext.tsx#L141)

Hook to access keyboard shortcut context

## Returns

[`KeyboardShortcutContextValue`](../../../types/keyboard/interfaces/KeyboardShortcutContextValue.md)

Keyboard shortcut context value

## Throws

Error if used outside of KeyboardShortcutProvider

## Example

```tsx
const { shortcuts, registerShortcut, showHelp, setShowHelp } = useKeyboardShortcutContext();
```
