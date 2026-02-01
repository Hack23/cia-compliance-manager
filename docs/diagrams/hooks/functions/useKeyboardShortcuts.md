[**CIA Compliance Manager Diagrams v1.1.15**](../../README.md)

***

[CIA Compliance Manager Diagrams](../../modules.md) / [hooks](../README.md) / useKeyboardShortcuts

# Function: useKeyboardShortcuts()

> **useKeyboardShortcuts**(`options`): `void`

Defined in: [hooks/useKeyboardShortcuts.ts:42](https://github.com/Hack23/cia-compliance-manager/blob/4266fd44b58119e0a4772b578ef7fb2d2999a68d/src/hooks/useKeyboardShortcuts.ts#L42)

Custom hook for registering and handling keyboard shortcuts

## Parameters

### options

[`UseKeyboardShortcutsOptions`](../../types/interfaces/UseKeyboardShortcutsOptions.md)

Configuration options for keyboard shortcuts

## Returns

`void`

## Example

```tsx
const shortcuts = {
  'save': {
    id: 'save',
    keys: 'ctrl+s',
    description: 'Save document',
    category: 'Actions',
    handler: () => handleSave(),
  }
};

useKeyboardShortcuts({
  shortcuts,
  enabled: true,
  preventDefault: true,
});
```
