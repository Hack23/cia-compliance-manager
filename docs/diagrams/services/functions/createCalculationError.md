[**CIA Compliance Manager Diagrams v1.1.10**](../../README.md)

***

[CIA Compliance Manager Diagrams](../../modules.md) / [services](../README.md) / createCalculationError

# Function: createCalculationError()

> **createCalculationError**(`message`, `context`, `cause?`): [`ServiceError`](../classes/ServiceError.md)

Defined in: [services/errors.ts:223](https://github.com/Hack23/cia-compliance-manager/blob/eb3dd66ffaf39f50db4da1b4d578d20d1c37a0b3/src/services/errors.ts#L223)

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
