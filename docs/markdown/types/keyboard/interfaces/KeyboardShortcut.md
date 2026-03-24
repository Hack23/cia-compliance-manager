[**CIA Compliance Manager — Markdown Documentation v1.1.34**](../../../README.md)

***

[CIA Compliance Manager — Markdown Documentation](../../../modules.md) / [types/keyboard](../README.md) / KeyboardShortcut

# Interface: KeyboardShortcut

Defined in: [types/keyboard.ts:30](https://github.com/Hack23/cia-compliance-manager/blob/bf8189075bc86cb5a8999dce70d7c9c39852b616/src/types/keyboard.ts#L30)

Keyboard shortcut definition

## Properties

### id

> **id**: `string`

Defined in: [types/keyboard.ts:32](https://github.com/Hack23/cia-compliance-manager/blob/bf8189075bc86cb5a8999dce70d7c9c39852b616/src/types/keyboard.ts#L32)

Unique identifier for the shortcut

***

### keys

> **keys**: `string`

Defined in: [types/keyboard.ts:35](https://github.com/Hack23/cia-compliance-manager/blob/bf8189075bc86cb5a8999dce70d7c9c39852b616/src/types/keyboard.ts#L35)

Key combination (e.g., 'ctrl+1', 'ctrl+shift+n')

***

### description

> **description**: `string`

Defined in: [types/keyboard.ts:38](https://github.com/Hack23/cia-compliance-manager/blob/bf8189075bc86cb5a8999dce70d7c9c39852b616/src/types/keyboard.ts#L38)

Human-readable description of what the shortcut does

***

### category

> **category**: [`ShortcutCategory`](../type-aliases/ShortcutCategory.md)

Defined in: [types/keyboard.ts:41](https://github.com/Hack23/cia-compliance-manager/blob/bf8189075bc86cb5a8999dce70d7c9c39852b616/src/types/keyboard.ts#L41)

Category for grouping shortcuts

***

### handler

> **handler**: () => `void`

Defined in: [types/keyboard.ts:44](https://github.com/Hack23/cia-compliance-manager/blob/bf8189075bc86cb5a8999dce70d7c9c39852b616/src/types/keyboard.ts#L44)

Handler function to execute when shortcut is triggered

#### Returns

`void`

***

### enabled?

> `optional` **enabled?**: `boolean`

Defined in: [types/keyboard.ts:47](https://github.com/Hack23/cia-compliance-manager/blob/bf8189075bc86cb5a8999dce70d7c9c39852b616/src/types/keyboard.ts#L47)

Whether the shortcut is enabled

***

### platformKeys?

> `optional` **platformKeys?**: `Partial`\<`Record`\<[`Platform`](../type-aliases/Platform.md), `string`\>\>

Defined in: [types/keyboard.ts:50](https://github.com/Hack23/cia-compliance-manager/blob/bf8189075bc86cb5a8999dce70d7c9c39852b616/src/types/keyboard.ts#L50)

Platform-specific override (optional)
