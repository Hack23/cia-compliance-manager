[**CIA Compliance Manager — Markdown Documentation v1.1.123**](../../../README.md)

***

[CIA Compliance Manager — Markdown Documentation](../../../modules.md) / [utils/accessibility](../README.md) / announceToScreenReader

# Function: announceToScreenReader()

> **announceToScreenReader**(`message`, `politeness?`): `void`

Defined in: [utils/accessibility.ts:537](https://github.com/Hack23/cia-compliance-manager/blob/d6e41548f5230c63e532615fc0f3bd3c247b6b44/src/utils/accessibility.ts#L537)

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
