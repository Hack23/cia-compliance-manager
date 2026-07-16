[**CIA Compliance Manager — Markdown Documentation v1.1.111**](../../../README.md)

***

[CIA Compliance Manager — Markdown Documentation](../../../modules.md) / [utils/accessibility](../README.md) / announceToScreenReader

# Function: announceToScreenReader()

> **announceToScreenReader**(`message`, `politeness?`): `void`

Defined in: [utils/accessibility.ts:537](https://github.com/Hack23/cia-compliance-manager/blob/9d682528d83baaf05162deecb226a0ab8890288b/src/utils/accessibility.ts#L537)

Announce a message to screen readers using ARIA live region
Uses a singleton live region to prevent duplicate announcements

## Parameters

### message

`string`

Message to announce

### politeness?

`"polite"` \| `"assertive"`

ARIA live politeness level

## Returns

`void`
