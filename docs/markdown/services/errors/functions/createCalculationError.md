[**CIA Compliance Manager — Markdown Documentation v1.1.154**](../../../README.md)

***

[CIA Compliance Manager — Markdown Documentation](../../../modules.md) / [services/errors](../README.md) / createCalculationError

# Function: createCalculationError()

> **createCalculationError**(`message`, `context?`, `cause?`): [`ServiceError`](../classes/ServiceError.md)

Defined in: [services/errors.ts:216](https://github.com/Hack23/cia-compliance-manager/blob/42e66b46977944fe728f624a83223bbbb90a81b2/src/services/errors.ts#L216)

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
