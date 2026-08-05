[**CIA Compliance Manager — Markdown Documentation v1.1.127**](../../../README.md)

***

[CIA Compliance Manager — Markdown Documentation](../../../modules.md) / [services/errors](../README.md) / createNetworkServiceError

# Function: createNetworkServiceError()

> **createNetworkServiceError**(`message`, `statusCode?`, `context?`): [`ServiceError`](../classes/ServiceError.md)

Defined in: [services/errors.ts:289](https://github.com/Hack23/cia-compliance-manager/blob/b44ae23b82aba288e01694c3ce1c42a26c105d38/src/services/errors.ts#L289)

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
