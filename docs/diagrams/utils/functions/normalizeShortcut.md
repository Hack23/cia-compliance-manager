[**CIA Compliance Manager Diagrams v1.1.26**](../../README.md)

***

[CIA Compliance Manager Diagrams](../../modules.md) / [utils](../README.md) / normalizeShortcut

# Function: normalizeShortcut()

> **normalizeShortcut**(`shortcut`): `string`

Defined in: [utils/keyboardUtils.ts:234](https://github.com/Hack23/cia-compliance-manager/blob/5f2722b27ad5a860c0c32d7458a8ddb0e3dddde9/src/utils/keyboardUtils.ts#L234)

Normalize shortcut string for comparison

Maintains the canonical modifier key order (ctrl, cmd, meta, shift, alt)
to ensure consistent matching with getKeyCombination output.

## Parameters

### shortcut

`string`

The shortcut string (e.g., 'Ctrl+K', 'cmd+k')

## Returns

`string`

Normalized shortcut string
