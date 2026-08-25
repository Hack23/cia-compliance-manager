[**CIA Compliance Manager — Markdown Documentation v1.1.138**](../../../README.md)

***

[CIA Compliance Manager — Markdown Documentation](../../../modules.md) / [utils/accessibility](../README.md) / meetsContrastRequirement

# Function: meetsContrastRequirement()

> **meetsContrastRequirement**(`foreground`, `background`, `isLargeText?`): `boolean`

Defined in: [utils/accessibility.ts:579](https://github.com/Hack23/cia-compliance-manager/blob/daf6e30357f2f03bad3af17a53802a86917ac171/src/utils/accessibility.ts#L579)

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
