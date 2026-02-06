[**CIA Compliance Manager Diagrams v1.1.16**](../../README.md)

***

[CIA Compliance Manager Diagrams](../../modules.md) / [types](../README.md) / KeyboardShortcutContextValue

# Interface: KeyboardShortcutContextValue

Defined in: [types/keyboard.ts:78](https://github.com/Hack23/cia-compliance-manager/blob/08d981d9d23db94df1debc77186c22027f4d896e/src/types/keyboard.ts#L78)

Keyboard shortcut context value

## Properties

### isEnabled

> **isEnabled**: `boolean`

Defined in: [types/keyboard.ts:89](https://github.com/Hack23/cia-compliance-manager/blob/08d981d9d23db94df1debc77186c22027f4d896e/src/types/keyboard.ts#L89)

Check if shortcuts are enabled

***

### platform

> **platform**: [`Platform`](../type-aliases/Platform.md)

Defined in: [types/keyboard.ts:95](https://github.com/Hack23/cia-compliance-manager/blob/08d981d9d23db94df1debc77186c22027f4d896e/src/types/keyboard.ts#L95)

Get current platform

***

### registerShortcut()

> **registerShortcut**: (`shortcut`) => `void`

Defined in: [types/keyboard.ts:83](https://github.com/Hack23/cia-compliance-manager/blob/08d981d9d23db94df1debc77186c22027f4d896e/src/types/keyboard.ts#L83)

Register a new shortcut

#### Parameters

##### shortcut

[`KeyboardShortcut`](KeyboardShortcut.md)

#### Returns

`void`

***

### setEnabled()

> **setEnabled**: (`enabled`) => `void`

Defined in: [types/keyboard.ts:92](https://github.com/Hack23/cia-compliance-manager/blob/08d981d9d23db94df1debc77186c22027f4d896e/src/types/keyboard.ts#L92)

Enable/disable all shortcuts

#### Parameters

##### enabled

`boolean`

#### Returns

`void`

***

### setShowHelp()

> **setShowHelp**: (`show`) => `void`

Defined in: [types/keyboard.ts:101](https://github.com/Hack23/cia-compliance-manager/blob/08d981d9d23db94df1debc77186c22027f4d896e/src/types/keyboard.ts#L101)

Set help modal visibility

#### Parameters

##### show

`boolean`

#### Returns

`void`

***

### shortcuts

> **shortcuts**: [`ShortcutMap`](../type-aliases/ShortcutMap.md)

Defined in: [types/keyboard.ts:80](https://github.com/Hack23/cia-compliance-manager/blob/08d981d9d23db94df1debc77186c22027f4d896e/src/types/keyboard.ts#L80)

All registered shortcuts

***

### showHelp

> **showHelp**: `boolean`

Defined in: [types/keyboard.ts:98](https://github.com/Hack23/cia-compliance-manager/blob/08d981d9d23db94df1debc77186c22027f4d896e/src/types/keyboard.ts#L98)

Toggle help modal visibility

***

### unregisterShortcut()

> **unregisterShortcut**: (`id`) => `void`

Defined in: [types/keyboard.ts:86](https://github.com/Hack23/cia-compliance-manager/blob/08d981d9d23db94df1debc77186c22027f4d896e/src/types/keyboard.ts#L86)

Unregister a shortcut by id

#### Parameters

##### id

`string`

#### Returns

`void`
