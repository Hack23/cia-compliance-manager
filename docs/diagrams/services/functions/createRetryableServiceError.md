[**CIA Compliance Manager Diagrams v1.1.18**](../../README.md)

***

[CIA Compliance Manager Diagrams](../../modules.md) / [services](../README.md) / createRetryableServiceError

# Function: createRetryableServiceError()

> **createRetryableServiceError**(`message`, `retryAfter?`, `context?`): [`ServiceError`](../classes/ServiceError.md)

Defined in: [services/errors.ts:316](https://github.com/Hack23/cia-compliance-manager/blob/2d08eaf26d0d9c6e1af02c3b8ecb25ccff2a6aff/src/services/errors.ts#L316)

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
