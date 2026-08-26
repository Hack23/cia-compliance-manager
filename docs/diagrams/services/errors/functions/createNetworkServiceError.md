[**CIA Compliance Manager — UML Diagrams v1.1.139**](../../../README.md)

***

[CIA Compliance Manager — UML Diagrams](../../../modules.md) / [services/errors](../README.md) / createNetworkServiceError

# Function: createNetworkServiceError()

> **createNetworkServiceError**(`message`, `statusCode?`, `context?`): [`ServiceError`](../classes/ServiceError.md)

Defined in: [services/errors.ts:289](https://github.com/Hack23/cia-compliance-manager/blob/fb48405c6b6b18111764c7bebe65fc8cb86df743/src/services/errors.ts#L289)

Create a network error using ServiceError

## Parameters

### message

`string`

Error message

### statusCode?

`number`

Optional HTTP status code

### context?

[`ErrorContext`](../interfaces/ErrorContext.md) = `{}`

Additional error context

## Returns

[`ServiceError`](../classes/ServiceError.md)

ServiceError instance
