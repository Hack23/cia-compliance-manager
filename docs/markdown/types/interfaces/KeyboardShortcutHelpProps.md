[**CIA Compliance Manager Documentation v1.1.11**](../../README.md)

***

[CIA Compliance Manager Documentation](../../modules.md) / [types](../README.md) / KeyboardShortcutHelpProps

# Interface: KeyboardShortcutHelpProps

Defined in: [types/keyboard.ts:107](https://github.com/Hack23/cia-compliance-manager/blob/bdceac647232fcd21e28eab47eb85ed4588b8e2a/src/types/keyboard.ts#L107)

Props for keyboard shortcut help modal

## Properties

### isOpen

> **isOpen**: `boolean`

Defined in: [types/keyboard.ts:109](https://github.com/Hack23/cia-compliance-manager/blob/bdceac647232fcd21e28eab47eb85ed4588b8e2a/src/types/keyboard.ts#L109)

Whether the modal is open

***

### onClose()

> **onClose**: () => `void`

Defined in: [types/keyboard.ts:112](https://github.com/Hack23/cia-compliance-manager/blob/bdceac647232fcd21e28eab47eb85ed4588b8e2a/src/types/keyboard.ts#L112)

Callback when modal is closed

#### Returns

`void`

***

### shortcuts?

> `optional` **shortcuts**: [`ShortcutMap`](../type-aliases/ShortcutMap.md)

Defined in: [types/keyboard.ts:115](https://github.com/Hack23/cia-compliance-manager/blob/bdceac647232fcd21e28eab47eb85ed4588b8e2a/src/types/keyboard.ts#L115)

Shortcuts to display (defaults to all)
