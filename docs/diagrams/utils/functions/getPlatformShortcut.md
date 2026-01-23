[**CIA Compliance Manager Diagrams v1.1.12**](../../README.md)

***

[CIA Compliance Manager Diagrams](../../modules.md) / [utils](../README.md) / getPlatformShortcut

# Function: getPlatformShortcut()

> **getPlatformShortcut**(`defaultKeys`, `platformKeys?`): `string`

Defined in: [utils/keyboardUtils.ts:383](https://github.com/Hack23/cia-compliance-manager/blob/2fe41170de20f6c4fdd8b4b044dd9ce34202b4fe/src/utils/keyboardUtils.ts#L383)

Get keyboard shortcut for current platform

## Parameters

### defaultKeys

`string`

Default key combination

### platformKeys?

`Partial`\<`Record`\<[`Platform`](../../types/type-aliases/Platform.md), `string`\>\>

Platform-specific overrides

## Returns

`string`

Key combination for current platform
