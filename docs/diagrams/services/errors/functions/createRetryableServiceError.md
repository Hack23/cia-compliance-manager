[**CIA Compliance Manager — UML Diagrams v1.1.145**](../../../README.md)

***

[CIA Compliance Manager — UML Diagrams](../../../modules.md) / [services/errors](../README.md) / createRetryableServiceError

# Function: createRetryableServiceError()

> **createRetryableServiceError**(`message`, `retryAfter?`, `context?`): [`ServiceError`](../classes/ServiceError.md)

Defined in: [services/errors.ts:309](https://github.com/Hack23/cia-compliance-manager/blob/e8b8789c3ea5737cab3df6126d8fdc4996ba04a5/src/services/errors.ts#L309)

Create a retryable error using ServiceError

## Parameters

### message

`string`

Error message

### retryAfter?

`number`

Optional retry delay in seconds

### context?

[`ErrorContext`](../interfaces/ErrorContext.md) = `{}`

Additional error context

## Returns

[`ServiceError`](../classes/ServiceError.md)

ServiceError instance
