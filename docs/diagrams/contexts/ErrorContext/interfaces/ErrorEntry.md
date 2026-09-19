[**CIA Compliance Manager — UML Diagrams v1.1.150**](../../../README.md)

***

[CIA Compliance Manager — UML Diagrams](../../../modules.md) / [contexts/ErrorContext](../README.md) / ErrorEntry

# Interface: ErrorEntry

Defined in: [contexts/ErrorContext.tsx:27](https://github.com/Hack23/cia-compliance-manager/blob/dd6bd7695fe8d1d3efd6e251f39a0fbab3b0db3c/src/contexts/ErrorContext.tsx#L27)

Error entry for tracking errors

## Properties

### id

> **id**: `string`

Defined in: [contexts/ErrorContext.tsx:29](https://github.com/Hack23/cia-compliance-manager/blob/dd6bd7695fe8d1d3efd6e251f39a0fbab3b0db3c/src/contexts/ErrorContext.tsx#L29)

Unique error ID

***

### error

> **error**: `Error`

Defined in: [contexts/ErrorContext.tsx:31](https://github.com/Hack23/cia-compliance-manager/blob/dd6bd7695fe8d1d3efd6e251f39a0fbab3b0db3c/src/contexts/ErrorContext.tsx#L31)

Error object

***

### message

> **message**: `string`

Defined in: [contexts/ErrorContext.tsx:33](https://github.com/Hack23/cia-compliance-manager/blob/dd6bd7695fe8d1d3efd6e251f39a0fbab3b0db3c/src/contexts/ErrorContext.tsx#L33)

User-friendly error message

***

### timestamp

> **timestamp**: `Date`

Defined in: [contexts/ErrorContext.tsx:35](https://github.com/Hack23/cia-compliance-manager/blob/dd6bd7695fe8d1d3efd6e251f39a0fbab3b0db3c/src/contexts/ErrorContext.tsx#L35)

Error timestamp

***

### recoverable

> **recoverable**: `boolean`

Defined in: [contexts/ErrorContext.tsx:37](https://github.com/Hack23/cia-compliance-manager/blob/dd6bd7695fe8d1d3efd6e251f39a0fbab3b0db3c/src/contexts/ErrorContext.tsx#L37)

Whether the error is recoverable

***

### context?

> `optional` **context?**: `Record`\<`string`, `unknown`\>

Defined in: [contexts/ErrorContext.tsx:39](https://github.com/Hack23/cia-compliance-manager/blob/dd6bd7695fe8d1d3efd6e251f39a0fbab3b0db3c/src/contexts/ErrorContext.tsx#L39)

Error context
