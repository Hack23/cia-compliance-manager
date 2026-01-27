[**CIA Compliance Manager Diagrams v1.1.13**](../../README.md)

***

[CIA Compliance Manager Diagrams](../../modules.md) / [types](../README.md) / KeyboardShortcut

# Interface: KeyboardShortcut

Defined in: [types/keyboard.ts:30](https://github.com/Hack23/cia-compliance-manager/blob/d1f49c8017dd6649366103fd87fa14f3af19f220/src/types/keyboard.ts#L30)

Keyboard shortcut definition

## Properties

### category

> **category**: [`ShortcutCategory`](../type-aliases/ShortcutCategory.md)

Defined in: [types/keyboard.ts:41](https://github.com/Hack23/cia-compliance-manager/blob/d1f49c8017dd6649366103fd87fa14f3af19f220/src/types/keyboard.ts#L41)

Category for grouping shortcuts

***

### description

> **description**: `string`

Defined in: [types/keyboard.ts:38](https://github.com/Hack23/cia-compliance-manager/blob/d1f49c8017dd6649366103fd87fa14f3af19f220/src/types/keyboard.ts#L38)

Human-readable description of what the shortcut does

***

### enabled?

> `optional` **enabled**: `boolean`

Defined in: [types/keyboard.ts:47](https://github.com/Hack23/cia-compliance-manager/blob/d1f49c8017dd6649366103fd87fa14f3af19f220/src/types/keyboard.ts#L47)

Whether the shortcut is enabled

***

### handler()

> **handler**: () => `void`

Defined in: [types/keyboard.ts:44](https://github.com/Hack23/cia-compliance-manager/blob/d1f49c8017dd6649366103fd87fa14f3af19f220/src/types/keyboard.ts#L44)

Handler function to execute when shortcut is triggered

#### Returns

`void`

***

### id

> **id**: `string`

Defined in: [types/keyboard.ts:32](https://github.com/Hack23/cia-compliance-manager/blob/d1f49c8017dd6649366103fd87fa14f3af19f220/src/types/keyboard.ts#L32)

Unique identifier for the shortcut

***

### keys

> **keys**: `string`

Defined in: [types/keyboard.ts:35](https://github.com/Hack23/cia-compliance-manager/blob/d1f49c8017dd6649366103fd87fa14f3af19f220/src/types/keyboard.ts#L35)

Key combination (e.g., 'ctrl+1', 'ctrl+shift+n')

***

### platformKeys?

> `optional` **platformKeys**: `Partial`\<`Record`\<[`Platform`](../type-aliases/Platform.md), `string`\>\>

Defined in: [types/keyboard.ts:50](https://github.com/Hack23/cia-compliance-manager/blob/d1f49c8017dd6649366103fd87fa14f3af19f220/src/types/keyboard.ts#L50)

Platform-specific override (optional)
