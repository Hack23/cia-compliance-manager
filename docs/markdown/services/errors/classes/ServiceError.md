[**CIA Compliance Manager — Markdown Documentation v1.1.121**](../../../README.md)

***

[CIA Compliance Manager — Markdown Documentation](../../../modules.md) / [services/errors](../README.md) / ServiceError

# Class: ServiceError

Defined in: [services/errors.ts:67](https://github.com/Hack23/cia-compliance-manager/blob/5fee1bc4aabc01ca6dd59fb34a80389334401588/src/services/errors.ts#L67)

Custom error class for service operations

Provides structured error information with error codes and context
for better debugging and error handling.

## Extends

- `Error`

## Constructors

### Constructor

> **new ServiceError**(`message`, `code?`, `context?`, `cause?`): `ServiceError`

Defined in: [services/errors.ts:96](https://github.com/Hack23/cia-compliance-manager/blob/5fee1bc4aabc01ca6dd59fb34a80389334401588/src/services/errors.ts#L96)

Create a new ServiceError

#### Parameters

##### message

`string`

Human-readable error message

##### code?

[`ServiceErrorCode`](../enumerations/ServiceErrorCode.md) = `ServiceErrorCode.INTERNAL_ERROR`

Error code for categorization

##### context?

[`ErrorContext`](../interfaces/ErrorContext.md) = `{}`

Additional context information

##### cause?

`Error`

Original error that caused this error

#### Returns

`ServiceError`

#### Overrides

`Error.constructor`

## Properties

### code

> `readonly` **code**: [`ServiceErrorCode`](../enumerations/ServiceErrorCode.md)

Defined in: [services/errors.ts:71](https://github.com/Hack23/cia-compliance-manager/blob/5fee1bc4aabc01ca6dd59fb34a80389334401588/src/services/errors.ts#L71)

Error code for categorization

***

### context

> `readonly` **context**: [`ErrorContext`](../interfaces/ErrorContext.md)

Defined in: [services/errors.ts:76](https://github.com/Hack23/cia-compliance-manager/blob/5fee1bc4aabc01ca6dd59fb34a80389334401588/src/services/errors.ts#L76)

Context information about the error

***

### cause?

> `readonly` `optional` **cause?**: `Error`

Defined in: [services/errors.ts:81](https://github.com/Hack23/cia-compliance-manager/blob/5fee1bc4aabc01ca6dd59fb34a80389334401588/src/services/errors.ts#L81)

Original error that caused this error (if any)

#### Overrides

`Error.cause`

***

### timestamp

> `readonly` **timestamp**: `Date`

Defined in: [services/errors.ts:86](https://github.com/Hack23/cia-compliance-manager/blob/5fee1bc4aabc01ca6dd59fb34a80389334401588/src/services/errors.ts#L86)

Timestamp when the error occurred

## Methods

### getFormattedMessage()

> **getFormattedMessage**(): `string`

Defined in: [services/errors.ts:119](https://github.com/Hack23/cia-compliance-manager/blob/5fee1bc4aabc01ca6dd59fb34a80389334401588/src/services/errors.ts#L119)

Get a formatted error message with context

#### Returns

`string`

Formatted error message

***

### toJSON()

> **toJSON**(): `Record`\<`string`, `unknown`\>

Defined in: [services/errors.ts:159](https://github.com/Hack23/cia-compliance-manager/blob/5fee1bc4aabc01ca6dd59fb34a80389334401588/src/services/errors.ts#L159)

Convert error to JSON for logging

#### Returns

`Record`\<`string`, `unknown`\>

JSON representation of the error
