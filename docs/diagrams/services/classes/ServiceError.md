[**CIA Compliance Manager Diagrams v1.1.11**](../../README.md)

***

[CIA Compliance Manager Diagrams](../../modules.md) / [services](../README.md) / ServiceError

# Class: ServiceError

Defined in: [services/errors.ts:73](https://github.com/Hack23/cia-compliance-manager/blob/bdceac647232fcd21e28eab47eb85ed4588b8e2a/src/services/errors.ts#L73)

Custom error class for service operations

Provides structured error information with error codes and context
for better debugging and error handling.

## Extends

- `Error`

## Constructors

### Constructor

> **new ServiceError**(`message`, `code`, `context`, `cause?`): `ServiceError`

Defined in: [services/errors.ts:102](https://github.com/Hack23/cia-compliance-manager/blob/bdceac647232fcd21e28eab47eb85ed4588b8e2a/src/services/errors.ts#L102)

Create a new ServiceError

#### Parameters

##### message

`string`

Human-readable error message

##### code

[`ServiceErrorCode`](../enumerations/ServiceErrorCode.md) = `ServiceErrorCode.INTERNAL_ERROR`

Error code for categorization

##### context

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

### cause?

> `readonly` `optional` **cause**: `Error`

Defined in: [services/errors.ts:87](https://github.com/Hack23/cia-compliance-manager/blob/bdceac647232fcd21e28eab47eb85ed4588b8e2a/src/services/errors.ts#L87)

Original error that caused this error (if any)

#### Overrides

`Error.cause`

***

### code

> `readonly` **code**: [`ServiceErrorCode`](../enumerations/ServiceErrorCode.md)

Defined in: [services/errors.ts:77](https://github.com/Hack23/cia-compliance-manager/blob/bdceac647232fcd21e28eab47eb85ed4588b8e2a/src/services/errors.ts#L77)

Error code for categorization

***

### context

> `readonly` **context**: [`ErrorContext`](../interfaces/ErrorContext.md)

Defined in: [services/errors.ts:82](https://github.com/Hack23/cia-compliance-manager/blob/bdceac647232fcd21e28eab47eb85ed4588b8e2a/src/services/errors.ts#L82)

Context information about the error

***

### timestamp

> `readonly` **timestamp**: `Date`

Defined in: [services/errors.ts:92](https://github.com/Hack23/cia-compliance-manager/blob/bdceac647232fcd21e28eab47eb85ed4588b8e2a/src/services/errors.ts#L92)

Timestamp when the error occurred

## Methods

### getFormattedMessage()

> **getFormattedMessage**(): `string`

Defined in: [services/errors.ts:126](https://github.com/Hack23/cia-compliance-manager/blob/bdceac647232fcd21e28eab47eb85ed4588b8e2a/src/services/errors.ts#L126)

Get a formatted error message with context

#### Returns

`string`

Formatted error message

***

### toJSON()

> **toJSON**(): `Record`\<`string`, `unknown`\>

Defined in: [services/errors.ts:166](https://github.com/Hack23/cia-compliance-manager/blob/bdceac647232fcd21e28eab47eb85ed4588b8e2a/src/services/errors.ts#L166)

Convert error to JSON for logging

#### Returns

`Record`\<`string`, `unknown`\>

JSON representation of the error
