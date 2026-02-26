[**CIA Compliance Manager Documentation v1.1.24**](../../README.md)

***

[CIA Compliance Manager Documentation](../../modules.md) / [types](../README.md) / UseKeyboardShortcutsOptions

# Interface: UseKeyboardShortcutsOptions

Defined in: [types/keyboard.ts:61](https://github.com/Hack23/cia-compliance-manager/blob/38f6f5c07abe26db22d63c793ea812e50d687ce5/src/types/keyboard.ts#L61)

Props for keyboard shortcut hook

## Properties

### enabled?

> `optional` **enabled**: `boolean`

Defined in: [types/keyboard.ts:66](https://github.com/Hack23/cia-compliance-manager/blob/38f6f5c07abe26db22d63c793ea812e50d687ce5/src/types/keyboard.ts#L66)

Whether shortcuts are enabled

***

### preventDefault?

> `optional` **preventDefault**: `boolean`

Defined in: [types/keyboard.ts:69](https://github.com/Hack23/cia-compliance-manager/blob/38f6f5c07abe26db22d63c793ea812e50d687ce5/src/types/keyboard.ts#L69)

Prevent default browser behavior

***

### shortcuts

> **shortcuts**: [`ShortcutMap`](../type-aliases/ShortcutMap.md)

Defined in: [types/keyboard.ts:63](https://github.com/Hack23/cia-compliance-manager/blob/38f6f5c07abe26db22d63c793ea812e50d687ce5/src/types/keyboard.ts#L63)

Map of shortcuts to register

***

### stopPropagation?

> `optional` **stopPropagation**: `boolean`

Defined in: [types/keyboard.ts:72](https://github.com/Hack23/cia-compliance-manager/blob/38f6f5c07abe26db22d63c793ea812e50d687ce5/src/types/keyboard.ts#L72)

Stop event propagation
