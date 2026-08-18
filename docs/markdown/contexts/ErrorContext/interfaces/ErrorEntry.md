[**CIA Compliance Manager — Markdown Documentation v1.1.134**](../../../README.md)

***

[CIA Compliance Manager — Markdown Documentation](../../../modules.md) / [contexts/ErrorContext](../README.md) / ErrorEntry

# Interface: ErrorEntry

Defined in: [contexts/ErrorContext.tsx:27](https://github.com/Hack23/cia-compliance-manager/blob/2820a8c53c76a3379ee916ba05524fb0b49e359f/src/contexts/ErrorContext.tsx#L27)

Error entry for tracking errors

## Properties

### id

> **id**: `string`

Defined in: [contexts/ErrorContext.tsx:29](https://github.com/Hack23/cia-compliance-manager/blob/2820a8c53c76a3379ee916ba05524fb0b49e359f/src/contexts/ErrorContext.tsx#L29)

Unique error ID

***

### error

> **error**: `Error`

Defined in: [contexts/ErrorContext.tsx:31](https://github.com/Hack23/cia-compliance-manager/blob/2820a8c53c76a3379ee916ba05524fb0b49e359f/src/contexts/ErrorContext.tsx#L31)

Error object

***

### message

> **message**: `string`

Defined in: [contexts/ErrorContext.tsx:33](https://github.com/Hack23/cia-compliance-manager/blob/2820a8c53c76a3379ee916ba05524fb0b49e359f/src/contexts/ErrorContext.tsx#L33)

User-friendly error message

***

### timestamp

> **timestamp**: `Date`

Defined in: [contexts/ErrorContext.tsx:35](https://github.com/Hack23/cia-compliance-manager/blob/2820a8c53c76a3379ee916ba05524fb0b49e359f/src/contexts/ErrorContext.tsx#L35)

Error timestamp

***

### recoverable

> **recoverable**: `boolean`

Defined in: [contexts/ErrorContext.tsx:37](https://github.com/Hack23/cia-compliance-manager/blob/2820a8c53c76a3379ee916ba05524fb0b49e359f/src/contexts/ErrorContext.tsx#L37)

Whether the error is recoverable

***

### context?

> `optional` **context?**: `Record`\<`string`, `unknown`\>

Defined in: [contexts/ErrorContext.tsx:39](https://github.com/Hack23/cia-compliance-manager/blob/2820a8c53c76a3379ee916ba05524fb0b49e359f/src/contexts/ErrorContext.tsx#L39)

Error context
