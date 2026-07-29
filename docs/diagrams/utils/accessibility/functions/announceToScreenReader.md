[**CIA Compliance Manager — UML Diagrams v1.1.122**](../../../README.md)

***

[CIA Compliance Manager — UML Diagrams](../../../modules.md) / [utils/accessibility](../README.md) / announceToScreenReader

# Function: announceToScreenReader()

> **announceToScreenReader**(`message`, `politeness?`): `void`

Defined in: [utils/accessibility.ts:537](https://github.com/Hack23/cia-compliance-manager/blob/fdbd0224f5e379f45807637facf704ea40d9b47d/src/utils/accessibility.ts#L537)

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
