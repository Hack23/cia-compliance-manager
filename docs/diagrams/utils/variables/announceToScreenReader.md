[**CIA Compliance Manager Diagrams v1.1.14**](../../README.md)

***

[CIA Compliance Manager Diagrams](../../modules.md) / [utils](../README.md) / announceToScreenReader

# Variable: announceToScreenReader()

> **announceToScreenReader**: (`message`, `politeness`) => `void`

Defined in: [utils/index.ts:49](https://github.com/Hack23/cia-compliance-manager/blob/2572cfa2ede06cc7942019b0f742928ad9d5ceb3/src/utils/index.ts#L49)

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
