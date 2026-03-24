[**CIA Compliance Manager — Markdown Documentation v1.1.34**](../../../README.md)

***

[CIA Compliance Manager — Markdown Documentation](../../../modules.md) / [types/keyboard](../README.md) / KeyboardShortcutContextValue

# Interface: KeyboardShortcutContextValue

Defined in: [types/keyboard.ts:78](https://github.com/Hack23/cia-compliance-manager/blob/bf8189075bc86cb5a8999dce70d7c9c39852b616/src/types/keyboard.ts#L78)

Keyboard shortcut context value

## Properties

### shortcuts

> **shortcuts**: [`ShortcutMap`](../type-aliases/ShortcutMap.md)

Defined in: [types/keyboard.ts:80](https://github.com/Hack23/cia-compliance-manager/blob/bf8189075bc86cb5a8999dce70d7c9c39852b616/src/types/keyboard.ts#L80)

All registered shortcuts

***

### registerShortcut

> **registerShortcut**: (`shortcut`) => `void`

Defined in: [types/keyboard.ts:83](https://github.com/Hack23/cia-compliance-manager/blob/bf8189075bc86cb5a8999dce70d7c9c39852b616/src/types/keyboard.ts#L83)

Register a new shortcut

#### Parameters

##### shortcut

[`KeyboardShortcut`](KeyboardShortcut.md)

#### Returns

`void`

***

### unregisterShortcut

> **unregisterShortcut**: (`id`) => `void`

Defined in: [types/keyboard.ts:86](https://github.com/Hack23/cia-compliance-manager/blob/bf8189075bc86cb5a8999dce70d7c9c39852b616/src/types/keyboard.ts#L86)

Unregister a shortcut by id

#### Parameters

##### id

`string`

#### Returns

`void`

***

### isEnabled

> **isEnabled**: `boolean`

Defined in: [types/keyboard.ts:89](https://github.com/Hack23/cia-compliance-manager/blob/bf8189075bc86cb5a8999dce70d7c9c39852b616/src/types/keyboard.ts#L89)

Check if shortcuts are enabled

***

### setEnabled

> **setEnabled**: (`enabled`) => `void`

Defined in: [types/keyboard.ts:92](https://github.com/Hack23/cia-compliance-manager/blob/bf8189075bc86cb5a8999dce70d7c9c39852b616/src/types/keyboard.ts#L92)

Enable/disable all shortcuts

#### Parameters

##### enabled

`boolean`

#### Returns

`void`

***

### platform

> **platform**: [`Platform`](../type-aliases/Platform.md)

Defined in: [types/keyboard.ts:95](https://github.com/Hack23/cia-compliance-manager/blob/bf8189075bc86cb5a8999dce70d7c9c39852b616/src/types/keyboard.ts#L95)

Get current platform

***

### showHelp

> **showHelp**: `boolean`

Defined in: [types/keyboard.ts:98](https://github.com/Hack23/cia-compliance-manager/blob/bf8189075bc86cb5a8999dce70d7c9c39852b616/src/types/keyboard.ts#L98)

Toggle help modal visibility

***

### setShowHelp

> **setShowHelp**: (`show`) => `void`

Defined in: [types/keyboard.ts:101](https://github.com/Hack23/cia-compliance-manager/blob/bf8189075bc86cb5a8999dce70d7c9c39852b616/src/types/keyboard.ts#L101)

Set help modal visibility

#### Parameters

##### show

`boolean`

#### Returns

`void`
