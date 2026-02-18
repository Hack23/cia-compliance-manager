[**CIA Compliance Manager Documentation v1.1.20**](../../README.md)

***

[CIA Compliance Manager Documentation](../../modules.md) / [services](../README.md) / createValidationServiceError

# Function: createValidationServiceError()

> **createValidationServiceError**(`message`, `field?`, `context?`): [`ServiceError`](../classes/ServiceError.md)

Defined in: [services/errors.ts:276](https://github.com/Hack23/cia-compliance-manager/blob/c2ee7b2fcb69460ebb29176ad9c216fcb0830779/src/services/errors.ts#L276)

Create a validation error using ServiceError

## Parameters

### message

`string`

Error message

### field?

`string`

Optional field name that failed validation

### context?

[`ErrorContext`](../interfaces/ErrorContext.md) = `{}`

Additional error context

## Returns

[`ServiceError`](../classes/ServiceError.md)

ServiceError instance
