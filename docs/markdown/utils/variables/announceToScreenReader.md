[**CIA Compliance Manager Documentation v1.1.16**](../../README.md)

***

[CIA Compliance Manager Documentation](../../modules.md) / [utils](../README.md) / announceToScreenReader

# Variable: announceToScreenReader()

> **announceToScreenReader**: (`message`, `politeness`) => `void`

Defined in: [utils/index.ts:49](https://github.com/Hack23/cia-compliance-manager/blob/08d981d9d23db94df1debc77186c22027f4d896e/src/utils/index.ts#L49)

Announce a message to screen readers using ARIA live region
Uses a singleton live region to prevent duplicate announcements

## Parameters

### message

`string`

Message to announce

### politeness

ARIA live politeness level

`"polite"` | `"assertive"`

## Returns

`void`
