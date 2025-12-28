[**CIA Compliance Manager Documentation v1.1.1**](../../README.md)

***

[CIA Compliance Manager Documentation](../../modules.md) / [services](../README.md) / ErrorContext

# Interface: ErrorContext

Defined in: [services/errors.ts:54](https://github.com/Hack23/cia-compliance-manager/blob/1ebf341a32b3e817927a60b7d1a0904ca94c68ff/src/services/errors.ts#L54)

Context information for errors

## Indexable

\[`key`: `string`\]: `unknown`

Additional context information

## Properties

### component?

> `optional` **component**: `string`

Defined in: [services/errors.ts:60](https://github.com/Hack23/cia-compliance-manager/blob/1ebf341a32b3e817927a60b7d1a0904ca94c68ff/src/services/errors.ts#L60)

Component being processed

***

### level?

> `optional` **level**: `string`

Defined in: [services/errors.ts:62](https://github.com/Hack23/cia-compliance-manager/blob/1ebf341a32b3e817927a60b7d1a0904ca94c68ff/src/services/errors.ts#L62)

Security level being processed

***

### method?

> `optional` **method**: `string`

Defined in: [services/errors.ts:58](https://github.com/Hack23/cia-compliance-manager/blob/1ebf341a32b3e817927a60b7d1a0904ca94c68ff/src/services/errors.ts#L58)

Method that generated the error

***

### service?

> `optional` **service**: `string`

Defined in: [services/errors.ts:56](https://github.com/Hack23/cia-compliance-manager/blob/1ebf341a32b3e817927a60b7d1a0904ca94c68ff/src/services/errors.ts#L56)

Service that generated the error
