[**CIA Compliance Manager Documentation v1.1.12**](../../README.md)

***

[CIA Compliance Manager Documentation](../../modules.md) / [services](../README.md) / ErrorLogEntry

# Interface: ErrorLogEntry

Defined in: [services/errorService.ts:47](https://github.com/Hack23/cia-compliance-manager/blob/2fe41170de20f6c4fdd8b4b044dd9ce34202b4fe/src/services/errorService.ts#L47)

Error log entry structure

## Properties

### context?

> `optional` **context**: [`ErrorContext`](ErrorContext.md)

Defined in: [services/errorService.ts:53](https://github.com/Hack23/cia-compliance-manager/blob/2fe41170de20f6c4fdd8b4b044dd9ce34202b4fe/src/services/errorService.ts#L53)

Error context

***

### message

> **message**: `string`

Defined in: [services/errorService.ts:49](https://github.com/Hack23/cia-compliance-manager/blob/2fe41170de20f6c4fdd8b4b044dd9ce34202b4fe/src/services/errorService.ts#L49)

Error message

***

### recoverable

> **recoverable**: `boolean`

Defined in: [services/errorService.ts:61](https://github.com/Hack23/cia-compliance-manager/blob/2fe41170de20f6c4fdd8b4b044dd9ce34202b4fe/src/services/errorService.ts#L61)

Whether the error is recoverable

***

### severity

> **severity**: [`ErrorSeverity`](../enumerations/ErrorSeverity.md)

Defined in: [services/errorService.ts:51](https://github.com/Hack23/cia-compliance-manager/blob/2fe41170de20f6c4fdd8b4b044dd9ce34202b4fe/src/services/errorService.ts#L51)

Error severity

***

### stack?

> `optional` **stack**: `string`

Defined in: [services/errorService.ts:55](https://github.com/Hack23/cia-compliance-manager/blob/2fe41170de20f6c4fdd8b4b044dd9ce34202b4fe/src/services/errorService.ts#L55)

Error stack trace

***

### timestamp

> **timestamp**: `string`

Defined in: [services/errorService.ts:57](https://github.com/Hack23/cia-compliance-manager/blob/2fe41170de20f6c4fdd8b4b044dd9ce34202b4fe/src/services/errorService.ts#L57)

Timestamp

***

### userMessage

> **userMessage**: `string`

Defined in: [services/errorService.ts:59](https://github.com/Hack23/cia-compliance-manager/blob/2fe41170de20f6c4fdd8b4b044dd9ce34202b4fe/src/services/errorService.ts#L59)

User-friendly message
