[**CIA Compliance Manager — UML Diagrams v1.1.154**](../../../README.md)

***

[CIA Compliance Manager — UML Diagrams](../../../modules.md) / [services/errors](../README.md) / createNetworkServiceError

# Function: createNetworkServiceError()

> **createNetworkServiceError**(`message`, `statusCode?`, `context?`): [`ServiceError`](../classes/ServiceError.md)

Defined in: [services/errors.ts:289](https://github.com/Hack23/cia-compliance-manager/blob/42e66b46977944fe728f624a83223bbbb90a81b2/src/services/errors.ts#L289)

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
