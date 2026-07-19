[**CIA Compliance Manager — UML Diagrams v1.1.115**](../../../README.md)

***

[CIA Compliance Manager — UML Diagrams](../../../modules.md) / [hooks/useKeyboardShortcuts](../README.md) / useKeyboardShortcuts

# Function: useKeyboardShortcuts()

> **useKeyboardShortcuts**(`options`): `void`

Defined in: [hooks/useKeyboardShortcuts.ts:42](https://github.com/Hack23/cia-compliance-manager/blob/7ccd437a9a11f08277626ae4f6879b747fb31d1f/src/hooks/useKeyboardShortcuts.ts#L42)

Custom hook for registering and handling keyboard shortcuts

## Parameters

### options

[`UseKeyboardShortcutsOptions`](../../../types/keyboard/interfaces/UseKeyboardShortcutsOptions.md)

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
