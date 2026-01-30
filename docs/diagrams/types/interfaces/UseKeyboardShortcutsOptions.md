[**CIA Compliance Manager Diagrams v1.1.14**](../../README.md)

***

[CIA Compliance Manager Diagrams](../../modules.md) / [types](../README.md) / UseKeyboardShortcutsOptions

# Interface: UseKeyboardShortcutsOptions

Defined in: [types/keyboard.ts:61](https://github.com/Hack23/cia-compliance-manager/blob/2572cfa2ede06cc7942019b0f742928ad9d5ceb3/src/types/keyboard.ts#L61)

Props for keyboard shortcut hook

## Properties

### enabled?

> `optional` **enabled**: `boolean`

Defined in: [types/keyboard.ts:66](https://github.com/Hack23/cia-compliance-manager/blob/2572cfa2ede06cc7942019b0f742928ad9d5ceb3/src/types/keyboard.ts#L66)

Whether shortcuts are enabled

***

### preventDefault?

> `optional` **preventDefault**: `boolean`

Defined in: [types/keyboard.ts:69](https://github.com/Hack23/cia-compliance-manager/blob/2572cfa2ede06cc7942019b0f742928ad9d5ceb3/src/types/keyboard.ts#L69)

Prevent default browser behavior

***

### shortcuts

> **shortcuts**: [`ShortcutMap`](../type-aliases/ShortcutMap.md)

Defined in: [types/keyboard.ts:63](https://github.com/Hack23/cia-compliance-manager/blob/2572cfa2ede06cc7942019b0f742928ad9d5ceb3/src/types/keyboard.ts#L63)

Map of shortcuts to register

***

### stopPropagation?

> `optional` **stopPropagation**: `boolean`

Defined in: [types/keyboard.ts:72](https://github.com/Hack23/cia-compliance-manager/blob/2572cfa2ede06cc7942019b0f742928ad9d5ceb3/src/types/keyboard.ts#L72)

Stop event propagation
