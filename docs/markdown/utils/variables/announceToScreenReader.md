[**CIA Compliance Manager Documentation v1.1.22**](../../README.md)

***

[CIA Compliance Manager Documentation](../../modules.md) / [utils](../README.md) / announceToScreenReader

# Variable: announceToScreenReader()

> **announceToScreenReader**: (`message`, `politeness`) => `void`

Defined in: [utils/index.ts:49](https://github.com/Hack23/cia-compliance-manager/blob/83ec4592971af1db133b76cbdcec3934063462f5/src/utils/index.ts#L49)

Announce a message to screen readers using ARIA live region
Uses a singleton live region to prevent duplicate announcements

## Parameters

### message

`string`

Message to announce

### politeness?

ARIA live politeness level

`"polite"` | `"assertive"`

## Returns

`void`
