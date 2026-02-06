[**CIA Compliance Manager Diagrams v1.1.16**](../../README.md)

***

[CIA Compliance Manager Diagrams](../../modules.md) / [types](../README.md) / KeyboardShortcutHelpProps

# Interface: KeyboardShortcutHelpProps

Defined in: [types/keyboard.ts:107](https://github.com/Hack23/cia-compliance-manager/blob/08d981d9d23db94df1debc77186c22027f4d896e/src/types/keyboard.ts#L107)

Props for keyboard shortcut help modal

## Properties

### isOpen

> **isOpen**: `boolean`

Defined in: [types/keyboard.ts:109](https://github.com/Hack23/cia-compliance-manager/blob/08d981d9d23db94df1debc77186c22027f4d896e/src/types/keyboard.ts#L109)

Whether the modal is open

***

### onClose()

> **onClose**: () => `void`

Defined in: [types/keyboard.ts:112](https://github.com/Hack23/cia-compliance-manager/blob/08d981d9d23db94df1debc77186c22027f4d896e/src/types/keyboard.ts#L112)

Callback when modal is closed

#### Returns

`void`

***

### shortcuts?

> `optional` **shortcuts**: [`ShortcutMap`](../type-aliases/ShortcutMap.md)

Defined in: [types/keyboard.ts:115](https://github.com/Hack23/cia-compliance-manager/blob/08d981d9d23db94df1debc77186c22027f4d896e/src/types/keyboard.ts#L115)

Shortcuts to display (defaults to all)
