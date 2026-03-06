[**CIA Compliance Manager Documentation v1.1.27**](../../README.md)

***

[CIA Compliance Manager Documentation](../../modules.md) / [hooks](../README.md) / useKeyboardShortcuts

# Function: useKeyboardShortcuts()

> **useKeyboardShortcuts**(`options`): `void`

Defined in: [hooks/useKeyboardShortcuts.ts:42](https://github.com/Hack23/cia-compliance-manager/blob/941390918f346f297f13633b97ad67c12ed14d0e/src/hooks/useKeyboardShortcuts.ts#L42)

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
