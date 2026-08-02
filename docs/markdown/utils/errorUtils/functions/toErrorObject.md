[**CIA Compliance Manager — Markdown Documentation v1.1.125**](../../../README.md)

***

[CIA Compliance Manager — Markdown Documentation](../../../modules.md) / [utils/errorUtils](../README.md) / toErrorObject

# Function: toErrorObject()

> **toErrorObject**(`err`): `Error`

Defined in: [utils/errorUtils.ts:60](https://github.com/Hack23/cia-compliance-manager/blob/d9b35b5e30691338e6477d6720a70864ae43ae9b/src/utils/errorUtils.ts#L60)

Converts any error value to an Error object

Handles various error types including Error objects, objects with message
properties, strings, and other primitives. Essential for consistent error
handling across the application.

## Parameters

### err

`unknown`

The error value to convert (can be any type)

## Returns

`Error`

An Error object with appropriate message

## Example

```typescript
// Convert Error object (passthrough)
toErrorObject(new Error('Failed'))  // Error: Failed

// Convert string
toErrorObject('Network timeout')    // Error: Network timeout

// Convert object with message
toErrorObject({ message: 'Invalid data' })  // Error: Invalid data

// Convert number
toErrorObject(404)                  // Error: 404

// Usage in catch blocks
try {
  await riskyOperation();
} catch (err) {
  const error = toErrorObject(err);
  logger.error(error.message);
}
```
