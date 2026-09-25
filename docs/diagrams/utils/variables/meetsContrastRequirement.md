[**CIA Compliance Manager — UML Diagrams v1.1.153**](../../README.md)

***

[CIA Compliance Manager — UML Diagrams](../../modules.md) / [utils](../README.md) / meetsContrastRequirement

# Variable: meetsContrastRequirement

> **meetsContrastRequirement**: (`foreground`, `background`, `isLargeText`) => `boolean`

Defined in: [utils/index.ts:44](https://github.com/Hack23/cia-compliance-manager/blob/aae220a35b85217ac74b619cb9128300e38ff3a0/src/utils/index.ts#L44)

Check if element has sufficient color contrast
Note: This is a simplified check. Use dedicated tools for comprehensive testing.

## Parameters

### foreground

`string`

Foreground color (hex)

### background

`string`

Background color (hex)

### isLargeText?

`boolean` = `false`

Whether text is large (18pt+ or 14pt+ bold)

## Returns

`boolean`

Whether contrast meets WCAG AA standards

## Throws

Error if colors are invalid hex values
