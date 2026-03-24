[**CIA Compliance Manager — Markdown Documentation v1.1.34**](../../../README.md)

***

[CIA Compliance Manager — Markdown Documentation](../../../modules.md) / [services/errorService](../README.md) / ErrorLogEntry

# Interface: ErrorLogEntry

Defined in: [services/errorService.ts:47](https://github.com/Hack23/cia-compliance-manager/blob/bf8189075bc86cb5a8999dce70d7c9c39852b616/src/services/errorService.ts#L47)

Error log entry structure

## Properties

### message

> **message**: `string`

Defined in: [services/errorService.ts:49](https://github.com/Hack23/cia-compliance-manager/blob/bf8189075bc86cb5a8999dce70d7c9c39852b616/src/services/errorService.ts#L49)

Error message

***

### severity

> **severity**: [`ErrorSeverity`](../enumerations/ErrorSeverity.md)

Defined in: [services/errorService.ts:51](https://github.com/Hack23/cia-compliance-manager/blob/bf8189075bc86cb5a8999dce70d7c9c39852b616/src/services/errorService.ts#L51)

Error severity

***

### context?

> `optional` **context?**: [`ErrorContext`](../../errors/interfaces/ErrorContext.md)

Defined in: [services/errorService.ts:53](https://github.com/Hack23/cia-compliance-manager/blob/bf8189075bc86cb5a8999dce70d7c9c39852b616/src/services/errorService.ts#L53)

Error context

***

### stack?

> `optional` **stack?**: `string`

Defined in: [services/errorService.ts:55](https://github.com/Hack23/cia-compliance-manager/blob/bf8189075bc86cb5a8999dce70d7c9c39852b616/src/services/errorService.ts#L55)

Error stack trace

***

### timestamp

> **timestamp**: `string`

Defined in: [services/errorService.ts:57](https://github.com/Hack23/cia-compliance-manager/blob/bf8189075bc86cb5a8999dce70d7c9c39852b616/src/services/errorService.ts#L57)

Timestamp

***

### userMessage

> **userMessage**: `string`

Defined in: [services/errorService.ts:59](https://github.com/Hack23/cia-compliance-manager/blob/bf8189075bc86cb5a8999dce70d7c9c39852b616/src/services/errorService.ts#L59)

User-friendly message

***

### recoverable

> **recoverable**: `boolean`

Defined in: [services/errorService.ts:61](https://github.com/Hack23/cia-compliance-manager/blob/bf8189075bc86cb5a8999dce70d7c9c39852b616/src/services/errorService.ts#L61)

Whether the error is recoverable
