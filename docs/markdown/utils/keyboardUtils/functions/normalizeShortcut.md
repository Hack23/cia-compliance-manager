[**CIA Compliance Manager — Markdown Documentation v1.1.132**](../../../README.md)

***

[CIA Compliance Manager — Markdown Documentation](../../../modules.md) / [utils/keyboardUtils](../README.md) / normalizeShortcut

# Function: normalizeShortcut()

> **normalizeShortcut**(`shortcut`): `string`

Defined in: [utils/keyboardUtils.ts:227](https://github.com/Hack23/cia-compliance-manager/blob/18c7e9fa5b86ac2162df1bb4c2600dea2227dddb/src/utils/keyboardUtils.ts#L227)

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
