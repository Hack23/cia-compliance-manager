[**CIA Compliance Manager — UML Diagrams v1.1.158**](../../README.md)

***

[CIA Compliance Manager — UML Diagrams](../../modules.md) / [utils](../README.md) / announceToScreenReader

# Variable: announceToScreenReader

> **announceToScreenReader**: (`message`, `politeness`) => `void`

Defined in: [utils/index.ts:43](https://github.com/Hack23/cia-compliance-manager/blob/65d61d3ef115f9c7c0045d3370762b4013c56a97/src/utils/index.ts#L43)

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
