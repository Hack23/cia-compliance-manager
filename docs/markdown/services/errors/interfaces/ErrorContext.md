[**CIA Compliance Manager — Markdown Documentation v1.1.34**](../../../README.md)

***

[CIA Compliance Manager — Markdown Documentation](../../../modules.md) / [services/errors](../README.md) / ErrorContext

# Interface: ErrorContext

Defined in: [services/errors.ts:54](https://github.com/Hack23/cia-compliance-manager/blob/bf8189075bc86cb5a8999dce70d7c9c39852b616/src/services/errors.ts#L54)

Context information for errors

## Indexable

> \[`key`: `string`\]: `unknown`

Additional context information

## Properties

### service?

> `optional` **service?**: `string`

Defined in: [services/errors.ts:56](https://github.com/Hack23/cia-compliance-manager/blob/bf8189075bc86cb5a8999dce70d7c9c39852b616/src/services/errors.ts#L56)

Service that generated the error

***

### method?

> `optional` **method?**: `string`

Defined in: [services/errors.ts:58](https://github.com/Hack23/cia-compliance-manager/blob/bf8189075bc86cb5a8999dce70d7c9c39852b616/src/services/errors.ts#L58)

Method that generated the error

***

### component?

> `optional` **component?**: `string`

Defined in: [services/errors.ts:60](https://github.com/Hack23/cia-compliance-manager/blob/bf8189075bc86cb5a8999dce70d7c9c39852b616/src/services/errors.ts#L60)

Component being processed

***

### level?

> `optional` **level?**: `string`

Defined in: [services/errors.ts:62](https://github.com/Hack23/cia-compliance-manager/blob/bf8189075bc86cb5a8999dce70d7c9c39852b616/src/services/errors.ts#L62)

Security level being processed
