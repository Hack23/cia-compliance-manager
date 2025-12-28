[**CIA Compliance Manager Documentation v1.1.0**](../../README.md)

***

[CIA Compliance Manager Documentation](../../modules.md) / [services](../README.md) / createCalculationError

# Function: createCalculationError()

> **createCalculationError**(`message`, `context`, `cause?`): [`ServiceError`](../classes/ServiceError.md)

Defined in: [services/errors.ts:223](https://github.com/Hack23/cia-compliance-manager/blob/c466031910d76c5cbb596249d801f7ed60a95e63/src/services/errors.ts#L223)

Create a calculation error

## Parameters

### message

`string`

Error message

### context

[`ErrorContext`](../interfaces/ErrorContext.md) = `{}`

Error context

### cause?

`Error`

Original error

## Returns

[`ServiceError`](../classes/ServiceError.md)

ServiceError instance
