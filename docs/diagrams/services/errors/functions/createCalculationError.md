[**CIA Compliance Manager — UML Diagrams v1.1.111**](../../../README.md)

***

[CIA Compliance Manager — UML Diagrams](../../../modules.md) / [services/errors](../README.md) / createCalculationError

# Function: createCalculationError()

> **createCalculationError**(`message`, `context?`, `cause?`): [`ServiceError`](../classes/ServiceError.md)

Defined in: [services/errors.ts:216](https://github.com/Hack23/cia-compliance-manager/blob/9d682528d83baaf05162deecb226a0ab8890288b/src/services/errors.ts#L216)

Create a calculation error

## Parameters

### message

`string`

Error message

### context?

[`ErrorContext`](../interfaces/ErrorContext.md) = `{}`

Error context

### cause?

`Error`

Original error

## Returns

[`ServiceError`](../classes/ServiceError.md)

ServiceError instance
