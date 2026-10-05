[**CIA Compliance Manager — UML Diagrams v1.1.160**](../../README.md)

***

[CIA Compliance Manager — UML Diagrams](../../modules.md) / [utils](../README.md) / formatDate

# Variable: formatDate

> **formatDate**: (`date`, `options`) => `string`

Defined in: [utils/index.ts:82](https://github.com/Hack23/cia-compliance-manager/blob/65d80050336fcb6ec803a647b772abde27cf817d/src/utils/index.ts#L82)

Formats a date using the browser's local formatting

## Business Perspective

Consistent date formatting improves the readability of audit records,
compliance documentation, and implementation timelines. 📅

## Parameters

### date

`string` \| `Date`

Date object or string to format

### options?

`DateTimeFormatOptions` = `...`

Date formatting options

## Returns

`string`

Formatted date string
