[**CIA Compliance Manager Documentation v1.1.18**](../../README.md)

***

[CIA Compliance Manager Documentation](../../modules.md) / [utils](../README.md) / getPlatformShortcut

# Function: getPlatformShortcut()

> **getPlatformShortcut**(`defaultKeys`, `platformKeys?`): `string`

Defined in: [utils/keyboardUtils.ts:383](https://github.com/Hack23/cia-compliance-manager/blob/2d08eaf26d0d9c6e1af02c3b8ecb25ccff2a6aff/src/utils/keyboardUtils.ts#L383)

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
