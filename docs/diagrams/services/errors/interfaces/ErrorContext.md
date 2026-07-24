[**CIA Compliance Manager — UML Diagrams v1.1.118**](../../../README.md)

***

[CIA Compliance Manager — UML Diagrams](../../../modules.md) / [services/errors](../README.md) / ErrorContext

# Interface: ErrorContext

Defined in: [services/errors.ts:48](https://github.com/Hack23/cia-compliance-manager/blob/191e4152219d006312588704a3d133d539cb2315/src/services/errors.ts#L48)

Context information for errors

## Indexable

> \[`key`: `string`\]: `unknown`

Additional context information

## Properties

### service?

> `optional` **service?**: `string`

Defined in: [services/errors.ts:50](https://github.com/Hack23/cia-compliance-manager/blob/191e4152219d006312588704a3d133d539cb2315/src/services/errors.ts#L50)

Service that generated the error

***

### method?

> `optional` **method?**: `string`

Defined in: [services/errors.ts:52](https://github.com/Hack23/cia-compliance-manager/blob/191e4152219d006312588704a3d133d539cb2315/src/services/errors.ts#L52)

Method that generated the error

***

### component?

> `optional` **component?**: `string`

Defined in: [services/errors.ts:54](https://github.com/Hack23/cia-compliance-manager/blob/191e4152219d006312588704a3d133d539cb2315/src/services/errors.ts#L54)

Component being processed

***

### level?

> `optional` **level?**: `string`

Defined in: [services/errors.ts:56](https://github.com/Hack23/cia-compliance-manager/blob/191e4152219d006312588704a3d133d539cb2315/src/services/errors.ts#L56)

Security level being processed
