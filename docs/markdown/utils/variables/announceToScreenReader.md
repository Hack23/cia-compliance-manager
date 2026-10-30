[**CIA Compliance Manager — Markdown Documentation v1.1.168**](../../README.md)

***

[CIA Compliance Manager — Markdown Documentation](../../modules.md) / [utils](../README.md) / announceToScreenReader

# Variable: announceToScreenReader

> **announceToScreenReader**: (`message`, `politeness`) => `void`

Defined in: [utils/index.ts:43](https://github.com/Hack23/cia-compliance-manager/blob/820d7a4fb23f28f59c88e35c49e2e30ecd03cd0d/src/utils/index.ts#L43)

Announce a message to screen readers using ARIA live region
Uses a singleton live region to prevent duplicate announcements

## Parameters

### message

`string`

Message to announce

### politeness?

`"polite"` \| `"assertive"` = `'polite'`

ARIA live politeness level

## Returns

`void`
