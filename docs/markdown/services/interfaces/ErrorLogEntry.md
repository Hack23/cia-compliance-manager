[**CIA Compliance Manager Documentation v1.1.1**](../../README.md)

***

[CIA Compliance Manager Documentation](../../modules.md) / [services](../README.md) / ErrorLogEntry

# Interface: ErrorLogEntry

Defined in: [services/errorService.ts:47](https://github.com/Hack23/cia-compliance-manager/blob/1ebf341a32b3e817927a60b7d1a0904ca94c68ff/src/services/errorService.ts#L47)

Error log entry structure

## Properties

### context?

> `optional` **context**: [`ErrorContext`](ErrorContext.md)

Defined in: [services/errorService.ts:53](https://github.com/Hack23/cia-compliance-manager/blob/1ebf341a32b3e817927a60b7d1a0904ca94c68ff/src/services/errorService.ts#L53)

Error context

***

### message

> **message**: `string`

Defined in: [services/errorService.ts:49](https://github.com/Hack23/cia-compliance-manager/blob/1ebf341a32b3e817927a60b7d1a0904ca94c68ff/src/services/errorService.ts#L49)

Error message

***

### recoverable

> **recoverable**: `boolean`

Defined in: [services/errorService.ts:61](https://github.com/Hack23/cia-compliance-manager/blob/1ebf341a32b3e817927a60b7d1a0904ca94c68ff/src/services/errorService.ts#L61)

Whether the error is recoverable

***

### severity

> **severity**: [`ErrorSeverity`](../enumerations/ErrorSeverity.md)

Defined in: [services/errorService.ts:51](https://github.com/Hack23/cia-compliance-manager/blob/1ebf341a32b3e817927a60b7d1a0904ca94c68ff/src/services/errorService.ts#L51)

Error severity

***

### stack?

> `optional` **stack**: `string`

Defined in: [services/errorService.ts:55](https://github.com/Hack23/cia-compliance-manager/blob/1ebf341a32b3e817927a60b7d1a0904ca94c68ff/src/services/errorService.ts#L55)

Error stack trace

***

### timestamp

> **timestamp**: `string`

Defined in: [services/errorService.ts:57](https://github.com/Hack23/cia-compliance-manager/blob/1ebf341a32b3e817927a60b7d1a0904ca94c68ff/src/services/errorService.ts#L57)

Timestamp

***

### userMessage

> **userMessage**: `string`

Defined in: [services/errorService.ts:59](https://github.com/Hack23/cia-compliance-manager/blob/1ebf341a32b3e817927a60b7d1a0904ca94c68ff/src/services/errorService.ts#L59)

User-friendly message
